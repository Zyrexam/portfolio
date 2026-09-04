# 07: Polish, accessibility & performance QA

**What to build:** Production-ready pass: `prefers-reduced-motion` respected by every animation, mobile viewport pass, bundle sanity, green build. The site is demoable end-to-end.

**Blocked by:** 02: Hero, 03: Navigation, 04: Sections, 05: Projects, 06: Contact/footer

**Status:** ready-for-agent

- [ ] All framer-motion animations no-op or degrade gracefully under prefers-reduced-motion
- [ ] Mobile pass: hero scale, nav, forms, cards usable at 375px
- [ ] No layout shift from font loading; scrollbar/overflow clean
- [ ] `pnpm lint` + `pnpm build` green
- [ ] Screenshot verification via web tools at desktop + mobile widths
