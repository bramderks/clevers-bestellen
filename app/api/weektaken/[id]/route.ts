import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const {
      naam,
      voltooid,
    } = await req.json();

    if (!naam?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Naam ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    const bestaandeTaak =
      await prisma.weekTaak.findUnique({
        where: {
          id,
        },
        include: {
          week: true,
        },
      });

    if (!bestaandeTaak) {
      return NextResponse.json(
        {
          success: false,
          error: "Taak niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      bestaandeTaak.week.afgesloten
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Deze week is afgesloten en kan niet meer gewijzigd worden.",
        },
        {
          status: 403,
        }
      );
    }

    const taak =
      await prisma.weekTaak.update({
        where: {
          id,
        },
        data: {
          naam: naam.trim(),
          voltooid:
            Boolean(voltooid),
          voltooidOp: voltooid
            ? new Date()
            : null,
        },
      });

    return NextResponse.json({
      success: true,
      ...taak,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij opslaan weektaak:"
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