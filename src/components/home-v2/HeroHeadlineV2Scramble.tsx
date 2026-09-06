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
 * LIVE. This is the character-scramble ("decode") version of the hero
 * headline's rotating word. It was built first, parked in favour of a GSAP
 * wipe (`HeroHeadlineV2Wipe.tsx`), and has now been restored to live after
 * the user compared both and preferred this one — the second time this
 * component's live/parked status has flipped, so treat neither variant as
 * more "canonical" than the other; both are meant to stay switchable.
 *
 * `HeroV2.tsx` currently imports this file under the aliased name
 * `HeroHeadlineV2`. TO SWITCH TO THE WIPE INSTEAD: in `HeroV2.tsx`, change
 *
 *     import { HeroHeadlineV2 } from "./HeroHeadlineV2Scramble";
 *
 * to
 *
 *     import { HeroHeadlineV2 } from "./HeroHeadlineV2Wipe";
 *
 * (`HeroHeadlineV2Wipe.tsx` exports its component under the same name
 * `HeroHeadlineV2` specifically so this is a one-line, one-file change with
 * nothing to rename at the call site). This file's CSS is everything in
 * `V2Styles.tsx` under the "the live scramble" banner (`.v2-hero-mask`
 * through `.v2-hero-bandsize`), plus the `.v2-hero-char` / `.v2-hero-band`
 * rules in the `prefers-reduced-motion` block. The wipe's CSS sits alongside
 * it, marked PARKED, and needs no change either way if you switch — only the
 * import above does. The reserved-width slot (`.v2-hero-slot` /
 * `.v2-hero-sizer`) is shared between both variants and needs no change
 * either way.
 *
 * Everything below this banner is the scramble design's own documentation,
 * unchanged from when it was first built.
 */

/**
 * The hero headline — ONE ordinary three-line sentence, every line at the same
 * size and weight, with exactly one word changing in place on line 1.
 *
 *     Powering your Pocket          <- "Pocket" is the decoding slot
 *     with tech that's vetted,
 *     sealed and guaranteed.
 *
 * The word no longer rolls vertically. It DECODES: the outgoing word resolves
 * left to right into random glyphs and then, position by position and still
 * left to right, those glyphs lock into the incoming word's letters. Think of
 * the classic "decrypting text" effect — a staggered wave of noise settling
 * into signal, not a slot-machine slide.
 *
 * ── What is load-bearing here ───────────────────────────────────────────────
 *
 *  1. THE SLOT RESERVES THE WIDEST WORD, IN CSS, WITH NO MEASUREMENT. Unchanged
 *     from the rolling design. Every word in POOL is rendered once as a SIZER:
 *     an in-flow grid item at grid-area 1/1, set to `visibility: hidden`. A
 *     grid column sizes to its widest item and `visibility: hidden` still
 *     takes part in layout, so the slot is always exactly as wide as
 *     "Commute" — at every viewport, before fonts load, with no JS and no
 *     measurement pass. Because the reserve is derived from the pool rather
 *     than a hard-coded longest word, adding a longer word later cannot
 *     silently break it. This is also what keeps the SENTENCE STABLE while the
 *     scramble runs: the animated word lives inside this fixed-width box, so
 *     nothing after it on the page can judder, no matter how the character
 *     count fluctuates frame to frame (see note 3).
 *
 *     `visibility: hidden` (not `opacity: 0`) is the whole point. A hidden-
 *     visibility box is never painted and never hit-tested, so the sizers
 *     CANNOT superimpose on the visible word. Do not change it to opacity.
 *
 *  2. THE VISIBLE WORD STILL LIVES IN A MASK, EVEN THOUGH NOTHING TRAVELS
 *     THROUGH IT ANY MORE. `.v2-hero-mask` is absolutely positioned over the
 *     sizers, exactly one LINE box (1.04em) tall, centred on the slot, with
 *     `overflow: hidden`. There is no vertical motion left to clip — the old
 *     roll strip is gone — but the mask is kept as a deliberate SAFETY NET,
 *     not decoration:
 *
 *       - Horizontally, it caps the animated word at the reserved slot width,
 *         so even a pathological mid-scramble frame (all positions still
 *         showing wide flicker glyphs at once) cannot visually spill past
 *         "Commute"'s width, on top of already being bounded by construction
 *         (see note 3).
 *       - Vertically, it is the same belt-and-braces that protected the roll:
 *         Alegreya's font box (1.37em) is taller than the line box (1.04em),
 *         so anything that reached past a real pool word's ink would be
 *         clipped here rather than bleeding into "with tech that's vetted,"
 *         one line down.
 *
 *     THE DESCENDER CONSTRAINT THEREFORE SURVIVES THE REDESIGN, AND NOW COVERS
 *     TWO THINGS INSTEAD OF ONE. CLAUDE.md's rule — no pool word may contain a
 *     descender (g, y, p, q, j) — still applies, because the mask that made it
 *     necessary is still here. It now ALSO applies to `SCRAMBLE_CHARS_HEAD` /
 *     `SCRAMBLE_CHARS_TAIL` below: the random glyphs shown on unresolved
 *     positions must clear the same 1.04em line box the real words do. Both
 *     sets are restricted to letters known not to descend (J and Q excluded —
 *     both commonly grow a tail below the baseline in humanist serifs, and
 *     Alegreya is one) and carry no digits or symbols, whose descender
 *     behaviour was not worth auditing glyph-by-glyph for a decorative flicker
 *     set. Verified visually at 1440 and 390px: nothing from either the pool
 *     or the flicker set touches the line above or below at rest OR mid-scramble.
 *
 *     A SECOND, UNRELATED CONSTRAINT FALLS OUT OF THE SAME MASK: WIDTH, NOT
 *     HEIGHT. An early build used one all-capitals flicker set for every
 *     position. Measured, an all-caps string is visibly WIDER than a real
 *     pool word of the same length — every pool word is one capital plus
 *     lowercase, and caps run wider than lowercase in Alegreya — so a fully
 *     capitalised flicker at 6-7 positions overran the slot's reserved width
 *     (sized to "Commute", itself one capital + six lowercase) and got
 *     clipped by the mask mid-letter. That read as a rendering bug, not a
 *     glitch effect. Fixed by giving position 0 a capitals-only set and every
 *     other position a lowercase-only set, so the flicker keeps the same
 *     silhouette as the words it stands in for and never approaches the
 *     reserved edge.
 *
 *  3. WORD-LENGTH CHANGES ARE HANDLED BY THE ALGORITHM, NOT BY LAYOUT.
 *     A scramble runs over `length = max(from.length, to.length)` character
 *     positions. A position beyond the INCOMING word's length (e.g. going
 *     "Commute" -> "Home", positions 4-6) renders its flicker glyph like any
 *     other position and then resolves to an EMPTY string once its own timer
 *     elapses, so the tail flickers and then vanishes rather than jump-cutting
 *     away. A position beyond the OUTGOING word's length (e.g. going "Home"
 *     -> "Commute", positions 4-6) starts as empty (nothing rendered) until
 *     its own start timer fires, then it fades into the flicker set and
 *     resolves normally — it grows in rather than appearing all at once.
 *     Because every position is independently timed (see note 4) this reads
 *     as an organic wave, and because it all happens inside the fixed-width
 *     slot from note 1, nothing to the right of "Powering your" ever moves.
 *
 *  4. THE DECODE TIMING, PER CHARACTER POSITION. Each position i gets its own
 *     `start` and `end` (both in ms, measured from the scramble's own t0):
 *
 *       start = i * CHAR_STAGGER_MS + random jitter (±CHAR_STAGGER_JITTER_MS)
 *       end   = start + CHAR_FLICKER_MS + random jitter (±CHAR_FLICKER_JITTER_MS)
 *
 *     Before `start`: the position shows its OLD character untouched (or
 *     nothing, if the old word is shorter). Between `start` and `end`: it
 *     flickers, swapping to a fresh glyph from `SCRAMBLE_CHARS_HEAD` (position
 *     0) or `SCRAMBLE_CHARS_TAIL` (every other position) every
 *     FLICKER_SWAP_MS — each position carries its own phase offset so all the
 *     unresolved positions do not swap in lockstep, which read as a
 *     mechanical strobe rather than noise. After `end`: it shows its final
 *     character (or nothing, if the new word is shorter) and stays there.
 *     Base stagger 45ms with ±30ms jitter keeps the sweep visibly
 *     left-to-right without being a metronome; a 300ms flicker window with
 *     ±90ms jitter is long enough to read as "deciding" without dragging; a
 *     55ms swap rate is the tuned-by-eye middle ground — faster reads as
 *     static, slower reads as a stutter rather than a flicker. These four
 *     numbers are the ones to retune first if the effect ever feels off; nudge
 *     them together; whether it stays that way must be judged by watching it.
 *
 *  5. THE GOLD BAND IS ONE ELEMENT THAT NEVER MOVES. Unchanged in spirit from
 *     the rolling design: a single solid gold block, a sibling of the
 *     character row and NOT a child of any word, pinned to the slot at the
 *     exact y the geometry comment in `V2Styles` derives. It does not travel
 *     vertically, it does not fade, and it is never absent.
 *
 *     ITS WIDTH IS THE TARGET WORD'S, AND IT ANIMATES. The band retargets to
 *     the INCOMING word the moment a scramble starts — not when it finishes —
 *     so the marker stretches or contracts into the new word across roughly
 *     the same window the letters take to resolve, rather than snapping late.
 *     It is always a positive width; it never passes through zero. Two things
 *     set that width and they agree: `.v2-hero-bandsize` (a `visibility:
 *     hidden` copy of the target word, for the server HTML and any
 *     pre-hydration paint) and the measured sizer widths in px (for the
 *     transition itself, since a width cannot animate to or from `auto`).
 *
 *  6. THE ACCESSIBLE NAME IS FIXED. Every span here is inside `aria-hidden`
 *     content and the h1 carries one `aria-label` that never changes, so a
 *     screen reader announces a stable page title. This matters MORE than it
 *     did for the roll: a screen reader has no concept of "flickering
 *     glyphs," but if the animated characters were in the accessible tree at
 *     all, assistive tech could announce a stream of nonsense letters as they
 *     mutate. `aria-hidden` on the whole decorative line keeps every
 *     character span — resolved or not — out of that tree entirely.
 *
 *  7. NOTHING RUNS THAT NOBODY IS WATCHING, and reduced motion gets a HARDER
 *     guarantee than "never starts." The dwell timer that ARMS a scramble
 *     still only runs while the headline intersects the viewport AND the
 *     document is visible AND the user has not asked for reduced motion — so
 *     under reduced motion the slot simply never leaves POOL[0], exactly as
 *     the rolling design did, and there is nothing to undo on the SSR frame.
 *     But a scramble ALREADY IN FLIGHT does not get to finish if reduced
 *     motion switches on mid-flicker: the animation loop reads the live
 *     preference every frame (`reducedRef`) and, the instant it flips true,
 *     snaps straight to the incoming word and tears itself down. Flickering
 *     glyphs are the one thing this component must never show a
 *     reduced-motion user, even for the tail end of an animation that was
 *     already running — unlike a transform, which the old design was content
 *     to let finish because a CSS override could neutralise it retroactively.
 *
 * Reduced motion: no scramble, no cycling at all. The slot shows POOL[0],
 * "Pocket", forever. That is also the component's INITIAL state, so the
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
 * AND — unchanged from the rolling design, see note 2 above — no entry may
 * contain a descender (g, y, p, q, j). The mask that requires this survived
 * the move to a scramble effect.
 *
 * "Commute" is the longest and therefore sets the slot's reserved width; that
 * happens automatically (see note 1), so the order below is purely editorial.
 */
const POOL = ["Pocket", "Home", "Office", "Studio", "Commute", "Future"] as const;

/** How long a word rests, fully resolved, before the next scramble begins. */
const DWELL_MS = 2200;

/** Per-position stagger: position i does not start resolving until roughly
 *  `i * CHAR_STAGGER_MS` into the scramble, so the sweep reads left to right. */
const CHAR_STAGGER_MS = 45;
/** Random spread added to each position's start, so the sweep is organic
 *  rather than a metronome. */
const CHAR_STAGGER_JITTER_MS = 30;
/** How long a position spends flickering before it locks to its final glyph. */
const CHAR_FLICKER_MS = 300;
/** Random spread added to each position's flicker duration. */
const CHAR_FLICKER_JITTER_MS = 90;
/** How often an unresolved position swaps to a fresh random glyph. Tuned by
 *  eye: faster reads as static noise, slower reads as a stutter. */
const FLICKER_SWAP_MS = 55;

/**
 * The flicker glyph sets — no digits, no symbols, J and Q excluded from both
 * (see note 2 above): this must clear the same 1.04em line-box mask every
 * pool word does, and J's hook / Q's tail commonly descend in humanist
 * serifs, Alegreya included.
 *
 * TWO sets, not one, and the split is not decorative: an all-caps flicker
 * string is measurably WIDER than a real pool word of the same length, because
 * every pool word is one capital followed by lowercase, and caps run wider
 * than lowercase in Alegreya. A 6–7 position flicker built entirely from
 * SCRAMBLE_CHARS_HEAD would overrun the slot's reserved width (sized to
 * "Commute", itself one capital + six lowercase) and get clipped by the mask
 * mid-letter — measured, and it reads as a rendering bug, not a glitch
 * effect. Restricting position 0 to caps and every other position to
 * lowercase keeps the flicker the same silhouette as the real words it is
 * standing in for, so it never approaches the reserved edge.
 */
const SCRAMBLE_CHARS_HEAD = "ABCDEFHIKLMNORSTUVWXZ";
const SCRAMBLE_CHARS_TAIL = "abcdefhiklmnorstuvwxz";

/**
 * The h1's accessible name — the sentence with the DEFAULT word in it. It is
 * deliberately NOT derived from POOL: the announced title must not change when
 * the slot decodes.
 */
const ARIA_LABEL =
  "Powering your pocket with tech that's vetted, sealed and guaranteed.";

/** `useLayoutEffect` warns when React renders on the server; this is the
 *  standard isomorphic swap. The width measurement must be pre-paint on the
 *  client so the band never shows at a stale width for a frame. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One rendered character position: either a locked-in real letter or an
 *  in-flight flicker glyph, plus whether it has resolved. `ch` can be the
 *  empty string — a position past the shorter of the two words in flight. */
type CharState = { ch: string; resolved: boolean };

function toResolved(word: string): CharState[] {
  return word.split("").map((ch) => ({ ch, resolved: true }));
}

export function HeroHeadlineV2() {
  /** Which pool word the slot is resting on. 0 = "Pocket" = the SSR value. */
  const [index, setIndex] = useState(0);
  /** True for the duration the slot is decoding between two words. */
  const [scrambling, setScrambling] = useState(false);
  /** The in-flight per-character render, or `null` when at rest (in which
   *  case the resting word is derived straight from `index`). */
  const [scrambleFrame, setScrambleFrame] = useState<CharState[] | null>(null);
  /**
   * Ink width of every pool word, in px, read off the sizers. `null` until the
   * component has measured — until then the band sizes itself from its own
   * hidden text and needs no number at all.
   */
  const [widths, setWidths] = useState<number[] | null>(null);

  const slotRef = useRef<HTMLSpanElement | null>(null);
  const sizerRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * The word the BAND is sized to. While decoding that is the incoming word,
   * so the marker stretches into it as the letters resolve rather than a beat
   * late.
   */
  const next = (index + 1) % POOL.length;
  const target = scrambling ? next : index;

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

  /* ── when the slot is allowed to animate ──────────────────────────────── */

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [awake, setAwake] = useState(true);

  /* Read live inside the rAF loop below — see note 7. A ref, not the state
     value, because the loop closes over it once per scramble and must see
     changes made after that closure without restarting. */
  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

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
     from the moment a word finishes resolving. Losing the gate (scrolled
     away, tab hidden, reduced motion switched on) clears the timer mid-dwell;
     getting it back starts a fresh full dwell rather than firing a stale one. */
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setScrambling(true), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [running, index]);

  /* Beat 2: decode. Drives itself with requestAnimationFrame rather than a
     single setTimeout, because every character position needs its own
     independent timeline (see note 4) — there is no single instant "the
     transition" completes at except the latest of all of them. */
  useEffect(() => {
    if (!scrambling) return;

    const from = POOL[index];
    const to = POOL[next];
    const length = Math.max(from.length, to.length);

    const starts: number[] = [];
    const ends: number[] = [];
    const phases: number[] = [];
    for (let i = 0; i < length; i++) {
      const start = Math.max(
        0,
        i * CHAR_STAGGER_MS + (Math.random() * 2 - 1) * CHAR_STAGGER_JITTER_MS,
      );
      const flicker = Math.max(
        60,
        CHAR_FLICKER_MS + (Math.random() * 2 - 1) * CHAR_FLICKER_JITTER_MS,
      );
      starts.push(start);
      ends.push(start + flicker);
      phases.push(Math.random() * FLICKER_SWAP_MS);
    }
    const totalMs = Math.max(...ends) + 30;

    const t0 = performance.now();
    let raf = 0;

    const finish = () => {
      setScrambleFrame(null);
      setIndex(next);
      setScrambling(false);
    };

    const tick = () => {
      /* Reduced motion switching on mid-flight is the one interruption this
         loop must not ride out — see note 7. */
      if (reducedRef.current) {
        finish();
        return;
      }
      const elapsed = performance.now() - t0;
      if (elapsed >= totalMs) {
        finish();
        return;
      }
      const frame: CharState[] = new Array(length);
      for (let i = 0; i < length; i++) {
        if (elapsed >= ends[i]) {
          frame[i] = { ch: to[i] ?? "", resolved: true };
        } else if (elapsed >= starts[i]) {
          const swapIndex = Math.floor((elapsed + phases[i]) / FLICKER_SWAP_MS);
          const seed = ((i + 1) * 2654435761 + swapIndex * 40503) >>> 0;
          const set = i === 0 ? SCRAMBLE_CHARS_HEAD : SCRAMBLE_CHARS_TAIL;
          frame[i] = {
            ch: set[seed % set.length],
            resolved: false,
          };
        } else {
          frame[i] = { ch: from[i] ?? "", resolved: false };
        }
      }
      setScrambleFrame(frame);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
    /* `scrambling` is the only thing that should retrigger this: `index` and
       `next` are read once to seed the timeline, not tracked live. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrambling]);

  const displayChars = scrambleFrame ?? toResolved(POOL[index]);

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

          {/* the visible word: one span per character position, see note 4 */}
          <span className="v2-hero-mask">
            <span className="v2-hero-scramble">
              {displayChars.map((c, i) => (
                <span
                  key={i}
                  className={`v2-hero-char${c.resolved ? "" : " is-flicker"}`}
                >
                  {c.ch}
                </span>
              ))}
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
