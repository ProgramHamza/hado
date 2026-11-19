import { lazy, Suspense, useRef } from "react";

// three.js is large; load the background after the text so the hero paints immediately.
const WaveField = lazy(() => import("./WaveField").then((m) => ({ default: m.WaveField })));

const LINKS = [
  ["#how", "How it works"],
  ["#try", "Try it"],
  ["#cost", "Cost"],
  ["#calc", "Savings"],
  ["#team", "Team"],
  ["#faq", "Questions"],
] as const;

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line bg-bg/60 px-7 py-4 backdrop-blur-lg backdrop-saturate-150">
      <a href="#top" className="flex items-baseline gap-2 text-ink no-underline">
        <span className="display text-[28px] leading-none">Hado</span>
        <span className="font-jp text-sm text-mut" lang="ja">
          波動
        </span>
      </a>
      <div className="flex items-center gap-7">
        {LINKS.map(([href, text]) => (
          <a key={href} href={href} className="hidden text-sm font-medium text-ink no-underline md:inline">
            {text}
          </a>
        ))}
        <a href="#status" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white no-underline">
          Status
        </a>
      </div>
    </nav>
  );
}

export function Hero({ reduced }: { reduced: boolean }) {
  const readout = useRef({
    xy: null as HTMLElement | null,
    phase: null as HTMLElement | null,
    mag: null as HTMLElement | null,
  });

  return (
    <>
      <Suspense fallback={null}>
        <WaveField readout={readout} reduced={reduced} />
      </Suspense>
      <header className="relative flex min-h-svh flex-col justify-start pt-32 md:justify-center md:pt-0">
        <div className="wrap">
          <p className="mb-6 animate-rise text-sm font-semibold tracking-wide text-mut">
            <span className="font-jp" lang="ja">
              波動
            </span>{" "}
            · hadō · wave
          </p>
          <h1 className="display m-0 mb-7 max-w-[8.5em] animate-rise text-[clamp(56px,10vw,148px)] leading-[.9] [animation-delay:.12s]">
            Touch, carried by a wave.
          </h1>
          <p className="mb-8 max-w-[29em] animate-rise text-[clamp(17px,1.8vw,20px)] text-mut [animation-delay:.24s]">
            Hado reads an 80 MHz radio signal from a ring or glove to find where you touch. No glass to crack, no
            gloves to remove, no water to confuse it.
          </p>
          <div className="flex animate-rise flex-wrap gap-2.5 [animation-delay:.24s]">
            <a href="#how" className="rounded-full bg-ink px-6.5 py-3.5 text-[15px] font-medium text-white no-underline transition-transform hover:-translate-y-0.5">
              See how it works
            </a>
            <a href="#try" className="rounded-full border border-ink px-6.5 py-3.5 text-[15px] font-medium text-ink no-underline transition-transform hover:-translate-y-0.5">
              Try it
            </a>
          </div>

          <div className="mt-9 w-auto animate-rise rounded-[18px] border border-line bg-pan p-5 text-sm tabular-nums backdrop-blur-lg [animation-delay:.5s] md:absolute md:right-7 md:bottom-7 md:mt-0 md:w-[310px]">
            <b className="mb-2.5 block text-[12.5px] font-medium text-mut">
              Live sensor model. Move your pointer over the field.
            </b>
            {(
              [
                ["Touch X / Y", "xy", "0 / 0"],
                ["Phase shift", "phase", "0°"],
                ["Magnitude diff", "mag", "0.0 dB"],
              ] as const
            ).map(([name, key, initial]) => (
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
            <i className="mt-2 block text-[12.5px] text-mut not-italic">
              An illustration of the principle. The real chip is an AD8302.
            </i>
          </div>
        </div>
      </header>
    </>
  );
}
