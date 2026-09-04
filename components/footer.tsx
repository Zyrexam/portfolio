"use client";

import { useEffect, useState } from "react";
import { personal } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  const [servedIn, setServedIn] = useState<number | null>(null);

  // Real client-side render timing — the latency easter-egg
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setServedIn(Math.max(1, Math.round(performance.now())));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="bg-bg text-fg border-t border-hairline">
      <div className="container">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-fg-dim pt-6">
          imported from: github · leetcode · iit-jodhpur · production
        </p>
        <div className="footer-inner font-serif font-bold uppercase">
          <div className="footer-id">
            <span className="mark border border-hairline rounded-none">M</span>
            <div>
              <div className="name">
                {personal.name}<span className="text-fg-dim"> — Backend Engineer</span>
              </div>
              <div className="sub text-fg-dim">Built with care · IIT Jodhpur{servedIn !== null ? ` · served in ${servedIn}ms` : ""}</div>
            </div>
          </div>
          <div className="footer-right">
            <span className="text-sm text-fg-dim">{year}</span>
            <a className="inline-flex items-center gap-2 border border-hairline rounded-none px-4 py-2 text-sm font-bold uppercase hover:bg-fg hover:text-bg transition-colors" href="#top">
              Back to top
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
