// PreColors engine extraction + WR3/SAM/CB1 measurement (line-slice extraction, no page init).
import fs from 'node:fs';

const html = fs.readFileSync('../work/PreColors.html', 'utf8');
const lines = html.split('\n');
const slice = (a, b) => lines.slice(a - 1, b).join('\n');
const js = [
  'function returnerCandidates(){ return []; }',          // stub: plain {ovr} slotmaps hold no players -> neutral 82
  slice(924, 924),      // ROSTER_SLOTS
  slice(1313, 1370),    // WINS VALUE: WV_OFF_SLOTS, bestUnitPts, slotWinsTable, slotWins, slotWinsPerOvr
  slice(1914, 2152),    // SEASON SIMULATION ENGINE: clampNum ... matchupModel (incl. RATING_SPECS, teamRatings, plans, MC)
  slice(4865, 4865),    // POINTS_PER_WIN
].join('\n');

// CSV pool centers (verified earlier against the prompt's claimed centers)
const rows = fs.readFileSync('../work/madden27-ratings.csv', 'utf8').trim().split('\n').slice(1)
  .map((l) => { const [name, pos, team, ovr] = l.split(','); return { pos, ovr: +ovr }; });
const mean = (a) => a.reduce((t, x) => t + x, 0) / a.length;
const pick = (...ps) => mean(rows.filter((r) => ps.includes(r.pos)).map((r) => r.ovr));
const POS_CENTER = { QB: pick('QB'), RB: pick('HB'), WR: pick('WR'), TE: pick('TE'), OT: pick('LT','RT'), OG: pick('LG','RG'), C: pick('C'), EDGE: pick('LEDG','REDG'), DT: pick('DT'), LB: pick('MIKE','WILL','SAM'), CB: pick('CB'), SS: pick('SS'), FS: pick('FS'), K: pick('K'), P: pick('P'), FB: pick('FB') };
const SLOT_POS = { QB:'QB', RB1:'RB', RB2:'RB', WR1:'WR', WR2:'WR', WR3:'WR', TE1:'TE', TE2:'TE', OT1:'OT', OT2:'OT', OG1:'OG', OG2:'OG', C:'C', DE1:'EDGE', DE2:'EDGE', DT1:'DT', DT2:'DT', MIKE:'LB', WILL:'LB', SAM:'LB', CB1:'CB', CB2:'CB', CB3:'CB', SS:'SS', FS:'FS', K:'K' };

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
const out = { PPW: POINTS_PER_WIN, MC, slots: ROSTER_SLOTS.slice(), vals: {} };
for (const s of ['WR3','SAM','CB1','QB','WR2','TE2','RB2']) {
  const c = centers[s];
  const old20 = slotWins(s, 90) - slotWins(s, 70);
  const n5 = (winsC(s, c+5) - winsC(s, c-5)) / 10 * 20;
  const n3 = (winsC(s, c+3) - winsC(s, c-3)) / 6 * 20;
  const n7 = (winsC(s, c+7) - winsC(s, c-7)) / 14 * 20;
  out.vals[s] = { c, old20, n5, n3, n7 };
}
return out;
`)();
console.log('PreColors POINTS_PER_WIN:', run.PPW, '· MC:', JSON.stringify(run.MC));
console.log('\n== PreColors engine measurement ==');
console.log('slot  center  OLD slotWins20   NEW ±5    ±3    ±7   | weight OLD->NEW (÷0.00254)');
for (const [s, v] of Object.entries(run.vals)) {
  console.log(`${s.padEnd(5)} ${v.c.toFixed(2).padStart(6)}  ${v.old20.toFixed(4).padStart(13)}  ${v.n5.toFixed(4).padStart(7)} ${v.n3.toFixed(3).padStart(6)} ${v.n7.toFixed(3).padStart(6)} | ${(v.old20/0.00254).toFixed(1)} -> ${(v.n5/0.00254).toFixed(1)}`);
}
console.log('\nClaims to test: PreColors OLD slotWins20 SAM 0.074, CB1 1.442; P-321 on PreColors: WR3 weight 95 -> 120.');
console.log('Colors engine (measured): SAM OLD 0.2630 NEW 0.1279 · CB1 OLD 1.0563 NEW 1.0557 · WR3 OLD 0.2470 NEW 0.2470.');
