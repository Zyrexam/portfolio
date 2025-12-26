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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 space-y-12">
      {/* Header with Line */}
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl font-serif font-bold text-white">
          <span className="text-cyan-400 font-mono text-lg mr-2">05.</span>
          Get In Touch
        </h2>
        <div className="h-[1px] flex-1 bg-slate-700/50 max-w-md hidden sm:block" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Intro Text */}
        <div className="text-center space-y-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Let's Build Something Together
          </h3>
          <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed text-base md:text-lg">
            I'm currently open to new opportunities and conversations. Whether
            you have a question, a project idea, or just want to connect, my
            inbox is always open.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 bg-slate-800/40 border border-slate-700/50 rounded-lg p-8 shadow-xl hover:border-cyan-500/20 transition-all">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-mono text-slate-300">
                Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg 
                           text-slate-200 placeholder-slate-500 
                           focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                           transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-mono text-slate-300">
                Email <span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg 
                           text-slate-200 placeholder-slate-500 
                           focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                           transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-mono text-slate-300">
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me about your project or just say hi..."
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg 
                           text-slate-200 placeholder-slate-500 
                           focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                           transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-3 
                           border border-cyan-500 text-cyan-400 font-mono text-sm 
                           hover:bg-cyan-500/10 active:bg-cyan-500/20
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all rounded-lg shadow-lg shadow-cyan-500/10
                           hover:shadow-cyan-500/20 hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Message sent successfully! I'll get back to you soon.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Contact */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Prefer email directly?</p>
          <a
            href="mailto:mohitkumar4922251@gmail.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm px-4"
          >
            mohitkumar4922251@gmail.com
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
