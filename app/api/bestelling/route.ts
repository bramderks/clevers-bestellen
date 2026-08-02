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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.vestiging) {
      return NextResponse.json(
        {
          success: false,
          error: "Vestiging ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.medewerker?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Medewerker ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(body.regels) ||
      body.regels.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Geen bestelregels ontvangen.",
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
          medewerker: body.medewerker.trim(),
          type: body.type,
          opmerking:
            body.opmerking ?? "",

          regels: {
            create: (
              body.regels as BestelRegel[]
            ).map((regel) => ({
              productId:
                regel.productId,
              productNaam:
                regel.productNaam,
              geteld: regel.geteld,
              buffer: regel.buffer,
              besteld:
                regel.besteld,
              bestelGroep:
                regel.bestelGroep,
            })),
          },
        },

        include: {
          regels: true,
        },
      });

    revalidatePath("/historie");
    revalidatePath("/");

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
        "❌ E-mail kon niet worden verzonden."
      );
      console.error(mailError);
    }

    return NextResponse.json({
      success: true,
      bestelling,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij opslaan van bestelling:"
    );
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout",
      },
      {
        status: 500,
      }
    );
  }
}