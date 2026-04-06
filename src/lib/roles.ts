export type RoleSlug = "c-level" | "it-admin" | "end-user" | "red-teamer";

export interface Role {
  name: string;
  slug: RoleSlug;
  description: string;
  icon: string;
  colors: {
    light: string;
    dark: string;
  };
}

export const ROLES: readonly Role[] = [
  {
    name: "C-Level / IT Manager",
    slug: "c-level",
    description: "Strategic perspective — business impact, cost analysis, risk management, and board-level decisions.",
    icon: "briefcase",
    colors: { light: "#cf222e", dark: "#ff6b6b" },
  },
  {
    name: "IT Administrator",
    slug: "it-admin",
    description: "Defensive perspective — detection techniques, system hardening, incident response, and SIEM alerts.",
    icon: "shield",
    colors: { light: "#0550ae", dark: "#58a6ff" },
  },
  {
    name: "End User",
    slug: "end-user",
    description: "Victim perspective — what attacks look like, how to stay safe, and what to do when targeted.",
    icon: "user",
    colors: { light: "#1a7f37", dark: "#3fb950" },
  },
  {
    name: "Red Teamer",
    slug: "red-teamer",
    description: "Offensive perspective — attack chains, exploitation techniques, and penetration testing paths.",
    icon: "crosshair",
    colors: { light: "#9a6700", dark: "#d29922" },
  },
] as const;

export const ROLE_SLUGS: readonly RoleSlug[] = ROLES.map((r) => r.slug);

export function getRoleBySlug(slug: RoleSlug): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function isValidRoleSlug(value: string): value is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(value);
}
