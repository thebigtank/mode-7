import { CapabilityGridV2 } from "@/components/home-v2/CapabilityGridV2";
import { HeroV2 } from "@/components/home-v2/HeroV2";
import { QuoteV2 } from "@/components/home-v2/QuoteV2";
import { StatsV2 } from "@/components/home-v2/StatsV2";
import { WorkV2 } from "@/components/home-v2/WorkV2";

export default function HomePage() {
  return (
    <main>
      <HeroV2 />
      <StatsV2 />
      <CapabilityGridV2 />
      <WorkV2 />
      <QuoteV2 />
    </main>
  );
}
