"use client";

import { useEffect, useState } from "react";
import { hero, social, personal } from "@/lib/data";
import SpecCard from "@/components/spec-card";
import type { SpecRow } from "@/components/spec-card";

export default function Hero() {
  const [leetCount, setLeetCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.totalSolved) {
          setLeetCount(data.totalSolved);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const specRows: SpecRow[] = [
    { label: "Education", value: "IIT Jodhpur" },
    { label: "Class", value: "2026" },
    { label: "Location", value: "India" },
    { label: "Email", value: "mohitkumar4922251@gmail.com" },
    { label: "GitHub", value: "github.com/Zyrexam" },
    { label: "LeetCode", value: `mohitkumar4 · ${leetCount ?? 240}+` },
  ];

  return (
    <section
      id="top"
      className="bg-brutal-white text-brutal-fg"
    >
      <div className="container pb-20 md:pb-28">
        {/* Pulse dot + label rail */}
        <div className="flex items-center gap-3 mb-10">
          <span className="relative size-2 inline-block" aria-hidden="true">
            <span className="absolute inset-0 bg-[#00D9FF]" />
            <span
              className="absolute inset-0 bg-[#00D9FF] opacity-60"
              style={{ animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">
            {hero.pulsingDotLabel}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
          {/* LEFT column */}
          <div className="flex-1 min-w-0">
            {/* Bold headline */}
            <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase leading-[0.85] tracking-tighter mb-10">
              <span className="block">Mohit</span>
              <span className="block">Kumar</span>
            </h1>

            {/* Subtitle with highlighted key phrases */}
            <div className="max-w-3xl mb-12">
              <p className="text-lg sm:text-xl md:text-2xl font-bold leading-tight uppercase">
                Backend engineer — I build{" "}
                <span className="bg-[#00D9FF] text-black px-1 -mx-1">
                  distributed systems
                </span>
                , async pipelines, and{" "}
                <span style={{ backgroundColor: "var(--nb-accent)", color: "black", padding: "2px 6px", fontWeight: 700 }}>
                  high-throughput APIs
                </span>
                .
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              {hero.ctaButtons.filter((btn) => btn.label !== "Resume").map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    btn.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  style={{ boxShadow: "6px 6px 0 #000000" }}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 font-bold uppercase text-sm tracking-wider border-[3px] border-solid border-black rounded-none transition-transform ${
                    btn.variant === "primary"
                      ? "bg-[#00D9FF] text-black hover:bg-[#00C4E6]"
                      : "bg-white text-black"
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "8px 8px 0 #000000";
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "6px 6px 0 #000000";
                    e.currentTarget.style.transform = "translate(0, 0)";
                  }}
                >
                  {btn.label === "GitHub" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="size-3.5"
                    >
                      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.7 2.6 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                    </svg>
                  )}
                  {btn.label === "LinkedIn" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="size-3.5"
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
                    </svg>
                  )}
                  {btn.label === "LeetCode" && (
                    <span className="font-bold text-sm">LC</span>
                  )}
                  {btn.label !== "Resume" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-3.5"
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
                      className="size-3.5"
                    >
                      <path d="M12 17V3" />
                      <path d="m6 11 6 6 6-6" />
                      <path d="M19 21H5" />
                    </svg>
                  )}
                  {btn.label}
                  {btn.label === "LeetCode" ? (
                    <span className="ml-1 text-xs font-bold">{leetCount ?? 240}+</span>
                  ) : btn.badge ? (
                    <span className="ml-1 text-xs font-bold">{btn.badge}</span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="md:w-[400px] md:shrink-0">
            <SpecCard
              title="Specifications"
              rows={specRows}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
