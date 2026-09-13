import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

const CLS = ["a-b1", "a-b2", "a-b3 a-bcell--ink", "a-b4", "a-b5"];

export function Bento() {
  const { bento } = content;
  return (
    <section className="a-band a-band--wash">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>{bento.eyebrow}</Mono>
            <h2 className="a-dl">{bento.h2}</h2>
            <P className="text-[17px] max-w-[66ch]">{bento.lede}</P>
          </div>
        </div>

        <div className="a-bento">
          {bento.divisions.map((d, i) => (
            <article className={`a-bcell ${CLS[i]}`} data-rv key={d.t}>
              <h3 className="a-bcell__t">{d.t}</h3>
              <p className="a-bcell__b">{d.b}</p>
              {d.image && (
                <div className="a-bcell__fill relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image.src}
                    alt={d.image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
