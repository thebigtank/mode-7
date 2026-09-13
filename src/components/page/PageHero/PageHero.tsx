import type { ReactNode } from "react";

type TitleVariant = "default" | "wide";

export function PageHero({
  overline,
  title,
  intro,
  actions,
  centered = false,
  titleVariant = "default",
}: {
  overline: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  titleVariant?: TitleVariant;
}) {
  return (
    <section className="pg-hero">
      {centered ? (
        <div className="text-center">
          <div className="pg-hero__overline">{`// ${overline}`}</div>
          <h1
            className="pg-hero-h1 text-center"
            data-title-variant={titleVariant}
          >
            {title}
          </h1>
          <p className="pg-hero__intro pg-hero__intro--centered">{intro}</p>
          {actions && (
            <div className="flex flex-wrap justify-center gap-3">{actions}</div>
          )}
        </div>
      ) : (
        <div className="pg-hero__grid grid items-end">
          <div>
            <div className="pg-hero__overline">{`// ${overline}`}</div>
            <h1 className="pg-hero-h1" data-title-variant={titleVariant}>
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
