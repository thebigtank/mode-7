import type { Metadata } from "next";
import { EnergyScrolly } from "@/components/green-energy/EnergyScrolly";
import { GreenEnergyHero } from "@/components/green-energy/GreenEnergyHero";
import { HeroCards } from "@/components/green-energy/HeroCards";
import { QuestionsSection } from "@/components/green-energy/QuestionsSection";
import { SolarLifting } from "@/components/green-energy/SolarLifting";
import { SolarWorks } from "@/components/green-energy/SolarWorks";
import { WhyItMatters } from "@/components/green-energy/WhyItMatters";

export const metadata: Metadata = {
  title: "Green Energy — Mode 7",
  description:
    "Premium solar panels, home batteries and EV charging — designed, installed and monitored by certified Mode 7 engineers.",
};

export default function GreenEnergyPage() {
  return (
    <div className="green-energy-page">
      <GreenEnergyHero />
      <HeroCards />
      <WhyItMatters />
      <EnergyScrolly />
      <SolarWorks />
      <SolarLifting />
      <QuestionsSection />
    </div>
  );
}
