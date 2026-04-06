import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ACHIEVEMENTS,
  checkAchievements,
  getAchievements,
  type Achievement,
} from "@lib/achievements";
import type { ProgressState } from "@lib/progress";

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

describe("ACHIEVEMENTS", () => {
  it("defines exactly 16 achievements", () => {
    expect(ACHIEVEMENTS).toHaveLength(16);
  });

  it("each achievement has id, name, description, and check function", () => {
    for (const achievement of ACHIEVEMENTS) {
      expect(achievement.id).toBeTruthy();
      expect(achievement.name).toBeTruthy();
      expect(achievement.description).toBeTruthy();
      expect(typeof achievement.check).toBe("function");
    }
  });

  it("has unique ids", () => {
    const ids = ACHIEVEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(16);
  });
});

describe("checkAchievements", () => {
  it("returns empty array for empty progress", () => {
    const state: ProgressState = { pages: {}, achievements: [] };
    const newlyUnlocked = checkAchievements(state);
    expect(newlyUnlocked).toEqual([]);
  });

  it("unlocks 'first-contact' when 1 page is read", () => {
    const state: ProgressState = {
      pages: { "ref:c-level:golden-ticket": { readAt: 1000, mode: "reference" } },
      achievements: [],
    };
    const newlyUnlocked = checkAchievements(state);
    expect(newlyUnlocked).toContain("first-contact");
  });

  it("does not re-unlock an already-unlocked achievement", () => {
    const state: ProgressState = {
      pages: { "ref:c-level:golden-ticket": { readAt: 1000, mode: "reference" } },
      achievements: ["first-contact"],
    };
    const newlyUnlocked = checkAchievements(state);
    expect(newlyUnlocked).not.toContain("first-contact");
  });

  it("unlocks 'explorer' when at least 1 page from each role is read", () => {
    const state: ProgressState = {
      pages: {
        "ref:c-level:golden-ticket": { readAt: 1000, mode: "reference" },
        "ref:it-admin:golden-ticket": { readAt: 1001, mode: "reference" },
        "ref:end-user:golden-ticket": { readAt: 1002, mode: "reference" },
        "ref:red-teamer:golden-ticket": { readAt: 1003, mode: "reference" },
      },
      achievements: [],
    };
    const newlyUnlocked = checkAchievements(state);
    expect(newlyUnlocked).toContain("explorer");
  });
});

describe("getAchievements", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns all 16 achievements with unlocked=false when no progress", () => {
    const achievements = getAchievements();
    expect(achievements).toHaveLength(16);
    expect(achievements.every((a) => a.unlocked === false)).toBe(true);
  });

  it("marks achievements as unlocked based on localStorage", () => {
    const state: ProgressState = {
      pages: { "ref:c-level:golden-ticket": { readAt: 1000, mode: "reference" } },
      achievements: ["first-contact"],
    };
    localStorageMock.setItem("attackCatalog", JSON.stringify(state));

    const achievements = getAchievements();
    const firstContact = achievements.find((a) => a.id === "first-contact");
    expect(firstContact?.unlocked).toBe(true);
  });
});
