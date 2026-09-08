/**
 * Groq-style textures: dithered pixel clouds + the 4×2 pixel-block mosaic.
 * Both are deterministic (no randomness) and render as pure SVG/CSS.
 */

/* ---------------- dither cloud ---------------- */

const COLS = 56;
const ROWS = 28;
const CELL = 6;

/** Ellipses that form the cloud silhouette (in cell units). */
const BLOBS: [cx: number, cy: number, rx: number, ry: number][] = [
  [14, 17, 12, 8],
  [28, 13, 14, 9],
  [42, 16, 13, 9],
];

function insideCloud(x: number, y: number): boolean {
  for (const [cx, cy, rx, ry] of BLOBS) {
    const dx = (x - cx) / rx;
    const dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
}

/** Deterministic dither: skips ~1 in 6 cells organically. */
function dithers(x: number, y: number): boolean {
  return (x * 7 + y * 13) % 6 !== 0;
}

const cloudDots: { x: number; y: number }[] = [];
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    if (insideCloud(x + 0.5, y + 0.5) && dithers(x, y)) {
      cloudDots.push({ x, y });
    }
  }
}

/** Flat strip of squares along the bottom, like Groq's cloud sprites. */
const stripCells: { x: number; y: number }[] = [];
for (let x = 8; x < COLS - 8; x += 2) {
  stripCells.push({ x, y: ROWS - 1 });
}

export function DitherCloud({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {cloudDots.map(({ x, y }) => (
        <rect
          key={`d${x}-${y}`}
          x={x * CELL + 0.5}
          y={y * CELL + 0.5}
          width={CELL - 1}
          height={CELL - 1}
          rx={CELL} /* full round → dot */
        />
      ))}
      {stripCells.map(({ x, y }) => (
        <rect key={`s${x}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL} />
      ))}
    </svg>
  );
}

/* ---------------- pixel mosaic (4×2 blocks) ---------------- */

export type MosaicVariant = "plain" | "dot" | "cut" | "inverted";

/** Captured variant sequence from groq.com's platform hero. */
export const MOSAIC_SEQUENCE: MosaicVariant[] = [
  "plain",
  "dot",
  "cut",
  "cut",
  "inverted",
  "plain",
  "plain",
  "dot",
];

export function PixelMosaic({
  className,
  style,
  sequence = MOSAIC_SEQUENCE,
}: {
  className?: string;
  style?: React.CSSProperties;
  sequence?: MosaicVariant[];
}) {
  return (
    <span className={`mosaic ${className ?? ""}`} style={style} aria-hidden="true">
      {sequence.map((v, i) => (
        <span key={i} className={`mosaic__cell${v === "plain" ? "" : ` mosaic__cell--${v}`}`} />
      ))}
    </span>
  );
}
