"use client";
import Link from "next/link";

const navItems = [
  { label: "01. About", href: "#about" },
  { label: "02. Experience", href: "#experience" },
  { label: "03. Projects", href: "#projects" },
  { label: "04. Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 sm:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded border border-cyan-500 text-cyan-400 font-bold text-lg hover:bg-cyan-500/10 transition-colors font-serif"
          >
            M
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-mono text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <button className="px-4 py-2 border border-cyan-500 text-cyan-400 text-sm font-mono hover:bg-cyan-500/10 transition-colors rounded">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
