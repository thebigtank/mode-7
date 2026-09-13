import { EnergyFaq } from "@/components/green-energy/EnergyFaq";
import { PageSection } from "@/components/page/PageSection";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

export function QuestionsSection() {
  return (
    <PageSection
      overline="Questions"
      title={<>Everything you’re wondering.</>}
      style={{ position: "relative" }}
    >
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
    </PageSection>
  );
}
