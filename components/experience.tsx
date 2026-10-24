import { Reveal } from "./reveal";
import { FEDMEET_PAPER } from "@/lib/links";

type Entry = {
  org: string;
  role: string;
  meta?: string;
  range: string;
  bullets: string[];
  tags: string[];
  link?: { label: string; href: string };
};

const TIMELINE: Entry[] = [
  {
    org: "IIT Jodhpur",
    role: "NLP → Solidity Compiler",
    range: "Sep 2025 — Jan 2026 · Jodhpur, IN",
    bullets: [
      "Designed a three-phase pipeline that turns natural-language intent into secure Solidity contracts.",
      "Built validated JSON extraction, rule-constrained generation, and automated compilation repair.",
      "Integrated Slither, Mythril, and Semgrep with LLM-based patching for vulnerability detection and fixes.",
    ],
    tags: ["Solidity", "Python", "Slither", "Mythril", "Semgrep", "LLM"],
  },
  {
    org: "IIT Jodhpur",
    role: "Federated Learning Researcher",
    meta: "FedMeet — published at ACM ICDCN '26",
    range: "Jun 2025 — Jul 2025 · Jodhpur, IN",
    bullets: [
      "Federated learning research with FedMeet, reaching 85% accuracy on meeting client sensor data.",
      "Built an IMU-based engagement system with XGBoost and ONNX, achieving 91.19% cross-validation accuracy.",
      "Integrated the model into backend workflows with communication-aware updates and productivity feedback.",
    ],
    tags: ["Python", "Flower", "BiLSTM", "XGBoost", "ONNX"],
    link: { label: "Read Paper", href: FEDMEET_PAPER },
  },
  {
    org: "IIT Jodhpur",
    role: "B.Tech — Computer Science",
    range: "2022 — 2026 · Jodhpur, IN",
    bullets: [
      "Undergraduate degree focused on distributed systems, system design, backend engineering, and competitive programming.",
    ],
    tags: ["CSE", "LeetCode", "Codeforces", "Systems", "Research"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>02.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>Where I&apos;ve Worked</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
      </Reveal>

      {/* vertical timeline */}
      <div className="relative pl-7 sm:pl-10">
        {/* spine */}
        <div
          aria-hidden
          className="absolute bottom-3 left-[5px] top-2 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--ws-border-strong) 8%, var(--ws-border-default) 92%, transparent)",
          }}
        />

        <div className="space-y-8">
          {TIMELINE.map((e, i) => (
            <Reveal key={e.role} delay={i * 80}>
              <div className="relative">
                {/* node */}
                <span
                  aria-hidden
                  className="absolute -left-7 top-[7px] h-3 w-3 rounded-full sm:-left-10"
                  style={{
                    background: "var(--ws-silver)",
                    boxShadow: "0 0 0 4px var(--ws-bg)",
                  }}
                />

                <p className="font-mono text-[12.5px]" style={{ color: "var(--ws-text-muted)" }}>
                  {e.range}
                </p>
                <h3 className="mt-1 text-[18px] font-bold tracking-tight" style={{ color: "var(--ws-text-primary)" }}>
                  {e.role} <span style={{ color: "var(--ws-silver)" }}>@ {e.org}</span>
                </h3>
                {e.meta && (
                  <p className="mt-1 font-mono text-[12.5px]" style={{ color: "var(--ws-silver)" }}>
                    {e.meta}
                  </p>
                )}

                <ul className="mt-3 space-y-2.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
                      <span aria-hidden className="mt-[2px] shrink-0" style={{ color: "var(--ws-silver)" }}>▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul aria-label="Skills and tools" className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border px-2.5 py-1 font-mono text-[11.5px] leading-5"
                      style={{
                        background: "var(--ws-surface-1)",
                        borderColor: "var(--ws-border-default)",
                        color: "var(--ws-text-secondary)",
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] transition hover:underline"
                    style={{ color: "var(--ws-silver)" }}
                  >
                    {e.link.label} <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
