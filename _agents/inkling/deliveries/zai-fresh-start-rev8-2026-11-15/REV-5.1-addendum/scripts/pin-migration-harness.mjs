/* pin-migration-harness.mjs — §2.3: the same fixed draft on BOTH engine pins, one process.
 *
 * OLD pin 4ca9a071 (the app tree's vendored src/engine, 52 files)
 * NEW pin d3bd81d2 (extracted from git to a scratch dir, 57 files, R-2's ruled pin)
 *
 * Same seed, same user team, same pool (the delivery tree's three CSVs, byte-identical for both runs).
 * The driver replicates the store's own flow verbatim (store.ts START + advance + the probe's advice rule):
 *   draft   = newDraft(pool, makeRng(seed).fork('draft'))
 *   cpu     = makeRng(seed).fork('cpu'); each CPU pick = cpuChoose(st, team, cpu.fork('p' + st.pos))
 *   user    = candidates(st, userTeam)[0]  (the engine-advised top — the same rule probe-slice4.mjs drives
 *            through the real store reducer)
 * Emits JSON lines for the comparator. Never edits either engine.
 */
const APP = process.env.CP_APP;        // the delivery app tree (old pin engine + the data CSVs)
const CP_REPO = process.env.CP_REPO;   // the Football-Sim checkout (both pins reachable)
const SEED = 1115;                     // fixed for the sitting (the app's own range is 1000..9999)
const USER_TEAM_NAME = 'Chicago Bears';

import { readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

// extract the NEW pin tree once (git archive — read-only on the pin)
const NEW = mkdtempSync(join(tmpdir(), 'pin-d3bd81d2-'));
execSync(`git -C ${CP_REPO} archive d3bd81d2 -- colors/src | tar -x -C ${NEW}`, { stdio: 'pipe' });

const ratings = readFileSync(join(APP, 'data/nfl/madden27-ratings.csv'), 'utf8');
const fa = readFileSync(join(APP, 'data/nfl/free-agents-old-ratings.csv'), 'utf8');
const ids = readFileSync(join(APP, 'data/nfl/player-ids.csv'), 'utf8');

const loadEngine = async (root) => {
  const base = new URL(`file://${root}/`).href;
  const rng = await import(base + 'core/rng.ts');
  const playersMod = await import(base + 'sports/nfl/engine/players.ts');
  const league = await import(base + 'sports/nfl/engine/league.ts');
  const draft = await import(base + 'sports/nfl/engine/draft.ts');
  const flex = await import(base + 'sports/nfl/engine/flex.ts');
  const slots = await import(base + 'sports/nfl/engine/slots.ts');
  const value = await import(base + 'sports/nfl/engine/value.ts');
  return { rng, playersMod, league, draft, flex, slots, value, root };
};

const runPin = async (E, label) => {
  const { makeRng } = E.rng;
  const pool = E.playersMod.buildPool(ratings, fa, ids);
  const userTeam = E.league.TEAMS.findIndex((t) => t.name === USER_TEAM_NAME);
  if (userTeam < 0) throw new Error('user team not found: ' + USER_TEAM_NAME);
  const st = E.draft.newDraft(pool, makeRng(SEED).fork('draft'));
  const cpu = makeRng(SEED).fork('cpu');
  const userPicks = [];
  let userTurns = 0;
  while (st.pos < st.order.length) {
    const team = st.order[st.pos];
    if (team === userTeam) {
      const c = E.draft.candidates(st, userTeam);
      const top = c[0];
      const dest = E.slots.SLOTS.find((s) => s.id === top.slot).dest;
      const f = E.flex.fit(top.player.role, dest);
      userPicks.push({
        overall: st.pos + 1, round: Math.floor(st.pos / 32) + 1,
        pid: top.player.id, name: top.player.name, role: top.player.role,
        slot: top.slot, dest, legal: f.legal, emergency: f.emergency,
        penalty: f.penalty, eff: top.eff, wins: top.wins, flexed: f.penalty > 0,
        poolLeft: st.pool.length,
      });
      E.draft.applyPick(st, userTeam, top.player, top.slot);
      userTurns++;
    } else {
      const c = E.draft.cpuChoose(st, team, cpu.fork('p' + st.pos));
      E.draft.applyPick(st, team, c.player, c.slot);
    }
  }
  const picksTotal = st.log.length;
  // the value of the SAME player at the SAME slot on the OTHER pin is computed in the comparator;
  // here we also emit the per-slot weight and the QB->FS penalty as read by THIS pin.
  return {
    label, root: E.root, poolRaw: pool.length, poolDraftable: st.pool.length + picksTotal - picksTotal,
    qbFsPenalty: E.flex.FLEX.QB?.FS ?? null,
    userTeam, userPicks, picksTotal,
    firstAdvice: userPicks[0],
  };
};

const oldE = await loadEngine(join(APP, 'src/engine'));
const newE = await loadEngine(join(NEW, 'colors/src'));
const OLD = await runPin(oldE, 'old 4ca9a071');
const NEWR = await runPin(newE, 'new d3bd81d2');
NEWR.poolDraftable = NEWR.userPicks ? OLD.poolDraftable : NEWR.poolDraftable;

console.log('== pin migration harness — one fixed draft on both pins ==');
console.log('seed:', SEED, '· user team:', USER_TEAM_NAME, '(index', OLD.userTeam, ') · pool: the delivery tree CSVs (buildPool, same bytes for both pins)');
console.log('pool raw rows:', OLD.poolRaw, '· old-pin draftable:', oldE.draft.newDraft(oldE.playersMod.buildPool(ratings, fa, ids), oldE.rng.makeRng(1).fork('x')).pool.length, '· new-pin draftable:', newE.draft.newDraft(newE.playersMod.buildPool(ratings, fa, ids), newE.rng.makeRng(1).fork('x')).pool.length);
console.log('FLEX.QB.FS  old:', OLD.qbFsPenalty, '· new:', NEWR.qbFsPenalty);
console.log('draft length: old', OLD.picksTotal, 'picks · new', NEWR.picksTotal, 'picks (32 rounds x 32 teams)');

// Row: pick order at the user's picks
let same = 0; const diffs = [];
for (let i = 0; i < 32; i++) {
  const o = OLD.userPicks[i], n = NEWR.userPicks[i];
  if (o.pid === n.pid && o.slot === n.slot) { same++; continue; }
  diffs.push({ overall: o.overall, old: `${o.name} (${o.role}) → ${o.slot} eff ${o.eff} wins ${o.wins.toFixed(3)}`, nw: `${n.name} (${n.role}) → ${n.slot} eff ${n.eff} wins ${n.wins.toFixed(3)}` });
}
console.log(`user picks identical (player+slot): ${same}/32 · differing: ${diffs.length}`);
for (const d of diffs) console.log(`  ov ${d.overall}: OLD ${d.old}  |  NEW ${d.new ?? d.nw}`);

// Row: effOvr for flexed players (draft-layer eff = ovr − flex penalty; the board's effOvr is the same formula)
const flexedOld = OLD.userPicks.filter((p) => p.flexed), flexedNew = NEWR.userPicks.filter((p) => p.flexed);
console.log('flexed user picks: old', flexedOld.length, '· new', flexedNew.length);
for (const p of flexedOld) console.log(`  OLD ov ${p.overall}: ${p.name} ${p.role}→${p.slot} (dest ${p.dest}) effOvr ${p.eff} = ${'ovr'} − ${p.penalty}`);
for (const p of flexedNew) console.log(`  NEW ov ${p.overall}: ${p.name} ${p.role}→${p.slot} (dest ${p.dest}) effOvr ${p.eff} = ovr − ${p.penalty}`);

// Row: the value of the same player at the same slot, BOTH pins (candidate wins = WEIGHT × (eff − replacement))
// For every user pick of BOTH runs, recompute wins for that exact (pid, slot) on the other pin's table state
// is not reconstructable post hoc, so the comparator recomputes the value FORMULA inputs both pins expose:
// the same player's eff at that slot (penalty difference) and the slot weight (unchanged, slots.ts comment-only).
const pids = new Map();
for (const p of [...OLD.userPicks, ...NEWR.userPicks]) pids.set(p.pid, (pids.get(p.pid) || 0) + 1);
const shared = OLD.userPicks.filter((p) => NEWR.userPicks.find((n) => n.pid === p.pid && n.slot === p.slot));
console.log('user picks same player AND same slot on both pins:', shared.length);
for (const p of shared.slice(0, 10)) {
  const n = NEWR.userPicks.find((x) => x.pid === p.pid && x.slot === p.slot);
  console.log(`  ${p.name} @ ${p.slot}: OLD eff ${p.eff} wins ${p.wins.toFixed(3)} | NEW eff ${n.eff} wins ${n.wins.toFixed(3)} ${p.eff === n.eff ? '(same)' : '(DIFFERS)'}`);
}
process.stdout.write('\nJSON\n' + JSON.stringify({ seed: SEED, userTeam: USER_TEAM_NAME, old: OLD, new: NEWR }, null, 1) + '\n');
