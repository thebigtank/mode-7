"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { MegaMenu } from "../MegaMenu";
import { RevealWordmark } from "../RevealWordmark";
import { SearchOverlay } from "../SearchOverlay";
import { SevenWidget } from "../SevenWidget";
import { lockPageScroll, unlockPageScroll, useLenis } from "@/hooks/useLenis";
import { WIREFRAME } from "@/lib/wireframe-config";

export function V1Chrome({ children }: { children: ReactNode }) {
  useLenis();

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

  const lockScroll = useCallback((locked: boolean) => {
    if (locked) lockPageScroll();
    else unlockPageScroll();
  }, []);

  const closeMenu = useCallback(() => {
    if (menuClosing) return;
    setMenuClosing(true);
    lockScroll(false);
    if (menuTimer.current) clearTimeout(menuTimer.current);
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

  return (
    <div className="v1-chrome w-full min-h-screen relative overflow-x-clip">
      <div className="v1-chrome__stack relative">
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

        <div className="v1-chrome__footer-gap" />

        <Footer />
      </div>

      <div className="m7-reveal-spacer" />
      <RevealWordmark />

      {WIREFRAME.showSeven && <SevenWidget hidden={menuOpen || searchOpen} />}
    </div>
  );
}
