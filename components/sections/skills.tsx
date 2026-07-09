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
import SectionTag from "@/components/section-tag";
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
        <span className="mono font-serif italic text-xs">{name.slice(0, 2).toUpperCase()}</span>
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
        <div>
          <h3>{group.title}</h3>
          <span className="skill-head-underline" />
        </div>
        {group.learning ? (
          <span className="skill-learning-tag">Learning</span>
        ) : null}
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

  return (
    <section id="skills">
      <div className="container">
        <div className="mb-4">
          <SectionTag label="WHAT I WORK WITH" />
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
