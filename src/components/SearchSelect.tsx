"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";

/**
 * A styled, searchable select.
 *
 * A native `<select>` hands its option list to the OS, which is why the
 * trade-in catalogue looked unstyled the moment it opened — and why a long
 * list was unusable, since you can only type-ahead one character at a time.
 * This renders its own listbox: styled to match the rest of the site, and
 * filterable, so a growing catalogue stays navigable.
 *
 * Desktop gets a popover anchored under the control; below 620px it becomes a
 * bottom sheet, matching the other dialogs on the site and putting the list
 * near the thumb with room for the keyboard.
 *
 * Keyboard: ↑/↓ move, Enter picks, Escape closes, Home/End jump. The control
 * is a combobox over a listbox, with aria-activedescendant tracking the
 * highlighted row so screen readers follow along without focus moving.
 */

export type SelectOption = { v: string; label: string; hint?: string };

/**
 * The search field is always present. An earlier version only showed it past a
 * threshold, but the current catalogue tops out at six devices, so it never
 * appeared — and the list is team-curated and expected to grow. Consistent
 * behaviour beats a field that comes and goes with the stock list.
 */

/** Splits a label around the matched query so it can be emphasised. */
function highlight(label: string, q: string) {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark className="m7-ss__mark">{label.slice(i, i + q.length)}</mark>
      {label.slice(i + q.length)}
    </>
  );
}

export function SearchSelect({
  label,
  placeholder,
  options,
  value,
  onPick,
  searchPlaceholder = "Search…",
}: {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string | null;
  onPick: (v: string) => void;
  searchPlaceholder?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.v === value) ?? null;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(needle) ||
        (o.hint ?? "").toLowerCase().includes(needle),
    );
  }, [options, q]);

  // Open on the current value so ↓ continues from where you are.
  useEffect(() => {
    if (!open) return;
    setQ("");
    const i = filtered.findIndex((o) => o.v === value);
    setCursor(i >= 0 ? i : 0);
    // focus the search field so typing filters straight away
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 10);
    return () => window.clearTimeout(t);
    // filtered is intentionally not a dep: this runs on open, not on filtering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Hold the page still while the list is up, so the wheel/touch only moves
  // the options. Lenis has to be stopped, not just body overflow — see
  // lockPageScroll.
  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    return unlockPageScroll;
  }, [open]);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        btnRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the highlighted row in view as the cursor moves.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  function choose(v: string) {
    onPick(v);
    setOpen(false);
    btnRef.current?.focus({ preventScroll: true });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!filtered.length) return;
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setCursor((c) => (c + dir + filtered.length) % filtered.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(Math.max(0, filtered.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const o = filtered[cursor];
      if (o) choose(o.v);
    }
  }

  return (
    <div className="t-q">
      <span className="t-q__l" id={`${id}-label`}>
        {label}
      </span>

      <div className="m7-ss" ref={rootRef}>
        <button
          ref={btnRef}
          type="button"
          className="m7-ss__btn"
          data-empty={!selected}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          <span className="m7-ss__value" id={`${id}-value`}>
            {selected ? selected.label : placeholder}
          </span>
          <span className="m7-ss__caret" aria-hidden="true" />
        </button>

        {open && (
          <>
            {/* only paints below 620px, where the panel is a sheet */}
            <div className="m7-ss__scrim" onClick={() => setOpen(false)} aria-hidden="true" />

            <div className="m7-ss__panel">
              <div className="m7-ss__head">
                <span className="m7-ss__title">{label}</span>
                <button
                  type="button"
                  className="m7-ss__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="m7-ss__search">
                  <input
                    ref={inputRef}
                    className="m7-ss__input"
                    type="text"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={
                      filtered[cursor] ? `${id}-opt-${filtered[cursor].v}` : undefined
                    }
                    placeholder={searchPlaceholder}
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setCursor(0);
                    }}
                    onKeyDown={onKeyDown}
                  />
                  {q && (
                    <button
                      type="button"
                      className="m7-ss__clear"
                      onClick={() => {
                        setQ("");
                        setCursor(0);
                        inputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
              </div>

              <ul
                ref={listRef}
                id={listId}
                className="m7-ss__list"
                /* Lenis would otherwise swallow the wheel here and scroll the
                   page instead of the options */
                data-lenis-prevent
                role="listbox"
                aria-labelledby={`${id}-label`}
                tabIndex={-1}
              >
                {filtered.map((o, i) => (
                  <li
                    key={o.v}
                    id={`${id}-opt-${o.v}`}
                    role="option"
                    aria-selected={o.v === value}
                    data-active={i === cursor}
                    className="m7-ss__opt"
                    onPointerEnter={() => setCursor(i)}
                    onClick={() => choose(o.v)}
                  >
                    <span className="m7-ss__optlabel">{highlight(o.label, q.trim())}</span>
                    {o.hint && <span className="m7-ss__opthint">{o.hint}</span>}
                    {o.v === value && (
                      <span className="m7-ss__tick" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </li>
                ))}

                {filtered.length === 0 && (
                  <li className="m7-ss__empty">
                    Nothing matches “{q.trim()}”. Try a shorter search, or ask the team
                    about your device.
                  </li>
                )}
              </ul>

              <div className="m7-ss__foot">
                {filtered.length} of {options.length} shown
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
