// All portfolio content for Mohit Kumar — single source of truth.

export const profile = {
  name: "Mohit Kumar",
  role: "Backend Engineer",
  school: "IIT Jodhpur",
  credential: "Graduated from Indian Institute of Technology (IIT), Jodhpur",
  gradYear: "2026",
  osName: "MohitOS",
  osVersion: "v2.0",
  site: "https://mohitkumar-six.vercel.app",
  siteHost: "mohitkumar-six.vercel.app",
  email: "mohitkumar4922251@gmail.com",
  github: "https://github.com/Zyrexam",
  githubHandle: "Zyrexam",
  linkedin: "https://www.linkedin.com/in/mohit-kumar-sp/",
  leetcode: "https://leetcode.com/u/mohitkumar4/",
  leetcodeHandle: "mohitkumar4",
  leetcodeCount: "400+",
  resume: "/Resume.pdf",
  gitBranch: "main",
  bio: "Backend engineer who builds systems that are simple, reliable, and fast. I design distributed systems, async pipelines, and payment-grade APIs where reliability, performance, and clean design meet. 3 peer-reviewed papers, 400+ LeetCode problems, and a shelf of shipped systems — payments, caching, CDNs — including systems programming in C++. Open to backend roles and research collaborations.",
};

export const stats = [
  { label: "LeetCode", value: "400+", note: "Problems solved" },
  { label: "CodeForces", value: "1100+", note: "Pupil rating" },
  { label: "Publications", value: "3", note: "Peer-reviewed papers" },
  { label: "Projects", value: "10", note: "Shipped systems" },
];

export const skills = {
  Languages: [
    { name: "Java" },
    { name: "Python" },
    { name: "TypeScript" },
    { name: "JavaScript" },
    { name: "C++" },
    { name: "SQL" },
  ],
  Frameworks: [
    { name: "FastAPI" },
    { name: "Spring Boot" },
    { name: "React" },
    { name: "Redis" },
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "Firebase" },
    { name: "AWS (S3, EC2)" },
    { name: "GCP" },
    { name: "REST APIs" },
  ],
  Tools: [
    { name: "Git" },
    { name: "GitHub" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Linux" },
    { name: "CI/CD" },
    { name: "GitHub Actions" },
    { name: "Prometheus" },
    { name: "Grafana" },
    { name: "IntelliJ IDEA" },
    { name: "VS Code" },
    { name: "Postman" },
    { name: "Android Studio" },
    { name: "Ollama" },
  ],
  Learning: [
    { name: "Distributed Systems" },
    { name: "System Design" },
    { name: "Caching Strategies" },
    { name: "Scalability" },
  ],
};

export type Experience = {
  id: string;
  title: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    id: "federated-learning",
    title: "Federated Learning Researcher",
    org: "IIT Jodhpur",
    period: "Jun 2025 — Jul 2025",
    location: "Jodhpur, India",
    summary:
      "Researched on-device federated learning for meeting engagement sensing using IMU sensor data, culminating in the FedMeet framework.",
    highlights: [
      "Built FedMeet achieving 85% accuracy on meeting client sensor data.",
      "Designed an IMU-based engagement system with XGBoost + ONNX runtime, reaching 91.19% accuracy.",
      "Used gated sensor fusion to handle non-IID distributions across clients.",
    ],
    tech: ["Python", "Flower", "BiLSTM", "XGBoost", "ONNX", "Federated Learning"],
  },
  {
    id: "nlp-solidity-compiler",
    title: "NLP → Solidity Compiler",
    org: "IIT Jodhpur",
    period: "Sep 2025 — Jan 2026",
    location: "Jodhpur, India",
    summary:
      "Built a three-phase pipeline that turns natural-language specifications into deployable, secure Solidity contracts with LLM-assisted patching.",
    highlights: [
      "Three-phase pipeline: intent extraction → Solidity generation → security hardening.",
      "Integrated Slither, Mythril, and Semgrep static analyzers.",
      "LLM-based patch generation for detected vulnerabilities with re-verification.",
    ],
    tech: ["Solidity", "Python", "Slither", "Mythril", "Semgrep", "LLM", "Static Analysis"],
  },
];

export type Project = {
  id: string;
  name: string;
  category: "Java-Projects" | "AWS-Projects" | "Systems-Programming" | "Experiments";
  tagline: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  architecture?: string;
  diagram?: string;
  /** Author's-voice comments shown as an "engineer's notes" block on the project page. */
  notes?: string[];
  github?: string;
  live?: string;
  paper?: string;
  hero?: string;
  icon: string;
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "webhook-delivery-system",
    name: "Webhook-Delivery-System",
    category: "Systems-Programming",
    tagline: "At-least-once webhook delivery with retry, circuit breaking, and crash recovery",
    description:
      "A production-minded webhook service on FastAPI + PostgreSQL + Redis that accepts events, tracks every delivery through a PENDING → IN FLIGHT → DELIVERED → DEAD lifecycle, and guarantees at-least-once delivery with retries, exponential backoff, a circuit breaker, and a reconciliation loop that rescues stale jobs after a crash.\n\nSubscribers deduplicate using the `X-Webhook-Delivery` header (a stable per-delivery ID) and verify authenticity via per-subscription HMAC-SHA256 signatures. Failed deliveries back off 2s → 4s → 8s → 16s → 32s (max 5 attempts); five consecutive failures trip the circuit to OPEN with a 60s recovery cooldown. A separate crash-reaper rescans every 30s for stale IN-FLIGHT jobs and republishes them, so a worker crash never loses work.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Python", "Asyncio", "HMAC", "Docker"],
    metrics: [
      { label: "Backoff", value: "2s → 32s" },
      { label: "Max attempts", value: "5" },
      { label: "Circuit cooldown", value: "60s" },
      { label: "Recovery scan", value: "every 30s" },
    ],
    features: [
      "PENDING → IN FLIGHT → DELIVERED → DEAD lifecycle in PostgreSQL",
      "Redis sorted set as the delay queue; workers pop due deliveries",
      "Exponential backoff (2s → 32s) with max 5 attempts",
      "Circuit breaker CLOSED → OPEN → HALF-OPEN with 60s recovery",
      "Crash reaper rescans every 30s and republishes stale jobs",
      "Per-subscription HMAC-SHA256 request signatures",
      "X-Webhook-Delivery header for subscriber-side dedup",
      "Reconciliation loop republishes pending work when Redis is down",
    ],
    architecture:
      "PostgreSQL is the source of truth. The API enqueues delivery IDs in a Redis sorted set scored by due_at; a worker loop continuously pops due IDs, marks them IN FLIGHT, and POSTs the signed payload. The circuit breaker wraps the upstream client so repeated failures short-circuit the dispatcher, and a separate crash-reaper keeps the system self-healing after restarts.",
    diagram:
      "  ┌─────────┐    enqueue    ┌──────────┐\n  │  Client  │──────────────▶│ FastAPI  │\n  └─────────┘               └────┬─────┘\n                                 │ PENDING\n                                 ▼\n                          ┌──────────────┐\n                          │ PostgreSQL   │  (source of truth)\n                          └──────┬───────┘\n                                 │ due_at\n                                 ▼\n                          ┌──────────────┐\n                          │ Redis ZSET    │  (delay queue)\n                          └──────┬───────┘\n                                 │ pop due\n                                 ▼\n                          ┌──────────────┐   ◀── HALF-OPEN\n                          │   Worker     │      │   probe\n                          │  IN FLIGHT   │──────┘\n                          └──────┬───────┘\n                                 │ POST + HMAC-SHA256\n                                 ▼\n                       ┌──────────────────┐\n                       │  Circuit Breaker  │── 5 fails ─▶ OPEN (60s)\n                       │  ─────────────── │\n                       │  DELIVERED ◀──┐  │\n                       │  DEAD     ◀──┐│  │\n                       └──────────────┼┘\n                          retry 2s→32s  │\n                          max 5 attempts│\n                                       ▼\n                              ┌──────────────┐\n                              │   Reaper     │  every 30s: rescue stale jobs\n                              │  (recovery)  │\n                              └──────────────┘",
    github: "https://github.com/Zyrexam/Webhook-Delivery-System",
    hero: "/heroes/webhook-delivery-system.svg",
    icon: "webhook",
    accent: "#007acc",
    featured: true,
  },
  {
    id: "payment-idempotency-proxy",
    name: "payment-idempotency-proxy",
    category: "Systems-Programming",
    tagline: "Exactly-once payment execution with Redis SET NX + Lua atomic release",
    description:
      "A stateless payment proxy on FastAPI + Redis + PostgreSQL + Docker that prevents duplicate charges via Redis-backed distributed locks, response caching, and a tamper-resistant audit trail. 20 concurrent requests with the same Idempotency-Key produce exactly one transaction in PostgreSQL — zero duplicates.\n\nThe proxy uses Redis SET NX with a Lua atomic-release script to fence duplicate writers: the first request acquires the lock and proceeds; concurrent siblings either get the cached response (sub-millisecond) or block until the original completes. SHA-256 hashing of the request body catches key-reuse with a different payload, and a 24-hour Redis response cache absorbs 95.9% of repeat reads. Every request lands in PostgreSQL with amounts stored in cents, Pydantic-validated, and exposed as 20+ Prometheus metrics feeding an importable Grafana dashboard. The full stack — app, Postgres, Redis, Prometheus, Grafana — boots with one `docker compose up`.",
    tech: ["FastAPI", "Redis", "PostgreSQL", "Docker", "Prometheus", "Grafana", "Lua", "Pydantic"],
    metrics: [
      { label: "Concurrent reqs", value: "20" },
      { label: "Duplicate charges", value: "0" },
      { label: "Cache hit rate", value: "95.9%" },
      { label: "Prometheus metrics", value: "20+" },
    ],
    features: [
      "Redis SET NX + Lua atomic release prevents concurrent duplicate writes",
      "20 simultaneous requests → exactly 1 transaction, zero duplicates",
      "24-hour Redis response cache with 95.9% hit rate",
      "SHA-256 request-body hashing for tamper detection on key reuse",
      "PostgreSQL audit trail with amounts in cents + Pydantic validation",
      "20+ Prometheus metrics + importable Grafana dashboard",
      "One-command deploy via Docker Compose (5 services)",
      "Load-test scripts for realistic payment traffic and steady-state graphs",
    ],
    architecture:
      "An idempotency-key lookup hits Redis first; on miss, SET NX acquires a lease and the request proceeds to PostgreSQL. A Lua script releases the lease atomically and writes the response digest back. Duplicate requests either return the cached response (hit) or block until the original completes (miss-but-locked).",
    diagram:
      "  20 concurrent requests (same idempotency-key)\n  ─────┬─────┬─────┬─────┬─────\n       │     │     │     │\n       ▼     ▼     ▼     ▼\n     ┌────────────────────────┐\n     │  Redis: GET idem:<key>  │\n     │  (SHA-256 hashed)       │\n     └────────────┬───────────┘\n           HIT ────┼──── MISS\n           │       │       │\n      return      │   SET NX lock (atomic)\n      cached      │       │\n      95.9%       ▼       ▼\n              ┌─────────┐  ┌──────────┐\n              │  block  │  │  proceed  │\n              │ (wait)  │  │  to PG    │\n              └────┬────┘  └─────┬────┘\n                   │             │ commit\n                   │             ▼\n                   │      ┌──────────┐\n                   └──────│  Lua:    │\n                          │ release  │\n                          │ + cache  │\n                          │  digest  │\n                          └──────────┘\n                  result: exactly 1 transaction",
    github: "https://github.com/Zyrexam/payment-idempotency-proxy",
    notes: [
      "// the Lua release script MUST be atomic — the day two writers slipped through the lock is why I'll never trust a non-atomic release again",
      "// amounts are stored in cents. floats in money are how you end up owing someone $0.0000001",
    ],
    hero: "/heroes/payment-idempotency-proxy.svg",
    icon: "shield",
    accent: "#4ec9b0",
    featured: true,
  },
  {
    id: "well-log-analyzer",
    name: "Well-Log-Analyzer",
    category: "AWS-Projects",
    tagline: "LAS data platform with AI geology assistant grounded in real engineering ratios",
    description:
      "OneGeo — an engineering-grade subsurface data platform for ingesting, visualizing, and interpreting Log ASCII Standard (LAS) well data. Full-stack React + FastAPI + PostgreSQL + AWS S3 + Groq (Llama 3.3-70B).\n\nIntelligent Windowed Downsampling computes the full-resolution peaks and averages server-side, then ships only a viewport-sized sample to the browser — cutting frontend render latency by 90% on 50,000+ rows across 100+ channels while keeping the trends correct. The backend sustains 10,000+ rows/sec through async pipelines. AWS S3 holds the datasets with a local-folder fallback when S3 isn't configured. GeoBot is a Groq-powered assistant that answers geology questions grounded in real-time engineering ratios (e.g. Gas Wetness) computed from the live data — so the LLM cites the actual spikes, not hallucinations. Reports generate in under 2 seconds.",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "AWS S3", "Groq", "Llama 3.3"],
    metrics: [
      { label: "Rows", value: "50,000+" },
      { label: "Channels", value: "100+" },
      { label: "Frontend latency", value: "−90%" },
      { label: "Throughput", value: "10k rows/s" },
    ],
    features: [
      "LAS 2.0 ingestion — full parsing of ~WELL, ~CURVE, ~ASCII blocks",
      "Intelligent Windowed Downsampling — 90% frontend latency reduction",
      "10,000+ rows/sec backend throughput via async pipelines",
      "AWS S3 storage with automatic local-folder fallback",
      "GeoBot: Groq (Llama 3.3-70B) assistant grounded in real engineering ratios",
      "Streaming responses + persistent chat history",
      "Depth-brush interactive charts with zoom",
      "Hydrocarbon-potential and formation analysis reports in <2s",
    ],
    architecture:
      "React streams 50k+ rows from FastAPI via windowed downsampling — only the visible viewport's resolution is fetched, cutting render latency by 90%. The backend reads from PostgreSQL + AWS S3 and sustains 10k rows/sec. GeoBot proxies geology questions to Groq's Llama 3.3-70B with hard evidence (computed Gas Wetness etc.) prepended so the LLM cites the real spikes.",
    diagram:
      "  ┌────────────┐   stream    ┌──────────────┐\n  │  AWS S3    │◀───────────│   FastAPI    │\n  │  (datasets)│             │   backend    │\n  │  + local   │             │  10k rows/s  │\n  │  fallback  │             └──────┬───────┘\n  └────────────┘                    │ windowed\n                                    │ downsampling\n                                    ▼\n                          ┌──────────────────┐\n                          │   PostgreSQL     │\n                          │  50k rows × 100  │\n                          │   channels       │\n                          └────────┬─────────┘\n                                   │ viewport sample\n                                   ▼\n                          ┌──────────────────┐\n                          │  React frontend  │\n                          │  −90% latency    │\n                          └────────┬─────────┘\n                                   │ query + ratios\n                                   ▼\n                          ┌──────────────────┐\n                          │  GeoBot (Groq)   │\n                          │  Llama 3.3-70B   │\n                          └──────────────────┘",
    github: "https://github.com/Zyrexam/Well-Log-Analyzer",
    live: "https://well-log-analyzer.vercel.app/",
    hero: "/heroes/well-log-analyzer.svg",
    icon: "chart",
    accent: "#dcdcaa",
  },
  {
    id: "turbotts-proxy",
    name: "TurboTTS-Proxy",
    category: "Systems-Programming",
    tagline: "Caching proxy that all but eliminates OpenAI TTS cold-start — 320ms to <2ms on warm hits",
    description:
      "A Go-based gRPC proxy in front of OpenAI TTS that brings cold Time-To-First-Audio-Byte from 320ms to under 2ms on cache hits via intelligent TTS audio-chunk caching in Redis. Designed for real-time AI voice agents where every millisecond of latency is user-perceptible.\n\nThe proxy hashes the inbound TTS request (text + voice + params) with SHA-256, looks it up in Redis, and on a miss streams the request to OpenAI while concurrently populating the cache for future hits. Chunked binary streaming over HTTP/2 keeps the connection pool small. The whole stack is containerized and orchestrated on Kubernetes with ConfigMaps, Secrets, multi-stage Docker builds, and HTTP/2 keepalives — production-grade deployment from day one.",
    tech: ["Go", "gRPC", "Redis", "Kubernetes", "Docker", "HTTP/2", "OpenAI TTS"],
    metrics: [
      { label: "Cold TTFA", value: "320ms → <2ms" },
      { label: "Cache hits", value: "near-instant" },
      { label: "Transport", value: "HTTP/2 streaming" },
    ],
    features: [
      "320ms → <2ms cold TTFA on cache hits",
      "SHA-256 key hashing of (text + voice + params)",
      "Asynchronous cache population on miss",
      "Chunked binary streaming over HTTP/2",
      "gRPC service with persistent bidirectional streams",
      "Kubernetes deployment with ConfigMaps + Secrets",
      "Multi-stage Docker builds for minimal image size",
      "HTTP/2 keepalives to keep the connection pool small",
    ],
    architecture:
      "The proxy hashes the inbound TTS request (text + voice + params) with SHA-256 and checks Redis. On a miss it streams the request to OpenAI TTS while concurrently writing the response into Redis for future hits. HTTP/2 multiplexing keeps the connection pool small. Kubernetes ConfigMaps handle config, Secrets hold the OpenAI key.",
    diagram:
      "  client request (text + voice + params)\n           │\n           ▼\n  ┌──────────────────┐\n  │  TTS Proxy (Go)  │\n  │  SHA-256 key     │\n  └────────┬─────────┘\n           │ GET idem:<hash>\n           ▼\n     ┌───────────┐  HIT  ───────▶ return cached (<2ms)\n     │   Redis    │\n     │   cache    │  MISS\n     └───────────┘\n           │\n           ▼  gRPC stream + async cache write\n     ┌───────────────┐\n     │  OpenAI TTS   │  (320ms cold)\n     │  HTTP/2 pool  │\n     └───────────────┘\n           │\n           ▼  populate cache\n     ┌───────────────┐\n     │  Kubernetes   │\n     │  ConfigMaps   │\n     │  + Secrets    │\n     └───────────────┘",
    github: "https://github.com/Zyrexam/TTS-Proxy",
    notes: [
      "// identical requests never reach OpenAI twice — text+voice+params hashed with SHA-256 into the cache key",
      "// the <2ms is just Redis and a warm cache; the real work was making misses not wreck the p99",
    ],
    hero: "/heroes/turbotts-proxy.svg",
    icon: "bolt",
    accent: "#569cd6",
    featured: true,
  },
  {
    id: "cloudvault",
    name: "CloudVault",
    category: "Java-Projects",
    tagline: "Sub-500ms cloud storage under 50 concurrent users, secured end-to-end",
    description:
      "A full-stack file-management platform on Java 17 + Spring Boot 3 + React, backed by GCP Cloud Storage and Firebase Realtime DB. Achieves sub-500ms upload latency for 10MB files under 50 concurrent users through Spring's reactive multipart streaming — the backend never blocks on I/O.\n\nFirebase Authentication (ID-token verified on every request) gates the API; Firebase Realtime DB holds per-user file metadata; GCP Cloud Storage holds the actual bytes. Private buckets and stateless Spring Security keep the service account credentials off the frontend. Files can be uploaded, downloaded, starred, deleted, and listed with real-time usage tracking.",
    tech: ["Java 17", "Spring Boot 3", "React", "Firebase", "GCP", "Maven"],
    metrics: [
      { label: "Upload latency", value: "<500ms" },
      { label: "File size", value: "10MB" },
      { label: "Concurrency", value: "50 users" },
    ],
    features: [
      "Sub-500ms upload latency for 10MB files under 50 concurrent users",
      "GCP Cloud Storage for files, Firebase Realtime DB for metadata",
      "Firebase ID-token authentication on every API call",
      "Stateless Spring Security with private GCP buckets",
      "Real-time storage usage tracking per user",
      "Star, list, download, delete file operations",
      "Reactive Spring Boot multipart streaming",
      "CORS configured for frontend-backend split",
    ],
    architecture:
      "A Spring Boot REST API accepts multipart uploads with Firebase ID-token auth. Files stream reactively to GCP Cloud Storage while metadata is written to Firebase Realtime DB. 50 concurrent users each uploading 10MB complete in under 500ms thanks to non-blocking I/O.",
    diagram:
      "  50 concurrent users\n  ───┬───┬───┬───┬───\n     │   │   │   │\n     ▼   ▼   ▼   ▼\n  ┌──────────────────┐\n  │  Firebase Auth   │  ID-token verify\n  │  (ID tokens)     │\n  └────────┬─────────┘\n           │ verified\n           ▼\n  ┌──────────────────┐\n  │  Spring Boot     │  reactive\n  │  REST API        │  multipart\n  └─────┬───────┬────┘\n        │       │\n   file │       │ metadata\n        ▼       ▼\n  ┌──────────┐  ┌──────────────┐\n  │  GCP     │  │  Firebase    │\n  │  Cloud   │  │  Realtime DB │\n  │  Storage │  │  (metadata)  │\n  └──────────┘  └──────────────┘\n   sub-500ms for 10MB × 50 users",
    github: "https://github.com/Zyrexam/CloudVault.git",
    hero: "/heroes/cloudvault.svg",
    icon: "cloud",
    accent: "#c586c0",
  },
  {
    id: "spring-email-scheduler",
    name: "Spring-EmailScheduler",
    category: "Java-Projects",
    tagline: "Timezone-aware Quartz scheduler with retries, templates, and crash recovery",
    description:
      "A fault-tolerant scheduled-email system on Java 17 + Spring Boot 3 + Quartz + MySQL. Supports 50+ concurrent timezone-aware jobs with sub-second execution delays, automatic job recovery after restarts (via Quartz JDBC store), and a 3-attempt retry policy (30s apart) before marking a job FAILED.\n\nJobs persist in MySQL across application restarts. Each job carries the recipient, subject, optional HTML body, timezone, fire-time, and an optional template (`WELCOME`, `REMINDER`) with a recipient name — credentials live in `.env` and never in source. A single-file vanilla JS UI on top of the API gives a live view of pending, sent, failed, and cancelled jobs. Spring Mail + Gmail SMTP handles delivery.",
    tech: ["Java 17", "Spring Boot 3", "Quartz", "MySQL", "Spring Mail"],
    metrics: [
      { label: "Concurrent jobs", value: "50+" },
      { label: "Execution delay", value: "<1s" },
      { label: "Retry policy", value: "3 × 30s" },
    ],
    features: [
      "50+ concurrent timezone-aware email jobs",
      "Sub-second execution delays via Quartz thread pool",
      "Quartz JDBC store — jobs survive application restarts",
      "3-attempt retry with 30s delay, then mark FAILED",
      "Optional HTML body with templates (WELCOME, REMINDER)",
      "Credentials in .env, never in source",
      "Single-file vanilla JS UI for live job inspection",
      "Status lifecycle: PENDING → SENT | FAILED | CANCELLED",
    ],
    architecture:
      "Quartz schedules 50+ timezone-aware email jobs in a persistent MySQL job store. A scheduler thread pool executes jobs with sub-second delays; on a failed send, Quartz retries 3 times 30 seconds apart before marking the job FAILED. On app restart, Quartz automatically recovers misfired jobs via the database snapshot.",
    diagram:
      "  ┌────────────────────────────┐\n  │  50+ scheduled jobs         │\n  │  (TZ-aware: IST · EST · …)  │\n  └─────────────┬──────────────┘\n                │ cron triggers\n                ▼\n  ┌────────────────────────────┐\n  │  Quartz Scheduler          │\n  │  thread pool (sub-second)  │\n  └─────────────┬──────────────┘\n          │             │\n     execute        persist\n          │             │\n          ▼             ▼\n  ┌──────────┐  ┌──────────────┐\n  │  SMTP    │  │  MySQL       │\n  │  send    │  │  job store   │\n  │  email   │  │  (recovery)  │\n  └──────────┘  └──────────────┘\n          │\n      on restart\n          ▼\n  ┌──────────────────┐\n  │  auto-recover    │\n  │  misfired jobs   │\n  └──────────────────┘",
    github: "https://github.com/Zyrexam/Spring-EmailScheduler.git",
    hero: "/heroes/spring-email-scheduler.svg",
    icon: "mail",
    accent: "#ce9178",
  },
  {
    id: "secure-contract-pipeline",
    name: "Smart-Contract-Pipeline",
    category: "Experiments",
    tagline: "NL → secure Solidity with three-stage LLM pipeline + Docker static analysis",
    description:
      "BlockBenchLLM — an end-to-end system that converts natural-language requirements into production-ready, secure Solidity smart contracts through a three-stage pipeline.\n\nStage 1 extracts structured intent (validated JSON) from a free-form prompt. Stage 2 generates Solidity with rule-constrained prompting. Stage 3 runs Docker-based static analysis (Slither, Mythril, Semgrep, Solhint), prioritizes findings by severity, and iteratively applies LLM-driven auto-fix to resolve critical, high, and medium issues — re-verifying after every patch. The full pipeline is reproducible, benchmarked against manual LLM generation, and resource-profiled for CPU/memory/runtime.",
    tech: ["Solidity", "Python", "Docker", "Slither", "Mythril", "Semgrep", "LLM"],
    metrics: [
      { label: "Pipeline phases", value: "3" },
      { label: "Static analyzers", value: "4" },
      { label: "Auto-fix severity", value: "critical / high / medium" },
    ],
    features: [
      "Stage 1: validated-JSON intent extraction from natural language",
      "Stage 2: rule-constrained Solidity generation",
      "Stage 3: Docker-based static analysis (Slither, Mythril, Semgrep, Solhint)",
      "Iterative LLM-driven auto-fix with re-verification after every patch",
      "Severity-prioritized findings (critical / high / medium)",
      "Benchmarked vs. manual LLM generation (pipeline_vs_manual)",
      "Resource profiling (CPU / memory / runtime)",
      "Reproducible outputs under pipeline_outputs/<timestamp>/",
    ],
    architecture:
      "A three-stage pipeline turns natural-language contract specs into deployable Solidity. Phase 1 extracts intent; phase 2 generates Solidity; phase 3 runs Slither + Mythril + Semgrep + Solhint static analysis, then an LLM patches detected vulnerabilities and re-verifies until clean. All tools run in Docker for reproducibility.",
    diagram:
      "  ┌─────────────────┐\n  │  Natural Lang    │  \"escrow that releases\n  │  spec            │   on shipment\"  ◀── stage 1\n  └────────┬────────┘\n           │ extract intent (JSON)\n           ▼\n  ┌─────────────────┐\n  │  Solidity        │  generated contract\n  │  generator       │  ◀── stage 2\n  └────────┬────────┘\n           │\n           ▼  ◀── stage 3: harden\n  ┌─────────────────┐\n  │  Slither         │──┐\n  │  Mythril         │──┤ Docker static\n  │  Semgrep         │──┤ analysis\n  │  Solhint         │──┘\n  └────────┬────────┘\n           │ severity-ranked findings\n           ▼\n  ┌─────────────────┐\n  │  LLM patcher     │  auto-fix\n  │  (re-verify)     │  critical / high / medium\n  └────────┬────────┘\n           │\n           ▼  loop until clean\n  ┌─────────────────┐\n  │  Secure Solidity │  ✓ deployable\n  └─────────────────┘",
    github: "https://github.com/Zyrexam/Smart-Contract-Pipeline-1.git",
    hero: "/heroes/smart-contract-pipeline.svg",
    icon: "shield-check",
    accent: "#4ec9b0",
  },
  {
    id: "fedmeet",
    name: "FedMeet",
    category: "Experiments",
    tagline: "Federated multi-sensor activity recognition — published at ACM ICDCN '26",
    description:
      "A federated learning framework for human activity recognition using multi-sensor IMU data from smartwatches and earables. FedMeet federates on-device engagement models with the Flower framework, using a gated sensor-fusion mechanism to weight non-IID client updates and handle heterogeneous sensor distributions.\n\nThe aggregated global model reaches 87.97% accuracy — beating FedProx, FedPer, and ClusterFL on the same benchmarks — while keeping all sensor data on-device (no raw data leaves the user's wearable). Co-authored with collaborators and published at ACM's 27th International Conference on Distributed Computing and Networks (ICDCN '26).",
    tech: ["Python", "Flower", "BiLSTM", "Federated Learning", "XGBoost", "ONNX"],
    metrics: [
      { label: "Accuracy", value: "87.97%" },
      { label: "Beats", value: "FedProx / FedPer / ClusterFL" },
      { label: "Venue", value: "ACM ICDCN '26" },
    ],
    features: [
      "87.97% accuracy on multi-sensor activity recognition",
      "Gated sensor fusion handles non-IID client distributions",
      "Multi-sensor IMU: smartwatch + earables",
      "On-device training — raw sensor data never leaves the wearable",
      "Built on the Flower federated-learning framework",
      "BiLSTM backbone with XGBoost + ONNX inference",
      "Outperforms FedProx, FedPer, and ClusterFL on the same benchmarks",
      "Co-authored and published at ACM ICDCN '26",
    ],
    architecture:
      "FedMeet federates IMU-sensor engagement models across meeting clients using Flower. A gated sensor fusion mechanism weights non-IID client updates, handling heterogeneous sensor distributions. The aggregated global model reaches 87.97% accuracy — beating FedProx, FedPer, and ClusterFL — and was published at ACM ICDCN '26.",
    diagram:
      "  ┌─────────┐  ┌─────────┐  ┌─────────┐\n  │ client A│  │ client B│  │ client C│   (non-IID)\n  │ IMU data│  │ IMU data│  │ IMU data│\n  │ smartwatch│ │ earables│  │  mix    │\n  └────┬────┘  └────┬────┘  └────┬────┘\n       │ local      │ local      │ local\n       │ train      │ train      │ train\n       ▼            ▼            ▼\n  ┌──────────────────────────────────┐\n  │   Gated sensor fusion (weights)  │\n  │   handles non-IID distributions  │\n  └──────────────┬───────────────────┘\n                 │ aggregate (Flower)\n                 ▼\n          ┌───────────┐\n          │  Flower    │  global model\n          │  server    │  87.97% acc\n          └─────┬─────┘\n                │ beats: FedProx · FedPer · ClusterFL\n                ▼\n          ┌───────────┐\n          │  ACM      │  dl.acm.org\n          │  ICDCN '26│\n          └───────────┘",
    paper: "https://dl.acm.org/doi/10.1145/3772290.3772295",
    github: "https://github.com/Zyrexam/SensorFlow-Model.git",
    hero: "/heroes/fedmeet.svg",
    icon: "cpu",
    accent: "#9cdcfe",
  },
  {
    id: "url-shortener",
    name: "url-shortener",
    category: "Systems-Programming",
    tagline: "FastAPI URL shortener with Snowflake IDs, Redis cache, and rate-limited redirects",
    description:
      "A compact URL-shortening service on FastAPI + PostgreSQL + Redis. POST /shorten generates a Snowflake ID, encodes it in base62, stores the mapping in PostgreSQL, and caches it in Redis (1h TTL). GET /{code} checks Redis first, falls back to PostgreSQL (with a Redis lock to prevent cache stampedes), and responds with a 302 redirect to the original URL — or 404 if the code doesn't exist.\n\nRate-limited per client IP via SlowAPI (fixed window): 5 requests/sec on GET, 1 request/sec on POST. Idempotent on duplicates: shortening the same URL twice returns the existing code. Runs locally with one `docker compose up` for Postgres + Redis.",
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "SlowAPI", "Snowflake", "Python"],
    metrics: [
      { label: "GET rate limit", value: "5 req/s" },
      { label: "POST rate limit", value: "1 req/s" },
      { label: "Cache TTL", value: "1h" },
      { label: "ID format", value: "Snowflake → base62" },
    ],
    features: [
      "Snowflake ID generation encoded to base62 short codes",
      "Idempotent: shortening the same URL returns the existing code",
      "Redis cache (1h TTL) with single-flight lock to avoid stampedes",
      "SlowAPI per-IP rate limiting: 5 req/s GET, 1 req/s POST",
      "302 redirect on hit, 404 on miss",
      "Async SQLAlchemy with connection pooling",
      "One-command local stack: docker compose up",
      "Pydantic request/response validation",
    ],
    architecture:
      "POST /shorten generates a Snowflake ID, encodes it in base62, stores (short, original) in PostgreSQL, and writes through to Redis with a 1h TTL. GET /{code} checks Redis first; on miss it acquires a short Redis lock so only one request reaches PostgreSQL, then caches the result back. Duplicate POSTs return the existing code without consuming a new ID.",
    diagram:
      "  POST /shorten  (url)\n         │\n         ▼\n  ┌──────────────┐\n  │  Snowflake ID │  → base62 code\n  └──────┬───────┘\n         │ INSERT\n         ▼\n  ┌──────────────┐     ┌──────────────┐\n  │  PostgreSQL  │◀────│    Redis     │  (1h TTL cache)\n  │  (audit log) │     └──────┬───────┘\n  └──────────────┘            │\n                             ▼  GET /{code} → 302 redirect\n                       (lock on miss\n                        prevents stampede)",
    hero: "/heroes/url-shortener.svg",
    github: "https://github.com/Zyrexam/Url-Shortner",
    notes: [
      "// double-checked locking on GET /{code}: one request rebuilds the cache, everyone else waits. without it, a cold cache is a stampede",
      "// shortening the same URL twice returns the same code — minting a second Snowflake ID for the same target is just waste",
    ],
    icon: "link",
    accent: "#007acc",
    featured: true,
  },
  {
    id: "edgecraft-cdn",
    name: "EdgeCraft-CDN",
    category: "Systems-Programming",
    tagline: "Learning-focused CDN simulator in C++17 — LRU + TTL edge caching with round-robin routing",
    description:
      "A C++17 CDN simulator built to learn and demonstrate the mechanics of a real CDN. The system models Client → Router (round-robin load balancer) → 3 Edge Servers (LRU + TTL cache) → Origin Server, all in-process.\n\nEach edge maintains an LRU cache (doubly-linked list + hash map for O(1) operations) with TTL expiration powered by `std::chrono::steady_clock`. Traffic is simulated with a Zipfian distribution (alpha 1.2, 100k requests, 1k files) — the kind of heavy-tail pattern real CDNs see. Measured 99% cache hit rate, 99% origin offload, and ~606k req/sec throughput in the benchmark run. C++17, OOP header/implementation split, no external deps.",
    tech: ["C++17", "LRU Cache", "TTL", "Zipfian Simulation", "OOP"],
    metrics: [
      { label: "Hit rate", value: "99%" },
      { label: "Origin offload", value: "99%" },
      { label: "Throughput", value: "606k req/s" },
      { label: "Edges", value: "3 (Delhi, NY, Mumbai)" },
    ],
    features: [
      "Cache-aside proxy on each edge with LRU + TTL",
      "LRU: doubly-linked list + hash map for O(1) get/put",
      "TTL expiration via std::chrono::steady_clock",
      "Router with round-robin load balancing across edges",
      "Zipfian traffic generator (alpha 1.2) — realistic heavy-tail",
      "Per-edge metrics: requests, hits, misses, hit rate",
      "Origin-server key-value storage layer",
      "No external dependencies — pure C++17",
    ],
    architecture:
      "Client requests hit the Router, which round-robins to one of 3 Edge Servers (Delhi, NY, Mumbai). Each edge checks its LRU+TTL cache; on a miss it forwards to the Origin Server and populates the cache. A Zipfian traffic generator drives the simulation to study cache effectiveness under heavy-tail real-world loads.",
    diagram:
      "  [Client]\n     │\n     ▼\n  [Router / Load Balancer]  (round-robin)\n     │\n     ├──► [Edge Server: Delhi]  ──►  LRU + TTL cache\n     ├──► [Edge Server: NewYork] ──►  LRU + TTL cache\n     └──► [Edge Server: Mumbai]  ──►  LRU + TTL cache\n              │                       (hit? return)\n              │                       (miss? fetch)\n              ▼\n        [Origin Server]\n              │\n              ▼\n        [Key-Value Storage]\n\n  Zipfian traffic generator (alpha=1.2)\n  100k requests · 1k files · 99% hit rate",
    hero: "/heroes/edgecraft-cdn.svg",
    github: "https://github.com/Zyrexam/EdgeCraft-CDN",
    notes: [
      "// virtual nodes aren't magic — they just make the redistribution bill fair when a node joins or dies",
      "// the benchmark matrix taught me the real lesson: hit rate is mostly a statement about how skewed humans are (zipf was right)",
    ],
    icon: "network",
    accent: "#4ec9b0",
    featured: true,
  },
];

export type Publication = {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors: string[];
  abstract: string;
  url: string;
  tags: string[];
};

export const publications: Publication[] = [
  {
    id: "fedmeet-2026",
    title:
      "FedMeet: Personalized Federated Multi-Sensor Fusion for Privacy-Preserving Human Activity Recognition",
    venue: "ACM — 27th Int. Conf. on Distributed Computing and Networks (ICDCN '26)",
    year: "2026",
    authors: ["Ananya Mondal", "Mohit Kumar", "Suchetana Chakraborty"],
    abstract:
      "A federated learning framework for human activity recognition from IMU sensors. A personalized gated multi-sensor fusion mechanism handles non-IID client distributions, achieving 87.97% accuracy and outperforming FedProx, FedPer, and ClusterFL — while keeping all sensor data on-device.",
    url: "https://dl.acm.org/doi/10.1145/3772290.3772295",
    tags: ["Federated Learning", "IMU", "Flower", "Privacy", "Human Activity Recognition"],
  },
  {
    id: "asc-resilience-2026",
    title:
      "Enhancing the resilience of activity-adjusted stake consensus for blockchain-based IoT environments",
    venue: "Theoretical Computer Science (Elsevier)",
    year: "2026",
    authors: ["Susmita Mondal", "Mohit Kumar", "Suchetana Chakraborty"],
    abstract:
      "Proposes resilience improvements to activity-adjusted stake consensus protocols for blockchain-based IoT networks, analysing adversarial tolerance and consensus liveness under realistic IoT device-behaviour models.",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0304397526003208",
    tags: ["Blockchain", "Consensus", "IoT", "Distributed Systems", "Security"],
  },
];

export type Writing = {
  id: string;
  title: string;
  platform: "Medium";
  url: string;
  repo?: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export const writings: Writing[] = [
  {
    id: "ai-twitter-bot",
    title: "I Built an AI Twitter Bot That Runs Itself for Less Than a Penny a Month",
    platform: "Medium",
    url: "https://medium.com/@mohitkumar4922251/i-built-an-ai-twitter-bot-that-runs-itself-for-less-than-a-penny-a-month-cc2a6ac378cd",
    repo: "https://github.com/Zyrexam/serverless-twitter-bot",
    date: "Aug 2026",
    excerpt:
      "How I wired up a fully autonomous AI Twitter bot on a serverless stack that posts, replies, and grows an audience for under a cent a month.",
    tags: ["AI", "Serverless", "Automation", "Twitter API"],
  },
  {
    id: "exactly-once",
    title: "Exactly-Once, Damn It: Building a Payment Idempotency Layer",
    platform: "Medium",
    url: "https://medium.com/@mohitkumar4922251/exactly-once-damn-it-building-a-payment-idempotency-layer-1d21af5a718a",
    date: "Jul 2026",
    excerpt:
      "A deep, practical walk-through of Redis SET NX + Lua atomic release for exactly-once payment semantics — the same engine behind my Payment Idempotency Proxy.",
    tags: ["Distributed Systems", "Redis", "Backend", "Idempotency"],
  },
];

export const contactLinks = [
  { label: "Email", value: "mohitkumar4922251@gmail.com", href: "mailto:mohitkumar4922251@gmail.com", icon: "mail" },
  { label: "GitHub", value: "github.com/Zyrexam", href: "https://github.com/Zyrexam", icon: "github" },
  { label: "LinkedIn", value: "in/mohit-kumar-sp", href: "https://www.linkedin.com/in/mohit-kumar-sp/", icon: "linkedin" },
  { label: "LeetCode", value: "leetcode.com/u/mohitkumar4", href: "https://leetcode.com/u/mohitkumar4/", icon: "code" },
  { label: "Resume", value: "Resume.pdf", href: "/Resume.pdf", icon: "file" },
];