"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import { experiences } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

export function ExperienceView({ experienceId }: { experienceId: string }) {
  const exp = experiences.find((e) => e.id === experienceId);
  const navigate = useIDEStore((s) => s.navigate);

  if (!exp) return null;

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      <div className="border-b border-[#2d2d30] px-6 py-5">
        <button
          onClick={() => navigate(["experience"])}
          className="mb-3 inline-flex items-center gap-1 text-[11px] font-mono text-vsc-dim hover:text-white"
        >
          <ArrowLeft size={12} /> cd ../experience
        </button>
        <div className="font-mono text-[11px] text-vsc-purple mb-2">
          {"// research position"}
        </div>
        <h1 className="font-sans text-2xl font-bold text-white">
          {exp.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-[#cccccc]/80">
          <span className="inline-flex items-center gap-1">
            <Briefcase size={12} className="text-vsc-accent" /> {exp.org}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} className="text-vsc-green" /> {exp.period}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} className="text-vsc-orange" /> {exp.location}
          </span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        <section>
          <p className="text-[13px] leading-relaxed text-[#cccccc]/90">
            {exp.summary}
          </p>
        </section>

        <section>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-purple">[01]</span>
            <span className="text-[13px] font-semibold text-white">Highlights</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-[13px] text-[#cccccc]/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vsc-purple" />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-purple">[02]</span>
            <span className="text-[13px] font-semibold text-white">
              Technologies
            </span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#9cdcfe] ring-1 ring-[#2d2d30]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
