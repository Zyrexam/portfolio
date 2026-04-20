export default function Activity() {
  const currentStack = ["Go", "Kubernetes", "Redis"];
  const reading = "Designing Data-Intensive Applications";
  
  return (
    <section className="py-20 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Currently Building */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#f0f0f0] font-mono text-sm uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#98FF00] animate-pulse" />
            Currently Building
          </div>
          <div className="p-6 bg-[#1a1f3a]/30 border border-slate-700/50 rounded-lg space-y-4">
            <h3 className="text-xl font-bold font-mono text-white">Project: Distributed Key-Value Store</h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Implementing Raft consensus for high availability and consistent data replication. 
              Focusing on write-ahead logging (WAL) and snapshotting.
            </p>
            <div className="flex gap-3">
              {currentStack.map(s => (
                <span key={s} className="text-[10px] font-mono text-[#7FD4E8]">#{s.toLowerCase()}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Reading List */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#f0f0f0] font-mono text-sm uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FF6B9D]" />
            Reading List
          </div>
          <div className="p-6 bg-[#1a1f3a]/30 border border-slate-700/50 rounded-lg">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-slate-800 rounded">
                <svg className="w-6 h-6 text-[#7FD4E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-white font-bold">{reading}</p>
                <p className="text-[#a0a0a0] text-xs">Martin Kleppmann</p>
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#7FD4E8]" />
                </div>
                <p className="text-[10px] text-[#a0a0a0] mt-1 italic">65% complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Snippets */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-[#f0f0f0] font-mono text-sm uppercase tracking-widest">
           // engineering_notes
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Building a Raft implementation from scratch", date: "Apr 10" },
            { title: "Why I switched from REST to gRPC for microservices", date: "Mar 28" },
            { title: "Debugging an elusive memory leak in Production", date: "Feb 15" }
          ].map(post => (
            <a key={post.title} href="#" className="p-6 border border-slate-700/50 hover:border-[#7FD4E8]/50 transition-all space-y-4 group">
              <span className="text-[10px] font-mono text-[#a0a0a0]">{post.date}</span>
              <h4 className="text-white font-bold leading-snug group-hover:text-[#7FD4E8]">{post.title}</h4>
              <div className="text-[10px] items-center gap-2 flex text-[#7FD4E8] font-mono">
                Read post <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
