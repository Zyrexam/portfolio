"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, ArrowLeft, Users } from "lucide-react";
import { publications } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

export function PublicationView({ publicationId }: { publicationId: string }) {
  const pub = publications.find((p) => p.id === publicationId);
  const navigate = useIDEStore((s) => s.navigate);

  if (!pub) {
    return (
      <div className="p-6 text-vsc-dim font-mono">
        {"// publication not found: "}{publicationId}
      </div>
    );
  }

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#2d2d30] px-6 py-5 bg-gradient-to-b from-[#f8982011] to-transparent">
        <button
          onClick={() => navigate(["publications"])}
          className="mb-3 inline-flex items-center gap-1 text-[11px] font-mono text-vsc-dim hover:text-white"
        >
          <ArrowLeft size={12} /> cd ../publications
        </button>
        <div className="font-mono text-[11px] text-vsc-orange mb-2 flex items-center gap-1">
          <BookOpen size={11} /> {"// peer-reviewed publication"}
        </div>
        <h1 className="font-sans text-xl font-bold text-white leading-snug">
          {pub.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-[#cccccc]/80">
          <span className="font-mono text-vsc-cyan">{pub.venue}</span>
          <span className="font-mono text-vsc-dim">·</span>
          <span className="font-mono">{pub.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Authors */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-orange">[01]</span>
            <span className="text-[13px] font-semibold text-white">Authors</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {pub.authors.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-1.5 rounded bg-[#252526] ring-1 ring-[#2d2d30] px-2.5 py-1.5 text-[12px] font-mono ${
                  a === "Mohit Kumar"
                    ? "text-vsc-orange ring-[#f89820]/50"
                    : "text-[#cccccc]"
                }`}
              >
                <Users size={11} className="text-vsc-dim" />
                {a}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Abstract */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-orange">[02]</span>
            <span className="text-[13px] font-semibold text-white">Abstract</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4">
            <div className="mb-2 text-[11px] font-mono text-vsc-dim">abstract.md</div>
            <p className="text-[13px] leading-relaxed text-[#cccccc]/90">
              {pub.abstract}
            </p>
          </div>
        </section>

        {/* Tags */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-orange">[03]</span>
            <span className="text-[13px] font-semibold text-white">Tags</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pub.tags.map((t) => (
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
            <span className="font-mono text-[10px] text-vsc-orange">[04]</span>
            <span className="text-[13px] font-semibold text-white">Read the paper</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#f898201a] text-[#f89820]">
              <BookOpen size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
                Open full paper
              </div>
              <div className="truncate text-[10px] font-mono text-vsc-dim">
                {pub.url}
              </div>
            </div>
            <ExternalLink size={12} className="ml-auto text-vsc-dim group-hover:text-white" />
          </a>
        </section>
      </div>
    </div>
  );
}
