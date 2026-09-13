import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { EnergyScrolly } from "@/components/green-energy/EnergyScrolly";
import { HeroCards } from "@/components/green-energy/HeroCards";
import { QuestionsSection } from "@/components/green-energy/QuestionsSection";
import { SolarLifting } from "@/components/green-energy/SolarLifting";
import { SolarWorks } from "@/components/green-energy/SolarWorks";
import { WhyItMatters } from "@/components/green-energy/WhyItMatters";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Green Energy — Mode 7",
  description:
    "Premium solar panels, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers.",
};

export default function GreenEnergyPage() {
  return (
    <>
      <PageHero
        centered
        overline="Own your power. Cut your bills. Clean the grid."
        titleFontSize="clamp(64px, 8vw, 120px)"
        titleLineHeight="0.8"
        titleFontWeight="500"
        title={
          <>
            The Future Runs
            <br />
            on Green Power
          </>
        }
        intro="Premium green energy solutions, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers. Energy that pays you back."
        actions={
          <>
            <ArrowButton label="Book a Call" variant="fill" href="/contact" />
            <ArrowButton label="Explore Solutions" variant="outline" />
          </>
        }
      />

      <HeroCards />
      <WhyItMatters />
      <EnergyScrolly />
      <SolarWorks />
      <SolarLifting />
      <QuestionsSection />
    </>
  );
}
