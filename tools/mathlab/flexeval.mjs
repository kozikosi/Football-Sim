// mathlab/flexeval.mjs — P-294 (Owner 8 Nov 2026: flex is MODEL-FIRST; keep his -2/-4/-10 system; -10 may become -12 if it keeps clearly more people natural).
// READ-ONLY lab tool: replays the real engine (lineupFor on seeded CPU drafts) under a flex table and a solver-weight set, and counts the 85+ players
// the lineup is "encouraged" to place off-role through a penalty into a spot heavier than his own role's best spot (the Owner's 7 Nov worry).
// Tables:   today = flex.json as shipped (FLEX); cap10 / cap12 = the Owner's 7 Nov candidate + his CB>WR 10, TE>WR 6 answers, every penalty >= 6 set to the cap, 0/2/4 untouched.
// Weights:  input = SLOTS (what lineupFor optimises today); measured = derivedWeights scaled QB 1000, nearest 5 (what the model actually measures). Model-first = measured.
// Never writes a product file: FLEX, SLOTS and WEIGHT are mutated in memory only.
// Run from colors/:  node --experimental-strip-types ../tools/mathlab/flexeval.mjs --seeds=1001-1016,3001-3016 --out=../tools/mathlab/results/flexeval-2026-11-08.json
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
const { measuredDisplayWeights } = await src('sports/nfl/engine/value.ts');

const MIN = +arg('min', '85');
const read = (p) => fs.readFileSync(path.join(root, '..', 'data', 'nfl', p), 'utf8');
const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'), read('player-ids.csv'));

// ---- weights
const inputW = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));
const measuredW = measuredDisplayWeights('4-3');     // computed BEFORE any mutation; independent of SLOTS (reads the specs)
const setWeights = (w) => { for (const s of SLOTS) { s.weight = w[s.id] ?? s.weight; WEIGHT[s.id] = s.weight; } };
const wNow = () => Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));

// ---- flex tables
const original = structuredClone(Object.fromEntries(Object.entries(FLEX).map(([r, row]) => [r, { ...row }])));
const cand = JSON.parse(fs.readFileSync(path.join(root, '..', 'tools', 'mathlab', 'flex-candidate-2026-11-07.json'), 'utf8'));
function capTable(cap) {
  const t = structuredClone(cand.flex);
  (t.CB ??= {}).WR = 10; (t.TE ??= {}).WR = 6;
  for (const row of Object.values(t)) for (const d of Object.keys(row)) if (row[d] >= 6) row[d] = cap;
  return t;
}
const applyTable = (t) => { for (const role of Object.keys(FLEX)) { for (const k of Object.keys(FLEX[role])) delete FLEX[role][k]; Object.assign(FLEX[role], structuredClone(t[role] ?? {})); } };
const TABLES = { today: original, cap10: capTable(10), cap12: capTable(12) };
const rulesAt = (t, v) => Object.entries(t).flatMap(([r, row]) => Object.entries(row).filter(([, p]) => p === v).map(([d]) => `${r}>${d}`));

const slotsOf = (role, w) => SLOTS.filter((s) => s.dest === role || (s.dest === 'DL5' && (role === 'DT' || role === 'EDGE'))).sort((a, b) => w[b.id] - w[a.id] || SLOTS.indexOf(a) - SLOTS.indexOf(b));
const NATURAL_ZERO = (role, dest, pen) => pen === 0 && (dest === 'NICKEL' || dest === 'DIME' || dest === 'DL5' || (role === 'ILB' && dest === 'OLB') || (role === 'OLB' && dest === 'ILB'));
const seedList = (s) => s.split(',').flatMap((r) => { const [a, b] = r.split('-').map(Number); return Array.from({ length: (b ?? a) - a + 1 }, (_, i) => a + i); });

function scan(seeds) {
  const w = wNow(), cls = { high: new Map(), small: new Map(), second: new Map(), emergency: new Map() }, highRule = {};
  let lineups = 0, stars = 0, offRole = 0, flexMoves = 0, slotsFilled = 0;
  for (const seed of seeds) {
    const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'));
    for (const ros of st.rosters) {
      const pl = Object.values(ros), rank = new Map();
      for (const role of new Set(pl.map((p) => p.role))) pl.filter((p) => p.role === role).sort((x, y) => y.ovr - x.ovr || String(x.id).localeCompare(String(y.id))).forEach((p, i) => rank.set(p.id, i + 1));
      for (const bs of ['4-3', '3-4']) {
        lineups++;
        for (const p of lineupFor(pl, bs).placements) {
          if (!p.player) continue;
          slotsFilled++;
          const r = p.player.role;
          if (!(r === p.slot.dest || p.penalty === 0 || NATURAL_ZERO(r, p.slot.dest, p.penalty))) flexMoves++;
          if (p.player.ovr < MIN) continue;
          stars++;
          const k = rank.get(p.player.id) ?? 1, sl = slotsOf(r, w), nat = sl[Math.min(k, sl.length) - 1];
          if (r === p.slot.dest || p.penalty === 0 || NATURAL_ZERO(r, p.slot.dest, p.penalty) || !nat) continue;
          offRole++;
          if (p.slot.weight <= w[nat.id]) continue;     // not "encouraged": the spot is no heavier than his natural one
          const c = p.emergency ? 'emergency' : k > 1 ? 'second' : p.penalty >= 10 ? 'high' : 'small';
          const key = `${r}>${p.slot.slot}`, e = cls[c].get(key) ?? { n: 0, pen: p.penalty, ex: [] };
          e.n++; if (e.ex.length < 2) e.ex.push(`${p.player.name} ${p.player.ovr} at ${p.slot.slot} -${p.penalty}`);
          cls[c].set(key, e);
          if (c === 'high') highRule[`${r}>${p.slot.dest}`] = (highRule[`${r}>${p.slot.dest}`] ?? 0) + 1;
        }
      }
    }
  }
  const total = (m) => [...m.values()].reduce((t, e) => t + e.n, 0);
  const top = (m) => [...m].sort((a, b) => b[1].n - a[1].n).slice(0, 6).map(([k, e]) => `${k} x${e.n} (-${e.pen}) ${e.ex[0]}`);
  return { highRule, lineups, stars, offRole, flexMoves, flexPerLineup: +(flexMoves / lineups).toFixed(3),
    encouraged: Object.fromEntries(Object.entries(cls).map(([c, m]) => [c, total(m)])), top: Object.fromEntries(Object.entries(cls).map(([c, m]) => [c, top(m)])) };
}

const seeds = seedList(arg('seeds', '1001-1016,3001-3016')), fresh = seedList(arg('fresh', '4001-4016'));
const SEL_MIN = +arg('selmin', '20');
const results = {};
const line = (tag, r, secs) => {
  console.log(`${tag.padEnd(20)} lineups ${r.lineups} off-role ${r.offRole} encouraged ${JSON.stringify(r.encouraged)} total ${Object.values(r.encouraged).reduce((a, b) => a + b, 0)} flex/lineup ${r.flexPerLineup}${secs ? ` (${secs}s)` : ''}`);
  for (const c of ['high', 'small', 'second', 'emergency']) if (r.top[c].length) console.log(`    ${c.padEnd(9)} ${r.top[c].slice(0, 3).join(' | ')}`);
};
for (const wname of ['input', 'measured']) {
  setWeights(wname === 'input' ? inputW : measuredW);
  // targeted table: cap 10 everywhere, 12 only on rules that still leak (>= SEL_MIN placements) under cap 10 with THIS weight set, found on the tune seeds
  applyTable(TABLES.cap10);
  const probe = scan(seeds);
  const sel = structuredClone(TABLES.cap10), upped = [];
  for (const [rule, n] of Object.entries(probe.highRule)) {
    if (n < SEL_MIN) continue;
    const [role, dest] = rule.split('>');
    if (sel[role]?.[dest] === 10) { sel[role][dest] = 12; upped.push(`${rule} (${n})`); }
  }
  TABLES[`sel_${wname}`] = sel;
  console.log(`\n[${wname}] targeted table: ${upped.length} rules 10 -> 12: ${upped.join(', ')}`);
  for (const tname of ['today', 'cap10', 'cap12', `sel_${wname}`]) {
    applyTable(TABLES[tname]);
    for (const [set, list] of [['tune', seeds], ['fresh', fresh]]) {
      const t0 = Date.now(), r = scan(list);
      results[`${wname}/${tname}/${set}`] = r;
      line(`${wname} ${tname} ${set}`, r, ((Date.now() - t0) / 1000).toFixed(0));
    }
  }
}
setWeights(inputW); applyTable(original);
const out = arg('out', '');
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ _status: 'EVIDENCE for P-294, not adopted', seeds: arg('seeds', '1001-1016,3001-3016'), minOvr: MIN, tables: { cap10Rules10: rulesAt(TABLES.cap10, 10).length, cap12Rules12: rulesAt(TABLES.cap12, 12).length, selInput: rulesAt(TABLES.sel_input, 12), selMeasured: rulesAt(TABLES.sel_measured, 12) }, fresh: arg('fresh', '4001-4016'),
    measuredWeights: measuredW, inputWeights: inputW, results }, null, 1));
  console.log('wrote', out);
}
