import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const medewerkers =
      await prisma.medewerker.findMany({
        orderBy: [
          {
            actief: "desc",
          },
          {
            naam: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      medewerkers,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij ophalen medewerkers:"
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

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    if (
      !body.voornaam?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Voornaam is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.achternaam?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Achternaam is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    const naam = `${body.voornaam.trim()} ${body.achternaam.trim()}`;

    if (body.email?.trim()) {
      const bestaand =
        await prisma.medewerker.findFirst({
          where: {
            email:
              body.email.trim(),
          },
        });

      if (bestaand) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Dit e-mailadres bestaat al.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const medewerker =
      await prisma.medewerker.create({
        data: {
          voornaam:
            body.voornaam.trim(),
          achternaam:
            body.achternaam.trim(),
          naam,
          email:
            body.email?.trim() ||
            null,
          telefoon:
            body.telefoon?.trim() ||
            null,
          vestiging:
            body.vestiging,
          kleur:
            body.kleur,
          actief:
            body.actief,
        },
      });

    revalidatePath(
      "/medewerkers"
    );
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      medewerker,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij opslaan medewerker:"
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