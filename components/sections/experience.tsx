"use client";

import { experiences } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";
import SectionTag from "@/components/section-tag";

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
      <div className="exp-head">
        <h3 className="exp-role">{exp.position}</h3>
        <span className="exp-role-underline" />
        <div className="exp-sub">
          <span className="exp-company">{exp.company}</span>
          <span className="exp-period"> · {exp.period}</span>
        </div>
      </div>
      <ul className="exp-bullets">
        {exp.description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {

  return (
    <section id="experience">
      <div className="container">
        <div className="mb-4">
          <SectionTag label="EXPERIENCE" />
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
