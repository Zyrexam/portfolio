"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_SIZE = 12;
const TRAIL_SIZE = 48;

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springCursor = useSpring(cursorX, { stiffness: 600, damping: 30 });
  const springCursorY = useSpring(cursorY, { stiffness: 600, damping: 30 });
  const springTrail = useSpring(trailX, { stiffness: 200, damping: 25 });
  const springTrailY = useSpring(trailY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    // Only on client, only on devices with fine pointers (no touch)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Check for prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    setVisible(true);

    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX - CURSOR_SIZE / 2);
      cursorY.set(e.clientY - CURSOR_SIZE / 2);
      trailX.set(e.clientX - TRAIL_SIZE / 2);
      trailY.set(e.clientY - TRAIL_SIZE / 2);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".proj-card") ||
        target.closest(".skill-card") ||
        target.closest(".social-icon") ||
        target.closest(".lc-pill")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  if (!visible) return null;

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springTrail,
          y: springTrailY,
          width: TRAIL_SIZE,
          height: TRAIL_SIZE,
        }}
      >
        <motion.div
          className="w-full h-full border border-white rounded-full"
          animate={{
            scale: hovered ? 1.8 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </motion.div>

      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springCursor,
          y: springCursorY,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
        }}
      >
        <motion.div
          className="w-full h-full bg-white"
          animate={{
            scale: hovered ? 0.5 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </motion.div>
    </>
  );
}
