import Link from "next/link";
import { Code, ExternalLink, Folder } from "lucide-react";
import { Reveal } from "./reveal";
import { HOME_PROJECTS } from "@/lib/projects";
import { GITHUB } from "@/lib/links";

export function Work() {
  const featured = HOME_PROJECTS.filter((p) => p.featured || p.live);
  const rest = HOME_PROJECTS.filter((p) => !(p.featured || p.live));

  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>03.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>Some Things I&apos;ve Built</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
      </Reveal>

      {/* featured — alternating rows like the reference */}
      <div className="space-y-20">
        {featured.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.title}>
              <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
                {/* tile */}
                <div className={flip ? "md:order-2" : ""}>
                  <div
                    className="group relative overflow-hidden rounded-md"
                    style={{ background: "var(--ws-surface-1)", boxShadow: "0 20px 30px -15px rgba(2,12,27,0.7)" }}
                  >
                    <a href={p.live ?? p.href} target="_blank" rel="noreferrer" className="block" aria-label={p.title}>
                      <div className="relative aspect-[16/10]">
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #112240 0%, #1d3a5f 55%, #233554 100%)",
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-40"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(100,255,218,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.14) 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center px-8">
                          <span
                            className="text-center text-[22px] font-bold tracking-tight transition-transform duration-300 group-hover:scale-105 sm:text-[26px]"
                            style={{ color: "rgba(204,214,246,0.92)", fontFamily: "var(--font-geist-mono), monospace" }}
                          >
                            {p.title}
                          </span>
                        </div>
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: "rgba(100,255,218,0.1)" }}
                        />
                      </div>
                    </a>
                  </div>
                </div>

                {/* copy */}
                <div className={flip ? "md:order-1 md:text-right" : ""}>
                  <p className="font-mono text-[13px]" style={{ color: "var(--ws-silver)" }}>
                    Featured Project
                  </p>
                  <h3 className="mt-2 text-[24px] font-bold tracking-tight sm:text-[28px]" style={{ color: "var(--ws-text-primary)" }}>
                    {p.title}
                  </h3>
                  <div
                    className="mt-4 rounded-md p-6 text-[15px] leading-relaxed"
                    style={{ background: "var(--ws-surface-1)", color: "var(--ws-text-muted)", boxShadow: "0 20px 30px -15px rgba(2,12,27,0.7)" }}
                  >
                    {p.desc} <span className="font-mono text-[12.5px]" style={{ color: "var(--ws-silver)" }}>{p.stat}</span>
                  </div>
                  <ul className={`mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[12.5px] ${flip ? "md:justify-end" : ""}`} style={{ color: "var(--ws-text-muted)" }}>
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className={`mt-3 flex items-center gap-3 ${flip ? "md:justify-end" : ""}`}>
                    <a href={p.href} target="_blank" rel="noreferrer" aria-label="Source" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
                      <Code size={20} />
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* other noteworthy projects */}
      <Reveal>
        <h3 className="mt-24 text-center text-[22px] font-bold tracking-tight sm:text-[26px]" style={{ color: "var(--ws-text-primary)" }}>
          Other Noteworthy Projects
        </h3>
        <p className="mt-2 text-center font-mono text-[13px]" style={{ color: "var(--ws-silver)" }}>
          <Link href="/projects" className="hover:underline">view the archive</Link>
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="h-full">
            <div
              className="group flex h-full flex-col rounded-md p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: "var(--ws-surface-1)", boxShadow: "0 20px 30px -15px rgba(2,12,27,0.7)" }}
            >
              <div className="flex items-center justify-between">
                <Folder size={34} style={{ color: "var(--ws-silver)" }} strokeWidth={1.2} />
                <div className="flex items-center gap-3">
                  <a href={p.href} target="_blank" rel="noreferrer" aria-label="Source" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
                    <Code size={19} />
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
                      <ExternalLink size={19} />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="mt-5 text-[17px] font-bold tracking-tight transition-colors group-hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-primary)" }}>
                {p.title}
              </h4>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
                {p.desc}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px]" style={{ color: "var(--ws-text-muted)" }}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
