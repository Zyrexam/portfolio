"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  X,
  Bell,
  GitCommit,
  Bug,
  Rocket,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

type Notif = {
  id: string;
  icon: "git" | "bug" | "rocket" | "msg" | "check" | "shield";
  title: string;
  body: string;
  time: string;
  color: string;
};

const NOTIFS: Notif[] = [
  {
    id: "n1",
    icon: "rocket",
    title: "Payment Idempotency Proxy deployed",
    body: "20 concurrent requests → exactly 1 transaction, zero duplicates. Cache hit rate 95.9%.",
    time: "2h ago",
    color: "#4ec9b0",
  },
  {
    id: "n2",
    icon: "git",
    title: "Pushed 3 commits to main",
    body: "feat: webhook backoff capped at 32s · fix: circuit breaker half-open · perf: TTS cache TTFA <2ms",
    time: "5h ago",
    color: "#007acc",
  },
  {
    id: "n3",
    icon: "shield",
    title: "Slither scan: 0 critical issues",
    body: "Smart-Contract-Pipeline passed static analysis. LLM patcher on standby.",
    time: "1d ago",
    color: "#4ec9b0",
  },
  {
    id: "n4",
    icon: "check",
    title: "FedMeet accepted at ACM",
    body: "87.97% accuracy, outperforming FedProx, FedPer, and ClusterFL. Read the paper →",
    time: "3d ago",
    color: "#dcdcaa",
  },
  {
    id: "n5",
    icon: "msg",
    title: "New message from a recruiter",
    body: "“Loved the MohitOS portfolio — let's chat about the backend role.”",
    time: "4d ago",
    color: "#c586c0",
  },
  {
    id: "n6",
    icon: "bug",
    title: "Circuit breaker tripped on webhook-svc",
    body: "5 consecutive failures → OPEN state. Auto-recovery in 30s.",
    time: "1w ago",
    color: "#f44747",
  },
];

function NotifIcon({ icon, color }: { icon: Notif["icon"]; color: string }) {
  const cmp =
    icon === "git" ? (
      <GitCommit size={15} />
    ) : icon === "bug" ? (
      <Bug size={15} />
    ) : icon === "rocket" ? (
      <Rocket size={15} />
    ) : icon === "msg" ? (
      <MessageSquare size={15} />
    ) : icon === "shield" ? (
      <ShieldCheck size={15} />
    ) : (
      <CheckCircle2 size={15} />
    );
  return <span style={{ color }}>{cmp}</span>;
}

export function NotificationsPanel({
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
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -8, x: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-2 bottom-8 z-[75] w-[360px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-lg bg-[#252526] ring-1 ring-[#454545] shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#1e1e1e] px-3 py-2">
              <div className="flex items-center gap-2 font-mono text-[12px] text-[#cccccc]">
                <Bell size={13} className="text-vsc-accent" /> Notifications
              </div>
              <button
                onClick={onClose}
                className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
              >
                <X size={13} />
              </button>
            </div>
            {/* list */}
            <div className="vscode-scroll max-h-[50vh] overflow-y-auto">
              {NOTIFS.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex gap-2.5 border-b border-[#1e1e1e]/60 px-3 py-2.5 hover:bg-[#2a2d2e] transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1e1e1e] ring-1 ring-[#2d2d30]">
                    <NotifIcon icon={n.icon} color={n.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-medium text-white leading-snug">
                      {n.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#cccccc]/75 leading-snug line-clamp-2">
                      {n.body}
                    </div>
                    <div className="mt-1 text-[10px] font-mono text-vsc-dim">
                      {n.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* footer */}
            <div className="flex items-center justify-between border-t border-[#1e1e1e] bg-[#1e1e1e]/60 px-3 py-1.5">
              <span className="text-[10px] font-mono text-vsc-dim">
                {NOTIFS.length} notifications · all read
              </span>
              <button
                onClick={onClose}
                className="text-[10px] font-mono text-vsc-cyan hover:text-white"
              >
                mark all read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
