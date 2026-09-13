import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

const divisions = [
  {
    t: "Premium Devices",
    b: "Flagship phones, business laptops and pro tablets across thirteen brands. Genuine, factory-sealed, inspected before dispatch, and covered by the manufacturer's warranty as well as ours.",
    cls: "a-b1",
    fill: true,
  },
  {
    t: "Certified Refurbished",
    b: "Renewed, graded and sealed again — a fifty-point inspection, a twelve-month warranty, and the exact grade published before you buy rather than discovered after.",
    cls: "a-b2",
  },
  {
    t: "Energy & Solar",
    b: "Panels, inverters, home batteries and portable power. Sized against real consumption — so everything else in the catalogue keeps working when the grid doesn't.",
    cls: "a-b3 a-bcell--ink",
  },
  {
    t: "Smart Home",
    b: "Lighting, climate and security as compatible kits you start small and extend — never a whole-house commitment made in one go.",
    cls: "a-b4",
  },
  {
    t: "Trade-In & Upgrade",
    b: "A valuation in about a minute, applied instantly against anything in store. Capital sitting idle inside an old device becomes the deposit on the next one, without a negotiation.",
    cls: "a-b5",
  },
];

export function Bento() {
  return (
    <section className="a-band a-band--wash">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>What We Focus On</Mono>
            <h2 className="a-dl">Five divisions, one accountable standard.</h2>
            <P style={{ fontSize: 17, maxWidth: "66ch" }}>
              Each of these five divisions answers one of the conditions
              described above — an unreliable grid, trust that has to be
              rebuilt, hardware priced against income, or a device that
              doubles as someone&apos;s livelihood. What ties them together
              is the same standard: sourced, verified, powered and renewed
              against one set of rules, so the guarantee behind the sale
              doesn&apos;t change with the category.
            </P>
          </div>
        </div>

        <div className="a-bento">
          {divisions.map((d) => (
            <article className={`a-bcell ${d.cls}`} data-rv key={d.t}>
              <h3 className="a-bcell__t">{d.t}</h3>
              <p className="a-bcell__b">{d.b}</p>
              {d.fill && (
                <div
                  className="a-bcell__fill"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero/devices-flatlay.webp"
                    alt="An iMac, MacBook, iPhone and keyboard arranged together on a desk — the flagship phones, laptops and tablets Mode 7 carries."
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
