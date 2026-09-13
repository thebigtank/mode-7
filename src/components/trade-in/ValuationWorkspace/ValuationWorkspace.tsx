"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { P } from "@/components/ui/P";
import { SearchSelect } from "@/components/SearchSelect";
import content from "@/content/trade-in.json";
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

const CATEGORIES = content.workspace.categories as {
  id: Category;
  title: string;
  sub: string;
}[];

const PHOTO_TILES = content.workspace.photoTiles as {
  key: "front" | "back" | "screen";
  label: string;
  file: string;
}[];

const REF = content.workspace.ref;

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
      <div className="t-q__l uppercase">{label}</div>
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
      <label className="t-q__l uppercase" htmlFor={id}>
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

const WIZARD_STEPS = [
  { key: "category", group: 0, label: "Category" },
  { key: "device", group: 0, label: "Model" },
  { key: "condition", group: 1, label: "Condition" },
  { key: "evidence", group: 2, label: "Photos" },
  { key: "contact", group: 3, label: "Contact" },
] as const;

const WIZARD_QUERY = "(max-width: 939px)";

const cs = content.workspace.steps;
const wz = content.workspace.wizard;
const oc = content.workspace.outcome;
const vd = content.workspace.void;

export function ValuationWorkspace() {
  const [a, setA] = useState<Answers>(emptyAnswers);
  const outcomeRef = useRef<HTMLDivElement | null>(null);
  const [checking, setChecking] = useState(false);
  const [step, setStep] = useState(0);
  const [isWizard, setIsWizard] = useState(false);
  const stepTopRef = useRef<HTMLDivElement | null>(null);
  const ledgerRef = useRef<HTMLElement | null>(null);
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
  const canLock =
    v.mid > 0 && conditionAnswered(a) && !ineligible && evidenceOK && contactOK;

  const linesOpen = linesOverride ?? !isWizard;

  const upgrade = UPGRADES.find((u) => u.id === a.upgradeId) ?? null;
  const um = upgrade ? upgradeMath(upgrade.price, v) : null;

  useEffect(() => {
    if (!a.locked || !outcomeRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    outcomeRef.current.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [a.locked]);

  function pickCategory(cat: Category) {
    setA((prev) => ({
      ...emptyAnswers(),
      cat,
      fullName: prev.fullName,
      email: prev.email,
      phone: prev.phone,
    }));
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

  const isRange = !ineligible && v.mid > 0;
  const figure = ineligible
    ? formatNaira(v.mid)
    : v.mid > 0
      ? `${formatNaira(v.lo)}\u2009–\u2009${formatNaira(v.hi)}`
      : "₦ —";

  const rc = content.workspace.receipt;
  const waitLabel = !deviceDone
    ? rc.waitDevice
    : !condOK
      ? rc.waitCondition
      : !evidenceOK
        ? `Attach all 4 uploads — ${uploads}/4 done`
        : rc.waitContact;

  const stepDone = [
    !!a.cat,
    deviceDone,
    condOK,
    evidenceOK,
    contactOK,
  ];
  const lastStep = WIZARD_STEPS.length - 1;
  const activeGroup = WIZARD_STEPS[step].group;

  const wh = content.workspace.wizard.hints;
  const stepHint = [
    wh.category,
    !a.model ? wh.modelChoose : wh.storageChoose,
    ineligible ? wh.ineligible : wh.condition,
    `Attach all 4 uploads — ${uploads}/4 done`,
    wh.contact,
  ][step];

  const goto = useCallback((next: number) => {
    setStep(next);
    const el = stepTopRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="t-ws">
      <div>
        <div className="t-rail" aria-hidden="true">
          <span className={`t-rail__s${deviceDone ? " on" : ""}`} />
          <span className={`t-rail__s${condOK ? " on" : ""}`} />
          <span className={`t-rail__s${evidenceOK ? " on" : ""}`} />
          <span className={`t-rail__s${contactOK ? " on" : ""}`} />
        </div>

        <div className="t-steps" data-sent={a.locked} ref={stepTopRef}>
          <div className="t-grp" data-active={activeGroup === 0}>
            <div className="t-sub" data-active={step === 0}>
              <div className="t-grp__h flex">
                <span className="t-grp__n">{cs.device.n}</span>
                <h3 className="t-grp__t">{cs.device.title}</h3>
              </div>
              <p className="t-grp__hint">{cs.device.hint}</p>
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
                    <span className="t-catc__s uppercase">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {a.cat && (
              <div className="t-sub" data-active={step === 1}>
                <div className="t-grp__h t-wiz-only flex">
                  <span className="t-grp__n">{cs.device.subN}</span>
                  <h3 className="t-grp__t">{cs.device.subTitle}</h3>
                </div>
                <SearchSelect
                  label={`Model — ${MODELS[a.cat].length} accepted`}
                  placeholder={cs.device.modelPlaceholder}
                  searchPlaceholder={cs.device.searchPlaceholder}
                  variant="tradein"
                  value={a.model}
                  options={MODELS[a.cat].map((m) => ({
                    v: m.id,
                    label: m.label,
                    hint: a.cat === "phone" ? "Phone" : a.cat === "laptop" ? "Laptop" : "Tablet",
                  }))}
                  onPick={(v2) => set({ model: v2 })}
                />
                <Question
                  label={cs.device.storageLabel}
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

          <div className={`t-grp${deviceDone ? "" : " locked"}`} data-active={activeGroup === 1}>
            <div className="t-grp__h flex">
              <span className="t-grp__n">{cs.condition.n}</span>
              <h3 className="t-grp__t">{cs.condition.title}</h3>
            </div>
            <p className="t-grp__hint">{cs.condition.hint}</p>

            <Question
              label={cs.condition.power.label}
              value={a.power}
              options={cs.condition.power.options}
              onPick={(v2) => set({ power: v2 })}
            />
            <Question
              label={cs.condition.screenLabel}
              value={a.screen}
              options={Object.entries(SCREEN).map(([k, [label]]) => ({ v: k, label }))}
              onPick={(v2) => set({ screen: v2 })}
            />
            <Question
              label={cs.condition.battery.label}
              value={a.battery}
              options={cs.condition.battery.options}
              onPick={(v2) => set({ battery: v2 })}
            />
            <Question
              label={cs.condition.cosmetic.label}
              value={a.cosmetic}
              options={cs.condition.cosmetic.options}
              onPick={(v2) => set({ cosmetic: v2 })}
            />
            {a.cat === "laptop" && (
              <Question
                label={cs.condition.keys.label}
                value={a.keys}
                options={cs.condition.keys.options}
                onPick={(v2) => set({ keys: v2 })}
              />
            )}
            <Question
              label={cs.condition.liquid.label}
              value={a.liquid}
              options={cs.condition.liquid.options}
              onPick={(v2) => set({ liquid: v2 })}
            />
            <Question
              label={cs.condition.lock.label}
              value={a.lock}
              options={cs.condition.lock.options}
              onPick={(v2) => set({ lock: v2 })}
            />
          </div>

          <div className={`t-grp${condOK ? "" : " locked"}`} data-active={activeGroup === 2}>
            <div className="t-grp__h flex">
              <span className="t-grp__n">{cs.evidence.n}</span>
              <h3 className="t-grp__t">{cs.evidence.title}</h3>
              <span className="t-grp__req uppercase whitespace-nowrap">
                {uploads}/4 {cs.evidence.req}
              </span>
            </div>
            <p className="t-grp__hint">{cs.evidence.hint}</p>
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
                    <span className="t-drop__tag text-left">{on ? `✓ ${t.file}` : `▣ ADD ${t.label}`}</span>
                  </button>
                );
              })}
            </div>
            <div className="t-drops t-vid">
              <button
                type="button"
                className="t-drop h-24"
                data-on={a.photos.video}
                onClick={() => togglePhoto("video")}
              >
                <span className="t-drop__chk">✓</span>
                <span className="t-drop__tag text-left">
                  {a.photos.video ? cs.evidence.videoOn : cs.evidence.videoOff}
                </span>
              </button>
            </div>
          </div>

          <div className={`t-grp${evidenceOK ? "" : " locked"}`} data-active={activeGroup === 3}>
            <div className="t-grp__h flex">
              <span className="t-grp__n">{cs.contact.n}</span>
              <h3 className="t-grp__t">{cs.contact.title}</h3>
              <span className="t-grp__req uppercase whitespace-nowrap">{cs.contact.req}</span>
            </div>
            <p className="t-grp__hint">{cs.contact.hint}</p>

            <div className="t-fields">
              <Field
                label={cs.contact.fullName.label}
                hint={cs.contact.fullName.hint}
                autoComplete="name"
                value={a.fullName}
                invalid={badContact.includes("fullName")}
                onChange={(val) => set({ fullName: val })}
              />
              <Field
                label={cs.contact.email.label}
                hint={cs.contact.email.hint}
                type="email"
                autoComplete="email"
                value={a.email}
                invalid={badContact.includes("email")}
                onChange={(val) => set({ email: val })}
              />
              <Field
                label={cs.contact.phone.label}
                hint={cs.contact.phone.hint}
                type="tel"
                autoComplete="tel"
                value={a.phone}
                invalid={badContact.includes("phone")}
                onChange={(val) => set({ phone: val })}
              />
            </div>

            <p className="t-grp__fine">{cs.contact.fine}</p>
          </div>
        </div>

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
                {wz.back}
              </button>

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
                  {wz.seeOptions}
                </button>
              ) : step < lastStep ? (
                <button
                  type="button"
                  className="t-wiz__next"
                  onClick={() => goto(step + 1)}
                  disabled={!stepDone[step]}
                >
                  {wz.continue}
                </button>
              ) : (
                <button
                  type="button"
                  className="t-wiz__next"
                  onClick={checking ? undefined : lockIn}
                  disabled={!canLock || checking}
                >
                  {checking ? wz.checking : wz.submit}
                </button>
              )}
            </div>
          </div>
        )}

        {a.locked && !ineligible && (
          <div className="t-outcome" ref={outcomeRef}>
            <div className="t-outcome__h uppercase flex justify-between flex-wrap">
              <span>{oc.submitted}</span>
              <span>Ref {REF}</span>
            </div>
            <div className="t-outcome__b">
              <div className="t-label uppercase mb-3">{oc.subLabel}</div>
              <div className="t-outcome__fig">
                {formatNaira(v.lo)}
                {"\u2009–\u2009"}
                {formatNaira(v.hi)}
              </div>
              <P className="mt-[14px] max-w-[56ch]">{oc.intro}</P>

              <div className="t-paths">
                <div className="t-path">
                  <span className="t-path__n">01</span>
                  <div className="t-path__t">{oc.path1Title}</div>
                  <p className="t-path__b">
                    {oc.path1Body.replace("{email}", a.email || "you")}
                  </p>
                </div>
                <div className="t-path">
                  <span className="t-path__n">02</span>
                  <div className="t-path__t">{oc.path2Title}</div>
                  <p className="t-path__b">{oc.path2Body}</p>
                </div>
              </div>

              <div className="t-trade">
                <div className="t-trade__h">
                  <span className="t-label uppercase">{oc.optionALabel}</span>
                  <div className="t-dm mt-2">{oc.optionATitle}</div>
                  <P className="mt-[10px] max-w-[52ch]">{oc.optionABody}</P>
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
                      <span className="t-upc__k uppercase">{u.kind}</span>
                      <span className="t-upc__p">{formatNaira(u.price)}</span>
                    </button>
                  ))}
                </div>

                {upgrade && um && model ? (
                  <div className="t-calc" key={upgrade.id}>
                    <div className="t-calc__r flex">
                      <span className="t-calc__k whitespace-nowrap">{upgrade.name}</span>
                      <span className="t-calc__dot" />
                      <span className="t-calc__v whitespace-nowrap">{formatNaira(upgrade.price)}</span>
                    </div>
                    <div className="t-calc__r flex">
                      <span className="t-calc__k whitespace-nowrap">Less your {model.label}</span>
                      <span className="t-calc__dot" />
                      <span className="t-calc__v whitespace-nowrap">−{formatNaira(v.mid)}</span>
                    </div>
                    <div className="t-calc__tot flex justify-between flex-wrap">
                      <span className="t-calc__totl uppercase">{oc.youBring}</span>
                      <span className="t-calc__totv">
                        {um.surplus ? "₦0" : formatNaira(um.payMid)}
                      </span>
                    </div>
                    <p className="t-calc__note">
                      {um.surplus
                        ? oc.surplusNote.replace("{name}", upgrade.name)
                        : oc.payRangeNote
                            .replace("{lo}", formatNaira(um.payLo))
                            .replace("{hi}", formatNaira(um.payHi))}
                    </p>
                    <div className="t-calc__act">
                      <ButtonV2
                        label={oc.reserve.replace("{name}", upgrade.name)}
                        variant="outline"
                        onDark
                        href="/contact"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="t-calc t-calc--empty">{oc.calcEmpty}</div>
                )}
              </div>

              <div className="t-altb">
                <div>
                  <span className="t-label uppercase">{oc.optionBLabel}</span>
                  <div className="t-altb__t">{oc.optionBTitle}</div>
                  <p className="t-altb__b">{oc.optionBBody}</p>
                </div>
                <ButtonV2 label={oc.talkToTeam} variant="outline" href="/contact" />
              </div>

              <div className="mt-6">
                <ButtonV2 label={oc.startNew} variant="outline" onClick={reset} />
              </div>
            </div>
          </div>
        )}
      </div>

      <aside className="t-ledger" aria-label="Live valuation" ref={ledgerRef}>
        <div className="t-rcpt" data-live={!!model && !a.locked}>
          <div className="t-rcpt__h flex justify-between items-center uppercase">
            <span className="t-rcpt__live inline-flex items-center">
              <span className="t-rcpt__dot" aria-hidden="true" />
              {rc.title}
            </span>
            <span>{model ? `Ref ${REF}` : rc.refPending}</span>
          </div>

          <div className="t-rcpt__dev" data-empty={!model}>
            <div className="t-rcpt__devt">{model ? model.label : rc.noDevice}</div>
            <div className="t-rcpt__devs uppercase">
              {model && a.cat
                ? `${a.storageIdx != null ? `${STORAGE[a.cat][a.storageIdx][0]} · ` : ""}${
                    a.cat.charAt(0).toUpperCase() + a.cat.slice(1)
                  }`
                : rc.pickDevice}
            </div>
          </div>

          <button
            type="button"
            className="t-lines__toggle"
            aria-expanded={linesOpen}
            aria-controls="t-lines-body"
            onClick={() => setLinesOverride(!linesOpen)}
          >
            <span className="t-lines__tl">{rc.linesToggle}</span>
            <span className="t-lines__tc">
              {v.lines.length === 0
                ? rc.linesEmpty
                : `${v.lines.length} line${v.lines.length === 1 ? "" : "s"}`}
            </span>
            <span className="t-lines__caret" aria-hidden="true" />
          </button>

          <div className="t-lines" id="t-lines-body" data-open={linesOpen}>
            {v.lines.length === 0 ? (
              <>
                {GHOST_ROWS.map(([k, val], i) => (
                  <div className="t-ghost" key={i} aria-hidden="true">
                    <span
                      className="t-ghost__k"
                      style={{ "--t-ghost-w": `${k}px` } as CSSProperties}
                    />
                    <span className="t-ghost__dot" />
                    <span
                      className="t-ghost__v"
                      style={{ "--t-ghost-w": `${val}px` } as CSSProperties}
                    />
                  </div>
                ))}
                <div className="t-line--empty">{rc.linesEmptyBody}</div>
              </>
            ) : (
              v.lines.map((l) => (
                <div className="t-line post" data-sign={l.v < 0 ? "down" : "up"} key={l.k}>
                  <span className="t-line__k whitespace-nowrap">{l.k}</span>
                  <span className="t-line__dot" />
                  <span className="t-line__v whitespace-nowrap">
                    {l.v > 0 ? "+" : ""}
                    {formatNaira(l.v)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className={`t-total${ineligible ? " void" : ""}`} aria-live="polite">
            <div className="t-total__row flex justify-between items-center">
              <span className="t-total__l uppercase">{rc.totalLabel}</span>
              {!ineligible && <span className="t-total__chip uppercase whitespace-nowrap">{rc.totalChip}</span>}
            </div>
            <div className="t-total__fig" key={figure} data-range={isRange}>
              {figure}
            </div>
            <div className="t-total__sub">
              {ineligible
                ? rc.subIneligible
                : v.tightened
                  ? rc.subTightened
                  : v.mid > 0
                    ? rc.subUntightened
                    : rc.subDefault}
            </div>
          </div>

          {!ineligible && !a.locked && (
            <div className="t-rcpt__act">
              {canLock ? (
                <ButtonV2
                  label={checking ? wz.checking : wz.submit}
                  variant="outline"
                  onDark
                  className="justify-between"
                  onClick={checking ? undefined : lockIn}
                />
              ) : (
                <div className="t-cta--wait" aria-disabled="true">
                  {waitLabel}
                </div>
              )}
              {checking && <div className="t-check" aria-hidden="true" />}
              {!checking && (
                <div className="t-rcpt__note uppercase text-center">
                  {canLock ? rc.noteReady : rc.noteNotReady}
                </div>
              )}
            </div>
          )}

          {ineligible && (
            <div className="t-void">
              <div className="t-void__t">{vd.title}</div>
              {v.reasons.map((r) => (
                <div className="t-void__r flex" key={r}>
                  <span>×</span>
                  <span>{r}</span>
                </div>
              ))}
              <div className="t-void__alts grid">
                <div className="t-void__alt">
                  <div className="t-void__altt">{vd.recycleTitle}</div>
                  <div className="t-void__altb">{vd.recycleBody}</div>
                </div>
                <div className="t-void__alt">
                  <div className="t-void__altt">{vd.askTitle}</div>
                  <div className="t-void__altb">{vd.askBody}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
