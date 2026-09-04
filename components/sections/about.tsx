"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";
import SectionTag from "@/components/section-tag";
import { Reveal, easeOvershoot as overshoot, easeOut as smoothOut } from "@/components/motion";

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
        <Reveal className="mb-4" y={15}>
          <SectionTag label="ABOUT ME" num="01" />
        </Reveal>

        <motion.div
          className="about-grid"
          variants={staggered}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="about-tagline font-serif font-bold text-fg"
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
