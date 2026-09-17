import { openBrowser } from "./browser";
import { login, CleversVestiging } from "./login";
import { vulBestelling, BestelRegel } from "./bestelling";

export async function verstuurBestelling(
  vestiging: CleversVestiging,
  regels: BestelRegel[]
) {
  const { browser, page } = await openBrowser();

  await login(page, vestiging);

  await vulBestelling(page, regels);

  // later:
  // await page.locator("input[type='submit']").click();

  return { browser, page };
}
