import { useEffect, useRef, useState } from "react";
import { FACTS } from "../content";
import { useInView } from "../lib/motion";

const LINES = ["Touch without glass.", "Work without taking gloves off.", "Control a machine with your own hand."];

/** Statement that brightens as it scrolls into view. */
function Reveal({ text, reduced }: { text: string; reduced: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (window.innerHeight * 0.82 - r.top) / (window.innerHeight * 0.3)));
      el.style.opacity = reduced ? "1" : (0.16 + 0.84 * t).toFixed(3);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);
  return (
    <p ref={ref} className="display m-0 mb-[.22em] text-[clamp(38px,6.4vw,92px)] leading-none transition-opacity duration-200">
      {text}
    </p>
  );
}

function CountUp({ to, pre = "", suf = "", reduced }: { to: number; pre?: string; suf?: string; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  const [value, setValue] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 1400);
      setValue(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);
  return (
    <div ref={ref} className="display text-[clamp(44px,5.4vw,78px)] leading-none tracking-[-.03em] tabular-nums">
      {pre}
      {Math.round(value).toLocaleString("en-US")}
      {suf}
    </div>
  );
}

export function Intro({ reduced }: { reduced: boolean }) {
  const stats = [
    { to: 1400, pre: "€700 to ", text: "What an industrial capacitive touchscreen terminal costs today, and it still fails in water." },
    { to: FACTS.buildCostEur, pre: "€", text: `Build cost per Hado unit, with about ${FACTS.assemblyMin} minutes of assembly.` },
    { to: FACTS.undercutPct[1], pre: `${FACTS.undercutPct[0]} to `, suf: "%", text: "Target undercut against rugged glass terminals." },
    { to: FACTS.ruggedMarketUsdB, pre: "$", suf: "B", text: `Rugged display market in 2025 (${FACTS.ruggedMarketSource}).` },
  ];
  return (
    <section className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap">
        {LINES.map((l) => (
          <Reveal key={l} text={l} reduced={reduced} />
        ))}
        <div className="mt-16 grid grid-cols-2 border-t border-ink md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.text}
              className={[
                "pt-6.5 pr-6",
                i % 2 === 1 ? "border-l border-line pl-6" : "",
                i >= 2 ? "mt-6.5 border-t border-line md:mt-0 md:border-t-0" : "",
                i === 2 ? "md:border-l md:pl-6" : "",
              ].join(" ")}
            >
              <CountUp to={s.to} pre={s.pre} suf={s.suf} reduced={reduced} />
              <p className="mt-2.5 mb-0 text-[14.5px] text-mut">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
