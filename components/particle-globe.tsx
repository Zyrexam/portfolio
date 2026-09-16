"use client";
import { useEffect, useRef } from "react";

export function ParticleGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    const N = 1600;
    const points: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }
    const halo: { x: number; y: number; z: number; s: number }[] = [];
    for (let i = 0; i < 600; i++) {
      const a = Math.random() * Math.PI * 2;
      const rad = 1.35 + Math.random() * 0.9;
      const y = (Math.random() - 0.5) * 1.6;
      halo.push({ x: Math.cos(a) * rad, y, z: Math.sin(a) * rad, s: Math.random() });
    }

    // 5 premium satellites — varied orbits, iconic body + panels
    const sats = [
      { r: 1.18, tilt: 0.38, speed: 0.0135, phase: 0, trail: [] as [number, number][], tint: "#f4f5f6" },
      { r: 1.28, tilt: -0.48, speed: -0.0105, phase: 1.1, trail: [] as [number, number][], tint: "#cdd1d5" },
      { r: 1.42, tilt: 0.62, speed: 0.0082, phase: 2.4, trail: [] as [number, number][], tint: "#969da4" },
      { r: 1.31, tilt: 0.18, speed: 0.011, phase: 4.0, trail: [] as [number, number][], tint: "#e8eaec" },
      { r: 1.52, tilt: -0.68, speed: -0.007, phase: 5.2, trail: [] as [number, number][], tint: "#c2c5c8" },
    ];

    const mouse = { x: 0, y: 0, active: false, lx: 0, ly: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
      mouse.active = true;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      t += 0.0035;
      // smooth lerp for mouse influence
      mouse.lx += (mouse.x - mouse.lx) * 0.08;
      mouse.ly += (mouse.y - mouse.ly) * 0.08;

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.52;
      const cy = h * 0.52;
      const R = Math.min(w, h) * 0.38;
      const radius = Math.min(R, 360);

      // mouse nudges rotation subtly
      const mx = ((mouse.lx - cx) / radius) * 0.18;
      const my = ((mouse.ly - cy) / radius) * 0.12;
      const rotY = t + mx;
      const rotX = 0.18 + Math.sin(t * 0.3) * 0.05 + my;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const project = (p: { x: number; y: number; z: number }) => {
        let x = p.x, y = p.y, z = p.z;
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = 1 / (1.9 - z2 * 0.55);
        return { X: cx + x1 * radius * scale, Y: cy + y1 * radius * scale, z: z2, s: scale, x1, y1 };
      };

      // halo
      for (const p of halo) {
        const pr = project(p);
        if (pr.z < -0.9) continue;
        let dx = 0, dy = 0, boost = 0;
        if (mouse.active) {
          const ddx = pr.X - mouse.lx; const ddy = pr.Y - mouse.ly;
          const d = Math.hypot(ddx, ddy);
          if (d < 90) { const k = (90 - d) / 90; dx = (ddx / (d || 1)) * k * 6; dy = (ddy / (d || 1)) * k * 6; boost = k * 0.4; }
        }
        const a = 0.18 + pr.s * 0.12 + p.s * 0.1 + boost;
        const r = 0.7 + pr.s * 0.6 + boost * 1.2;
        ctx.globalAlpha = Math.max(0, Math.min(1, a * (0.5 + pr.z * 0.5)));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pr.X + dx, pr.Y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // main sphere with magnetic lens
      for (const p of points) {
        const pr = project(p);
        const alpha = (pr.z + 1) / 2;
        let dx = 0, dy = 0, mag = 0;
        if (mouse.active) {
          const ddx = pr.X - mouse.lx; const ddy = pr.Y - mouse.ly;
          const d = Math.hypot(ddx, ddy);
          if (d < 110) {
            const k = Math.pow((110 - d) / 110, 1.6);
            dx = (ddx / (d || 1)) * k * 14;
            dy = (ddy / (d || 1)) * k * 14;
            mag = k;
          }
        }
        if (pr.z < -0.6 && Math.random() > 0.7) continue;
        const size = (1.15 + alpha * 1.35 + pr.s * 0.4) * (1 + mag * 0.9);
        ctx.globalAlpha = (0.35 + alpha * 0.65) * (1 + mag * 0.5);
        // subtle cool tint near cursor
        if (mag > 0.3) ctx.fillStyle = mag > 0.6 ? "#e8eaec" : "#cdd1d5";
        else ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pr.X + dx, pr.Y + dy, size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 1;

      // premium satellites — metallic body + solar wings, orbit trails
      sats.forEach((s, idx) => {
        s.phase += s.speed;
        const ca = Math.cos(s.phase) * s.r;
        const sa = Math.sin(s.phase) * s.r;
        const x = ca;
        const y = Math.sin(s.tilt) * sa;
        const z = Math.cos(s.tilt) * sa;
        const pr = project({ x, y: y * 0.72, z });

        // occultation: hide far side
        const depth = (pr.z + 1) / 2;
        // trail (faint orbit segment, clipped by depth)
        s.trail.push([pr.X, pr.Y]);
        if (s.trail.length > 18) s.trail.shift();
        ctx.strokeStyle = idx % 2 === 0 ? "rgba(244,245,246,0.16)" : "rgba(205,209,213,0.11)";
        ctx.lineWidth = 1;
        ctx.setLineDash(idx === 2 ? [3, 6] : []);
        ctx.beginPath();
        s.trail.forEach(([tx, ty], i) => {
          if (i === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        if (depth < 0.10) return;
        const opacity = 0.65 + depth * 0.35;
        ctx.globalAlpha = opacity;

        // orbit halo
        ctx.strokeStyle = "rgba(244,245,246,0.04)";
        ctx.lineWidth = 0.7;
        // subtle glow
        ctx.fillStyle = s.tint;
        ctx.shadowColor = s.tint;
        ctx.shadowBlur = 14;

        // draw satellite: 2 wings + body + antenna
        const ang = Math.atan2(pr.y1 ?? 0, pr.x1 ?? 0) + (s.speed > 0 ? 0 : Math.PI);
        const cosA = Math.cos(ang), sinA = Math.sin(ang);
        const sx = pr.X, sy = pr.Y;
        const scl = 0.9 + depth * 0.35; // perspective scale

        // helper to rotate point around center
        const rot = (px: number, py: number) => [sx + (px * cosA - py * sinA) * scl, sy + (px * sinA + py * cosA) * scl] as const;

        // left wing
        ctx.fillStyle = "#7c8085";
        ctx.strokeStyle = "rgba(244,245,246,0.18)";
        ctx.lineWidth = 0.6;
        ctx.shadowBlur = 0;
        {
          const [x1, y1] = rot(-10, -1.5); const [x2, y2] = rot(-4, -1.5); const [x3, y3] = rot(-4, 1.5); const [x4, y4] = rot(-10, 1.5);
          ctx.fillStyle = "#556065";
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.lineTo(x4, y4); ctx.closePath(); ctx.fill(); ctx.stroke();
          // grid on wing
          ctx.strokeStyle = "rgba(244,245,246,0.14)"; ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(...rot(-7, -1.5)); ctx.lineTo(...rot(-7, 1.5)); ctx.stroke();
        }
        // right wing
        {
          const [x1, y1] = rot(4, -1.5); const [x2, y2] = rot(10, -1.5); const [x3, y3] = rot(10, 1.5); const [x4, y4] = rot(4, 1.5);
          ctx.fillStyle = "#556065";
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.lineTo(x4, y4); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = "rgba(244,245,246,0.18)"; ctx.lineWidth = 0.6; ctx.stroke();
          ctx.strokeStyle = "rgba(244,245,246,0.14)"; ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(...rot(7, -1.5)); ctx.lineTo(...rot(7, 1.5)); ctx.stroke();
        }
        // body
        ctx.fillStyle = "#e8eaec";
        ctx.shadowColor = s.tint;
        ctx.shadowBlur = 12;
        {
          const [x1, y1] = rot(-3.2, -1.9); const [x2, y2] = rot(3.2, -1.9); const [x3, y3] = rot(3.2, 1.9); const [x4, y4] = rot(-3.2, 1.9);
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.lineTo(x4, y4); ctx.closePath(); ctx.fill();
        }
        ctx.shadowBlur = 0;
        // antenna
        ctx.strokeStyle = "#cdd1d5";
        ctx.lineWidth = 0.7 * scl;
        ctx.beginPath(); ctx.moveTo(...rot(0, -1.9)); ctx.lineTo(...rot(0, -3.8)); ctx.stroke();
        ctx.fillStyle = "#f4f5f6";
        ctx.beginPath(); ctx.arc(...rot(0, -3.8), 0.9 * scl, 0, Math.PI * 2); ctx.fill();

        ctx.globalAlpha = 1;
      });

      // cursor lens ring
      if (mouse.active) {
        ctx.strokeStyle = "rgba(244,245,246,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.lx, mouse.ly, 56, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(244,245,246,0.06)";
        ctx.beginPath();
        ctx.arc(mouse.lx, mouse.ly, 110, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full cursor-crosshair" aria-hidden />;
}
