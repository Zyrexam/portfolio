"use client"

export default function Hero() {
  return (
    <section className="space-y-6 py-20">
      <p className="text-cyan-400 font-mono text-sm">Hi, my name is</p>
      <h1 className="text-5xl md:text-7xl font-bold text-white">Your Name.</h1>
      <h2 className="text-4xl md:text-6xl font-bold text-slate-400">I build things for the web.</h2>
      <p className="max-w-2xl text-slate-400 leading-relaxed text-lg">
        I'm a software engineer specializing in building and designing exceptional digital experiences. Currently, I'm
        focused on building accessible, human-centered products.
      </p>
      <button className="px-6 py-3 mt-8 border border-cyan-500 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-colors rounded">
        Check out my course!
      </button>
    </section>
  )
}
