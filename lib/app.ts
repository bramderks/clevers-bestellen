import { APP_INFO } from "@/lib/version";

export const APP = {
  ...APP_INFO,
  licentie: "Proprietary",
  copyright: "© 2026 Iselto B.V.",
  footer: "Uitsluitend bestemd voor geautoriseerde gebruikers en gelicentieerde vestigingen.",
  intern: true,
} as const;

export function appInfo() {
  return APP;
}