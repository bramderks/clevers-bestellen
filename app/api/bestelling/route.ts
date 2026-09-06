import { createHash } from "node:crypto";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verstuurBestelMail } from "@/lib/mail";

interface BestelRegel {
  productId: string;
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
  bestelGroep: string;
}

interface RequestBody {
  datum: string;
  vestiging: string;
  medewerker: string;
  opmerking?: string;
  regels: BestelRegel[];
}

interface SynchronisatieResultaat {
  success: boolean;
  fout?: string;
}

function vestigingNaam(vestiging: string): string {
  switch (vestiging) {
    case "roermond":
      return "Roermond";
    case "nijmegen":
      return "Nijmegen";
    default:
      return vestiging;
  }
}

function valideer(body: RequestBody): string | null {
  if (!body.vestiging) return "Vestiging ontbreekt.";
  if (!body.medewerker?.trim()) return "Medewerker ontbreekt.";
  if (!body.datum || Number.isNaN(new Date(body.datum).getTime())) return "Ongeldige datum.";
  if (!Array.isArray(body.regels) || body.regels.length === 0) return "Geen bestelregels ontvangen.";
  return null;
}

function maakSynchronisatieId(body: RequestBody): string {
  const inhoud = JSON.stringify({
    datum: body.datum,
    vestiging: vestigingNaam(body.vestiging),
    medewerker: body.medewerker.trim(),
    opmerking: body.opmerking?.trim() ?? "",
    regels: body.regels.map((regel) => ({
      productNaam: regel.productNaam.trim(),
      geteld: regel.geteld,
      buffer: regel.buffer,
      besteld: regel.besteld,
      bestelGroep: regel.bestelGroep,
    })),
  });

  return createHash("sha256").update(inhoud).digest("hex");
}

async function synchroniseerMetErp(
  body: RequestBody,
): Promise<SynchronisatieResultaat> {
  const erpUrl = process.env.CLEVERS_ERP_TELLING_SYNC_URL;
  const geheim = process.env.CLEVERS_TELLING_SYNC_SECRET;

  if (!erpUrl || !geheim) {
    return {
      success: false,
      fout: "ERP-koppeling is nog niet geconfigureerd.",
    };
  }

  try {
    const response = await fetch(erpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + geheim,
      },
      body: JSON.stringify({
        synchronisatieId: maakSynchronisatieId(body),
        datum: body.datum,
        vestigingCode: vestigingNaam(body.vestiging),
        medewerker: body.medewerker.trim(),
        opmerking: body.opmerking?.trim() ?? "",
        regels: body.regels.map((regel) => ({
          productNaam: regel.productNaam,
          geteld: regel.geteld,
          buffer: regel.buffer,
          besteld: regel.besteld,
        })),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const resultaat = await response.json().catch(() => null);

      return {
        success: false,
        fout: resultaat?.fout ?? "ERP-koppeling gaf een foutmelding.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("ERP-telling synchronisatie mislukt:", error);

    return {
      success: false,
      fout:
        error instanceof Error
          ? error.message
          : "Onbekende synchronisatiefout.",
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const fout = valideer(body);

    if (fout) {
      return NextResponse.json(
        { success: false, error: fout },
        { status: 400 },
      );
    }

    const naamVestiging = vestigingNaam(body.vestiging);
    const datum = new Date(body.datum);

    // De bestaande mailflow blijft de primaire,
    // onafhankelijke afronding van de telling.
    await verstuurBestelMail(
      naamVestiging,
      body.medewerker.trim(),
      datum.toLocaleDateString("nl-NL"),
      body.regels,
    );

    // ERP-synchronisatie is aanvullend en mag de
    // bestaande mailfunctionaliteit nooit blokkeren.
    const synchronisatie = await synchroniseerMetErp(body);

    if (!synchronisatie.success) {
      console.error(
        "Telling per mail verzonden, maar ERP-synchronisatie mislukt:",
        synchronisatie.fout,
      );
    }

    return NextResponse.json({
      success: true,
      message: "Telling per mail verzonden.",
      erpSynchronisatie: synchronisatie.success
        ? "gesynchroniseerd"
        : "niet-gesynchroniseerd",
    });
  } catch (error) {
    console.error("Telling verwerken mislukt:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout.",
      },
      { status: 500 },
    );
  }
}
