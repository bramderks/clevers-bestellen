"use client";

import { getProducten } from "@/lib/productService";

export default function CategorieTelling({
  categorie,
}: {
  categorie: string;
}) {
  const producten = getProducten(categorie as any);

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8 capitalize">
        {categorie}
      </h1>

      {producten.map((product) => (
        <div
          key={product.id}
          className="mb-8 border-b pb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {product.naam}
          </h2>

          <div className="flex gap-2 flex-wrap">

            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                className="w-14 h-14 rounded-lg border text-xl"
              >
                {i}
              </button>
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}