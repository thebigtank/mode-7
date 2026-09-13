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
        <div className="a-mv grid">
          <div className="a-mv__cell grid" data-rv>
            <span className="a-label uppercase">{stats.mission.label}</span>
            <p className="a-dm">{stats.mission.statement}</p>
            <P color="var(--color-v2-faint)" className="max-w-[66ch]">
              {stats.mission.body}
            </P>
          </div>
          <div className="a-mv__cell grid" data-rv>
            <span className="a-label uppercase">{stats.vision.label}</span>
            <p className="a-dm">{stats.vision.statement}</p>
            <P color="var(--color-v2-faint)" className="max-w-[66ch]">
              {stats.vision.body}
            </P>
          </div>
        </div>

        <div className="a-stats grid">
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
