"use client";

const projects = [
  {
    id: 1,
    title: "CloudVault – Cloud-Based File Storage",
    description:
      "Designed and implemented a cloud-backed file storage system enabling secure upload, retrieval, and management of user data. Built RESTful backend services with authentication, database persistence, and cloud storage integration, focusing on reliability and clean API design.",
    tags: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Google Cloud Storage",
      "REST APIs",
    ],
    featured: false,
    icon: "cloud-lock",
    links: {
      github: "https://github.com/Zyrexam/CloudVault.git",
    },
  },
  {
    id: 2,
    title: "Email Scheduling Backend",
    description:
      "Developed a backend scheduling service to execute and manage background tasks using time-based triggers. Implemented job persistence, failure handling, and execution monitoring with an emphasis on fault tolerance and system reliability.",
    tags: [
      "Java",
      "Spring Boot",
      "Quartz Scheduler",
      "PostgreSQL",
      "Backend Systems",
    ],
    featured: false,
    icon: "clock-mail",
    links: {
      github: "https://github.com/Zyrexam/Spring-EmailScheduler.git",
    },
  },
  {
    id: 5,
    title: "LLM-Assisted Secure Smart Contract Pipeline",
    description:
      "Designed a three-phase automated pipeline that converts natural-language user intent into secure, production-ready Solidity smart contracts. Implemented intent extraction to structured JSON, rule-enforced Solidity code generation using OpenZeppelin standards, and multi-tool security analysis with automatic vulnerability detection and repair.",
    tags: [
      "Solidity",
      "LLMs",
      "Smart Contracts",
      "Blockchain Security",
      "Static Analysis",
      "Distributed Systems",
    ],
    featured: false,
    icon: "shield-code",
    links: {
      github: "https://github.com/Zyrexam/Smart-Contract-Pipeline-1.git",
    },
  },
  {
    id: 3,
    title: "Federated Learning Framework",
    description:
      "Worked on a federated learning framework to enable decentralized machine learning across multiple clients without sharing raw data. Focused on communication-efficient training, model aggregation strategies, and evaluating performance across heterogeneous environments.",
    tags: [
      "Python",
      "Federated Learning",
      "Distributed Systems",
      "Flower Framework",
    ],
    featured: false,
    icon: "network-brain",
    links: {
      github: "https://github.com/Zyrexam/SensorFlow-Model.git",
    },
  },
  {
    id: 4,
    title: "End-to-End Food Recipe Application",
    description:
      "Built a full-stack food recipe application with user authentication, data storage, and real-time updates. Integrated an Android client with backend services to deliver a complete end-to-end user experience.",
    tags: [
      "Android",
      "Kotlin",
      "Firebase Auth",
      "Realtime DB",
      "Client–Server",
    ],
    featured: false,
    icon: "utensils-book",
    links: {
      github: "https://github.com/Zyrexam/Savor-Recipe-App.git",
    },
  },
];

const allProjects = projects;

interface ProjectsProps {
  showAllProjects?: boolean;
  onToggle?: (show: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Projects({ showAllProjects, onToggle }: ProjectsProps) {
  return (
    <section id="projects" className="space-y-12 py-20">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">03.</span>
          Projects
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      {/* Grid for All Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {allProjects.map((project) => (
          <div
            key={project.id}
            className="group p-8 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all flex flex-col h-full hover:-translate-y-2 duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="text-cyan-400/80 relative">
                <div className="absolute inset-0 blur-xl bg-cyan-500/20 rounded-full" />
                <div className="relative flex items-center justify-center w-14 h-14 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                  {project.icon === "cloud-lock" && (
                    <div className="relative">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  )}
                  {project.icon === "clock-mail" && (
                    <div className="relative">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  {project.icon === "shield-code" && (
                    <div className="relative">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                  )}
                  {project.icon === "network-brain" && (
                    <div className="relative">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                        <circle cx="7" cy="7" r="2" />
                        <circle cx="17" cy="17" r="2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="7" r="2" />
                      </svg>
                    </div>
                  )}
                  {project.icon === "utensils-book" && (
                    <div className="relative">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-all hover:-translate-y-1"
                  aria-label="GitHub Repository"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-slate-500 hover:text-cyan-400/70 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
