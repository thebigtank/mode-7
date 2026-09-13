import { V2, V2_FONT, V2_HAIR } from "@/lib/theme-v2";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

const reasons = [
  {
    num: "01",
    title: "Vetted & Sealed",
    body: "Each device is rigorously tested, sealed and warrantied before it ships — whether brand new or certified refurbished.",
  },
  {
    num: "02",
    title: "Intelligent Trade-In",
    body: "AI-driven diagnostics calculate your device’s exact upgrade value in seconds, so trading up is effortless.",
  },
  {
    num: "03",
    title: "Powered by Seven",
    body: "Our assistant Seven helps you navigate, shop and evaluate devices anytime, anywhere across the ecosystem.",
  },
  {
    num: "04",
    title: "Home & Energy",
    body: "Smart-home automation and solar energy, designed and installed by certified engineers to power your whole home.",
  },
];

export function WhyV2() {
  return (
    <Band ground={V2.wash} pad="clamp(64px,6.7vw,96px)">
      <div className="v2-why-cols" style={{ alignItems: "stretch" }}>
        <div
          aria-hidden
          style={{
            minHeight: "clamp(320px,47vw,678px)",
            backgroundImage: "url(/hero/workshop.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div>
          <Mono dot color={V2.ink}>
            Why Mode 7
          </Mono>
          <H2 style={{ marginTop: 36, maxWidth: 620 }}>
            We do far more than supply the latest devices.
          </H2>
          <div style={{ margin: "clamp(28px,2.8vw,41px) 0 clamp(26px,2.6vw,37px)" }}>
            <ButtonV2 label="About us" href="/about" variant="ink" />
          </div>

          <div style={{ borderTop: V2_HAIR }}>
            {reasons.map((r) => (
              <div
                key={r.num}
                className="v2-reason"
                style={{ padding: "26px 0", borderBottom: V2_HAIR }}
              >
                <div
                  style={{
                    fontFamily: V2_FONT.mono,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    lineHeight: "30px",
                    color: V2.accentText,
                  }}
                >
                  {r.num}
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: V2_FONT.display,
                      fontWeight: 400,
                      fontSize: 24,
                      lineHeight: "30px",
                      letterSpacing: "-0.24px",
                      color: V2.ink,
                    }}
                  >
                    {r.title}
                  </h3>
                  <P style={{ marginTop: 12, lineHeight: "26px", maxWidth: 560 }}>
                    {r.body}
                  </P>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
