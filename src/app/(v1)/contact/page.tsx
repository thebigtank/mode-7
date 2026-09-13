import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { ChevronDownIcon } from "@/components/Icons";
import { MediaPanel } from "@/components/page/Blocks";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Contact — Mode 7",
  description:
    "Sales, support, or a trade-in valuation — pick a lane or send us a message. Seven can also help right now.",
};

const lanes = [
  {
    title: "Sales & Orders",
    body: "Questions about devices, availability, bulk and business orders.",
    cta: "Talk to sales",
  },
  {
    title: "Support",
    body: "Setup help, warranty, repairs and anything post-purchase.",
    cta: "Get support",
  },
  {
    title: "Trade-In",
    body: "Value your current device and start an upgrade in minutes.",
    cta: "Value a device",
  },
];

const channels = [
  "WhatsApp Concierge",
  "Seven AI — 24/7",
  "+44 20 7946 0000",
  "hello@mode7.com",
];

const hours = [
  ["Mon – Fri", "8:00 – 20:00"],
  ["Saturday", "9:00 – 18:00"],
  ["Sunday", "10:00 – 16:00"],
  ["Seven AI", "Always on"],
];

const stores = [
  { city: "London", address: "21 Fitzrovia Court, W1T" },
  { city: "Manchester", address: "8 Deansgate Sq, M3" },
  { city: "Lagos", address: "14 Admiralty Way, Lekki" },
  { city: "Nairobi", address: "3 Riverside Dr, Westlands" },
];

const label = {
  fontSize: 13,
  fontFamily: FONT.mono,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  color: "#8a8a8a",
};

const input = {
  background: "#fafafa",
  border: "1px solid #e6e6e6",
  borderRadius: 4,
  padding: "13px 15px",
  fontFamily: FONT.body,
  fontSize: 16,
  outline: "none",
};

/** Static wireframe field — the form is presentational, not wired to a backend. */
function Field({
  name,
  children,
  span2,
}: {
  name: string;
  children: ReactNode;
  span2?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        gridColumn: span2 ? "1 / -1" : undefined,
      }}
    >
      <span style={label}>{name}</span>
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* hero */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(35px, 4.6vw, 64px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
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
              {"// Contact"}
            </div>
            <h1
              className="m7-hero-h1"
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(41px, 5.7vw, 66px)",
                lineHeight: 1,
                letterSpacing: "-3px",
                margin: 0,
              }}
            >
              Let’s get you to the right&nbsp;team.
            </h1>
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--m7-lede-size)",
                lineHeight: 1.65,
                color: "#5a5a5a",
                margin: "0 0 24px",
              }}
            >
              Sales, support, or a trade-in valuation — pick a lane below or send us a
              message. Seven can also help right now from the corner of any page.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ArrowButton label="Message Seven" variant="fill" />
              <ArrowButton label="Find a Store" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* lanes */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(38px, 5.0vw, 70px) var(--m7-pad) 0" }}>
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
          {"// Where do you want to go?"}
        </div>
        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginTop: 26,
          }}
        >
          {lanes.map((l) => (
            <div
              key={l.title}
              style={{
                background: "#fff",
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "32px 30px",
                display: "flex",
                flexDirection: "column",
                minHeight: 250,
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#121212"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "auto" }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 22,
                  margin: "24px 0 10px",
                }}
              >
                {l.title}
              </div>
              <p
                style={{
                  fontSize: "var(--m7-lede-size)",
                  lineHeight: 1.65,
                  color: "#5a5a5a",
                  margin: "0 0 22px",
                }}
              >
                {l.body}
              </p>
              <div style={{ marginTop: "auto" }}>
                <ArrowButton label={l.cta} variant="outline" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* form + side panels */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(53px, 6.9vw, 96px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div style={{ position: "relative" }}>
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
              {"// Send a message"}
            </div>
            <h2
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(22px, 3.0vw, 34px)",
                lineHeight: 1.02,
                letterSpacing: "-3px",
                margin: "0 0 22px",
                textWrap: "balance",
              }}
            >
              Tell us what you need.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginTop: 12,
              }}
            >
              <div className="m7-c2" style={{ gap: 16 }}>
                <Field name="Full name">
                  <div style={{ ...input, color: "#b4b4b4" }}>Jane Doe</div>
                </Field>
                <Field name="Email">
                  <div style={{ ...input, color: "#b4b4b4" }}>jane@email.com</div>
                </Field>
              </div>

              <Field name="Enquiry type">
                <div
                  style={{
                    ...input,
                    color: "#3a3a3a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Sales &amp; Orders
                  <span style={{ display: "inline-flex", color: "#9a9a9a" }}>
                    <ChevronDownIcon size={18} />
                  </span>
                </div>
              </Field>

              <Field name="Message">
                <div style={{ ...input, color: "#b4b4b4", minHeight: 120 }}>
                  How can we help?
                </div>
              </Field>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 4,
                }}
              >
                <ArrowButton label="Send message" variant="fill" />
                <span style={{ fontSize: 13, color: "#9a9a9a" }}>
                  We reply within one business day.
                </span>
              </div>
            </div>

            {WIREFRAME.showAnnotations && (
              <Annotation
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: 10,
                  padding: "6px 13px",
                }}
              >
                FORM VALIDATION + ENQUIRY ROUTING
              </Annotation>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "26px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 18,
                }}
              >
                Support channels
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {channels.map((c) => (
                  <div
                    key={c}
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1px solid #e2e2e2",
                        background: stripe(),
                      }}
                    />
                    <div style={{ fontSize: 16, color: "#2a2a2a" }}>{c}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "26px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 18,
                }}
              >
                Business hours
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontSize: 15,
                }}
              >
                {hours.map(([day, time]) => (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #f2f2f2",
                      paddingBottom: 10,
                    }}
                  >
                    <span style={{ color: "#7a7a7a" }}>{day}</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stores */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(53px, 6.9vw, 96px) var(--m7-pad) 0" }}>
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
          {"// Visit us"}
        </div>
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(22px, 3.0vw, 34px)",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            margin: "0 0 22px",
            textWrap: "balance",
          }}
        >
          Find a Mode 7 store.
        </h2>

        <div style={{ position: "relative", marginTop: 26 }}>
          <MediaPanel
            label="INTERACTIVE STORE MAP"
            height={420}
            annotation="LIVE MAP — CLICK A PIN TO SELECT STORE"
          />
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginTop: 14,
          }}
        >
          {stores.map((s) => (
            <div
              key={s.city}
              style={{
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                {s.city}
              </div>
              <div style={{ fontSize: 15, color: "#8a8a8a", lineHeight: 1.5 }}>
                {s.address}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
