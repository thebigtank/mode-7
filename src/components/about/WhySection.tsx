import { WhyStatement } from "@/components/about/WhyStatement";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function WhySection() {
  return (
    <section className="a-band">
      <div className="a-wrap a-split a-split--sticky">
        <div className="a-sticky a-stack" data-rv>
          <Mono dot>Why We Exist</Mono>
          <h2 className="a-dl">
            We didn&apos;t set out to open another storefront.
          </h2>
        </div>
        <div className="a-stack a-stack--lg">
          <P data-rv style={{ maxWidth: "66ch" }}>
            We set out to close a gap. Someone saves for months, buys a flagship
            device from a seller they cannot verify, and finds out too late that the
            box was opened, the warranty is fiction, or the battery has already been
            replaced once. The device is genuine or it isn&apos;t — and there is
            rarely a way to know before the money moves.
          </P>
          <P data-rv style={{ maxWidth: "66ch" }}>
            So we built the opposite of that. Every unit carrying our name is
            sourced, inspected, sealed and warrantied by us. When it later needs
            power or replacing, those answers come from the same place. We sell the
            way people actually buy here, too — in conversation, questions answered
            before money moves, rather than a form bolted on top of a habit that was
            never going to change.
          </P>
          <WhyStatement />
        </div>
      </div>
    </section>
  );
}
