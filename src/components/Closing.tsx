import { FACTS, FAQ } from "../content";

const SPEC = [
  [`${FACTS.signalMHz} MHz`, "Signal"],
  [FACTS.chip, "Sensing chip"],
  [`${FACTS.calibrationMin} min`, "Calibration"],
  [`${FACTS.touchZones}`, "Touch zones today"],
  [`€${FACTS.buildCostEur}`, "Build cost"],
] as const;

const TIMELINE = [
  ["Now", "Three button proof of concept with one sensor chip."],
  ["Next", "More sensors for a full 2D surface, shorter calibration."],
  ["Then", "Testing with real gloves in real plants, then CE certification."],
] as const;

export function Status() {
  return (
    <section id="status" className="pb-[clamp(90px,13vw,180px)]">
      <div className="relative mx-2 rounded-[36px] bg-ink py-[clamp(48px,8vw,110px)] text-white md:mx-4">
        <div className="wrap">
          <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96] text-white">
            A working proof of concept.
          </h2>
          <p className="mb-4 max-w-[34em] text-mut-dark">
            The proof of concept already tells three touch points apart after a five minute calibration. It runs on one{" "}
            {FACTS.chip} gain and phase chip and standard {FACTS.signalMHz} MHz CMOS oscillators.
          </p>
          <div className="mt-14 grid grid-cols-2 border-t border-white/25 md:grid-cols-5">
            {SPEC.map(([value, name]) => (
              <div key={name} className="pt-4.5 pr-4">
                <b className="display block text-[clamp(26px,3vw,40px)] leading-[1.05] text-white">{value}</b>
                <span className="text-[13.5px] text-mut-dark">{name}</span>
              </div>
            ))}
          </div>
          <ul className="mt-10 grid list-none gap-7 p-0 md:grid-cols-3">
            {TIMELINE.map(([when, what], i) => (
              <li key={when} className={`border-t-2 pt-4 text-[15px] text-mut-dark ${i === 0 ? "border-sig" : "border-white/25"}`}>
                <strong className="mb-1 block font-medium text-white">{when}</strong>
                {what}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap faq grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <h2 className="display m-0 text-[clamp(40px,6vw,84px)] leading-[.96]">Questions.</h2>
        <div>
          {FAQ.map(({ q, a }) => (
            <details key={q} className="border-t border-line last:border-b">
              <summary className="display flex cursor-pointer justify-between gap-6 py-6 text-[clamp(24px,2.8vw,34px)] leading-[1.1]">
                {q}
              </summary>
              <p className="m-0 pb-6 text-mut">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pt-10 pb-18 text-sm text-mut">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>
          Hado{" "}
          <span className="font-jp" lang="ja">
            波動
          </span>
          , radio frequency user interface. Based on SkinTrack, CMU, 2016.{" "}
          <a href={FACTS.studyUrl} className="text-ink" target="_blank" rel="noreferrer">
            Read the study
          </a>
        </span>
        <span>© {new Date().getFullYear()} Cassava s. r. o.</span>
      </div>
    </footer>
  );
}
