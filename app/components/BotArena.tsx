/**
 * BotArena — three pixel bots sweep across the full footer width,
 * collide in the middle with sparks, then scatter.
 *
 * 2s loop, vw-based movement, transform/opacity only, zero JS.
 * Disabled under prefers-reduced-motion.
 */

type BotVariant = "arm" | "tripod" | "small-arm";

function BotSprite({ variant }: { variant: BotVariant }) {
  if (variant === "tripod") {
    return (
      <svg width="30" height="30" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <rect x="4" y="16" width="3" height="3" fill="var(--brand)" />
        <rect x="13" y="16" width="3" height="3" fill="var(--brand)" />
        <rect x="9" y="16" width="2" height="2" fill="var(--brand)" />
        <rect x="3" y="6" width="14" height="10" fill="var(--brand)" />
        <rect x="6" y="8" width="3" height="3" fill="var(--ink-cool)" />
        <rect x="11" y="8" width="3" height="3" fill="var(--ink-cool)" />
      </svg>
    );
  }
  if (variant === "small-arm") {
    return (
      <svg width="27" height="27" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
        <rect x="3" y="14" width="3" height="3" fill="var(--brand)" />
        <rect x="12" y="14" width="3" height="3" fill="var(--brand)" />
        <rect x="1" y="9" width="2" height="2" fill="var(--brand)" />
        <rect x="2" y="5" width="14" height="9" fill="var(--brand)" />
        <rect x="5" y="7" width="3" height="3" fill="var(--ink-cool)" />
        <rect x="10" y="7" width="3" height="3" fill="var(--ink-cool)" />
      </svg>
    );
  }
  // arm variant — the default left-side bot
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="4" y="16" width="3" height="3" fill="var(--brand)" />
      <rect x="13" y="16" width="3" height="3" fill="var(--brand)" />
      <rect x="2" y="10" width="3" height="2" fill="var(--brand)" />
      <rect x="3" y="6" width="14" height="10" fill="var(--brand)" />
      <rect x="6" y="8" width="3" height="3" fill="var(--ink-cool)" />
      <rect x="11" y="8" width="3" height="3" fill="var(--ink-cool)" />
    </svg>
  );
}

export function BotArena() {
  return (
    <div
      className="ba2__arena"
      role="img"
      aria-label="Three small bots sweep across the footer line, collide with sparks, and scatter"
    >
      <span className="ba2__ground" aria-hidden="true" />

      {/* Bot 1 — sweeps right, bounces on collision */}
      <div className="ba2__bot ba2__bot--1" aria-hidden="true">
        <div className="ba2__collision-trigger">
          <BotSprite variant="arm" />
        </div>
      </div>

      {/* Bot 2 — sweeps left into the collision, dims */}
      <div className="ba2__bot ba2__bot--2" aria-hidden="true">
        <div className="ba2__collision-trigger">
          <BotSprite variant="tripod" />
        </div>
      </div>

      {/* Bot 3 — witness, assists after collision */}
      <div className="ba2__bot ba2__bot--3" aria-hidden="true">
        <div className="ba2__assist-trigger">
          <BotSprite variant="small-arm" />
        </div>
      </div>

      {/* Sparks at collision point */}
      <span className="ba2__spark" aria-hidden="true" />
      <span className="ba2__spark ba2__spark--2" aria-hidden="true" />
    </div>
  );
}
