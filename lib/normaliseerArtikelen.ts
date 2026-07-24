import { producten } from "../data/producten";
import { Artikel, OCRArtikel } from "../types";
import { matchProducten } from "./productMatcher";

export function normaliseerArtikelen(
  artikelen: OCRArtikel[]
): Artikel[] {
  const gematcht = matchProducten(artikelen);

  // Snelle lookup van alle actieve producten
  const actieveProducten = producten
    .filter((p) => p.actief)
    .sort((a, b) => a.volgorde - b.volgorde);

  const productMap = new Map(
    actieveProducten.map((p) => [p.id, p])
  );

  const resultaat = new Map<string, Artikel>();

  // AI-resultaten verwerken
  for (const artikel of gematcht) {
    const product = productMap.get(artikel.id);

    if (!product) continue;

    const bestaand = resultaat.get(product.id);

    if (bestaand) {
      bestaand.aantal += artikel.aantal;
    } else {
      resultaat.set(product.id, {
        id: product.id,
        naam: product.naam,
        aantal: artikel.aantal,
      });
    }
  }

  // Ontbrekende producten toevoegen
  for (const product of actieveProducten) {
    if (!resultaat.has(product.id)) {
      resultaat.set(product.id, {
        id: product.id,
        naam: product.naam,
        aantal: 0,
      });
    }
  }

  // Teruggeven in de juiste volgorde
  return actieveProducten.map(
    (product) => resultaat.get(product.id)!
  );
}