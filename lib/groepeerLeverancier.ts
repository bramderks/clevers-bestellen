import { BestelAdvies } from "./bestelEngine";

export interface LeverancierGroep {
  leverancierId: string;
  artikelen: BestelAdvies[];
}

export function groepeerLeverancier(
  bestelling: BestelAdvies[]
): LeverancierGroep[] {
  const groepen = new Map<string, BestelAdvies[]>();

  for (const artikel of bestelling) {
    if (artikel.bestellen <= 0) continue;

    const artikelen =
      groepen.get(artikel.leverancierId) ?? [];

    artikelen.push(artikel);

    groepen.set(
      artikel.leverancierId,
      artikelen
    );
  }

  return Array.from(groepen.entries()).map(
    ([leverancierId, artikelen]) => ({
      leverancierId,
      artikelen: artikelen.sort(
        (a, b) => a.volgorde - b.volgorde
      ),
    })
  );
}