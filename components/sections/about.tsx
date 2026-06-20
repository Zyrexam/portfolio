"use client";

import { about } from "@/lib/data";
import { useReveal } from "@/hooks/use-reveal";

export default function About() {
  const { ref: headRef, isIn: headIn } = useReveal();
  const { ref: taglineRef, isIn: taglineIn } = useReveal();
  const { ref: bodyRef, isIn: bodyIn } = useReveal();
  const { ref: p1Ref, isIn: p1In } = useReveal();
  const { ref: p2Ref, isIn: p2In } = useReveal();
  const { ref: curRef, isIn: curIn } = useReveal();

  return (
    <section id="about">
      <div className="container">
        <div ref={headRef} className={`section-head${headIn ? " is-in" : ""} reveal`}>
          <span className="idx">03</span>
          <span className="lbl">About</span>
          <span className="end">Profile</span>
        </div>

        <div className="about-grid">
          <h2
            ref={taglineRef}
            className={`about-tagline${taglineIn ? " is-in" : ""}`}
            style={{ opacity: taglineIn ? undefined : 0 }}
          >
            {about.tagline}
          </h2>

          <div
            ref={bodyRef}
            className={`about-body${bodyIn ? " is-in" : ""}`}
            style={{ opacity: bodyIn ? undefined : 0 }}
          >
            <p
              ref={p1Ref}
              style={{
                opacity: p1In ? undefined : 0,
                transform: p1In ? undefined : "translateY(18px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,0.61,0.36,1), transform 0.7s cubic-bezier(0.22,0.61,0.36,1)",
              }}
            >
              {about.paragraphs[0]}
            </p>
            <p
              ref={p2Ref}
              style={{
                opacity: p2In ? undefined : 0,
                transform: p2In ? undefined : "translateY(18px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,0.61,0.36,1), transform 0.7s cubic-bezier(0.22,0.61,0.36,1)",
                transitionDelay: "0.06s",
              }}
            >
              {about.paragraphs[1]}
            </p>

            <div
              ref={curRef}
              className={`currently${curIn ? " is-in" : ""}`}
              style={{
                opacity: curIn ? undefined : 0,
                transform: curIn ? undefined : "translateY(18px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,0.61,0.36,1), transform 0.7s cubic-bezier(0.22,0.61,0.36,1)",
                transitionDelay: "0.12s",
              }}
            >
              <div className="currently-head">
                <span className="dot" aria-hidden="true" />
                <span className="eyebrow">Currently</span>
              </div>
              <p className="currently-title">{about.currently.title}</p>
              <p className="currently-detail">{about.currently.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
