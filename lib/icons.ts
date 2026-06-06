/**
 * Resolve a Lucide icon by string name so configs stay declarative & serializable.
 * Falls back to a neutral Sparkles icon if the name isn't found.
 */
import { icons, Sparkles, type LucideIcon } from "lucide-react";
import type { IconName } from "./landing.types";

export function getIcon(name: IconName): LucideIcon {
  const Pascal = name
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return (icons as Record<string, LucideIcon>)[Pascal] ?? Sparkles;
}
