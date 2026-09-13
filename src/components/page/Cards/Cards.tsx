import type { CSSProperties } from "react";
import Link from "next/link";

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
    <Link href={href} className="m7-lift pgc-category block">
      <div
        className="pgc-category__media"
        style={{ "--pgc-media-h": `${height}px` } as CSSProperties}
      >
        <div className="pgc-category__label">▣ {label.toUpperCase()}</div>
      </div>
      <div className="pgc-category__body">
        <div className="pgc-category__title">{label}</div>
        <div className="pgc-category__sub">{sub}</div>
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
    <Link href={href} className="pgc-product flex flex-col">
      <div
        className="pgc-product__media"
        style={{ "--pgc-media-h": `${height}px` } as CSSProperties}
      >
        <div className="pgc-product__label">▣ {name.toUpperCase()}</div>
      </div>
      <div className="pgc-product__row flex justify-between items-baseline">
        <div>
          <div className="pgc-product__name">{name}</div>
          <div className="pgc-product__meta">{meta}</div>
        </div>
        <div className="pgc-product__price whitespace-nowrap">{price}</div>
      </div>
    </Link>
  );
}
