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
import { searchIndex } from "@/lib/content";
import { COLOR, FONT } from "@/lib/theme";
import { V2, V2_FONT } from "@/lib/theme-v2";

type Variant = "v1" | "v2";

const THEME: Record<
  Variant,
  {
    backdrop: string;
    panelBg: string;
    border: string;
    ink: string;
    muted: string;
    faintLabel: string;
    resultBadgeBg: string;
    fontBody: string;
    fontMono: string;
    cssVars: CSSProperties;
  }
> = {
  v1: {
    backdrop: "rgba(239,230,209,0.62)",
    panelBg: COLOR.card,
    border: `1px solid ${COLOR.line}`,
    ink: COLOR.ink,
    muted: COLOR.muted,
    faintLabel: COLOR.hair,
    resultBadgeBg: COLOR.cream,
    fontBody: FONT.body,
    fontMono: FONT.mono,
    cssVars: {
      "--m7-cream": COLOR.cream,
      "--m7-ink": COLOR.ink,
      "--m7-card": COLOR.card,
    } as CSSProperties,
  },
  v2: {
    backdrop: "rgba(230,234,230,0.7)",
    panelBg: V2.white,
    border: "1px solid rgba(23,29,29,0.14)", // V2_HAIR's own value
    ink: V2.ink,
    muted: V2.muted,
    faintLabel: V2.muted,
    resultBadgeBg: V2.washSoft,
    fontBody: V2_FONT.body,
    fontMono: V2_FONT.mono,
    cssVars: {
      "--m7-cream": V2.washSoft,
      "--m7-ink": V2.ink,
      "--m7-card": V2.white,
    } as CSSProperties,
  },
};

function mark(label: string, q: string, inkColor: string): ReactNode {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q);
  if (i < 0) return label;
  return (
    <span>
      {label.slice(0, i)}
      <strong style={{ fontWeight: 600, color: inkColor }}>
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
  const t = THEME[variant];
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
        ? searchIndex.filter((i) => i.label.toLowerCase().includes(q))
        : searchIndex.filter((i) => i.pop),
    [q],
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 24,
        background: t.backdrop,
        backdropFilter: "blur(13px)",
        WebkitBackdropFilter: "blur(13px)",
        animation: closing ? "m7menuOut .3s ease both" : "m7menuIn .28s ease both",
        ...t.cssVars,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 660,
          marginTop: "clamp(64px, 24vh, 200px)",
          fontFamily: t.fontBody,
          animation: closing
            ? "m7searchPanelOut .28s cubic-bezier(.5,0,.75,0) both"
            : "m7searchPanel .55s cubic-bezier(.16,1,.3,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: t.panelBg,
            border: t.border,
            borderRadius: 6,
            padding: "6px 8px 6px 22px",
            boxShadow:
              "0 30px 80px rgba(28,21,15,0.16),0 4px 14px rgba(28,21,15,0.06)",
          }}
        >
          <span style={{ flex: "0 0 auto", color: t.ink, display: "inline-flex" }}>
            <SearchIcon size={22} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search devices, energy, services…"
            style={{
              flex: "1 1 auto",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: t.fontBody,
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "-0.4px",
              color: t.ink,
              padding: "12px 0",
            }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="m7-search-close"
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              padding: 0,
              background: "none",
              border: "none",
              font: "inherit",
              color: t.muted,
              cursor: "pointer",
              transition: "color .2s ease",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            background: t.panelBg,
            border: t.border,
            borderRadius: 6,
            boxShadow: "0 30px 80px rgba(28,21,15,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 22px 12px",
            }}
          >
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: t.muted,
              }}
            >
              {q ? "Results" : "Popular"}
            </span>
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 11,
                letterSpacing: 1,
                color: t.faintLabel,
              }}
            >
              {q ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}` : ""}
            </span>
          </div>

          {matches.length > 0 ? (
            <div style={{ padding: "0 8px 8px" }}>
              {matches.map((r, i) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={onClose}
                  className="m7-search-result"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "15px 14px",
                    borderRadius: 4,
                    border: "none",
                    background: "none",
                    font: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background .18s ease",
                    animation: "m7suggIn .4s cubic-bezier(.16,1,.3,1) both",
                    animationDelay: `${(i * 0.035).toFixed(3)}s`,
                  }}
                >
                  <span
                    style={{
                      flex: "1 1 auto",
                      fontSize: 18,
                      color: t.ink,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {mark(r.label, q, t.ink)}
                  </span>
                  <span
                    style={{
                      flex: "0 0 auto",
                      fontFamily: t.fontMono,
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: t.muted,
                      background: t.resultBadgeBg,
                      borderRadius: 99,
                      padding: "5px 11px",
                    }}
                  >
                    {r.type}
                  </span>
                  <ArrowRightIcon size={18} strokeWidth={1.8} stroke={t.ink} />
                </button>
              ))}
            </div>
          ) : (
            <div style={{ padding: "34px 22px 40px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: 19,
                  color: t.ink,
                  letterSpacing: "-0.3px",
                  marginBottom: 6,
                }}
              >
                No results for &quot;{query}&quot;
              </div>
              <div style={{ fontSize: 15, color: t.muted }}>
                Try a device, service or energy term.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
