"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FooterV2 } from "@/components/home-v2/FooterV2";
import { HeaderV2 } from "@/components/home-v2/HeaderV2";
import { V2Styles } from "@/components/home-v2/V2Styles";
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
   * Every route matched below gets the v2 chrome — `V2Styles`, `HeaderV2`
   * and `FooterV2` — mounted HERE, once, rather than by each page itself
   * (`src/app/page.tsx` and `src/app/about/page.tsx` used to
   * render all three themselves; they now render only their own content).
   * This is the one place the route decision lives: which chrome a page gets
   * is entirely a function of `pathname`, never something a page opts into.
   * `V2Styles` moves here WITH the header/footer rather than staying
   * per-page, because `HeaderV2` and `FooterV2` are styled by its
   * `.v2-nav-*` / `.v2-footcols` / `.v2-social` rules (see the class list in
   * `V2Styles.tsx`) — the stylesheet is chrome's own dependency, not
   * page content's, so it belongs wherever the chrome is mounted.
   *
   * The v1 chrome — nav, mega menu, the footer card, the reveal wordmark
   * and the Seven widget — is suppressed on these routes only. `SearchOverlay`
   * is the one piece shared by both branches below: same component, same
   * state, painted per-surface via its `variant` prop — see the search state
   * declared above and its note in `SearchOverlay.tsx`. `useLenis()` above
   * still runs regardless of branch, so smooth scroll applies to v2 too.
   *
   * To port another page onto v2, add its path to `V2_PREFIX` — nothing else
   * in this file needs to change.
   *
   * EXACT AND PREFIX MATCHES ARE KEPT APART ON PURPOSE. `"/"` cannot go in a
   * `startsWith()` list: every pathname on the site starts with `"/"`, so one
   * entry there would silently hand v2 chrome to the ENTIRE site — `/shop`,
   * `/cart`, `/checkout`, `/product`, `/contact`, `/green-energy` and
   * `/smart-home` included, none of which have a v2 design. The homepage is
   * therefore matched exactly and everything else by prefix. Add a route to
   * whichever list actually describes it; do not merge the two.
   *
   * This early return sits after EVERY hook call: putting it any higher would
   * make hook order conditional and break the rules of hooks on navigation
   * into or out of the route.
   */
  const V2_EXACT = ["/"];
  const V2_PREFIX = ["/about", "/trade-in", "/services"];
  const isV2 =
    V2_EXACT.includes(pathname) ||
    V2_PREFIX.some((route) => pathname.startsWith(route));
  /**
   * This root's own background is the ACTUAL SOURCE of the "wash" that shows
   * through wherever a v2 route doesn't paint its own — most visibly behind
   * `HeaderV2`'s rail, which is deliberately transparent so its inset
   * `washSoft` panel reads as floating over whatever ground sits here (see
   * `HeaderV2`'s own file banner). `/` (the homepage), `/about` and
   * `/services` were repainted white for their first section; every one of that
   * section's own child sections already declares its OWN background
   * explicitly (see `HeroV2`'s `<section>`, and every `id="sec-*"` block in
   * `services/page.tsx`) EXCEPT `/about`'s undecorated `.a-band` (no `--wash`
   * / `--ink` modifier), which relied on THIS default for "WHY WE EXIST" and
   * "WHO WE SERVE" — that rule now sets `background: var(--wash)` itself
   * (globals.css), so flipping this default doesn't silently repaint those
   * two bands. `/trade-in` (the fourth v2 route) is untouched here on
   * purpose — nothing asked its header gap to change, and it belongs to
   * a different pass of this work. */
  /* Same exact/prefix split as `V2_EXACT` / `V2_PREFIX` above, and for the
     same reason — `"/"` in a `startsWith()` list would paint every route's
     root white. */
  const WHITE_EXACT = ["/"];
  const WHITE_PREFIX = ["/about", "/services"];
  const rootGround =
    WHITE_EXACT.includes(pathname) ||
    WHITE_PREFIX.some((route) => pathname.startsWith(route))
      ? V2.white
      : V2.wash;
  if (isV2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: rootGround,
          color: V2.ink,
          /* v2 has its own type stack; v1's FONT is untouched below */
          fontFamily: V2_FONT.body,
          overflowX: "clip",
        }}
      >
        <V2Styles />
        <HeaderV2 onOpenSearch={openSearch} />

        {children}

        <FooterV2 />

        {searchOpen && (
          <SearchOverlay
            variant="v2"
            closing={searchClosing}
            onClose={closeSearch}
          />
        )}
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
