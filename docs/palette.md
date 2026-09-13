# Palette — measured contrast

Every ratio here was measured, not estimated. They were recorded as doc
comments in `src/lib/theme.ts` and `src/lib/theme-v2.ts`. Those files are
deleted in Phase 5, once the last component stops reading them; the tokens
themselves already live in `@theme` in `src/app/globals.css`. A measured ratio
cannot be re-derived without tooling, so this file is the record that outlives
them.

Token names below are the TypeScript keys. The CSS custom properties are
`--color-m7-<kebab>` for v1 and `--color-v2-<kebab>` for v2.

## The gold rule

Mode 7's gold is `#F0C044`. It is **a ground, not a text colour** — it fails
even the 3:1 large-text floor on every light surface:

| gold on | ratio |
|---|---|
| `wash` `#E6EAE6` | **1.40:1** |
| `white` `#FFFFFF` | **1.70:1** |
| `ink` `#171D1D` | **10.02:1** |

So: gold as a **fill** with `accentOn` `#1C150F` on top (10.60:1); gold as
**text** only on `ink` (10.02:1); small accent text on a light ground uses
`accentText` `#79662F` (4.60:1 on wash, 5.59:1 on white). **Never white on
gold** — 1.70:1. Filled gold buttons take an ink label.

## v1 — the warm palette

| token | value | measured | note |
|---|---|---|---|
| `cream` | `#EFE6D1` | — | The default ground. Every section is this unless it is a named band. |
| `card` | `#F7EFDD` | — | Cards lifted off cream. |
| `sage` | `#CBC5AA` | — | Band ground — the Ecosystem section. |
| `rust` | `#9E4B2A` | — | Band ground — the hero. Darkened from #AC512D so cream clears AA. |
| `ember` | `#B75A24` | 4.5:1 | The palette's brighter rust. NOT a band: nothing in the palette reaches 4.5:1 on it (cream 3.76, espresso 3.87, gold 2.74), so it cannot carry a sm… |
| `gold` | `#F0C044` | — | Band ground — Testimonials, the pre-footer moment. |
| `espresso` | `#1C150F` | — | Band ground — the footer. Also the primary text colour everywhere. |
| `dark` | `#3C3521` | 9.83:1, 7.15:1, 4.34:1 | The palette's dark brown (olive #3C3521), and the site's one dark SURFACE: the footer ground and every dark button. Sampled from the reference foot… |
| `darkRaise` | `#4A4229` | 1.20:1 | Hover / pressed lift off `dark`. espressoRaise #2D261E is DARKER than #3C3521 and would read as a press-in, not a lift. 1.20:1 against dark. |
| `ink` | `#1C150F` | 14.57:1 | Primary text. 14.57:1 on cream. |
| `inkSoft` | `#3C3521` | 9.83:1 | Headings and emphatic secondary text. 9.83:1 on cream. |
| `body` | `#5B553D` | 6.03:1 | Body copy. 6.03:1 on cream. |
| `muted` | `#5B553D` | 6.03:1 | Small labels, mono overlines. Also 6.03:1 — small text gets no discount. |
| `faint` | `#7A765B` | 3.71:1 | Large or decorative muted text only. 3.71:1 on cream. |
| `line` | `#DCD1B6` | — |  |
| `lineStrong` | `#CEC3A8` | — |  |
| `hair` | `#A39A7E` | — | Stone. A divider, never text. |
| `onRust` | `#EFE6D1` | 4.85:1 | 4.85:1 on rust. |
| `onRustFaint` | `#DDBFA2` | 3.45:1 | Secondary text on rust. 3.45:1 — large text and UI only. |
| `rustDeep` | `#743A21` | 1.47:1 | Tone-on-tone display type on rust. 1.47:1, deliberately. |
| `rustHover` | `#894226` | 3.76:1, 5.90:1 | Pressed / hover ground for a rust control. Darker, not brighter: cream on ember is only 3.76:1, so brightening would break the label. 5.90:1. |
| `onSage` | `#1C150F` | 10.40:1 | 10.40:1 on sage. |
| `onSageMuted` | `#514A3E` | 5.05:1 | 5.05:1 on sage, derived from the sage hue rather than a neutral grey. |
| `onSageLine` | `#AEA88F` | — |  |
| `onGold` | `#1C150F` | 10.60:1 | 10.60:1 on gold. |
| `onGoldMuted` | `#5C481F` | 5.13:1 | 5.13:1 on gold, derived from the gold hue. |
| `onGoldLine` | `#CCA43D` | — |  |
| `goldDeep` | `#B99436` | 1.68:1 | Tone-on-tone display type on gold — the resting state of the scroll reveal. 1.68:1, deliberately near-invisible. |
| `onEspresso` | `#EFE6D1` | 14.57:1 | 14.57:1 on espresso. |
| `onEspressoMuted` | `#B2A792` | 7.59:1 | 7.59:1 on espresso. |
| `onEspressoFaint` | `#928876` | 5.16:1 | 5.16:1 on espresso — the floor, for legal rows. |
| `onEspressoLine` | `rgba(239,230,209,0.16)` | — |  |
| `espressoRaise` | `#2D261E` | — | Panels lifted off the espresso ground. |
| `espressoBorder` | `#3A3229` | — | Visible borders on a dark ground. |

## v2 — the cold palette

| token | value | measured | note |
|---|---|---|---|
| `ink` | `#171D1D` | 14.05:1, 17.07:1 | Dark bands and primary text. 14.05:1 on `wash`, 17.07:1 on `white`. |
| `wash` | `#E6EAE6` | — | The pale grey-green light band — the page's default ground. |
| `washSoft` | `#EDF0ED` | — | A lighter variant of `wash`, for a band that needs to lift slightly. |
| `white` | `#FFFFFF` | — | Card ground lifted off `wash` / `washSoft`. |
| `accent` | `#F0C044` | 1.40:1, 1.70:1, 10.02:1 | Mode 7 gold. A GROUND, not a text colour — see the accent rule above. 1.40:1 on wash, 1.70:1 on white, 10.02:1 on ink. |
| `accentOn` | `#1C150F` | 10.02:1 | What sits ON gold: labels, headings, button text. 10.02:1. |
| `accentText` | `#79662F` | 4.60:1, 5.59:1 | Gold pushed dark enough to be small text on a LIGHT ground. 4.60:1 on wash, 5.59:1 on white. Use wherever the accent has to be type rather than a f… |
| `muted` | `#5A6160` | 5.21:1, 6.34:1 | Secondary text on the light grounds. 5.21:1 on wash, 6.34:1 on white. |
| `faint` | `#AAB0AE` | 7.75:1 | Secondary text on the `ink` bands. 7.75:1. |
| `navy` | `#14213D` | 1.70:1, 9.38:1, 4.5:1, 3:1, 15.97:1 | Navy — not part of the core warm palette (that's `ink`/`wash`/`accent`), added specifically for the `/services` category-pill nav, whose band sits … |

