export type Categorie = "ijs" | "drooggoed";

export interface ArtikelDefinitie {
  naam: string;
  categorie: Categorie;
}

export const artikelen: ArtikelDefinitie[] = [
  // ===== IJS =====

  { naam: "Aardbei", categorie: "ijs" },
  { naam: "Amarena", categorie: "ijs" },
  { naam: "Banaan", categorie: "ijs" },
  { naam: "Bosbes", categorie: "ijs" },
  { naam: "Caramel", categorie: "ijs" },
  { naam: "Chocola", categorie: "ijs" },
  { naam: "Citroen", categorie: "ijs" },
  { naam: "Cookies", categorie: "ijs" },
  { naam: "Crocantino", categorie: "ijs" },
  { naam: "Dark Cookies", categorie: "ijs" },
  { naam: "Don Vito", categorie: "ijs" },
  { naam: "Framboos", categorie: "ijs" },
  { naam: "Hazelnoot", categorie: "ijs" },
  { naam: "Hazelnoot Praline", categorie: "ijs" },
  { naam: "Koffie", categorie: "ijs" },
  { naam: "Malaga", categorie: "ijs" },
  { naam: "Mango", categorie: "ijs" },
  { naam: "Passievrucht", categorie: "ijs" },
  { naam: "Pistache", categorie: "ijs" },
  { naam: "Rood Fruit", categorie: "ijs" },
  { naam: "Smurf", categorie: "ijs" },
  { naam: "Speculoos", categorie: "ijs" },
  { naam: "Stracciatella", categorie: "ijs" },
  { naam: "Truffel", categorie: "ijs" },
  { naam: "Vanille", categorie: "ijs" },
  { naam: "Walnoot", categorie: "ijs" },
  { naam: "Witte Choco Pistache", categorie: "ijs" },
  { naam: "Yoghurt", categorie: "ijs" },
  { naam: "Yoghurt Aardbei", categorie: "ijs" },
  { naam: "Yoghurt Bosvrucht", categorie: "ijs" },

  // ===== OVERIG IJS =====

  { naam: "Slagroom", categorie: "ijs" },

  // ===== DROOGGOED =====

  { naam: "Softijsmix", categorie: "drooggoed" },
  { naam: "Bekers Klein", categorie: "drooggoed" },
  { naam: "Bekers Groot", categorie: "drooggoed" },
  { naam: "Lepels", categorie: "drooggoed" }
];