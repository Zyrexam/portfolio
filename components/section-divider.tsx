"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative">
      <motion.span
        className="absolute -top-3 left-0 size-5 bg-[#00D9FF] border-[3px] border-black rotate-12 z-10"
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
      />
      <motion.hr
        className="border-t-[3px] border-black m-0"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}