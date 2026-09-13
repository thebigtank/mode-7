import type { Metadata } from "next";
import Link from "next/link";
import { ArrowButton } from "@/components/ArrowButton";
import { ProductCard } from "@/components/page/Cards";
import { Annotation } from "@/components/wireframe/Primitives";
import { PRODUCTS, priceLabel } from "@/lib/catalogue";
import { FONT, stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "Mode Flagship X — Mode 7",
  description:
    "A flagship device vetted, sealed and guaranteed by Mode 7 — trade in your old device to bring the price down.",
};

const specs: [string, string][] = [
  ["Display", '6.7" OLED 120Hz'],
  ["Chip", "Mode A-series"],
  ["Storage", "128 / 256 / 512 GB"],
  ["Camera", "Triple 50MP system"],
  ["Battery", "All-day, fast charge"],
  ["Warranty", "2 years"],
];

const related = ["studio-headphones", "smart-hub", "pro-tablet", "home-battery"]
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter((p) => p !== undefined)
  .map((p) => ({ name: p.name, meta: p.meta, price: priceLabel(p) }));

const flagship = PRODUCTS.find((p) => p.id === "flagship-x")!;

const optionLabel = {
  fontFamily: FONT.mono,
  fontSize: 11,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  color: "#8a8a8a",
  marginBottom: 12,
};

function Option({ label, on }: { label: string; on?: boolean }) {
  return (
    <div
      style={{
        padding: "11px 20px",
        borderRadius: 4,
        border: `1px solid ${on ? "#121212" : "#e2e2e2"}`,
        background: on ? "#121212" : "#fff",
        color: on ? "#fff" : "#3a3a3a",
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

function Thumb({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        background: stripe(),
        border: "1px solid #e2e2e2",
        height: "clamp(72px, 9vw, 110px)",
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
        ▣ {label}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <section className="m7-wrap m7-top-sm">
        <div style={{ fontSize: 13, color: "#9a9a9a", marginBottom: 26 }}>
          <Link href="/shop" style={{ color: "#9a9a9a", textDecoration: "none" }}>
            Shop
          </Link>{" "}
          / Phones / <span style={{ color: "#3a3a3a" }}>Mode Flagship X</span>
        </div>

        <div
          className="m7-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                background: stripe(),
                border: "1px solid #e2e2e2",
                height: "clamp(300px, 46vw, 520px)",
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
                ▣ PRODUCT — MAIN VIEW
              </div>
              {WIREFRAME.showAnnotations && (
                <Annotation
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 18,
                    fontSize: 10,
                    padding: "6px 13px",
                    zIndex: 2,
                  }}
                >
                  IMAGE GALLERY — THUMBNAIL SWITCH
                </Annotation>
              )}
            </div>
            <div
              className="m7-c4"
              style={{ gap: "clamp(10px, 1.4vw, 14px)" }}
            >
              {["VIEW 1", "VIEW 2", "VIEW 3", "VIEW 4"].map((v) => (
                <Thumb key={v} label={v} />
              ))}
            </div>
          </div>

          <div className="m7-buybox" style={{ position: "sticky", top: 100 }}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#9a9a9a",
                marginBottom: 14,
              }}
            >
              Premium · Sealed · Guaranteed
            </div>
            <h1
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(28px, 4.2vw, 40px)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                margin: "0 0 14px",
              }}
            >
              Mode Flagship X
            </h1>
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 30px)",
                marginBottom: 6,
              }}
            >
              {priceLabel(flagship)}
            </div>
            <div style={{ fontSize: 14, color: "#8a8a8a", marginBottom: 26 }}>
              or around ₦77,000/mo over 24 months · trade in to bring this down
            </div>

            <div style={optionLabel}>Storage</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <Option label="128GB" />
              <Option label="256GB" on />
              <Option label="512GB" />
            </div>

            <div style={optionLabel}>Condition</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
              <Option label="New" on />
              <Option label="Certified Refurbished" />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ArrowButton label="Add to Cart" variant="fill" href="/cart" />
              <ArrowButton
                label="Trade in toward this"
                variant="outline"
                href="/trade-in#value-your-device"
              />
            </div>

            <div
              style={{
                marginTop: 16,
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#8a8a8a",
              }}
            >
              Have a device to trade? Value it in about a minute and we take the
              estimate off this price — you bring the difference, not{" "}
              {priceLabel(flagship)}.
            </div>

            <div
              style={{
                marginTop: 26,
                border: "1px solid #ececec",
                borderRadius: 4,
                padding: "18px 20px",
                fontSize: 14,
                color: "#7a7a7a",
                lineHeight: 1.6,
              }}
            >
              Free next-day delivery · 2-year warranty · 30-day returns. Ask Seven for
              setup help any time.
            </div>
          </div>
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
          <div>
            <div
              style={{
                fontFamily: FONT.head,
                fontSize: 12,
                letterSpacing: 2,
                color: "#9a9a9a",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {"// Overview"}
            </div>
            <h2
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: "clamp(24px, 3.4vw, 32px)",
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                margin: "0 0 22px",
                textWrap: "balance",
              }}
            >
              Engineered for the everyday premium.
            </h2>
            <p
              style={{
                fontSize: "var(--m7-lede-size)",
                lineHeight: 1.65,
                color: "#5a5a5a",
                margin: "4px 0 0",
              }}
            >
              A flagship device vetted, sealed and guaranteed by Mode 7 — with a
              trade-in route and Seven support built in from day one.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Specifications
            </div>
            {specs.map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom:
                    i === specs.length - 1 ? undefined : "1px solid #f0f0f0",
                }}
              >
                <span style={{ color: "#8a8a8a" }}>{k}</span>
                <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m7-wrap m7-top-lg">
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9a9a",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {"// You May Also Like"}
        </div>
        <h2
          style={{
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: "clamp(26px, 3.6vw, 34px)",
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            margin: "0 0 22px",
            textWrap: "balance",
          }}
        >
          Complete the setup.
        </h2>
        <div
          className="m7-c4"
          style={{ gap: "clamp(12px, 1.6vw, 14px)", marginTop: 30 }}
        >
          {related.map((p) => (
            <ProductCard key={p.name} {...p} height={260} />
          ))}
        </div>
      </section>
    </>
  );
}
