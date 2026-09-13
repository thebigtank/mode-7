import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};

const base = arg("url", "http://localhost:3200");
const routes = arg("routes", "/").split(",");
const widths = arg("widths", "390,1440").split(",").map(Number);
const out = arg("out", "/tmp/shots");
const selector = arg("selector", null);

await mkdir(out, { recursive: true });
const browser = await chromium.launch();

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none!important;transition:none!important}",
    });
    await page.waitForTimeout(700);
    const name = `${route.replace(/\//g, "_") || "_root"}@${width}.png`;
    const target = selector ? await page.$(selector) : page;
    if (!target) {
      console.log(`  MISS ${name}: no element matches ${selector}`);
    } else {
      await target.screenshot({ path: `${out}/${name}`, fullPage: !selector });
      console.log(`  ${out}/${name}`);
    }
    await page.close();
  }
}

await browser.close();
