"use client";

import { useEffect, useState } from "react";

const quotes = [
  "Designing scalable backend systems.",
  "Engineering for performance and reliability.",
  "Building systems that scale under load.",
  "Optimizing backend architecture.",
  "Focused on correctness and efficiency.",
];

export default function SidebarProfile() {
  const [isFixed, setIsFixed] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentQuote.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentQuote.slice(0, displayText.length + 1));
        }, 60); // typing speed
      } else {
        // Pause after typing
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1400);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentQuote.slice(0, displayText.length - 1));
        }, 35); // deleting speed
      } else {
        setIsDeleting(false);
        setQuoteIndex((i) => (i + 1) % quotes.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, quoteIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`space-y-6 ${isFixed ? "fixed top-24 right-8" : ""}`}>
      {/* Profile Image */}
      <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-colors mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 opacity-20" />
        <img
          src="/unnamed.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Text */}
      <div className="text-center">
        <h2 className="text-lg font-serif font-bold text-slate-100">
          Mohit Kumar
        </h2>
        <p className="mt-2 text-xs text-slate-500 font-mono min-h-[1.5em]">
          {displayText}
          <span className="inline-block w-[1ch] animate-pulse text-cyan-400 font-bold">
            |
          </span>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 justify-center">
        <a
          href="https://github.com/Zyrexam"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors group relative"
          aria-label="GitHub"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-cyan-500/20 z-10">
            GitHub
          </span>
        </a>
        <a
          href="https://leetcode.com/u/mohitkumar4/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors group relative"
          aria-label="LeetCode"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.843 5.843 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.479 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-2.511-2.03-6.893-1.751-9.065.575L2.374 10.435a2.84 2.84 0 0 1-.033.024 2.84 2.84 0 0 1-.033-4.018l3.855-4.127 5.397-5.787a1.374 1.374 0 0 0 0-1.944 1.374 1.374 0 0 0-.96-.438h-.001z" />
          </svg>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-cyan-500/20 z-10">
            LeetCode
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/mohit-kumar-sp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors group relative"
          aria-label="LinkedIn"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          </svg>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-cyan-500/20 z-10">
            LinkedIn
          </span>
        </a>
      </div>
    </div>
  );
}
