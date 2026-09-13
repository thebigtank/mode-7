"use client";

import { type CSSProperties, type FocusEvent, useCallback, useState } from "react";
import content from "@/content/home.json";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";

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
      <H2 className="v2-cap-heading">{content.capabilityGrid.heading}</H2>

      <div className="v2-services grid">
        {content.heroFeatures.map((f, i) => {
          const dark = i === 4;

          return (
            <article
              key={f.title}
              className={`v2-capcard flex flex-col${dark ? " is-dark" : ""}${active === i ? " is-active" : ""}`}
              style={
                f.image
                  ? ({ "--v2-card-shot": `url(${f.image})` } as CSSProperties)
                  : undefined
              }
              {...(f.image
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
              {f.image ? <span className="v2-capcard-shot" aria-hidden /> : null}

              <Icon name={f.title} color={dark ? "var(--color-v2-white)" : "var(--color-v2-ink)"} />
              <h3 className="v2-capcard-title">{f.title}</h3>
              {f.blurb ? <p className="v2-capcard-body">{f.blurb}</p> : null}
              <div className="v2-explore">
                <ArrowLink
                  label="Explore"
                  color={dark ? "var(--color-v2-white)" : "var(--color-v2-ink)"}
                />
              </div>
            </article>
          );
        })}

        <article className="v2-capcard v2-capcard-cta flex flex-col">
          <h3 className="v2-capcard-cta-title">{content.capabilityGrid.cta.heading}</h3>
          <ArrowLink
            label={content.capabilityGrid.cta.label}
            href={content.capabilityGrid.cta.href}
            color="var(--color-v2-accent-on)"
            className="v2-capcard-cta-link"
          />
        </article>
      </div>
    </Band>
  );
}
