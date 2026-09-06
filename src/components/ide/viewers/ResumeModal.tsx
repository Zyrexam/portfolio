"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { profile } from "@/lib/content";

export function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-[#252526] ring-1 ring-[#3c3c3c] shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#3c3c3c] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-2 flex items-center gap-2 font-mono text-[12px] text-[#cccccc]">
                  <FileText size={13} className="text-[#cc4444]" />
                  Resume.pdf — {profile.name}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-[#cccccc] hover:bg-[#3c3c3c]"
                >
                  <ExternalLink size={12} /> open
                </a>
                <a
                  href={profile.resume}
                  download="Resume.pdf"
                  className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-[#cccccc] hover:bg-[#3c3c3c]"
                >
                  <Download size={12} /> save
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-[#cccccc] hover:bg-[#cc4444] hover:text-white"
                >
                  <X size={12} /> close
                </button>
              </div>
            </div>

            {/* body */}
            <div className="vscode-scroll max-h-[80vh] overflow-y-auto bg-[#1e1e1e] p-6">
              {/* Faux PDF preview */}
              <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-[#1e1e1e] shadow-lg">
                <div className="border-b-2 border-[#007acc] pb-3">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <p className="text-[#007acc] font-medium">
                    {profile.role} · {profile.credential}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#555]">
                    <span>{profile.email}</span>
                    <a href={profile.github} className="text-[#007acc] underline">
                      github.com/{profile.githubHandle}
                    </a>
                    <a href={profile.linkedin} className="text-[#007acc] underline">
                      linkedin
                    </a>
                    <a href={profile.leetcode} className="text-[#007acc] underline">
                      leetcode · {profile.leetcodeCount}
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#007acc] border-b border-[#ddd] pb-1">
                    Summary
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#007acc] border-b border-[#ddd] pb-1">
                    Experience
                  </h2>
                  <div className="mt-2 space-y-3 text-[12px]">
                    <div>
                      <div className="flex justify-between font-semibold">
                        <span>Undergraduate Researcher — Ubisys Lab, IIT Jodhpur</span>
                        <span className="text-[#555]">May–Aug 2025</span>
                      </div>
                      <ul className="mt-1 list-disc pl-5 text-[#333]">
                        <li>
                          Co-authored FedMeet (ACM ICDCN 2026): federated learning for
                          multi-sensor human activity recognition under non-IID settings.
                        </li>
                        <li>
                          87.97% test accuracy — outperforming state-of-the-art baselines
                          by 12%.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold">
                        <span>NLP→Solidity Compiler — IIT Jodhpur</span>
                        <span className="text-[#555]">Sep 2025–Jan 2026</span>
                      </div>
                      <ul className="mt-1 list-disc pl-5 text-[#333]">
                        <li>Three-phase NL→Solidity pipeline.</li>
                        <li>Slither + Mythril + Semgrep + LLM patching.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#007acc] border-b border-[#ddd] pb-1">
                    Selected Projects
                  </h2>
                  <ul className="mt-2 list-disc pl-5 text-[12px] text-[#333] space-y-1">
                    <li>Payment Idempotency Proxy — 0 duplicates / 20 concurrent reqs.</li>
                    <li>URL Shortener Service — Snowflake IDs + Redis cache-aside.</li>
                    <li>EdgeCraft CDN — C++17, 99% cache hit, 606K req/s.</li>
                    <li>TurboTTS-Proxy — 320ms→&lt;2ms cold TTFA.</li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#ddd] pt-3 text-[10px] text-[#888]">
                  <span>This is a preview — download the full PDF above.</span>
                  <span className="flex items-center gap-1 text-[#007acc]">
                    <ShieldCheck size={11} /> ATS-friendly
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
