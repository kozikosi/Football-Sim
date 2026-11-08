// mathlab/flexscan.mjs — which stars (default OVR >= 85) does the REAL engine put in a spot that is not their own role?
// Applies a flex table (a flex-candidate JSON, plus optional --set overrides) to the engine's FLEX in memory, re-runs the
// seeded drafts (the CPU drafters price flexes too, so the rosters change with the table), builds both bases' lineups with
// the engine's own lineupFor, and lists every placement of a player rated >= --min whose role != the spot's dest.
// Run from colors/:  node --experimental-strip-types ../tools/mathlab/flexscan.mjs --table=../tools/mathlab/flex-candidate-2026-11-07.json
//   --set="CB>WR=10,TE>WR=6"   override rules (ROLE>DEST=penalty, comma list)     --seeds=1001-1012   draft seeds
//   --min=85   star line      --who="Trey McBride,Brock Bowers"   also print every placement of these players
//   --json     machine-readable summary on the last line
// Never writes a product file. FLEX is mutated in memory only.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes('--' + k);
const root = path.resolve(process.cwd());
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);

const { buildPool } = await src('sports/nfl/engine/players.ts');
const { makeRng } = await src('core/rng.ts');
const { DEFAULT_CONFIG, newDraft, runDraft } = await src('sports/nfl/engine/draft.ts');
const { lineupFor } = await src('sports/nfl/engine/lineup.ts');
const { FLEX } = await src('sports/nfl/engine/flex.ts');

const tablePath = arg('table', null);
if (tablePath) {
  const cand = JSON.parse(fs.readFileSync(tablePath, 'utf8')).flex;
  for (const role of Object.keys(FLEX)) { for (const k of Object.keys(FLEX[role])) delete FLEX[role][k]; Object.assign(FLEX[role], cand[role] ?? {}); }
}
for (const rule of (arg('set', '') || '').split(',').filter(Boolean)) {
  const m = /^([A-Z]+)>([A-Z0-9]+)=(\d+)$/.exec(rule.trim());
  if (!m) throw new Error('bad --set rule ' + rule);
  FLEX[m[1]][m[2]] = +m[3];
}

const read = (p) => fs.readFileSync(path.join(root, '..', 'data', 'nfl', p), 'utf8');
const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'), read('player-ids.csv'));
const [s0, s1] = arg('seeds', '1001-1012').split('-').map(Number);
const MIN = +arg('min', '85');
const who = new Set((arg('who', '') || '').split(',').filter(Boolean));

let lineups = 0, rosters = 0, starSlots = 0;
const byRule = new Map(), rows = [], whoRows = [];
const NATURAL_ZERO = (role, dest, pen) => pen === 0 && (dest === 'NICKEL' || dest === 'DIME' || dest === 'DL5' || (role === 'ILB' && dest === 'OLB') || (role === 'OLB' && dest === 'ILB'));
for (let seed = s0; seed <= s1; seed++) {
  const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  for (const ros of st.rosters) {
    rosters++;
    const pl = Object.values(ros);
    for (const base of ['4-3', '3-4']) {
      const l = lineupFor(pl, base); lineups++;
      for (const p of l.placements) {
        if (!p.player) continue;
        if (p.player.ovr >= MIN) starSlots++;
        const off = p.player.role !== p.slot.dest && !NATURAL_ZERO(p.player.role, p.slot.dest, p.penalty);
        if (who.has(p.player.name)) whoRows.push({ seed, base, name: p.player.name, role: p.player.role, ovr: p.player.ovr, slot: p.slot.slot, pen: p.penalty });
        if (!off || p.player.ovr < MIN) continue;
        const key = `${p.player.role}>${p.slot.slot}`;
        byRule.set(key, (byRule.get(key) ?? 0) + 1);
        rows.push({ seed, base, name: p.player.name, role: p.player.role, ovr: p.player.ovr, slot: p.slot.slot, dest: p.slot.dest, pen: p.penalty, eff: p.effOvr, emergency: p.emergency });
      }
    }
  }
}
const sorted = [...byRule.entries()].sort((a, b) => b[1] - a[1]);
console.log(`seeds ${s0}-${s1}: ${rosters} rosters, ${lineups} lineups, star line OVR>=${MIN}`);
console.log(`star placements (any spot): ${starSlots}; off-role star placements: ${rows.length}`);
for (const [k, n] of sorted) console.log(`  ${k.padEnd(10)} ${n}`);
const names = new Map();
for (const r of rows) { const k = `${r.name} (${r.role} ${r.ovr})`; const e = names.get(k) ?? new Map(); e.set(`${r.slot}@-${r.pen}`, (e.get(`${r.slot}@-${r.pen}`) ?? 0) + 1); names.set(k, e); }
for (const [k, e] of [...names.entries()].sort()) console.log(`  ${k}: ` + [...e.entries()].map(([a, b]) => `${a} x${b}`).join(', '));
if (who.size) {
  const g = new Map();
  for (const r of whoRows) { const k = `${r.name} ${r.role} ${r.ovr}`; const e = g.get(k) ?? new Map(); e.set(r.slot, (e.get(r.slot) ?? 0) + 1); g.set(k, e); }
  console.log('--who:');
  for (const [k, e] of g) console.log(`  ${k}: ` + [...e.entries()].map(([a, b]) => `${a} x${b}`).join(', '));
  const nm = new Set(whoRows.map((r) => r.name)); for (const n of who) if (!nm.has(n)) console.log(`  ${n}: never on a lineup in these seeds`);
}
if (flag('json')) console.log(JSON.stringify({ rosters, lineups, offRoleStars: rows.length, byRule: Object.fromEntries(sorted) }));
