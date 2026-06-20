"use client";

import { personal } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-id">
            <span className="mark">M</span>
            <div>
              <div className="name">
                {personal.name}<span className="dim"> — Backend Engineer</span>
              </div>
              <div className="sub">Built with care · IIT Jodhpur</div>
            </div>
          </div>
          <div className="footer-right">
            <span className="footer-year">IIT Jodhpur · {year}</span>
            <a className="btn-top arrow-link" href="#top">
              Back to top
              <svg
                className="arrow"
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
