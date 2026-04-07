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
    colors: { light: "#F36A1D", dark: "#F36A1D" },  /* Flashpoint Orange */
  },
  {
    name: "IT Administrator",
    slug: "it-admin",
    description: "Defensive perspective — detection techniques, system hardening, incident response, and SIEM alerts.",
    icon: "shield",
    colors: { light: "#5851DB", dark: "#5851DB" },  /* Vigilant Blue */
  },
  {
    name: "End User",
    slug: "end-user",
    description: "Victim perspective — what attacks look like, how to stay safe, and what to do when targeted.",
    icon: "user",
    colors: { light: "#41F27C", dark: "#41F27C" },  /* Beacon Green */
  },
  {
    name: "Red Teamer",
    slug: "red-teamer",
    description: "Offensive perspective — attack chains, exploitation techniques, and penetration testing paths.",
    icon: "crosshair",
    colors: { light: "#F4B400", dark: "#F4B400" },  /* Signal Yellow */
  },
] as const;

export const ROLE_SLUGS: readonly RoleSlug[] = ROLES.map((r) => r.slug);

export function getRoleBySlug(slug: RoleSlug): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

export function isValidRoleSlug(value: string): value is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(value);
}
