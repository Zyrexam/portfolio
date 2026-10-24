"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { RESUME } from "@/lib/links";

// Numbered nav: About, Experience, Work, Writing, Contact.
const NAV = [
  { n: "01", label: "About", href: "/#about" },
  { n: "02", label: "Experience", href: "/#experience" },
  { n: "03", label: "Work", href: "/#work" },
  { n: "04", label: "Writing", href: "/#writing" },
  { n: "05", label: "Contact", href: "/#contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,25,47,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        boxShadow: scrolled ? "0 10px 30px -10px rgba(2,12,27,0.7)" : undefined,
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-md border text-lg font-bold transition-colors hover:bg-[var(--ws-bg-interactive)]" style={{ borderColor: "var(--ws-silver)", color: "var(--ws-silver)" }} aria-label="Home">
          M
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} className="text-[13px] font-medium tracking-wide transition-colors hover:text-[var(--ws-text-primary)]" style={{ color: "var(--ws-text-secondary)" }}>
              <span className="font-mono" style={{ color: "var(--ws-silver)" }}>{item.n}.</span> {item.label}
            </Link>
          ))}
          <a
            href={RESUME}
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[var(--ws-bg-interactive)]"
            style={{ borderColor: "var(--ws-silver)", color: "var(--ws-silver)" }}
          >
            Resume
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          style={{ color: "var(--ws-silver)" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden" style={{ background: "var(--ws-surface-1)", boxShadow: "0 10px 30px -10px rgba(2,12,27,0.7)" }}>
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium" style={{ color: "var(--ws-text-secondary)" }}>
                <span className="font-mono" style={{ color: "var(--ws-silver)" }}>{item.n}.</span> {item.label}
              </Link>
            ))}
            <a href={RESUME} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium" style={{ color: "var(--ws-silver)" }}>
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
