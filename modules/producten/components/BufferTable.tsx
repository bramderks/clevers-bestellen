"use client";

import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  Table,
} from "@/modules/shared/ui";

interface Buffer {
  id: string;

  buffer: number;

  minimumVoorraad: number | null;

  maximaleVoorraad: number | null;

  vestiging: {
    id: string;
    naam: string;
  };

  product: {
    id: string;
    naam: string;
    categorie: string;
    actief: boolean;
  };
}

interface Props {
  buffers: Buffer[];
}

export default function BufferTable({
  buffers,
}: Readonly<Props>) {
  return (
    <Card>
      <Table
        kolommen={[
          {
            key: "vestiging",
            titel: "Vestiging",
          },
          {
            key: "product",
            titel: "Product",
          },
          {
            key: "categorie",
            titel: "Categorie",
          },
          {
            key: "buffer",
            titel: "Buffer",
          },
          {
            key: "minimum",
            titel: "Minimum",
          },
          {
            key: "maximum",
            titel: "Maximum",
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
        data={buffers}
        render={(buffer, key) => {
          switch (key) {
            case "vestiging":
              return buffer.vestiging.naam;

            case "product":
              return buffer.product.naam;

            case "categorie":
              return buffer.product.categorie;

            case "buffer":
              return buffer.buffer;

            case "minimum":
              return (
                buffer.minimumVoorraad ??
                "-"
              );

            case "maximum":
              return (
                buffer.maximaleVoorraad ??
                "-"
              );

            case "status":
              return buffer.product.actief ? (
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
                <Link
                  href={`/producten/buffers/${buffer.id}`}
                >
                  <Button variant="secondary">
                    Bewerken
                  </Button>
                </Link>
              );

            default:
              return null;
          }
        }}
      />
    </Card>
  );
}