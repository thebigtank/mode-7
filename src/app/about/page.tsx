import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { RevealController } from "@/components/about/RevealController";
import { WhyStatement } from "@/components/about/WhyStatement";
import { WIREFRAME } from "@/lib/wireframe-config";

export const metadata: Metadata = {
  title: "About — Mode 7",
  description:
    "Mode 7 is a technology hub built on one observation: buying a device, powering it and upgrading it are separate problems, and almost nobody solves them together.",
};

/* ------------------------------------------------------------------ data */

const conditions = [
  {
    n: "01",
    t: "Power is not a given",
    b: "Grid supply is intermittent, and planning around it is ordinary life rather than an emergency. A device is only as useful as the energy behind it — which is why panels, inverters and batteries sit in our catalogue beside the laptops, not in a separate business.",
  },
  {
    n: "02",
    t: "Trust is scarce",
    b: 'Grey imports. Refurbished units sold as new. Warranties that evaporate on first contact. "Sealed" is a claim most of this market cannot actually back, so we made verification a documented process with a paper trail — and only then started using the word.',
  },
  {
    n: "03",
    t: "Hardware is expensive against income",
    b: "A flagship device can cost several months of earnings. Certified refurbished is not a lesser tier for people who cannot afford better — for most buyers it is the difference between having the tool and going without it entirely.",
  },
  {
    n: "04",
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
    n: "01",
    t: "Premium Devices",
    b: "Flagship phones, business laptops and pro tablets across thirteen brands. Genuine, factory-sealed, inspected before dispatch, and covered by the manufacturer's warranty as well as ours.",
    ref: "Answers 02",
    cls: "a-b1",
    fill: true,
  },
  {
    n: "02",
    t: "Certified Refurbished",
    b: "Renewed, graded and sealed again — a fifty-point inspection, a twelve-month warranty, and the exact grade published before you buy rather than discovered after.",
    ref: "Answers 02 · 03",
    cls: "a-b2",
  },
  {
    n: "03",
    t: "Energy & Solar",
    b: "Panels, inverters, home batteries and portable power. Sized against real consumption — so everything else in the catalogue keeps working when the grid doesn't.",
    ref: "Answers 01",
    cls: "a-b3 a-bcell--ink",
  },
  {
    n: "04",
    t: "Smart Home",
    b: "Lighting, climate and security as compatible kits you start small and extend — never a whole-house commitment made in one go.",
    ref: "Answers 01 · 03",
    cls: "a-b4",
  },
  {
    n: "05",
    t: "Trade-In & Upgrade",
    b: "A valuation in about a minute, applied instantly against anything in store. Capital sitting idle inside an old device becomes the deposit on the next one, without a negotiation.",
    ref: "Answers 03 · 04",
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

/* --------------------------------------------------------------- helpers */

function Overline({ children }: { children: string }) {
  return <div className="a-over">{`// ${children}`}</div>;
}

/* -------------------------------------------------------------------- page */

export default function AboutPage() {
  return (
    <div className="about-page">
      <RevealController />

      {/* ===== HERO ===== */}
      <section className="a-wrap a-hero">
        <div className="a-hero__grid">
          <div className="a-stack" data-rv>
            <Overline>About Mode 7</Overline>
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
              <ArrowButton
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
          <span className="a-label">13 premium brands</span>
        </div>

        <div className="a-ph a-hero__band" data-rv>
          <span className="a-ph__tag">
            ▣ WORKSHOP — INTAKE &amp; VERIFICATION BENCH
          </span>
          {WIREFRAME.showAnnotations && (
            <span
              className="a-note"
              style={{ position: "absolute", right: 18, bottom: 18 }}
            >
              PARALLAX IMAGE REVEAL
            </span>
          )}
        </div>
      </section>

      {/* ===== WHY WE EXIST ===== */}
      <section className="a-band">
        <div className="a-wrap a-split a-split--sticky">
          <div className="a-sticky a-stack" data-rv>
            <Overline>Why We Exist</Overline>
            <h2 className="a-dl">
              We didn&apos;t set out to open another storefront.
            </h2>
          </div>
          <div className="a-stack a-stack--lg">
            <p className="a-body" data-rv>
              We set out to close a gap. Someone saves for months, buys a flagship
              device from a seller they cannot verify, and finds out too late that the
              box was opened, the warranty is fiction, or the battery has already been
              replaced once. The device is genuine or it isn&apos;t — and there is
              rarely a way to know before the money moves.
            </p>
            <p className="a-body" data-rv>
              So we built the opposite of that. Every unit carrying our name is
              sourced, inspected, sealed and warrantied by us. When it later needs
              power or replacing, those answers come from the same place. We sell the
              way people actually buy here, too — in conversation, questions answered
              before money moves, rather than a form bolted on top of a habit that was
              never going to change.
            </p>
            <WhyStatement />
          </div>
        </div>
      </section>

      {/* ===== THE CONDITIONS ===== */}
      <section className="a-band a-band--wash">
        <div className="a-wrap">
          <div className="a-split a-split--wide">
            <div className="a-stack" data-rv>
              <Overline>The Conditions We Build For</Overline>
              <h2 className="a-dl">
                Every part of this business answers something specific.
              </h2>
            </div>
            <p className="a-body" data-rv style={{ fontSize: 17 }}>
              We are not a general-purpose retailer that happens to operate here. These
              four conditions shape the market we serve — and each one is the reason a
              particular part of Mode 7 exists.
            </p>
          </div>

          <div className="a-ledger">
            {conditions.map((c) => (
              <article className="a-cond" data-rv key={c.n}>
                <div className="a-num a-cond__n">{c.n}</div>
                <h3 className="a-cond__t">{c.t}</h3>
                <p className="a-cond__b">{c.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="a-band a-band--ink">
        <div className="a-wrap">
          <div data-rv>
            <Overline>Mission &amp; Vision</Overline>
          </div>
          <div className="a-mv">
            <div className="a-mv__cell" data-rv>
              <span className="a-label">Mission</span>
              <p className="a-dm" style={{ color: "#fff" }}>
                To make premium technology dependable.
              </p>
              <p className="a-body">
                Sourced, verified, powered and renewed against a single standard — so
                that owning it is never a risk the buyer carries alone.
              </p>
            </div>
            <div className="a-mv__cell" data-rv>
              <span className="a-label">Vision</span>
              <p className="a-dm" style={{ color: "#fff" }}>
                A market where trust is the default, not the exception.
              </p>
              <p className="a-body">
                Every device with a verifiable history. Every home in control of its
                own power. Upgrading decided by what you need — never by whether the
                seller can be believed.
              </p>
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
              <Overline>Who We Serve</Overline>
              <h2 className="a-dl">
                Three people walk in with three different problems.
              </h2>
            </div>
            <p className="a-body" data-rv style={{ fontSize: 17 }}>
              The catalogue is the same. What changes is the question being asked of
              it — and the part of the ecosystem that ends up answering.
            </p>
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
                <p className="a-body" style={{ fontSize: 16 }}>
                  {s.b}
                </p>
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
              <Overline>What We Focus On</Overline>
              <h2 className="a-dl">Five divisions, one accountable standard.</h2>
            </div>
            <p className="a-body" data-rv style={{ fontSize: 17 }}>
              Each division exists because of a condition named above. The reference
              under each one says which it answers.
            </p>
          </div>

          <div className="a-bento">
            {divisions.map((d) => (
              <article className={`a-bcell ${d.cls}`} data-rv key={d.n}>
                <span className="a-bcell__n">{d.n}</span>
                <h3 className="a-bcell__t">{d.t}</h3>
                <p className="a-bcell__b">{d.b}</p>
                {d.fill && <div className="a-bcell__fill" aria-hidden="true" />}
                <span className="a-ref a-num">{d.ref}</span>
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
              <Overline>The Standard</Overline>
              <h2 className="a-dl">Three words, and what they oblige us to.</h2>
            </div>
            <p className="a-body" data-rv style={{ fontSize: 17 }}>
              They only mean anything if one party is willing to stand behind all
              three. So we publish what each one commits us to, and apply it to every
              unit we sell.
            </p>
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
