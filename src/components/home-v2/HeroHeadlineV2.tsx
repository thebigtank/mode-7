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
 * The hero headline — ONE ordinary three-line sentence, every line at the same
 * size and weight, with exactly one word changing in place on line 1.
 *
 *     Powering your Pocket          <- "Pocket" is the rolling slot
 *     with tech that's vetted,
 *     sealed and guaranteed.
 *
 * The word rolls vertically, split-flap style: the outgoing word travels up and
 * out of a masked slot while the incoming word travels up from below into the
 * same slot, both carried by one strip in one motion. Nothing else on the page
 * moves, and nothing reflows.
 *
 * ── What is load-bearing here ───────────────────────────────────────────────
 *
 *  1. THE SLOT RESERVES THE WIDEST WORD, IN CSS, WITH NO MEASUREMENT. Every
 *     word in POOL is rendered once as a SIZER: an in-flow grid item at
 *     grid-area 1/1, set to `visibility: hidden`. A grid column sizes to its
 *     widest item and `visibility: hidden` still takes part in layout, so the
 *     slot is always exactly as wide as "Commute" — at every viewport, before
 *     fonts load, with no JS and no measurement pass. Because the reserve is
 *     derived from the pool rather than from a hard-coded longest word, adding
 *     a longer word later cannot silently break it.
 *
 *     `visibility: hidden` (not `opacity: 0`) is the whole point. A hidden-
 *     visibility box is never painted and never hit-tested, so the sizers
 *     CANNOT superimpose on the visible word the way a stack of opacity-0
 *     words can. Do not change it to opacity.
 *
 *  2. THE VISIBLE WORD LIVES IN A MASK, NOT IN THE FLOW. `.v2-hero-mask` is
 *     absolutely positioned over the sizers, exactly one LINE box
 *     (1.04em) tall, centred on the slot, with `overflow: hidden`. Inside it a
 *     strip holds TWO cells — the current word and the next one, stacked. At rest
 *     the strip sits at translateY(0), so cell 2 is parked below the mask and
 *     is clipped away entirely: exactly one word is visible. A roll is one
 *     transform to translateY(-50%), which is exactly one cell height, and
 *     nothing is cross-faded — both words are fully opaque throughout, which
 *     is what makes it read as a physical strip rather than a dissolve.
 *
 *     The mask clips at the LINE box (1.04em), not at Alegreya's taller font
 *     box (1.37em), because a font-box-tall mask spills 0.165em into the
 *     leading above and below and mid-roll that puts a slice of the outgoing
 *     word over the headline and a bar through line 2. Every pool word's ink
 *     clears the line box — no entry has a descender, which is what makes the
 *     bottom of that box safe. See `.v2-hero-mask` in `V2Styles`.
 *
 *     Because the mask is absolutely positioned it contributes NO height, so
 *     line 1's line box is the same 1.04em as lines 2 and 3 and the three
 *     lines keep even leading despite the 1.37em roll.
 *
 *  3. THE ROLL RESETS WITHOUT A TRANSITION. When the 340ms is up the component
 *     advances the index AND drops the `is-rolling` class in one commit: the
 *     new current word is the one already on screen, and the strip snaps back
 *     to translateY(0) with no transition because the transition is declared
 *     only on `.is-rolling`. The eye sees one continuous roll; the DOM sees a
 *     move and an instant rewind.
 *
 *  4. THE GOLD BAND IS ONE ELEMENT THAT NEVER MOVES. It is a single solid
 *     gold block, a sibling of the strip and NOT a child of any word, pinned
 *     to the slot at the exact y the old two-stop gradient put it: top edge
 *     across the middle of the lowercase x-height, bottom edge just under the
 *     baseline. It does not travel vertically, it does not fade, and it is
 *     never absent — the words roll THROUGH it.
 *
 *     Painting it on the words instead (as a background-image, which is what
 *     the static headline did) would put TWO gold bands in the slot for the
 *     whole 340ms and slide each of them away with its own word. That is the
 *     thing this design is not: the marker is furniture, the words are what
 *     move past it.
 *
 *     ITS WIDTH IS THE CURRENT WORD'S, AND IT ANIMATES. A band frozen at the
 *     reserved "Commute" width would hang a tail of bare gold off the end of
 *     "Home", so it tracks the word — and it retargets the INCOMING word the
 *     moment the roll starts, over the same 340ms and the same easing, so the
 *     marker stretches or contracts into the new word AS it arrives rather
 *     than snapping a beat late. It is always a positive width; it never
 *     passes through zero.
 *
 *     Two things set that width, and they agree. `.v2-hero-bandsize` is a
 *     `visibility: hidden` copy of the target word INSIDE the band, so the
 *     band's shrink-to-fit width is the right width with no JS at all — that
 *     is what the server HTML and the pre-hydration paint use, and it is
 *     correct before fonts load. Once mounted the component reads the same
 *     widths off the sizers and sets them explicitly in px, purely so the
 *     change is a length the browser can TRANSITION (a width cannot animate
 *     to or from `auto`). The two values are the same number, so adopting the
 *     measured one is invisible.
 *
 *  5. THE ACCESSIBLE NAME IS FIXED. Every span here is inside `aria-hidden`
 *     content and the h1 carries one `aria-label` that never changes, so a
 *     screen reader announces a stable page title instead of text mutating
 *     underneath it.
 *
 *  6. NOTHING RUNS THAT NOBODY IS WATCHING. The dwell timer exists only while
 *     the headline intersects the viewport AND the document is visible AND the
 *     user has not asked for reduced motion; any of the three going false
 *     tears it down.
 *
 * Reduced motion: no roll, no rotation. The slot shows POOL[0], "Pocket", and
 * the band rests on it. That is also the component's INITIAL state, so the
 * server HTML, the pre-hydration paint and the reduced-motion resting state
 * are the same pixels and nothing flashes on hydration.
 */

/**
 * The rotating words, in rotation order. POOL[0] is the default: it is what
 * renders on the server, on first paint, and under reduced motion.
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
 * "Commute" is the longest and therefore sets the slot's reserved width; that
 * happens automatically (see note 1), so the order below is purely editorial.
 */
const POOL = ["Pocket", "Home", "Office", "Studio", "Commute", "Future"] as const;

/** How long a word rests before the next roll. */
const DWELL_MS = 2400;

/** One roll, out and in. Matches the transition on `.v2-hero-strip.is-rolling`. */
const ROLL_MS = 340;

/**
 * The h1's accessible name — the sentence with the DEFAULT word in it. It is
 * deliberately NOT derived from POOL: the announced title must not change when
 * the slot rolls.
 */
const ARIA_LABEL =
  "Powering your pocket with tech that's vetted, sealed and guaranteed.";

/** `useLayoutEffect` warns when React renders on the server; this is the
 *  standard isomorphic swap. The width measurement must be pre-paint on the
 *  client so the band never shows at a stale width for a frame. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function HeroHeadlineV2() {
  /** Which pool word the slot is resting on. 0 = "Pocket" = the SSR value. */
  const [index, setIndex] = useState(0);
  /** True for the 340ms the strip is travelling. */
  const [rolling, setRolling] = useState(false);
  /**
   * Ink width of every pool word, in px, read off the sizers. `null` until the
   * component has measured — until then the band sizes itself from its own
   * hidden text and needs no number at all. See note 4.
   */
  const [widths, setWidths] = useState<number[] | null>(null);

  const slotRef = useRef<HTMLSpanElement | null>(null);
  const sizerRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * The word the BAND is sized to. During a roll that is the incoming word, so
   * the marker stretches into it over the same 340ms rather than a beat late.
   */
  const next = (index + 1) % POOL.length;
  const target = rolling ? next : index;

  /* ── the band's width, measured from the sizers ───────────────────────── */

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

  /* ── when the slot is allowed to roll ─────────────────────────────────── */

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
    io.observe(slot);
    return () => io.disconnect();
  }, []);

  const running = !reduced && inView && awake;

  /* ── the two-beat cycle ───────────────────────────────────────────────── */

  /* Beat 1: rest. Re-armed on every index change, so the dwell is measured
     from the moment a word ARRIVES. Losing the gate (scrolled away, tab
     hidden, reduced motion switched on) clears the timer mid-dwell; getting it
     back starts a fresh full dwell rather than firing a stale one. */
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setRolling(true), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [running, index]);

  /* Beat 2: roll. Deliberately NOT gated on `running` — a roll already in
     flight finishes, so the strip can never be left parked half-way between
     two words by a tab going hidden mid-travel. */
  useEffect(() => {
    if (!rolling) return;
    const id = window.setTimeout(() => {
      /* One commit: adopt the incoming word AND drop the transition, so the
         strip rewinds to translateY(0) invisibly. See note 3 above. The
         band's target is unchanged by this commit — it was already the
         incoming word — so the marker does not so much as flicker. */
      setIndex(next);
      setRolling(false);
    }, ROLL_MS);
    return () => window.clearTimeout(id);
  }, [rolling, next]);

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

          {/* THE marker. One element, always present, behind the words. */}
          <span
            className="v2-hero-band"
            style={widths ? { width: widths[target] } : undefined}
          >
            <span className="v2-hero-bandsize">{POOL[target]}</span>
          </span>

          {/* the visible word, and only ever one of them at rest */}
          <span className="v2-hero-mask">
            <span className={`v2-hero-strip${rolling ? " is-rolling" : ""}`}>
              <span className="v2-hero-cell">
                <span className="v2-hero-word">{POOL[index]}</span>
              </span>
              <span className="v2-hero-cell">
                <span className="v2-hero-word">{POOL[next]}</span>
              </span>
            </span>
          </span>
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
