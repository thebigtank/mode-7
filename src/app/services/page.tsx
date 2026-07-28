import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { ArrowRightIcon } from "@/components/Icons";
import { Glyph, ShieldCheck, type GlyphName } from "@/components/page/ServiceIcons";
import { CategoryNav } from "@/components/services/CategoryNav";
import { Faq } from "@/components/services/Faq";
import { VariantLabel } from "@/components/wireframe/Primitives";
import { FONT, containerPad, stripe } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Services — Mode 7",
  description:
    "From flagship launches to certified refurbished, instant trade-ins to concierge checkout — the premium tech store built around how you buy.",
};

/* ------------------------------------------------------------------ shared */

const card: CSSProperties = {
  background: "#fcfcfc",
  border: "1px solid #ececec",
  borderRadius: 4,
};

const tileStripe: CSSProperties = {
  position: "relative",
  borderRadius: 4,
  overflow: "hidden",
  background: stripe(),
  border: "1px solid #ececec",
};

function SectionHead({
  overline,
  title,
  lede,
  maxWidth = 860,
}: {
  overline: string;
  title: string;
  lede?: string;
  maxWidth?: number;
}) {
  return (
    <div style={{ maxWidth, marginBottom: 36 }}>
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
        {`// ${overline}`}
      </div>
      <h2
        style={{
          fontFamily: FONT.head,
          fontWeight: 600,
          fontSize: "clamp(25px, 3.5vw, 40px)",
          lineHeight: 1,
          letterSpacing: "-3px",
          margin: lede ? "0 0 14px" : 0,
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      {lede && (
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#5a5a5a",
            margin: 0,
            maxWidth: 520,
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

function StripeLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 18,
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: 1,
        color: "#9a9a9a",
        zIndex: 2,
      }}
    >
      ▣ {children}
    </div>
  );
}

/** Small icon + label + sub-label chip used inside the "Curated retail" card. */
function MiniRow({
  icon,
  title,
  sub,
}: {
  icon: GlyphName;
  title: string;
  sub: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ececec",
        borderRadius: 4,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 11,
      }}
    >
      <Glyph name={icon} size={20} strokeWidth={1.7} />
      <div>
        <div
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "-0.2px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 9,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: "#9a9a9a",
            marginTop: 3,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

/** Category tile: striped header with a glyph, then a title row with an arrow. */
function CategoryTile({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: GlyphName;
}) {
  return (
    <div
      className="m7-lift"
      style={{ ...card, overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          position: "relative",
          height: 150,
          background: stripe(),
          borderBottom: "1px solid #ececec",
        }}
      >
        <StripeLabel>{label.toUpperCase()}</StripeLabel>
        <span style={{ position: "absolute", right: 14, bottom: 14 }}>
          <Glyph name={icon} size={26} />
        </span>
      </div>
      <div
        style={{
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "-0.3px",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              color: "#9a9a9a",
              marginTop: 4,
            }}
          >
            {sub}
          </div>
        </div>
        <ArrowRightIcon size={20} strokeWidth={1.8} stroke="#121212" />
      </div>
    </div>
  );
}

/** Bento cell: glyph top, title + sub pinned bottom. */
function BentoCell({
  icon,
  title,
  sub,
  style,
}: {
  icon: GlyphName;
  title: string;
  sub: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="m7-lift"
      style={{
        ...card,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <Glyph name={icon} size={28} />
      <div>
        <div
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.3px",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 14, color: "#6a6a6a" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- data */

const coreRows: { icon: GlyphName; title: string; sub: string }[] = [
  { icon: "phone", title: "Flagship Phones", sub: "iPhone · Galaxy · Pixel" },
  { icon: "laptop", title: "Business Laptops", sub: "MacBook · ThinkPad · XPS" },
  { icon: "tablet", title: "Pro Tablets", sub: "iPad · Galaxy Tab · Surface" },
  { icon: "home", title: "Smart Home Automation", sub: "Lighting · Climate · Security" },
  { icon: "sun", title: "Solar & Green Energy", sub: "Panels · Inverters · Batteries" },
  { icon: "battery", title: "Solar Generators & Power", sub: "Jackery · Anker · EcoFlow" },
];

const categories: { label: string; sub: string; icon: GlyphName }[] = [
  { label: "Flagship Phones", sub: "iPhone · Galaxy · Pixel", icon: "phone" },
  { label: "Business Laptops", sub: "MacBook · ThinkPad · XPS", icon: "laptop" },
  { label: "Pro Tablets", sub: "iPad · Galaxy Tab · Surface", icon: "tablet" },
  { label: "Smart Home Automation", sub: "Lighting · Climate · Security", icon: "home" },
  { label: "Solar & Green Energy", sub: "Panels · Inverters · Batteries", icon: "sun" },
  { label: "Solar Generators & Power", sub: "Jackery · Anker · EcoFlow", icon: "battery" },
  { label: "Certified Refurbished", sub: "Renewed · Sealed · Warrantied", icon: "refresh" },
];

/* -------------------------------------------------------------------- page */

export default function ServicesPage() {
  return (
    <>
      {/* ---------------------------------------------------------------
          HERO — two directions kept side by side for comparison.
          Cull one once it is chosen; the survivor loses its VariantLabel.
          --------------------------------------------------------------- */}

      <div style={{ paddingTop: 64 }}>
        <VariantLabel tag="Hero · 01 / 02" note="Two-column grid — primary" />
      </div>

      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
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
              {"// Services"}
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
              Everything your tech needs, under one&nbsp;roof.
            </h1>
          </div>
          <div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 18,
                lineHeight: 1.65,
                color: "#5a5a5a",
                margin: "0 0 24px",
              }}
            >
              From flagship launches to certified refurbished, instant trade-ins to
              concierge checkout — Mode 7 is the premium tech store built entirely
              around how you buy.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ArrowButton label="Shop the Store" variant="fill" href="/shop" />
              <ArrowButton
                label="Value Your Device"
                variant="outline"
                href="/trade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HERO 02 — full-bleed image, content bound to the 1320px container.
          The image runs edge to edge but the copy block and the stat card stay
          aligned to the site grid via the `max(48px, …)` calc, so the layout
          still reads as part of the page rather than a detached banner. */}
      <div style={{ marginTop: 84 }}>
        <VariantLabel
          tag="Hero · 02 / 02"
          note="Full-bleed image · content bound to container"
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(82vh,820px)",
            overflow: "hidden",
            background: stripe(),
            color: "#121212",
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
              zIndex: 2,
            }}
          >
            ▣ STOREFRONT / LIFESTYLE — FULL BLEED
          </div>

          <div
            style={{
              position: "absolute",
              left: containerPad(),
              bottom: 72,
              maxWidth: 540,
            }}
          >
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
              {"// Services"}
            </div>
            <h1
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(40px,5vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-3px",
                margin: "0 0 22px",
              }}
            >
              Everything for the connected home.
            </h1>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 19,
                lineHeight: 1.6,
                color: "#3a3a3a",
                margin: "0 0 28px",
                maxWidth: 480,
              }}
            >
              Devices, smart home and solar — curated, sealed and delivered by Mode 7.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ArrowButton label="Shop the Store" variant="fill" href="/shop" />
              <ArrowButton
                label="Value Your Device"
                variant="outline"
                href="/trade-in"
              />
            </div>
          </div>

          {/* glass stat card, mirrored to the container's right edge */}
          <div
            style={{
              position: "absolute",
              right: containerPad(),
              bottom: 72,
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.9)",
              borderRadius: 4,
              padding: "20px 24px",
              boxShadow: "0 20px 50px rgba(18,18,18,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 700,
                fontSize: "clamp(22px, 3.0vw, 34px)",
                lineHeight: 1,
              }}
            >
              50K+
            </div>
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 13,
                color: "#5a5a5a",
                marginTop: 2,
              }}
            >
              devices vetted, sealed &amp; guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* Pills sit flush under the hero, balanced on their own 26px padding —
          no extra top margin, or the row reads as belonging to nothing. */}
      <CategoryNav />

      {/* premium + certified refurbished */}
      <section
        id="sec-premium"
        style={{
          width: "100%",
          background: "#ffffff",
          padding: "100px 0",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
          <SectionHead
            overline="Premium & Certified Refurbished"
            title="Premium flagships & certified refurbished devices."
          />

          <div
            className="m7-grid-2"
            style={{
              border: "1px solid #ececec",
              borderRadius: 4,
              background: "#fcfcfc",
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 44, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#fff",
                    background: "#121212",
                    borderRadius: 99,
                    padding: "6px 13px",
                  }}
                >
                  The Core
                </span>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#9a9a9a",
                  }}
                >
                  The store itself
                </span>
              </div>
              <h3
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 30,
                  lineHeight: 1.02,
                  letterSpacing: "-1.5px",
                  margin: "0 0 14px",
                }}
              >
                Curated premium retail.
              </h3>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#5a5a5a",
                  margin: "0 0 26px",
                  maxWidth: 520,
                }}
              >
                The heart of Mode 7. Phones, laptops and tablets, complete smart-home
                systems, solar and portable power — every unit inspected, vetted and
                factory-sealed before it reaches your cart.
              </p>
              <div className="m7-c2" style={{ gap: 10, marginBottom: 30 }}>
                {coreRows.map((r) => (
                  <MiniRow key={r.title} {...r} />
                ))}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  flexWrap: "wrap",
                }}
              >
                <ArrowButton label="Shop the store" variant="fill" href="/shop" />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#9a9a9a",
                  }}
                >
                  13+ premium brands · 100% vetted &amp; sealed
                </span>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                background: stripe(),
                borderLeft: "1px solid #ececec",
                minHeight: 460,
              }}
            >
              <StripeLabel>PREMIUM DEVICE WALL</StripeLabel>
              <div
                style={{
                  position: "absolute",
                  left: 22,
                  bottom: 22,
                  background: "#fff",
                  border: "1px solid #e6e6e6",
                  borderRadius: 4,
                  padding: "16px 20px",
                  boxShadow: "0 12px 30px rgba(18,18,18,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: "clamp(22px, 3.0vw, 34px)",
                    lineHeight: 1,
                  }}
                >
                  13+
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 13,
                    color: "#8a8a8a",
                    marginTop: 2,
                  }}
                >
                  world-class brands, one store
                </div>
              </div>
            </div>
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
            {categories.map((c) => (
              <CategoryTile key={c.label} {...c} />
            ))}
            <div
              className="m7-lift-dark"
              style={{
                background: "#121212",
                color: "#fff",
                borderRadius: 4,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform .3s ease,box-shadow .3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Plus every service
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.3px",
                  lineHeight: 1.2,
                  margin: "10px 0",
                }}
              >
                Trade-in, concierge, warranty &amp; chat checkout
              </div>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                See all services
                <ArrowRightIcon size={16} strokeWidth={1.8} />
              </span>
            </div>
          </div>

          {/* business & bulk */}
          <div
            className="m7-lift"
            style={{
              ...card,
              padding: "30px 34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
              marginTop: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                flex: "1 1 460px",
              }}
            >
              <Glyph name="briefcase" size={34} />
              <div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#9a9a9a",
                    marginBottom: 8,
                  }}
                >
                  Fleet &amp; Volume
                </div>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "-0.4px",
                    marginBottom: 8,
                  }}
                >
                  Business &amp; Bulk Orders
                </div>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "#5a5a5a",
                    margin: 0,
                    maxWidth: 660,
                  }}
                >
                  Kitting out a team or reselling at scale? Volume pricing,
                  consolidated invoicing and a dedicated account manager on every
                  fleet order.
                </p>
              </div>
            </div>
            <ArrowButton label="Talk to our team" variant="outline" href="/contact" />
          </div>
        </div>
      </section>

      {/* smart home */}
      <section
        id="sec-smarthome"
        style={{
          width: "100%",
          background: "#f3f3f1",
          padding: "100px 0",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
          <SectionHead
            overline="Smart Home Automation"
            title="A home that runs itself."
            lede="Lighting, climate, security and entertainment — shipped as complete kits and controlled from a single app."
            maxWidth={720}
          />
          <div
            className="m7-grid-3 m7-mosaic"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gridAutoRows: "minmax(200px,auto)",
              gap: 14,
            }}
          >
            <div
              className="m7-lift"
              style={{
                ...tileStripe,
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2",
              }}
            >
              <StripeLabel>ONE-APP CONTROL</StripeLabel>
              <div
                style={{ position: "absolute", left: 26, bottom: 26, right: 26 }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 26,
                    letterSpacing: "-1px",
                    color: "#121212",
                    marginBottom: 14,
                  }}
                >
                  Control every room from one app.
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 18,
                  }}
                >
                  {["Morning", "Away", "Movie Night", "Goodnight"].map((s) => (
                    <span
                      key={s}
                      style={{
                        background: "#fff",
                        border: "1px solid #e2e2e2",
                        borderRadius: 99,
                        padding: "7px 14px",
                        fontFamily: FONT.mono,
                        fontSize: 11,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        color: "#121212",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <ArrowButton
                  label="Explore Smart Home"
                  variant="fill"
                  href="/smart-home"
                />
              </div>
            </div>
            <BentoCell
              icon="lamp"
              title="Lighting"
              sub="Scenes, schedules & dimming"
              style={{ gridColumn: 3, gridRow: 1 }}
            />
            <BentoCell
              icon="thermo"
              title="Climate"
              sub="Smart thermostats & zones"
              style={{ gridColumn: 3, gridRow: 2 }}
            />
            <BentoCell
              icon="lock"
              title="Security"
              sub="Cameras, locks & sensors"
              style={{ gridColumn: 1, gridRow: 3 }}
            />
            <BentoCell
              icon="tv"
              title="Entertainment"
              sub="Multi-room audio & video"
              style={{ gridColumn: 2, gridRow: 3 }}
            />
            <BentoCell
              icon="wifi"
              title="Energy & Sensors"
              sub="Monitor usage in real time"
              style={{ gridColumn: 3, gridRow: 3 }}
            />
          </div>
        </div>
      </section>

      {/* solar */}
      <section
        id="sec-solar"
        style={{
          width: "100%",
          background: "#ffffff",
          padding: "100px 0",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
          <SectionHead
            overline="Solar & Green Energy"
            title="Clean, reliable power for every home."
            lede="Solar panels, home batteries, inverters and portable power stations — everything to go green and stay powered."
            maxWidth={720}
          />
          <div
            className="m7-grid-2 m7-mosaic"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gridAutoRows: 186,
              gap: 14,
            }}
          >
            <div
              className="m7-lift"
              style={{
                ...tileStripe,
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2",
              }}
            >
              <StripeLabel>SOLAR ARRAY</StripeLabel>
              <div style={{ position: "absolute", left: 24, bottom: 22, right: 24 }}>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "-0.5px",
                    color: "#121212",
                  }}
                >
                  Solar Panels &amp; Roof Systems
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: "#5a5a5a",
                    margin: "4px 0 16px",
                  }}
                >
                  Tier-1 panels, engineered for your roof
                </div>
                <ArrowButton
                  label="Explore Green Energy"
                  variant="fill"
                  href="/green-energy"
                />
              </div>
            </div>
            <div
              className="m7-lift"
              style={{ ...tileStripe, gridColumn: 3, gridRow: "1 / span 2" }}
            >
              <StripeLabel>BATTERY STACK</StripeLabel>
              <div style={{ position: "absolute", left: 20, bottom: 18, right: 20 }}>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: "-0.4px",
                    color: "#121212",
                  }}
                >
                  Home Batteries &amp; Storage
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: "#5a5a5a",
                    marginTop: 4,
                  }}
                >
                  Power through night &amp; outages
                </div>
              </div>
              <span style={{ position: "absolute", right: 16, top: 16 }}>
                <ArrowRightIcon size={20} strokeWidth={1.8} stroke="#121212" />
              </span>
            </div>
            <div
              className="m7-lift"
              style={{ ...tileStripe, gridColumn: 4, gridRow: 1 }}
            >
              <StripeLabel>POWER STATION</StripeLabel>
              <div style={{ position: "absolute", left: 20, bottom: 18, right: 20 }}>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: "-0.4px",
                    color: "#121212",
                  }}
                >
                  Portable Power Stations
                </div>
              </div>
              <span style={{ position: "absolute", right: 16, top: 16 }}>
                <ArrowRightIcon size={20} strokeWidth={1.8} stroke="#121212" />
              </span>
            </div>
            <BentoCell
              icon="battery"
              title="Inverters"
              sub="Hybrid & string"
              style={{ gridColumn: 4, gridRow: 2, padding: 22 }}
            />
            <BentoCell
              icon="sun"
              title="Solar Generators"
              sub="Jackery · Anker · EcoFlow"
              style={{ gridColumn: 1, gridRow: 3, padding: 22 }}
            />
            <BentoCell
              icon="bolt"
              title="Off-grid Kits"
              sub="Cabins & backup"
              style={{ gridColumn: 2, gridRow: 3, padding: 22 }}
            />
            <BentoCell
              icon="wifi"
              title="Energy Monitoring"
              sub="Track every watt"
              style={{ gridColumn: 3, gridRow: 3, padding: 22 }}
            />
            <BentoCell
              icon="refresh"
              title="Green Financing"
              sub="Pay over time"
              style={{ gridColumn: 4, gridRow: 3, padding: 22 }}
            />
          </div>
        </div>
      </section>

      {/* trade-in */}
      <section
        id="sec-tradein"
        style={{
          width: "100%",
          background: "#f3f3f1",
          padding: "100px 0",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--m7-pad)" }}>
          <SectionHead
            overline="Trade-In"
            title="Trade in your old tech, upgrade the same day."
          />
          <div
            className="m7-grid-3 m7-mosaic"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
              gridAutoRows: "minmax(232px,auto)",
            }}
          >
            <div
              className="m7-lift-dark"
              style={{
                gridColumn: 1,
                gridRow: "1 / span 2",
                background: "#121212",
                color: "#fff",
                borderRadius: 4,
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                transition: "transform .3s ease,box-shadow .3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <Glyph name="refresh" size={32} stroke="#fff" />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    textAlign: "right",
                  }}
                >
                  Renewed &amp; Sealed
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: "-0.5px",
                  margin: "26px 0 12px",
                }}
              >
                Certified Refurbished
              </div>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.62)",
                  margin: 0,
                }}
              >
                Premium hardware, professionally renewed and graded to like-new —
                then factory-sealed again. Independently warrantied and priced well
                below new.
              </p>
              <div
                style={{
                  marginTop: 26,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {["50-point inspection", "12-month warranty", "14-day free returns"].map(
                  (b) => (
                    <div
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        fontFamily: FONT.body,
                        fontSize: 15,
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      <ShieldCheck />
                      {b}
                    </div>
                  ),
                )}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 26,
                  borderTop: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: "clamp(24px, 3.3vw, 38px)",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                  }}
                >
                  Up to 40% off
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 5,
                  }}
                >
                  versus new retail — same guarantee
                </div>
              </div>
            </div>

            {[
              {
                icon: "swap" as GlyphName,
                tag: "Instant Valuation",
                title: "Intelligent Trade-In",
                body: "Tell Seven what you own and get a fair, AI-calculated value in about a minute — then apply it toward a sealed upgrade.",
                foot: "~60-second valuation",
                col: 2,
              },
              {
                icon: "chat" as GlyphName,
                tag: "Web to WhatsApp",
                title: "Concierge Checkout",
                body: "Finish your purchase in a secure, personal WhatsApp thread — confirm specs, pay and track delivery, all in chat.",
                foot: "Secure chat checkout",
                col: 3,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="m7-lift"
                style={{
                  ...card,
                  gridColumn: c.col,
                  gridRow: 1,
                  padding: "30px 28px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <Glyph name={c.icon} size={30} />
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "#9a9a9a",
                      textAlign: "right",
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 21,
                    letterSpacing: "-0.4px",
                    margin: "24px 0 10px",
                  }}
                >
                  {c.title}
                </div>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "#5a5a5a",
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 20,
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#121212",
                    fontWeight: 700,
                  }}
                >
                  {c.foot}
                </div>
              </div>
            ))}

            <div
              className="m7-lift"
              style={{
                ...card,
                gridColumn: "2 / span 2",
                gridRow: 2,
                padding: 34,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#9a9a9a",
                  marginBottom: 12,
                }}
              >
                Instant valuation → same-day upgrade
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 25,
                  letterSpacing: "-0.6px",
                  marginBottom: 10,
                }}
              >
                Turn your old devices into your next upgrade.
              </div>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "#5a5a5a",
                  margin: "0 0 22px",
                  maxWidth: 560,
                }}
              >
                Seven values your device in about a minute — apply it instantly toward
                anything in store, sealed and guaranteed.
              </p>
              <ArrowButton
                label="Start your trade-in"
                variant="fill"
                href="/trade-in"
              />
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
