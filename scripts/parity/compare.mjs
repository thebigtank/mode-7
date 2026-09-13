import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};
const A = arg("a");
const B = arg("b");
const LIMIT = Number(arg("limit", "40"));
const LAYOUT_UNIT = 1 / 64;

if (!A || !B) {
  console.error("usage: compare.mjs --a <dir> --b <dir> [--limit N]");
  process.exit(2);
}

const readJSON = async (p) => JSON.parse(await readFile(p, "utf8"));
const listing = async (d) => (existsSync(d) ? (await readdir(d)).sort() : []);

let hardFailures = 0;
const note = (s) => console.log(s);

async function tier1() {
  const da = join(A, "tier1"), db = join(B, "tier1");
  const files = await listing(da);
  if (!files.length) return;
  note(`\n=== TIER 1 — geometry (${files.length} route/width captures) ===`);

  let filesWithDiff = 0, added = 0, missing = 0, subUnit = 0;
  const rectDiffs = { stable: 0, unstable: 0 };
  const styleDiffs = { stable: 0, unstable: 0 };
  const samples = [];

  for (const f of files) {
    if (!existsSync(join(db, f))) { note(`  MISSING CAPTURE  ${f}`); hardFailures++; continue; }
    const a = await readJSON(join(da, f));
    const b = await readJSON(join(db, f));
    const ma = new Map(a.nodes.map((n) => [n.key, n]));
    const mb = new Map(b.nodes.map((n) => [n.key, n]));
    let fileDiff = 0;

    if (a.status !== b.status) {
      note(`  STATUS  ${f}  ${a.status} -> ${b.status}`); hardFailures++;
    }

    for (const [k, na] of ma) {
      const nb = mb.get(k);
      if (!nb) { if (na.stable) { missing++; fileDiff++; if (samples.length < LIMIT) samples.push(`MISSING ${f} ${k}`); } continue; }
      for (let i = 0; i < 4; i++) {
        const d = Math.abs(na.rect[i] - nb.rect[i]);
        if (d > 0) {
          rectDiffs[na.stable ? "stable" : "unstable"]++; fileDiff++;
          if (d < LAYOUT_UNIT) subUnit++;
          if (na.stable && samples.length < LIMIT) {
            samples.push(`RECT ${f} ${k} [${"xywh"[i]}] ${na.rect[i]} -> ${nb.rect[i]} (Δ${d.toFixed(6)})`);
          }
        }
      }
      for (const p of Object.keys(na.style)) {
        if (na.style[p] !== nb.style[p]) {
          styleDiffs[na.stable ? "stable" : "unstable"]++; fileDiff++;
          if (na.stable && samples.length < LIMIT) samples.push(`STYLE ${f} ${k} ${p}: ${na.style[p]} -> ${nb.style[p]}`);
        }
      }
      for (const which of ["::before", "::after"]) {
        const pa = na[which], pb = nb[which];
        if (!pa && !pb) continue;
        if (!pa || !pb) {
          styleDiffs[na.stable ? "stable" : "unstable"]++; fileDiff++;
          if (samples.length < LIMIT) samples.push(`PSEUDO ${f} ${k} ${which} ${pa ? "removed" : "added"}`);
          continue;
        }
        for (const p of Object.keys(pa)) {
          if (pa[p] !== pb[p]) {
            styleDiffs[na.stable ? "stable" : "unstable"]++; fileDiff++;
            if (na.stable && samples.length < LIMIT) samples.push(`PSEUDO ${f} ${k} ${which}.${p}: ${pa[p]} -> ${pb[p]}`);
          }
        }
      }
    }
    for (const [k, nb] of mb) if (!ma.has(k) && nb.stable) { added++; fileDiff++; if (samples.length < LIMIT) samples.push(`ADDED ${f} ${k}`); }
    if (fileDiff) filesWithDiff++;
  }

  const stableTotal = rectDiffs.stable + styleDiffs.stable + added + missing;
  const unstableTotal = rectDiffs.unstable + styleDiffs.unstable;
  note(`  captures with differences : ${filesWithDiff}/${files.length}`);
  note(`  rect   diffs  stable/struct: ${rectDiffs.stable} / ${rectDiffs.unstable}   (< 1/64px: ${subUnit})`);
  note(`  style  diffs  stable/struct: ${styleDiffs.stable} / ${styleDiffs.unstable}`);
  note(`  stable keys added/missing  : +${added} / -${missing}`);
  if (samples.length) { note(`  first ${samples.length} (content-keyed only):`); samples.forEach((s) => note(`    ${s}`)); }
  if (unstableTotal && !stableTotal) {
    note(`  NOTE: ${unstableTotal} differences on structural keys only. Across a DOM`);
    note(`  restructure those keys are not comparable; within a phase they are.`);
  }
  if (stableTotal) hardFailures++;
  else if (unstableTotal) hardFailures++;
}

async function tier2() {
  const da = join(A, "tier2"), db = join(B, "tier2");
  const files = (await listing(da)).filter((f) => f.endsWith(".png"));
  if (!files.length) return;
  note(`\n=== TIER 2 — pixel diff (${files.length} screenshots) ===`);
  let bad = 0;
  const subPerceptual = [];
  for (const f of files) {
    if (!existsSync(join(db, f))) { note(`  MISSING  ${f}`); hardFailures++; continue; }
    const pa = PNG.sync.read(await readFile(join(da, f)));
    const pb = PNG.sync.read(await readFile(join(db, f)));
    if (pa.width !== pb.width || pa.height !== pb.height) {
      note(`  SIZE  ${f}  ${pa.width}x${pa.height} -> ${pb.width}x${pb.height}`);
      bad++; continue;
    }
    const diff = new PNG({ width: pa.width, height: pa.height });
    const n = pixelmatch(pa.data, pb.data, diff.data, pa.width, pa.height, { threshold: 0 });
    if (n === 0) continue;
    // How far off, not just how many. A whole channel off by 1 of 255 is the
    // rasteriser dithering a gradient, not a design change -- Chrome resolves a
    // var()-substituted gradient a hair differently from the same gradient
    // written inline. Anything a person could see moves at least 2, and a flat
    // colour that actually changed is caught by tier 1's computed styles.
    let max = 0;
    for (let i = 0; i < pa.data.length; i += 4)
      for (let k = 0; k < 3; k++) {
        const d = Math.abs(pa.data[i + k] - pb.data[i + k]);
        if (d > max) max = d;
      }
    if (max <= 1) { subPerceptual.push(`${String(n).padStart(9)} px  ${f}`); continue; }
    note(`  ${String(n).padStart(9)} px  maxΔ ${max}  ${f}`);
    bad++;
  }
  if (subPerceptual.length) {
    note(`  ${subPerceptual.length} screenshot(s) differ only at maxΔ 1 (sub-perceptual):`);
    for (const line of subPerceptual.slice(0, 8)) note(`    ${line}`);
  }
  note(bad ? `  ${bad}/${files.length} screenshots differ perceptibly` : `  ${files.length} screenshots: no perceptible difference`);
  if (bad) hardFailures++;
}

async function tier3() {
  const fa = join(A, "tier3", "states.json"), fb = join(B, "tier3", "states.json");
  if (!existsSync(fa) || !existsSync(fb)) return;
  note(`\n=== TIER 3 — interactive state ===`);
  const a = await readJSON(fa), b = await readJSON(fb);
  const key = (s) => `${s.route} ${s.selector} ${s.action}`;
  const mb = new Map(b.map((s) => [key(s), s]));
  let diffs = 0, missingSel = 0;
  for (const s of a) {
    const o = mb.get(key(s));
    if (!o) { note(`  MISSING TARGET ${key(s)}`); diffs++; continue; }
    if (s.missing || o.missing) { if (s.missing !== o.missing) { note(`  SELECTOR PRESENCE ${key(s)} ${s.missing} -> ${o.missing}`); diffs++; } else missingSel++; continue; }
    for (const p of Object.keys(s.style ?? {})) {
      if (s.style[p] !== o.style?.[p]) { note(`  ${key(s)}  ${p}: ${s.style[p]} -> ${o.style[p]}`); diffs++; }
    }
  }
  note(diffs ? `  ${diffs} state differences` : `  no state differences (${missingSel} targets absent in both)`);
  if (diffs) hardFailures++;
}

async function tier4() {
  const fa = join(A, "tier4", "fonts.json"), fb = join(B, "tier4", "fonts.json");
  if (!existsSync(fa) || !existsSync(fb)) return;
  note(`\n=== TIER 4 — font variables ===`);
  const a = await readJSON(fa), b = await readJSON(fb);
  let bad = 0;
  for (const side of [["A", a], ["B", b]]) {
    for (const r of side[1].fonts) {
      if (r.empty.length) { note(`  ${side[0]} ${r.route}: EMPTY ${r.empty.join(", ")}`); bad++; }
      if (r.serifLeak.length) { note(`  ${side[0]} ${r.route}: serif fallback on ${r.serifLeak.length} nodes e.g. ${r.serifLeak[0].fontFamily}`); bad++; }
    }
  }
  const mb = new Map(b.fonts.map((r) => [r.route, r]));
  for (const r of a.fonts) {
    const o = mb.get(r.route);
    if (!o) continue;
    for (const k of Object.keys(r.fontVars)) {
      if (r.fontVars[k] !== o.fontVars[k]) { note(`  ${r.route} ${k}: "${r.fontVars[k]}" -> "${o.fontVars[k]}"`); bad++; }
    }
  }
  if (a.redirect.finalUrl !== b.redirect.finalUrl) { note(`  /homepage-v2 -> ${a.redirect.finalUrl} vs ${b.redirect.finalUrl}`); bad++; }
  note(bad ? `  ${bad} font problems` : `  all font variables resolve on both, no serif leak`);
  if (bad) hardFailures++;
}

await tier1();
await tier2();
await tier3();
await tier4();

console.log(`\n${hardFailures ? `FAIL — ${hardFailures} tier(s) reported differences` : "PASS — no differences"}`);
process.exit(hardFailures ? 1 : 0);
