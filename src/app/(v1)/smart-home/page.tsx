import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { PageHero } from "@/components/page/PageHero";
import { PageSection } from "@/components/page/PageSection";
import { BestSellers } from "@/components/smart-home/BestSellers";
import { CategoryShowcase } from "@/components/smart-home/CategoryShowcase";
import { MediaBanner } from "@/components/smart-home/MediaBanner";
import { WorksTogether } from "@/components/smart-home/WorksTogether";

export const metadata: Metadata = {
  title: "Smart Home — Mode 7",
  description:
    "Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed.",
};

export default function SmartHomePage() {
  return (
    <>
      <PageHero
        overline="Smart Home"
        title={<>Everything you need to make your home&nbsp;smart.</>}
        intro="Smart bulbs, switches, plugs, sensors, cameras and voice control — premium automation gear, vetted and sealed. Build your setup piece by piece."
        actions={
          <>
            <ArrowButton label="Shop Smart Home" variant="fill" href="/shop" />
            <ArrowButton label="Ask Seven" variant="outline" />
          </>
        }
      />

      <MediaBanner label="SMART HOME — CONNECTED LIVING ROOM" />

      <PageSection
        overline="Shop by Category"
        title="Build your smart home, one device at a time."
      >
        <CategoryShowcase />
      </PageSection>

      <BestSellers />
      <WorksTogether />
    </>
  );
}
