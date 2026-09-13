"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, useEffect, type ReactNode } from "react";
import { FooterV2 } from "@/components/chrome/FooterV2";
import { HeaderV2 } from "@/components/chrome/HeaderV2";
import { IntroLoader } from "@/components/chrome/IntroLoader";
import { SearchOverlay } from "@/components/chrome/SearchOverlay";
import { lockPageScroll, unlockPageScroll, useLenis } from "@/hooks/useLenis";
import { WIREFRAME } from "@/lib/wireframe-config";

let introPlayed = false;

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
    <div className="v2-chrome min-h-screen overflow-x-clip">
      {introActive && <IntroLoader onDone={onIntroDone} />}
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
