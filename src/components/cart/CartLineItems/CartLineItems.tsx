import { Stepper } from "@/components/cart/Stepper";
import { Annotation } from "@/components/wireframe/Primitives";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

const items = [
  { name: "Mode Flagship X", variant: "256GB · New", price: "₦1,850,000" },
  { name: "Studio Headphones", variant: "Midnight", price: "₦630,000" },
  { name: "Smart Hub", variant: "Gen 2", price: "₦340,000" },
];

export function CartLineItems() {
  return (
    <div className="relative">
      {items.map((it, i) => (
        <div
          key={it.name}
          className="m7-cart-line cart-line"
          data-last={i === items.length - 1 || undefined}
        >
          <div className="m7-cart-line__img cart-line__img" style={{ background: stripe() }}>
            <div className="cart-line__img-label">▣ {it.name.toUpperCase()}</div>
          </div>

          <div>
            <div className="cart-line__name">{it.name}</div>
            <div className="cart-line__variant">{it.variant}</div>
            <div className="cart-line__actions">
              <Stepper />
              <span className="cart-line__remove">Remove</span>
            </div>
          </div>

          <div className="m7-cart-line__price cart-line__price">{it.price}</div>
        </div>
      ))}

      {WIREFRAME.showAnnotations && (
        <Annotation
          style={{
            position: "absolute",
            top: -4,
            right: 0,
            fontSize: 10,
            padding: "6px 13px",
            zIndex: 2,
          }}
        >
          QUANTITY + REMOVE — UPDATES TOTALS
        </Annotation>
      )}
    </div>
  );
}
