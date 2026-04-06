import { describe, it, expect } from "vitest";
import {
  CHAINS,
  getChainBySlug,
  CHAIN_SLUGS,
  type Chain,
  type ChainSlug,
} from "@lib/chains";

describe("CHAINS", () => {
  it("defines exactly 7 chains", () => {
    expect(CHAINS).toHaveLength(7);
  });

  it("has unique slugs", () => {
    const slugs = CHAINS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(7);
  });

  it("includes all expected chain slugs", () => {
    const slugs = CHAINS.map((c) => c.slug);
    expect(slugs).toContain("domain-takeover");
    expect(slugs).toContain("silent-persistence");
    expect(slugs).toContain("cloud-bridge");
    expect(slugs).toContain("service-account-heist");
    expect(slugs).toContain("zero-day-cascade");
    expect(slugs).toContain("physical-vector");
    expect(slugs).toContain("ai-breach");
  });

  it("each chain has name, slug, description, and non-empty attacks array", () => {
    for (const chain of CHAINS) {
      expect(chain.name).toBeTruthy();
      expect(chain.slug).toBeTruthy();
      expect(chain.description).toBeTruthy();
      expect(chain.attacks.length).toBeGreaterThan(0);
    }
  });

  it("domain-takeover has 7 attacks in correct order", () => {
    const chain = getChainBySlug("domain-takeover");
    expect(chain).toBeDefined();
    expect(chain!.attacks).toEqual([
      "ldap-reconnaissance", "password-spraying", "kerberoasting",
      "golden-ticket", "dcsync", "lateral-movement", "ransomware",
    ]);
  });

  it("silent-persistence has 6 attacks in correct order", () => {
    const chain = getChainBySlug("silent-persistence");
    expect(chain).toBeDefined();
    expect(chain!.attacks).toEqual([
      "credential-stuffing", "pass-the-hash", "adminsdholder",
      "dcshadow", "skeleton-key", "ssp-attack",
    ]);
  });

  it("cloud-bridge has 5 attacks in correct order", () => {
    const chain = getChainBySlug("cloud-bridge");
    expect(chain).toBeDefined();
    expect(chain!.attacks).toEqual([
      "password-attack", "pass-the-cookie", "abusing-entra-id",
      "golden-saml", "lateral-movement",
    ]);
  });

  it("ai-breach has 4 attacks in correct order", () => {
    const chain = getChainBySlug("ai-breach");
    expect(chain).toBeDefined();
    expect(chain!.attacks).toEqual([
      "chatgpt-prompt-injection", "sql-injection", "lateral-movement", "malware",
    ]);
  });
});

describe("getChainBySlug", () => {
  it("returns the correct chain for a valid slug", () => {
    const chain = getChainBySlug("domain-takeover");
    expect(chain).toBeDefined();
    expect(chain!.name).toBe("The Domain Takeover");
  });

  it("returns undefined for an invalid slug", () => {
    const chain = getChainBySlug("nonexistent" as ChainSlug);
    expect(chain).toBeUndefined();
  });
});

describe("CHAIN_SLUGS", () => {
  it("is an array of the 7 slug strings", () => {
    expect(CHAIN_SLUGS).toEqual([
      "domain-takeover", "silent-persistence", "cloud-bridge",
      "service-account-heist", "zero-day-cascade", "physical-vector", "ai-breach",
    ]);
  });
});
