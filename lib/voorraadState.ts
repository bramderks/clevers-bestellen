import { producten } from "@/data/producten";

export type Vestiging = "nijmegen" | "roermond" | "";

export interface VoorraadTelling {
  vestiging: Vestiging;
  datum: string;
  medewerker: string;

  voorraad: Record<string, number>;
}

function vandaag(): string {
  return new Date().toISOString().split("T")[0];
}

export function maakLegeTelling(): VoorraadTelling {
  const voorraad: Record<string, number> = {};

  for (const product of producten) {
    if (!product.actief) continue;

    voorraad[product.id] = 0;
  }

  return {
    vestiging: "",
    datum: vandaag(),
    medewerker: "",
    voorraad,
  };
}

export function zetVestiging(
  telling: VoorraadTelling,
  vestiging: Vestiging
): VoorraadTelling {
  return {
    ...telling,
    vestiging,
  };
}

export function zetDatum(
  telling: VoorraadTelling,
  datum: string
): VoorraadTelling {
  return {
    ...telling,
    datum,
  };
}

export function zetMedewerker(
  telling: VoorraadTelling,
  medewerker: string
): VoorraadTelling {
  return {
    ...telling,
    medewerker,
  };
}

export function zetVoorraad(
  telling: VoorraadTelling,
  productId: string,
  aantal: number
): VoorraadTelling {
  return {
    ...telling,
    voorraad: {
      ...telling.voorraad,
      [productId]: Math.max(0, aantal),
    },
  };
}

export function verhoogVoorraad(
  telling: VoorraadTelling,
  productId: string
): VoorraadTelling {
  const huidig = telling.voorraad[productId] ?? 0;

  return zetVoorraad(
    telling,
    productId,
    huidig + 1
  );
}

export function verlaagVoorraad(
  telling: VoorraadTelling,
  productId: string
): VoorraadTelling {
  const huidig = telling.voorraad[productId] ?? 0;

  return zetVoorraad(
    telling,
    productId,
    Math.max(0, huidig - 1)
  );
}

export function resetTelling(): VoorraadTelling {
  return maakLegeTelling();
}