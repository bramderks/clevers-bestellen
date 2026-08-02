import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
          success: false,
          error: "WeekId ontbreekt.",
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
          success: false,
          error: "Week niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    if (week.afgesloten) {
      return NextResponse.json({
        success: true,
        message:
          "Week was al afgesloten.",
      });
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
          success: false,
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

    revalidatePath("/weektaken");
    revalidatePath("/historie/weektaken");
    revalidatePath("/historie");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      week: resultaat,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij afsluiten week:"
    );
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Er is een fout opgetreden.",
      },
      {
        status: 500,
      }
    );
  }
}