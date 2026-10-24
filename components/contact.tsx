import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="flex items-baseline gap-3 text-[26px] font-bold tracking-tight sm:text-[30px]">
            <span className="font-mono text-[20px] font-normal" style={{ color: "var(--ws-silver)" }}>05.</span>
            <span style={{ color: "var(--ws-text-primary)" }}>Get In Touch</span>
          </h2>
          <span className="h-px flex-1" style={{ background: "var(--ws-border-strong)" }} />
        </div>
      </Reveal>

      <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal delay={60}>
          <div className="max-w-md">
            <h3 className="text-[30px] font-bold leading-tight tracking-tight sm:text-[36px]" style={{ color: "var(--ws-text-primary)" }}>
              What&apos;s next?
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--ws-text-muted)" }}>
              I&apos;m open to full-time software engineering roles, research collaborations, and freelance systems work.
              Send a note and I&apos;ll get back to you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="rounded-md border p-5 sm:p-7"
            style={{ background: "var(--ws-surface-1)", borderColor: "var(--ws-border-subtle)" }}
          >
            <h3 className="mb-6 text-[18px] font-semibold" style={{ color: "var(--ws-text-primary)" }}>
              Send a message
            </h3>
            <ContactForm />
            <p className="mt-5 border-t pt-4 text-[13px] leading-relaxed" style={{ borderColor: "var(--ws-border-subtle)", color: "var(--ws-text-muted)" }}>
              Your name, email, and message are sent to me by email so I can reply. Please don&apos;t include sensitive information.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
