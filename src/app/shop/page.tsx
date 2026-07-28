import type { Metadata } from "next";
import { ChevronDownIcon } from "@/components/Icons";
import { PageHero } from "@/components/page/Blocks";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Annotation } from "@/components/wireframe/Primitives";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Shop — Mode 7",
  description:
    "Phones, laptops, smart-home kit, solar and certified refurbished — every unit vetted, sealed and guaranteed.",
};

/**
 * Shop.
 *
 * The hero deliberately carries no CTA: the grid below is the action, and a
 * "View Cart" button at the top of a shopping page sends people away from the
 * thing they came to do. The old category pill row is gone for the same reason
 * — it duplicated the Category filter, and two controls for one job is worse
 * than one.
 */
export default function ShopPage() {
  return (
    <>
      <PageHero
        overline="Shop"
        title={<>Premium technology, ready to&nbsp;ship.</>}
        intro="Phones, laptops, smart-home kit, solar and certified refurbished — every unit vetted, sealed and guaranteed."
      />

      {/* filters + grid */}
      <section className="m7-wrap m7-top-md">
        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "clamp(18px, 3vw, 40px)",
            alignItems: "start",
          }}
        >
          <aside className="m7-shop-aside" style={{ position: "sticky", top: 100 }}>
            <ShopFilters />
            {WIREFRAME.showAnnotations && (
              <div className="m7-shop-note" style={{ marginTop: 18 }}>
                <Annotation style={{ fontSize: 10, padding: "6px 13px" }}>
                  LIVE FILTER + SORT — GRID UPDATES
                </Annotation>
              </div>
            )}
          </aside>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 26,
                borderBottom: "1px solid #ececec",
                paddingBottom: 18,
              }}
            >
              <div style={{ fontSize: 15, color: "#8a8a8a" }}>
                Showing <span style={{ color: "#121212", fontWeight: 600 }}>48</span>{" "}
                products
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 15,
                }}
              >
                <span style={{ color: "#8a8a8a" }}>Sort</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    border: "1px solid #e2e2e2",
                    borderRadius: 4,
                    padding: "9px 14px",
                    color: "#3a3a3a",
                  }}
                >
                  Featured
                  <span style={{ display: "inline-flex", color: "#9a9a9a" }}>
                    <ChevronDownIcon size={16} />
                  </span>
                </div>
              </div>
            </div>

            <ProductGrid />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 44,
              }}
            >
              {["1", "2", "3", "4", "→"].map((n, i) => (
                <div
                  key={n}
                  style={{
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${i === 0 ? "#121212" : "#e2e2e2"}`,
                    background: i === 0 ? "#121212" : "#fff",
                    color: i === 0 ? "#fff" : "#3a3a3a",
                    borderRadius: 4,
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>

            {WIREFRAME.showAnnotations && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 26,
                }}
              >
                <Annotation style={{ fontSize: 10, padding: "6px 13px" }}>
                  ASK SEVEN — AI PRODUCT BRIEF ON EVERY CARD
                </Annotation>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
