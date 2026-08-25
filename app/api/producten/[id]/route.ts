import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          categorie: true,
          leverancier: true,
        },
      });

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

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Product kon niet worden opgehaald.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const bestaand =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!bestaand) {
      return NextResponse.json(
        {
          error: "Product niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    const product =
      await prisma.product.update({
        where: {
          id,
        },

        data: {
          naam:
            typeof body.naam === "string"
              ? body.naam.trim()
              : bestaand.naam,

          omschrijving:
            typeof body.omschrijving === "string"
              ? body.omschrijving.trim() || null
              : body.omschrijving === null
                ? null
                : bestaand.omschrijving,

          code:
            typeof body.code === "string"
              ? body.code.trim() || null
              : body.code === null
                ? null
                : bestaand.code,

          type:
            typeof body.type === "string"
              ? body.type.trim()
              : bestaand.type,

          bestelEenheid:
            typeof body.bestelEenheid === "string"
              ? body.bestelEenheid.trim() || null
              : body.bestelEenheid === null
                ? null
                : bestaand.bestelEenheid,

          bestelAantal:
            body.bestelAantal !== undefined
              ? Number(body.bestelAantal)
              : bestaand.bestelAantal,

          buffer:
            body.buffer !== undefined
              ? Number(body.buffer)
              : bestaand.buffer,

          minimumVoorraad:
            body.minimumVoorraad !== undefined
              ? Number(body.minimumVoorraad)
              : body.minimum !== undefined
                ? Number(body.minimum)
                : bestaand.minimumVoorraad,

          maximumVoorraad:
            body.maximumVoorraad !== undefined
              ? body.maximumVoorraad === null
                ? null
                : Number(body.maximumVoorraad)
              : body.maximum !== undefined
                ? body.maximum === null
                  ? null
                  : Number(body.maximum)
                : bestaand.maximumVoorraad,

          vitrineProduct:
            body.vitrineProduct !== undefined
              ? Boolean(body.vitrineProduct)
              : bestaand.vitrineProduct,

          seizoensProduct:
            body.seizoensProduct !== undefined
              ? Boolean(body.seizoensProduct)
              : bestaand.seizoensProduct,

          bestelbaar:
            body.bestelbaar !== undefined
              ? Boolean(body.bestelbaar)
              : bestaand.bestelbaar,

          actief:
            body.actief !== undefined
              ? Boolean(body.actief)
              : bestaand.actief,

          volgorde:
            body.volgorde !== undefined
              ? Number(body.volgorde)
              : bestaand.volgorde,

          categorie:
            body.categorieId !== undefined
              ? {
                  connect: {
                    id: body.categorieId,
                  },
                }
              : undefined,

          leverancier:
            body.leverancierId !== undefined
              ? body.leverancierId
                ? {
                    connect: {
                      id: body.leverancierId,
                    },
                  }
                : {
                    disconnect: true,
                  }
              : undefined,
        },

        include: {
          categorie: true,
          leverancier: true,
        },
      });

    await log({
      actie: "PRODUCT_BIJGEWERKT",
      entiteit: "Product",
      entiteitId: product.id,
      details: product,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Product kon niet worden bijgewerkt.",
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

    const bestaand =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!bestaand) {
      return NextResponse.json(
        {
          error: "Product niet gevonden.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    await log({
      actie: "PRODUCT_VERWIJDERD",
      entiteit: "Product",
      entiteitId: id,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Product kon niet worden verwijderd.",
      },
      {
        status: 500,
      }
    );
  }
}