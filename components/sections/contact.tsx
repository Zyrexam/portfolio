"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-cyan-400 font-mono text-sm tracking-widest">
          05. What's Next?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Get In Touch
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 leading-relaxed text-lg">
          I’m currently open to new opportunities and conversations. Whether
          you have a question, a project idea, or just want to connect, feel
          free to reach out.
        </p>
      </div>

      {/* Contact Form */}
      <form
        className="max-w-xl mx-auto space-y-6 bg-slate-800/40 border border-cyan-500/10 rounded-lg p-8"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-mono text-slate-400">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded 
                       text-slate-200 placeholder-slate-500 
                       focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-mono text-slate-400">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded 
                       text-slate-200 placeholder-slate-500 
                       focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-mono text-slate-400">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Your message"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded 
                       text-slate-200 placeholder-slate-500 
                       focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 border 
                       border-cyan-500 text-cyan-400 font-mono text-sm 
                       hover:bg-cyan-500/10 transition-colors rounded"
          >
            Send Message →
          </button>
        </div>
      </form>
    </section>
  );
}
