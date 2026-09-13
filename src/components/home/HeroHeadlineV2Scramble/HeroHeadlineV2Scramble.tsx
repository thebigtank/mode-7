"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { V2, V2_FONT } from "@/lib/theme-v2";

const POOL = ["Pocket", "Home", "Office", "Studio", "Commute", "Future"] as const;

const DWELL_MS = 2200;

const CHAR_STAGGER_MS = 45;
const CHAR_STAGGER_JITTER_MS = 30;
const CHAR_FLICKER_MS = 300;
const CHAR_FLICKER_JITTER_MS = 90;
const FLICKER_SWAP_MS = 55;

const SCRAMBLE_CHARS_HEAD = "ABCDEFHIKLMNORSTUVWXZ";
const SCRAMBLE_CHARS_TAIL = "abcdefhiklmnorstuvwxz";

const ARIA_LABEL =
  "Powering your pocket with tech that's vetted, sealed and guaranteed.";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type CharState = { ch: string; resolved: boolean };

function toResolved(word: string): CharState[] {
  return word.split("").map((ch) => ({ ch, resolved: true }));
}

export function HeroHeadlineV2() {
  const [index, setIndex] = useState(0);
  const [scrambling, setScrambling] = useState(false);
  const [scrambleFrame, setScrambleFrame] = useState<CharState[] | null>(null);
  const [widths, setWidths] = useState<number[] | null>(null);

  const slotRef = useRef<HTMLSpanElement | null>(null);
  const sizerRefs = useRef<(HTMLElement | null)[]>([]);

  const next = (index + 1) % POOL.length;
  const target = scrambling ? next : index;

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

  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [awake, setAwake] = useState(true);

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

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setScrambling(true), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [running, index]);

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
      <span aria-hidden="true" className="v2-hero-line">
        Powering your{" "}
        <span className="v2-hero-slot" ref={slotRef}>
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

          <span
            className="v2-hero-band"
            style={widths ? { width: widths[target] } : undefined}
          >
            <span className="v2-hero-bandsize">{POOL[target]}</span>
          </span>

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
