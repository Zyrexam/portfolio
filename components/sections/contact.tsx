"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="mt-24 max-w-4xl border-t border-white/8 pt-16 sm:mt-28 sm:pt-20">
      <div className="section-label mb-8 sm:mb-10">Contact</div>
      <div className="space-y-4">
        <h2 className="max-w-3xl font-serif text-[2.2rem] leading-[1.02] tracking-tight text-foreground sm:text-5xl">
          Open to backend roles,
          <br />
          projects, and <span className="italic text-[#d3c08a]">good teams.</span>
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          If you think I might be a fit, feel free to reach out.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-none border border-white/10 bg-[#2f2f2d] px-4 py-3 text-base normal-case tracking-normal text-foreground placeholder:text-[#6d6d6a] focus:border-white/20 focus:outline-none"
            />
          </label>
          <label className="space-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-none border border-white/10 bg-[#2f2f2d] px-4 py-3 text-base normal-case tracking-normal text-foreground placeholder:text-[#6d6d6a] focus:border-white/20 focus:outline-none"
            />
          </label>
        </div>

        <label className="block space-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell me about the problem you are solving."
            className="w-full resize-none rounded-none border border-white/10 bg-[#2f2f2d] px-4 py-3 text-base normal-case leading-relaxed tracking-normal text-foreground placeholder:text-[#6d6d6a] focus:border-white/20 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mono-button disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
          <a
            href="mailto:mohitkumar4922251@gmail.com"
            className="font-mono text-[11px] text-[#b7aa7d] hover:text-[#d3c08a]"
          >
            mohitkumar4922251@gmail.com
          </a>
        </div>

        {submitStatus === "success" && (
          <p className="text-sm text-muted-foreground">
            Message sent successfully. I&apos;ll get back to you soon.
          </p>
        )}
      </form>
    </section>
  );
}
