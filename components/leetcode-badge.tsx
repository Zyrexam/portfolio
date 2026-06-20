"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function LeetCodeBadge({ className }: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.totalSolved) {
          setCount(data.totalSolved);
        }
      })
      .catch(() => {
        // keep showing "240+" on error — no visible error state
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <span className={className}>{count ?? 240}+</span>;
}
