"use client";

import {
  Home,
  Folder,
  FolderOpen,
  FlaskConical,
  FileText,
  User,
  FileBadge,
  MessageSquare,
  Cpu,
  Github,
  Link2,
  ShieldCheck,
  Lock,
  Webhook,
  BarChart3,
  Zap,
  Cloud,
  Mail,
  Code2,
  FileCode2,
  Database,
  Settings,
  Package,
  BookOpen,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { ICON_COLORS } from "@/lib/filesystem";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  folder: Folder,
  folderOpen: FolderOpen,
  flask: FlaskConical,
  about: User,
  resume: FileBadge,
  contact: MessageSquare,
  skills: Cpu,
  experience: FileCode2,
  github: Github,
  linkedin: Link2,
  leetcode: Code2,
  link: Link2,
  env: Lock,
  settings: Settings,
  package: Package,
  publication: BookOpen,
  writing: PenLine,
  java: FileCode2,
  aws: Cloud,
  systems: Database,
  experiments: FlaskConical,
  webhook: Webhook,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  chart: BarChart3,
  bolt: Zap,
  cloud: Cloud,
  mail: Mail,
  cpu: Cpu,
  code: Code2,
  file: FileText,
};

export function FileIcon({
  icon,
  size = 16,
  className,
}: {
  icon: string;
  size?: number;
  className?: string;
}) {
  const Cmp = iconMap[icon] ?? FileText;
  const color = ICON_COLORS[icon] ?? "#d4d4d4";
  return <Cmp size={size} className={className} style={{ color }} />;
}
