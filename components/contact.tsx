"use client";
import { useState } from "react";
import { Reveal } from "./reveal";
import { EMAIL, GITHUB, LEETCODE, LINKEDIN, RESUME } from "@/lib/links";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Try again or email directly.");
    } finally {
      setSending(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t overflow-hidden"
      style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}
    >
      {/* elevated surface: angular + edge + vignette */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ background: "var(--ws-background-angular)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 85% 0%, rgba(244,245,246,0.05), transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(244,245,246,0.03), transparent 60%)" }} />

      <div className="ws-container relative py-20 md:py-28">
        {/* eyebrow */}
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em]" style={{ color: "var(--ws-text-muted)" }}>
              CONTACT — LET&apos;S TALK
            </p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
              [ 06 / 06 ]
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-10 items-start">
          {/* LEFT — editorial CTA */}
          <div className="relative">
            <Reveal>
              <h2 className="text-[38px] sm:text-[52px] lg:text-[62px] font-bold leading-[0.86] tracking-[-0.05em]">
                <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                  I run toward
                </span>
                <span className="block ws-logo-wordmark">hard</span>
                <span className="block" style={{ color: "var(--ws-silver)" }}>
                  problems.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-6 max-w-[520px]">
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--ws-text-secondary)" }}>
                  Payments, caching, CDNs, compilers — if you need{" "}
                  <span className="font-medium" style={{ color: "var(--ws-text-primary)" }}>
                    systems that don&apos;t break
                  </span>
                  , tell me what you&apos;re building. Open to full-time software engineering roles, research
                  collaborations, and freelance systems work.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2"
                    style={{ borderColor: "var(--ws-border-subtle)", background: "rgba(244,245,246,0.04)" }}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                      OPEN TO FULL-TIME SOFTWARE ROLES — 2026
                    </span>
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
                    Reply &lt; 12 hours
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[520px]">
                <div className="rounded-[16px] border px-4 py-4" style={{ background: "rgba(26,29,32,0.55)", borderColor: "var(--ws-border-subtle)" }}>
                  <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>
                    LOCATION
                  </p>
                  <p className="mt-1.5 text-[13.5px] font-medium" style={{ color: "var(--ws-text-primary)" }}>
                    Jodhpur, India — IST (UTC+5:30)
                  </p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--ws-text-muted)" }}>
                    Remote worldwide
                  </p>
                </div>
                <div className="rounded-[16px] border px-4 py-4" style={{ background: "rgba(26,29,32,0.55)", borderColor: "var(--ws-border-subtle)" }}>
                  <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>
                    CURRENTLY
                  </p>
                  <p className="mt-1.5 text-[13.5px] font-medium" style={{ color: "var(--ws-text-primary)" }}>
                    IIT Jodhpur — B.Tech, Class of 2026
                  </p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--ws-text-muted)" }}>
                    Jodhpur • Graduating May 2026
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { label: "GitHub", href: GITHUB },
                  { label: "LinkedIn", href: LINKEDIN },
                  { label: "LeetCode", href: LEETCODE },
                  { label: "Resume", href: RESUME },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium tracking-[0.06em] transition hover:brightness-125"
                    style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)", background: "rgba(244,245,246,0.04)" }}
                  >
                    {s.label} <span className="transition group-hover:translate-x-0.5">↗</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* large watermark index */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-4 hidden lg:block select-none font-bold leading-none tracking-[-0.06em] opacity-[0.04]"
              style={{ fontSize: "180px", color: "var(--ws-text-primary)" }}
            >
              06
            </div>
          </div>

          {/* RIGHT — contact card */}
          <Reveal delay={90}>
            <div
              className="relative rounded-[24px] border backdrop-blur overflow-hidden"
              style={{ background: "rgba(26,29,32,0.78)", borderColor: "var(--ws-border-subtle)", boxShadow: "0 18px 50px rgba(0,0,0,0.42)" }}
            >
              {/* subtle sheen border */}
              <div aria-hidden className="absolute inset-0 rounded-[24px] opacity-[0.5]" style={{ background: "var(--ws-gradient-sheen-dark)" }} />

              <div className="relative p-6 sm:p-7 md:p-8">
                {/* card header */}
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>
                    CONTACT CARD — MOHIT KUMAR
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1" style={{ borderColor: "var(--ws-border-subtle)", background: "rgba(244,245,246,0.05)" }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                    <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
                      ONLINE
                    </span>
                  </span>
                </div>

                {/* email row */}
                <div
                  className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[14px] border px-4 py-4"
                  style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)" }}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>
                      EMAIL — PREFERRED
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 block font-mono text-[13px] sm:text-[14px] font-medium tracking-[-0.01em] truncate hover:underline underline-offset-4"
                      style={{ color: "var(--ws-text-primary)" }}
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 inline-flex items-center justify-center rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.1em] transition active:scale-[0.98]"
                    style={{
                      borderColor: copied ? "rgba(34,197,94,0.4)" : "var(--ws-border-default)",
                      background: copied ? "rgba(34,197,94,0.12)" : "var(--ws-text-primary)",
                      color: copied ? "#22c55e" : "var(--ws-text-inverse)",
                    }}
                  >
                    {copied ? "COPIED ✓" : "COPY"}
                  </button>
                </div>

                {/* form */}
                <div className="mt-6">
                  <p className="font-mono text-[11px] tracking-[0.16em] mb-3" style={{ color: "var(--ws-text-muted)" }}>
                    QUICK MESSAGE
                  </p>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="font-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                          NAME
                        </span>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Ada Lovelace"
                          className="mt-1.5 w-full rounded-[10px] border px-3.5 py-2.5 text-[13.5px] outline-none transition placeholder:text-[13px] focus:border-[var(--ws-border-strong)]"
                          style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-primary)" }}
                        />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                          EMAIL
                        </span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          placeholder="ada@company.com"
                          className="mt-1.5 w-full rounded-[10px] border px-3.5 py-2.5 text-[13.5px] outline-none transition placeholder:text-[13px] focus:border-[var(--ws-border-strong)]"
                          style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-primary)" }}
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="font-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                        MESSAGE
                      </span>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        placeholder="Tell me about the project, timeline, and what 'precise' means to you…"
                        rows={4}
                        className="mt-1.5 w-full resize-none rounded-[12px] border px-3.5 py-3 text-[13.5px] leading-relaxed outline-none transition placeholder:text-[13px] focus:border-[var(--ws-border-strong)]"
                        style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-primary)" }}
                      />
                    </label>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative mt-4 inline-flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-[14px] text-[12px] font-bold tracking-[0.14em] transition hover:brightness-110 active:brightness-95 disabled:opacity-60"
                      style={{ background: sent ? "#22c55e" : "var(--ws-text-primary)", color: "var(--ws-text-inverse)" }}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                        style={{ background: "var(--ws-gradient-sheen-dark)" }}
                      />
                      <span className="relative flex items-center gap-2">
                        {sending ? "SENDING…" : sent ? "SENT ✓" : "SEND MESSAGE"} {!sending && !sent && <span className="transition group-hover:translate-x-0.5">→</span>}
                      </span>
                    </button>
                  </form>
                  {(sent || error) && (
                    <p className="mt-2 text-center font-mono text-[10px] tracking-[0.08em]" style={{ color: error ? "#ef4444" : "#22c55e" }}>
                      {error || "Message sent — I'll get back to you soon."}
                    </p>
                  )}
                  {!sent && !error && (
                    <p className="mt-2 text-center font-mono text-[10px] tracking-[0.08em]" style={{ color: "var(--ws-text-muted)" }}>
                      Direct email — no tracking, no spam.
                    </p>
                  )}
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
