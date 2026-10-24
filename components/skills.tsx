import { Reveal } from "./reveal";

const GROUPS = [
  {
    label: "Languages",
    items: ["Java", "Go", "Python", "C++", "TypeScript", "JavaScript", "Kotlin", "SQL", "Solidity"],
  },
  {
    label: "Frameworks & data",
    items: ["Spring Boot", "FastAPI", "React", "REST APIs", "gRPC", "Redis", "PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    label: "Cloud, tools & systems",
    items: [
      "AWS (S3, EC2)", "GCP", "Docker", "Kubernetes", "Linux", "Git", "GitHub", "GitHub Actions", "CI/CD",
      "Postman", "Prometheus", "Grafana", "Ollama", "IntelliJ IDEA", "Android Studio", "VS Code",
      "Distributed systems", "System design", "Caching strategies", "Scalability", "Federated learning",
      "Consensus protocols", "NLP", "LLM systems",
    ],
  },
];

export function Skills() {
  return (
    <div id="skills" className="mt-14 border-t pt-9 md:mt-16 md:pt-10" style={{ borderColor: "var(--ws-border-subtle)" }}>
      <Reveal>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ws-silver)" }}>SKILLS &amp; TOOLS</p>
            <h3 className="mt-1 text-[21px] font-semibold tracking-tight sm:text-[23px]" style={{ color: "var(--ws-text-primary)" }}>
              What I work with
            </h3>
          </div>
          <p className="max-w-[42ch] text-[13.5px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
            Languages, frameworks, and the systems tools I use to build reliable software.
          </p>
        </div>
      </Reveal>

      <div className="overflow-hidden rounded-2xl border" style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}>
        {GROUPS.map((group, index) => (
          <Reveal key={group.label} delay={index * 50}>
            <section
              aria-labelledby={`skill-group-${index}`}
              className="grid gap-4 px-5 py-5 sm:px-6 md:grid-cols-[190px_minmax(0,1fr)] md:items-start md:gap-6 md:py-6"
              style={index < GROUPS.length - 1 ? { borderBottom: "1px solid var(--ws-border-subtle)" } : undefined}
            >
              <h4 id={`skill-group-${index}`} className="text-[14px] font-semibold tracking-tight sm:pt-1" style={{ color: "var(--ws-text-primary)" }}>
                {group.label}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border px-3 py-1.5 text-[12px] leading-4" style={{ background: "var(--ws-surface-2)", borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-secondary)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
