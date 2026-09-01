import type { Metadata } from "next";
import { CapabilityGridV2 } from "@/components/home-v2/CapabilityGridV2";
import { CtaBandV2 } from "@/components/home-v2/CtaBandV2";
import { FooterV2 } from "@/components/home-v2/FooterV2";
import { HeaderV2 } from "@/components/home-v2/HeaderV2";
import { HeroV2 } from "@/components/home-v2/HeroV2";
import { InsightsV2 } from "@/components/home-v2/InsightsV2";
import { LifecycleV2 } from "@/components/home-v2/LifecycleV2";
import { QuoteV2 } from "@/components/home-v2/QuoteV2";
import { StatsV2 } from "@/components/home-v2/StatsV2";
import { V2Styles } from "@/components/home-v2/V2Styles";
import { WhyV2 } from "@/components/home-v2/WhyV2";
import { WorkV2 } from "@/components/home-v2/WorkV2";
import { V2 } from "@/lib/theme-v2";

export const metadata: Metadata = {
  title: "Mode 7 — Homepage v2",
  description:
    "A parallel homepage exploration: reference section structure, Mode 7 content and palette.",
};

/**
 * `/homepage-v2` — a PARALLEL homepage exploration. It borrows a reference
 * homepage's section order and colour structure, and carries only Mode 7's own
 * copy, data and placeholder imagery. No v1 component is used or modified; the
 * page supplies its own header and footer, and `SiteShell` suppresses the v1
 * chrome on this route alone.
 *
 * Colour comes exclusively from `V2` in `@/lib/theme-v2` — the Mode 7 `COLOR`
 * tokens appear nowhere on this page.
 */
export default function HomepageV2() {
  return (
    <div style={{ background: V2.wash, overflowX: "clip" }}>
      <V2Styles />
      <HeaderV2 />
      <main>
        <HeroV2 />
        <StatsV2 />
        <LifecycleV2 />
        <CapabilityGridV2 />
        <WhyV2 />
        <QuoteV2 />
        <WorkV2 />
        <CtaBandV2 />
        <InsightsV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
