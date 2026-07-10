"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionTag from "@/components/section-tag";
import TiltCard from "@/components/tilt-card";

const overshoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const shortDescriptions: Record<number, string> = {
  1: "Async webhook delivery engine with lifecycle tracking and fault-tolerant retry scheduling.",
  2: "Stateless payment proxy preventing duplicate charges with distributed locks and Redis caching.",
  3: "Fault-tolerant job scheduling system supporting 50+ concurrent timezone-aware tasks.",
  4: "Full-stack sensor data platform processing 50,000+ rows across 100+ channels.",
  5: "File management platform achieving sub-500ms upload latency under 50 concurrent users.",
  6: "Automated pipeline for Solidity contract generation, vulnerability analysis, and LLM patching.",
  7: "Federated learning framework for activity recognition using multi-sensor IMU data.",
};

const outcomes: Record<number, string> = {
  1: "202 Accepted on ingest · exponential backoff 2s→32s · circuit breaker with 60s cooldown",
  2: "20 concurrent requests → 1 transaction · 95.9% cache hit rate · SHA-256 tamper detection",
  3: "Sub-second execution delays · automatic job recovery · MySQL-backed Quartz persistence",
  4: "90% frontend latency reduction · 10,000+ rows/sec throughput · Groq-powered GeoBot",
  5: "Sub-500ms upload latency · GCP Cloud Storage + Firebase · stateless Spring Security",
  6: "Slither + Mythril + Semgrep integration · LLM-based patch generation · end-to-end pipeline",
  7: "87.97% accuracy · gated sensor fusion · outperforms FedProx, FedPer, ClusterFL",
};

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
                <p className="proj-card-desc">{shortDescriptions[p.id]}</p>
                <div className="proj-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-card-tag">{t}</span>
                  ))}
                </div>
                <p className="proj-card-outcome">{outcomes[p.id]}</p>
                <span className="proj-card-link">View &rarr; {typeLabels[p.type]}</span>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
