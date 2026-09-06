"use client";

import { useEffect, useState } from "react";
import {
  GitBranch,
  Check,
  Terminal as TerminalIcon,
  ChevronUp,
  ChevronDown,
  Palette,
  Bell,
  Clock,
} from "lucide-react";
import { profile } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

const THEMES = ["dark", "high-contrast"] as const;
type ThemeName = (typeof THEMES)[number];
const THEME_LABEL: Record<ThemeName, string> = {
  dark: "Dark+",
  "high-contrast": "High Contrast",
};

export function StatusBar({
  onOpenPalette,
  onOpenNotifs,
}: {
  onOpenPalette: () => void;
  onOpenNotifs: () => void;
}) {
  const toggleClock = useIDEStore((s) => s.toggleClock);
  const clock24 = useIDEStore((s) => s.clock24);
  const setTerminalExpanded = useIDEStore((s) => s.setTerminalExpanded);
  const terminalExpanded = useIDEStore((s) => s.terminalExpanded);
  const theme = useIDEStore((s) => s.theme);
  const setTheme = useIDEStore((s) => s.setTheme);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !clock24,
  });

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme as ThemeName);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-[#007acc] px-2 text-[11px] text-white font-mono select-none">
      {/* Left: terminal toggle + system status + branch */}
      <div className="flex items-center gap-2 overflow-hidden">
        <button
          onClick={() => setTerminalExpanded(!terminalExpanded)}
          className="flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors shrink-0"
          title="Toggle terminal"
        >
          {terminalExpanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          <TerminalIcon size={11} />
        </button>
        <span className="flex items-center gap-1 shrink-0">
          <Check size={11} /> System: ONLINE
        </span>
        <span className="hidden sm:flex items-center gap-1 shrink-0">
          <GitBranch size={11} /> {profile.gitBranch}
        </span>
      </div>

      {/* Right: notifications + theme + time */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenNotifs}
          className="relative flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors shrink-0"
          title="Notifications"
        >
          <Bell size={11} />
          <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#ff5f56] animate-notif-pulse" />
        </button>
        <button
          onClick={cycleTheme}
          className="hidden md:flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors shrink-0"
          title={`Theme: ${THEME_LABEL[theme as ThemeName]} (click to cycle, or run 'theme <name>' in terminal)`}
        >
          <Palette size={11} /> {THEME_LABEL[theme as ThemeName]}
        </button>
        <button
          onClick={toggleClock}
          className="flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
          title="Click to toggle time format"
        >
          <Clock size={11} className="opacity-80" />
          {time}
        </button>
      </div>
    </footer>
  );
}
