import Link from "next/link";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { V2, V2_CONTAINER, V2_FONT, V2_HAIR, V2_TYPE } from "@/lib/theme-v2";

/**
 * Shared primitives for the `/homepage-v2` exploration.
 *
 * Nothing here is used by a v1 component, and nothing here imports the Mode 7
 * `COLOR` or `FONT` tokens — v2 has its own palette (`V2`) and its own type
 * stack (`V2_FONT`), both of which stop at this directory.
 *
 * Every size below is the measured value from the reference at a 1440px
 * viewport, expressed so it degrades sensibly on narrow screens: the display
 * sizes clamp down, the body sizes do not (16px is already the floor).
 */

/** Full-bleed ground with the 1280px inner container every v2 section uses. */
export function Band({
  ground,
  children,
  style,
  pad = "clamp(64px,7vw,104px)",
  padBottom,
}: {
  ground: string;
  children: ReactNode;
  style?: CSSProperties;
  pad?: string;
  padBottom?: string;
}) {
  return (
    <section style={{ background: ground, ...style }}>
      <div
        style={{
          ...V2_CONTAINER,
          padding: `${pad} clamp(20px,4vw,48px) ${padBottom ?? pad}`,
        }}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * THE site-wide eyebrow. Outfit 12px uppercase, tracked 0.04em, with an
 * optional leading gold dot. Was JetBrains Mono at a wider 0.08em; moving to
 * a proportional face at that tracking read loose and uneven letter-to-
 * letter, so it is retuned to 0.04em (`V2_TYPE.mono`) — see CLAUDE.md's
 * Typography table for why the mono face was dropped.
 *
 * This is now the ONE eyebrow treatment for every v2 surface, `/about`
 * included — CLAUDE.md calls it out by name ("one eyebrow standard, matching
 * homepage-v2"). `/about` used to declare its own local `Overline()` helper
 * painting a serif, non-uppercase label at 0.02em with a "// " text prefix;
 * that duplication is gone — `/about` now imports this component directly,
 * passing `dot` and an explicit `color` per band (`V2.faint` on the one ink
 * band, default `V2.muted` elsewhere) exactly as `WorkV2`/`WhyV2`/`QuoteV2`
 * already do. Do not fork a page-local eyebrow again; add a prop here if a
 * genuine new variation shows up.
 *
 * `dot` renders the reference's leading bullet. The reference's bullet is
 * orange; here it is `V2.accent` gold, which is legal because the dot is a
 * GRAPHIC, not text — the accent rule constrains type, not fills. The label
 * beside it never takes gold on a light ground (1.40:1 / 1.70:1); pass
 * `V2.accentText` when the label itself has to read as accented.
 */
export function Mono({
  children,
  color = V2.muted,
  dot = false,
  dotColor,
  style,
}: {
  children: ReactNode;
  color?: string;
  dot?: boolean;
  dotColor?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: V2_FONT.mono,
        fontSize: V2_TYPE.mono.fontSize,
        fontWeight: 400,
        letterSpacing: V2_TYPE.mono.letterSpacing,
        lineHeight: 1.4,
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {dot ? (
        <span
          aria-hidden
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            flex: "0 0 auto",
            background: dotColor ?? V2.accent,
          }}
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}

/**
 * The reference's buttons are near-square blocks, not pills: 4px radius, Inter
 * 16px/500, roughly 24px of horizontal padding on a 48px box.
 */
const BTN_BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  minHeight: 48,
  padding: "13px 24px",
  borderRadius: 4,
  fontFamily: V2_FONT.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "22px",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

/**
 * Filled block. Gold ground with an INK label — white on gold is 1.70:1 and is
 * never used. Where the reference puts its orange primary, this is the gold
 * equivalent; where the reference puts a black primary, pass `ground={V2.ink}`
 * and `color={V2.white}`.
 */
export function BtnFill({
  label,
  href,
  ground = V2.accent,
  color = V2.accentOn,
  style,
}: {
  label: string;
  href: string;
  ground?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      style={{ ...BTN_BASE, background: ground, color, ...style }}
    >
      {label}
    </Link>
  );
}

/** Outline block. 1px border, transparent ground, same 4px radius. */
export function BtnOutline({
  label,
  href,
  color = V2.ink,
  border,
  style,
}: {
  label: string;
  href: string;
  color?: string;
  border?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      style={{
        ...BTN_BASE,
        background: "transparent",
        color,
        border: `1px solid ${border ?? color}`,
        ...style,
      }}
    >
      {label}
    </Link>
  );
}

/**
 * The reference's tertiary action: a plain label followed by a ringed arrow,
 * no box. Used for "how we help", "explore", "read case study", "read more".
 *
 * `href` is optional. Omit it for a link that has no destination yet: rather
 * than point an `<a>` at `#` or a no-op `onClick` (a broken/misleading anchor
 * that still reads as "link" to a screen reader and still eats a Tab stop),
 * the component renders a plain `<span>` — same type, same ringed-arrow glyph,
 * `aria-hidden` because it asserts nothing an assistive-tech user can act on.
 * It is not in the tab order (no `tabIndex`, no `role`), so it cannot become a
 * keyboard trap or announce itself as actionable. It is a visual affordance
 * only, matching the linked variant's look with none of its behaviour.
 */
export function ArrowLink({
  label,
  href,
  color = V2.ink,
  size = 16,
  weight = 500,
  style,
}: {
  label: string;
  href?: string;
  color?: string;
  size?: number;
  weight?: number;
  style?: CSSProperties;
}) {
  const bodyStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    fontFamily: V2_FONT.body,
    fontSize: size,
    fontWeight: weight,
    lineHeight: "22px",
    color,
    textDecoration: "none",
    ...style,
  };

  if (!href) {
    return (
      <span aria-hidden style={bodyStyle}>
        {label}
        <RingArrow color={color} />
      </span>
    );
  }

  return (
    <Link href={href} style={bodyStyle}>
      {label}
      <RingArrow color={color} />
    </Link>
  );
}

/** The ringed arrow glyph that trails every tertiary link in the reference. */
export function RingArrow({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      style={{ flex: "0 0 auto" }}
    >
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1" />
      <path
        d="M6.6 10h6.8M10.6 7.2 13.4 10l-2.8 2.8"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Display heading. `V2_FONT.display` — Noto Serif — at the measured
 * 40/48/-0.4px, clamping down on narrow screens. `size`/`lineHeight` override
 * it for the two places the reference departs from the h2 step (the 64px h1,
 * the 48px insights head).
 *
 * The 1.2 default survives the Instrument Serif -> Noto Serif swap unchanged,
 * and it is the one display leading on the page that needed no adjustment:
 * Noto Serif's ink is ~1.01em tall (0.77 above the baseline, 0.24 below,
 * measured), so 1.2 at 40px leaves 0.19em — comfortable at h2 size, where the
 * hero's 1.16 would be too tight. The -0.4px tracking is a FIXED px value, so
 * it relaxes to nothing as `size` clamps down; that was true of the old face
 * too and is left alone.
 */
export function H2({
  children,
  color = V2.ink,
  size = "clamp(30px,3.1vw,40px)",
  lineHeight = 1.2,
  style,
  as = "h2",
}: {
  children: ReactNode;
  color?: string;
  size?: string;
  lineHeight?: number | string;
  style?: CSSProperties;
  as?: "h2" | "h3" | "p";
}) {
  const Tag = as;
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: V2_FONT.display,
        fontWeight: 400,
        fontSize: size,
        lineHeight,
        letterSpacing: V2_TYPE.h2.letterSpacing,
        color,
        textWrap: "pretty",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * THE site-wide body-copy paragraph: Outfit 16/400, muted by default. Now
 * shared by `/about` (which used to render its own CSS-classed `.a-body` —
 * see the removed rule of that name in `globals.css`) as well as every v2
 * section here.
 *
 * `fontWeight` is a literal `400`, not `300` — Outfit is only registered at
 * 400/500/600/700 in `layout.tsx` (no 300), so a `300` value here was already
 * snapping to 400 everywhere it rendered; this states what actually renders
 * instead of a weight the font can't produce.
 *
 * `fontSize`/`lineHeight` stay literal defaults rather than reading the
 * global `--m7-p-size`/`--m7-p-line` tokens (15px/1.6, declared in
 * `globals.css` for v1's running copy): those tokens would change this
 * component's default from 16px/1.55 to 15px/1.6 everywhere it is used
 * without an explicit `size`, which is a rendered-type change on
 * `/homepage-v2` this pass was not asked to make. Revisit if the two scales
 * are ever meant to unify — flagged, not silently done.
 *
 * `...rest` forwards arbitrary `<p>` attributes (`data-rv`, `id`, `aria-*`)
 * so callers — `/about`'s scroll-reveal paragraphs, in particular — can still
 * hook into `RevealController` without the component knowing anything about
 * it.
 */
export function P({
  children,
  color = V2.muted,
  size = V2_TYPE.body.fontSize,
  style,
  ...rest
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<"p">, "children" | "style" | "color">) {
  return (
    <p
      {...rest}
      style={{
        margin: 0,
        fontFamily: V2_FONT.body,
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.55,
        color,
        textWrap: "pretty",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * THE site-wide accordion indicator: a circular hairline ring holding a
 * centred 2px-stroke "+" that rotates 45deg into an "×" when `open`. Shared
 * by every v2 FAQ/accordion — `/services`' `Faq.tsx` and `/trade-in`'s
 * `TradeInFaq.tsx` both render this instead of drawing their own icon (a
 * bordered-circle-plus-SVG on `/services`, a CSS `content:"+"` pseudo-element
 * on `/trade-in`, previously two different treatments for the same job), so
 * the size/radius/stroke/rotation are defined exactly once.
 *
 * Purely presentational and `aria-hidden`: the caller's own toggle element
 * owns the click handler, `aria-expanded` and keyboard semantics (a real
 * `<button>`) — this renders only the glyph.
 *
 * The rotation's `transition` lives in the `.v2-plus-toggle` global rule in
 * `globals.css` (next to the other cross-page, palette-free v2 utility —
 * `m7arrowLoop`/`m7arrowLoopUp` — rather than in any one page's scoped
 * block, since this renders on every v2 page that has an accordion), NOT
 * inline: an inline `transition` would out-specify that rule's
 * `prefers-reduced-motion` override (CLAUDE.md trap #2), so only the
 * per-instance `transform` (open vs closed) is set inline here.
 */
export function PlusToggle({
  open,
  size = 30,
  color = V2.ink,
  border,
  style,
}: {
  open: boolean;
  size?: number;
  color?: string;
  border?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className="v2-plus-toggle"
      style={{
        flex: "0 0 auto",
        width: size,
        height: size,
        border: border ?? V2_HAIR,
        borderRadius: 99,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        ...style,
      }}
    >
      <svg
        width={Math.round(size * 0.5)}
        height={Math.round(size * 0.5)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
  );
}
