"use client"

export default function Contact() {
  return (
    <section id="contact" className="space-y-8 py-20 text-center">
      <p className="text-cyan-400 font-mono text-sm">04. What's Next?</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
      <p className="max-w-2xl mx-auto text-slate-300 leading-relaxed text-lg">
        Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a
        question or just want to say hi, feel free to get in touch!
      </p>
      <button className="px-6 py-3 mt-8 border border-cyan-500 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-colors rounded mx-auto block">
        Say Hello
      </button>
    </section>
  )
}
