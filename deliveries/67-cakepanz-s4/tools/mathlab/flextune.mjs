// mathlab/flextune.mjs — raise flex penalties (in steps of 2, never lowered) until no star (OVR >= --min) is PROMOTED by the
// real engine: placed, with a penalty > 0, in a spot that is not his role and whose weight is above the best spot of his own role.
// Owner permission 7 Nov 2026: "increase the flex penalties (still keep them divisible by 2) until there are no more such cases".
// Free (penalty 0) rules are the Owner's design and are never raised. The CPU drafters price flexes, so every step re-drafts.
// Run from colors/:
//   node --experimental-strip-types ../tools/mathlab/flextune.mjs --table=../tools/mathlab/flex-candidate-2026-11-07.json \
//     --set="CB>WR=10,TE>WR=6" --tune=1001-1024 --check=3001-3040 --out=../tools/mathlab/results/flex-tuned-2026-11-07.json
// Never writes a product file; FLEX is mutated in memory only.
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
const { SLOTS } = await src('sports/nfl/engine/slots.ts');

const cand = JSON.parse(fs.readFileSync(arg('table'), 'utf8'));
const apply = (flex) => { for (const role of Object.keys(FLEX)) { for (const k of Object.keys(FLEX[role])) delete FLEX[role][k]; Object.assign(FLEX[role], structuredClone(flex[role] ?? {})); } };
const table = structuredClone(cand.flex);
for (const rule of (arg('set', '') || '').split(',').filter(Boolean)) {
  const m = /^([A-Z]+)>([A-Z0-9]+)=(\d+)$/.exec(rule.trim());
  if (!m) throw new Error('bad --set rule ' + rule);
  (table[m[1]] ??= {})[m[2]] = +m[3];
}
const MIN = +arg('min', '85'), CAP = +arg('cap', '40');
const EXEMPT = new Set((arg('exempt', '') || '').split(',').filter(Boolean));   // ROLE>DEST rules left alone (Owner design)
const read = (p) => fs.readFileSync(path.join(root, '..', 'data', 'nfl', p), 'utf8');
const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'), read('player-ids.csv'));
const bestNat = {};
for (const s of SLOTS) { const r = s.dest === 'NICKEL' || s.dest === 'DIME' ? 'CB' : s.dest === 'DL5' ? 'DT' : s.dest; bestNat[r] = Math.max(bestNat[r] ?? 0, s.weight); }
const range = (s) => { const [a, b] = s.split('-').map(Number); return [a, b ?? a]; };

// one pass over seeds: returns Map "ROLE>DEST" -> {n, ex:[...]}, plus totals
function scan(seeds) {
  const [a, b] = range(seeds), promo = new Map(); let lineups = 0, off = 0, stars = 0;
  for (let seed = a; seed <= b; seed++) {
    const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
    runDraft(st, rng.fork('run'));
    for (const ros of st.rosters) {
      const pl = Object.values(ros);
      for (const base of ['4-3', '3-4']) {
        lineups++;
        for (const p of lineupFor(pl, base).placements) {
          if (!p.player || p.player.ovr < MIN) continue;
          stars++;
          const r = p.player.role;
          if (r === p.slot.dest || p.penalty === 0) continue;
          off++;
          if (p.slot.weight > (bestNat[r] ?? 0) && !EXEMPT.has(`${r}>${p.slot.dest}`)) {
            const key = `${r}>${p.slot.dest}`, e = promo.get(key) ?? { n: 0, emergency: 0, ex: [] };
            e.n++; if (p.emergency) e.emergency++;
            if (e.ex.length < 3) e.ex.push(`${p.player.name} ${p.player.ovr} at ${p.slot.slot} -${p.penalty}`);
            promo.set(key, e);
          }
        }
      }
    }
  }
  return { promo, lineups, off, stars };
}

const tuneSeeds = arg('tune', '1001-1024'), checkSeeds = arg('check', '3001-3040');
const history = [];
let round = 0;
for (; round < 60; round++) {
  apply(table);
  const { promo, lineups, off, stars } = scan(tuneSeeds);
  const total = [...promo.values()].reduce((t, e) => t + e.n, 0);
  console.log(`round ${round}: ${lineups} lineups, ${stars} star placements, ${off} off-role (penalised), ${total} promotions in ${promo.size} rules`);
  if (total === 0) break;
  for (const [key, e] of [...promo.entries()].sort((x, y) => y[1].n - x[1].n)) {
    const [role, dest] = key.split('>');
    const row = (table[role] ??= {});
    if (dest === 'DL5' && (row.DT !== undefined || row.EDGE !== undefined)) {   // DL5 costs the cheaper of role>DT and role>EDGE
      const m = Math.min(row.DT ?? 99, row.EDGE ?? 99);
      if (m >= CAP) { console.log(`  ${key}: at cap ${CAP}, ${e.n} cases remain`); continue; }
      for (const d of ['DT', 'EDGE']) if (row[d] === m) row[d] = m + 2;
      history.push({ round, key, from: m, to: m + 2, cases: e.n }); console.log(`  ${key}: ${e.n} cases (${e.ex[0]}) -> cheaper of DT/EDGE ${m + 2}`); continue;
    }
    if (row[dest] === undefined) { console.log(`  ${key}: ${e.n} cases via the -8 EMERGENCY fallback (not a table rule): ${e.ex[0]}`); history.push({ round, key, unlisted: e.n }); continue; }
    const was = row[dest]; if (was >= CAP) { console.log(`  ${key}: at cap ${CAP}, ${e.n} cases remain`); continue; }
    row[dest] = was + 2; history.push({ round, key, from: was, to: was + 2, cases: e.n });
    console.log(`  ${key}: ${e.n} cases (${e.ex[0]}) -> ${was + 2}`);
  }
}
apply(table);
const final = scan(tuneSeeds), chk = scan(checkSeeds);
const sum = (m) => [...m.values()].reduce((t, e) => t + e.n, 0);
console.log(`TUNED on ${tuneSeeds}: promotions ${sum(final.promo)}; CHECK on fresh ${checkSeeds}: ${chk.lineups} lineups, promotions ${sum(chk.promo)}`);
for (const [k, e] of chk.promo) console.log(`  fresh ${k}: ${e.n}  e.g. ${e.ex[0]}`);
const changed = [];
for (const role of Object.keys(table)) for (const [d, v] of Object.entries(table[role])) if (cand.flex[role]?.[d] !== v) changed.push(`${role}>${d} ${cand.flex[role]?.[d] ?? '-'} -> ${v}`);
console.log('changed vs candidate (incl. --set):', changed.length ? changed.join('; ') : 'none');
const out = arg('out', '');
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ _status: 'TUNED CANDIDATE, not adopted', _method: `flextune.mjs: star line ${MIN}, tune seeds ${tuneSeeds}, fresh check ${checkSeeds}; promotion = penalised off-role placement into a spot heavier than the player's best own-role spot; steps of 2, never lowered`, _set: arg('set', ''), _history: history, flex: table }, null, 1) + '\n');
  console.log('wrote', out);
}
