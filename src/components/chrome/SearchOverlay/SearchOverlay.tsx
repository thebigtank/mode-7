"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/Icons";
import content from "@/content/chrome.json";

type Variant = "v1" | "v2";

function mark(label: string, q: string): ReactNode {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q);
  if (i < 0) return label;
  return (
    <span>
      {label.slice(0, i)}
      <strong className="m7-search-overlay__mark">
        {label.slice(i, i + q.length)}
      </strong>
      {label.slice(i + q.length)}
    </span>
  );
}

export function SearchOverlay({
  closing,
  onClose,
  variant = "v1",
}: {
  closing: boolean;
  onClose: () => void;
  variant?: Variant;
}) {
  const { placeholder, closeLabel, resultsLabel, popularLabel, matchLabel, matchesLabel, emptyTitlePrefix, emptyHint, index } =
    content.searchOverlay;
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const openTimer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      clearTimeout(openTimer);
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      q
        ? index.filter((i) => i.label.toLowerCase().includes(q))
        : index.filter((i) => i.pop),
    [q, index],
  );

  return (
    <div
      data-state={closing ? "closing" : "open"}
      data-variant={variant}
      onClick={onClose}
      className="m7-search-overlay fixed inset-0 z-[300] flex justify-center items-start"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="m7-search-overlay__panel w-full"
      >
        <div className="m7-search-overlay__bar flex items-center">
          <span className="m7-search-overlay__bar-icon shrink-0 inline-flex">
            <SearchIcon size={22} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="m7-search-overlay__input flex-1"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="m7-search-close m7-search-overlay__close shrink-0 inline-flex items-center justify-center"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="m7-search-overlay__results overflow-hidden">
          <div className="m7-search-overlay__results-head flex items-center justify-between">
            <span className="m7-search-overlay__results-label uppercase">
              {q ? resultsLabel : popularLabel}
            </span>
            <span className="m7-search-overlay__results-count">
              {q ? `${matches.length} ${matches.length === 1 ? matchLabel : matchesLabel}` : ""}
            </span>
          </div>

          {matches.length > 0 ? (
            <div className="m7-search-overlay__list">
              {matches.map((r, i) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={onClose}
                  className="m7-search-result m7-search-overlay__result w-full flex items-center text-left"
                  style={{ "--m7-sugg-delay": `${(i * 0.035).toFixed(3)}s` } as CSSProperties}
                >
                  <span className="m7-search-overlay__result-label flex-1">
                    {mark(r.label, q)}
                  </span>
                  <span className="m7-search-overlay__result-type shrink-0 uppercase">
                    {r.type}
                  </span>
                  <span className="m7-search-overlay__result-icon shrink-0 inline-flex">
                    <ArrowRightIcon size={18} strokeWidth={1.8} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="m7-search-overlay__empty text-center">
              <div className="m7-search-overlay__empty-title">
                {emptyTitlePrefix} &quot;{query}&quot;
              </div>
              <div className="m7-search-overlay__empty-hint">{emptyHint}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
