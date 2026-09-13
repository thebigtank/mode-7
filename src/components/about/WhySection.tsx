import { WhyStatement } from "@/components/about/WhyStatement";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function WhySection() {
  const { why } = content;
  return (
    <section className="a-band">
      <div className="a-wrap a-split a-split--sticky grid">
        <div className="a-sticky a-stack grid" data-rv>
          <Mono dot>{why.eyebrow}</Mono>
          <h2 className="a-dl">{why.h2}</h2>
        </div>
        <div className="a-stack a-stack--lg grid">
          {why.paragraphs.map((p) => (
            <P data-rv className="max-w-[66ch]" key={p}>
              {p}
            </P>
          ))}
          <WhyStatement />
        </div>
      </div>
    </section>
  );
}
