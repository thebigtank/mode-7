import { ChevronDownIcon } from "@/components/Icons";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/shop.json";
import { WIREFRAME } from "@/lib/wireframe-config";

const ANNOTATION_SIZE = { fontSize: 10, padding: "6px 13px" };

export function ShopBrowse() {
  const c = content.browse;

  return (
    <section className="m7-wrap m7-top-md">
      <div className="shop-browse grid">
        <aside className="m7-shop-aside shop-browse__aside">
          <ShopFilters />
          {WIREFRAME.showAnnotations && (
            <div className="m7-shop-note shop-browse__note">
              <Annotation style={ANNOTATION_SIZE}>{c.filterNote}</Annotation>
            </div>
          )}
        </aside>

        <div>
          <div className="shop-browse__toolbar flex flex-wrap items-center justify-between">
            <div className="shop-browse__count">
              {c.countPrefix}{" "}
              <span className="shop-browse__count-n">{c.countValue}</span>{" "}
              {c.countSuffix}
            </div>
            <div className="shop-browse__sort flex items-center">
              <span className="shop-browse__sort-label">{c.sortLabel}</span>
              <div className="shop-browse__sort-control flex items-center">
                {c.sortValue}
                <span className="shop-browse__sort-icon inline-flex">
                  <ChevronDownIcon size={16} />
                </span>
              </div>
            </div>
          </div>

          <ProductGrid />

          <div className="shop-browse__pagination flex justify-center">
            {c.pages.map((n, i) => (
              <div
                key={n}
                className="shop-browse__page flex items-center justify-center cursor-pointer"
                data-active={i === 0 || undefined}
              >
                {n}
              </div>
            ))}
          </div>

          {WIREFRAME.showAnnotations && (
            <div className="shop-browse__ai-note flex justify-center">
              <Annotation style={ANNOTATION_SIZE}>{c.aiNote}</Annotation>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
