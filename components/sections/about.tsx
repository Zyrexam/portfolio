"use client";

const technologies = [
  { name: "Java / Spring Boot", icon: "devicon-java-plain" },
  { name: "Backend APIs & Systems", icon: "devicon-nodejs-plain" },
  { name: "PostgreSQL / Databases", icon: "devicon-postgresql-plain" },
  { name: "Distributed Systems", icon: "devicon-docker-plain" },
  { name: "Python (ML for Systems)", icon: "devicon-python-plain" },
  { name: "Docker / Cloud", icon: "devicon-docker-plain" },
];

export default function About() {
  return (
    <section id="about" className="space-y-12 py-20">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">01.</span>
          About Me
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <div className="space-y-6">
          <p className="text-slate-300/90 leading-relaxed text-lg font-sans">
            Hello! My name is Mohit, and I focus on building scalable and
            reliable backend systems that solve real-world problems. I’m
            currently pursuing a B.Tech in Computer Science at{" "}
            <span className="text-cyan-400">IIT Jodhpur</span>, where my
            interest in systems engineering grew from understanding how software
            behaves under real-world scale and constraints.
          </p>
          <p className="text-slate-300/90 leading-relaxed text-lg font-sans">
            As an undergraduate researcher, I’ve worked at the intersection of{" "}
            <span className="text-white font-medium">distributed systems</span>{" "}
            and{" "}
            <span className="text-white font-medium">
              applied machine learning
            </span>
            , focusing on communication-efficient architectures, system
            optimization, and privacy-preserving computation. This experience
            strengthened my understanding of scalability, fault tolerance, and
            performance trade-offs in real systems.
          </p>
          <p className="text-slate-300/90 leading-relaxed text-lg font-sans">
            Moving forward, I aim to specialize in{" "}
            <span className="text-white font-medium">
              backend and distributed systems
            </span>
            , building services that are performant, secure, and resilient by
            design. I’m particularly interested in system architecture,
            data-intensive applications, and engineering solutions that scale
            reliably under real-world workloads.
          </p>

          <div className="space-y-4">
            <p className="text-white font-mono text-sm tracking-widest uppercase">
              Expertise & Skills
            </p>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 group text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <span className="text-cyan-400/50 group-hover:text-cyan-400 transition-all font-mono text-xs">
                    0x
                  </span>
                  <span className="font-sans text-base">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image with Premium Frame */}
        <div className="flex items-start justify-center lg:justify-end">
          <div className="relative group max-w-[280px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-slate-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-cyan-500/20 bg-slate-900 shadow-2xl">
              <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-500" />
              <img
                src="/unnamed.jpg"
                alt="Mohit Kumar"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              />
            </div>
            {/* Design overlap */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg -z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
