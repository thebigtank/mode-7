import { ConditionsLedger } from "@/components/about/ConditionsLedger";
import { Mono } from "@/components/ui/Mono";
import { P } from "@/components/ui/P";

const conditions = [
  {
    t: "Unreliable grid power",
    b: "Grid supply is intermittent, and planning around it is ordinary life rather than an emergency. A device is only as useful as the energy behind it — which is why panels, inverters and batteries sit in our catalogue beside the laptops, not in a separate business.",
  },
  {
    t: "Trust is scarce",
    b: 'Grey imports. Refurbished units sold as new. Warranties that evaporate on first contact. "Sealed" is a claim most of this market cannot actually back, so we made verification a documented process with a paper trail — and only then started using the word.',
  },
  {
    t: "Hardware outpaces income",
    b: "A flagship device can cost several months of earnings. Certified refurbished is not a lesser tier for people who cannot afford better — for most buyers it is the difference between having the tool and going without it entirely.",
  },
  {
    t: "Devices are livelihoods",
    b: "The phone in your hand or the laptop on your desk is frequently the business itself. Downtime is lost income, not inconvenience. That turns upgrade paths and trade-in liquidity into commercial questions that deserve commercial answers.",
  },
];

export function ConditionsSection() {
  return (
    <section className="a-band a-band--wash">
      <div className="a-wrap">
        <div className="a-split a-split--wide">
          <div className="a-stack" data-rv>
            <Mono dot>The Conditions We Build For</Mono>
            <h2 className="a-dl">
              Every part of this business answers something specific.
            </h2>
          </div>
          <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
            We are not a general-purpose retailer that happens to operate here. These
            four conditions shape the market we serve — and each one is the reason a
            particular part of Mode 7 exists.
          </P>
        </div>

        <ConditionsLedger conditions={conditions} />
      </div>
    </section>
  );
}
