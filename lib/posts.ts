import { FEDMEET_PAPER, TCS_PAPER } from "./links";

export type Post = {
  n: string;
  date: string;
  read: "PAPER" | "ESSAY";
  title: string;
  excerpt: string;
  tags: string[];
  href: string;
  /** Shown in the home page Research section. The rest live on /articles. */
  home?: boolean;
};

export const POSTS: Post[] = [
  {
    n: "01",
    date: "ACM ICDCN '26",
    read: "PAPER",
    title:
      "FedMeet: Personalized Federated Multi-Sensor Fusion for Privacy-Preserving Human Activity Recognition",
    excerpt:
      "Peer-reviewed at the ACM International Conference on Distributed Computing and Networks — personalized federated fusion at 85% accuracy, with privacy intact.",
    tags: ["Federated Learning", "HAR"],
    href: FEDMEET_PAPER,
    home: true,
  },
  {
    n: "02",
    date: "ELSEVIER TCS",
    read: "PAPER",
    title:
      "Enhancing the resilience of activity-adjusted stake consensus for blockchain-based IoT environments",
    excerpt:
      "Published in Theoretical Computer Science — hardening activity-adjusted stake consensus for constrained IoT environments.",
    tags: ["Blockchain", "IoT"],
    href: TCS_PAPER,
    home: true,
  },
  {
    n: "03",
    date: "SEP 2026",
    read: "ESSAY",
    title: "My IDE Yelled at My @Autowired — It Was Right",
    excerpt:
      "Eight yellow squiggles, zero broken tests, and the afternoon I stopped writing field injection — why constructor injection makes dependencies visible.",
    tags: ["Spring Boot", "Java"],
    href: "https://medium.com/@mohitkumar4922251/my-ide-yelled-at-my-autowired-it-was-right-43241dd13976",
    home: true,
  },
  {
    n: "04",
    date: "AUG 2026",
    read: "ESSAY",
    title: "I Built an AI Twitter Bot That Runs Itself for Less Than a Penny a Month",
    excerpt:
      "A serverless loop that writes, schedules, and posts on its own for under a cent a month — and the boring infrastructure behind it.",
    tags: ["AI", "Serverless"],
    href: "https://medium.com/@mohitkumar4922251/i-built-an-ai-twitter-bot-that-runs-itself-for-less-than-a-penny-a-month-cc2a6ac378cd",
    home: true,
  },
  {
    n: "05",
    date: "JUL 2026",
    read: "ESSAY",
    title: "Exactly-Once, Damn It: Building a Payment Idempotency Layer",
    excerpt:
      "Distributed locks, Redis SET NX, and the failure modes that make duplicate charges possible — plus how to close them.",
    tags: ["Payments", "Idempotency"],
    href: "https://medium.com/@mohitkumar4922251/exactly-once-damn-it-building-a-payment-idempotency-layer-1d21af5a718a",
  },
];

/** The four entries surfaced on the home page; the full list lives on /articles. */
export const HOME_POSTS = POSTS.filter((p) => p.home);
