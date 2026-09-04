# 01: Motion foundation & dark design system

**What to build:** The site runs on the "Systems, running." design language: near-black palette, off-white text, cyan accent, JetBrains Mono for labels/numbers. A shared motion kit (spring configs, Reveal primitives, stagger variants) exists and Lenis smooth-scroll is live. All existing sections render coherently on the dark theme with smooth scrolling and the new motion language — even if per-section refinement comes later.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [x] Dark tokens (`#0A0E12` base, `#E8EDF2` fg, `#00D9FF` accent, `#3DD68C` status) flow through the existing `:root`/`@theme` system
- [x] JetBrains Mono loaded via `next/font` and exposed as `--font-mono`
- [x] Shared motion kit module: spring configs, Reveal (fade-up on inView), stagger container/child variants
- [x] Lenis smooth scrolling active, anchor links still work
- [x] No white/black hardcoded surfaces remain on global chrome (nav, footer, body)
- [x] `pnpm build` green; all content/functionality unchanged
