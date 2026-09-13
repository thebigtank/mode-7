"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";

export type SelectOption = { v: string; label: string; hint?: string };

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
  variant,
}: {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string | null;
  onPick: (v: string) => void;
  searchPlaceholder?: string;
  variant?: "tradein";
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

  useEffect(() => {
    if (!open) return;
    setQ("");
    const i = filtered.findIndex((o) => o.v === value);
    setCursor(i >= 0 ? i : 0);
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 10);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    return unlockPageScroll;
  }, [open]);

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

      <div className="m7-ss" data-variant={variant} ref={rootRef}>
        <button
          ref={btnRef}
          type="button"
          className="m7-ss__btn flex items-center justify-between text-left"
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
          <span className="m7-ss__value whitespace-nowrap" id={`${id}-value`}>
            {selected ? selected.label : placeholder}
          </span>
          <span className="m7-ss__caret" aria-hidden="true" />
        </button>

        {open && (
          <>
            <div className="m7-ss__scrim" onClick={() => setOpen(false)} aria-hidden="true" />

            <div className="m7-ss__panel flex flex-col">
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
                    className="m7-ss__opt flex flex-col"
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
