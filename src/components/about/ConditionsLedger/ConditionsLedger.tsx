"use client";

import { type CSSProperties, useCallback, useState } from "react";

type Condition = { t: string; b: string; shot?: string; shotKey?: string };

const SHOT_KEYS = {
  solar: "solar",
  workshop: "workshop",
  devices: "devices",
  refurb: "refurb",
} as const;

function normalizeShotKey(key: string | undefined) {
  if (!key) return undefined;
  return SHOT_KEYS[key as keyof typeof SHOT_KEYS];
}

export function ConditionsLedger({ conditions }: { conditions: Condition[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const active = hover ?? focus;

  const isFocusVisible = useCallback((el: Element) => {
    try {
      return el.matches(":focus-visible");
    } catch {
      return true;
    }
  }, []);

  return (
    <div className="a-ledger">
      {conditions.map((c, i) => (
        <div data-rv key={c.t}>
          <article
            tabIndex={0}
            className={`a-cond${active === i ? " is-active" : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            onFocus={(e) => {
              if (isFocusVisible(e.currentTarget)) setFocus(i);
            }}
            onBlur={() => setFocus((f) => (f === i ? null : f))}
            style={
              c.shot
                ? ({ "--a-cond-shot": `url(${c.shot})` } as CSSProperties)
                : undefined
            }
          >
            <span className="a-cond__fill" aria-hidden />

            <h3 className="a-cond__t">{c.t}</h3>
            <p className="a-cond__b">{c.b}</p>

            {c.shot && (
              <span className="a-cond__shot" data-shot={normalizeShotKey(c.shotKey)} aria-hidden />
            )}
          </article>
        </div>
      ))}
    </div>
  );
}
