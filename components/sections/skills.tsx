"use client";
const skillCategories = [
  {
    title: "Languages",
    items: [
      "Java",
      "Python",
      "C++",
      "Kotlin",
      "SQL",
      "Solidity",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    title: "Core Backend Strengths",
    items: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "GCP",
      "REST APIs",
    ],
  },
  {
    title: "Databases & Storage",
    items: [
      "PostgreSQL",
      "MySQL",
      "Firebase Realtime DB",
      "Relational Databases",
      "Google Cloud Storage",
    ],
  },
  {
    title: "Android Development",
    items: [
      "Android SDK",
      "Kotlin",
      "Java (Android)",
      "Firebase Authentication",
      "Realtime Database",
      "REST API Integration",
    ],
  },
  {
    title: "Core Foundations",
    items: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Distributed Database Systems",
    ],
  },
  {
    title: "Developer Tools",
    items: [
      "Git & GitHub",
      "Linux / UNIX",
      "Postman",
      "IntelliJ IDEA",
      "Android Studio",
      "VS Code",
      "GitHub Actions",
    ],
  },
  {
    title: "Currently Exploring",
    items: [
      "System Design Fundamentals",
      "Distributed Systems Concepts",
      "Microservices Architecture",
      "Scalability & Load Handling",
      "Caching Strategies",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="space-y-12 py-20">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">02.</span>
          Technical Skills
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-4xl">
        {skillCategories.map((group) => (
          <div
            key={group.title}
            className="group p-6 rounded-lg bg-slate-800/40 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300"
          >
            <h3 className="text-lg font-mono font-medium text-cyan-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-slate-900/50 text-slate-300 rounded text-xs font-mono border border-slate-700/50 
                             transition-all duration-300 cursor-default
                             hover:text-cyan-400 hover:border-cyan-500/20 
                             hover:bg-cyan-500/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
