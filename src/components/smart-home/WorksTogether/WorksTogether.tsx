import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import { Glyph, type GlyphName } from "@/components/page/ServiceIcons";
import content from "@/content/smart-home.json";

const ASSURANCE_ICONS: GlyphName[] = ["lock", "wifi", "chat"];

export function WorksTogether() {
  const { works } = content;
  return (
    <section className="sh-section" id="works">
      <div className="sh-works__grid grid items-center">
        <div>
          <Mono dot className="mb-4">
            {works.eyebrow}
          </Mono>
          <h2 className="sh-works__title text-balance">{works.title}</h2>
          <P size={18} className="sh-works__lede">
            {works.lede}
          </P>
          <ButtonV2 label={works.cta} variant="fill" href="/shop" />
        </div>

        <div className="sh-works__media relative overflow-hidden">
          <div className="sh-works__media-label absolute">▣ {works.mediaLabel}</div>
          <div className="sh-works__media-annotation absolute uppercase">
            {works.mediaAnnotation}
          </div>
        </div>
      </div>

      <div className="sh-works__assurances grid">
        {works.assurances.map((a, i) => (
          <div key={a.title} className="sh-assurance flex flex-col">
            <Glyph name={ASSURANCE_ICONS[i]} size={28} stroke="var(--color-v2-ink)" />
            <div className="sh-assurance__title">{a.title}</div>
            <P className="sh-assurance__body">{a.body}</P>
          </div>
        ))}
      </div>
    </section>
  );
}
