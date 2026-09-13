"use client";

import Link from "next/link";
import { type CSSProperties, useCallback, useState } from "react";
import content from "@/content/home.json";
import { Band } from "@/components/ui/Band";

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
      <div className="v2-life-intro text-center">
        <span className="v2-life-eyebrow inline-block uppercase">
          {content.lifecycle.label}
        </span>

        <h2 className="v2-life-heading text-pretty">{content.lifecycle.heading}</h2>

        <p className="v2-life-body text-pretty">{content.lifecycle.body}</p>
      </div>

      <div className="v2-life-list">
        {content.pillars.map((p, i) => (
          <Link
            key={p.title}
            href={p.href}
            className={`v2-life-row grid items-center${active === i ? " is-active" : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            onFocus={(e) => {
              if (isFocusVisible(e.currentTarget)) setFocus(i);
            }}
            onBlur={() => setFocus((f) => (f === i ? null : f))}
            style={{ "--v2-life-shot": `url(${p.image})` } as CSSProperties}
          >
            <span className="v2-life-fill" aria-hidden />

            <span className="v2-life-shot" aria-hidden />

            <span className="v2-life-text block">
              <span className="v2-life-title block">{p.title}</span>
              <span className="v2-life-sub block">{p.sub}</span>
            </span>

            <span className="v2-life-arrow inline-flex" aria-hidden>
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
