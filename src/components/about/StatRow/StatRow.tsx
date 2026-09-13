import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function StatRow() {
  const { stats } = content;
  return (
    <section className="a-band a-band--ink">
      <div className="a-wrap">
        <div data-rv>
          <Mono dot tone="faint">{stats.eyebrow}</Mono>
        </div>
        <div className="a-mv">
          <div className="a-mv__cell" data-rv>
            <span className="a-label">{stats.mission.label}</span>
            <p className="a-dm">{stats.mission.statement}</p>
            <P color="var(--color-v2-faint)" className="max-w-[66ch]">
              {stats.mission.body}
            </P>
          </div>
          <div className="a-mv__cell" data-rv>
            <span className="a-label">{stats.vision.label}</span>
            <p className="a-dm">{stats.vision.statement}</p>
            <P color="var(--color-v2-faint)" className="max-w-[66ch]">
              {stats.vision.body}
            </P>
          </div>
        </div>

        <div className="a-stats">
          {stats.stats.map(([n, l]) => (
            <div className="a-stat" data-rv key={l}>
              <div className="a-stat__n a-num">{n}</div>
              <div className="a-stat__l">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
