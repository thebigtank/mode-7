import { Masonry } from "@/components/about/Masonry";
import { ServeGrid } from "@/components/about/ServeGrid";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function ServeSection() {
  const { serve } = content;
  return (
    <section className="a-band">
      <div className="a-wrap">
        <div className="a-split a-split--wide grid">
          <div className="a-stack grid" data-rv>
            <Mono dot>{serve.eyebrow}</Mono>
            <h2 className="a-dl">{serve.h2}</h2>
          </div>
          <P data-rv className="text-[17px] max-w-[66ch]">
            {serve.lede}
          </P>
        </div>
      </div>

      <div className="a-wrap">
        <Masonry />
        <ServeGrid />
      </div>
    </section>
  );
}
