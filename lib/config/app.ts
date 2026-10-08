export const APP = {
  naam: "Clevers Bestellen",
  versie: "0.1.0",
  build: "2026.08.04.001",
  databaseVersie: "1.0.0",
  eigenaar: "Iselto B.V.",
  copyright: "© 2026 Iselto B.V.",
  footer: "Uitsluitend bestemd voor geautoriseerde gebruikers en gelicentieerde vestigingen.",
  website: "",
  supportEmail: "bram.derks@outlook.com",
  licentie: "Proprietary",
  intern: true,
  debug: process.env.NODE_ENV !== "production",
} as const;