"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  FileText,
  BookOpen,
  ArrowLeft,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  Activity,
  Copy,
  Check,
} from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

export function ProjectView({ projectId }: { projectId: string }) {
  const project = projects.find((p) => p.id === projectId);
  const navigate = useIDEStore((s) => s.navigate);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="p-6 text-vsc-dim font-mono">
        {"// project not found: "}{projectId}
      </div>
    );
  }

  const iconColor = project.accent;

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Hero image banner */}
      {project.hero && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative h-40 sm:h-48 md:h-56 overflow-hidden border-b border-[#2d2d30]"
        >
          <img
            src={project.hero}
            alt={`${project.name} — abstract hero visualization`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 0%, transparent 40%, rgba(30,30,30,0.85) 80%, #1e1e1e 100%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${iconColor}22, transparent 60%)`,
            }}
          />
          <div className="absolute bottom-2 left-4 font-mono text-[10px] text-vsc-dim bg-[#1e1e1e]/70 px-2 py-0.5 rounded backdrop-blur-sm">
            {"// abstract: "}{project.name}
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-[#2d2d30] px-6 py-5"
        style={{
          background: `linear-gradient(180deg, ${iconColor}11 0%, transparent 100%)`,
        }}
      >
        <button
          onClick={() => navigate(["projects", project.category])}
          className="mb-3 inline-flex items-center gap-1 text-[11px] font-mono text-vsc-dim hover:text-white"
        >
          <ArrowLeft size={12} /> cd ../{project.category}
        </button>
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ring-1"
            style={{
              backgroundColor: `${iconColor}1a`,
              borderColor: `${iconColor}40`,
            }}
          >
            <ProjectIcon icon={project.icon} color={iconColor} />
          </div>
          <div className="min-w-0">
            <h1 className="font-mono text-xl font-bold text-white truncate">
              {project.name}/
            </h1>
            <p className="mt-1 text-[13px] text-[#cccccc]">{project.tagline}</p>
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <div className="px-6 py-5 grid gap-5 lg:grid-cols-3">
        {/* Main col */}
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <section>
            <SectionTitle code="01" title="Overview" color={iconColor} />
            <p className="text-[13px] leading-relaxed text-[#cccccc]/90">
              {project.description}
            </p>
          </section>

          {/* Engineer's notes */}
          {project.notes && project.notes.length > 0 && (
            <section>
              <SectionTitle code="02" title="Engineer's notes" color={iconColor} />
              <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] text-vsc-dim">
                  <Terminal size={12} /> NOTES.md
                  <span className="text-[10px] opacity-70">— the parts the README won't tell you</span>
                </div>
                <div className="space-y-1.5">
                  {project.notes.map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="font-mono text-[12px] leading-relaxed text-vsc-green/80 italic"
                    >
                      {n}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Features */}
          <section>
            <SectionTitle code="03" title="Features" color={iconColor} />
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-[13px] text-[#cccccc]/90"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: iconColor }}
                  />
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Architecture */}
          {project.architecture && (
            <section>
              <SectionTitle code="04" title="Architecture" color={iconColor} />
              <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-4">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-mono text-vsc-dim">
                  <Terminal size={12} /> architecture.md
                </div>
                <p className="text-[13px] leading-relaxed text-[#cccccc]/90 font-mono">
                  {project.architecture}
                </p>
                {project.diagram && (
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mt-4 overflow-x-auto rounded bg-[#0d0d0d] ring-1 ring-[#2d2d30] p-3 font-mono text-[10px] leading-[1.3] text-vsc-green vscode-scroll"
                    style={{ textShadow: "0 0 6px rgba(78,201,176,0.25)" }}
                  >
                    {project.diagram}
                  </motion.pre>
                )}
              </div>
            </section>
          )}

          {/* Tech stack */}
          <section>
            <SectionTitle code="05" title="Tech Stack" color={iconColor} />
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-[#9cdcfe] ring-1 ring-[#2d2d30] hover:ring-[#007acc] transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Side col */}
        <div className="space-y-5">
          {/* Metrics */}
          <section>
            <SectionTitle code="06" title="Metrics" color={iconColor} />
            <div className="space-y-2">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3"
                >
                  <div
                    className="font-mono text-xl font-bold"
                    style={{ color: iconColor }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[#cccccc]/70 mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          <section>
            <SectionTitle code="07" title="Links" color={iconColor} />
            <div className="space-y-2">
              {project.github && (
                <ProjectLink
                  href={project.github}
                  icon={<Github size={14} />}
                  label="GitHub"
                  sub={project.github.replace("https://github.com/", "")}
                  accent={iconColor}
                />
              )}
              {project.live && (
                <ProjectLink
                  href={project.live}
                  icon={<ExternalLink size={14} />}
                  label="Live Demo"
                  sub={new URL(project.live).hostname}
                  accent={iconColor}
                />
              )}
              {project.paper && (
                <ProjectLink
                  href={project.paper}
                  icon={<BookOpen size={14} />}
                  label="ACM Paper"
                  sub="dl.acm.org"
                  accent={iconColor}
                />
              )}
            </div>
          </section>

          {/* Quick clone */}
          {project.github && (
            <section>
              <SectionTitle code="08" title="Clone" color={iconColor} />
              <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-3 font-mono text-[11px]">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-vsc-dim">$ git clone</div>
                    <div className="text-vsc-green break-all">
                      {project.github.replace(".git", "")}.git
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `${project.github!.replace(".git", "")}.git`,
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="shrink-0 flex items-center gap-1 rounded bg-[#252526] px-2 py-1 text-[10px] text-[#cccccc] ring-1 ring-[#3c3c3c] hover:ring-[#007acc] transition-colors"
                    title="Copy clone URL"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-vsc-green" /> copied
                      </>
                    ) : (
                      <>
                        <Copy size={11} /> copy
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-vsc-dim">
                  # then: cd {project.name} · bun install · bun run dev
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  code,
  title,
  color,
}: {
  code: string;
  title: string;
  color: string;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span
        className="font-mono text-[10px]"
        style={{ color }}
      >
        [{code}]
      </span>
      <span className="text-[13px] font-semibold text-white">{title}</span>
      <div className="h-px flex-1 bg-[#2d2d30]" />
    </div>
  );
}

function ProjectLink({
  href,
  icon,
  label,
  sub,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded"
        style={{ background: `${accent}1a`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
          {label}
        </div>
        <div className="truncate text-[10px] font-mono text-vsc-dim">{sub}</div>
      </div>
      <ExternalLink
        size={12}
        className="ml-auto text-vsc-dim group-hover:text-white"
      />
    </a>
  );
}

function ProjectIcon({ icon, color }: { icon: string; color: string }) {
  const map: Record<string, React.ReactNode> = {
    webhook: <Activity size={26} />,
    shield: <ShieldCheck size={26} />,
    chart: <FileText size={26} />,
    bolt: <Zap size={26} />,
    cloud: <Cpu size={26} />,
    mail: <Terminal size={26} />,
    "shield-check": <ShieldCheck size={26} />,
    cpu: <Cpu size={26} />,
  };
  return <span style={{ color }}>{map[icon] ?? <Terminal size={26} />}</span>;
}
