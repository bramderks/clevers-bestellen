import { Page } from "playwright";

export type CleversVestiging = "Nijmegen" | "Roermond";

function credentialsFor(vestiging: CleversVestiging) {
  const prefix = vestiging.toUpperCase();
  const user = process.env[`CLEVERS_${prefix}_USER`];
  const pass = process.env[`CLEVERS_${prefix}_PASS`];

  // Backwards compatibility: the existing credentials remain usable for Nijmegen
  // until the dedicated Nijmegen variables are configured.
  if (vestiging === "Nijmegen" && (!user || !pass)) {
    return {
      user: process.env.CLEVERS_USER,
      pass: process.env.CLEVERS_PASS,
    };
  }

  if (!user || !pass) {
    throw new Error(`CLEVERS_${prefix}_USER/CLEVERS_${prefix}_PASS ontbreken.`);
  }

  return { user, pass };
}

export async function login(page: Page, vestiging: CleversVestiging) {
  const { user, pass } = credentialsFor(vestiging);

  if (!user || !pass) {
    throw new Error(`Clevers-inloggegevens voor ${vestiging} ontbreken.`);
  }

  await page.goto("https://bestel.clevers.nl/");

  await page.locator('input[name="username"]').fill(user);
  await page.locator('input[name="password"]').fill(pass);

  await page.locator('input[type="submit"]').click();

  await page.waitForLoadState("networkidle");
}
