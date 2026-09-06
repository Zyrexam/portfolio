"use client";

import { motion } from "framer-motion";
import { Settings, RotateCcw, Save, Check } from "lucide-react";
import { useState } from "react";
import { useIDEStore } from "@/store/useIDEStore";
import { profile } from "@/lib/content";

function buildSettings(state: {
  theme: string;
  clock24: boolean;
  hiddenVisible: boolean;
  terminalExpanded: boolean;
}) {
  return {
    "mohitos.version": profile.osVersion,
    "mohitos.user": "visitor",
    "mohitos.host": profile.siteHost,
    "editor.theme": state.theme,
    "editor.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
    "editor.fontSize": 13,
    "editor.tabSize": 2,
    "editor.minimap.enabled": true,
    "editor.cursorBlink": true,
    "editor.formatOnSave": true,
    "terminal.integrated.shell": "zsh",
    "terminal.integrated.fontSize": 12,
    "terminal.integrated.scrollback": 10000,
    "terminal.integrated.expanded": state.terminalExpanded,
    "workbench.clock.24h": state.clock24,
    "workbench.clock.showSeconds": true,
    "files.exclude": { ".env": !state.hiddenVisible, ".mohitos": !state.hiddenVisible },
    "files.hiddenVisible": state.hiddenVisible,
    "git.branch": profile.gitBranch,
    "telemetry.enableTelemetry": false,
    "mohit.github": profile.githubHandle,
    "mohit.school": profile.credential,
  };
}

function highlightValue(value: unknown): React.ReactNode {
  if (typeof value === "string") {
    return <span className="text-vsc-orange">&quot;{value}&quot;</span>;
  }
  if (typeof value === "number") {
    return <span className="text-vsc-green">{value}</span>;
  }
  if (typeof value === "boolean") {
    return <span className="text-vsc-blue">{String(value)}</span>;
  }
  if (value === null) {
    return <span className="text-vsc-dim">null</span>;
  }
  if (Array.isArray(value)) {
    return <span className="text-vsc-cyan">[{value.join(", ")}]</span>;
  }
  if (typeof value === "object") {
    return <span className="text-vsc-cyan">{"{…}"}</span>;
  }
  return <span>{String(value)}</span>;
}

export function SettingsView() {
  const theme = useIDEStore((s) => s.theme);
  const clock24 = useIDEStore((s) => s.clock24);
  const hiddenVisible = useIDEStore((s) => s.hiddenVisible);
  const terminalExpanded = useIDEStore((s) => s.terminalExpanded);
  const setTheme = useIDEStore((s) => s.setTheme);
  const toggleClock = useIDEStore((s) => s.toggleClock);
  const setHiddenVisible = useIDEStore((s) => s.setHiddenVisible);
  const setTerminalExpanded = useIDEStore((s) => s.setTerminalExpanded);
  const [copied, setCopied] = useState(false);

  const settings = buildSettings({ theme, clock24, hiddenVisible, terminalExpanded });
  const entries = Object.entries(settings);

  const copyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(settings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#2d2d30] px-6 py-5">
        <div className="font-mono text-[11px] text-vsc-dim mb-2 flex items-center gap-1">
          <Settings size={11} /> .mohitos/settings.json — MohitOS user settings
        </div>
        <h1 className="font-sans text-2xl font-bold text-white">
          Settings
          <span className="text-vsc-yellow font-mono">.json</span>
        </h1>
        <p className="mt-1 text-[13px] text-[#cccccc]/80">
          Live IDE configuration. Toggles below update the actual MohitOS state —
          and persist across reloads.
        </p>
      </div>

      {/* Interactive toggles */}
      <div className="px-6 py-5 border-b border-[#2d2d30]">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-vsc-accent">[UI]</span>
          <span className="text-[13px] font-semibold text-white">Quick Toggles</span>
          <div className="h-px flex-1 bg-[#2d2d30]" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle
            label="editor.theme"
            value={theme}
            options={["dark", "high-contrast"]}
            onChange={(v) => setTheme(v as typeof theme)}
          />
          <Toggle
            label="workbench.clock.24h"
            value={String(clock24)}
            options={["true", "false"]}
            onChange={(v) => { if ((v === "true") !== clock24) toggleClock(); }}
            boolean
          />
          <Toggle
            label="files.hiddenVisible"
            value={String(hiddenVisible)}
            options={["true", "false"]}
            onChange={(v) => { if ((v === "true") !== hiddenVisible) setHiddenVisible(!hiddenVisible); }}
            boolean
          />
          <Toggle
            label="terminal.integrated.expanded"
            value={String(terminalExpanded)}
            options={["true", "false"]}
            onChange={(v) => { if ((v === "true") !== terminalExpanded) setTerminalExpanded(!terminalExpanded); }}
            boolean
          />
        </div>
      </div>

      {/* JSON viewer */}
      <div className="px-6 py-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-vsc-accent">[RAW]</span>
          <span className="text-[13px] font-semibold text-white">settings.json</span>
          <div className="h-px flex-1 bg-[#2d2d30]" />
          <button
            onClick={copyJson}
            className="flex items-center gap-1 rounded bg-[#252526] px-2 py-1 text-[10px] font-mono text-[#cccccc] ring-1 ring-[#3c3c3c] hover:ring-[#007acc]"
            title="Copy JSON"
          >
            {copied ? <Check size={11} className="text-vsc-green" /> : <Save size={11} />}
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] overflow-hidden"
        >
          <div className="border-b border-[#2d2d30] px-3 py-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-vsc-dim">~/ .mohitos / settings.json</span>
            <span className="font-mono text-[10px] text-vsc-dim">JSON · {entries.length} keys</span>
          </div>
          <div className="vscode-scroll overflow-x-auto p-3 font-mono text-[12px] leading-relaxed">
            <div className="text-vsc-dim">{"{"}</div>
            {entries.map(([key, value], i) => (
              <div key={key} className="flex items-center gap-2 hover:bg-[#2a2d2e]/40 px-1">
                <span className="text-vsc-dim select-none w-6 text-right">{i + 1}</span>
                <span className="text-vsc-cyan">
                  &quot;{key}&quot;
                </span>
                <span className="text-vsc-dim">:</span>
                <span className="break-all">{highlightValue(value)}</span>
                {i < entries.length - 1 && <span className="text-vsc-dim">,</span>}
              </div>
            ))}
            <div className="text-vsc-dim">{"}"}</div>
          </div>
        </motion.div>

        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-vsc-dim">
          <RotateCcw size={11} /> tip: run <span className="text-vsc-green">theme high-contrast</span> in
          the terminal, or click any toggle above — this file updates live.
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  options,
  onChange,
  boolean,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  boolean?: boolean;
}) {
  return (
    <div className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3">
      <div className="font-mono text-[11px] text-vsc-cyan mb-2 truncate">{label}</div>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                active
                  ? boolean
                    ? opt === "true"
                      ? "bg-[#0e639c] text-white"
                      : "bg-[#5a2d2d] text-white"
                    : "bg-[#0e639c] text-white"
                  : "bg-[#1e1e1e] text-[#cccccc]/70 ring-1 ring-[#3c3c3c] hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
