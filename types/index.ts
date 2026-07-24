export type TelCategorie =
  | "hardlopers"
  | "middenlopers"
  | "zachtlopers"
  | "speciaalsmaken"
  | "drooggoed";

export type BestelBij =
  | "ijskeuken"
  | "drooggoed";

export type BestelGroep =
  | "ijs"
  | "drooggoed";

export interface Product {
  id: string;
  naam: string;

  // Productsoort
  categorie: "ijs" | "drooggoed";

  // Op welke telformulieren komt het product
  telCategorie: TelCategorie;

  // Leverancier
  bestelBij: BestelBij;

  // Op welke bestelling komt het product
  bestelGroep: BestelGroep;

  // Gewenste buffervoorraad
  buffer: number;

  // Sorteervolgorde
  volgorde: number;

  // Product actief?
  actief: boolean;

  // Eventuele alternatieve namen die OCR mag herkennen
  alternatieveNamen?: string[];
}

export interface Artikel {
  id: string;
  naam: string;
  aantal: number;
}

export interface OCRArtikel {
  naam: string;
  aantal: number;
}

export interface BestelRegel {
  product: Product;
  geteld: number;
  bestellen: number;
}

export interface OCRResultaat {
  artikelen: OCRArtikel[];
  opmerkingen: string[];
}