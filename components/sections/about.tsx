"use client";

export default function About() {
  return (
    <section id="about" className="space-y-12 py-24">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">01.</span>
          About Me
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* Left Column - Minimal MK Marker */}
        <div className="space-y-6">
          <div className="p-8 rounded-lg bg-slate-800/10 border border-slate-700/50 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-cyan-500/5 border-2 border-cyan-500/20 flex items-center justify-center">
              <span className="text-3xl font-serif font-bold text-cyan-400">
                MK
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mohit Kumar</h3>
              <p className="text-cyan-500/60 font-mono text-xs uppercase tracking-wider mt-1">
                Software Developer
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-400">
              <svg
                className="w-5 h-5 text-cyan-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs font-mono uppercase tracking-widest">
                India
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <svg
                className="w-5 h-5 text-cyan-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs font-mono uppercase tracking-widest">
                IIT Jodhpur
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Cleaner Bio */}
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-slate-300 leading-relaxed text-lg">
              I’m Mohit, a computer science graduate from{" "}
              <span className="text-cyan-400">IIT Jodhpur</span> focused on
              building{" "}
              <span className="text-white">scalable backend systems</span>. I
              enjoy working close to system internals and understanding how
              software behaves under real-world constraints.
            </p>
            <p className="text-slate-400 leading-relaxed">
              During my research, I explored distributed systems and
              performance-oriented design. I aim to grow as a backend engineer,
              building secure, performant, and maintainable systems that scale
              reliably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-500/80">
                Engineering Approach
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Prioritize simplicity over complexity</li>
                <li>• Design for latency and reliability</li>
                <li>• Write maintainable, readable code</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-500/80">
                Currently Exploring
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Distributed systems, message-driven architectures, and
                microservices scalability.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="https://drive.google.com/uc?export=download&id=1IIoEg_9fFe5Q2cTfudjwlX2-e6fv5t4l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 font-mono text-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all rounded shadow-sm hover:bg-cyan-500/5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
