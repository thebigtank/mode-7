import { BrandStrip } from "@/components/home/BrandStrip";
import { Capabilities } from "@/components/home/Capabilities";
import { Ecosystem } from "@/components/home/Ecosystem";
import { FullBleedImage } from "@/components/home/FullBleedImage";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { WhyModeSeven } from "@/components/home/WhyModeSeven";
// Hidden, not deleted — see the note in HomePage below.
// import { Team } from "@/components/home/Team";
// import { Testimonials } from "@/components/home/Testimonials";

/**
 * Mode 7 landing page. Section order:
 * hero → full-bleed image → brand strip → mission → ecosystem → why →
 * featured capabilities.
 *
 * Team and Testimonials are currently HIDDEN, not removed. Both components are
 * intact in `src/components/home/` along with their content in `src/lib/content.ts`
 * and their imagery in `public/hero/` (team-1..8, av-1..4) — uncomment the two
 * imports and the two elements to bring either back.
 *
 * Nav, mega menu, search, Seven, the footer card and the reveal wordmark all
 * live in `SiteShell` (see `src/app/layout.tsx`).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FullBleedImage />
      <BrandStrip />
      <Mission />
      <Ecosystem />
      <WhyModeSeven />
      <Capabilities />
      {/* <Team /> */}
      {/* <Testimonials /> */}
    </>
  );
}
