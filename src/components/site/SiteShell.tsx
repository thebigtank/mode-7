"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { IntroLoader } from "./IntroLoader";
import { MegaMenu } from "./MegaMenu";
import { RevealWordmark } from "./RevealWordmark";
import { SearchOverlay } from "./SearchOverlay";
import { SevenWidget } from "./SevenWidget";
import { lockPageScroll, unlockPageScroll, useLenis } from "@/hooks/useLenis";
import { COLOR, FONT } from "@/lib/theme";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { WIREFRAME } from "@/lib/wireframe-config";

/** The intro plays once per full page load, not on client-side navigations. */
let introPlayed = false;

/**
 * Site chrome shared by every route: nav, mega menu, search, Seven, the footer
 * card and the sticky-reveal wordmark behind it.
 *
 * Structure matters here. Page content lives in an OPAQUE white wrapper
 * (`z-index: 1`) that slides up over the fixed wordmark layer; the spacer after
 * it is what finally uncovers the wordmark at full scroll.
 *
 * The root uses `overflow-x: clip`, NOT `hidden` — `hidden` would make the root
 * a scroll container and silently break the sticky header.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  useLenis();
  const pathname = usePathname();

  // The intro belongs to the landing page only — the design's sub-pages all ship
  // with `introActive: false`. Landing on /shop directly should not cost 5.7s.
  const [introActive, setIntroActive] = useState(
    WIREFRAME.showIntro && !introPlayed && pathname === "/",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);

  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (menuTimer.current) clearTimeout(menuTimer.current);
      if (searchTimer.current) clearTimeout(searchTimer.current);
    },
    [],
  );

  /**
   * Routed through the shared ref-counted lock so the menu and an overlay
   * opened inside the page can't fight over the body's overflow.
   */
  const lockScroll = useCallback((locked: boolean) => {
    if (locked) lockPageScroll();
    else unlockPageScroll();
  }, []);

  const closeMenu = useCallback(() => {
    if (menuClosing) return;
    setMenuClosing(true);
    lockScroll(false);
    if (menuTimer.current) clearTimeout(menuTimer.current);
    // matches the reverse curtain + row-out animation
    menuTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 660);
  }, [menuClosing, lockScroll]);

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    setMenuOpen(true);
    setMenuClosing(false);
    setSearchOpen(false);
    lockScroll(true);
  }, [menuOpen, closeMenu, lockScroll]);

  const openSearch = useCallback(() => {
    if (searchOpen) return;
    setSearchOpen(true);
    setSearchClosing(false);
    setMenuOpen(false);
    lockScroll(true);
  }, [searchOpen, lockScroll]);

  const closeSearch = useCallback(() => {
    if (searchClosing) return;
    setSearchClosing(true);
    lockScroll(false);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchOpen(false);
      setSearchClosing(false);
    }, 320);
  }, [searchClosing, lockScroll]);

  const onIntroDone = useCallback(() => {
    introPlayed = true;
    setIntroActive(false);
  }, []);

  /**
   * `/homepage-v2` is a parallel exploration that ships its OWN header and
   * footer on its own palette, so the v1 chrome — nav, mega menu, search, the
   * footer card, the reveal wordmark and the Seven widget — is suppressed on
   * that route and only that route. `useLenis()` above still runs, so smooth
   * scroll applies to v2 as well.
   *
   * This early return sits after EVERY hook call: putting it any higher would
   * make hook order conditional and break the rules of hooks on navigation
   * into or out of the route.
   */
  const isV2 = pathname.startsWith("/homepage-v2");
  if (isV2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: V2.wash,
          color: V2.ink,
          /* v2 has its own type stack; v1's FONT is untouched below */
          fontFamily: V2_FONT.body,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: COLOR.cream,
        color: COLOR.ink,
        fontFamily: FONT.body,
        overflowX: "clip",
        position: "relative",
      }}
    >
      {/* content layer: opaque, slides up over the reveal wordmark */}
      <div style={{ position: "relative", zIndex: 1, background: COLOR.cream }}>
        {introActive && <IntroLoader onDone={onIntroDone} />}

        <Header
          menuOpen={menuOpen}
          onToggleMenu={toggleMenu}
          onOpenSearch={openSearch}
        />

        {menuOpen && <MegaMenu closing={menuClosing} onClose={closeMenu} />}
        {searchOpen && (
          <SearchOverlay closing={searchClosing} onClose={closeSearch} />
        )}

        {children}

        {/* Breathing room above the footer, held here rather than patched into
            ten pages: most routes end on a cream section with no bottom padding
            and need the gap. The homepage is the exception — it now ends on a
            full-bleed coloured band (Customer Reviews), which has to meet the
            footer flush, so the spacer collapses to nothing there. */}
        {pathname !== "/" && <div style={{ height: 104 }} />}

        <Footer />
      </div>

      {/* Scroll room so the content slides up to uncover the wordmark. On
          mobile there is no wordmark to uncover, so .m7-reveal-spacer shrinks
          this to just the height of the legal row. */}
      <div className="m7-reveal-spacer" style={{ height: "calc(17vw + 150px)" }} />
      <RevealWordmark />

      {WIREFRAME.showSeven && !introActive && (
        <SevenWidget hidden={menuOpen || searchOpen} />
      )}
    </div>
  );
}
