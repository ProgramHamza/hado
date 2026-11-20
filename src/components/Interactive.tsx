import { useEffect, useRef, useState } from "react";
import { FACTS, PRICING } from "../content";

const section = "py-[clamp(90px,13vw,180px)]";
const h2 = "display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]";
const KEYS = ["A", "B", "C"] as const;
type Tech = "hado" | "glass";
type Flash = { i: number; kind: "on" | "ghost" } | null;

export function TryIt() {
  const [tech, setTech] = useState<Tech>("hado");
  const [wet, setWet] = useState(true);
  const [score, setScore] = useState({ n: 0, ok: 0, last: "" });
  const [flash, setFlash] = useState<Flash>(null);
  const timer = useRef<number>(0);

  const show = (f: Flash) => {
    window.clearTimeout(timer.current);
    setFlash(f);
    timer.current = window.setTimeout(() => setFlash(null), 260);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    setScore({ n: 0, ok: 0, last: "" });
    if (tech !== "glass" || !wet) return;
    const id = window.setInterval(() => show({ i: Math.floor(Math.random() * 3), kind: "ghost" }), 900);
    return () => window.clearInterval(id);
  }, [tech, wet]);

  const press = (i: number) => {
    const misread = tech === "glass" && wet && Math.random() < 0.55;
    const reg = misread ? (i + 1 + Math.floor(Math.random() * 2)) % 3 : i;
    show({ i: reg, kind: reg === i ? "on" : "ghost" });
    setScore((s) => ({
      n: s.n + 1,
      ok: s.ok + (reg === i ? 1 : 0),
      last: `You pressed ${KEYS[i]}, registered ${KEYS[reg]}${tech === "hado" ? " by operator 07" : ""}.`,
    }));
  };

  return (
    <section id="try" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className={h2}>Try it in freezer gloves.</h2>
          <p className="mb-4 text-mut">
            Three buttons, like our proof of concept. Press them with each technology, then turn thick gloves and condensation on or off.
          </p>
          <div className="mt-2 mb-4 inline-flex overflow-hidden rounded-full border border-ink" role="group" aria-label="Technology">
            {(
              [
                ["hado", "Hado"],
                ["glass", "Glove-mode touchscreen"],
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
            Thick gloves and condensation
          </label>
          <p className="mb-4 text-[14.5px] text-mut" aria-live="polite">
            {score.n ? `${score.last} Correct ${score.ok} of ${score.n}.` : "Press a button."}
          </p>
          <p className="text-[14.5px] text-mut">
            The touchscreen's errors are simulated to show the contrast. They are not test data; our head-to-head test against a glove-mode touchscreen is planned for Q1 2027.
          </p>
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
  return (
    <section id="pricing" className={section}>
      <div className="wrap">
        <h2 className={h2}>A panel, glove inserts and a site licence.</h2>
        <p className="mb-4 max-w-[34em] text-mut">
          Target prices, to be confirmed in paid pilots. The inserts are replaced together with the work gloves, and the
          site licence covers operator identification and press logs.
        </p>
        <div className="mt-12 grid border-t border-ink md:grid-cols-3">
          {PRICING.map((p, i) => (
            <div key={p.name} className={`border-b border-line py-6 md:border-b-0 md:pr-8 ${i > 0 ? "md:border-l md:pl-8" : ""}`}>
              <div className="text-[14.5px] font-semibold text-sig">{p.name}</div>
              <div className="display mt-2 mb-3 text-[clamp(36px,4.4vw,60px)] leading-none tabular-nums">{p.price}</div>
              <p className="m-0 text-[15px] text-mut">{p.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[40em] text-[14.5px] text-mut">
          Hardware cost: the current prototype bill of materials is about {FACTS.prototypeBomEur}. The series target is{" "}
          {FACTS.seriesTargetEur}, by moving to an integrated multi-channel receiver.
        </p>
      </div>
    </section>
  );
}

const SHIFTS_PER_YEAR = 230;
const SLIDERS = [
  { key: "workers", label: "Workers on touchscreens", min: 1, max: 200, init: 20, fmt: (v: number) => `${v}` },
  { key: "removals", label: "Glove removals per worker per shift", min: 0, max: 60, init: 12, fmt: (v: number) => `${v}` },
  { key: "seconds", label: "Seconds lost each time", min: 5, max: 60, init: 20, fmt: (v: number) => `${v} s` },
  { key: "rate", label: "Labour cost per hour", min: 10, max: 60, init: 25, fmt: (v: number) => `€${v}` },
] as const;
type SliderKey = (typeof SLIDERS)[number]["key"];

export function Savings() {
  const [v, setV] = useState<Record<SliderKey, number>>(
    () => Object.fromEntries(SLIDERS.map((s) => [s.key, s.init])) as Record<SliderKey, number>,
  );
  const hours = (v.workers * v.removals * v.seconds * SHIFTS_PER_YEAR) / 3600;
  return (
    <section id="calc" className={section}>
      <div className="wrap">
        <h2 className={h2}>What taking gloves off costs you.</h2>
        <p className="mb-4 max-w-[34em] text-mut">
          Every glove removal is a pause and a safety risk. Set your own numbers to see the time it adds up to. This is an
          estimate from your inputs, not measured data.
        </p>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div>
            {SLIDERS.map((s) => (
              <label key={s.key} className="mb-5.5 block text-[15px]">
                <span className="mb-2 flex justify-between">
                  {s.label}
                  <b className="tabular-nums">{s.fmt(v[s.key])}</b>
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
            <p className="text-[14.5px] text-mut">Assumes {SHIFTS_PER_YEAR} shifts a year.</p>
          </div>
          <div className="border-t border-ink pt-5.5">
            <div className="display text-[clamp(64px,9vw,128px)] leading-[.95] tracking-[-.03em] tabular-nums">
              {Math.round(hours).toLocaleString("en-US")}
            </div>
            <p className="m-0 text-mut">hours lost every year</p>
            <div className="display mt-1.5 text-[clamp(32px,4vw,52px)] leading-none text-sig tabular-nums">
              €{Math.round(hours * v.rate).toLocaleString("en-US")}
            </div>
            <p className="m-0 text-mut">in paid time, per year</p>
          </div>
        </div>
      </div>
    </section>
  );
}
