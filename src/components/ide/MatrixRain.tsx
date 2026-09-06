"use client";

import { useEffect, useRef } from "react";

export function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01<>{}[]/\\|+=*-_$#@!?MohitOSBACKENDDEV".split("");
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = new Array(columns).fill(1);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      if (drops.length < columns) {
        drops = [...drops, ...new Array(columns - drops.length).fill(1)];
      } else if (drops.length > columns) {
        drops = drops.slice(0, columns);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    let frames = 0;
    const maxFrames = 180; // ~3 seconds at 60fps

    const draw = () => {
      ctx.fillStyle = "rgba(30, 30, 30, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#4ec9b0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.975 ? "#9cdcfe" : "#4ec9b0";
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frames++;
      if (frames > maxFrames) {
        cancelAnimationFrame(raf);
        setTimeout(onDone, 200);
        return;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{ background: "#1e1e1e" }}
    />
  );
}
