// Team-colour theme packs: team name in, a flat map of CSS custom properties out. Pure TypeScript, no DOM, no framework.
// Faithful port of zpbPackFor and its helpers from Football-Sim-Z-post-blue-w54.html (md5 512d1885ac0a69120bedcaf8e9041f2b),
// so the 32 packs match the shipped shell token for token (test/theme.test.ts compares against test/golden/teamPacks.w54.json).
// The 32 hexes are the Owner's table (teamColors.ts) and never change here; only the UI tones are derived for contrast.
// Opponent colours (Owner, 22 Oct round 3): opponentVars() re-keys the same pack under a different prefix so a matchup
// screen can wear both teams at once.
import { TEAM_COLORS } from './teamColors.ts';

type Rgb = [number, number, number];
interface Hsl { h: number; s: number; l: number }

export const BG_LIGHT = '#fcf7f1';
export const BG_DARK = '#181114';
// w27 (Owner): the Bills and Rams blues sit too dark on the page, so those two brands are lifted into royal territory.
const BLUE_LIFT: Readonly<Record<string, true>> = { 'Buffalo Bills': true, 'Los Angeles Rams': true };

const rgb = (hex: string): Rgb => {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const toHex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
export const mix = (a: string, b: string, t: number): string => {
  const A = rgb(a), B = rgb(b);
  return toHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
};
const hsl = (hex: string): Hsl => {
  const [r, g, b] = rgb(hex).map((v) => v / 255) as Rgb;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
};
const fromHsl = (H: number, S: number, L: number): string => {
  const c = (1 - Math.abs(2 * L - 1)) * S, X = c * (1 - Math.abs(((H / 60) % 2) - 1)), m = L - c / 2;
  let r: number, g: number, b: number;
  if (H < 60) { r = c; g = X; b = 0; } else if (H < 120) { r = X; g = c; b = 0; } else if (H < 180) { r = 0; g = c; b = X; }
  else if (H < 240) { r = 0; g = X; b = c; } else if (H < 300) { r = X; g = 0; b = c; } else { r = c; g = 0; b = X; }
  return toHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
};
const lum = (hex: string): number =>
  rgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
    .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
/** WCAG contrast ratio between two colours (1 to 21). */
export const contrast = (a: string, b: string): number => {
  const l1 = lum(a), l2 = lum(b), hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
};
const rgba = (hex: string, a: number): string => { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; };

// tone a brand colour until it reads on the background (keeps hue and saturation: darker or paler, never grey)
function readable(hex: string, bg: string, darkMode: boolean, target: number): string {
  const c = hsl(hex), s = Math.max(c.s, 0.42);
  let l = c.l;
  for (let i = 0; i < 90; i++) {
    const out = fromHsl(c.h, s, l);
    if (contrast(out, bg) >= target) break;
    if (!darkMode) { if (l <= 0.15) break; l -= 0.015; } else { if (l >= 0.9) break; l += 0.015; }
  }
  return fromHsl(c.h, s, l);
}
const shade = (hex: string, t: number): string => { const c = hsl(hex); return fromHsl(c.h, Math.min(1, Math.max(c.s, 0.42)), Math.max(0.16, c.l - t)); };
const tint = (hex: string, t: number): string => { const c = hsl(hex); return fromHsl(c.h, Math.min(1, Math.max(c.s, 0.3)), Math.min(0.88, c.l + t)); };
function soft(hex: string, bg: string): string {
  const c = hsl(hex);
  let l = Math.max(c.l, 0.3);
  const s = Math.max(c.s, 0.4);
  let out = fromHsl(c.h, s, l);
  for (let i = 0; i < 60 && contrast(out, bg) > 4.9; i++) { l += 0.02; out = fromHsl(c.h, s, l); }
  return out;
}

export type ThemeVars = Readonly<Record<string, string>>;
export interface TeamPack {
  /** the true three brand hexes: chips and stripes always use these */
  raw: readonly [string, string, string];
  /** every --t* custom property, light and dark ('d' suffix), 82 keys */
  vars: ThemeVars;
  /** the identity colour the whole pack is built around */
  identity: string;
}

const cache = new Map<string, TeamPack>();

/** The theme pack for a franchise, or null for an unknown name. Memoised. */
export function teamPack(name: string): TeamPack | null {
  const hit = cache.get(name);
  if (hit) return hit;
  const raw = TEAM_COLORS[name];
  if (!raw) return null;
  let eng = raw[0]; // brand primary leads the identity
  if (hsl(eng).s < 0.15) eng = raw.slice().sort((a, b) => hsl(b).s - hsl(a).s)[0]; // non-chromatic primary: the most chromatic brand colour
  if (hsl(eng).s < 0.15) eng = mix(eng, '#c9a24b', 0.45); // still no chroma (Raiders): warm it, chips stay true
  if (BLUE_LIFT[name]) {
    const hc = hsl(eng);
    if (hc.h >= 195 && hc.h <= 255 && hc.l < 0.45) eng = fromHsl(hc.h, Math.min(1, hc.s * 0.94), 0.47);
  }
  { // w19 (Owner): a near-black navy reads too dark; blend a silver in so the text brightens without losing the team
    const metals = raw.filter((h) => { const c = hsl(h); return c.s < 0.14 && c.l > 0.45; });
    if (hsl(eng).l < 0.26 && metals.length) {
      const metal = metals.find((h) => { const c = hsl(h); return c.l >= 0.55 && c.l <= 0.92; }) || metals[metals.length - 1];
      eng = mix(eng, metal, 0.45);
    }
  }
  const bgL = BG_LIGHT, bgD = BG_DARK;
  const accL = readable(eng, bgL, false, 4.6), accD = readable(eng, bgD, true, 4.6);
  const rest = raw.filter((h) => h !== eng);
  const flo = (h: string): string => {
    const c = hsl(h);
    if (c.l < 0.18 || c.s < 0.15) {
      const e = hsl(eng);
      return fromHsl(e.h, Math.max(0.12, Math.min(e.s, 0.34)), c.l < 0.18 ? 0.22 : Math.min(Math.max(c.l, 0.3), 0.72));
    }
    return fromHsl(c.h, Math.max(c.s, 0.42), Math.min(Math.max(c.l, 0.3), 0.55));
  };
  // v7: bright secondary yellows are toned to the site's deep shimmering gold in light mode (no 'snot yellow')
  const goldTone = (h: string): string => {
    const c = hsl(h);
    return c.h >= 30 && c.h <= 70 && c.l > 0.42 ? mix(fromHsl(c.h, Math.min(1, Math.max(c.s, 0.55)), 0.5), '#c9a24b', 0.45) : h;
  };
  const q = goldTone(flo(rest[0] !== undefined ? rest[0] : eng)), r = goldTone(flo(rest[1] !== undefined ? rest[1] : eng));
  const acc2L = readable(q, bgL, false, 4.2), acc3L = readable(r, bgL, false, 4.2);
  const acc2D = readable(q, bgD, true, 4.2), acc3D = readable(r, bgD, true, 4.2);
  const txL = readable(eng, bgL, false, 7.0);
  const txc = hsl(txL);
  const crayola = txc.l < 0.52 ? fromHsl(txc.h, txc.s, 0.52) : txL;
  // w44/w45 (Owner): the halfway ink, never below 5:1 on the light page
  const txM = (() => {
    const m = mix('#53382b', crayola, 0.5), c = hsl(m);
    let ink = fromHsl(c.h, Math.min(0.85, Math.max(0.22, c.s)), Math.min(0.52, Math.max(0.30, c.l)));
    for (let g = 0; g < 9 && contrast(ink, bgL) < 5; g++) { const c2 = hsl(ink); ink = fromHsl(c2.h, c2.s, Math.max(0.24, c2.l - 0.02)); }
    return ink;
  })();
  // w47 (Owner): the dark halfway ink, clamped to read on the dark page
  const txMd = (() => {
    const m = mix('#f5e9dd', crayola, 0.5), c = hsl(m);
    let ink = fromHsl(c.h, Math.min(0.9, Math.max(0.25, c.s)), Math.min(0.86, Math.max(0.60, c.l)));
    for (let g = 0; g < 9 && contrast(ink, bgD) < 4.5; g++) { const c2 = hsl(ink); ink = fromHsl(c2.h, c2.s, Math.min(0.94, c2.l + 0.02)); }
    return ink;
  })();
  const txd = mix('#f5e9dd', accD, 0.14), sud = mix('#c8a48f', accD, 0.2);
  const hairL = mix(accL, bgL, 0.42), hairD = mix(accD, bgD, 0.4);
  const pickInk = (m: string): string => (contrast('#2c1e0c', m) >= contrast('#fffaf2', m) ? '#2c1e0c' : '#fffaf2');
  const on = pickInk(mix(mix(accL, acc2L, 0.5), acc3L, 0.25)), onD = pickInk(mix(mix(accD, acc2D, 0.5), acc3D, 0.25));
  const g1 = shade(accL, 0.12), g2 = acc2L, g3 = tint(accL, 0.34), g4 = acc3L, g5 = accL, g6 = tint(acc2L, 0.3);
  const g1d = accD, g2d = tint(accD, 0.22), g3d = mix(accD, '#ffffff', 0.68), g4d = acc2D, g5d = tint(accD, 0.1), g6d = mix(acc2D, '#ffffff', 0.5);
  const b1 = shade(accL, 0.1), b2 = mix(acc2L, '#ffffff', 0.25), b3 = mix('#ffffff', acc2L, 0.2), b4 = acc3L, b5 = accL, b6 = mix(acc2L, '#ffffff', 0.3);
  const b1d = shade(accD, 0.12), b2d = tint(acc2D, 0.15), b3d = mix('#ffffff', acc2D, 0.3), b4d = acc3D, b5d = accD, b6d = tint(acc2D, 0.3);
  const o1 = mix('#ffffff', acc2L, 0.55), o2 = tint(accL, 0.28), o3 = accL, o4 = shade(accL, 0.2);
  const o1d = mix('#ffffff', acc2D, 0.5), o2d = tint(accD, 0.25), o3d = accD, o4d = shade(accD, 0.2);
  const d1 = acc3L, d2 = tint(acc2L, 0.35), d1d = acc3D, d2d = tint(acc2D, 0.3);
  const vars: Record<string, string> = {
    '--tA': accL, '--tA2': acc2L, '--tA3': acc3L, '--tTx': txL, '--tSu': soft(eng, bgL), '--tHr': hairL,
    '--tGb': rgba(accL, 0.18), '--tGl': rgba(accL, 0.30), '--tGa': rgba(accL, 0.30), '--tGw': rgba(acc2L, 0.16),
    '--tBg': mix(bgL, accL, 0.045), '--tOn': on,
    '--tBSs': rgba(accL, 0.38), '--tBSs2': rgba(accL, 0.5), '--tBSsb': rgba(accL, 0.42),
    '--tOGs': rgba(acc2L, 0.5), '--tOGhs': rgba(acc2L, 0.68),
    '--tTxM': txM, '--tTxMd': txMd,
    '--tTA': rgba(accL, 0.20), '--tTB': rgba(acc3L, 0.12), '--tTC': rgba(accL, 0.08),
    '--tTD': rgba(acc3L, 0.30), '--tTE': rgba(acc3L, 0.16),
    '--tG1': g1, '--tG2': g2, '--tG3': g3, '--tG4': g4, '--tG5': g5, '--tG6': g6,
    '--tB1': b1, '--tB2': b2, '--tB3': b3, '--tB4': b4, '--tB5': b5, '--tB6': b6,
    '--tO1': o1, '--tO2': o2, '--tO3': o3, '--tO4': o4, '--tD1': d1, '--tD2': d2,
    '--tAd': accD, '--tA2d': acc2D, '--tA3d': acc3D, '--tTxd': txd, '--tSud': sud, '--tHrd': hairD,
    '--tGbd': rgba(accD, 0.16), '--tGld': rgba(accD, 0.30), '--tGad': rgba(accD, 0.10), '--tGwd': rgba(acc2D, 0.08),
    '--tBgd': mix(bgD, accD, 0.09), '--tOnd': onD,
    '--tBSsd': rgba(accD, 0.34), '--tBSs2d': rgba(accD, 0.5), '--tBSsbd': rgba(accD, 0.4),
    '--tOGsd': rgba(acc2D, 0.45), '--tOGhsd': rgba(acc2D, 0.62),
    '--tTAd': rgba(accD, 0.16), '--tTBd': rgba(acc3D, 0.10), '--tTCd': rgba(accD, 0.08),
    '--tTDd': rgba(acc3D, 0.30), '--tTEd': rgba(acc3D, 0.16),
    '--tG1d': g1d, '--tG2d': g2d, '--tG3d': g3d, '--tG4d': g4d, '--tG5d': g5d, '--tG6d': g6d,
    '--tB1d': b1d, '--tB2d': b2d, '--tB3d': b3d, '--tB4d': b4d, '--tB5d': b5d, '--tB6d': b6d,
    '--tO1d': o1d, '--tO2d': o2d, '--tO3d': o3d, '--tO4d': o4d, '--tD1d': d1d, '--tD2d': d2d,
  };
  const pack: TeamPack = { raw: raw as TeamPack['raw'], vars, identity: eng };
  cache.set(name, pack);
  return pack;
}

/**
 * The same pack under an opponent prefix: '--tA' becomes '--oA', so one screen can wear the user's team (--t*) and the team
 * they face (--o*) at once. The opponent's tokens never replace the user's. Unknown team: an empty map.
 */
export function opponentVars(name: string): ThemeVars {
  const p = teamPack(name);
  if (!p) return {};
  return Object.fromEntries(Object.entries(p.vars).map(([k, v]) => ['--o' + k.slice(3), v]));
}
