import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

interface PatchBody {
  productId?: string;
  vestigingId?: string;
  buffer?: number | string | null;
  minimum?: number | string | null;
  maximum?: number | string | null;
}

export async function GET(
  _: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const buffer =
    await prisma.productBuffer.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        vestiging: true,
      },
    });

  if (!buffer) {
    return NextResponse.json(
      {
        error: "Buffer niet gevonden.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(buffer);
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body =
      (await request.json()) as PatchBody;

    const bestaand =
      await prisma.productBuffer.findUnique({
        where: {
          id,
        },
        include: {
          product: {
            include: {
              categorie: true,
            },
          },
          vestiging: true,
        },
      });

    if (!bestaand) {
      return NextResponse.json(
        {
          error: "Buffer niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const product = body.productId
      ? await prisma.product.findUnique({
          where: {
            id: body.productId,
          },
          include: {
            categorie: true,
          },
        })
      : bestaand.product;

    if (!product) {
      return NextResponse.json(
        {
          error: "Product niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const vestiging =
      body.vestigingId
        ? await prisma.vestiging.findUnique({
            where: {
              id: body.vestigingId,
            },
          })
        : bestaand.vestiging;

    if (!vestiging) {
      return NextResponse.json(
        {
          error: "Vestiging niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const isRoermondIjs =
      vestiging.naam.toLowerCase() ===
        "roermond" &&
      product.categorie.naam.toLowerCase() ===
        "ijs";

    const bufferWaarde =
      body.buffer != null
        ? Number(body.buffer)
        : bestaand.buffer;

    const minimumWaarde =
      body.minimum != null
        ? Number(body.minimum)
        : bestaand.minimum;

    const maximumWaarde =
      body.maximum != null
        ? Number(body.maximum)
        : bestaand.maximum;

    if (
      !Number.isFinite(bufferWaarde) ||
      !Number.isFinite(minimumWaarde) ||
      !Number.isFinite(maximumWaarde)
    ) {
      return NextResponse.json(
        {
          error:
            "Buffer, minimum en maximum moeten geldige getallen zijn.",
        },
        {
          status: 400,
        }
      );
    }

    const buffer =
      await prisma.productBuffer.update({
        where: {
          id,
        },

        data: {
          product: body.productId
            ? {
                connect: {
                  id: body.productId,
                },
              }
            : undefined,

          vestiging: body.vestigingId
            ? {
                connect: {
                  id: body.vestigingId,
                },
              }
            : undefined,

          buffer: isRoermondIjs
            ? -1
            : bufferWaarde,

          minimum: minimumWaarde,

          maximum: maximumWaarde,
        },

        include: {
          product: true,
          vestiging: true,
        },
      });

    await log({
      actie: "BUFFER_BIJGEWERKT",

      entiteit: "ProductBuffer",

      entiteitId: buffer.id,

      details: buffer,
    });

    return NextResponse.json(buffer);
  } catch (error) {
    console.error(
      "Buffer bijwerken mislukt:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Buffer kon niet worden bijgewerkt.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    await prisma.productBuffer.delete({
      where: {
        id,
      },
    });

    await log({
      actie: "BUFFER_VERWIJDERD",

      entiteit: "ProductBuffer",

      entiteitId: id,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Buffer verwijderen mislukt:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Buffer kon niet worden verwijderd.",
      },
      {
        status: 500,
      }
    );
  }
}