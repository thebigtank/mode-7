# Restructure — handoff

Branch `restructure`, HEAD `aed6e8f`, 48 commits, working tree clean, every
commit gated.

Plan: `~/.claude-personal/plans/volumes-thebigtank-m2-drive-active-work-immutable-spindle.md`
Rulebook (binding): `.claude/skills/section-components/SKILL.md`
Gate: `scripts/parity/README.md`

## Resume in one command

```sh
cd "/Volumes/theBigTank M2 Drive/thebigtank works/Mode Seven"
git log --oneline -1                     # expect aed6e8f on `restructure`
NEXT_DIST_DIR=.next-parity npx next build
./scripts/parity/run.sh "$PWD" .next-parity 3102 /tmp/parity/prev --tiers 1,2,3,4 --concurrency 4
```

That rebuilds the rolling baseline, which lives in `/tmp` and does not survive a
reboot. Then for each change: build, capture to `/tmp/parity/branch`, and

```sh
node scripts/parity/compare.mjs --a /tmp/parity/prev --b /tmp/parity/branch
```

It must print `PASS — no differences`. Tier 2 reports maxΔ 1 as sub-perceptual
and does not fail on it — that is gradient rasterisation, not a change. If tier 1
fails with only structural-key detail, `node scripts/parity/diffprops.mjs
--a <base> --b <branch>` names the property.

## Where it got to

```
legacy.css     2,620 -> 1193 lines
inline styles    772 ->   608
```

Done: Phase 0 (infrastructure), Phase 1 (`/trade-in` pilot), Phase 2 (v2
primitives + chrome), Phase 3 (all four v2 routes componentised, `V2Styles`
retired), Phase 4 (parked components ported and verified), and five of eight v1
routes — `/smart-home`, `/cart`, `/product`, `/checkout`, `/shop`.

Stack: Next 16.3.5 · React 19.3 · Tailwind 4.3.3 · sass-embedded · TypeScript
6.0.3 · PayloadCMS 3.89 on Postgres.

**There are no stylesheets under `src/app/` except the SCSS infrastructure.**
Every style belongs to the component that renders the markup. Pages are
metadata plus a list of components.

## FIRST THING NEXT SESSION — two unmerged agent branches

Two agents were mid-flight when the session ended. Their committed work is
preserved on their own branches and is NOT yet merged or verified here.

| branch | holds |
|---|---|
| `worktree-agent-a361174e2d1af92da` | `/shop` + `page/Blocks.tsx` (committed, agent-gated). `/green-energy` and `/contact` possibly partial. |
| `worktree-agent-ac77958c521c99759` | `SearchSelect` + its `/trade-in` reskin, at least at a WIP commit. |

Merge each, then **re-gate the merged tree yourself**. Three agents' green gates
against three separate baselines do not compose into one green result — that has
already been true once this session. Expect conflicts only in
`src/app/scss/components/_baseComponents.scss` and `_baseBlocks.scss`; resolve by
keeping every `@use` line, and note that order matters where a shared sheet must
load before the components that override it.

Their worktrees are at `.claude/worktrees/` (gitignored). `git worktree list`
shows them; `git worktree remove` once merged.

## Remaining work

| phase | scope |
|---|---|
| 5 | `/green-energy`, `/contact` if the agent did not finish them. Then delete `legacy.css`, `theme.ts`, `theme-v2.ts`. |
| 6 | Preflight back on, stylelint, `CLAUDE.md` rewrite, and the 22 `.m7-*` classes referenced by nothing |
| merge | `git merge --squash restructure` onto `main`, one `restructure:` commit, branch tagged so the granular history stays recoverable |

**The three `!important` grid helpers** at `legacy.css` (`.m7-grid-3`,
`.m7-grid-2`, `.m7-hero-h1`) exist because ~33 grids still declare columns
inline. They can only go once no inline grid columns remain anywhere — grep
before removing. An `!important` and the inline style it outranks go in the
same commit, never a later one.

**The 22 unreferenced classes** look dead but legacy CSS predates the
no-constructed-class-names rule, so "no literal match in a .tsx" is not proof.
Check for template-string construction before deleting.

## The facts everything else depends on

1. **Cascade order is arranged, never declared.** Tailwind's PostCSS plugin
   strips a bare `@layer a, b, c;` statement. Order comes from the import order
   in each route group layout: `base.scss, legacy.css, main.scss, globals.css`
   => base, legacy, components, theme, utilities. Reversing two silently
   inverts a rule and nothing errors.
2. **Preflight is OFF, deliberately.** Tailwind is composed from `theme.css` +
   `utilities.css` by hand in `globals.css`. Turning it on moved all 561
   captures, because the site leans on UA defaults for headings, lists and
   inherited line-height. It goes on in Phase 6 once `legacy.css` is gone —
   restore `@import "tailwindcss";` in place of the two imports, and mind the
   layer-order note above.
3. **Tier 3 is not optional.** It is the only tier that has ever seen a
   4px -> 3px focus radius, and pixel diffing alone missed a `border-radius:
   50%` -> `calc(infinity*1px)` change across four routes.
4. **De-scoping drops specificity.** Removing a page-scope prefix takes a rule
   to a single class, which can fall below a bare-tag rule like `p { … }` that
   cannot itself be de-scoped without leaking site-wide. `:where(p)` is the
   clean fix. Three agents hit this independently.
5. **Media queries live inside the block they belong to** — the owner's
   explicit instruction, and the rulebook shows both the right and wrong shape.

## Do not

- Run two agents in the same working directory. Give each its own worktree.
  Even then, they share `.git` — expect occasional `index.lock` contention.
- `git stash` while agents exist. The stash stack is shared across worktrees.
- `git add -A` while anything else might be writing. Stage explicit paths.
- `git checkout tsconfig.json` to discard Next's auto-edits — it also reverts
  the deliberate `@payload-config` alias. Check `git diff` first.
- Widen the tier 2 tolerance to make a failure pass. maxΔ 1 is already treated
  as sub-perceptual; anything above that is real.
