import Link from "next/link";
import { FONT, stripe } from "@/lib/theme";

/**
 * Catalogue cards shared by Shop, Smart Home and Green Energy: a striped
 * placeholder with a `▣ LABEL`, then a name/price or name/sub row.
 */

export function CategoryCard({
  label,
  sub,
  href = "/shop",
  height = 200,
}: {
  label: string;
  sub: string;
  href?: string;
  height?: number;
}) {
  return (
    <Link
      href={href}
      className="m7-lift"
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ececec",
        borderRadius: 4,
        overflow: "hidden",
        background: "#fcfcfc",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          height,
          background: stripe(),
          borderBottom: "1px solid #ececec",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 18,
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 1,
            color: "#9a9a9a",
          }}
        >
          ▣ {label.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.3px",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14, color: "#8a8a8a", marginTop: 4 }}>{sub}</div>
      </div>
    </Link>
  );
}

export function ProductCard({
  name,
  meta,
  price,
  href = "/product",
  height = 220,
}: {
  name: string;
  meta: string;
  price: string;
  href?: string;
  height?: number;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          background: stripe(),
          border: "1px solid #e2e2e2",
          height,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 18,
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: 1,
            color: "#9a9a9a",
          }}
        >
          ▣ {name.toUpperCase()}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "-0.2px",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 13, color: "#9a9a9a", marginTop: 3 }}>{meta}</div>
        </div>
        <div
          style={{
            fontFamily: FONT.head,
            fontWeight: 700,
            fontSize: 18,
            whiteSpace: "nowrap",
          }}
        >
          {price}
        </div>
      </div>
    </Link>
  );
}
