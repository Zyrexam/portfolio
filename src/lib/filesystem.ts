import { projects, experiences, publications, writings, profile } from "./content";

export type FileKind =
  | "dir"
  | "about"
  | "resume"
  | "contact"
  | "skills"
  | "experience"
  | "project"
  | "link"
  | "env"
  | "settings"
  | "package"
  | "publication"
  | "writing"
  | "ask"
  | "markdown";

export interface FsNode {
  name: string; // filesystem name (used in path)
  label?: string; // friendly sidebar label
  kind: FileKind;
  icon: string; // icon key (see IconFor)
  hidden?: boolean; // hidden file (.env)
  external?: boolean; // opens in new tab
  href?: string; // for links
  projectId?: string; // for project dirs
  experienceId?: string; // for experience files
  publicationId?: string; // for publication files
  writingId?: string; // for writing files
  children?: FsNode[];
}

export const ICON_COLORS: Record<string, string> = {
  home: "#dcb67a",
  folder: "#dcb67a",
  folderOpen: "#dcb67a",
  flask: "#c586c0",
  about: "#569cd6",
  resume: "#cc4444",
  contact: "#4ec9b0",
  skills: "#dcdcaa",
  experience: "#c586c0",
  github: "#ffffff",
  linkedin: "#4ec9b0",
  leetcode: "#f1e05a",
  link: "#569cd6",
  env: "#e2c08d",
  settings: "#d4d4d4",
  package: "#cbcb41",
  publication: "#f89820",
  writing: "#4ec9b0",
  java: "#f89820",
  aws: "#ff9900",
  systems: "#4ec9b0",
  experiments: "#c586c0",
  webhook: "#007acc",
  shield: "#4ec9b0",
  chart: "#dcdcaa",
  bolt: "#569cd6",
  cloud: "#c586c0",
  mail: "#ce9178",
  "shield-check": "#4ec9b0",
  cpu: "#9cdcfe",
  code: "#f1e05a",
  file: "#d4d4d4",
};

// Category icon + color
const categoryMeta: Record<
  string,
  { icon: string; label: string; color: string }
> = {
  "Java-Projects": { icon: "java", label: "Java-Projects", color: "#f89820" },
  "AWS-Projects": { icon: "aws", label: "AWS-Projects", color: "#ff9900" },
  "Systems-Programming": {
    icon: "systems",
    label: "Systems-Programming",
    color: "#4ec9b0",
  },
  Experiments: { icon: "experiments", label: "Experiments", color: "#c586c0" },
};

function buildProjectsTree(): FsNode {
  const categories = ["Java-Projects", "AWS-Projects", "Systems-Programming", "Experiments"] as const;
  const children: FsNode[] = categories.map((cat) => {
    const meta = categoryMeta[cat];
    const projectsInCat = projects.filter((p) => p.category === cat);
    return {
      name: cat,
      label: meta.label,
      kind: "dir",
      icon: meta.icon,
      children: projectsInCat.map((p) => ({
        name: p.name,
        label: p.name,
        kind: "project" as FileKind,
        icon: p.icon,
        projectId: p.id,
      })),
    };
  });
  return {
    name: "projects",
    label: "projects",
    kind: "dir",
    icon: "folder",
    children,
  };
}

function buildExperienceTree(): FsNode {
  return {
    name: "experience",
    label: "experience",
    kind: "dir",
    icon: "experience",
    children: experiences.map((e) => ({
      name: `${e.id}.md`,
      label: `${e.id}.md`,
      kind: "experience" as FileKind,
      icon: "experience",
      experienceId: e.id,
    })),
  };
}

function buildPublicationsTree(): FsNode {
  return {
    name: "publications",
    label: "publications",
    kind: "dir",
    icon: "publication",
    children: publications.map((p) => ({
      name: `${p.id}.pdf`,
      label: `${p.id}.pdf`,
      kind: "publication" as FileKind,
      icon: "publication",
      publicationId: p.id,
    })),
  };
}

function buildWritingsTree(): FsNode {
  return {
    name: "writings",
    label: "writings",
    kind: "dir",
    icon: "writing",
    children: writings.map((w) => ({
      name: `${w.id}.md`,
      label: `${w.id}.md`,
      kind: "writing" as FileKind,
      icon: "writing",
      writingId: w.id,
    })),
  };
}

export const fileTree: FsNode = {
  name: "mohit",
  label: "HOME",
  kind: "dir",
  icon: "home",
  children: [
    buildProjectsTree(),
    buildExperienceTree(),
    buildPublicationsTree(),
    buildWritingsTree(),
    {
      name: "skills.md",
      label: "skills.md",
      kind: "skills",
      icon: "skills",
    },
    {
      name: "about",
      label: "about",
      kind: "dir",
      icon: "folder",
      children: [
        {
          name: "about.md",
          label: "about.md",
          kind: "about",
          icon: "about",
        },
      ],
    },
    {
      name: "Resume.pdf",
      label: "Resume.pdf",
      kind: "resume",
      icon: "resume",
    },
    {
      name: "contact",
      label: "contact",
      kind: "dir",
      icon: "folder",
      children: [
        {
          name: "contact.md",
          label: "contact.md",
          kind: "contact",
          icon: "contact",
        },
      ],
    },
    {
      name: "links",
      label: "links",
      kind: "dir",
      icon: "folder",
      children: [
        {
          name: "github.url",
          label: "github.url",
          kind: "link",
          icon: "github",
          external: true,
          href: profile.github,
        },
        {
          name: "linkedin.url",
          label: "linkedin.url",
          kind: "link",
          icon: "linkedin",
          external: true,
          href: profile.linkedin,
        },
        {
          name: "leetcode.url",
          label: "leetcode.url",
          kind: "link",
          icon: "leetcode",
          external: true,
          href: profile.leetcode,
        },
      ],
    },
    {
      name: ".env",
      label: ".env",
      kind: "env",
      icon: "env",
      hidden: true,
    },
    {
      name: ".mohitos",
      label: ".mohitos",
      kind: "dir",
      icon: "folder",
      hidden: true,
      children: [
        {
          name: "settings.json",
          label: "settings.json",
          kind: "settings",
          icon: "settings",
        },
        {
          name: "package.json",
          label: "package.json",
          kind: "package",
          icon: "package",
        },
      ],
    },
  ],
};

export function pathToString(path: string[]): string {
  return "/" + ["home", "mohit", ...path].join("/");
}

export function pathKey(path: string[]): string {
  return path.join("/");
}

// Virtual node for the Ask Mohit full-page view (not in the tree, but openable).
export const ASK_NODE: FsNode = {
  name: "ask-mohit",
  label: "Ask Mohit",
  kind: "ask",
  icon: "skills",
};

export function getNodeAtPath(path: string[]): FsNode | null {
  // Virtual "ask" node
  if (path.length === 1 && path[0] === "ask-mohit") {
    return ASK_NODE;
  }
  let node: FsNode = fileTree;
  for (const seg of path) {
    const child = node.children?.find((c) => c.name === seg);
    if (!child) return null;
    node = child;
  }
  return node;
}

export function getChildren(path: string[]): FsNode[] {
  const node = getNodeAtPath(path);
  return node?.children ?? [];
}

export function isDir(node: FsNode | null): boolean {
  return !!node && node.kind === "dir";
}
