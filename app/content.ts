/**
 * Single source of truth for all site content.
 * Facts mirror mohit-knowledge.md — keep both in sync.
 */

export const owner = {
  name: "Mohit Kumar",
  role: "Backend Engineer",
  school: "IIT Jodhpur '26",
  email: "mohitkumar4922251@gmail.com",
  github: "https://github.com/Zyrexam",
  linkedin: "https://www.linkedin.com/in/mohit-kumar-sp/",
  leetcode: "https://leetcode.com/u/mohitkumar4/",
  resume: "https://drive.google.com/file/d/1pXLCDv9nQ9RU4ABat3Ex25kLmvC21T1t/view?usp=drive_link",
  location: "India",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const announcement = {
  text: "FEDMEET PUBLISHED AT ICDCN '26 — ACM INTERNATIONAL CONFERENCE ON DISTRIBUTED COMPUTING AND NETWORKS",
  link: { label: "READ PAPER", href: "https://dl.acm.org/doi/10.1145/3772290.3772295" },
} as const;

export const hero = {
  lines: ["Simple.", "Reliable.", "Fast."],
  dotAfter: "Fast.",
  lede: "I'm Mohit — a backend engineer who builds distributed systems, async pipelines, and payment-grade APIs where reliability, performance, and clean design meet.",
  ctas: [
    { label: "View work", href: "#work", variant: "action" },
    { label: "Get in touch", href: `mailto:${owner.email}`, variant: "action" },
  ],
} as const;

export const tickerStats = [
  "300+ SPECIFICATIONS",
  "3 PEER-REVIEWED PAPERS",
  "8 PRODUCTION-GRADE SYSTEMS",
  "IIT JODHPUR CLASS OF 2026",
  "1100+ CODEFORCES PUPIL",
  "95.9% CACHE HIT RATE",
  "606K REQ/SEC CDN THROUGHPUT",
  "320MS → <2MS TTFA ON WARM HITS",
] as const;

export const about = {
  headline: "About me",
  body: "Backend engineer who builds systems that are simple, reliable, and fast.\n\nI design and build backend infrastructure — distributed systems, async pipelines, and payment-grade APIs. Most of my work lives at the intersection of reliability, performance, and clean system design.",
  current: {
    label: "Currently building",
    text: "Distributed webhook infrastructure",
    detail: "Redis-backed retry scheduling · exponential backoff · circuit breaker patterns",
  },
} as const;

export const skills = [
  { category: "Languages", abbr: "LA", tier: 3 as const, items: ["Java", "Python", "C++", "Kotlin", "JavaScript", "TypeScript", "SQL", "Solidity", "Go"] },
  { category: "Frameworks & Cloud", abbr: "FC", tier: 2 as const, items: ["React", "FastAPI", "Spring Boot", "Redis", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "AWS (S3, EC2)", "GCP", "REST APIs", "gRPC"] },
  { category: "Tools & DevOps", abbr: "TD", tier: 1 as const, items: ["Docker", "Git", "GitHub", "CI/CD", "Linux", "Postman", "GitHub Actions", "Prometheus", "Grafana", "IntelliJ IDEA", "Android Studio", "VS Code", "Ollama"] },
  { category: "Systems & Research", abbr: "SR", tier: 3 as const, items: ["Distributed Systems", "System Design", "Caching Strategies", "Scalability"] },
] as const;

export const statement = {
  headline:
    "I design systems that stay boring under load — exactly-once payments, resilient delivery, sub-500ms reads.",
  note: "Open to full-time backend roles, research collaborations, and freelance systems work. Currently going deep on caching strategies, system design, and scalability.",
} as const;

export type Project = {
  name: string;
  tier: 1 | 2 | 3;
  tierLabel: string;
  tagline: string;
  body: string;
  metrics: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "payment-idempotency-proxy",
    tier: 3,
    tierLabel: "Payments",
    tagline: "Stateless payment proxy preventing duplicate charges with distributed locks and Redis caching",
    body: "Redis SET NX with a Lua atomic release fences duplicate writers; SHA-256 tamper detection guards payloads and a 24h TTL cache absorbs repeat reads. Prometheus metrics + Grafana dashboards.",
    metrics: ["20 CONCURRENT → 1 TRANSACTION", "95.9% CACHE HIT RATE", "SHA-256 TAMPER DETECTION"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/payment-idempotency-proxy" }],
  },
  {
    name: "EdgeCraft-CDN",
    tier: 1,
    tierLabel: "C++",
    tagline: "LRU + TTL edge caching with round-robin routing",
    body: "A dependency-free C++17 CDN simulator — client → router → 3 edge servers → origin — with Zipfian traffic, steady_clock TTL, and O(1) LRU eviction. Pure systems programming, built to learn the lower layers.",
    metrics: ["99% HIT RATE", "99% ORIGIN OFFLOAD", "606K REQ/SEC"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/EdgeCraft-CDN" }],
  },
  {
    name: "url-shortener",
    tier: 2,
    tierLabel: "Systems",
    tagline: "Snowflake-ID shortener with Redis-first redirects",
    body: "FastAPI + PostgreSQL + Redis. POST /shorten mints a Snowflake ID encoded in base62; GET /{code} checks Redis first and falls back to Postgres under a lock that prevents cache stampedes. Duplicate shortens are idempotent.",
    metrics: ["1H REDIS TTL", "302 REDIRECTS", "5 REQ/SEC RATE LIMIT"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/Url-Shortner" }],
  },
  {
    name: "TurboTTS-Proxy",
    tier: 2,
    tierLabel: "Systems",
    tagline: "High-throughput gRPC proxy reducing TTFA for real-time AI voice agents via Redis caching",
    body: "Go + gRPC + Redis on Kubernetes. SHA-256 key hashing with async cache population brings cold time-to-first-audio from 320ms to under 2ms on warm hits, with HTTP/2 keepalives and gRPC streaming.",
    metrics: ["320MS→<2MS COLD TTFA", "SHA-256 KEY HASHING", "KUBERNETES ORCHESTRATED"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/TTS-Proxy" }],
  },
  {
    name: "Webhook-Delivery-System",
    tier: 3,
    tierLabel: "Systems",
    tagline: "Async webhook delivery engine with lifecycle tracking and fault-tolerant retry scheduling",
    body: "FastAPI + PostgreSQL + Redis delivery engine with a PENDING → IN FLIGHT → DELIVERED → DEAD lifecycle, HMAC-SHA256 signed payloads, and a dead-letter queue with manual replay.",
    metrics: ["202 ACCEPTED ON INGEST", "EXPONENTIAL BACKOFF 2S→32S", "CIRCUIT BREAKER WITH 60S COOLDOWN"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/Webhook-Delivery-System" }],
  },
  {
    name: "CloudVault",
    tier: 2,
    tierLabel: "Java",
    tagline: "File management platform achieving sub-500ms upload latency under 50 concurrent users",
    body: "Spring Boot + reactive non-blocking I/O keeps 10MB uploads under 500ms at 50 concurrent users, with Firebase ID-token auth and GCP Cloud Storage.",
    metrics: ["SUB-500MS UPLOAD LATENCY", "GCP CLOUD STORAGE + FIREBASE", "STATELESS SPRING SECURITY"],
    links: [{ label: "GitHub", href: "https://github.com/Zyrexam/CloudVault.git" }],
  },
] as const;

export const moreProjects = {
  label: "More on GitHub",
  note: "Well-Log-Analyzer · Spring-EmailScheduler · Secure-Contract-Pipeline · FedMeet — 10 systems total.",
  href: owner.github,
} as const;

export const experience = [
  {
    role: "Federated Learning Researcher",
    org: "IIT Jodhpur",
    period: "JUN 2025 – JUL 2025",
    location: "JODHPUR, IN",
    points: [
      "Federated learning research with FedMeet, reaching 85% accuracy on meeting client sensor data.",
      "Built an IMU-based engagement system with XGBoost and ONNX, achieving 91.19% cross-validation accuracy.",
      "Integrated the model into backend workflows with communication-aware updates and productivity feedback.",
    ],
    stack: "PYTHON · FLOWER · BILSTM · XGBOOST · ONNX",
  },
  {
    role: "NLP → Solidity Compiler",
    org: "IIT Jodhpur",
    period: "SEP 2025 – JAN 2026",
    location: "JODHPUR, IN",
    points: [
      "Designed a three-phase pipeline that turns natural-language intent into secure Solidity contracts.",
      "Built validated JSON extraction, rule-constrained generation, and automated compilation repair.",
      "Integrated Slither, Mythril, and Semgrep with LLM-based patching for vulnerability detection and fixes.",
    ],
    stack: "SOLIDITY · PYTHON · SLITHER · MYTHRIL · SEMGREP · LLM",
  },
] as const;

export const education = {
  school: "Indian Institute of Technology Jodhpur",
  degree: "B.Tech in Computer Science",
  period: "2022 – 2026",
  coursework: ["Operating Systems", "Database Management Systems", "Computer Networks", "Data Structures & Algorithms", "Distributed Systems", "Compiler Design"],
  achievements: [
    "1100+ Codeforces Pupil",
    "400+ LeetCode Problems Solved",
    "3 Peer-Reviewed Publications",
    "ACM ICDCN '26 Published",
  ],
} as const;

export const publications = [
  {
    title:
      "FedMeet: Personalized Federated Multi-Sensor Fusion for Privacy-Preserving Human Activity Recognition",
    venue: "ACM ICDCN '26",
    href: "https://dl.acm.org/doi/10.1145/3772290.3772295",
  },
  {
    title:
      "Enhancing the resilience of activity-adjusted stake consensus for blockchain-based IoT environments",
    venue: "Theoretical Computer Science (Elsevier)",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0304397526003208",
  },
] as const;

export const writing = [
  {
    title: "I Built an AI Twitter Bot That Runs Itself for Less Than a Penny a Month",
    venue: "MEDIUM · AUG 2026",
    href: "https://medium.com/@mohitkumar4922251/i-built-an-ai-twitter-bot-that-runs-itself-for-less-than-a-penny-a-month-cc2a6ac378cd",
  },
  {
    title: "Exactly-Once, Damn It: Building a Payment Idempotency Layer",
    venue: "MEDIUM · JUL 2026",
    href: "https://medium.com/@mohitkumar4922251/exactly-once-damn-it-building-a-payment-idempotency-layer-1d21af5a718a",
  },
] as const;

export const cta = {
  headline: ["Have a hard", "problem?"],
  copy: "I run toward hard problems without a playbook — payments, caching, CDNs, compilers. If you need systems that don't break, tell me what you're building.",
  button: { label: "Email me", href: `mailto:${owner.email}` },
} as const;

export const footerLockup = ["Simple.", "Reliable.", "Fast."] as const;
