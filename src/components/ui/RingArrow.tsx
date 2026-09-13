export function RingArrow({
  color,
  size = 20,
  className,
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={["shrink-0", className].filter(Boolean).join(" ")}
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
