"use client";

import { useState } from "react";

import {
  Button,
  FormSection,
  Input,
  Select,
  Textarea,
} from "@/modules/shared/ui";

import type {
  ProductFormData,
} from "../types/product";

interface Props {
  initialData?: Partial<ProductFormData>;

  onSubmit: (
    data: ProductFormData,
  ) => Promise<void>;
}

export default function ProductForm({
  initialData,
  onSubmit,
}: Readonly<Props>) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<ProductFormData>({
      naam:
        initialData?.naam ?? "",

      zoekNaam:
        initialData?.zoekNaam ?? "",

      categorie:
        initialData?.categorie ?? "",

      bestelBij:
        initialData?.bestelBij ?? "",

      leverancier:
        initialData?.leverancier ?? "",

      artikelNummer:
        initialData?.artikelNummer ??
        "",

      barcode:
        initialData?.barcode ?? "",

      eenheid:
        initialData?.eenheid ?? "",

      standaardBuffer:
        initialData?.standaardBuffer ??
        0,

      volgorde:
        initialData?.volgorde ?? 0,

      actief:
        initialData?.actief ?? true,

      opmerking:
        initialData?.opmerking ?? "",

      alternatieveNamen:
        initialData?.alternatieveNamen ??
        null,
    });

  function wijzig(
    veld: keyof ProductFormData,
    waarde:
      | string
      | number
      | boolean
      | null
      | unknown,
  ) {
    setForm((vorige) => ({
      ...vorige,
      [veld]: waarde,
    }));
  }

  async function submit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
    >
      <FormSection titel="Product">

        <Input
          label="Naam"
          value={form.naam}
          onChange={(e) =>
            wijzig(
              "naam",
              e.target.value,
            )
          }
        />

        <Input
          label="Zoeknaam"
          value={form.zoekNaam}
          onChange={(e) =>
            wijzig(
              "zoekNaam",
              e.target.value,
            )
          }
        />

        <Input
          label="Categorie"
          value={form.categorie}
          onChange={(e) =>
            wijzig(
              "categorie",
              e.target.value,
            )
          }
        />

        <Input
          label="Bestellen bij"
          value={form.bestelBij}
          onChange={(e) =>
            wijzig(
              "bestelBij",
              e.target.value,
            )
          }
        />

        <Input
          label="Leverancier"
          value={form.leverancier}
          onChange={(e) =>
            wijzig(
              "leverancier",
              e.target.value,
            )
          }
        />

        <Input
          label="Artikelnummer"
          value={form.artikelNummer}
          onChange={(e) =>
            wijzig(
              "artikelNummer",
              e.target.value,
            )
          }
        />

        <Input
          label="Barcode"
          value={form.barcode}
          onChange={(e) =>
            wijzig(
              "barcode",
              e.target.value,
            )
          }
        />

        <Input
          label="Eenheid"
          value={form.eenheid}
          onChange={(e) =>
            wijzig(
              "eenheid",
              e.target.value,
            )
          }
        />

        <Input
          type="number"
          label="Standaardbuffer"
          value={form.standaardBuffer}
          onChange={(e) =>
            wijzig(
              "standaardBuffer",
              Number(
                e.target.value,
              ),
            )
          }
        />

        <Input
          type="number"
          label="Volgorde"
          value={form.volgorde}
          onChange={(e) =>
            wijzig(
              "volgorde",
              Number(
                e.target.value,
              ),
            )
          }
        />

        <Select
          label="Actief"
          value={
            form.actief
              ? "true"
              : "false"
          }
          opties={[
            {
              waarde: "true",
              label: "Ja",
            },
            {
              waarde: "false",
              label: "Nee",
            },
          ]}
          onChange={(e) =>
            wijzig(
              "actief",
              e.target.value ===
                "true",
            )
          }
        />

        <Textarea
          label="Opmerking"
          value={form.opmerking}
          onChange={(e) =>
            wijzig(
              "opmerking",
              e.target.value,
            )
          }
        />

      </FormSection>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          Opslaan
        </Button>
      </div>
    </form>
  );
}