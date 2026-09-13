import type { Metadata } from "next";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOverview, ProductSpecs } from "@/components/product/ProductOverview";
import { ProductRelated } from "@/components/product/ProductRelated";
import content from "@/content/product.json";

export const metadata: Metadata = {
  title: "Mode Flagship X — Mode 7",
  description:
    "A flagship device vetted, sealed and guaranteed by Mode 7 — trade in your old device to bring the price down.",
};

export default function ProductPage() {
  return (
    <>
      <section className="m7-wrap m7-top-sm">
        <ProductBreadcrumb current={content.buybox.title} />

        <div className="product-split grid" data-split="media">
          <ProductGallery />
          <ProductBuyBox />
        </div>
      </section>

      <section className="m7-wrap m7-top-lg">
        <div className="product-split grid" data-split="even">
          <ProductOverview />
          <ProductSpecs />
        </div>
      </section>

      <ProductRelated />
    </>
  );
}
