import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { V2 } from "@/lib/theme-v2";

const stats: [string, string][] = [
  ["50K+", "Devices vetted & sealed"],
  ["12", "Cities served"],
  ["100%", "Sealed and warrantied — new or renewed"],
  ["13", "Premium brands under one roof"],
];

export function StatRow() {
  return (
    <section className="a-band a-band--ink">
      <div className="a-wrap">
        <div data-rv>
          <Mono dot tone="faint">Mission &amp; Vision</Mono>
        </div>
        <div className="a-mv">
          <div className="a-mv__cell" data-rv>
            <span className="a-label">Mission</span>
            <p className="a-dm" style={{ color: V2.white }}>
              To make premium technology dependable.
            </p>
            <P color={V2.faint} style={{ maxWidth: "66ch" }}>
              Sourced, verified, powered and renewed against a single standard — so
              that owning it is never a risk the buyer carries alone.
            </P>
          </div>
          <div className="a-mv__cell" data-rv>
            <span className="a-label">Vision</span>
            <p className="a-dm" style={{ color: V2.white }}>
              A market where trust is the default, not the exception.
            </p>
            <P color={V2.faint} style={{ maxWidth: "66ch" }}>
              Every device with a verifiable history. Every home in control of its
              own power. Upgrading decided by what you need — never by whether the
              seller can be believed.
            </P>
          </div>
        </div>

        <div className="a-stats">
          {stats.map(([n, l]) => (
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
