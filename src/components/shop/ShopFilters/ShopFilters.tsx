"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import { PRICE_BANDS } from "@/lib/catalogue";

type Group = { title: string; options: string[]; openByDefault?: boolean };

const GROUPS: Group[] = [
  {
    title: "Category",
    openByDefault: true,
    options: [
      "Phones",
      "Laptops",
      "Tablets",
      "Smart Home & Automation",
      "Solar & Green Energy",
      "Home Battery & Inverters",
      "Audio",
      "Wearables",
      "Accessories",
    ],
  },
  { title: "Price", openByDefault: true, options: PRICE_BANDS },
  { title: "Condition", options: ["New — sealed", "Certified Refurbished", "Open Box"] },
  {
    title: "Brand",
    options: ["Apple", "Samsung", "Google", "Sony", "Bose", "Anker", "Hikvision"],
  },
  { title: "Availability", options: ["In stock", "Installed by Mode 7", "Pre-order"] },
];

const DRAWER_QUERY = "(max-width: 900px)";

function FilterGroup({ title, options, openByDefault }: Group) {
  const [open, setOpen] = useState(!!openByDefault);

  return (
    <div className="filter-group">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="filter-group__toggle"
      >
        {title}
        <span className="filter-group__toggle-icon" data-open={open || undefined}>
          <ChevronDownIcon size={15} />
        </span>
      </button>

      <div className="filter-group__panel" data-open={open || undefined}>
        <div className="filter-group__panel-inner">
          <div className="filter-group__options">
            {options.map((o, i) => (
              <label key={o} className="filter-group__option">
                <span
                  className="filter-group__option-box"
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
        <span className="shop-filters__toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        Filters
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
        aria-label={isDrawer ? "Filters" : undefined}
      >
        <div className="m7-filters__head">
          <span className="shop-filters__head-title">Filters</span>
          <button
            type="button"
            className="m7-filters__close"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
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
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
