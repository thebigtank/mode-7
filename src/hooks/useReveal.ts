"use client";

import { useEffect, type RefObject } from "react";

/**
 * The signature grey → black per-character scroll reveal. Ported from
 * `setupReveal(ref)`.
 *
 * Listens on window + document (capture) AND keeps a rAF poll: window scroll
 * alone does not fire reliably in every embedding. Keep all three.
 *
 * `activeColor`/`restColor` default to the ORIGINAL v1 pairing — tone-on-tone
 * gold (`COLOR.goldDeep` #B99436, 1.68:1 on the v1 gold band — near-invisible
 * by design) resolving to `COLOR.espresso` (#1C150F) — so any future v1 call
 * site gets the untouched original effect with no arguments.
 *
 * The one current caller, `WhyStatement.tsx` on `/about`, passes v2 tokens
 * explicitly and — as of this pass — rests at `V2.accent` gold (measured
 * 1.40:1 on the section's actual `V2.wash` ground), resolving to `V2.ink`
 * (14.05:1). This is a DELIBERATE, requested exception to the gold rule in
 * CLAUDE.md ("gold as text on wash/white is forbidden at any size"): an
 * earlier pass moved this exact element off gold for precisely that reason,
 * and the user has now asked for gold back as the rest state on purpose.
 * It is defensible only because (a) the rest state is transient scaffolding,
 * never the final read — every character resolves to `activeColor` as the
 * page scrolls, never staying gold — and (b) it is not even much of a
 * regression: the PREVIOUS rest colour, `V2.faint` on `wash`, measured
 * 1.81:1 — also below the 4.5:1 text floor and the 3:1 large-text floor. Both
 * rest states were sub-AA placeholders; gold is somewhat lower-contrast than
 * faint, not a jump from compliant to non-compliant. Do not reuse this
 * `restColor` value as a genuinely resting/static text colour anywhere else —
 * it is only sound here because of the reduced-motion guard below and the
 * guarantee that scrolling always finishes the reveal.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  activeColor = "#1C150F",
  restColor = "#B99436",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.children;
    const spanCount = spans.length;

    // Reduced motion: land every character on `activeColor` immediately and
    // attach no listeners. Without this guard, a reduced-motion visitor whose
    // viewport never carries the element through the poll's active scroll
    // range (e.g. it mounts already past the resolved end, or they never
    // scroll it at all) would be stranded on `restColor` forever — which, for
    // the one current caller, is sub-AA gold. Reduced motion must never leave
    // text parked in a sub-AA rest state.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      for (let i = 0; i < spanCount; i++) {
        (spans[i] as HTMLElement).style.color = activeColor;
      }
      return;
    }

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.96,
        end = vh * -0.08;
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      const active = Math.round(p * spanCount);
      for (let i = 0; i < spanCount; i++) {
        (spans[i] as HTMLElement).style.color = i < active ? activeColor : restColor;
      }
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    let last = -1;
    let raf = 0;
    const poll = () => {
      const top = Math.round(el.getBoundingClientRect().top);
      if (top !== last) {
        last = top;
        update();
      }
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      cancelAnimationFrame(raf);
    };
  }, [ref, activeColor, restColor]);
}
