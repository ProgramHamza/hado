import { FACTS } from "../content";

const section = "py-[clamp(90px,13vw,180px)]";
const h2 = "display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]";

export function How() {
  return (
    <section id="how" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <h2 className={h2}>One ring talks. The surface listens.</h2>
        <div>
          <p className="mb-4 max-w-[34em]">
            A small ring or glove sends a harmless {FACTS.signalMHz} MHz signal. A sensor array in the machine's pad reads
            how the signal arrives: how late, and how weak. The position of your fingertip falls out of the maths.
          </p>
          <p className="mb-4 max-w-[34em] text-mut">
            The principle comes from SkinTrack, published by researchers at Carnegie Mellon in 2016, which reached{" "}
            {FACTS.studyAccuracyPct}% touch detection and a {FACTS.studyErrorMm} mm mean error. We turned it around for
            industry and improved the design and the data analysis so it holds up in dirty, wet, real working conditions.
          </p>
        </div>
      </div>
    </section>
  );
}

export function NameMeaning() {
  return (
    <section className="pb-[clamp(60px,9vw,120px)]">
      <div className="wrap grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-20">
        <p className="m-0 font-jp text-[clamp(96px,16vw,220px)] leading-none text-ink" lang="ja" aria-hidden="true">
          波動
        </p>
        <div className="border-t border-ink pt-5.5">
          <p className="display m-0 mb-3 text-[clamp(32px,4vw,52px)] leading-none">Hadō, a wave.</p>
          <p className="m-0 max-w-[30em] text-mut">
            In Japanese, 波動 means wave, or wave motion. It is a nod to the {FACTS.signalMHz} MHz radio waves that power
            the interface, and a name that is short and easy to say in any language.
          </p>
        </div>
      </div>
    </section>
  );
}

const VARIANTS = [
  {
    title: "Terminal",
    who: "Factories, foundries, food plants, oil rigs",
    text: "The worker wears a glove or ring that emits the signal. The machine has a flat RF pad that reads it. Sealed, wipeable, and only the wearer can press a button: not a splash, not a sleeve.",
  },
  {
    title: "On skin",
    who: "Trades, field work and everyday use",
    text: "The back of the hand becomes the pad, with no hardware on the machine at all. It can control a phone, a smartwatch or a wireless panel.",
  },
];

export function Variants() {
  return (
    <section className={section}>
      <div className="wrap">
        <h2 className={h2}>Two ways to wear it.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {VARIANTS.map((v) => (
            <div key={v.title} className="border-t border-ink pt-5.5">
              <h3 className="display m-0 mb-2 text-[44px] leading-none">{v.title}</h3>
              <div className="mb-3 text-[14.5px] font-semibold text-sig">{v.who}</div>
              <p className="m-0 text-mut">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
