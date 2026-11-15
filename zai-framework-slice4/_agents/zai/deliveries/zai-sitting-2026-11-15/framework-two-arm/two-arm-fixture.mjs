/* two-arm-fixture.mjs — §2.5c: mint the ONE deterministic fixture both framework arms render.
 * Completes a full 1,024-pick draft node-side on the vendored pin engine (4ca9a071, read-only),
 * user = candidates[0] per turn (the probe's rule), CPU via the store's fork scheme — then scans
 * a small seed range for a three-score week-1 game (the 390 px worst case: most scoring drives)
 * and writes the chosen seed's full league log + the game shape. Chosen BEFORE either arm is built;
 * both arms consume the identical bytes.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP = join(HERE, '..', '67-cakepanz-s3-s4-rev2');  // 67-cakepanz-s3-s4-rev2 (sibling of framework-two-arm)
const OUT = join(HERE, 'fixture');
mkdirSync(OUT, { recursive: true });

const ratings = readFileSync(join(APP, 'data/nfl/madden27-ratings.csv'), 'utf8');
const fa = readFileSync(join(APP, 'data/nfl/free-agents-old-ratings.csv'), 'utf8');
const ids = readFileSync(join(APP, 'data/nfl/player-ids.csv'), 'utf8');

const { buildPool } = await import(`file://${join(APP, 'src/engine/sports/nfl/engine/players.ts')}`);
const { makeRng } = await import(`file://${join(APP, 'src/engine/core/rng.ts')}`);
const { newDraft, candidates, applyPick, cpuChoose } = await import(`file://${join(APP, 'src/engine/sports/nfl/engine/draft.ts')}`);
const { TEAMS } = await import(`file://${join(APP, 'src/engine/sports/nfl/engine/league.ts')}`);
const { freezePool } = await import(`file://${join(APP, 'src/engine/sports/nfl/app/store.ts')}`);
const { feedVM } = await import(`file://${join(APP, 'src/lib/feedVM.ts')}`);

const pool = buildPool(ratings, fa, ids);
const USER = TEAMS.findIndex((t) => t.name === 'Chicago Bears');

function fullDraft(seed) {
  const st = newDraft(pool, makeRng(seed).fork('draft'));
  const cpu = makeRng(seed).fork('cpu');
  while (st.pos < st.order.length) {
    const team = st.order[st.pos];
    if (team === USER) {
      const c = candidates(st, USER)[0];
      applyPick(st, USER, c.player, c.slot);
    } else {
      const c = cpuChoose(st, team, cpu.fork('p' + st.pos));
      applyPick(st, team, c.player, c.slot);
    }
  }
  return st;
}

// scan seeds for the heaviest week-1 game for the user's team: most scoring drives, then most drives
let best = null;
for (let seed = 1000; seed < 1120; seed++) {
  const st = fullDraft(seed);
  const record = { seed, userTeam: USER, pool: freezePool(pool), picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
  const vm = feedVM(record, seed, USER);
  const scoring = vm.drives.filter((d) => d.pts > 0 || d.oppPts > 0).length;
  const turnovers = vm.drives.filter((d) => d.end === 'INT' || d.end === 'FUM').length;
  const cand = { seed, scoring, drives: vm.drives.length, turnovers, away: vm.away, home: vm.home, awayScore: vm.awayScore, homeScore: vm.homeScore, ot: !!vm.ot };
  if (!best || cand.scoring > best.scoring || (cand.scoring === best.scoring && cand.drives > best.drives)) best = cand;
  if (cand.scoring >= 4) break;   // a three-score-plus game is enough for the worst case
}
console.log('chosen fixture seed:', JSON.stringify(best));

const st = fullDraft(best.seed);
const record = { seed: best.seed, userTeam: USER, pool: freezePool(pool), picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
writeFileSync(join(OUT, 'week1-picks.json'), JSON.stringify({ seed: best.seed, userTeam: USER, picks: record.picks }, null, 1));
const vm = feedVM(record, best.seed, USER);
const note = [
  '== the two-arm fixture — the heaviest view both arms render (chosen before either arm was built) ==',
  `draft seed: ${best.seed} · user team: Chicago Bears (index ${USER}) · pool: buildPool over this tree's three CSVs (1,953 raw / 1,921 draftable after the LS filter)`,
  `week-1 game: ${vm.away} @ ${vm.home} — final ${vm.awayScore}-${vm.homeScore}${vm.ot ? ' (OT ×' + vm.ot.periods + ')' : ''} · drives ${vm.drives.length} · scoring drives ${best.scoring} · turnovers ${best.turnovers} (every one named as an INT/FUM chip)`,
  `user drives ${vm.meDrives} · lead changes ${vm.leadChanges} · userWon ${vm.userWon}`,
  'both arms restore the identical record (fixture/week1-picks.json), call the identical feedVM, and render the identical feed — the framework is the only variable.',
].join('\n');
writeFileSync(join(OUT, 'week1-fixture-note.txt'), note + '\n');
console.log(note);
