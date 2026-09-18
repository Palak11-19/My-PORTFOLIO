import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, characters } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { Character, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".about-copy p", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
      gsap.from(".about-fact", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-facts", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute top-10 -left-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />

      <div className="wrap relative">
        <SectionHeader
          index={about.index}
          kicker={about.kicker}
          title={about.title}
          italic={about.italic}
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="about-copy space-y-5 text-[16.5px] leading-relaxed text-muted lg:col-span-6">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute top-6 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
            <Character
              src={characters.sitting}
              alt="Palak Sharma seated, a calm professional portrait"
              className="relative z-10 mx-auto h-[380px] w-auto md:h-[460px]"
            />
          </div>
        </div>

        <div className="about-facts mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {about.facts.map((fact) => (
            <article
              key={fact.label}
              className="about-fact surface rounded-2xl px-5 py-4"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                {fact.label}
              </p>
              <p className="mt-1.5 text-[15px] font-medium text-ink">{fact.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
