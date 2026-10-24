import Image from "next/image";
import { Reveal } from "./reveal";

const TECH = ["Java", "Python", "C++", "Go", "TypeScript", "Spring Boot", "FastAPI", "Redis", "PostgreSQL", "Docker", "gRPC", "Kubernetes"];

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

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 text-[16px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
          <Reveal>
            <p>
              Hello! I&apos;m Mohit and I enjoy building things that live on the internet — distributed systems, async
              pipelines, and <span style={{ color: "var(--ws-silver)" }}>payment-grade APIs</span> where reliability,
              performance, and clean system design meet. My interest in backend engineering started at IIT Jodhpur,
              where I went from writing my first Spring Boot service to obsessing over exactly-once semantics.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p>
              Fast-forward to today, and I&apos;ve had the privilege of{" "}
              <span style={{ color: "var(--ws-silver)" }}>publishing peer-reviewed research</span> at ACM ICDCN &apos;26
              and Elsevier&apos;s Theoretical Computer Science, building payment infrastructure, and shipping systems
              that hold under load. My main focus these days is designing{" "}
              <span style={{ color: "var(--ws-silver)" }}>idempotent, cache-first backends</span> that stay boring at
              3am.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p>Here are a few technologies I&apos;ve been working with recently:</p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px" }}>
              {TECH.map((t) => (
                <li key={t} className="flex items-center gap-2" style={{ color: "var(--ws-text-muted)" }}>
                  <span aria-hidden style={{ color: "var(--ws-silver)" }}>▸</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* portrait tile with teal wash + offset frame, like the reference */}
        <Reveal delay={100}>
          <div className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-[340px]">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border-2"
              style={{ borderColor: "var(--ws-silver)" }}
            />
            <div
              className="relative aspect-square overflow-hidden rounded-md"
              style={{ background: "var(--ws-surface-1)" }}
            >
              <Image
                src="/profile.jpeg"
                alt="Mohit Kumar"
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 256px"
                className="object-cover object-[center_24%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-15 mix-blend-multiply"
                style={{ background: "#64ffda" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, rgba(230,241,255,0.28), transparent 60%), repeating-linear-gradient(45deg, rgba(10,25,47,0.16) 0 2px, transparent 2px 8px)",
                }}
              />
              
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
