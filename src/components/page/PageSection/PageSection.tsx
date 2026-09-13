import type { ReactNode } from "react";

export function PageSection({
  overline,
  title,
  children,
}: {
  overline?: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="pg-section">
      {overline && <div className="pg-section__overline">{`// ${overline}`}</div>}
      {title && <h2 className="pg-section__title">{title}</h2>}
      {children}
    </section>
  );
}
