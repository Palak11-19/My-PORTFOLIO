import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characters, projectTicker, projects } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { Character, Ticker } from "./ui";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".proj-card", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-grid", start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute top-16 left-0 font-display text-[18vw] leading-none text-ink/[0.035] select-none"
        aria-hidden
      >
        WORK
      </div>

      <div className="wrap relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">03</span>
              <span className="h-px w-8 bg-line" />
              <span>Selected work</span>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">
              Now showing, <em className="italic">quietly.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            A streaming-calm index of products, systems, and editorial builds. Data-driven —
            swap the array, keep the room.
          </p>
        </div>

        <div className="surface mt-10 overflow-hidden rounded-2xl py-3">
          <Ticker
            items={projectTicker}
            itemClassName="font-mono text-[11px] tracking-[0.24em] uppercase text-ink"
            separator="▶"
          />
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="relative hidden lg:col-span-4 lg:block">
            <div className="absolute top-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
            <Character
              src={characters.pointingRight}
              alt="Palak pointing toward the project cards"
              className="relative z-10 mx-auto h-[420px]"
            />
          </div>

          <div className="proj-grid grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {projects.map((project, i) => (
              <a
                key={project.id}
                href={project.href}
                className={cn(
                  "proj-card group surface relative flex flex-col overflow-hidden rounded-[1.6rem] p-5 transition-transform duration-300 hover:-translate-y-1",
                  i === 0 && "sm:col-span-2 sm:flex-row sm:items-end sm:gap-8",
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-muted">{project.year}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.blurb}</p>
                  <p className="mt-3 text-sm font-medium text-ink">{project.outcome}</p>
                </div>
                <div className={cn("mt-4", i === 0 && "sm:mt-0 sm:min-w-[200px]")}>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      Match
                    </span>
                    <span className="font-display text-2xl text-accent">
                      {project.match}%
                    </span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-canvas">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${project.match}%` }}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
