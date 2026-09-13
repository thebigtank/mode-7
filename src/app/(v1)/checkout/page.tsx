import type { Metadata } from "next";
import { OrderReceived } from "@/components/checkout/OrderReceived";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Order received — Mode 7",
  description:
    "Your order has been routed to a Mode 7 agent, who will reach out on WhatsApp to confirm stock, payment and delivery.",
};

/**
 * The WhatsApp handoff confirmation.
 *
 * A thin server shell so the route keeps its metadata; everything that depends
 * on the details submitted at checkout lives in the client component.
 */
export default function CheckoutPage() {
  return (
    <>
      <OrderReceived />
      {WIREFRAME.showAnnotations && (
        <div
          className="m7-wrap"
          style={{ display: "flex", justifyContent: "center", paddingTop: 34 }}
        >
          <Annotation style={{ fontSize: 10, padding: "6px 13px" }}>
            WHATSAPP HANDOFF — NO CARD DETAILS TAKEN ON SITE
          </Annotation>
        </div>
      )}
    </>
  );
}
