import type { ReactNode } from "react";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function SectionHead({
  overline,
  title,
  lede,
  maxWidth = 860,
}: {
  overline: string;
  title: string;
  lede?: ReactNode;
  maxWidth?: 860 | 720;
}) {
  return (
    <div className="svc-head" data-maxw={maxWidth}>
      <Mono dot className="mb-4">
        {overline}
      </Mono>
      <h2 className="svc-head__h2" data-lede={lede ? "true" : "false"}>
        {title}
      </h2>
      {lede && (
        <P size={18} className="svc-head__lede">
          {lede}
        </P>
      )}
    </div>
  );
}
