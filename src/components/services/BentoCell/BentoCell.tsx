import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";

export function BentoCell({
  icon,
  title,
  sub,
  slot,
}: {
  icon: GlyphName;
  title: string;
  sub: string;
  slot: string;
}) {
  return (
    <div
      className="svc-lift svc-card svc-bento flex flex-col justify-between"
      data-slot={slot}
    >
      <Glyph name={icon} size={28} stroke="var(--color-v2-ink)" />
      <div>
        <div className="svc-bento__title">{title}</div>
        <div className="svc-bento__sub">{sub}</div>
      </div>
    </div>
  );
}
