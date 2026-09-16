"use client";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="relative border-t overflow-hidden" style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}>
      {/* top metallic edge */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      {/* subtle angular bg + vignette */}
      <div aria-hidden className="absolute inset-0 opacity-[0.55]" style={{ background: "var(--ws-background-angular)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 15%, rgba(244,245,246,0.04), transparent 60%)" }} />

      <div className="ws-container relative py-20 md:py-28">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em]" style={{ color: "var(--ws-text-muted)" }}>ABOUT — MOHIT KUMAR</p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>[ 01 / 06 ]</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-start">
          <Reveal>
            <h2 className="text-[34px] sm:text-[46px] lg:text-[54px] font-bold leading-[0.88] tracking-[-0.04em]">
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>Systems</span>
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>that stay</span>
              <span className="block ws-logo-wordmark">boring</span>
              <span className="block" style={{ color: "var(--ws-silver)" }}>under load.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="lg:pt-2">
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--ws-text-secondary)" }}>
                I design and build backend infrastructure — distributed systems, async pipelines, and payment-grade APIs. Most of my work lives at the intersection of <span style={{ color: "var(--ws-text-primary)" }} className="font-medium">reliability, performance, and clean design</span> — not cleverness.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Java", "Python", "C++", "Kotlin", "TypeScript", "Go"].map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] backdrop-blur" style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-titanium)", background: "rgba(244,245,246,0.06)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 flex flex-col">
            <div className="rounded-[20px] border p-7 md:p-8 flex flex-col backdrop-blur flex-1" style={{ background: "rgba(26,29,32,0.72)", borderColor: "var(--ws-border-subtle)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>BIO — JODHPUR, INDIA → REMOTE</span>
                <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--ws-text-secondary)" }}>
                I ship systems that hold under load — exactly-once payments, resilient delivery, sub-500ms reads. The principle is simple: <em style={{ color: "var(--ws-text-primary)" }}>exactly-once is a design property, not a retry loop</em>. Prometheus metrics and Grafana dashboards decide what ships.
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
                Currently going deep on caching strategies, system design, and scalability — and building distributed webhook infrastructure.
              </p>
              <div className="mt-auto pt-8 grid grid-cols-3 gap-4">
                {[
                  { k: "Specs", v: "300+" },
                  { k: "Papers", v: "3" },
                  { k: "Systems", v: "8" },
                  { k: "LeetCode", v: "400+" },
                  { k: "Codeforces · Pupil", v: "1300+" },
                  { k: "CodeChef · DSA", v: "1500+" },
                ].map((s) => (
                  <div key={s.k} className="rounded-[14px] border px-4 py-4 text-center" style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)" }}>
                    <div className="text-[22px] font-bold tracking-[-0.03em]" style={{ color: "var(--ws-text-primary)" }}>{s.v}</div>
                    <div className="font-mono text-[10px] tracking-[0.14em] uppercase mt-1" style={{ color: "var(--ws-text-muted)" }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 grid gap-4">
            <Reveal delay={80}>
              <div className="rounded-[20px] border p-6 backdrop-blur" style={{ background: "rgba(36,40,44,0.75)", borderColor: "var(--ws-border-subtle)" }}>
                <p className="font-mono text-[11px] tracking-[0.16em] mb-4" style={{ color: "var(--ws-text-muted)" }}>HOW I WORK</p>
                <div className="space-y-4">
                  {[
                    { t: "Boring under load", d: "No surprises at 3am is the goal." },
                    { t: "Exactly-once, damn it", d: "Idempotency is the design, not the patch." },
                    { t: "Measure, then claim", d: "Prometheus numbers, not vibes." },
                  ].map((i) => (
                    <div key={i.t} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--ws-silver)" }} />
                      <div>
                        <div className="text-[13px] font-semibold" style={{ color: "var(--ws-text-primary)" }}>{i.t}</div>
                        <div className="text-[13px]" style={{ color: "var(--ws-text-muted)" }}>{i.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-[20px] border p-6 flex items-center justify-between overflow-hidden relative" style={{ background: "var(--ws-text-primary)", borderColor: "var(--ws-border-subtle)" }}>
                <div>
                  <div className="text-[13px] font-semibold tracking-[-0.01em]" style={{ color: "var(--ws-text-inverse)" }}>Have a hard problem?</div>
                  <div className="text-[12px] mt-1" style={{ color: "rgba(8,10,12,0.6)" }}>Open to software roles & research — 2026</div>
                </div>
                <a href="#contact" className="shrink-0 rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.08em]" style={{ background: "var(--ws-text-inverse)", color: "var(--ws-text-primary)" }}>
                  SAY HI →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
