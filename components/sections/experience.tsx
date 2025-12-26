"use client";

import { useState } from "react";

const experiences = [
  {
    company: "IIT Jodhpur",
    position: "Undergraduate Researcher",
    period: "Jun 2025 - Jul 2025",
    description: [
      "Co-authored research on advanced federated learning strategies (FedPer, FedRep, ClusterFL) and proposed a novel method, FedMeet, achieving 85% accuracy on meeting client sensor data.",
      "Built a meeting engagement recognition system using an IMU-driven XGBoost model converted to ONNX, achieving 91.19% ± 1.22 cross-validation accuracy.",
      "Integrated the ML model into a backend system with a greedy update algorithm to optimize client–server communication and generate productivity feedback using LLMs.",
    ],
  },
  {
    company: "IIT Jodhpur",
    position: "Bachelor Project (Research & Engineering)",
    period: "Sep 2025 - Jan 2026",
    description: [
      "Designed a three-phase automated pipeline to transform natural-language user intent into secure, deployable Solidity smart contracts.",
      "Implemented intent extraction into validated JSON specifications, rule-enforced Solidity generation using OpenZeppelin standards, and automatic repair of compilation issues.",
      "Integrated static and symbolic analysis tools (Slither, Mythril, Semgrep) with LLM-based patching to detect and fix smart contract vulnerabilities.",
      "Performed comparative evaluation against single-phase LLM pipelines, demonstrating improvements in security, reproducibility, and maintainability.",
    ],
  },
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="space-y-12 py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">03.</span>
          Where I've Worked
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Company tabs */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-700/50 min-w-[160px]">
          {experiences.map((exp, idx) => (
            <button
              key={`${exp.company}-${idx}`}
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
          {!experiences[activeIndex] ? (
            <div className="flex items-center justify-center h-full text-slate-500 font-mono">
              Select an experience to view details
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
