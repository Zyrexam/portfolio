"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import {
  Search,
  CornerDownLeft,
  ArrowRight,
  Folder,
  FileText,
  Eye,
  EyeOff,
  Terminal as TerminalIcon,
  Github,
  Mail,
  RotateCcw,
} from "lucide-react";
import { useIDEStore } from "@/store/useIDEStore";
import {
  fileTree,
  getNodeAtPath,
  type FsNode,
} from "@/lib/filesystem";
import { projects, profile } from "@/lib/content";
import { FileIcon } from "./FileIcon";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  path?: string[];
  node?: FsNode;
  action?: "navigate" | "open" | "external" | "toggle-hidden" | "clear-terminal" | "focus-terminal" | "reload" | "open-resume" | "theme-dark" | "theme-hc";
  href?: string;
  icon: string;
};

function flattenTree(node: FsNode, path: string[] = [], acc: { path: string[]; node: FsNode }[] = []) {
  if (path.length > 0) {
    acc.push({ path, node });
  }
  if (node.children) {
    for (const child of node.children) {
      flattenTree(child, [...path, child.name], acc);
    }
  }
  return acc;
}

export function CommandPalette({
  open,
  onOpenChange,
  onOpenResume,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onOpenResume: () => void;
}) {
  const setOpen = onOpenChange;
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const setDirExpanded = useIDEStore((s) => s.setDirExpanded);
  const setHiddenVisible = useIDEStore((s) => s.setHiddenVisible);
  const setTerminalExpanded = useIDEStore((s) => s.setTerminalExpanded);
  const clearLines = useIDEStore((s) => s.clearLines);

  const [query, setQuery] = useState("");
  const commandMode = query.startsWith(">");

  if (!open && query !== "") {
    setQuery("");
  }

  // Global hotkey: Ctrl+P / Cmd+P / Ctrl+K  (toggles, file mode)
  //                Ctrl+Shift+P / Cmd+Shift+P (command mode, prefixed with '>')
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "p" || e.key === "P" || e.key === "k" || e.key === "K")
      ) {
        e.preventDefault();
        if (!open && e.shiftKey) {
          onOpenChange(true);
          setQuery(">");
        } else {
          onOpenChange(!open);
        }
      } else if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const items = useMemo<Item[]>(() => {
    const fileItems: Item[] = flattenTree(fileTree).map(({ path, node }) => ({
      id: "f:" + path.join("/"),
      label: node.label ?? node.name,
      hint: "/" + path.slice(0, -1).join("/"),
      group: "Files",
      path,
      node,
      action: node.kind === "dir" ? "navigate" : "open",
      icon: node.icon,
    }));

    const projectItems: Item[] = projects.map((p) => ({
      id: "p:" + p.id,
      label: p.name,
      hint: p.tagline,
      group: "Projects",
      path: ["projects", p.category, p.name],
      action: "open",
      icon: p.icon,
    }));

    const actionItems: Item[] = [
      {
        id: "a:home",
        label: "Go to Home",
        hint: "/home/mohit",
        group: "Actions",
        action: "navigate",
        path: [],
        icon: "home",
      },
      {
        id: "a:toggle-hidden",
        label: "Toggle Hidden Files",
        hint: "show/hide .env",
        group: "Actions",
        action: "toggle-hidden",
        icon: "env",
      },
      {
        id: "a:focus-terminal",
        label: "Focus Terminal",
        hint: "jump to the shell",
        group: "Actions",
        action: "focus-terminal",
        icon: "file",
      },
      {
        id: "a:clear-terminal",
        label: "Clear Terminal",
        hint: "wipe the scrollback",
        group: "Actions",
        action: "clear-terminal",
        icon: "file",
      },
      {
        id: "a:resume",
        label: "Open Resume.pdf",
        hint: "modal viewer",
        group: "Actions",
        action: "open-resume",
        icon: "resume",
      },
      {
        id: "a:reload",
        label: "Reload MohitOS",
        hint: "restart the session",
        group: "Actions",
        action: "reload",
        icon: "file",
      },
      {
        id: "a:theme-dark",
        label: "Set Theme: Dark+",
        hint: "VS Code Dark+ (default)",
        group: "Themes",
        action: "theme-dark",
        icon: "file",
      },
      {
        id: "a:theme-hc",
        label: "Set Theme: High Contrast",
        hint: "black + neon yellow",
        group: "Themes",
        action: "theme-hc",
        icon: "env",
      },
    ];

    const linkItems: Item[] = [
      {
        id: "l:github",
        label: "Open GitHub",
        hint: profile.github,
        group: "Links",
        action: "external",
        href: profile.github,
        icon: "github",
      },
      {
        id: "l:linkedin",
        label: "Open LinkedIn",
        hint: profile.linkedin,
        group: "Links",
        action: "external",
        href: profile.linkedin,
        icon: "linkedin",
      },
      {
        id: "l:leetcode",
        label: "Open LeetCode",
        hint: profile.leetcode,
        group: "Links",
        action: "external",
        href: profile.leetcode,
        icon: "leetcode",
      },
      {
        id: "l:email",
        label: "Send Email",
        hint: profile.email,
        group: "Links",
        action: "external",
        href: `mailto:${profile.email}`,
        icon: "mail",
      },
    ];

    return [...actionItems, ...projectItems, ...fileItems, ...linkItems];
  }, []);

  const runItem = (item: Item) => {
    setOpen(false);
    if (item.action === "navigate" && item.path !== undefined) {
      for (let i = 1; i <= item.path.length; i++) {
        setDirExpanded(item.path.slice(0, i), true);
      }
      navigate(item.path);
    } else if (item.action === "open" && item.path && item.node) {
      for (let i = 1; i <= item.path.length; i++) {
        setDirExpanded(item.path.slice(0, i), true);
      }
      if (item.node.kind === "resume") {
        onOpenResume();
        return;
      }
      if (item.node.external && item.node.href) {
        window.open(item.node.href, "_blank", "noopener,noreferrer");
        return;
      }
      openNode(item.path);
      openTab(item.path, item.node.label ?? item.node.name, item.node.icon);
    } else if (item.action === "external" && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.action === "toggle-hidden") {
      setHiddenVisible(!useIDEStore.getState().hiddenVisible);
    } else if (item.action === "focus-terminal") {
      setTerminalExpanded(true);
      setTimeout(() => {
        const input = document.querySelector(
          'input[autocomplete="off"]',
        ) as HTMLInputElement | null;
        input?.focus();
      }, 50);
    } else if (item.action === "clear-terminal") {
      clearLines();
    } else if (item.action === "open-resume") {
      onOpenResume();
    } else if (item.action === "theme-dark") {
      useIDEStore.getState().setTheme("dark");
    } else if (item.action === "theme-hc") {
      useIDEStore.getState().setTheme("high-contrast");
    } else if (item.action === "reload") {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-lg bg-[#252526] ring-1 ring-[#454545] shadow-2xl"
          >
            <Command
              label="Command Palette"
              className="flex flex-col"
              loop
              shouldFilter={!commandMode}
            >
              <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-3 py-2.5">
                {commandMode ? (
                  <span className="text-vsc-cyan font-mono text-[13px] shrink-0">&gt;</span>
                ) : (
                  <Search size={14} className="text-vsc-cyan shrink-0" />
                )}
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder={
                    commandMode
                      ? "Type a command name… (Ctrl+Shift+P)"
                      : "Search files, projects… (Ctrl+P)   |   '>' for commands"
                  }
                  className="flex-1 bg-transparent font-mono text-[13px] text-white placeholder:text-vsc-dim outline-none"
                />
                <kbd className="rounded bg-[#3c3c3c] px-1.5 py-0.5 text-[10px] font-mono text-vsc-dim">
                  ESC
                </kbd>
              </div>
              <Command.List className="vscode-scroll max-h-[50vh] overflow-y-auto p-1">
                <Command.Empty className="px-3 py-6 text-center font-mono text-[12px] text-vsc-dim">
                  No results found.
                </Command.Empty>
                {(commandMode
                  ? items
                      .filter(
                        (it) =>
                          it.group === "Actions" ||
                          it.group === "Themes" ||
                          it.group === "Links",
                      )
                      .filter((it) => {
                        const q = query.slice(1).trim().toLowerCase();
                        if (!q) return true;
                        return (
                          it.label.toLowerCase().includes(q) ||
                          it.hint.toLowerCase().includes(q)
                        );
                      })
                  : items
                ).map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${item.hint} ${item.group}`}
                    onSelect={() => {
                      runItem(item);
                      setQuery("");
                    }}
                    className="group flex cursor-pointer items-center gap-2.5 rounded px-2.5 py-2 font-mono text-[12px] text-[#cccccc] data-[selected=true]:bg-[#04395e] data-[selected=true]:text-white outline-none"
                  >
                    <FileIcon icon={item.icon} size={14} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                    <span className="ml-1 truncate text-[11px] text-vsc-dim">
                      {item.hint}
                    </span>
                    <span className="ml-auto shrink-0 rounded bg-[#1e1e1e] px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-vsc-dim ring-1 ring-[#2d2d30]">
                      {item.group}
                    </span>
                    <CornerDownLeft
                      size={12}
                      className="shrink-0 text-vsc-dim opacity-0 group-data-[selected=true]:opacity-100"
                    />
                  </Command.Item>
                ))}
              </Command.List>
              <div className="flex items-center justify-between border-t border-[#1e1e1e] bg-[#1e1e1e]/50 px-3 py-1.5 text-[10px] font-mono text-vsc-dim">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-[#3c3c3c] px-1">Up/Down</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-[#3c3c3c] px-1">↵</kbd> select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <ArrowRight size={10} /> MohitOS quick open
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
