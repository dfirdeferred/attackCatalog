import { CHAINS, getChainBySlug, type ChainSlug } from "./chains";
import { ROLE_SLUGS } from "./roles";

const STORAGE_KEY = "attackCatalog";
const TOTAL_ATTACKS = 33;

export interface PageEntry {
  readAt: number;
  mode: "reference" | "scenario";
}

export interface ProgressState {
  pages: Record<string, PageEntry>;
  achievements: string[];
}

function emptyState(): ProgressState {
  return { pages: {}, achievements: [] };
}

export function getProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return {
      pages: parsed.pages || {},
      achievements: parsed.achievements || [],
    };
  } catch {
    return emptyState();
  }
}

function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function markPageRead(
  pageId: string,
  mode: "reference" | "scenario"
): void {
  const state = getProgress();
  if (state.pages[pageId]) return; // already read
  state.pages[pageId] = { readAt: Date.now(), mode };
  saveProgress(state);
}

export function isPageRead(pageId: string): boolean {
  const state = getProgress();
  return !!state.pages[pageId];
}

export function getRoleProgress(
  role: string,
  mode: "reference" | "scenario"
): { read: number; total: number } {
  const state = getProgress();
  const prefix = mode === "reference" ? `ref:${role}:` : `scenario:${role}:`;
  const read = Object.keys(state.pages).filter((key) =>
    key.startsWith(prefix)
  ).length;

  if (mode === "reference") {
    return { read, total: TOTAL_ATTACKS };
  }

  // Scenario mode: count total steps across all chains for this role
  let total = 0;
  for (const chain of CHAINS) {
    total += chain.attacks.length;
  }
  return { read, total };
}

export function getChainProgress(
  chainSlug: string,
  role: string
): { read: number; total: number } {
  const chain = getChainBySlug(chainSlug as ChainSlug);
  if (!chain) return { read: 0, total: 0 };

  const state = getProgress();
  const prefix = `scenario:${role}:${chainSlug}:`;
  const read = Object.keys(state.pages).filter((key) =>
    key.startsWith(prefix)
  ).length;

  return { read, total: chain.attacks.length };
}

export function getThreatLevel(): string {
  const { percentage } = getOverallProgress();

  if (percentage >= 100) return "Impenetrable";
  if (percentage >= 75) return "Fortified";
  if (percentage >= 50) return "Hardened";
  if (percentage >= 30) return "Informed";
  if (percentage >= 10) return "Aware";
  return "Vulnerable";
}

export function getOverallProgress(): {
  read: number;
  total: number;
  percentage: number;
} {
  const state = getProgress();
  const read = Object.keys(state.pages).length;

  // Total: reference (33 attacks x 4 roles) + scenario (sum of chain steps x 4 roles)
  const refTotal = TOTAL_ATTACKS * ROLE_SLUGS.length;
  let scenarioTotal = 0;
  for (const chain of CHAINS) {
    scenarioTotal += chain.attacks.length * ROLE_SLUGS.length;
  }
  const total = refTotal + scenarioTotal;

  const raw = total > 0 ? (read / total) * 100 : 0;
  const percentage = read > 0 && raw < 1 ? 1 : Math.round(raw);
  return { read, total, percentage };
}

export function clearProgress(): void {
  saveProgress(emptyState());
}
