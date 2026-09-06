"use client";

import { motion } from "framer-motion";
import { Lock, ShieldAlert, Eye } from "lucide-react";

export function EnvView() {
  return (
    <div className="vscode-scroll h-full overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto"
      >
        <div className="rounded-lg bg-[#252526] ring-1 ring-[#cc4444]/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#cc4444]/15">
            <Lock size={26} className="text-[#cc4444]" />
          </div>
          <h1 className="font-mono text-lg font-bold text-white">
            .env — access denied
          </h1>
          <p className="mt-2 text-[14px] text-[#cccccc]">
            Nice try, but secrets stay secret 
          </p>
          <p className="mt-1 text-[12px] text-vsc-dim font-mono">
            {"// you didn't think I'd actually leak my API keys, did you?"}
          </p>
        </div>

        <div className="mt-4 rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4 font-mono text-[12px] text-left">
          <div className="text-vsc-comment"># mohit@dev: ~ $ cat .env</div>
          <div className="text-vsc-dim">cat: .env: Permission denied</div>
          <div className="text-vsc-orange mt-1">JWT_SECRET=********************************</div>
          <div className="text-vsc-orange">OPENAI_KEY=sk-*******************</div>
          <div className="text-vsc-orange">DB_PASSWORD=********</div>
          <div className="text-vsc-orange">AWS_SECRET=************************</div>
          <div className="mt-2 text-vsc-dim">
            # Tip: never commit .env. I use a vault + gpg for real secrets.
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-vsc-dim font-mono">
          <ShieldAlert size={12} /> security best practice · rotate keys often
          <Eye size={12} />
        </div>
      </motion.div>
    </div>
  );
}
