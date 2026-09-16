/**
 * Satellites orbiting the hero globe — bus, articulated solar arrays, dish and
 * thruster glow, each on its own inclined orbit with a trailing path.
 *
 * Kept apart from the globe itself so the earth stays readable: this module owns
 * the hardware, `particle-globe.tsx` owns the planet and the projection.
 */

export type Vec3 = { x: number; y: number; z: number };
export type Projected = { X: number; Y: number; z: number; x1: number; y1: number };
export type Project = (p: Vec3) => Projected;

export type Satellite = {
  /** orbit radius, in globe radii */
  r: number;
  /** orbit inclination */
  tilt: number;
  /** radians per frame at 60fps; sign sets direction */
  speed: number;
  phase: number;
  trail: [number, number][];
  tint: string;
};

export function createSatellites(): Satellite[] {
  return [
    { r: 1.18, tilt: 0.38, speed: 0.0135, phase: 0, trail: [], tint: "#f4f5f6" },
    { r: 1.28, tilt: -0.48, speed: -0.0105, phase: 1.1, trail: [], tint: "#cdd1d5" },
    { r: 1.42, tilt: 0.62, speed: 0.0082, phase: 2.4, trail: [], tint: "#969da4" },
    { r: 1.31, tilt: 0.18, speed: 0.011, phase: 4.0, trail: [], tint: "#e8eaec" },
    { r: 1.52, tilt: -0.68, speed: -0.007, phase: 5.2, trail: [], tint: "#c2c5c8" },
  ];
}

/** `frames` is elapsed frames at 60fps, so orbits hold their pace on any refresh rate. */
export function drawSatellites(
  ctx: CanvasRenderingContext2D,
  project: Project,
  sats: Satellite[],
  frames: number
) {
  sats.forEach((s, idx) => {
    s.phase += s.speed * frames;

    const ca = Math.cos(s.phase) * s.r;
    const sa = Math.sin(s.phase) * s.r;
    const pr = project({ x: ca, y: Math.sin(s.tilt) * sa * 0.72, z: Math.cos(s.tilt) * sa });

    const depth = (pr.z + 1) / 2;
    s.trail.push([pr.X, pr.Y]);
    if (s.trail.length > 20) s.trail.shift();

    // orbit path
    ctx.strokeStyle = idx % 2 === 0 ? "rgba(244,245,246,0.15)" : "rgba(205,209,213,0.10)";
    ctx.lineWidth = 1;
    ctx.setLineDash(idx === 2 ? [4, 6] : []);
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    s.trail.forEach(([tx, ty], i) => (i === 0 ? ctx.moveTo(tx, ty) : ctx.lineTo(tx, ty)));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    if (depth < 0.08) return;
    const opacity = 0.72 + depth * 0.28;
    ctx.globalAlpha = opacity;

    const ang = Math.atan2(pr.y1, pr.x1) + (s.speed > 0 ? 0 : Math.PI);
    const cosA = Math.cos(ang);
    const sinA = Math.sin(ang);
    const sx = pr.X;
    const sy = pr.Y;
    const scl = 0.95 + depth * 0.42;
    const rot = (px: number, py: number) =>
      [sx + (px * cosA - py * sinA) * scl, sy + (px * sinA + py * cosA) * scl] as const;

    // soft shadow under the bus
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(sx, sy + 2.2 * scl, 5 * scl, 1.6 * scl, 0, 0, Math.PI * 2);
    ctx.fill();

    // solar arrays — metallic cells with a specular band
    const drawPanel = (cxOff: number) => {
      const cells = 3;
      const pw = 12;
      const ph = 3.2;
      const x0 = cxOff - pw / 2;
      const y0 = -ph / 2;
      const [gx1, gy1] = rot(x0, y0);
      const [gx2, gy2] = rot(x0 + pw, y0 + ph);
      const finite = Number.isFinite(gx1) && Number.isFinite(gy1) && Number.isFinite(gx2) && Number.isFinite(gy2);
      const len2 = (gx2 - gx1) * (gx2 - gx1) + (gy2 - gy1) * (gy2 - gy1);
      if (!finite || len2 < 0.5) {
        ctx.fillStyle = "#1a1d20";
      } else {
        const grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
        grad.addColorStop(0, "#1a1d20");
        grad.addColorStop(0.5, "#2a2f36");
        grad.addColorStop(1, "#15181b");
        ctx.fillStyle = grad;
      }
      ctx.strokeStyle = "rgba(244,245,246,0.22)";
      ctx.lineWidth = 0.7;
      const [x1, y1] = rot(x0, y0);
      const [x2, y2] = rot(x0 + pw, y0);
      const [x3, y3] = rot(x0 + pw, y0 + ph);
      const [x4, y4] = rot(x0, y0 + ph);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // cell dividers
      ctx.strokeStyle = "rgba(244,245,246,0.09)";
      ctx.lineWidth = 0.35;
      for (let c = 1; c < cells; c++) {
        const cx = x0 + (pw / cells) * c;
        ctx.beginPath();
        ctx.moveTo(...rot(cx, y0));
        ctx.lineTo(...rot(cx, y0 + ph));
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(...rot(x0, y0 + ph / 2));
      ctx.lineTo(...rot(x0 + pw, y0 + ph / 2));
      ctx.stroke();
      // specular
      ctx.fillStyle = "rgba(244,245,246,0.07)";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(...rot(x0 + pw, y0 + 0.9));
      ctx.lineTo(...rot(x0, y0 + 0.9));
      ctx.closePath();
      ctx.fill();
    };
    drawPanel(-9.5);
    drawPanel(9.5);

    // bus — chamfered metallic
    {
      const bw = 7.2;
      const bh = 4.2;
      const x0 = -bw / 2;
      const y0 = -bh / 2;
      const [bx1, by1] = rot(x0, y0);
      const [bx2, by2] = rot(x0 + bw, y0 + bh);
      const finiteBus =
        Number.isFinite(bx1) &&
        Number.isFinite(by1) &&
        Number.isFinite(bx2) &&
        Number.isFinite(by2) &&
        (bx2 - bx1) * (bx2 - bx1) + (by2 - by1) * (by2 - by1) > 0.5;
      let grad: CanvasGradient | string = "#c2c5c8";
      if (finiteBus) {
        const g = ctx.createLinearGradient(bx1, by1, bx2, by2);
        g.addColorStop(0, "#e8eaec");
        g.addColorStop(0.55, "#c2c5c8");
        g.addColorStop(1, "#969da4");
        grad = g;
      }
      ctx.fillStyle = grad as unknown as string;
      ctx.strokeStyle = "rgba(244,245,246,0.28)";
      ctx.lineWidth = 0.6;
      const corners = [
        rot(x0 + 0.9, y0),
        rot(x0 + bw - 0.9, y0),
        rot(x0 + bw, y0 + 0.9),
        rot(x0 + bw, y0 + bh - 0.9),
        rot(x0 + bw - 0.9, y0 + bh),
        rot(x0 + 0.9, y0 + bh),
        rot(x0, y0 + bh - 0.9),
        rot(x0, y0 + 0.9),
      ];
      ctx.beginPath();
      ctx.moveTo(...corners[0]);
      for (let c = 1; c < corners.length; c++) ctx.lineTo(...corners[c]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // sensor window
      ctx.fillStyle = "#101214";
      ctx.beginPath();
      ctx.arc(...rot(0, -0.1), 1.1 * scl, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = s.tint;
      ctx.shadowColor = s.tint;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(...rot(0, -0.1), 0.55 * scl, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // parabolic dish
    {
      ctx.strokeStyle = "#cdd1d5";
      ctx.lineWidth = 0.65 * scl;
      ctx.beginPath();
      ctx.moveTo(...rot(0, -2.1));
      ctx.lineTo(...rot(1.4, -3.6));
      ctx.stroke();
      const [dx, dy] = rot(1.4, -3.6);
      ctx.fillStyle = "#f4f5f6";
      ctx.strokeStyle = "rgba(244,245,246,0.22)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(dx, dy, 1.7 * scl, 1.1 * scl, ang + Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(16,18,20,0.45)";
      ctx.beginPath();
      ctx.ellipse(dx, dy, 1.15 * scl, 0.75 * scl, ang + Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // thruster glow
    ctx.fillStyle = s.tint;
    ctx.shadowColor = s.tint;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = opacity * 0.5;
    ctx.beginPath();
    ctx.arc(...rot(-3.6, 0), 0.7 * scl, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  });
}
