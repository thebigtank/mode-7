import { logos, pillars } from "@/lib/content";
import { V2, V2_FONT } from "@/lib/theme-v2";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { P } from "@/components/ui/P";

export function StatsV2() {
  const stats = [
    { figure: "50K+", label: "devices vetted & sealed" },
    { figure: String(logos.length), label: "premium brand partners" },
    { figure: String(pillars.length), label: "ecosystem pillars" },
  ];

  return (
    <Band ground="ink" className="v2-stats-band">
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
