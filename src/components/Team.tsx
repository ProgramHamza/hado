import { TEAM, type Member } from "../content";

function Portrait({ m }: { m: Member }) {
  if (m.photo) {
    return (
      <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[22px] bg-ink/5">
        <img
          src={m.photo}
          alt={m.photoAlt ?? m.name}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: m.photoPosition ?? "50% 40%" }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="display mb-6 grid aspect-[4/3] place-items-center rounded-[22px] border border-line text-[64px] leading-none"
    >
      {m.initials}
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="py-[clamp(90px,13vw,180px)]">
      <div className="wrap">
        <h2 className="display m-0 mb-6.5 max-w-[11em] text-[clamp(40px,6vw,84px)] leading-[.96]">
          The people behind the wave.
        </h2>
        <p className="mb-4 max-w-[34em] text-mut">
          A small team from Bratislava, Slovakia, with roots in robotics research. Hado is developed by Cassava s. r. o.
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {TEAM.map((m) => (
            <article key={m.name}>
              <Portrait m={m} />
              <div className="border-t border-ink pt-5">
                <h3 className="display m-0 text-[clamp(30px,3.4vw,44px)] leading-none">{m.name}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
