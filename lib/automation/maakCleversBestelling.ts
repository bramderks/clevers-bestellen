import type { BestelAdvies } from "@/types";

export interface CleversRegel {
  naam: string;
  aantal: number;
}

export function maakCleversBestelling(
  advies: BestelAdvies[]
): CleversRegel[] {
  return advies
    .filter(
      (regel) =>
        regel.bestellen > 0
    )
    .map(
      (regel) => ({
        naam:
          regel.naam.toLowerCase(),

        aantal:
          regel.bestellen,
      })
    );
}