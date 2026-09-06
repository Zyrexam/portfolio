"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";
import { ChevronUp, ChevronDown, Terminal as TerminalIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { useIDEStore, type TerminalLine } from "@/store/useIDEStore";
import {
  fileTree,
  getChildren,
  getNodeAtPath,
  pathToString,
  pathKey,
  type FsNode,
} from "@/lib/filesystem";
import { profile, projects, skills, experiences, stats } from "@/lib/content";

const PROMPT = "visitor@mohit";

// Shared faux commit history used by `git log`, `git show`, and `git diff`.
// A life timeline in commit-message voice, newest first.
const COMMITS: { hash: string; msg: string; date: string }[] = [
  { hash: "e7b8d91", msg: "feat: EdgeCraft CDN — consistent hashing + LRU/TTL edges, 99% hit @ 606K req/s", date: "Aug 2026" },
  { hash: "c5f2a10", msg: "feat: AI twitter bot — one dev tweet a week for ~$0.0004/tweet", date: "Aug 2026" },
  { hash: "9d4e1f2", msg: "docs: published 'Exactly-Once, Damn It' — a payment idempotency deep-dive", date: "Jul 2026" },
  { hash: "7c8b3a5", msg: "feat: graduated IIT Jodhpur — B.Tech CSE '26", date: "Jun 2026" },
  { hash: "b2e9d84", msg: "feat: payment-idempotency-proxy — 20 concurrent reqs → exactly 1 charge", date: "May 2026" },
  { hash: "4a7c1e9", msg: "fix: finally understood consistent hashing (virtual nodes ≠ magic)", date: "Mar 2026" },
  { hash: "f1d5b28", msg: "docs: FedMeet accepted @ ACM ICDCN 2026 — 87.97%, beats FedProx/FedPer/ClusterFL", date: "Jan 2026" },
  { hash: "8e3f6c4", msg: "feat: NL→Solidity pipeline hardened with Slither+Mythril+Semgrep", date: "Dec 2025" },
  { hash: "d6a2b91", msg: "feat: url-shortener — Snowflake→base62, stampede-proof cache-aside", date: "Oct 2025" },
  { hash: "5c9e4a7", msg: "feat: joined Ubisys Lab — federated learning on multi-sensor HAR", date: "May 2025" },
  { hash: "0b8f3d2", msg: "init: hello world (Java, obviously)", date: "Nov 2022" },
];

const HELP_TEXT = `Available commands:
  help              show this help
  about             who I am
  projects          list all projects
  skills            list skills by category
  experience        list research experience
  contact           show contact info
  stats             headline metrics
  ls [dir]          list directory contents
  cd <dir>          change directory (try: cd projects)
  pwd               print working directory
  cat <file>        print file (try: cat resume.pdf)
  open <file>       open file in viewer
  code <file>       VS Code-style alias for open (try: code about/about.md)
  tree              show file tree
  git log|status    faux git history of my work
  git diff|show     view diffs / a specific commit
  git branch|stash  list branches / stashes
  docker ps|images  faux running containers
  top|htop          faux process listing
  free -h           faux memory usage
  df -h             faux disk usage
  uname -a          faux kernel info
  ps                faux process snapshot
  uptime            faux system uptime
  curl <url>        faux HTTP request (try: curl localhost:8000/health)
  man <cmd>         faux man page
  figlet <text>     render ASCII banner
  banner            big MohitOS banner
  theme [name]      show / set theme (dark · high-contrast)
  whoami            identify yourself
  echo <text>       echo text back
  history           show command history (history -c to clear)
  date              show current date/time
  neofetch          system info (MohitOS)
  matrix            enter the matrix 
  sudo make coffee   brewing...
  mohit --why        why backend, in my own words
  rm -rf /          nice try

  Tip: press Ctrl+P (or Cmd+P) anywhere for the command palette.`;

export function Terminal({ onOpenResume }: { onOpenResume: () => void }) {
  const lines = useIDEStore((s) => s.lines);
  const pushLine = useIDEStore((s) => s.pushLine);
  const clearLines = useIDEStore((s) => s.clearLines);
  const history = useIDEStore((s) => s.history);
  const pushHistory = useIDEStore((s) => s.pushHistory);
  const historyIdx = useIDEStore((s) => s.historyIdx);
  const setHistoryIdx = useIDEStore((s) => s.setHistoryIdx);
  const setShowMatrix = useIDEStore((s) => s.setShowMatrix);
  const navigate = useIDEStore((s) => s.navigate);
  const openNode = useIDEStore((s) => s.openNode);
  const openTab = useIDEStore((s) => s.openTab);
  const setDirExpanded = useIDEStore((s) => s.setDirExpanded);
  const currentPath = useIDEStore((s) => s.currentPath);
  const terminalExpanded = useIDEStore((s) => s.terminalExpanded);
  const setTerminalExpanded = useIDEStore((s) => s.setTerminalExpanded);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, terminalExpanded]);

  const focusInput = () => inputRef.current?.focus();

  const out = useCallback(
    (text: string, type: TerminalLine["type"] = "output", href?: string) =>
      pushLine({ text, type, href }),
    [pushLine],
  );

  const findNode = (path: string[]): FsNode | null => getNodeAtPath(path);

  const resolveChild = (name: string): FsNode | null => {
    const children = getChildren(currentPath);
    return children.find((c) => c.name === name) ?? null;
  };

  const runCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      pushLine({ text: raw, type: "input" });
      if (!cmd) return;
      pushHistory(cmd);
      setHistoryIdx(-1);

      const [bin, ...args] = cmd.split(/\s+/);
      const argStr = args.join(" ");

      switch (bin) {
        case "help":
          out(HELP_TEXT, "ascii");
          break;
        case "about":
          out(
            `${profile.name} — ${profile.credential}\n\n${profile.bio}\n\nFind me: github.com/${profile.githubHandle} · linkedin · leetcode (${profile.leetcodeCount} solved)`,
          );
          break;
        case "projects":
          out(
            projects
              .map(
                (p, i) =>
                  `${String(i + 1).padStart(2, "0")}. ${p.name.padEnd(32)} ${p.tagline}`,
              )
              .join("\n") +
              "\n\n→ tip: type `open <project-name>` or `cd projects/<category>/<name>`",
            "ascii",
          );
          break;
        case "skills":
          out(renderSkillsAscii(), "ascii");
          break;
        case "experience":
          out(
            experiences
              .map(
                (e, i) =>
                  `${String(i + 1).padStart(2, "0")}. ${e.title} @ ${e.org}\n    ${e.period}\n    ${e.highlights.join("\n    ")}`,
              )
              .join("\n\n"),
            "ascii",
          );
          break;
        case "contact":
          out(
            `email     : ${profile.email}\ngithub    : github.com/${profile.githubHandle}\nlinkedin : ${profile.linkedin}\nleetcode  : leetcode.com/u/${profile.leetcodeHandle} (${profile.leetcodeCount})\nresume    : ${profile.resume}`,
          );
          out("→ click to email", "link", `mailto:${profile.email}`);
          break;
        case "stats":
          out(
            stats.map((s) => `${s.label.padEnd(18)} ${s.value}`).join("\n"),
            "ascii",
          );
          break;
        case "pwd":
          out(pathToString(currentPath));
          break;
        case "ls": {
          const target = args[0];
          let path = currentPath;
          if (target) {
            if (target === "~" || target === "/") path = [];
            else if (target.startsWith("/"))
              path = target.slice(1).split("/").filter(Boolean);
            else path = [...currentPath, ...target.split("/").filter(Boolean)];
          }
          if (path[0] === "home" && path[1] === "mohit") path = path.slice(2);
          const node = findNode(path);
          if (!node || node.kind !== "dir") {
            out(`ls: ${target || pathToString(path)}: not a directory`, "error");
            break;
          }
          const children = getChildren(path);
          const hiddenVisible = useIDEStore.getState().hiddenVisible;
          const visible = children.filter((c) => !c.hidden || hiddenVisible);
          out(
            visible
              .map((c) => {
                const isDir = c.kind === "dir";
                const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                const mark = isDir ? "/" : "";
                return `${perm}  ${c.name}${mark}`;
              })
              .join("\n"),
            "ascii",
          );
          break;
        }
        case "cd": {
          const target = args[0] ?? "";
          if (!target || target === "~" || target === "/") {
            navigate([]);
            setDirExpanded(["projects"], false);
            out("");
            break;
          }
          let path: string[];
          if (target.startsWith("/"))
            path = target.slice(1).split("/").filter(Boolean);
          else if (target === "..")
            path = currentPath.slice(0, -1);
          else path = [...currentPath, ...target.split("/").filter(Boolean)];

          if (path[0] === "home") {
            path = path.slice(path[0] === "home" && path[1] === "mohit" ? 2 : 0);
          }

          const node = findNode(path);
          if (!node) {
            out(`cd: no such directory: ${target}`, "error");
            break;
          }
          if (node.kind !== "dir") {
            out(`cd: not a directory: ${target}`, "error");
            break;
          }
          for (let i = 1; i <= path.length; i++) {
            setDirExpanded(path.slice(0, i), true);
          }
          navigate(path);
          break;
        }
        case "cat": {
          const target = args[0];
          if (!target) {
            out("cat: missing file operand", "error");
            break;
          }
          if (target === "resume.pdf" || target === "./Resume.pdf") {
            out("opening resume.pdf in viewer…");
            onOpenResume();
            break;
          }
          if (target === ".env") {
            out("Nice try, but secrets stay secret ", "error");
            break;
          }
          let path: string[];
          if (target.startsWith("/"))
            path = target.slice(1).split("/").filter(Boolean);
          else path = [...currentPath, ...target.split("/").filter(Boolean)];
          if (path[0] === "home" && path[1] === "mohit") path = path.slice(2);
          const node = findNode(path);
          if (!node) {
            out(`cat: ${target}: no such file or directory`, "error");
            break;
          }
          if (node.kind === "dir") {
            out(`cat: ${target}: is a directory`, "error");
            break;
          }
          switch (node.kind) {
            case "about":
              out(`${profile.name} — ${profile.credential}\n\n${profile.bio}\n\n→ run 'code about/about.md' to open the full page.`);
              break;
            case "contact":
              out(`email: ${profile.email}\ngithub: ${profile.githubHandle}\nlinkedin: ${profile.linkedin}\nleetcode: ${profile.leetcodeHandle}`);
              break;
            case "skills":
              out(renderSkillsAscii(), "ascii");
              break;
            case "experience":
              {
                const e = experiences.find((x) => x.id === node.experienceId);
                out(e ? `${e.title} @ ${e.org}\n${e.period}\n${e.summary}\n${e.highlights.join("\n")}` : "not found", "ascii");
              }
              break;
            case "project":
              {
                const p = projects.find((x) => x.id === node.projectId);
                out(p ? `${p.name}\n${p.tagline}\n${p.description}\n\n${p.features.map((f) => "  • " + f).join("\n")}\n\ntech: ${p.tech.join(", ")}\ngithub: ${p.github ?? "n/a"}` : "not found", "ascii");
              }
              break;
            case "link":
              out(`link → ${node.href}\n(opening externally…)`);
              if (node.href) window.open(node.href, "_blank", "noopener,noreferrer");
              break;
            case "resume":
              out("opening resume.pdf in viewer…");
              onOpenResume();
              break;
            default:
              out(`cat: ${target}: cannot preview this file`, "error");
          }
          break;
        }
        case "open": {
          const target = args.join(" ");
          if (!target) {
            out("open: missing file operand", "error");
            break;
          }
          if (target === "resume.pdf" || target === "Resume.pdf") {
            onOpenResume();
            break;
          }
          const proj = projects.find(
            (p) =>
              p.name.toLowerCase() === target.toLowerCase() ||
              p.id.toLowerCase() === target.toLowerCase(),
          );
          if (proj) {
            const p = ["projects", proj.category, proj.name];
            setDirExpanded(["projects"], true);
            setDirExpanded(["projects", proj.category], true);
            openNode(p);
            openTab(p, proj.name, proj.icon);
            out(`opening ${proj.name}/ in viewer…`);
            break;
          }
          let path: string[];
          if (target.startsWith("/"))
            path = target.slice(1).split("/").filter(Boolean);
          else path = [...currentPath, ...target.split("/").filter(Boolean)];
          if (path[0] === "home" && path[1] === "mohit") path = path.slice(2);
          const node = findNode(path);
          if (!node) {
            out(`open: ${target}: not found`, "error");
            break;
          }
          if (node.kind === "dir") {
            out(`open: ${target}: is a directory (use cd)`, "error");
            break;
          }
          if (node.kind === "resume") {
            onOpenResume();
            break;
          }
          if (node.external && node.href) {
            window.open(node.href, "_blank", "noopener,noreferrer");
            out(`opening ${node.href} …`);
            break;
          }
          for (let i = 1; i <= path.length; i++) {
            setDirExpanded(path.slice(0, i), true);
          }
          openNode(path);
          openTab(path, node.label ?? node.name, node.icon);
          out(`opening ${node.label ?? node.name} in viewer…`);
          break;
        }
        case "tree": {
          out(renderTree(fileTree, "", true), "ascii");
          break;
        }
        case "echo":
          out(argStr);
          break;
        case "date":
          out(new Date().toString());
          break;
        case "history": {
          if (args[0] === "--clear" || args[0] === "-c") {
            useIDEStore.setState({ history: [] });
            out("history cleared", "system");
            break;
          }
          out(
            history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${h}`).join("\n"),
            "ascii",
          );
          break;
        }
        case "neofetch":
          out(renderNeofetch(), "ascii");
          break;
        case "matrix":
          out("entering the matrix… (press any key to exit)", "system");
          setShowMatrix(true);
          break;
        case "sudo":
          if (argStr === "hire mohit") {
            out("sudo: hiring is handled by recruiters. try 'mohit --why' for the pitch.", "error");
          } else if (argStr === "make me coffee" || argStr === "make coffee") {
            out(" Brewing... Error: Coffee machine not found in /dev", "error");
          } else if (argStr === "rm -rf /") {
            out("Nice try ", "error");
          } else {
            out(`sudo: ${argStr}: command not found. (try 'mohit --why')`, "error");
          }
          break;
        case "rm":
          if (argStr === "-rf /" || argStr === "-rf /*" || argStr === "-rf /home") {
            out("Nice try ", "error");
          } else {
            out(`rm: cannot remove '${argStr}': operation not permitted`, "error");
          }
          break;
        case "mohit":
          if (args[0] === "--why") {
            out(
              [
                `I keep coming back to one question: what happens at 3am when nobody is watching?`,
                ``,
                `Frontends fail politely — a spinner, an apology. Backend failures are silent:`,
                `a customer charged twice, a webhook dropped, data that quietly drifts.`,
                `So I build the boring layers — locks, retries, caches, audit logs — and test`,
                `them like I don't trust them. 20 concurrent requests with one idempotency`,
                `key should be one charge. Not two. Not zero. One.`,
                ``,
                `Also: caches are my favorite bug factory. Zipf was right about everything.`,
              ].join("\n"),
              "ascii",
            );
          } else if (!args.length) {
            out(`mohit v2.0 — try 'mohit --why'`, "system");
          } else {
            out(`mohit: unknown option '${args[0]}' (try 'mohit --why')`, "error");
          }
          break;
        case "clear":
          clearLines();
          break;
        case "exit":
          out("logout — but there's no escaping MohitOS ");
          break;
        case "vim":
        case "nano":
          out(`hint: ${bin} is overkill — just use 'open <file>' or 'code <file>'`);
          break;
        case "code":
          if (!argStr) {
            out("code: missing file operand (try 'code about/about.md')", "error");
            break;
          }
          // reuse the open logic by falling through with bin="open"
          {
            const target = argStr;
            if (target === "resume.pdf" || target === "Resume.pdf") {
              onOpenResume();
              break;
            }
            const proj = projects.find(
              (p) =>
                p.name.toLowerCase() === target.toLowerCase() ||
                p.id.toLowerCase() === target.toLowerCase(),
            );
            if (proj) {
              const p = ["projects", proj.category, proj.name];
              setDirExpanded(["projects"], true);
              setDirExpanded(["projects", proj.category], true);
              openNode(p);
              openTab(p, proj.name, proj.icon);
              out(`opening ${proj.name}/ in viewer…`);
              break;
            }
            let path: string[];
            if (target.startsWith("/"))
              path = target.slice(1).split("/").filter(Boolean);
            else path = [...currentPath, ...target.split("/").filter(Boolean)];
            if (path[0] === "home" && path[1] === "mohit") path = path.slice(2);
            const node = findNode(path);
            if (!node) {
              out(`code: ${target}: not found`, "error");
              break;
            }
            if (node.kind === "dir") {
              out(`code: ${target}: is a directory (use cd)`, "error");
              break;
            }
            if (node.kind === "resume") {
              onOpenResume();
              break;
            }
            if (node.external && node.href) {
              window.open(node.href, "_blank", "noopener,noreferrer");
              out(`opening ${node.href} …`);
              break;
            }
            for (let i = 1; i <= path.length; i++) {
              setDirExpanded(path.slice(0, i), true);
            }
            openNode(path);
            openTab(path, node.label ?? node.name, node.icon);
            out(`opening ${node.label ?? node.name} in viewer…`);
          }
          break;
        case "apt":
        case "brew":
        case "npm":
        case "bun":
          out(`${bin}: packages are immutable in MohitOS — visit me instead `);
          break;
        case "git":
          if (args[0] === "log") {
            out(renderGitLog(), "ascii");
          } else if (args[0] === "status") {
            out(
              "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean.\n  (but always shipping — see projects/)",
              "ascii",
            );
          } else if (args[0] === "remote") {
            out(
              `origin  ${profile.github} (fetch)\norigin  ${profile.github} (push)`,
            );
          } else if (args[0] === "shortlog" || args[0] === "contrib") {
            out(`  Mohit Kumar <${profile.email}> (${projects.length + 247} commits)\n         shipping since 2023`);
          } else if (args[0] === "diff") {
            out(renderGitDiff(), "ascii");
          } else if (args[0] === "show") {
            const hash = args[1];
            out(renderGitShow(hash), "ascii");
          } else if (args[0] === "branch") {
            out("* main\n  feature/payment-idempotency-lua\n  fix/edgecraft-zipf-tuning\n  chore/url-shortener-rate-limits", "ascii");
          } else if (args[0] === "stash" && args[1] === "list") {
            out("stash@{0}: WIP on main: e7b8d91 edgecraft benchmark matrix\nstash@{1}: WIP on main: b2e9d84 payment proxy lock tests", "ascii");
          } else if (args[0] === "pull") {
            out("remote: Enumerating objects: 47, done.", "system");
            out("remote: Counting objects: 100% (47/47), done.", "system");
            out("remote: Compressing objects: 100% (28/28), done.", "system");
            out("remote: Total 47 (delta 19), reused 39 (delta 12), pack-reused 0", "system");
            out("Unpacking objects: 100% (47/47), 24.31 KiB | 4.12 MiB/s, done.", "system");
            out("From github.com:Zyrexam/mohit-portfolio\n * branch            main       -> FETCH_HEAD\n   5c9e4a7..e7b8d91  main       -> origin/main", "ascii");
            out("Updating 5c9e4a7..e7b8d91\nFast-forward\n about/about.md  |  12 ++--\n projects/Systems-Programming/EdgeCraft-CDN |   3 +-\n 2 files changed, 11 insertions(+), 4 deletions(-)\nup to date", "system");
          } else if (args[0] === "push") {
            out("Enumerating objects: 19, done.", "system");
            out("Counting objects: 100% (19/19), done.", "system");
            out("Compressing objects: 100% (11/11), done.", "system");
            out("Writing objects: 100% (11/11), 2.41 KiB | 2.41 MiB/s, done.", "system");
            out("Total 11 (delta 7), reused 0 (delta 0), pack-reused 0", "system");
            out(`To github.com:Zyrexam/mohit-portfolio.git\n   d6a2b91..e7b8d91  main -> main\npushed (deploy preview building…)`, "system");
          } else if (args[0] === "fetch") {
            out("remote: Enumerating objects: 31, done.", "system");
            out("remote: Counting objects: 100% (31/31), done.", "system");
            out("From github.com:Zyrexam/mohit-portfolio\n * [new branch]      feature/bio-typing -> origin/feature/bio-typing\n * [new branch]      fix/minimap-sync    -> origin/fix/minimap-sync\nfetched 2 new branches", "system");
          } else if (args[0] === "add" && args[1] === "." || args[0] === "add" && args[1] === "-A") {
            out("", "system"); // git add is silent on success
          } else if (args[0] === "commit" && args[1] === "-m") {
            const msg = argStr.replace(/^commit\s+-m\s+/, "").replace(/^["']|["']$/g, "");
            const hash = Array.from(
              { length: 7 },
              () => "0123456789abcdef"[Math.floor(Math.random() * 16)],
            ).join("");
            out(`[main ${hash}] ${msg || "wip"}\n 3 files changed, 42 insertions(+), 7 deletions(-)\n create mode 100644 projects/Systems-Programming/new-feature`, "system");
          } else {
            out(`git: '${args[0] ?? ""}' — try 'git log', 'git status', 'git diff', 'git show <hash>', 'git pull', 'git push', 'git fetch', 'git branch'`);
          }
          break;
        case "docker":
          if (args[0] === "ps") {
            out(renderDockerPs(), "ascii");
          } else if (args[0] === "images") {
            out(
              "REPOSITORY                  TAG       SIZE\nmohit/payment-proxy         latest    142MB\nmohit/webhook-svc           latest    98MB\nmohit/tts-proxy             latest    64MB\npostgres:16                 alpine    98MB\nredis:7                     alpine    40MB",
              "ascii",
            );
          } else {
            out(`docker: '${args[0] ?? ""}' — try 'docker ps' or 'docker images'`);
          }
          break;
        case "curl":
          if (args[0] === "localhost:8000/health" || args[0] === "-s" && args[1] === "localhost:8000/health") {
            out(
              `{"status":"ok","service":"payment-idempotency-proxy","uptime":"99.98%","cache_hit_rate":"95.9%","active_locks":3}`,
              "ascii",
            );
          } else if (args[0]) {
            out(`curl: simulating GET ${args[0]}\nHTTP/2 200\ncontent-type: application/json\n\n{"message":"MohitOS responds.","your_ip":"[redacted]","trace":"${Math.random().toString(36).slice(2, 10)}"}`);
          } else {
            out("curl: try 'curl localhost:8000/health'", "error");
          }
          break;
        case "man":
          if (args[0]) {
            out(
              `MAN(1)                          MohitOS Manual\n\nNAME\n     ${args[0]} — see 'help' for available commands\n\nSYNOPSIS\n     ${args[0]} [options]\n\nDESCRIPTION\n     This is the MohitOS shell. Real man pages are overrated —\n     try '${args[0]} --help' or just '${args[0]}'.\n\nAUTHOR\n     Mohit Kumar <${profile.email}>`,
              "ascii",
            );
          } else {
            out("What manual page do you want? Try 'man git' or 'man ls'.", "error");
          }
          break;
        case "figlet":
          out(renderFiglet(argStr || profile.name), "ascii");
          break;
        case "theme": {
          const arg = args[0]?.toLowerCase();
          const setTheme = useIDEStore.getState().setTheme;
          if (arg === "dark" || arg === "default") {
            setTheme("dark");
            out("theme set to dark (VS Code Dark+)", "system");
          } else if (arg === "high-contrast" || arg === "hc" || arg === "contrast") {
            setTheme("high-contrast");
            out("theme set to high-contrast (black + yellow accents)", "system");
          } else if (!arg) {
            const current = useIDEStore.getState().theme;
            out(
              `MohitOS themes (current: ${current})\n  • dark            VS Code Dark+ (default)\n  • high-contrast   black + neon yellow\n\nusage: theme <name>   (e.g. 'theme high-contrast')`,
              "ascii",
            );
          } else {
            out(`theme: unknown theme '${arg}'. try 'theme' to list.`, "error");
          }
          break;
        }
        case "tab":
          out("tip: press Ctrl+P for the command palette — fuzzy-find any file or action.");
          break;
        case "banner":
          out(renderFiglet("MohitOS"), "ascii");
          break;
        case "top":
        case "htop":
          out(renderTop(), "ascii");
          break;
        case "free":
          if (args[0] === "-h" || args[0] === "--human" || !args[0]) {
            out(
              "              total        used        free      shared  buff/cache   available\n" +
              "Mem:           16Gi       4.2Gi       8.1Gi       256Mi       3.7Gi        11Gi\n" +
              "Swap:          2.0Gi          0B       2.0Gi",
              "ascii",
            );
          } else {
            out(`free: invalid option '${args[0]}' (try 'free -h')`, "error");
          }
          break;
        case "df":
          if (args[0] === "-h" || args[0] === "--human" || !args[0]) {
            out(
              "Filesystem      Size  Used Avail Use% Mounted on\n" +
              "/dev/sda1       234G   89G  133G  41% /\n" +
              "tmpfs           8.0G     0  8.0G   0% /dev/shm\n" +
              "/dev/sdb1       932G  412G  473G  47% /home/mohit/projects\n" +
              "overlay         100G   18G   82G  18% /var/lib/docker",
              "ascii",
            );
          } else {
            out(`df: invalid option '${args[0]}' (try 'df -h')`, "error");
          }
          break;
        case "uname":
          if (args[0] === "-a" || args[0] === "--all") {
            out(`Linux ${profile.siteHost} 6.6.6-mohit #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`);
          } else {
            out("Linux");
          }
          break;
        case "ps":
          out(
            "  PID TTY          TIME CMD\n" +
            "  101 pts/0    00:00:00 zsh\n" +
            "  142 pts/0    00:00:01 node\n" +
            "  187 pts/0    00:00:00 redis-server\n" +
            "  203 pts/0    00:00:00 postgres\n" +
            "  211 pts/0    00:00:00 mohit-daemon",
            "ascii",
          );
          break;
        case "uptime":
          out(" 15:42:01 up 12 days,  4:17,  1 user,  load average: 0.42, 0.58, 0.61");
          break;
        case "ping": {
          const host = args[0] ?? profile.siteHost;
          out(`PING ${host} (142.250.80.46): 56 data bytes`);
          out("64 bytes from 142.250.80.46: icmp_seq=0 ttl=117 time=12.4 ms");
          out("64 bytes from 142.250.80.46: icmp_seq=1 ttl=117 time=11.8 ms");
          out("64 bytes from 142.250.80.46: icmp_seq=2 ttl=117 time=12.1 ms");
          out(`--- ${host} ping statistics ---\n3 packets transmitted, 3 received, 0.0% packet loss\nround-trip min/avg/max = 11.8/12.1/12.4 ms`, "ascii");
          break;
        }
        case "traceroute":
          out(`traceroute to ${profile.siteHost} (142.250.80.46), 30 hops max, 60 byte packets\n 1  router.local (192.168.1.1)   1.243 ms\n 2  isp-gw.net (10.0.0.1)       8.421 ms\n 3  core.isp.net (172.16.0.1)   9.812 ms\n 4  ${profile.siteHost} (142.250.80.46)   12.104 ms`, "ascii");
          break;
        case "env":
          out("VISITOR=mohit-visitor\nSHELL=zsh\nTERM=xterm-256color\nEDITOR=code\nLANG=en_US.UTF-8\nMOHITOS_VERSION=2.0", "ascii");
          break;
        case "who":
          out(`mohit   pts/0        2026-09-04 15:42 (${profile.siteHost})\nvisitor pts/1        2026-09-04 15:43 (you)`, "ascii");
          break;
        case "tail": {
          const file = args[0];
          if (!file) {
            out("tail: missing file operand", "error");
            break;
          }
          out(`tail: cannot open '${file}' for reading: no such file`, "error");
          break;
        }
        case "whoami": {
          out("A curious developer", "system");
          break;
        }
        default:
          out(
            `command not found: ${bin}. type 'help' for available commands.`,
            "error",
          );
      }
    },
    [
      out,
      currentPath,
      history,
      onOpenResume,
      openNode,
      openTab,
      pushHistory,
      pushLine,
      setDirExpanded,
      setHistoryIdx,
      setShowMatrix,
      navigate,
      clearLines,
    ],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete: match against known commands + file/project names.
      const known = [
        "help","about","projects","skills","experience","contact","stats","mohit",
        "ls","cd","pwd","cat","open","code","tree","whoami","echo","clear",
        "history","date","neofetch","matrix","theme",
        "git","docker","curl","man","figlet","banner","sudo","rm",
        "vim","nano","exit","top","htop","free","df","uname","ps","uptime",
      ];
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;
      const parts = trimmed.split(/\s+/);
      const last = parts[parts.length - 1];
      if (parts.length === 1) {
        const matches = known.filter((c) => c.startsWith(last));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        } else if (matches.length > 1) {
          pushLine({
            text: matches.join("   "),
            type: "system",
          });
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx =
        historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx] ?? "");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearLines();
    }
  };

  if (!terminalExpanded) {
    return (
      <div className="flex h-7 shrink-0 items-center gap-2 border-t border-[#1e1e1e] bg-[#1e1e1e] px-3 text-[11px] font-mono text-vsc-dim">
        <button
          onClick={() => setTerminalExpanded(true)}
          className="flex items-center gap-1 hover:text-white"
        >
          <ChevronUp size={12} /> Terminal
        </button>
        <span className="text-vsc-green">●</span> ready
      </div>
    );
  }

  return (
    <motion.div
      initial={{ height: 28 }}
      animate={{ height: 220 }}
      exit={{ height: 28 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex max-h-[40vh] shrink-0 flex-col overflow-hidden border-t border-[#1e1e1e] bg-[#1e1e1e]"
    >
      {/* Terminal tab bar */}
      <div className="flex items-center justify-between border-b border-[#1e1e1e] bg-[#252526] px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-t bg-[#1e1e1e] px-3 py-1 text-[11px] font-mono text-white">
            <TerminalIcon size={12} className="text-vsc-green" /> Terminal
          </div>
          <span className="text-[10px] font-mono text-vsc-dim">
            zsh · {PROMPT}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTerminalExpanded(false)}
            className="rounded p-1 text-vsc-dim hover:bg-[#3c3c3c] hover:text-white"
            title="Collapse terminal"
          >
            <ChevronDown size={12} />
          </button>
          <button
            onClick={() => clearLines()}
            className="rounded p-1 text-vsc-dim hover:bg-[#3c3c3c] hover:text-white"
            title="Clear (or type 'clear')"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        onClick={focusInput}
        className="vscode-scroll flex-1 overflow-y-auto px-3 py-2 font-mono text-[12px] leading-relaxed cursor-text"
      >
        {lines.map((line) => (
          <Line key={line.id} line={line} />
        ))}
        {/* Prompt + input */}
        <div className="flex items-center gap-1.5">
          <span className="text-vsc-green">{PROMPT}</span>
          <span className="text-vsc-dim">:</span>
          <span className="text-vsc-blue">~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent font-mono text-[12px] text-white caret-[#4ec9b0] outline-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Line({ line }: { line: TerminalLine }) {
  if (line.type === "input") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-vsc-green">{PROMPT}</span>
        <span className="text-vsc-dim">:</span>
        <span className="text-vsc-blue">~$</span>
        <span className="text-white">{line.text}</span>
      </div>
    );
  }
  const colorClass =
    line.type === "error"
      ? "text-vsc-red"
      : line.type === "system"
        ? "text-vsc-yellow"
        : line.type === "ascii"
          ? "text-vsc-green"
          : "text-[#cccccc]";
  if (line.type === "link" && line.href) {
    return (
      <a
        href={line.href}
        target={line.href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={`block whitespace-pre-wrap break-all underline decoration-dotted hover:text-white ${colorClass}`}
      >
        {line.text}
      </a>
    );
  }
  if (line.text.includes("{{NEOFETCH_COLORS}}")) {
    const [before, after] = line.text.split("{{NEOFETCH_COLORS}}");
    return (
      <div className={`whitespace-pre-wrap break-words ${colorClass}`}>
        {before}
        <span className="text-vsc-green">●</span>{" "}
        <span className="text-vsc-cyan">●</span>{" "}
        <span className="text-vsc-yellow">●</span>{" "}
        <span className="text-vsc-red">●</span>{" "}
        <span className="text-vsc-purple">●</span>
        {after}
      </div>
    );
  }
  return (
    <div className={`whitespace-pre-wrap break-words ${colorClass}`}>
      {line.text}
    </div>
  );
}

function renderSkillsAscii(): string {
  const cats = Object.keys(skills);
  const lines: string[] = [];
  for (const cat of cats) {
    lines.push(cat);
    const items = skills[cat as keyof typeof skills];
    for (let i = 0; i < items.length; i += 5) {
      const row = items.slice(i, i + 5).map((s) => s.name).join("  ·  ");
      lines.push(`  ${row}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function renderTree(node: FsNode, prefix: string, isRoot: boolean): string {
  const label = isRoot ? "/home/mohit" : node.label ?? node.name;
  let line = `${prefix}${isRoot ? "" : "├─ "}${node.kind === "dir" ? "[D]" : iconEmoji(node.icon)} ${label}${node.kind === "dir" && !isRoot ? "/" : ""}`;
  if (node.children) {
    const visible = node.children.filter((c) => !c.hidden);
    visible.forEach((c) => {
      line += "\n" + renderTree(c, prefix + (isRoot ? "" : "  "), false);
    });
  }
  return line;
}

function iconEmoji(icon: string): string {
  const map: Record<string, string> = {
    about: "[F]",
    resume: "[F]",
    contact: "[C]",
    skills: "[S]",
    experience: "[F]",
    github: "[L]",
    linkedin: "[L]",
    leetcode: "[L]",
    link: "[L]",
    env: "[E]",
    file: "[F]",
  };
  return map[icon] ?? "[F]";
}

function renderNeofetch(): string {
  return `
       /\\        ${profile.name}@${profile.osName}
      /  \\       -----------------
     /\\   \\      OS:       MohitOS ${profile.osVersion}
    /  \\   \\     Kernel:   6.6.6-mohit
   /____\\___\\    Shell:    zsh 5.9
                 Role:     ${profile.role}
  mohit@dev      School:   ${profile.school} (${profile.gradYear})
                 Uptime:   always building
                 Repos:    github.com/${profile.githubHandle}
                 LeetCode: ${profile.leetcodeCount} solved
                 CPU:      distributed systems @ scale
                 Memory:   Redis + PostgreSQL
                 Colors:   {{NEOFETCH_COLORS}}
`;
}

function renderGitLog(): string {
  return COMMITS
    .map(
      (c) =>
        `${c.hash} (HEAD -> main, origin/main) ${c.msg}\n            Author: ${profile.name} <${profile.email}>\n            Date:   ${c.date}`,
    )
    .join("\n\n");
}

function renderGitDiff(): string {
  return [
    "diff --git a/src/payment/idempotency.py b/src/payment/idempotency.py",
    "index 9f2a1c4..b7e3d88 100644",
    "--- a/src/payment/idempotency.py",
    "+++ b/src/payment/idempotency.py",
    "@@ -42,7 +42,11 @@ async def process_payment(request):",
    "     key = request.headers.get('Idempotency-Key')",
    "     if not key:",
    "         raise HTTPException(400, 'missing idempotency key')",
    "-    cached = redis.get(f'idem:{key}')",
    "+    cached = await redis.get(f'idem:{sha256(key)}')",
    "+    if cached:",
    "+        return json.loads(cached)",
    "+    # acquire lock atomically — Lua script prevents duplicate charges",
    "+    acquired = await redis.set(f'lock:{key}', '1', nx=True, ex=30)",
    "     if cached:",
    "         return json.loads(cached)",
    "     # fall through to payment processor",
    "diff --git a/src/payment/signing.py b/src/payment/signing.py",
    "index 1a2b3c4..5d6e7f8 100644",
    "--- a/src/payment/signing.py",
    "+++ b/src/payment/signing.py",
    "@@ -10,6 +10,9 @@ def sign(payload):",
    "     '''",
    "     return hmac.new(SECRET, payload, sha256).hexdigest()",
    " ",
    "+def verify(payload, signature):",
    "+    expected = sign(payload)",
    "+    return hmac.compare_digest(expected, signature)",
    "+",
    " # tamper detection: SHA-256 of body + key fields",
    " ",
    " -- ",
    "2.43.0 · mohit@dev · main",
  ].join("\n");
}

function renderGitShow(hash?: string): string {
  if (!hash) {
    return "usage: git show <commit-hash>\n\ntry: git show e7b8d91  (or any hash from 'git log')";
  }
  const commit = COMMITS.find((c) => c.hash === hash);
  if (!commit) {
    return `fatal: ambiguous argument '${hash}': unknown revision\n\n(hint: run 'git log' to see valid hashes)`;
  }
  return [
    `commit ${commit.hash} (HEAD -> main, origin/main)`,
    `Author: ${profile.name} <${profile.email}>`,
    `Date:   ${commit.date}`,
    "",
    `    ${commit.msg}`,
    "",
    ` diff --git a/about/about.md b/about/about.md`,
    ` index ${commit.hash.slice(0, 7)}..${commit.hash.slice(0, 7)} 100644`,
    ` --- a/about/about.md`,
    ` +++ b/about/about.md`,
    ` @@ -1,3 +1,5 @@`,
    `  # ${commit.msg.split("—")[0]?.trim() ?? "project"}`,
    ` +`,
    ` + ${commit.msg}`,
    `  Built with curiosity by ${profile.name}.`,
  ].join("\n");
}

function renderDockerPs(): string {
  return [
    "CONTAINER ID   IMAGE                          STATUS         PORTS                    NAMES",
    "a1b2c3d4e5f6   mohit/payment-proxy:latest     Up 3 days      0.0.0.0:8000->8000/tcp   payment-proxy",
    "b2c3d4e5f6a1   mohit/webhook-svc:latest       Up 3 days      0.0.0.0:8080->8080/tcp   webhook-svc",
    "c3d4e5f6a1b2   mohit/tts-proxy:latest        Up 2 days      0.0.0.0:50051->50051/tcp tts-proxy",
    "d4e5f6a1b2c3   postgres:16-alpine            Up 3 days      5432/tcp                 mohit-db",
    "e5f6a1b2c3d4   redis:7-alpine                Up 3 days      6379/tcp                 mohit-cache",
    "f6a1b2c3d4e5   prom/prometheus:latest        Up 1 day       0.0.0.0:9090->9090/tcp   prometheus",
  ].join("\n");
}

function renderTop(): string {
  return [
    "top - 15:42:01 up 12 days,  4:17,  1 user,  load average: 0.42, 0.58, 0.61",
    "Tasks:   8 total,   1 running,   7 sleeping,   0 stopped,   0 zombie",
    "%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.4 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st",
    "MiB Mem :  16384.0 total,   8300.0 free,   4300.0 used,   3784.0 buff/cache",
    "MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  11700.0 avail Mem",
    "",
    "    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
    "    211 mohit     20   0  812.4m 142.3m  38.2m S   4.2   0.9   1:42.31 mohit-daemon",
    "    142 mohit     20   0  642.1m  98.7m  24.1m S   2.1   0.6   0:58.14 node",
    "    187 mohit     20   0  124.8m  18.4m   8.2m S   0.3   0.1   0:12.07 redis-server",
    "    203 mohit     20   0  384.2m  42.1m  14.8m S   0.1   0.3   0:08.93 postgres",
    "    101 mohit     20   0   12.4m   4.2m   2.1m S   0.0   0.0   0:00.04 zsh",
  ].join("\n");
}

function renderFiglet(text: string): string {
  const upper = text.toUpperCase().slice(0, 12);
  const glyphs: Record<string, string[]> = {
    A: [" ▄▀█ ", " █▀█ "],
    B: [" █▀▄ ", " █▄▀ "],
    C: [" █▀▄ ", " █▄▀ "],
    D: [" █▀▄ ", " █ █ "],
    E: [" █▀▄ ", " █▀▀ "],
    F: [" █▀▄ ", " █   "],
    G: [" █▀▄ ", " █▀▄ "],
    H: [" █ █ ", " █ █ "],
    I: [" █ ", " █ "],
    J: ["  █ ", " █▄▀ "],
    K: [" █ ▄ ", " █▀▄ "],
    L: [" █   ", " █▀▀ "],
    M: ["█▀▄▀█", "█ ▀ █"],
    N: ["█▀▄█ ", "█ ▀█ "],
    O: [" █▀█ ", " █▀▀ "],
    P: [" █▀█ ", " █▀  "],
    Q: [" █▀█ ", " █▀█ "],
    R: [" █▀█ ", " █▀▄ "],
    S: [" █▀▄ ", " ▀▄▀ "],
    T: [" █▀█ ", " █ █ "],
    U: [" █ █ ", " █▄█ "],
    V: [" █ █ ", " ▀ ▀ "],
    W: [" █ █ ", " █▄█ "],
    X: [" ▀▄▀ ", " █ █ "],
    Y: [" ▀▄  ", "  █  "],
    Z: [" █▀█ ", " █▀▀ "],
    " ": ["   ", "   "],
  };
  const lines = ["", ""];
  for (const ch of upper) {
    const g = glyphs[ch] ?? glyphs[" "];
    lines[0] += g[0] + " ";
    lines[1] += g[1] + " ";
  }
  return lines.join("\n");
}
