import { P } from "@/components/ui/P";
import content from "@/content/about.json";

export function ServeGrid() {
  const { items } = content.serve;
  return (
    <div className="a-serve">
      {items.map((s) => (
        <article className="a-serve__c" data-rv key={s.i}>
          <span className="a-num a-serve__i">{s.i}</span>
          <h3 className="a-hs">{s.t}</h3>
          <P className="text-[16px] max-w-[66ch]">{s.b}</P>
        </article>
      ))}
    </div>
  );
}
