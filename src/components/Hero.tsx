import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  characters,
  marqueePrimary,
  marqueeSecondary,
  site,
} from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks";
import { ArrowIcon, Character, Magnetic, Ticker } from "./ui";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ready || !root.current) return;

    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { y: 18, opacity: 0, duration: 0.6 })
        .from(
          ".hero-line",
          { y: 72, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=0.25",
        )
        .from(".hero-body", { y: 20, opacity: 0, duration: 0.55 }, "-=0.45")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.3")
        .from(".hero-avatar", { y: 36, opacity: 0, scale: 0.96, duration: 1 }, "-=0.85")
        .from(".hero-marquee", { y: 24, opacity: 0, duration: 0.6 }, "-=0.7");
    }, root);

    return () => ctx.revert();
  }, [ready, reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(avatarRef.current, {
        x: x * 18,
        y: y * 14,
        duration: 1.1,
        ease: "power3.out",
      });
      gsap.to(typeRef.current, {
        x: x * -36,
        y: y * -18,
        duration: 1.3,
        ease: "power3.out",
      });
      gsap.to(lightRef.current, {
        x: e.clientX * 0.12,
        y: e.clientY * 0.08,
        duration: 1.4,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-screen overflow-hidden pt-28"
    >
      <div
        ref={typeRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden
      >
        <span className="font-display text-[28vw] leading-none text-ink/[0.035] md:text-[22vw]">
          VALE
        </span>
      </div>

      <div
        ref={lightRef}
        className="pointer-events-none absolute top-24 left-1/4 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[10%] bottom-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="wrap relative grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-5 lg:py-16">
          <div className="hero-kicker flex items-center gap-3">
            <img
              src={characters.portrait}
              alt="Portrait of Palak Sharma"
              className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-line shadow-md"
            />
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                {site.location}
              </p>
              <p className="text-sm text-ink/80">{site.availability}</p>
            </div>
          </div>

          <h1 className="mt-8 font-display text-5xl leading-[0.92] text-ink sm:text-6xl lg:text-[4.4rem]">
            {site.headline.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="hero-line inline-block">
                  {line === "automation." ? (
                    <>
                      <em className="italic">automation</em>.
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-body mt-6 max-w-md text-base leading-relaxed text-muted md:text-[17px]">
            {site.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic className="hero-cta">
              <a href="#work" className="btn-primary">
                See selected work <ArrowIcon />
              </a>
            </Magnetic>
            <Magnetic className="hero-cta">
              <a href="#contact" className="btn-secondary">
                Start a project
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div
            ref={avatarRef}
            className="hero-avatar relative mx-auto max-w-lg lg:max-w-none"
          >
            <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl md:h-80 md:w-80" />
            <Character
              src={characters.standing}
              alt="Palak Sharma, a 3D character standing with a calm professional smile"
              priority
              className="relative z-10 mx-auto h-[58vh] max-h-[640px] w-auto md:h-[70vh]"
            />
          </div>
        </div>
      </div>

      <div className="hero-marquee relative z-10 mt-4 mb-8 md:mt-2">
        <div className="origin-left -rotate-1 border-y border-line bg-cream py-3">
          <Ticker
            items={marqueePrimary}
            itemClassName="font-mono text-[11px] tracking-[0.22em] uppercase text-ink"
          />
        </div>
        <div className="origin-left rotate-1 bg-accent py-3 text-canvas shadow-[0_18px_40px_-24px_rgba(255,255,255,0.15)]">
          <Ticker
            items={marqueeSecondary}
            reverse
            separator="●"
            itemClassName="font-mono text-[11px] tracking-[0.22em] uppercase"
          />
        </div>
      </div>
    </section>
  );
}
