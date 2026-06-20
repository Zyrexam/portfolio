"use client";

import { experiences } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";

function ExperienceItem({
  exp,
  delay,
}: {
  exp: (typeof experiences)[number];
  delay: string;
}) {
  const { ref, isIn } = useReveal();

  return (
    <div
      ref={ref}
      className={`exp-item${isIn ? " is-in" : ""}`}
      style={{
        opacity: isIn ? undefined : 0,
        transitionDelay: delay,
      }}
    >
      <span className="exp-dot" aria-hidden="true" />
      <div className="exp-meta">
        <span className="eyebrow exp-period">{exp.period}</span>
        <div className="exp-org">{exp.company}</div>
      </div>
      <div className="exp-body">
        <h3 className="exp-role">{exp.position}</h3>
        <ul className="exp-bullets">
          {exp.description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref: headRef, isIn: headIn } = useReveal();

  return (
    <section id="experience">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head${headIn ? " is-in" : ""} reveal`}
        >
          <span className="idx">05</span>
          <span className="lbl">Experience</span>
          <span className="end">Selected roles</span>
        </div>

        <div className="exp-list">
          <span className="exp-spine" aria-hidden="true" />

          {experiences.map((exp, i) => (
            <ExperienceItem
              key={exp.position}
              exp={exp}
              delay={`${i * 0.08}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
