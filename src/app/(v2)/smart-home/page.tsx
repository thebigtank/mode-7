import type { Metadata } from "next";
import { BestSellers } from "@/components/smart-home/BestSellers";
import { CategoryShowcase } from "@/components/smart-home/CategoryShowcase";
import { WorksTogether } from "@/components/smart-home/WorksTogether";
import { SmartHomeHero } from "@/components/smart-home/SmartHomeHero";

export const metadata: Metadata = {
  title: "Smart Home — Mode 7",
  description:
    "Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed.",
};

export default function SmartHomePage() {
  return (
    <div className="smart-home-page">
      <SmartHomeHero />
      <CategoryShowcase />
      <BestSellers />
      <WorksTogether />
    </div>
  );
}
