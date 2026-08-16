export const APP_VERSIE = "1.0.0";
export const BUILD_VERSIE = "2026.08.04";
export const DATABASE_VERSIE = "1.0.0";

export const APP_INFO = {
  naam: "Clevers Bestellen",
  eigenaar: "B. Derks Holding",
  support: "bram.derks@outlook.com",

  appVersie: APP_VERSIE,
  buildVersie: BUILD_VERSIE,
  databaseVersie: DATABASE_VERSIE,
} as const;

export function versieInfo() {
  return {
    appVersie: APP_VERSIE,
    buildVersie: BUILD_VERSIE,
    databaseVersie: DATABASE_VERSIE,
  };
}