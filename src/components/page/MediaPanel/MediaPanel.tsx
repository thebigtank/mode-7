import type { CSSProperties } from "react";
import { Annotation } from "@/components/wireframe/Primitives";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export function MediaPanel({
  label,
  height = 440,
  annotation,
  style,
}: {
  label: string;
  height?: number | string;
  annotation?: string;
  style?: CSSProperties;
}) {
  const heightValue = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className="pg-media"
      style={
        {
          "--pg-media-h": heightValue,
          "--stripe-bg": stripe(),
          ...style,
        } as CSSProperties
      }
    >
      <div className="pg-media__label">▣ {label}</div>
      {annotation && WIREFRAME.showAnnotations && (
        <Annotation
          style={{
            position: "absolute",
            bottom: 18,
            left: 20,
            fontSize: 10,
            padding: "6px 13px",
          }}
        >
          {annotation}
        </Annotation>
      )}
    </div>
  );
}
