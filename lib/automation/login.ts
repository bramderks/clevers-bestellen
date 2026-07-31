import { Page } from "playwright";

export async function login(page: Page) {
  await page.goto("https://bestel.clevers.nl/");

  await page.locator('input[name="username"]').fill(process.env.CLEVERS_USER!);
  await page.locator('input[name="password"]').fill(process.env.CLEVERS_PASS!);

  await page.locator('input[type="submit"]').click();

  await page.waitForLoadState("networkidle");
}