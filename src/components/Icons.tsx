import type { ReactNode } from "react";

/**
 * Inline Lucide SVGs (24×24, stroke 2, round caps) plus the social marks.
 * Kept inline rather than pulled from a package so the wireframe stays
 * dependency-free and every stroke matches the source design.
 */

const lucide = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const SearchIcon = ({ size = 21 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

/** Lucide `handbag` — the live shopping cart. */
export const BagIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="M2.048 18.566A2 2 0 0 0 4.041 21h15.918a2 2 0 0 0 1.993-2.434l-1.43-10A2 2 0 0 0 18.55 6H5.45a2 2 0 0 0-1.982 1.566z" />
    <path d="M8 11V6a4 4 0 0 1 8 0v5" />
  </svg>
);

/**
 * A storefront: a scalloped awning over a shopfront with a door — reads as
 * "shop" without borrowing the bag's silhouette, so the two sit next to each
 * other in the header without being confusable.
 */
export const StoreIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="M3 10 4 4h16l1 6" />
    <path d="M3 10q2.25 3.5 4.5 0q2.25 3.5 4.5 0q2.25 3.5 4.5 0q2.25 3.5 4.5 0" />
    <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
    <path d="M10 20v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
  </svg>
);

export const ArrowRightIcon = ({
  size = 22,
  strokeWidth = 2,
  stroke = "currentColor",
  style,
}: {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CloseIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const SendIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} {...lucide}>
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </svg>
);

/** The brand-strip asterisk mark. */
export const AsteriskMark = ({ size = 34 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 34"
    fill="none"
    stroke="#121212"
    strokeWidth={2}
    strokeLinecap="round"
    style={{ flex: "0 0 auto" }}
  >
    <line x1="17" y1="3" x2="17" y2="31" />
    <line x1="3" y1="17" x2="31" y2="17" />
    <line x1="7.5" y1="7.5" x2="26.5" y2="26.5" />
    <line x1="26.5" y1="7.5" x2="7.5" y2="26.5" />
  </svg>
);

export type Social = { name: string; icon: ReactNode };

export const socials: Social[] = [
  {
    name: "Instagram",
    icon: (
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x={2} y={2} width={20} height={20} rx={5} />
        <circle cx={12} cy={12} r={4} />
        <circle cx={17.5} cy={6.5} r={0.6} fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X",
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
      </svg>
    ),
  },
];
