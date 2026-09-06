"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Code2,
  FileText,
  Send,
  Heart,
  Terminal,
  FolderOpen,
  ArrowRight,
  Briefcase,
  Sparkles,
  Rocket,
  Clock,
  ExternalLink,
  MousePointerClick,
  PenLine,
} from "lucide-react";
import {
  profile,
  stats,
  skills,
  projects,
  experiences,
  publications,
  writings,
  contactLinks,
} from "@/lib/content";
import { useIDEStore } from "@/store/useIDEStore";

// The featured projects shown on the about page, in display order.
// Falls back to `featured` flags (then the first 5) if none match.
const FEATURED_IDS = [
  "payment-idempotency-proxy",
  "url-shortener",
  "edgecraft-cdn",
  "turbotts-proxy",
];
const featuredProjects = (() => {
  const byId = new Map(projects.map((p) => [p.id, p]));
  const ordered = FEATURED_IDS.map((id) => byId.get(id)).filter(Boolean) as typeof projects;
  if (ordered.length) return ordered;
  return projects.filter((p) => p.featured).length
    ? projects.filter((p) => p.featured)
    : projects.slice(0, 4);
})();

export function AboutView() {
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const setDirExpanded = useIDEStore((s) => s.setDirExpanded);

  const goProjects = () => {
    setDirExpanded(["projects"], true);
    navigate(["projects"]);
  };
  const openProject = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setDirExpanded(["projects"], true);
    setDirExpanded(["projects", p.category], true);
    const path = ["projects", p.category, p.name];
    openNode(path);
    openTab(path, p.name, p.icon);
  };

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#2d2d30] px-6 py-5">
        <div className="font-mono text-[11px] text-vsc-dim mb-2 flex items-center gap-1">
          <Terminal size={11} /> about.md · {profile.osName} {profile.osVersion} · ~2 min read
        </div>
        <h1 className="font-sans text-3xl font-bold text-white">
          Hi, I’m {profile.name}
        </h1>
        <p className="mt-2 text-[14px] text-[#cccccc]/85 max-w-2xl leading-relaxed">
          {profile.bio}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-vsc-green ring-1 ring-[#3c3c3c]">
            {profile.role}
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-vsc-cyan ring-1 ring-[#3c3c3c]">
            IIT Jodhpur · 2026 grad
          </span>
          <span className="rounded bg-[#252526] px-2 py-1 text-[11px] font-mono text-vsc-yellow ring-1 ring-[#3c3c3c]">
            {profile.leetcodeCount} LC
          </span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-7">
        {/* [01] Headline metrics */}
        <section>
          <SectionLabel code="01" title="Headline metrics" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3"
              >
                <div className="font-mono text-lg font-bold text-vsc-green">
                  {s.value}
                </div>
                <div className="text-[11px] text-[#cccccc]">{s.label}</div>
                {s.note && (
                  <div className="text-[10px] text-vsc-dim mt-0.5">{s.note}</div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* [02] What I do */}
        <section>
          <SectionLabel code="02" title="What I do" />
          <ul className="space-y-2">
            {[
              "Design exactly-once payment & webhook delivery systems (Redis SET NX, circuit breakers).",
              "Build low-latency caching layers — Redis, async I/O — that survive concurrency.",
              "Write systems software in C++ (LRU/TTL caches, routers, simulators) for learning the lower layers.",
              "Research federated learning & NLP→Solidity compilation at IIT Jodhpur.",
              "Ship full-stack apps — Spring Boot / FastAPI backends, React frontends, Kubernetes deploys.",
            ].map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-[13px] text-[#cccccc]/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vsc-accent" />
                <span>{t}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* [03] Currently working on + looking for */}
        <section>
          <SectionLabel code="03" title="Currently & looking for" />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                <Sparkles size={13} className="text-vsc-yellow" />
                Currently shipping
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] text-[#cccccc]/90">
                <li>· Payment idempotency (SET NX + Lua, 20 concurrent → 1)</li>
                <li>· EdgeCraft CDN — C++17 LRU/TTL edges, 99% origin offload</li>
                <li>· Groq-powered chatbots grounded in real portfolio facts</li>
              </ul>
            </div>
            <div className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                <Rocket size={13} className="text-vsc-cyan" />
                Open to
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] text-[#cccccc]/90">
                <li>· Backend / platform / infra engineering roles</li>
                <li>· Research collaborations (federated learning, applied ML)</li>
                <li>· Freelance backend work · consulting on payment systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* [04] Featured projects */}
        <section>
          <SectionLabel
            code="04"
            title="Featured projects"
            right={
              <button
                onClick={goProjects}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-vsc-cyan hover:text-white"
              >
                <FolderOpen size={12} /> browse all {projects.length} →
              </button>
            }
          />
          <div className="space-y-2">
            {featuredProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => openProject(p.id)}
                className="group w-full flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 text-left hover:ring-[#007acc] transition-all"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
                  style={{ background: `${p.accent}1a` }}
                >
                  <FolderOpen size={16} style={{ color: p.accent }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[13px] text-white group-hover:text-vsc-cyan truncate">
                    {p.name}/
                  </div>
                  <div className="truncate text-[11px] text-[#cccccc]/70">
                    {p.tagline}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-vsc-dim group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>
            ))}
          </div>
        </section>

        {/* [05] Skills & tooling */}
        <section>
          <SectionLabel code="05" title="Skills & tooling" />
          <div className="space-y-2.5">
            {Object.entries(skills).map(([group, items], gi) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.05 }}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5"
              >
                <span className="w-24 shrink-0 font-mono text-[11px] text-vsc-dim">
                  {group.toLowerCase()}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s.name}
                      className={
                        group === "Learning"
                          ? "rounded border border-dashed border-[#dcdcaa55] px-2 py-0.5 font-mono text-[11px] text-vsc-yellow"
                          : "rounded bg-[#1e1e1e] px-2 py-0.5 font-mono text-[11px] text-[#cccccc] ring-1 ring-[#2d2d30]"
                      }
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* [06] Experience */}
        <section>
          <SectionLabel code="06" title="Experience" />
          <div className="space-y-2">
            {experiences.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div className="text-[13px] font-semibold text-white">
                    {e.title} <span className="text-vsc-dim">@</span>{" "}
                    <span className="text-vsc-cyan">{e.org}</span>
                  </div>
                  <div className="font-mono text-[11px] text-vsc-dim">
                    {e.period} · {e.location}
                  </div>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {e.highlights.slice(0, 2).map((h, hi) => (
                    <li
                      key={hi}
                      className="flex items-start gap-2 text-[12px] text-[#cccccc]/85"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vsc-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#1e1e1e] px-1.5 py-0.5 font-mono text-[10px] text-vsc-dim ring-1 ring-[#2d2d30]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* [07] Research & publications */}
        <section>
          <SectionLabel code="07" title="Research & publications" />
          <div className="space-y-2">
            {publications.map((p, i) => (
              <motion.a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group block rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[13px] font-semibold text-white group-hover:text-vsc-cyan">
                    {p.title}
                  </div>
                  <ExternalLink
                    size={13}
                    className="mt-1 shrink-0 text-vsc-dim group-hover:text-white"
                  />
                </div>
                <div className="mt-1 font-mono text-[11px] text-vsc-dim">
                  {p.venue} · {p.year}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#1e1e1e] px-1.5 py-0.5 font-mono text-[10px] text-[#cccccc]/70 ring-1 ring-[#2d2d30]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* [08] Writing */}
        <section>
          <SectionLabel
            code="08"
            title="Writing"
            right={
              <a
                href="https://medium.com/@mohitkumar4922251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-vsc-cyan hover:text-white"
              >
                <PenLine size={12} /> medium →
              </a>
            }
          />
          <div className="space-y-2">
            {writings.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3"
              >
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-2"
                >
                  <div className="text-[13px] font-semibold text-white group-hover:text-vsc-cyan">
                    {w.title}
                  </div>
                  <ExternalLink
                    size={13}
                    className="mt-1 shrink-0 text-vsc-dim group-hover:text-white"
                  />
                </a>
                <div className="mt-1 text-[12px] text-[#cccccc]/75">{w.excerpt}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] text-vsc-dim">{w.date}</span>
                  {w.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#1e1e1e] px-1.5 py-0.5 font-mono text-[10px] text-[#cccccc]/70 ring-1 ring-[#2d2d30]"
                    >
                      {t}
                    </span>
                  ))}
                  {w.repo && (
                    <a
                      href={w.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-vsc-cyan hover:text-white"
                    >
                      · source
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* [09] How to explore this workstation */}
        <section>
          <SectionLabel code="08" title="How to explore this workstation" />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                <MousePointerClick size={13} className="text-vsc-cyan" />
                Mouse & keys
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] text-[#cccccc]/90">
                <li>· Click folders to expand, files to open</li>
                <li>
                  · Press <Kbd>Ctrl</Kbd> + <Kbd>P</Kbd> for the command palette
                </li>
                <li>· Every project has a README-style detail view</li>
                <li>· Resume.pdf and .env are openable too</li>
              </ul>
            </div>
            <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#2d2d30] p-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                <Terminal size={13} className="text-vsc-green" />
                Or type in the terminal
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px]">
                {[
                  ["help", "list all commands"],
                  ["about", "quick bio"],
                  ["projects", "list all 10 projects"],
                  ["skills", "skills by category"],
                  ["cat resume.pdf", "view my resume"],
                  ["code about/about.md", "this page"],
                  ["git log", "faux commit history"],
                  ["mohit --why", "the important one"],
                ].map(([cmd, hint]) => (
                  <div key={cmd} className="flex items-baseline gap-1.5">
                    <span className="shrink-0">
                      <span className="text-vsc-green">visitor@mohit</span>
                      <span className="text-vsc-dim">:</span>
                      <span className="text-vsc-blue">~$</span>{" "}
                      <span className="text-white">{cmd}</span>
                    </span>
                    <span className="hidden sm:inline truncate text-[10px] text-vsc-dim">
                      # {hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* [10] Quick facts */}
        <section>
          <SectionLabel code="05" title="Quick facts" />
          <div className="grid gap-2 sm:grid-cols-2">
            <Fact
              icon={<GraduationCap size={13} />}
              label="Education"
              value={`${profile.school} — ${profile.gradYear}`}
              color="#007acc"
            />
            <Fact
              icon={<MapPin size={13} />}
              label="Location"
              value="Jodhpur, India"
              color="#4ec9b0"
            />
            <Fact
              icon={<Briefcase size={13} />}
              label="Focus"
              value="Distributed systems, payments, caching"
              color="#ce9178"
            />
            <Fact
              icon={<Clock size={13} />}
              label="Time zone"
              value="IST (UTC+5:30)"
              color="#c586c0"
            />
            <Fact
              icon={<Code2 size={13} />}
              label="LeetCode"
              value={`${profile.leetcodeCount} problems solved`}
              color="#dcdcaa"
            />
            <Fact
              icon={<Mail size={13} />}
              label="Email"
              value={profile.email}
              color="#4ec9b0"
            />
          </div>
        </section>

        {/* [11] Find me online */}
        <section>
          <SectionLabel code="06" title="Find me online" />
          <div className="grid gap-2 sm:grid-cols-2">
            {contactLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1e1e1e] text-vsc-cyan">
                  <ContactIcon icon={l.icon} />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
                    {l.label}
                  </div>
                  <div className="truncate text-[10px] font-mono text-vsc-dim">
                    {l.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>



        {/* Sign-off */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-vsc-dim">
          <Heart size={11} className="text-vsc-red" /> built with curiosity · MohitOS
        </div>
      </div>
    </div>
  );
}

function SectionLabel({
  code,
  title,
  right,
}: {
  code: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className="font-mono text-[10px] text-vsc-accent">[{code}]</span>
      <span className="text-[13px] font-semibold text-white">{title}</span>
      <div className="h-px flex-1 bg-[#2d2d30]" />
      {right}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-[#3c3c3c] bg-[#1e1e1e] px-1 py-0 font-mono text-[10px] text-[#cccccc]">
      {children}
    </span>
  );
}

function Fact({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3">
      <div className="flex items-center gap-2 text-[11px] text-vsc-dim">
        <span style={{ color }}>{icon}</span> {label}
      </div>
      <div className="mt-1 text-[13px] text-[#cccccc] font-mono break-all">
        {value}
      </div>
    </div>
  );
}

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "mail":
      return <Mail size={15} />;
    case "github":
      return <Github size={15} />;
    case "linkedin":
      return <Linkedin size={15} />;
    case "code":
      return <Code2 size={15} />;
    case "file":
      return <FileText size={15} />;
    default:
      return <Send size={15} />;
  }
}