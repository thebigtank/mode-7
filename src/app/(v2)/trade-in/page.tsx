import type { Metadata } from "next";
import { GuaranteeSection } from "@/components/trade-in/GuaranteeSection";
import { PricingBand } from "@/components/trade-in/PricingBand";
import { TradeInHero } from "@/components/trade-in/TradeInHero";
import { ValuationSection } from "@/components/trade-in/ValuationSection";

export const metadata: Metadata = {
  title: "Trade-In — Mode 7",
  description:
    "Answer a few questions and watch your device's value build itself, line by line — no black box, no lowball. Put the estimate straight toward your next device.",
};

export default function TradeInPage() {
  return (
    <div className="tradein-page">
      <TradeInHero />
      <ValuationSection />
      <PricingBand />
      <GuaranteeSection />
    </div>
  );
}
