import { CHAINS } from "./chains";
import { ROLE_SLUGS } from "./roles";
import type { ProgressState } from "./progress";

const TOTAL_ATTACKS = 33;

export interface Achievement {
  id: string;
  name: string;
  description: string;
  check: (state: ProgressState) => boolean;
}

function hasPageWithPrefix(state: ProgressState, prefix: string): boolean {
  return Object.keys(state.pages).some((key) => key.startsWith(prefix));
}

function countPagesWithPrefix(state: ProgressState, prefix: string): number {
  return Object.keys(state.pages).filter((key) => key.startsWith(prefix)).length;
}

function isRoleRefComplete(state: ProgressState, role: string): boolean {
  return countPagesWithPrefix(state, `ref:${role}:`) >= TOTAL_ATTACKS;
}

function isChainComplete(state: ProgressState, chainSlug: string): boolean {
  const chain = CHAINS.find((c) => c.slug === chainSlug);
  if (!chain) return false;

  // Chain is complete if any role has completed all steps
  for (const role of ROLE_SLUGS) {
    const stepsRead = chain.attacks.filter((attack) =>
      state.pages[`scenario:${role}:${chainSlug}:${attack}`]
    ).length;
    if (stepsRead >= chain.attacks.length) return true;
  }
  return false;
}

function isAnyChainComplete(state: ProgressState): boolean {
  return CHAINS.some((chain) => isChainComplete(state, chain.slug));
}

function isAnyRoleRefComplete(state: ProgressState): boolean {
  return ROLE_SLUGS.some((role) => isRoleRefComplete(state, role));
}

function getTotalPages(): number {
  const refTotal = TOTAL_ATTACKS * ROLE_SLUGS.length;
  let scenarioTotal = 0;
  for (const chain of CHAINS) {
    scenarioTotal += chain.attacks.length * ROLE_SLUGS.length;
  }
  return refTotal + scenarioTotal;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "first-contact",
    name: "First Contact",
    description: "Read your first page",
    check: (state) => Object.keys(state.pages).length >= 1,
  },
  {
    id: "role-player",
    name: "Role Player",
    description: "Complete any role's reference path",
    check: (state) => isAnyRoleRefComplete(state),
  },
  {
    id: "chain-breaker",
    name: "Chain Breaker",
    description: "Complete any kill chain scenario",
    check: (state) => isAnyChainComplete(state),
  },
  {
    id: "c-suite-ready",
    name: "C-Suite Ready",
    description: "Complete the C-Level reference path",
    check: (state) => isRoleRefComplete(state, "c-level"),
  },
  {
    id: "sysadmin-shield",
    name: "Sysadmin Shield",
    description: "Complete the IT Admin reference path",
    check: (state) => isRoleRefComplete(state, "it-admin"),
  },
  {
    id: "street-smart",
    name: "Street Smart",
    description: "Complete the End User reference path",
    check: (state) => isRoleRefComplete(state, "end-user"),
  },
  {
    id: "red-badge",
    name: "Red Badge",
    description: "Complete the Red Teamer reference path",
    check: (state) => isRoleRefComplete(state, "red-teamer"),
  },
  {
    id: "domain-defender",
    name: "Domain Defender",
    description: "Complete The Domain Takeover scenario",
    check: (state) => isChainComplete(state, "domain-takeover"),
  },
  {
    id: "ghost-hunter",
    name: "Ghost Hunter",
    description: "Complete The Silent Persistence scenario",
    check: (state) => isChainComplete(state, "silent-persistence"),
  },
  {
    id: "cloud-watcher",
    name: "Cloud Watcher",
    description: "Complete The Cloud Bridge scenario",
    check: (state) => isChainComplete(state, "cloud-bridge"),
  },
  {
    id: "key-master",
    name: "Key Master",
    description: "Complete The Service Account Heist scenario",
    check: (state) => isChainComplete(state, "service-account-heist"),
  },
  {
    id: "zero-day-survivor",
    name: "Zero Day Survivor",
    description: "Complete The Zero-Day Cascade scenario",
    check: (state) => isChainComplete(state, "zero-day-cascade"),
  },
  {
    id: "signal-catcher",
    name: "Signal Catcher",
    description: "Complete The Physical Vector scenario",
    check: (state) => isChainComplete(state, "physical-vector"),
  },
  {
    id: "prompt-guardian",
    name: "Prompt Guardian",
    description: "Complete The AI-Assisted Breach scenario",
    check: (state) => isChainComplete(state, "ai-breach"),
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Read at least 1 page from every role",
    check: (state) =>
      ROLE_SLUGS.every(
        (role) =>
          hasPageWithPrefix(state, `ref:${role}:`) ||
          hasPageWithPrefix(state, `scenario:${role}:`)
      ),
  },
  {
    id: "omniscient",
    name: "Omniscient",
    description: "100% completion across both modes",
    check: (state) => Object.keys(state.pages).length >= getTotalPages(),
  },
] as const;

export function checkAchievements(state: ProgressState): string[] {
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (state.achievements.includes(achievement.id)) continue;
    if (achievement.check(state)) {
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

export function getAchievements(): (Achievement & { unlocked: boolean })[] {
  let unlockedIds: string[] = [];
  try {
    const raw = localStorage.getItem("attackCatalog");
    if (raw) {
      const data = JSON.parse(raw);
      unlockedIds = data.achievements || [];
    }
  } catch {
    // localStorage unavailable
  }

  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: unlockedIds.includes(achievement.id),
  }));
}
