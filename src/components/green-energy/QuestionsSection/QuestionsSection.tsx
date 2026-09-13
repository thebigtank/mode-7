import { EnergyFaq } from "@/components/green-energy/EnergyFaq";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/green-energy.json";
import { WIREFRAME } from "@/lib/wireframe-config";

export function QuestionsSection() {
  const { faq } = content;
  return (
    <section className="ge-section">
      <div className="ge-questions">
        <div className="ge-eyebrow uppercase">{`// ${faq.eyebrow}`}</div>
        <h2 className="ge-h2">{faq.title}</h2>
        <div className="ge-questions__faq">
          <EnergyFaq />
        </div>
        {WIREFRAME.showAnnotations && (
          <Annotation
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              fontSize: 10,
              padding: "6px 13px",
            }}
          >
            {faq.annotation}
          </Annotation>
        )}
      </div>
    </section>
  );
}
