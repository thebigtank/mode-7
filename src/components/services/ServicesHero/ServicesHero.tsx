import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/services.json";

export function ServicesHero() {
  const { hero } = content;

  return (
    <section className="svc-hero w-full">
      <div className="svc-hero__wrap mx-auto">
        <div className="svc-hero__cols grid items-end">
          <div>
            <Mono dot className="mb-4">
              {hero.eyebrow}
            </Mono>
            <h1 className="svc-hero__title">{hero.title}</h1>
          </div>
          <div>
            <P size={18} className="svc-hero__intro">
              {hero.intro}
            </P>
            <div className="svc-hero__actions flex flex-wrap">
              {hero.actions.map((a) => (
                <ButtonV2
                  key={a.label}
                  label={a.label}
                  variant={a.variant as "fill" | "outline"}
                  href={a.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
