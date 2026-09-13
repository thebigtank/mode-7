"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import content from "@/content/shop.json";

type Group = { title: string; options: string[]; openByDefault: boolean };

const DRAWER_QUERY = "(max-width: 56.25rem)";

const GROUPS: Group[] = content.filters.groups;

function FilterGroup({ title, options, openByDefault }: Group) {
  const [open, setOpen] = useState(openByDefault);

  return (
    <div className="filter-group">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="filter-group__toggle flex items-center justify-between text-left uppercase cursor-pointer"
      >
        {title}
        <span
          className="filter-group__toggle-icon inline-flex"
          data-open={open || undefined}
        >
          <ChevronDownIcon size={15} />
        </span>
      </button>

      <div className="filter-group__panel grid" data-open={open || undefined}>
        <div className="overflow-hidden">
          <div className="filter-group__options flex flex-col">
            {options.map((o, i) => (
              <label
                key={o}
                className="filter-group__option flex items-center cursor-pointer"
              >
                <span
                  className="filter-group__option-box shrink-0"
                  data-checked={i === 0 || undefined}
                />
                {o}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopFilters() {
  const [open, setOpen] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isDrawer && open);

  useEffect(() => {
    const mq = window.matchMedia(DRAWER_QUERY);
    const sync = () => setIsDrawer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDrawer) setOpen(false);
  }, [isDrawer]);

  useEffect(() => {
    if (!isDrawer || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    lockPageScroll();
    document.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      document.removeEventListener("keydown", onKey);
    };
  }, [isDrawer, open]);

  return (
    <div className="m7-filters shop-filters">
      <button
        type="button"
        className="m7-filters__toggle"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span
          className="shop-filters__toggle-icon inline-flex flex-col"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>
        {content.filters.toggleLabel}
      </button>

      <div
        className="m7-filters__scrim"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="m7-filters__panel"
        data-open={open}
        tabIndex={-1}
        role={isDrawer ? "dialog" : undefined}
        aria-modal={isDrawer && open ? true : undefined}
        aria-label={isDrawer ? content.filters.headTitle : undefined}
      >
        <div className="m7-filters__head">
          <span className="shop-filters__head-title">
            {content.filters.headTitle}
          </span>
          <button
            type="button"
            className="m7-filters__close"
            onClick={() => setOpen(false)}
            aria-label={content.filters.closeLabel}
          >
            ×
          </button>
        </div>

        <div className="m7-filters__body" data-lenis-prevent>
          {GROUPS.map((g) => (
            <FilterGroup key={g.title} {...g} />
          ))}
        </div>

        <div className="m7-filters__foot">
          <button
            type="button"
            className="m7-filters__apply"
            onClick={() => setOpen(false)}
          >
            {content.filters.applyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
