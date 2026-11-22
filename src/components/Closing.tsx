import { FACTS, PROTOTYPE_PHOTO_SRC } from "../content";
import { useLang } from "../i18n";
import { ContactForm } from "./ContactForm";

export function Status() {
  const { t } = useLang();
  const s = t.status;
  return (
    <section id="status" className="pb-[clamp(90px,13vw,180px)]">
      <div className="relative mx-2 rounded-xl bg-ink py-[clamp(48px,8vw,110px)] text-white md:mx-4">
        <div className="wrap">
          <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(34px,4.4vw,60px)] leading-[.96] text-white">
            {s.title}
          </h2>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,360px)] md:gap-16">
            <p className="m-0 max-w-[36em] text-mut-dark">{s.lead}</p>
            <figure className="m-0">
              <img
                src={PROTOTYPE_PHOTO_SRC}
                alt={s.photoAlt}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-lg object-cover object-[50%_62%]"
              />
              <figcaption className="mt-3 text-[13.5px] text-mut-dark">{s.photoCaption}</figcaption>
            </figure>
          </div>
          <div className="mt-14 grid grid-cols-2 border-t border-white/25 md:grid-cols-5">
            {s.spec.map(([value, name]) => (
              <div key={name} className="pt-4.5 pr-4">
                <b className="display block text-[clamp(26px,3vw,40px)] leading-[1.05] text-white">{value}</b>
                <span className="text-[13.5px] text-mut-dark">{name}</span>
              </div>
            ))}
          </div>
          <ul className="mt-10 grid list-none gap-7 p-0 md:grid-cols-2 lg:grid-cols-4">
            {s.timeline.map(([when, what], i) => (
              <li key={when} className={`border-t-2 pt-4 text-[15px] text-mut-dark ${i === 0 ? "border-sig" : "border-white/25"}`}>
                <strong className="mb-1 block font-medium text-white">{when}</strong>
                {what}
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-[46em]">
            <h3 className="display m-0 mb-4 text-[clamp(28px,3vw,40px)] leading-none text-white">{s.testTitle}</h3>
            <ol className="m-0 list-decimal pl-5 text-[15px] text-mut-dark marker:text-sig">
              {s.tests.map((x) => (
                <li key={x} className="py-1.5">
                  {x}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pilot() {
  const { t } = useLang();
  return (
    <section id="pilot" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap grid items-start gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div>
          <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(34px,4.4vw,60px)] leading-[.96]">{t.pilot.title}</h2>
          <p className="m-0 max-w-[34em] text-mut">{t.pilot.text}</p>
        </div>
        <div className="border-t border-ink pt-5.5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap faq grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <h2 className="display m-0 text-[clamp(34px,4.4vw,60px)] leading-[.96]">{t.faq.title}</h2>
        <div>
          {t.faq.items.map(({ q, a }) => (
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
  const { t } = useLang();
  return (
    <footer className="border-t border-line pt-10 pb-18 text-sm text-mut">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>
          Hado{" "}
          <span className="font-jp" lang="ja">
            波動
          </span>
          , {t.footer.text}{" "}
          <a href={FACTS.studyUrl} className="text-ink" target="_blank" rel="noreferrer">
            {t.footer.study}
          </a>
        </span>
        <span>© {new Date().getFullYear()} Cassava s. r. o.</span>
      </div>
    </footer>
  );
}
