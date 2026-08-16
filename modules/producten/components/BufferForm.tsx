"use client";

import { useState } from "react";

import {
  Button,
  FormSection,
  Input,
  Select,
} from "@/modules/shared/ui";

interface Product {
  id: string;
  naam: string;
}

interface Vestiging {
  id: string;
  naam: string;
}

export interface BufferFormData {
  productId: string;
  vestigingId: string;
  buffer: number;
  minimumVoorraad: number;
  maximaleVoorraad: number;
}

interface Props {
  producten: Product[];
  vestigingen: Vestiging[];
  initialData?: Partial<BufferFormData>;
  onSubmit: (
    data: BufferFormData
  ) => Promise<void>;
}

export default function BufferForm({
  producten,
  vestigingen,
  initialData,
  onSubmit,
}: Readonly<Props>) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<BufferFormData>({
      productId:
        initialData?.productId ?? "",

      vestigingId:
        initialData?.vestigingId ?? "",

      buffer:
        initialData?.buffer ?? 0,

      minimumVoorraad:
        initialData?.minimumVoorraad ??
        0,

      maximaleVoorraad:
        initialData?.maximaleVoorraad ??
        0,
    });

  function wijzig(
    veld: keyof BufferFormData,
    waarde: string | number
  ) {
    setForm((vorige) => ({
      ...vorige,
      [veld]: waarde,
    }));
  }

  async function submit(
    e: React.FormEvent<HTMLFormElement>
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
      <FormSection titel="Buffer">

        <Select
          label="Vestiging"
          value={form.vestigingId}
          opties={vestigingen.map(
            (vestiging) => ({
              waarde: vestiging.id,
              label: vestiging.naam,
            })
          )}
          onChange={(e) =>
            wijzig(
              "vestigingId",
              e.target.value
            )
          }
        />

        <Select
          label="Product"
          value={form.productId}
          opties={producten.map(
            (product) => ({
              waarde: product.id,
              label: product.naam,
            })
          )}
          onChange={(e) =>
            wijzig(
              "productId",
              e.target.value
            )
          }
        />

        <Input
          type="number"
          label="Buffer"
          value={form.buffer}
          onChange={(e) =>
            wijzig(
              "buffer",
              Number(e.target.value)
            )
          }
        />

        <Input
          type="number"
          label="Minimum voorraad"
          value={form.minimumVoorraad}
          onChange={(e) =>
            wijzig(
              "minimumVoorraad",
              Number(e.target.value)
            )
          }
        />

        <Input
          type="number"
          label="Maximum voorraad"
          value={form.maximaleVoorraad}
          onChange={(e) =>
            wijzig(
              "maximaleVoorraad",
              Number(e.target.value)
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