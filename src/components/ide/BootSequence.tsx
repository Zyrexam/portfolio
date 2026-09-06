"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIDEStore } from "@/store/useIDEStore";
import { profile } from "@/lib/content";

const STEPS = [
  "Loading kernel... OK",
  "Mounting projects... OK",
  "Starting services... OK",
  "Welcome, visitor!",
];

export function BootSequence() {
  const setBooted = useIDEStore((s) => s.setBooted);
  const [done, setDone] = useState(false);
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShown((prev) => [...prev, STEPS[i]]);
      i += 1;
      if (i >= STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 350);
        setTimeout(() => setBooted(true), 750);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [setBooted]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1e1e1e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-xl px-8 font-mono">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-sm text-vsc-dim">{profile.osName} bootloader</span>
            </motion.div>

            <div className="text-[#4ec9b0] text-lg font-bold mb-4">
              {profile.osName} {profile.osVersion}
            </div>

            <div className="space-y-1.5 text-sm">
              {shown.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-vsc-dim">›</span>
                  <span className="text-[#cccccc]">{line.split("...")[0]}</span>
                  {line.includes("...") && (
                    <span className="text-vsc-green">
                      ...{line.split("...")[1]}
                    </span>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-3 text-[#dcdcaa]"
              >
                Welcome, visitor!
              </motion.div>
            </div>

            <div className="mt-6 h-1 w-full overflow-hidden rounded bg-[#3c3c3c]">
              <div className="boot-bar h-full bg-gradient-to-r from-[#007acc] to-[#4ec9b0]" />
            </div>
            <div className="mt-2 text-xs text-vsc-dim">
              mounting /home/mohit ...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
