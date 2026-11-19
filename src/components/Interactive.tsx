import { useEffect, useRef, useState } from "react";
import { PRICES } from "../content";
import { useInView } from "../lib/motion";

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
      last: `You pressed ${KEYS[i]}, registered ${KEYS[reg]}.`,
    }));
  };

  return (
    <section id="try" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className={h2}>Try it with gloves on.</h2>
          <p className="mb-4 text-mut">
            Three buttons, like our proof of concept. Press them with each technology, then turn gloves and water on or off.
          </p>
          <div className="mt-2 mb-4 inline-flex overflow-hidden rounded-full border border-ink" role="group" aria-label="Technology">
            {(
              [
                ["hado", "Hado"],
                ["glass", "Glass screen"],
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
            Gloves and water
          </label>
          <p className="mb-4 text-[14.5px] text-mut" aria-live="polite">
            {score.n ? `${score.last} Correct ${score.ok} of ${score.n}.` : "Press a button."}
          </p>
          <p className="text-[14.5px] text-mut">
            The glass screen's errors are simulated to show the contrast. They are not test data.
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

export function Cost() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section id="cost" className={section}>
      <div className="wrap">
        <h2 className={h2}>About half the price of rugged glass.</h2>
        <p className="mb-4 max-w-[34em] text-mut">
          Industrial displays cost hundreds to thousands because glass must survive the factory floor. Hado skips the
          glass. Retail target is 400 to 500 euros.
        </p>
        <div ref={ref} className="mt-9 border-t border-ink">
          {PRICES.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-1 items-center gap-2 border-b border-line py-5 text-[15.5px] md:grid-cols-[230px_1fr_170px] md:gap-6"
            >
              <span className={row.highlight ? "font-semibold" : ""}>{row.label}</span>
              <div className="relative h-1.5 overflow-hidden rounded-[3px] bg-ink/7">
                <div
                  className={`absolute inset-y-0 origin-left rounded-[3px] transition-transform duration-[1300ms] ease-[cubic-bezier(.2,.8,.2,1)] ${row.highlight ? "bg-sig" : "bg-ink"}`}
                  style={{
                    left: `${row.from * 100}%`,
                    right: `${(1 - row.to) * 100}%`,
                    transform: `scaleX(${inView ? 1 : 0})`,
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              </div>
              <span className="font-semibold tabular-nums md:text-right">{row.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[14.5px] text-mut">
          Bars show relative ranges on a shared scale up to $3,000. Currencies as sourced.
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
