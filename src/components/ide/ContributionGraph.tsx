"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Faux GitHub-style contribution graph for the dashboard.
// Deterministic pseudo-random intensity per day.

function seededRandom(seed: number) {
  let h = seed;
  return function () {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
}

const WEEKS = 18;
const DAYS = 7;

function buildGrid() {
  const rng = seededRandom(42);
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      // bias toward more activity recently (higher w)
      const recency = w / WEEKS;
      const base = rng();
      const level =
        base < 0.35 - recency * 0.2
          ? 0
          : base < 0.55
            ? 1
            : base < 0.72
              ? 2
              : base < 0.88
                ? 3
                : 4;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}

const LEVEL_COLORS = [
  "#1e1e1e", // 0 — empty
  "#0e4429", // 1
  "#006d32", // 2
  "#26a641", // 3
  "#39d353", // 4
];

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

export function ContributionGraph() {
  const grid = useMemo(() => buildGrid(), []);
  const totalCommits = useMemo(() => {
    let sum = 0;
    for (const col of grid) for (const v of col) sum += v * 3 + (v > 0 ? 1 : 0);
    return sum;
  }, [grid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-lg bg-[#252526] ring-1 ring-[#2d2d30] p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-vsc-dim">
            {"// contribution activity"}
          </span>
        </div>
        <span className="font-mono text-[11px] text-vsc-green">
          {totalCommits} contributions in the last year
        </span>
      </div>
      <div className="overflow-x-auto vscode-scroll">
        <div className="inline-flex flex-col gap-1 min-w-max">
          {/* month labels */}
          <div className="flex gap-1 pl-0 mb-0.5">
            {MONTHS.map((m, i) => (
              <span
                key={m}
                className="font-mono text-[9px] text-vsc-dim"
                style={{ width: `${(WEEKS / MONTHS.length) * 13}px` }}
              >
                {m}
              </span>
            ))}
          </div>
          {/* grid */}
          <div className="flex gap-1">
            {grid.map((col, w) => (
              <div key={w} className="flex flex-col gap-1">
                {col.map((level, d) => (
                  <motion.div
                    key={d}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.4 + w * 0.015 + d * 0.008,
                      duration: 0.2,
                    }}
                    className="h-[11px] w-[11px] rounded-sm hover:ring-1 hover:ring-white/40 transition-all"
                    style={{
                      backgroundColor: LEVEL_COLORS[level],
                      boxShadow:
                        level >= 3 ? `0 0 4px ${LEVEL_COLORS[level]}55` : "none",
                    }}
                    title={`${level * 3 + (level > 0 ? 1 : 0)} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* legend */}
      <div className="mt-2 flex items-center justify-end gap-1.5">
        <span className="font-mono text-[9px] text-vsc-dim">less</span>
        {LEVEL_COLORS.map((c, i) => (
          <span
            key={i}
            className="h-[10px] w-[10px] rounded-sm"
            style={{ backgroundColor: c }}
          />
        ))}
        <span className="font-mono text-[9px] text-vsc-dim">more</span>
      </div>
    </motion.div>
  );
}
