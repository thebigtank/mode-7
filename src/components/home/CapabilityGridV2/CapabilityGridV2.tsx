"use client";

import { type CSSProperties, type FocusEvent, useCallback, useState } from "react";
import { heroFeatures } from "@/lib/content";
import { V2, V2_FONT, V2_TYPE } from "@/lib/theme-v2";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";

const BLURB: Record<string, string> = {
  "Premium Devices": "Laptops, tablets and phones, fully vetted.",
  "Certified Refurbished": "Renewed, sealed and guaranteed like new.",
  "Smart Home Automation": "One app to run your entire connected home.",
  "Solar & Green Energy": "Clean-energy systems, installed and managed.",
};

const CARD_IMAGE: Record<string, string> = {
  "Premium Devices": "/hero/lifecycle-devices.webp",
  "Certified Refurbished": "/hero/lifecycle-refurb.webp",
  "Smart Home Automation": "/hero/lifecycle-smarthome.webp",
  "Solar & Green Energy": "/hero/lifecycle-solar.webp",
};

function Icon({ name, color }: { name: string; color: string }) {
  const s = { stroke: color, strokeWidth: 1.2, fill: "none" } as const;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      {name === "Premium Devices" ? (
        <>
          <rect x="3" y="4" width="14" height="11" rx="1" {...s} />
          <path d="M1 18h18" {...s} strokeLinecap="round" />
          <rect x="18" y="9" width="5" height="11" rx="1" {...s} />
        </>
      ) : name === "Certified Refurbished" ? (
        <>
          <path d="M20 12a8 8 0 1 1-2.4-5.7" {...s} strokeLinecap="round" />
          <path d="M20 3v4h-4" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 12.2 11 14.7l4.6-4.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : name === "Smart Home Automation" ? (
        <>
          <path d="M3.5 10.5 12 3.5l8.5 7" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 9.8V20h13V9.8" {...s} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="14.5" r="2.2" {...s} />
        </>
      ) : name === "Solar & Green Energy" ? (
        <>
          <circle cx="12" cy="12" r="4" {...s} />
          <path
            d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"
            {...s}
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M6 9V6.5a6 6 0 0 1 12 0V9" {...s} strokeLinecap="round" />
          <rect x="3.5" y="9" width="17" height="11" rx="2" {...s} />
        </>
      )}
    </svg>
  );
}

export function CapabilityGridV2() {
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
    <Band ground="wash" className="v2-cap-band">
      <H2
        size="clamp(34px,3.9vw,56px)"
        lineHeight={1.06}
        style={{ maxWidth: 680, letterSpacing: "-1.1px", marginBottom: "clamp(24px,3.2vw,46px)" }}
      >
        Built around you, from first tap to upgrade.
      </H2>

      <div className="v2-services">
        {heroFeatures.map((f, i) => {
          const dark = i === 4;
          const ground = dark ? V2.ink : V2.white;
          const title = dark ? V2.white : V2.ink;
          const body = dark ? V2.faint : V2.muted;
          const shot = CARD_IMAGE[f];

          return (
            <article
              key={f}
              className={`v2-capcard${active === i ? " is-active" : ""}`}
              style={{
                background: ground,
                borderRadius: 2,
                minHeight: 300,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                ...(shot ? ({ "--v2-card-shot": `url(${shot})` } as CSSProperties) : null),
              }}
              {...(shot
                ? {
                    tabIndex: 0,
                    onPointerEnter: () => setHover(i),
                    onPointerLeave: () => setHover((h) => (h === i ? null : h)),
                    onFocus: (e: FocusEvent<HTMLElement>) => {
                      if (isFocusVisible(e.currentTarget)) setFocus(i);
                    },
                    onBlur: () => setFocus((fo) => (fo === i ? null : fo)),
                  }
                : {})}
            >
              {shot ? <span className="v2-capcard-shot" aria-hidden /> : null}

              <Icon name={f} color={title} />
              <h3
                style={{
                  margin: "22px 0 0",
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.25,
                  letterSpacing: "-0.24px",
                  color: title,
                }}
              >
                {f}
              </h3>
              {BLURB[f] ? (
                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: V2_FONT.body,
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: "26px",
                    color: body,
                  }}
                >
                  {BLURB[f]}
                </p>
              ) : null}
              <div className="v2-explore" style={{ marginTop: "auto", paddingTop: 24 }}>
                <ArrowLink label="Explore" color={dark ? V2.white : V2.ink} />
              </div>
            </article>
          );
        })}

        <article
          style={{
            background: V2.accent,
            borderRadius: 2,
            minHeight: 300,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: V2_FONT.display,
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.12,
              letterSpacing: V2_TYPE.h2.letterSpacing,
              color: V2.accentOn,
            }}
          >
            Not sure where to start?
          </h3>
          <ArrowLink
            label="Explore Our Online Shop"
            href="/shop"
            color={V2.accentOn}
            style={{ marginTop: "auto", paddingTop: 24 }}
          />
        </article>
      </div>
    </Band>
  );
}
