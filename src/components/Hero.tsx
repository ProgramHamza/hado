import { lazy, Suspense, useRef } from "react";
import { useLang, type Lang } from "../i18n";

// three.js is large; load the background after the text so the hero paints immediately.
const WaveField = lazy(() => import("./WaveField").then((m) => ({ default: m.WaveField })));

const LANGS: Lang[] = ["en", "sk"];

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.nav.language} className="inline-flex overflow-hidden rounded-md border border-ink text-[13px] font-semibold">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className="cursor-pointer border-0 bg-transparent px-2.5 py-1.5 text-ink uppercase aria-pressed:bg-ink aria-pressed:text-white"
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useLang();
  const links = [
    ["#how", t.nav.how],
    ["#where", t.nav.where],
    ["#try", t.nav.try],
    ["#pricing", t.nav.pricing],
    ["#team", t.nav.team],
    ["#faq", t.nav.faq],
  ] as const;
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/60 px-5 py-4 backdrop-blur-lg backdrop-saturate-150 md:px-7">
      <a href="#top" className="flex items-baseline gap-2 text-ink no-underline">
        <span className="display text-[28px] leading-none">Hado</span>
        <span className="font-jp text-sm text-mut" lang="ja">
          波動
        </span>
      </a>
      <div className="flex items-center gap-4 lg:gap-7">
        {links.map(([href, text]) => (
          <a key={href} href={href} className="hidden text-sm font-medium text-ink no-underline lg:inline">
            {text}
          </a>
        ))}
        <LangSwitch />
        <a href="#pilot" className="rounded-md bg-ink px-4 py-2 text-sm font-medium whitespace-nowrap text-white no-underline">
          {t.nav.pilot}
        </a>
      </div>
    </nav>
  );
}

export function Hero({ reduced }: { reduced: boolean }) {
  const { t } = useLang();
  const h = t.hero;
  const readout = useRef({
    xy: null as HTMLElement | null,
    phase: null as HTMLElement | null,
    op: null as HTMLElement | null,
  });
  const rows = [
    [h.readoutXY, "xy", "0 / 0"],
    [h.readoutPhase, "phase", "0°"],
    [h.readoutOperator, "op", h.operatorValue],
  ] as const;

  return (
    <>
      <Suspense fallback={null}>
        <WaveField readout={readout} reduced={reduced} />
      </Suspense>
      {/* Text stays in the left half on desktop and the top half on phones; the wave field fills the other half. */}
      <header className="relative flex min-h-svh flex-col justify-start pt-28 pb-10 lg:justify-center lg:pt-24">
        <div className="wrap w-full">
          <div className="lg:max-w-[52%]">
            <p className="mb-5 animate-rise text-sm font-semibold tracking-wide text-mut">
              <span className="font-jp" lang="ja">
                波動
              </span>{" "}
              · hadō · {h.wave}
            </p>
            <h1 className="display m-0 mb-6 animate-rise text-[clamp(42px,5.6vw,84px)] leading-[.98] [animation-delay:.12s]">
              {h.title}
            </h1>
            <p className="mb-8 max-w-[30em] animate-rise text-[clamp(16px,1.5vw,19px)] text-mut [animation-delay:.24s]">
              {h.lead}
            </p>
            <div className="flex animate-rise flex-wrap gap-2.5 [animation-delay:.24s]">
              <a href="#how" className="rounded-md bg-ink px-6.5 py-3.5 text-[15px] font-medium text-white no-underline transition-transform hover:-translate-y-0.5">
                {h.ctaHow}
              </a>
              <a href="#pilot" className="rounded-md border border-ink px-6.5 py-3.5 text-[15px] font-medium text-ink no-underline transition-transform hover:-translate-y-0.5">
                {h.ctaPilot}
              </a>
            </div>
          </div>

          {/* The readout explains pointer interaction, so it only shows where there is a pointer and room beside the field. */}
          <div className="hidden animate-rise rounded-lg border border-line bg-pan p-4 text-[13px] tabular-nums backdrop-blur-lg [animation-delay:.5s] lg:absolute lg:right-7 lg:bottom-7 lg:block lg:w-[270px]">
            <b className="mb-2.5 block text-[12.5px] font-medium text-mut">{h.readoutTitle}</b>
            {rows.map(([name, key, initial]) => (
              <div key={key} className="flex justify-between border-t border-line py-1.5">
                <span>{name}</span>
                <span
                  className="font-semibold"
                  ref={(el) => {
                    readout.current[key] = el;
                  }}
                >
                  {initial}
                </span>
              </div>
            ))}
            <i className="mt-2 block text-[12.5px] text-mut not-italic">{h.readoutNote}</i>
          </div>
        </div>
      </header>
    </>
  );
}
