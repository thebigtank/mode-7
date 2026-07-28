"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";
import { SearchSelect } from "@/components/SearchSelect";
import { WIREFRAME } from "@/lib/wireframe-config";
import {
  MODELS,
  SCREEN,
  STORAGE,
  UPGRADES,
  type Answers,
  type Category,
  conditionAnswered,
  contactIssues,
  emptyAnswers,
  evidenceCount,
  evidenceDone,
  formatNaira,
  modelFor,
  upgradeMath,
  valuate,
} from "@/lib/valuation";

/**
 * The Intelligent Trade-In Portal's valuation workspace.
 *
 * An interview on the left, a live ledger on the right. Every answer posts a
 * named line item and the figure rebuilds in front of the customer — the point
 * being that no deduction is ever applied quietly.
 *
 * This ledger is the ONE place on the page a valuation is shown. The wireframe
 * also teased an empty copy of it up in the hero, which never populated; that
 * has been removed rather than wired up, so there is a single source of truth.
 *
 * TWO RULES THIS FILE EXISTS TO ENFORCE:
 *
 * 1. Nothing here is ever "confirmed". Every figure the customer sees is an
 *    estimate. A confirmed figure comes from the team only — by email once
 *    they have reviewed the photos and video, or in person at the office once
 *    they physically have the device. Do not reintroduce the word.
 *
 * 2. A trade-in cannot be locked in without all four uploads. The team values
 *    from that evidence, so the CTA stays shut until it is all attached.
 */

const CATEGORIES: { id: Category; title: string; sub: string }[] = [
  { id: "phone", title: "Phone", sub: "Most traded" },
  { id: "laptop", title: "Laptop", sub: "Business & pro" },
  { id: "tablet", title: "Tablet", sub: "Pro tablets" },
];

const PHOTO_TILES = [
  { key: "front", label: "PHOTO — FRONT", file: "IMG_4021-front.jpg" },
  { key: "back", label: "PHOTO — BACK", file: "IMG_4022-back.jpg" },
  { key: "screen", label: "PHOTO — SCREEN ON", file: "IMG_4023-screen.jpg" },
] as const;

/** Stable reference number — no randomness, so server and client agree. */
const REF = "M7-4820";

/** Placeholder `[key, value]` bar widths for the pre-answer ledger. */
const GHOST_ROWS = [
  [78, 62],
  [104, 54],
  [66, 58],
] as const;

type ChipProps = {
  label: string;
  pressed: boolean;
  warn?: boolean;
  onClick: () => void;
};

function Chip({ label, pressed, warn, onClick }: ChipProps) {
  return (
    <button
      type="button"
      className={`t-chip${warn ? " t-chip--warn" : ""}`}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Question({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: { v: string; label: string; warn?: boolean }[];
  value: string | null;
  onPick: (v: string) => void;
}) {
  return (
    <div className="t-q">
      <div className="t-q__l">{label}</div>
      <div className="t-chips">
        {options.map((o) => (
          <Chip
            key={o.v}
            label={o.label}
            warn={o.warn}
            pressed={value === o.v}
            onClick={() => onPick(o.v)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * A contact field. Errors only surface once the field has been touched and
 * blurred — validating as someone types tells them they're wrong before
 * they've finished being right.
 */
function Field({
  label,
  hint,
  type = "text",
  autoComplete,
  value,
  invalid,
  onChange,
}: {
  label: string;
  hint: string;
  type?: string;
  autoComplete?: string;
  value: string;
  invalid: boolean;
  onChange: (v: string) => void;
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const show = touched && invalid;

  return (
    <div className="t-field">
      <label className="t-q__l" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="t-input"
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={show}
        onBlur={() => setTouched(true)}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="t-field__h" data-error={show}>
        {show ? hint : " "}
      </div>
    </div>
  );
}

/**
 * Below 940px the interview runs as a wizard: one question at a time, in
 * place, instead of four stacked panels you scroll between. Desktop keeps the
 * full spine — the whole point there is seeing the ledger rebuild beside every
 * answer, which needs both columns on screen at once.
 *
 * The five mobile steps map onto the four desktop groups; group 01 splits into
 * "which category" and "which model", which is a single card on desktop.
 */
const WIZARD_STEPS = [
  { key: "category", group: 0, label: "Category" },
  { key: "device", group: 0, label: "Model" },
  { key: "condition", group: 1, label: "Condition" },
  { key: "evidence", group: 2, label: "Photos" },
  { key: "contact", group: 3, label: "Contact" },
] as const;

const WIZARD_QUERY = "(max-width: 939px)";

export function ValuationWorkspace() {
  const [a, setA] = useState<Answers>(emptyAnswers);
  const outcomeRef = useRef<HTMLDivElement | null>(null);
  const [checking, setChecking] = useState(false);
  const [step, setStep] = useState(0);
  const [isWizard, setIsWizard] = useState(false);
  const stepTopRef = useRef<HTMLDivElement | null>(null);
  const ledgerRef = useRef<HTMLElement | null>(null);
  /**
   * null means "follow the layout" — collapsed in wizard mode, open on
   * desktop. Once the customer toggles it, their choice sticks.
   */
  const [linesOverride, setLinesOverride] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(WIZARD_QUERY);
    const sync = () => setIsWizard(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const set = useCallback(
    (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch })),
    [],
  );

  const model = modelFor(a);
  const v = valuate(a);
  const ineligible = v.reasons.length > 0;
  const deviceDone = !!model && a.storageIdx != null;
  const condOK = conditionAnswered(a) && !ineligible;
  const uploads = evidenceCount(a);
  const evidenceOK = evidenceDone(a);
  const badContact = contactIssues(a);
  const contactOK = badContact.length === 0;
  /**
   * Two hard gates: the team cannot value a device they can't see, and they
   * cannot send a confirmed figure to a customer they can't reach.
   */
  const canLock =
    v.mid > 0 && conditionAnswered(a) && !ineligible && evidenceOK && contactOK;

  const linesOpen = linesOverride ?? !isWizard;

  const upgrade = UPGRADES.find((u) => u.id === a.upgradeId) ?? null;
  const um = upgrade ? upgradeMath(upgrade.price, v) : null;

  // scroll the locked-in outcome into view once it appears
  useEffect(() => {
    if (!a.locked || !outcomeRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    outcomeRef.current.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [a.locked]);

  /**
   * Switching category restarts the interview, but contact details are about
   * the person, not the device — retyping your name because you picked Laptop
   * instead of Phone would be its own small insult.
   */
  function pickCategory(cat: Category) {
    setA((prev) => ({
      ...emptyAnswers(),
      cat,
      fullName: prev.fullName,
      email: prev.email,
      phone: prev.phone,
    }));
    // A category is one decisive tap, so it carries you straight on. Every
    // other step needs several answers and waits for Continue instead.
    if (isWizard) setStep(1);
  }

  function togglePhoto(key: keyof Answers["photos"]) {
    setA((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: !prev.photos[key] },
    }));
  }

  function lockIn() {
    setChecking(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setChecking(false);
        set({ locked: true });
      },
      reduce ? 0 : 900,
    );
  }

  function reset() {
    setA((prev) => ({
      ...emptyAnswers(),
      fullName: prev.fullName,
      email: prev.email,
      phone: prev.phone,
    }));
    setStep(0);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  /**
   * Always a range. Collapsing to a single number would read as a settled
   * price, and nothing here is settled — evidence only narrows the spread.
   */
  const isRange = !ineligible && v.mid > 0;
  const figure = ineligible
    ? formatNaira(v.mid)
    : v.mid > 0
      /* Thin spaces around the dash on purpose: the ₦ glyph carries two
         horizontal crossbars at the same optical height as an en dash, so
         "₦1,010,000–₦1,190,000" set tight reads as a struck-through figure.
         The gap breaks that chain. */
      ? `${formatNaira(v.lo)}\u2009–\u2009${formatNaira(v.hi)}`
      : "₦ —";

  /** Why the CTA is shut, in the order the customer hits each gate. */
  const waitLabel = !deviceDone
    ? "Choose a device to continue"
    : !condOK
      ? "Answer condition to continue"
      : !evidenceOK
        ? `Attach all 4 uploads — ${uploads}/4 done`
        : "Add your contact details to continue";

  // ------------------------------------------------------------ wizard state
  /** Whether the current step has been answered well enough to move on. */
  const stepDone = [
    !!a.cat,
    deviceDone,
    condOK,
    evidenceOK,
    contactOK,
  ];
  const lastStep = WIZARD_STEPS.length - 1;
  const activeGroup = WIZARD_STEPS[step].group;

  /** Why Continue is disabled, phrased for the step you're actually on. */
  const stepHint = [
    "Pick a category to continue",
    !a.model ? "Choose your model" : "Pick a storage size",
    ineligible ? "This device can’t be valued automatically" : "Answer every question to continue",
    `Attach all 4 uploads — ${uploads}/4 done`,
    "Fill in your name, email and phone",
  ][step];

  /** Move the step into view without scrolling the page around the customer. */
  const goto = useCallback((next: number) => {
    setStep(next);
    const el = stepTopRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // only pull the panel back up if it has drifted off the top of the screen
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="t-ws">
      {/* ---------------------------------------------------------- interview */}
      <div>
        <div className="t-rail" aria-hidden="true">
          <span className={`t-rail__s${deviceDone ? " on" : ""}`} />
          <span className={`t-rail__s${condOK ? " on" : ""}`} />
          <span className={`t-rail__s${evidenceOK ? " on" : ""}`} />
          <span className={`t-rail__s${contactOK ? " on" : ""}`} />
        </div>

        {/* Frozen once submitted, so the estimate on file can't drift from the
            answers the team was actually sent. Reset is the way back. */}
        <div className="t-steps" data-sent={a.locked} ref={stepTopRef}>
          {/* 01 · DEVICE — one card on desktop, two wizard steps on mobile */}
          <div className="t-grp" data-active={activeGroup === 0}>
            <div className="t-sub" data-active={step === 0}>
              <div className="t-grp__h">
                <span className="t-grp__n">01</span>
                <h3 className="t-grp__t">What are you trading in?</h3>
              </div>
              <p className="t-grp__hint">
                Pick a category, then choose your device from the list we currently accept
                for trade-in.
              </p>
              <div className="t-cat" role="group" aria-label="Device type">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="t-catc"
                    aria-pressed={a.cat === c.id}
                    onClick={() => pickCategory(c.id)}
                  >
                    <span className="t-catc__ph" />
                    <span className="t-catc__t">{c.title}</span>
                    <span className="t-catc__s">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {a.cat && (
              <div className="t-sub" data-active={step === 1}>
                {/* only titled on mobile, where this is a step in its own right */}
                <div className="t-grp__h t-wiz-only">
                  <span className="t-grp__n">02</span>
                  <h3 className="t-grp__t">Which one is it?</h3>
                </div>
                <SearchSelect
                  label={`Model — ${MODELS[a.cat].length} accepted`}
                  placeholder="Choose your device…"
                  searchPlaceholder="Search devices…"
                  value={a.model}
                  options={MODELS[a.cat].map((m) => ({
                    v: m.id,
                    label: m.label,
                    hint: a.cat === "phone" ? "Phone" : a.cat === "laptop" ? "Laptop" : "Tablet",
                  }))}
                  onPick={(v2) => set({ model: v2 })}
                />
                <Question
                  label="Storage"
                  value={a.storageIdx == null ? null : String(a.storageIdx)}
                  options={STORAGE[a.cat].map((s, i) => ({
                    v: String(i),
                    label: s[0],
                  }))}
                  onPick={(v2) => set({ storageIdx: Number(v2) })}
                />
              </div>
            )}
          </div>

          {/* 02 · CONDITION */}
          <div className={`t-grp${deviceDone ? "" : " locked"}`} data-active={activeGroup === 1}>
            <div className="t-grp__h">
              <span className="t-grp__n">02</span>
              <h3 className="t-grp__t">What condition is it in?</h3>
            </div>
            <p className="t-grp__hint">
              Answer honestly — the ledger adjusts either way, and photos back it up next.
            </p>

            <Question
              label="Powers on & boots normally?"
              value={a.power}
              options={[
                { v: "yes", label: "Yes" },
                { v: "no", label: "No / won’t boot", warn: true },
              ]}
              onPick={(v2) => set({ power: v2 })}
            />
            <Question
              label="Screen"
              value={a.screen}
              options={Object.entries(SCREEN).map(([k, [label]]) => ({ v: k, label }))}
              onPick={(v2) => set({ screen: v2 })}
            />
            <Question
              label="Battery health"
              value={a.battery}
              options={[
                { v: "high", label: "85%+" },
                { v: "mid", label: "70–84%" },
                { v: "low", label: "Below 70%" },
                { v: "unsure", label: "Not sure" },
              ]}
              onPick={(v2) => set({ battery: v2 })}
            />
            <Question
              label="Body & cosmetics"
              value={a.cosmetic}
              options={[
                { v: "likenew", label: "Like new" },
                { v: "good", label: "Good — light marks" },
                { v: "worn", label: "Well used" },
              ]}
              onPick={(v2) => set({ cosmetic: v2 })}
            />
            {a.cat === "laptop" && (
              <Question
                label="Keyboard, trackpad & ports"
                value={a.keys}
                options={[
                  { v: "ok", label: "All working" },
                  { v: "issues", label: "Some issues" },
                ]}
                onPick={(v2) => set({ keys: v2 })}
              />
            )}
            <Question
              label="Any liquid damage?"
              value={a.liquid}
              options={[
                { v: "no", label: "No" },
                { v: "yes", label: "Yes", warn: true },
              ]}
              onPick={(v2) => set({ liquid: v2 })}
            />
            <Question
              label="Locked to a carrier or account?"
              value={a.lock}
              options={[
                { v: "no", label: "No — fully unlocked" },
                { v: "yes", label: "Yes / not sure", warn: true },
              ]}
              onPick={(v2) => set({ lock: v2 })}
            />
          </div>

          {/* 03 · EVIDENCE */}
          <div className={`t-grp${condOK ? "" : " locked"}`} data-active={activeGroup === 2}>
            <div className="t-grp__h">
              <span className="t-grp__n">03</span>
              <h3 className="t-grp__t">Show us the device.</h3>
              <span className="t-grp__req">{uploads}/4 attached</span>
            </div>
            <p className="t-grp__hint">
              Three photos and a short video, all four required. The team values from what they
              can see, so nothing is submitted without them — and a clearer view usually means a
              tighter estimate.
            </p>
            <div className="t-drops">
              {PHOTO_TILES.map((t) => {
                const on = a.photos[t.key];
                return (
                  <button
                    key={t.key}
                    type="button"
                    className="t-drop"
                    data-on={on}
                    onClick={() => togglePhoto(t.key)}
                  >
                    <span className="t-drop__chk">✓</span>
                    <span className="t-drop__tag">{on ? `✓ ${t.file}` : `▣ ADD ${t.label}`}</span>
                  </button>
                );
              })}
            </div>
            <div className="t-drops t-vid">
              <button
                type="button"
                className="t-drop"
                data-on={a.photos.video}
                style={{ height: 96 }}
                onClick={() => togglePhoto("video")}
              >
                <span className="t-drop__chk">✓</span>
                <span className="t-drop__tag">
                  {a.photos.video ? "✓ CLIP_0342.mov" : "▣ ADD SHORT VIDEO — REQUIRED, ALL SIDES"}
                </span>
              </button>
            </div>
            {WIREFRAME.showAnnotations && (
              <p style={{ marginTop: 14 }}>
                <span className="t-note">SIMULATED UPLOAD · CLICK A TILE TO ATTACH</span>
              </p>
            )}
          </div>

          {/* 04 · CONTACT — how the team actually reaches this person */}
          <div className={`t-grp${evidenceOK ? "" : " locked"}`} data-active={activeGroup === 3}>
            <div className="t-grp__h">
              <span className="t-grp__n">04</span>
              <h3 className="t-grp__t">Where do we send the figure?</h3>
              <span className="t-grp__req">Required</span>
            </div>
            <p className="t-grp__hint">
              A confirmed value comes back by email, and the team may call if they need
              anything else. Without these we’d have a valuation and no one to give it to.
            </p>

            <div className="t-fields">
              <Field
                label="Full name"
                hint="Please enter your full name."
                autoComplete="name"
                value={a.fullName}
                invalid={badContact.includes("fullName")}
                onChange={(val) => set({ fullName: val })}
              />
              <Field
                label="Email address"
                hint="That doesn’t look like an email address."
                type="email"
                autoComplete="email"
                value={a.email}
                invalid={badContact.includes("email")}
                onChange={(val) => set({ email: val })}
              />
              <Field
                label="Phone number"
                hint="Please enter a reachable phone number."
                type="tel"
                autoComplete="tel"
                value={a.phone}
                invalid={badContact.includes("phone")}
                onChange={(val) => set({ phone: val })}
              />
            </div>

            <p className="t-grp__fine">
              Used only to handle this trade-in. We don’t add you to a mailing list.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------- wizard controls */}
        {!a.locked && (
          <div className="t-wiz">
            <div className="t-wiz__meter" aria-hidden="true">
              {WIZARD_STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className={`t-wiz__seg${i < step ? " done" : ""}${i === step ? " on" : ""}`}
                />
              ))}
            </div>

            <div className="t-wiz__row">
              <span className="t-wiz__count">
                Step {step + 1} of {WIZARD_STEPS.length} · {WIZARD_STEPS[step].label}
              </span>
              {!stepDone[step] && <span className="t-wiz__hint">{stepHint}</span>}
            </div>

            <div className="t-wiz__btns">
              <button
                type="button"
                className="t-wiz__back"
                onClick={() => goto(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Back
              </button>

              {/* An ineligible device can never satisfy Continue, so the step
                  would be a dead end. The ledger already explains why and
                  offers recycling and Seven — send them there instead. */}
              {ineligible ? (
                <button
                  type="button"
                  className="t-wiz__next"
                  onClick={() => {
                    const reduce = window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches;
                    ledgerRef.current?.scrollIntoView({
                      behavior: reduce ? "auto" : "smooth",
                      block: "start",
                    });
                  }}
                >
                  See your options
                </button>
              ) : step < lastStep ? (
                <button
                  type="button"
                  className="t-wiz__next"
                  onClick={() => goto(step + 1)}
                  disabled={!stepDone[step]}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="t-wiz__next"
                  onClick={checking ? undefined : lockIn}
                  disabled={!canLock || checking}
                >
                  {checking ? "Running eligibility check…" : "Submit my estimate"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* submitted outcome — still an estimate, never a confirmed figure */}
        {a.locked && !ineligible && (
          <div className="t-outcome" ref={outcomeRef}>
            <div className="t-outcome__h">
              <span>{"// Estimate submitted"}</span>
              <span>Ref {REF}</span>
            </div>
            <div className="t-outcome__b">
              <div className="t-over" style={{ marginBottom: 12 }}>
                Estimated value — not yet confirmed
              </div>
              <div className="t-outcome__fig">
                {formatNaira(v.lo)}
                {"\u2009–\u2009"}
                {formatNaira(v.hi)}
              </div>
              <p className="t-body" style={{ marginTop: 14, maxWidth: "56ch" }}>
                Your ledger, photos and video are with the valuations team. This figure stays an
                estimate until a person has actually assessed the device — there are two ways
                that happens.
              </p>

              <div className="t-paths">
                <div className="t-path">
                  <span className="t-path__n">01</span>
                  <div className="t-path__t">We email you a confirmed figure</div>
                  <p className="t-path__b">
                    If the photos and video tell the team enough, they confirm the value from
                    the evidence and email it to {a.email || "you"} — usually within 24 hours.
                  </p>
                </div>
                {/* 02 is the fallback for 01, not a parallel choice — the copy
                    has to read as "if that doesn't happen, then this does". */}
                <div className="t-path">
                  <span className="t-path__n">02</span>
                  <div className="t-path__t">If they can’t, we’ll ask you to come in</div>
                  <p className="t-path__b">
                    When the evidence isn’t conclusive, we’ll ask you to bring the device to
                    one of our outlets. The team inspects it in front of you and locks the
                    value there and then.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------- option A · the trade */}
              <div className="t-trade">
                <div className="t-trade__h">
                  <span className="t-label">Option A · how trade-in works</span>
                  <div className="t-dm" style={{ marginTop: 8 }}>
                    Put it toward your next device
                  </div>
                  <p className="t-body" style={{ marginTop: 10, fontSize: 15, maxWidth: "52ch" }}>
                    Choose what you want. We take the estimate off its price, and you bring the
                    difference — not the full amount.
                  </p>
                </div>

                <div className="t-up" role="group" aria-label="Choose an upgrade">
                  {UPGRADES.map((u) => (
                    <button
                      type="button"
                      className="t-upc"
                      key={u.id}
                      aria-pressed={a.upgradeId === u.id}
                      onClick={() =>
                        set({ upgradeId: a.upgradeId === u.id ? null : u.id })
                      }
                    >
                      <span className="t-upc__ph" />
                      <span className="t-upc__t">{u.name}</span>
                      <span className="t-upc__k">{u.kind}</span>
                      <span className="t-upc__p">{formatNaira(u.price)}</span>
                    </button>
                  ))}
                </div>

                {upgrade && um && model ? (
                  <div className="t-calc" key={upgrade.id}>
                    <div className="t-calc__r">
                      <span className="t-calc__k">{upgrade.name}</span>
                      <span className="t-calc__dot" />
                      <span className="t-calc__v">{formatNaira(upgrade.price)}</span>
                    </div>
                    <div className="t-calc__r">
                      <span className="t-calc__k">Less your {model.label}</span>
                      <span className="t-calc__dot" />
                      <span className="t-calc__v">−{formatNaira(v.mid)}</span>
                    </div>
                    <div className="t-calc__tot">
                      <span className="t-calc__totl">You bring</span>
                      <span className="t-calc__totv">
                        {um.surplus ? "₦0" : formatNaira(um.payMid)}
                      </span>
                    </div>
                    <p className="t-calc__note">
                      {um.surplus
                        ? `Your estimate covers the ${upgrade.name} outright. The team will settle the balance with you when they confirm the figure.`
                        : `Between ${formatNaira(um.payLo)} and ${formatNaira(
                            um.payHi,
                          )} depending on where the team confirms your estimate. Nothing is owed until you agree the final figure.`}
                    </p>
                    <div className="t-calc__act">
                      {/* outline, not fill — a fill button is ink-on-ink here */}
                      <ArrowButton
                        label={`Reserve the ${upgrade.name}`}
                        variant="outline"
                        href="/contact"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="t-calc t-calc--empty">
                    Pick a device above to see exactly what you would bring.
                  </div>
                )}
              </div>

              {/* ------------------------------------- option B · the quiet corner */}
              <div className="t-altb">
                <div>
                  <span className="t-label">Option B</span>
                  <div className="t-altb__t">Credit my account instead</div>
                  <p className="t-altb__b">
                    Credit isn’t issued automatically — the team arranges it case by case. Talk
                    to us if you’d rather not trade toward a device.
                  </p>
                </div>
                <ArrowButton label="Talk to the team" variant="outline" href="/contact" />
              </div>

              <div style={{ marginTop: 24 }}>
                <ArrowButton
                  label="Start a new valuation"
                  variant="outline"
                  onClick={reset}
                />
              </div>

              {WIREFRAME.showAnnotations && (
                <p style={{ marginTop: 14 }}>
                  <span className="t-note">
                    ESTIMATE ONLY — CONFIRMED VALUE COMES FROM THE TEAM
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- ledger */}
      <aside className="t-ledger" aria-label="Live valuation" ref={ledgerRef}>
        <div className="t-rcpt" data-live={!!model && !a.locked}>
          <div className="t-rcpt__h">
            <span className="t-rcpt__live">
              <span className="t-rcpt__dot" aria-hidden="true" />
              Device Valuation
            </span>
            <span>{model ? `Ref ${REF}` : "Ref pending"}</span>
          </div>

          <div className="t-rcpt__dev" data-empty={!model}>
            <div className="t-rcpt__devt">{model ? model.label : "No device yet"}</div>
            <div className="t-rcpt__devs">
              {model && a.cat
                ? `${a.storageIdx != null ? `${STORAGE[a.cat][a.storageIdx][0]} · ` : ""}${
                    a.cat.charAt(0).toUpperCase() + a.cat.slice(1)
                  }`
                : "Pick a device to begin"}
            </div>
          </div>

          {/* On a phone the ledger's job is the figure; the line-by-line
              breakdown is the proof, on demand. Open by default on desktop,
              where there is room for the whole argument at once. */}
          <button
            type="button"
            className="t-lines__toggle"
            aria-expanded={linesOpen}
            aria-controls="t-lines-body"
            onClick={() => setLinesOverride(!linesOpen)}
          >
            <span className="t-lines__tl">How this is worked out</span>
            <span className="t-lines__tc">
              {v.lines.length === 0
                ? "Nothing yet"
                : `${v.lines.length} line${v.lines.length === 1 ? "" : "s"}`}
            </span>
            <span className="t-lines__caret" aria-hidden="true" />
          </button>

          <div className="t-lines" id="t-lines-body" data-open={linesOpen}>
            {v.lines.length === 0 ? (
              <>
                {/* ghost rows: the card holds its shape before the first answer */}
                {GHOST_ROWS.map(([k, val], i) => (
                  <div className="t-ghost" key={i} aria-hidden="true">
                    <span className="t-ghost__k" style={{ width: k }} />
                    <span className="t-ghost__dot" />
                    <span className="t-ghost__v" style={{ width: val }} />
                  </div>
                ))}
                <div className="t-line--empty">Line items post here as you answer</div>
              </>
            ) : (
              v.lines.map((l) => (
                <div className="t-line post" data-sign={l.v < 0 ? "down" : "up"} key={l.k}>
                  <span className="t-line__k">{l.k}</span>
                  <span className="t-line__dot" />
                  <span className="t-line__v">
                    {l.v > 0 ? "+" : ""}
                    {formatNaira(l.v)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className={`t-total${ineligible ? " void" : ""}`} aria-live="polite">
            <div className="t-total__row">
              <span className="t-total__l">Estimated value</span>
              {/* the chip never changes — this figure is only ever an estimate */}
              {!ineligible && <span className="t-total__chip">Estimate</span>}
            </div>
            {/* keyed on the figure so each rebuild replays the settle animation */}
            <div className="t-total__fig" key={figure} data-range={isRange}>
              {figure}
            </div>
            <div className="t-total__sub">
              {ineligible
                ? "This device can’t be valued automatically"
                : v.tightened
                  ? "Evidence attached — the team confirms from here"
                  : v.mid > 0
                    ? "Add your 4 uploads to tighten this range"
                    : "Backed by live market data"}
            </div>
          </div>

          {!ineligible && !a.locked && (
            <div className="t-rcpt__act">
              {canLock ? (
                <ArrowButton
                  label={checking ? "Running eligibility check…" : "Submit my estimate"}
                  variant="outline"
                  style={{ justifyContent: "space-between" }}
                  onClick={checking ? undefined : lockIn}
                />
              ) : (
                <div className="t-cta--wait" aria-disabled="true">
                  {waitLabel}
                </div>
              )}
              {checking && <div className="t-check" aria-hidden="true" />}
              {!checking && (
                <div className="t-rcpt__note">
                  {canLock
                    ? "Goes to the team — they confirm the figure"
                    : "Photos, video and contact details required"}
                </div>
              )}
            </div>
          )}

          {ineligible && (
            <div className="t-void">
              <div className="t-void__t">We can’t value this device right now.</div>
              {v.reasons.map((r) => (
                <div className="t-void__r" key={r}>
                  <span>×</span>
                  <span>{r}</span>
                </div>
              ))}
              {WIREFRAME.showAnnotations && (
                <div style={{ marginTop: 2 }}>
                  <span className="t-note">INELIGIBLE — REASON SHOWN THE MOMENT YOU TELL US</span>
                </div>
              )}
              <div className="t-void__alts">
                <div className="t-void__alt">
                  <div className="t-void__altt">Recycle it responsibly</div>
                  <div className="t-void__altb">
                    We’ll take it off your hands at no cost with certified data destruction.
                    Zero landfill.
                  </div>
                </div>
                <div className="t-void__alt">
                  <div className="t-void__altt">Ask Seven</div>
                  <div className="t-void__altb">
                    Our assistant can suggest a repair that could make it eligible, or your best
                    upgrade path without a trade-in.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {WIREFRAME.showAnnotations && (
          <p style={{ marginTop: 12, textAlign: "right" }}>
            <span className="t-note">LEDGER UPDATES LIVE — NOTHING HIDDEN</span>
          </p>
        )}
      </aside>
    </div>
  );
}
