import { BENEFITS, FACTS, LATER_VARIANT, SITES } from "../content";

const section = "py-[clamp(90px,13vw,180px)]";
const h2 = "display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]";

export function How() {
  return (
    <section id="how" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <h2 className={h2}>One glove talks. The panel listens.</h2>
        <div>
          <p className="mb-4 max-w-[34em]">
            A small insert sewn into company-issued work gloves sends a coded signal in a licence-free ISM band (
            {FACTS.ismBands}). Sensors around a sealed, glass-free panel measure how the signal arrives, how late and how
            weak, and the position of the fingertip falls out of the maths. The code says which glove it was.
          </p>
          <p className="mb-4 max-w-[34em]">
            The panel sits next to the screen you already have and replaces the touch or keypad input. The display and
            the computer stay as they are. No rings on the factory floor: near rotating machinery they are a hazard, so
            the emitter lives in the glove.
          </p>
          <p className="mb-4 max-w-[34em] text-mut">
            The principle builds on SkinTrack, published by Carnegie Mellon researchers in 2016, which located touches from
            the phase of a signal travelling through the body. We turned it around for industry: emitter in the glove,
            sensors in the panel, a code per operator.
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
            In Japanese, 波動 means wave, or wave motion. It is a nod to the radio waves that carry every press, and a
            name that is short and easy to say in any language.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Sites() {
  return (
    <section id="where" className={section}>
      <div className="wrap">
        <h2 className={h2}>Built for the coldest, wettest panels first.</h2>
        <p className="mb-4 max-w-[34em] text-mut">
          We start where gloves are thickest, surfaces are wet and there is no rotating machinery at the terminal.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {SITES.map((s) => (
            <div key={s.title} className="border-t border-ink pt-5.5">
              <div className="mb-3 text-[14.5px] font-semibold text-sig">{s.when}</div>
              <h3 className="display m-0 mb-3 text-[40px] leading-none">{s.title}</h3>
              <p className="m-0 text-mut">{s.text}</p>
            </div>
          ))}
        </div>
        <LaterVariant />
      </div>
    </section>
  );
}

/** Clearly secondary consumer variant: ring emitter, back of the hand as the pad. */
function LaterVariant() {
  const v = LATER_VARIANT;
  return (
    <aside className="mt-16 grid gap-6 rounded-[28px] border border-dashed border-line p-7 md:grid-cols-[auto_1fr] md:gap-12 md:p-9">
      <div>
        <div className="mb-2 text-[14.5px] font-semibold text-mut">{v.when} · consumer</div>
        <h3 className="display m-0 text-[clamp(30px,3.4vw,40px)] leading-none text-mut">{v.title}</h3>
      </div>
      <div>
        <p className="m-0 mb-3 max-w-[40em] text-mut">{v.text}</p>
        <p className="m-0 max-w-[40em] text-[14.5px] text-mut">{v.note}</p>
      </div>
    </aside>
  );
}

export function Benefits() {
  return (
    <section className={section}>
      <div className="wrap">
        <h2 className={h2}>What changes on the floor.</h2>
        <div className="mt-12 grid border-t border-ink md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.h} className="border-b border-line py-6 md:pr-10">
              <h3 className="m-0 mb-2 text-[17px] font-semibold">{b.h}</h3>
              <p className="m-0 text-[15.5px] text-mut">{b.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
