"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import { PRODUCTS, priceLabel, type Product } from "@/lib/catalogue";
import { stripe } from "@/lib/theme";

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
      className="m7-modal ai-panel"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="m7-modal__panel ai-panel__panel"
        data-lenis-prevent
      >
        <div className="ai-panel__head">
          <span className="ai-panel__head-label">
            <span className="ai-panel__head-icon">
              <SparkIcon />
            </span>
            Seven on this product
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ai-panel__close"
          >
            ×
          </button>
        </div>

        <div className="ai-panel__body">
          <div className="ai-panel__title">{product.name}</div>
          <div className="ai-panel__meta">
            {product.category.toUpperCase()} · {priceLabel(product)}
          </div>

          <p className="ai-panel__summary">{product.ai.summary}</p>

          <div className="ai-panel__points">
            {product.ai.points.map((pt) => (
              <div key={pt} className="ai-panel__point">
                <span className="ai-panel__point-dot" />
                {pt}
              </div>
            ))}
          </div>

          <div className="ai-panel__caveat">
            <div className="ai-panel__caveat-label">Who this isn’t for</div>
            <div className="ai-panel__caveat-body">{product.ai.note}</div>
          </div>

          <div className="ai-panel__actions">
            <Link href="/product" className="ai-panel__action" data-variant="fill">
              View full details
            </Link>
            <Link href="/trade-in" className="ai-panel__action" data-variant="outline">
              Trade in toward it
            </Link>
          </div>

          <div className="ai-panel__disclaimer">
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
      <div className="shop-grid">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="m7-shop-card shop-card">
            <Link href="/product" className="shop-card__link">
              <div className="shop-card__img" style={{ background: stripe() }}>
                <div className="shop-card__label">▣ {p.name.toUpperCase()}</div>
                {p.badge && <div className="shop-card__badge">{p.badge}</div>}
              </div>
              <div className="shop-card__row">
                <div>
                  <div className="shop-card__name">{p.name}</div>
                  <div className="shop-card__meta">{p.meta}</div>
                </div>
                <div className="shop-card__price">{priceLabel(p)}</div>
              </div>
            </Link>

            <button
              type="button"
              className="m7-ai-chip shop-ai-chip"
              aria-label={`Ask Seven about the ${p.name}`}
              onClick={() => setOpen(p)}
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
