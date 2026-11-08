// mathlab/flexcap.mjs — Owner 7 Nov 2026 (second message): "think of this as if the flex penalties are capped at -10, and we adjust the
// model's weights for position value to encourage all 85+ players to play for their natural role under a -10 flex cap."
//  * flex table = the Owner's 7 Nov candidate (+ his answers CB>WR 10, TE>WR 6); every penalty >= 6 becomes 10 (6 -> 10, 12 -> 10);
//    every 0, 2 and 4 is left exactly as it is.
//  * UPPER slot weights are never touched (--frozen, default WR1,DE1,OT1,QB,FB). The natural slot of a promoted star's own role is
//    raised in steps of 50 until the real engine (lineupFor; the CPU drafters are re-run at every step) stops promoting 85+ players.
//  * DRIVER (what makes a step): an 85+ player who is the BEST of his role on that roster, placed through a -10 rule into a spot of
//    another role that weighs MORE than his role's best natural spot. A step never goes above the weight of the spot he is promoted into.
//  * REPORTED, never driving: (a) the same with a 2 or 4 rule (left alone by the Owner), (b) second and later stars of a role
//    (a surplus star has no top slot of his own), (c) -8 emergency fills. They are counted before and after the weight changes.
// Run from colors/:
//   node --experimental-strip-types ../tools/mathlab/flexcap.mjs --table=../tools/mathlab/flex-candidate-2026-11-07.json \
//     --tune=1001-1016 --check=3001-3016 --out=../tools/mathlab/results/flexcap10-2026-11-07.json
// Never writes a product file. FLEX, SLOTS and WEIGHT are mutated in memory only.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const root = path.resolve(process.cwd());
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);
const { buildPool } = await src('sports/nfl/engine/players.ts');
const { makeRng } = await src('core/rng.ts');
const { DEFAULT_CONFIG, newDraft, runDraft } = await src('sports/nfl/engine/draft.ts');
const { lineupFor } = await src('sports/nfl/engine/lineup.ts');
const { FLEX } = await src('sports/nfl/engine/flex.ts');
const { SLOTS, WEIGHT } = await src('sports/nfl/engine/slots.ts');

const MIN = +arg('min', '85'), CAP = 10, STEP = 50, MAXW = +arg('maxw', '1000');
const FROZEN = new Set((arg('frozen', 'WR1,DE1,OT1,QB,FB') || '').split(',').filter(Boolean));
const read = (p) => fs.readFileSync(path.join(root, '..', 'data', 'nfl', p), 'utf8');
const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'), read('player-ids.csv'));

// ---- flex table: candidate + Owner answers, then the cap
const cand = JSON.parse(fs.readFileSync(arg('table'), 'utf8'));
const table = structuredClone(cand.flex);
for (const rule of ('CB>WR=10,TE>WR=6,' + (arg('set', '') || '')).split(',').filter(Boolean)) {
  const m = /^([A-Z]+)>([A-Z0-9]+)=(\d+)$/.exec(rule.trim());
  if (!m) throw new Error('bad rule ' + rule);
  (table[m[1]] ??= {})[m[2]] = +m[3];
}
const capped = [];
for (const [role, row] of Object.entries(table)) for (const [d, v] of Object.entries(row)) if (v >= 6 && v !== CAP) { capped.push(`${role}>${d} ${v}->${CAP}`); row[d] = CAP; }
const apply = () => { for (const role of Object.keys(FLEX)) { for (const k of Object.keys(FLEX[role])) delete FLEX[role][k]; Object.assign(FLEX[role], structuredClone(table[role] ?? {})); } };

// ---- weights (mutable in memory); original kept for the report
const base = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));
const w = { ...base };
const setW = (id, v) => { w[id] = v; const s = SLOTS.find((x) => x.id === id); s.weight = v; WEIGHT[id] = v; if (s.weight !== v || WEIGHT[id] !== v) throw new Error('SLOTS/WEIGHT are frozen'); };
// natural slots of a role, best weight first (DL5 is natural for DT and EDGE)
const slotsOf = (role) => SLOTS.filter((s) => s.dest === role || (s.dest === 'DL5' && (role === 'DT' || role === 'EDGE'))).sort((a, b) => w[b.id] - w[a.id] || SLOTS.indexOf(a) - SLOTS.indexOf(b));
const NATURAL_ZERO = (role, dest, pen) => pen === 0 && (dest === 'NICKEL' || dest === 'DIME' || dest === 'DL5' || (role === 'ILB' && dest === 'OLB') || (role === 'OLB' && dest === 'ILB'));
const range = (s) => { const [a, b] = s.split('-').map(Number); return [a, b ?? a]; };

// ---- one pass over drafts. classes: drive | small | second | emergency
function scan(seeds, who) {
  const [a, b] = range(seeds), cls = { drive: new Map(), small: new Map(), second: new Map(), emergency: new Map() }, whoRows = [];
  let lineups = 0, stars = 0;
  for (let seed = a; seed <= b; seed++) {
    const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'));
    for (const ros of st.rosters) {
      const pl = Object.values(ros);
      const rank = new Map();
      for (const role of new Set(pl.map((p) => p.role))) pl.filter((p) => p.role === role).sort((x, y) => y.ovr - x.ovr || String(x.id).localeCompare(String(y.id))).forEach((p, i) => rank.set(p.id, i + 1));
      for (const bs of ['4-3', '3-4']) {
        lineups++;
        for (const p of lineupFor(pl, bs).placements) {
          if (!p.player || p.player.ovr < MIN) continue;
          stars++;
          const r = p.player.role, k = rank.get(p.player.id) ?? 1, sl = slotsOf(r), nat = sl[Math.min(k, sl.length) - 1];
          if (who && who(p.player)) whoRows.push({ seed, bs, name: p.player.name, role: r, ovr: p.player.ovr, slot: p.slot.slot, pen: p.penalty });
          if (r === p.slot.dest || p.penalty === 0 || NATURAL_ZERO(r, p.slot.dest, p.penalty) || !nat) continue;
          if (p.slot.weight <= w[nat.id]) continue;   // not "encouraged": the spot is no heavier than his natural one
          const c = p.emergency ? 'emergency' : k > 1 ? 'second' : p.penalty >= CAP ? 'drive' : 'small';
          const key = `${r}>${p.slot.slot}`, e = cls[c].get(key) ?? { n: 0, role: r, nat: nat.id, k, pen: p.penalty, ex: [] };
          e.n++; if (e.ex.length < 3) e.ex.push(`${p.player.name} ${p.player.ovr} at ${p.slot.slot} -${p.penalty}${p.emergency ? ' (emerg)' : ''} (natural ${nat.id} ${w[nat.id]})`);
          cls[c].set(key, e);
        }
      }
    }
  }
  return { cls, lineups, stars, whoRows };
}
const total = (m) => [...m.values()].reduce((t, e) => t + e.n, 0);
const counts = (r) => Object.fromEntries(Object.entries(r.cls).map(([c, m]) => [c, total(m)]));

// ---- pairwise (one star against his single best alternative spot, others ignored): he stays natural iff
//      w_nat * ovr >= w_dest * (ovr - 10), i.e. w_nat >= w_dest * (1 - 10/ovr). Worst case = the best-rated player of the role.
{
  const top = new Map();
  for (const p of pool) if (p.ovr >= MIN && (!top.has(p.role) || p.ovr > top.get(p.role).ovr)) top.set(p.role, p);
  const destW = (d) => Math.max(...SLOTS.filter((s) => s.dest === d || (d === 'CB' && s.dest === 'CB')).map((s) => base[s.id]), 0);
  console.log('PAIRWISE need (original upper weights; rounded up to 50): role (best 85+ player) -> natural top slot now / needed, binding spot');
  for (const [role, pl] of [...top].sort((a, b) => b[1].ovr - a[1].ovr)) {
    const row = table[role] ?? {}, natNow = Math.max(...slotsOf(role).map((s) => base[s.id]), 0);
    let need = 0, bind = '';
    for (const [d, pen] of Object.entries(row)) {
      if (pen !== CAP) continue;
      const W = d === 'NICKEL' ? base.CB3 : d === 'DIME' ? base.DIME : destW(d), n = W * (1 - pen / pl.ovr);
      if (n > need) { need = n; bind = `${d} (${W})`; }
    }
    if (need) console.log(`  ${role.padEnd(5)} ${pl.name} ${pl.ovr}: now ${natNow}, needs ${Math.ceil(need / STEP) * STEP}${need > natNow ? '  <-- RAISE' : '  ok'}; binding ${bind}`);
  }
}
apply();
console.log(`flex capped at ${CAP}: ${capped.length} rules changed (${capped.join('; ')})`);
const tuneSeeds = arg('tune', '1001-1016'), checkSeeds = arg('check', '3001-3016');
for (const r of (arg('fixed', '') || '').split(',').filter(Boolean)) { const [id, v] = r.split('='); if (!(id in base)) throw new Error('unknown slot ' + id); setW(id, +v); }   // --fixed=TE1=600,... : evaluate a given weight set, no tuning
const NOLOOP = (arg('fixed', '') || '') !== '';
const before = scan(tuneSeeds), beforeChk = scan(checkSeeds);
console.log(`BEFORE any weight change: tune ${tuneSeeds} ${before.lineups} lineups, ${before.stars} star placements: ${JSON.stringify(counts(before))}; fresh ${checkSeeds}: ${JSON.stringify(counts(beforeChk))}`);
const history = [];
let last = before;
for (let round = 0; round < (NOLOOP ? 0 : 200); round++) {
  const r = round === 0 ? before : scan(tuneSeeds);
  last = r;
  console.log(`round ${round}: ${JSON.stringify(counts(r))}`);
  if (total(r.cls.drive) === 0) break;
  const raise = new Map();
  for (const [key, e] of r.cls.drive) {
    const dest = SLOTS.find((s) => s.id === key.split('>')[1]);
    if (FROZEN.has(e.nat)) { console.log(`  ${key}: ${e.n} cases, natural slot ${e.nat} is frozen (${w[e.nat]} vs ${dest.id} ${w[dest.id]}): ${e.ex[0]}`); continue; }
    if (w[e.nat] + STEP > Math.min(MAXW, w[dest.id])) { console.log(`  ${key}: ${e.n} cases, ${e.nat} already ${w[e.nat]} (target ${dest.id} ${w[dest.id]}): ${e.ex[0]}`); continue; }
    raise.set(e.nat, Math.max(raise.get(e.nat) ?? 0, w[e.nat] + STEP));
    console.log(`  ${key}: ${e.n} cases e.g. ${e.ex[0]} -> ${e.nat} ${w[e.nat]} -> ${w[e.nat] + STEP}`);
  }
  if (!raise.size) { console.log('  nothing left that a step can fix'); break; }
  for (const [id, v] of raise) { history.push({ round, slot: id, from: w[id], to: v }); setW(id, v); }
}
const WHO = /(McBride|Bowers|Kittle|Kelce|Bijan|McCaffrey|Gibbs|Gonzalez|Thuney|Humphrey|Warner|Baun|Derrick Brown)/;
const whoFn = (p) => WHO.test(p.name);
const fin = scan(tuneSeeds, whoFn), chk = scan(checkSeeds, whoFn);
console.log(`\nFINAL tune ${tuneSeeds}: ${JSON.stringify(counts(fin))}\nFINAL fresh ${checkSeeds} (${chk.lineups} lineups): ${JSON.stringify(counts(chk))}`);
const show = (tag, r) => { for (const c of ['drive', 'small', 'second', 'emergency']) for (const [k, e] of [...r.cls[c]].sort((x, y) => y[1].n - x[1].n)) console.log(`  ${tag} ${c.padEnd(9)} ${k.padEnd(9)} x${String(e.n).padEnd(3)} (-${e.pen}) e.g. ${e.ex[0]}`); };
show('tune ', fin); show('fresh', chk);
if (NOLOOP) console.log('FIXED weights evaluated (no tuning):', arg('fixed', ''));
const raised = SLOTS.filter((s) => w[s.id] !== base[s.id]).map((s) => `${s.id} ${base[s.id]}->${w[s.id]}`);
console.log('raised slots:', raised.length ? raised.join(', ') : 'none');
const g = new Map();
for (const r of [...fin.whoRows, ...chk.whoRows]) { const lbl = `${r.slot}${r.pen ? '@-' + r.pen : ''}`; const k = `${r.name} ${r.role} ${r.ovr}`; const e = g.get(k) ?? new Map(); e.set(lbl, (e.get(lbl) ?? 0) + 1); g.set(k, e); }
console.log('named players, all placements (tune + fresh seeds):');
for (const [k, e] of [...g].sort()) console.log(`  ${k}: ` + [...e].map(([a, b]) => `${a} x${b}`).join(', '));
const out = arg('out', '');
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ _status: 'EXPERIMENT, not adopted', _method: `flexcap.mjs: flex >=6 -> ${CAP} (2/4/0 kept), CB>WR 10 and TE>WR 6->10 per Owner; natural slot weights raised in steps of ${STEP}, frozen ${[...FROZEN]}; tune ${tuneSeeds}, fresh ${checkSeeds}`, _capped: capped, _history: history, weights: w, baseWeights: base, raised, countsBefore: counts(before), countsFinalTune: counts(fin), countsFinalFresh: counts(chk), flex: table }, null, 1) + '\n');
  console.log('wrote', out);
}
