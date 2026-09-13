import type { Metadata } from "next";
import { Bento } from "@/components/about/Bento";
import { ConditionsSection } from "@/components/about/ConditionsSection";
import { AboutHero } from "@/components/about/AboutHero";
import { RevealController } from "@/components/about/RevealController";
import { ServeSection } from "@/components/about/ServeSection";
import { SpecSheet } from "@/components/about/SpecSheet";
import { StatRow } from "@/components/about/StatRow";
import { WhySection } from "@/components/about/WhySection";

export const metadata: Metadata = {
  title: "About — Mode 7",
  description:
    "Mode 7 is a technology hub built on one observation: buying a device, powering it and upgrading it are separate problems, and almost nobody solves them together.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <RevealController />
      <AboutHero />
      <WhySection />
      <ConditionsSection />
      <StatRow />
      <ServeSection />
      <Bento />
      <SpecSheet />
    </div>
  );
}
