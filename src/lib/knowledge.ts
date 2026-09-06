import { readFileSync } from "fs";
import path from "path";

let cached: string | null = null;

export function loadKnowledgeDoc(): string {
  if (cached) return cached;
  const candidates = [
    path.join(process.cwd(), "src/lib/mohit-knowledge.md"), // dev
    path.join(process.cwd(), "mohit-knowledge.md"), // standalone
  ];
  for (const p of candidates) {
    try {
      let md = readFileSync(p, "utf8");
      // strip HTML comments (the editing guide is meta, not knowledge)
      md = md.replace(/<!--[\s\S]*?-->/g, "").trim();
      cached = md;
      return md;
    } catch {
      /* try next candidate */
    }
  }
  throw new Error("mohit-knowledge.md not found");
}