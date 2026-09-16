import type { Project } from "@/lib/projects";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border backdrop-blur transition-all duration-500 hover:-translate-y-[6px]"
      style={{
        background: p.featured ? "rgba(36,40,44,0.9)" : "rgba(26,29,32,0.78)",
        borderColor: p.featured ? "var(--ws-border-default)" : "var(--ws-border-subtle)",
        boxShadow: p.featured
          ? "0 16px 40px rgba(0,0,0,0.38), inset 0 1px 0 rgba(244,245,246,0.06)"
          : "0 10px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(244,245,246,0.04)",
      }}
    >
      {/* whole-card link to the repository */}
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${p.title} — repository on GitHub`}
        className="absolute inset-0 z-10 rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]"
      />
      {/* top hairline */}
      <div aria-hidden className="absolute top-0 left-4 right-4 h-px opacity-60 group-hover:opacity-100 transition" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      {/* hover sheen */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
        style={{ background: "var(--ws-gradient-sheen-dark)" }}
      />

      {/* preview */}
      <div className="relative mx-3 mt-3 rounded-[14px] border overflow-hidden" style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)" }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--ws-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--ws-border-subtle) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* angular tint */}
        <div aria-hidden className="absolute inset-0 opacity-[0.35]" style={{ background: "var(--ws-background-angular)" }} />
        {/* mock */}
        <div className="relative h-[148px] flex flex-col p-4">
          {/* faux toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--ws-border-strong)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--ws-border-default)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--ws-border-subtle)" }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] rounded-full border px-2 py-1" style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-muted)", background: "rgba(244,245,246,0.06)" }}>
              {p.stat}
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex gap-1.5">
              <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--ws-text-primary)", opacity: 0.9 }} />
              <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--ws-silver)", opacity: 0.5 }} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-[10px] border" style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }} />
              <div className="h-10 rounded-[10px] border" style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)" }} />
              <div className="h-10 rounded-[10px] border hidden sm:block" style={{ background: "rgba(244,245,246,0.06)", borderColor: "var(--ws-border-subtle)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-5 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
            {p.n} — {p.kicker} · {p.year}
          </span>
          <span className="h-1.5 w-1.5 rounded-full shrink-0 transition group-hover:scale-[1.6]" style={{ background: p.featured ? "var(--ws-text-primary)" : "var(--ws-silver)" }} />
        </div>

        <h3 className="text-[15.5px] font-semibold leading-tight tracking-[-0.02em]" style={{ color: "var(--ws-text-primary)" }}>
          {p.title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--ws-text-muted)" }}>
          {p.desc}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em]"
              style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-titanium)", background: "rgba(244,245,246,0.05)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] transition group-hover:gap-2.5"
            style={{ color: "var(--ws-text-secondary)" }}
          >
            VIEW REPO
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 font-mono text-[11px] font-semibold tracking-[0.08em] transition hover:text-[var(--ws-text-primary)]"
              style={{ color: "var(--ws-silver)" }}
            >
              LIVE ↗
            </a>
          ) : (
            <span className="font-mono text-[11px] tracking-[0.08em] opacity-60 group-hover:opacity-100 transition" style={{ color: "var(--ws-text-muted)" }}>
              ↗
            </span>
          )}
        </div>
      </div>

      {/* bottom metallic fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition"
        style={{ background: "var(--ws-gradient-edge-dark)" }}
      />
    </div>
  );
}
