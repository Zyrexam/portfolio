export default function About() {
  return (
    <section id="about" className="mt-24 max-w-4xl pt-16">
      <div className="section-label mb-10">About</div>
      <div className="max-w-2xl space-y-4">
        <p className="font-serif text-[2rem] leading-[1.3] tracking-tight text-foreground">
          I like building backend systems that are{" "}
          <span className="italic text-[#d3c08a]">simple, reliable,</span> and
          fast.
        </p>
        <p className="text-lg leading-[1.9] text-muted-foreground">
          Backend-focused engineer from IIT Jodhpur. Most of my work is around
          distributed systems, APIs, and performance-critical applications.
        </p>
        <p className="text-lg leading-[1.9] text-muted-foreground">
          I believe good engineering is invisible. It just works, for longer
          than anyone expected.
        </p>
      </div>
    </section>
  );
}
