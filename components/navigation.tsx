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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <a
          href="#top"
          className="shrink-0 text-sm font-semibold text-foreground"
        >
          Mohit Kumar
        </a>

        <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex lg:gap-6">
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
