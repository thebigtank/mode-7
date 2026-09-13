import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { V2 } from "@/lib/theme-v2";

export function MiniRow({
  icon,
  title,
  sub,
}: {
  icon: GlyphName;
  title: string;
  sub: string;
}) {
  return (
    <div className="svc-minirow flex items-center">
      <Glyph name={icon} size={20} strokeWidth={1.7} stroke={V2.ink} />
      <div>
        <div className="svc-minirow__title">{title}</div>
        <div className="svc-minirow__sub uppercase">{sub}</div>
      </div>
    </div>
  );
}
