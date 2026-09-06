# Project Hero Image Prompts

These are ready-to-paste prompts for generating **photorealistic / illustrated** hero images
for each project. They mirror the structure of the SVG heroes in `public/heroes/` (dark IDE
background, VS Code accent colors, project-specific visual metaphor, tagline + key metric).

**Suggested use:**
- Paste into **Gemini** (imagegen), **DALL·E 3**, **Midjourney**, or **Ideogram**.
- Aspect ratio: **4:1 (1600×400)** — wide banner. The site renders each hero in a thin
  container (`h-40 sm:h-48 md:h-56` with `object-cover`), so a 4:1 ratio fills the
  width without top/bottom crop. The current SVGs in `public/heroes/` are 1600×400
  with all key content in a horizontal band — keep that band centered.
- After generation, replace the SVG in `public/heroes/<project>.svg` with the new image
  (update `content.ts` to point to the new file if the extension changes).

---

## 1. Webhook Delivery System
**Accent:** `#007acc` (VS Code blue) · **Metric:** at-least-once delivery with crash recovery

> A wide 4:1 dark IDE-style technical illustration. Background `#1e1e1e` with
> a faint dotted grid. The image is a thin horizontal banner — all key content sits
> in a horizontal band across the middle (about 200px tall in a 400px canvas).
> Layout: project title + tech stack on the right, the central visual metaphor
> (the state machine) on the left/center, and key stat cards beside it. a horizontal state machine of four labeled nodes connected by
> arrows — `PENDING → IN FLIGHT → DELIVERED → DEAD` — plus a dashed fifth node
> `retry queue`. A long curved dashed red arrow loops from `DEAD` back to `IN FLIGHT`
> (the retry path). On the right, a dark terminal panel shows `tail -f deliveries.log`
> streaming webhook events with colored severity dots. Monospace typography. The
> dominant accent color is VS Code blue (`#007acc`); supporting tones are teal
> (`#4ec9b0`) for success and muted red (`#f44747`) for failure. Cinematic
> lighting, very subtle screen glow. Title overlay: "Webhook Delivery System".

---

## 2. Payment Idempotency Proxy
**Accent:** `#4ec9b0` (teal) · **Metric:** 20 concurrent requests → exactly 1 transaction

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Left side: a 4×5 grid
> of 20 small numbered circles representing concurrent requests. A single thick
> teal arrow points from the grid to a large locked-padlock icon labeled
> "EXACTLY 1" with `Redis SET NX + Lua` annotation. Below: three stat cards
> — "duplicate charges: 0", "cache hit rate: 95.9%", "tamper detection: SHA-256".
> Right side: subtle Prometheus + Grafana dashboard mockup in the background.
> Monospace typography. Accent color `#4ec9b0`. Subtle glow around the lock
> to suggest safety. Cinematic dark UI look.

---

## 3. Well-Log Analyzer (OneGeo)
**Accent:** `#dcdcaa` (yellow) · **Metric:** 50,000+ rows visualized at −90% latency

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Center: a wide
> well-log chart showing a real-looking Gamma Ray vs. depth curve — a wiggly
> yellow line with shaded fill below it. To the right of the chart: a small
> "GeoBot" card with a chat bubble reading
> "Hydrocarbon potential at 5,420 ft: high" in a code-style font. Top-right:
> three stat chips — "50,000+ rows", "−90% latency", "10k rows/sec". Monospace
> typography. Dominant accent `#dcdcaa`. Subtle Groq/Llama reference in the
> corner. Cinematic dark dashboard aesthetic.

---

## 4. TurboTTS-Proxy
**Accent:** `#569cd6` (cyan) · **Metric:** 320ms cold TTFA → < 2ms cache hit

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Dominant visual: a
> horizontal latency comparison chart — a long red bar labeled "OpenAI TTS 320ms"
> over a tiny blue dot labeled "TurboTTS-Proxy < 2ms". Below: a three-node
> gRPC streaming flow — `client → proxy (Go) → OpenAI TTS` — with one solid
> arrow (cache hit) and one dashed arrow (cache miss → upstream). Tech-stack
> pills at the bottom: Go, gRPC, Redis, Kubernetes, HTTP/2. Monospace
> typography. Accent `#569cd6`. Subtle waveform detail on the bars. Cinematic
> dark IDE look.

---

## 5. CloudVault
**Accent:** `#c586c0` (purple) · **Metric:** sub-500ms upload, 50 concurrent users

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Left: a 5×5 grid of
> 25 small user icons (circles) representing concurrent users. Center: a
> Spring Boot API box in purple, with "reactive multipart streaming" caption.
> Right: a stylized cloud icon in muted purple with "GCP Cloud Storage" label,
> plus a smaller "Firebase Auth" gate icon and "Realtime DB" tag. Bottom: a
> file-upload progress bar at ~80% complete. Monospace typography. Accent
> `#c586c0`. Cinematic dark cloud-infra look.

---

## 6. Spring Email Scheduler
**Accent:** `#ce9178` (orange) · **Metric:** 50+ TZ-aware jobs, 3×30s retry

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Left: a large
> analog clock face in muted orange. Center: a horizontal timeline of
> scheduled job dots across three timezone columns (IST, EST, PST) with a
> mix of pending (blue), sent (teal), failed (red), and retry (yellow) states.
> Right: a simple envelope icon labeled "Spring Mail · Gmail SMTP". Bottom:
> four stat chips — "50+ concurrent", "3 × 30s retry", "JDBC persistence",
> "HTML templates". Monospace typography. Accent `#ce9178`. Cinematic dark
> scheduler look.

---

## 7. Smart Contract Pipeline (BlockBenchLLM)
**Accent:** `#4ec9b0` (teal) · **Metric:** 3 stages · 4 static analyzers · LLM auto-fix loop

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Center: a
> three-stage horizontal pipeline — `stage 1: intent extract` →
> `stage 2: generate` → `stage 3: harden` — with the third stage outlined in
> teal. Below: a row of four labeled analyzer pills — Slither, Mythril,
> Semgrep, Solhint. To the right: a "LLM auto-fix loop" card with the text
> "critical / high / medium" and "re-verify after every patch → clean
> contract". A small Solidity contract snippet (`pragma solidity ^0.8;`) sits
> above the pipeline as the output. Monospace typography. Accent `#4ec9b0`.
> Cinematic dark security-tool look.

---

## 8. FedMeet
**Accent:** `#9cdcfe` (light blue) · **Metric:** 87.97% accuracy, beats FedProx/FedPer/ClusterFL

> A wide 4:1 dark technical illustration. Background `#1e1e1e`. Center: a federated
> learning network — four device cards on the left (alternating smartwatch
> and earable icons) connected by dashed lines to a single "Flower server"
> box on the right. The server is labeled "gated sensor fusion · BiLSTM ·
> 87.97%". Three small "beats" badges in muted red sit beside the server:
> `beats FedProx`, `beats FedPer`, `beats ClusterFL`. A small "ACM '26" badge
> sits in the top-right corner. Monospace typography. Accent `#9cdcfe`.
> Cinematic dark federated-AI look.

---

## Notes on style consistency

All eight prompts share:
- 4:1 aspect, dark IDE aesthetic (`#1e1e1e` background)
- Monospace typography for code-like elements
- One dominant accent color (matches the project's `accent` field in `content.ts`)
- Cinematic, slightly desaturated look (avoid pure neon)
- A central visual metaphor, not text-heavy

If you regenerate just one or two and want the others to match visually, keep the
shared style above consistent and only change the central metaphor.
