"use client";

import { Settings, X, Menu, Minus, Square } from "lucide-react";
import { profile } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

export function TitleBar() {
  const setSidebarOpen = useIDEStore((s) => s.setSidebarOpen);
  const sidebarOpen = useIDEStore((s) => s.sidebarOpen);

  return (
    <header className="flex h-9 shrink-0 items-center justify-between border-b border-[#1e1e1e] bg-[#3c3c3c] px-3 text-xs select-none">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-1 rounded hover:bg-[#505050] text-[#cccccc]"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu size={14} />
        </button>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-3 font-mono text-[#cccccc]/90 hidden sm:inline">
          {profile.osName.toLowerCase()}.dev
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[#cccccc]/70 text-xs truncate max-w-[50vw] hidden md:block">
        /home/mohit — {profile.name} · {profile.role} · {profile.school} ’{profile.gradYear.slice(-2)}
      </div>

      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded hover:bg-[#505050] text-[#cccccc]/80"
          aria-label="Settings"
        >
          <Settings size={13} />
        </button>
        <div className="mx-1 h-4 w-px bg-[#505050]" />
        <button
          className="p-1.5 rounded hover:bg-[#505050] text-[#cccccc]/80"
          aria-label="Minimize"
        >
          <Minus size={13} />
        </button>
        <button
          className="p-1.5 rounded hover:bg-[#505050] text-[#cccccc]/80"
          aria-label="Maximize"
        >
          <Square size={11} />
        </button>
        <button
          className="p-1.5 rounded hover:bg-[#f14c4c] text-[#cccccc]/80 hover:text-white"
          aria-label="Close"
        >
          <X size={13} />
        </button>
      </div>
    </header>
  );
}
