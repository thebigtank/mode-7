import { ChevronDownIcon } from "@/components/Icons";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

const PAGES = ["1", "2", "3", "4", "→"];

export function ShopBrowse() {
  return (
    <section className="m7-wrap m7-top-md">
      <div className="shop-browse">
        <aside className="m7-shop-aside shop-browse__aside">
          <ShopFilters />
          {WIREFRAME.showAnnotations && (
            <div className="m7-shop-note shop-browse__note">
              <Annotation style={{ fontSize: 10, padding: "6px 13px" }}>
                LIVE FILTER + SORT — GRID UPDATES
              </Annotation>
            </div>
          )}
        </aside>

        <div>
          <div className="shop-browse__toolbar">
            <div className="shop-browse__count">
              Showing <span className="shop-browse__count-n">48</span> products
            </div>
            <div className="shop-browse__sort">
              <span className="shop-browse__sort-label">Sort</span>
              <div className="shop-browse__sort-control">
                Featured
                <span className="shop-browse__sort-icon">
                  <ChevronDownIcon size={16} />
                </span>
              </div>
            </div>
          </div>

          <ProductGrid />

          <div className="shop-browse__pagination">
            {PAGES.map((n, i) => (
              <div key={n} className="shop-browse__page" data-active={i === 0 || undefined}>
                {n}
              </div>
            ))}
          </div>

          {WIREFRAME.showAnnotations && (
            <div className="shop-browse__ai-note">
              <Annotation style={{ fontSize: 10, padding: "6px 13px" }}>
                ASK SEVEN — AI PRODUCT BRIEF ON EVERY CARD
              </Annotation>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
