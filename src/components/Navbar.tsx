import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { characters, nav, site } from "@/data/portfolio";
import { useActiveSection, useScrollProgress } from "@/hooks";
import { Magnetic } from "./ui";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(nav.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-accent origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="fixed top-4 right-0 left-0 z-50 flex justify-center px-3">
        <nav
          className={cn(
            "glass flex w-full max-w-3xl items-center justify-between gap-3 rounded-full px-2 py-2 md:px-3",
            scrolled && "shadow-[0_18px_50px_-24px_rgba(16,16,16,0.35)]",
          )}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1"
          >
            <img
              src={characters.portrait}
              alt=""
              className="h-9 w-9 rounded-full object-cover object-top ring-2 ring-line"
            />
            <span className="font-display text-lg tracking-tight">{site.monogram}</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  active === item.id
                    ? "bg-accent text-canvas"
                    : "text-muted hover:text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic>
              <a href="#contact" className="btn-primary hidden !px-4 !py-2 text-[13px] sm:inline-flex">
                Let’s talk
              </a>
            </Magnetic>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-[1.5px] w-4 bg-ink transition-transform",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-[5px] left-0 h-[1.5px] w-4 bg-ink transition-opacity",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-4 bg-ink transition-transform",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-canvas/95 pt-24 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="wrap flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: i * 0.05 } }}
                  className="border-b border-line py-4 font-display text-4xl"
                >
                  <span className="mr-3 font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 self-start"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
