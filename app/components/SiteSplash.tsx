"use client";

import { useEffect, useState } from "react";
import { Bolt } from "./bolt";

/**
 * Site splash — brand-orange power-on moment, exits with blur + fade.
 * Skipped entirely under prefers-reduced-motion (globals.css).
 */
export function SiteSplash() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 1100);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="splash" aria-hidden="true">
      <Bolt className="splash__bolt text-cream" />
    </div>
  );
}
