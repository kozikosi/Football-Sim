// port/takeover.ts — the Wave B #8 TEAM TAKEOVER, SCOPED (ernie D1/D2, porca N4).
//
// ONE function derives the takeover pair for a team — a near-white TINT of the team's own primary
// (never an invented colour: the tint is color-mix of the Owner's 32-team three-hex table, the
// same table ink.ts reads) + the shell's gold text pair (tokens.ts, both modes) — and one receipt
// function emits the 32-row before/after contrast table so the Owner sees the measured pair, not a
// promise. No logo bubble; no new palette; no auto-tint beyond the primary.
//
// Motion: the accent cross-fade is ~400ms in the component (a single CSS transition on the
// data-takeover attribute) and INSTANT under prefers-reduced-motion / body.cp-reduced (the L23
// law class: reduced motion drops movement, never information). The foil shimmer stays scoped to
// the just-picked player's OVR, the awards and 85+ OVRs — static gold under reduced motion —
// enforced by the existing zpbsheen scope (shell.css :180-190), asserted by law L27/L28 and the
// shell battery; nothing new glows here.
//
// LAW: waveB battery W8 — tintReceipt() is 32 rows, every tint is a real mix of the team's OWN
// hexes, and contrast never degrades (after >= before) — a planted invented colour dies there.
//
// item 9 (orcads R8 / HY4 W8 — the tint scope is DEFERRED, not decided): the delivered bytes had
// two defects — (a) tintOf mixed against a COPIED panel literal (#f2e7d5) while the receipt
// measured PANEL_HEX_LIGHT, i.e. the receipt measured a different panel than the tint draws on;
// (b) the gold literals were copied with mixed provenance (dark gold2 + DARK gold3's value in
// light). Both are fixed by IMPORTING the panel hex and the gold ink from tokens.ts — no copied
// colour literals. The tint algorithm is the merged order's named repair: START at the 12% mix
// and HALVE the ratio while the mix degrades the gold's contrast against the plain panel; fall
// back to the panel. This fixes the real Arizona regression (a dark cardinal primary over a pale
// panel pulls the gold's contrast DOWN past AA) in a way either deferred scope keeps, without
// picking the full-scope fix — the Owner rules the scope after reading both measured tables
// (scripts/tint-scope-measure.mjs → deliveries/receipts/tint-scope-measure.json).
import { TEAM_COLORS } from './seam.ts';
import { TEAM_FALLBACK, PANEL_HEX_DARK, PANEL_HEX_LIGHT, DARK, LIGHT } from './tokens.ts';

// the shell's gold TEXT ink per mode, imported from the tokens (no copied literals): dark panels
// paint gold2 (#e8c87e — the readable gold on plum); light panels paint gold3 (#9a6b1f — the deep
// gold; light gold2 #e6c67d is the KNOWN decorative AA hole, named in the contrast battery).
// Exported so the scope measurement (scripts/tint-scope-measure.mjs) provably reads the SAME gold.
export const GOLD_OF: Record<'dark' | 'light', string> = { dark: DARK.gold2, light: LIGHT.gold3 };

const hexToRgb = (h: string): [number, number, number] => {
  const n = h.replace('#', '');
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};
const rgbToHex = (c: [number, number, number]): string =>
  '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

const lum = (hex: string): number => {
  const c = hexToRgb(hex).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const contrastOf = (a: string, b: string): number => {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

// the near-white tint: mix the team's PRIMARY toward the panel ink at the measured ratio —
// derived from the team's own hex, never a new colour literal. The panel and the gold are the
// IMPORTED tokens (the receipt measures the same surface the tint draws on — the R8 defect is
// dead). The ratio starts at 12% and HALVES while the mix degrades the gold's contrast against
// the plain panel; at zero the tint IS the panel (the fallback — never a contrast downgrade).
export function tintOf(teamName: string, mode: 'dark' | 'light'): string {
  const cols = TEAM_COLORS[teamName] ?? [...TEAM_FALLBACK];
  const primary = cols[0];
  const panel = mode === 'dark' ? PANEL_HEX_DARK : PANEL_HEX_LIGHT;   // imported from tokens.ts — no copied literal
  const target = contrastOf(panel, GOLD_OF[mode]);
  const mixAt = (ratio: number): string => {
    const p = hexToRgb(primary), b = hexToRgb(panel);
    const mixed: [number, number, number] = [
      b[0] * (1 - ratio) + p[0] * ratio,
      b[1] * (1 - ratio) + p[1] * ratio,
      b[2] * (1 - ratio) + p[2] * ratio,
    ];
    return rgbToHex(mixed);
  };
  let ratio = 0.12;   // the named repair: 12% in, halve while the gold's contrast degrades
  let mixed = mixAt(ratio);
  let guard = 12;   // halving stops here: 12% / 2^12 is imperceptible — the fallback IS the panel
  while (guard-- > 0 && contrastOf(mixed, GOLD_OF[mode]) < target) {
    ratio = ratio / 2;
    mixed = mixAt(ratio);
  }
  if (contrastOf(mixed, GOLD_OF[mode]) < target) mixed = panel;   // the fallback: the plain panel
  return mixed;
}

export interface TakeoverPair { tint: string; gold: string }

export function takeoverPairOf(teamName: string, mode: 'dark' | 'light'): TakeoverPair {
  return { tint: tintOf(teamName, mode), gold: GOLD_OF[mode] };
}

export interface TintSide { tint: string; gold: string; contrastBefore: number; contrastAfter: number }
export interface TintRow { team: string; dark: TintSide; light: TintSide }

// ONE row per team (32 rows — the work order's shape), both modes measured inside each row.
export function tintReceipt(): { rows: TintRow[]; generated: string } {
  const rows: TintRow[] = [];
  for (const team of Object.keys(TEAM_COLORS)) {
    const sides = {} as Record<'dark' | 'light', TintSide>;
    for (const mode of ['dark', 'light'] as const) {
      const panel = mode === 'dark' ? PANEL_HEX_DARK : PANEL_HEX_LIGHT;
      const { tint, gold } = takeoverPairOf(team, mode);
      const before = contrastOf(panel, GOLD_OF[mode]);           // plain panel vs gold text
      const after = contrastOf(tint, gold);                      // tinted panel vs gold text
      sides[mode] = { tint, gold, contrastBefore: Number(before.toFixed(2)), contrastAfter: Number(after.toFixed(2)) };
    }
    rows.push({ team, dark: sides.dark, light: sides.light });
  }
  return { rows, generated: new Date().toISOString().replace(/\.\d+Z$/, 'Z') };
}
