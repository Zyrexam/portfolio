"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionTag from "@/components/section-tag";

const overshoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const bulletEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: overshoot, delay: i * 0.1 },
  }),
};

const bulletVariants = {
  hidden: { opacity: 0, x: -10, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.4, ease: bulletEase },
  },
};

function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  return (
    <motion.div
      className="exp-item"
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
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
          <motion.li
            key={item}
            variants={bulletVariants}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.4, ease: overshoot }}
          className="mb-4"
        >
          <SectionTag label="EXPERIENCE" />
        </motion.div>

        <div className="exp-list">
          <span className="exp-spine" aria-hidden="true" />
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.position} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
