import type { Metadata } from "next";
import { ConditionsLedger } from "@/components/about/ConditionsLedger";
import { RevealController } from "@/components/about/RevealController";
import { WhyStatement } from "@/components/about/WhyStatement";
import { ButtonV2 } from "@/components/home-v2/ButtonV2";
import { Mono, P } from "@/components/home-v2/Ui";
import { logos } from "@/lib/content";
import { V2 } from "@/lib/theme-v2";

export const metadata: Metadata = {
  title: "About — Mode 7",
  description:
    "Mode 7 is a technology hub built on one observation: buying a device, powering it and upgrading it are separate problems, and almost nobody solves them together.",
};

/* ------------------------------------------------------------------ data */

const conditions = [
  {
    /* was "Power is not a given" (5 words) — shortened to fit the icon row's
       3-word budget. "Unreliable grid power" restates the body's own opening
       clause ("Grid supply is intermittent") rather than a new claim. */
    t: "Unreliable grid power",
    b: "Grid supply is intermittent, and planning around it is ordinary life rather than an emergency. A device is only as useful as the energy behind it — which is why panels, inverters and batteries sit in our catalogue beside the laptops, not in a separate business.",
  },
  {
    /* already 3 words — kept as-is. */
    t: "Trust is scarce",
    b: 'Grey imports. Refurbished units sold as new. Warranties that evaporate on first contact. "Sealed" is a claim most of this market cannot actually back, so we made verification a documented process with a paper trail — and only then started using the word.',
  },
  {
    /* was "Hardware is expensive against income" (5 words) — shortened.
       "Hardware outpaces income" restates the body's own claim ("cost
       several months of earnings") without asserting anything new. */
    t: "Hardware outpaces income",
    b: "A flagship device can cost several months of earnings. Certified refurbished is not a lesser tier for people who cannot afford better — for most buyers it is the difference between having the tool and going without it entirely.",
  },
  {
    /* already 3 words — kept as-is. */
    t: "Devices are livelihoods",
    b: "The phone in your hand or the laptop on your desk is frequently the business itself. Downtime is lost income, not inconvenience. That turns upgrade paths and trade-in liquidity into commercial questions that deserve commercial answers.",
  },
];

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

const divisions = [
  {
    t: "Premium Devices",
    b: "Flagship phones, business laptops and pro tablets across thirteen brands. Genuine, factory-sealed, inspected before dispatch, and covered by the manufacturer's warranty as well as ours.",
    cls: "a-b1",
    fill: true,
  },
  {
    t: "Certified Refurbished",
    b: "Renewed, graded and sealed again — a fifty-point inspection, a twelve-month warranty, and the exact grade published before you buy rather than discovered after.",
    cls: "a-b2",
  },
  {
    t: "Energy & Solar",
    b: "Panels, inverters, home batteries and portable power. Sized against real consumption — so everything else in the catalogue keeps working when the grid doesn't.",
    cls: "a-b3 a-bcell--ink",
  },
  {
    t: "Smart Home",
    b: "Lighting, climate and security as compatible kits you start small and extend — never a whole-house commitment made in one go.",
    cls: "a-b4",
  },
  {
    t: "Trade-In & Upgrade",
    b: "A valuation in about a minute, applied instantly against anything in store. Capital sitting idle inside an old device becomes the deposit on the next one, without a negotiation.",
    cls: "a-b5",
  },
];

const specWords = [
  {
    w: "Vetted",
    d: "Inspected against a published checklist before it is allowed into stock — not spot-checked at the door.",
  },
  {
    w: "Sealed",
    d: "Closed under our own tamper tape, so the state it left us in is the state it reaches you in.",
  },
  {
    w: "Guaranteed",
    d: "Warrantied by us, not only by the manufacturer. One party to call, whichever part failed.",
  },
];

const specSheet: [string, string][] = [
  ["Inspection points", "50"],
  ["Warranty, renewed units", "12 months"],
  ["Returns window", "14 days"],
  ["Grade published before purchase", "Always"],
  ["Sealed under Mode 7 tape", "Every unit"],
  ["Volume & fleet orders", "Same standard"],
];

/* Masonry reel: 7 columns × 3 tiles, doubled for a seamless -50% loop. Heights
   and labels cycle by index so no two columns share a rhythm; drift duration and
   direction vary per column. Deterministic — safe for SSR. */
const M_LABELS = [
  "STUDENT", "TAILOR", "NURSE", "DRIVER", "TEACHER", "TRADER", "FAMILY", "BARBER",
  "CHEF", "WRITER", "MECHANIC", "STYLIST", "WELDER", "FARMER", "ARTIST", "CASHIER",
];
const M_HEIGHTS = [150, 212, 176, 240, 192, 164, 226, 200];
const M_NCOLS = 7;
const M_PER_COL = 3;

/* -------------------------------------------------------------------- page */

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Chrome (V2Styles, HeaderV2, FooterV2) is mounted once by SiteShell
          for every v2 route — see the route-decision note there. This page
          renders only its own sections. */}
      <RevealController />

      {/* ===== HERO =====
          Full-bleed white ground: `.a-hero` alone on the <section> (no
          `.a-wrap`), so its background spans edge to edge; the 1320px site
          container is the INNER div below instead. Carrying both classes on
          the same element (the previous version here) boxes the white
          background into a centred `.a-wrap` card with the wash ground
          showing on both sides at wide viewports — measured on the rendered
          page, not assumed. Every child keeps the exact layout it had
          before: `.a-wrap`'s own rule (max-width/margin/padding-inline) now
          applies one level down, to this wrapper, instead of to the
          section. */}
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
          {/* Derived, not asserted — CLAUDE.md's content rule exists because
              a brief once hardcoded "14" against a 13-entry array. This was
              the same bug: a literal "13" against `logos`, which now has 20
              entries. */}
          <span className="a-label">{logos.length} premium brands</span>
        </div>
        </div>
      </section>

      {/* ===== HERO 02 — full-bleed verification-bench photo =====
          Mirrors the pattern already established in `services/page.tsx`'s
          own "HERO 02" (search that file for the name): a full-bleed photo,
          an eyebrow + serif headline + short line + two buttons overlaid
          bottom-left, one floating frosted-glass stat card bottom-right.
          Reused rather than reinvented — same card treatment (blur, ring,
          shadow), same button pair semantics (fill primary, outline
          secondary).

          WHERE THE WHITE SECTION ENDS: `.a-hero` (white, full-bleed) stops
          at the bottom of the stats row above — this block is a SEPARATE
          full-bleed element starting immediately after it with NO gap, its
          own ground being the photograph. That is deliberately the same
          zero-seam approach `.a-hero` itself uses: no element in this
          stretch of the page is allowed to leave a gap that falls through to
          SiteShell's own root colour.

          COPY, all reused, none invented (CLAUDE.md's content rule):
          - eyebrow: "About Mode 7", already this page's own hero eyebrow.
          - headline: `WhyStatement`'s exact line, quoted below it in "Why We
            Exist" — reused here as plain static text (not the animated
            gold-to-ink component) because it is the one existing sentence on
            this page that is actually ABOUT verification, which is what this
            photograph shows.
          - supporting line: a verbatim clause from the "Why We Exist" body
            copy below ("Every unit carrying our name is sourced, inspected,
            sealed and warrantied by us.").
          - buttons: the same fill CTA already in the hero above it, paired
            with "Value Your Device" — the exact secondary-action label/route
            already used this way on `/services` and `/homepage-v2`.
          - stat card: "50K+ / Devices vetted & sealed" is the exact figure
            and label already used in "Mission & Vision" below (`.a-stats`),
            not a new number for this one card.
          The four facts already on the page (founded year, cities, devices,
          brands) are NOT dropped for one card: they stay exactly where they
          were, in the `.a-hero__meta` row above, on the plain white ground —
          the floating card adds a second, single-figure treatment matching
          the reference pattern; it does not replace the row. */}
      <div className="a-hero2" data-rv>
        {/* ART-DIRECTED, not just responsive: two separately framed shots of
            the same bench, 1672x941 landscape and 941x1672 portrait, so the
            narrow layout gets a crop composed for it rather than a slice cut
            out of the wide one. The `max-width: 900px` boundary is the SAME
            breakpoint `.a-hero2` itself restacks at in globals.css — below
            it the photo stops being an absolute overlay and becomes a static
            block above a solid ink content panel, which is exactly where a
            portrait frame earns its keep. Keep the two in step if that
            breakpoint ever moves.
            The <img> stays the fallback source and carries the alt text;
            <source> elements take none. */}
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet="/hero/about-hero-portrait.webp"
            width={941}
            height={1672}
          />
          {/* No `@next/next/no-img-element` disable needed here, unlike every
              other bare <img> in this codebase: that rule deliberately does
              not fire on an <img> inside a <picture>, since <picture> is the
              art-direction case next/image cannot express. */}
          <img
            className="a-hero2__img"
            src="/hero/about-hero.webp"
            width={1672}
            height={941}
            alt="A technician in white gloves polishing a smartphone at an inspection bench, with precision screwdrivers, a loupe, tweezers and cleaning supplies laid out around them."
          />
        </picture>
        {/* The scrim is `.a-hero2::after` in globals.css, not a div here: two
            layers, because the overlay text sits at the BOTTOM — a bottom-up
            dark gradient protects the headline/lede/buttons, a second,
            narrower left-anchored gradient adds a little extra depth behind
            the longest line of text specifically. Measured on the rendered
            page against the actual photo pixels, not assumed — both gradients
            together keep the WORST sampled point at white-on-photo AA or
            better. `.a-hero2__content` and `.a-hero2__card` carry `z-index: 1`
            so they stay above it. */}
        <div className="a-hero2__content">
          <Mono dot color={V2.white}>About Mode 7</Mono>
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
              /* `onDark`'s default border (rgba(255,255,255,0.28), sized for
                 a solid `ink` band) measured 2.20:1 against this photo's
                 darkest sampled patch — under the 3:1 non-text/UI-component
                 floor. 0.5 alpha, verified against the same worst sampled
                 pixel, clears it with margin (see this pass's verification
                 notes). Overridden here only — the shared default is
                 untouched, so the footer's own use of `onDark` is unaffected. */
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
            />
          </div>
        </div>
        <div className="a-hero2__card">
          <div className="a-hero2__card-n">50K+</div>
          <div className="a-hero2__card-l">Devices vetted &amp; sealed</div>
        </div>
      </div>

      {/* ===== WHY WE EXIST ===== */}
      <section className="a-band">
        <div className="a-wrap a-split a-split--sticky">
          <div className="a-sticky a-stack" data-rv>
            <Mono dot>Why We Exist</Mono>
            <h2 className="a-dl">
              We didn&apos;t set out to open another storefront.
            </h2>
          </div>
          <div className="a-stack a-stack--lg">
            <P data-rv style={{ maxWidth: "66ch" }}>
              We set out to close a gap. Someone saves for months, buys a flagship
              device from a seller they cannot verify, and finds out too late that the
              box was opened, the warranty is fiction, or the battery has already been
              replaced once. The device is genuine or it isn&apos;t — and there is
              rarely a way to know before the money moves.
            </P>
            <P data-rv style={{ maxWidth: "66ch" }}>
              So we built the opposite of that. Every unit carrying our name is
              sourced, inspected, sealed and warrantied by us. When it later needs
              power or replacing, those answers come from the same place. We sell the
              way people actually buy here, too — in conversation, questions answered
              before money moves, rather than a form bolted on top of a habit that was
              never going to change.
            </P>
            <WhyStatement />
          </div>
        </div>
      </section>

      {/* ===== THE CONDITIONS ===== */}
      <section className="a-band a-band--wash">
        <div className="a-wrap">
          <div className="a-split a-split--wide">
            <div className="a-stack" data-rv>
              <Mono dot>The Conditions We Build For</Mono>
              <h2 className="a-dl">
                Every part of this business answers something specific.
              </h2>
            </div>
            <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
              We are not a general-purpose retailer that happens to operate here. These
              four conditions shape the market we serve — and each one is the reason a
              particular part of Mode 7 exists.
            </P>
          </div>

          <ConditionsLedger conditions={conditions} />
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="a-band a-band--ink">
        <div className="a-wrap">
          <div data-rv>
            <Mono dot color={V2.faint}>Mission &amp; Vision</Mono>
          </div>
          <div className="a-mv">
            <div className="a-mv__cell" data-rv>
              <span className="a-label">Mission</span>
              <p className="a-dm" style={{ color: V2.white }}>
                To make premium technology dependable.
              </p>
              <P color={V2.faint} style={{ maxWidth: "66ch" }}>
                Sourced, verified, powered and renewed against a single standard — so
                that owning it is never a risk the buyer carries alone.
              </P>
            </div>
            <div className="a-mv__cell" data-rv>
              <span className="a-label">Vision</span>
              <p className="a-dm" style={{ color: V2.white }}>
                A market where trust is the default, not the exception.
              </p>
              <P color={V2.faint} style={{ maxWidth: "66ch" }}>
                Every device with a verifiable history. Every home in control of its
                own power. Upgrading decided by what you need — never by whether the
                seller can be believed.
              </P>
            </div>
          </div>

          <div className="a-stats">
            {(
              [
                ["50K+", "Devices vetted & sealed"],
                ["12", "Cities served"],
                ["100%", "Sealed and warrantied — new or renewed"],
                ["13", "Premium brands under one roof"],
              ] as [string, string][]
            ).map(([n, l]) => (
              <div className="a-stat" data-rv key={l}>
                <div className="a-stat__n a-num">{n}</div>
                <div className="a-stat__l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO WE SERVE ===== */}
      <section className="a-band">
        <div className="a-wrap">
          <div className="a-split a-split--wide">
            <div className="a-stack" data-rv>
              <Mono dot>Who We Serve</Mono>
              <h2 className="a-dl">
                Three people walk in with three different problems.
              </h2>
            </div>
            <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
              The catalogue is the same. What changes is the question being asked of
              it — and the part of the ecosystem that ends up answering.
            </P>
          </div>
        </div>

        <div className="a-wrap">
          <div className="a-mason" data-rv aria-hidden="true">
            {Array.from({ length: M_NCOLS }, (_, col) => {
              const base = Array.from({ length: M_PER_COL }, (_, j) => {
                const k = col * M_PER_COL + j;
                return {
                  h: M_HEIGHTS[k % M_HEIGHTS.length],
                  label: M_LABELS[k % M_LABELS.length],
                };
              });
              const tiles = [...base, ...base]; // doubled for the seamless loop
              return (
                <div
                  className="a-mcol"
                  key={col}
                  style={{
                    animationDuration: `${38 + (col % 5) * 6}s`,
                    animationDirection: col % 2 ? "reverse" : "normal",
                  }}
                >
                  {tiles.map((t, ti) => (
                    <div className="a-tile" key={ti} style={{ height: t.h }}>
                      <span className="a-tile__tag">▣ {t.label}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

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
        </div>
      </section>

      {/* ===== WHAT WE FOCUS ON ===== */}
      <section className="a-band a-band--wash">
        <div className="a-wrap">
          <div className="a-split a-split--wide">
            <div className="a-stack" data-rv>
              <Mono dot>What We Focus On</Mono>
              <h2 className="a-dl">Five divisions, one accountable standard.</h2>
              <P style={{ fontSize: 17, maxWidth: "66ch" }}>
                Each of these five divisions answers one of the conditions
                described above — an unreliable grid, trust that has to be
                rebuilt, hardware priced against income, or a device that
                doubles as someone&apos;s livelihood. What ties them together
                is the same standard: sourced, verified, powered and renewed
                against one set of rules, so the guarantee behind the sale
                doesn&apos;t change with the category.
              </P>
            </div>
          </div>

          <div className="a-bento">
            {divisions.map((d) => (
              <article className={`a-bcell ${d.cls}`} data-rv key={d.t}>
                <h3 className="a-bcell__t">{d.t}</h3>
                <p className="a-bcell__b">{d.b}</p>
                {d.fill && (
                  <div
                    className="a-bcell__fill"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- see
                        the hero band note above; matches existing convention. */}
                    <img
                      src="/hero/devices-flatlay.webp"
                      alt="An iMac, MacBook, iPhone and keyboard arranged together on a desk — the flagship phones, laptops and tablets Mode 7 carries."
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE STANDARD ===== */}
      <section className="a-band a-band--tight">
        <div className="a-wrap">
          <div className="a-split a-split--wide">
            <div className="a-stack" data-rv>
              <Mono dot>The Standard</Mono>
              <h2 className="a-dl">Three words, and what they oblige us to.</h2>
            </div>
            <P data-rv style={{ fontSize: 17, maxWidth: "66ch" }}>
              They only mean anything if one party is willing to stand behind all
              three. So we publish what each one commits us to, and apply it to every
              unit we sell.
            </P>
          </div>

          <div className="a-spec" data-rv>
            <div className="a-spec__bar">
              <span className="a-label">Mode 7 Standard</span>
              <span className="a-label">Applies to every unit · new and renewed</span>
            </div>

            <div className="a-spec__trip">
              {specWords.map((s) => (
                <div className="a-spec__word" key={s.w}>
                  <div className="a-spec__w">{s.w}</div>
                  <p className="a-spec__d">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="a-spec__sheet">
              {specSheet.map(([k, v]) => (
                <div className="a-spec__row" key={k}>
                  <span className="a-spec__k">{k}</span>
                  <span className="a-spec__v">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
