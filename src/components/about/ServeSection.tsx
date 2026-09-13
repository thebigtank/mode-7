import { Masonry } from "@/components/about/Masonry";
import { ServeGrid } from "@/components/about/ServeGrid";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

export function ServeSection() {
  return (
    <section className="a-band">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>Who We Serve</Mono>
            <h2 className="a-dl">
              Three people walk in with three different problems.
            </h2>
          </div>
          <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
            The catalogue is the same. What changes is the question being asked of
            it — and the part of the ecosystem that ends up answering.
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
