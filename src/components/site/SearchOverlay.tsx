"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/Icons";
import { searchIndex } from "@/lib/content";
import { FONT } from "@/lib/theme";

/** Highlights the matched run inside a result label. */
function mark(label: string, q: string): ReactNode {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q);
  if (i < 0) return label;
  return (
    <span>
      {label.slice(0, i)}
      <strong style={{ fontWeight: 600, color: "#121212" }}>
        {label.slice(i, i + q.length)}
      </strong>
      {label.slice(i + q.length)}
    </span>
  );
}

/**
 * Search overlay. Blur-backdrop panel that drops in from above with a slight
 * scale + blur settle; suggestions stagger in underneath. Escape or a click on
 * the backdrop closes it.
 */
export function SearchOverlay({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

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
        background: "rgba(248,248,248,0.55)",
        backdropFilter: "blur(13px)",
        WebkitBackdropFilter: "blur(13px)",
        animation: closing ? "m7menuOut .3s ease both" : "m7menuIn .28s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 660,
          marginTop: "clamp(64px, 24vh, 200px)",
          fontFamily: FONT.body,
          animation: closing
            ? "m7searchPanelOut .28s cubic-bezier(.5,0,.75,0) both"
            : "m7searchPanel .55s cubic-bezier(.16,1,.3,1) both",
        }}
      >
        {/* input bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#fff",
            border: "1px solid #ececec",
            borderRadius: 6,
            padding: "6px 8px 6px 22px",
            boxShadow:
              "0 30px 80px rgba(18,18,18,0.16),0 4px 14px rgba(18,18,18,0.06)",
          }}
        >
          <span style={{ flex: "0 0 auto", color: "#121212", display: "inline-flex" }}>
            <SearchIcon size={22} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            placeholder="Search devices, energy, services…"
            style={{
              flex: "1 1 auto",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: FONT.body,
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "-0.4px",
              color: "#121212",
              padding: "12px 0",
            }}
          />
          <span
            onClick={onClose}
            className="m7-search-close"
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              color: "#4a4a4a",
              cursor: "pointer",
              transition: "color .2s ease",
            }}
          >
            <CloseIcon />
          </span>
        </div>

        {/* suggestions */}
        <div
          style={{
            marginTop: 14,
            background: "#fff",
            border: "1px solid #ececec",
            borderRadius: 6,
            boxShadow: "0 30px 80px rgba(18,18,18,0.12)",
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
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#9a9a9a",
              }}
            >
              {q ? "Results" : "Popular"}
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: 1,
                color: "#c2c2c2",
              }}
            >
              {q ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}` : ""}
            </span>
          </div>

          {matches.length > 0 ? (
            <div style={{ padding: "0 8px 8px" }}>
              {matches.map((r, i) => (
                <div
                  key={r.label}
                  onClick={onClose}
                  className="m7-search-result"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "15px 14px",
                    borderRadius: 4,
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
                      color: "#1a1a1a",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {mark(r.label, q)}
                  </span>
                  <span
                    style={{
                      flex: "0 0 auto",
                      fontFamily: FONT.mono,
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "#9a9a9a",
                      background: "#f2f2f2",
                      borderRadius: 99,
                      padding: "5px 11px",
                    }}
                  >
                    {r.type}
                  </span>
                  <ArrowRightIcon size={18} strokeWidth={1.8} stroke="#121212" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "34px 22px 40px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: 19,
                  color: "#1a1a1a",
                  letterSpacing: "-0.3px",
                  marginBottom: 6,
                }}
              >
                No results for &quot;{query}&quot;
              </div>
              <div style={{ fontSize: 15, color: "#9a9a9a" }}>
                Try a device, service or energy term.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
