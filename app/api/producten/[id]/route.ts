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
  const { id } =
    await params;

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!product) {
    return NextResponse.json(
      {
        error:
          "Product niet gevonden.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    product
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } =
      await params;

    const body =
      await request.json();

    const product =
      await prisma.product.update({
        where: {
          id,
        },

        data: {
          naam:
            body.naam.trim(),

          zoekNaam:
            body.zoekNaam?.trim() ??
            null,

          categorie:
            body.categorie,

          bestelBij:
            body.bestelBij?.trim() ??
            null,

          leverancier:
            body.leverancier?.trim() ??
            null,

          artikelNummer:
            body.artikelNummer?.trim() ??
            null,

          barcode:
            body.barcode?.trim() ??
            null,

          eenheid:
            body.eenheid?.trim() ??
            null,

          opmerking:
            body.opmerking?.trim() ??
            null,

          standaardBuffer:
            Number(
              body.standaardBuffer ??
                0
            ),

          volgorde:
            Number(
              body.volgorde ?? 0
            ),

          actief:
            body.actief ??
            true,

          alternatieveNamen:
            body.alternatieveNamen ??
            null,
        },
      });

    await log({
      actie:
        "PRODUCT_BIJGEWERKT",

      entiteit:
        "Product",

      entiteitId:
        product.id,

      details:
        product,
    });

    return NextResponse.json(
      product
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Product kon niet worden bijgewerkt.",
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
    const { id } =
      await params;

    await prisma.product.delete({
      where: {
        id,
      },
    });

    await log({
      actie:
        "PRODUCT_VERWIJDERD",

      entiteit:
        "Product",

      entiteitId:
        id,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Product kon niet worden verwijderd.",
      },
      {
        status: 500,
      }
    );
  }
}