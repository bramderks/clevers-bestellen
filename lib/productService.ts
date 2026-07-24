import { producten } from "@/data/producten";
import type { Product } from "@/types/product";

export type TelCategorie =
  | "hardlopers"
  | "middenlopers"
  | "zachtlopers"
  | "overig";

export function getProducten(categorie: TelCategorie): Product[] {
  return producten
    .filter((p) => p.actief && p.telCategorie === categorie)
    .sort((a, b) => a.volgorde - b.volgorde);
}