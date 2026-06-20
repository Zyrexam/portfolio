"use client";

import { hero, social, personal } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";
import LeetCodeBadge from "@/components/leetcode-badge";

export default function Hero() {
  const { ref: subRef, isIn: subIn } = useReveal();
  const { ref: ctaRef, isIn: ctaIn } = useReveal();
  const { ref: asideRef, isIn: asideIn } = useReveal();
  const { ref: scrollRef, isIn: scrollIn } = useReveal();

  return (
    <section id="top">
      <div className="container">
        {/* Label rail */}
        <div className="hero-label-rail">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="eyebrow" style={{ color: "rgba(237,230,216,0.7)" }}>
            {hero.pulsingDotLabel}
          </span>
          <span className="end-label">
            <span className="eyebrow">§ 01 — Index</span>
          </span>
        </div>

        {/* Hero grid */}
        <div className="hero-grid">
          <div className="hero-main">
            <h1 className="hero-name">
              <span className="line-mask">
                <span className="line-inner d1">Mohit</span>
              </span>
              <span className="line-mask">
                <span className="line-inner d2 last">Kumar</span>
              </span>
            </h1>

            <p
              ref={subRef}
              className={`hero-sub${subIn ? " is-in" : ""}`}
              style={{ opacity: subIn ? undefined : 0 }}
            >
              {hero.subtitle}
            </p>

            <div
              ref={ctaRef}
              className={`hero-ctas${ctaIn ? " is-in" : ""} reveal`}
            >
              {hero.ctaButtons.map((btn) => (
                <a
                  key={btn.label}
                  className={`cta${btn.variant === "primary" ? " cta-primary" : ""} arrow-link`}
                  href={btn.href}
                  target={btn.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    btn.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {btn.label === "GitHub" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.7 2.6 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                    </svg>
                  )}
                  {btn.label === "LinkedIn" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
                    </svg>
                  )}
                  {btn.label === "LeetCode" && (
                    <span className="lc-mark">LC</span>
                  )}
                  {btn.label !== "Resume" && (
                    <svg
                      className="arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  )}
                  {btn.label === "Resume" && (
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
                  )}
                  {btn.label}
                  {btn.badge && btn.label === "LeetCode" ? (
                    <LeetCodeBadge className="cta-badge" />
                  ) : btn.badge && (
                    <span className="cta-badge">{btn.badge}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Aside */}
          <aside
            ref={asideRef}
            className={`hero-aside${asideIn ? " is-in" : ""}`}
            style={{ opacity: asideIn ? undefined : 0 }}
          >
            <div className="meta">
              <div className="meta-row">
                <span className="eyebrow">Role</span>
                <span className="val">{personal.title}</span>
              </div>
              <div className="meta-row">
                <span className="eyebrow">Education</span>
                <span className="val">IIT Jodhpur</span>
                <span className="sub">Class of 2026</span>
              </div>
              <div className="meta-row">
                <span className="eyebrow">Status</span>
                <span className="val accent">Open to backend roles</span>
              </div>
              <div className="email-line">
                <a className="arrow-link" href={`mailto:${personal.email}`}>
                  {personal.email}
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className={`hero-scroll${scrollIn ? " is-in" : ""}`}
          style={{ opacity: scrollIn ? undefined : 0 }}
        >
          <span className="eyebrow">Scroll</span>
          <span className="scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
