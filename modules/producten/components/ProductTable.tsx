"use client";

import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  Table,
} from "@/modules/shared/ui";

import type {
  Product,
} from "../types/product";

interface Props {
  producten: Product[];
}

export default function ProductTable({
  producten,
}: Readonly<Props>) {
  return (
    <Card>
      <Table
        kolommen={[
          {
            key: "naam",
            titel: "Naam",
          },
          {
            key: "categorie",
            titel: "Categorie",
          },
          {
            key: "leverancier",
            titel: "Leverancier",
          },
          {
            key: "buffer",
            titel: "Buffer",
          },
          {
            key: "status",
            titel: "Status",
          },
          {
            key: "acties",
            titel: "",
          },
        ]}
        data={producten}
        render={(product, key) => {
          switch (key) {
            case "naam":
              return product.naam;

            case "categorie":
              return product.categorie;

            case "leverancier":
              return (
                product.leverancier ??
                "-"
              );

            case "buffer":
              return (
                product.standaardBuffer
              );

            case "status":
              return product.actief ? (
                <Badge variant="success">
                  Actief
                </Badge>
              ) : (
                <Badge variant="danger">
                  Inactief
                </Badge>
              );

            case "acties":
              return (
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/producten/${product.id}/bewerken`}
                  >
                    <Button variant="secondary">
                      Bewerken
                    </Button>
                  </Link>
                </div>
              );

            default:
              return null;
          }
        }}
      />
    </Card>
  );
}