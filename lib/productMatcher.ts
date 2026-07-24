import { OCRArtikel, Artikel, Product } from "@/types";
import { producten } from "@/data/producten";

function normaliseer(tekst: string): string {
  return tekst
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Snelle lookup
const productLookup = new Map<string, Product>();

for (const product of producten) {
  if (!product.actief) continue;

  productLookup.set(normaliseer(product.naam), product);

  if (product.alternatieveNamen) {
    for (const alternatief of product.alternatieveNamen) {
      productLookup.set(normaliseer(alternatief), product);
    }
  }
}

export function vindProduct(naam: string): Product | undefined {
  return productLookup.get(normaliseer(naam));
}

export function matchProducten(
  artikelen: OCRArtikel[]
): Artikel[] {
  const resultaat = new Map<string, Artikel>();

  for (const artikel of artikelen) {
    const product = vindProduct(artikel.naam);

    if (!product) {
      console.warn(
        `[OCR] Onbekend product ontvangen: "${artikel.naam}"`
      );
      continue;
    }

    const aantal =
      Number.isInteger(artikel.aantal) && artikel.aantal >= 0
        ? artikel.aantal
        : 0;

    if (resultaat.has(product.id)) {
      resultaat.get(product.id)!.aantal += aantal;
      continue;
    }

    resultaat.set(product.id, {
      id: product.id,
      naam: product.naam,
      aantal,
    });
  }

  return [...resultaat.values()];
}