import { FACTS, FAQ, PROTOTYPE_PHOTO, TEST_CRITERIA } from "../content";

const SPEC = [
  [`${FACTS.touchZones}`, "Touch zones today"],
  [`${FACTS.calibrationMin} min`, "Calibration today"],
  ["ISM", `Licence-free band, ${FACTS.ismBands}`],
  [FACTS.prototypeBomEur, "Prototype bill of materials"],
  [FACTS.seriesTargetEur, "Series cost target"],
] as const;

const TIMELINE = [
  ["Q1 2027", "Three-month go/no-go validation (below). If it fails, we stop or change course."],
  ["Q3 2027", "Industrial prototype and two paid pilots or letters of intent in cold storage."],
  ["2028", "CE certification and first revenue in 2028 to 2029."],
] as const;

export function Status() {
  return (
    <section id="status" className="pb-[clamp(90px,13vw,180px)]">
      <div className="relative mx-2 rounded-[36px] bg-ink py-[clamp(48px,8vw,110px)] text-white md:mx-4">
        <div className="wrap">
          <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96] text-white">
            A lab proof of concept, honestly.
          </h2>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,360px)] md:gap-16">
            <p className="m-0 max-w-[36em] text-mut-dark">
              Today the proof of concept tells three touch zones apart after a five-minute calibration, on a single gain
              and phase receiver. Before we build a product, we put it through a test that can say no.
            </p>
            <figure className="m-0">
              <img
                src={PROTOTYPE_PHOTO.src}
                alt={PROTOTYPE_PHOTO.alt}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[22px] object-cover object-[50%_62%]"
              />
              <figcaption className="mt-3 text-[13.5px] text-mut-dark">{PROTOTYPE_PHOTO.caption}</figcaption>
            </figure>
          </div>
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
          <div className="mt-12 max-w-[46em]">
            <h3 className="display m-0 mb-4 text-[clamp(28px,3vw,40px)] leading-none text-white">The go/no-go test</h3>
            <ol className="m-0 list-decimal pl-5 text-[15px] text-mut-dark marker:text-sig">
              {TEST_CRITERIA.map((t) => (
                <li key={t} className="py-1.5">
                  {t}
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
  const email = FACTS.contactEmail;
  return (
    <section id="pilot" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap grid items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]">
            Run a pilot in your cold store.
          </h2>
          <p className="m-0 max-w-[34em] text-mut">
            We are looking for cold-storage, logistics and port sites where operators fight touchscreens in thick gloves.
            Tell us about one panel and the gloves your people wear, and we will come and test it with you.
          </p>
        </div>
        <div className="border-t border-ink pt-5.5">
          {email ? (
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("Hado pilot interest")}`}
              className="inline-block rounded-full bg-ink px-6.5 py-3.5 text-[15px] font-medium text-white no-underline transition-transform hover:-translate-y-0.5"
            >
              Register pilot interest
            </a>
          ) : (
            <p className="m-0 text-mut">Contact details coming soon.</p>
          )}
          {email && <p className="mt-3 mb-0 text-[14.5px] text-mut">{email}</p>}
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
