import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

    const body = await req.json();

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

    if (bestaandeTaak.week.afgesloten) {
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

    const data: {
      titel?: string;
      categorie?: string | null;
      omschrijving?: string | null;
      prioriteit?: string | null;
      voltooid?: boolean;
      voltooidOp?: Date | null;
    } = {};

    if (body.titel !== undefined) {
      if (
        typeof body.titel !== "string" ||
        !body.titel.trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Een titel is verplicht.",
          },
          {
            status: 400,
          }
        );
      }

      data.titel = body.titel.trim();
    }

    if (body.categorie !== undefined) {
      data.categorie =
        typeof body.categorie === "string"
          ? body.categorie.trim() || null
          : null;
    }

    if (body.omschrijving !== undefined) {
      data.omschrijving =
        typeof body.omschrijving === "string"
          ? body.omschrijving.trim() || null
          : null;
    }

    if (body.prioriteit !== undefined) {
      data.prioriteit =
        typeof body.prioriteit === "string"
          ? body.prioriteit.trim() || null
          : null;
    }

    if (body.voltooid !== undefined) {
      const voltooid = Boolean(
        body.voltooid
      );

      data.voltooid = voltooid;

      data.voltooidOp = voltooid
        ? new Date()
        : null;
    }

    const taak =
      await prisma.weekTaak.update({
        where: {
          id,
        },
        data,
      });

    return NextResponse.json({
      success: true,
      taak,
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