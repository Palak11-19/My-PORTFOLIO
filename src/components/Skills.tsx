import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characters, skillCategories, skillTicker } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { Character, Ticker } from "./ui";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(skillCategories[0].id);
  const reduced = usePrefersReducedMotion();
  const category = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".skill-chip", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skill-bento", start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!spot.current || reduced) return;
    gsap.fromTo(
      spot.current,
      { y: 12, opacity: 0.4 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [active, reduced]);

  return (
    <section id="skills" ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div className="wrap">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">04</span>
          <span className="h-px w-8 bg-line" />
          <span>Capabilities</span>
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">
          A kit built for <em className="italic">shipping.</em>
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === cat.id
                  ? "bg-accent text-canvas shadow-[0_10px_24px_-12px_rgba(255,255,255,0.15)]"
                  : "bg-cream text-muted hover:text-ink",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skill-bento mt-8 grid gap-4 lg:grid-cols-12">
          <div
            ref={spot}
            className="surface relative overflow-hidden rounded-[1.75rem] p-6 md:p-8 lg:col-span-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {category.index} · Spotlight
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">
                  {category.label}
                </h3>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-muted">{category.description}</p>
            <div className="mt-6 -mx-6 border-y border-line bg-canvas/70 py-2">
              <Ticker
                items={skillTicker}
                slow
                itemClassName="font-mono text-[10px] tracking-[0.22em] uppercase text-muted"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:bg-accent hover:text-canvas"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="surface relative flex min-h-[280px] items-end justify-center overflow-hidden rounded-[1.75rem] lg:col-span-4">
            <div className="absolute top-10 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
            <Character
              src={characters.coding}
              alt="Palak coding on a laptop"
              className="relative z-10 h-[300px] md:h-[340px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
