"use client"

import { useState } from "react"

const experiences = [
  {
    company: "Upstatement",
    position: "Engineer",
    period: "May 2018 - Present",
    description: [
      "Write modern, performant, maintainable code for a diverse array of client and internal projects",
      "Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify",
      "Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis",
    ],
  },
  {
    company: "Scout",
    position: "Developer",
    period: "Dec 2017 - May 2018",
    description: [
      "Developed and shipped production code for client websites with a Rails back-end and Ember front-end",
      "Worked alongside product managers and designers to implement solutions from wireframes and mockups into high-fidelity user experiences",
    ],
  },
  {
    company: "Apple",
    position: "Contractor",
    period: "Jun 2017 - Dec 2017",
    description: [
      "Shipped user-facing Ruby on Rails code responsible for fetching and storing millions of data in a high-scale environment",
      "Architected and implemented a novel RAM and network optimization strategy that improved resource usage and efficiency by 20-30%",
    ],
  },
  {
    company: "Starry",
    position: "Full Stack Developer",
    period: "Jul 2016 - Jan 2017",
    description: [
      "Engineered and maintained major features of cloud-based software as a service (SaaS) products",
      "Owned the release, testing, and deployment of the product for Windows and macOS",
    ],
  },
]

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="experience" className="space-y-8">
      <h2 className="text-3xl font-bold">
        <span className="text-cyan-400 font-mono text-lg">02.</span> Where I've Worked
      </h2>

      <div className="flex gap-8">
        {/* Company tabs */}
        <div className="flex flex-col gap-2 border-l border-slate-600">
          {experiences.map((exp, idx) => (
            <button
              key={exp.company}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 text-left border-l-2 transition-colors -ml-[2px] ${
                activeIndex === idx
                  ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
                  : "border-slate-600 text-slate-400 hover:text-cyan-300"
              }`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Experience details */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {experiences[activeIndex].position}{" "}
              <span className="text-cyan-400">@ {experiences[activeIndex].company}</span>
            </h3>
            <p className="text-slate-400 font-mono text-sm">{experiences[activeIndex].period}</p>
          </div>
          <ul className="space-y-2">
            {experiences[activeIndex].description.map((desc, idx) => (
              <li key={idx} className="flex gap-3 text-slate-300">
                <span className="text-cyan-400 flex-shrink-0">▹</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
