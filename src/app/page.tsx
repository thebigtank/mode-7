import { BrandStrip } from "@/components/home/BrandStrip";
import { Capabilities } from "@/components/home/Capabilities";
import { Ecosystem } from "@/components/home/Ecosystem";
import { FullBleedImage } from "@/components/home/FullBleedImage";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyModeSeven } from "@/components/home/WhyModeSeven";

/**
 * Mode 7 landing page. Section order matches the design 1-to-1:
 * hero → full-bleed image → brand strip → mission → ecosystem → why → featured
 * capabilities → team → testimonials → CTA banner.
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
      <Team />
      <Testimonials />
    </>
  );
}
