import { createHash } from "node:crypto";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verstuurBestelMail } from "@/lib/mail";

interface BestelRegel {
  productId: string;
  productNaam: string;
  productAlternatieveNamen?: string[];
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
    case "roermond": return "Roermond";
    case "nijmegen": return "Nijmegen";
    default: return vestiging;
  }
}

function valideer(body: RequestBody): string | null {
  if (!body.vestiging) return "Vestiging ontbreekt.";
  if (!body.medewerker?.trim()) return "Medewerker ontbreekt.";
  if (!body.datum || Number.isNaN(new Date(body.datum).getTime())) return "Ongeldige datum.";
  if (!Array.isArray(body.regels) || body.regels.length === 0) return "Geen bestelregels ontvangen.";

  for (const regel of body.regels) {
    if (!regel.productNaam?.trim()) return "Een productnaam ontbreekt.";
    if (!Number.isFinite(regel.geteld) || regel.geteld < 0) return `Ongeldige telling voor ${regel.productNaam}.`;
    if (!Number.isFinite(regel.buffer) || regel.buffer < 0) return `Ongeldige buffer voor ${regel.productNaam}.`;
    if (!Number.isFinite(regel.besteld) || regel.besteld < 0) return `Ongeldige bestelling voor ${regel.productNaam}.`;
  }

  return null;
}

function maakSynchronisatieId(body: RequestBody): string {
  const inhoud = JSON.stringify({
    datum: body.datum,
    vestiging: vestigingNaam(body.vestiging),
    medewerker: body.medewerker.trim(),
    opmerking: body.opmerking?.trim() ?? "",
    regels: body.regels.map((regel) => ({
      productId: regel.productId,
      productNaam: regel.productNaam.trim(),
      geteld: regel.geteld,
      buffer: regel.buffer,
      besteld: regel.besteld,
      bestelGroep: regel.bestelGroep,
    })),
  });

  return createHash("sha256").update(inhoud).digest("hex");
}

async function synchroniseerMetErp(body: RequestBody): Promise<SynchronisatieResultaat> {
  const erpUrl = process.env.CLEVERS_ERP_TELLING_SYNC_URL;
  const geheim = process.env.CLEVERS_TELLING_SYNC_SECRET;

  if (!erpUrl || !geheim) {
    return { success: false, fout: "ERP-koppeling is nog niet geconfigureerd." };
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
          productId: regel.productId,
          productNaam: regel.productNaam,
          productAlternatieveNamen: regel.productAlternatieveNamen ?? [],
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
        fout: resultaat?.fout ?? `ERP-koppeling gaf HTTP ${response.status}.`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("ERP-telling synchronisatie mislukt:", error);
    return {
      success: false,
      fout: error instanceof Error ? error.message : "Onbekende synchronisatiefout.",
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const fout = valideer(body);

    if (fout) {
      return NextResponse.json({ success: false, error: fout }, { status: 400 });
    }

    const synchronisatie = await synchroniseerMetErp(body);

    if (!synchronisatie.success) {
      console.error("ERP-synchronisatie mislukt:", synchronisatie.fout);

      return NextResponse.json(
        {
          success: false,
          error: `De telling is nog niet opgeslagen in het ERP. ${synchronisatie.fout ?? ""}`.trim(),
        },
        { status: 502 },
      );
    }

    const naamVestiging = vestigingNaam(body.vestiging);
    const datum = new Date(body.datum);

    await verstuurBestelMail(
      naamVestiging,
      body.medewerker.trim(),
      datum.toLocaleDateString("nl-NL"),
      body.regels,
      body.opmerking?.trim() ?? "",
    );

    return NextResponse.json({
      success: true,
      message: "Telling opgeslagen in het ERP en per mail verzonden.",
      erpSynchronisatie: "gesynchroniseerd",
    });
  } catch (error) {
    console.error("Telling verwerken mislukt:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Onbekende fout.",
      },
      { status: 500 },
    );
  }
}
