"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/content";

const colors = ["#007acc", "#4ec9b0", "#dcdcaa", "#ce9178", "#c586c0", "#569cd6"];

export function SkillsView() {
  const categories = Object.keys(skills);
  return (
    <div className="vscode-scroll h-full overflow-y-auto p-6">
      <div className="font-mono text-[11px] text-vsc-dim mb-1">
        {"// skills.md — tools & languages I work with"}
      </div>
      <h1 className="font-sans text-2xl font-bold text-white mb-5">
        Technical Skills
        <span className="text-vsc-yellow font-mono">.md</span>
      </h1>

      <div className="space-y-6">
        {categories.map((cat, ci) => (
          <motion.section
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span
                className="font-mono text-[10px]"
                style={{ color: colors[ci % colors.length] }}
              >
                [{String(ci + 1).padStart(2, "0")}]
              </span>
              <span className="text-[13px] font-semibold text-white">{cat}</span>
              <span className="text-[10px] font-mono text-vsc-dim">
                ({skills[cat as keyof typeof skills].length})
              </span>
              <div className="h-px flex-1 bg-[#2d2d30]" />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills[cat as keyof typeof skills].map((s, i) => (
                <motion.span
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.08 + i * 0.02 }}
                  className="rounded bg-[#252526] px-2.5 py-1.5 text-[12px] font-mono text-[#9cdcfe] ring-1 ring-[#2d2d30] hover:ring-[#007acc] hover:text-white transition-colors cursor-default"
                >
                  {s.name}
                </motion.span>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-6 rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4 font-mono text-[11px]">
        <div className="text-vsc-dim">
          {"// I don't show percentages — proficiency is hard to quantify."}
        </div>
        <div className="text-vsc-dim">
          {"// These are the tools & languages I've shipped real projects with."}
        </div>
      </div>
    </div>
  );
}
