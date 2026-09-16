"use client";
import { useEffect, useState } from "react";

export function IstClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="font-mono text-[11px] uppercase tracking-[0.16em] whitespace-nowrap"
      style={{ color: "var(--ws-text-secondary)" }}
    >
      {time ?? "--:--"} IST
    </span>
  );
}
