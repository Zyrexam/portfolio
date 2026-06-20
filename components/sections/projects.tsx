"use client";

import { projects } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function typeBadge(type: string) {
  if (type === "live")
    return (
      <span className="type-badge accent">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Live
      </span>
    );
  if (type === "research")
    return (
      <span className="type-badge accent">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 2v7.31" />
          <path d="M14 9.3V2" />
          <path d="M8.5 2h7" />
          <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
          <path d="M5.52 16h12.96" />
        </svg>
        Research
      </span>
    );
  return (
    <span className="type-badge">
      <GitHubIcon />
      Source
    </span>
  );
}

function projectLinks(p: (typeof projects)[number]) {
  return (
    <div className="proj-links">
      <a
        className="arrow-link"
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <svg
          className="arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
      {p.live && p.type === "live" && (
        <a
          className="arrow-link"
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live site
          <svg
            className="arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      )}
      {p.publication && (
        <a
          className="arrow-link"
          href={p.publication}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          ACM publication
          <svg
            className="arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      )}
    </div>
  );
}

function tagList(tags: string[]) {
  return (
    <div className="proj-tags">
      {tags.map((t) => (
        <span key={t} className="proj-tag">
          {t}
        </span>
      ))}
    </div>
  );
}

function RevealBox({ children, delay }: { children: React.ReactNode; delay?: string }) {
  const { ref, isIn } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal${isIn ? " is-in" : ""}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const { ref: headRef, isIn: headIn } = useReveal();
  const featured = projects.find((p) => p.featured) || projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head${headIn ? " is-in" : ""} reveal`}
        >
          <span className="idx">06</span>
          <span className="lbl">Selected work</span>
          <span className="end">Projects</span>
        </div>

        <div className="projects-stack">
          {/* Featured card */}
          <RevealBox>
            <article className="proj-card featured">
              <div className="proj-top">
                {typeBadge(featured.type)}
                <span className="proj-num">
                  01 / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="proj-title">{featured.title}</h3>
              <div className="proj-featured-body">
                <div className="proj-featured-left">
                  {tagList(featured.tags)}
                  {projectLinks(featured)}
                </div>
                <p className="proj-featured-desc">{featured.description}</p>
              </div>
            </article>
          </RevealBox>

          {/* Grid of rest */}
          <div className="projects-grid">
            {rest.map((p, i) => (
              <RevealBox key={p.id} delay={`${(i % 2) * 0.08}s`}>
                <article className="proj-card compact">
                  <div className="proj-top">
                    {typeBadge(p.type)}
                    <span className="proj-num">
                      {String(i + 2).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="proj-title" style={{ marginTop: "1.25rem" }}>
                    {p.title}
                  </h3>
                  {tagList(p.tags)}
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-footer">{projectLinks(p)}</div>
                </article>
              </RevealBox>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
