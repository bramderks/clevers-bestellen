import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest
) {
  try {
    const { weekId } =
      await request.json();

    if (!weekId) {
      return NextResponse.json(
        {
          error:
            "WeekId ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    const week =
      await prisma.week.findUnique({
        where: {
          id: weekId,
        },
      });

    if (!week) {
      return NextResponse.json(
        {
          error:
            "Week niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    if (week.afgesloten) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Week was al afgesloten.",
        }
      );
    }

    const openTaken =
      await prisma.weekTaak.count({
        where: {
          weekId,
          voltooid: false,
        },
      });

    if (openTaken > 0) {
      return NextResponse.json(
        {
          error:
            "Niet alle taken zijn voltooid.",
        },
        {
          status: 400,
        }
      );
    }

    const resultaat =
      await prisma.week.update({
        where: {
          id: weekId,
        },
        data: {
          afgesloten: true,
          afgeslotenOp:
            new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      week: resultaat,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Er is een fout opgetreden.",
      },
      {
        status: 500,
      }
    );
  }
}