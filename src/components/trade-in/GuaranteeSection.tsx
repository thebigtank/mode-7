import { Mono } from "@/components/ui/Mono";
import { TradeInFaq } from "@/components/trade-in/TradeInFaq";
import { V2 } from "@/lib/theme-v2";

export function GuaranteeSection() {
  return (
    <section className="t-band t-band--ink">
      <div className="t-wrap">
        <Mono dot color={V2.faint} style={{ marginBottom: 16 }}>
          Before you ask
        </Mono>
        <h2 className="t-dl max-w-[18ch]">
          Your device, valued the way we’d want ours valued.
        </h2>
        <TradeInFaq />
      </div>
    </section>
  );
}
