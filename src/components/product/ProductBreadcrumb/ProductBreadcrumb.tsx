import Link from "next/link";

export function ProductBreadcrumb({ current }: { current: string }) {
  return (
    <div className="product-breadcrumb">
      <Link href="/shop" className="product-breadcrumb__link">
        Shop
      </Link>{" "}
      / Phones / <span className="product-breadcrumb__current">{current}</span>
    </div>
  );
}
