import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import type {
  ProductFormData,
} from "../types/product";

function alternatieveNamenJson(
  waarde: ProductFormData["alternatieveNamen"],
): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue {
  if (waarde == null) {
    return Prisma.JsonNull;
  }

  return waarde as Prisma.InputJsonValue;
}

export async function getProducten() {
  return prisma.product.findMany({
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
}

export async function getProduct(
  id: string,
) {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export async function createProduct(
  data: ProductFormData,
) {
  return prisma.product.create({
    data: {
      naam: data.naam.trim(),

      zoekNaam:
        data.zoekNaam.trim() || null,

      categorie:
        data.categorie,

      bestelBij:
        data.bestelBij.trim() || null,

      leverancier:
        data.leverancier.trim() || null,

      artikelNummer:
        data.artikelNummer.trim() ||
        null,

      barcode:
        data.barcode.trim() || null,

      eenheid:
        data.eenheid.trim() || null,

      opmerking:
        data.opmerking.trim() || null,

      standaardBuffer:
        Number(
          data.standaardBuffer
        ),

      volgorde:
        Number(data.volgorde),

      actief:
        data.actief,

      alternatieveNamen:
        alternatieveNamenJson(
          data.alternatieveNamen
        ),
    },
  });
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      naam: data.naam.trim(),

      zoekNaam:
        data.zoekNaam.trim() || null,

      categorie:
        data.categorie,

      bestelBij:
        data.bestelBij.trim() || null,

      leverancier:
        data.leverancier.trim() || null,

      artikelNummer:
        data.artikelNummer.trim() ||
        null,

      barcode:
        data.barcode.trim() || null,

      eenheid:
        data.eenheid.trim() || null,

      opmerking:
        data.opmerking.trim() || null,

      standaardBuffer:
        Number(
          data.standaardBuffer
        ),

      volgorde:
        Number(data.volgorde),

      actief:
        data.actief,

      alternatieveNamen:
        alternatieveNamenJson(
          data.alternatieveNamen
        ),
    },
  });
}

export async function deleteProduct(
  id: string,
) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function getCategorieen() {
  const producten =
    await prisma.product.findMany({
      select: {
        categorie: true,
      },
    });

  return [
    ...new Set(
      producten.map(
        (product) =>
          product.categorie
      ),
    ),
  ].sort();
}

export async function getLeveranciers() {
  const producten =
    await prisma.product.findMany({
      select: {
        leverancier: true,
      },
    });

  return [
    ...new Set(
      producten
        .map(
          (product) =>
            product.leverancier
        )
        .filter(
          (
            leverancier
          ): leverancier is string =>
            leverancier !== null
        ),
    ),
  ].sort();
}