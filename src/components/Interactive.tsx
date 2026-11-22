import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";

const section = "py-[clamp(90px,13vw,180px)]";
const h2 = "display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]";
const KEYS = ["A", "B", "C"] as const;
type Tech = "hado" | "glass";
type Flash = { i: number; kind: "on" | "ghost" } | null;
type Press = { i: number; reg: number; tech: Tech };

export function TryIt() {
  const { t } = useLang();
  const c = t.tryIt;
  const [tech, setTech] = useState<Tech>("hado");
  const [wet, setWet] = useState(true);
  const [score, setScore] = useState<{ n: number; ok: number; last: Press | null }>({ n: 0, ok: 0, last: null });
  const [flash, setFlash] = useState<Flash>(null);
  const timer = useRef<number>(0);

  const show = (f: Flash) => {
    window.clearTimeout(timer.current);
    setFlash(f);
    timer.current = window.setTimeout(() => setFlash(null), 260);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    setScore({ n: 0, ok: 0, last: null });
    if (tech !== "glass" || !wet) return;
    const id = window.setInterval(() => show({ i: Math.floor(Math.random() * 3), kind: "ghost" }), 900);
    return () => window.clearInterval(id);
  }, [tech, wet]);

  const press = (i: number) => {
    const misread = tech === "glass" && wet && Math.random() < 0.55;
    const reg = misread ? (i + 1 + Math.floor(Math.random() * 2)) % 3 : i;
    show({ i: reg, kind: reg === i ? "on" : "ghost" });
    setScore((s) => ({ n: s.n + 1, ok: s.ok + (reg === i ? 1 : 0), last: { i, reg, tech } }));
  };

  // Built at render time so switching language re-renders the last result in the new language.
  const result = score.last
    ? `${c.pressed} ${KEYS[score.last.i]}, ${c.registered} ${KEYS[score.last.reg]}${score.last.tech === "hado" ? ` ${c.byOperator}` : ""}. ${c.correct} ${score.ok} ${c.of} ${score.n}.`
    : c.prompt;

  return (
    <section id="try" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className={h2}>{c.title}</h2>
          <p className="mb-4 text-mut">{c.lead}</p>
          <div className="mt-2 mb-4 inline-flex overflow-hidden rounded-full border border-ink" role="group" aria-label={c.techLabel}>
            {(
              [
                ["hado", c.hado],
                ["glass", c.glass],
              ] as const
            ).map(([v, text]) => (
              <button
                key={v}
                type="button"
                aria-pressed={tech === v}
                onClick={() => setTech(v)}
                className="cursor-pointer border-0 bg-transparent px-5.5 py-2.5 text-sm font-medium text-ink aria-pressed:bg-ink aria-pressed:text-white"
              >
                {text}
              </button>
            ))}
          </div>
          <label className="mb-3.5 block text-[15px]">
            <input type="checkbox" checked={wet} onChange={(e) => setWet(e.target.checked)} className="mr-2" />
            {c.wet}
          </label>
          <p className="mb-4 text-[14.5px] text-mut" aria-live="polite">
            {result}
          </p>
          <p className="text-[14.5px] text-mut">{c.note}</p>
        </div>
        <div className={`grid grid-cols-3 gap-3.5 rounded-[28px] border border-line bg-pan p-7 ${wet ? "pad-wet" : ""}`}>
          {KEYS.map((k, i) => {
            const state = flash?.i === i ? flash.kind : null;
            return (
              <button
                key={k}
                type="button"
                onClick={() => press(i)}
                className={[
                  "display aspect-square cursor-pointer rounded-[20px] border text-[52px] transition-colors duration-100",
                  state === "on" ? "border-ink bg-ink text-white" : "",
                  state === "ghost" ? "border-sig bg-sig text-white" : "",
                  state === null ? "border-ink bg-transparent text-ink" : "",
                ].join(" ")}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const { t } = useLang();
  const p = t.pricing;
  return (
    <section id="pricing" className={section}>
      <div className="wrap">
        <h2 className={h2}>{p.title}</h2>
        <p className="mb-4 max-w-[34em] text-mut">{p.lead}</p>
        <div className="mt-12 grid border-t border-ink md:grid-cols-3">
          {p.items.map((it, i) => (
            <div key={it.name} className={`border-b border-line py-6 md:border-b-0 md:pr-8 ${i > 0 ? "md:border-l md:pl-8" : ""}`}>
              <div className="text-[14.5px] font-semibold text-sig">{it.name}</div>
              <div className="display mt-2 mb-3 text-[clamp(36px,4.4vw,60px)] leading-none tabular-nums">{it.price}</div>
              <p className="m-0 text-[15px] text-mut">{it.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[40em] text-[14.5px] text-mut">{p.hardware}</p>
      </div>
    </section>
  );
}

const SHIFTS_PER_YEAR = 230;
const SLIDERS = [
  { key: "workers", min: 1, max: 200, init: 20 },
  { key: "removals", min: 0, max: 60, init: 12 },
  { key: "seconds", min: 5, max: 60, init: 20 },
  { key: "rate", min: 10, max: 60, init: 25 },
] as const;
type SliderKey = (typeof SLIDERS)[number]["key"];

export function Savings() {
  const { t } = useLang();
  const c = t.savings;
  const [v, setV] = useState<Record<SliderKey, number>>(
    () => Object.fromEntries(SLIDERS.map((s) => [s.key, s.init])) as Record<SliderKey, number>,
  );
  const hours = (v.workers * v.removals * v.seconds * SHIFTS_PER_YEAR) / 3600;
  const eur = (n: number) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const fmt = (key: SliderKey, n: number) => (key === "seconds" ? `${n} ${c.secondsUnit}` : key === "rate" ? eur(n) : `${n}`);

  return (
    <section id="calc" className={section}>
      <div className="wrap">
        <h2 className={h2}>{c.title}</h2>
        <p className="mb-4 max-w-[34em] text-mut">{c.lead}</p>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div>
            {SLIDERS.map((s) => (
              <label key={s.key} className="mb-5.5 block text-[15px]">
                <span className="mb-2 flex justify-between gap-4">
                  {c[s.key]}
                  <b className="tabular-nums whitespace-nowrap">{fmt(s.key, v[s.key])}</b>
                </span>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={v[s.key]}
                  onChange={(e) => setV((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))}
                  className="w-full"
                />
              </label>
            ))}
            <p className="text-[14.5px] text-mut">{c.assumes}</p>
          </div>
          <div className="border-t border-ink pt-5.5">
            <div className="display text-[clamp(64px,9vw,128px)] leading-[.95] tracking-[-.03em] tabular-nums">
              {Math.round(hours).toLocaleString(t.locale)}
            </div>
            <p className="m-0 text-mut">{c.hours}</p>
            <div className="display mt-1.5 text-[clamp(32px,4vw,52px)] leading-none text-sig tabular-nums">
              {eur(Math.round(hours * v.rate))}
            </div>
            <p className="m-0 text-mut">{c.paid}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
