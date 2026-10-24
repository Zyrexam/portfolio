import { Code, ExternalLink } from "lucide-react";
import { Reveal } from "./reveal";
import { ArchitectureDiagram } from "./architecture-diagram";
import { HOME_PROJECTS } from "@/lib/projects";

export function Work() {
  const featured = HOME_PROJECTS.filter((p) => p.featured);
  const rest = HOME_PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>03.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>Selected Projects</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
        <p className="-mt-6 mb-12 max-w-[52ch] text-[14px] leading-relaxed md:ml-[3.35rem]" style={{ color: "var(--ws-text-muted)" }}>
          Backend systems, real-time products, and AI tools—built to handle complex workflows reliably.
        </p>
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
                  <div className="group relative overflow-hidden rounded-md border border-white/10" style={{ background: "#fbfbfa", boxShadow: "0 16px 36px rgba(0,0,0,0.2)" }}>
                    <a href={p.live ?? p.href} target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ws-focus-ring)]" aria-label={`Open ${p.title} project`}>
                      <div className="relative aspect-[3/4] sm:aspect-[16/10]">
                        <ArchitectureDiagram project={p.title === "VideoScale" ? "videoscale" : "workflow"} />
                      </div>
                    </a>
                  </div>
                </div>

                {/* copy */}
                <div className={flip ? "md:order-1 md:text-right" : ""}>
                  <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.02em] ${flip ? "md:ml-auto" : ""}`} style={{ color: "var(--ws-text-secondary)", borderColor: "var(--ws-border-subtle)", background: "var(--ws-surface-1)" }}>
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ws-silver)" }} />
                    {p.kicker}
                  </p>
                  <h3 className="text-[24px] font-bold tracking-tight sm:text-[28px]" style={{ color: "var(--ws-text-primary)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] md:text-[15.5px]" style={{ color: "var(--ws-text-muted)" }}>
                    {p.desc}{p.stat && <> <span className="font-mono text-[12.5px]" style={{ color: "var(--ws-silver)" }}>{p.stat}</span></>}
                  </p>
                  <div className={`mt-5 ${flip ? "md:text-right" : ""}`}>
                    <p className="mb-2 font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>TECH &amp; FOCUS</p>
                    <ul className={`flex flex-wrap gap-2 ${flip ? "md:justify-end" : ""}`}>
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border px-2.5 py-1.5 text-[11.5px] font-medium" style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-secondary)" }}>
                        {t}
                      </li>
                    ))}
                    </ul>
                  </div>
                  <div className={`mt-3 flex items-center gap-3 ${flip ? "md:justify-end" : ""}`}>
                    <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.title} GitHub repository`} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-[var(--ws-silver)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]" style={{ color: "var(--ws-text-muted)" }}>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.94 2.3 3.81 1.63.1-.71.4-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.61 5.22-5.1 5.5.41.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                      </svg>
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-[var(--ws-silver)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]" style={{ color: "var(--ws-text-muted)" }}>
                        <ExternalLink aria-hidden="true" size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {rest.length > 0 && <>
        <Reveal>
          <h3 className="mt-24 text-[22px] font-bold tracking-tight sm:text-[26px]" style={{ color: "var(--ws-text-primary)" }}>
            More Projects
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="h-full">
            <div
              className="group flex h-full flex-col rounded-md border p-6 motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1"
              style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)", boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium" style={{ color: "var(--ws-text-secondary)", borderColor: "var(--ws-border-subtle)", background: "var(--ws-surface-2)" }}>
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--ws-silver)" }} />
                  {p.kicker}
                </p>
                <div className="flex items-center gap-3">
                  {p.href && <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.title} GitHub repository`} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-[var(--ws-silver)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]" style={{ color: "var(--ws-text-muted)" }}>
                    <Code aria-hidden="true" size={18} />
                  </a>}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-[var(--ws-silver)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]" style={{ color: "var(--ws-text-muted)" }}>
                      <ExternalLink aria-hidden="true" size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="mt-4 text-[17px] font-bold tracking-tight transition-colors group-hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-primary)" }}>
                {p.title}
              </h4>
              <p className="mt-2 flex-1 text-[13.5px] leading-[1.65]" style={{ color: "var(--ws-text-muted)" }}>
                {p.desc}
              </p>
              <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--ws-border-subtle)" }}>
                <p className="mb-2 font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>TECH &amp; FOCUS</p>
                <ul className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border px-2.5 py-1 text-[11px] font-medium" style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-secondary)" }}>
                    {t}
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
        </div>
      </>}
    </section>
  );
}
