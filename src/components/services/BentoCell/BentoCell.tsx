import type { CSSProperties } from "react";
import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import { V2 } from "@/lib/theme-v2";

export function BentoCell({
  icon,
  title,
  sub,
  style,
}: {
  icon: GlyphName;
  title: string;
  sub: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="svc-lift svc-card svc-bento flex flex-col justify-between"
      style={style}
    >
      <Glyph name={icon} size={28} stroke={V2.ink} />
      <div>
        <div className="svc-bento__title">{title}</div>
        <div className="svc-bento__sub">{sub}</div>
      </div>
    </div>
  );
}
