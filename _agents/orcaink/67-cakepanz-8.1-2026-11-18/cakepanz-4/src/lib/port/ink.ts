// port/ink.ts — the readable team ink (ported from slice 4). The colours are the Owner's 22 Oct
// 32-team table from the SNAPSHOT (via the seam — not invented here); this file only picks WHICH of
// the three hexes reads on the panel, and lightens the too-dark ones with color-mix at render time.
// Pure presentation: relative luminance + a WCAG-ish contrast check; no engine edits.
import { TEAM_COLORS } from './seam.ts';
import { PANEL_HEX_DARK, PANEL_HEX_LIGHT, TEAM_FALLBACK } from './tokens.ts';

const lum = (hex: string): number => {
  const n = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a: string, b: string): number => {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export interface TeamInk { ink: string; pale: string }   // pale = the lightened form for very dark primaries

export function inkOf(teamName: string, dark = true): TeamInk {
  const cols = TEAM_COLORS[teamName] ?? [...TEAM_FALLBACK];
  const panel = dark ? PANEL_HEX_DARK : PANEL_HEX_LIGHT;
  const ordered = [...cols].sort((a, b) => contrast(b, panel) - contrast(a, panel));
  const best = ordered[0];
  if (contrast(best, panel) >= 3) return { ink: best, pale: best };
  // too dark even in its best slot colour: keep the hex for the border, render the text pale
  return { ink: best, pale: `color-mix(in srgb, ${best} 55%, ${dark ? '#f2e7d5' : '#53382b'})` };
}

export const inkMapFor = (names: readonly string[], dark = true): Record<string, TeamInk> =>
  Object.fromEntries(names.map((n) => [n, inkOf(n, dark)]));
