import { openBrowser } from "./browser";
import { login } from "./login";
import { vulBestelling, BestelRegel } from "./bestelling";

export async function verstuurBestelling(regels: BestelRegel[]) {
  const { browser, page } = await openBrowser();

  await login(page);

  await vulBestelling(page, regels);

  // later:
  // await page.locator("input[type='submit']").click();

  return { browser, page };
}