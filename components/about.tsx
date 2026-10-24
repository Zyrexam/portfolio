import Image from "next/image";
import { Reveal } from "./reveal";
import { Skills } from "./skills";
import { FEDMEET_PAPER, TCS_PAPER } from "@/lib/links";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>01.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>About Me</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
      </Reveal>

      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <Reveal>
            <h3 className="max-w-[26ch] text-[23px] font-semibold leading-[1.3] tracking-tight sm:text-[27px]" style={{ color: "var(--ws-text-primary)" }}>
              I&apos;m Mohit Kumar, a software engineer focused on backend and distributed systems.
            </h3>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.75]" style={{ color: "var(--ws-text-muted)" }}>
              I completed my B.Tech in Computer Science at IIT Jodhpur in 2026. There, I worked on an NLP-to-Solidity compiler and FedMeet, federated learning research published at <a href={FEDMEET_PAPER} target="_blank" rel="noreferrer" className="underline decoration-[var(--ws-border-strong)] underline-offset-4 transition-colors hover:text-[var(--ws-text-primary)]">ACM ICDCN 2026</a>. My research on activity-adjusted stake consensus was also published in <a href={TCS_PAPER} target="_blank" rel="noreferrer" className="underline decoration-[var(--ws-border-strong)] underline-offset-4 transition-colors hover:text-[var(--ws-text-primary)]"><em>Theoretical Computer Science</em></a>.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.75]" style={{ color: "var(--ws-text-muted)" }}>
              I build services and tools that make complex work dependable, from VideoScale&apos;s background video processing to Workflow-Engine&apos;s resumable jobs. I care about clear APIs, durable state, and systems that recover cleanly when something fails.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mx-auto w-full max-w-[300px] lg:mr-0">
            <div className="relative aspect-square overflow-hidden rounded-2xl border" style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)", boxShadow: "0 20px 44px rgba(0,0,0,0.22)" }}>
              <Image
                src="/profile.jpeg"
                alt="Mohit Kumar"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 240px"
                className="object-cover object-[center_24%]"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <Skills />
    </section>
  );
}
