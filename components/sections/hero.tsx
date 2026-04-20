export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[58vh] max-w-4xl flex-col justify-end pb-6 pt-10"
    >
      {/* Pulsing dot + label */}
      <div className="section-label mb-8 flex items-center gap-2.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c8b98a] animate-pulse" />
        Lets build something great together.
      </div>

      <h1 className="font-serif text-6xl leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-[7.5rem]">
        Mohit
        <br />
        <em className="not-italic italic text-[#d3c08a]">Kumar</em>
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-[1.75] text-muted-foreground sm:text-[1.05rem]">
        CS undergrad at{" "}
        <span className="text-foreground font-medium">IIT Jodhpur</span>
        {" "}— I build backend systems, distributed APIs, and data pipelines
        that hold up under real load. Currently open to SDE roles.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#projects" className="mono-button mono-button--accent">
          Selected work
        </a>
        <a
          href="https://github.com/Zyrexam"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-button"
        >
          GitHub ↗
        </a>
        <a
          href="https://leetcode.com/u/mohitkumar4/"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-button"
        >
          LeetCode ↗
        </a>
        <a
          href="https://www.linkedin.com/in/mohit-kumar-sp/"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-button"
        >
          LinkedIn ↗
        </a>
        <a
          href="/resume.pdf"
          download
          className="mono-button"
        >
          Resume ↓
        </a>
      </div>
    </section>
  );
}
