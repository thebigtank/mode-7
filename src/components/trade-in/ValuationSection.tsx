import { Mono } from "@/components/ui/Mono";
import { ValuationWorkspace } from "@/components/trade-in/ValuationWorkspace";

export function ValuationSection() {
  return (
    <section className="t-wrap t-band t-band--valuation" id="value-your-device">
      <Mono dot className="mb-[14px]">
        Value your device
      </Mono>
      <h2 className="t-dl t-dl--spaced max-w-[22ch]">
        Tell us about it. Watch the number.
      </h2>
      <ValuationWorkspace />
    </section>
  );
}
