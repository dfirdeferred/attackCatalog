import { describe, it, expect } from "vitest";
import {
  ROLES,
  getRoleBySlug,
  ROLE_SLUGS,
  type Role,
  type RoleSlug,
} from "@lib/roles";

describe("ROLES", () => {
  it("defines exactly 4 roles", () => {
    expect(ROLES).toHaveLength(4);
  });

  it("has unique slugs", () => {
    const slugs = ROLES.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(4);
  });

  it("includes expected slugs", () => {
    const slugs = ROLES.map((r) => r.slug);
    expect(slugs).toContain("c-level");
    expect(slugs).toContain("it-admin");
    expect(slugs).toContain("end-user");
    expect(slugs).toContain("red-teamer");
  });

  it("each role has name, slug, description, and colors", () => {
    for (const role of ROLES) {
      expect(role.name).toBeTruthy();
      expect(role.slug).toBeTruthy();
      expect(role.description).toBeTruthy();
      expect(role.colors.light).toMatch(/^#[0-9a-f]{6}$/i);
      expect(role.colors.dark).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe("getRoleBySlug", () => {
  it("returns the correct role for a valid slug", () => {
    const role = getRoleBySlug("c-level");
    expect(role).toBeDefined();
    expect(role!.name).toBe("C-Level / IT Manager");
  });

  it("returns undefined for an invalid slug", () => {
    const role = getRoleBySlug("hacker" as RoleSlug);
    expect(role).toBeUndefined();
  });
});

describe("ROLE_SLUGS", () => {
  it("is an array of the 4 slug strings", () => {
    expect(ROLE_SLUGS).toEqual(["c-level", "it-admin", "end-user", "red-teamer"]);
  });
});
