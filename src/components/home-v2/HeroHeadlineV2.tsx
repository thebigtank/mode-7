"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { V2, V2_FONT } from "@/lib/theme-v2";

/**
 * The hero headline — two lines, with a gold highlighter stroke that TRAVELS
 * between the three words of the second line.
 *
 *     Powering your                 <- line 1, 0.4em, ink, normal weight
 *     Home.  Pocket.  Future.       <- line 2, the display size
 *            ~~~~~~~                <- the stroke, moving on a 2.4s step
 *
 * ── What is load-bearing here ───────────────────────────────────────────────
 *
 *  1. ONLY THE THIRD SLOT ROTATES. The pool is Future. / Office. / Studio. /
 *     Workshop., and it is the LAST word on the line, so a width change
 *     reflows nothing before it. The first two words are fixed BECAUSE
 *     rotating them would shove the rest of the line sideways on every tick —
 *     "Home." and "Pocket." are load-bearing anchors, not a shortage of
 *     ideas. Do not extend the rotation to them.
 *
 *  2. THE SLOT RESERVES THE WIDEST WORD, IN CSS, WITH NO MEASUREMENT. All
 *     four pool words are rendered, stacked in one grid cell (grid-area 1/1),
 *     with only the current one at opacity 1. A grid column sizes to its
 *     widest item, so the slot is always as wide as "Workshop." at whatever
 *     size the clamp has resolved to — at every viewport, before fonts load,
 *     and with no JS. Opacity does not affect layout, so the swap cannot move
 *     anything. `justify-items:start` keeps each word's own box its own
 *     width, which is what the marker measures.
 *
 *  3. THE MARKER IS ONE ELEMENT THAT MOVES, NOT FOUR THAT FADE. A background
 *     cannot travel between elements, so the stroke is a single absolutely
 *     positioned overlay inside the line, painted with the SAME two-stop
 *     gradient the static headline used (see `.v2-hero-mark` in `V2Styles`),
 *     and moved with `transform: translate() scaleX()`. Transform, not
 *     left/width: it composites, and because the gradient runs vertically
 *     (`to top`) a horizontal scale cannot distort the band. The element is
 *     100px wide at rest, so scaleX is simply measured-width / 100.
 *
 *     `translate()` carries a Y as well as an X so the same marker works when
 *     the line stacks below 900px and the stroke has to travel down instead
 *     of across.
 *
 *  4. THE BAND GEOMETRY SURVIVES THE MOVE ONLY BECAUSE line-height IS 1.37.
 *     The 18% / 42% stops are measured against Alegreya's fontBoundingBox —
 *     102 up / 35 down per 100px, so 137 tall with the baseline 25.5% up from
 *     the bottom. Setting the words' line-height to exactly 1.37 makes each
 *     word's line box equal to that content box (half-leading falls to zero),
 *     so a 1.37em-tall marker with those stops lands byte-identically to the
 *     inline `background-image` it replaces. Changing that line-height moves
 *     the stroke off the x-height and the geometry has to be re-derived.
 *
 *  5. THE ACCESSIBLE NAME IS FIXED. Every animated span is `aria-hidden`, and
 *     the h1 carries one `aria-label` that never changes, so a screen reader
 *     announces a stable page title instead of text mutating underneath it.
 *
 *  6. NOTHING RUNS THAT NOBODY IS WATCHING. The interval exists only while
 *     the headline intersects the viewport AND the document is visible AND
 *     the user has not asked for reduced motion; any of the three going false
 *     tears it down.
 *
 * Reduced motion: no travel, no rotation, no fade. The marker rests on the
 * third word, all three words sit at full opacity and the slot shows the
 * default `Future.`. That is also the component's INITIAL state — `active`
 * starts at 2 — so the server HTML, the pre-hydration paint and the
 * reduced-motion resting state are the same three pixels, and nothing flashes
 * on hydration.
 */

/** Only the third slot rotates. Index 0 is the default and the SSR value. */
const POOL = ["Future.", "Office.", "Studio.", "Workshop."] as const;

/** The two anchored words. Fixed on purpose — see note 1 above. */
const FIXED = ["Home.", "Pocket."] as const;

/** One step of the marker. The full three-word loop is 3x this. */
const STEP_MS = 2400;

/**
 * The h1's accessible name. This is v1's headline verbatim, and it is
 * deliberately NOT derived from the rotating pool: the announced title must
 * not change when the marker ticks.
 */
const ARIA_LABEL = "Powering your home, your pocket, and your future.";

/** `useLayoutEffect` warns when React renders on the server; this is the
 *  standard isomorphic swap. The measurement must be pre-paint on the client
 *  so the marker never shows at an unmeasured position. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type Mark = { x: number; y: number; w: number };

export function HeroHeadlineV2() {
  /** Which of the three slots the marker is resting on. 2 = the rotating one. */
  const [active, setActive] = useState(2);
  /** Which pool word the third slot is showing. */
  const [pool, setPool] = useState(0);
  /** Measured marker geometry, in px relative to the line box. */
  const [mark, setMark] = useState<Mark | null>(null);

  const lineRef = useRef<HTMLSpanElement | null>(null);
  /** 0 and 1 are the fixed words; 2 is whichever pool word is showing. */
  const wordRefs = useRef<(HTMLElement | null)[]>([null, null, null]);
  /** The interval reads the current slot without re-creating itself. */
  const activeRef = useRef(2);

  /* ── the marker's position, measured from the DOM ─────────────────────── */

  const measure = useCallback(() => {
    const line = lineRef.current;
    const el = wordRefs.current[activeRef.current];
    if (!line || !el) return;
    const lb = line.getBoundingClientRect();
    const wb = el.getBoundingClientRect();
    setMark((prev) => {
      const next = { x: wb.left - lb.left, y: wb.top - lb.top, w: wb.width };
      // identical objects would re-render for nothing on every observer tick
      if (prev && prev.x === next.x && prev.y === next.y && prev.w === next.w) {
        return prev;
      }
      return next;
    });
  }, []);

  useIsoLayoutEffect(() => {
    activeRef.current = active;
    measure();
  }, [active, pool, measure]);

  /* Re-measure on anything that can change the line's metrics: a resize, the
     clamp crossing a breakpoint, and — the one that actually bites — the web
     font arriving after first paint and re-flowing every word. */
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(line);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measure]);

  /* ── when the marker is allowed to move ───────────────────────────────── */

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setAwake(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    /* No IntersectionObserver (very old Safari) must not mean a headline that
       never animates — assume visible and fall back to the visibility and
       reduced-motion gates alone. */
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    io.observe(line);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !inView || !awake) return;
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % 3;
      activeRef.current = next;
      setActive(next);
      /* The swap happens as the marker ARRIVES at slot 0 — two slots and
         4.8s away from the word being changed, so the change is peripheral
         and is never seen happening under the stroke. */
      if (next === 0) setPool((p) => (p + 1) % POOL.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView, awake]);

  /* ── render ───────────────────────────────────────────────────────────── */

  const word = (text: string, i: number) => (
    <span
      key={text}
      ref={(el) => {
        wordRefs.current[i] = el;
      }}
      className={`v2-hero-word${active === i ? " is-lit" : ""}`}
    >
      {text}
    </span>
  );

  return (
    <h1
      className="v2-hero-h1"
      aria-label={ARIA_LABEL}
      style={{
        margin: 0,
        fontFamily: V2_FONT.display,
        fontWeight: 400,
        color: V2.ink,
      }}
    >
      {/* Everything below is decoration for the name above it. */}
      <span aria-hidden="true" className="v2-hero-l1">
        Powering your
      </span>

      <span aria-hidden="true" className="v2-hero-l2" ref={lineRef}>
        {/* the travelling stroke, behind the words */}
        <span
          className={`v2-hero-mark${mark ? " is-ready" : ""}`}
          style={
            mark
              ? { transform: `translate(${mark.x}px, ${mark.y}px) scaleX(${mark.w / 100})` }
              : undefined
          }
        />

        {FIXED.map((w, i) => word(w, i))}

        {/* the rotating slot: all four words stacked in one grid cell, so the
            column is always as wide as the widest of them */}
        <span className={`v2-hero-word v2-hero-slot${active === 2 ? " is-lit" : ""}`}>
          {POOL.map((w, p) => (
            <span
              key={w}
              ref={
                p === pool
                  ? (el) => {
                      wordRefs.current[2] = el;
                    }
                  : undefined
              }
              className={`v2-hero-pool${p === pool ? " is-shown" : ""}`}
            >
              {w}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}
