"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useIDEStore } from "@/store/useIDEStore";

// A deterministic pseudo-random generator so each view has a stable minimap.
function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

// Muted grayscale palette — mimics VS Code's actual minimap which is
// low-contrast and monochromatic (not the syntax-highlighted editor colors).
const COLORS = [
  "#858585", // gray
  "#6a6a6a", // dim gray
  "#a0a0a0", // light gray
  "#757575", // medium gray
];

function tokenColor(r: number) {
  return COLORS[Math.floor(r * COLORS.length) % COLORS.length];
}

export function Minimap() {
  const currentPath = useIDEStore((s) => s.currentPath);
  const selectedFile = useIDEStore((s) => s.selectedFile);
  const hiddenVisible = useIDEStore((s) => s.hiddenVisible);
  const [viewport, setViewport] = useState(0);
  const [viewportH, setViewportH] = useState(0.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const seed = useMemo(() => {
    const key = (selectedFile ?? currentPath).join("/") + (hiddenVisible ? "h" : "");
    return key;
  }, [currentPath, selectedFile, hiddenVisible]);

  const lines = useMemo(() => {
    const rng = seededRandom(seed);
    const lineCount = 120 + Math.floor(rng() * 80);
    const out: { w: number; color: string }[][] = [];
    for (let i = 0; i < lineCount; i++) {
      const segCount = 1 + Math.floor(rng() * 3);
      const segs: { w: number; color: string }[] = [];
      let remaining = 1;
      for (let s = 0; s < segCount; s++) {
        const w = Math.min(remaining, 0.1 + rng() * 0.5);
        segs.push({ w, color: tokenColor(rng()) });
        remaining -= w;
        if (remaining <= 0.04) break;
        remaining -= 0.03 + rng() * 0.05;
        if (remaining <= 0) break;
      }
      out.push(segs);
    }
    return out;
  }, [seed]);

  // Track scroll of the main content area (the sibling scroll container)
  useEffect(() => {
    const findScroll = () => {
      // the main content scroll container is the .vscode-scroll inside MainContent
      const el = containerRef.current?.parentElement?.querySelector(".vscode-scroll");
      return el as HTMLElement | null;
    };
    let el: HTMLElement | null = null;
    const update = () => {
      if (!el) el = findScroll();
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const ratio = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
      setViewport(ratio);
      const vh = el.clientHeight / (el.scrollHeight || 1);
      setViewportH(Math.max(0.12, Math.min(1, vh)));
    };
    const timer = setInterval(update, 150);
    return () => clearInterval(timer);
  }, [seed]);

  const viewportTopPct = viewport * (100 - viewportH * 100);

  // Click-to-scroll: clicking the minimap jumps the main content scroll.
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollEl = el
      .closest(".relative.flex.min-h-0")
      ?.querySelector(".vscode-scroll") as HTMLElement | null;
    if (!scrollEl) return;
    const rect = el.getBoundingClientRect();
    const ratio = (e.clientY - rect.top - 8) / (rect.height - 16);
    const clamped = Math.max(0, Math.min(1, ratio));
    const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
    scrollEl.scrollTo({ top: clamped * maxScroll, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative hidden w-[72px] shrink-0 cursor-pointer border-l border-[#1e1e1e] bg-[#1e1e1e] py-2 transition-colors hover:bg-[#1a1a1a] lg:block"
      aria-label="Minimap — click to scroll"
      title="Click to jump to position"
    >
      {/* Minimap lines */}
      <div className="flex h-full flex-col gap-[2px] px-1.5 pointer-events-none">
        {lines.map((line, i) => (
          <div key={i} className="flex h-[2px] items-center gap-[1px]">
            {line.map((seg, j) => (
              <span
                key={j}
                className="h-full rounded-[0.5px]"
                style={{
                  width: `${seg.w * 100}%`,
                  background: seg.color,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Viewport indicator */}
      <div
        className="absolute left-1 right-1 rounded-sm bg-[#264f78]/25 ring-1 ring-[#264f78]/60 transition-[top] duration-100 pointer-events-none"
        style={{
          top: `${viewportTopPct}%`,
          height: `${viewportH * 100}%`,
        }}
      />
    </div>
  );
}
