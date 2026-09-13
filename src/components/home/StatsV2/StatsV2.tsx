import content from "@/content/home.json";
import { Band } from "@/components/ui/Band";
import { H2 } from "@/components/ui/H2";
import { P } from "@/components/ui/P";

export function StatsV2() {
  const stats = [
    { figure: content.stats.highlight.figure, label: content.stats.highlight.label },
    { figure: String(content.logos.length), label: content.stats.partnersLabel },
    { figure: String(content.pillars.length), label: content.stats.pillarsLabel },
  ];

  return (
    <Band ground="ink" className="v2-stats-band">
      <div className="v2-stats-cols grid items-start">
        <H2 color="var(--color-v2-white)" className="v2-stats-heading">
          {content.stats.heading}
        </H2>

        <div>
          <P color="var(--color-v2-white)" className="v2-stats-body">
            {content.stats.body}
          </P>

          <div className="v2-stats-rule" />

          <div className="v2-figures grid">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="v2-figure-num">{s.figure}</div>
                <div className="v2-figure-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
