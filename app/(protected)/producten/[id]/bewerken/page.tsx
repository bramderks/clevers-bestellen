import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductForm from "@/modules/producten/components/ProductForm";

import type {
  ProductFormData,
} from "@/modules/producten/types/product";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BewerkProductPagina({
  params,
}: Readonly<Props>) {
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
    notFound();
  }

  async function opslaan(
    data: ProductFormData,
  ) {
    "use server";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/producten/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(
        "Product kon niet worden bijgewerkt.",
      );
    }
  }

  return (
    <ProductForm
      initialData={{
        naam: product.naam,

        categorieId:
          product.categorieId,

        leverancierId:
          product.leverancierId ?? "",

        code:
          product.code ?? "",

        omschrijving:
          product.omschrijving ?? "",

        type:
          product.type,

        bestelEenheid:
          product.bestelEenheid ?? "",

        bestelAantal:
          product.bestelAantal,

        buffer:
          product.buffer,

        minimumVoorraad:
          product.minimumVoorraad,

        maximumVoorraad:
          product.maximumVoorraad,

        vitrineProduct:
          product.vitrineProduct,

        seizoensProduct:
          product.seizoensProduct,

        bestelbaar:
          product.bestelbaar,

        actief:
          product.actief,

        volgorde:
          product.volgorde,
      }}
      onSubmit={opslaan}
    />
  );
}