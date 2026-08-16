import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function GET() {
  const buffers =
    await prisma.productBuffer.findMany({
      include: {
        product: true,
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
            categorie: "asc",
          },
        },
        {
          product: {
            volgorde: "asc",
          },
        },
      ],
    });

  return NextResponse.json(
    buffers
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const [product, vestiging] =
      await Promise.all([
        prisma.product.findUnique({
          where: { id: body.productId },
          include: { categorie: true },
        }),
        prisma.vestiging.findUnique({
          where: { id: body.vestigingId },
        }),
      ]);

    const isRoermondIjs =
      vestiging?.naam.toLowerCase() ===
        "roermond" &&
      product?.categorie.naam.toLowerCase() ===
        "ijs";

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
            : Number(body.buffer ?? 0),

          minimumVoorraad:
            body.minimumVoorraad !=
            null
              ? Number(
                  body.minimumVoorraad
                )
              : null,

          maximaleVoorraad:
            body.maximaleVoorraad !=
            null
              ? Number(
                  body.maximaleVoorraad
                )
              : null,
        },

        include: {
          product: true,
          vestiging: true,
        },
      });

    await log({
      actie:
        "BUFFER_AANGEMAAKT",

      entiteit:
        "ProductBuffer",

      entiteitId:
        buffer.id,

      details:
        buffer,
    });

    return NextResponse.json(
      buffer,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

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