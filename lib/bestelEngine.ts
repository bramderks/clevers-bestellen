import { Artikel, Product, Vestiging } from "../types";

export interface BestelAdvies {
  id: string;
  naam: string;

  categorie: Product["categorie"];
  bestelBij: Product["bestelBij"];
  bestelGroep: Product["bestelGroep"];

  volgorde: number;

  geteld: number;
  buffer: number;
  bestellen: number;
}

export function berekenBestelling(
  artikelen: Artikel[],
  producten: Product[],
  vestiging: Vestiging
): BestelAdvies[] {
  const voorraad = new Map<string, number>();

  // Getelde voorraad opslaan
  for (const artikel of artikelen) {
    const aantal =
      Number.isInteger(artikel.aantal) && artikel.aantal >= 0
        ? artikel.aantal
        : 0;

    voorraad.set(artikel.id, aantal);
  }

  return producten
    .filter((product) => product.actief)
    .sort((a, b) => a.volgorde - b.volgorde)
    .map((product) => {
      const geteld = voorraad.get(product.id) ?? 0;
      const buffer = product.buffers[vestiging];

      return {
        id: product.id,
        naam: product.naam,

        categorie: product.categorie,
        bestelBij: product.bestelBij,
        bestelGroep: product.bestelGroep,

        volgorde: product.volgorde,

        geteld,
        buffer,

        bestellen: Math.max(0, buffer - geteld),
      };
    });
}