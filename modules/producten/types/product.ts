export interface Product {
  id: string;

  categorieId: string;
  leverancierId: string | null;

  code: string | null;

  naam: string;
  omschrijving: string | null;

  type: string;

  bestelEenheid: string | null;
  bestelAantal: number;

  buffer: number;
  minimumVoorraad: number;
  maximumVoorraad: number | null;

  vitrineProduct: boolean;
  seizoensProduct: boolean;
  bestelbaar: boolean;
  actief: boolean;

  volgorde: number;

  aangemaaktOp: Date;
  gewijzigdOp: Date;
}

export interface ProductFormData {
  naam: string;

  categorieId: string;
  leverancierId: string;

  code: string;
  omschrijving: string;

  type: string;

  bestelEenheid: string;
  bestelAantal: number;

  buffer: number;
  minimumVoorraad: number;
  maximumVoorraad: number | null;

  vitrineProduct: boolean;
  seizoensProduct: boolean;
  bestelbaar: boolean;
  actief: boolean;

  volgorde: number;
}

export interface ProductFilter {
  zoekterm: string;
  categorieId: string;
  leverancierId: string;
  status: string;
}