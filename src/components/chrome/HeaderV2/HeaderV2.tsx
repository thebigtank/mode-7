"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BagIcon, SearchIcon, StoreIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";
import { V2, V2_CONTAINER, V2_FONT, V2_TYPE } from "@/lib/theme-v2";

const NAV = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Smart Home", href: "/smart-home" },
];

const CART_COUNT = 12;

const NAV_H = 72;
const GAP = 24;

export function HeaderV2({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const barRef = useRef<HTMLElement>(null);
  useHeaderHide(barRef);

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
    <>
      <div style={{ background: V2.ink, position: "relative", zIndex: 1002 }}>
        <div
          style={{
            ...V2_CONTAINER,
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontFamily: V2_FONT.mono,
            fontSize: V2_TYPE.mono.fontSize,
            letterSpacing: V2_TYPE.mono.letterSpacing,
            textTransform: "uppercase",
            color: V2.white,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: V2.accent,
              flex: "0 0 auto",
            }}
          />
          <span>Every unit vetted, sealed and guaranteed</span>
          <Link
            href="/about"
            style={{
              color: V2.faint,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <header
        ref={barRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1001,
          height: NAV_H + GAP,
          paddingTop: GAP,
          boxSizing: "border-box",
          background: "transparent",
          pointerEvents: "none",
          transform: "translateY(0)",
          transition: "transform .32s cubic-bezier(.4,0,.2,1)",
          willChange: "transform",
        }}
      >
        <div style={{ ...V2_CONTAINER, height: "100%" }}>
          <div
            style={{
              background: "rgba(237,240,237,0.4)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderTop: "1px solid rgba(255,255,255,0.5)",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
              height: "100%",
              pointerEvents: "auto",
              boxShadow: "0 4px 16px rgba(23,29,29,0.05)",
              padding: "0 clamp(16px,2.2vw,32px)",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "clamp(12px,2vw,32px)",
            }}
          >
            <div
              style={{
                gridColumn: 1,
                justifySelf: "start",
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: "clamp(24px,3.4vw,56px)",
              }}
            >
              <Link
                href="/"
                style={{
                  flex: "0 0 auto",
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  color: V2.ink,
                  textDecoration: "none",
                }}
              >
                Mode 7
              </Link>

              <nav
                className="v2-navlinks"
                style={{
                  gap: "clamp(16px,2.2vw,32px)",
                  alignItems: "center",
                }}
                aria-label="Primary"
              >
                {NAV.map((n, i) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    className={`v2-nav-link${
                      active === i ? " is-active" : active !== null ? " is-dimmed" : ""
                    }`}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                    onFocus={(e) => {
                      if (isFocusVisible(e.currentTarget)) setFocus(i);
                    }}
                    onBlur={() => setFocus((f) => (f === i ? null : f))}
                    style={{
                      fontFamily: V2_FONT.body,
                      fontSize: 16,
                      fontWeight: 400,
                      color: V2.ink,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div
              style={{
                gridColumn: 2,
                justifySelf: "end",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: V2.ink,
              }}
            >
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                style={{
                  display: "inline-flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  background: "none",
                  border: "none",
                  font: "inherit",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <SearchIcon />
              </button>

              <Link
                href="/shop"
                aria-label="Shop"
                style={{
                  display: "inline-flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <StoreIcon />
              </Link>

              <Link
                href="/cart"
                aria-label="Cart"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <BagIcon />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 0,
                    minWidth: 18,
                    height: 18,
                    padding: "0 4px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    background: V2.accent,
                    color: V2.accentOn,
                    border: `1.5px solid ${V2.washSoft}`,
                    borderRadius: 99,
                    fontFamily: V2_FONT.body,
                    fontSize: 10,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {CART_COUNT}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div aria-hidden className={`v2-nav-scrim${active !== null ? " is-active" : ""}`} />
    </>
  );
}
