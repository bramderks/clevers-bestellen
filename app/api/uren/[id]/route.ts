import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body =
      await request.json();

    const registratie =
      await prisma.uurRegistratie.findUnique({
        where: {
          id,
        },
      });

    if (!registratie) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Urenregistratie niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const resultaat =
      await prisma.uurRegistratie.update({
        where: {
          id,
        },
        data: {
          gewerkteStart:
            body.gewerkteStart ||
            null,

          gewerkteEinde:
            body.gewerkteEinde ||
            null,

          pauze:
            Number(body.pauze) || 0,

          opmerking:
            body.opmerking ||
            null,

          goedgekeurd:
            Boolean(
              body.goedgekeurd
            ),
        },
      });

    revalidatePath("/uren");
    revalidatePath(
      `/uren/${id}`
    );

    return NextResponse.json({
      success: true,
      registratie: resultaat,
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

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const registratie =
      await prisma.uurRegistratie.findUnique({
        where: {
          id,
        },
        include: {
          medewerker: true,
          dienst: true,
        },
      });

    if (!registratie) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Urenregistratie niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      registratie,
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

    const registratie =
      await prisma.uurRegistratie.findUnique({
        where: {
          id,
        },
      });

    if (!registratie) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Urenregistratie niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.uurRegistratie.delete({
      where: {
        id,
      },
    });

    revalidatePath("/uren");

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