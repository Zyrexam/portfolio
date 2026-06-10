const projects = [
  {
    id: 1,
    title: "Webhook Delivery System",
    description:
      "Async webhook delivery engine (FastAPI + PostgreSQL + Redis) returning 202 Accepted on ingest. Models lifecycle as PENDING → IN FLIGHT → DELIVERED → DEAD with a watchdog rescuing stale jobs every 30s via updated-at threshold. Exponential backoff retry scheduler (2s → 32s, max 5 attempts) using Redis sorted set as delay queue. Circuit breaker (CLOSED → OPEN → HALF-OPEN) halting delivery after 5 failures with 60s recovery cooldown. Secures payloads with per-subscription HMAC-SHA256 signatures.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Python"],
    github: "https://github.com/Zyrexam/Webhook-Delivery-System",
    live: null,
    type: "github" as const,
  },
  {
    id: 2,
    title: "Payment Idempotency Proxy",
    description:
      "Stateless payment proxy (FastAPI + Redis + PostgreSQL + Prometheus + Grafana) containerized with Docker Compose — one command deploys all 5 services. Distributed locks via Redis SET NX + Lua atomic release preventing race conditions on concurrent requests; validated 20 simultaneous requests producing exactly 1 transaction with zero duplicate charges. PostgreSQL audit trail (amounts in cents) with Pydantic validation and SHA-256 tamper detection. Redis caching (24h TTL, 95.9% hit rate) with Prometheus metrics exported to Grafana.",
    tags: ["FastAPI", "Redis", "PostgreSQL", "Docker", "Prometheus", "Grafana"],
    github: "https://github.com/Zyrexam/payment-idempotency-proxy",
    live: null,
    type: "github" as const,
  },
  {
    id: 3,
    title: "Spring Email Scheduler",
    description:
      "Fault-tolerant job scheduling system using Spring Boot and Quartz with MySQL-backed persistence. Supports 50+ concurrent timezone-aware tasks with sub-second execution delays, automatic job recovery, and retry mechanisms.",
    tags: ["Java", "Spring Boot", "Quartz", "MySQL"],
    github: "https://github.com/Zyrexam/Spring-EmailScheduler.git",
    live: null,
    type: "github" as const,
  },
  {
    id: 4,
    title: "Well-Log-Analyzer",
    description:
      "Full-stack sensor data platform processing 50,000+ rows across 100+ channels. Reduced frontend rendering latency by 90% via Intelligent Windowed Downsampling and hit 10,000+ rows/sec backend throughput with async pipelines. Ships a Groq-powered GeoBot (Llama 3.3-70B) with streaming responses and persistent chat history.",
    tags: ["React", "FastAPI", "Python", "PostgreSQL", "AWS S3", "Groq"],
    github: "https://github.com/Zyrexam/Well-Log-Analyzer",
    live: "https://well-log-analyzer.vercel.app/",
    type: "live" as const,
  },
  {
    id: 5,
    title: "CloudVault",
    description:
      "Full-stack file management platform with Spring Boot and React. Integrated GCP Cloud Storage and Firebase Realtime DB for per-user metadata. Achieved sub-500ms upload latency for 10MB files under 50 concurrent users. Secured with Firebase ID-token auth and stateless Spring Security.",
    tags: ["Java", "Spring Boot", "React", "Firebase", "GCP"],
    github: "https://github.com/Zyrexam/CloudVault.git",
    live: null,
    type: "github" as const,
  },
  {
    id: 6,
    title: "Secure Contract Pipeline",
    description:
      "Automated pipeline for Solidity smart contract generation, vulnerability analysis, and LLM-based patching. Combines static analysis tooling with domain-specific prompting to detect and repair contract vulnerabilities end-to-end.",
    tags: ["Solidity", "Python", "Static Analysis", "LLM"],
    github: "https://github.com/Zyrexam/Smart-Contract-Pipeline-1.git",
    live: null,
    type: "github" as const,
  },
  {
    id: 7,
    title: "FedMeet",
    description:
      "Federated learning framework for human activity recognition using multi-sensor IMU data (smartwatch + earables). Implemented gated sensor fusion and BiLSTM to handle non-IID distributions. Achieved 87.97% accuracy — outperforming FedProx, FedPer, and ClusterFL. Co-authored ACM publication.",
    tags: ["Python", "Flower", "BiLSTM", "Federated Learning"],
    github: "https://github.com/Zyrexam/SensorFlow-Model.git",
    live: "https://dl.acm.org/doi/10.1145/3772290.3772295",
    type: "research" as const,
  },
];

const typeBadge = {
  live:     { label: "Live", className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  github:   { label: "GitHub", className: "bg-white/5 text-muted-foreground border border-white/10" },
  research: { label: "Research · ACM", className: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="mt-24 max-w-4xl pt-12 sm:mt-28 sm:pt-16">
      <div className="section-label mb-8 sm:mb-10">Projects</div>
      <div className="border-t border-white/8">
        {projects.map((project, index) => {
          const badge = typeBadge[project.type];
          return (
            <div
              key={project.id}
              className="group grid gap-4 border-b border-white/8 py-6 sm:gap-6 sm:py-8 md:grid-cols-[1fr_auto]"
            >
              <div>
                {/* Number + badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-[1.65rem] leading-none text-foreground sm:text-[2rem]">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-2xl text-[0.92rem] leading-[1.75] text-muted-foreground sm:text-[0.95rem] sm:leading-[1.8]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="mono-chip">{tag}</span>
                  ))}
                </div>

                {/* Links row */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      <GitHubIcon />
                      Source
                    </a>
                  )}
                  {project.github && project.live && (
                    <span className="text-white/10">|</span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-400 transition-opacity duration-150 hover:opacity-70"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live demo
                    </a>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden items-start pt-10 text-muted-foreground md:flex">
                ↗
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
