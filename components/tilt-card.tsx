"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

export default function TiltCard({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const shared = {
    onMouseMove(e: React.MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      rotateY.set(deltaX * 8);
      rotateX.set(-deltaY * 8);
    },
    onMouseLeave() {
      rotateX.set(0);
      rotateY.set(0);
    },
    style: {
      perspective: 800,
      rotateX: springRotateX,
      rotateY: springRotateY,
    },
    className,
  };

  if (as === "a") {
    return (
      <motion.a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        {...shared}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref}
      {...shared}
    >
      {children}
    </motion.div>
  );
}
