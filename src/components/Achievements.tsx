import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements, characters, featuredNote } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { Character, Ticker } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const ticker = [
  "AWARDS",
  "LEADERSHIP",
  "PUBLICATIONS",
  "FELLOWSHIPS",
  "NOTES FROM THE FIELD",
];

export function Achievements() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".note-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="recognition"
      ref={root}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="wrap">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">05</span>
          <span className="h-px w-8 bg-line" />
          <span>Achievements · Leadership · Publications</span>
        </div>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] md:text-6xl">
          Proof, people, and <em className="italic">the page.</em>
        </h2>

        <div className="mt-8 overflow-hidden rounded-full border border-line bg-cream py-2">
          <Ticker
            items={ticker}
            reverse
            itemClassName="font-mono text-[10px] tracking-[0.22em] uppercase text-muted"
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {achievements.map((item) => (
              <article key={item.id} className="note-card surface rounded-[1.4rem] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                    {item.kind}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{item.year}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-ink">{item.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="lg:col-span-5">
            <article className="note-card relative overflow-hidden rounded-[1.75rem] bg-accent p-7 text-canvas shadow-[0_24px_50px_-24px_rgba(255,255,255,0.12)]">
              <p className="font-mono text-[10px] tracking-[0.2em] text-canvas/70 uppercase">
                {featuredNote.kicker}
              </p>
              <p className="mt-4 font-display text-7xl leading-none">{featuredNote.stat}</p>
              <p className="mt-2 font-display text-2xl italic">{featuredNote.label}</p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-canvas/85">
                {featuredNote.body}
              </p>
            </article>
            <div className="relative mt-4">
              <div className="absolute top-8 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
              <Character
                src={characters.celebrating}
                alt="Palak celebrating with both arms raised"
                className="relative z-10 mx-auto h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
