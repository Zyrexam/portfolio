import type { Post } from "@/lib/posts";

export function PostCard({ post: p }: { post: Post }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col rounded-[20px] border p-6 transition hover:-translate-y-1 hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)]"
      style={{
        background: "var(--ws-surface-1)",
        borderColor: "var(--ws-border-subtle)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
        style={{ background: "var(--ws-gradient-sheen-dark)" }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
          <span>
            {p.n} · {p.date}
          </span>
          <span>{p.read}</span>
        </div>
        <h3 className="mt-4 text-[16px] font-semibold leading-tight tracking-[-0.02em]" style={{ color: "var(--ws-text-primary)" }}>
          {p.title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--ws-text-muted)" }}>
          {p.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
              style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-titanium)", background: "rgba(244,245,246,0.05)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-5 flex items-center justify-between border-t" style={{ borderColor: "var(--ws-border-subtle)" }}>
          <span
            className="text-[11px] font-semibold tracking-[0.14em] group-hover:gap-2.5 inline-flex items-center gap-1.5 transition"
            style={{ color: "var(--ws-text-secondary)" }}
          >
            READ <span className="group-hover:translate-x-1 transition">→</span>
          </span>
          <span className="font-mono text-[11px]" style={{ color: "var(--ws-text-muted)" }}>
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
