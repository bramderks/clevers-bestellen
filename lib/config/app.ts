export const APP = {
  naam: "Clevers Bestellen",

  versie: "0.1.0",

  /**
   * Buildnummer
   * Formaat:
   * JJJJ.MM.DD.REVISIE
   */
  build: "2026.08.04.001",

  /**
   * Databaseversie
   * Ophogen bij iedere structurele Prisma-migratie.
   */
  databaseVersie: "1.0.0",

  eigenaar: "B. Derks Holding",

  copyright:
    "© 2026 B. Derks Holding. Alle rechten voorbehouden.",

  footer:
    "Uitsluitend bestemd voor geautoriseerde gebruikers en gelicentieerde vestigingen.",

  website: "",

  supportEmail:
    "bram.derks@outlook.com",

  licentie:
    "Proprietary",

  intern: true,

  debug: process.env.NODE_ENV !== "production",
} as const;