import { useEffect, useRef, useState } from "react";
import { FACTS } from "../content";
import { useInView } from "../lib/motion";

const LINES = ["Keep the gloves on.", "Nothing to fog, crack or freeze.", "Every press signed by the glove that made it."];

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

function CountUp({
  to,
  pre = "",
  suf = "",
  decimals = 0,
  reduced,
}: {
  to: number;
  pre?: string;
  suf?: string;
  decimals?: number;
  reduced: boolean;
}) {
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
      {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace("-", "−")}
      {suf}
    </div>
  );
}

export function Intro({ reduced }: { reduced: boolean }) {
  const stats = [
    {
      to: FACTS.freezerC,
      suf: " °C",
      text: "Freezer warehouses, where operators wear thick insulated gloves and screens fog with condensation.",
    },
    {
      to: FACTS.pcapGloveMm,
      pre: "~",
      suf: " mm",
      text: "Roughly the glove thickness today's glove-mode touchscreens are specified for. Insulated gloves are thicker.",
    },
    {
      to: FACTS.testErrorMm,
      pre: "< ",
      suf: " mm",
      text: "Pass mark for our go/no-go test: mean touch error with no per-user calibration.",
    },
    {
      to: FACTS.hmiMarketUsdB,
      pre: "$",
      suf: "B",
      decimals: 1,
      text: `Industrial HMI terminal market in 2025 (${FACTS.hmiMarketSource}).`,
    },
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
              <CountUp to={s.to} pre={s.pre} suf={s.suf} decimals={s.decimals} reduced={reduced} />
              <p className="mt-2.5 mb-0 text-[14.5px] text-mut">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
