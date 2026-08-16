export interface VerkoopHistorie {
  datum: Date;
  vestigingId: string;
  productId: string;
  aantal: number;
  omzet: number;
  temperatuur?: number;
  week: number;
  maand: number;
}

export async function historieVanProduct(
  _vestigingId: string,
  _productId: string,
): Promise<VerkoopHistorie[]> {
  return [];
}

export async function gemiddeldeVerkoop(
  _vestigingId: string,
  _productId: string,
): Promise<number> {
  return 0;
}

export async function gemiddeldeOmzet(
  _vestigingId: string,
): Promise<number> {
  return 0;
}

export async function verkoopLaatsteDagen(
  _vestigingId: string,
  _productId: string,
  _dagen: number,
): Promise<VerkoopHistorie[]> {
  return [];
}