"use client";

import { useId } from "react";

interface DotPatternProps {
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  radius = 1.5,
  className,
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <circle
            id="pattern-circle"
            cx={radius}
            cy={radius}
            r={radius}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

interface GradientBlobProps {
  className?: string;
  color?: string;
}

export function GradientBlob({
  className = "",
  color = "bg-cyan-500",
}: GradientBlobProps) {
  return (
    <div
      className={`absolute w-96 h-96 rounded-full blur-3xl opacity-[0.07] pointer-events-none ${color} ${className}`}
    />
  );
}

interface DecorativeLineProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function DecorativeLine({
  className = "",
  orientation = "horizontal",
}: DecorativeLineProps) {
  const baseStyles = "bg-slate-700/30"; // Very subtle
  const orientationStyles =
    orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full";

  return (
    <div
      className={`pointer-events-none ${baseStyles} ${orientationStyles} ${className}`}
    />
  );
}

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  className,
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
