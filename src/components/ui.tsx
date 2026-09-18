import {
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import gsap from "gsap";
import { cn } from "@/utils/cn";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks";

export function Magnetic({
  children,
  strength = 0.38,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !fine) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </div>
  );
}

export function Ticker({
  items,
  reverse = false,
  slow = false,
  separator = "◆",
  className,
  itemClassName,
}: {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
  separator?: string;
  className?: string;
  itemClassName?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className={cn("px-4", itemClassName)}>{item}</span>
          <span className="text-[0.65rem] opacity-50" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden>
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        {row}
        <div aria-hidden className="flex shrink-0 items-center">
          {items.map((item, i) => (
            <span key={`dup-${item}-${i}`} className="flex items-center">
              <span className={cn("px-4", itemClassName)}>{item}</span>
              <span className="text-[0.65rem] opacity-50">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({
  index,
  kicker,
  title,
  italic,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  italic?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span>{kicker}</span>
      </div>
      <h2 className="mt-4 max-w-xl font-display text-4xl leading-[0.95] text-ink md:text-6xl">
        {title}
        {italic ? <em className="italic text-ink/80"> {italic}</em> : null}
      </h2>
    </header>
  );
}

export function Character({
  src,
  alt,
  className,
  float = true,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  float?: boolean;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "pointer-events-none select-none object-contain",
        float && "animate-float",
        className,
      )}
    />
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
