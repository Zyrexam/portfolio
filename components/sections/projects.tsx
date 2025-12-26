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
    featured: true,
    image: "/cloudvault.png",
    links: {
      external: "#",
      github: "#",
    },
  },
  {
    id: 2,
    title: "Distributed Task Scheduling Service",
    description:
      "Developed a backend scheduling service to execute and manage background tasks using time-based triggers. Implemented job persistence, failure handling, and execution monitoring with an emphasis on fault tolerance and system reliability.",
    tags: [
      "Java",
      "Spring Boot",
      "Quartz Scheduler",
      "PostgreSQL",
      "Backend Systems",
    ],
    featured: true,
    image: "/scheduler.png",
    links: {
      external: "#",
      github: "#",
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
    image: "/federated-learning.png",
    links: {
      external: "#",
      github: "#",
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
    image: "/recipe-app.png",
    links: {
      external: "#",
      github: "#",
    },
  },
];

const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export default function Projects() {
  return (
    <section id="projects" className="space-y-12 py-20">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">03.</span>
          Projects
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      {/* Featured Projects */}
      <div className="grid grid-cols-1 gap-24">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`flex flex-col ${
              idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-8 group relative`}
          >
            {/* Project Image */}
            <div className="flex-[1.5] relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-800 border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-500 shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Project Info */}
            <div
              className={`flex-1 flex flex-col justify-center space-y-4 z-10 ${
                idx % 2 === 0
                  ? "lg:-ml-12 lg:text-right"
                  : "lg:-mr-12 lg:text-left"
              }`}
            >
              <div className="space-y-1">
                <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                  Featured Project
                </p>
                <h3 className="text-3xl font-serif font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
              </div>

              <div className="bg-slate-800/95 backdrop-blur-md p-6 rounded-lg border border-cyan-500/10 shadow-2xl relative transition-transform hover:-translate-y-1">
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>

              <div
                className={`flex flex-wrap gap-x-4 gap-y-2 ${
                  idx % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                }`}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-cyan-400/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className={`flex gap-6 pt-2 ${
                  idx % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                }`}
              >
                <a
                  href={project.links.github}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid for Other Projects */}
      <div className="pt-32 grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((project) => (
          <div
            key={project.id}
            className="group p-8 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all flex flex-col h-full hover:-translate-y-2 duration-300 shadow-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="text-cyan-400">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <div className="flex gap-4">
                <a
                  href={project.links.github}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-slate-500">
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
