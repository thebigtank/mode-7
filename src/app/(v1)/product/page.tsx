import type { Metadata } from "next";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOverview, ProductSpecs } from "@/components/product/ProductOverview";
import { ProductRelated } from "@/components/product/ProductRelated";

export const metadata: Metadata = {
  title: "Mode Flagship X — Mode 7",
  description:
    "A flagship device vetted, sealed and guaranteed by Mode 7 — trade in your old device to bring the price down.",
};

export default function ProductPage() {
  return (
    <>
      <section className="m7-wrap m7-top-sm">
        <ProductBreadcrumb current="Mode Flagship X" />

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <ProductGallery />
          <ProductBuyBox />
        </div>
      </section>

      <section className="m7-wrap m7-top-lg">
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 4vw, 56px)",
            alignItems: "start",
          }}
        >
          <ProductOverview />
          <ProductSpecs />
        </div>
      </section>

      <ProductRelated />
    </>
  );
}
