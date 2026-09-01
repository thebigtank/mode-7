"use client";

import { useEffect, useState } from "react";
import { COLOR, FONT } from "@/lib/theme";

const TARGETS = ["M", "O", "D", "E"];
const SETTLE_AT = [1500, 2400, 3300, 4200];
/** Per-glyph widths so the scramble still reads as a real word. */
const WIDTHS = ["0.8em", "0.78em", "0.72em", "0.6em"];

/**
 * First-load intro loader. Ported from `runIntro()`.
 *
 * M-O-D-E each scramble through random letters and lock in one at a time while a
 * number reel scrolls 1 → 7. On completion the lockup blurs out (~28px + a
 * slight scale) as the white overlay fades and the site is revealed.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [letters, setLetters] = useState(["A", "A", "A", "A"]);
  const [num, setNum] = useState(1);
  const [fade, setFade] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const settled = [false, false, false, false];
    const rand = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const scramble = setInterval(() => {
      setLetters((prev) => prev.map((c, i) => (settled[i] ? c : rand())));
    }, 55);

    const timers: ReturnType<typeof setTimeout>[] = [];
    SETTLE_AT.forEach((t, i) => {
      timers.push(
        setTimeout(() => {
          settled[i] = true;
          setLetters((prev) => {
            const next = [...prev];
            next[i] = TARGETS[i];
            return next;
          });
        }, t),
      );
    });

    let n = 1;
    const reel = setInterval(() => {
      n++;
      setNum(n);
      if (n >= 7) clearInterval(reel);
    }, 620);

    timers.push(setTimeout(() => clearInterval(scramble), 4260));
    timers.push(setTimeout(() => setFade(true), 4800));
    timers.push(
      setTimeout(() => {
        setActive(false);
        onDone();
      }, 5700),
    );

    return () => {
      clearInterval(scramble);
      clearInterval(reel);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: COLOR.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade ? 0 : 1,
        transition: "opacity .85s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: FONT.head,
          fontWeight: 600,
          fontSize: "clamp(40px, 11vw, 84px)",
          letterSpacing: 0,
          color: COLOR.ink,
          lineHeight: 1,
          filter: fade ? "blur(28px)" : "blur(0px)",
          transform: `scale(${fade ? 1.12 : 1})`,
          transition: "filter .9s ease, transform .9s ease",
        }}
      >
        {letters.map((c, i) => (
          <span
            key={i}
            style={{ display: "inline-block", width: WIDTHS[i], textAlign: "center" }}
          >
            {c}
          </span>
        ))}
        <span style={{ display: "inline-block", width: "0.34em" }} />
        <span
          style={{
            display: "inline-block",
            height: "1.3em",
            width: "0.74em",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              transition: "transform .4s cubic-bezier(.5,0,.18,1)",
              transform: `translateY(-${(num - 1) * 1.3}em)`,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <span
                key={d}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "1.3em",
                  lineHeight: 1,
                }}
              >
                {d}
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}
