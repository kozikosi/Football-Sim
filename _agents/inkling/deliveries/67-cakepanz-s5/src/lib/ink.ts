// Slice 4 — the readable team ink for the feed lines (the w88 look: each line's team rides ITS OWN ink).
// The colours are the Owner's 22 Oct 32-team table from the SNAPSHOT (view/teamColors.ts — not invented here);
// this file only picks WHICH of the three hexes reads on the dark panel, and lightens the too-dark ones with
// color-mix at render time (the shell's packs do the same job with pre-baked txM/txMd tones).
// Pure presentation: relative luminance + a WCAG-ish contrast check on the panel colour; no engine edits.
import { TEAM_COLORS } from '../engine/sports/nfl/view/teamColors.ts';

const PANEL_HEX = '#181114';         // the tree's page ink (App.svelte background)

const lum = (hex: string): number => {
  const n = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a: string, b: string): number => {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const onPanel = (hex: string): number => contrast(hex, PANEL_HEX);

export interface TeamInk { ink: string; pale: string }   // pale = the lightened form for very dark primaries

// The ink a team's line rides: the first of [primary, secondary, third] with contrast >= 3 on the panel;
// primaries that still read dark get the `pale` mix (color-mix with cream in CSS) and the UI renders that.
export function inkOf(teamName: string): TeamInk {
  const cols = TEAM_COLORS[teamName] ?? ['#e8c87e', '#f5e9dd', '#c8a48f'];
  const ordered = [...cols].sort((a, b) => onPanel(b) - onPanel(a));
  const best = ordered[0];
  if (onPanel(best) >= 3) return { ink: best, pale: best };
  // too dark even in its best slot colour: keep the hex for the border, render the text pale
  return { ink: best, pale: `color-mix(in srgb, ${best} 55%, #f5e9dd)` };
}

export const inkMapFor = (names: readonly string[]): Record<string, TeamInk> =>
  Object.fromEntries(names.map((n) => [n, inkOf(n)]));
