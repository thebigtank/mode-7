export function collect({ styleProps, pseudoProps }) {
  const norm = (s) => s.replace(/\s+/g, " ").trim().slice(0, 80);
  const base = (u) => {
    const m = String(u).match(/[^/"')]+(?=["')]*$)/);
    return m ? m[0] : String(u).slice(0, 60);
  };

  // getComputedStyle resolves url() against the document, so every background
  // image carries the serving origin. Baseline and branch are necessarily on
  // different ports, and the origin is never what is being compared.
  const deOrigin = (v) =>
    typeof v === "string" ? v.replace(/https?:\/\/[^/"')]+/g, "") : v;

  const seen = new Map();
  const keyFor = (el, cs) => {
    let raw = "";
    let stable = true;
    const direct = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.nodeValue)
      .join(" ");
    const text = norm(direct);
    if (text) raw = "t:" + text;
    else if (el.tagName === "IMG" && el.getAttribute("src")) raw = "i:" + base(el.getAttribute("src"));
    else if (el.tagName === "svg" && el.getAttribute("aria-label")) raw = "a:" + norm(el.getAttribute("aria-label"));
    else if (el.getAttribute && el.getAttribute("aria-label")) raw = "a:" + norm(el.getAttribute("aria-label"));
    else if (cs.backgroundImage && cs.backgroundImage !== "none") raw = "b:" + base(cs.backgroundImage);
    else {
      stable = false;
      // Index among siblings the probe would actually capture, not the raw DOM
      // index. A <style>, <script> or <link> never renders and is skipped on
      // the way out, but it still occupies a DOM index -- so counting raw
      // indices makes every later sibling's key shift the moment one is added
      // or removed, aliasing unrelated elements onto the same key.
      const countable = (n) =>
        n.nodeType === 1 && getComputedStyle(n).display !== "none";
      const path = [];
      let n = el;
      while (n && n !== document.body && path.length < 6) {
        const p = n.parentElement;
        let i = 0;
        if (p) {
          for (const sib of p.children) {
            if (sib === n) break;
            if (countable(sib)) i++;
          }
        }
        path.unshift(n.tagName.toLowerCase() + i);
        n = p;
      }
      raw = "s:" + path.join(">");
    }
    const c = (seen.get(raw) ?? 0) + 1;
    seen.set(raw, c);
    return { key: c > 1 ? `${raw}#${c}` : raw, stable };
  };

  const out = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let el = document.body;
  while (el) {
    const cs = getComputedStyle(el);
    if (cs.display !== "none") {
      const r = el.getBoundingClientRect();
      const { key, stable } = keyFor(el, cs);
      const rec = {
        key,
        stable,
        tag: el.tagName.toLowerCase(),
        rect: [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 1000) / 1000),
        style: {},
      };
      for (const p of styleProps) rec.style[p] = deOrigin(cs[p]);
      for (const which of ["::before", "::after"]) {
        const ps = getComputedStyle(el, which);
        if (ps.content && ps.content !== "none") {
          rec[which] = {};
          for (const p of pseudoProps) rec[which][p] = deOrigin(ps[p]);
        }
      }
      out.push(rec);
    }
    el = walk.nextNode();
  }

  const fontVars = {};
  const rootStyle = getComputedStyle(document.documentElement);
  for (const sheetVar of [
    "--font-space-grotesk", "--font-outfit", "--font-space-mono",
    "--font-alegreya", "--font-inter",
  ]) fontVars[sheetVar] = rootStyle.getPropertyValue(sheetVar).trim();

  // A font-family whose var() no longer resolves is dropped ENTIRELY and does
  // not fall through to the fallbacks written beside it, so the symptom is a
  // stack with none of the five families left in it -- not merely one that
  // ends in `serif`, which every correct Alegreya/Georgia stack also does.
  const FAMILIES = ["Space Grotesk", "Outfit", "Space Mono", "Alegreya", "Inter"];
  // <body> legitimately computes to the browser default: SiteShell paints the
  // type stack on a wrapper div, not on body. next-route-announcer is Next's
  // own visually-hidden a11y element. Neither is a dropped var().
  const EXEMPT = new Set(["body", "next-route-announcer"]);
  const serifLeak = out
    .filter((r) => {
      if (EXEMPT.has(r.tag)) return false;
      const ff = r.style.fontFamily || "";
      if (!ff) return false;
      if (FAMILIES.some((f) => ff.includes(f))) return false;
      return /\b(times|serif)\b/i.test(ff) && !/sans-serif/i.test(ff);
    })
    .map((r) => ({ key: r.key, tag: r.tag, fontFamily: r.style.fontFamily }))
    .slice(0, 20);

  return {
    nodes: out,
    fontVars,
    serifLeak,
    scrollHeight: document.documentElement.scrollHeight,
  };
}
