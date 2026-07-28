"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import { PRODUCTS, priceLabel, type Product } from "@/lib/catalogue";
import { FONT, stripe } from "@/lib/theme";

/**
 * The shop grid, with an "Ask Seven" affordance on every card.
 *
 * The card itself is a link to the product page, so the AI button has to stop
 * the click from bubbling into it — otherwise asking about a product would
 * navigate away from the grid you were browsing.
 *
 * Seven's copy is authored per product in `@/lib/catalogue`; see the note on
 * `Product.ai` for what swapping in a live model would involve.
 */

function SparkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.6 4.7L14 6.4l-4.4 1.7L8 12.8 6.4 8.1 2 6.4l4.4-1.7L8 0z" />
      <path d="M13 10l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" opacity=".55" />
    </svg>
  );
}

function AiPanel({ product, onClose }: { product: Product; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef);

  // Escape closes, and the page behind must not scroll while this is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    lockPageScroll();
    document.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Seven on the ${product.name}`}
      onClick={onClose}
      className="m7-modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(18,18,18,0.42)",
        backdropFilter: "blur(3px)",
        animation: "m7aiFade .2s ease both",
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="m7-modal__panel"
        data-lenis-prevent
        style={{
          outline: "none",
          width: "min(560px, 100%)",
          maxHeight: "min(82dvh, 720px)",
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #121212",
          borderRadius: 6,
          boxShadow: "0 32px 80px -28px rgba(0,0,0,.5)",
          animation: "m7aiIn .26s cubic-bezier(.23,1,.32,1) both",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "14px 20px",
            borderBottom: "1px solid #ececec",
            background: "#fafafa",
            position: "sticky",
            top: 0,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#8a8a8a",
            }}
          >
            <span style={{ display: "inline-flex", color: "#121212" }}>
              <SparkIcon />
            </span>
            Seven on this product
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="grow"
            style={{
              background: "none",
              border: 0,
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              color: "#8a8a8a",
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "24px 24px 26px" }}>
          <div
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: "-0.6px",
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: 0.8,
              color: "#9a9a9a",
              marginTop: 5,
            }}
          >
            {product.category.toUpperCase()} · {priceLabel(product)}
          </div>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "#4a4a4a",
              margin: "18px 0 0",
            }}
          >
            {product.ai.summary}
          </p>

          <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
            {product.ai.points.map((pt) => (
              <div
                key={pt}
                style={{
                  display: "flex",
                  gap: 11,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "#3a3a3a",
                }}
              >
                <span
                  style={{
                    flex: "0 0 auto",
                    width: 5,
                    height: 5,
                    borderRadius: 99,
                    background: "#121212",
                    marginTop: 9,
                  }}
                />
                {pt}
              </div>
            ))}
          </div>

          {/* the honest caveat — the reason to trust the rest of it */}
          <div
            style={{
              marginTop: 22,
              border: "1px dashed #d6d6d6",
              borderRadius: 4,
              padding: "14px 16px",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 10,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#8a8a8a",
                marginBottom: 6,
              }}
            >
              Who this isn’t for
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "#5a5a5a" }}>
              {product.ai.note}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 24,
            }}
          >
            <Link
              href="/product"
              data-cursor="grow"
              style={{
                fontFamily: FONT.body,
                fontSize: 15,
                fontWeight: 500,
                background: "#121212",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 4,
                padding: "11px 18px",
              }}
            >
              View full details
            </Link>
            <Link
              href="/trade-in"
              data-cursor="grow"
              style={{
                fontFamily: FONT.body,
                fontSize: 15,
                fontWeight: 500,
                background: "#fff",
                color: "#121212",
                border: "1px solid #d6d6d6",
                textDecoration: "none",
                borderRadius: 4,
                padding: "11px 18px",
              }}
            >
              Trade in toward it
            </Link>
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 0.8,
              color: "#b4b4b4",
              lineHeight: 1.6,
            }}
          >
            Seven summarises product information to help you choose. Confirm
            specifications with the team before you buy.
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [open, setOpen] = useState<Product | null>(null);

  return (
    <>
      <div
        className="m7-shop-grid"
        style={{ display: "grid", gap: "clamp(18px, 2.4vw, 26px) clamp(12px, 1.6vw, 18px)" }}
      >
        {PRODUCTS.map((p) => (
          <div key={p.id} className="m7-shop-card">
            <Link
              href="/product"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                className="m7-shop-card__img"
                style={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: stripe(),
                  border: "1px solid #e2e2e2",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 18,
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "#9a9a9a",
                  }}
                >
                  ▣ {p.name.toUpperCase()}
                </div>
                {p.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 18,
                      fontFamily: FONT.mono,
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "#121212",
                      background: "#fff",
                      border: "1px solid #e2e2e2",
                      borderRadius: 99,
                      padding: "4px 10px",
                    }}
                  >
                    {p.badge}
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONT.head,
                      fontWeight: 600,
                      fontSize: 17,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#9a9a9a", marginTop: 3 }}>
                    {p.meta}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: 17,
                    whiteSpace: "nowrap",
                  }}
                >
                  {priceLabel(p)}
                </div>
              </div>
            </Link>

            {/* Sits inside the card's image but outside the <Link>, so it never
                navigates. Absolute rather than nested for exactly that reason. */}
            <button
              type="button"
              className="m7-ai-chip"
              data-cursor="grow"
              aria-label={`Ask Seven about the ${p.name}`}
              onClick={() => setOpen(p)}
              style={{
                position: "absolute",
                left: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(255,255,255,.94)",
                border: "1px solid #d6d6d6",
                borderRadius: 99,
                padding: "7px 13px",
                cursor: "pointer",
                fontFamily: FONT.mono,
                fontSize: 10,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#121212",
                backdropFilter: "blur(4px)",
              }}
            >
              <SparkIcon size={12} />
              Ask Seven
            </button>
          </div>
        ))}
      </div>

      {open && <AiPanel product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
