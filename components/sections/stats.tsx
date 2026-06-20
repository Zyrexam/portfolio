"use client";

import { stats } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";

function StatCard({
  stat,
  delay,
}: {
  stat: (typeof stats)[number];
  delay: string;
}) {
  const { ref, isIn } = useReveal();

  const labelClass =
    stat.id === "03" ? "stat-label stat-label--tight" : "stat-label";

  return (
    <div
      ref={ref}
      className={`stat-card${isIn ? " is-in" : ""}`}
      style={{ transitionDelay: delay, opacity: isIn ? undefined : 0 }}
    >
      <div className="stat-top">
        <span className="eyebrow">{stat.id}</span>
        <span className="stat-dot" />
      </div>
      <div>
        <div className="stat-value">{stat.value}</div>
        <div className={labelClass}>{stat.label}</div>
        <div className="stat-note">{stat.note}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  const { ref, isIn } = useReveal();

  return (
    <section id="stats">
      <div className="container">
        <div ref={ref} className={`section-head${isIn ? " is-in" : ""} reveal`}>
          <span className="idx">02</span>
          <span className="lbl">By the numbers</span>
          <span className="end">Measured outcomes, not vibes</span>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              delay={`${0.05 + i * 0.08}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
