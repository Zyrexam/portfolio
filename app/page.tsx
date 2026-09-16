import { Header } from "@/components/header";
import { ParticleGlobe } from "@/components/particle-globe";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Work } from "@/components/work";
import { Research } from "@/components/research";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div id="top" className="bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
      <div className="relative min-h-screen overflow-hidden">
        <Header />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,18,20,0.82)_0%,rgba(16,18,20,0.48)_38%,transparent_62%)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(244,245,246,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,246,0.9) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        </div>

        <main className="relative z-10 grid min-h-screen lg:grid-cols-[1.02fr_0.98fr] items-center gap-6 ws-container !px-6 lg:!px-8">
          <div className="flex flex-col items-start text-left py-24 pt-28 lg:py-12">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border px-3.5 py-1.5" style={{ borderColor: "var(--ws-border-subtle)", background: "rgba(244,245,246,0.04)" }}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
              <span className="text-[11px] font-medium tracking-[0.18em]" style={{ color: "var(--ws-text-muted)" }}>
                OPEN TO FULL-TIME SOFTWARE ROLES — 2026
              </span>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.2em]" style={{ color: "var(--ws-text-muted)" }}>
              <span>MOHIT KUMAR</span>
              <span aria-hidden style={{ color: "var(--ws-border-strong)" }}>
                /
              </span>
              <span style={{ color: "var(--ws-text-secondary)" }}>SOFTWARE ENGINEER</span>
              <span aria-hidden style={{ color: "var(--ws-border-strong)" }}>
                /
              </span>
              <span>IIT JODHPUR &apos;26</span>
            </div>

            <h1 className="max-w-[640px] text-[38px] font-bold leading-[0.9] tracking-[-0.045em] sm:text-[56px] lg:text-[66px]">
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>Simple.</span>
              <span className="block ws-logo-wordmark">Reliable.</span>
              <span className="block" style={{ color: "var(--ws-silver)" }}>Fast.</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-[14px] leading-relaxed tracking-[0.01em] sm:text-[15px]" style={{ color: "var(--ws-text-secondary)" }}>
              I&apos;m Mohit — a software engineer building distributed systems, async pipelines, and{" "}
              <span className="font-medium" style={{ color: "var(--ws-text-primary)" }}>
                payment-grade APIs
              </span>{" "}
              where reliability, performance, and clean system design meet.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex h-[44px] items-center justify-center rounded-[10px] px-7 text-[12px] font-semibold tracking-[0.14em] transition hover:brightness-110 active:brightness-95"
                style={{ background: "var(--ws-text-primary)", color: "var(--ws-text-inverse)" }}
              >
                VIEW WORK
              </a>
              <a
                href="#contact"
                className="inline-flex h-[44px] items-center justify-center rounded-[10px] border px-7 text-[12px] font-semibold tracking-[0.14em] backdrop-blur transition hover:bg-[var(--ws-bg-interactive)]"
                style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)" }}
              >
                GET IN TOUCH →
              </a>
            </div>

            <p className="mt-10 hidden text-[10px] tracking-[0.22em] sm:block" style={{ color: "var(--ws-text-muted)" }}>
              300+ SPECIFICATIONS · 3 PAPERS · 8 SYSTEMS · LEETCODE 400+ — IIT JODHPUR &apos;26
            </p>
          </div>

          <div className="hidden lg:block relative h-full min-h-[560px]">
            <ParticleGlobe />
          </div>
          <div className="lg:hidden relative h-[380px] w-full">
            <ParticleGlobe />
          </div>
        </main>
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.28em]" style={{ color: "var(--ws-text-muted)" }}>SCROLL</span>
          <div className="h-8 w-px overflow-hidden" style={{ background: "var(--ws-border-subtle)" }}>
            <div className="h-full w-full animate-[scrollLine_1.6s_ease-in-out_infinite]" style={{ background: "var(--ws-text-muted)" }} />
          </div>
        </div>
      </div>

      <About />
      <Skills />
      <Experience />
      <Work />
      <Research />
      <Contact />
      <SiteFooter />

      <style>{`@keyframes scrollLine{0%{transform:translateY(-100%)}to{transform:translateY(100%)}} html{scroll-behavior:smooth}`}</style>
    </div>
  );
}
