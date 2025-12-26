"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.getElementById("cursor-glow");
      if (!glow) return;

      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      glow.style.setProperty("--x", `${e.clientX}px`);
      glow.style.setProperty("--y", `${e.clientY}px`);
      glow.style.setProperty("--glow-opacity", "0.6");

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        glow.style.setProperty("--glow-opacity", "0.25");
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="cursor-glow"
      className="pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-500"
    />
  );
}
