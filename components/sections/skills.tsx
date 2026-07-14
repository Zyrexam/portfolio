"use client";

import {
  SiAndroidstudio,
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiGo,
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
import { motion } from "framer-motion";
import SectionTag from "@/components/section-tag";
import TiltCard from "@/components/tilt-card";
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
  SiGo,
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

const overshoot: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: overshoot, delay: i * 0.08 },
  }),
};

function SkillTag({ name, iconName }: { name: string; iconName: string | null }) {
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
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
    >
      <TiltCard className="skill-card">
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
            <SkillTag key={item.name} name={item.name} iconName={item.icon} />
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.4, ease: overshoot }}
          className="mb-4"
        >
          <SectionTag label="WHAT I WORK WITH" />
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
