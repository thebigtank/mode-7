import { ConditionsLedger } from "@/components/about/ConditionsLedger";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function ConditionsSection() {
  const { conditions } = content;
  return (
    <section className="a-band a-band--wash">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>{conditions.eyebrow}</Mono>
            <h2 className="a-dl">{conditions.h2}</h2>
          </div>
          <P data-rv className="text-[17px] max-w-[66ch]">
            {conditions.lede}
          </P>
        </div>

        <ConditionsLedger conditions={conditions.items} />
      </div>
    </section>
  );
}
