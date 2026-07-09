"use client";

import { useEffect, useRef, useState } from "react";
import { personal, social } from "@/lib/data";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className="nav bg-white text-black border-b-[3px] border-black py-5"
      >
        <div className="container nav-inner">
          <a href="#top" className="nav-mono" aria-label="Mohit Kumar — home">
            <span className="bg-black text-white border-[3px] border-black rounded-none w-9 h-9 flex items-center justify-center text-sm font-bold">
              M
            </span>
            <span className="nav-name font-bold">
              Mohit Kumar
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a
              href="#about"
              className="relative font-mono uppercase tracking-wider text-sm text-black/60 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 after:transition-all after:duration-200 hover:after:w-full"
            >
              About
            </a>
            <a
              href="#skills"
              className="relative font-mono uppercase tracking-wider text-sm text-black/60 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 after:transition-all after:duration-200 hover:after:w-full"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="relative font-mono uppercase tracking-wider text-sm text-black/60 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 after:transition-all after:duration-200 hover:after:w-full"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="relative font-mono uppercase tracking-wider text-sm text-black/60 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 after:transition-all after:duration-200 hover:after:w-full"
            >
              Work
            </a>
            <a
              href="#contact"
              className="relative font-mono uppercase tracking-wider text-sm text-black/60 hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 after:transition-all after:duration-200 hover:after:w-full"
            >
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <a
              className="btn-resume inline-flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-black font-bold uppercase text-sm tracking-wider border-[3px] border-black rounded-none"
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "4px 4px 0 #000000" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "6px 6px 0 #000000";
                e.currentTarget.style.transform = "translate(-2px, -2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "4px 4px 0 #000000";
                e.currentTarget.style.transform = "translate(0, 0)";
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M12 17V3" />
                <path d="m6 11 6 6 6-6" />
                <path d="M19 21H5" />
              </svg>
              Resume
            </a>
            <button
              className="nav-toggle border-2 border-black rounded-none text-black"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu bg-white text-black${menuOpen ? " open" : ""}`}>
        <div className="container mobile-menu-inner">
          <a className="m-link border-b-2 border-black/10 text-black" href="#about" onClick={closeMenu}>
            About <span className="m-num text-black/50">01</span>
          </a>
          <a className="m-link border-b-2 border-black/10 text-black" href="#skills" onClick={closeMenu}>
            Skills <span className="m-num text-black/50">02</span>
          </a>
          <a className="m-link border-b-2 border-black/10 text-black" href="#experience" onClick={closeMenu}>
            Experience <span className="m-num text-black/50">03</span>
          </a>
          <a className="m-link border-b-2 border-black/10 text-black" href="#projects" onClick={closeMenu}>
            Work <span className="m-num text-black/50">04</span>
          </a>
          <a className="m-link border-b-2 border-black/10 text-black" href="#contact" onClick={closeMenu}>
            Contact <span className="m-num text-black/50">05</span>
          </a>
          <a
            className="m-cta bg-black text-white border-2 border-black rounded-none"
            href={social.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
