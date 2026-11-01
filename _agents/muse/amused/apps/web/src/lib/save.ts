// Save seam for amused — localStorage today (KG: short-term), the SaveStore
// contract in engine-core later (Auth.js / managed / Cloudflare long-term).
// Framework-free; try/catch throughout (private windows, quota).
import type { Player } from '../draft/players-data.ts';

const KEY = 'amused.v1';

type SaveData = {
  version: 1;
  team: string;
  seed: number;
  rosters: Record<string, Player[]>;
};

export function saveDraft(team: string, seed: number, rosters: Map<string, Player[]>): boolean {
  try {
    const data: SaveData = {
      version: 1,
      team, seed,
      rosters: Object.fromEntries(rosters),
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): { team: string; seed: number; rosters: Map<string, Player[]> } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SaveData;
    if (data.version !== 1 || !data.team || !data.rosters) return null;
    return { team: data.team, seed: data.seed, rosters: new Map(Object.entries(data.rosters)) };
  } catch {
    return null;
  }
}

export function clearSave(): void {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}
