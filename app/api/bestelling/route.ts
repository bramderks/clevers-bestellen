import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
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
  type: string;
  opmerking?: string;
  regels: BestelRegel[];
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

    const bestelling =
      await prisma.bestelling.create({
        data: {
          datum: new Date(body.datum),
          vestiging: body.vestiging,
          medewerker:
            body.medewerker.trim(),
          type: body.type,
          opmerking:
            body.opmerking ?? "",

          regels: {
            create: body.regels.map(
              (regel) => ({
                productId:
                  regel.productId,
                productNaam:
                  regel.productNaam,
                geteld:
                  regel.geteld,
                buffer:
                  regel.buffer,
                besteld:
                  regel.besteld,
                bestelGroep:
                  regel.bestelGroep,
              })
            ),
          },
        },

        include: {
          regels: true,
        },
      });

    revalidatePath("/");
    revalidatePath("/historie");

    try {
      await verstuurBestelMail(
        bestelling.vestiging,
        bestelling.medewerker ??
          "Onbekend",
        bestelling.datum.toLocaleDateString(
          "nl-NL"
        ),
        bestelling.regels
      );
    } catch (mailError) {
      console.error(
        "Mail versturen mislukt:",
        mailError
      );
    }

    return NextResponse.json({
      success: true,
      bestelling,
    });
  } catch (error) {
    console.error(error);

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