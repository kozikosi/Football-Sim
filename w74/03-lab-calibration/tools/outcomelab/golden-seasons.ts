// Golden-file seed test (P-256) — Z.ai executor seat, w74.
//
// What this is: the w72 §9 order-independence proof extended to FULL SEASONS, pinned as
// a golden file CI can verify in seconds. Five seeds × one full season each; the digest
// covers every game's box-score essentials (both scores + both TD counts, in schedule
// order, plus the champion). Same engine + same seed on any machine → same digest.
//
// Run:   node --experimental-strip-types tools/outcomelab/golden-seasons.ts [--write]
// Out:   tools/outcomelab/golden-seasons.json (written only with --write, on purpose)
// CI:    test/nfl/golden-seasons.test.ts re-runs the seasons and compares against the
//        committed file. A golden changes only WITH a written reason in the same diff
//        (incidents.md entry 3's rule).
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { makeRng } from '../../src/core/rng.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { simulateSeason } from '../../src/sports/nfl/engine/season.ts';
import { fixtureLeague } from '../../test/nfl/fixture.ts';

const SEEDS = [11, 22, 33, 44, 55];
const teams = fixtureLeague(777).teams.map((t) => ({ name: t.name, ratings: t.ratings }));

// Per-season digest: every regular-season + playoff game in order as `w<h>|<home>|<away>|<hs>|<as>|<htd>|<atd>`,
// then `champ|<name>`. Scores and TD counts are the engine's own numbers; nothing display-derived.
export function seasonDigest(seed: number): { digest: string; games: number } {
  const s = simulateSeason(teams, makeRng(seed), { year: 2026 });
  const lines = [...s.games, ...s.playoffs].map(
    (g) => `w${g.week}|${g.home}|${g.away}|${g.result.homeScore}|${g.result.awayScore}|${tds(g.result, 'home')}|${tds(g.result, 'away')}`);
  lines.push(`champ|${s.champion}`);
  return { digest: createHash('sha256').update(lines.join('\n')).digest('hex'), games: lines.length };
}
function tds(r: { events: { side: string; kind: string }[] }, side: 'home' | 'away'): number {
  return r.events.filter((e) => e.side === side && (e.kind === 'TD' || e.kind === 'DEF_TD')).length;
}

const golden = {
  comment: '5 seeds x 1 season, box-score digest. Re-pin only with a written reason in the same diff.',
  engine: 'season.ts via public API; league fixtureLeague(777)',
  seeds: SEEDS,
  digests: Object.fromEntries(SEEDS.map((s) => [s, seasonDigest(s).digest])),
  gamesPerSeason: seasonDigest(SEEDS[0]).games,
};

if (process.argv.includes('--write')) {
  const p = new URL('golden-seasons.json', import.meta.url).pathname;
  fs.writeFileSync(p, JSON.stringify(golden, null, 2) + '\n');
  console.log('written: ' + p);
}
for (const s of SEEDS) console.log(`seed ${s}: ${golden.digests[s].slice(0, 16)}… (${golden.gamesPerSeason} games)`);
