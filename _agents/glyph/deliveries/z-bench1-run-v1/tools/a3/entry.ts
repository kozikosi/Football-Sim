// A3 cross-engine entry — the Tier-1 core workloads as one bundle-able module (no node imports, no csv imports:
// the host passes the three CSV strings, so Node and every browser run BYTE-IDENTICAL workload code).
import { buildPool } from '../../colors/src/sports/nfl/engine/players.ts';
import { makeRng } from '../../colors/src/core/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft, snakeOrder } from '../../colors/src/sports/nfl/engine/draft.ts';
import { freezePool, restoreDraft } from '../../colors/src/sports/nfl/app/store.ts';
import { startSeason, playWeek, isFinished, table } from '../../colors/src/sports/nfl/engine/seasonrun.ts';
import { teamRatings, spotsOf, leagueBaseline } from '../../colors/src/sports/nfl/engine/ratings.ts';
import { lineupFor } from '../../colors/src/sports/nfl/engine/lineup.ts';
import { returnerRating } from '../../colors/src/sports/nfl/engine/returner.ts';
import { netPts } from '../../colors/src/sports/nfl/engine/value.ts';
import { TEAMS } from '../../colors/src/sports/nfl/engine/league.ts';
import { selectBoard } from '../../colors/src/sports/nfl/app/selectors.ts';

// minimal sha256 over text (sync): the node tier1 uses crypto; here we compare the ENGINE's own
// datasetHash (async sha256 via crypto.subtle — available in browsers) plus structural JSON digests.
export async function run(csvs: { ratings: string; fa: string; ids: string }) {
  const out = {};
  const pool = buildPool(csvs.ratings, csvs.fa, csvs.ids);
  const rows = freezePool(pool);
  out.poolCount = pool.length;
  out.datasetHash = await (await import('../../colors/src/core/hash.ts')).datasetHash(rows);

  const draft = (seed, rounds, userTeam) => {
    const order = snakeOrder(32, rounds);
    const rng = makeRng(seed);
    const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG, order);
    const rr = rng.fork('run');
    runDraft(st, rr.fork('picks'), userTeam === undefined ? undefined : { team: userTeam, policy: 'greedy' });
    const rec = { seed, userTeam: userTeam ?? -1, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
    const recText = JSON.stringify(rec);
    return { logSha: digest(recText), pos: st.pos, firstPicks: st.log.slice(0, 5).map((k) => [k.overall, k.team, k.player.id, k.slot]) };
  };
  out.d32rS1U0 = draft(1, 32, 0);
  out.d5rS1U0 = draft(1, 5, 0);

  // season
  const rng = makeRng(777);
  const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  const raw = st.rosters.map((r) => Object.values(r)).map((pl) => (['4-3', '3-4']).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg0 = leagueBaseline(raw.map((b) => b[0].R));
  const teams = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, ratings: best.R }; });
  let s = startSeason(teams, { seed: 1, year: 2026 });
  let weeks = 0;
  while (!isFinished(s)) { s = playWeek(teams, s).state; weeks++; }
  out.season = { weeks, champion: s.champion, tableSha: digest(JSON.stringify(table(s))), summarySha: digest(JSON.stringify({ scores: s.scores, playoffs: s.playoffs, champion: s.champion })) };

  // W5 r1 u0 VM text (store-flow: advance mirrors store.ts)
  const poolRows = freezePool(pool);
  const rec0 = { seed: 1, userTeam: 0, picks: [], pool: poolRows };
  const st5 = restoreDraft(rec0);
  const cpu = makeRng(1).fork('cpu');
  while (st5.pos < st5.order.length) { const team = st5.order[st5.pos]; if (team === undefined || team === 0) break; const c = (await import('../../colors/src/sports/nfl/engine/draft.ts')).cpuChoose(st5, team, cpu.fork('p' + st5.pos)); (await import('../../colors/src/sports/nfl/engine/draft.ts')).applyPick(st5, team, c.player, c.slot); }
  const vm = selectBoard({ record: { ...rec0, picks: st5.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) }, draft: st5, status: 'drafting', error: null }, { sort: 'wins', limit: 60 });
  out.w5r1u0vmSha = digest(JSON.stringify(vm));
  out.w5r1u0rows = vm.rows.length;

  return out;
}

function digest(text) {
  // FNV-1a 32-bit + length — NOT comparable to node's sha256; identity is judged against the SAME
  // digest computed in Node over the same text (node side computes it in a3.mjs via crypto over the
  // tier1 JSONs). Cross-ENGINE comparison uses this digest on both sides, which is the A3 question.
  let h = 2166136261 >>> 0;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return (h >>> 0).toString(16).padStart(8, '0') + ':' + text.length;
}


