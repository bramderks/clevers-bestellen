export type Seizoen =
  | "voorseizoen"
  | "seizoen"
  | "naseizoen";

export function bepaalSeizoen(
  datum: Date = new Date()
): Seizoen {
  const maand = datum.getMonth() + 1;

  if (maand >= 5 && maand <= 9) {
    return "seizoen";
  }

  if (maand === 3 || maand === 4) {
    return "voorseizoen";
  }

  return "naseizoen";
}