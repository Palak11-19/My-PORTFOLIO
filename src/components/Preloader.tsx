import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { preloaderMessages, site } from "@/data/portfolio";

const BUBBLES = [
  { left: "8%", delay: 0, size: 18, duration: 7.5 },
  { left: "18%", delay: 1.2, size: 10, duration: 9 },
  { left: "27%", delay: 0.4, size: 22, duration: 8.2 },
  { left: "41%", delay: 2.1, size: 14, duration: 10 },
  { left: "53%", delay: 0.8, size: 9, duration: 7.8 },
  { left: "64%", delay: 1.6, size: 20, duration: 9.4 },
  { left: "73%", delay: 0.2, size: 12, duration: 8.6 },
  { left: "84%", delay: 2.4, size: 16, duration: 7.2 },
  { left: "91%", delay: 1.1, size: 11, duration: 9.8 },
  { left: "12%", delay: 3, size: 8, duration: 6.8 },
  { left: "48%", delay: 2.8, size: 26, duration: 11 },
  { left: "78%", delay: 3.4, size: 13, duration: 8 },
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      const t = window.setTimeout(onComplete, 280);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    const duration = 2100;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 420);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete, reduced]);

  const message = useMemo(() => {
    if (progress < 22) return preloaderMessages[0];
    if (progress < 44) return preloaderMessages[1];
    if (progress < 66) return preloaderMessages[2];
    if (progress < 92) return preloaderMessages[3];
    return preloaderMessages[4];
  }, [progress]);

  const r = 46;
  const c = 2 * Math.PI * r;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-canvas"
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="animate-bubble pointer-events-none absolute bottom-[-40px] rounded-full"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.02))"
                : "radial-gradient(circle, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
            boxShadow: "0 0 24px rgba(255,255,255,0.08)",
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-8 overflow-hidden rounded-full border border-line/80 bg-cream/80 px-4 py-1.5">
          <motion.p
            key={message}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase"
          >
            {message}
          </motion.p>
        </div>

        <div className="relative grid h-32 w-32 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="#262626"
              strokeWidth="1.25"
            />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress / 100)}
            />
          </svg>
          <div className="grid h-24 w-24 place-items-center rounded-full bg-accent shadow-[0_12px_40px_-18px_rgba(255,255,255,0.12)]">
            <span className="font-display text-3xl tracking-tight text-canvas">
              {site.monogram}
            </span>
          </div>
        </div>

        <p className="mt-8 font-display text-2xl italic text-ink/80 md:text-3xl">
          {site.signature}
        </p>
        <p className="mt-2 font-mono text-xs tracking-[0.28em] text-muted uppercase">
          {site.name}
        </p>

        <div className="mt-10 flex items-end gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
            LOAD
          </span>
          <span className="font-display text-5xl leading-none tabular-nums text-ink md:text-6xl">
            {String(progress).padStart(3, "0")}
            <span className="text-accent">%</span>
          </span>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-line">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
