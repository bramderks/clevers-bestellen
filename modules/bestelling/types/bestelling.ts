export interface TelRegel {
  productId: string;

  geteld: number;
}

export interface BufferRegel {
  productId: string;

  buffer: number;

  minimumVoorraad: number | null;

  maximaleVoorraad: number | null;
}

export interface BestelRegel {
  productId: string;

  geteld: number;

  buffer: number;

  besteld: number;

  minimumVoorraad: number | null;

  maximaleVoorraad: number | null;
}

export interface BestelAdviesRegel
  extends BestelRegel {
  advies: number;

  reden: string;
}