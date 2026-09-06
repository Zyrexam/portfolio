"use client";

import { motion } from "framer-motion";
import { Package, Copy, Check, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { profile } from "@/lib/content";

// plus the actual libraries this portfolio is built with.
const PKG = {
  name: "mohitos",
  version: profile.osVersion.replace("v", ""),
  description: `${profile.name} — ${profile.role} portfolio as a developer's file system.`,
  author: `${profile.name} <${profile.email}>`,
  private: true,
  homepage: "https://mohitkumar-six.vercel.app",
  keywords: [
    "portfolio",
    "vscode",
    "developer",
    "backend",
    "distributed-systems",
    "federated-learning",
  ],
  engines: {
    node: ">=20",
    bun: ">=1.1",
  },
  scripts: {
    dev: "next dev -p 3000",
    lint: "eslint .",
    build: "next build",
    start: "next start",
  },
  dependencies: {
    next: "^16.1.1",
    react: "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.23.2",
    zustand: "^5.0.6",
    cmdk: "^1.1.1",
    "lucide-react": "^0.525.0",
    "next-themes": "^0.4.6"
  },
  devDependencies: {
    typescript: "^5",
    tailwindcss: "^4",
    "@tailwindcss/postcss": "^4",
    eslint: "^9",
    "eslint-config-next": "^16.1.1",
  },
  mohit: {
    stack: [
      "FastAPI",
      "Spring Boot",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS S3",
      "GCP",
    ],
    research: ["Federated Learning", "NLP → Solidity", "Idempotency"],
    leetcode: profile.leetcodeCount,
    school: profile.school,
    gradYear: profile.gradYear,
  },
};

type DepEntry = { name: string; version: string; dev?: boolean; desc?: string };

const DEP_META: Record<string, string> = {
  next: "App Router framework",
  react: "UI library",
  "react-dom": "React DOM renderer",
  "framer-motion": "animations (boot, transitions, panels)",
  zustand: "IDE state store",
  cmdk: "command palette fuzzy finder",
  "lucide-react": "file / UI icons",
  "next-themes": "theme switching",
  typescript: "type safety",
  tailwindcss: "styling (VS Code theme)",
  "@tailwindcss/postcss": "Tailwind v4 PostCSS plugin",
  eslint: "code quality",
  "eslint-config-next": "Next.js lint rules",
};

function buildDepList(): DepEntry[] {
  return [
    ...Object.entries(PKG.dependencies).map(([name, version]) => ({
      name,
      version,
      desc: DEP_META[name],
    })),
    ...Object.entries(PKG.devDependencies).map(([name, version]) => ({
      name,
      version,
      dev: true,
      desc: DEP_META[name],
    })),
  ];
}

function hl(value: unknown): React.ReactNode {
  if (typeof value === "string")
    return <span className="text-vsc-orange">&quot;{value}&quot;</span>;
  if (typeof value === "number")
    return <span className="text-vsc-green">{value}</span>;
  if (typeof value === "boolean")
    return <span className="text-vsc-blue">{String(value)}</span>;
  if (value === null) return <span className="text-vsc-dim">null</span>;
  if (Array.isArray(value))
    return (
      <span className="text-vsc-cyan">[{value.length} items]</span>
    );
  if (typeof value === "object")
    return <span className="text-vsc-cyan">{"{…}"}</span>;
  return <span>{String(value)}</span>;
}

export function PackageJsonView() {
  const [copied, setCopied] = useState(false);
  const deps = buildDepList();
  const depCount = Object.keys(PKG.dependencies).length;
  const devCount = Object.keys(PKG.devDependencies).length;

  const copyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(PKG, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLines: [string, unknown, boolean][] = [
    ["name", PKG.name, false],
    ["version", PKG.version, false],
    ["description", PKG.description, false],
    ["author", PKG.author, false],
    ["private", PKG.private, false],
    ["homepage", PKG.homepage, false],
    ["keywords", PKG.keywords, false],
    ["engines", PKG.engines, false],
    ["scripts", PKG.scripts, false],
    ["dependencies", PKG.dependencies, false],
    ["devDependencies", PKG.devDependencies, false],
    ["mohit", PKG.mohit, false],
  ];

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#2d2d30] px-6 py-5">
        <div className="font-mono text-[11px] text-vsc-dim mb-2 flex items-center gap-1">
          <Package size={11} className="text-[#cbcb41]" /> .mohitos/package.json —
          MohitOS dependency manifest
        </div>
        <h1 className="font-sans text-2xl font-bold text-white">
          package
          <span className="text-vsc-yellow font-mono">.json</span>
        </h1>
        <p className="mt-1 text-[13px] text-[#cccccc]/80">
          {PKG.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
          <span className="rounded bg-[#252526] px-2 py-1 text-vsc-green ring-1 ring-[#3c3c3c]">
            v{PKG.version}
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-vsc-cyan ring-1 ring-[#3c3c3c]">
            {depCount} deps
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-vsc-purple ring-1 ring-[#3c3c3c]">
            {devCount} devDeps
          </span>
        </div>
      </div>

      {/* Dependency grid */}
      <div className="px-6 py-5 border-b border-[#2d2d30]">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-vsc-accent">[DEPS]</span>
          <span className="text-[13px] font-semibold text-white">
            Dependencies
          </span>
          <div className="h-px flex-1 bg-[#2d2d30]" />
          <span className="font-mono text-[10px] text-vsc-dim">
            npm install
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {deps.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="group flex items-center gap-2.5 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] px-3 py-2 hover:ring-[#007acc] transition-all"
            >
              <Package
                size={13}
                className={d.dev ? "text-vsc-purple" : "text-[#cbcb41]"}
              />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[12px] text-[#cccccc] truncate group-hover:text-white">
                  {d.name}
                </div>
                {d.desc && (
                  <div className="text-[10px] text-vsc-dim truncate">
                    {d.desc}
                  </div>
                )}
              </div>
              <span
                className={`font-mono text-[11px] ${
                  d.dev ? "text-vsc-purple" : "text-vsc-green"
                }`}
              >
                {d.version}
              </span>
              {d.dev && (
                <span className="rounded bg-[#1e1e1e] px-1 text-[9px] font-mono text-vsc-dim ring-1 ring-[#2d2d30]">
                  dev
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* JSON viewer */}
      <div className="px-6 py-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-vsc-accent">[RAW]</span>
          <span className="text-[13px] font-semibold text-white">
            package.json
          </span>
          <div className="h-px flex-1 bg-[#2d2d30]" />
          <button
            onClick={copyJson}
            className="flex items-center gap-1 rounded bg-[#252526] px-2 py-1 text-[10px] font-mono text-[#cccccc] ring-1 ring-[#3c3c3c] hover:ring-[#007acc]"
            title="Copy JSON"
          >
            {copied ? (
              <Check size={11} className="text-vsc-green" />
            ) : (
              <Copy size={11} />
            )}
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] overflow-hidden"
        >
          <div className="border-b border-[#2d2d30] px-3 py-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-vsc-dim">
              ~/ .mohitos / package.json
            </span>
            <span className="font-mono text-[10px] text-vsc-dim">
              JSON · {jsonLines.length} keys
            </span>
          </div>
          <div className="vscode-scroll overflow-x-auto p-3 font-mono text-[12px] leading-relaxed">
            <div className="text-vsc-dim">{"{"}</div>
            {jsonLines.map(([key, value], i) => (
              <div
                key={String(key)}
                className="flex items-start gap-2 hover:bg-[#2a2d2e]/40 px-1"
              >
                <span className="text-vsc-dim select-none w-6 text-right shrink-0">
                  {i + 1}
                </span>
                <span className="text-vsc-cyan whitespace-nowrap">
                  &quot;{String(key)}&quot;
                </span>
                <span className="text-vsc-dim">:</span>
                <span className="break-all">{hl(value)}</span>
                {i < jsonLines.length - 1 && (
                  <span className="text-vsc-dim">,</span>
                )}
              </div>
            ))}
            <div className="text-vsc-dim">{"}"}</div>
          </div>
        </motion.div>

        {/* install hint */}
        <div className="mt-3 rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-3 font-mono text-[12px]">
          <div className="text-vsc-dim"># install the portfolio locally</div>
          <div className="text-vsc-green">
            <span className="text-vsc-blue">$</span> bun install
          </div>
          <div className="text-vsc-dim mt-1"># then run it</div>
          <div className="text-vsc-green">
            <span className="text-vsc-blue">$</span> bun run dev
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-vsc-dim">
            <Download size={10} /> serves on http://localhost:3000
          </div>
        </div>
      </div>
    </div>
  );
}
