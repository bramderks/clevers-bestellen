"use client";

import { useRouter } from "next/navigation";

import ProductForm from "@/modules/producten/components/ProductForm";

import type {
  ProductFormData,
} from "@/modules/producten/types/product";

export default function NieuwProductPagina() {
  const router = useRouter();

  async function opslaan(
    data: ProductFormData
  ) {
    try {
      const response = await fetch(
        "/api/producten",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      router.push("/producten");
      router.refresh();
    } catch {
      alert(
        "Product kon niet worden opgeslagen."
      );
    }
  }

  return (
    <ProductForm
      onSubmit={opslaan}
    />
  );
}