// Per-franchise takeover packs. Faithful port of Z.ai's w52 zpbPackFor
// (COPY-PASTE-KIT-w52.md #2), computing the accessible light/dark tone pairs,
// halfway inks (w44/w45/w47), and the --t* CSS var map from the brand triple.
// Lifted with Z.ai's blessing (2026-11-01); credit in CHANGELOG. Framework-free.
import { TEAM_COLORS, BLUE_LIFT } from './team-colors-data.ts';
import { hsl, fromHsl, mix, readable, contrast, shade, tint, rgba, soft } from './color-math.ts';

export interface TeamPack {
  raw: readonly [string, string, string];
  vars: Record<string, string>;
}

const packs = new Map<string, TeamPack>();
// ANSWERED (Z.ai, 2026-11-01, "zpbPackFor contrast backgrounds"): YES, the pack should
// follow the page — the shipped page renders #fdf2f6/#1e1119 (w49/w50 rose paper) while
// this function measures the retired cream #fcf7f1/#181114, and 8 of 9 readability floors
// fail worst-case against the real page. BUT the fix rides the Owner's round (it moves
// every team's computed inks; two-hex edit + 32x2 re-sweep + re-pin), so the port stays
// faithful to the shipped bytes until then. "A port must mirror the shipped artifact
// bit-for-bit or its verify battery lies." Reproduce: node tools/w52_packbg_probe.js
const BG_L = '#fcf7f1';
const BG_D = '#181114';

export function packFor(name: string): TeamPack | null {
  const hit = packs.get(name);
  if (hit) return hit;
  const raw = TEAM_COLORS[name];
  if (!raw) return null;
  const [P, Q, R] = raw;

  // Brand primary leads the identity; non-chromatic primaries fall back.
  let eng = raw[0];
  if (hsl(eng).s < 0.15) eng = [...raw].sort((a, b) => hsl(b).s - hsl(a).s)[0];
  if (hsl(eng).s < 0.15) eng = mix(eng, '#c9a24b', 0.45);
  // w27: Bills/Rams blues lifted into royal territory (chips stay true).
  if (BLUE_LIFT[name]) {
    const hc = hsl(eng);
    if (hc.h >= 195 && hc.h <= 255 && hc.l < 0.45) eng = fromHsl(hc.h, Math.min(1, hc.s * 0.94), 0.47);
  }
  // w19: near-black navy + silver badge => blend the silver in.
  {
    const metals = raw.filter((h) => { const c = hsl(h); return c.s < 0.14 && c.l > 0.45; });
    if (hsl(eng).l < 0.26 && metals.length) {
      const metal = metals.find((h) => { const c = hsl(h); return c.l >= 0.55 && c.l <= 0.92; }) ?? metals[metals.length - 1];
      eng = mix(eng, metal, 0.45);
    }
  }

  const accL = readable(eng, BG_L, false, 4.6), accD = readable(eng, BG_D, true, 4.6);
  const rest = raw.filter((h) => h !== eng);
  const flo = (h: string): string => {
    const c = hsl(h);
    if (c.l < 0.18 || c.s < 0.15) {
      const e = hsl(eng);
      return fromHsl(e.h, Math.max(0.12, Math.min(e.s, 0.34)), c.l < 0.18 ? 0.22 : Math.min(Math.max(c.l, 0.3), 0.72));
    }
    return fromHsl(c.h, Math.max(c.s, 0.42), Math.min(Math.max(c.l, 0.3), 0.55));
  };
  // v7: bright secondary yellows toned to the deep shimmering gold (no 'snot yellow').
  const goldTone = (h: string): string => {
    const c = hsl(h);
    return (c.h >= 30 && c.h <= 70 && c.l > 0.42)
      ? mix(fromHsl(c.h, Math.min(1, Math.max(c.s, 0.55)), 0.5), '#c9a24b', 0.45)
      : h;
  };
  const q = goldTone(flo(rest[0] ?? eng)), r = goldTone(flo(rest[1] ?? eng));
  const acc2L = readable(q, BG_L, false, 4.2), acc3L = readable(r, BG_L, false, 4.2);
  const acc2D = readable(q, BG_D, true, 4.2), acc3D = readable(r, BG_D, true, 4.2);
  const txL = readable(eng, BG_L, false, 7.0);

  // w44/w45: the light halfway ink — half from the page ink to the team's crayola
  // anchor, never below 5:1 on the light page.
  const txc = hsl(txL);
  const txM = (() => {
    try {
      const base = txc.l < 0.52 ? fromHsl(txc.h, txc.s, 0.52) : txL;
      const m = hsl(mix('#53382b', base, 0.5));
      let ink = fromHsl(m.h, Math.min(0.85, Math.max(0.22, m.s)), Math.min(0.52, Math.max(0.3, m.l)));
      let g = 0;
      while (g < 9 && contrast(ink, '#fcf7f1') < 5) {
        const c2 = hsl(ink);
        ink = fromHsl(c2.h, c2.s, Math.max(0.24, c2.l - 0.02));
        g++;
      }
      return ink;
    } catch { return txc.l < 0.52 ? fromHsl(txc.h, txc.s, 0.52) : txL; }
  })();
  // w47: the dark halfway ink — mirror of the light law.
  const txMd = (() => {
    try {
      const base = txc.l < 0.52 ? fromHsl(txc.h, txc.s, 0.52) : txL;
      const m = hsl(mix('#f5e9dd', base, 0.5));
      let ink = fromHsl(m.h, Math.min(0.9, Math.max(0.25, m.s)), Math.min(0.86, Math.max(0.6, m.l)));
      let g = 0;
      while (g < 9 && contrast(ink, '#181114') < 4.5) {
        const c2 = hsl(ink);
        ink = fromHsl(c2.h, c2.s, Math.min(0.94, c2.l + 0.02));
        g++;
      }
      return ink;
    } catch { return accD; }
  })();

  const txd = mix('#f5e9dd', accD, 0.14), sud = mix('#c8a48f', accD, 0.2);
  const hairL = mix(accL, BG_L, 0.42), hairD = mix(accD, BG_D, 0.4);
  const g1 = shade(accL, 0.12), g2 = acc2L, g3 = tint(accL, 0.34), g4 = acc3L, g5 = accL, g6 = tint(acc2L, 0.3);
  const g1d = accD, g2d = tint(accD, 0.22), g3d = mix(accD, '#ffffff', 0.68), g4d = acc2D, g5d = tint(accD, 0.1), g6d = mix(acc2D, '#ffffff', 0.5);
  const b1 = shade(accL, 0.1), b2 = mix(acc2L, '#ffffff', 0.25), b3 = mix('#ffffff', acc2L, 0.2), b4 = acc3L, b5 = accL, b6 = mix(acc2L, '#ffffff', 0.3);
  const b1d = shade(accD, 0.12), b2d = tint(acc2D, 0.15), b3d = mix('#ffffff', acc2D, 0.3), b4d = acc3D, b5d = accD, b6d = tint(acc2D, 0.3);
  const o1 = mix('#ffffff', acc2L, 0.55), o2 = tint(accL, 0.28), o3 = accL, o4 = shade(accL, 0.2);
  const o1d = mix('#ffffff', acc2D, 0.5), o2d = tint(accD, 0.25), o3d = accD, o4d = shade(accD, 0.2);
  const d1 = acc3L, d2 = tint(acc2L, 0.35), d1d = acc3D, d2d = tint(acc2D, 0.3);
  const onPick = (a: string, b: string, c: string): string => {
    const m = mix(mix(a, b, 0.5), c, 0.25);
    return contrast('#2c1e0c', m) >= contrast('#fffaf2', m) ? '#2c1e0c' : '#fffaf2';
  };

  const vars: Record<string, string> = {
    '--tA': accL, '--tA2': acc2L, '--tA3': acc3L, '--tTx': txL, '--tSu': soft(eng, BG_L), '--tHr': hairL,
    '--tGb': rgba(accL, 0.18), '--tGl': rgba(accL, 0.30), '--tGa': rgba(accL, 0.30), '--tGw': rgba(acc2L, 0.16),
    '--tBg': mix(BG_L, accL, 0.045), '--tOn': onPick(accL, acc2L, acc3L),
    '--tBSs': rgba(accL, 0.38), '--tBSs2': rgba(accL, 0.5), '--tBSsb': rgba(accL, 0.42),
    '--tOGs': rgba(acc2L, 0.5), '--tOGhs': rgba(acc2L, 0.68),
    '--tTxM': txM || txL, '--tTxMd': txMd || txd,
    '--tTA': rgba(accL, 0.20), '--tTB': rgba(acc3L, 0.12), '--tTC': rgba(accL, 0.08),
    '--tTD': rgba(acc3L, 0.30), '--tTE': rgba(acc3L, 0.16),
    '--tG1': g1, '--tG2': g2, '--tG3': g3, '--tG4': g4, '--tG5': g5, '--tG6': g6,
    '--tB1': b1, '--tB2': b2, '--tB3': b3, '--tB4': b4, '--tB5': b5, '--tB6': b6,
    '--tO1': o1, '--tO2': o2, '--tO3': o3, '--tO4': o4, '--tD1': d1, '--tD2': d2,
    '--tAd': accD, '--tA2d': acc2D, '--tA3d': acc3D, '--tTxd': txd, '--tSud': sud, '--tHrd': hairD,
    '--tGbd': rgba(accD, 0.16), '--tGld': rgba(accD, 0.30), '--tGad': rgba(accD, 0.10), '--tGwd': rgba(acc2D, 0.08),
    '--tBgd': mix(BG_D, accD, 0.09), '--tOnd': onPick(accD, acc2D, acc3D),
    '--tBSsd': rgba(accD, 0.34), '--tBSs2d': rgba(accD, 0.5), '--tBSsbd': rgba(accD, 0.4),
    '--tOGsd': rgba(acc2D, 0.45), '--tOGhsd': rgba(acc2D, 0.62),
    '--tTAd': rgba(accD, 0.16), '--tTBd': rgba(acc3D, 0.10), '--tTCd': rgba(accD, 0.08),
    '--tTDd': rgba(acc3D, 0.30), '--tTEd': rgba(acc3D, 0.16),
    '--tG1d': g1d, '--tG2d': g2d, '--tG3d': g3d, '--tG4d': g4d, '--tG5d': g5d, '--tG6d': g6d,
    '--tB1d': b1d, '--tB2d': b2d, '--tB3d': b3d, '--tB4d': b4d, '--tB5d': b5d, '--tB6d': b6d,
    '--tO1d': o1d, '--tO2d': o2d, '--tO3d': o3d, '--tO4d': o4d, '--tD1d': d1d, '--tD2d': d2d,
  };

  const pack: TeamPack = { raw, vars };
  packs.set(name, pack);
  return pack;
}

// Entry points (COPY-PASTE-KIT-w52.md #3, minus the crest dict which is #7).
export function applyTeamTheme(name: string): boolean {
  const pack = packFor(name);
  if (!pack) return false;
  const root = document.documentElement;
  for (const [k, v] of Object.entries(pack.vars)) root.style.setProperty(k, v);
  root.dataset.zpbteam = name;
  return true;
}

export function clearTeamTheme(): void {
  const pack = [...packs.values()][0];
  const root = document.documentElement;
  if (pack) for (const k of Object.keys(pack.vars)) root.style.removeProperty(k);
  delete root.dataset.zpbteam;
}
