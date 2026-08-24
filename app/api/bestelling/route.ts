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

function vestigingNaam(
  vestiging: string
): string {
  switch (vestiging) {
    case "roermond":
      return "Roermond";

    case "nijmegen":
      return "Nijmegen";

    default:
      return vestiging;
  }
}

function valideer(
  body: RequestBody
): string | null {
  if (!body.vestiging) {
    return "Vestiging ontbreekt.";
  }

  if (!body.medewerker?.trim()) {
    return "Medewerker ontbreekt.";
  }

  if (
    !body.datum ||
    Number.isNaN(
      new Date(body.datum).getTime()
    )
  ) {
    return "Ongeldige datum.";
  }

  if (
    !Array.isArray(body.regels) ||
    body.regels.length === 0
  ) {
    return "Geen bestelregels ontvangen.";
  }

  return null;
}

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      (await req.json()) as RequestBody;

    const fout =
      valideer(body);

    if (fout) {
      return NextResponse.json(
        {
          success: false,
          error: fout,
        },
        {
          status: 400,
        }
      );
    }

    const naamVestiging =
      vestigingNaam(
        body.vestiging
      );

    const datum =
      new Date(body.datum);

    await verstuurBestelMail(
      naamVestiging,
      body.medewerker.trim(),
      datum.toLocaleDateString(
        "nl-NL"
      ),
      body.regels
    );

    return NextResponse.json({
      success: true,
      message:
        "Telling per mail verzonden.",
    });
  } catch (error) {
    console.error(
      "Telling verwerken mislukt:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout.",
      },
      {
        status: 500,
      }
    );
  }
}