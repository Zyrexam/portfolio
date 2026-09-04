# Portfolio UI — Observed Surface

> Record of what the running UI at `http://localhost:3000` actually contains/expands, based on visual + a11y snapshot. Only UI-present content. No code-level inference.

## Layout model
- Single page, App Router. Sections as anchors: `#top` (Hero), `#about`, `#skills`, `#experience`, `#projects`, `#contact`.
- Fixed header (`64px`, backdrop blur when `.scrolled`). Bottom-fixed scroll progress bar (cyan, `3px`).
- Mobile-first. Desktop ≥768px shows desktop nav; toggle hidden. ≥1024px two-column grids kick in.
- `scroll-margin-top: 80px` on sections. Smooth scroll via inline styles.
- Background: dark `#0A0E12` noise texture, fixed grain overlay at top (`z-index:200`, `pointer-events:none`).

## Header (all views)
- Left: `M` monogram badge + "Mohit Kumar" (name hidden on mobile).
- Center nav links (desktop): `//01About /02Skills /03Experience /04Work /05Contact`. Active link highlighted by `IntersectionObserver` (`-40% 0px -55% 0px` margins). Hover underline anim + `whileHover scale 1.05`.
- Right: "Resume" button → Google Drive PDF (opens new tab). Mobile: hamburger → × toggle.
- Mobile menu: full-list slides down with staggered links; CTA "Download Resume".

## Hero (`#top`)
- Sub-label: `operational — 304 solved · IIT '26 · India` (304 from LeetCode fetch via API fallback `240+`, hero uses `300+`).
- H1 split-reveal: "MOHIT" then "KUMAR" (uppercase, giant clamp `4.5rem–14rem`, word-stagger `0.08s`).
- Subtitle (parallax Y on scroll): "Backend engineer — I build **distributed systems**, async pipelines, and **high-throughput APIs**."
- CTAs (staggered, magnetic hover): Selected work → `#projects` | GitHub → github.com/Zyrexam (new tab) | LinkedIn (new tab) | LeetCode 304+ → leetcode.com/u/mohitkumar4.
- Right column: `SpecCard` "Specifications" terminal-style panel with rows: Education IIT Jodhpur | Class 2026 | Location India | Email mohitkumar4922251@gmail.com | GitHub github.com/Zyrexam | LeetCode mohitkumar4 · 304+. Parallax on scroll.
- Base grid + floating cyan accent squares (`pointer-events-none`).

## About (`#about`)
- Eyebrow `GET IN TOUCH` style `//01 ABOUT ME`.
- H2: "Backend engineer who builds systems that are simple, reliable, and fast."
- Two-column grid (≥1024px): left tagline; right body copy + "Currently" callout.
  - Currently box: "Distributed webhook infrastructure" + detail "Redis-backed retry scheduling · exponential backoff · circuit breaker patterns". Rotated `-0.5deg`, status dot.

## Skills (`#skills`)
- Eyebrow `//02 WHAT I WORK WITH`.
- H2: "What I work with."
- Two-column grid (≥1024px) of `.skill-card` panels, each with heading + tag list + hover glow.
  - Languages: Java, Python, C++, Kotlin, JavaScript, TypeScript, SQL, Solidity, Go.
  - Frameworks & Cloud: React, FastAPI, Spring Boot, Redis, PostgreSQL, MySQL, MongoDB, Firebase, AWS (S3, EC2), GCP, REST APIs, gRPC.
  - Tools & DevOps: Docker, Git, GitHub, CI/CD, Linux, Postman, GitHub Actions, Prometheus, Grafana, IntelliJ IDEA, Android Studio, Ollama.
  - Systems & Research: Distributed Systems, System Design, Caching Strategies, Scalability.

## Experience (`#experience`)
- Eyebrow `//03 EXPERIENCE`.
- Vertical timeline (left spine, cyan dots):
  - Federated Learning Researcher — IIT Jodhpur · Jun 2025 — Jul 2025. 3 bullets (FedMeet 85% acc, IMU XGBoost 91.19% CV, backend integration).
  - NLP → Solidity Compiler — IIT Jodhpur · Sep 2025 — Jan 2026. 3 bullets (three-phase pipeline, validated JSON + rule-constrained + auto-repair, Slither/Mythril/Semgrep + LLM patching).

## Projects (`#projects`)
- Eyebrow `//04 SELECTED WORK`.
- Two-column grid (≥1024px) of `.proj-card`:
  1. Webhook Delivery System — GitHub. FastAPI/PostgreSQL/Redis/Python. "202 Accepted · exponential backoff 2s→32s · circuit breaker 60s cooldown."
  2. Payment Idempotency Proxy — GitHub. FastAPI/Redis/PostgreSQL/Docker/Prometheus/Grafana. "20 concurrent → 1 txn · 95.9% cache hit · SHA-256 tamper detection."
  3. Well-Log-Analyzer — Live (new tab). React/FastAPI/Python/PostgreSQL/AWS S3/Groq. "90% frontend latency · 10,000 rows/sec · Groq GeoBot."
  4. TurboTTS-Proxy — GitHub. Go/gRPC/Redis/Kubernetes/Docker/HTTP2. "320ms→<2ms cold TTFA · SHA-256 hashing · K8s orchestrated."
  5. CloudVault — GitHub. Java/Spring Boot/React/Firebase/GCP. "Sub-500ms upload under 50 users · GCP+Firebase · stateless Spring Security."
  6. Spring Email Scheduler — GitHub. Java/Spring Boot/Quartz/MySQL. "Sub-second delays · auto job recovery · MySQL Quartz persistence."
  7. Secure Contract Pipeline — GitHub. Solidity/Python/Static Analysis/LLM. "Slither+Mythril+Semgrep · LLM patching · end-to-end."
  8. FedMeet — Research (new tab, ACM link). Python/Flower/BiLSTM. "87.97% acc · gated sensor fusion · beats FedProx/FedPer/ClusterFL."
  - Each card: type badge + title + desc + tag pills + outcome line + "View → {GitHub|Live|Research}". Hover: cyan shadow + `-2px,-2px` translate.

## Contact (`#contact`)
- Section `padding-top/bottom: 2rem` (tighter than other sections).
- Eyebrow `//05 GET IN TOUCH`.
- H2: "Open to backend roles, projects, and good teams."
- Sub: "If you think I might be a fit, feel free to reach out."
- Left column (6/12 ≥1024px):
  - Email link: `mohitkumar4922251@gmail.com` (mailto) with envelope icon + arrow.
  - Socials: GitHub, LinkedIn icons; LeetCode pill (count badge fetched live, fallback `240`).
- Right column (6/12) contact form:
  - Fields: Name (text), Email (email), Message (textarea). All `required`, placeholders, client validation (regex email, non-empty).
  - Submit button: "Send message" with arrow SVG → POST `/api/contact` (Resend). Inline spinner on submit, inline toast (fixed bottom-right, success/error, 4.2s auto-dismiss). Fallback line: "Prefer email? Reach me at mohitkumar4922251@gmail.com".
  - Validation errors surfaced only via toast ("Missing details"/"Check your email").

## Footer (all views)
- "imported from: github · leetcode · iit-jodhpur · production" caption.
- "M Mohit Kumar — Backend Engineer" + "Built with care · IIT Jodhpur · served in {1226ms}ms 2026".
- "Back to top" → `#top`.

## Observed interactive behaviors
- Magnetic hover on all CTA buttons (8px max offset, spring stiffness 300/damping 18) and the Send button (`-translate-x/y-0.5` + shadow).
- 3D tilt (`.tilt-card.tsx`) — present in code; not visibly surfaced in current layout snapshot (project cards use plain hover translate, not TiltCard).
- Word-reveal hero headline; fade-up section reveals (`whileInView`, once, `-80px` margin); staggered form/social reveals.
- `IntersectionObserver` section-active nav highlight.
- `prefers-reduced-motion` disables all animations, restores `scroll-behavior:auto`.
- No `<img>` assets used anywhere (icons inline SVG). `public/` holds only `icon.svg` (favicon) + `Feather.png` (not visibly referenced in snapshot).
- No loading.tsx/error.tsx boundaries; no `<Suspense>` (note: `app/error.tsx` exists on disk but is untracked).
