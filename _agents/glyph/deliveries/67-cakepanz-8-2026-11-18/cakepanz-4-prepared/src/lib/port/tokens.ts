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
// Pure part (node-testable). The DOM half lives in src/lib/bindings/tokensApply.ts (the P-368 split:
// `document` is out of src/lib/port — the binding layer owns every DOM touch, the port stays pure).
// The applier sets [data-zpbteam] + the per-team custom properties; the user's team carries the
// .ub class (Owner law); the attribute carries the palette. --zcream is NEVER tinted by a team.
export interface TeamRemap { attr: string; vars: Record<string, string> }

// ---------- the accessible-tone solver (cakepanz-6 Part A) ----------
// The live product's own recipe, ported verbatim from w89.html:3005-3032 ("JS computes accessible
// tones") and re-targeted at THIS sheet's two backgrounds (the Owner's palette law: light #fdf2f6,
// dark #1e1119). Hue+saturation are kept; only lightness walks until the tone reads. This is a tone
// SOLVER for the accents, not a new palette: --bg/--panel/--text/--zcream are never emitted here.
function zpbRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function zpbHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}
function zpbMix(a: string, b: string, t: number): string {
  const A = zpbRgb(a), B = zpbRgb(b);
  return zpbHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
}
function zpbHsl(hex: string): { h: number; s: number; l: number } {
  const [r0, g0, b0] = zpbRgb(hex).map((v) => v / 255);
  const mx = Math.max(r0, g0, b0), mn = Math.min(r0, g0, b0);
  let h = 0, s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r0 ? (g0 - b0) / d + (g0 < b0 ? 6 : 0) : mx === g0 ? (b0 - r0) / d + 2 : (r0 - g0) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}
function zpbFromHsl(H: number, S: number, L: number): string {
  const c = (1 - Math.abs(2 * L - 1)) * S, X = c * (1 - Math.abs(((H / 60) % 2) - 1)), m = L - c / 2;
  let r = 0, g = 0, b = 0;
  if (H < 60) { r = c; g = X; } else if (H < 120) { r = X; g = c; } else if (H < 180) { g = c; b = X; }
  else if (H < 240) { g = X; b = c; } else if (H < 300) { r = X; b = c; } else { r = c; b = X; }
  return zpbHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}
function zpbLum(hex: string): number {
  return zpbRgb(hex)
    .map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
    .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
}
export function zpbContrast(a: string, b: string): number {
  const l1 = zpbLum(a), l2 = zpbLum(b);
  const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}
// tone a brand color until it reads on the given background (keeps hue+saturation: darker/paler, never grey)
function zpbReadable(hex: string, bg: string, darkMode: boolean, target: number): string {
  const c = zpbHsl(hex);
  const s = Math.max(c.s, 0.42);
  let l = c.l;
  for (let i = 0; i < 90; i++) {
    const out = zpbFromHsl(c.h, s, l);
    if (zpbContrast(out, bg) >= target) break;
    if (!darkMode) { if (l <= 0.15) break; l -= 0.015; } else { if (l >= 0.9) break; l += 0.015; }
  }
  return zpbFromHsl(c.h, s, l);
}

// The sheet's own two modes (NOT w89's #fcf7f1/#181114 — the Owner's palette law pins these).
const ACCENT_BG_LIGHT = LIGHT.bg;
const ACCENT_BG_DARK = DARK.bg;
// w27 (Owner, live w89): the Bills and Rams blues sit too dark on the page — lift into royal territory.
const BLUE_LIFT: Record<string, number> = { 'Buffalo Bills': 1, 'Los Angeles Rams': 1 };

export interface TeamAccents { light: readonly [string, string, string]; dark: readonly [string, string, string] }
// One accent pack per franchise: the true chips stay the 3 raw hexes; the UI tones are solved for
// readability (the w89 zpbPackFor accent path: chroma fallback → blue lift → metal blend → flo →
// goldTone → zpbReadable at the live product's own 4.6/4.2 targets).
export function teamAccents(teamName: string): TeamAccents {
  const raw = ZPB_TEAM_COLORS[teamName];
  if (!raw) {
    const fb: readonly [string, string, string] = [LIGHT.gold2, LIGHT.zcream, LIGHT.goldm];
    return { light: fb, dark: fb };
  }
  let eng: string = raw[0];                                        // brand primary leads the identity
  if (zpbHsl(eng).s < 0.15) eng = [...raw].sort((a, b) => zpbHsl(b).s - zpbHsl(a).s)[0];  // non-chromatic primary (e.g. LV): most chromatic brand color
  if (zpbHsl(eng).s < 0.15) eng = zpbMix(eng, '#c9a24b', 0.45);    // still no chroma (LV): warm it, chips stay true
  if (BLUE_LIFT[teamName]) {                                       // w27 (Owner): the dark blues lift, chips stay true
    const hc = zpbHsl(eng);
    if (hc.h >= 195 && hc.h <= 255 && hc.l < 0.45) eng = zpbFromHsl(hc.h, Math.min(1, hc.s * 0.94), 0.47);
  }
  { // w19 (Owner): a near-black navy reads too dark — when the badge carries a silver, blend it in
    const metals = raw.filter((h) => { const c = zpbHsl(h); return c.s < 0.14 && c.l > 0.45; });
    if (zpbHsl(eng).l < 0.26 && metals.length) {
      const metal = metals.find((h) => { const c = zpbHsl(h); return c.l >= 0.55 && c.l <= 0.92; }) || metals[metals.length - 1];
      eng = zpbMix(eng, metal, 0.45);
    }
  }
  const rest = raw.filter((h) => h !== eng);
  const flo = (h: string): string => {
    const c = zpbHsl(h);
    if (c.l < 0.18 || c.s < 0.15) {
      const e = zpbHsl(eng);
      return zpbFromHsl(e.h, Math.max(0.12, Math.min(e.s, 0.34)), c.l < 0.18 ? 0.22 : Math.min(Math.max(c.l, 0.3), 0.72));
    }
    return zpbFromHsl(c.h, Math.max(c.s, 0.42), Math.min(Math.max(c.l, 0.3), 0.55));
  };
  // v7 (live w89): bright secondary yellows are toned to the site's deep shimmering gold in light mode
  const goldTone = (h: string): string => {
    const c = zpbHsl(h);
    return (c.h >= 30 && c.h <= 70 && c.l > 0.42) ? zpbMix(zpbFromHsl(c.h, Math.min(1, Math.max(c.s, 0.55)), 0.5), '#c9a24b', 0.45) : h;
  };
  const q = goldTone(flo(rest[0] !== undefined ? rest[0] : eng));
  const r = goldTone(flo(rest[1] !== undefined ? rest[1] : eng));
  const light: readonly [string, string, string] = [
    zpbReadable(eng, ACCENT_BG_LIGHT, false, 4.6),
    zpbReadable(q, ACCENT_BG_LIGHT, false, 4.2),
    zpbReadable(r, ACCENT_BG_LIGHT, false, 4.2),
  ];
  const dark: readonly [string, string, string] = [
    zpbReadable(eng, ACCENT_BG_DARK, true, 4.6),
    zpbReadable(q, ACCENT_BG_DARK, true, 4.2),
    zpbReadable(r, ACCENT_BG_DARK, true, 4.2),
  ];
  return { light, dark };
}

export function teamRemap(teamName: string): TeamRemap {
  const [c1, c2, c3] = teamStops(teamName);
  const tones = teamAccents(teamName);
  // the raw stops stay true (the chips); the L/D stops are the mode-resolved accents the three
  // [data-zpbteam] remap blocks consume — both modes ride the SAME inline set, so a mode flip
  // needs no re-derivation (the cascade picks the block, exactly like the live product).
  return {
    attr: teamName,
    vars: {
      '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3,
      '--zpb-t1L': tones.light[0], '--zpb-t2L': tones.light[1], '--zpb-t3L': tones.light[2],
      '--zpb-t1D': tones.dark[0], '--zpb-t2D': tones.dark[1], '--zpb-t3D': tones.dark[2],
    },
  };
}
