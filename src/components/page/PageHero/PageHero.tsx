import type { CSSProperties, ReactNode } from "react";

export function PageHero({
  overline,
  title,
  intro,
  actions,
  centered = false,
  titleFontSize = "clamp(41px, 5.7vw, 66px)",
  titleLineHeight = "1",
  titleFontWeight = "600",
}: {
  overline: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
}) {
  const titleVars = {
    "--pg-hero-title-size": titleFontSize,
    "--pg-hero-title-lh": titleLineHeight,
    "--pg-hero-title-weight": titleFontWeight,
  } as CSSProperties;

  return (
    <section className="pg-hero">
      {centered ? (
        <div className="text-center">
          <div className="pg-hero__overline">{`// ${overline}`}</div>
          <h1 className="pg-hero-h1 text-center" style={titleVars}>
            {title}
          </h1>
          <p className="pg-hero__intro pg-hero__intro--centered">{intro}</p>
          {actions && (
            <div className="flex flex-wrap justify-center gap-3">{actions}</div>
          )}
        </div>
      ) : (
        <div className="pg-hero__grid">
          <div>
            <div className="pg-hero__overline">{`// ${overline}`}</div>
            <h1 className="pg-hero-h1" style={titleVars}>
              {title}
            </h1>
          </div>
          <div>
            <p className="pg-hero__intro">{intro}</p>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      )}
    </section>
  );
}
