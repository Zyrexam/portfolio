"use client";
import Link from "next/link";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";
import { HOME_PROJECTS } from "@/lib/projects";

export function Work() {
  return (
    <section
      id="work"
      className="relative border-t overflow-hidden"
      style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}
    >
      {/* metallic top edge */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      {/* angular wash + vignette */}
      <div aria-hidden className="absolute inset-0 opacity-[0.45]" style={{ background: "var(--ws-background-angular)" }} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(244,245,246,0.04), transparent 60%)" }}
      />

      <div className="ws-container relative py-20 md:py-28">
        {/* header row */}
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12 shrink-0" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
              WORK — SELECTED SYSTEMS
            </p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
              [ 04 / 06 ]
            </p>
          </div>
        </Reveal>

        {/* title + intro */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-end mb-10">
          <Reveal>
            <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[0.88] tracking-[-0.04em]">
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                Selected
              </span>
              <span className="block ws-logo-wordmark">systems.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[14.5px] leading-relaxed lg:pb-1.5 max-w-[46ch]" style={{ color: "var(--ws-text-secondary)" }}>
              Production-grade systems — payments, edge caching, delivery, and storage. Built to stay boring under load,
              then measured with Prometheus and Grafana. The rest live on the projects page.
            </p>
          </Reveal>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {HOME_PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] backdrop-blur transition hover:brightness-110"
              style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)", background: "rgba(244,245,246,0.06)" }}
            >
              ALL PROJECTS <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
