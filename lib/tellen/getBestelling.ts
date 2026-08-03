import type {
  BestelAdvies,
} from "@/types";

interface Resultaat {
  ijsBestelling: BestelAdvies[];
  drooggoedBestelling: BestelAdvies[];
  totaalIJs: number;
  totaalDrooggoed: number;
}

export function getBestelling(
  advies: BestelAdvies[]
): Resultaat {
  const ijsBestelling =
    advies
      .filter(
        (regel) =>
          regel.bestelGroep ===
          "ijs"
      )
      .sort((a, b) =>
        a.naam.localeCompare(
          b.naam,
          "nl"
        )
      );

  const drooggoedBestelling =
    advies
      .filter(
        (regel) =>
          regel.bestelGroep ===
          "drooggoed"
      )
      .sort((a, b) =>
        a.naam.localeCompare(
          b.naam,
          "nl"
        )
      );

  const totaalIJs =
    ijsBestelling.reduce(
      (totaal, regel) =>
        totaal +
        regel.bestellen,
      0
    );

  const totaalDrooggoed =
    drooggoedBestelling.reduce(
      (totaal, regel) =>
        totaal +
        regel.bestellen,
      0
    );

  return {
    ijsBestelling,
    drooggoedBestelling,
    totaalIJs,
    totaalDrooggoed,
  };
}