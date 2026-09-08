/**
 * Tier chip — Groq's counting-dot system: N dots + label pill.
 * The dot count encodes depth (1 = base layer … 3 = full stack),
 * mirroring groq.com's INFRASTRUCTURE / INFERENCE / CONTROL chips.
 */
export function TierChip({ count, label }: { count: 1 | 2 | 3; label: string }) {
  return (
    <span className="tier">
      <span className="sr-only" aria-hidden="true">
        Tier {count} —
      </span>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="tier__dot" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11.5" fill="currentColor" />
        </svg>
      ))}
      <span className="tier__label" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
