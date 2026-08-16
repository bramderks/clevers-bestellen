export interface SeizoensInstellingen {
  maand: number;

  temperatuur?: number;

  vakantie?: boolean;

  evenement?: boolean;
}

export interface CorrectieResultaat {
  factor: number;

  reden: string;
}

export function bepaalSeizoensFactor({
  maand,
  temperatuur,
  vakantie = false,
  evenement = false,
}: SeizoensInstellingen): CorrectieResultaat {
  let factor = 1;

  let reden = "Normaal";

  switch (maand) {
    case 12:
    case 1:
    case 2:
      factor = 0.65;
      reden = "Winter";
      break;

    case 3:
    case 4:
      factor = 0.85;
      reden = "Voorseizoen";
      break;

    case 5:
    case 6:
      factor = 1.10;
      reden = "Seizoensstart";
      break;

    case 7:
    case 8:
      factor = 1.35;
      reden = "Hoogseizoen";
      break;

    case 9:
      factor = 1.00;
      reden = "Nazomer";
      break;

    case 10:
    case 11:
      factor = 0.80;
      reden = "Naseizoen";
      break;
  }

  if (temperatuur !== undefined) {
    if (temperatuur >= 30) {
      factor += 0.30;
      reden += " + Hitte";
    } else if (temperatuur >= 25) {
      factor += 0.20;
      reden += " + Warm";
    } else if (temperatuur <= 5) {
      factor -= 0.20;
      reden += " + Koud";
    }
  }

  if (vakantie) {
    factor += 0.10;
    reden += " + Vakantie";
  }

  if (evenement) {
    factor += 0.15;
    reden += " + Evenement";
  }

  return {
    factor: Number(factor.toFixed(2)),
    reden,
  };
}

export function pasSeizoensCorrectieToe(
  aantal: number,
  factor: number,
) {
  return Math.max(
    0,
    Math.round(aantal * factor),
  );
}