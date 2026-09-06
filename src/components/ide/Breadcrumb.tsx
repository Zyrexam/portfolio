"use client";

import { ChevronRight, Home } from "lucide-react";
import { useIDEStore } from "@/store/useIDEStore";

export function Breadcrumb() {
  const currentPath = useIDEStore((s) => s.currentPath);
  const selectedFile = useIDEStore((s) => s.selectedFile);
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);

  const displayPath = selectedFile ?? currentPath;
  const isFile = !!selectedFile;

  const labels: Record<string, string> = {
    projects: "projects",
    lab: "lab",
    about: "about",
    contact: "contact",
    links: "links",
  };

  const handleClick = (idx: number) => {
    if (isFile) {
      if (idx < displayPath.length - 1) {
        const dirPath = displayPath.slice(0, idx + 1);
        navigate(dirPath);
      }
    } else {
      navigate(displayPath.slice(0, idx + 1));
    }
  };

  return (
    <div className="flex h-9 shrink-0 items-center gap-1 border-b border-[#1e1e1e] bg-[#1e1e1e] px-3 font-mono text-[12px] text-[#cccccc]/80 overflow-x-auto no-scrollbar">
      <button
        onClick={() => navigate([])}
        className="flex items-center gap-1 hover:text-white"
        title="/home/mohit"
      >
        <Home size={13} className="text-[#dcb67a]" />
        <span className="text-[#cccccc]/60">~</span>
      </button>
      {displayPath.map((seg, idx) => {
        const isLast = idx === displayPath.length - 1;
        const isDirSeg = !isFile || !isLast;
        return (
          <div key={idx} className="flex items-center gap-1 shrink-0">
            <ChevronRight size={12} className="text-[#cccccc]/40" />
            <button
              onClick={() => isDirSeg && handleClick(idx)}
              className={`hover:text-white transition-colors ${
                isLast ? "text-vsc-accent font-semibold" : ""
              }`}
            >
              {labels[seg] ?? seg}
            </button>
          </div>
        );
      })}
    </div>
  );
}
