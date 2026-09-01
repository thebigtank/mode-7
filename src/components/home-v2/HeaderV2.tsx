"use client";

import Link from "next/link";
import { useRef } from "react";
import { BagIcon, SearchIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";
import { V2, V2_CONTAINER, V2_FONT, V2_TYPE } from "@/lib/theme-v2";

/**
 * Chrome for `/homepage-v2`: the reference's dark announcement strip above a
 * sticky bar carrying wordmark, nav and a single dark action block.
 *
 * The bar itself is a full-width, 88px, TRANSPARENT sticky rail; the visible
 * "floating menu" is an inner panel inset to the 1280 container, so the wash
 * page ground shows either side of it and it reads as detached. Square corners,
 * no border — the panel is one step lighter than the page (`washSoft` over
 * `wash`), and carries a soft ground shadow because content now passes through
 * the 14px gap above it and the lift alone no longer separates the two.
 *
 * It hides on scroll down and returns on scroll up via the shared
 * `useHeaderHide`, which sets `translateY(-100%)`. See the `GAP` note on the
 * <header> for why the rail is 102px tall while the panel is 88px.
 *
 * Mode 7 content: the "Mode 7" wordmark; five existing-route labels drawn from
 * `menuItems` in content.ts (no new labels invented); the announcement line is
 * the tagline already used in the site metadata and the v1 hero, so nothing is
 * written for the strip. `SiteShell` suppresses the v1 chrome on this route.
 *
 * Layout: the panel's inner row is a THREE-COLUMN grid, `1fr auto 1fr` —
 * wordmark left, links centre, actions right. The links are therefore optically
 * centred in the panel regardless of how wide the wordmark or the actions get;
 * a flex row with `margin:auto` on the links would drift as either side changed.
 *
 * Actions: search and cart as bare 40x40 icon boxes, the same anatomy as v1's
 * `Header.tsx` — no ground, no border, `currentColor` icons, and a small count
 * badge pinned to the bag. Painted from `V2` only; nothing here imports v1's
 * `COLOR`.
 *
 * Colour: the strip's leading dot is gold as a FILL (a graphic, not type). The
 * cart badge is the one filled mark in the bar: gold ground with `accentOn` ink
 * as the number (10.02:1), ringed 1.5px in `washSoft` — the PANEL's ground, not
 * the page's, because the badge sits on the panel — so it separates from the
 * bag drawn behind it.
 */
const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Smart Home", href: "/smart-home" },
  { label: "About Us", href: "/about" },
];

/** Matches v1's `Header` default so the two bars report the same bag. */
const CART_COUNT = 12;

/** The panel's own height, and the float gap above it when stuck. */
const NAV_H = 88;
const GAP = 14;

export function HeaderV2() {
  const barRef = useRef<HTMLElement>(null);
  /* Shared with v1: pure transform logic, no palette. Hides on scroll down,
     returns on scroll up. It only works because the page root uses
     `overflow-x: clip` rather than `hidden` — `hidden` would make the root a
     scroll container and silently kill `position: sticky`. */
  useHeaderHide(barRef);

  return (
    <>
      {/* announcement strip — ink, 40px, mono, centred */}
      <div style={{ background: V2.ink }}>
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
          /* THE FLOAT GAP. Stuck, the rail parks 14px down, so the panel's top
             edge is at y=14 and page content passes visibly through the strip
             above it — the bar reads as floating rather than pinned. */
          top: GAP,
          zIndex: 1001,
          /* The rail is GAP taller than the panel it carries, with the extra
             14px as padding BELOW. That is what makes `useHeaderHide`'s
             `translateY(-100%)` — a v1 hook this exploration must not edit —
             equal -(88 + 14) = -102px, exactly the distance that drops the
             panel's bottom edge to y=0. A bare `top:14` with a 88px rail would
             translate only -88 and leave 14px of bar peeking. */
          height: NAV_H + GAP,
          paddingBottom: GAP,
          boxSizing: "border-box",
          background: "transparent",
          /* the rail is a transparent spacer either side of the panel; only the
             panel itself should catch the pointer */
          pointerEvents: "none",
          transform: "translateY(0)",
          transition: "transform .32s cubic-bezier(.4,0,.2,1)",
          willChange: "transform",
        }}
      >
        <div style={{ ...V2_CONTAINER, height: "100%" }}>
          <div
            style={{
              background: V2.washSoft,
              height: "100%",
              pointerEvents: "auto",
              /* With a gap, content scrolls through the space above the panel,
                 so the `washSoft`-over-`wash` lift alone no longer separates
                 it. A restrained drop shadow does — 10% ink at a 24px blur is
                 a soft ground shadow, not a card elevation, and stays inside
                 the reference's flat register. */
              boxShadow: "0 6px 24px rgba(23,29,29,0.10)",
              padding: "0 clamp(16px,2.2vw,32px)",
              /* three columns, not a flex row: the centre column is centred in
                 the PANEL, so it cannot drift as the side columns change width */
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "clamp(12px,2vw,32px)",
            }}
          >
            <Link
              href="/homepage-v2"
              style={{
                /* explicit column: `.v2-navlinks` goes `display:none` under
                   980px, which removes it from the grid FLOW entirely — with
                   auto-placement the actions would then slide into column 2
                   and stop sitting flush right. */
                gridColumn: 1,
                justifySelf: "start",
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
              /* `display` is set by `.v2-navlinks` so the 980px hide rule wins */
              style={{
                gridColumn: 2,
                gap: "clamp(16px,2.2vw,32px)",
                alignItems: "center",
              }}
              aria-label="Primary"
            >
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 16,
                    fontWeight: 400,
                    /* ink, not accent: gold type on wash is 1.40:1 */
                    color: V2.ink,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div
              style={{
                gridColumn: 3,
                justifySelf: "end",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: V2.ink,
              }}
            >
              {/* No search overlay exists on v2, so this is a real button with
                  no handler rather than a link pointing nowhere. */}
              <button
                type="button"
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
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <SearchIcon />
              </button>

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
                    /* gold ground, ink numeral: 10.02:1. The ring is washSoft,
                       the PANEL's ground, because that is what the badge sits
                       on — it separates the badge from the bag behind it. */
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
    </>
  );
}
