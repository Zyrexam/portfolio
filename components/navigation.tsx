"use client";
import Link from "next/link";

const navItems = [
  { name: "About", href: "#about", number: "01" },
  { name: "Skills", href: "#skills", number: "02" },
  { name: "Experience", href: "#experience", number: "03" },
  { name: "Projects", href: "#projects", number: "04" },
  { name: "Contact", href: "#contact", number: "05" },
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
                <span className="text-cyan-400 mr-1">{item.number}.</span>{" "}
                {item.name}
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <a
            href="https://drive.google.com/uc?export=download&id=1IIoEg_9fFe5Q2cTfudjwlX2-e6fv5t4l"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-cyan-500 text-cyan-400 text-sm font-mono hover:bg-cyan-500/10 transition-colors rounded"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
