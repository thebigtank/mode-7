"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BagIcon, SearchIcon, StoreIcon } from "@/components/Icons";
import { useHeaderHide } from "@/hooks/useHeaderHide";
import content from "@/content/chrome.json";

export function HeaderV2({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const c = content.headerV2;
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
      <div className="v2-header-announce relative">
        <div className="v2-header-announce__inner flex items-center justify-center uppercase mx-auto box-content">
          <span aria-hidden className="v2-header-announce__dot shrink-0 rounded-[50%]" />
          <span>{c.announcement.text}</span>
          <Link href={c.announcement.linkHref} className="v2-header-announce__link inline-flex items-center no-underline">
            {c.announcement.linkLabel} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <header ref={barRef} className="v2-header sticky top-0">
        <div className="v2-header__container mx-auto box-content h-full">
          <div className="v2-header__panel grid items-center h-full">
            <div className="v2-header__left flex items-center min-w-0">
              <Link href="/" className="v2-header__logo shrink-0 no-underline">
                {c.logoLabel}
              </Link>

              <nav className="v2-navlinks items-center" aria-label="Primary">
                {c.nav.map((n, i) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    className={`v2-nav-link whitespace-nowrap${
                      active === i ? " is-active" : active !== null ? " is-dimmed" : ""
                    }`}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                    onFocus={(e) => {
                      if (isFocusVisible(e.currentTarget)) setFocus(i);
                    }}
                    onBlur={() => setFocus((f) => (f === i ? null : f))}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="v2-header__right flex items-center">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className="v2-header__iconbtn inline-flex items-center justify-center p-0 border-0 bg-transparent text-inherit cursor-pointer"
              >
                <SearchIcon />
              </button>

              <Link
                href="/shop"
                aria-label="Shop"
                className="v2-header__iconbtn inline-flex items-center justify-center text-inherit cursor-pointer"
              >
                <StoreIcon />
              </Link>

              <Link
                href="/cart"
                aria-label="Cart"
                className="v2-header__iconbtn v2-header__cart relative inline-flex items-center justify-center text-inherit cursor-pointer"
              >
                <BagIcon />
                <span aria-hidden className="v2-header__badge inline-flex items-center justify-center box-border">
                  {c.cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
