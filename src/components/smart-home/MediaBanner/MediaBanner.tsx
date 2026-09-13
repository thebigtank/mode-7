import { Annotation } from "@/components/wireframe/Primitives";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export function MediaBanner({ label }: { label: string }) {
  return (
    <div className="pt-[44px] px-[26px] pb-0">
      <div className="sh-banner__media" style={{ background: stripe() }}>
        <div className="sh-banner__label">{`▣ ${label}`}</div>
        {WIREFRAME.showAnnotations && (
          <Annotation style={{ position: "absolute", top: 22, right: 24 }}>
            WEBGL PARALLAX BACKGROUND
          </Annotation>
        )}
      </div>
    </div>
  );
}
