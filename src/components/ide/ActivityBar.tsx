"use client";

import {
  Files,
  Search,
  GitBranch,
  Bug,
  AlertCircle,
  Package,
  Settings,
  Keyboard,
  type LucideIcon,
} from "lucide-react";
import { useIDEStore } from "@/store/useIDEStore";
import { profile } from "@/lib/content";

type ActivityItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  action: () => void;
};

export function ActivityBar({
  onOpenShortcuts,
  onOpenProblems,
}: {
  onOpenShortcuts: () => void;
  onOpenProblems: () => void;
}) {
  const navigate = useIDEStore((s) => s.navigate);
  const setSidebarOpen = useIDEStore((s) => s.setSidebarOpen);
  const sidebarView = useIDEStore((s) => s.sidebarView);
  const setSidebarView = useIDEStore((s) => s.setSidebarView);
  const selectedFile = useIDEStore((s) => s.selectedFile);
  const currentPath = useIDEStore((s) => s.currentPath);

  // Number of faux changed files (matches SourceControlPanel's INITIAL_CHANGES count).
  const SCM_CHANGE_COUNT = 8;

  const items: ActivityItem[] = [
    {
      id: "explorer",
      icon: Files,
      label: "Explorer",
      action: () => {
        setSidebarView("explorer");
        setSidebarOpen(true);
      },
    },
    {
      id: "search",
      icon: Search,
      label: "Ask Mohit — AI Q&A about Mohit",
      action: () => {
        // Open Ask Mohit as a full-page view in the main content area
        // (like opening a file — it gets a tab, the sidebar stays on Explorer).
        setSidebarView("explorer");
        const { openNode, openTab } = useIDEStore.getState();
        const askPath = ["ask-mohit"];
        openNode(askPath);
        openTab(askPath, "Ask Mohit", "skills");
      },
    },
    {
      id: "git",
      icon: GitBranch,
      label: "Source Control",
      badge: SCM_CHANGE_COUNT,
      action: () => {
        // Switch the sidebar to the Source Control panel.
        // Like VS Code: does NOT navigate away from the current editor view.
        setSidebarView("scm");
        setSidebarOpen(true);
      },
    },
    {
      id: "debug",
      icon: Bug,
      label: "Run & Debug (command palette)",
      action: () => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "p",
            ctrlKey: true,
            shiftKey: true,
            bubbles: true,
          }),
        );
      },
    },
    {
      id: "problems",
      icon: AlertCircle,
      label: "Problems — faux lint diagnostics",
      badge: 7,
      action: onOpenProblems,
    },
    {
      id: "package",
      icon: Package,
      label: "package.json",
      action: () => {
        navigate([]);
        const { openNode, openTab, setDirExpanded } = useIDEStore.getState();
        setDirExpanded([".mohitos"], true);
        const path = [".mohitos", "package.json"];
        openNode(path);
        openTab(path, "package.json", "package");
      },
    },
  ];

  return (
    <div className="flex h-full w-12 shrink-0 flex-col items-center justify-between border-r border-[#1e1e1e] bg-[#333333] py-2 select-none">
      <div className="flex flex-col items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          // Active indicator: explorer/git reflect the sidebar view;
          // search is active when the Ask Mohit full-page view is selected.
          const active =
            (item.id === "explorer" && sidebarView === "explorer") ||
            (item.id === "git" && sidebarView === "scm") ||
            (item.id === "search" &&
              selectedFile &&
              selectedFile[0] === "ask-mohit");
          return (
            <button
              key={item.id}
              onClick={item.action}
              title={item.label}
              aria-label={item.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded transition-colors ${
                active
                  ? "text-white"
                  : "text-[#858585] hover:text-[#cccccc]"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 -translate-y-1/2 w-[2px] rounded-r bg-white" />
              )}
              <Icon size={22} strokeWidth={1.4} />
              {item.badge && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#007acc] px-1 text-[9px] font-mono text-white">
                  {item.badge}
                </span>
              )}
              {/* tooltip */}
              <span className="pointer-events-none absolute left-12 z-50 whitespace-nowrap rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#cccccc] ring-1 ring-[#454545] opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1">
        <button
          onClick={onOpenShortcuts}
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard Shortcuts"
          className="group relative flex h-10 w-10 items-center justify-center rounded text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <Keyboard size={22} strokeWidth={1.4} />
          <span className="pointer-events-none absolute left-12 z-50 whitespace-nowrap rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#cccccc] ring-1 ring-[#454545] opacity-0 transition-opacity group-hover:opacity-100">
            Shortcuts (?)
          </span>
        </button>
        <button
          title="Settings (open settings.json)"
          aria-label="Settings"
          onClick={() => {
            const { openNode, openTab, setDirExpanded } = useIDEStore.getState();
            setDirExpanded([".mohitos"], true);
            const path = [".mohitos", "settings.json"];
            openNode(path);
            openTab(path, "settings.json", "settings");
          }}
          className="group relative flex h-10 w-10 items-center justify-center rounded text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <Settings size={22} strokeWidth={1.4} />
          <span className="pointer-events-none absolute left-12 z-50 whitespace-nowrap rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#cccccc] ring-1 ring-[#454545] opacity-0 transition-opacity group-hover:opacity-100">
            Settings
          </span>
        </button>
        <div
          className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#007acc] text-[10px] font-bold text-white"
          title={profile.name}
        >
          MK
        </div>
      </div>
    </div>
  );
}
