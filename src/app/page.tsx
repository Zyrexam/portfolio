"use client";

import dynamic from "next/dynamic";

// Disable SSR for the whole IDE so the boot sequence + window APIs work cleanly.
const IDEShell = dynamic(() => import("@/components/ide/IDEShell").then((m) => m.IDEShell), {
  ssr: false,
});

export default function Home() {
  return <IDEShell />;
}
