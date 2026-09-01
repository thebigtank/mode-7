import { V2, V2_FONT, V2_HAIR } from "@/lib/theme-v2";
import { Band, BtnFill, H2, Mono, P } from "./Ui";

/**
 * Section 5 — the reference's "why us" split: a tall square-ish image on the
 * left; on the right a dotted mono eyebrow, a two-line display heading, a dark
 * action block, then a ruled list of numbered reasons.
 *
 * Measured against `05-why.png` at 1440: image 544 wide by 678 tall in the
 * left column, right column 678 wide with a 58px gutter, eyebrow at the image's
 * top edge, heading 36px below it, the button 41px below that, the first
 * hairline 37px below the button, and rows on a ~129px rhythm with the numeral
 * in a 56px column set in mono.
 *
 * Mode 7 content: `/hero/workshop.webp`, the statement "We do far more than
 * supply the latest devices." (from `revealStatement` / v1 `WhyModeSeven.tsx`),
 * the existing /about route, and the four reasons below, copied verbatim from
 * v1 rather than lifted out of it — v1 must not be edited by this exploration.
 * The reference shows three rows; Mode 7 has four, so the column runs longer
 * and the image stretches to match rather than four being cut to three.
 *
 * Colour: the eyebrow dot is a gold FILL (a graphic, not type). The 01–04
 * numerals are `V2.accentText` (5.59:1) where the reference sets them in
 * orange — gold on this ground is 1.70:1 and fails even the 3:1 large-text
 * floor, and these numerals are small anyway.
 */

/** Copied VERBATIM from the `reasons` array in v1 `WhyModeSeven.tsx`. */
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
            <BtnFill
              label="About us"
              href="/about"
              ground={V2.ink}
              color={V2.white}
            />
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
                    letterSpacing: "0.04em",
                    lineHeight: "30px",
                    /* accentText — gold on wash is 1.40:1, below even 3:1 */
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
