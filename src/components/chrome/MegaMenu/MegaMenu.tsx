"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { ArrowRightIcon, socials } from "@/components/Icons";
import { useMenuDots } from "@/hooks/useMenuDots";
import content from "@/content/chrome.json";

export function MegaMenu({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  useMenuDots();

  const { items, previewFallbackLabel, blurb, legalLinks } = content.megaMenu;
  const active = hover || items[0].label;
  const state = closing ? "closing" : "open";

  return (
    <div data-state={state} className="m7-megamenu">
      <div
        onClick={onClose}
        className="m7-megamenu__scrim fixed inset-0 z-[180]"
      />
      <div className="m7-megamenu__rust fixed top-0 left-0 right-0 z-[199]" />
      <div
        data-lenis-prevent
        className="m7-megamenu__panel fixed top-0 left-0 right-0 z-[200] overflow-x-hidden overflow-y-auto"
      >
        <div className="m7-megamenu__cols grid">
          <div
            onMouseLeave={() => setHover(null)}
            className="m7-megamenu__nav flex flex-col justify-start min-h-0"
          >
            {items.map((it, i) => {
              const last = i === items.length - 1;
              const shade = Math.round(255 * (1 - (0.04 + i * 0.045)));
              const isActive = active === it.label;
              const rowDelay = closing
                ? `${(i * 0.04).toFixed(2)}s`
                : `${(0.5 + i * 0.13).toFixed(2)}s`;

              return (
                <div
                  key={it.label}
                  className={`m7-megamenu__row${last ? " m7-megamenu__row--last" : ""}`}
                  style={{ "--m7-row-delay": rowDelay } as CSSProperties}
                >
                  <div
                    onMouseEnter={() => setHover(it.label)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      onClose();
                      router.push(it.href);
                    }}
                    data-first={i === 0 ? "" : undefined}
                    className="m7-megamenu__row-link flex flex-col justify-start w-full cursor-pointer"
                    style={
                      { "--m7-row-bg": `rgb(${shade}, ${shade}, ${shade})` } as CSSProperties
                    }
                  >
                    <div
                      data-active={isActive ? "" : undefined}
                      className="m7-megamenu__row-head flex items-center justify-between w-full"
                    >
                      <div className="m7-megamenu__row-title flex items-baseline">
                        <span className="m7-megamenu__row-label">
                          {it.label}
                        </span>
                      </div>
                      <span className="m7-megamenu__arrow-wrap shrink-0 inline-flex">
                        <ArrowRightIcon size={26} strokeWidth={1.9} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="m7-megamenu__aside relative flex flex-col">
            <canvas
              data-menudot
              className="m7-megamenu__dots absolute inset-0 w-full h-full pointer-events-none z-0"
            />
            <div className="m7-megamenu__preview relative z-[1] flex-none overflow-hidden">
              <div className="m7-megamenu__preview-label absolute">
                ▣ {hover || previewFallbackLabel}
              </div>
            </div>
            <div className="m7-megamenu__blurb relative z-[1]">{blurb}</div>
            <div className="m7-megamenu__footer relative z-[1] mt-auto">
              <div className="m7-megamenu__socials flex items-center">
                {socials.map((s) => (
                  <span
                    key={s.name}
                    aria-label={s.name}
                    className="m7-social m7-megamenu__social-item inline-flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {s.icon}
                  </span>
                ))}
              </div>
              <div className="m7-megamenu__legal flex flex-wrap">
                {legalLinks.map((l) => (
                  <span
                    key={l}
                    className="m7-muted-link m7-megamenu__legal-item cursor-pointer"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
