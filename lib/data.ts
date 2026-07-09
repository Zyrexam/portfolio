export const personal = {
  name: "Mohit Kumar",
  title: "Backend Engineer",
  education: "IIT Jodhpur · Class of 2026",
  email: "mohitkumar4922251@gmail.com",
} as const;

export const social = {
  github: "https://github.com/Zyrexam",
  linkedin: "https://www.linkedin.com/in/mohit-kumar-sp/",
  leetcode: "https://leetcode.com/u/mohitkumar4/",
  resume:
    "https://drive.google.com/file/d/1jO_o4t87qazcuiZby4zPZweqNSeMX8LO/view?usp=drive_link",
} as const;

export type CTAButton = {
  label: string;
  href: string;
  variant: "primary" | "default";
  badge?: string;
};

export const hero = {
  pulsingDotLabel: "Let's build something great together.",
  subtitle:
    "Backend engineer at IIT Jodhpur — I build distributed systems, async pipelines, and high-throughput APIs that hold up under real load. Open to backend roles.",
  ctaButtons: [
    { label: "Selected work", href: "#projects", variant: "primary" as const },
    { label: "GitHub", href: social.github, variant: "default" as const },
    { label: "LinkedIn", href: social.linkedin, variant: "default" as const },
    {
      label: "LeetCode",
      href: social.leetcode,
      variant: "default" as const,
      badge: "240+",
    },
    { label: "Resume", href: social.resume, variant: "default" as const },
  ] as CTAButton[],
} as const;

export const about = {
  tagline:
    "Backend engineer who builds systems that are simple, reliable, and fast.",
  paragraphs: [
    "I design and build backend infrastructure — distributed systems, async pipelines, and payment-grade APIs. Most of my work lives at the intersection of reliability, performance, and clean system design.",
    "Currently building distributed webhook infrastructure with Redis-backed retry scheduling and circuit breaker patterns.",
  ],
  currently: {
    title: "Distributed webhook infrastructure",
    detail:
      "Redis-backed retry scheduling · exponential backoff · circuit breaker patterns",
  },
} as const;

export type SkillItem = {
  name: string;
  icon: string | null;
  learning?: boolean;
};

export const skillGroups: {
  title: string;
  items: SkillItem[];
  learning?: boolean;
}[] = [
  {
    title: "Languages",
    items: [
      { name: "Java", icon: "FaJava" },
      { name: "Python", icon: "SiPython" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "Kotlin", icon: "SiKotlin" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "SQL", icon: null },
      { name: "Solidity", icon: "SiSolidity" },
    ],
  },
  {
    title: "Frameworks & Cloud",
    items: [
      { name: "React", icon: "SiReact" },
      { name: "FastAPI", icon: "SiFastapi" },
      { name: "Spring Boot", icon: "SiSpringboot" },
      { name: "Redis", icon: "SiRedis" },
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "AWS (S3, EC2)", icon: "FaAws" },
      { name: "GCP", icon: "SiGooglecloud" },
      { name: "REST APIs", icon: null }
    ],
  },
  {
    title: "Tools & DevOps",
    items: [
      { name: "Docker", icon: "SiDocker" },
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "CI/CD", icon: null },
      { name: "Linux", icon: "SiLinux" },
      { name: "Postman", icon: "SiPostman" },
      { name: "GitHub Actions", icon: "SiGithubactions" },
      { name: "Prometheus", icon: "SiPrometheus" },
      { name: "Grafana", icon: "SiGrafana" },
      { name: "IntelliJ IDEA", icon: "SiIntellijidea" },
      { name: "Android Studio", icon: "SiAndroidstudio" },
      { name: "VS Code", icon: "VscVscode" },
      { name: "Ollama", icon: "SiOllama" },
    ],
  },
  {
    title: "Systems & Research",
    learning: true,
    items: [
      { name: "Distributed Systems", icon: null, learning: true },
      { name: "System Design", icon: null, learning: true },
      { name: "Caching Strategies", icon: null, learning: true },
      { name: "Scalability", icon: null, learning: true },
    ],
  },
];

export type Project = {
  id: number;
  title: string;
  type: "github" | "live" | "research";
  featured?: boolean;
  tags: string[];
  description: string;
  github: string;
  live: string | null;
  publication?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Webhook Delivery System",
    type: "github",
    featured: true,
    tags: ["FastAPI", "PostgreSQL", "Redis", "Python"],
    description:
      "Async webhook delivery engine (FastAPI + PostgreSQL + Redis) returning 202 Accepted on ingest. Models lifecycle as PENDING → IN FLIGHT → DELIVERED → DEAD with a watchdog rescuing stale jobs every 30s via updated-at threshold. Exponential backoff retry scheduler (2s → 32s, max 5 attempts) using Redis sorted set as delay queue. Circuit breaker (CLOSED → OPEN → HALF-OPEN) halting delivery after 5 failures with 60s recovery cooldown. Secures payloads with per-subscription HMAC-SHA256 signatures.",
    github: "https://github.com/Zyrexam/Webhook-Delivery-System",
    live: null,
  },
  {
    id: 2,
    title: "Payment Idempotency Proxy",
    type: "github",
    tags: [
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
    description:
      "Stateless payment proxy (FastAPI + Redis + PostgreSQL + Prometheus + Grafana) containerized with Docker Compose — one command deploys all 5 services. Distributed locks via Redis SET NX + Lua atomic release preventing race conditions on concurrent requests; validated 20 simultaneous requests producing exactly 1 transaction with zero duplicate charges. PostgreSQL audit trail (amounts in cents) with Pydantic validation and SHA-256 tamper detection. Redis caching (24h TTL, 95.9% hit rate) with Prometheus metrics exported to Grafana.",
    github: "https://github.com/Zyrexam/payment-idempotency-proxy",
    live: null,
  },
  {
    id: 3,
    title: "Spring Email Scheduler",
    type: "github",
    tags: ["Java", "Spring Boot", "Quartz", "MySQL"],
    description:
      "Fault-tolerant job scheduling system using Spring Boot and Quartz with MySQL-backed persistence. Supports 50+ concurrent timezone-aware tasks with sub-second execution delays, automatic job recovery, and retry mechanisms.",
    github: "https://github.com/Zyrexam/Spring-EmailScheduler.git",
    live: null,
  },
  {
    id: 4,
    title: "Well-Log-Analyzer",
    type: "live",
    tags: ["React", "FastAPI", "Python", "PostgreSQL", "AWS S3", "Groq"],
    description:
      "Full-stack sensor data platform processing 50,000+ rows across 100+ channels. Reduced frontend rendering latency by 90% via Intelligent Windowed Downsampling and hit 10,000+ rows/sec backend throughput with async pipelines. Ships a Groq-powered GeoBot (Llama 3.3-70B) with streaming responses and persistent chat history.",
    github: "https://github.com/Zyrexam/Well-Log-Analyzer",
    live: "https://well-log-analyzer.vercel.app/",
  },
  {
    id: 5,
    title: "CloudVault",
    type: "github",
    tags: ["Java", "Spring Boot", "React", "Firebase", "GCP"],
    description:
      "Full-stack file management platform with Spring Boot and React. Integrated GCP Cloud Storage and Firebase Realtime DB for per-user metadata. Achieved sub-500ms upload latency for 10MB files under 50 concurrent users. Secured with Firebase ID-token auth and stateless Spring Security.",
    github: "https://github.com/Zyrexam/CloudVault.git",
    live: null,
  },
  {
    id: 6,
    title: "Secure Contract Pipeline",
    type: "github",
    tags: ["Solidity", "Python", "Static Analysis", "LLM"],
    description:
      "Automated pipeline for Solidity smart contract generation, vulnerability analysis, and LLM-based patching. Combines static analysis tooling with domain-specific prompting to detect and repair contract vulnerabilities end-to-end.",
    github: "https://github.com/Zyrexam/Smart-Contract-Pipeline-1.git",
    live: null,
  },
  {
    id: 7,
    title: "FedMeet",
    type: "research",
    tags: ["Python", "Flower", "BiLSTM", "Federated Learning"],
    description:
      "Federated learning framework for human activity recognition using multi-sensor IMU data (smartwatch + earables). Implemented gated sensor fusion and BiLSTM to handle non-IID distributions. Achieved 87.97% accuracy — outperforming FedProx, FedPer, and ClusterFL. Co-authored ACM publication.",
    github: "https://github.com/Zyrexam/SensorFlow-Model.git",
    live: "https://dl.acm.org/doi/10.1145/3772290.3772295",
    publication:
      "https://dl.acm.org/doi/10.1145/3772290.3772295",
  },
];

export const experiences = [
  {
    company: "IIT Jodhpur",
    position: "Federated Learning Researcher",
    period: "Jun 2025 — Jul 2025",
    description: [
      "Federated learning research with FedMeet, reaching 85% accuracy on meeting client sensor data.",
      "Built an IMU-based engagement system with XGBoost and ONNX, achieving 91.19% cross-validation accuracy.",
      "Integrated the model into backend workflows with communication-aware updates and productivity feedback.",
    ],
  },
  {
    company: "IIT Jodhpur",
    position: "NLP → Solidity Compiler",
    period: "Sep 2025 — Jan 2026",
    description: [
      "Designed a three-phase pipeline that turns natural-language intent into secure Solidity contracts.",
      "Built validated JSON extraction, rule-constrained generation, and automated compilation repair.",
      "Integrated Slither, Mythril, and Semgrep with LLM-based patching for vulnerability detection and fixes.",
    ],
  },
] as const;

export const contactData = {
  headline: "Open to backend roles, projects, and good teams.",
  subtext: "If you think I might be a fit, feel free to reach out.",
  email: "mohitkumar4922251@gmail.com",
  apiEndpoint: "/api/contact",
} as const;
