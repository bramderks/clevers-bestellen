import { producten } from "../data/producten";
import { Artikel } from "../types";

interface OCRRegel {
  regel: number;
  aantal: number;
}

export function mapRegels(
  regels: OCRRegel[]
): Artikel[] {
  return producten
    .filter((p) => p.actief)
    .sort((a, b) => a.volgorde - b.volgorde)
    .map((product, index) => {
      const gevonden = regels.find(
        (r) => r.regel === index + 1
      );

      return {
        id: product.id,
        aantal: gevonden?.aantal ?? 0,
      };
    });
}