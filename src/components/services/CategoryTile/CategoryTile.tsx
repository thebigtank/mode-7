import { ArrowRightIcon } from "@/components/Icons";
import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { StripeLabel } from "@/components/services/StripeLabel";
import { V2 } from "@/lib/theme-v2";

export function CategoryTile({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: GlyphName;
}) {
  return (
    <div className="svc-lift svc-card flex flex-col overflow-hidden">
      <div className="svc-tile__media relative">
        <StripeLabel>{label.toUpperCase()}</StripeLabel>
        <span className="svc-tile__icon absolute">
          <Glyph name={icon} size={26} stroke={V2.ink} />
        </span>
      </div>
      <div className="svc-tile__body flex items-center justify-between">
        <div>
          <div className="svc-tile__label">{label}</div>
          <div className="svc-tile__sub uppercase">{sub}</div>
        </div>
        <ArrowRightIcon size={20} strokeWidth={1.8} stroke={V2.ink} />
      </div>
    </div>
  );
}
