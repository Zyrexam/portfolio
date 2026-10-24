import { Header } from "@/components/header";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { EMAIL, FEDMEET_PAPER, GITHUB, LEETCODE, LINKEDIN, MEDIUM, TCS_PAPER } from "@/lib/links";
import { ArrowRight } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: GITHUB, icon: "github" },
  { label: "LinkedIn", href: LINKEDIN, icon: "linkedin" },
  { label: "LeetCode", href: LEETCODE, icon: "leetcode" },
  { label: "Medium", href: MEDIUM, icon: "medium" },
] as const;

function SocialIcon({ name }: { name: (typeof SOCIALS)[number]["icon"] }) {
  const shared = {
    "aria-hidden": true as const,
    className: "h-[18px] w-[18px]",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.75,
    viewBox: "0 0 24 24",
  };

  if (name === "github") {
    return <svg {...shared} fill="currentColor" stroke="none"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.94 2.3 3.81 1.63.1-.71.4-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.61 5.22-5.1 5.5.41.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  }

  if (name === "linkedin") {
    return <svg {...shared} fill="currentColor" stroke="none"><path d="M5.2 7.7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.4 9.2H7v11.4H3.4V9.2Zm5.8 0h3.5v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.3 4.3 5.3v6.4h-3.7v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.8H9.2V9.2Z" /></svg>;
  }

  if (name === "leetcode") {
    return <img aria-hidden="true" className="h-5 w-[17px] object-contain brightness-0 invert opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" src="/icons/leetcode-dark.svg" />;
  }

  return <img aria-hidden="true" className="h-[18px] w-[18px] object-contain brightness-0 invert opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" src="/icons/medium.svg" />;
}

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
                className="group grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-[var(--ws-silver)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-silver)]"
                style={{ color: "var(--ws-text-muted)" }}
              >
                <SocialIcon name={s.icon} />
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
        <section id="about" className="scroll-mt-24 flex flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-16">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(250px,0.65fr)]">
            <div className="max-w-4xl">
            <p className="mb-5 text-[13px] font-medium tracking-wide" style={{ color: "var(--ws-text-secondary)" }}>
              Software engineer <span aria-hidden="true" style={{ color: "var(--ws-silver)" }}>·</span> Backend &amp; distributed systems
            </p>
            <h1 className="text-[52px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[76px] md:text-[92px]" style={{ color: "var(--ws-text-primary)" }}>
              Mohit Kumar<span style={{ color: "var(--ws-silver)" }}>.</span>
            </h1>
            <h2 className="mt-7 max-w-[22ch] text-[32px] font-medium leading-[1.14] tracking-[-0.035em] sm:text-[40px] md:text-[46px]" style={{ color: "var(--ws-text-secondary)" }}>
              I build the systems behind reliable products.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.75] sm:text-[17px]" style={{ color: "var(--ws-text-muted)" }}>
              From VideoScale&apos;s video pipeline to Workflow-Engine&apos;s durable jobs, I build APIs and asynchronous services that keep work moving through retries and restarts.
            </p>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.75] sm:text-[16px]" style={{ color: "var(--ws-text-muted)" }}>
              I completed my B.Tech in Computer Science at IIT Jodhpur in 2026. My research on federated learning and blockchain consensus was published at <a href={FEDMEET_PAPER} target="_blank" rel="noreferrer" className="underline decoration-[var(--ws-border-strong)] underline-offset-4 transition-colors hover:text-[var(--ws-text-primary)]">ACM ICDCN 2026</a> and in <a href={TCS_PAPER} target="_blank" rel="noreferrer" className="underline decoration-[var(--ws-border-strong)] underline-offset-4 transition-colors hover:text-[var(--ws-text-primary)]"><em>Theoretical Computer Science</em></a>. I also built an NLP-to-Solidity compiler.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="#work"
                className="group inline-flex min-h-11 items-center gap-2 border-b pb-1 text-[14px] font-semibold transition-colors hover:text-[var(--ws-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]"
                style={{ borderColor: "var(--ws-silver)", color: "var(--ws-silver)" }}
              >
                View selected work
                <ArrowRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            </div>

            <aside aria-label="Competitive programming stats" className="border-t pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: "var(--ws-border-default)" }}>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] lg:mb-1" style={{ color: "var(--ws-text-muted)" }}>Competitive programming</p>
              <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-0">
              <div className="lg:border-b lg:py-5 lg:first:pt-3" style={{ borderColor: "var(--ws-border-subtle)" }}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]" style={{ color: "var(--ws-text-muted)" }}>Codeforces</dt>
                <dd className="mt-1 text-[24px] font-semibold tracking-tight sm:text-[27px]" style={{ color: "var(--ws-text-primary)" }}>1300+</dd>
              </div>
              <div className="lg:border-b lg:py-5" style={{ borderColor: "var(--ws-border-subtle)" }}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]" style={{ color: "var(--ws-text-muted)" }}>LeetCode contest rating</dt>
                <dd className="mt-1 text-[24px] font-semibold tracking-tight sm:text-[27px]" style={{ color: "var(--ws-text-primary)" }}>1500+</dd>
              </div>
              <div className="lg:py-5 lg:last:pb-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]" style={{ color: "var(--ws-text-muted)" }}>Problems solved</dt>
                <dd className="mt-1 text-[24px] font-semibold tracking-tight sm:text-[27px]" style={{ color: "var(--ws-text-primary)" }}>800+</dd>
                <span className="text-[11px]" style={{ color: "var(--ws-text-muted)" }}>across platforms</span>
              </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* ── Sections, one after another ── */}
        <Skills />
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
