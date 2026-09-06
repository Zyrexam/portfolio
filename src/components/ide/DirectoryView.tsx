"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, BookOpen, FolderOpen } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { ContributionGraph } from "./ContributionGraph";
import { getChildren, getNodeAtPath, type FsNode } from "@/lib/filesystem";
import { useIDEStore } from "@/store/useIDEStore";
import { profile } from "@/lib/content";
import { useTypingEffect } from "@/hooks/use-typing-effect";

function DirectoryItem({
  node,
  path,
  index,
  selected,
}: {
  node: FsNode;
  path: string[];
  index: number;
  selected?: boolean;
}) {
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const toggleDir = useIDEStore((s) => s.toggleDir);
  const hiddenVisible = useIDEStore((s) => s.hiddenVisible);
  const expandedDirs = useIDEStore((s) => s.expandedDirs);

  if (node.hidden && !hiddenVisible) return null;

  const isDir = node.kind === "dir";
  const isExternalLink = node.external && node.href;
  const key = path.join("/");
  const isExpanded = !!expandedDirs[key];

  const handleOpen = () => {
    if (isExternalLink) {
      window.open(node.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (isDir) {
      toggleDir(path);
      navigate(path);
      return;
    }
    openNode(path);
    openTab(path, node.label ?? node.name, node.icon);
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.02 }}
      onDoubleClick={handleOpen}
      onClick={handleOpen}
      className={`group flex w-full flex-col items-center gap-2 rounded p-3 text-center transition-colors hover:bg-[#2a2d2e] focus:outline-none ${
        selected
          ? "bg-[#04395e] ring-1 ring-[#007acc]"
          : "focus:bg-[#37373d]"
      }`}
      title={isDir ? `Open ${node.label}` : `View ${node.label}`}
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded bg-[#1e1e1e] ring-1 ring-[#3c3c3c] group-hover:ring-[#007acc] transition-all">
        <FileIcon icon={isDir ? (isExpanded ? "folderOpen" : "folder") : node.icon} size={26} />
        {isDir && (
          <span className="absolute -bottom-1 -right-1 rounded-full bg-[#252526] px-1 text-[9px] font-mono text-vsc-dim ring-1 ring-[#3c3c3c]">
            {node.children?.length ?? 0}
          </span>
        )}
      </div>
      <span className="max-w-[110px] truncate font-mono text-[12px] text-[#cccccc] group-hover:text-white">
        {node.label ?? node.name}
      </span>
      {isExternalLink && (
        <span className="text-[9px] text-vsc-dim font-mono">↗ link</span>
      )}
    </motion.button>
  );
}

export function DirectoryView({ path }: { path: string[] }) {
  const children = getChildren(path);
  const node = getNodeAtPath(path);
  const isRoot = path.length === 0;
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const toggleDir = useIDEStore((s) => s.toggleDir);
  // selection is keyed by path so it auto-resets when navigating directories
  const pathKey = path.join("/");
  const [selectionMap, setSelectionMap] = useState<Record<string, number>>({});
  const selectedIdx = selectionMap[pathKey] ?? -1;
  const setSelectedIdx = (i: number) =>
    setSelectionMap((m) => ({ ...m, [pathKey]: i }));

  const sorted = [...children].sort((a, b) => {
    if (a.hidden && !b.hidden) return 1;
    if (!a.hidden && b.hidden) return -1;
    if (a.kind === "dir" && b.kind !== "dir") return -1;
    if (a.kind !== "dir" && b.kind === "dir") return 1;
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    if (isRoot) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx(Math.min(sorted.length - 1, selectedIdx + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx(Math.max(0, selectedIdx - 1));
      } else if (e.key === "Enter") {
        if (selectedIdx >= 0 && selectedIdx < sorted.length) {
          e.preventDefault();
          const child = sorted[selectedIdx];
          const childPath = [...path, child.name];
          if (child.external && child.href) {
            window.open(child.href, "_blank", "noopener,noreferrer");
          } else if (child.kind === "dir") {
            toggleDir(childPath);
            navigate(childPath);
          } else {
            openNode(childPath);
            openTab(childPath, child.label ?? child.name, child.icon);
          }
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        navigate(path.slice(0, -1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRoot, pathKey, selectedIdx, sorted, path, navigate, openNode, openTab, toggleDir]);

  if (isRoot) {
    return <RootDashboard path={path} />;
  }

  return (
    <div className="vscode-scroll h-full overflow-y-auto p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[11px] text-vsc-dim">
          {node?.children?.length ?? 0} items in this directory
        </div>
        <div className="font-mono text-[11px] text-vsc-dim">
          Up/Down navigate · Enter open · Backspace back
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {sorted.map((child, idx) => (
          <DirectoryItem
            key={child.name}
            node={child}
            path={[...path, child.name]}
            index={idx}
            selected={idx === selectedIdx}
          />
        ))}
      </div>
    </div>
  );
}

function RootDashboard({ path }: { path: string[] }) {
  const { displayed: typedBio, done: bioDone } = useTypingEffect(profile.bio, {
    speed: 14,
    startDelay: 600,
  });
  return (
    <div
      className="vscode-scroll relative h-full overflow-y-auto"
      style={{
        backgroundColor: "#1e1e1e",
        backgroundImage:
          "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(0,122,204,0.35), transparent 65%), linear-gradient(rgba(78,201,176,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(78,201,176,0.06) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 28px 28px, 28px 28px",
        backgroundAttachment: "local, local, local",
      }}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 pt-6 pb-4 border-b border-[#2d2d30]"
      >
        {/* Terminal-style logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="hidden md:flex items-baseline gap-1 mb-3 select-none"
          aria-hidden
        >
          <span className="font-mono text-[20px] font-bold text-vsc-green" style={{ textShadow: "0 0 12px rgba(78,201,176,0.5)" }}>
            MohitOS
          </span>
          <span className="font-mono text-[12px] text-vsc-dim">
            v2.0
          </span>
          <span className="font-mono text-[11px] text-vsc-dim ml-2">
            {"// a developer's file system"}
          </span>
        </motion.div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-vsc-dim mb-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#4ec9b0] animate-pulse" />
          shell · zsh · visitor@mohit
        </div>
        <h1 className="font-sans text-3xl md:text-4xl font-bold text-white tracking-tight">
          {profile.name}
          <span className="text-vsc-accent">.</span>
        </h1>
        <p className="mt-1 text-[#cccccc] text-base">
          {profile.credential}
        </p>
        <p className="mt-3 max-w-2xl text-[13px] text-[#cccccc]/70 leading-relaxed min-h-[3.5rem]">
          {typedBio}
          {!bioDone && <span className="terminal-cursor ml-0.5" />}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
          <span className="rounded bg-[#252526] px-2 py-1 text-vsc-green ring-1 ring-[#3c3c3c]">
            ● online
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-[#cccccc]/70 ring-1 ring-[#3c3c3c]">
            open to opportunities
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-vsc-orange ring-1 ring-[#3c3c3c]">
            IIT Jodhpur ’26
          </span>
        </div>
      </motion.div>

      {/* Key stats */}
      <div className="relative z-10 px-6 py-5 border-b border-[#2d2d30]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-vsc-dim mb-3 font-mono">
          {"// at a glance"}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* LeetCode */}
          <motion.a
            href="https://leetcode.com/u/mohitkumar4/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0 }}
            className="group rounded-lg bg-[#252526] p-4 ring-1 ring-[#2d2d30] hover:ring-[#f1e05a] transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <Code2 size={14} className="text-[#f1e05a]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-vsc-dim">LeetCode</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white group-hover:text-[#f1e05a] transition-colors">
              400+
            </div>
            <div className="text-[10px] text-vsc-dim mt-0.5">problems solved</div>
          </motion.a>

          {/* CodeForces */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.06 }}
            className="rounded-lg bg-[#252526] p-4 ring-1 ring-[#2d2d30] hover:ring-[#007acc] transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={14} className="text-[#007acc]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-vsc-dim">CodeForces</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">
              1100+
            </div>
            <div className="text-[10px] text-vsc-dim mt-0.5">Pupil rating</div>
          </motion.div>

          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="rounded-lg bg-[#252526] p-4 ring-1 ring-[#2d2d30] hover:ring-[#f89820] transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={14} className="text-[#f89820]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-vsc-dim">Papers</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">
              3
            </div>
            <div className="text-[10px] text-vsc-dim mt-0.5">peer-reviewed, published</div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18 }}
            className="rounded-lg bg-[#252526] p-4 ring-1 ring-[#2d2d30] hover:ring-[#4ec9b0] transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen size={14} className="text-[#4ec9b0]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-vsc-dim">Projects</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">
              10
            </div>
            <div className="text-[10px] text-vsc-dim mt-0.5">shipped systems</div>
          </motion.div>
        </div>

        {/* last commit widget */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 rounded-lg bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-3 font-mono text-[11px] flex items-center gap-3"
        >
          <span className="text-vsc-dim shrink-0">last commit:</span>
          <span className="text-vsc-purple">a3f9c12</span>
          <span className="text-[#cccccc] truncate">
            feat: idempotency proxy — 0 duplicates on 20 concurrent reqs
          </span>
          <span className="ml-auto text-vsc-dim shrink-0 hidden sm:inline">
            2 days ago · main
          </span>
        </motion.div>

        {/* Contribution graph */}
        <div className="mt-3">
          <ContributionGraph />
        </div>
      </div>

      {/* Directory listing */}
      <div className="relative z-10 px-6 py-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-vsc-dim mb-3 font-mono">
          {"// contents of /home/mohit"}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
          {path.length === 0 &&
            getChildren(path)
              .sort((a, b) => {
                if (a.hidden && !b.hidden) return 1;
                if (!a.hidden && b.hidden) return -1;
                if (a.kind === "dir" && b.kind !== "dir") return -1;
                if (a.kind !== "dir" && b.kind === "dir") return 1;
                return a.name.localeCompare(b.name);
              })
              .map((child, idx) => (
                <DirectoryItem
                  key={child.name}
                  node={child}
                  path={[child.name]}
                  index={idx}
                />
              ))}
        </div>
      </div>

      {/* Quick command hint */}
      <div className="relative z-10 px-6 pb-6 pt-2">
        <div className="rounded-lg bg-[#252526] ring-1 ring-[#2d2d30] p-4 font-mono text-[12px]">
          <span className="text-vsc-dim"># tip — try typing </span>
          <span className="text-vsc-green">help</span>
          <span className="text-vsc-dim"> in the terminal below, or </span>
          <span className="text-vsc-cyan">cd projects</span>
          <span className="text-vsc-dim"> to browse my work.</span>
          <br />
          <span className="text-vsc-dim"># or press </span>
          <kbd className="rounded bg-[#3c3c3c] px-1 text-[#cccccc]">Ctrl</kbd>
          <span className="text-vsc-dim"> + </span>
          <kbd className="rounded bg-[#3c3c3c] px-1 text-[#cccccc]">P</kbd>
          <span className="text-vsc-dim"> to quick-open any file, </span>
          <kbd className="rounded bg-[#3c3c3c] px-1 text-[#cccccc]">?</kbd>
          <span className="text-vsc-dim"> for shortcuts.</span>
        </div>
      </div>
    </div>
  );
}
