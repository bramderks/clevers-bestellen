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

export type Vestiging =
  | "roermond"
  | "nijmegen";

export interface Product {
  id: string;

  naam: string;

  categorie:
    | "ijs"
    | "drooggoed";

  telCategorie: TelCategorie;

  bestelBij: BestelBij;

  bestelGroep: BestelGroep;

  buffers: Record<
    Vestiging,
    number
  >;

  volgorde: number;

  actief: boolean;

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

export interface BestelAdvies {
  id: string;

  naam: string;

  categorie:
    Product["categorie"];

  bestelBij:
    Product["bestelBij"];

  bestelGroep:
    Product["bestelGroep"];

  volgorde: number;

  geteld: number;

  buffer: number;

  bestellen: number;
}

export interface BestelRegel {
  product: Product;

  geteld: number;

  buffer: number;

  bestellen: number;
}

export interface ControleBestelling {
  ijsBestelling: BestelRegel[];

  speciaalsmaken:
    | BestelRegel
    | null;

  slagroom:
    | BestelRegel
    | null;

  drooggoedBestelling:
    BestelRegel[];

  totaalIJs: number;

  totaalDrooggoed: number;
}

export interface OCRResultaat {
  artikelen: OCRArtikel[];

  opmerkingen: string[];
}