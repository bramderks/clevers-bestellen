import type { Product } from "@/types";

import { ijs } from "./ijs";
import { drooggoed } from "./drooggoed";

export const producten: Product[] = [
  ...ijs,
  ...drooggoed,
];

// Controle op dubbele product-id's (alleen tijdens development)
if (process.env.NODE_ENV !== "production") {
  const ids = new Set<string>();

  for (const product of producten) {
    if (ids.has(product.id)) {
      console.warn(
        `Dubbele product-id gevonden: ${product.id}`
      );
    }

    ids.add(product.id);
  }
}