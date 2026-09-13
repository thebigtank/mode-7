import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/services.json";

export function ServicesLifestyle() {
  const { lifestyle } = content;

  return (
    <div className="svc-life mt-[84px]">
      <div className="svc-life__stage relative w-full overflow-hidden">
        <div className="svc-life__badge absolute z-[2]">{lifestyle.badge}</div>

        <div className="svc-life__copy absolute">
          <Mono dot className="mb-4">
            {lifestyle.eyebrow}
          </Mono>
          <h1 className="svc-life__title">{lifestyle.title}</h1>
          <P size={19} className="svc-life__intro">
            {lifestyle.intro}
          </P>
          <div className="svc-life__actions flex flex-wrap">
            {lifestyle.actions.map((a) => (
              <ButtonV2
                key={a.label}
                label={a.label}
                variant={a.variant as "fill" | "outline"}
                href={a.href}
              />
            ))}
          </div>
        </div>

        <div className="svc-life__stat absolute">
          <div className="svc-life__stat-value">{lifestyle.stat.value}</div>
          <div className="svc-life__stat-label">{lifestyle.stat.label}</div>
        </div>
      </div>
    </div>
  );
}
