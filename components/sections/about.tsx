"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";
import SectionTag from "@/components/section-tag";

const overshoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const smoothOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggered = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const slideUpClip = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: smoothOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: overshoot },
  },
};

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.4, ease: overshoot }}
          className="mb-4"
        >
          <SectionTag label="ABOUT ME" />
        </motion.div>

        <motion.div
          className="about-grid"
          variants={staggered}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="about-tagline font-serif font-bold text-black"
          >
            {about.tagline}
          </motion.h2>

          <div className="about-body">
            <motion.p variants={slideUpClip} className="about-p1">
              {about.paragraphs[0]}
            </motion.p>

            <motion.p variants={slideUpClip} className="about-p2">
              {about.paragraphs[1]}
            </motion.p>

            <motion.div variants={fadeUp} className="currently">
              <div className="currently-head">
                <span className="dot" aria-hidden="true" />
                <span className="eyebrow">Currently</span>
              </div>
              <p className="currently-title">{about.currently.title}</p>
              <p className="currently-detail">{about.currently.detail}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
