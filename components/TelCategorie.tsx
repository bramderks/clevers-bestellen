"use client";

import TelRij from "./TelRij";

import type {
  Product,
  Vestiging,
} from "@/types";

interface Props {
  titel: string;
  producten: Product[];
  telling: Record<string, number>;
  vestiging: Vestiging;
  onChange: (
    id: string,
    waarde: number
  ) => void;
}

export default function TelCategorie({
  titel,
  producten,
  telling,
  vestiging,
  onChange,
}: Props) {
  if (producten.length === 0) {
    return null;
  }

  const totaalGeteld =
    producten.reduce(
      (totaal, product) =>
        totaal +
        (telling[
          product.id
        ] ?? 0),
      0
    );

  return (
    <section className="rounded-xl bg-white p-5 shadow">

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            {titel}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {producten.length} producten
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-6 py-3 text-center">

          <div className="text-sm text-slate-500">
            Totaal geteld
          </div>

          <div className="text-3xl font-bold text-blue-700">
            {totaalGeteld}
          </div>

        </div>

      </div>

      <div className="mb-3 grid grid-cols-[1fr_60px_152px] border-b pb-2 text-sm font-semibold md:grid-cols-[1fr_90px_190px]">

        <div>
          Product
        </div>

        <div className="text-center">
          Buffer
        </div>

        <div className="text-center">
          Geteld
        </div>

      </div>

      <div className="space-y-2">

        {producten.map(
          (product) => (
            <TelRij
              key={product.id}
              naam={product.naam}
              buffer={
                product.buffers[
                  vestiging
                ]
              }
              aantal={
                telling[
                  product.id
                ] ?? 0
              }
              onChange={(
                waarde
              ) =>
                onChange(
                  product.id,
                  waarde
                )
              }
            />
          )
        )}

      </div>

    </section>
  );
}