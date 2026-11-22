import { useEffect, useRef, useState } from "react";
import { STAT_VALUES } from "../content";
import { useLang } from "../i18n";
import { useInView } from "../lib/motion";

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
  locale,
  reduced,
}: {
  to: number;
  pre?: string;
  suf?: string;
  decimals?: number;
  locale: string;
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
      {value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace("-", "−")}
      {suf}
    </div>
  );
}

export function Intro({ reduced }: { reduced: boolean }) {
  const { t } = useLang();
  return (
    <section className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap">
        {t.intro.lines.map((l) => (
          <Reveal key={l} text={l} reduced={reduced} />
        ))}
        <div className="mt-16 grid grid-cols-2 border-t border-ink md:grid-cols-4">
          {t.intro.stats.map((s, i) => (
            <div
              key={i}
              className={[
                "pt-6.5 pr-6",
                i % 2 === 1 ? "border-l border-line pl-6" : "",
                i >= 2 ? "mt-6.5 border-t border-line md:mt-0 md:border-t-0" : "",
                i === 2 ? "md:border-l md:pl-6" : "",
              ].join(" ")}
            >
              <CountUp
                to={STAT_VALUES[i].to}
                decimals={STAT_VALUES[i].decimals}
                pre={s.pre}
                suf={s.suf}
                locale={t.locale}
                reduced={reduced}
              />
              <p className="mt-2.5 mb-0 text-[14.5px] text-mut">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
