import { ArrowButton } from "@/components/ArrowButton";
import { ProductCard } from "@/components/page/Cards";

const bestSellers = [
  { name: "Smart Bulb A60", meta: "Smart Lighting", price: "£19" },
  { name: "Dimmer Wall Switch", meta: "Switches & Plugs", price: "£34" },
  { name: "Smart Plug Mini", meta: "Switches & Plugs", price: "£15" },
  { name: "Voice Hub Speaker", meta: "Voice & Control", price: "£89" },
  { name: "Motion Sensor", meta: "Sensors", price: "£24" },
  { name: "Indoor Camera 2K", meta: "Cameras & Security", price: "£79" },
  { name: "Smart Thermostat", meta: "Climate", price: "£149" },
  { name: "Bridge Hub", meta: "Hubs & Bridges", price: "£59" },
];

export function BestSellers() {
  return (
    <section className="sh-section">
      <div className="flex justify-between items-end gap-[40px] flex-wrap mb-[34px]">
        <div>
          <div className="sh-eyebrow">{"// Popular Right Now"}</div>
          <h2 className="sh-bestsellers__title">Smart-home best sellers.</h2>
        </div>
        <ArrowButton label="View all products" variant="outline" href="/shop" />
      </div>

      <div
        className="m7-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "14px 18px",
        }}
      >
        {bestSellers.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </section>
  );
}
