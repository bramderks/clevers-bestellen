import { chromium, Browser, Page } from "playwright";

export async function openBrowser(): Promise<{
  browser: Browser;
  page: Page;
}> {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });

  const page = await browser.newPage();

  return { browser, page };
}