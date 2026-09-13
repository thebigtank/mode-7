"use client";

import Link from "next/link";
import { type CSSProperties, useCallback, useState } from "react";
import { pillars } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { Band } from "@/components/ui/Band";

const PILLAR_IMAGE: Record<string, string> = {
  "Premium Devices": "/hero/lifecycle-devices.webp",
  "Certified Refurbished": "/hero/lifecycle-refurb.webp",
  "Smart Home Automation": "/hero/lifecycle-smarthome.webp",
  "Solar & Green Energy": "/hero/lifecycle-solar.webp",
};

const PILLAR_HREF: Record<string, string> = {
  "Premium Devices": "/shop",
  "Certified Refurbished": "/shop",
  "Smart Home Automation": "/smart-home",
  "Solar & Green Energy": "/green-energy",
};

export function LifecycleV2() {
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
    <Band ground="wash" className="v2-life-band">
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            padding: "7px 16px",
            borderRadius: 99,
            border: `1px solid ${V2.ink}`,
            background: "transparent",
            fontFamily: V2_FONT.mono,
            fontSize: 11,
            letterSpacing: V2_TYPE.mono.letterSpacing,
            lineHeight: 1.2,
            textTransform: "uppercase",
            color: V2.ink,
          }}
        >
          The ecosystem
        </span>

        <h2
          style={{
            margin: "clamp(20px,2.1vw,30px) auto 0",
            maxWidth: 900,
            fontFamily: V2_FONT.display,
            fontWeight: 400,
            fontSize: "clamp(34px,3.9vw,56px)",
            lineHeight: 1.2,
            letterSpacing: V2_TYPE.h2.letterSpacing,
            color: V2.ink,
            textWrap: "balance",
          }}
        >
          A fully integrated technology lifecycle.
        </h2>

        <p
          style={{
            margin: "clamp(14px,1.4vw,20px) auto 0",
            maxWidth: 560,
            fontFamily: V2_FONT.body,
            fontWeight: 300,
            fontSize: V2_TYPE.body.fontSize,
            lineHeight: 1.55,
            color: V2.muted,
            textWrap: "pretty",
          }}
        >
          From the moment you buy to the day you upgrade, every part of the Mode 7
          ecosystem works together.
        </p>
      </div>

      <div className="v2-life-list">
        {pillars.map((p, i) => (
          <Link
            key={p.title}
            href={PILLAR_HREF[p.title] ?? "/services"}
            className={`v2-life-row${active === i ? " is-active" : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            onFocus={(e) => {
              if (isFocusVisible(e.currentTarget)) setFocus(i);
            }}
            onBlur={() => setFocus((f) => (f === i ? null : f))}
            style={
              {
                "--v2-life-shot": `url(${PILLAR_IMAGE[p.title] ?? ""})`,
              } as CSSProperties
            }
          >
            <span className="v2-life-fill" aria-hidden />

            <span className="v2-life-shot" aria-hidden />

            <span className="v2-life-text">
              <span className="v2-life-title">{p.title}</span>
              <span className="v2-life-sub">{p.sub}</span>
            </span>

            <span className="v2-life-arrow" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M7.5 18.5 18.5 7.5M9.6 7.5h8.9v8.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </Band>
  );
}
