"use client";
import { Reveal } from "./reveal";

const GROUPS = [
  {
    n: "01",
    label: "LANGUAGES",
    items: [
      "Java",
      "Python",
      "C++",
      "Kotlin",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Solidity",
      "Go",
    ],
  },
  {
    n: "02",
    label: "FRAMEWORKS & CLOUD",
    items: [
      "FastAPI",
      "Spring Boot",
      "React",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "AWS (S3, EC2)",
      "GCP",
      "REST APIs",
      "gRPC",
    ],
  },
  {
    n: "03",
    label: "TOOLS & DEVOPS",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "CI/CD",
      "GitHub Actions",
      "Linux",
      "Postman",
      "Prometheus",
      "Grafana",
      "IntelliJ IDEA",
      "Android Studio",
      "VS Code",
      "Ollama",
    ],
  },
  {
    n: "04",
    label: "SYSTEMS & RESEARCH",
    items: [
      "Distributed Systems",
      "System Design",
      "Caching Strategies",
      "Scalability",
    ],
  },
];

const TOTAL = GROUPS.reduce((sum, g) => sum + g.items.length, 0);

export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t overflow-hidden"
      style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-subtle)" }}
    >
      {/* metallic top edge */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />
      {/* steel hatching + radial */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,245,246,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,246,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(244,245,246,0.05), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(125,130,135,0.07), transparent 60%)",
        }}
      />

      <div className="ws-container relative py-20 md:py-28">
        {/* header row */}
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12 shrink-0" style={{ background: "var(--ws-border-strong)" }} />
            <p className="text-[11px] font-medium tracking-[0.22em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
              SKILLS — {GROUPS.length} GROUPS · {TOTAL} ITEMS
            </p>
            <span className="hidden sm:block h-px flex-1" style={{ background: "var(--ws-border-subtle)" }} />
            <p className="hidden md:block font-mono text-[11px] tracking-[0.12em] whitespace-nowrap" style={{ color: "var(--ws-text-muted)" }}>
              [ 02 / 06 ]
            </p>
          </div>
        </Reveal>

        {/* title + intro */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-end mb-10">
          <Reveal>
            <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[0.88] tracking-[-0.04em]">
              <span className="block" style={{ color: "var(--ws-text-primary)" }}>
                What I
              </span>
              <span className="block ws-logo-wordmark">work with.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[14.5px] leading-relaxed lg:pb-1.5 max-w-[46ch]" style={{ color: "var(--ws-text-secondary)" }}>
              The stack behind payment proxies, CDN simulators, and async delivery engines — grouped by what I actually
              reach for.
            </p>
          </Reveal>
        </div>

        {/* groups */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 80} className="h-full">
              <div
                className="group relative h-full overflow-hidden rounded-[20px] border p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "var(--ws-surface-1)",
                  borderColor: "var(--ws-border-subtle)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.26), inset 0 1px 0 rgba(244,245,246,0.04)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                  style={{ background: "var(--ws-gradient-sheen-dark)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="font-mono text-[11px] tracking-[0.16em]" style={{ color: "var(--ws-text-muted)" }}>
                      {g.n} — {g.label}
                    </p>
                    <span className="shrink-0 font-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--ws-text-muted)" }}>
                      {String(g.items.length).padStart(2, "0")} ITEMS
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.06em] backdrop-blur"
                        style={{
                          borderColor: "var(--ws-border-default)",
                          color: "var(--ws-titanium)",
                          background: "rgba(244,245,246,0.06)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
