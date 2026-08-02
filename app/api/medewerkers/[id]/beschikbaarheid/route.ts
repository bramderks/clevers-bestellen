import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type BeschikbaarheidInput = {
  weekdag: number;
  beschikbaar: boolean;
  vanaf: string | null;
  tot: string | null;
};

export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const medewerker =
      await prisma.medewerker.findUnique({
        where: {
          id,
        },
      });

    if (!medewerker) {
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

    const beschikbaarheden =
      body.beschikbaarheden as BeschikbaarheidInput[];

    await prisma.beschikbaarheid.deleteMany({
      where: {
        medewerkerId: id,
      },
    });

    if (beschikbaarheden.length > 0) {
      await prisma.beschikbaarheid.createMany({
        data: beschikbaarheden.map((dag) => ({
          medewerkerId: id,
          weekdag: dag.weekdag,
          beschikbaar: dag.beschikbaar,
          vanaf: dag.beschikbaar
            ? dag.vanaf
            : null,
          tot: dag.beschikbaar
            ? dag.tot
            : null,
        })),
      });
    }

    revalidatePath("/medewerkers");
    revalidatePath(
      `/medewerkers/${id}`
    );
    revalidatePath(
      `/medewerkers/${id}/beschikbaarheid`
    );

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