import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getProgress,
  markPageRead,
  isPageRead,
  getRoleProgress,
  getChainProgress,
  getThreatLevel,
  getOverallProgress,
  clearProgress,
  type ProgressState,
} from "@lib/progress";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("progress", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("getProgress", () => {
    it("returns empty state when localStorage is empty", () => {
      const progress = getProgress();
      expect(progress.pages).toEqual({});
      expect(progress.achievements).toEqual([]);
    });

    it("returns stored state when localStorage has data", () => {
      const state: ProgressState = {
        pages: { "ref:c-level:golden-ticket": { readAt: 1000, mode: "reference" } },
        achievements: ["first-contact"],
      };
      localStorageMock.setItem("attackCatalog", JSON.stringify(state));
      const progress = getProgress();
      expect(progress.pages["ref:c-level:golden-ticket"]).toBeDefined();
      expect(progress.achievements).toContain("first-contact");
    });
  });

  describe("markPageRead", () => {
    it("marks a reference page as read", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      const progress = getProgress();
      expect(progress.pages["ref:c-level:golden-ticket"]).toBeDefined();
      expect(progress.pages["ref:c-level:golden-ticket"].mode).toBe("reference");
      expect(progress.pages["ref:c-level:golden-ticket"].readAt).toBeGreaterThan(0);
    });

    it("marks a scenario page as read", () => {
      markPageRead("scenario:c-level:domain-takeover:golden-ticket", "scenario");
      const progress = getProgress();
      expect(progress.pages["scenario:c-level:domain-takeover:golden-ticket"]).toBeDefined();
      expect(progress.pages["scenario:c-level:domain-takeover:golden-ticket"].mode).toBe("scenario");
    });

    it("does not overwrite an already-read page", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      const firstReadAt = getProgress().pages["ref:c-level:golden-ticket"].readAt;
      markPageRead("ref:c-level:golden-ticket", "reference");
      const secondReadAt = getProgress().pages["ref:c-level:golden-ticket"].readAt;
      expect(secondReadAt).toBe(firstReadAt);
    });
  });

  describe("isPageRead", () => {
    it("returns false for unread pages", () => {
      expect(isPageRead("ref:c-level:golden-ticket")).toBe(false);
    });

    it("returns true for read pages", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      expect(isPageRead("ref:c-level:golden-ticket")).toBe(true);
    });
  });

  describe("getRoleProgress", () => {
    it("returns 0/33 for a role with no pages read in reference mode", () => {
      const progress = getRoleProgress("c-level", "reference");
      expect(progress.read).toBe(0);
      expect(progress.total).toBe(33);
    });

    it("counts only pages for the specified role and mode", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      markPageRead("ref:it-admin:golden-ticket", "reference");
      markPageRead("scenario:c-level:domain-takeover:golden-ticket", "scenario");

      const refProgress = getRoleProgress("c-level", "reference");
      expect(refProgress.read).toBe(1);
      expect(refProgress.total).toBe(33);

      const itAdminProgress = getRoleProgress("it-admin", "reference");
      expect(itAdminProgress.read).toBe(1);
    });
  });

  describe("getChainProgress", () => {
    it("returns 0/N for a chain with no steps read", () => {
      const progress = getChainProgress("domain-takeover", "c-level");
      expect(progress.read).toBe(0);
      expect(progress.total).toBe(7); // domain-takeover has 7 attacks
    });

    it("counts read steps in a chain", () => {
      markPageRead("scenario:c-level:domain-takeover:golden-ticket", "scenario");
      markPageRead("scenario:c-level:domain-takeover:dcsync", "scenario");
      const progress = getChainProgress("domain-takeover", "c-level");
      expect(progress.read).toBe(2);
      expect(progress.total).toBe(7);
    });
  });

  describe("getThreatLevel", () => {
    it("returns 'Vulnerable' with no pages read", () => {
      expect(getThreatLevel()).toBe("Vulnerable");
    });
  });

  describe("getOverallProgress", () => {
    it("returns 0 read, positive total, 0 percentage with no pages read", () => {
      const overall = getOverallProgress();
      expect(overall.read).toBe(0);
      expect(overall.total).toBeGreaterThan(0);
      expect(overall.percentage).toBe(0);
    });

    it("calculates percentage correctly", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      const overall = getOverallProgress();
      expect(overall.read).toBe(1);
      expect(overall.percentage).toBeGreaterThan(0);
    });
  });

  describe("clearProgress", () => {
    it("resets all progress", () => {
      markPageRead("ref:c-level:golden-ticket", "reference");
      clearProgress();
      const progress = getProgress();
      expect(progress.pages).toEqual({});
      expect(progress.achievements).toEqual([]);
    });
  });
});
