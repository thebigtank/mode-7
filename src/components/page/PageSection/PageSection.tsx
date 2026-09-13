import type { CSSProperties, ReactNode } from "react";

export function PageSection({
  overline,
  title,
  children,
  style,
}: {
  overline?: string;
  title?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section className="pg-section" style={style}>
      {overline && <div className="pg-section__overline">{`// ${overline}`}</div>}
      {title && <h2 className="pg-section__title">{title}</h2>}
      {children}
    </section>
  );
}
