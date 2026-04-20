const experiences = [
  {
    company: "IIT Jodhpur",
    position: "Undergraduate Researcher",
    period: "Jun 2025 - Jul 2025",
    description: [
      "Federated learning research with FedMeet, reaching 85% accuracy on meeting client sensor data.",
      "Built an IMU-based engagement system with XGBoost and ONNX, achieving 91.19% cross-validation accuracy.",
      "Integrated the model into backend workflows with communication-aware updates and productivity feedback.",
    ],
  },
  {
    company: "IIT Jodhpur",
    position: "Bachelor Project (Research and Engineering)",
    period: "Sep 2025 - Jan 2026",
    description: [
      "Designed a three-phase pipeline that turns natural-language intent into secure Solidity contracts.",
      "Built validated JSON extraction, rule-constrained generation, and automated compilation repair.",
      "Integrated Slither, Mythril, and Semgrep with LLM-based patching for vulnerability detection and fixes.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="mt-28 max-w-4xl pt-16"
    >
      <div className="section-label mb-10">Experience</div>
      <div className="border-t border-white/8">
        {experiences.map((experience) => (
          <div
            key={`${experience.company}-${experience.period}`}
            className="border-b border-white/8 py-8"
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div className="space-y-4">
                <h3 className="text-[1.55rem] font-semibold tracking-tight text-foreground">
                  {experience.position}
                  <span className="font-serif italic text-[#d3c08a]">
                    {" "}
                    — {experience.company}
                  </span>
                </h3>
                <ul className="max-w-3xl space-y-3 text-lg leading-[1.75] text-muted-foreground">
                  {experience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {experience.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
