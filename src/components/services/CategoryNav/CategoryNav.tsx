"use client";

import type { MouseEvent } from "react";
import content from "@/content/services.json";

export function CategoryNav() {
  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="svc-nav w-full">
      <div className="svc-nav__inner mx-auto flex flex-wrap">
        {content.nav.pills.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            onClick={(e) => scrollTo(e, p.id)}
            className="svc-pill inline-flex items-center no-underline cursor-pointer"
          >
            {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}
