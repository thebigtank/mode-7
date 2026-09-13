import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { Annotation, Placeholder } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

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

export function SolarLifting() {
  return (
    <section className="ge-section">
      <div className="ge-solarlift__grid">
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
          <div className="ge-solarlift__caption">
            <div className="ge-solarlift__caption-title">
              The sun doesn&rsquo;t send a bill.
            </div>
            <div className="ge-solarlift__caption-sub">
              No fuel to buy, nothing to burn — just free daylight.
            </div>
          </div>
        </Placeholder>

        <div>
          <div className="ge-eyebrow">{"// Solar Power"}</div>
          <h2 className="ge-h2">The sun does the heavy lifting.</h2>
          <p className="ge-lede">
            Solar power is beautifully simple. Your roof catches daylight and
            turns it into the electricity your home runs on — no fuel to buy,
            nothing to burn. Just clean, quiet energy, on tap every day.
          </p>

          <div className="ge-solarlift__points">
            {solarPoints.map((p) => (
              <div key={p.title} className="ge-solarlift__point">
                <div className="ge-solarlift__point-icon">
                  <Glyph name={p.icon} size={20} stroke="var(--color-m7-neutral-ink)" />
                </div>
                <div>
                  <div className="ge-solarlift__point-title">{p.title}</div>
                  <div className="ge-solarlift__point-text">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
