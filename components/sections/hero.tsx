"use client";

export default function Hero() {
  return (
    <section className="space-y-6 py-24 flex flex-col items-start px-0">
      {/* Intro */}
      <p className="text-cyan-400 font-mono text-sm tracking-widest animate-in fade-in slide-in-from-bottom-3 duration-700">
        Hi, my name is
      </p>

      {/* Name */}
      <div className="space-y-2">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Mohit Kumar
          </span>
        </h1>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-400/80 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          I build scalable, full-stack systems.
        </h2>
      </div>

      {/* Description */}
      <p className="max-w-2xl text-slate-400/90 leading-relaxed text-lg animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
        I’m a <span className="text-white">software developer</span> and
        undergraduate researcher at{" "}
        <span className="text-cyan-400/90">IIT Jodhpur</span>, focused on
        designing and building end-to-end applications — from backend
        architecture and data layers to user-facing interfaces — with an
        emphasis on scalability, performance, and reliability.
      </p>

      {/* CTA */}
      <div className="pt-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
        <a
          href="#projects"
          className="group relative inline-block px-8 py-3 overflow-hidden border border-cyan-500 text-cyan-400 font-mono text-sm transition-all rounded hover:text-white"
        >
          <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10">View my projects →</span>
        </a>
      </div>
    </section>
  );
}
