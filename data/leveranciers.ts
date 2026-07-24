export interface Leverancier {
  id: string;
  naam: string;
  actief: boolean;
}

export const leveranciers: Leverancier[] = [
  {
    id: "CLEVERS",
    naam: "Clevers IJskeuken",
    actief: true,
  },
  {
    id: "SLIGRO",
    naam: "Sligro",
    actief: true,
  },
  {
    id: "BIDFOOD",
    naam: "Bidfood",
    actief: true,
  },
  {
    id: "MAKRO",
    naam: "Makro",
    actief: true,
  },
];