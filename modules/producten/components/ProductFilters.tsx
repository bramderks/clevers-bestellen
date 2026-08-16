"use client";

import {
  Card,
  Input,
  Select,
} from "@/modules/shared/ui";

interface Props {
  zoekterm: string;

  categorie: string;

  leverancier: string;

  status: string;

  categorieen: string[];

  leveranciers: string[];

  onZoektermChange: (
    waarde: string
  ) => void;

  onCategorieChange: (
    waarde: string
  ) => void;

  onLeverancierChange: (
    waarde: string
  ) => void;

  onStatusChange: (
    waarde: string
  ) => void;
}

export default function ProductFilters({
  zoekterm,
  categorie,
  leverancier,
  status,
  categorieen,
  leveranciers,
  onZoektermChange,
  onCategorieChange,
  onLeverancierChange,
  onStatusChange,
}: Readonly<Props>) {
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-4">

        <Input
          label="Zoeken"
          value={zoekterm}
          onChange={(e) =>
            onZoektermChange(
              e.target.value
            )
          }
        />

        <Select
          label="Categorie"
          value={categorie}
          opties={[
            {
              waarde: "",
              label: "Alle",
            },
            ...categorieen.map(
              (categorie) => ({
                waarde: categorie,
                label: categorie,
              })
            ),
          ]}
          onChange={(e) =>
            onCategorieChange(
              e.target.value
            )
          }
        />

        <Select
          label="Leverancier"
          value={leverancier}
          opties={[
            {
              waarde: "",
              label: "Alle",
            },
            ...leveranciers.map(
              (leverancier) => ({
                waarde: leverancier,
                label: leverancier,
              })
            ),
          ]}
          onChange={(e) =>
            onLeverancierChange(
              e.target.value
            )
          }
        />

        <Select
          label="Status"
          value={status}
          opties={[
            {
              waarde: "",
              label: "Alle",
            },
            {
              waarde: "actief",
              label: "Actief",
            },
            {
              waarde: "inactief",
              label: "Inactief",
            },
          ]}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
        />

      </div>
    </Card>
  );
}