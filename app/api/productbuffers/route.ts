import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function GET() {
  const buffers =
    await prisma.productBuffer.findMany({
      include: {
        product: {
          include: {
            categorie: true,
          },
        },
        vestiging: true,
      },

      orderBy: [
        {
          vestiging: {
            naam: "asc",
          },
        },
        {
          product: {
            categorie: {
              volgorde: "asc",
            },
          },
        },
        {
          product: {
            volgorde: "asc",
          },
        },
        {
          product: {
            naam: "asc",
          },
        },
      ],
    });

  return NextResponse.json(buffers);
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    if (!body.productId) {
      return NextResponse.json(
        {
          error: "Product ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.vestigingId) {
      return NextResponse.json(
        {
          error: "Vestiging ontbreekt.",
        },
        {
          status: 400,
        }
      );
    }

    const [product, vestiging] =
      await Promise.all([
        prisma.product.findUnique({
          where: {
            id: body.productId,
          },
          include: {
            categorie: true,
          },
        }),

        prisma.vestiging.findUnique({
          where: {
            id: body.vestigingId,
          },
        }),
      ]);

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
      Number(body.buffer ?? 0);

    const minimumWaarde =
      Number(body.minimum ?? 0);

    const maximumWaarde =
      Number(body.maximum ?? 0);

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
      await prisma.productBuffer.create({
        data: {
          vestiging: {
            connect: {
              id: body.vestigingId,
            },
          },

          product: {
            connect: {
              id: body.productId,
            },
          },

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
      actie: "BUFFER_AANGEMAAKT",

      entiteit: "ProductBuffer",

      entiteitId: buffer.id,

      details: buffer,
    });

    return NextResponse.json(
      buffer,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Buffer aanmaken mislukt:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Buffer kon niet worden aangemaakt.",
      },
      {
        status: 500,
      }
    );
  }
}