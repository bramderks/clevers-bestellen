export interface BestelHistorieRegel {
  datum: string;
  vestiging: string;

  productId: string;
  productNaam: string;

  geteld: number;
  buffer: number;
  besteld: number;

  bestelGroep: "ijs" | "drooggoed";
}

export const bestelHistorie: BestelHistorieRegel[] = [];