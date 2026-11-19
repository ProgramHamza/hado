import { TEAM, type Member } from "../content";

function Avatar({ m }: { m: Member }) {
  if (m.photo) {
    return <img src={m.photo} alt="" className="size-20 rounded-full object-cover" loading="lazy" />;
  }
  return (
    <div
      aria-hidden="true"
      className="display grid size-20 place-items-center rounded-full border border-ink text-[34px] leading-none"
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
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {TEAM.map((m) => (
            <article key={m.name} className="border-t border-ink pt-6">
              <div className="mb-5 flex items-center gap-5">
                <Avatar m={m} />
                <div>
                  <h3 className="display m-0 text-[clamp(30px,3.4vw,44px)] leading-none">{m.name}</h3>
                  <div className="mt-1.5 text-[14.5px] font-semibold text-sig">{m.role}</div>
                </div>
              </div>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
