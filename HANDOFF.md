# Restructure — handoff

Branch `restructure`, 27 commits, working tree clean, every commit gated.
Plan: `~/.claude-personal/plans/volumes-thebigtank-m2-drive-active-work-immutable-spindle.md`
Rulebook (binding): `.claude/skills/section-components/SKILL.md`
Gate: `scripts/parity/README.md`

## Resume in one command

```sh
cd "/Volumes/theBigTank M2 Drive/thebigtank works/Mode Seven"
git log --oneline -1          # expect 3e631d9 or later on `restructure`
NEXT_DIST_DIR=.next-parity npx next build
./scripts/parity/run.sh "$PWD" .next-parity 3102 /tmp/parity/prev --tiers 1,2,3,4 --concurrency 4
```

That re-establishes the rolling baseline (`/tmp/parity/prev` is cleared by a
reboot). Then for each change: build, capture to `/tmp/parity/branch`, and
`node scripts/parity/compare.mjs --a /tmp/parity/prev --b /tmp/parity/branch`.
It must print `PASS — no differences`. On a failure whose detail is all
structural keys, run `node scripts/parity/diffprops.mjs` to name the property.

## Done

Phase 0 (infrastructure) and Phase 1 (`/trade-in` pilot) complete, plus Phase
2.1 (v2 primitives). Next 16.3.5 · React 19.3 · Tailwind 4.3.3 ·
sass-embedded · TypeScript 6.0.3 · PayloadCMS 3.89 on Postgres.

- `legacy.css` 2,620 -> 2,003 lines, now `@layer legacy`
- inline styles 772 -> 762
- `src/components/ui/` holds 9 v2 primitives + `ButtonV2`, all folder
  components with colocated SCSS, all accepting `className`

## The four facts that everything else depends on

1. **Cascade order is arranged, never declared.** Tailwind's PostCSS plugin
   strips a bare `@layer a, b, c;` statement out of the file it processes. The
   order comes from the import order in each route group layout:
   `base.scss, legacy.css, main.scss, globals.css` => base, legacy, components,
   theme, utilities. Reversing two of those silently inverts a rule and nothing
   errors.
2. **A ported rule only beats the legacy rule it replaces because legacy.css is
   layered.** Unlayered it outranked every layered rule regardless of
   specificity.
3. **Preflight is OFF**, deliberately. Tailwind is composed from `theme.css` +
   `utilities.css` by hand in `globals.css`. Turning it on moved all 561
   captures, because the site leans on UA defaults. It goes on in Phase 6 when
   legacy.css is gone. One line.
4. **Tier 3 is not optional.** It is the only tier that saw a 4px -> 3px focus
   radius, and pixel diffing alone missed a `border-radius: 50%` ->
   `calc(infinity*1px)` change across every eyebrow dot on four routes.

## Next: Phase 2.2, the chrome layer

Move to `src/components/chrome/`: `HeaderV2`, `FooterV2`, `Header`, `Footer`,
`MegaMenu`, `SearchOverlay`, `SevenWidget`, `RevealWordmark`, `IntroLoader`,
plus `V1Chrome`/`V2Chrome`.

**Do this first, before porting any rule out of it:** `V2Styles.tsx` renders an
UNLAYERED `<style>` tag, so it currently beats every layered rule — the same
trap legacy.css had. Wrap its CSS in `@layer legacy { … }` and gate that alone
before extracting anything. Watch the template-literal trap: the whole file is
one JS template literal and a stray backtick in a comment breaks it.

Ownership inside `V2Styles.tsx`, already mapped:

| component | rules |
|---|---|
| `HeaderV2` | `.v2-nav-link`, `.v2-nav-scrim`, `.v2-navlinks` |
| `FooterV2` | `.v2-footcols`, `.v2-headrow`, `.v2-legal`, `.v2-social` |
| shared (also `HeroV2`) | `.v2-hero-h1` — lives one directory up, not in either |

`SearchOverlay` is one component painted per surface via its `variant` prop.
Porting it unblocks the `.tradein-page .m7-ss*` reskin still sitting in
legacy.css, which cannot move until `SearchSelect` does — both sides of that
override have to stay in the same layer.

## Then

| phase | scope |
|---|---|
| 3 | `/`, `/about`, `/services`; retire `V2Styles.tsx`. `/about` is 125 rules in legacy.css; `services/page.tsx` has 117 inline styles and seven private layout helpers that exist only because there is no class layer |
| 4 | parked components (`LifecycleV2`, `WhyV2`, `InsightsV2`, `CtaBandV2`, `HeroHeadlineV2Wipe`) — ported, still parked. They render nowhere, so build the throwaway `(v2)/_parked` route, capture before/after, delete it before merge |
| 5 | v1 routes, lightest first: `/smart-home`, `/cart`, `/product`, `/checkout`, `/shop`, `/green-energy`, `/contact`. Then delete `legacy.css`, `theme.ts`, `theme-v2.ts`, `V2Styles.tsx` |
| 6 | comment strip (last, deliberately — the comments are the map), Preflight on, stylelint, CLAUDE.md rewrite |

`legacy.css:894-910`'s three `!important` grid helpers span ~33 grids and can
only be removed with the LAST v1 route that uses them. An `!important` that
outranks an inline style must never be removed before that inline style is --
same commit, never a later one.

## Two open decisions for the owner

- **TypeScript 7 / ESLint 10 are blocked upstream**, not skipped.
  `typescript-eslint` refuses TS 7.0 outright; `eslint-plugin-react` inside
  `eslint-config-next@16.3.5` calls `context.getFilename()`, removed in ESLint
  10. Either one kills linting entirely. TypeScript 6.0.3 shipped instead.
  Revisit when typescript-eslint ships 7.1 support.
- **Merge shape.** The plan is `git merge --squash` to one `restructure:`
  commit on `main`, with the branch tagged so the granular commits stay
  recoverable. History is never rewritten.

## Do not

- Run a second agent in this working directory. Two writers cost an
  `index.lock` collision, a stale-build gate result, and one commit that swept
  another's files. Give an agent its own worktree or work solo.
- `git checkout tsconfig.json` to discard Next's auto-edits — it also reverts
  the deliberate `@payload-config` path alias. Check `git diff` first.
- `git add -A` while anything else might be writing. Stage explicit paths.
