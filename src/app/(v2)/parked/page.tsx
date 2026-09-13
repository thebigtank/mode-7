import { CtaBandV2 } from "@/components/home/CtaBandV2";
import { HeroHeadlineV2 as HeroHeadlineWipe } from "@/components/home/HeroHeadlineV2Wipe";
import { InsightsV2 } from "@/components/home/InsightsV2";
import { LifecycleV2 } from "@/components/home/LifecycleV2";
import { WhyV2 } from "@/components/home/WhyV2";

export default function ParkedProbe() {
  return (
    <main>
      <div style={{ padding: "80px clamp(20px,4vw,48px)" }}>
        <HeroHeadlineWipe />
      </div>
      <WhyV2 />
      <LifecycleV2 />
      <InsightsV2 />
      <CtaBandV2 />
    </main>
  );
}
