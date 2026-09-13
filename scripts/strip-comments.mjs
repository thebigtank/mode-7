import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";

// Directives are not commentary -- they change what the compiler or linter does.
const KEEP = /^\s*\/[/*]\s*(eslint-|@ts-|prettier-|#__PURE__|global\b|webpack|@jsx)/;

const parse = (text, fileName) =>
    ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// A file that already fails to parse is left alone; one that starts parsing
// after the strip means the strip broke it.
function syntaxErrors(text, fileName) {
    const src = parse(text, fileName);
    return src.parseDiagnostics?.length ?? 0;
}

function collect(text, src) {
    const seen = new Set();
    const ranges = [];
    const holes = [];
    const add = (r) => {
        if (!r) return;
        for (const c of r) {
            const k = `${c.pos}:${c.end}`;
            if (seen.has(k)) continue;
            seen.add(k);
            ranges.push([c.pos, c.end]);
        }
    };
    (function walk(node) {
        // {/* ... */} is a JsxExpression with no expression. Removing only its
        // comment leaves an empty {} in the markup, so the node goes whole.
        if (ts.isJsxExpression(node) && !node.expression) {
            // {/* eslint-disable-next-line ... */} is a directive wearing JSX
            // syntax. Removing it silently re-enables the rule it suppressed.
            const text_ = text.slice(node.getStart(), node.getEnd());
            if (!KEEP.test(text_.replace(/^\{\s*/, ""))) {
                holes.push([node.getStart(), node.getEnd()]);
            }
            return;
        }
        add(ts.getLeadingCommentRanges(text, node.getFullStart()));
        add(ts.getTrailingCommentRanges(text, node.getEnd()));
        node.forEachChild(walk);
    })(src);
    return { ranges, holes };
}

export function strip(text, fileName) {
    const src = parse(text, fileName);
    const { ranges, holes } = collect(text, src);
    const keep = ranges
        .filter(([a, b]) => !KEEP.test(text.slice(a, b)))
        .filter(([a, b]) => !holes.some(([x, y]) => a >= x && b <= y));

    let out = text;
    for (const [a, b] of [...keep, ...holes].sort((p, q) => q[0] - p[0])) {
        const lineStart = out.lastIndexOf("\n", a > 0 ? a - 1 : 0) + 1;
        const nl = out.indexOf("\n", b);
        const lineEnd = nl === -1 ? out.length : nl;
        const before = out.slice(lineStart, a);
        const after = out.slice(b, lineEnd);
        if (!before.trim() && !after.trim()) {
            out = out.slice(0, lineStart) + out.slice(nl === -1 ? out.length : nl + 1);
        } else {
            out = out.slice(0, a) + out.slice(b);
        }
    }
    return out.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n");
}

const files = process.argv.slice(2);
let changed = 0, removed = 0;
const refused = [];
for (const f of files) {
    const before = readFileSync(f, "utf8");
    const wasBroken = syntaxErrors(before, f) > 0;
    let after;
    try {
        after = strip(before, f);
    } catch (e) {
        refused.push(`${f}: threw ${e.message}`);
        continue;
    }
    if (after === before) continue;
    if (!wasBroken && syntaxErrors(after, f) > 0) {
        refused.push(`${f}: strip would break the parse`);
        continue;
    }
    removed += before.split("\n").length - after.split("\n").length;
    writeFileSync(f, after);
    changed++;
}
console.log(`${changed} files rewritten, ${removed} lines removed`);
if (refused.length) {
    console.log(`\nREFUSED (left untouched):`);
    for (const r of refused) console.log("  " + r);
}
