"use client";

import { useEffect, useRef, useState } from "react";

type UseRevealOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { rootMargin = "-80px 0px", threshold = 0.01 } = options;
  const ref = useRef<T | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsIn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          io.unobserve(el);
        }
      },
      { rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isIn } as const;
}
