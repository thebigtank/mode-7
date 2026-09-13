import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { EnergyFaq } from "@/components/green-energy/EnergyFaq";
import { EnergyScrolly } from "@/components/green-energy/EnergyScrolly";
import { PageHero } from "@/components/page/Blocks";
import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { Annotation, Placeholder } from "@/components/wireframe/Primitives";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Green Energy — Mode 7",
  description:
    "Premium solar panels, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers.",
};

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

const heroCards: { icon: GlyphName; title: string; sub: string }[] = [
  {
    icon: "sun",
    title: "Solar Power",
    sub: "High-efficiency panels, installed to code",
  },
  {
    icon: "battery",
    title: "Home Battery",
    sub: "Store cheap daytime energy for the peak",
  },
  {
    icon: "home",
    title: "Home Backup",
    sub: "Keep the whole home running through outages",
  },
];

const solarPoints: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "sun",
    title: "Effortless",
    text: "No moving parts, nothing to maintain — panels just quietly do their job.",
  },
  {
    icon: "bolt",
    title: "Always working",
    text: "From dawn to dusk, your roof keeps turning light into power.",
  },
  {
    icon: "refresh",
    title: "Kind to the planet",
    text: "No smoke, no emissions — just clean electricity from sunlight.",
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
        centered
        overline="Own your power. Cut your bills. Clean the grid."
        titleFontSize="clamp(64px, 8vw, 120px)"
        titleLineHeight="0.8"
        titleFontWeight="500"
        title={<>The Future Runs<br/>on Green Power</>}
        intro="Premium green energy solutions, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers. Energy that pays you back."
        actions={
          <>
            <ArrowButton label="Book a Call" variant="fill" href="/contact" />
            <ArrowButton label="Explore Solutions" variant="outline" />
          </>
        }
      />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "44px var(--m7-pad) 0" }}>
        <div
          className="m7-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {heroCards.map((c) => (
            <div
              key={c.title}
              style={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                background: stripe(),
                border: "1px solid #e2e2e2",
                height: "min(64vh, 620px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(10,22,14,0.85) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  width: 46,
                  height: 46,
                  borderRadius: 99,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name={c.icon} size={24} stroke="#121212" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.head,
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    color: "#fff",
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    marginTop: 6,
                  }}
                >
                  {c.sub}
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.9)",
                    marginTop: 14,
                  }}
                >
                  Explore More <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            <p style={{ fontSize: "var(--m7-lede-size)", lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
              Grid electricity keeps climbing and supply keeps wobbling. Generating
              your own clean power is no longer a luxury — it’s the smartest hedge a
              household can make.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { n: "3×", label: "grid prices have risen over the last decade" },
              {
                n: "70%+",
                label: "of daytime energy a typical home can self-supply",
              },
              { n: "50%", label: "Average bill reduction" },
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

      <EnergyScrolly />

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
              The Power of Energy Independence
            </h2>
            <p style={{ fontSize: "var(--m7-lede-size)", lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
              Switching to solar isn&rsquo;t just about placing panels on a roof; it is about taking complete control of your energy consumption. By harnessing clean, renewable power directly from the sun, you drastically reduce your reliance on unpredictable utility companies, shield yourself from rising electricity rates, and significantly lower your carbon footprint.
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
                      fontSize: "var(--m7-lede-size)",
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

      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(55px, 7.1vw, 100px) var(--m7-pad) 0" }}>
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <Placeholder label="SOLAR PANEL" height="clamp(380px, 46vw, 600px)">
            {WIREFRAME.showAnnotations && (
              <Annotation
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontSize: 10,
                  padding: "6px 13px",
                }}
              >
                IMAGE — SOLAR PANEL
              </Annotation>
            )}
            <div
              style={{
                position: "absolute",
                left: 22,
                bottom: 22,
                maxWidth: "calc(100% - 44px)",
                background: "rgba(255,255,255,0.94)",
                border: "1px solid rgba(255,255,255,0.9)",
                borderRadius: 4,
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.3px",
                  lineHeight: 1.1,
                }}
              >
                The sun doesn&rsquo;t send a bill.
              </div>
              <div style={{ fontSize: 13, color: "#6a6a6a", marginTop: 6 }}>
                No fuel to buy, nothing to burn — just free daylight.
              </div>
            </div>
          </Placeholder>

          <div>
            <div style={overline}>{"// Solar Power"}</div>
            <h2 style={h2}>The sun does the heavy lifting.</h2>
            <p style={{ fontSize: "var(--m7-lede-size)", lineHeight: 1.65, color: "#5a5a5a", margin: 0 }}>
              Solar power is beautifully simple. Your roof catches daylight and
              turns it into the electricity your home runs on — no fuel to buy,
              nothing to burn. Just clean, quiet energy, on tap every day.
            </p>

            <div style={{ marginTop: 30 }}>
              {solarPoints.map((p) => (
                <div
                  key={p.title}
                  style={{
                    display: "flex",
                    gap: 16,
                    borderTop: "1px solid #ececec",
                    padding: "18px 0",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 99,
                      background: "#f2f2f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                    }}
                  >
                    <Glyph name={p.icon} size={20} stroke="#121212" />
                  </div>
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
                      {p.title}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: "#5a5a5a" }}>
                      {p.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
