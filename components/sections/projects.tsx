"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionTag from "@/components/section-tag";
import TiltCard from "@/components/tilt-card";

const overshoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const typeLabels: Record<string, string> = {
  github: "GitHub",
  live: "Live",
  research: "Research",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: overshoot, delay: i * 0.08 },
  }),
};

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.4, ease: overshoot }}
          className="mb-4"
        >
          <SectionTag label="SELECTED WORK" />
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px 0px" }}
            >
              <TiltCard
                as="a"
                href={p.publication || p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-card"
              >
                <span className="proj-type-badge">
                  <span className="proj-type-badge-dot" />
                  {typeLabels[p.type]}
                </span>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.shortDescription}</p>
                <div className="proj-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-card-tag">{t}</span>
                  ))}
                </div>
                <p className="proj-card-outcome">{p.outcome}</p>
                <span className="proj-card-link">View &rarr; {typeLabels[p.type]}</span>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
