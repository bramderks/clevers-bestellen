import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function GET() {
  const producten =
    await prisma.product.findMany({
      orderBy: [
        {
          categorie: "asc",
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
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const product =
      await prisma.product.create({
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