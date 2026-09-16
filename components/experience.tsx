"use client";
import { Reveal } from "./reveal";
import { FEDMEET_PAPER } from "@/lib/links";

type Entry = {
  role: string;
  org: string;
  meta?: string;
  bullets: string[];
  tags: string[];
  stats?: { k: string; v: string }[];
  highlight?: boolean;
  link?: { label: string; href: string };
};

const ITEMS: Entry[] = [
  {
    role: "Federated Learning Researcher — IIT Jodhpur",
    org: "JUN 2025 – JUL 2025 · JODHPUR, IN",
    meta: "FedMeet — published at ACM ICDCN '26",
    bullets: [
      "Federated learning research with FedMeet, reaching 85% accuracy on meeting client sensor data.",
      "Built an IMU-based engagement system with XGBoost and ONNX, achieving 91.19% cross-validation accuracy.",
      "Integrated the model into backend workflows with communication-aware updates and productivity feedback.",
    ],
    tags: ["Python", "Flower", "BiLSTM", "XGBoost", "ONNX"],
    stats: [
      { k: "Accuracy", v: "85%" },
      { k: "CV Score", v: "91.19%" },
      { k: "Campus", v: "Jodhpur" },
    ],
    highlight: true,
    link: { label: "READ PAPER", href: FEDMEET_PAPER },
  },
  {
    role: "NLP → Solidity Compiler — IIT Jodhpur",
    org: "SEP 2025 – JAN 2026 · JODHPUR, IN",
    bullets: [
      "Designed a three-phase pipeline that turns natural-language intent into secure Solidity contracts.",
      "Built validated JSON extraction, rule-constrained generation, and automated compilation repair.",
      "Integrated Slither, Mythril, and Semgrep with LLM-based patching for vulnerability detection and fixes.",
    ],
    tags: ["Solidity", "Python", "Slither", "Mythril", "Semgrep", "LLM"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t"
      style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)" }}
    >
      {/* distinct from About (#15181b): Work stays on #101214 with steel hatching + radial */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,245,246,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,246,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 85% 0%, rgba(244,245,246,0.05), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(125,130,135,0.08), transparent 60%)",
        }}
      />

      <div className="ws-container relative py-20 md:py-28">
        {/* header row */}
        <Reveal>
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="h-px w-12 shrink-0" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
              WORK — EXPERIENCE
            </p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
              [ 03 / 06 ]
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-10 items-start">
          {/* left statement */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.18em] mb-4" style={{ color: "var(--ws-text-muted)" }}>
                2025 → 2026 — RESEARCH
              </p>
              <h2 className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold leading-[0.88] tracking-[-0.045em]">
                <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                  Research
                </span>
                <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                  that
                </span>
                <span className="block ws-logo-wordmark">actually</span>
                <span className="block" style={{ color: "var(--ws-silver)" }}>
                  shipped.
                </span>
              </h2>
              <p className="mt-6 max-w-[460px] text-[14.5px] leading-[1.7]" style={{ color: "var(--ws-text-secondary)" }}>
                Federated learning, privacy-preserving activity recognition, and an NLP-to-Solidity compiler — work that
                left the lab. Published at ACM ICDCN &apos;26 and Elsevier&apos;s Theoretical Computer Science.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2"
                  style={{ borderColor: "var(--ws-border-subtle)", background: "var(--ws-surface-1)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                    IIT JODHPUR — CLASS OF 2026
                  </span>
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em]" style={{ color: "var(--ws-text-muted)" }}>
                  Open to full-time software roles · 2026
                </span>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 hidden lg:flex items-center gap-3 font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
                <span className="h-px w-8" style={{ background: "var(--ws-border-subtle)" }} />
                SCROLL → TIMELINE
              </div>
            </Reveal>
          </div>

          {/* right timeline / bento */}
          <div className="relative pl-6 sm:pl-8">
            {/* vertical spine */}
            <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px" style={{ background: "var(--ws-border-subtle)" }} />

            <div className="space-y-4">
              {ITEMS.map((e, i) => (
                <Reveal key={e.role} delay={i * 90}>
                  <div className="relative">
                    {/* dot */}
                    <span
                      aria-hidden
                      className="absolute -left-[25px] sm:-left-[33px] top-[28px] h-[9px] w-[9px] rounded-full border"
                      style={{
                        background: e.highlight ? "var(--ws-text-primary)" : "var(--ws-bg)",
                        borderColor: e.highlight ? "var(--ws-text-primary)" : "var(--ws-border-strong)",
                        boxShadow: e.highlight ? "0 0 0 4px rgba(244,245,246,0.12)" : "none",
                      }}
                    />
                    <div
                      className="group relative overflow-hidden rounded-[20px] border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: e.highlight ? "var(--ws-surface-1)" : "rgba(21,24,27,0.72)",
                        borderColor: e.highlight ? "var(--ws-border-default)" : "var(--ws-border-subtle)",
                        boxShadow: e.highlight ? "0 16px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(244,245,246,0.06) inset" : "0 8px 24px rgba(0,0,0,0.2)",
                        backdropFilter: e.highlight ? undefined : "blur(8px)",
                      }}
                    >
                      {/* sheen */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                        style={{ background: "var(--ws-gradient-sheen-dark)" }}
                      />
                      {/* subtle top highlight for featured */}
                      {e.highlight && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                          style={{ background: "var(--ws-gradient-edge-dark)" }}
                        />
                      )}

                      <div className="relative">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[14.5px] font-semibold tracking-[-0.015em] leading-tight" style={{ color: "var(--ws-text-primary)" }}>
                            {e.role}
                          </h3>
                          {e.highlight ? (
                            <span
                              className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em]"
                              style={{ background: "var(--ws-text-primary)", color: "var(--ws-text-inverse)" }}
                            >
                              IITJ
                            </span>
                          ) : (
                            <span className="hidden sm:inline-flex h-6 w-6 items-center justify-center rounded-full border text-[10px]" style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-muted)" }}>
                              →
                            </span>
                          )}
                        </div>

                        <p className="font-mono text-[11px] tracking-[0.08em] mt-1.5" style={{ color: "var(--ws-text-muted)" }}>
                          {e.org}
                        </p>
                        {e.meta && (
                          <p className="font-mono text-[10.5px] tracking-[0.06em] mt-1" style={{ color: "var(--ws-titanium)" }}>
                            {e.meta}
                          </p>
                        )}

                        <ul className="mt-3.5 space-y-2">
                          {e.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ws-text-secondary)" }}>
                              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--ws-silver)" }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {e.highlight && e.stats && (
                          <div className="mt-5 grid grid-cols-3 gap-2">
                            {e.stats.map((s) => (
                              <div
                                key={s.k}
                                className="rounded-[12px] border px-2.5 py-3 text-center"
                                style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)" }}
                              >
                                <div className="text-[11px] font-bold tracking-[-0.01em] leading-none" style={{ color: "var(--ws-text-primary)" }}>
                                  {s.v}
                                </div>
                                <div className="font-mono text-[9px] tracking-[0.14em] uppercase mt-1.5" style={{ color: "var(--ws-text-muted)" }}>
                                  {s.k}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {e.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none"
                              style={{
                                borderColor: "var(--ws-border-subtle)",
                                color: "var(--ws-titanium)",
                                background: e.highlight ? "rgba(244,245,246,0.06)" : "rgba(244,245,246,0.04)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {e.link && (
                          <a
                            href={e.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] transition hover:gap-2.5"
                            style={{ color: "var(--ws-text-secondary)" }}
                          >
                            {e.link.label}
                            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                              ↗
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={270}>
              <p className="font-mono text-[10px] tracking-[0.14em] mt-6 pl-1" style={{ color: "var(--ws-text-muted)" }}>
                * CGPA & details on request — transcript available.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
