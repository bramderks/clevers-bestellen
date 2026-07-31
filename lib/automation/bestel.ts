import { Page } from "playwright";

export async function vulProduct(
  page: Page,
  naam: string,
  aantal: number
) {
  const label = page.locator(`label:text-is("${naam}")`);

  const inputId = await label.getAttribute("for");

  if (!inputId) {
    console.log(`${naam} niet gevonden`);
    return;
  }

  await page.locator(`#${inputId}`).fill(String(aantal));
}