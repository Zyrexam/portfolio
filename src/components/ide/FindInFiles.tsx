"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X, Search, CaseSensitive, WholeWord, Regex, FileText, ChevronRight } from "lucide-react";
import { useIDEStore } from "@/store/useIDEStore";
import {
  fileTree,
  getNodeAtPath,
  type FsNode,
} from "@/lib/filesystem";
import { profile, projects, experiences, skills } from "@/lib/content";

type SearchDoc = {
  path: string[];
  label: string;
  icon: string;
  lines: string[]; // each line is searchable
};

function flattenTree(node: FsNode, path: string[] = [], acc: { path: string[]; node: FsNode }[] = []) {
  if (path.length > 0) acc.push({ path, node });
  if (node.children) {
    for (const child of node.children) {
      flattenTree(child, [...path, child.name], acc);
    }
  }
  return acc;
}

function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const all = flattenTree(fileTree);
  for (const { path, node } of all) {
    if (node.kind === "dir") continue;
    const lines = getDocLines(node);
    if (lines.length > 0) {
      docs.push({ path, label: node.label ?? node.name, icon: node.icon, lines });
    }
  }
  return docs;
}

function getDocLines(node: FsNode): string[] {
  switch (node.kind) {
    case "about":
      return [
        `# Hi, I'm ${profile.name} `,
        profile.bio,
        profile.credential,
        `LeetCode: ${profile.leetcodeCount} problems solved`,
        "Featured projects section",
        ...projects.slice(0, 4).map((p) => `${p.name} — ${p.tagline}`),
      ];
    case "contact":
      return [
        `email: ${profile.email}`,
        `github: ${profile.githubHandle}`,
        `linkedin: ${profile.linkedin}`,
        `leetcode: ${profile.leetcodeHandle}`,
        `resume: ${profile.resume}`,
      ];
    case "skills":
      return Object.keys(skills).flatMap((cat) => [
        cat,
        ...skills[cat as keyof typeof skills].map((s) => s.name),
      ]);
    case "experience":
      return experiences.flatMap((e) => [
        e.title,
        e.org,
        e.period,
        e.summary,
        ...e.highlights,
        ...e.tech,
      ]);
    case "project": {
      const p = projects.find((x) => x.id === node.projectId);
      if (!p) return [];
      return [
        p.name,
        p.tagline,
        p.description,
        ...p.features,
        ...p.tech,
        ...p.metrics.map((m) => `${m.label} ${m.value}`),
        p.architecture ?? "",
        p.github ?? "",
        p.live ?? "",
      ].filter(Boolean);
    }
    case "env":
      return ["JWT_SECRET", "OPENAI_KEY", "DB_PASSWORD", "AWS_SECRET", "Nice try, but secrets stay secret "];
    case "settings":
      return ["theme", "clock", "24h", "hidden", "terminal", "minimap", "fontFamily", "tabSize"];
    case "package":
      return ["next", "react", "framer-motion", "zustand", "cmdk", "lucide-react", "tailwindcss", "typescript", "dependencies", "devDependencies"];
    case "resume":
      return [profile.name, profile.role, profile.credential, "Federated Learning Researcher", "NLP→Solidity Compiler", profile.email];
    case "link":
      return [node.href ?? "", node.label ?? ""];
    default:
      return [node.label ?? node.name];
  }
}

type Match = {
  doc: SearchDoc;
  lineIdx: number;
  line: string;
  before: string;
  match: string;
  after: string;
};

function search(query: string, opts: { caseSensitive: boolean; wholeWord: boolean }): Match[] {
  if (!query.trim()) return [];
  const docs = buildSearchIndex();
  const q = opts.caseSensitive ? query : query.toLowerCase();
  const results: Match[] = [];
  for (const doc of docs) {
    for (let i = 0; i < doc.lines.length; i++) {
      const line = doc.lines[i] ?? "";
      const hay = opts.caseSensitive ? line : line.toLowerCase();
      let idx = hay.indexOf(q);
      while (idx !== -1) {
        if (opts.wholeWord) {
          const before = idx > 0 ? line[idx - 1] : " ";
          const after = idx + q.length < line.length ? line[idx + q.length] : " ";
          if (/\w/.test(before) || /\w/.test(after)) {
            idx = hay.indexOf(q, idx + 1);
            continue;
          }
        }
        results.push({
          doc,
          lineIdx: i,
          line,
          before: line.slice(Math.max(0, idx - 30), idx),
          match: line.slice(idx, idx + q.length),
          after: line.slice(idx + q.length, idx + q.length + 50),
        });
        if (results.length >= 100) return results;
        idx = hay.indexOf(q, idx + 1);
      }
    }
  }
  return results;
}

export function FindInFiles({
  open,
  onClose,
  onOpenResult,
}: {
  open: boolean;
  onClose: () => void;
  onOpenResult: (path: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  if (!open && query !== "") {
    setQuery("");
  }

  // Global hotkey: Ctrl+Shift+F / Cmd+Shift+F
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "f" || e.key === "F")) {
        e.preventDefault();
        if (!open) {
          onClose(); // close whatever else
        }
      } else if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(
    () => search(query, { caseSensitive, wholeWord }),
    [query, caseSensitive, wholeWord],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, { doc: SearchDoc; matches: Match[] }>();
    for (const m of results) {
      const key = m.doc.path.join("/");
      if (!map.has(key)) map.set(key, { doc: m.doc, matches: [] });
      map.get(key)!.matches.push(m);
    }
    return Array.from(map.values());
  }, [results]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[10vh] px-4"
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
            {/* Search input */}
            <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-3 py-2.5">
              <Search size={14} className="text-vsc-cyan shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across all files… (Ctrl+Shift+F)"
                className="flex-1 bg-transparent font-mono text-[13px] text-white placeholder:text-vsc-dim outline-none"
              />
              <button
                onClick={() => setCaseSensitive((v) => !v)}
                title="Match case"
                className={`rounded p-1 transition-colors ${
                  caseSensitive
                    ? "bg-[#0e639c] text-white"
                    : "text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
                }`}
              >
                <CaseSensitive size={14} />
              </button>
              <button
                onClick={() => setWholeWord((v) => !v)}
                title="Whole word"
                className={`rounded p-1 transition-colors ${
                  wholeWord
                    ? "bg-[#0e639c] text-white"
                    : "text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
                }`}
              >
                <WholeWord size={14} />
              </button>
              <button
                className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
                title="Regex (coming soon)"
              >
                <Regex size={14} />
              </button>
              <kbd className="rounded bg-[#3c3c3c] px-1.5 py-0.5 text-[10px] font-mono text-vsc-dim">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="vscode-scroll max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <div className="px-4 py-8 text-center font-mono text-[12px] text-vsc-dim">
                  Type to search across all files, projects, and skills.
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-[12px] text-vsc-dim">
                  No results for &quot;{query}&quot;.
                </div>
              ) : (
                <>
                  <div className="px-3 py-1.5 border-b border-[#1e1e1e] font-mono text-[10px] text-vsc-dim">
                    {results.length} results in {grouped.length} files
                  </div>
                  {grouped.map(({ doc, matches }) => (
                    <div key={doc.path.join("/")} className="border-b border-[#1e1e1e]/60">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e]/40">
                        <FileText size={12} className="text-vsc-cyan shrink-0" />
                        <span className="font-mono text-[11px] text-[#cccccc] truncate">
                          {doc.label}
                        </span>
                        <span className="font-mono text-[10px] text-vsc-dim truncate">
                          /{doc.path.slice(0, -1).join("/")}
                        </span>
                        <span className="ml-auto rounded bg-[#252526] px-1.5 py-0.5 text-[9px] font-mono text-vsc-dim ring-1 ring-[#2d2d30]">
                          {matches.length}
                        </span>
                      </div>
                      {matches.slice(0, 5).map((m, i) => (
                        <button
                          key={i}
                          onClick={() => onOpenResult(doc.path)}
                          className="group flex w-full items-start gap-2 px-3 py-1.5 text-left hover:bg-[#2a2d2e] transition-colors"
                        >
                          <span className="font-mono text-[10px] text-vsc-dim shrink-0 w-6 text-right mt-0.5">
                            {m.lineIdx + 1}
                          </span>
                          <span className="font-mono text-[11px] text-[#cccccc]/70 truncate">
                            {m.before}
                            <span className="bg-[#613214] text-[#ffd700] px-0.5 rounded-sm">
                              {m.match}
                            </span>
                            {m.after}
                          </span>
                          <ChevronRight
                            size={11}
                            className="ml-auto mt-0.5 shrink-0 text-vsc-dim opacity-0 group-hover:opacity-100"
                          />
                        </button>
                      ))}
                      {matches.length > 5 && (
                        <div className="px-3 py-1 font-mono text-[10px] text-vsc-dim">
                          +{matches.length - 5} more…
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between border-t border-[#1e1e1e] bg-[#1e1e1e]/60 px-3 py-1.5 font-mono text-[10px] text-vsc-dim">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-[#3c3c3c] px-1">Up/Down</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-[#3c3c3c] px-1">↵</kbd> open
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Search size={10} /> MohitOS find-in-files
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
