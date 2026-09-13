"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, useEffect, type ReactNode } from "react";
import { FooterV2 } from "@/components/home-v2/FooterV2";
import { HeaderV2 } from "@/components/home-v2/HeaderV2";
import { V2Styles } from "@/components/home-v2/V2Styles";
import { IntroLoader } from "./IntroLoader";
import { SearchOverlay } from "./SearchOverlay";
import { lockPageScroll, unlockPageScroll, useLenis } from "@/hooks/useLenis";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { WIREFRAME } from "@/lib/wireframe-config";

let introPlayed = false;

const WHITE_GROUND = new Set(["/", "/about", "/services"]);

export function V2Chrome({ children }: { children: ReactNode }) {
  useLenis();
  const pathname = usePathname();

  const [introActive, setIntroActive] = useState(
    WIREFRAME.showIntro && !introPlayed && pathname === "/",
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    },
    [],
  );

  const openSearch = useCallback(() => {
    if (searchOpen) return;
    setSearchOpen(true);
    setSearchClosing(false);
    lockPageScroll();
  }, [searchOpen]);

  const closeSearch = useCallback(() => {
    if (searchClosing) return;
    setSearchClosing(true);
    unlockPageScroll();
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchOpen(false);
      setSearchClosing(false);
    }, 320);
  }, [searchClosing]);

  const onIntroDone = useCallback(() => {
    introPlayed = true;
    setIntroActive(false);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: WHITE_GROUND.has(pathname) ? V2.white : V2.wash,
        color: V2.ink,
        fontFamily: V2_FONT.body,
        overflowX: "clip",
      }}
    >
      {introActive && <IntroLoader onDone={onIntroDone} />}
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
