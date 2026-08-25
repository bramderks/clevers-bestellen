"use client";

import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  Table,
} from "@/modules/shared/ui";

interface Product {
  id: string;
  naam: string;
  actief: boolean;
  buffer: number;
  volgorde: number;

  categorie: {
    id: string;
    naam: string;
    volgorde: number;
  };

  leverancier: {
    id: string;
    naam: string;
  } | null;
}

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
              return product.categorie.naam;

            case "leverancier":
              return (
                product.leverancier?.naam ??
                "-"
              );

            case "buffer":
              return product.buffer;

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