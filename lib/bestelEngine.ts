import { BestelAdvies } from "./bestelEngine";

export interface LeverancierGroep {
  bestelBij: string;
  artikelen: BestelAdvies[];
}

export function groepeerLeverancier(
  bestelling: BestelAdvies[]
): LeverancierGroep[] {
  const groepen = new Map<string, BestelAdvies[]>();

  for (const artikel of bestelling) {
    if (artikel.bestellen <= 0) continue;

    const artikelen =
      groepen.get(artikel.bestelBij) ?? [];

    artikelen.push(artikel);

    groepen.set(
      artikel.bestelBij,
      artikelen
    );
  }

  return Array.from(groepen.entries()).map(
    ([bestelBij, artikelen]) => ({
      bestelBij,
      artikelen: artikelen.sort(
        (a, b) => a.volgorde - b.volgorde
      ),
    })
  );
}