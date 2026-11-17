// port/settings.ts — the settings model: framework-free, persistence across reload (localStorage
// through the engine's own KeyValue/StorageModule shape so file:// and http behave the same).
// Settings: theme mode (light/dark/system), reduced motion, feed reading order (newest-first vs game
// order), the demo seed, the valuation mode label echo. Every value has a safe default; a corrupt
// stored blob falls back to defaults (settings are repairable by DESIGN — they are preferences, not
// provenance; saves stay corrupt-never-repair).
import { sportKey, createLocalStorageModule } from './seam.ts';

export interface Settings {
  mode: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  newestFirst: boolean;         // the feed reading order (slice 4 law: NEWEST FIRST vs game order)
  teamName: string | null;      // the chosen team (the [data-zpbteam] remap driver)
  draftSlot: number | null;     // P-317: the chosen draft position 1..32 (persisted with the team)
}

export const DEFAULT_SETTINGS: Settings = {
  mode: 'system',
  reducedMotion: false,
  newestFirst: true,
  teamName: null,
  draftSlot: null,
};

const KEY = sportKey('nfl', 'settings');

function kv(): { getItem(k: string): string | null; setItem(k: string, v: string): void } | null {
  try { return globalThis.localStorage; } catch { return null; }
}

export function loadSettings(): Settings {
  const store = kv();
  if (!store) return { ...DEFAULT_SETTINGS };
  try {
    const raw = store.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const p = JSON.parse(raw) as Partial<Settings>;
    return {
      mode: p.mode === 'light' || p.mode === 'dark' || p.mode === 'system' ? p.mode : DEFAULT_SETTINGS.mode,
      reducedMotion: p.reducedMotion === true,
      newestFirst: p.newestFirst !== false,       // default true (slice 4 law)
      teamName: typeof p.teamName === 'string' ? p.teamName : null,
      draftSlot: typeof p.draftSlot === 'number' && p.draftSlot >= 1 && p.draftSlot <= 32 ? p.draftSlot : null,
    };
  } catch { return { ...DEFAULT_SETTINGS }; }      // corrupt settings = defaults; never half-applied
}

export function saveSettings(s: Settings): void {
  const store = kv();
  if (!store) return;
  try { store.setItem(KEY, JSON.stringify(s)); } catch { /* storage may refuse; the choice stays session-only */ }
}

// The prefers-reduced-motion probe (a CSS-media default; the explicit setting wins).
export function systemReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
