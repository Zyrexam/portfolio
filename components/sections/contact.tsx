"use client";

import { useState } from "react";
import { contactData, social } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";
import SectionTag from "@/components/section-tag";
import LeetCodeBadge from "@/components/leetcode-badge";

const toastClasses = "toast";

export default function Contact() {
  const { ref: leftRef, isIn: leftIn } = useReveal();
  const { ref: formRef, isIn: formIn } = useReveal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    desc: string;
    kind: string;
  } | null>(null);

  function showToast(title: string, desc: string, kind: string) {
    setToast({ title, desc, kind });
    setTimeout(() => setToast(null), 4200);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!name || !email || !message) {
      showToast("Missing details", "Please fill in your name, email, and message.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Check your email", "That email address doesn't look right.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(contactData.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      showToast(
        "Message sent",
        `Thanks ${name.split(" ")[0]} — I'll reply to ${email} soon.`,
        "success"
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      showToast("Something went wrong", "Could not send message. Email me directly.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="mb-4">
          <SectionTag label="GET IN TOUCH" />
        </div>

        <div className="contact-grid">
          <div
            ref={leftRef}
            className="contact-left"
            style={{ opacity: leftIn ? undefined : 0 }}
          >
            <h2 className="contact-headline">{contactData.headline}</h2>
            <p className="contact-sub">{contactData.subtext}</p>

            <a
              className="contact-email arrow-link"
              href={`mailto:${contactData.email}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              {contactData.email}
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <div className="contact-socials">
              <a
                className="social-icon"
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.7 2.6 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                </svg>
              </a>
              <a
                className="social-icon"
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                className="lc-pill arrow-link"
                href={social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
              >
                LeetCode
                <LeetCodeBadge className="lc-badge" />
              </a>
            </div>
          </div>

          <div
            ref={formRef}
            className="contact-right"
            style={{ opacity: formIn ? undefined : 0 }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder="Tell me about the role or project…"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-7 py-3 font-bold uppercase text-sm tracking-wider border-[3px] border-solid border-black rounded-none bg-[#00D9FF] text-black shadow-[4px_4px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_black] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_black]" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-4"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
              <p className="form-fallback">
                Prefer email? Reach me at{" "}
                <a href={`mailto:${contactData.email}`}>
                  {contactData.email}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`${toastClasses}${toast ? " show" : ""}${toast ? ` ${toast.kind}` : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="toast-title">{toast?.title ?? ""}</div>
        <div className="toast-desc">{toast?.desc ?? ""}</div>
      </div>
    </section>
  );
}
