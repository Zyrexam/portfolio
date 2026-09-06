"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FileBadge, ExternalLink } from "lucide-react";
import { useIDEStore } from "@/store/useIDEStore";
import { getNodeAtPath } from "@/lib/filesystem";
import { profile } from "@/lib/content";
import { Breadcrumb } from "./Breadcrumb";
import { DirectoryView } from "./DirectoryView";
import { ProjectView } from "./viewers/ProjectView";
import { ExperienceView } from "./viewers/ExperienceView";
import { SkillsView } from "./viewers/SkillsView";
import { AboutView } from "./viewers/AboutView";
import { ContactView } from "./viewers/ContactView";
import { EnvView } from "./viewers/EnvView";
import { SettingsView } from "./viewers/SettingsView";
import { PackageJsonView } from "./viewers/PackageJsonView";
import { PublicationView } from "./viewers/PublicationView";
import { WritingView } from "./viewers/WritingView";
import { AskMohitPanel } from "./AskMohitPanel";
import { FileIcon } from "./FileIcon";
import { Minimap } from "./Minimap";

export function MainContent({
  onOpenResume,
}: {
  onOpenResume: () => void;
}) {
  const currentPath = useIDEStore((s) => s.currentPath);
  const selectedFile = useIDEStore((s) => s.selectedFile);
  const openTabs = useIDEStore((s) => s.openTabs);
  const activeTabPath = useIDEStore((s) => s.activeTabPath);
  const setActiveTab = useIDEStore((s) => s.setActiveTab);
  const closeTab = useIDEStore((s) => s.closeTab);
  const navigate = useIDEStore((s) => s.navigate);

  // Auto-open the resume modal whenever a Resume.pdf node becomes selected.
  useEffect(() => {
    if (!selectedFile) return;
    const node = getNodeAtPath(selectedFile);
    if (node && node.kind === "resume") {
      onOpenResume();
    }
  }, [selectedFile, onOpenResume]);

  const renderViewer = () => {
    if (!selectedFile) return null;
    const node = getNodeAtPath(selectedFile);
    if (!node) return null;
    switch (node.kind) {
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "skills":
        return <SkillsView />;
      case "experience":
        return <ExperienceView experienceId={node.experienceId!} />;
      case "project":
        return <ProjectView projectId={node.projectId!} />;
      case "resume":
        return <ResumePlaceholder onOpen={onOpenResume} />;
      case "env":
        return <EnvView />;
      case "settings":
        return <SettingsView />;
      case "package":
        return <PackageJsonView />;
      case "publication":
        return <PublicationView publicationId={node.publicationId!} />;
      case "writing":
        return <WritingView writingId={node.writingId!} />;
      case "ask":
        return <AskMohitPanel />;
      case "link":
        // external links open immediately; show a notice
        return (
          <div className="p-6 font-mono text-[13px] text-vsc-dim">
            {"// redirecting to "}
            <a
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vsc-cyan underline"
            >
              {node.href}
            </a>
          </div>
        );
      default:
        return (
          <div className="p-6 font-mono text-[13px] text-vsc-dim">
            {"// no preview available for this file type."}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#1e1e1e]">
      <Breadcrumb />

      {/* Open tabs bar */}
      {openTabs.length > 0 && (
        <div className="flex h-9 shrink-0 items-stretch border-b border-[#1e1e1e] bg-[#252526] overflow-x-auto no-scrollbar">
          {openTabs.map((tab) => {
            const active =
              activeTabPath && activeTabPath.join("/") === tab.path.join("/");
            return (
              <div
                key={tab.path.join("/")}
                onClick={() => setActiveTab(tab.path)}
                className={`group flex cursor-pointer items-center gap-2 border-r border-[#1e1e1e] px-3 text-[12px] font-mono transition-colors ${
                  active
                    ? "bg-[#1e1e1e] text-white"
                    : "text-[#cccccc]/70 hover:bg-[#2a2d2e]"
                }`}
              >
                <FileIcon icon={tab.icon} size={13} />
                <span className="truncate max-w-[140px]">{tab.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.path);
                  }}
                  className="ml-1 rounded p-0.5 opacity-0 hover:bg-[#3c3c3c] group-hover:opacity-100"
                >
                  <span className="text-[14px] leading-none">×</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Content area with minimap */}
      <div className="relative flex min-h-0 flex-1">
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key={selectedFile.join("/")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderViewer()}
              </motion.div>
            ) : (
              <motion.div
                key={"dir:" + currentPath.join("/")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <DirectoryView path={currentPath} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Minimap />
      </div>

      {/* tab breadcrumb fallback for empty selection */}
      {!selectedFile && currentPath.length === 0 && (
        <div className="hidden" aria-hidden />
      )}
    </div>
  );
}

function ResumePlaceholder({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="vscode-scroll h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#cc4444]/15">
          <FileBadge size={26} className="text-[#cc4444]" />
        </div>
        <h1 className="font-mono text-lg font-bold text-white">
          Resume.pdf
        </h1>
        <p className="mt-2 text-[13px] text-[#cccccc]/80">
          The resume viewer should have opened in a modal. If it closed, reopen it below.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={onOpen}
            className="rounded bg-[#0e639c] px-3 py-1.5 text-[12px] font-mono text-white hover:bg-[#1177bb]"
          >
            Reopen resume
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded bg-[#252526] px-3 py-1.5 text-[12px] font-mono text-[#cccccc] ring-1 ring-[#3c3c3c] hover:ring-[#007acc]"
          >
            <ExternalLink size={12} /> open on Drive
          </a>
        </div>
      </div>
    </div>
  );
}
