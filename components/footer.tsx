"use client";

import { personal } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-black border-t-[3px] border-solid border-black">
      <div className="container">
        <div className="footer-inner font-serif font-bold uppercase">
          <div className="footer-id">
            <span className="mark border-[3px] border-black rounded-none">M</span>
            <div>
              <div className="name">
                {personal.name}<span className="text-black/50"> — Backend Engineer</span>
              </div>
              <div className="sub text-black/50">Built with care · IIT Jodhpur</div>
            </div>
          </div>
          <div className="footer-right">
            <span className="text-sm text-black/50">{year}</span>
            <a className="inline-flex items-center gap-2 border-[3px] border-black rounded-none px-4 py-2 text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors" href="#top">
              Back to top
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
