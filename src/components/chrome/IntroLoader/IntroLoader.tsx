"use client";

import { useEffect, useState } from "react";
import content from "@/content/chrome.json";

const TARGETS = content.introLoader.letters;
const SETTLE_AT = [1500, 2400, 3300, 4200];

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
      className="intro-loader fixed inset-0 flex items-center justify-center pointer-events-none"
      data-fade={fade ? "true" : "false"}
    >
      <div className="intro-loader__word flex items-center">
        {letters.map((c, i) => (
          <span key={i} className="intro-loader__letter inline-block text-center">
            {c}
          </span>
        ))}
        <span className="intro-loader__gap inline-block" />
        <span className="intro-loader__reel-window inline-block overflow-hidden text-center">
          <span
            className="intro-loader__reel-track block"
            style={{ "--intro-loader-num": num } as React.CSSProperties}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <span
                key={d}
                className="intro-loader__reel-digit flex items-center justify-center"
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
