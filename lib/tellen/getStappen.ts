import type {
  TelCategorie,
  Vestiging,
} from "@/types";

export interface TelStap {
  key: TelCategorie | "regulier";
  titel: string;
}

const STAPPEN_ROERMOND: TelStap[] = [
  {
    key: "hardlopers",
    titel: "Hardlopers",
  },
  {
    key: "middenlopers",
    titel: "Middenlopers",
  },
  {
    key: "zachtlopers",
    titel: "Zachtlopers",
  },
  {
    key: "speciaalsmaken",
    titel: "Speciaalsmaken",
  },
  {
    key: "drooggoed",
    titel: "Drooggoed",
  },
];

const STAPPEN_NIJMEGEN: TelStap[] = [
  {
    key: "regulier",
    titel: "Regulier ijs",
  },
  {
    key: "speciaalsmaken",
    titel: "Speciaalsmaken",
  },
  {
    key: "drooggoed",
    titel: "Drooggoed",
  },
];

export function getStappen(
  vestiging: Vestiging
): TelStap[] {
  return vestiging === "nijmegen"
    ? STAPPEN_NIJMEGEN
    : STAPPEN_ROERMOND;
}