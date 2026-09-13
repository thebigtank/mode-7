import { Annotation } from "@/components/wireframe/Primitives";
import content from "@/content/product.json";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";
import type { CSSProperties } from "react";

const ANNOTATION_SIZE = { fontSize: 10, padding: "6px 13px" };

function Thumb({ label }: { label: string }) {
  return (
    <div className="product-gallery__thumb relative overflow-hidden">
      <div className="product-gallery__label absolute">▣ {label}</div>
    </div>
  );
}

export function ProductGallery() {
  const c = content.gallery;

  return (
    <div
      className="product-gallery relative flex flex-col"
      style={{ "--product-gallery-stripe": stripe() } as CSSProperties}
    >
      <div className="product-gallery__main relative overflow-hidden">
        <div className="product-gallery__label absolute">▣ {c.mainLabel}</div>
        {WIREFRAME.showAnnotations && (
          <div className="product-gallery__annot absolute z-[2]">
            <Annotation style={ANNOTATION_SIZE}>{c.annotation}</Annotation>
          </div>
        )}
      </div>
      <div className="product-gallery__thumbs grid">
        {c.thumbs.map((v) => (
          <Thumb key={v} label={v} />
        ))}
      </div>
    </div>
  );
}
