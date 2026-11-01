// Row / neutral-row / anchor CSS var maps. Faithful port of Z.ai's w52
// zpbRowVars (l.2959), zpbNeutralRowVars (l.2970), zpbAnchorVars (l.2983)
// (COPY-PASTE-KIT-w52.md #3) plus the zpbLift helper (w13).
// Lifted with Z.ai's blessing (2026-11-01); credit in CHANGELOG. Framework-free.
import { packFor } from './team-pack.ts';
import { hsl, fromHsl, rgba } from './color-math.ts';

/** w13: lift a hex's HSL lightness to at least minL (pure; the original reads window.zpbLift). */
export function lift(hex: string, minL: number): string {
  try {
    const c = hsl(hex);
    if (!c || c.l >= minL) return hex;
    return fromHsl(c.h, c.s, minL);
  } catch { return hex; }
}

/** Port of zpbRowVars: per-row team tint washes + the ONE-INK number/name inks. */
export function rowVars(name: string): Record<string, string> {
  const pk = packFor(name);
  if (!pk) return {};
  const v = pk.vars;
  const accL = v['--tA'], accD = v['--tAd'];
  const txM = v['--tTxM'], txd = v['--tTxd'];
  const raw2 = pk.raw[2];
  // w32: light mode lifts the tint so the team ink always reads
  // w45 (O1): the row's number ink rides the halfway tone txM
  // w43 (N3/N5/N13): LIGHT reads txM; DARK keeps txd
  return {
    '--zr1': rgba(lift(accL, 0.76), 0.07),
    '--zr2': rgba(lift(accL, 0.58), 0.03),
    '--zr3': rgba(lift(raw2, 0.58), 0.10),
    '--zrb': accL,
    '--zr1d': rgba(accD, 0.15),
    '--zr2d': rgba(accD, 0.04),
    '--zr3d': rgba(raw2, 0.12),
    '--zrbd': accD,
    '--tA2': txM || accL,
    '--tG2': lift(accL, 0.35),
    '--glow': rgba(accL, 0.35),
    '--tn': txM, '--tnd': txd,
    '--nm': txM, '--nmd': txd, '--nmS': txM, '--nmSd': txd,
    '--nu': txM, '--nud': txd,
  };
}

/** Port of zpbNeutralRowVars: the dropdown/neutral rows wear the halfway ink. */
export function neutralRowVars(name: string): Record<string, string> {
  const pk = packFor(name);
  if (!pk) return {};
  const v = pk.vars;
  const txL = v['--tTx'], txd = v['--tTxd'];
  const nl = lift(txL, 0.62), nd = txd, nm = v['--tTxM'] || nl;
  // w45 (O1): neutral rows' number ink rides the halfway tone too
  // w43 (N3/N5/N13): LIGHT inks step up to txM; DARK keeps txd
  return {
    '--zr1': rgba(nl, 0.09),
    '--zr2': rgba(nl, 0.03),
    '--zr3': rgba(nl, 0.10),
    '--zrb': nl,
    '--zr1d': rgba(nd, 0.14),
    '--zr2d': rgba(nd, 0.04),
    '--zr3d': rgba(nd, 0.12),
    '--zrbd': nd,
    '--tA2': nm, '--tG2': nm,
    '--glow': rgba(nl, 0.26),
    '--tn': nm, '--tnd': nd, '--zn': '1',
    '--nm': nm, '--nmd': nd, '--nmS': nm, '--nmSd': nd,
    '--nu': nm, '--nud': nd,
  };
}

/** Port of zpbAnchorVars: the anchor panel's team-graded face/back/ink. */
export function anchorVars(name: string): Record<string, string> {
  const pk = packFor(name);
  if (!pk) return {};
  const v = pk.vars;
  try {
    const accL = v['--tA'], accD = v['--tAd'];
    const cL = hsl(accL) || { h: 35, s: 0.5, l: 0.5 };
    const cD = hsl(accD) || { h: 35, s: 0.5, l: 0.5 };
    const fL = fromHsl(cL.h, Math.min(cL.s, 0.50), 0.93);
    const bL = fromHsl(cL.h, Math.min(Math.max(cL.s, 0.18), 0.55), 0.80);
    const fD = fromHsl(cD.h, Math.min(cD.s, 0.35), 0.22);
    const bD = fromHsl(cD.h, Math.min(Math.max(cD.s, 0.20), 0.45), 0.40);
    return {
      '--anchF': fL, '--anchB': bL, '--anchI': v['--tTxM'] || bL,
      '--anchFd': fD, '--anchBd': bD, '--anchId': v['--tTxMd'] || v['--tTxd'] || bD,
    };
  } catch { return {}; }
}
