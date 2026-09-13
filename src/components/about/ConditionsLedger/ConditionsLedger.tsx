"use client";

import { type CSSProperties, useCallback, useState } from "react";

type Condition = { t: string; b: string };

const SHOT: Record<string, string> = {
  "Unreliable grid power": "/hero/lifecycle-solar.webp",
  "Trust is scarce": "/hero/workshop.webp",
  "Hardware outpaces income": "/hero/lifecycle-devices.webp",
  "Devices are livelihoods": "/hero/lifecycle-refurb.webp",
};

const SHOT_KEY: Record<string, string> = {
  "Unreliable grid power": "solar",
  "Trust is scarce": "workshop",
  "Hardware outpaces income": "devices",
  "Devices are livelihoods": "refurb",
};

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
      {conditions.map((c, i) => {
        const shot = SHOT[c.t];
        const shotKey = SHOT_KEY[c.t];
        return (
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
                shot
                  ? ({ "--a-cond-shot": `url(${shot})` } as CSSProperties)
                  : undefined
              }
            >
              <span className="a-cond__fill" aria-hidden />

              <h3 className="a-cond__t">{c.t}</h3>
              <p className="a-cond__b">{c.b}</p>

              {shot && (
                <span className="a-cond__shot" data-shot={shotKey} aria-hidden />
              )}
            </article>
          </div>
        );
      })}
    </div>
  );
}
