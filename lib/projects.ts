export type Project = {
  n: string;
  year: string;
  kicker: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string;
  live?: string;
  stat?: string;
  /** Included in the curated project section. */
  home?: boolean;
  /** Flagship styling — one elevated card. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    n: "01",
    year: "2026",
    kicker: "Video processing",
    title: "VideoScale",
    desc: "VideoScale turns a large video upload into a trackable background job. The API stores the original and records the job, Kafka hands it to a worker, and FFmpeg creates multiple renditions. Each stage updates the job status, so the client can follow progress through completion.",
    tags: ["Spring Boot", "Kafka", "FFmpeg", "MinIO", "PostgreSQL"],
    href: "https://github.com/Zyrexam/VideoScale",
    home: true,
    featured: true,
  },
  {
    n: "02",
    year: "2026",
    kicker: "Workflow orchestration",
    title: "Workflow-Engine",
    desc: "Workflow-Engine runs multi-step Go workflows in a defined order and saves each step to SQLite as it progresses. When a step fails, it retries with exponential backoff; if the process stops, resume continues from the first unfinished step without repeating completed work.",
    tags: ["Go", "SQLite", "Retries", "Crash recovery"],
    href: "https://github.com/Zyrexam/Workflow-Engine",
    home: true,
    featured: true,
  },
  {
    n: "03",
    year: "2026",
    kicker: "Real-time app",
    title: "Summon",
    desc: "Private rooms for end-to-end encrypted chat, video calls, and an on-demand AI assistant.",
    tags: ["TypeScript", "WebRTC", "AES-GCM", "AI"],
    href: "https://github.com/Zyrexam/Summon",
    home: true,
  },
  {
    n: "04",
    year: "2026",
    kicker: "Backend system",
    title: "URL Shortener",
    desc: "Create compact links and redirect quickly with IDs backed by PostgreSQL and Redis caching.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    href: "https://github.com/Zyrexam/Url-Shortner",
    home: true,
  },
  {
    n: "05",
    year: "2026",
    kicker: "Backend system",
    title: "Token-Bucket-Rate-Limiter",
    desc: "Apply per-client and per-endpoint request limits with Redis-backed token buckets.",
    tags: ["Java", "Spring Boot", "Redis", "Lua"],
    href: "https://github.com/Zyrexam/Token-Bucket-Rate-Limiter",
    home: true,
  },
  {
    n: "06",
    year: "2026",
    kicker: "AI infrastructure",
    title: "TTS-Proxy",
    desc: "A Go proxy that streams text-to-speech audio and reuses cached responses.",
    tags: ["Go", "gRPC", "Redis", "Streaming"],
    href: "https://github.com/Zyrexam/TTS-Proxy",
    home: true,
  },
  {
    n: "07",
    year: "2026",
    kicker: "AI retrieval",
    title: "Enterprise RAG Pipeline",
    desc: "Search complex PDFs and generate answers grounded in cited source passages.",
    tags: ["Python", "RAG", "BM25", "Vector Search"],
    href: "https://github.com/Zyrexam/enterprise-rag-pipeline",
    home: true,
  },
  {
    n: "08",
    year: "2026",
    kicker: "Knowledge tool",
    title: "Sourcebook",
    desc: "Ask questions across a focused source collection and get retrieval-backed answers.",
    tags: ["Python", "RAG", "LLMs", "Streamlit"],
    href: "https://github.com/Zyrexam/Sourcebook",
    home: true,
  },
  {
    n: "09",
    year: "2026",
    kicker: "Blockchain research",
    title: "Activity-Adjusted Stake Consensus",
    desc: "Explore an activity-adjusted consensus protocol and how it behaves as validators join or leave.",
    tags: ["Python", "Blockchain", "Consensus", "Node Churn"],
    href: "https://github.com/Zyrexam/AASC---Activity-Adjusted-Stake-Consensus",
    home: true,
  },
  {
    n: "10",
    year: "2026",
    kicker: "Systems simulation",
    title: "EdgeCraft CDN",
    desc: "Simulate edge routing, cache eviction, origin fallback, and request latency in C++.",
    tags: ["C++", "Caching", "LRU", "TTL", "CDN"],
    href: "https://github.com/Zyrexam/EdgeCraft-CDN",
    home: true,
  },
  {
    n: "11",
    year: "2026",
    kicker: "Serverless automation",
    title: "Serverless Twitter Bot",
    desc: "A scheduled AWS workflow that creates developer posts and code images automatically.",
    tags: ["TypeScript", "AWS CDK", "Lambda", "EventBridge", "OpenAI"],
    href: "https://github.com/Zyrexam/serverless-twitter-bot",
    home: true,
  },
];

/** All selected projects are shown on the home page and project archive. */
export const HOME_PROJECTS = PROJECTS.filter((project) => project.home);
