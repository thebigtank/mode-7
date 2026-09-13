import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { ProductCard } from "@/components/page/Cards";
import { MediaPanel, PageHero, PageSection } from "@/components/page/Blocks";
import { CategoryShowcase } from "@/components/smart-home/CategoryShowcase";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Smart Home — Mode 7",
  description:
    "Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed.",
};

const bestSellers = [
  { name: "Smart Bulb A60", meta: "Smart Lighting", price: "£19" },
  { name: "Dimmer Wall Switch", meta: "Switches & Plugs", price: "£34" },
  { name: "Smart Plug Mini", meta: "Switches & Plugs", price: "£15" },
  { name: "Voice Hub Speaker", meta: "Voice & Control", price: "£89" },
  { name: "Motion Sensor", meta: "Sensors", price: "£24" },
  { name: "Indoor Camera 2K", meta: "Cameras & Security", price: "£79" },
  { name: "Smart Thermostat", meta: "Climate", price: "£149" },
  { name: "Bridge Hub", meta: "Hubs & Bridges", price: "£59" },
];

const assurances = [
  {
    title: "Vetted & Sealed",
    body: "Every smart device is tested, sealed and warrantied before it ships.",
  },
  {
    title: "Cross-Compatible",
    body: "Works across the major ecosystems and voice assistants.",
  },
  {
    title: "Setup Support",
    body: "DIY with guides, or book certified install — Seven helps either way.",
  },
];

export default function SmartHomePage() {
  return (
    <>
      <PageHero
        overline="Smart Home"
        title={<>Everything you need to make your home&nbsp;smart.</>}
        intro="Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed. Build your setup piece by piece."
        actions={
          <>
            <ArrowButton label="Shop Smart Home" variant="fill" href="/shop" />
            <ArrowButton label="Ask Seven" variant="outline" />
          </>
        }
      />

      <div style={{ padding: "44px 26px 0" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            background: stripe(),
            border: "1px solid #e2e2e2",
            height: "min(64vh,640px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 24,
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: 1,
              color: "#9a9a9a",
            }}
          >
            ▣ SMART HOME — CONNECTED LIVING ROOM
          </div>
          {WIREFRAME.showAnnotations && (
            <Annotation style={{ position: "absolute", top: 22, right: 24 }}>
              WEBGL PARALLAX BACKGROUND
            </Annotation>
          )}
        </div>
      </div>

      <PageSection
        overline="Shop by Category"
        title="Build your smart home, one device at a time."
      >
        <CategoryShowcase />
      </PageSection>

      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
            marginBottom: 34,
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
              {"// Popular Right Now"}
            </div>
            <h2
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(24px, 3.3vw, 38px)",
                lineHeight: 1.02,
                letterSpacing: "-3px",
                margin: 0,
              }}
            >
              Smart-home best sellers.
            </h2>
          </div>
          <ArrowButton label="View all products" variant="outline" href="/shop" />
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "14px 18px",
          }}
        >
          {bestSellers.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
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
              {"// Works Together"}
            </div>
            <h2
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(24px, 3.3vw, 38px)",
                lineHeight: 1.02,
                letterSpacing: "-3px",
                margin: "0 0 22px",
                textWrap: "balance",
              }}
            >
              Every device speaks the same language.
            </h2>
            <p
              style={{
                fontSize: "var(--m7-lede-size)",
                lineHeight: 1.65,
                color: "#5a5a5a",
                margin: "0 0 26px",
              }}
            >
              Mix and match across brands — our gear is tested for cross-compatibility
              so your bulbs, switches, sensors and cameras just work as one connected
              home. Start with a single room and expand whenever you like.
            </p>
            <ArrowButton label="Start with a room" variant="fill" href="/shop" />
          </div>
          <MediaPanel
            label="ECOSYSTEM — DEVICES CONNECTED"
            annotation="PARALLAX IMAGE REVEAL"
          />
        </div>

        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginTop: 34,
          }}
        >
          {assurances.map((a) => (
            <div
              key={a.title}
              style={{
                background: "#fcfcfc",
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "32px 30px",
                display: "flex",
                flexDirection: "column",
                minHeight: 220,
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
                {a.title}
              </div>
              <p
                style={{ fontSize: "var(--m7-lede-size)", lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}
              >
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
