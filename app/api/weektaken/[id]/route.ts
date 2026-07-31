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
  const { id } = await params;

  const { naam, voltooid } =
    await req.json();

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
        naam,
        voltooid,
        voltooidOp: voltooid
          ? new Date()
          : null,
      },
    });

  return NextResponse.json(taak);
}