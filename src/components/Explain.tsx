import { useLang } from "../i18n";

const section = "py-[clamp(90px,13vw,180px)]";
const h2 = "display m-0 mb-6.5 max-w-[11em] text-[clamp(34px,4.4vw,60px)] leading-[.96]";

export function How() {
  const { t } = useLang();
  return (
    <section id="how" className={section}>
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <h2 className={h2}>{t.how.title}</h2>
        <div>
          <p className="mb-4 max-w-[34em]">{t.how.p1}</p>
          <p className="mb-4 max-w-[34em]">{t.how.p2}</p>
          <p className="mb-4 max-w-[34em] text-mut">{t.how.p3}</p>
        </div>
      </div>
    </section>
  );
}

export function NameMeaning() {
  const { t } = useLang();
  return (
    <section className="pb-[clamp(60px,9vw,120px)]">
      <div className="wrap grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-20">
        <p className="m-0 font-jp text-[clamp(96px,16vw,220px)] leading-none text-ink" lang="ja" aria-hidden="true">
          波動
        </p>
        <div className="border-t border-ink pt-5.5">
          <p className="display m-0 mb-3 text-[clamp(32px,4vw,52px)] leading-none">{t.name.title}</p>
          <p className="m-0 max-w-[30em] text-mut">{t.name.text}</p>
        </div>
      </div>
    </section>
  );
}

export function Sites() {
  const { t } = useLang();
  const s = t.sites;
  return (
    <section id="where" className={section}>
      <div className="wrap">
        <h2 className={h2}>{s.title}</h2>
        <p className="mb-4 max-w-[34em] text-mut">{s.lead}</p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {s.items.map((it) => (
            <div key={it.title} className="border-t border-ink pt-5.5">
              <div className="mb-3 text-[14.5px] font-semibold text-sig">{it.when}</div>
              <h3 className="display m-0 mb-3 text-[40px] leading-none">{it.title}</h3>
              <p className="m-0 text-mut">{it.text}</p>
            </div>
          ))}
        </div>
        {/* Clearly secondary consumer variant: ring emitter, back of the hand as the pad. */}
        <aside className="mt-16 grid gap-6 rounded-xl border border-dashed border-line p-7 md:grid-cols-[auto_1fr] md:gap-12 md:p-9">
          <div>
            <div className="mb-2 text-[14.5px] font-semibold text-mut">{s.later.when}</div>
            <h3 className="display m-0 text-[clamp(30px,3.4vw,40px)] leading-none text-mut">{s.later.title}</h3>
          </div>
          <div>
            <p className="m-0 mb-3 max-w-[40em] text-mut">{s.later.text}</p>
            <p className="m-0 max-w-[40em] text-[14.5px] text-mut">{s.later.note}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function Benefits() {
  const { t } = useLang();
  return (
    <section className={section}>
      <div className="wrap">
        <h2 className={h2}>{t.benefits.title}</h2>
        <div className="mt-12 grid border-t border-ink md:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((b) => (
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
