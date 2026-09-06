"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Code2, FileText, Copy, Check, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { contactLinks, profile } from "@/lib/content";

export function ContactView() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="vscode-scroll h-full overflow-y-auto">
      <div className="border-b border-[#2d2d30] px-6 py-5">
        <div className="font-mono text-[11px] text-vsc-dim mb-2">
          {"// contact.md — feel free to reach out"}
        </div>
        <h1 className="font-sans text-2xl font-bold text-white">
          Get in touch
        </h1>
        <p className="mt-1 text-[13px] text-[#cccccc]/80">
          I read every message. Open to full-time backend roles, research
          collaborations & freelance backend work.
        </p>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Links */}
        <section>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-green">[01]</span>
            <span className="text-[13px] font-semibold text-white">Channels</span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {contactLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-3 rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-3 hover:ring-[#007acc] transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded bg-[#1e1e1e] text-vsc-green">
                  <ContactIcon icon={l.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold text-[#cccccc] group-hover:text-white">
                    {l.label}
                  </div>
                  <div className="truncate text-[11px] font-mono text-vsc-dim">
                    {l.value}
                  </div>
                </div>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="rounded p-1.5 hover:bg-[#3c3c3c] text-vsc-dim hover:text-white"
                  title="Open"
                >
                  <Send size={13} />
                </a>
                <button
                  onClick={() => copy(l.href, l.label)}
                  className="rounded p-1.5 hover:bg-[#3c3c3c] text-vsc-dim hover:text-white"
                  title="Copy"
                >
                  {copied === l.label ? <Check size={13} className="text-vsc-green" /> : <Copy size={13} />}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-[10px] text-vsc-green">[02]</span>
            <span className="text-[13px] font-semibold text-white">
              Send a message
            </span>
            <div className="h-px flex-1 bg-[#2d2d30]" />
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `request failed (${res.status})`);
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "unknown error");
    }
  };

  const inputCls =
    "w-full rounded bg-[#1e1e1e] px-3 py-2 font-mono text-[12px] text-[#cccccc] placeholder:text-vsc-dim ring-1 ring-[#3c3c3c] outline-none focus:ring-[#007acc] transition-colors";

  if (status === "sent") {
    return (
      <div className="rounded-md bg-[#1e1e1e] ring-1 ring-[#26a641]/50 p-4">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#73c991]">
          <Send size={14} /> Message sent!
        </div>
        <p className="mt-1 text-[12px] text-vsc-dim">
          Thanks for reaching out — Mohit will get back to you soon. You can also
          email him directly at{" "}
          <a href={`mailto:${profile.email}`} className="text-vsc-green hover:underline">
            {profile.email}
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 rounded bg-[#007acc] px-3 py-1 text-[11px] font-mono text-white hover:bg-[#007acc]/80 transition-colors"
        >
          send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-md bg-[#252526] ring-1 ring-[#2d2d30] p-4 space-y-2"
    >
      <div className="flex items-center gap-2 text-[11px] font-mono text-vsc-dim mb-1">
        <Mail size={12} /> to: <span className="text-vsc-green">{profile.email}</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          className={inputCls}
          maxLength={200}
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          className={inputCls}
          maxLength={200}
        />
      </div>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="your message…"
        rows={5}
        className={`${inputCls} resize-y`}
        maxLength={5000}
      />
      {status === "error" && error && (
        <div className="rounded bg-[#5a2d2d]/40 ring-1 ring-[#f44747]/40 px-3 py-1.5 text-[11px] font-mono text-[#f44747]">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
        className="flex items-center gap-1.5 rounded bg-[#007acc] px-4 py-1.5 text-[12px] font-mono text-white hover:bg-[#1177cc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={12} className="animate-spin" /> sending…
          </>
        ) : (
          <>
            <Send size={12} /> send message
          </>
        )}
      </button>
    </form>
  );
}

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "mail":
      return <Mail size={16} />;
    case "github":
      return <Github size={16} />;
    case "linkedin":
      return <Linkedin size={16} />;
    case "code":
      return <Code2 size={16} />;
    case "file":
      return <FileText size={16} />;
    default:
      return <Send size={16} />;
  }
}