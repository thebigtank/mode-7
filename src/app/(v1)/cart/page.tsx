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
    <section className="m7-wrap m7-top-md">
      <CartHeading />
      <CartSteps />

      <div className="cart-split grid">
        <CartLineItems />
        <CartSummary />
      </div>
    </section>
  );
}
