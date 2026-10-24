"use client";

import { useState, type FormEvent } from "react";

type SubmissionStatus = {
  kind: "success" | "error";
  message: string;
};

const inputClassName =
  "mt-2 min-h-11 w-full rounded-md border px-3.5 py-3 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-[var(--ws-text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ws-surface-1)]";

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (response.status === 429) {
        setStatus({
          kind: "error",
          message: "Too many messages were sent recently. Please wait a few minutes and try again.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Message delivery failed");
      }

      form.reset();
      setStatus({ kind: "success", message: "Message sent. I’ll get back to you soon." });
    } catch {
      setStatus({
        kind: "error",
        message: "Your message couldn’t be sent. Please try again or email me directly.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSending}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor="contact-name" className="block text-[13px] font-medium" style={{ color: "var(--ws-text-secondary)" }}>
          Name
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            placeholder="Your name"
            required
            className={inputClassName}
            style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-input)", color: "var(--ws-text-primary)" }}
          />
        </label>

        <label htmlFor="contact-email" className="block text-[13px] font-medium" style={{ color: "var(--ws-text-secondary)" }}>
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            inputMode="email"
            maxLength={254}
            placeholder="you@example.com"
            required
            className={inputClassName}
            style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-input)", color: "var(--ws-text-primary)" }}
          />
        </label>
      </div>

      <label htmlFor="contact-message" className="block text-[13px] font-medium" style={{ color: "var(--ws-text-secondary)" }}>
        Message
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="Tell me what you’re working on…"
          required
          className={`${inputClassName} min-h-32 resize-y`}
          style={{ background: "var(--ws-bg)", borderColor: "var(--ws-border-input)", color: "var(--ws-text-primary)" }}
        />
      </label>

      <div>
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-[14px] font-semibold transition hover:brightness-110 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ws-surface-1)]"
          style={{ background: "var(--ws-text-primary)", color: "var(--ws-text-inverse)" }}
        >
          {isSending ? "Sending…" : "Send message"}
        </button>

        {status && (
          <p
            role={status.kind === "error" ? "alert" : "status"}
            aria-live={status.kind === "error" ? "assertive" : "polite"}
            className="mt-4 text-[14px] leading-relaxed"
            style={{ color: status.kind === "error" ? "#fca5a5" : "var(--ws-text-secondary)" }}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
