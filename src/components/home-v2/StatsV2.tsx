import { logos, pillars } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { Band, H2, P } from "./Ui";

/**
 * Section 2 — the reference's dark positioning band: a three-line display
 * statement on the left, and on the right a paragraph, a full-width hairline,
 * then three figures with labels beneath them.
 *
 * Measured against `02-stats.png` at 1440: two equal 560px columns with a
 * 160px gutter, 100px of band padding above, the rule 116px under the top of
 * the paragraph, figures at 40px and their labels at 16px.
 *
 * Mode 7 content: the Mission paragraph from v1 `Mission.tsx`, split at its
 * own sentence boundary — the first sentence becomes the display statement,
 * the remainder the supporting paragraph. Nothing is rewritten. Every figure
 * is derived from something that already exists: the 50K+ counter in
 * `Mission.tsx`, `logos.length` and `pillars.length`. The two counts are
 * computed from the arrays so they cannot drift from the data.
 *
 * Colour: the reference sets these numerals in white. Here they are `V2.accent`
 * gold — the ink band is the ONE ground where the accent rule permits gold as
 * type (10.02:1), and it gives the accent a place to appear at scale that the
 * light bands cannot offer. Labels are `V2.faint` (7.75:1).
 */
export function StatsV2() {
  const stats = [
    { figure: "50K+", label: "devices vetted & sealed" },
    { figure: String(logos.length), label: "premium brand partners" },
    { figure: String(pillars.length), label: "ecosystem pillars" },
  ];

  return (
    <Band ground={V2.ink} pad="clamp(64px,7vw,100px)" padBottom="clamp(56px,6vw,88px)">
      <div className="v2-stats-cols">
        <H2 color={V2.white} style={{ maxWidth: 460 }}>
          Mode Seven is a comprehensive technology hub designed to power your home
          and your everyday life.
        </H2>

        <div>
          <P color={V2.white} style={{ lineHeight: "26px" }}>
            Our offerings span premium smart-home automation, solar energy
            solutions, elite gadgets, and certified refurbished devices. We pair
            this with a premium repair division, where our expert engineers
            provide precision diagnostics and restoration. From purchase to
            repair, every unit is rigorously vetted, sealed, and guaranteed.
          </P>

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.22)",
              margin: "clamp(26px,2.6vw,38px) 0 clamp(18px,2vw,28px)",
            }}
          />

          <div className="v2-figures">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: V2_FONT.display,
                    fontWeight: 400,
                    fontSize: "clamp(34px,3.1vw,40px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.4px",
                    /* gold on ink, 10.02:1 — the one legal gold-as-text case */
                    color: V2.accent,
                    marginBottom: 8,
                  }}
                >
                  {s.figure}
                </div>
                <div
                  style={{
                    fontFamily: V2_FONT.body,
                    fontWeight: 300,
                    /* 15px, not 16: at 16 these labels wrap inside a
                       ~180px column and break the reference's single-line row */
                    fontSize: 15,
                    lineHeight: "22px",
                    color: V2.faint,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
