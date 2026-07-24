import { producten } from "../data/producten";
import { Artikel } from "../types";

export interface ValidatieResultaat {
  geldig: boolean;
  fouten: string[];
}

export function valideerArtikelen(
  artikelen: Artikel[]
): ValidatieResultaat {
  const fouten: string[] = [];

  const actieveProducten = producten.filter((p) => p.actief);

  const geldigeIds = new Set(
    actieveProducten.map((p) => p.id)
  );

  const gevondenIds = new Set<string>();

  for (const artikel of artikelen) {
    // Onbekend product
    if (!geldigeIds.has(artikel.id)) {
      fouten.push(
        `Onbekend product: ${artikel.id}`
      );
      continue;
    }

    // Dubbel product
    if (gevondenIds.has(artikel.id)) {
      fouten.push(
        `Dubbel product: ${artikel.id}`
      );
    } else {
      gevondenIds.add(artikel.id);
    }

    // Negatief aantal
    if (artikel.aantal < 0) {
      fouten.push(
        `${artikel.naam} heeft een negatief aantal`
      );
    }

    // Geen gehele aantallen
    if (!Number.isInteger(artikel.aantal)) {
      fouten.push(
        `${artikel.naam} heeft geen geheel aantal`
      );
    }
  }

  // Ontbrekende producten
  for (const product of actieveProducten) {
    if (!gevondenIds.has(product.id)) {
      fouten.push(
        `Ontbrekend product: ${product.naam}`
      );
    }
  }

  return {
    geldig: fouten.length === 0,
    fouten,
  };
}