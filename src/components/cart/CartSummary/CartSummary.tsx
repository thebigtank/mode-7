import type { CSSProperties } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { CheckoutButton } from "@/components/checkout/CheckoutModal";
import content from "@/content/cart.json";
import { stripe } from "@/lib/theme";

export function CartSummary() {
  const c = content.summary;

  return (
    <aside
      className="cart-summary"
      style={{ "--cart-summary-stripe": stripe() } as CSSProperties}
    >
      <div className="cart-summary__title">{c.title}</div>

      {c.rows.map((r) => (
        <div key={r.label} className="cart-summary__row flex justify-between">
          <span>{r.label}</span>
          <span className="cart-summary__value">{r.value}</span>
        </div>
      ))}

      <div className="cart-summary__total flex justify-between">
        <span>{c.totalLabel}</span>
        <span className="cart-summary__value">{c.totalValue}</span>
      </div>

      <div className="cart-summary__actions flex flex-col items-start">
        <CheckoutButton />
        <ArrowButton label={c.continueLabel} variant="outline" href={c.continueHref} />
      </div>

      <div className="cart-summary__note flex items-start">
        <span className="cart-summary__note-swatch shrink-0" />
        {c.note}
      </div>
    </aside>
  );
}
