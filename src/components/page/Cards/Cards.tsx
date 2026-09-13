import Link from "next/link";
import { stripe } from "@/lib/theme";

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
    <Link href={href} className="m7-lift pgc-category">
      <div
        className="pgc-category__media"
        style={{ height, background: stripe() }}
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
    <Link href={href} className="pgc-product">
      <div
        className="pgc-product__media"
        style={{ height, background: stripe() }}
      >
        <div className="pgc-product__label">▣ {name.toUpperCase()}</div>
      </div>
      <div className="pgc-product__row">
        <div>
          <div className="pgc-product__name">{name}</div>
          <div className="pgc-product__meta">{meta}</div>
        </div>
        <div className="pgc-product__price">{price}</div>
      </div>
    </Link>
  );
}
