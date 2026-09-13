import { Annotation } from "@/components/wireframe/Primitives";
import { stripe } from "@/lib/theme";
import { WIREFRAME } from "@/lib/wireframe-config";

function Thumb({ label }: { label: string }) {
  return (
    <div className="product-gallery__thumb" style={{ background: stripe() }}>
      <div className="product-gallery__label">▣ {label}</div>
    </div>
  );
}

export function ProductGallery() {
  return (
    <div className="product-gallery">
      <div className="product-gallery__main" style={{ background: stripe() }}>
        <div className="product-gallery__label">▣ PRODUCT — MAIN VIEW</div>
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
      <div className="m7-c4 product-gallery__thumbs">
        {["VIEW 1", "VIEW 2", "VIEW 3", "VIEW 4"].map((v) => (
          <Thumb key={v} label={v} />
        ))}
      </div>
    </div>
  );
}
