// bindings/tokensApply.ts — the DOM half of the token remap (the P-368 split, made this sitting):
// `document` must not appear in src/lib outside bindings/ — the port keeps the pure token logic
// (LIGHT/DARK, teamStops, teamRemap), the binding owns every DOM touch. Behaviour is byte-for-byte
// the previous port implementation (the no-op guard rides along for node-side renders).
import type { Mode } from '../port/tokens.ts';
import { teamRemap } from '../port/tokens.ts';
import { takeoverPairOf } from '../port/takeover.ts';

export function applyTeam(teamName: string | null, mode: Mode): void {
  if (typeof document === 'undefined') return;                       // node-side renders: no DOM, no crash
  const root = document.documentElement;
  if (!teamName) { delete root.dataset.zpbteam; return; }
  const remap = teamRemap(teamName);
  root.dataset.zpbteam = remap.attr;
  for (const [k, v] of Object.entries(remap.vars)) root.style.setProperty(k, v);
  // Wave B #8 (ernie D1/D2, porca N4): the takeover pair — the near-white TINT of the team's own
  // primary + the shell's gold pair — derived from the Owner's 32-team table (takeover.ts), never
  // invented. The receipt (takeover.tintReceipt(), 32 rows, contrast never degrading) is the law's
  // evidence; the cross-fade is CSS-only below (shell.css) — reduced-motion renders it instantly.
  // the user's team carries the .ub class (Owner law); the attribute carries the palette
  const pair = takeoverPairOf(teamName, mode === 'system' ? 'dark' : mode);
  root.style.setProperty('--cp-takeover-tint', pair.tint);
  root.style.setProperty('--cp-takeover-gold', pair.gold);
  root.dataset.theme = mode === 'system' ? '' : mode;
  if (mode === 'system') delete root.dataset.theme;
}
export function applyMode(mode: Mode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'system') delete root.dataset.theme;
  else root.dataset.theme = mode;
}
