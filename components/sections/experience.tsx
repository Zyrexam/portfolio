"use client";

import { useState } from "react";

const experiences = [
  {
    company: "IIT Jodhpur",
    position: "Undergraduate Researcher",
    period: "Aug 2023 - Present",
    description: [
      "Conducting research on distributed systems and high-performance computing under faculty guidance.",
      "Optimizing backend architectures for low-latency data processing in large-scale environments.",
      "Collaborating with doctoral students to implement novel algorithms in Python and C++.",
    ],
  },
  {
    company: "Software Internship",
    position: "Full Stack Developer Intern",
    period: "May 2024 - July 2024",
    description: [
      "Built and deployed a responsive dashboard using Next.js and PostgreSQL for real-time data visualization.",
      "Refactored legacy REST APIs into GraphQL, reducing payload size by 40% and improving frontend performance.",
      "Collaborated with the design team to implement accessible UI components following WCAG 2.1 guidelines.",
    ],
  },
  {
    company: "Open Source",
    position: "Contributor",
    period: "Jan 2023 - Present",
    description: [
      "Actively contributing to various web-based open-source projects, focusing on performance optimizations.",
      "Fixed critical bugs in community-driven libraries, enhancing stability for thousands of users.",
    ],
  },
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="space-y-12 py-20">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">02.</span>
          Experience
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Company tabs */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-700/50 min-w-[160px]">
          {experiences.map((exp, idx) => (
            <button
              key={exp.company}
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-3 text-left border-b-2 md:border-b-0 md:border-l-2 transition-all whitespace-nowrap font-mono text-sm ${
                activeIndex === idx
                  ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
                  : "border-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/30"
              }`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Experience details */}
        <div className="flex-1 min-h-[320px] animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                {experiences[activeIndex].position}{" "}
                <span className="text-cyan-400">
                  @ {experiences[activeIndex].company}
                </span>
              </h3>
              <p className="text-slate-500 font-mono text-sm tracking-wide">
                {experiences[activeIndex].period}
              </p>
            </div>
            <ul className="space-y-4">
              {experiences[activeIndex].description.map((desc, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 text-slate-300/90 text-lg leading-relaxed group"
                >
                  <span className="text-cyan-400 flex-shrink-0 mt-2 transition-transform group-hover:translate-x-1">
                    ▹
                  </span>
                  <span className="font-sans">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
