import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characters, experience } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { Character, SectionHeader } from "./ui";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%" },
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          ScrollTrigger.create({
            trigger: card,
            start: "top 120",
            endTrigger: cards[i + 1],
            end: "top 140",
            scrub: true,
            onUpdate: (self) => {
              gsap.set(card, {
                scale: 1 - self.progress * 0.04,
                filter: `brightness(${1 - self.progress * 0.08})`,
              });
            },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={root}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="wrap">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <SectionHeader
              index="02"
              kicker="Experience"
              title="A timeline of"
              italic="making things real."
            />
            <p className="mt-5 max-w-sm text-muted">
              Internships, product roles, freelance, and research — each a chapter in
              learning how teams actually ship.
            </p>
            <div className="relative mt-6 hidden lg:block">
              <div className="absolute top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
              <Character
                src={characters.presenting}
                alt="Palak presenting with open hands"
                className="relative z-10 mx-auto h-[380px]"
              />
            </div>
          </div>

          <div className="relative lg:col-span-7">
            {experience.map((job, i) => (
              <article
                key={job.id}
                className={cn(
                  "exp-card sticky mb-5 overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_16px_40px_-24px_rgba(16,16,16,0.25)] md:p-8",
                  job.accent
                    ? "border-accent/20 bg-accent text-canvas"
                    : "border-line bg-cream text-ink",
                )}
                style={{ top: `${6.5 + i * 1.15}rem` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={cn(
                        "font-mono text-[11px] tracking-[0.2em] uppercase",
                        job.accent ? "text-canvas/70" : "text-accent",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")} · {job.type}
                    </p>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl">
                      {job.company}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        job.accent ? "text-canvas/80" : "text-muted",
                      )}
                    >
                      {job.role}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "shrink-0 text-right font-mono text-[11px] tracking-wide",
                      job.accent ? "text-canvas/70" : "text-muted",
                    )}
                  >
                    {job.dates}
                    <br />
                    {job.location}
                  </p>
                </div>
                <p
                  className={cn(
                    "mt-5 max-w-xl text-[15px] leading-relaxed",
                    job.accent ? "text-canvas/85" : "text-muted",
                  )}
                >
                  {job.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.metrics.map((m) => (
                    <li
                      key={m}
                      className={cn(
                        "rounded-full px-3 py-1 text-[12px] font-medium",
                        job.accent
                          ? "bg-canvas/15 text-canvas"
                          : "bg-accent-soft text-ink",
                      )}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
