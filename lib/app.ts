import { APP_INFO } from "@/lib/version";

export const APP = {
  ...APP_INFO,

  licentie: "Proprietary",

  copyright:
    "© 2026 B. Derks Holding. Alle rechten voorbehouden.",

  footer:
    "Uitsluitend bestemd voor geautoriseerde gebruikers en gelicentieerde vestigingen.",

  intern: true,
} as const;

export function appInfo() {
  return APP;
}