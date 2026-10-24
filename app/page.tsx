import { Header } from "@/components/header";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { EMAIL, GITHUB, LEETCODE, LINKEDIN, MEDIUM } from "@/lib/links";

const SOCIALS = [
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: LINKEDIN },
  { label: "LeetCode", href: LEETCODE },
  { label: "Medium", href: MEDIUM },
] as const;

export default function Home() {
  return (
    <div className="bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
      <Header />

      {/* fixed left social rail */}
      <div className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 lg:flex">
        <ul className="flex flex-col items-center gap-5">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="transition-all hover:-translate-y-1 hover:text-[var(--ws-silver)]"
                style={{ color: "var(--ws-text-muted)" }}
              >
                <span className="block h-5 w-5 text-center font-mono text-[13px]">
                  {s.label[0]}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden className="h-24 w-px" style={{ background: "var(--ws-border-default)" }} />
      </div>

      {/* fixed right email rail */}
      <div className="fixed bottom-0 right-6 z-40 hidden flex-col items-center gap-5 lg:flex">
        <a
          href={`mailto:${EMAIL}`}
          className="transition-all hover:-translate-y-1 hover:text-[var(--ws-silver)]"
          style={{ writingMode: "vertical-rl", color: "var(--ws-text-muted)", fontSize: "12px", letterSpacing: "0.14em" }}
        >
          {EMAIL}
        </a>
        <span aria-hidden className="h-24 w-px" style={{ background: "var(--ws-border-default)" }} />
      </div>

      <main className="mx-auto max-w-6xl px-6 md:px-8 lg:px-16">
        {/* ── Hero ── */}
        <section className="flex min-h-screen flex-col justify-center pt-24">
          <p className="mb-5 font-mono text-sm tracking-widest" style={{ color: "var(--ws-silver)" }}>
            Hi, my name is
          </p>
          <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight sm:text-[64px] md:text-[76px]" style={{ color: "var(--ws-text-primary)" }}>
            Mohit Kumar.
          </h1>
          <h2 className="mt-1 text-[36px] font-bold leading-[1.05] tracking-tight sm:text-[54px] md:text-[64px]" style={{ color: "var(--ws-text-secondary)" }}>
            I build things for the web.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
            I&apos;m a software engineer building distributed systems, async pipelines, and payment-grade APIs where
            reliability, performance, and clean system design meet.
          </p>
          <div className="mt-10">
            <a
              href="#work"
              className="inline-flex items-center rounded border px-7 py-4 text-[14px] font-medium transition-colors hover:bg-[var(--ws-bg-interactive)]"
              style={{ borderColor: "var(--ws-silver)", color: "var(--ws-silver)" }}
            >
              Check out my work!
            </a>
          </div>
        </section>

        {/* ── Sections, one after another ── */}
        <About />
        <Experience />
        <Work />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />

      <style>{`html{scroll-behavior:smooth}`}</style>
    </div>
  );
}
