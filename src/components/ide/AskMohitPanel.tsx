"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Bot, User, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's Mohit's strongest backend project?",
  "How does the payment idempotency proxy work?",
  "What's Mohit's LeetCode count?",
  "What research did Mohit do at IIT Jodhpur?",
  "How can I contact Mohit?",
];

export function AskMohitPanel() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: question.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `request failed (${res.status})`);
      }
      const answer =
        typeof data.answer === "string" && data.answer.trim()
          ? data.answer
          : "(no answer returned)";
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#2d2d30]">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-vsc-green" />
          <span className="text-[14px] font-bold tracking-wide text-white">
            Ask Mohit
          </span>
          <span className="text-[11px] font-mono text-vsc-dim ml-2">
            {"// AI Q&A — answers from Mohit's portfolio"}
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="rounded p-1 text-[#cccccc]/60 hover:bg-[#3c3c3c] hover:text-white"
            title="Clear chat"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {/* Chat scroll area */}
      <div ref={scrollRef} className="vscode-scroll flex-1 overflow-y-auto px-6 py-4">
        <div className="mx-auto w-full max-w-3xl">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-mono text-vsc-dim leading-relaxed">
              Ask me anything about Mohit — his projects, research, publications, skills, or
              how to reach him. The AI answers only from his real portfolio
              details (RAG from a portfolio context doc).
            </p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={loading}
                className="text-left rounded bg-[#252526] ring-1 ring-[#2d2d30] px-3 py-2 text-[12px] font-mono text-[#9cdcfe] hover:ring-[#007acc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0e4429]/40 ring-1 ring-[#26a641]/30">
                      <Bot size={13} className="text-[#73c991]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded px-2.5 py-1.5 text-[12px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#0e639c] text-white"
                        : "bg-[#1e1e1e] text-[#cccccc] ring-1 ring-[#2d2d30]"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#007acc]">
                      <User size={13} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 items-center"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0e4429]/40 ring-1 ring-[#26a641]/30">
                  <Bot size={13} className="text-[#73c991]" />
                </div>
                <div className="rounded bg-[#1e1e1e] ring-1 ring-[#2d2d30] px-2.5 py-1.5 text-[12px] text-vsc-dim flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" /> thinking…
                </div>
              </motion.div>
            )}
            {error && (
              <div className="rounded bg-[#5a2d2d]/40 ring-1 ring-[#f44747]/40 px-2.5 py-1.5 text-[11px] font-mono text-[#f44747]">
                {error}
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#2d2d30] px-6 py-3">
        <div className="mx-auto w-full max-w-3xl flex items-center gap-1.5 rounded bg-[#252526] px-3 py-2 ring-1 ring-[#3c3c3c] focus-within:ring-[#007acc] transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            placeholder="Ask about Mohit… (Enter to send)"
            disabled={loading}
            className="flex-1 bg-transparent font-mono text-[13px] text-[#cccccc] placeholder:text-vsc-dim outline-none min-w-0"
          />
          <button
            onClick={() => ask(input)}
            disabled={loading || !input.trim()}
            className="rounded p-1 text-vsc-green hover:bg-[#3c3c3c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
            title="Send"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}