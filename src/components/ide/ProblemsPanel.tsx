"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  X,
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

type Diagnostic = {
  id: string;
  severity: "error" | "warning" | "info";
  file: string;
  line: number;
  col: number;
  message: string;
  source: string;
};

// Faux lint diagnostics — themed around Mohit's actual projects.
const DIAGNOSTICS: Diagnostic[] = [
  {
    id: "d1",
    severity: "warning",
    file: "projects/Systems-Programming/Webhook-Delivery-System",
    line: 142,
    col: 8,
    message: "Exponential backoff cap should be configurable — currently hardcoded to 32s.",
    source: "mohit-lint",
  },
  {
    id: "d2",
    severity: "info",
    file: "projects/Systems-Programming/payment-idempotency-proxy",
    line: 67,
    col: 3,
    message: "Cache hit rate 95.9% — consider bumping TTL beyond 24h for read-heavy workloads.",
    source: "perf-hint",
  },
  {
    id: "d3",
    severity: "error",
    file: ".env",
    line: 1,
    col: 1,
    message: "Secrets detected in environment file — but they stay secret  (access denied).",
    source: "security",
  },
  {
    id: "d4",
    severity: "warning",
    file: "experience/nlp-solidity-compiler.md",
    line: 28,
    col: 12,
    message: "Slither reported 1 reentrancy pattern — auto-patched by LLM, awaiting re-verification.",
    source: "slither",
  },
  {
    id: "d5",
    severity: "info",
    file: "projects/Experiments/FedMeet",
    line: 91,
    col: 5,
    message: "Gated sensor fusion outperforms FedProx by 4.2% on non-IID split — see ACM paper.",
    source: "research",
  },
  {
    id: "d6",
    severity: "warning",
    file: "projects/Systems-Programming/TurboTTS-Proxy",
    line: 54,
    col: 16,
    message: "Cold TTFA <2ms relies on cache hit — document cache-warming strategy in about.md.",
    source: "docs",
  },
  {
    id: "d7",
    severity: "info",
    file: "about/about.md",
    line: 3,
    col: 1,
    message: "Portfolio ships with 10 projects, 2 themes, 30+ terminal commands — ready for review.",
    source: "mohit-lint",
  },
];

const SEVERITY_META = {
  error: {
    icon: AlertCircle,
    color: "#f44747",
    label: "Errors",
    bg: "bg-[#5a2d2d]/40",
  },
  warning: {
    icon: AlertTriangle,
    color: "#dcdcaa",
    label: "Warnings",
    bg: "bg-[#5a5a2d]/30",
  },
  info: {
    icon: Info,
    color: "#75beff",
    label: "Infos",
    bg: "bg-[#2d3a5a]/30",
  },
} as const;

export function ProblemsPanel({
  open,
  onClose,
  onOpenFile,
}: {
  open: boolean;
  onClose: () => void;
  onOpenFile: (path: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const counts = {
    error: DIAGNOSTICS.filter((d) => d.severity === "error").length,
    warning: DIAGNOSTICS.filter((d) => d.severity === "warning").length,
    info: DIAGNOSTICS.filter((d) => d.severity === "info").length,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[10vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-lg bg-[#252526] ring-1 ring-[#454545] shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#1e1e1e] px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-[13px] font-semibold text-white">
                  <AlertCircle size={14} className="text-[#f44747]" />
                  Problems
                </div>
                {/* severity tabs */}
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  {(["error", "warning", "info"] as const).map((sev) => {
                    const meta = SEVERITY_META[sev];
                    const Icon = meta.icon;
                    return (
                      <span
                        key={sev}
                        className="flex items-center gap-1 rounded bg-[#1e1e1e] px-1.5 py-0.5"
                        style={{ color: meta.color }}
                      >
                        <Icon size={10} />
                        {counts[sev]} {meta.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
                  title="Re-run diagnostics"
                >
                  <RefreshCw size={12} />
                </button>
                <button
                  onClick={onClose}
                  className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* list */}
            <div className="vscode-scroll max-h-[60vh] overflow-y-auto">
              {DIAGNOSTICS.map((d, i) => {
                const meta = SEVERITY_META[d.severity];
                const Icon = meta.icon;
                return (
                  <motion.button
                    key={d.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => onOpenFile(d.file)}
                    className="group flex w-full items-start gap-2.5 border-b border-[#1e1e1e]/60 px-4 py-2.5 text-left hover:bg-[#2a2d2e] transition-colors"
                  >
                    <Icon
                      size={14}
                      style={{ color: meta.color }}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-[#cccccc] group-hover:text-white leading-snug">
                        {d.message}
                      </div>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-vsc-dim">
                        <span className="truncate">{d.file}</span>
                        <span>·</span>
                        <span>
                          Ln {d.line}, Col {d.col}
                        </span>
                        <span>·</span>
                        <span style={{ color: meta.color }}>{d.source}</span>
                      </div>
                    </div>
                    <ChevronRight
                      size={12}
                      className="mt-1 shrink-0 text-vsc-dim opacity-0 group-hover:opacity-100"
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between border-t border-[#1e1e1e] bg-[#1e1e1e]/60 px-4 py-1.5 font-mono text-[10px] text-vsc-dim">
              <span>{DIAGNOSTICS.length} problems · 1 error · 3 warnings · 3 infos</span>
              <span>click a row to open the file</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
