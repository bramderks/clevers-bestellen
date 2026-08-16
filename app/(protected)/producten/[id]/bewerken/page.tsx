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
    });

  if (!product) {
    notFound();
  }

  async function opslaan(
    data: ProductFormData
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
      }
    );

    if (!response.ok) {
      throw new Error(
        "Product kon niet worden bijgewerkt."
      );
    }
  }

  return (
    <ProductForm
      initialData={{
        naam: product.naam,

        zoekNaam:
          product.zoekNaam ?? "",

        categorie:
          product.categorie,

        bestelBij:
          product.bestelBij ?? "",

        leverancier:
          product.leverancier ?? "",

        artikelNummer:
          product.artikelNummer ??
          "",

        barcode:
          product.barcode ?? "",

        eenheid:
          product.eenheid ?? "",

        standaardBuffer:
          product.standaardBuffer,

        volgorde:
          product.volgorde,

        actief:
          product.actief,

        opmerking:
          product.opmerking ?? "",

        alternatieveNamen:
          product.alternatieveNamen ??
          null,
      }}
      onSubmit={opslaan}
    />
  );
}