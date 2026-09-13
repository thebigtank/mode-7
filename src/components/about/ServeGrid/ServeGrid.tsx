import { P } from "@/components/ui/P";

const serve = [
  {
    i: "01",
    t: "Professionals & creators",
    b: "People whose income depends on the device in their hand. It has to be genuine, it has to arrive quickly, and it has to keep working through a day that doesn't pause.",
  },
  {
    i: "02",
    t: "Families",
    b: "Homes built up in stages — a room, a system, a season at a time. Lighting and power first, comfort next, without being forced to commit to one ecosystem on day one.",
  },
  {
    i: "03",
    t: "Businesses & fleets",
    b: "Teams equipping staff at volume — consolidated invoicing, a named account manager, and a refresh cycle that can actually be planned against a budget.",
  },
];

export function ServeGrid() {
  return (
    <div className="a-serve">
      {serve.map((s) => (
        <article className="a-serve__c" data-rv key={s.i}>
          <span className="a-num a-serve__i">{s.i}</span>
          <h3 className="a-hs">{s.t}</h3>
          <P style={{ fontSize: 16, maxWidth: "66ch" }}>
            {s.b}
          </P>
        </article>
      ))}
    </div>
  );
}
