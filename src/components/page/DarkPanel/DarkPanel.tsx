import type { ReactNode } from "react";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

export function DarkPanel({
  overline,
  title,
  body,
  action,
  aside,
  annotation,
}: {
  overline: string;
  title: ReactNode;
  body: ReactNode;
  action?: ReactNode;
  aside: ReactNode;
  annotation?: string;
}) {
  return (
    <div
      className="pg-dark-panel grid items-center"
    >
      <div>
        <div className="pg-dark-panel__overline uppercase">{`// ${overline}`}</div>
        <h2 className="pg-dark-panel__title">{title}</h2>
        <p className="pg-dark-panel__body">{body}</p>
        {action}
      </div>
      <div className="pg-dark-panel__aside">
        {aside}
        {annotation && WIREFRAME.showAnnotations && (
          <Annotation
            dark
            style={{
              position: "absolute",
              bottom: -14,
              left: 0,
              fontSize: 10,
              padding: "6px 13px",
              background: "rgb(var(--color-m7-neutral-ink-rgb) / 0.6)",
            }}
          >
            {annotation}
          </Annotation>
        )}
      </div>
    </div>
  );
}
