import Link from "next/link";

import { prisma } from "@/lib/prisma";

import {
  Button,
  PageHeader,
} from "@/modules/shared/ui";

import ProductFilters from "@/modules/producten/components/ProductFilters";
import ProductTable from "@/modules/producten/components/ProductTable";

export default async function ProductenPagina() {
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

  const categorieen =
    [
      ...new Set(
        producten.map(
          (product) =>
            product.categorie
        )
      ),
    ].sort();

  const leveranciers =
    [
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
              leverancier !==
              null
          ),
      ),
    ].sort();

  return (
    <>
      <PageHeader
        titel="Producten"
        omschrijving="Beheer alle producten en leveranciers."
        acties={
          <Link href="/producten/nieuw">
            <Button>
              Nieuw product
            </Button>
          </Link>
        }
      />

      <ProductFilters
        zoekterm=""
        categorie=""
        leverancier=""
        status=""
        categorieen={
          categorieen
        }
        leveranciers={
          leveranciers
        }
        onZoektermChange={() => {}}
        onCategorieChange={() => {}}
        onLeverancierChange={() => {}}
        onStatusChange={() => {}}
      />

      <ProductTable
        producten={
          producten
        }
      />
    </>
  );
}