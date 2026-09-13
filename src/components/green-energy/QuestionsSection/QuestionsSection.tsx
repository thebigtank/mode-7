import { EnergyFaq } from "@/components/green-energy/EnergyFaq";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

export function QuestionsSection() {
  return (
    <section className="ge-section">
      <div className="ge-questions">
        <div className="ge-eyebrow">{"// Questions"}</div>
        <h2 className="ge-h2">Everything you’re wondering.</h2>
        <div className="mt-[34px]">
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
            ACCORDION — EXPAND / COLLAPSE
          </Annotation>
        )}
      </div>
    </section>
  );
}
