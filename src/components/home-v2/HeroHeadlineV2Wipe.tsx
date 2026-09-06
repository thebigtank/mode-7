"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { V2, V2_FONT } from "@/lib/theme-v2";

/**
 * PARKED, NOT DELETED. This is the GSAP wipe — a solid gold block that grows
 * over the outgoing word, swaps it under cover, then shrinks away to reveal
 * the incoming one. It was live, then set aside in favour of the character-
 * scramble ("decode") variant (`HeroHeadlineV2Scramble.tsx`, which is what
 * `HeroV2.tsx` currently imports) after the user compared both and preferred
 * the scramble. It is kept intact, not commented out, because the wipe may
 * come back — the user has changed their mind once in each direction already.
 *
 * TO RESTORE IT: in `HeroV2.tsx`, change
 *
 *     import { HeroHeadlineV2 } from "./HeroHeadlineV2Scramble";
 *
 * to
 *
 *     import { HeroHeadlineV2 } from "./HeroHeadlineV2Wipe";
 *
 * (an aliased import — this file exports its component under the same name
 * `HeroHeadlineV2` specifically so this is a one-line, one-file change with
 * nothing to rename at the call site). Its CSS is everything in
 * `V2Styles.tsx` under the "the parked wipe" banner, plus the `.v2-hero-wipe`
 * rule in the `prefers-reduced-motion` block — all still present, marked
 * PARKED there. Nothing needs to be re-added; only the import above needs to
 * change. The reserved-width slot (`.v2-hero-slot` / `.v2-hero-sizer`) is
 * shared with the live scramble and needs no change either way.
 *
 * Everything below this banner is the wipe design's own documentation,
 * unchanged from when it was live.
 *
 * The hero headline — ONE ordinary three-line sentence, every line at the same
 * size and weight, with exactly one word changing in place on line 1.
 *
 *     Powering your Pocket          <- "Pocket" is the wipe slot
 *     with tech that's vetted,
 *     sealed and guaranteed.
 *
 * THE WORD IS PLAIN TEXT AT REST. No persistent marker, no band, no mask —
 * this is the third design this component has carried (a vertical roll, then
 * a character-scramble, now this), and the two things both predecessors kept
 * — a gold element sitting on the word at rest, and a clipping box around it
 * — are both gone. Between words, a solid gold block WIPES the old word away
 * and WIPES the new one in:
 *
 *   1. the block grows from the word's own left edge, left to right, until it
 *      fully covers the word (still showing the OLD word underneath, hidden);
 *   2. the instant it is fully covering, the text underneath is swapped to
 *      the NEXT pool word — invisibly, since the block is fully opaque;
 *   3. the block's LEFT edge then advances rightward while its right edge
 *      stays put, so it shrinks away toward the right, uncovering the new
 *      word left to right as it goes;
 *   4. the new word holds, fully visible, for a dwell, then the cycle repeats.
 *
 * ── What is load-bearing here ───────────────────────────────────────────────
 *
 *  1. THE SLOT STILL RESERVES THE WIDEST WORD, IN CSS, WITH NO MEASUREMENT.
 *     Unchanged from both previous designs. Every word in POOL is rendered
 *     once as a SIZER: an in-flow grid item at grid-area 1/1, set to
 *     `visibility: hidden`. A grid column sizes to its widest item and
 *     `visibility: hidden` still takes part in layout, so the slot is always
 *     exactly as wide as "Commute" — at every viewport, before fonts load,
 *     with no JS and no measurement pass. This is what keeps the sentence
 *     stable across a wipe cycle: the visible word and the wipe block both
 *     live inside this fixed-width cell, so nothing on the page can judder
 *     regardless of which word is showing or how wide the gold block gets.
 *
 *     The VISIBLE WORD is now just another grid item at 1/1 (not absolutely
 *     positioned, not masked) — `visibility: hidden` on the sizers, not
 *     `opacity: 0`, is still what stops them superimposing on it. Do not
 *     change that to opacity.
 *
 *  2. NO CLIPPING BOX SURVIVES THIS DESIGN, AND THE DESCENDER CONSTRAINT DIES
 *     WITH IT. Both earlier designs kept an `overflow: hidden` box (1.04em,
 *     the line box rather than Alegreya's taller 1.37em font box) around the
 *     visible word, because both had motion that could otherwise bleed a
 *     glyph into the leading above or below. This design has no such box: the
 *     word is ordinary inline content at the h1's own 1.04 line-height, and
 *     the gold block is a plain covering rectangle, not a mask — there is
 *     nothing left for a descender to be clipped BY. The real reason the
 *     original constraint existed (CLAUDE.md, and the two prior versions of
 *     this file) is gone.
 *
 *     It was also never a strict necessity of the LEADING, only of the old
 *     clipping geometry: Alegreya's actual painted ink is ascent 74.2 +
 *     descent 24.2 = 98.4% of the em (per the metrics CLAUDE.md records) —
 *     comfortably inside the 104% the hero's own 1.04 line-height provides,
 *     which is on record as chosen FOR that depth ("The deeper descender is
 *     why hero leading sits at 1.04 rather than tighter"). A real descender
 *     was always going to clear the line below; only the old mask's own
 *     narrower box was ever at risk. CLAUDE.md has been updated to record
 *     this — see the "gold rule" / typography section there.
 *
 *     The gold block's height (1.04em, centred the same way the old mask
 *     was: `top:50%; margin-top:-0.52em`) is kept anyway, not because
 *     anything requires it, but because it is already proven — by the
 *     original mask's own measurements — to comfortably cover every pool
 *     word's ink with 8-12px to spare, which is exactly "roughly the height
 *     of the text" the brief asks for. Verified visually at 1440 and 390px:
 *     nothing from the word or the block touches the line above or below at
 *     any point in a wipe cycle.
 *
 *  3. THE SWAP HAPPENS UNDER FULL COVER, WITH A DELIBERATE HOLD EITHER SIDE OF
 *     IT. The GSAP timeline below is GROW -> (hold, swap happens here) ->
 *     COLLAPSE, not grow-then-immediately-collapse: `HOLD_COVERED_MS` is a
 *     short pause once the block is fully opaque, and `setIndex` — the text
 *     swap — happens at the START of that pause via `tl.call()`. Because
 *     React's state update and the resulting DOM text change land well
 *     inside that pause (a re-render is microtasks away; the hold is ~100ms),
 *     the swap is always complete before the collapse tween's first frame,
 *     so no frame of the animation shows the OLD word partially exposed
 *     under a shrinking block, and none shows the NEW word appearing before
 *     the block has started to reveal it.
 *
 *  4. THE BLOCK'S WIDTH IS SET, NOT ANIMATED, AND ONLY `scaleX` TWEENS.
 *     `.v2-hero-wipe` sits at `left:0` (the word's own alignment) with an
 *     explicit pixel `width` — the CURRENT word's measured width while
 *     growing, the NEXT word's while collapsing — and `transformOrigin`
 *     toggles between `"left center"` and `"right center"` rather than the
 *     width being tweened. Growing: origin left, `scaleX` 0 -> 1, so the
 *     block's visible region is always `[0, t * width]` — it grows FROM the
 *     left. Collapsing: origin right, `scaleX` 1 -> 0, so the visible region
 *     is always `[width * (1 - t), width]` — the left edge is what recedes,
 *     advancing rightward as the block shrinks, which is what "the trailing
 *     edge sweeps out from the left" means. Both edges the brief describes
 *     moving left-to-right are, in this implementation, the SAME kind of
 *     motion (a boundary advancing rightward) on two different edges of the
 *     box, which is why one pair of `transformOrigin` values does both.
 *
 *     Switching the block's WIDTH from the outgoing word's measurement to the
 *     incoming word's happens with `gsap.set()` in the same covered instant
 *     as the text swap — a plain, un-animated property change — which is
 *     invisible for the same reason the text swap is: `scaleX` is still 1,
 *     so the block is still one uninterrupted opaque rectangle regardless of
 *     how its underlying width just changed.
 *
 *  5. THE GOLD BAND IS GONE FROM THE RESTING STATE, NOT JUST REPAINTED. The
 *     previous two designs both kept SOME permanent gold element sitting on
 *     or behind the word at rest (a half-height marker, band-and-marker). This
 *     brief asks for the opposite: plain ink text at rest, gold only as a
 *     transient wipe. `.v2-hero-wipe` therefore rests at `scaleX: 0` in the
 *     stylesheet (not inline — see note 7) and GSAP only ever touches it for
 *     the ~800ms a wipe is actually running.
 *
 *  6. THE ACCESSIBLE NAME IS FIXED, AS BEFORE. Every span here is inside
 *     `aria-hidden` content and the h1 carries one `aria-label` that never
 *     changes, so a screen reader announces a stable page title regardless of
 *     which pool word — or which phase of a wipe — is on screen.
 *
 *  7. RESTING STATE LIVES IN THE STYLESHEET; GSAP OWNS THE REST. `.v2-hero-wipe`
 *     defaults to `transform: scaleX(0)` in `V2Styles` so a pre-hydration or
 *     no-JS paint never shows a stray gold box (CLAUDE.md trap #2: an inline
 *     resting value would out-specify a later state rule — the fix here is
 *     that nothing is ever set inline until an actual animation begins).
 *     `@media (prefers-reduced-motion: reduce)` forces `transform: none
 *     !important` on it as belt-and-braces, matching the pattern used
 *     elsewhere in this file's CSS.
 *
 *  8. NOTHING RUNS THAT NOBODY IS WATCHING, and reduced motion gets the same
 *     hard guarantee the scramble design did: a wipe already in flight does
 *     not get to finish if reduced motion switches on mid-sweep. A dedicated
 *     effect watches the live preference and, the instant it flips true,
 *     kills any running timeline and forces the block back to resting
 *     (`scaleX: 0`) — sweeping gold is the one thing this component must
 *     never show a reduced-motion user, even for the tail of an animation
 *     that was already committed to running.
 *
 * REDUCED MOTION DOES NOT FREEZE THE WORD. Unlike the prior two designs, the
 * dwell/advance timer here is gated only on the slot being in view and the
 * tab being awake — NOT on `!reduced` — so the word keeps cycling through the
 * pool under reduced motion, on the same dwell. What changes is HOW it
 * changes: instead of building a GSAP timeline, the reduced-motion path is a
 * straight, un-animated `setIndex` — "simply swapping the word", the calmest
 * of the fallbacks the brief offers, and the simplest to verify has no motion
 * in it at all.
 */

/**
 * The rotating words, in rotation order. POOL[0] is the default: it is what
 * renders on the server, on first paint, and what the very first cycle starts
 * from.
 *
 * CONSTRAINT ON ADDING WORDS: the sentence tail is fixed — "with tech that's
 * vetted, sealed and guaranteed." Every entry here has to leave that tail TRUE
 * and grammatical when read straight through, because the reader always sees
 * one whole sentence:
 *
 *     Powering your <WORD> with tech that's vetted, sealed and guaranteed.
 *
 * So an entry must be a singular, countable noun that a person can possess and
 * that Mode 7 actually supplies vetted hardware for. "Pocket", "Home",
 * "Office", "Studio", "Commute" and "Future" all pass. A plural ("Devices"), a
 * mass noun ("Energy"), or anything Mode 7 does not warrant would make the
 * tail read as a claim the sentence cannot keep, and is not admissible here.
 *
 * The DESCENDER restriction that governed this list under both earlier
 * designs no longer applies — see note 2 above — and is not enforced here.
 * The pool happens to still contain none; that is incidental, not required.
 *
 * "Commute" is the longest and therefore sets the slot's reserved width; that
 * happens automatically (see note 1), so the order below is purely editorial.
 */
const POOL = ["Pocket", "Home", "Office", "Studio", "Commute", "Future"] as const;

/** How long a word rests, fully revealed, before the next wipe begins. */
const DWELL_MS = 2300;
/** How long the gold block takes to grow from nothing to fully covering the
 *  outgoing word. */
const COVER_MS = 360;
/** How long the block sits fully opaque before it starts collapsing — this is
 *  the pause the text swap happens inside, so it wants to be short but not
 *  zero: a hard cut reads like a glitch, not a considered beat. */
const HOLD_COVERED_MS = 110;
/** How long the block takes to shrink away and reveal the incoming word. */
const COLLAPSE_MS = 340;

/**
 * The h1's accessible name — the sentence with the DEFAULT word in it. It is
 * deliberately NOT derived from POOL: the announced title must not change as
 * the slot wipes.
 */
const ARIA_LABEL =
  "Powering your pocket with tech that's vetted, sealed and guaranteed.";

/** `useLayoutEffect` warns when React renders on the server; this is the
 *  standard isomorphic swap. The width measurement must be pre-paint on the
 *  client so a wipe never starts against a stale width for a frame. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function HeroHeadlineV2() {
  /** Which pool word is showing. 0 = "Pocket" = the SSR value. */
  const [index, setIndex] = useState(0);

  /**
   * Ink width of every pool word, in px, read off the sizers. `null` until
   * the component has measured; the resting word does not need this at all
   * (it is never absolutely positioned or explicitly sized), only the wipe
   * block does, and only once an animation is about to start.
   */
  const [widths, setWidths] = useState<number[] | null>(null);

  const slotRef = useRef<HTMLSpanElement | null>(null);
  const wipeRef = useRef<HTMLSpanElement | null>(null);
  const sizerRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /* ── the wipe block's widths, measured from the sizers ────────────────── */

  const measure = useCallback(() => {
    const els = sizerRefs.current;
    if (els.length !== POOL.length || els.some((el) => !el)) return;
    const w = els.map((el) => el!.getBoundingClientRect().width);
    setWidths((prev) =>
      prev && prev.length === w.length && prev.every((v, i) => v === w[i])
        ? prev
        : w,
    );
  }, []);

  useIsoLayoutEffect(measure, [measure]);

  /* Re-measure on anything that can change a word's advance width: a resize,
     the clamp crossing a breakpoint, and — the one that actually bites — the
     web font arriving after first paint and re-setting every word. */
  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(slot);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measure]);

  /* ── when the slot is allowed to cycle ────────────────────────────────── */

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
    const slot = slotRef.current;
    if (!slot) return;
    /* No IntersectionObserver (very old Safari) must not mean a headline that
       never animates — assume visible and fall back to the visibility gate
       alone. */
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    io.observe(slot);
    return () => io.disconnect();
  }, []);

  /* Cycling itself is NOT gated on `reduced` — see the file banner. Reduced
     motion changes HOW a transition happens (below), not WHETHER one does. */
  const gateOn = inView && awake;

  /* Reduced motion switching on mid-wipe must not let the sweep finish —
     kill it and snap straight back to a resting, un-covered word. */
  useEffect(() => {
    if (!reduced) return;
    timelineRef.current?.kill();
    timelineRef.current = null;
    if (wipeRef.current) {
      gsap.set(wipeRef.current, { scaleX: 0, transformOrigin: "left center" });
    }
  }, [reduced]);

  /* ── the dwell -> transition cycle ────────────────────────────────────── */

  useEffect(() => {
    if (!gateOn) return;
    const next = (index + 1) % POOL.length;
    const id = window.setTimeout(() => {
      if (reduced || !widths) {
        /* "Simply swapping the word" — no block, no tween, nothing that
           could read as motion. Also the fallback if a wipe is somehow
           requested before the sizers have measured. */
        setIndex(next);
        return;
      }

      const wipe = wipeRef.current;
      if (!wipe) return;

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.set(wipe, {
        width: widths[index],
        scaleX: 0,
        transformOrigin: "left center",
      })
        .to(wipe, { scaleX: 1, duration: COVER_MS / 1000, ease: "power2.out" })
        .call(() => setIndex(next))
        .set(wipe, { width: widths[next], transformOrigin: "right center" })
        .to(wipe, {
          scaleX: 0,
          duration: COLLAPSE_MS / 1000,
          ease: "power2.in",
          delay: HOLD_COVERED_MS / 1000,
        });
    }, DWELL_MS);
    return () => window.clearTimeout(id);
    /* This effect depends on `index` and re-runs (clearing the previous
       timeout) every time it changes, so the closure above always sees the
       CURRENT word — no ref needed to dodge staleness. */
  }, [gateOn, reduced, widths, index]);

  /* Timelines outlive the effect that created them by design (a cover/hold/
     collapse sequence must finish even if `gateOn` drops mid-flight — see the
     file banner) but not the component: kill on unmount so nothing keeps
     ticking against a detached node. */
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  /* ── render ───────────────────────────────────────────────────────────── */

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
      <span aria-hidden="true" className="v2-hero-line">
        Powering your{" "}
        <span className="v2-hero-slot" ref={slotRef}>
          {/* the reserved width: never painted, never visible — see note 1 */}
          {POOL.map((w, i) => (
            <span
              key={w}
              ref={(el) => {
                sizerRefs.current[i] = el;
              }}
              className="v2-hero-sizer"
            >
              {w}
            </span>
          ))}

          {/* the visible word: plain ink text, no marker behind it at rest */}
          <span className="v2-hero-word">{POOL[index]}</span>

          {/* the wipe block: invisible at rest, GSAP-driven during a cycle */}
          <span className="v2-hero-wipe" ref={wipeRef} aria-hidden="true" />
        </span>
      </span>

      <span aria-hidden="true" className="v2-hero-line">
        with tech that&rsquo;s vetted,
      </span>
      <span aria-hidden="true" className="v2-hero-line">
        sealed and guaranteed.
      </span>
    </h1>
  );
}
