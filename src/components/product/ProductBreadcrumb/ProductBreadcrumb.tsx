import Link from "next/link";
import content from "@/content/product.json";

export function ProductBreadcrumb({ current }: { current: string }) {
  const c = content.breadcrumb;

  return (
    <div className="product-breadcrumb">
      <Link href={c.rootHref} className="product-breadcrumb__link">
        {c.rootLabel}
      </Link>{" "}
      / {c.category} /{" "}
      <span className="product-breadcrumb__current">{current}</span>
    </div>
  );
}
