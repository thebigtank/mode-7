import type { Metadata } from "next";
import { CategoryNav } from "@/components/services/CategoryNav";
import { CoreSection } from "@/components/services/CoreSection";
import { Faq } from "@/components/services/Faq";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesLifestyle } from "@/components/services/ServicesLifestyle";
import { SmartHomeSection } from "@/components/services/SmartHomeSection";
import { SolarSection } from "@/components/services/SolarSection";
import { TradeInSection } from "@/components/services/TradeInSection";

export const metadata: Metadata = {
  title: "Services — Mode 7",
  description:
    "From flagship launches to certified refurbished, instant trade-ins to concierge checkout — the premium tech store built around how you buy.",
};

export default function ServicesPage() {
  return (
    <div className="services-page">
      <ServicesHero />
      <ServicesLifestyle />
      <CategoryNav />
      <CoreSection />
      <SmartHomeSection />
      <SolarSection />
      <TradeInSection />
      <Faq />
    </div>
  );
}
