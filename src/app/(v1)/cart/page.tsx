import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { CheckoutButton } from "@/components/checkout/CheckoutModal";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Cart — Mode 7",
  description:
    "Your Mode 7 bag — review, apply your trade-in estimate and finish with an agent on WhatsApp.",
};

const items = [
  { name: "Mode Flagship X", variant: "256GB · New", price: "₦1,850,000" },
  { name: "Studio Headphones", variant: "Midnight", price: "₦630,000" },
  { name: "Smart Hub", variant: "Gen 2", price: "₦340,000" },
];

/**
 * Subtotal 2,820,000 − trade-in 700,000 = 2,120,000 taxable.
 * VAT at 7.5% of that is 159,000, so the total is 2,279,000.
 */
const totals: [string, string][] = [
  ["Subtotal", "₦2,820,000"],
  ["Trade-in estimate applied", "−₦700,000"],
  ["Delivery", "Free"],
  ["VAT (7.5%)", "₦159,000"],
];

const TOTAL = "₦2,279,000";

/** Mirrors the real flow: there is no card form, an agent takes it from here. */
const steps = ["Bag", "Agent confirms", "Payment & delivery"];

/** Quantity stepper — presentational in the wireframe. */
function Stepper() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #e2e2e2",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <span
        className="m7-tap"
        style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8a8a8a",
          cursor: "pointer",
        }}
      >
        −
      </span>
      <span style={{ width: 38, textAlign: "center", fontSize: 15 }}>1</span>
      <span
        className="m7-tap"
        style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8a8a8a",
          cursor: "pointer",
        }}
      >
        +
      </span>
    </div>
  );
}

export default function CartPage() {
  return (
    <>
      <section className="m7-wrap m7-top-md">
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {"// Cart"}
        </div>
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(30px, 4.6vw, 44px)",
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            margin: "0 0 22px",
          }}
        >
          Your bag.
        </h2>

        {/* checkout progress */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            margin: "8px 0 40px",
            flexWrap: "wrap",
          }}
        >
          {steps.map((s, i) => (
            <div key={s} style={{ display: "contents" }}>
              {i > 0 && (
                <span style={{ width: 40, height: 1, background: "#e2e2e2" }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontFamily: FONT.mono,
                    background: i === 0 ? "#121212" : "#fff",
                    color: i === 0 ? "#fff" : "#9a9a9a",
                    border: `1px solid ${i === 0 ? "#121212" : "#d6d6d6"}`,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: i === 0 ? "#121212" : "#9a9a9a",
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {s}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          {/* line items */}
          <div style={{ position: "relative" }}>
            {items.map((it, i) => (
              <div
                key={it.name}
                className="m7-cart-line"
                style={{
                  display: "grid",
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom:
                    i === items.length - 1 ? undefined : "1px solid #ececec",
                }}
              >
                <div
                  className="m7-cart-line__img"
                  style={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: stripe(),
                    border: "1px solid #e2e2e2",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 18,
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      letterSpacing: 1,
                      color: "#9a9a9a",
                    }}
                  >
                    ▣ {it.name.toUpperCase()}
                  </div>
                </div>

                <div>
                  <div
                    style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 17 }}
                  >
                    {it.name}
                  </div>
                  <div style={{ fontSize: 14, color: "#9a9a9a", marginTop: 4 }}>
                    {it.variant}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginTop: 12,
                    }}
                  >
                    <Stepper />
                    <span
                      style={{
                        fontSize: 14,
                        color: "#9a9a9a",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>

                <div
                  className="m7-cart-line__price"
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: 18,
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.price}
                </div>
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

          {/* order summary */}
          <aside
            className="m7-cart-summary"
            style={{
              border: "1px solid #ececec",
              borderRadius: 4,
              padding: "clamp(22px, 3vw, 30px) clamp(20px, 3vw, 30px) 34px",
              position: "sticky",
              top: 100,
              background: "#fcfcfc",
            }}
          >
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 22,
              }}
            >
              Order summary
            </div>

            {totals.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 15,
                  color: "#7a7a7a",
                  padding: "0 0 14px",
                }}
              >
                <span>{k}</span>
                <span style={{ color: "#1a1a1a" }}>{v}</span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                fontFamily: FONT.head,
                fontWeight: 700,
                padding: "18px 0 0",
                borderTop: "1px solid #ececec",
                marginTop: 6,
              }}
            >
              <span>Total</span>
              <span style={{ color: "#1a1a1a" }}>{TOTAL}</span>
            </div>

            <div
              style={{
                marginTop: 26,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              {/* Checkout is a WhatsApp handoff, not a card form. It opens a
                  short KYC form first — an agent still needs to know who you
                  are and where the bag is going. */}
              <CheckoutButton />
              <ArrowButton
                label="Continue shopping"
                variant="outline"
                href="/shop"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginTop: 22,
                fontSize: 13,
                lineHeight: 1.55,
                color: "#8a8a8a",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: stripe(),
                  border: "1px solid #e2e2e2",
                  flex: "0 0 auto",
                }}
              />
              No card details here. Your bag goes to an agent who confirms stock
              and payment with you directly.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
