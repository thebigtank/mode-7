import { CapabilityGridV2 } from "@/components/home-v2/CapabilityGridV2";
// Hidden, not deleted — see the note in HomepageV2 below.
// import { CtaBandV2 } from "@/components/home-v2/CtaBandV2";
import { HeroV2 } from "@/components/home-v2/HeroV2";
// Hidden, not deleted — see the note in HomepageV2 below.
// import { InsightsV2 } from "@/components/home-v2/InsightsV2";
// Hidden, not deleted — see the note in HomepageV2 below.
// import { LifecycleV2 } from "@/components/home-v2/LifecycleV2";
import { QuoteV2 } from "@/components/home-v2/QuoteV2";
import { StatsV2 } from "@/components/home-v2/StatsV2";
// import { WhyV2 } from "@/components/home-v2/WhyV2";
import { WorkV2 } from "@/components/home-v2/WorkV2";

/* No `metadata` export here on purpose: this is the site root, so it inherits
   the title and description declared in `src/app/layout.tsx`, which are the
   site's own. It previously exported a "Mode 7 — Homepage v2" title, correct
   while this was a parallel exploration at `/homepage-v2` and wrong now that
   it IS the homepage. */

/**
 * `/` — the Mode 7 homepage.
 *
 * This page used to live at `/homepage-v2` as a parallel exploration running
 * beside a v1 homepage at `/`. That v1 homepage has been REMOVED: its route
 * was this file, and its nine sections in `src/components/home/` (Hero,
 * FullBleedImage, BrandStrip, Mission, Ecosystem, WhyModeSeven, Capabilities,
 * plus the already-hidden Team and Testimonials) were deleted along with it,
 * having no other importer. `git show 54bf880:src/app/page.tsx` and the same
 * ref for anything under `src/components/home/` restores them if ever needed.
 * `/homepage-v2` now 307-redirects here (see `next.config.mjs`).
 *
 * The v1 DESIGN SYSTEM is emphatically still alive — `/shop`, `/cart`,
 * `/checkout`, `/product`, `/contact`, `/green-energy` and `/smart-home` all
 * still render v1 chrome and the `COLOR` palette through `SiteShell`'s second
 * branch. Only the v1 HOMEPAGE is gone.
 *
 * It borrows a reference homepage's section order and colour structure, and
 * carries only Mode 7's own copy, data and placeholder imagery.
 * `SiteShell` mounts `V2Styles`, `HeaderV2` and `FooterV2` for every route
 * it treats as v2 (see its file), so this page renders only its own
 * sections — no header, no footer, no stylesheet tag here.
 *
 * Colour comes exclusively from `V2` in `@/lib/theme-v2` — the Mode 7 `COLOR`
 * tokens appear nowhere on this page.
 *
 * WhyV2 ("Why Mode 7"), CtaBandV2 ("What are you looking to power?"),
 * LifecycleV2 ("The ecosystem") and InsightsV2 ("What our customers say")
 * are currently HIDDEN, not removed, each at the user's request — same
 * convention as v1's Team/Testimonials in `src/app/page.tsx`. All four
 * components are intact in `src/components/home-v2/`, their content in
 * `src/lib/content.ts` is untouched (the `pillars` array that both
 * CtaBandV2 and LifecycleV2 read is also read by StatsV2, as
 * `pillars.length`, which is still live; InsightsV2's `testimonials[1..3]`
 * are simply unread while it stays parked, leaving `testimonials[0]` — read
 * by QuoteV2 — the only entry displayed anywhere on this page), and their
 * CSS in `V2Styles.tsx` is marked PARKED rather than pruned. To restore any
 * of them: uncomment its import above and its element below.
 *
 * QuoteV2 sits last now, directly above FooterV2, having moved below WorkV2
 * (whose heading is "Built for every part of the lifecycle."). A second,
 * similar consequence from parking LifecycleV2: StatsV2 (ink ground) now
 * sits directly against CapabilityGridV2 (wash ground) with no section
 * between them, where LifecycleV2's own wash ground previously supplied a
 * buffer. The dark-to-light break still reads cleanly at that seam — it did
 * not need fixing.
 *
 * With InsightsV2 parked, CapabilityGridV2 (wash) now sits directly against
 * WorkV2 (wash) with no section between them — checked on the rendered page
 * at 1440 and 390; the combined whitespace and the following stacked-card
 * heading read as a clear section start on their own, the same call already
 * made for the StatsV2 -> CapabilityGridV2 gap above. It did not need fixing.
 *
 * QuoteV2 (ink) -> FooterV2 (ink) is the seam this move was flagged for:
 * this page already hit undifferentiated black once, when CtaBandV2 (also
 * ink) sat directly above the footer, and parking CtaBandV2 was the fix —
 * WorkV2's wash ground has supplied the light-to-dark break ever since.
 * Measured on the rendered page: from the bottom of QuoteV2's portrait image
 * to the top of FooterV2's closing-statement text, there is ~155px of
 * unbroken ink at 1440 and ~112px at 390 — solid colour, no hairline, no
 * logo mark, no heading, nothing to break it. Smaller than the 300-530px
 * CtaBandV2 produced there, but the same zero-cue pattern. NOT fixed: none
 * of the candidate fixes (a hairline at the seam, tightening QuoteV2's
 * bottom padding, or giving QuoteV2 a different ground) is already used at
 * this exact position on the page, so this is left for the user's decision
 * rather than silently shipped or silently patched.
 */
export default function HomePage() {
  return (
    <main>
      <HeroV2 />
      <StatsV2 />
      {/* <LifecycleV2 /> */}
      <CapabilityGridV2 />
      {/* <WhyV2 /> */}
      {/* <InsightsV2 /> */}
      <WorkV2 />
      <QuoteV2 />
      {/* <CtaBandV2 /> */}
    </main>
  );
}
