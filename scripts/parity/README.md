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

## Regenerating the state targets

`state-targets.json` is derived, not hand-written. After any change to the
`:hover` / `:focus` rules:

```sh
NEXT_DIST_DIR=.next-parity npx next start -p 3105 &
node scripts/parity/discover-states.mjs --url http://localhost:3105
```
