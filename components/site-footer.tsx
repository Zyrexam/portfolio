import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GITHUB, LINKEDIN } from "@/lib/links";

export function SiteFooter({
  backHref,
  backAriaLabel,
}: {
  backHref?: string;
  backAriaLabel?: string;
}) {
  return (
    <footer className="py-10 text-center">
      {backHref && (
        <Link
          href={backHref}
          aria-label={backAriaLabel}
          className="mb-6 inline-flex items-center gap-2 font-mono text-[12.5px] transition-colors hover:text-[var(--ws-silver)]"
          style={{ color: "var(--ws-silver)" }}
        >
          <ArrowLeft size={14} /> Back to the home page
        </Link>
      )}
      <a
        href={GITHUB}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[12.5px] transition-colors hover:text-[var(--ws-silver)]"
        style={{ color: "var(--ws-text-muted)" }}
      >
        Designed &amp; built by Mohit Kumar
      </a>
      <div className="mt-3 flex items-center justify-center gap-5 font-mono text-[12px]">
        <a href={GITHUB} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
          GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ws-silver)]" style={{ color: "var(--ws-text-muted)" }}>
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
