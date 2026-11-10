// CB4 (and DIME) NEW-measurement on the w87 product engine (PreColors lineage, raw curve vs calibrated curve).
// CB4 is a product-only slot (no Colors counterpart, no §2 value) — measure it with the same P-321 method:
// local slope ±5 around the CB pool center (74.99), everything else at position averages, Wins = slope × 20.
import fs from 'node:fs';

const html = fs.readFileSync('w87.html', 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const body = scripts.reduce((a, b) => (b.length > a.length ? b : a), ''); // the big app script
const L = body.split('\n');
const at = (re) => { const i = L.findIndex((l) => re.test(l)); if (i < 0) throw new Error('landmark not found: ' + re); return i; };
const iROSTER = at(/const ROSTER_SLOTS/), iWV = at(/const WV_OFF_SLOTS/), iPPW = at(/const POINTS_PER_WIN/), iENG0 = at(/function clampNum/), iENG1 = L.findIndex((l) => l.includes('scoring: break a final score'));
console.log('slices:', iROSTER + 1, iWV + 1, '..', iENG1 + 1, iPPW + 1, '(script-relative)');
const js = ['function returnerCandidates(){ return []; }', 'const window = {}; function zpbAdjSpec(name, spec){ return spec; } // 4-3: identity (w87 hook, 3-4 off)',
  L[iROSTER],
  L.slice(iWV, iWV + 41).join('\n'),        // WINS VALUE block: WV_OFF_SLOTS .. slotWinsPerOvr
  L.slice(iENG0, iENG1).join('\n'),          // engine block: clampNum .. matchupModel end
  L[iPPW],                                    // POINTS_PER_WIN
].join('\n');

const rows = fs.readFileSync('madden27-ratings.csv', 'utf8').trim().split('\n').slice(1)
  .map((l) => { const [name, pos, team, ovr] = l.split(','); return { pos, ovr: +ovr }; });
const mean = (a) => a.reduce((t, x) => t + x, 0) / a.length;
const pick = (...ps) => mean(rows.filter((r) => ps.includes(r.pos)).map((r) => r.ovr));
const POS_CENTER = { QB: pick('QB'), RB: pick('HB'), WR: pick('WR'), TE: pick('TE'), OT: pick('LT','RT'), OG: pick('LG','RG'), C: pick('C'), EDGE: pick('LEDG','REDG'), DT: pick('DT'), LB: pick('MIKE','WILL','SAM'), CB: pick('CB'), SS: pick('SS'), FS: pick('FS'), K: pick('K'), P: pick('P'), FB: pick('FB') };
const SLOT_POS = { QB:'QB', RB1:'RB', RB2:'RB', WR1:'WR', WR2:'WR', WR3:'WR', WR4:'WR', TE1:'TE', TE2:'TE', TE3:'TE', FB:'FB', OT1:'OT', OT2:'OT', OG1:'OG', OG2:'OG', C:'C', DE1:'EDGE', DE2:'EDGE', DL5:'DT', DT1:'DT', DT2:'DT', MIKE:'LB', WILL:'LB', SAM:'LB', CB1:'CB', CB2:'CB', CB3:'CB', CB4:'CB', SS:'SS', FS:'FS', K:'K', P:'P' };

const run = new Function(`
${js}
const INJ_PC = ${JSON.stringify(POS_CENTER)};
const INJ_SP = ${JSON.stringify(SLOT_POS)};
const centers = {}; ROSTER_SLOTS.forEach((s) => { centers[s] = INJ_PC[INJ_SP[s]]; });
const kk = 17 / POINTS_PER_WIN;
function winsC(slot, ovr){
  const mk = (o) => { const sm = {}; ROSTER_SLOTS.forEach((s) => { sm[s] = { ovr: s === slot ? o : centers[s] }; }); return sm; };
  const lg = teamRatings(mk(centers[slot]));
  const io = WV_OFF_SLOTS.has(slot);
  return (bestUnitPts(teamRatings(mk(ovr)), lg, io) - bestUnitPts(lg, lg, io)) * kk;
}
const _dbg = teamRatings(Object.fromEntries(ROSTER_SLOTS.map((s) => [s, { ovr: 80 }])));
const _nan = Object.entries(_dbg).filter(([k, v]) => Number.isNaN(v)).map(([k, v]) => k);
const _lg2 = _dbg;
const _mo = matchupModel(_lg2, _lg2, _lg2);
globalThis.__DBG = { nan: _nan, struct: _mo.structPts, ch: _mo.channels };
const out = {};
for (const s of ['CB4','CB3','CB1']) {
  const c = centers[s];
  out[s] = {
    n5: (winsC(s, c+5) - winsC(s, c-5)) / 10 * 20,
    n3: (winsC(s, c+3) - winsC(s, c-3)) / 6 * 20,
    n7: (winsC(s, c+7) - winsC(s, c-7)) / 14 * 20,
  };
}
return { out, dbg: globalThis.__DBG };
`)();
console.log('NaN rating keys at flat 80:', JSON.stringify(run.dbg.nan), '· structPts:', run.dbg.struct, '· channels:', JSON.stringify(run.dbg.ch));
for (const [s, v] of Object.entries(run.out)) {
  console.log(`${s}: NEW ±5 ${v.n5.toFixed(4)} · ±3 ${v.n3.toFixed(4)} · ±7 ${v.n7.toFixed(4)} · weight-equiv ${(v.n5/0.00254).toFixed(1)}`);
}
console.log('(sanity: CB1 §2 NEW = 1.0557 on Colors; the product engine will differ a little — CB4 is the number that matters here)');
