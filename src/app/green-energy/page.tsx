import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { ChevronDownIcon } from "@/components/Icons";
import { EnergyFaq } from "@/components/green-energy/EnergyFaq";
import { IconCard, MediaPanel, PageHero, StatBar } from "@/components/page/Blocks";
import { ProductCard } from "@/components/page/Cards";
import { Annotation } from "@/components/wireframe/Primitives";
import { FONT, stripe, stripeDark } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Green Energy — Mode 7",
  description:
    "Premium solar panels, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers.",
};

const products = [
  { name: "Solar Panel 440W", meta: "High-efficiency mono", price: "£249" },
  { name: "Home Battery 10kWh", meta: "Store & backup", price: "£3,900" },
  { name: "Hybrid Inverter", meta: "Smart conversion", price: "£1,150" },
  { name: "EV Charger 7kW", meta: "Home charging", price: "£699" },
  { name: "Energy Monitor", meta: "Live consumption", price: "£129" },
  { name: "Backup Gateway", meta: "Whole-home backup", price: "£1,490" },
];

const steps = [
  {
    n: "01",
    title: "Free home survey",
    body: "We assess your roof, shading, usage patterns and goals — remotely or on-site.",
  },
  {
    n: "02",
    title: "Custom system design",
    body: "A tailored panel, battery and inverter layout with clear, honest savings projections.",
  },
  {
    n: "03",
    title: "Certified install",
    body: "Accredited engineers install and commission everything to code, usually in a day.",
  },
  {
    n: "04",
    title: "Monitor & save",
    body: "Track generation, storage and savings live — and let the system optimise itself.",
  },
];

const quality = [
  {
    title: "Tier-1 Panels",
    accent: "Top-bin cells only",
    body: "We fit only tier-1, high-efficiency modules — the same panels rated for decades of output.",
  },
  {
    title: "Accredited Engineers",
    accent: "Certified installs",
    body: "Every install is done by in-house, fully accredited engineers — never sub-contracted.",
  },
  {
    title: "Performance Guarantee",
    accent: "Output, in writing",
    body: "We guarantee generation levels, not just hardware — backed by 25-year warranties.",
  },
  {
    title: "Vetted & Sealed",
    accent: "The Mode 7 promise",
    body: "Batteries and inverters are bench-tested and sealed before they ever reach your home.",
  },
];

const finance = [
  {
    tag: "Best long-term value",
    title: "Buy Outright",
    body: "Own it from day one and maximise lifetime savings.",
    variant: "fill" as const,
  },
  {
    tag: "0% options available",
    title: "Monthly Finance",
    body: "Spread the cost over 2–10 years — often less than your old bill.",
    variant: "outline" as const,
  },
  {
    tag: "No deposit needed",
    title: "Rent-to-Own",
    body: "Start with no upfront cost and own the system over time.",
    variant: "fill" as const,
  },
];

const overline = {
  fontFamily: FONT.head,
  fontSize: 12,
  letterSpacing: 2,
  color: "#9a9a9a",
  textTransform: "uppercase" as const,
  marginBottom: 16,
};

const h2 = {
  fontFamily: FONT.head,
  fontWeight: 600,
  fontSize: "clamp(24px, 3.3vw, 38px)",
  lineHeight: 1.02,
  letterSpacing: "-3px",
  margin: "0 0 22px",
  textWrap: "balance" as const,
};

export default function GreenEnergyPage() {
  return (
    <>
      <PageHero
        overline="Solar & Green Energy"
        title={<>Own your power. Cut your bills. Clean the&nbsp;grid.</>}
        intro="Premium solar panels, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers. Energy that pays you back."
        actions={
          <>
            <ArrowButton label="Get a Free Quote" variant="fill" href="/contact" />
            <ArrowButton label="Estimate My Savings" variant="outline" />
          </>
        }
      />

      {/* full-bleed rooftop image with the saving card */}
      <div style={{ padding: "44px 26px 0" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            background: stripe(),
            border: "1px solid #e2e2e2",
            height: "min(70vh,700px)",
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
            ▣ ROOFTOP SOLAR — HOME INSTALLATION
          </div>
          {WIREFRAME.showAnnotations && (
            <Annotation style={{ position: "absolute", top: 22, right: 24 }}>
              WEBGL PARALLAX BACKGROUND
            </Annotation>
          )}
          <div
            style={{
              position: "absolute",
              left: "max(38px,calc((100vw - 1320px)/2 + 38px))",
              bottom: 28,
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
              £1,140/yr
            </div>
            <div style={{ fontSize: 13, color: "#5a5a5a", marginTop: 2 }}>
              average household saving
            </div>
          </div>
        </div>
      </div>

      {/* why it matters */}
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
            <div style={overline}>{"// Why It Matters"}</div>
            <h2 style={h2}>
              Energy prices only go one way. Your bills don’t have to.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
              Grid electricity keeps climbing and supply keeps wobbling. Generating
              your own clean power is no longer a luxury — it’s the smartest hedge a
              household can make, for your wallet and the planet.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { n: "3×", label: "grid prices have risen over the last decade" },
              {
                n: "70%+",
                label: "of daytime energy a typical home can self-supply",
              },
              { n: "0", label: "emissions from the power you generate on your roof" },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  border: "1px solid #ececec",
                  borderRadius: 4,
                  background: "#fcfcfc",
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: "clamp(24px, 3.3vw, 38px)",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                    minWidth: 110,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 16, color: "#6a6a6a", lineHeight: 1.5 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: 56 }}>
        <StatBar
          stats={[
            { n: "50%", label: "Average bill reduction" },
            { n: "6–8 yrs", label: "Typical payback period" },
            { n: "25 yr", label: "Panel performance warranty" },
            { n: "1.2M kg", label: "CO₂ offset by Mode 7 homes" },
          ]}
        />
      </div>

      {/* the hardware */}
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
            <div style={overline}>{"// The Hardware"}</div>
            <h2 style={{ ...h2, margin: 0 }}>Premium clean-energy kit.</h2>
          </div>
          <ArrowButton label="Shop energy range" variant="outline" href="/shop" />
        </div>
        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "14px 18px",
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} {...p} height={240} />
          ))}
        </div>
      </section>

      {/* how solar works */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 110 }}>
            <div style={overline}>{"// How Solar Works"}</div>
            <h2 style={{ ...h2, fontSize: "clamp(22px, 3.0vw, 34px)" }}>
              From survey to switched on — in four steps.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
              One accountable team from first call to first kilowatt. No
              sub-contractor roulette.
            </p>
          </div>
          <div>
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="m7-steprow"
                style={{
                  display: "grid",
                  gap: "clamp(10px, 2vw, 26px)",
                  padding: "clamp(22px, 3vw, 30px) 0",
                  borderBottom:
                    i === steps.length - 1 ? undefined : "1px solid #ececec",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 15,
                    color: "#b4b4b4",
                    paddingTop: 4,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONT.head,
                      fontWeight: 600,
                      fontSize: 24,
                      letterSpacing: "-0.5px",
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      lineHeight: 1.65,
                      color: "#5a5a5a",
                      margin: 0,
                      maxWidth: 640,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* built to last */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div style={overline}>{"// Built to Last"}</div>
        <h2 style={h2}>Quality you can put on the roof for 25 years.</h2>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginTop: 34,
          }}
        >
          {quality.map((q) => (
            <IconCard key={q.title} {...q} />
          ))}
        </div>
      </section>

      {/* savings calculator */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 0,
            border: "1px solid #2a2a2a",
            borderRadius: 4,
            overflow: "hidden",
            background: stripeDark(),
          }}
        >
          <div style={{ padding: 56 }}>
            <div style={{ ...overline, color: "#7f7f7f" }}>{"// See Your Numbers"}</div>
            <h2 style={{ ...h2, color: "#fff" }}>
              Your solar savings, in under a minute.
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.62)",
                margin: "0 0 28px",
                maxWidth: 520,
              }}
            >
              Tell us your home size, roof direction and rough monthly bill — we’ll
              model generation, storage and payback instantly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Home size", "Roof direction", "Monthly electricity bill"].map((f) => (
                <div
                  key={f}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 4,
                    padding: "13px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 16,
                  }}
                >
                  {f}
                  <span
                    style={{
                      display: "inline-flex",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <ChevronDownIcon size={18} />
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <ArrowButton label="Calculate savings" variant="outline" />
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              padding: 56,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 4,
                padding: "30px 32px",
                width: "100%",
                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
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
                25-year projection
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 700,
                  fontSize: "clamp(30px, 4.2vw, 48px)",
                  lineHeight: 1,
                  letterSpacing: "-2px",
                }}
              >
                £28,500
              </div>
              <div style={{ fontSize: 13, color: "#8a8a8a", margin: "6px 0 22px" }}>
                estimated lifetime savings
              </div>
              {[
                ["Annual saving", "£1,140"],
                ["Payback", "7.2 years"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f2f2f2",
                    padding: "12px 0 0",
                    marginTop: 8,
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: "#7a7a7a" }}>{k}</span>
                  <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            {WIREFRAME.showAnnotations && (
              <Annotation
                dark
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 56,
                  fontSize: 10,
                  padding: "6px 13px",
                  background: "rgba(18,18,18,0.6)",
                }}
              >
                LIVE CALCULATOR — UPDATES AS YOU TYPE
              </Annotation>
            )}
          </div>
        </div>
      </section>

      {/* energy independence */}
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
          <MediaPanel
            label="APP — LIVE ENERGY DASHBOARD"
            height={460}
            annotation="LIVE GENERATION + STORAGE DATA"
          />
          <div>
            <div style={overline}>{"// Energy Independence"}</div>
            <h2 style={h2}>
              Make it by day. Use it by night. Ride out the outages.
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "#5a5a5a",
                margin: "0 0 26px",
              }}
            >
              Pair panels with a home battery and you store your own cheap daytime
              energy for the evening peak — and keep the lights on when the grid goes
              down. Watch it all live, or let the system optimise itself
              automatically.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Self-power through the evening peak",
                "Automatic backup during grid outages",
                "Sell surplus back to the grid",
              ].map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 17,
                    color: "#2a2a2a",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#121212"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flex: "0 0 auto" }}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ways to pay */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div style={overline}>{"// Ways to Pay"}</div>
        <h2 style={h2}>Flexible finance for every home.</h2>
        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginTop: 34,
          }}
        >
          {finance.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fcfcfc",
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "32px 30px 34px",
                display: "flex",
                flexDirection: "column",
                minHeight: 280,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#9a9a9a",
                  marginBottom: 14,
                }}
              >
                {f.tag}
              </div>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: "-0.5px",
                  marginBottom: 10,
                }}
              >
                {f.title}
              </div>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#5a5a5a",
                  margin: "0 0 24px",
                }}
              >
                {f.body}
              </p>
              <div style={{ marginTop: "auto" }}>
                <ArrowButton label="Learn more" variant={f.variant} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* testimonial */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #ececec",
              borderRadius: 4,
              padding: "40px 44px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 16, letterSpacing: 3, marginBottom: 20 }}>
              ★★★★★
            </div>
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 500,
                fontSize: 26,
                lineHeight: 1.35,
                letterSpacing: "-0.8px",
                color: "#1a1a1a",
                margin: "0 0 28px",
              }}
            >
              “I cut my energy bill in half after Mode 7’s solar install. The team was
              certified, fast, and the whole system runs from one app.”
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: "auto",
                borderTop: "1px solid #ececec",
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 99,
                  background: stripe("#e0e0e0", "#efefef", 6),
                  border: "1px solid #e2e2e2",
                }}
              />
              <div>
                <div
                  style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 15 }}
                >
                  Tunde Bello
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "#9a9a9a",
                    marginTop: 3,
                  }}
                >
                  HOMEOWNER · LAGOS
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 14 }}>
            {[
              { n: "−50%", label: "monthly bill after install" },
              { n: "1 day", label: "from install to switched on" },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  background: "#121212",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "32px 34px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 700,
                    fontSize: "clamp(27px, 3.8vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    marginTop: 8,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div style={{ position: "relative" }}>
          <div style={overline}>{"// Questions"}</div>
          <h2 style={h2}>Everything you’re wondering.</h2>
          <div style={{ marginTop: 34 }}>
            <EnergyFaq />
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
              ACCORDION — EXPAND / COLLAPSE
            </Annotation>
          )}
        </div>
      </section>
    </>
  );
}
