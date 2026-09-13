import { readFileSync, readdirSync } from "node:fs";
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const A = arg("a", "/tmp/parity/prev");
const B = arg("b", "/tmp/parity/branch");
const files = readdirSync(`${A}/tier1`);
const byProp = new Map();
const samples = new Map();
for (const f of files) {
  const a = JSON.parse(readFileSync(`${A}/tier1/${f}`, "utf8"));
  const b = JSON.parse(readFileSync(`${B}/tier1/${f}`, "utf8"));
  const mb = new Map(b.nodes.map((n) => [n.key, n]));
  for (const na of a.nodes) {
    const nb = mb.get(na.key);
    if (!nb) continue;
    for (const p of Object.keys(na.style)) {
      if (na.style[p] === nb.style[p]) continue;
      byProp.set(p, (byProp.get(p) ?? 0) + 1);
      if (!samples.has(p)) samples.set(p, `${f} ${na.tag}.${na.key.slice(0,34)}\n      ${String(na.style[p]).slice(0,110)}\n   -> ${String(nb.style[p]).slice(0,110)}`);
    }
  }
}
for (const [p, n] of [...byProp.entries()].sort((x, y) => y[1] - x[1])) {
  console.log(`${String(n).padStart(5)}  ${p}`);
  console.log(`       ${samples.get(p)}`);
}
