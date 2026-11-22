import { PEOPLE, type Person } from "../content";
import { useLang } from "../i18n";

function Portrait({ p, alt }: { p: Person; alt: string }) {
  if (p.photo) {
    return (
      <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[22px] bg-ink/5">
        <img
          src={p.photo}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: p.photoPosition ?? "50% 40%" }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="display mb-6 grid aspect-[4/3] place-items-center rounded-[22px] border border-line text-[64px] leading-none"
    >
      {p.initials}
    </div>
  );
}

export function Team() {
  const { t } = useLang();
  return (
    <section id="team" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap">
        <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]">{t.team.title}</h2>
        <p className="mb-4 max-w-[34em] text-mut">{t.team.lead}</p>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {PEOPLE.map((p, i) => {
            const m = t.team.members[i];
            return (
              <article key={p.name}>
                <Portrait p={p} alt={m.photoAlt} />
                <div className="border-t border-ink pt-5">
                  <h3 className="display m-0 text-[clamp(30px,3.4vw,44px)] leading-none">{p.name}</h3>
                  <div className="mt-1.5 mb-4 text-[14.5px] font-semibold text-sig">{m.role}</div>
                  <p className="mb-4 text-mut">{m.bio}</p>
                  {m.highlights.length > 0 && (
                    <ul className="m-0 list-none p-0">
                      {m.highlights.map((h) => (
                        <li key={h} className="border-t border-line py-2.5 text-[15px]">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
