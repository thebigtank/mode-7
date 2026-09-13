import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

const specWords = [
  {
    w: "Vetted",
    d: "Inspected against a published checklist before it is allowed into stock — not spot-checked at the door.",
  },
  {
    w: "Sealed",
    d: "Closed under our own tamper tape, so the state it left us in is the state it reaches you in.",
  },
  {
    w: "Guaranteed",
    d: "Warrantied by us, not only by the manufacturer. One party to call, whichever part failed.",
  },
];

const specSheet: [string, string][] = [
  ["Inspection points", "50"],
  ["Warranty, renewed units", "12 months"],
  ["Returns window", "14 days"],
  ["Grade published before purchase", "Always"],
  ["Sealed under Mode 7 tape", "Every unit"],
  ["Volume & fleet orders", "Same standard"],
];

export function SpecSheet() {
  return (
    <section className="a-band a-band--tight">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>The Standard</Mono>
            <h2 className="a-dl">Three words, and what they oblige us to.</h2>
          </div>
          <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
            They only mean anything if one party is willing to stand behind all
            three. So we publish what each one commits us to, and apply it to every
            unit we sell.
          </P>
        </div>

        <div className="a-spec" data-rv>
          <div className="a-spec__bar">
            <span className="a-label">Mode 7 Standard</span>
            <span className="a-label">Applies to every unit · new and renewed</span>
          </div>

          <div className="a-spec__trip">
            {specWords.map((s) => (
              <div className="a-spec__word" key={s.w}>
                <div className="a-spec__w">{s.w}</div>
                <p className="a-spec__d">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="a-spec__sheet">
            {specSheet.map(([k, v]) => (
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
