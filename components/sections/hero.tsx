export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[52vh] max-w-4xl flex-col justify-end pb-4 pt-6 sm:min-h-[58vh] sm:pb-6 sm:pt-10"
    >
      {/* Pulsing dot + label */}
      <div className="section-label mb-6 flex items-center gap-2.5 sm:mb-8">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c8b98a] animate-pulse" />
        Lets build something great together.
      </div>

      <h1 className="font-serif text-5xl leading-[0.92] tracking-tight text-foreground min-[420px]:text-6xl sm:text-7xl md:text-[7.5rem]">
        Mohit
        <br />
        <em className="not-italic italic text-[#d3c08a]">Kumar</em>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground sm:mt-8 sm:text-[1.05rem]">
        Backend engineer at{" "}
        <span className="text-foreground font-medium">IIT Jodhpur</span>
        {" "}— I build distributed systems, async pipelines, and
        high-throughput APIs that hold up under real load. Currently open to backend roles.
      </p>
      <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap">
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
          href="https://drive.google.com/uc?export=download&id=1iVJ1ma8kdIIKEaL6gGrKKkAr1adIWlFO"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-button"
        >
          Resume ↓
        </a>
      </div>
    </section>
  );
}
