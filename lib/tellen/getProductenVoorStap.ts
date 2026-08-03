import { producten } from "@/data/producten";

import type {
  Product,
  TelCategorie,
  Vestiging,
} from "@/types";

type StapKey =
  | TelCategorie
  | "regulier";

export function getProductenVoorStap(
  vestiging: Vestiging,
  stapKey: StapKey
): Product[] {
  if (vestiging === "nijmegen") {
    switch (stapKey) {
      case "regulier":
        return producten
          .filter(
            (product) =>
              product.categorie ===
                "ijs" &&
              product.telCategorie !==
                "speciaalsmaken"
          )
          .sort((a, b) =>
            a.naam.localeCompare(
              b.naam,
              "nl"
            )
          );

      case "drooggoed":
        return producten
          .filter(
            (product) =>
              product.categorie ===
              "drooggoed"
          )
          .sort((a, b) =>
            a.naam.localeCompare(
              b.naam,
              "nl"
            )
          );

      case "speciaalsmaken":
        return [];

      default:
        return [];
    }
  }

  return producten
    .filter(
      (product) =>
        product.telCategorie ===
          stapKey &&
        product.id !==
          "speciaalsmaken"
    )
    .sort((a, b) =>
      a.volgorde -
      b.volgorde
    );
}