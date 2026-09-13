import { chromium } from "playwright";
import { preparePage } from "./freeze.mjs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};

const PROPS = [
  "display", "position", "top", "right", "bottom", "left", "zIndex", "width", "height",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "marginTop", "marginBottom",
  "flexDirection", "justifyContent", "alignItems", "gap", "fontFamily", "fontSize", "fontWeight",
  "lineHeight", "letterSpacing", "textTransform", "color", "backgroundColor", "backgroundImage",
  "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderTopColor",
  "borderBottomColor", "borderLeftColor", "borderRadius", "opacity", "transform", "overflow",
  "overflowY", "boxShadow", "pointerEvents", "visibility",
  "outlineColor", "outlineWidth", "outlineStyle", "outlineOffset",
];

export const SCENARIOS = [
  {
    name: "search-select",
    route: "/trade-in",
    width: 1280,
    selectors: [
      ".m7-ss", ".m7-ss__btn", ".m7-ss__value", ".m7-ss__caret", ".m7-ss__scrim",
      ".m7-ss__panel", ".m7-ss__head", ".m7-ss__title", ".m7-ss__close", ".m7-ss__search",
      ".m7-ss__input", ".m7-ss__clear", ".m7-ss__list", ".m7-ss__opt", ".m7-ss__optlabel",
      ".m7-ss__opthint", ".m7-ss__tick", ".m7-ss__empty", ".m7-ss__foot", ".m7-ss__mark",
    ],
    steps: [
      { label: "closed", run: async (p) => { await p.click(".t-catc"); } },
      { label: "btn-hover", run: async (p) => { await p.hover(".m7-ss__btn"); } },
      { label: "btn-focus", run: async (p) => { await p.evaluate(() => document.querySelector(".m7-ss__btn").focus()); } },
      { label: "open", run: async (p) => { await p.click(".m7-ss__btn"); } },
      { label: "opt-hover", run: async (p) => { await p.hover(".m7-ss__opt"); } },
      { label: "input-focus", run: async (p) => { await p.evaluate(() => document.querySelector(".m7-ss__input").focus()); } },
      { label: "filtered", run: async (p) => { await p.fill(".m7-ss__input", "i"); } },
      { label: "no-matches", run: async (p) => { await p.fill(".m7-ss__input", "zzzzqqq"); } },
      { label: "keyboard-cursor", run: async (p) => { await p.fill(".m7-ss__input", ""); await p.keyboard.press("ArrowDown"); } },
      { label: "closed-after-escape", run: async (p) => { await p.keyboard.press("Escape"); } },
    ],
  },
  {
    name: "mega-menu",
    route: "/shop",
    width: 1280,
    root: "body",
    steps: [
      { label: "closed", run: async () => {} },
      { label: "open", run: async (p) => { await p.click('[aria-label="Menu"]'); } },
      { label: "link-hover", run: async (p) => { const l = await p.$(".m7-menu-aside a, .m7-muted-link"); if (l) await l.hover(); } },
      { label: "closed-after-escape", run: async (p) => { await p.keyboard.press("Escape"); } },
    ],
  },
  {
    name: "search-overlay",
    route: "/shop",
    width: 1280,
    root: "body",
    steps: [
      { label: "closed", run: async () => {} },
      { label: "open", run: async (p) => { await p.click('[aria-label="Search"]'); } },
      { label: "typed", run: async (p) => { await p.keyboard.type("pro"); } },
      { label: "closed-after-escape", run: async (p) => { await p.keyboard.press("Escape"); } },
    ],
  },
  {
    name: "checkout-modal",
    route: "/cart",
    width: 1280,
    root: "body",
    steps: [
      { label: "closed", run: async () => {} },
      { label: "open", run: async (p) => { await p.click(".checkout-button"); } },
      { label: "open-narrow", run: async (p) => { await p.setViewportSize({ width: 560, height: 900 }); } },
      { label: "closed-after-escape", run: async (p) => { await p.setViewportSize({ width: 1280, height: 900 }); await p.keyboard.press("Escape"); } },
    ],
  },
];

async function snapshot(page, sc) {
  return page.evaluate(({ selectors, root, PROPS }) => {
    const read = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const st = { _rect: [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)] };
      for (const p of PROPS) st[p] = cs[p];
      return st;
    };
    const out = {};
    if (selectors) {
      for (const s of selectors) {
        const el = document.querySelector(s);
        out[s] = el ? read(el) : null;
      }
      return out;
    }
    const base = document.querySelector(root) ?? document.body;
    const excluded = new Set();
    for (const c of document.querySelectorAll("canvas[data-eq]")) {
      let n = c, top = c;
      while (n && n !== document.body) {
        if (getComputedStyle(n).position === "fixed") top = n;
        n = n.parentElement;
      }
      excluded.add(top);
      for (const d of top.querySelectorAll("*")) excluded.add(d);
    }
    const counts = new Map();
    for (const el of base.querySelectorAll("*")) {
      if (el.closest("svg")) continue;
      if (excluded.has(el)) continue;
      const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 3).join(".");
      const txt = (el.children.length === 0 ? (el.textContent || "").trim().slice(0, 28) : "");
      let k = `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}${txt ? `[${txt}]` : ""}`;
      const n = (counts.get(k) || 0) + 1;
      counts.set(k, n);
      if (n > 1) k += `#${n}`;
      out[k] = read(el);
    }
    return out;
  }, { selectors: sc.selectors ?? null, root: sc.root ?? "body", PROPS });
}

async function capture(url, outFile) {
  const browser = await chromium.launch();
  const result = {};
  for (const sc of SCENARIOS) {
    const page = await browser.newPage({ viewport: { width: sc.width, height: 900 } });
    await preparePage(page);
    await page.goto(url + sc.route, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      animation-duration: 0s !important;
      transition-duration: 0s !important;
      caret-color: transparent !important;
    }` });
    await page.waitForTimeout(800);
    for (const step of sc.steps) {
      try { await step.run(page); } catch (e) { result[`${sc.name}/${step.label}`] = { __error: String(e).slice(0, 200) }; continue; }
      await page.waitForTimeout(350);
      const snap = await snapshot(page, sc);
      result[`${sc.name}/${step.label}`] = snap;
      console.log(`  ${sc.name}/${step.label}: ${Object.values(snap).filter(Boolean).length} elements`);
    }
    await page.close();
  }
  await browser.close();
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(result, null, 1));
  console.log(`captured ${Object.keys(result).length} states -> ${outFile}`);
}

async function compare(fa, fb) {
  const a = JSON.parse(await readFile(fa, "utf8"));
  const b = JSON.parse(await readFile(fb, "utf8"));
  let diffs = 0, compared = 0, absentBoth = 0;
  for (const state of Object.keys(a)) {
    const A = a[state], B = b[state];
    if (!B) { console.log(`  MISSING STATE ${state}`); diffs++; continue; }
    if (A.__error || B.__error) {
      if (String(A.__error) !== String(B.__error)) { console.log(`  DRIVE ERROR ${state}: ${A.__error} -> ${B.__error}`); diffs++; }
      continue;
    }
    for (const sel of Object.keys(A)) {
      const ea = A[sel], eb = B[sel];
      if (ea === null && eb === null) { absentBoth++; continue; }
      if (!ea || !eb) { console.log(`  PRESENCE ${state} ${sel}: ${ea ? "present" : "absent"} -> ${eb ? "present" : "absent"}`); diffs++; continue; }
      for (const p of Object.keys(ea)) {
        compared++;
        const va = JSON.stringify(ea[p]), vb = JSON.stringify(eb[p]);
        if (va !== vb) { console.log(`  ${state} ${sel} ${p}: ${va} -> ${vb}`); diffs++; }
      }
    }
  }
  console.log(`\n  properties compared: ${compared}   selectors absent in both: ${absentBoth}`);
  console.log(diffs ? `  ${diffs} state differences` : "  no differences in any driven state");
  return diffs;
}

const mode = arg("compare") ? "compare" : "capture";
if (mode === "capture") {
  await capture(arg("url", "http://localhost:3102"), arg("out", "/tmp/parity/driven.json"));
} else {
  const fa = arg("a"), fb = arg("b");
  if (!existsSync(fa) || !existsSync(fb)) { console.error("need --a and --b"); process.exit(2); }
  console.log("=== DRIVEN STATES — conditional markup tier 3 cannot reach ===");
  process.exit((await compare(fa, fb)) ? 1 : 0);
}
