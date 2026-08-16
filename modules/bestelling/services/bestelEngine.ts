import type {
  Artikel,
  BestelAdvies,
  Product,
  Vestiging,
} from "@/types";

export function berekenBestelling(
  artikelen: Artikel[],
  producten: Product[],
  vestiging: Vestiging,
): BestelAdvies[] {
  return producten
    .filter((product) => product.actief)
    .map((product) => {
      const artikel = artikelen.find(
        (a) => a.id === product.id,
      );

      const geteld = artikel?.aantal ?? 0;
      const buffer =
        product.buffers[vestiging] ?? 0;

      return {
        id: product.id,
        naam: product.naam,
        categorie: product.categorie,
        bestelBij: product.bestelBij,
        bestelGroep: product.bestelGroep,
        volgorde: product.volgorde,
        geteld,
        buffer,
        bestellen: Math.max(
          0,
          buffer - geteld,
        ),
      };
    })
    .sort((a, b) => {
      if (a.bestelGroep !== b.bestelGroep) {
        return a.bestelGroep.localeCompare(
          b.bestelGroep,
        );
      }

      return a.volgorde - b.volgorde;
    });
}

export function totaalBesteld(
  regels: BestelAdvies[],
): number {
  return regels.reduce(
    (totaal, regel) =>
      totaal + regel.bestellen,
    0,
  );
}

export function totaalProducten(
  regels: BestelAdvies[],
): number {
  return regels.length;
}