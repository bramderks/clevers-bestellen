import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function GET() {
  try {
    const producten =
      await prisma.product.findMany({
        include: {
          categorie: true,
          leverancier: true,
        },

        orderBy: [
          {
            categorie: {
              volgorde: "asc",
            },
          },
          {
            categorie: {
              naam: "asc",
            },
          },
          {
            volgorde: "asc",
          },
          {
            naam: "asc",
          },
        ],
      });

    return NextResponse.json(
      producten
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Producten konden niet worden opgehaald.",
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

    if (
      typeof body.naam !== "string" ||
      !body.naam.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Productnaam is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof body.categorieId !==
        "string" ||
      !body.categorieId
    ) {
      return NextResponse.json(
        {
          error:
            "Categorie is verplicht.",
        },
        {
          status: 400,
        }
      );
    }

    const categorie =
      await prisma.productCategorie.findUnique(
        {
          where: {
            id: body.categorieId,
          },
        }
      );

    if (!categorie) {
      return NextResponse.json(
        {
          error:
            "Categorie niet gevonden.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.leverancierId !==
        undefined &&
      body.leverancierId !== null &&
      body.leverancierId !== ""
    ) {
      const leverancier =
        await prisma.leverancier.findUnique(
          {
            where: {
              id: body.leverancierId,
            },
          }
        );

      if (!leverancier) {
        return NextResponse.json(
          {
            error:
              "Leverancier niet gevonden.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const product =
      await prisma.product.create({
        data: {
          naam:
            body.naam.trim(),

          omschrijving:
            typeof body.omschrijving ===
            "string"
              ? body.omschrijving.trim() ||
                null
              : null,

          code:
            typeof body.code ===
            "string"
              ? body.code.trim() || null
              : null,

          categorie: {
            connect: {
              id: body.categorieId,
            },
          },

          leverancier:
            body.leverancierId
              ? {
                  connect: {
                    id: body.leverancierId,
                  },
                }
              : undefined,

          type:
            typeof body.type ===
            "string"
              ? body.type.trim()
              : "",

          bestelEenheid:
            typeof body.bestelEenheid ===
            "string"
              ? body.bestelEenheid.trim() ||
                null
              : null,

          bestelAantal:
            body.bestelAantal !==
            undefined
              ? Number(
                  body.bestelAantal
                )
              : 1,

          buffer:
            body.buffer !== undefined
              ? Number(body.buffer)
              : 0,

          minimumVoorraad:
            body.minimumVoorraad !==
            undefined
              ? Number(
                  body.minimumVoorraad
                )
              : body.minimum !==
                  undefined
                ? Number(body.minimum)
                : 0,

          maximumVoorraad:
            body.maximumVoorraad !==
            undefined
              ? body.maximumVoorraad ===
                null
                ? null
                : Number(
                    body.maximumVoorraad
                  )
              : body.maximum !==
                  undefined
                ? body.maximum ===
                  null
                  ? null
                  : Number(
                      body.maximum
                    )
                : null,

          vitrineProduct:
            body.vitrineProduct !==
            undefined
              ? Boolean(
                  body.vitrineProduct
                )
              : false,

          seizoensProduct:
            body.seizoensProduct !==
            undefined
              ? Boolean(
                  body.seizoensProduct
                )
              : false,

          bestelbaar:
            body.bestelbaar !==
            undefined
              ? Boolean(
                  body.bestelbaar
                )
              : true,

          actief:
            body.actief !== undefined
              ? Boolean(body.actief)
              : true,

          volgorde:
            body.volgorde !== undefined
              ? Number(
                  body.volgorde
                )
              : 0,
        },

        include: {
          categorie: true,
          leverancier: true,
        },
      });

    await log({
      actie:
        "PRODUCT_AANGEMAAKT",

      entiteit:
        "Product",

      entiteitId:
        product.id,

      details:
        product,
    });

    return NextResponse.json(
      product,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Product kon niet worden aangemaakt.",
      },
      {
        status: 500,
      }
    );
  }
}