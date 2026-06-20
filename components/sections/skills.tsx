"use client";

import {
  SiAndroidstudio,
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiIntellijidea,
  SiJavascript,
  SiKotlin,
  SiLinux,
  SiMysql,
  SiOllama,
  SiPostgresql,
  SiPostman,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSolidity,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { useReveal } from "@/hooks/use-reveal";
import { skillGroups } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaJava,
  SiPython,
  SiCplusplus,
  SiKotlin,
  SiJavascript,
  SiTypescript,
  SiSolidity,
  SiSpringboot,
  SiReact,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  FaAws,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiIntellijidea,
  SiAndroidstudio,
  VscVscode,
  SiOllama,
};

function SkillTag({
  name,
  iconName,
}: {
  name: string;
  iconName: string | null;
}) {
  const Icon = iconName ? iconMap[iconName] : null;
  return (
    <li className="skill-tag">
      {Icon ? (
        <Icon />
      ) : (
        <span className="mono">{name.slice(0, 2).toUpperCase()}</span>
      )}
      {name}
    </li>
  );
}

function SkillCard({ group, index }: { group: (typeof skillGroups)[number]; index: number }) {
  const { ref, isIn } = useReveal();

  return (
    <div
      ref={ref}
      className={`skill-card${isIn ? " is-in" : ""}`}
      style={{
        opacity: isIn ? undefined : 0,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div className="skill-head">
        <h3>{group.title}</h3>
        {group.learning ? (
          <span className="skill-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            learning
          </span>
        ) : (
          <span className="skill-count">
            {String(group.items.length).padStart(2, "0")}
          </span>
        )}
      </div>
      <ul className="skill-tags">
        {group.items.map((item) => (
          <SkillTag
            key={item.name}
            name={item.name}
            iconName={item.icon}
          />
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const { ref: headRef, isIn: headIn } = useReveal();

  return (
    <section id="skills">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head${headIn ? " is-in" : ""} reveal`}
        >
          <span className="idx">04</span>
          <span className="lbl">Skills</span>
          <span className="end">Stack &amp; tooling</span>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
