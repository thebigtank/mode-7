# Parity harness

Proves the restructure is visually inert. Every phase gates on this, because
static checks do not catch what breaks here — nearly every defect this codebase
has had typechecked, linted and returned 200.

## The gate

```sh
# 1. pin a baseline worktree OUTSIDE the repo, at the commit you are gating against
git worktree add /absolute/path/outside/mode-seven-base --detach <ref>
cd /absolute/path/outside/mode-seven-base && npm ci
NEXT_DIST_DIR=.next-parity npx next build

# 2. build the branch
NEXT_DIST_DIR=.next-parity npx next build

# 3. capture both, then diff
./scripts/parity/run.sh /absolute/path/outside/mode-seven-base .next-parity 3101 /tmp/parity/base
./scripts/parity/run.sh "$PWD"                                 .next-parity 3102 /tmp/parity/branch
node scripts/parity/compare.mjs --a /tmp/parity/base --b /tmp/parity/branch
```

`run.sh` scopes the server to the capture and refuses a port already in use —
another session answering on it would serve a plausible, wrong baseline.

## Tiers

| tier | what | where it is the only witness |
|---|---|---|
| 1 | every node's rect + computed styles, 51 widths | layout |
| 2 | full-page PNGs at 6 widths | gradients, shadows, background images, text rendering |
| 3 | 54 discovered `:hover` / `:focus` selectors | an `!important` removed one commit too early |
| 4 | `--font-*` resolution per route | trap #1 — a dropped var takes the whole stack with it |

Tier 1 samples every distinct breakpoint in the codebase **and each N−1**, which
is what catches a 620 ported as 621.

## Rules learned the hard way

- **Run tier 0 first.** Capture twice against the *same* server and require
  zero. A probe you have not noise-tested cannot tell you anything.
- **Key on content, not position.** Rects are keyed by visible text, image src
  or background url so they survive a DOM restructure. Keys that can only be
  structural are counted separately — across a restructure they are not
  comparable; within a phase they are.
- **Never compare `marginLeft` / `marginRight`.** A used auto margin is derived
  and already captured by the rect.
- **Never wait on `document.images`.** `next/image` is lazy, so below-fold
  images never load and the wait never resolves.
- **Read `selectorText` before recursing into `cssRules`.** `CSSStyleRule` also
  exposes an empty `cssRules` in Chrome because of CSS nesting, so testing it
  first swallows every style rule in the sheet.
- **Every difference must be attributable to a named decision.** If you cannot
  explain a number, it is a bug — not a rounding artefact. Differences under
  1/64px (Chromium's LayoutUnit) cannot move a pixel, but are reported with
  their numbers rather than waved away.

## Excluded, deliberately

`[data-eq]` — Seven's eyes — is hidden for tier 2 only. `useSevenEyes` blinks
two canvas pupils on a `performance.now()` cadence with no reduced-motion
guard, so a screenshot catches whatever blink phase it lands in. Freezing
`performance.now` would risk React's scheduler. The widget's box, position and
computed styles are still covered by tier 1; only the animated canvas content
is out of scope.

## When tier 1 reports differences

`compare.mjs` only prints samples for content-keyed nodes, so a wall of
structural-key differences arrives with no detail. `diffprops.mjs` answers
"which property, and what did it become":

```sh
node scripts/parity/diffprops.mjs
```

It histograms every differing computed property across all captures and shows
one worked example of each. It is how 1,071 unexplained differences turned out
to be a single property on a single element: `border-radius: 50%` had become
Tailwind's `rounded-full`, which compiles to `calc(infinity * 1px)` and
serialises as `3.35544e+07px`. Identical on a square element, different on any
other. `rounded-[50%]` is the exact spelling.

## Tier 3 is blind to anything that is not in the DOM at rest

`discover-states.mjs` walks the loaded stylesheets, strips the pseudo-class and
keeps a selector only if `document.querySelectorAll` matches something **on the
page as loaded**. A control whose panel, options or scrim only exist once it is
open therefore contributes nothing, and tier 3 reports clean while never having
touched it. `.m7-ss*` (SearchSelect) is the known case: 54 targets, none of
them that control. The mega menu, checkout modal and search overlay are the
same shape.

For those, `drive-states.mjs` scripts the interaction instead of discovering
it. Each scenario names a route, a list of steps that open and work the
control, and either an explicit selector list or a walk of every element under
a root:

```sh
node scripts/parity/drive-states.mjs --url http://localhost:3101 --out /tmp/parity/driven-base.json
node scripts/parity/drive-states.mjs --url http://localhost:3102 --out /tmp/parity/driven-branch.json
node scripts/parity/drive-states.mjs --compare 1 --a /tmp/parity/driven-base.json --b /tmp/parity/driven-branch.json
```

It borrows `preparePage` and the settle stylesheet from `freeze.mjs`, so
animations and transitions are off and two runs of one build differ by zero
across 153,216 properties. It prints the element count for every state it
captures: **a scenario whose trigger no longer matches reports 0 and must be
fixed, not read as clean** -- the same failure that made tier 3 look green
over a control it had never touched.

It found the case it was written for. Moving
`.m7-ss__input:focus-visible { outline: none }` out of `legacy.css` and into a
component sheet flipped it from losing to the global
`:focus-visible { outline: 2px solid }` to beating it, and the focus ring
disappeared from the SearchSelect button and its filter field. Tier 3 could
not see it; tiers 1 and 2 gated clean either side of it.

**Its keys are structural below the leaves, so it only compares builds whose
DOM is the same shape.** Run it against the rolling baseline -- the commit
before the change -- never across a restructure, where a reshaped page reports
every node as a difference and means nothing by it.

## Gating something that renders nowhere

The parked components -- `LifecycleV2`, `WhyV2`, `InsightsV2`, `CtaBandV2`,
`HeroHeadlineV2Wipe` -- are built but mounted on no route, so they have no
baseline and the gate cannot see them. To port or change one, give it a
temporary route, add that route to `ROUTES` in `config.mjs`, capture a baseline
BEFORE the change, and delete both afterwards:

```tsx
// src/app/(v2)/parked/page.tsx  -- temporary, delete before merging
export default function ParkedProbe() {
  return <main>{/* mount each parked component */}</main>;
}
```

Note the folder cannot start with `_`: Next treats `_`-prefixed directories as
private and never routes them, so the page silently does not exist.

## Known rare noise

`/green-energy` at 1440 was intermittently off by **~89,000 pixels**, about one
run in three, with tier 1 completely clean. `EnergyScrolly` calls
`ScrollTrigger.refresh()` on window load, which re-measures a pinned section;
a capture landing mid-refresh disagrees with one that does not. The freeze now
awaits `load` and gives pixel captures a longer settle, which took four
consecutive byte-identical runs to confirm.

The lesson generalises: **two runs of tier 0 cannot surface a one-in-three
flake.** If a tier 2 difference appears on a route the change did not touch,
re-capture before believing it — `prev` and a fresh capture agreeing, with the
failing run in the middle, means the run was the outlier, not the code.

A capture of `/shop` at 1200 has once produced **6 pixels at delta 1** against
an otherwise identical build. Re-capturing the same build twice gave zero, and
re-capturing against the previous build gave zero, so it is a transient in a
single run rather than a regression — the two-run tier 0 under-samples it.
Antialiasing on one edge, one unit out of 255, invisible.

If a gate reports a handful of delta-1 pixels on one screenshot and tier 1 is
clean, re-capture before chasing it. If it reproduces, it is real.

## Regenerating the state targets

`state-targets.json` is derived, not hand-written. After any change to the
`:hover` / `:focus` rules:

```sh
NEXT_DIST_DIR=.next-parity npx next start -p 3105 &
node scripts/parity/discover-states.mjs --url http://localhost:3105
```
