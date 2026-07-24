"use client";

import TelRij from "./TelRij";
import { Product } from "@/types";

interface Props {
  titel: string;
  producten: Product[];
  telling: Record<string, number>;
  onChange: (id: string, waarde: number) => void;
}

export default function TelCategorie({
  titel,
  producten,
  telling,
  onChange,
}: Props) {
  if (producten.length === 0) return null;

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-5">
        {titel}
      </h2>

      <div className="grid grid-cols-[1fr_90px_140px] font-semibold border-b pb-2 mb-2">
        <div>Product</div>
        <div className="text-center">Buffer</div>
        <div className="text-center">Geteld</div>
      </div>

      {producten.map((product) => (
        <TelRij
          key={product.id}
          naam={product.naam}
          buffer={product.buffer}
          aantal={telling[product.id] ?? 0}
          onChange={(waarde) =>
            onChange(product.id, waarde)
          }
        />
      ))}
    </section>
  );
}