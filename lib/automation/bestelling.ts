import { Page } from "playwright";

export interface BestelRegel {
  naam: string;
  aantal: number;
}

export async function vulBestelling(
  page: Page,
  regels: BestelRegel[]
) {
  await page.goto("https://bestel.clevers.nl/bestellen/");

  await page.waitForLoadState("networkidle");

  for (const regel of regels) {
    const label = page.locator(`label:has-text("${regel.naam}")`);

    const inputId = await label.getAttribute("for");

    if (!inputId) {
      console.log(`${regel.naam} niet gevonden`);
      continue;
    }

    await page.locator(`#${inputId}`).fill(regel.aantal.toString());

    console.log(`${regel.naam}: ${regel.aantal}`);
  }
}