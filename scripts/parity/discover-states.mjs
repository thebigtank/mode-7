import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import { ROUTES } from "./config.mjs";
import { preparePage, settle } from "./freeze.mjs";

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const URL_BASE = arg("url", "http://localhost:3102").replace(/\/$/, "");

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const found = [];

for (const route of ROUTES) {
  const page = await ctx.newPage();
  await preparePage(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL_BASE + route, { waitUntil: "domcontentloaded" });
  await settle(page);

  const hits = await page.evaluate(() => {
    const sels = new Set();
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      // CSSStyleRule also exposes an (empty) cssRules in Chrome because of CSS
      // nesting, so selectorText must be read BEFORE recursing -- testing
      // cssRules first swallows every style rule in the sheet.
      const walk = (list) => {
        for (const r of list) {
          if (r.selectorText) {
            for (const part of r.selectorText.split(",")) {
              const s = part.trim();
              if (!/:(hover|focus|focus-within|focus-visible)\b/.test(s)) continue;
              if (/::/.test(s)) continue;
              sels.add(s);
            }
          }
          if (r.cssRules && r.cssRules.length) walk(r.cssRules);
        }
      };
      walk(rules);
    }
    const out = [];
    for (const s of sels) {
      const bare = s.replace(/:(hover|focus-within|focus-visible|focus)\b/g, "").replace(/\s+/g, " ").trim();
      const action = /:focus-within/.test(s) ? "focus" : /:focus/.test(s) ? "focus" : "hover";
      let n = 0;
      try { n = document.querySelectorAll(bare).length; } catch { continue; }
      if (n > 0) out.push({ selector: bare, action, count: n, from: s });
    }
    return out;
  });

  for (const h of hits) found.push({ route, ...h });
  await page.close();
}

await browser.close();

const seen = new Set();
const targets = [];
for (const f of found) {
  const k = `${f.route}|${f.selector}|${f.action}`;
  if (seen.has(k)) continue;
  seen.add(k);
  targets.push({ route: f.route, selector: f.selector, action: f.action });
}
targets.sort((a, b) => (a.route + a.selector + a.action).localeCompare(b.route + b.selector + b.action));

await writeFile(
  "scripts/parity/state-targets.json",
  JSON.stringify(targets, null, 2) + "\n",
);
console.log(`discovered ${targets.length} live interactive selectors across ${ROUTES.length} routes`);
const byRoute = {};
for (const t of targets) byRoute[t.route] = (byRoute[t.route] ?? 0) + 1;
console.log(Object.entries(byRoute).map(([r, n]) => `  ${r.padEnd(16)} ${n}`).join("\n"));
