import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { characters, site, socials } from "@/data/portfolio";
import { ArrowIcon, Character, Magnetic } from "./ui";
import { Ticker } from "./ui";
import { cn } from "@/utils/cn";

type Status = "idle" | "loading" | "success" | "error";

const ticker = [
  "OPEN CHANNEL",
  "HELLO@ARIAVALE.STUDIO",
  "SELECT COLLABORATIONS",
  "SAN FRANCISCO · PT",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const next: Record<string, string> = {};
    const first = String(data.get("firstName") ?? "").trim();
    const last = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent");

    if (!first) next.firstName = "First name is required.";
    if (!last) next.lastName = "Last name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email.";
    if (message.length < 10) next.message = "Tell me a little more (10+ characters).";
    if (!consent) next.consent = "Please confirm I may reply to this message.";
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validate(data);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    form.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute top-10 right-0 font-display text-[16vw] leading-none text-ink/[0.04] select-none"
        aria-hidden
      >
        HELLO
      </div>

      <div className="wrap relative">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">06</span>
          <span className="h-px w-8 bg-line" />
          <span>Contact</span>
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">
          Send a quiet <em className="italic">signal.</em>
        </h2>

        <div className="mt-8 overflow-hidden rounded-full border border-line bg-cream py-2">
          <Ticker
            items={ticker}
            itemClassName="font-mono text-[10px] tracking-[0.22em] uppercase text-muted"
          />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass relative rounded-[1.85rem] p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="firstName"
                  name="firstName"
                  label="First name"
                  autoComplete="given-name"
                  error={errors.firstName}
                />
                <Field
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  error={errors.lastName}
                />
              </div>
              <div className="mt-4">
                <Field
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  error={errors.email}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={inputClass(Boolean(errors.message))}
                  placeholder="A project, a question, a hello."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-5">
                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-1 h-4 w-4 rounded border-line accent-accent"
                  />
                  <span>
                    I give permission to store this message so {site.firstName} can
                    reply. No newsletters, no lists.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="mt-1 text-sm text-red-400">{errors.consent}</p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button
                    type="submit"
                    className="btn-primary disabled:cursor-wait disabled:opacity-70"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Transmitting…" : "Send message"}
                    <ArrowIcon />
                  </button>
                </Magnetic>
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium text-ink"
                    >
                      Transmission received. I’ll write back soon.
                    </motion.p>
                  )}
                  {status === "error" && Object.keys(errors).length > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400"
                    >
                      A few fields need attention.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute top-8 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
              <Character
                src={characters.thumbsUp}
                alt="Palak giving a thumbs up"
                className="relative z-10 mx-auto h-[320px]"
              />
            </div>
            <ul className="mt-2 grid gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-canvas"
                  >
                    <span>{s.label}</span>
                    <span className="font-mono text-[11px] tracking-widest opacity-60">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={inputClass(Boolean(error))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "mt-1.5 w-full rounded-2xl border bg-cream px-4 py-3 text-[15px] text-ink outline-none transition-shadow",
    invalid
      ? "border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
      : "border-line focus:border-ink/30 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]",
  );
}
