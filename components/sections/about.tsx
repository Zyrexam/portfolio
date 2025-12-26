"use client"

const technologies = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "Tailwind CSS",
  "GraphQL",
  "Firebase",
]

export default function About() {
  return (
    <section id="about" className="space-y-8">
      <h2 className="text-3xl font-bold">
        <span className="text-cyan-400 font-mono text-lg">01.</span> About Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Hello! I'm passionate about creating things that live on the internet. My interest in web development
            started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a
            custom reblog button taught me a lot about HTML & CSS!
          </p>
          <p className="text-slate-300 leading-relaxed">
            Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge
            corporation, and a student-led design studio. My main focus these days is building accessible, inclusive
            products and digital experiences.
          </p>
          <p className="text-slate-300 leading-relaxed">Here are a few technologies I've been working with recently:</p>
          <div className="grid grid-cols-2 gap-2 pt-4">
            {technologies.map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-slate-300">
                <span className="text-cyan-400">▹</span>
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64 rounded overflow-hidden border-2 border-cyan-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 opacity-20" />
            <img src="/professional-portrait.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
