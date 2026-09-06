"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Keyboard, CornerDownLeft } from "lucide-react";

type Shortcut = {
  keys: string[];
  desc: string;
  group: string;
};

const SHORTCUTS: Shortcut[] = [
  // Global
  { keys: ["Ctrl", "P"], desc: "Quick Open — fuzzy file finder", group: "Global" },
  { keys: ["Ctrl", "Shift", "P"], desc: "Command palette (actions only, '>' prefix)", group: "Global" },
  { keys: ["Ctrl", "K"], desc: "Toggle command palette", group: "Global" },
  { keys: ["?"], desc: "Show this keyboard shortcuts cheat-sheet", group: "Global" },
  { keys: ["Ctrl", "Shift", "F"], desc: "Find in Files — global search across all content", group: "Global" },
  { keys: ["Esc"], desc: "Close any open overlay / modal", group: "Global" },
  // Navigation
  { keys: ["↑", "↓"], desc: "Move selection in directory grid", group: "Navigation" },
  { keys: ["←", "→"], desc: "Move selection (alias of Up/Down)", group: "Navigation" },
  { keys: ["Enter"], desc: "Open selected file / folder", group: "Navigation" },
  { keys: ["Backspace"], desc: "Go up one directory", group: "Navigation" },
  // Terminal
  { keys: ["↑", "↓"], desc: "Browse command history (in terminal)", group: "Terminal" },
  { keys: ["Ctrl", "L"], desc: "Clear the terminal", group: "Terminal" },
  { keys: ["Tab"], desc: "Autocomplete command (in terminal)", group: "Terminal" },
  // Status bar
  { keys: ["Click clock"], desc: "Toggle 12h / 24h time format", group: "Status bar" },
  { keys: ["Click theme"], desc: "Cycle theme (dark / high-contrast)", group: "Status bar" },
  { keys: ["Click bell"], desc: "Open notifications panel", group: "Status bar" },
];

const GROUPS = ["Global", "Navigation", "Terminal", "Status bar"];

export function KeyboardShortcutsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-lg bg-[#252526] ring-1 ring-[#454545] shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#1e1e1e] px-4 py-3">
              <div className="flex items-center gap-2">
                <Keyboard size={15} className="text-vsc-accent" />
                <span className="font-mono text-[13px] font-semibold text-white">
                  Keyboard Shortcuts
                </span>
                <span className="font-mono text-[10px] text-vsc-dim">
                  · MohitOS
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* body */}
            <div className="vscode-scroll max-h-[70vh] overflow-y-auto p-4">
              {GROUPS.map((group) => {
                const items = SHORTCUTS.filter((s) => s.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-5 last:mb-0">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-vsc-accent">
                        {group}
                      </span>
                      <div className="h-px flex-1 bg-[#2d2d30]" />
                      <span className="font-mono text-[10px] text-vsc-dim">
                        {items.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {items.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="group flex items-center gap-3 rounded px-2 py-1.5 hover:bg-[#2a2d2e]"
                        >
                          <div className="flex items-center gap-1 shrink-0 min-w-[140px]">
                            {s.keys.map((k, j) => (
                              <span key={j} className="flex items-center gap-1">
                                {j > 0 && (
                                  <span className="text-vsc-dim text-[10px]">+</span>
                                )}
                                <kbd className="rounded bg-[#1e1e1e] px-1.5 py-0.5 text-[11px] font-mono text-[#cccccc] ring-1 ring-[#3c3c3c] group-hover:ring-[#007acc] transition-colors">
                                  {k}
                                </kbd>
                              </span>
                            ))}
                          </div>
                          <span className="text-[12px] text-[#cccccc]/90">
                            {s.desc}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between border-t border-[#1e1e1e] bg-[#1e1e1e]/60 px-4 py-2">
              <span className="font-mono text-[10px] text-vsc-dim">
                {SHORTCUTS.length} shortcuts · press{" "}
                <kbd className="rounded bg-[#3c3c3c] px-1 text-[#cccccc]">?</kbd>{" "}
                anytime to toggle
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-vsc-dim">
                <CornerDownLeft size={11} /> esc to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
