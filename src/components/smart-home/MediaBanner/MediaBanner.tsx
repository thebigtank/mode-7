import type { CSSProperties } from "react";
import { Annotation } from "@/components/wireframe/Primitives";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export function MediaBanner({ label }: { label: string }) {
  return (
    <div className="sh-banner">
      <div
        className="sh-banner__media"
        style={{ "--stripe-bg": stripe() } as CSSProperties}
      >
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
