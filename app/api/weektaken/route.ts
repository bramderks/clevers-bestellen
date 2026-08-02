import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { haalOfMaakWeek } from "@/lib/haalOfMaakWeek";
import { initialiseerWeektaken } from "@/lib/initialiseerWeektaken";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const vestiging =
      searchParams.get("vestiging") ??
      "Nijmegen";

    const week =
      await haalOfMaakWeek(
        vestiging
      );

    if (!week.afgesloten) {
      await initialiseerWeektaken(
        week.id
      );
    }

    const taken =
      await prisma.weekTaak.findMany({
        where: {
          weekId: week.id,
        },
        orderBy: [
          {
            categorie: "asc",
          },
          {
            taak: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      week,
      taken,
      afgesloten:
        week.afgesloten,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij ophalen weektaken:"
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