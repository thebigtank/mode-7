"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BagIcon, SearchIcon, StoreIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";
import { V2, V2_CONTAINER, V2_FONT, V2_TYPE } from "@/lib/theme-v2";

/**
 * Chrome for `/homepage-v2`: the reference's dark announcement strip above a
 * sticky bar carrying wordmark, nav and a single dark action block.
 *
 * The bar itself is a full-width, 72px, TRANSPARENT sticky rail; the visible
 * "floating menu" is an inner panel inset to the 1280 container, so the wash
 * page ground shows either side of it and it reads as detached. Square corners,
 * no border — the panel is one step lighter than the page (`washSoft` over
 * `wash`), and carries a soft ground shadow because content now passes through
 * the GAP above it and the lift alone no longer separates the two. The panel
 * is frosted glass: `washSoft` at 40% opacity plus a backdrop blur, so
 * whatever scrolls behind it (the GAP, page content once stuck) shows
 * through as blurred shapes rather than washing out to a flat tint — a
 * higher fill (72% was tried first) reads as an opaque card over dark
 * sections, not glass. A light top/side border stands in for the edge a
 * real pane would catch, since the fill alone is now too faint to read as a
 * distinct panel. Both the unprefixed and `-webkit-` `backdropFilter` are
 * set — Safari has no fallback for the unprefixed one.
 *
 * It hides on scroll down and returns on scroll up via the shared
 * `useHeaderHide`, which sets `translateY(-100%)`. See the `GAP` note on the
 * <header> for why the rail is NAV_H + GAP tall while the panel is only NAV_H.
 *
 * Mode 7 content: the "Mode 7" wordmark; four existing-route labels drawn from
 * `menuItems` in content.ts (no new labels invented, "About Us" first, "Shop"
 * removed since the shop action icon below replaces it); the announcement
 * line is the tagline already used in the site metadata and the v1 hero, so
 * nothing is written for the strip. `SiteShell` suppresses the v1 chrome on
 * this route.
 *
 * Layout: the panel's inner row is a TWO-COLUMN grid, `auto 1fr` — a left
 * group and the actions. The left group is wordmark + nav in one flex row
 * (gap between them, not a grid track of their own), so the links sit close
 * to the logo rather than optically centred in the panel — the earlier
 * `1fr auto 1fr` centred layout is what this replaced, at the user's
 * request. The actions column stays `1fr` with `justifySelf:end`, so it is
 * still pinned flush right regardless of how wide the left group gets.
 *
 * Actions: search, shop and cart as bare 40x40 icon boxes, the same anatomy as
 * v1's `Header.tsx` — no ground, no border, `currentColor` icons, and a small
 * count badge pinned to the bag. Painted from `V2` only; nothing here imports
 * v1's `COLOR`. The search icon calls `onOpenSearch`, supplied by `SiteShell`
 * — the same `SearchOverlay` v1 uses, opened here and painted in the v2
 * palette via its `variant` prop rather than reimplemented.
 *
 * Colour: the strip's leading dot is gold as a FILL (a graphic, not type). The
 * cart badge is the one filled mark in the bar: gold ground with `accentOn` ink
 * as the number (10.02:1), ringed 1.5px in `washSoft` — the PANEL's ground, not
 * the page's, because the badge sits on the panel — so it separates from the
 * bag drawn behind it.
 *
 * Nav focus: hovering (or keyboard-focusing) a link dims its siblings and
 * drops a translucent scrim over the page behind the header — `.v2-nav-link`
 * / `.v2-nav-scrim` in `V2Styles`. The active link is resolved in React state
 * exactly the way `LifecycleV2` resolves its active row: `hover` and `focus`
 * are held separately and the winner is `hover ?? focus`, because `:hover`
 * and `:focus-within` are independent CSS conditions that would otherwise
 * both light up at once (a pointer on one link, a lingering keyboard focus on
 * another). See `LifecycleV2.tsx`'s load-bearing note for the full argument;
 * this is the same pattern, not a reinvention of it.
 *
 * The scrim is a SIBLING of `<header>`, not a descendant: `<header>` carries
 * a permanent inline `transform` for the hide/show slide, and a transformed
 * ancestor becomes the containing block for a `position:fixed` descendant —
 * nesting the scrim inside would pin it to the header's own 96px-tall box
 * instead of the viewport. As a sibling, `position:fixed` is genuinely
 * viewport-relative. The announcement strip is lifted to `zIndex:1002`, above
 * the scrim's 1000, so the strip stays fully lit — it reads as part of the
 * same nav chrome as the panel beneath it, not as page content to dim.
 */
const NAV = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Smart Home", href: "/smart-home" },
];

/** Matches v1's `Header` default so the two bars report the same bag. */
const CART_COUNT = 12;

/** The panel's own height, and the float gap above it when stuck. */
const NAV_H = 72;
const GAP = 24;

export function HeaderV2({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const barRef = useRef<HTMLElement>(null);
  /* Shared with v1: pure transform logic, no palette. Hides on scroll down,
     returns on scroll up. It only works because the page root uses
     `overflow-x: clip` rather than `hidden` — `hidden` would make the root a
     scroll container and silently kill `position: sticky`. */
  useHeaderHide(barRef);

  /**
   * Same shape as `LifecycleV2`'s active-row state, for the same reason: two
   * independent inputs resolved to one winner, so a pointer on one link
   * always beats a focus sitting on another, and dropping the pointer falls
   * back to the focused link rather than to nothing.
   */
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const active = hover ?? focus;

  /** `:focus-visible` is not supported everywhere `matches` is — degrade to
   *  "any focus counts" rather than throwing and losing the keyboard path. */
  const isFocusVisible = useCallback((el: Element) => {
    try {
      return el.matches(":focus-visible");
    } catch {
      return true;
    }
  }, []);

  return (
    <>
      {/* announcement strip — ink, 40px, mono, centred. Lifted above the nav
          scrim (zIndex:1002 > the scrim's 1000) so it stays fully lit as part
          of the header chrome rather than dimming as page content — see the
          "Nav focus" note above. */}
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
          /* THE FLOAT GAP now lives in `paddingTop` below, not in `top`. The
             rail is pinned flush to the viewport (top:0); the panel then
             sits GAP down INSIDE the rail via paddingTop, so the same GAP
             shows above the panel whether the rail is resting in normal flow
             (right under the announcement strip) or stuck. Previously `top`
             carried the gap, which only pinned the rail — and therefore the
             panel sitting at the rail's top edge — GAP down once scrolling
             had engaged sticky; at rest the rail sat flush under the strip
             with no padding above the panel, so the two touched. */
          top: 0,
          zIndex: 1001,
          /* The rail is GAP taller than the panel it carries, with the extra
             GAP as padding ABOVE. The panel now sits at the BOTTOM of the
             rail's padding box (paddingTop above it, none below), so the
             panel's bottom edge always equals the rail's bottom edge. That is
             the invariant `useHeaderHide`'s `translateY(-100%)` — a v1 hook
             this exploration must not edit — depends on: translating the rail
             by its own full height (NAV_H + GAP) always drops the panel's
             (== the rail's) bottom edge to exactly y=0, whether the rail is
             resting in flow or pinned by `position:sticky`. Keep NAV_H, GAP
             and the translate all derived from these two constants —
             hardcoding any one of them breaks the hide at a different
             height. */
          height: NAV_H + GAP,
          paddingTop: GAP,
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
              /* 72% of washSoft fully washed out anything dark behind it —
                 over an ink section the panel just read as a flat opaque
                 grey card, no different from a solid fill. Dropped to 40%
                 so dark content blurs through as recognisable dark shapes
                 (the glass idiom), not as a uniform light box; a thin
                 top-biased light border stands in for the specular edge a
                 real glass pane would catch, since the fill alone is now too
                 faint to read as a distinct panel on its own. */
              background: "rgba(237,240,237,0.4)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderTop: "1px solid rgba(255,255,255,0.5)",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
              height: "100%",
              pointerEvents: "auto",
              /* With a gap, content scrolls through the space above the panel,
                 so the `washSoft`-over-`wash` lift alone no longer separates
                 it. A restrained drop shadow does — 5% ink at a 16px blur is
                 a soft ground shadow, not a card elevation, and stays inside
                 the reference's flat register. */
              boxShadow: "0 4px 16px rgba(23,29,29,0.05)",
              padding: "0 clamp(16px,2.2vw,32px)",
              /* two columns, not three: the left group (wordmark + nav) sits
                 together at the start, actions at the end. Both children keep
                 an explicit `gridColumn` (trap #3 in CLAUDE.md) even though
                 there are only ever two of them — `.v2-navlinks` going
                 `display:none` under 980px happens INSIDE the left group's own
                 flex row, not to a grid item, so it can never hand this grid
                 an auto-placement surprise; the explicit columns are kept
                 anyway as the established defensive pattern. */
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
                /* the gap that puts the links close to the logo — deliberately
                   tighter than the 12-32px gap between the two grid columns,
                   so the pairing reads as one group, not three evenly spaced
                   items. */
                gap: "clamp(24px,3.4vw,56px)",
              }}
            >
              <Link
                href="/homepage-v2"
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
                /* `display` is set by `.v2-navlinks` so the 980px hide rule wins */
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
                    /* opacity lives in the stylesheet (.v2-nav-link /
                       .is-dimmed / .is-active), never inline — an inline
                       opacity here would out-specify those rules and the dim
                       would silently never fire. */
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

      {/* Page scrim for nav focus — a SIBLING of <header>, not a descendant
          (see the "Nav focus" note above for why). Resting opacity:0 and the
          fade both live in `.v2-nav-scrim` in `V2Styles`; this element only
          ever carries the `is-active` class. Always pointer-events:none so a
          click reaches the page underneath, hovered link or not. */}
      <div aria-hidden className={`v2-nav-scrim${active !== null ? " is-active" : ""}`} />
    </>
  );
}
