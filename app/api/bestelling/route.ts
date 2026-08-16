import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  BestellingType,
} from "@prisma/client";

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

  vestigingId: string;

  vestigingNaam: string;

  medewerker: string;

  type: BestellingType;

  opmerking?: string;

  regels: BestelRegel[];
}

function valideer(
  body: RequestBody
): string | null {
  if (!body.vestigingId) {
    return "Vestiging ontbreekt.";
  }

  if (
    !body.medewerker?.trim()
  ) {
    return "Medewerker ontbreekt.";
  }

  if (
    !Array.isArray(
      body.regels
    ) ||
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
          datum: new Date(
            body.datum
          ),

          vestiging: {
            connect: {
              id:
                body.vestigingId,
            },
          },

          vestigingSnapshot:
            body.vestigingNaam,

          medewerkerSnapshot:
            body.medewerker.trim(),

          type:
            body.type,

          opmerking:
            body.opmerking ??
            null,

          regels: {
            create:
              body.regels.map(
                (
                  regel
                ) => ({
                  product: regel.productId
                    ? {
                        connect:
                          {
                            id:
                              regel.productId,
                          },
                      }
                    : undefined,

                  productNaam:
                    regel.productNaam,

                  geteld:
                    Number(
                      regel.geteld
                    ),

                  buffer:
                    Number(
                      regel.buffer
                    ),

                  besteld:
                    Number(
                      regel.besteld
                    ),

                  bestelGroep:
                    regel.bestelGroep,
                })
              ),
          },
        },

        include: {
          regels: true,
          vestiging: true,
        },
      });

    revalidatePath("/");
    revalidatePath(
      "/historie"
    );

    try {
      await verstuurBestelMail(
        bestelling
          .vestigingSnapshot,
        bestelling
          .medewerkerSnapshot ??
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
          error instanceof
          Error
            ? error.message
            : "Onbekende fout.",
      },
      {
        status: 500,
      }
    );
  }
}