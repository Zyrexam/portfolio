"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIDEStore, loadPersistedNav, loadPersistedTheme } from "@/store/useIDEStore";
import { getNodeAtPath } from "@/lib/filesystem";
import { BootSequence } from "./BootSequence";
import { TitleBar } from "./TitleBar";
import { StatusBar } from "./StatusBar";
import { Sidebar } from "./Sidebar";
import { ActivityBar } from "./ActivityBar";
import { MainContent } from "./MainContent";
import { Terminal } from "./Terminal";
import { MatrixRain } from "./MatrixRain";
import { CommandPalette } from "./CommandPalette";
import { NotificationsPanel } from "./NotificationsPanel";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { ProblemsPanel } from "./ProblemsPanel";
import { FindInFiles } from "./FindInFiles";
import { ResumeModal } from "./viewers/ResumeModal";
import { X } from "lucide-react";

export function IDEShell() {
  const booted = useIDEStore((s) => s.booted);
  const showMatrix = useIDEStore((s) => s.showMatrix);
  const setShowMatrix = useIDEStore((s) => s.setShowMatrix);
  const sidebarOpen = useIDEStore((s) => s.sidebarOpen);
  const setSidebarOpen = useIDEStore((s) => s.setSidebarOpen);
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const setDirExpanded = useIDEStore((s) => s.setDirExpanded);
  const closeTab = useIDEStore((s) => s.closeTab);
  const theme = useIDEStore((s) => s.theme);
  const setTheme = useIDEStore((s) => s.setTheme);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  

  // Global hotkey: Ctrl+Shift+F toggles Find-in-Files.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "f" || e.key === "F")) {
        e.preventDefault();
        setFindOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Global hotkey: '?' toggles the keyboard shortcuts cheat-sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setShortcutsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Restore persisted theme on mount (immediately, before boot completes).
  useEffect(() => {
    const t = loadPersistedTheme();
    if (t !== "dark") setTheme(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Restore persisted navigation state once on mount (after boot completes).
  useEffect(() => {
    if (!booted) return;
    const restored = loadPersistedNav();
    if (!restored) return;
    if (restored.selectedFile) {
      for (let i = 1; i <= restored.selectedFile.length; i++) {
        setDirExpanded(restored.selectedFile.slice(0, i), true);
      }
      openNode(restored.selectedFile);
      const node = getNodeAtPath(restored.selectedFile);
      if (node) {
        openTab(restored.selectedFile, node.label ?? node.name, node.icon);
      }
    } else {
      for (let i = 1; i <= restored.currentPath.length; i++) {
        setDirExpanded(restored.currentPath.slice(0, i), true);
      }
      navigate(restored.currentPath);
    }
    Object.entries(restored.expandedDirs).forEach(([key, v]) => {
      if (v && key) setDirExpanded(key.split("/").filter(Boolean), true);
    });
  }, [booted]);

  useEffect(() => {
    if (!showMatrix) return;
    const dismiss = () => setShowMatrix(false);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("click", dismiss);
    const t = setTimeout(() => setShowMatrix(false), 3500);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("click", dismiss);
      clearTimeout(t);
    };
  }, [showMatrix, setShowMatrix]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#1e1e1e]">
      <BootSequence />

      <TitleBar />

      {/* Middle row: activity bar | sidebar | main content */}
      <div className="relative flex min-h-0 flex-1">
        {/* Desktop activity bar (icon column) */}
        <div className="hidden md:block shrink-0">
          <ActivityBar
            onOpenShortcuts={() => setShortcutsOpen(true)}
            onOpenProblems={() => setProblemsOpen(true)}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-[240px] shrink-0 border-r border-[#1e1e1e]">
          <Sidebar />
        </div>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                className="fixed left-0 top-9 bottom-6 z-50 w-[280px] border-r border-[#1e1e1e] md:hidden"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
              >
                <div className="relative h-full">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute right-2 top-2 z-10 rounded p-1 text-[#cccccc]/70 hover:bg-[#3c3c3c] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                  <Sidebar />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content area (with terminal below) */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <MainContent onOpenResume={() => setResumeOpen(true)} />
          <Terminal onOpenResume={() => setResumeOpen(true)} />
        </div>
      </div>

      <StatusBar
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenNotifs={() => setNotifOpen(true)}
      />

      {/* Overlays */}
      <ResumeModal
        open={resumeOpen}
        onClose={() => {
          setResumeOpen(false);
          // If the resume file is currently selected, clear it so the user
          // returns to the main dashboard instead of the resume placeholder.
          const sel = useIDEStore.getState().selectedFile;
          if (sel && sel.length > 0) {
            const last = sel[sel.length - 1];
            if (last === "Resume.pdf" || last === "resume.pdf") {
              closeTab(sel);
              navigate([]);
            }
          }
        }}
      />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onOpenResume={() => setResumeOpen(true)}
      />
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <KeyboardShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
      <ProblemsPanel
        open={problemsOpen}
        onClose={() => setProblemsOpen(false)}
        onOpenFile={(pathStr) => {
          setProblemsOpen(false);
          const segs = pathStr.split("/").filter(Boolean);
          if (segs.length === 0) return;
          for (let i = 1; i < segs.length; i++) {
            setDirExpanded(segs.slice(0, i), true);
          }
          openNode(segs);
          const node = getNodeAtPath(segs);
          if (node) {
            openTab(segs, node.label ?? node.name, node.icon);
          }
        }}
      />
      <FindInFiles
        open={findOpen}
        onClose={() => setFindOpen(false)}
        onOpenResult={(path) => {
          setFindOpen(false);
          for (let i = 1; i < path.length; i++) {
            setDirExpanded(path.slice(0, i), true);
          }
          openNode(path);
          const node = getNodeAtPath(path);
          if (node) {
            openTab(path, node.label ?? node.name, node.icon);
          }
        }}
      />

      <AnimatePresence>
        {showMatrix && <MatrixRain onDone={() => setShowMatrix(false)} />}
      </AnimatePresence>
    </div>
  );
}
