import type {
  Artikel,
  BestelAdvies,
  Product,
  Vestiging,
} from "@/types";

function maakVoorraadMap(
  artikelen: Artikel[]
): Map<string, number> {
  const voorraad = new Map<string, number>();

  for (const artikel of artikelen) {
    voorraad.set(
      artikel.id,
      Number.isInteger(artikel.aantal) &&
        artikel.aantal >= 0
        ? artikel.aantal
        : 0
    );
  }

  return voorraad;
}

function berekenBestelAantal(
  geteld: number,
  buffer: number
): number {
  return Math.max(
    0,
    buffer - geteld
  );
}

export function berekenBestelling(
  artikelen: Artikel[],
  producten: Product[],
  vestiging: Vestiging
): BestelAdvies[] {
  const voorraad =
    maakVoorraadMap(artikelen);

  return producten
    .filter(
      (product) =>
        product.actief
    )
    .map(
      (product): BestelAdvies => {
        const geteld =
          voorraad.get(
            product.id
          ) ?? 0;

        const buffer =
          product.buffers[
            vestiging
          ];

        return {
          id: product.id,

          naam: product.naam,

          categorie:
            product.categorie,

          bestelBij:
            product.bestelBij,

          bestelGroep:
            product.bestelGroep,

          volgorde:
            product.volgorde,

          geteld,

          buffer,

          bestellen:
            berekenBestelAantal(
              geteld,
              buffer
            ),
        };
      }
    );
}