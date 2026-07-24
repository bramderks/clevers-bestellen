import { producten } from "@/data/producten";
import type { Product } from "@/types";

const actieveProducten = producten
  .filter((p) => p.actief)
  .sort((a, b) => a.volgorde - b.volgorde);

export function totaalProducten(): number {
  return actieveProducten.length;
}

export function productOpIndex(index: number): Product | null {
  return actieveProducten[index] ?? null;
}

export function volgendeIndex(index: number): number {
  return Math.min(index + 1, actieveProducten.length - 1);
}

export function vorigeIndex(index: number): number {
  return Math.max(index - 1, 0);
}

export function isLaatste(index: number): boolean {
  return index >= actieveProducten.length - 1;
}

export function isEerste(index: number): boolean {
  return index <= 0;
}

export function voortgang(index: number): number {
  return Math.round(((index + 1) / actieveProducten.length) * 100);
}