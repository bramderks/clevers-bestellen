import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const diensten =
      await prisma.dienst.findMany({
        include: {
          medewerker: true,
          urenregistratie: true,
        },
        orderBy: [
          {
            datum: "desc",
          },
          {
            begintijd: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      diensten,
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

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    if (!body.medewerkerId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Kies een medewerker.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.datum) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Datum is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.begintijd ||
      !body.eindtijd
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Begin- en eindtijd zijn verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    const medewerker =
      await prisma.medewerker.findUnique({
        where: {
          id: body.medewerkerId,
        },
      });

    if (!medewerker) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Medewerker niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const dienst =
      await prisma.dienst.create({
        data: {
          medewerkerId:
            body.medewerkerId,
          datum: new Date(
            body.datum
          ),
          begintijd:
            body.begintijd,
          eindtijd:
            body.eindtijd,
          vestiging:
            body.vestiging,
          functie:
            body.functie ??
            "Medewerker",
        },
        include: {
          medewerker: true,
          urenregistratie: true,
        },
      });

    revalidatePath("/diensten");
    revalidatePath("/rooster");
    revalidatePath(
      "/rooster/week"
    );

    return NextResponse.json({
      success: true,
      dienst,
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