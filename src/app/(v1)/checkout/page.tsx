import type { Metadata } from "next";
import { OrderReceived } from "@/components/checkout/OrderReceived";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/checkout.json";
import { WIREFRAME } from "@/lib/wireframe-config";

const ANNOTATION_SIZE = { fontSize: 10, padding: "6px 13px" };

export const metadata: Metadata = {
  title: "Order received — Mode 7",
  description:
    "Your order has been routed to a Mode 7 agent, who will reach out on WhatsApp to confirm stock, payment and delivery.",
};

export default function CheckoutPage() {
  return (
    <>
      <OrderReceived />
      {WIREFRAME.showAnnotations && (
        <div className="m7-wrap flex justify-center pt-[34px]">
          <Annotation style={ANNOTATION_SIZE}>{content.page.annotation}</Annotation>
        </div>
      )}
    </>
  );
}
