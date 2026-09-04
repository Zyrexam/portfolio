"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ─── The one spring language ───────────────────────────────────
   Every interactive motion on the site derives from these.       */

/** Snappy but soft — hovers, small UI. */
export const springUI = { type: "spring", stiffness: 300, damping: 24 } as const;
/** Heavier — layout shifts, cards. */
export const springLayout = { type: "spring", stiffness: 120, damping: 20 } as const;

/** Signature ease — entrances, reveals. Matches Lenis feel. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Slight overshoot — playful accents. */
export const easeOvershoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/* ─── Variants ────────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

/** Masked line reveal — text rises out of an overflow-hidden mask. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Standard in-view trigger for scroll reveals. */
export const inView = { once: true, margin: "-80px 0px" } as const;

/* ─── Components ──────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate every time it enters viewport instead of once. */
  once?: boolean;
};

/** Scroll-triggered fade-up. The default reveal for section content. */
export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: inView.margin }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers <Reveal>-style children. Pair with `item` variants. */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup — fade-up with the group's timing. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
