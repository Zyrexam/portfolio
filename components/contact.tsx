import { Reveal } from "./reveal";
import { EMAIL } from "@/lib/links";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28 text-center">
      <Reveal>
        <p className="font-mono text-[13px]" style={{ color: "var(--ws-silver)" }}>
          05. What&apos;s Next?
        </p>
        <h2 className="mt-3 text-[36px] font-bold tracking-tight sm:text-[48px]" style={{ color: "var(--ws-text-primary)" }}>
          Get In Touch
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
          I&apos;m open to full-time software engineering roles, research collaborations, and freelance systems work —
          for 2026. Whether you have a question or just want to say hi, my inbox is always open. I&apos;ll do my best to
          get back to you!
        </p>
      </Reveal>

      <Reveal delay={140}>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-10 inline-flex items-center rounded border px-7 py-4 text-[14px] font-medium transition-colors hover:bg-[var(--ws-bg-interactive)]"
          style={{ borderColor: "var(--ws-silver)", color: "var(--ws-silver)" }}
        >
          Say Hello
        </a>
      </Reveal>
    </section>
  );
}
