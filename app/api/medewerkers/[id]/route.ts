import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const bestaande =
      await prisma.medewerker.findUnique({
        where: {
          id,
        },
      });

    if (!bestaande) {
      return NextResponse.json(
        {
          success: false,
          error: "Medewerker niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    if (!body.voornaam?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Voornaam is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.achternaam?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Achternaam is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    if (body.email?.trim()) {
      const emailBestaat =
        await prisma.medewerker.findFirst({
          where: {
            email: body.email.trim(),
            NOT: {
              id,
            },
          },
        });

      if (emailBestaat) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Dit e-mailadres wordt al gebruikt.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const medewerker =
      await prisma.medewerker.update({
        where: {
          id,
        },
        data: {
          voornaam:
            body.voornaam.trim(),

          achternaam:
            body.achternaam.trim(),

          naam: `${body.voornaam.trim()} ${body.achternaam.trim()}`,

          email:
            body.email?.trim() || null,

          telefoon:
            body.telefoon?.trim() || null,

          vestiging:
            body.vestiging,

          kleur:
            body.kleur,

          actief:
            body.actief,

          functie:
            body.functie || null,

          uurloon:
            body.uurloon
              ? Number(body.uurloon)
              : null,

          contractUren:
            body.contractUren
              ? Number(body.contractUren)
              : null,

          datumInDienst:
            body.datumInDienst
              ? new Date(
                  body.datumInDienst
                )
              : null,

          geboortedatum:
            body.geboortedatum
              ? new Date(
                  body.geboortedatum
                )
              : null,

          opmerkingen:
            body.opmerkingen || null,
        },
      });

    revalidatePath("/medewerkers");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      medewerker,
    });
  } catch (error) {
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

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const bestaande =
      await prisma.medewerker.findUnique({
        where: {
          id,
        },
      });

    if (!bestaande) {
      return NextResponse.json(
        {
          success: false,
          error: "Medewerker niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.medewerker.delete({
      where: {
        id,
      },
    });

    revalidatePath("/medewerkers");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
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