import { CapabilityGridV2 } from "@/components/home/CapabilityGridV2";
import { HeroV2 } from "@/components/home/HeroV2";
import { QuoteV2 } from "@/components/home/QuoteV2";
import { StatsV2 } from "@/components/home/StatsV2";
import { WorkV2 } from "@/components/home/WorkV2";

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
