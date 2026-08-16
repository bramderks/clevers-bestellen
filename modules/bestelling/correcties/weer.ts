export interface WeerGegevens {
  temperatuur: number;

  gevoelstemperatuur?: number;

  zonuren?: number;

  neerslag?: number;

  windkracht?: number;

  luchtvochtigheid?: number;
}

export interface WeerCorrectie {
  factor: number;

  reden: string[];
}

export function berekenWeerCorrectie(
  weer: WeerGegevens,
): WeerCorrectie {
  let factor = 1;

  const reden: string[] = [];

  if (weer.temperatuur >= 30) {
    factor += 0.30;
    reden.push("Extreem warm");
  } else if (weer.temperatuur >= 25) {
    factor += 0.20;
    reden.push("Warm");
  } else if (weer.temperatuur >= 20) {
    factor += 0.10;
    reden.push("Zomers");
  } else if (weer.temperatuur <= 5) {
    factor -= 0.20;
    reden.push("Koud");
  }

  if (
    weer.zonuren !== undefined &&
    weer.zonuren >= 8
  ) {
    factor += 0.10;
    reden.push("Veel zon");
  }

  if (
    weer.neerslag !== undefined &&
    weer.neerslag >= 5
  ) {
    factor -= 0.15;
    reden.push("Regen");
  }

  if (
    weer.windkracht !== undefined &&
    weer.windkracht >= 6
  ) {
    factor -= 0.05;
    reden.push("Harde wind");
  }

  if (
    weer.luchtvochtigheid !== undefined &&
    weer.luchtvochtigheid >= 90
  ) {
    factor -= 0.05;
    reden.push("Vochtig");
  }

  return {
    factor: Number(factor.toFixed(2)),
    reden,
  };
}

export function pasWeerCorrectieToe(
  aantal: number,
  factor: number,
) {
  return Math.max(
    0,
    Math.round(aantal * factor),
  );
}