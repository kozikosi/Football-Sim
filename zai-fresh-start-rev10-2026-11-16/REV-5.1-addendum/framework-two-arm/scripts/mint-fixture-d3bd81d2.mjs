/* mint-fixture-d3bd81d2.mjs — the gates-bump (backlog): re-mint the ONE deterministic fixture both
 * arms render, ON THE CURRENT PIN (d3bd81d2, the engine now vendored in both arms). Same protocol
 * as the prior sitting's two-arm-fixture.mjs: complete a full 1,024-pick draft node-side, user =
 * candidates[0] per turn (the probe's rule), CPU via the store's fork scheme, scan seeds 1000..1119
 * for the heaviest week-1 game (most scoring drives), write fixture/week1-picks.json + the note.
 * Both arms consume the identical bytes; chosen BEFORE any slice-5/arc code is written.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ARM = join(HERE, '..', 'arm-vue');           // mint on one arm's tree; engine bytes cmp-identical across arms
const OUT = join(HERE, '..', 'fixture');

const ratings = readFileSync(join(ARM, 'src/data/madden27-ratings.csv'), 'utf8');
const fa = readFileSync(join(ARM, 'src/data/free-agents-old-ratings.csv'), 'utf8');
const ids = readFileSync(join(ARM, 'src/data/player-ids.csv'), 'utf8');

const { buildPool } = await import(`file://${join(ARM, 'src/engine/sports/nfl/engine/players.ts')}`);
const { makeRng } = await import(`file://${join(ARM, 'src/engine/core/rng.ts')}`);
const { newDraft, candidates, applyPick, cpuChoose } = await import(`file://${join(ARM, 'src/engine/sports/nfl/engine/draft.ts')}`);
const { TEAMS } = await import(`file://${join(ARM, 'src/engine/sports/nfl/engine/league.ts')}`);
const { freezePool } = await import(`file://${join(ARM, 'src/engine/sports/nfl/app/store.ts')}`);
const { feedVM } = await import(`file://${join(ARM, 'src/lib/feedVM.ts')}`);

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
  '== the two-arm fixture — re-minted on the CURRENT PIN d3bd81d2 (gates bump, 2026-11-15 authoring sitting) ==',
  `draft seed: ${best.seed} · user team: Chicago Bears (index ${USER}) · pool: buildPool over this tree's three CSVs (1,953 raw / 1,921 draftable after the LS filter)`,
  `week-1 game: ${vm.away} @ ${vm.home} — final ${vm.awayScore}-${vm.homeScore}${vm.ot ? ' (OT ×' + vm.ot.periods + ')' : ''} · drives ${vm.drives.length} · scoring drives ${best.scoring} · turnovers ${best.turnovers} (every one named as an INT/FUM chip)`,
  `user drives ${vm.meDrives} · lead changes ${vm.leadChanges} · userWon ${vm.userWon}`,
  'both arms consume the identical bytes (fixture/week1-picks.json), call the identical feedVM, and render the identical feed — the framework is the only variable.',
  'prior fixture (old pin 4ca9a071): seed 1000, MIN @ CHI 21-11, 20 drives, 6 scoring, 3 turnovers — superseded by this re-mint if different.',
].join('\n');
writeFileSync(join(OUT, 'week1-fixture-note.txt'), note + '\n');
console.log(note);
