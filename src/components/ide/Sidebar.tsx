"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Search, RefreshCw, Eye, EyeOff } from "lucide-react";
import { fileTree, getNodeAtPath, type FsNode } from "@/lib/filesystem";
import { useIDEStore } from "@/store/useIDEStore";
import { FileIcon } from "./FileIcon";
import { SourceControlPanel } from "./SourceControlPanel";
import { profile } from "@/lib/content";

// Sort children the VS Code way: directories first, then files, both A-Z.
// Hidden files (dotfiles) appear last within their group.
function sortVsCode(children: FsNode[]): FsNode[] {
  return [...children].sort((a, b) => {
    const aDir = a.kind === "dir";
    const bDir = b.kind === "dir";
    if (aDir !== bDir) return aDir ? -1 : 1;
    const aHidden = a.hidden ? 1 : 0;
    const bHidden = b.hidden ? 1 : 0;
    if (aHidden !== bHidden) return aHidden - bHidden;
    return (a.label ?? a.name).localeCompare(b.label ?? b.name);
  });
}

function TreeNode({
  node,
  path,
  depth,
}: {
  node: FsNode;
  path: string[];
  depth: number;
}) {
  const expandedDirs = useIDEStore((s) => s.expandedDirs);
  const toggleDir = useIDEStore((s) => s.toggleDir);
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const currentPath = useIDEStore((s) => s.currentPath);
  const selectedFile = useIDEStore((s) => s.selectedFile);
  const hiddenVisible = useIDEStore((s) => s.hiddenVisible);

  const key = path.join("/");
  const isExpanded = !!expandedDirs[key];
  const isDir = node.kind === "dir";
  const isHome = depth === 0;
  const isExternalLink = node.external && node.href;

  const isCurrentDir =
    isDir && currentPath.join("/") === key && !selectedFile;
  const isSelectedFile = selectedFile && selectedFile.join("/") === key;

  if (node.hidden && !hiddenVisible) return null;

  const handleClick = () => {
    if (isExternalLink) {
      window.open(node.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (isDir) {
      if (isHome) {
        toggleDir(path);
        navigate([]);
      } else {
        toggleDir(path);
        navigate(path);
      }
      return;
    }
    openNode(path);
    openTab(path, node.label ?? node.name, node.icon);
  };

  const active = isCurrentDir || isSelectedFile;

  return (
    <div>
      <div
        onClick={handleClick}
        className={`group flex cursor-pointer items-center gap-1 py-[3px] pr-2 text-[13px] leading-none select-none transition-colors ${
          active
            ? "bg-[#37373d] text-white"
            : "text-[#cccccc] hover:bg-[#2a2d2e]"
        }`}
        style={{ paddingLeft: depth * 8 + 8 }}
        title={pathToString(path)}
      >
        {isDir ? (
          isExpanded ? (
            <ChevronDown size={14} className="text-[#cccccc]/70 shrink-0" />
          ) : (
            <ChevronRight size={14} className="text-[#cccccc]/70 shrink-0" />
          )
        ) : (
          <span className="w-[14px] shrink-0" />
        )}
        <FileIcon
          icon={isDir ? (isExpanded ? "folderOpen" : "folder") : node.icon}
          size={15}
          className="shrink-0"
        />
        <span className="truncate font-mono">{node.label ?? node.name}</span>
        {isExternalLink && (
          <span className="ml-auto text-[10px] text-vsc-dim opacity-0 group-hover:opacity-100">
            ↗
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isDir && isExpanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {sortVsCode(node.children).map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                path={[...path, child.name]}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function pathToString(path: string[]): string {
  return "/" + ["home", "mohit", ...path].join("/");
}

function ExplorerPanel() {
  const hiddenVisible = useIDEStore((s) => s.hiddenVisible);
  const setHiddenVisible = useIDEStore((s) => s.setHiddenVisible);
  const navigate = useIDEStore((s) => s.navigate);
  const setDirExpanded = useIDEStore((s) => s.setDirExpanded);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);

  const expandAll = () => {
    (fileTree.children ?? []).forEach((c) => {
      if (c.kind === "dir") setDirExpanded([c.name], true);
    });
  };

  return (
    <aside className="flex h-full w-full flex-col bg-[#252526]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#cccccc]/70">
            Explorer
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setHiddenVisible(!hiddenVisible)}
            className="p-1 rounded hover:bg-[#3c3c3c] text-[#cccccc]/70"
            title="Toggle hidden files"
          >
            {hiddenVisible ? <Eye size={13} /> : <EyeOff size={13} />}
          </button>
          <button
            onClick={expandAll}
            className="p-1 rounded hover:bg-[#3c3c3c] text-[#cccccc]/70"
            title="Expand all"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Project root header */}
      <div className="px-3 pb-1">
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#cccccc]/60">
          <span className="text-[#dcb67a]">[*]</span> mohit — {profile.osName}
        </div>
      </div>

      {/* Tree */}
      <div className="vscode-scroll flex-1 overflow-y-auto px-1 pb-3">
        {/* HOME root entry */}
        <TreeNode node={fileTree} path={[]} depth={0} />
      </div>

      {/* Search bar (decorative) */}
      <div className="border-t border-[#1e1e1e] p-2">
        <div className="flex items-center gap-2 rounded bg-[#3c3c3c] px-2 py-1 text-[12px] text-[#cccccc]/50">
          <Search size={12} />
          <span className="font-mono">Search files…</span>
          <span className="ml-auto rounded bg-[#505050] px-1 text-[10px]">Ctrl+P</span>
        </div>
      </div>
    </aside>
  );
}

// Public Sidebar — switches between the file-tree Explorer and Source Control panels.
export function Sidebar() {
  const sidebarView = useIDEStore((s) => s.sidebarView);
  if (sidebarView === "scm") {
    return <SourceControlPanel />;
  }
  return <ExplorerPanel />;
}
