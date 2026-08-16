export interface Product {
  id: string;

  naam: string;

  zoekNaam: string | null;

  categorie: string;

  bestelBij: string | null;

  leverancier: string | null;

  artikelNummer: string | null;

  barcode: string | null;

  eenheid: string | null;

  opmerking: string | null;

  actief: boolean;

  standaardBuffer: number;

  volgorde: number;

  alternatieveNamen: unknown | null;

  aangemaaktOp: Date;

  gewijzigdOp: Date;
}

export interface ProductFormData {
  naam: string;

  zoekNaam: string;

  categorie: string;

  bestelBij: string;

  leverancier: string;

  artikelNummer: string;

  barcode: string;

  eenheid: string;

  standaardBuffer: number;

  volgorde: number;

  actief: boolean;

  opmerking: string;

  alternatieveNamen: unknown | null;
}

export interface ProductFilter {
  zoekterm: string;

  categorie: string;

  leverancier: string;

  status: string;
}