import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import {
  ROUTES, TIER1_WIDTHS, HEAVY_WIDTHS, HEIGHT,
  STYLE_PROPS, PSEUDO_PROPS, STATE_TARGETS as FALLBACK_TARGETS,
} from "./config.mjs";

// Resolved against this file, not the cwd: run.sh cds into whichever tree it
// is serving, and a pinned baseline worktree does not carry the harness. A
// cwd-relative path there silently falls back to the hardcoded targets and
// compares 16 selectors against 54.
const DISCOVERED = new URL("./state-targets.json", import.meta.url);
const STATE_TARGETS = existsSync(DISCOVERED)
  ? JSON.parse(readFileSync(DISCOVERED, "utf8"))
  : FALLBACK_TARGETS;
import { preparePage, settle } from "./freeze.mjs";
import { collect } from "./probe.mjs";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};

const URL_BASE = arg("url", "http://localhost:3101").replace(/\/$/, "");
const OUT = arg("out", "scripts/parity/baseline/run");
const TIERS = arg("tiers", "1,2,3,4").split(",").map(Number);
const CONC = Number(arg("concurrency", "4"));
const ONLY = arg("routes", "").split(",").filter(Boolean);

const routes = ONLY.length ? ONLY : ROUTES;
const slug = (r) => (r === "/" ? "root" : r.replace(/^\//, "").replace(/\//g, "_"));

async function pool(items, n, fn) {
  const q = [...items];
  let done = 0;
  const total = items.length;
  await Promise.all(
    Array.from({ length: Math.min(n, q.length) }, async () => {
      while (q.length) {
        const it = q.shift();
        await fn(it);
        done++;
        if (done % 25 === 0 || done === total) {
          process.stdout.write(`  ${done}/${total}\n`);
        }
      }
    }),
  );
}

const write = async (p, data) => {
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, data);
};

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });

  const newPage = async (width) => {
    const page = await ctx.newPage();
    await preparePage(page);
    await page.setViewportSize({ width, height: HEIGHT });
    return page;
  };

  const load = async (page, route, opts) => {
    const res = await page.goto(URL_BASE + route, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await settle(page, opts);
    return res?.status() ?? 0;
  };

  if (TIERS.includes(1)) {
    console.log(`tier1: ${routes.length} routes x ${TIER1_WIDTHS.length} widths`);
    const jobs = [];
    for (const route of routes) for (const width of TIER1_WIDTHS) jobs.push({ route, width });
    await pool(jobs, CONC, async ({ route, width }) => {
      const page = await newPage(width);
      try {
        const status = await load(page, route);
        const data = await page.evaluate(collect, {
          styleProps: STYLE_PROPS,
          pseudoProps: PSEUDO_PROPS,
        });
        await write(
          join(OUT, "tier1", `${slug(route)}@${width}.json`),
          JSON.stringify({ route, width, status, ...data }),
        );
      } finally {
        await page.close();
      }
    });
  }

  if (TIERS.includes(2)) {
    console.log(`tier2: ${routes.length} routes x ${HEAVY_WIDTHS.length} widths (png)`);
    const jobs = [];
    for (const route of routes) for (const width of HEAVY_WIDTHS) jobs.push({ route, width });
    await pool(jobs, CONC, async ({ route, width }) => {
      const page = await newPage(width);
      try {
        await load(page, route, { forPixels: true });
        const buf = await page.screenshot({ fullPage: true });
        await write(join(OUT, "tier2", `${slug(route)}@${width}.png`), buf);
      } finally {
        await page.close();
      }
    });
  }

  if (TIERS.includes(3)) {
    console.log(`tier3: ${STATE_TARGETS.length} state targets`);
    const results = [];
    await pool(STATE_TARGETS, 2, async (t) => {
      if (ONLY.length && !ONLY.includes(t.route)) return;
      const page = await newPage(1440);
      try {
        await load(page, t.route);
        const el = page.locator(t.selector).first();
        const n = await page.locator(t.selector).count();
        if (!n) {
          results.push({ ...t, missing: true });
          return;
        }
        if (t.action === "hover") await el.hover({ timeout: 5000 }).catch(() => {});
        if (t.action === "focus") await el.focus({ timeout: 5000 }).catch(() => {});
        if (t.action === "click") await el.click({ timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(150);
        const style = await el.evaluate((node, props) => {
          const cs = getComputedStyle(node);
          const o = {};
          for (const p of props) o[p] = cs[p];
          const b = getComputedStyle(node, "::before");
          if (b.content && b.content !== "none") o["__before_bg"] = b.backgroundColor;
          return o;
        }, STYLE_PROPS);
        results.push({ ...t, count: n, style });
      } catch (e) {
        results.push({ ...t, error: String(e).slice(0, 200) });
      } finally {
        await page.close();
      }
    });
    results.sort((a, b) => (a.route + a.selector + a.action).localeCompare(b.route + b.selector + b.action));
    await write(join(OUT, "tier3", "states.json"), JSON.stringify(results, null, 2));
  }

  if (TIERS.includes(4)) {
    console.log("tier4: font variables + redirect");
    const fonts = [];
    for (const route of routes) {
      const page = await newPage(1440);
      try {
        const status = await load(page, route);
        const data = await page.evaluate(collect, {
          styleProps: ["fontFamily"],
          pseudoProps: [],
        });
        fonts.push({
          route,
          status,
          fontVars: data.fontVars,
          serifLeak: data.serifLeak,
          empty: Object.entries(data.fontVars).filter(([, v]) => !v).map(([k]) => k),
        });
      } finally {
        await page.close();
      }
    }
    const page = await newPage(1440);
    const r = await page.goto(URL_BASE + "/homepage-v2", { waitUntil: "domcontentloaded" });
    const redirect = { finalUrl: page.url(), status: r?.status() ?? 0 };
    await page.close();
    await write(join(OUT, "tier4", "fonts.json"), JSON.stringify({ fonts, redirect }, null, 2));
  }

  await browser.close();
  console.log(`captured -> ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
