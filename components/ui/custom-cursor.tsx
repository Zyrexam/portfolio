"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Track mouse position - using refs to persist without re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  // Track follower position (the ring)
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // The dot stays pinned to the mouse
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"]');
      const isTextInput = target.closest("input, textarea");

      if (isClickable) {
        follower.classList.add("cursor-active");
        follower.classList.remove("cursor-text");
        cursor.classList.add("cursor-hidden");
      } else if (isTextInput) {
        follower.classList.add("cursor-text");
        follower.classList.remove("cursor-active");
        cursor.classList.add("cursor-hidden");
      } else {
        follower.classList.remove("cursor-active", "cursor-text");
        cursor.classList.remove("cursor-hidden");
      }
    };

    // The "Magic" - Smooth follow animation
    const animateFollower = () => {
      // Lerp formula: current + (target - current) * ease
      followerPos.current.x +=
        (mousePos.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y +=
        (mousePos.current.y - followerPos.current.y) * 0.15;

      follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      requestAnimationFrame(animateFollower);
    };

    const animationId = requestAnimationFrame(animateFollower);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .cursor-active {
          width: 60px !important;
          height: 60px !important;
          margin-left: -30px !important;
          margin-top: -30px !important;
          background-color: rgba(34, 211, 238, 0.1);
          border-color: rgba(34, 211, 238, 0.8);
        }
        .cursor-text {
          width: 4px !important;
          height: 24px !important;
          margin-left: -2px !important;
          margin-top: -12px !important;
          border-radius: 2px !important;
          background-color: rgba(34, 211, 238, 0.9);
          border: none !important;
        }
        .cursor-hidden {
          opacity: 0;
        }
      `}</style>
      {/* The trailing ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/50 rounded-full pointer-events-none z-[100] -ml-5 -mt-5 transition-[width,height,margin,background-color,border-color] duration-300 ease-out will-change-transform"
      />
      {/* The central dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[101] -ml-[0.75px] -mt-[0.75px] transition-opacity duration-200 will-change-transform"
      />
    </>
  );
}
