import { ButtonV2 } from "@/components/ui/ButtonV2";
import { Mono } from "@/components/ui/Mono";
import { logos } from "@/lib/content";
import { V2 } from "@/lib/theme-v2";

export function AboutHero() {
  return (
    <>
      <section className="a-hero">
        <div className="a-wrap">
        <div className="a-hero__grid">
          <div className="a-stack" data-rv>
            <Mono dot>About Mode 7</Mono>
            <h1 className="a-hero-h1">
              Owning good technology should never be a gamble.
            </h1>
          </div>
          <div className="a-stack" data-rv>
            <p className="a-lede">
              Mode 7 is a technology hub built on one observation — that buying a
              device, powering it and upgrading it are separate problems, and almost
              nobody solves them together.
            </p>
            <div>
              <ButtonV2
                label="Explore Our Services"
                variant="fill"
                href="/services"
              />
            </div>
          </div>
        </div>

        <div className="a-hero__meta" data-rv>
          <span className="a-label">Founded 2019</span>
          <span className="a-label">12 cities</span>
          <span className="a-label">50K+ devices vetted</span>
          <span className="a-label">{logos.length} premium brands</span>
        </div>
        </div>
      </section>

      <div className="a-hero2" data-rv>
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet="/hero/about-hero-portrait.webp"
            width={941}
            height={1672}
          />
          <img
            className="a-hero2__img"
            src="/hero/about-hero.webp"
            width={1672}
            height={941}
            alt="A technician in white gloves polishing a smartphone at an inspection bench, with precision screwdrivers, a loupe, tweezers and cleaning supplies laid out around them."
          />
        </picture>
        <div className="a-hero2__content">
          <Mono dot tone="white">About Mode 7</Mono>
          <h2 className="a-hero2__h">
            A device is only as good as everything standing behind it.
          </h2>
          <p className="a-hero2__lede">
            Every unit carrying our name is sourced, inspected, sealed and
            warrantied by us.
          </p>
          <div className="a-hero2__actions">
            <ButtonV2 label="Explore Our Services" variant="fill" href="/services" />
            <ButtonV2
              label="Value Your Device"
              variant="outline"
              href="/trade-in"
              onDark
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
            />
          </div>
        </div>
        <div className="a-hero2__card">
          <div className="a-hero2__card-n">50K+</div>
          <div className="a-hero2__card-l">Devices vetted &amp; sealed</div>
        </div>
      </div>
    </>
  );
}
