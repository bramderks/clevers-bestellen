import type { BestelAdvies } from "@/types";

const STORAGE_KEY =
  "clevers-bestelling";

export interface OpgeslagenBestelling {
  datum: string;
  vestiging: string;
  bestelling: BestelAdvies[];
}

export function bewaarBestelling(
  vestiging: string,
  bestelling: BestelAdvies[]
): void {
  const data: OpgeslagenBestelling = {
    datum:
      new Date().toISOString(),

    vestiging,

    bestelling,
  };

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function laadBestelling():
  | OpgeslagenBestelling
  | null {
  const data =
    sessionStorage.getItem(
      STORAGE_KEY
    );

  if (!data) {
    return null;
  }

  try {
    return JSON.parse(
      data
    ) as OpgeslagenBestelling;
  } catch {
    return null;
  }
}

export function verwijderBestelling(): void {
  sessionStorage.removeItem(
    STORAGE_KEY
  );
}