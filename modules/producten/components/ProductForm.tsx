"use client";

import { useState } from "react";

import {
  Button,
  FormSection,
  Input,
  Select,
  Textarea,
} from "@/modules/shared/ui";

import type { ProductFormData } from "../types/product";

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

      categorieId:
        initialData?.categorieId ?? "",

      leverancierId:
        initialData?.leverancierId ?? "",

      code:
        initialData?.code ?? "",

      omschrijving:
        initialData?.omschrijving ?? "",

      type:
        initialData?.type ?? "",

      bestelEenheid:
        initialData?.bestelEenheid ?? "",

      bestelAantal:
        initialData?.bestelAantal ?? 1,

      buffer:
        initialData?.buffer ?? 0,

      minimumVoorraad:
        initialData?.minimumVoorraad ?? 0,

      maximumVoorraad:
        initialData?.maximumVoorraad ?? null,

      vitrineProduct:
        initialData?.vitrineProduct ?? false,

      seizoensProduct:
        initialData?.seizoensProduct ?? false,

      bestelbaar:
        initialData?.bestelbaar ?? true,

      actief:
        initialData?.actief ?? true,

      volgorde:
        initialData?.volgorde ?? 0,
    });

  function wijzig<K extends keyof ProductFormData>(
    veld: K,
    waarde: ProductFormData[K],
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
          label="Productcode"
          value={form.code ?? ""}
          onChange={(e) =>
            wijzig(
              "code",
              e.target.value,
            )
          }
        />

        <Input
          label="Type"
          value={form.type}
          onChange={(e) =>
            wijzig(
              "type",
              e.target.value,
            )
          }
        />

        <Input
          label="Besteleenheid"
          value={
            form.bestelEenheid ?? ""
          }
          onChange={(e) =>
            wijzig(
              "bestelEenheid",
              e.target.value,
            )
          }
        />

        <Input
          type="number"
          label="Bestelaantal"
          value={form.bestelAantal}
          min={1}
          onChange={(e) =>
            wijzig(
              "bestelAantal",
              Number(e.target.value) || 1,
            )
          }
        />

        <Input
          type="number"
          label="Buffer"
          value={form.buffer}
          min={0}
          onChange={(e) =>
            wijzig(
              "buffer",
              Number(e.target.value) || 0,
            )
          }
        />

        <Input
          type="number"
          label="Minimumvoorraad"
          value={form.minimumVoorraad}
          min={0}
          onChange={(e) =>
            wijzig(
              "minimumVoorraad",
              Number(e.target.value) || 0,
            )
          }
        />

        <Input
          type="number"
          label="Maximumvoorraad"
          value={
            form.maximumVoorraad ?? ""
          }
          min={0}
          onChange={(e) => {
            const waarde =
              e.target.value;

            wijzig(
              "maximumVoorraad",
              waarde === ""
                ? null
                : Number(waarde),
            );
          }}
        />

        <Input
          type="number"
          label="Volgorde"
          value={form.volgorde}
          min={0}
          onChange={(e) =>
            wijzig(
              "volgorde",
              Number(e.target.value) || 0,
            )
          }
        />

        <Textarea
          label="Omschrijving"
          value={
            form.omschrijving ?? ""
          }
          onChange={(e) =>
            wijzig(
              "omschrijving",
              e.target.value,
            )
          }
        />

        <Select
          label="Vitrineproduct"
          value={
            form.vitrineProduct
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
              "vitrineProduct",
              e.target.value === "true",
            )
          }
        />

        <Select
          label="Seizoensproduct"
          value={
            form.seizoensProduct
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
              "seizoensProduct",
              e.target.value === "true",
            )
          }
        />

        <Select
          label="Bestelbaar"
          value={
            form.bestelbaar
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
              "bestelbaar",
              e.target.value === "true",
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
              e.target.value === "true",
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