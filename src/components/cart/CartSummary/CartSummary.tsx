import { ArrowButton } from "@/components/ArrowButton";
import { CheckoutButton } from "@/components/checkout/CheckoutModal";
import { stripe } from "@/lib/theme";

const totals: [string, string][] = [
  ["Subtotal", "₦2,820,000"],
  ["Trade-in estimate applied", "−₦700,000"],
  ["Delivery", "Free"],
  ["VAT (7.5%)", "₦159,000"],
];

const TOTAL = "₦2,279,000";

export function CartSummary() {
  return (
    <aside className="m7-cart-summary cart-summary">
      <div className="cart-summary__title">Order summary</div>

      {totals.map(([k, v]) => (
        <div key={k} className="cart-summary__row">
          <span>{k}</span>
          <span className="cart-summary__value">{v}</span>
        </div>
      ))}

      <div className="cart-summary__total">
        <span>Total</span>
        <span className="cart-summary__value">{TOTAL}</span>
      </div>

      <div className="cart-summary__actions">
        <CheckoutButton />
        <ArrowButton label="Continue shopping" variant="outline" href="/shop" />
      </div>

      <div className="cart-summary__note">
        <span className="cart-summary__note-swatch" style={{ background: stripe() }} />
        No card details here. Your bag goes to an agent who confirms stock
        and payment with you directly.
      </div>
    </aside>
  );
}
