import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles — Mohit Kumar",
  description:
    "Peer-reviewed papers and field notes on federated learning, blockchain consensus, payment idempotency, and Java internals.",
};

export default function ArticlesPage() {
  return (
    <div className="bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
      {/* header block */}
      <div
        className="relative overflow-hidden border-b"
        style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}
      >
        <Header />
        <div aria-hidden className="absolute inset-0 opacity-[0.5]" style={{ background: "var(--ws-background-angular)" }} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 80% 0%, rgba(244,245,246,0.05), transparent 60%)" }}
        />

        <div className="ws-container relative pt-28 pb-16 md:pt-32 md:pb-20">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] transition hover:gap-3"
              style={{ color: "var(--ws-text-muted)" }}
            >
              <span aria-hidden>←</span> BACK HOME
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 flex items-center gap-4 mb-8">
              <span className="h-px w-12 shrink-0" style={{ background: "var(--ws-border-strong)" }} />
              <p className="text-[11px] font-medium tracking-[0.22em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
                ALL ARTICLES
              </p>
              <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-end">
            <Reveal delay={100}>
              <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-[0.88] tracking-[-0.045em]">
                <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                  Papers &
                </span>
                <span className="block ws-logo-wordmark">field notes.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[14.5px] leading-relaxed lg:pb-1.5 max-w-[48ch]" style={{ color: "var(--ws-text-secondary)" }}>
                Peer-reviewed work and the essays around it — federated learning, blockchain consensus, payment
                idempotency, and Java internals. Every card opens the source.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* all entries */}
      <section
        className="relative border-t overflow-hidden"
        style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)" }}
      >
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
          style={{ background: "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(244,245,246,0.04), transparent 55%)" }}
        />

        <div className="ws-container relative py-20 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {POSTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="h-full">
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter backHref="/#research" backAriaLabel="Back to the home page highlights" />
    </div>
  );
}
