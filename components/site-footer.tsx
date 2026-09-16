import { Fragment } from "react";
import Link from "next/link";
import { IstClock } from "./ist-clock";
import { EMAIL, GITHUB, LEETCODE, LINKEDIN, RESUME } from "@/lib/links";

const LINKS = [
  { label: "github", href: GITHUB, external: true },
  { label: "linkedin", href: LINKEDIN, external: true },
  { label: "leetcode", href: LEETCODE, external: true },
  { label: "resume", href: RESUME, external: true },
  { label: "email", href: `mailto:${EMAIL}`, external: false },
];

/* ------------------------------------------------------------------ *
 * Deterministic landscape. Integer-only LCG so the server and client
 * produce byte-identical markup (no hydration mismatch).
 * ------------------------------------------------------------------ */
let seed = 20260916;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const W = 1440;
const H = 320;

/** Random-walk ridgeline, smoothed with quadratic segments. */
function ridge(points: number, baseY: number, drift: number, spread: number) {
  const step = W / points;
  let y = baseY;
  const pts: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    y = Math.max(baseY - spread, Math.min(baseY + spread, y + (rnd() - 0.5) * drift));
    pts.push([Math.round(i * step), Math.round(y)]);
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    d += ` Q${x0},${y0} ${Math.round((x0 + x1) / 2)},${Math.round((y0 + y1) / 2)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L${lx},${ly} L${W},${H} L0,${H} Z`;
}

const FAR_RIDGE = ridge(26, 186, 30, 34);
const MID_RIDGE = ridge(22, 232, 26, 26);
const NEAR_RIDGE = ridge(18, 274, 20, 18);

const STARS = Array.from({ length: 46 }, () => ({
  x: Math.round(rnd() * W),
  y: Math.round(28 + rnd() * 150),
  r: Number((0.5 + rnd() * 1.1).toFixed(2)),
}));

type Bar = { x: number; w: number; h: number; windows: { x: number; y: number }[] };
const SKYLINE: Bar[] = [];
{
  let x = 0;
  while (x < W) {
    const w = Math.round(7 + rnd() * 13);
    const h = Math.round(22 + rnd() * 74);
    const windows: { x: number; y: number }[] = [];
    const cols = Math.max(1, Math.floor(w / 5));
    const rows = Math.max(1, Math.floor(h / 16));
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rnd() > 0.78) {
          windows.push({ x: Math.round(x + 2.5 + c * 5), y: Math.round(H - h + 6 + r * 16) });
        }
      }
    }
    SKYLINE.push({ x, w, h, windows });
    x += w + Math.round(3 + rnd() * 9);
  }
}

/** Read as towers — framing elements that echo the reference's pagodas. */
const TOWERS = [
  { x: 148, h: 172, w: 6 },
  { x: 1284, h: 148, w: 5 },
].map((t) => ({
  ...t,
  base: H - 26,
  braces: [0.32, 0.56, 0.78].map((f) => Math.round(t.h * f)),
}));

function Landscape() {
  return (
    <div aria-hidden className="relative h-[190px] w-full sm:h-[230px] md:h-[270px] lg:h-[320px]">
      {/* atmospheric glow behind the ridgeline */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 38%, rgba(244,245,246,0.07), transparent 62%)" }}
      />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ws-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b3136" />
            <stop offset="1" stopColor="#14181b" />
          </linearGradient>
          <linearGradient id="ws-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2024" />
            <stop offset="1" stopColor="#0d1012" />
          </linearGradient>
          <linearGradient id="ws-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f4f5f6" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#f4f5f6" stopOpacity="0.3" />
            <stop offset="1" stopColor="#f4f5f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* stars */}
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f4f5f6" fillOpacity={0.16 + (i % 5) * 0.06} />
        ))}

        {/* ridgelines, back to front */}
        <path d={FAR_RIDGE} fill="url(#ws-far)" fillOpacity="0.85" />
        <path d={FAR_RIDGE} fill="none" stroke="url(#ws-edge)" strokeWidth="0.9" />
        <path d={MID_RIDGE} fill="url(#ws-mid)" />
        <path d={MID_RIDGE} fill="none" stroke="url(#ws-edge)" strokeWidth="0.9" />

        {/* towers */}
        {TOWERS.map((t) => (
          <g key={t.x}>
            <rect x={t.x} y={t.base - t.h} width={t.w} height={t.h} fill="#0b0d0f" />
            <rect x={t.x} y={t.base - t.h} width={t.w} height={t.h} fill="none" stroke="url(#ws-edge)" strokeWidth="0.7" />
            {t.braces.map((b) => (
              <line key={b} x1={t.x - 5} y1={t.base - b} x2={t.x + t.w + 5} y2={t.base - b} stroke="#f4f5f6" strokeOpacity="0.16" strokeWidth="0.7" />
            ))}
          </g>
        ))}

        {/* skyline */}
        {SKYLINE.map((b, i) => (
          <rect key={i} x={b.x} y={H - b.h} width={b.w} height={b.h} fill="#0a0c0d" stroke="#f4f5f6" strokeOpacity="0.08" strokeWidth="0.6" />
        ))}
        {SKYLINE.flatMap((b, i) =>
          b.windows.map((w, j) => (
            <rect key={`${i}-${j}`} x={w.x} y={w.y} width="2" height="3" fill="#f4f5f6" fillOpacity={j % 3 === 0 ? 0.42 : 0.22} />
          ))
        )}

        {/* near ridge sits in front of the city */}
        <path d={NEAR_RIDGE} fill="#080a0c" />
        <path d={NEAR_RIDGE} fill="none" stroke="url(#ws-edge)" strokeWidth="0.9" />
      </svg>

      {/* blend the band into the surface above it */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, var(--ws-surface-1), transparent)" }}
      />
    </div>
  );
}

export function SiteFooter({
  backHref = "/#top",
  backGlyph = "↑",
  backAriaLabel = "Back to top",
}: {
  backHref?: string;
  backGlyph?: string;
  backAriaLabel?: string;
} = {}) {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--ws-surface-1)" }}>
      {/* hairline divider */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--ws-gradient-edge-dark)" }} />

      <div className="ws-container relative pt-12 md:pt-14">
        <p className="text-center">
          <Link href="/" className="ws-logo-wordmark text-[12px] tracking-[0.28em]">
            MOHIT KUMAR
          </Link>
        </p>

        <div className="relative mt-7 flex flex-col items-center gap-4 md:block">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em]">
            {LINKS.map((l, i) => (
              <Fragment key={l.label}>
                {i > 0 && (
                  <span aria-hidden className="text-[10px]" style={{ color: "var(--ws-border-strong)" }}>
                    x
                  </span>
                )}
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="transition hover:underline underline-offset-4"
                  style={{ color: "var(--ws-text-muted)" }}
                >
                  {l.label}
                </a>
              </Fragment>
            ))}
          </div>

          <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            <IstClock />
          </div>
        </div>
      </div>

      {/* full-bleed band */}
      <div className="relative mt-10">
        <Landscape />
        <div className="absolute inset-x-0 bottom-0">
          <div className="ws-container flex items-end justify-between gap-4 pb-5">
            <p className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "var(--ws-text-muted)" }}>
              © 2026 mohit kumar — iit jodhpur &apos;26
            </p>
            <Link
              href={backHref}
              aria-label={backAriaLabel}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[13px] transition hover:brightness-125"
              style={{ borderColor: "var(--ws-border-default)", color: "var(--ws-text-secondary)", background: "rgba(244,245,246,0.06)" }}
            >
              <span aria-hidden>{backGlyph}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
