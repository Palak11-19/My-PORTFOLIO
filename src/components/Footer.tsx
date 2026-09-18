import { focusAreas, site, socials } from "@/data/portfolio";
import { Ticker } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-10 pb-8">
      <div className="wrap">
        <div className="overflow-hidden rounded-full border border-line bg-cream py-2">
          <Ticker
            items={[
              "END OF TRANSMISSION",
              "STATUS · NOMINAL",
              site.location.toUpperCase(),
              site.role.toUpperCase(),
            ]}
            reverse
            itemClassName="font-mono text-[10px] tracking-[0.22em] uppercase text-muted"
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              Focus
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {focusAreas.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 text-center">
            <p className="font-display text-[22vw] leading-[0.78] tracking-tight text-ink sm:text-[16vw] md:text-[8.4vw]">
              {site.firstName}
              <br />
              {site.lastName}
            </p>
            <p className="mt-4 font-display text-xl italic text-muted md:text-2xl">
              {site.signature}
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              Location
            </p>
            <p className="mt-3 text-sm text-muted">
              {site.location}
              <br />
              {site.timezone}
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-ink">
                {s.label}
              </a>
            ))}
            <a href="#top" className="hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
