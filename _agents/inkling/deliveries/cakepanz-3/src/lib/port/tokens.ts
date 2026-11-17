// port/tokens.ts — the TS twin of assets/tokens-w89.css (permitted shared design tokens, byte-source
// w89). LIGHT = pale rose; DARK = the w89 dark block. `--text` in dark is NOT set by the sheet (the
// w89 live behavior — flagged for the Owner, never fixed here). The team palette rides
// zpb-team-colors.json (the Owner's 22 Oct 32-team table): applyTeam() sets [data-zpbteam] + the
// per-team custom properties the remap blocks consume. --zcream is NEVER tinted by a team.
export const VARIANT = 'live-w89 (Variant L) — the direction per the Owner beauty ruling' as const;
export const LIGHT = {
  bg: '#fdf2f6', panel: '#ffffff', panel2: '#f9e9f0',
  text: '#8e5566', sub: '#885261', rosehair: '#e6c3d2',
  zcream: '#53382b', gold2: '#e6c67d', goldm: '#ad7f2e', gold3: '#9a6b1f', onGold: '#3a2a14',
} as const;
export const DARK = {
  bg: '#1e1119', panel: '#291a24', panel2: '#35202d',
  text: '#8e5566',              // w89's dark block does NOT set --text — flagged, not fixed (Owner question)
  sub: '#c99cae', rosehair: '#4a3040',
  zcream: '#f2e7d5', gold2: '#e8c87e', goldm: '#c39a4a', gold3: '#8a5f18', onGold: '#2c1e0c',
} as const;
export const TEAM_FALLBACK: readonly [string, string, string] = ['#e6c67d', '#f2e7d5', '#c39a4a'];

// the neutral ink the feed/board chrome reads on dark panels (the shell's own glass ink — not a
// team colour, not --zcream; the takeover leaves it alone)
export const PANEL_HEX_DARK = '#291a24';
export const PANEL_HEX_LIGHT = '#ffffff';
export const CREAM_HEX = '#f2e7d5';

export type Mode = 'light' | 'dark' | 'system';

// The 32-team palette (zpb-team-colors.json, verbatim). One table, the only team palette.
import ZPB from '../assets/zpb-team-colors.json' with { type: 'json' };
export const ZPB_TEAM_COLORS: Readonly<Record<string, readonly [string, string, string]>> = ZPB as never;

export const teamStops = (teamName: string): readonly [string, string, string] =>
  ZPB_TEAM_COLORS[teamName] ?? TEAM_FALLBACK;

// ---------- the [data-zpbteam] remap (the w89 recipe): the UI sets the attribute + the stops ----------
// Pure function first (node-testable), DOM applier second (no-ops outside a browser).
export interface TeamRemap { attr: string; vars: Record<string, string> }
export function teamRemap(teamName: string): TeamRemap {
  const [c1, c2, c3] = teamStops(teamName);
  return { attr: teamName, vars: { '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3 } };
}
export function applyTeam(teamName: string | null, mode: Mode): void {
  if (typeof document === 'undefined') return;                       // node-side renders: no DOM, no crash
  const root = document.documentElement;
  if (!teamName) { delete root.dataset.zpbteam; return; }
  const remap = teamRemap(teamName);
  root.dataset.zpbteam = remap.attr;
  for (const [k, v] of Object.entries(remap.vars)) root.style.setProperty(k, v);
  // the user's team carries the .ub class (Owner law); the attribute carries the palette
  root.dataset.theme = mode === 'system' ? '' : mode;
  if (mode === 'system') delete root.dataset.theme;
}
export function applyMode(mode: Mode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'system') delete root.dataset.theme;
  else root.dataset.theme = mode;
}
