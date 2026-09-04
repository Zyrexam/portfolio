"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { social } from "@/lib/data";
import ScrollProgress from "@/components/scroll-progress";
import { easeOut, springUI } from "@/components/motion";

const LINKS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Skills", href: "#skills" },
  { num: "03", label: "Experience", href: "#experience" },
  { num: "04", label: "Work", href: "#projects" },
  { num: "05", label: "Contact", href: "#contact" },
];

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
    <path d="M12 17V3" />
    <path d="m6 11 6 6 6-6" />
    <path d="M19 21H5" />
  </svg>
);

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Track which section is in view → highlight its nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <ScrollProgress />
      <header className="nav bg-bg text-fg border-b border-hairline py-5">
        <div className="container nav-inner">
          <a href="#top" className="nav-mono" aria-label="Mohit Kumar — home">
            <span className="bg-fg text-bg border border-fg rounded-none w-9 h-9 flex items-center justify-center text-sm font-bold">
              M
            </span>
            <span className="nav-name font-bold">Mohit Kumar</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(({ num, label, href }) => {
              const isActive = active === href;
              return (
                <motion.a
                  key={href}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative font-mono uppercase tracking-wider text-sm transition-colors ${
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:w-0 after:transition-all after:duration-200 hover:after:w-full ${
                    isActive ? "after:w-full" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={springUI}
                >
                  <span className="mr-1.5 text-fg-dim">{"//"}{num}</span>
                  {label}
                </motion.a>
              );
            })}
          </nav>

          <div className="nav-actions">
            <a
              className="btn-resume inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-fg font-bold uppercase text-sm tracking-wider border border-accent transition-shadow hover:shadow-[0_0_24px_rgba(0,217,255,0.25)]"
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResumeIcon />
              Resume
            </a>
            <button
              className="nav-toggle border border-hairline rounded-none text-fg"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.svg
                    key="close"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-5"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="open"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-5"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu bg-bg/90 text-fg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            <div className="container mobile-menu-inner">
              {LINKS.map(({ num, label, href }, i) => (
                <motion.a
                  key={href}
                  className="m-link border-b border-hairline text-fg"
                  href={href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: easeOut }}
                >
                  <span>
                    <span className="mr-2 font-mono text-xs text-fg-dim">{"//"}{num}</span>
                    {label}
                  </span>
                  <span className="m-num font-mono text-fg-dim">{num}</span>
                </motion.a>
              ))}
              <motion.a
                className="m-cta bg-accent text-accent-fg border border-accent rounded-none"
                href={social.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3, ease: easeOut }}
              >
                <ResumeIcon />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
