"use client"

interface WorkProps {
  showAllProjects: boolean
  onToggle: (show: boolean) => void
}

const projects = [
  {
    id: 1,
    title: "Halcyon Theme",
    description:
      "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm2, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
    tags: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
    featured: true,
    image: "/vs-code-theme-interface.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 2,
    title: "Spotify Profile",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
    tags: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
    featured: true,
    image: "/spotify-profile-app.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 3,
    title: "Integrating Algolia Search with WordPress Multisite",
    description: "Building a custom multisite compatible WordPress plugin to build global search with Algolia.",
    tags: ["Algolia", "WordPress", "PHP"],
    image: "/wordpress-plugin.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 4,
    title: "Time to Have More Fun",
    description:
      "A single page web app for helping me choose where to travel. Built with Next.js, Firebase, and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Firebase"],
    image: "/travel-app.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 5,
    title: "Building a Headless Mobile App CMS From Scratch",
    description: "Building a custom headless CMS with Node, Express, Firebase, and Vue to serve a headless mobile app.",
    tags: ["Node", "Express", "Firebase", "Vue"],
    image: "/cms-interface.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 6,
    title: "OctoProfile",
    description:
      "A nicer look at your GitHub profile and repo stats. Includes data visualization of your top languages, starred repositories, and sort through your top repos.",
    tags: ["Next.js", "Chart.js", "GitHub API"],
    image: "/github-profile-viewer.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 7,
    title: "Google Keep Clone",
    description: "A simple Google Keep clone built with Vue and Firebase.",
    tags: ["Vue", "Firebase"],
    image: "/notes-app.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
  {
    id: 8,
    title: "Apple Music Embeddable Web Player Widget",
    description:
      "Embeddable web player widget for Apple Music that lets users log in and listen to full song playback in the browser leveraging MusicKit.js.",
    tags: ["MusicKit.js", "JS", "CSS"],
    image: "/music-player.jpg",
    links: { external: "https://github.com", github: "https://github.com" },
  },
]

const featuredProjects = projects.filter((p) => p.featured)
const otherProjects = projects.filter((p) => !p.featured)

export default function Work({ showAllProjects, onToggle }: WorkProps) {
  return (
    <section id="work" className="space-y-12">
      <h2 className="text-3xl font-bold">
        <span className="text-cyan-400 font-mono text-lg">03.</span> Some Things I've Built
      </h2>

      {/* Featured Projects */}
      <div className="space-y-24">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              idx % 2 === 1 ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 opacity-10" />
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 object-cover hover:opacity-80 transition-opacity"
              />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-cyan-400 font-mono text-sm">Featured Project</p>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-slate-300 bg-slate-800/50 rounded p-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-sm text-cyan-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.links.external} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4 9h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                  </svg>
                </a>
                <a href={project.links.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects Grid */}
      <div className="space-y-8">
        <h3 className="text-xl font-bold">Other Noteworthy Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.slice(0, showAllProjects ? otherProjects.length : 3).map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5c0-1.657 1.343-3 3-3h12c1.657 0 3 1.343 3 3v12c0 1.657-1.343 3-3 3H6c-1.657 0-3-1.343-3-3V5z" />
                </svg>
                <div className="flex gap-2 ml-auto">
                  <a href={project.links.external} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5z" />
                    </svg>
                  </a>
                  <a href={project.links.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931z" />
                    </svg>
                  </a>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-cyan-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show More Button */}
      {!showAllProjects && (
        <div className="flex justify-center">
          <button
            onClick={() => onToggle(true)}
            className="px-6 py-3 border border-cyan-500 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-colors rounded"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  )
}
