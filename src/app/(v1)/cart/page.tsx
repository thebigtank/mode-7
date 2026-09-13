import type { Metadata } from "next";
import { CartHeading } from "@/components/cart/CartHeading";
import { CartLineItems } from "@/components/cart/CartLineItems";
import { CartSteps } from "@/components/cart/CartSteps";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Cart — Mode 7",
  description:
    "Your Mode 7 bag — review, apply your trade-in estimate and finish with an agent on WhatsApp.",
};

export default function CartPage() {
  return (
    <>
      <section className="m7-wrap m7-top-md">
        <CartHeading />
        <CartSteps />

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <CartLineItems />
          <CartSummary />
        </div>
      </section>
    </>
  );
}
