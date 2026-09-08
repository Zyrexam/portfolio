"use client";

import { useEffect, useState } from "react";
import { nav, owner } from "../content";
import { Logo } from "./bolt";

/** Groq's dotted hamburger — 8 dots in a 4×2 grid, 18×11. */
function DotsIcon() {
  return (
    <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor" aria-hidden="true">
      {[0, 5, 10, 15].map((x) =>
        [0, 8].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx="1.5" />),
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 1l14 14M15 1L1 15" />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        data-scrolled={scrolled}
        className="nav-root relative bg-cream"
        style={{ height: "var(--nav-height)" }}
        aria-label="Main"
      >
        <div
          className="mx-auto flex h-full max-w-[var(--content-max)] items-center justify-between"
          style={{ paddingInline: "var(--page-inset)" }}
        >
          <a href="#top" aria-label="Mohit Kumar — home">
            <Logo />
          </a>

          {/* desktop links — collapse at Groq's 1080px nav-break */}
          <div className="hidden shell:flex items-center gap-8">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-label text-ink-soft hover:text-brand transition-colors"
                style={{ transitionDuration: "var(--trs-time)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={owner.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--chrome btn--brand"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            className="text-brand shell:hidden p-2 -m-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <DotsIcon />
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 top-[var(--nav-height)] z-40 bg-cream flex flex-col overflow-y-auto"
          style={{ paddingInline: "var(--page-inset)", paddingBottom: "var(--page-inset)" }}
        >
          <div className="flex justify-end py-4">
            <button
              type="button"
              className="text-brand p-2 -m-2"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col gap-8" aria-label="Mobile">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="type-statement text-ink hover:text-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-10">
            <a
              href={owner.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--action btn--brand w-full"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
