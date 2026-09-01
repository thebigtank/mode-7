import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { V2, V2_CONTAINER, V2_FONT, V2_TYPE } from "@/lib/theme-v2";

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
 * The small uppercase label: JetBrains Mono 12px, wide tracking.
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
  href: string;
  color?: string;
  size?: number;
  weight?: number;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      style={{
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
      }}
    >
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

/** Body paragraph: Inter 16/300, muted by default. */
export function P({
  children,
  color = V2.muted,
  size = V2_TYPE.body.fontSize,
  style,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: V2_FONT.body,
        fontWeight: 300,
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
