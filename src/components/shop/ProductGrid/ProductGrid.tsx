"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import content from "@/content/shop.json";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { lockPageScroll, unlockPageScroll } from "@/hooks/useLenis";
import { PRODUCTS, priceLabel, type Product } from "@/lib/catalogue";

const ACTION_VARIANT = { fill: "fill", outline: "outline" } as const;

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
  const c = content.grid.panel;
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
      className="m7-modal ai-panel fixed inset-0 z-[90000] flex justify-center"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="m7-modal__panel ai-panel__panel overflow-y-auto"
        data-lenis-prevent
      >
        <div className="ai-panel__head sticky top-0 flex items-center justify-between">
          <span className="ai-panel__head-label inline-flex items-center uppercase">
            <span className="ai-panel__head-icon inline-flex">
              <SparkIcon />
            </span>
            {c.headLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.closeLabel}
            className="ai-panel__close cursor-pointer"
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

          <div className="ai-panel__points grid">
            {product.ai.points.map((pt) => (
              <div key={pt} className="ai-panel__point flex">
                <span className="ai-panel__point-dot shrink-0" />
                {pt}
              </div>
            ))}
          </div>

          <div className="ai-panel__caveat">
            <div className="ai-panel__caveat-label uppercase">{c.caveatLabel}</div>
            <div className="ai-panel__caveat-body">{product.ai.note}</div>
          </div>

          <div className="ai-panel__actions flex flex-wrap">
            {c.actions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="ai-panel__action"
                data-variant={
                  ACTION_VARIANT[a.variant as keyof typeof ACTION_VARIANT] ?? "fill"
                }
              >
                {a.label}
              </Link>
            ))}
          </div>

          <div className="ai-panel__disclaimer">{c.disclaimer}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [open, setOpen] = useState<Product | null>(null);

  return (
    <>
      <div className="shop-grid grid">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="m7-shop-card shop-card relative">
            <Link href="/product" className="shop-card__link flex flex-col">
              <div className="shop-card__img relative overflow-hidden">
                <div className="shop-card__label absolute">▣ {p.name.toUpperCase()}</div>
                {p.badge && (
                  <div className="shop-card__badge absolute uppercase">{p.badge}</div>
                )}
              </div>
              <div className="shop-card__row flex items-baseline justify-between">
                <div>
                  <div className="shop-card__name">{p.name}</div>
                  <div className="shop-card__meta">{p.meta}</div>
                </div>
                <div className="shop-card__price">{priceLabel(p)}</div>
              </div>
            </Link>

            <button
              type="button"
              className="m7-ai-chip shop-ai-chip absolute inline-flex items-center uppercase cursor-pointer"
              aria-label={`Ask Seven about the ${p.name}`}
              onClick={() => setOpen(p)}
            >
              <SparkIcon size={12} />
              {content.grid.chipLabel}
            </button>
          </div>
        ))}
      </div>

      {open && <AiPanel product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
