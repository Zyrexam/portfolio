"use client";
import Link from "next/link";
import { Reveal } from "./reveal";
import { PostCard } from "./post-card";
import { HOME_POSTS } from "@/lib/posts";
import { MEDIUM } from "@/lib/links";

export function Research() {
  return (
    <section id="research" className="relative border-t overflow-hidden" style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)" }}>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(244,245,246,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,246,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 15%, rgba(244,245,246,0.03), transparent 60%)" }} />
      <div className="ws-container relative py-20 md:py-28">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em]" style={{ color: "var(--ws-text-muted)" }}>RESEARCH — PUBLISHED & WRITTEN</p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>[ 05 / 06 ]</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-end mb-10">
          <Reveal>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold leading-[0.9] tracking-[-0.04em]">
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>Published</span>
              <span className="block ws-logo-wordmark">& written.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[14.5px] leading-relaxed max-w-[46ch]" style={{ color: "var(--ws-text-secondary)" }}>
              Two peer-reviewed papers and the field notes behind them — federated learning, blockchain consensus, payments, and Java internals.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {HOME_POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] transition hover:brightness-110"
              style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)", background: "rgba(244,245,246,0.06)" }}
            >
              ALL ARTICLES <span aria-hidden>→</span>
            </Link>
            <a
              href={MEDIUM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] transition hover:brightness-110"
              style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-muted)" }}
            >
              MEDIUM <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
