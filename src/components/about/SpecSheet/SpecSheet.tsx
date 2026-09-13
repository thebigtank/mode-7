import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function SpecSheet() {
  const { spec } = content;
  return (
    <section className="a-band a-band--tight">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>{spec.eyebrow}</Mono>
            <h2 className="a-dl">{spec.h2}</h2>
          </div>
          <P data-rv className="text-[17px] max-w-[66ch]">
            {spec.lede}
          </P>
        </div>

        <div className="a-spec" data-rv>
          <div className="a-spec__bar">
            {spec.bar.map((b) => (
              <span className="a-label" key={b}>{b}</span>
            ))}
          </div>

          <div className="a-spec__trip">
            {spec.words.map((s) => (
              <div className="a-spec__word" key={s.w}>
                <div className="a-spec__w">{s.w}</div>
                <p className="a-spec__d">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="a-spec__sheet">
            {spec.sheet.map(([k, v]) => (
              <div className="a-spec__row" key={k}>
                <span className="a-spec__k">{k}</span>
                <span className="a-spec__v">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
