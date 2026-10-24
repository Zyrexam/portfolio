"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
      if (event.matches) setVisible(true);
    };

    setReduceMotion(motionPreference.matches);
    motionPreference.addEventListener("change", onMotionPreferenceChange);

    if (motionPreference.matches || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return () => motionPreference.removeEventListener("change", onMotionPreferenceChange);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        setReady(true);
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [delay]);

  const isVisible = !ready || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        transition: reduceMotion ? "none" : `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
