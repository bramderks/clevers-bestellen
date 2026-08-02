import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const dienst =
      await prisma.dienst.findUnique({
        where: {
          id,
        },
        include: {
          medewerker: true,
          urenregistratie: true,
        },
      });

    if (!dienst) {
      return NextResponse.json(
        {
          success: false,
          error: "Dienst niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

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

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body =
      await request.json();

    const bestaande =
      await prisma.dienst.findUnique({
        where: {
          id,
        },
      });

    if (!bestaande) {
      return NextResponse.json(
        {
          success: false,
          error: "Dienst niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    if (!body.medewerkerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Kies een medewerker.",
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
          error: "Datum is verplicht.",
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
      await prisma.dienst.update({
        where: {
          id,
        },
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
            body.functie ||
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
    revalidatePath(
      `/diensten/${id}`
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

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const bestaande =
      await prisma.dienst.findUnique({
        where: {
          id,
        },
      });

    if (!bestaande) {
      return NextResponse.json(
        {
          success: false,
          error: "Dienst niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.dienst.delete({
      where: {
        id,
      },
    });

    revalidatePath("/diensten");
    revalidatePath("/rooster");
    revalidatePath(
      "/rooster/week"
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