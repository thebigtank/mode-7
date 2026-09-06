"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { V2 } from "@/lib/theme-v2";

/**
 * The pull-line in "Why We Exist", rendered as per-character spans that go
 * gold → ink on scroll — the site's signature reveal, driven by the shared
 * `useReveal` hook. Entrance fade is handled separately via the `data-rv` hook
 * on the wrapper.
 *
 * Rest state is `V2.accent` gold, resolving to `V2.ink`. This is requested,
 * deliberately, on top of history: an earlier pass moved this exact element
 * OFF gold because gold-as-text on this section's actual ground —
 * `V2.wash`, confirmed by inspecting the rendered page rather than assumed —
 * measures 1.40:1, well under both the 4.5:1 body-text floor and the 3:1
 * large-text floor the gold rule in CLAUDE.md cites. That measurement has
 * not changed; what's different is that this rest state is intentionally
 * transient scaffolding rather than settled copy, and the PREVIOUS rest
 * colour it replaces — `V2.faint` on `wash` — was itself only 1.81:1, also
 * sub-AA. Gold is a real but modest regression (1.40 vs 1.81), not a drop
 * from compliant to non-compliant; either way no character is ever left
 * resting there — `useReveal` resolves every one to `V2.ink` (14.05:1) as
 * the page scrolls, and its reduced-motion guard lands the whole line on
 * `V2.ink` immediately for anyone who might not scroll it through that
 * range. See `useReveal.ts` for the full accounting.
 */
const TEXT = "A device is only as good as everything standing behind it.";

export function WhyStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, V2.ink, V2.accent);

  return (
    <p ref={ref} className="a-dm" data-rv style={{ margin: 0 }}>
      {TEXT.split("").map((ch, i) => (
        <span key={i} style={{ color: V2.accent }}>
          {ch}
        </span>
      ))}
    </p>
  );
}
