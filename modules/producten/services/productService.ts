import { prisma } from "@/lib/prisma";

import type { ProductFormData } from "../types/product";

export async function getProducten() {
  return prisma.product.findMany({
    include: {
      categorie: true,
      leverancier: true,
    },
    orderBy: [
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
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      categorie: true,
      leverancier: true,
    },
  });
}

export async function createProduct(data: ProductFormData) {
  return prisma.product.create({
    data: {
      naam: data.naam.trim(),

      categorieId: data.categorieId,

      leverancierId:
        data.leverancierId?.trim() || null,

      code:
        data.code?.trim() || null,

      omschrijving:
        data.omschrijving?.trim() || null,

      type: data.type.trim(),

      bestelEenheid:
        data.bestelEenheid?.trim() || null,

      bestelAantal:
        Number(data.bestelAantal) || 1,

      buffer:
        Number(data.buffer) || 0,

      minimumVoorraad:
        Number(data.minimumVoorraad) || 0,

maximumVoorraad:
  data.maximumVoorraad == null
    ? null
    : Number(data.maximumVoorraad),

      vitrineProduct:
        data.vitrineProduct,

      seizoensProduct:
        data.seizoensProduct,

      bestelbaar:
        data.bestelbaar,

      actief:
        data.actief,

      volgorde:
        Number(data.volgorde) || 0,
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

      categorieId: data.categorieId,

      leverancierId:
        data.leverancierId?.trim() || null,

      code:
        data.code?.trim() || null,

      omschrijving:
        data.omschrijving?.trim() || null,

      type: data.type.trim(),

      bestelEenheid:
        data.bestelEenheid?.trim() || null,

      bestelAantal:
        Number(data.bestelAantal) || 1,

      buffer:
        Number(data.buffer) || 0,

      minimumVoorraad:
        Number(data.minimumVoorraad) || 0,

      maximumVoorraad:
        data.maximumVoorraad == null
          ? null
          : Number(data.maximumVoorraad),

      vitrineProduct:
        data.vitrineProduct,

      seizoensProduct:
        data.seizoensProduct,

      bestelbaar:
        data.bestelbaar,

      actief:
        data.actief,

      volgorde:
        Number(data.volgorde) || 0,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function getCategorieen() {
  return prisma.productCategorie.findMany({
    where: {
      actief: true,
    },
    orderBy: {
      naam: "asc",
    },
  });
}

export async function getLeveranciers() {
  return prisma.leverancier.findMany({
    where: {
      actief: true,
    },
    orderBy: {
      naam: "asc",
    },
  });
}