"use client";

import { useEffect, useRef, useState } from "react";
import { personal, social } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`nav${scrolled ? " scrolled" : ""}`}
      >
        <div className="container nav-inner">
          <a href="#top" className="nav-mono" aria-label="Mohit Kumar — home">
            <span className="nav-mark">M</span>
            <span className="nav-name">
              Mohit Kumar<span className="dim"> · Backend Engineer</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a
              className="btn-resume"
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
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
              Resume
            </a>
            <button
              className="nav-toggle"
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

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="container mobile-menu-inner">
          <a className="m-link" href="#about" onClick={closeMenu}>
            About <span className="m-num">01</span>
          </a>
          <a className="m-link" href="#skills" onClick={closeMenu}>
            Skills <span className="m-num">02</span>
          </a>
          <a className="m-link" href="#experience" onClick={closeMenu}>
            Experience <span className="m-num">03</span>
          </a>
          <a className="m-link" href="#projects" onClick={closeMenu}>
            Work <span className="m-num">04</span>
          </a>
          <a className="m-link" href="#contact" onClick={closeMenu}>
            Contact <span className="m-num">05</span>
          </a>
          <a
            className="m-cta"
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
