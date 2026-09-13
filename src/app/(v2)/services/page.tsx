import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/Icons";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { Glyph, ShieldCheck, type GlyphName } from "@/components/page/ServiceIcons";
import { BentoCell } from "@/components/services/BentoCell";
import { CategoryNav } from "@/components/services/CategoryNav";
import { CategoryTile } from "@/components/services/CategoryTile";
import { MiniRow } from "@/components/services/MiniRow";
import { SectionHead } from "@/components/services/SectionHead";
import { StripeLabel } from "@/components/services/StripeLabel";
import { Faq } from "@/components/services/Faq";
import { V2, V2_FONT, V2_HAIR } from "@/lib/theme-v2";

export const metadata: Metadata = {
  title: "Services — Mode 7",
  description:
    "From flagship launches to certified refurbished, instant trade-ins to concierge checkout — the premium tech store built around how you buy.",
};

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

export default function ServicesPage() {
  return (
    <div className="services-page">

      <section style={{ background: V2.white }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "end",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "64px var(--m7-pad) 0",
          }}
        >
          <div>
            <Mono dot className="mb-4">
              Services
            </Mono>
            <h1
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: "clamp(41px, 5.7vw, 66px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: V2.ink,
                margin: 0,
              }}
            >
              Everything your tech needs, under one&nbsp;roof.
            </h1>
          </div>
          <div>
            <P size={18} style={{ lineHeight: 1.65, margin: "0 0 24px" }}>
              From flagship launches to certified refurbished, instant trade-ins to
              concierge checkout — Mode 7 is the premium tech store built entirely
              around how you buy.
            </P>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonV2 label="Shop the Store" variant="fill" href="/shop" />
              <ButtonV2
                label="Value Your Device"
                variant="outline"
                href="/trade-in"
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: 84 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(82vh,820px)",
            overflow: "hidden",
            background: "var(--v2-stripe)",
            color: V2.ink,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 18,
              fontFamily: V2_FONT.mono,
              fontSize: 11,
              letterSpacing: "0.04em",
              color: V2.muted,
              zIndex: 2,
            }}
          >
            ▣ STOREFRONT / LIFESTYLE — FULL BLEED
          </div>

          <div
            style={{
              position: "absolute",
              left: "var(--m7-bleed)",
              bottom: 72,
              maxWidth: 540,
            }}
          >
            <Mono dot className="mb-4">
              Services
            </Mono>
            <h1
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: "clamp(40px,5vw,72px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: V2.ink,
                margin: "0 0 22px",
              }}
            >
              Everything for the connected home.
            </h1>
            <P size={19} style={{ lineHeight: 1.6, margin: "0 0 28px", maxWidth: 480 }}>
              Devices, smart home and solar — curated, sealed and delivered by Mode 7.
            </P>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonV2 label="Shop the Store" variant="fill" href="/shop" />
              <ButtonV2
                label="Value Your Device"
                variant="outline"
                href="/trade-in"
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "var(--m7-bleed)",
              bottom: 72,
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.9)",
              borderRadius: 4,
              padding: "20px 24px",
              boxShadow: "0 20px 50px rgba(23,29,29,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: V2_FONT.display,
                fontWeight: 400,
                fontSize: "clamp(22px, 3.0vw, 34px)",
                lineHeight: 1,
                letterSpacing: "-0.018em",
                color: V2.ink,
              }}
            >
              50K+
            </div>
            <div
              style={{
                fontFamily: V2_FONT.body,
                fontSize: 13,
                color: V2.muted,
                marginTop: 2,
              }}
            >
              devices vetted, sealed &amp; guaranteed
            </div>
          </div>
        </div>
      </div>

      <CategoryNav />

      <section
        id="sec-premium"
        style={{
          width: "100%",
          background: V2.white,
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
              border: V2_HAIR,
              borderRadius: 4,
              background: V2.white,
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
                    fontFamily: V2_FONT.mono,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: V2.white,
                    background: V2.ink,
                    borderRadius: 99,
                    padding: "6px 13px",
                  }}
                >
                  The Core
                </span>
                <span
                  style={{
                    fontFamily: V2_FONT.mono,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: V2.muted,
                  }}
                >
                  The store itself
                </span>
              </div>
              <h3
                style={{
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 30,
                  lineHeight: 1.2,
                  letterSpacing: "-0.014em",
                  color: V2.ink,
                  margin: "0 0 14px",
                }}
              >
                Curated premium retail.
              </h3>
              <P size={18} style={{ lineHeight: 1.6, margin: "0 0 26px", maxWidth: 520 }}>
                The heart of Mode 7. Phones, laptops and tablets, complete smart-home
                systems, solar and portable power — every unit inspected, vetted and
                factory-sealed before it reaches your cart.
              </P>
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
                <ButtonV2 label="Shop the store" variant="fill" href="/shop" />
                <span
                  style={{
                    fontFamily: V2_FONT.mono,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: V2.muted,
                  }}
                >
                  13+ premium brands · 100% vetted &amp; sealed
                </span>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                background: "var(--v2-stripe)",
                borderLeft: V2_HAIR,
                minHeight: 460,
              }}
            >
              <StripeLabel>PREMIUM DEVICE WALL</StripeLabel>
              <div
                style={{
                  position: "absolute",
                  left: 22,
                  bottom: 22,
                  background: V2.white,
                  border: V2_HAIR,
                  borderRadius: 4,
                  padding: "16px 20px",
                  boxShadow: "0 12px 30px rgba(23,29,29,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: "clamp(22px, 3.0vw, 34px)",
                    lineHeight: 1,
                    letterSpacing: "-0.018em",
                    color: V2.ink,
                  }}
                >
                  13+
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 13,
                    color: V2.muted,
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
              className="svc-lift-dark"
              style={{
                background: V2.ink,
                color: V2.white,
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
                  fontFamily: V2_FONT.mono,
                  fontSize: 10,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: V2.faint,
                }}
              >
                Plus every service
              </div>
              <div
                style={{
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 19,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  margin: "10px 0",
                }}
              >
                Trade-in, concierge, warranty &amp; chat checkout
              </div>
              <span
                style={{
                  fontFamily: V2_FONT.body,
                  fontSize: 14,
                  color: V2.faint,
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

          <div
            className="svc-lift svc-card"
            style={{
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
              <Glyph name="briefcase" size={34} stroke={V2.ink} />
              <div>
                <div
                  style={{
                    fontFamily: V2_FONT.mono,
                    fontSize: 10,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: V2.muted,
                    marginBottom: 8,
                  }}
                >
                  Fleet &amp; Volume
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 22,
                    letterSpacing: "-0.014em",
                    lineHeight: 1.2,
                    color: V2.ink,
                    marginBottom: 8,
                  }}
                >
                  Business &amp; Bulk Orders
                </div>
                <P size={18} style={{ lineHeight: 1.55, maxWidth: 660 }}>
                  Kitting out a team or reselling at scale? Volume pricing,
                  consolidated invoicing and a dedicated account manager on every
                  fleet order.
                </P>
              </div>
            </div>
            <ButtonV2 label="Talk to our team" variant="outline" href="/contact" />
          </div>
        </div>
      </section>

      <section
        id="sec-smarthome"
        style={{
          width: "100%",
          background: V2.wash,
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
              className="svc-lift svc-tilestripe relative overflow-hidden"
              style={{
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
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 26,
                    letterSpacing: "-0.014em",
                    lineHeight: 1.2,
                    color: V2.ink,
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
                        background: V2.white,
                        border: V2_HAIR,
                        borderRadius: 99,
                        padding: "7px 14px",
                        fontFamily: V2_FONT.mono,
                        fontSize: 11,
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        color: V2.ink,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <ButtonV2
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

      <section
        id="sec-solar"
        style={{
          width: "100%",
          background: V2.white,
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
              className="svc-lift svc-tilestripe relative overflow-hidden"
              style={{
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2",
              }}
            >
              <StripeLabel>SOLAR ARRAY</StripeLabel>
              <div style={{ position: "absolute", left: 24, bottom: 22, right: 24 }}>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 22,
                    letterSpacing: "-0.014em",
                    lineHeight: 1.2,
                    color: V2.ink,
                  }}
                >
                  Solar Panels &amp; Roof Systems
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 14,
                    color: V2.muted,
                    margin: "4px 0 16px",
                  }}
                >
                  Tier-1 panels, engineered for your roof
                </div>
                <ButtonV2
                  label="Explore Green Energy"
                  variant="fill"
                  href="/green-energy"
                />
              </div>
            </div>
            <div
              className="svc-lift svc-tilestripe relative overflow-hidden"
              style={{ gridColumn: 3, gridRow: "1 / span 2" }}
            >
              <StripeLabel>BATTERY STACK</StripeLabel>
              <div style={{ position: "absolute", left: 20, bottom: 18, right: 20 }}>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 20,
                    letterSpacing: "-0.012em",
                    lineHeight: 1.2,
                    color: V2.ink,
                  }}
                >
                  Home Batteries &amp; Storage
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 14,
                    color: V2.muted,
                    marginTop: 4,
                  }}
                >
                  Power through night &amp; outages
                </div>
              </div>
              <span style={{ position: "absolute", right: 16, top: 16 }}>
                <ArrowRightIcon size={20} strokeWidth={1.8} stroke={V2.ink} />
              </span>
            </div>
            <div
              className="svc-lift svc-tilestripe relative overflow-hidden"
              style={{ gridColumn: 4, gridRow: 1 }}
            >
              <StripeLabel>POWER STATION</StripeLabel>
              <div style={{ position: "absolute", left: 20, bottom: 18, right: 20 }}>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 20,
                    letterSpacing: "-0.012em",
                    lineHeight: 1.2,
                    color: V2.ink,
                  }}
                >
                  Portable Power Stations
                </div>
              </div>
              <span style={{ position: "absolute", right: 16, top: 16 }}>
                <ArrowRightIcon size={20} strokeWidth={1.8} stroke={V2.ink} />
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

      <section
        id="sec-tradein"
        style={{
          width: "100%",
          background: V2.wash,
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
              className="svc-lift-dark"
              style={{
                gridColumn: 1,
                gridRow: "1 / span 2",
                background: V2.ink,
                color: V2.white,
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
                <Glyph name="refresh" size={32} stroke={V2.white} />
                <span
                  style={{
                    fontFamily: V2_FONT.mono,
                    fontSize: 10,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: V2.faint,
                    textAlign: "right",
                  }}
                >
                  Renewed &amp; Sealed
                </span>
              </div>
              <div
                style={{
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 24,
                  letterSpacing: "-0.014em",
                  lineHeight: 1.2,
                  margin: "26px 0 12px",
                }}
              >
                Certified Refurbished
              </div>
              <P color={V2.faint} size={18} style={{ lineHeight: 1.55 }}>
                Premium hardware, professionally renewed and graded to like-new —
                then factory-sealed again. Independently warrantied and priced well
                below new.
              </P>
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
                        fontFamily: V2_FONT.body,
                        fontSize: 15,
                        color: V2.faint,
                      }}
                    >
                      <ShieldCheck stroke={V2.faint} />
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
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: "clamp(24px, 3.3vw, 38px)",
                    lineHeight: 1,
                    letterSpacing: "-0.018em",
                    color: V2.white,
                  }}
                >
                  Up to 40% off
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.body,
                    fontSize: 13,
                    color: V2.faint,
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
                className="svc-lift svc-card"
                style={{
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
                  <Glyph name={c.icon} size={30} stroke={V2.ink} />
                  <span
                    style={{
                      fontFamily: V2_FONT.mono,
                      fontSize: 10,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: V2.muted,
                      textAlign: "right",
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: 21,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    color: V2.ink,
                    margin: "24px 0 10px",
                  }}
                >
                  {c.title}
                </div>
                <P size={18} style={{ lineHeight: 1.55 }}>
                  {c.body}
                </P>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 20,
                    fontFamily: V2_FONT.mono,
                    fontSize: 10,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: V2.ink,
                    fontWeight: 400,
                  }}
                >
                  {c.foot}
                </div>
              </div>
            ))}

            <div
              className="svc-lift svc-card"
              style={{
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
                  fontFamily: V2_FONT.mono,
                  fontSize: 10,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: V2.muted,
                  marginBottom: 12,
                }}
              >
                Instant valuation → same-day upgrade
              </div>
              <div
                style={{
                  fontFamily: V2_FONT.display,
                  fontWeight: 400,
                  fontSize: 25,
                  letterSpacing: "-0.014em",
                  lineHeight: 1.2,
                  color: V2.ink,
                  marginBottom: 10,
                }}
              >
                Turn your old devices into your next upgrade.
              </div>
              <P size={18} style={{ lineHeight: 1.55, margin: "0 0 22px", maxWidth: 560 }}>
                Seven values your device in about a minute — apply it instantly toward
                anything in store, sealed and guaranteed.
              </P>
              <ButtonV2
                label="Start your trade-in"
                variant="fill"
                href="/trade-in"
              />
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
}
