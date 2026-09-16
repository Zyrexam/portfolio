"use client";
import Link from "next/link";
import { RESUME } from "@/lib/links";

// Absolute hrefs so the nav also works from sub-pages like /projects.
const NAV = [
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "WORK", href: "/#work" },
  { label: "RESEARCH", href: "/#research" },
] as const;

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="ws-container flex h-[68px] items-center justify-between !px-6 lg:!px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/icon.svg" alt="Mohit Kumar" width={32} height={32} className="h-8 w-8 rounded-[7px] object-cover" />
          <span className="ws-logo-wordmark text-[13px] tracking-[0.24em]">MOHIT KUMAR</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.18em] transition-colors hover:text-[var(--ws-text-primary)]"
              style={{ color: "var(--ws-text-muted)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a href={RESUME} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] transition hover:bg-[var(--ws-bg-interactive)] hover:text-[var(--ws-text-primary)]" style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-muted)", background: "var(--ws-bg-interactive)" }}>
            RESUME <span aria-hidden>↗</span>
          </a>
          <Link href="/#contact" className="hidden sm:inline-flex h-8 items-center rounded-full border px-4 text-[11px] font-semibold tracking-[0.12em] transition hover:bg-[var(--ws-bg-interactive)]" style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)" }}>
            LET&apos;S TALK
          </Link>
        </div>
      </div>
    </header>
  );
}
