"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-12 text-center">
        <p className="text-slate-400 font-mono text-sm">
          Designed & Built by <span className="text-cyan-400">Mohit Kumar</span>
        </p>
        <p className="flex items-center justify-center gap-1.5 text-slate-500 font-mono text-xs mt-2">
          Built with{" "}
          <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20 animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
