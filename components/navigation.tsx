"use client";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/6 bg-background/92 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5 sm:px-8">
        <a
          href="#top"
          className="text-sm font-semibold text-foreground"
        >
          Mohit Kumar
        </a>

        <div className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
