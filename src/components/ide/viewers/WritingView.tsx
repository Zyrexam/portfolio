"use client";

import { motion } from "framer-motion";
import { PenLine, ExternalLink, ArrowLeft, Clock, Github } from "lucide-react";
import { writings } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

export function WritingView({ writingId }: { writingId: string }) {
  const w = writings.find((x) => x.id === writingId);
  const navigate = useIDEStore((s) => s.navigate);

  if (!w) {
    return (
      <div className="p-6 text-vsc-dim font-mono">
        {"// writing not found: "}{writingId}
      </div>
    );
  }

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#2d2d30] px-6 py-5 bg-gradient-to-b from-[#4ec9b011] to-transparent">
        <button
          onClick={() => navigate(["writings"])}
          className="mb-3 inline-flex items-center gap-1 text-[11px] font-mono text-vsc-dim hover:text-white"
        >
          <ArrowLeft size={12} /> cd ../writings
        </button>
        <div className="font-mono text-[11px] text-vsc-green mb-2 flex items-center gap-1">
          <PenLine size={11} /> {"// "}{w.platform} article
        </div>
        <h1 className="font-sans text-xl font-bold text-white leading-snug">
          {w.title}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-[12px] text-[#cccccc]/80">
          <span className="flex items-center gap-1 font-mono text-vsc-cyan">
            <Clock size={11} /> {w.date}
          </span>
          <span className="font-mono text-vsc-dim">·</span>
          <span className="font-mono rounded bg-[#4ec9b0]/15 text-vsc-green px-1.5 py-0.5">
            {w.platform}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Excerpt */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-green">[01]</span>
            <span className="text-[13px] font-semibold text-white">Excerpt</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4">
            <div className="mb-2 text-[11px] font-mono text-vsc-dim">excerpt.md</div>
            <p className="text-[13px] leading-relaxed text-[#cccccc]/90">
              {w.excerpt}
            </p>
          </div>
        </section>

        {/* Tags */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-green">[02]</span>
            <span className="text-[13px] font-semibold text-white">Tags</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {w.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#9cdcfe] ring-1 ring-[#2d2d30]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Link */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-green">[03]</span>
            <span className="text-[13px] font-semibold text-white">Read on {w.platform}</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <a
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#4ec9b014] text-vsc-green">
              <PenLine size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
                Open article
              </div>
              <div className="truncate text-[10px] font-mono text-vsc-dim">
                {w.url}
              </div>
            </div>
            <ExternalLink size={12} className="ml-auto text-vsc-dim group-hover:text-white" />
          </a>
          {w.repo && (
            <a
              href={w.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ffffff10] text-[#cccccc]">
                <Github size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
                  Source code
                </div>
                <div className="truncate text-[10px] font-mono text-vsc-dim">
                  {w.repo.replace("https://github.com/", "github.com/")}
                </div>
              </div>
              <ExternalLink size={12} className="ml-auto text-vsc-dim group-hover:text-white" />
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
