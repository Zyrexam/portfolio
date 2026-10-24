import { ExternalLink } from "lucide-react";
import { Reveal } from "./reveal";
import { HOME_POSTS } from "@/lib/posts";

export function Writing() {
  return (
    <section id="writing" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>04.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>Research &amp; Writing</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {HOME_POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 60} className="h-full">
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-md p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: "var(--ws-surface-1)", boxShadow: "0 20px 30px -15px rgba(2,12,27,0.7)" }}
            >
              <div className="flex items-center justify-between font-mono text-[11.5px]" style={{ color: "var(--ws-silver)" }}>
                <span>{post.read}</span>
                <span className="inline-flex items-center gap-2">
                  {post.date}
                  <ExternalLink size={15} className="transition-colors group-hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }} />
                </span>
              </div>
              <h3 className="mt-3 text-[16.5px] font-bold leading-snug tracking-tight transition-colors group-hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-primary)" }}>
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
                {post.excerpt}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]" style={{ color: "var(--ws-text-muted)" }}>
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 text-center font-mono text-[13px]" style={{ color: "var(--ws-silver)" }}>
          <a href="https://medium.com/@mohitkumar4922251" target="_blank" rel="noreferrer" className="hover:underline">
            view the full archive
          </a>
        </p>
      </Reveal>
    </section>
  );
}
