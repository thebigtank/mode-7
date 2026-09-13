import type { CSSProperties } from "react";
import { Stepper } from "@/components/cart/Stepper";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/cart.json";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

const ANNOTATION_SIZE = { fontSize: 10, padding: "6px 13px" };

export function CartLineItems() {
  const c = content.lines;

  return (
    <div
      className="relative"
      style={{ "--cart-line-stripe": stripe() } as CSSProperties}
    >
      {c.items.map((it, i) => (
        <div
          key={it.name}
          className="cart-line grid"
          data-last={i === c.items.length - 1 || undefined}
        >
          <div className="cart-line__img relative overflow-hidden">
            <div className="cart-line__img-label absolute">
              ▣ {it.name.toUpperCase()}
            </div>
          </div>

          <div>
            <div className="cart-line__name">{it.name}</div>
            <div className="cart-line__variant">{it.variant}</div>
            <div className="cart-line__actions flex items-center">
              <Stepper />
              <span className="cart-line__remove cursor-pointer">
                {c.removeLabel}
              </span>
            </div>
          </div>

          <div className="cart-line__price">{it.price}</div>
        </div>
      ))}

      {WIREFRAME.showAnnotations && (
        <div className="cart-lines__annot absolute z-[2]">
          <Annotation style={ANNOTATION_SIZE}>{c.annotation}</Annotation>
        </div>
      )}
    </div>
  );
}
