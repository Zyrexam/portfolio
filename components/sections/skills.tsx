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

const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "Kotlin", icon: SiKotlin },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQL", icon: null },
      { name: "Solidity", icon: SiSolidity },
    ],
  },
  {
    title: "Frameworks & Cloud",
    items: [
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "React", icon: SiReact },
      { name: "FastAPI", icon: SiFastapi },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
      { name: "AWS S3", icon: FaAws },
      { name: "GCP", icon: SiGooglecloud },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    title: "Tools & DevOps",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux", icon: SiLinux },
      { name: "Postman", icon: SiPostman },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Prometheus", icon: SiPrometheus },
      { name: "Grafana", icon: SiGrafana },
      { name: "IntelliJ IDEA", icon: SiIntellijidea },
      { name: "Android Studio", icon: SiAndroidstudio },
      { name: "VS Code", icon: VscVscode },
      { name: "Ollama", icon: SiOllama },
    ],
  },
  {
    title: "Systems & Research",
    items: [
      { name: "Distributed Systems", icon: null },
      { name: "System Design", icon: null },
      { name: "Federated Learning", icon: null },
      { name: "Caching Strategies", icon: null },
      { name: "Scalability", icon: null },
      { name: "Flower (FL)", icon: null },
    ],
  },
];

function SkillIcon({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
}) {
  return (
    <div className="flex min-h-[96px] flex-col items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-3 transition-colors duration-150 hover:border-white/15 hover:bg-white/[0.06] sm:min-h-[104px]">
      <div className="flex h-8 w-8 items-center justify-center text-xl text-muted-foreground sm:text-2xl">
        {Icon ? (
          <Icon className="h-6 w-6" />
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-center font-mono text-[8px] uppercase leading-tight tracking-[0.08em] text-muted-foreground sm:text-[9px] sm:tracking-[0.1em]">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mt-24 max-w-4xl pt-12 sm:mt-28 sm:pt-16">
      <div className="section-label mb-8 sm:mb-10">Skills</div>
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-6"
          >
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4">
              {group.items.map((item) => (
                <SkillIcon key={item.name} name={item.name} icon={item.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
