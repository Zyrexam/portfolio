"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  RefreshCw,
  ArrowDown,
  ArrowUp,
  Check,
  Plus,
  Minus,
  FileText,
  FilePlus,
  FileX,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { profile } from "@/lib/content";

// Faux but themed SCM state — represents "current changes" on main.
type Change = {
  path: string;
  status: "M" | "U" | "D" | "A"; // Modified / Untracked / Deleted / Added
  staged: boolean;
};

const INITIAL_CHANGES: Change[] = [
  { path: "projects/Systems-Programming/webhook-svc/circuit_breaker.py", status: "M", staged: true },
  { path: "projects/Systems-Programming/webhook-svc/backoff.py", status: "M", staged: false },
  { path: "about/about.md", status: "M", staged: true },
  { path: "experience/federated-learning.md", status: "U", staged: false },
  { path: "projects/Experiments/fedmeet/gated_fusion.py", status: "A", staged: true },
  { path: ".mohitos/settings.json", status: "M", staged: false },
  { path: "projects/AWS-Projects/well-log-analyzer/downsample.py", status: "U", staged: false },
  { path: "skills.md", status: "D", staged: false },
];

const STATUS_META: Record<Change["status"], { label: string; color: string; bg: string }> = {
  M: { label: "M", color: "#e2c08d", bg: "bg-[#e2c08d]/15" }, // modified — orange
  U: { label: "U", color: "#75beff", bg: "bg-[#75beff]/15" }, // untracked — blue
  D: { label: "D", color: "#f44747", bg: "bg-[#f44747]/15" }, // deleted — red
  A: { label: "A", color: "#73c991", bg: "bg-[#73c991]/15" }, // added — green
};

function StatusIcon({ status }: { status: Change["status"] }) {
  if (status === "A") return <FilePlus size={13} className="text-[#73c991] shrink-0" />;
  if (status === "D") return <FileX size={13} className="text-[#f44747] shrink-0" />;
  return <FileText size={13} className="text-vsc-dim shrink-0" />;
}

export function SourceControlPanel() {
  const [changes, setChanges] = useState<Change[]>(INITIAL_CHANGES);
  const [commitMsg, setCommitMsg] = useState("");
  const [groupsOpen, setGroupsOpen] = useState({ staged: true, changes: true });
  const [lastCommit, setLastCommit] = useState<string | null>(null);

  const staged = changes.filter((c) => c.staged);
  const unstaged = changes.filter((c) => !c.staged);

  const stage = (path: string) =>
    setChanges((cs) => cs.map((c) => (c.path === path ? { ...c, staged: true } : c)));
  const unstage = (path: string) =>
    setChanges((cs) => cs.map((c) => (c.path === path ? { ...c, staged: false } : c)));
  const stageAll = () => setChanges((cs) => cs.map((c) => ({ ...c, staged: true })));

  const commit = () => {
    if (!commitMsg.trim() || staged.length === 0) return;
    setLastCommit(commitMsg.trim());
    // remove staged files after commit
    setChanges((cs) => cs.filter((c) => !c.staged));
    setCommitMsg("");
  };

  return (
    <aside className="flex h-full w-full flex-col bg-[#252526]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#cccccc]/70">
            Source Control
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={stageAll}
            className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
            title="Stage all changes"
          >
            <Check size={13} />
          </button>
          <button
            className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
            title="Refresh"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Branch + sync row */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#1e1e1e] bg-[#1e1e1e]/40 text-[11px] font-mono">
        <GitBranch size={12} className="text-[#cccccc]/70 shrink-0" />
        <span className="text-[#cccccc]">{profile.gitBranch}</span>
        <span className="flex items-center gap-2 ml-auto text-vsc-dim">
          <span className="flex items-center gap-0.5" title="behind">
            <ArrowDown size={11} /> 0
          </span>
          <span className="flex items-center gap-0.5" title="ahead">
            <ArrowUp size={11} className="text-vsc-green" /> {staged.length}
          </span>
        </span>
      </div>

      {/* Commit message box */}
      <div className="px-2 pt-2 pb-1.5">
        <textarea
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              commit();
            }
          }}
          placeholder="Message (Ctrl+/Ctrl+Enter to commit)"
          className="w-full resize-none rounded bg-[#1e1e1e] px-2 py-1.5 text-[12px] font-mono text-[#cccccc] placeholder:text-vsc-dim outline-none ring-1 ring-[#3c3c3c] focus:ring-[#007acc] transition-colors"
          rows={2}
        />
        <button
          onClick={commit}
          disabled={!commitMsg.trim() || staged.length === 0}
          className="mt-1 w-full flex items-center justify-center gap-1.5 rounded bg-[#0e639c] px-2 py-1.5 text-[11px] font-mono text-white hover:bg-[#1177bb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Check size={12} /> Commit {staged.length > 0 ? `(${staged.length})` : ""}
        </button>
      </div>

      {/* Changes list */}
      <div className="vscode-scroll flex-1 overflow-y-auto px-1 pb-3">
        {/* Staged group */}
        <Group
          title="Staged Changes"
          count={staged.length}
          open={groupsOpen.staged}
          onToggle={() => setGroupsOpen((g) => ({ ...g, staged: !g.staged }))}
        >
          {staged.map((c) => (
            <ChangeRow
              key={c.path}
              change={c}
              onStage={() => unstage(c.path)}
              stageIcon="minus"
            />
          ))}
          {staged.length === 0 && (
            <div className="px-2 py-2 text-[10px] font-mono text-vsc-dim">
              no staged changes
            </div>
          )}
        </Group>

        {/* Changes (unstaged) group */}
        <Group
          title="Changes"
          count={unstaged.length}
          open={groupsOpen.changes}
          onToggle={() => setGroupsOpen((g) => ({ ...g, changes: !g.changes }))}
        >
          {unstaged.map((c) => (
            <ChangeRow
              key={c.path}
              change={c}
              onStage={() => stage(c.path)}
              stageIcon="plus"
            />
          ))}
          {unstaged.length === 0 && (
            <div className="px-2 py-2 text-[10px] font-mono text-vsc-dim">
              no changes
            </div>
          )}
        </Group>

        {/* Last commit feedback */}
        <AnimatePresence>
          {lastCommit && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 mx-1 rounded bg-[#0e4429]/30 ring-1 ring-[#26a641]/40 px-2 py-1.5 text-[10px] font-mono text-[#73c991]"
            >
              committed: {lastCommit}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function Group({
  title,
  count,
  open,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1">
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-1 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[#cccccc]/70 hover:text-white"
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {title}
        <span className="ml-1 rounded bg-[#1e1e1e] px-1 text-[9px] text-vsc-dim ring-1 ring-[#2d2d30]">
          {count}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChangeRow({
  change,
  onStage,
  stageIcon,
}: {
  change: Change;
  onStage: () => void;
  stageIcon: "plus" | "minus";
}) {
  const meta = STATUS_META[change.status];
  const fileName = change.path.split("/").pop() ?? change.path;
  const dir = change.path.split("/").slice(0, -1).join("/");
  return (
    <div className="group flex items-center gap-1.5 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer">
      <StatusIcon status={change.status} />
      <span className="font-mono text-[11px] text-[#cccccc] truncate group-hover:text-white">
        {fileName}
      </span>
      <span className="font-mono text-[10px] text-vsc-dim truncate hidden sm:inline">
        {dir}
      </span>
      <div className="ml-auto flex items-center gap-1 shrink-0">
        <span
          className={`font-mono text-[10px] font-bold w-4 text-center rounded ${meta.bg}`}
          style={{ color: meta.color }}
          title={meta.label}
        >
          {meta.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStage();
          }}
          className="rounded p-0.5 text-vsc-dim hover:bg-[#3c3c3c] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title={stageIcon === "plus" ? "Stage" : "Unstage"}
        >
          {stageIcon === "plus" ? <Plus size={11} /> : <Minus size={11} />}
        </button>
      </div>
    </div>
  );
}
