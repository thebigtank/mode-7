"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BagIcon, SearchIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";
import { COLOR, FONT } from "@/lib/theme";

/**
 * Global nav. MODE 7 wordmark on the left; on the right ONLY search, the live
 * shopping bag (with its dark count badge) and the hamburger — no nav links, no
 * circle borders on any icon.
 *
 * Sticky and hide-on-scroll (see `useHeaderHide`). When the mega menu opens the
 * header is pinned `fixed` so it stays put above the curtain, and search + bag
 * are hidden so only the hamburger — morphed into an X — remains.
 */
export function Header({
  menuOpen,
  onToggleMenu,
  onOpenSearch,
  cartCount = 12,
  hasCart = true,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenSearch: () => void;
  cartCount?: number;
  hasCart?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [hamHover, setHamHover] = useState(false);

  // While the menu is open the header is pinned; hide-on-scroll would fight it.
  useHeaderHide(ref, !menuOpen);

  const hamUp = menuOpen
    ? "translateY(4.5px) rotate(45deg)"
    : hamHover
      ? "translateY(-1.5px)"
      : "translateY(0)";
  const hamDown = menuOpen
    ? "translateY(-4.5px) rotate(-45deg)"
    : hamHover
      ? "translateY(1.5px)"
      : "translateY(0)";

  return (
    <header
      ref={ref}
      style={{
        position: menuOpen ? "fixed" : "sticky",
        top: 0,
        left: menuOpen ? 0 : undefined,
        right: menuOpen ? 0 : undefined,
        zIndex: 250,
        /* Translucent cream, not translucent white — the header floats over the
           rust hero, and a white veil there read as a wash rather than as the
           page's own ground continuing. */
        background: "rgba(239,230,209,0.9)",
        color: COLOR.ink,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLOR.line}`,
        transition: "transform .35s ease,background .3s ease",
        willChange: "transform",
        transform: menuOpen ? "translateY(0)" : undefined,
      }}
    >
      <nav
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "18px var(--m7-pad)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: FONT.head,
            fontWeight: 700,
            fontSize: "clamp(17px, 4vw, 21px)",
            letterSpacing: "clamp(3px, 1vw, 5px)",
            whiteSpace: "nowrap",
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MODE&nbsp;7
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!menuOpen && (
            <>
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
                  color: "inherit",
                  font: "inherit",
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
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                <BagIcon />
                {hasCart && (
                  <span
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
                      /* rust: the page's action colour, and the one badge on the
                         page. cream on rust is 4.85:1. Ringed in cream so it
                         separates from the bag icon behind it. */
                      background: COLOR.rust,
                      color: COLOR.cream,
                      border: `1.5px solid ${COLOR.cream}`,
                      borderRadius: 99,
                      fontFamily: FONT.head,
                      fontSize: 10,
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* hamburger — two thin bars that morph into an X */}
          <span
            onClick={onToggleMenu}
            onMouseEnter={() => setHamHover(true)}
            onMouseLeave={() => setHamHover(false)}
            aria-label="Menu"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              width: 42,
              height: 40,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 27,
                height: 2,
                background: "currentColor",
                borderRadius: 2,
                transition: "transform .3s cubic-bezier(.4,0,.2,1)",
                transform: hamUp,
              }}
            />
            <span
              style={{
                width: 27,
                height: 2,
                background: "currentColor",
                borderRadius: 2,
                transition: "transform .3s cubic-bezier(.4,0,.2,1)",
                transform: hamDown,
              }}
            />
          </span>
        </div>
      </nav>
    </header>
  );
}
