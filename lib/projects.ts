export type Project = {
  n: string;
  year: string;
  kicker: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
  live?: string;
  stat: string;
  /** Shown in the home page Work section. The rest live on /projects. */
  home?: boolean;
  /** Flagship styling — one elevated card. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    n: "01",
    year: "2026",
    kicker: "PAYMENTS",
    title: "payment-idempotency-proxy",
    desc: "Stateless payment proxy preventing duplicate charges with distributed locks and Redis caching.",
    tags: ["FastAPI", "Redis", "PostgreSQL", "Prometheus"],
    href: "https://github.com/Zyrexam/payment-idempotency-proxy",
    stat: "95.9% cache hit",
    home: true,
    featured: true,
  },
  {
    n: "02",
    year: "2026",
    kicker: "C++ · CDN",
    title: "EdgeCraft-CDN",
    desc: "Dependency-free C++17 edge cache — LRU + TTL eviction with round-robin routing across 3 edge servers.",
    tags: ["C++17", "LRU + TTL", "Zipfian traffic"],
    href: "https://github.com/Zyrexam/EdgeCraft-CDN",
    stat: "606K req/sec",
    home: true,
  },
  {
    n: "03",
    year: "2026",
    kicker: "GO · GRPC",
    title: "TurboTTS-Proxy",
    desc: "Go gRPC proxy cutting time-to-first-audio for real-time voice agents with SHA-256 keyed caching.",
    tags: ["Go", "gRPC", "Kubernetes", "Redis"],
    href: "https://github.com/Zyrexam/TTS-Proxy",
    stat: "320ms → <2ms",
    home: true,
  },
  {
    n: "04",
    year: "2026",
    kicker: "SYSTEMS",
    title: "url-shortener",
    desc: "Snowflake-ID shortener with Redis-first redirects and a locked fallback that prevents cache stampedes.",
    tags: ["FastAPI", "PostgreSQL", "Redis"],
    href: "https://github.com/Zyrexam/Url-Shortner",
    stat: "302 redirects",
    home: true,
  },
  {
    n: "05",
    year: "2026",
    kicker: "SYSTEMS",
    title: "Webhook-Delivery-System",
    desc: "Async delivery engine with a PENDING → IN FLIGHT → DELIVERED → DEAD lifecycle and signed payloads.",
    tags: ["FastAPI", "PostgreSQL", "HMAC-SHA256"],
    href: "https://github.com/Zyrexam/Webhook-Delivery-System",
    stat: "2s → 32s backoff",
    home: true,
  },
  {
    n: "06",
    year: "2025",
    kicker: "JAVA",
    title: "CloudVault",
    desc: "Reactive Spring Boot file platform holding 10MB uploads under 500ms at 50 concurrent users.",
    tags: ["Spring Boot", "Firebase Auth", "GCP Storage"],
    href: "https://github.com/Zyrexam/CloudVault",
    stat: "sub-500ms upload",
    home: true,
  },
  {
    n: "07",
    year: "2026",
    kicker: "SUBSURFACE DATA",
    title: "OneGeo — Well Log Analysis",
    desc: "LAS well-log platform that ingests, visualizes, and interprets subsurface data with data-grounded AI insights.",
    tags: ["FastAPI", "PostgreSQL", "React", "Groq LLM", "AWS S3"],
    href: "https://github.com/Zyrexam/Well-Log-Analyzer",
    live: "https://well-log-analyzer.vercel.app/",
    stat: "50K+ points charted",
  },
  {
    n: "08",
    year: "2026",
    kicker: "JAVA · TOOLING",
    title: "Spring-EmailScheduler",
    desc: "Spring Boot service that schedules and sends branded email with Quartz — timezone-aware triggers, templateable copy.",
    tags: ["Spring Boot", "Quartz", "Java 17"],
    href: "https://github.com/Zyrexam/Spring-EmailScheduler",
    stat: "timezone-aware",
  },
];

/** The six systems surfaced on the home page; all eight live on /projects. */
export const HOME_PROJECTS = PROJECTS.filter((p) => p.home);
