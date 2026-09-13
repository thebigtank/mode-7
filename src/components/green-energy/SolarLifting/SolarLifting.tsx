import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { Annotation, Placeholder } from "@/components/wireframe/Primitives";
import content from "@/content/green-energy.json";
import { WIREFRAME } from "@/lib/wireframe-config";

export function SolarLifting() {
  const { solarLifting } = content;
  const solarPoints = solarLifting.points as {
    icon: GlyphName;
    title: string;
    text: string;
  }[];
  return (
    <section className="ge-section">
      <div className="ge-solarlift__grid grid items-center">
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
              {solarLifting.captionTitle}
            </div>
            <div className="ge-solarlift__caption-sub">
              {solarLifting.captionSub}
            </div>
          </div>
        </Placeholder>

        <div>
          <div className="ge-eyebrow uppercase">{`// ${solarLifting.eyebrow}`}</div>
          <h2 className="ge-h2">{solarLifting.title}</h2>
          <p className="ge-lede">{solarLifting.lede}</p>

          <div className="ge-solarlift__points">
            {solarPoints.map((p) => (
              <div key={p.title} className="ge-solarlift__point flex">
                <div className="ge-solarlift__point-icon flex items-center justify-center">
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
