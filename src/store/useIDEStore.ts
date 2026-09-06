"use client";

import { create } from "zustand";

export type TerminalLine = {
  id: string;
  type: "input" | "output" | "system" | "error" | "ascii" | "link";
  text: string;
  href?: string;
};

interface IDEState {
  booted: boolean;
  showMatrix: boolean;
  currentPath: string[]; // path segments below /home/mohit/
  selectedFile: string[] | null; // null = directory view
  expandedDirs: Record<string, boolean>;
  hiddenVisible: boolean;
  sidebarView: "explorer" | "scm";
  sidebarOpen: boolean;
  terminalExpanded: boolean;
  lines: TerminalLine[];
  history: string[];
  historyIdx: number;
  clock24: boolean;
  theme: "dark" | "high-contrast";
  openTabs: { path: string[]; label: string; icon: string }[];
  activeTabPath: string[] | null;

  setBooted: (v: boolean) => void;
  setShowMatrix: (v: boolean) => void;
  navigate: (path: string[]) => void;
  openNode: (path: string[]) => void;
  toggleDir: (path: string[]) => void;
  setDirExpanded: (path: string[], v: boolean) => void;
  setHiddenVisible: (v: boolean) => void;
  setSidebarView: (v: "explorer" | "scm") => void;
  setSidebarOpen: (v: boolean) => void;
  setTerminalExpanded: (v: boolean) => void;
  pushLine: (line: Omit<TerminalLine, "id">) => void;
  clearLines: () => void;
  pushHistory: (cmd: string) => void;
  setHistoryIdx: (i: number) => void;
  toggleClock: () => void;
  setTheme: (t: "dark" | "high-contrast") => void;
  openTab: (path: string[], label: string, icon: string) => void;
  closeTab: (path: string[]) => void;
  setActiveTab: (path: string[] | null) => void;
}

let lineId = 0;
const nextId = () => `l${lineId++}`;

const welcomeLines: TerminalLine[] = [
  {
    id: nextId(),
    type: "system",
    text: `MohitOS v2.0 — logged in as visitor. Type 'help' to list commands.`,
  },
];

export const useIDEStore = create<IDEState>((set, get) => ({
  booted: false,
  showMatrix: false,
  currentPath: [],
  selectedFile: null,
  expandedDirs: { "": true, "projects": false },
  hiddenVisible: false,
  sidebarView: "explorer",
  sidebarOpen: false,
  terminalExpanded: false,
  lines: welcomeLines,
  history: [],
  historyIdx: -1,
  clock24: true,
  theme: "dark",
  openTabs: [],
  activeTabPath: null,

  setBooted: (v) => set({ booted: v }),
  setShowMatrix: (v) => set({ showMatrix: v }),
  setTheme: (t) => {
    set({ theme: t });
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("mohitos:theme", t);
      } catch {
        /* ignore */
      }
    }
  },

  navigate: (path) => {
    set({ currentPath: path, selectedFile: null, sidebarOpen: false });
    persistNav(null, path, get().expandedDirs);
  },

  openNode: (path) => {
    set({ selectedFile: path, sidebarOpen: false });
    persistNav(path, get().currentPath, get().expandedDirs);
  },

  toggleDir: (path) => {
    const key = path.join("/");
    const next = { ...get().expandedDirs, [key]: !get().expandedDirs[key] };
    set((s) => ({ expandedDirs: { ...s.expandedDirs, [key]: !s.expandedDirs[key] } }));
    persistNav(get().selectedFile, get().currentPath, next);
  },

  setDirExpanded: (path, v) => {
    const key = path.join("/");
    const next = { ...get().expandedDirs, [key]: v };
    set((s) => ({ expandedDirs: { ...s.expandedDirs, [key]: v } }));
    persistNav(get().selectedFile, get().currentPath, next);
  },

  setHiddenVisible: (v) => set({ hiddenVisible: v }),
  setSidebarView: (v) => set({ sidebarView: v }),
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  setTerminalExpanded: (v) => set({ terminalExpanded: v }),

  pushLine: (line) =>
    set((s) => ({ lines: [...s.lines, { ...line, id: nextId() }] })),
  clearLines: () => set({ lines: [] }),

  pushHistory: (cmd) =>
    set((s) => ({ history: [...s.history, cmd], historyIdx: -1 })),
  setHistoryIdx: (i) => set({ historyIdx: i }),

  toggleClock: () => set((s) => ({ clock24: !s.clock24 })),

  openTab: (path, label, icon) =>
    set((s) => {
      const exists = s.openTabs.some((t) => t.path.join("/") === path.join("/"));
      const openTabs = exists
        ? s.openTabs
        : [...s.openTabs, { path, label, icon }];
      return { openTabs, activeTabPath: path, selectedFile: path };
    }),

  closeTab: (path) =>
    set((s) => {
      const openTabs = s.openTabs.filter((t) => t.path.join("/") !== path.join("/"));
      let activeTabPath = s.activeTabPath;
      if (activeTabPath && activeTabPath.join("/") === path.join("/")) {
        activeTabPath = openTabs.length ? openTabs[openTabs.length - 1].path : null;
      }
      return { openTabs, activeTabPath, selectedFile: activeTabPath };
    }),

  setActiveTab: (path) => {
    set({ selectedFile: path, activeTabPath: path });
    persistNav(path, get().currentPath, get().expandedDirs);
  },
}));

const NAV_KEY = "mohitos:nav:v1";

function persistNav(selectedFile: string[] | null, currentPath: string[], expandedDirs: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      NAV_KEY,
      JSON.stringify({ selectedFile, currentPath, expandedDirs }),
    );
  } catch {
    /* ignore */
  }
}

export function loadPersistedNav(): {
  selectedFile: string[] | null;
  currentPath: string[];
  expandedDirs: Record<string, boolean>;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(NAV_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      Array.isArray(parsed.currentPath) &&
      (parsed.selectedFile === null || Array.isArray(parsed.selectedFile)) &&
      typeof parsed.expandedDirs === "object"
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function loadPersistedTheme(): "dark" | "high-contrast" {
  if (typeof window === "undefined") return "dark";
  try {
    const raw = window.localStorage.getItem("mohitos:theme");
    if (raw === "high-contrast" || raw === "dark") {
      return raw;
    }
  } catch {
    /* ignore */
  }
  return "dark";
}
