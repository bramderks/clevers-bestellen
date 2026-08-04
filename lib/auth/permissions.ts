/**
 * Clevers Bestellen
 * © 2026 B. Derks Holding
 *
 * Centrale rechtenstructuur.
 * Alle autorisatie binnen de applicatie verloopt uiteindelijk via dit bestand.
 */

export const Rollen = {
  PLATFORM_BEHEERDER: "platform_beheerder",
  EIGENAAR: "eigenaar",
  FRANCHISENEMER: "franchisenemer",
  VESTIGINGSMANAGER: "vestigingsmanager",
  FLOORMANAGER: "floormanager",
  MEDEWERKER: "medewerker",
} as const;

export type Rol =
  (typeof Rollen)[keyof typeof Rollen];

export const Rechten = {
  DASHBOARD_BEKIJKEN: "dashboard_bekijken",

  TELLING_AANMAKEN: "telling_aanmaken",
  TELLING_BEWERKEN: "telling_bewerken",

  BESTELLING_BEKIJKEN: "bestelling_bekijken",
  BESTELLING_AANMAKEN: "bestelling_aanmaken",
  BESTELLING_VERWIJDEREN: "bestelling_verwijderen",

  PRODUCTEN_BEKIJKEN: "producten_bekijken",
  PRODUCTEN_BEWERKEN: "producten_bewerken",

  MEDEWERKERS_BEKIJKEN: "medewerkers_bekijken",
  MEDEWERKERS_BEWERKEN: "medewerkers_bewerken",

  PLANNING_BEKIJKEN: "planning_bekijken",
  PLANNING_BEWERKEN: "planning_bewerken",

  HISTORIE_BEKIJKEN: "historie_bekijken",

  INSTELLINGEN_BEHEREN: "instellingen_beheren",

  VESTIGINGEN_BEHEREN: "vestigingen_beheren",

  PLATFORM_BEHEREN: "platform_beheren",
} as const;

export type Recht =
  (typeof Rechten)[keyof typeof Rechten];

export const RolRechten: Record<Rol, Recht[]> = {
  [Rollen.PLATFORM_BEHEERDER]: Object.values(Rechten),

  [Rollen.EIGENAAR]: Object.values(Rechten),

  [Rollen.FRANCHISENEMER]: [
    Rechten.DASHBOARD_BEKIJKEN,
    Rechten.TELLING_AANMAKEN,
    Rechten.TELLING_BEWERKEN,
    Rechten.BESTELLING_BEKIJKEN,
    Rechten.BESTELLING_AANMAKEN,
    Rechten.PRODUCTEN_BEKIJKEN,
    Rechten.PRODUCTEN_BEWERKEN,
    Rechten.MEDEWERKERS_BEKIJKEN,
    Rechten.MEDEWERKERS_BEWERKEN,
    Rechten.PLANNING_BEKIJKEN,
    Rechten.PLANNING_BEWERKEN,
    Rechten.HISTORIE_BEKIJKEN,
  ],

  [Rollen.VESTIGINGSMANAGER]: [
    Rechten.DASHBOARD_BEKIJKEN,
    Rechten.TELLING_AANMAKEN,
    Rechten.TELLING_BEWERKEN,
    Rechten.BESTELLING_BEKIJKEN,
    Rechten.BESTELLING_AANMAKEN,
    Rechten.PRODUCTEN_BEKIJKEN,
    Rechten.MEDEWERKERS_BEKIJKEN,
    Rechten.PLANNING_BEKIJKEN,
    Rechten.PLANNING_BEWERKEN,
    Rechten.HISTORIE_BEKIJKEN,
  ],

  [Rollen.FLOORMANAGER]: [
    Rechten.DASHBOARD_BEKIJKEN,
    Rechten.TELLING_AANMAKEN,
    Rechten.BESTELLING_BEKIJKEN,
    Rechten.BESTELLING_AANMAKEN,
    Rechten.PRODUCTEN_BEKIJKEN,
    Rechten.PLANNING_BEKIJKEN,
    Rechten.HISTORIE_BEKIJKEN,
  ],

  [Rollen.MEDEWERKER]: [
    Rechten.TELLING_AANMAKEN,
    Rechten.BESTELLING_BEKIJKEN,
    Rechten.PRODUCTEN_BEKIJKEN,
  ],
};

/**
 * Controleert of een rol een bepaald recht bezit.
 */
export function heeftRecht(
  rol: Rol,
  recht: Recht,
): boolean {
  return RolRechten[rol].includes(recht);
}