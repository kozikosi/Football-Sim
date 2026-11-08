// mathlab/flexweight.mjs — VL seat tool, 7 Nov 2026.
// Testing apparatus for the Owner's 7 Nov direction: "flex penalties capped at -10, and the model's weights for
// position value raised so that all 85+ players play their natural role."
//
//   * BASE WEIGHTS: the Owner's permanent 6 Nov salary table (tools/mathlab/salary-reference.json), mapped to the
//     32 slot ids (OT1 500 / OT2 300, OG1 400 / OG2 250, C 150, CB1 400 / CB2 250 / CB3 100 [NICKEL spot], DIME 50,
//     TE1 250 / TE2 150 / TE3 50, WR1 650 / WR2 400 / WR3 100 / WR4 50, RB1 250 / RB2 100, FB 25, DE1 650 / DE2 300,
//     DT1 500 / DT2 300 / DL5 150, MIKE 300 / WILL 150 / SAM 100, SS 300 / FS 300, K 50, P 50, QB 1000).
//   * FLEX CAP: every penalty >= 6 becomes 10; CB>WR and TE>WR (the Owner's named calls) become 10; all 0/2/4 stay.
//   * UPPER (frozen, never raised): QB, WR1, DE1, OT1, FB  — "leave the upper values the same".
//   * RAISE: the best natural slot of a promoted role rises in steps of 50, never above the destination spot's
//     weight, until no 85+ player is placed off-role into a heavier spot (a "promotion").
//
// Runs from the repo root:  node --experimental-strip-types _agents/vl/deliveries/flexweight.mjs [--tune=1001-1016] [--check=3001-3016] [--min=85] [--out=...]
// Never writes a product file; FLEX / SLOTS / WEIGHT are mutated in memory only.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const src = (p) => import(pathToFileURL(path.join(root, 'colors/src/engine', p)).href);

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes('--' + k);
const MIN = +arg('min', '85'), STEP = 50, CAP = 10, FAIL_IF = +arg('fail-if', '-1');
const NO_TUNE = flag('no-tune');
const FROZEN = new Set((arg('frozen', 'QB,WR1,DE1,OT1,FB') || '').split(',').filter(Boolean));

const OWNER = {   // 6 Nov salary table -> slot weight (permanent protected constants; salaries internal only)
  QB: 1000, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
  RB1: 250, RB2: 100, FB: 25,
  TE1: 250, TE2: 150, TE3: 50,
  OT1: 500, OT2: 300, OG1: 400, OG2: 250, C: 150,
  DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
  MIKE: 300, WILL: 150, SAM: 100,
  CB1: 400, CB2: 250, CB3: 100,
  SS: 300, FS: 300, DIME: 50,   K: 50, P: 50,
};
const OVERRIDE = arg('weights', '');
if (OVERRIDE) {
  const ov = JSON.parse(fs.readFileSync(path.join(root, OVERRIDE), 'utf8'));
  for (const [k, v] of Object.entries(ov)) {
    if (!(k in OWNER)) throw new Error('unknown weight slot ' + k);
    OWNER[k] = +v;
  }
  console.log('weight overrides:', JSON.stringify(ov));
}
const read = (p) => fs.readFileSync(path.join(root, 'data', p), 'utf8');
const { buildPool } = await src('players.ts');
const { makeRng } = await src('rng.ts');
const { DEFAULT_CONFIG, newDraft, runDraft } = await src('draft.ts');
const { lineupFor } = await src('lineup.ts');
const { FLEX } = await src('flex.ts');
const { SLOTS, WEIGHT } = await src('slots.ts');

const pool = buildPool(read('madden27-ratings.csv'), read('free-agents-old-ratings.csv'));

// ---- apply the Owner-table weights to the engine in memory
for (const s of SLOTS) {
  if (!(s.id in OWNER)) throw new Error('no owner weight for slot ' + s.id);
  s.weight = OWNER[s.id];
  WEIGHT[s.id] = OWNER[s.id];
}

// ---- apply the -10 cap to the flex table in memory
const capped = [];
for (const role of Object.keys(FLEX)) {
  const row = FLEX[role];
  for (const dest of Object.keys(row)) {
    let v = row[dest];
    if (v >= 6) { capped.push(`${role}>${dest} ${v}->10`); v = 10; }
    if ((role === 'CB' && dest === 'WR') || (role === 'TE' && dest === 'WR')) { if (v !== 10) { capped.push(`${role}>${dest} ->10`); v = 10; } }
    row[dest] = v;
  }
}

// ---- natural slots: best-weight spot of each role (DL5 is natural for DT and EDGE at penalty 0)
function natSlots(role) {
  return SLOTS.filter((s) => s.dest === role || (s.dest === 'DL5' && (role === 'DT' || role === 'EDGE')));
}
const bestNat = (role) => Math.max(...natSlots(role).map((s) => s.weight), 0);
const destW = (d) => Math.max(...SLOTS.filter((s) => s.dest === d).map((s) => s.weight), 0);
const naturalOf = (role) => [...natSlots(role)].sort((a, b) => b.weight - a.weight || SLOTS.indexOf(a) - SLOTS.indexOf(b))[0];

// ---- one seeded pass: count 85+ players promoted off-role into a heavier spot
function scan(seeds) {
  const [a, b] = argRange(seeds), promo = new Map(), off = new Map();
  let lineups = 0, stars = 0, promoted = 0;
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
          const key = `${r}>${p.slot.slot}`;
          off.set(key, (off.get(key) ?? 0) + 1);
          if (p.slot.weight > bestNat(r)) {
            promoted++;
            const e = promo.get(key) ?? { n: 0, ex: [] };
            e.n++; if (e.ex.length < 3) e.ex.push(`${p.player.name} ${p.player.ovr} at ${p.slot.slot} -${p.penalty} (natural ${naturalOf(r)?.id} ${bestNat(r)})`);
            promo.set(key, e);
          }
        }
      }
    }
  }
  return { promo, off, lineups, stars, promoted };
}
const argRange = (s) => { const [a, bb] = s.split('-').map(Number); return [a, bb ?? a]; };
const total = (m) => [...m.values()].reduce((t, e) => t + e.n, 0);

// ---- pairwise answer: w_nat must be >= w_dest * (1 - 10/ovr), worst case = best 85+ player of the role
function pairwise() {
  const top = new Map();
  for (const p of pool) if (p.ovr >= MIN && (!top.has(p.role) || p.ovr > top.get(p.role).ovr)) top.set(p.role, p);
  const lines = [];
  for (const [role, pl] of [...top].sort((a, b) => b[1].ovr - a[1].ovr)) {
    const row = FLEX[role] ?? {};
    let need = 0, bind = '';
    for (const [dest, pen] of Object.entries(row)) {
    if (pen !== CAP) continue;
    const w = destW(dest);
    const needRaw = w * (1 - CAP / pl.ovr);
    if (needRaw > need) { need = needRaw; bind = dest; }
    }
    if (need) lines.push(`  ${role.padEnd(5)} ${pl.name} ${pl.ovr}: natural ${naturalOf(role)?.id} now ${bestNat(role)}, needs ${Math.ceil(need / STEP) * STEP}; binding ${bind} -> ${destW(bind)}`);
  }
  return lines;
}

// ---- tune loop: raise natural slots in steps of 50 until no promotions remain
function tuneRound(r) {
  const raise = new Map();
  for (const [key, e] of r.promo) {
    const [role, destId] = key.split('>');
    const nat = naturalOf(role);
    if (!nat || FROZEN.has(nat.id)) continue;
    const destW = SLOTS.find((s) => s.id === destId).weight;
    const nxt = nat.weight + STEP;
    if (nxt > destW) continue;
    raise.set(nat.id, Math.max(raise.get(nat.id) ?? 0, nxt));
  }
  return raise;
}

const tuneSeeds = arg('tune', '1001-1016'), checkSeeds = arg('check', '3001-3016');
const before = scan(tuneSeeds), beforeChk = scan(checkSeeds);
console.log(`BASE (Owner table, flex capped at ${CAP}): tune ${tuneSeeds}: ${before.lineups} lineups, ${before.stars} star placements, ${before.promoted} promotions in ${before.promo.size} rules; fresh ${checkSeeds}: ${beforeChk.promoted} promotions in ${beforeChk.promo.size} rules`);
console.log('Pairwise needs (original upper weights, rounded up to 50):');
pairwise().forEach((l) => console.log(l));
const sortedBefore = [...before.promo.entries()].sort((x, y) => y[1].n - x[1].n);
for (const [k, e] of sortedBefore) console.log(`  before ${k.padEnd(10)} x${e.n}  e.g. ${e.ex[0]}`);

const history = [];
let last = before;
if (!NO_TUNE) {
  for (let round = 0; round < 40; round++) {
    const r = round === 0 ? before : scan(tuneSeeds);
    last = r;
    console.log(`round ${round}: ${total(r.promo)} promotions in ${r.promo.size} rules`);
    if (total(r.promo) === 0) break;
    const raise = tuneRound(r);
    if (!raise.size) { console.log('  nothing left a step can fix'); break; }
    for (const [id, v] of [...raise.entries()].sort((a, b) => b[1] - a[1])) {
      const s = SLOTS.find((x) => x.id === id);
      history.push({ round, slot: id, from: s.weight, to: v });
      const prev = history[history.length - 1].from;
      s.weight = v; WEIGHT[id] = v;
      console.log(`  ${id}: ${prev} -> ${v}`);
    }
  }
}
const fin = scan(tuneSeeds), chk = scan(checkSeeds);
console.log(`\nFINAL tune ${tuneSeeds}: ${fin.promoted} promotions in ${fin.promo.size} rules`);
console.log(`FINAL fresh ${checkSeeds}: ${chk.promoted} promotions in ${chk.promo.size} rules`);
const show = (tag, r) => { for (const [k, e] of [...r.promo.entries()].sort((x, y) => y[1].n - x[1].n)) console.log(`  ${tag} ${k.padEnd(10)} x${String(e.n).padEnd(3)} (-${e.ex[0].match(/-(\d+)/)?.[1] ?? '?'}) e.g. ${e.ex[0]}`); };
show('tune ', fin); show('fresh', chk);
const raised = SLOTS.filter((s) => s.weight !== OWNER[s.id]).map((s) => `${s.id} ${OWNER[s.id]}->${s.weight}`);
console.log('raised slots:', raised.length ? raised.join(', ') : 'none');
if (FAIL_IF >= 0 && Math.max(fin.promoted, chk.promoted) > FAIL_IF) {
  console.log(`FAIL: promotions ${Math.max(fin.promoted, chk.promoted)} > allowed ${FAIL_IF}`);
  process.exit(1);
}

const out = arg('out', '');
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({
    _status: 'VL experiment, not adopted',
    _method: 'flexweight.mjs: base = Owner 6 Nov table; flex >=6 -> 10 plus CB>WR/TE>WR -> 10; naturals raised in steps of 50, frozen QB WR1 DE1 OT1 FB, never above dest weight; tune ' + tuneSeeds + ', fresh ' + checkSeeds,
    capped, history, weights: Object.fromEntries(SLOTS.map((s) => [s.id, s.weight])), ownerWeights: OWNER,
    countsBefore: { tune: total(before.promo), fresh: total(beforeChk.promo) },
    countsFinal: { tune: total(fin.promo), fresh: total(chk.promo) },
    raised, flex: Object.fromEntries(Object.entries(FLEX).map(([role, row]) => [role, Object.fromEntries(Object.entries(row))])),
  }, null, 1) + '\n');
  console.log('wrote', out);
}
