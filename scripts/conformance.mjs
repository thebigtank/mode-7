import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};

const root = arg("dir", "src/components");
const quiet = process.argv.includes("--quiet");

const scss = globSync(`${root}/**/*.scss`, { cwd: process.cwd() });
const tsx = globSync(`${root}/**/*.tsx`, { cwd: process.cwd() });

const findings = [];
const add = (rule, file, line, detail) =>
  findings.push({ rule, file, line, detail });

const STRUCTURAL =
  /^(display|align-items|justify-content|justify-items|flex-direction|flex-wrap|text-align|text-transform|white-space)\s*:\s*([^;]+);/;

const TW_EXACT = {
  "display:flex": "flex",
  "display:grid": "grid",
  "display:block": "block",
  "display:inline-flex": "inline-flex",
  "display:inline-grid": "inline-grid",
  "display:inline-block": "inline-block",
  "display:none": "hidden",
  "align-items:center": "items-center",
  "align-items:flex-start": "items-start",
  "align-items:flex-end": "items-end",
  "align-items:stretch": "items-stretch",
  "justify-content:center": "justify-center",
  "justify-content:space-between": "justify-between",
  "justify-content:flex-start": "justify-start",
  "justify-content:flex-end": "justify-end",
  "flex-direction:column": "flex-col",
  "flex-direction:row": "flex-row",
  "flex-wrap:wrap": "flex-wrap",
  "text-align:center": "text-center",
  "text-align:left": "text-left",
  "text-transform:uppercase": "uppercase",
  "white-space:nowrap": "whitespace-nowrap",
};

for (const file of scss) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  const overridden = new Set();
  {
    const st2 = [];
    let mediaDepth = 0;
    for (const raw of lines) {
      const t = raw.trim();
      if (t.endsWith("{")) {
        const sel = t.slice(0, -1).trim();
        st2.push(sel);
        if (/^@media|^@include mq/.test(sel)) mediaDepth++;
      } else if (t === "}" || t === "};") {
        const sel = st2.pop();
        if (sel && /^@media|^@include mq/.test(sel)) mediaDepth--;
      }
      if (mediaDepth > 0) {
        const m = t.match(/^([a-z-]+)\s*:/);
        if (m) {
          const owner = [...st2].reverse().find((x) => !/^@/.test(x));
          if (owner) overridden.add(`${owner}|${m[1]}`);
        }
      }
    }
  }

  const stack = [];

  lines.forEach((raw, idx) => {
    const line = idx + 1;
    const st = raw.trim();

    if (/^@use /.test(st) || st === "") {
      // structural bookkeeping only
    }

    if (st.endsWith("{")) stack.push(st.slice(0, -1).trim());
    else if (st === "}" || st === "};") stack.pop();

    if (/(^|[^#{])\b(fluid|fluid-phone|fluid-tablet|fluid-desktop|rem-calc)\s*\(/.test(raw) && !raw.includes("#{")) {
      if (!/^@(function|return|if)/.test(st) && !file.includes("/scss/utils/"))
        add("no-interpolation", file, line, st);
    }

    if (/\bclamp\s*\(/.test(st) && !/vh|dvh|svh/.test(st)) {
      add("raw-clamp", file, line, st);
    }

    const px = st.match(/(?<![\w-])(\d{2,})px/g);
    if (px) {
      const big = px.filter((v) => parseInt(v) >= 8 && !/^9{2,}px$/.test(v));
      if (big.length && !/border-radius|@media|outline|box-shadow|blur|translate/.test(st))
        add("raw-px", file, line, st);
    }

    if (/#[0-9a-fA-F]{3,8}\b/.test(st) && !/#\{/.test(st)) add("hex", file, line, st);
    if (/\brgba?\(\s*\d/.test(st)) add("rgb-literal", file, line, st);
    if (/font-family\s*:/.test(st) && !/var\(--/.test(st)) add("font-literal", file, line, st);
    if ((/\/\*/.test(st) || /(^|\s)\/\//.test(st)) && !file.includes("app/scss/")) add("comment", file, line, st);

    const sel = stack[stack.length - 1] ?? "";
    const ctx = stack.join(" > ");
    const m = st.match(STRUCTURAL);
    if (m) {
      const pseudo = /::|:hover|:focus|:active|:first|:last|:nth/.test(ctx);
      const media = /@media|@include mq/.test(ctx);
      const descendant = /\s|>|&/.test(sel.replace(/^&/, "&"));
      const isDescendant = /[\s>]/.test(sel) || sel.startsWith("&");
      if (!pseudo && !media && !isDescendant) {
        const key = `${m[1]}:${m[2].trim()}`;
        const tw = TW_EXACT[key];
        if (tw && !overridden.has(`${sel}|${m[1]}`))
          add("should-be-tailwind", file, line, `${key}  ->  className="${tw}"  [${sel}]`);
      }
    }

    if (/^@media|^@include mq/.test(st) && stack.length === 2 && stack[0].startsWith("@layer")) {
      add("grouped-media", file, line, `${st}  (not inside a block)`);
    }
  });
}

for (const file of tsx) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((raw, idx) => {
    const line = idx + 1;
    const st = raw.trim();
    if (/style=\{\{/.test(st) && !/--[a-z]/.test(raw)) add("inline-style", file, line, st.slice(0, 90));
    if (/from "@\/lib\/theme(-v2)?"/.test(st)) add("theme-import", file, line, st);
    if (/\/\*/.test(st) || (/(^|\s)\/\//.test(st) && !/eslint|https?:|\{"\/\//.test(st)))
      add("comment", file, line, st.slice(0, 90));
  });
}

const byRule = {};
for (const f of findings) (byRule[f.rule] ??= []).push(f);

const order = [
  "no-interpolation", "grouped-media", "should-be-tailwind", "raw-clamp",
  "hex", "rgb-literal", "font-literal", "raw-px", "inline-style",
  "theme-import", "comment",
];

let total = 0;
for (const rule of order) {
  const list = byRule[rule];
  if (!list) continue;
  total += list.length;
  console.log(`\n${rule}  (${list.length})`);
  if (!quiet) for (const f of list.slice(0, 12)) console.log(`  ${f.file}:${f.line}  ${f.detail}`);
  if (!quiet && list.length > 12) console.log(`  … ${list.length - 12} more`);
}

console.log(`\n${total} findings across ${scss.length} stylesheets and ${tsx.length} components in ${root}`);
process.exit(total ? 1 : 0);
