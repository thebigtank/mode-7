"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BagIcon, SearchIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";

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

  useHeaderHide(ref, !menuOpen);

  const burgerState = menuOpen ? "open" : hamHover ? "hover" : "idle";

  return (
    <header
      ref={ref}
      className="m7-header"
      data-open={menuOpen ? "true" : "false"}
    >
      <nav className="m7-header__nav flex items-center justify-between">
        <Link href="/" className="m7-header__logo whitespace-nowrap cursor-pointer text-inherit no-underline">
          MODE&nbsp;7
        </Link>

        <div className="m7-header__actions flex items-center">
          {!menuOpen && (
            <>
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className="m7-header__iconbtn inline-flex items-center justify-center p-0 border-0 bg-transparent text-inherit cursor-pointer"
              >
                <SearchIcon />
              </button>
              <Link
                href="/cart"
                aria-label="Cart"
                className="m7-header__cart relative inline-flex items-center justify-center cursor-pointer text-inherit"
              >
                <BagIcon />
                {hasCart && (
                  <span className="m7-header__badge absolute inline-flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          <span
            onClick={onToggleMenu}
            onMouseEnter={() => setHamHover(true)}
            onMouseLeave={() => setHamHover(false)}
            aria-label="Menu"
            data-state={burgerState}
            className="m7-header__burger inline-flex flex-col items-center justify-center cursor-pointer"
          >
            <span className="m7-header__bar m7-header__bar--up" />
            <span className="m7-header__bar m7-header__bar--down" />
          </span>
        </div>
      </nav>
    </header>
  );
}
