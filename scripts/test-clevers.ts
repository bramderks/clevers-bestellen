import { chromium } from "playwright";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

console.log("Werkmap:", process.cwd());
console.log("USER:", process.env.CLEVERS_USER);
console.log("PASS:", process.env.CLEVERS_PASS ? "gevonden" : "NIET gevonden");

async function main() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 150,
  });

  const page = await browser.newPage();

  await page.goto("https://bestel.clevers.nl/");

  await page.locator('input[name="username"]').fill(process.env.CLEVERS_USER!);
  await page.locator('input[name="password"]').fill(process.env.CLEVERS_PASS!);

  await page.locator('input[type="submit"][value="inloggen"]').click();

  // Wacht tot de bestelpagina is geladen
  await page.waitForLoadState("networkidle");

  console.log("Ingelogd!");

  // Test: vul Aardbei
  const aardbei = page.locator('label:has-text("aardbei")');
  const inputId = await aardbei.getAttribute("for");

  if (inputId) {
    await page.locator(`#${inputId}`).fill("5");
    console.log("Aardbei ingevuld");
  }

  await page.pause();
}

main().catch(console.error);