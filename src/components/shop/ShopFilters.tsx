"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import { PRICE_BANDS } from "@/lib/catalogue";
import { FONT } from "@/lib/theme";

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
    <div style={{ borderBottom: "1px solid #ececec" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          background: "none",
          border: 0,
          padding: "16px 0",
          cursor: "pointer",
          fontFamily: FONT.mono,
          fontSize: 11,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#8a8a8a",
          textAlign: "left",
        }}
      >
        {title}
        <span
          style={{
            display: "inline-flex",
            color: "#b4b4b4",
            transition: "transform .24s cubic-bezier(.23,1,.32,1)",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDownIcon size={15} />
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows .28s cubic-bezier(.23,1,.32,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              paddingBottom: 16,
            }}
          >
            {options.map((o, i) => (
              <label
                key={o}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  fontSize: 15,
                  color: "#3a3a3a",
                  cursor: "pointer",
                  padding: "7px 0",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    border: `1px solid ${i === 0 ? "#121212" : "#cfcfcf"}`,
                    background: i === 0 ? "#121212" : "#fff",
                    flex: "0 0 auto",
                  }}
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
    <div className="m7-filters">
      <button
        type="button"
        className="m7-filters__toggle"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 3,
            width: 14,
          }}
          aria-hidden="true"
        >
          <span style={{ height: 1.5, background: "currentColor", width: "100%" }} />
          <span style={{ height: 1.5, background: "currentColor", width: "70%" }} />
          <span style={{ height: 1.5, background: "currentColor", width: "40%" }} />
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
          <span
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Filters
          </span>
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
