import {
  about,
  announcement,
  cta,
  education,
  experience,
  footerLockup,
  hero,
  moreProjects,
  owner,
  projects,
  publications,
  skills,
  statement,
  writing,
} from "../content";
import { Bolt, ExternalIcon, Logo, socials } from "./bolt";
import { BotArena } from "./BotArena";
import { DitherCloud, PixelMosaic } from "./textures";
import { TierChip } from "./TierChip";

/* ---------------- announcement bar ---------------- */

export function AnnouncementBar() {
  return (
    <aside
      className="bg-cream border-b border-line"
      style={{ borderBottomColor: "var(--line)" }}
      role="note"
    >
      <div
        className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-baseline justify-center gap-x-8 gap-y-2 py-4"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <p className="text-[14px] leading-normal tracking-normal text-ink-cool">
          {announcement.text}
        </p>
        <a
          href={announcement.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="type-label text-brand inline-flex items-center gap-1.5 hover:text-brand-dark transition-colors"
        >
          {announcement.link.label} <span aria-hidden="true">&gt;</span>
        </a>
      </div>
    </aside>
  );
}

/* ---------------- hero ---------------- */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* texture layers — pointer-events none, edge-pinned */}
      <DitherCloud
        className="pointer-events-none absolute -top-4 right-[4%] hidden w-[340px] text-line md:block"
        style={{ opacity: 0.55 }}
      />
      <DitherCloud
        className="pointer-events-none absolute bottom-[6%] -left-16 hidden w-[300px] text-line lg:block"
        style={{ opacity: 0.45 }}
      />
      <PixelMosaic
        className="pointer-events-none absolute bottom-8 right-0 hidden lg:grid"
      />

      <div
        className="relative mx-auto grid max-w-[var(--content-max)] items-end gap-12 pb-[var(--section-loud)] pt-[clamp(4rem,12vh,9rem)] lg:grid-cols-[1.4fr_1fr]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <h1 className="type-display text-ink">
          {hero.lines.map((line) => (
            <span key={line} className="block">
              {line}
              {line === hero.dotAfter && <span className="hero-dot" aria-hidden="true" />}
            </span>
          ))}
        </h1>

        <div className="max-w-[65ch] pb-2">
          <p className="type-body">{hero.lede}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {hero.ctas.map((ctaItem) => (
              <a
                key={ctaItem.label}
                href={ctaItem.href}
                {...(ctaItem.href.startsWith("mailto:")
                  ? {}
                  : { target: undefined, rel: undefined })}
                className={`btn ${
                  ctaItem.href.startsWith("mailto:") ? "btn--brand" : "btn--brand"
                } btn--action`}
              >
                {ctaItem.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- olive statement band ---------------- */

export function StatementBand() {
  return (
    <section className="relative overflow-hidden bg-olive text-white">
      <Bolt
        className="pointer-events-none absolute -right-10 bottom-[-4rem] w-[300px] text-white opacity-10"
      />
      {/* pixel bot — bottom-left, matching olive section */}
      <svg
        className="pointer-events-none absolute -left-4 bottom-0 w-[360px] text-white opacity-[0.08]"
        viewBox="0 0 40 32"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="10" y="8" width="20" height="18" />
        <rect x="15" y="14" width="4" height="4" fill="rgba(0,0,0,0.3)" />
        <rect x="21" y="14" width="4" height="4" fill="rgba(0,0,0,0.3)" />
        <rect x="6" y="14" width="4" height="6" />
        <rect x="14" y="26" width="5" height="5" />
        <rect x="21" y="26" width="5" height="5" />
      </svg>
      <div
        className="relative mx-auto max-w-[var(--content-max)] pt-[var(--section-standard)] pb-[clamp(10rem,26vw,20rem)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <h2 className="type-statement text-white">{statement.headline}</h2>
        <p className="type-body mt-16 max-w-[52ch] text-white/80 lg:ml-auto lg:text-right">
          {statement.note}
        </p>
      </div>
    </section>
  );
}

/* ---------------- about ---------------- */

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[var(--nav-height)] bg-cream-tint">
      <div
        className="relative mx-auto grid max-w-[var(--content-max)] gap-12 pt-[var(--section-loud)] pb-[var(--section-loud)] lg:grid-cols-[1.4fr_1fr]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <div>
          <p className="type-micro mb-4 text-brand">ABOUT ME</p>
          <h2 className="type-statement mb-8 text-ink">{about.headline}</h2>
          {about.body.split("\n\n").map((para) => (
            <p key={para.slice(0, 20)} className="type-body mb-6 max-w-[52ch]">
              {para}
            </p>
          ))}
        </div>

        <div className="flex flex-col justify-end">
          <div className="border-l-2 border-brand pl-6 py-4">
            <p className="type-micro text-brand mb-2">{about.current.label}</p>
            <p className="type-h3 text-ink mb-2">{about.current.text}</p>
            <p className="type-body text-ink-soft">{about.current.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- skills ---------------- */

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-[var(--nav-height)]">
      <div
        className="mx-auto max-w-[var(--content-max)] pt-[var(--section-loud)] pb-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="type-micro mb-4 text-brand">SKILLS — 04 GROUPS · 30 ITEMS</p>
            <h2 className="type-statement text-ink">What I work with.</h2>
          </div>
          <p className="type-micro hidden text-ink-faint md:block" aria-hidden="true">
            01 — 04
          </p>
        </header>

        <div className="hairline-grid hairline-grid--2">
          {skills.map((group, gi) => (
            <article
              key={group.category}
              className="bg-white/80 p-8 backdrop-blur-[1px]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(45,47,51,0.07) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <TierChip count={group.tier} label={group.category} />
                <span className="type-micro tabular-nums text-ink-faint">
                  {String(gi + 1).padStart(2, "0")} / 04
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-line bg-white px-3 py-[7px] font-mono text-[13px] font-[300] uppercase tracking-[0.05em] leading-none text-ink-cool shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- education ---------------- */

export function EducationSection() {
  return (
    <section>
      <div
        className="mx-auto max-w-[var(--content-max)] pt-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <p className="type-micro mb-4 text-brand">EDUCATION</p>

        <article className="hairline-grid hairline-grid--2">
          <div className="bg-cream p-8">
            <h3 className="type-h3 text-ink">{education.school}</h3>
            <p className="type-body text-ink-soft mt-2">{education.degree}</p>
            <p className="type-micro text-ink-faint mt-2">{education.period}</p>
          </div>

          <div className="bg-cream p-8">
            <p className="type-micro text-ink-soft mb-3">COURSEWORK</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="inline-block rounded-full border border-line bg-bg-soft px-3 py-1 type-micro text-ink-cool"
                >
                  {course}
                </span>
              ))}
            </div>

            <p className="type-micro text-ink-soft mb-3">ACHIEVEMENTS</p>
            <ul className="space-y-2">
              {education.achievements.map((item) => (
                <li key={item} className="type-body flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------------- projects ---------------- */

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="flex min-h-[24rem] flex-col gap-6 bg-cream p-8">
      <TierChip count={project.tier} label={project.tierLabel} />
      <div className="mt-6">
        <h3 className="type-card text-ink">{project.name}</h3>
        <p className="type-body mt-2 text-ink-soft">{project.tagline}</p>
      </div>
      <p className="type-body">{project.body}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {project.metrics.map((metric) => (
          <li key={metric} className="type-micro flex items-center gap-2 text-ink-soft">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {metric}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-6 pt-4">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label inline-flex items-center gap-1.5 text-brand hover:text-brand-dark transition-colors"
          >
            {link.label} <ExternalIcon className="h-3.5 w-3.5 opacity-70" />
          </a>
        ))}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-[var(--nav-height)]">
      <div
        className="mx-auto max-w-[var(--content-max)] pt-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-micro mb-4 text-brand">SELECTED WORK — 10 SYSTEMS</p>
            <h2 className="type-statement text-ink">Production-grade systems.</h2>
          </div>
          <a
            href={moreProjects.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label link-crossfade hidden text-ink-soft md:inline-flex"
          >
            {moreProjects.label} <span aria-hidden="true">&gt;</span>
          </a>
        </header>

        <div className="hairline-grid hairline-grid--3">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <p className="type-body mt-6 max-w-[70ch]">{moreProjects.note}</p>
      </div>
    </section>
  );
}

/* ---------------- experience ---------------- */

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-[var(--nav-height)]">
      <div
        className="mx-auto max-w-[var(--content-max)] pt-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <p className="type-micro mb-4 text-brand">EXPERIENCE — IIT JODHPUR</p>
        <h2 className="type-statement mb-12 text-ink">Research that shipped.</h2>

        <div className="hairline-grid hairline-grid--2">
          {experience.map((job) => (
            <article key={job.role} className="flex flex-col gap-4 bg-cream p-8">
              <p className="type-micro text-ink-soft">
                {job.period} · {job.location}
              </p>
              <h3 className="type-h3 text-ink">
                {job.role} — {job.org}
              </h3>
              <ul className="space-y-3">
                {job.points.map((point) => (
                  <li key={point.slice(0, 24)} className="type-body">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="type-micro mt-auto pt-4 text-ink-faint">{job.stack}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- research & writing ---------------- */

const publicationsList = [
  ...publications.map((p) => ({ ...p, kind: "PAPER" })),
  ...writing.map((w) => ({ ...w, kind: "ESSAY" })),
];

export function ResearchSection() {
  return (
    <section id="research" className="scroll-mt-[var(--nav-height)]">
      <div
        className="mx-auto max-w-[var(--content-max)] pt-[var(--section-loud)] pb-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <p className="type-micro mb-4 text-brand">RESEARCH & WRITING</p>
        <h2 className="type-statement mb-12 text-ink">Published & written.</h2>

        <ul className="border-t border-line">
          {publicationsList.map((item) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6"
              >
                <span className="type-h3 max-w-[36ch] text-ink link-crossfade">{item.title}</span>
                <span className="type-micro text-ink-soft">
                  {item.kind} · {item.venue} <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- CTA band (orange + bolt slash) ---------------- */

export function CtaBand() {
  return (
    <section id="contact" className="relative scroll-mt-[var(--nav-height)] overflow-hidden bg-brand text-white">
      <Bolt className="pointer-events-none absolute -right-[8%] -top-[10%] h-[130%] w-auto text-brand-deep" />
      <div
        className="relative mx-auto max-w-[var(--content-max)] py-[var(--section-loud)]"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <h2 className="type-display-2">
          {cta.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="type-body mt-10 max-w-[52ch] text-white/90">{cta.copy}</p>
        <a href={cta.button.href} className="btn btn--display btn--white mt-12">
          {cta.button.label}
        </a>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

export function SiteFooter() {
  return (
    <footer className="bg-cream">
      <div
        className="mx-auto max-w-[var(--content-max)] pt-8"
        style={{ paddingInline: "var(--page-inset)" }}
      >
        <p className="type-lockup py-16 text-ink-cool">
          {footerLockup.map((word, i) => (
            <span key={word} className="block fade-in-up" style={{ "--reveal-delay": `${i * 0.15}s` } as React.CSSProperties}>
              {word}
            </span>
          ))}
        </p>

        {/* living bottom border — bots stand on the divider line itself */}
        <BotArena />

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8">
          <p className="type-micro text-ink-soft">
            © 2026 {owner.name} — {owner.school}
          </p>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            <a href={owner.github} target="_blank" rel="noopener noreferrer" className="type-label link-crossfade text-ink-soft">
              GitHub
            </a>
            <a href={owner.linkedin} target="_blank" rel="noopener noreferrer" className="type-label link-crossfade text-ink-soft">
              LinkedIn
            </a>
            <a href={owner.leetcode} target="_blank" rel="noopener noreferrer" className="type-label link-crossfade text-ink-soft">
              LeetCode
            </a>
            <a href={owner.resume} target="_blank" rel="noopener noreferrer" className="type-label link-crossfade text-ink-soft">
              Resume
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
