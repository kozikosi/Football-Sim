// tools/golden.ts — generates the shared fixtures + golden expected outputs.
// Every prototype renders from THESE numbers; the council can re-derive them
// with `npm run golden` and compare by hash.
import { writeFileSync, mkdirSync } from 'node:fs';
import {
  SLOT_IDS, teamRatings, leagueBaseline, simulateWithFocus, priorityBoard,
  autoPickFocus, FOCUSES, FOCUS_VERSION, STRONG_PASS, STRONG_FRONT,
  type SimInput,
} from '../src/index.ts';

const SEEDS = [20261113, 424242, 777001];
const MATCHUPS: Array<{ name: string; homeFocus: string; awayFocus: string; auto: boolean }> = [
  { name: 'user-westcoast-vs-cpu-auto', homeFocus: 'west-coast', awayFocus: 'auto', auto: true },
  { name: 'user-groundpound-vs-cpu-deep', homeFocus: 'ground-pound', awayFocus: 'deep-passing', auto: true },
  { name: 'user-rpo-vs-cpu-auto-noauto', homeFocus: 'rpo', awayFocus: 'auto', auto: false },
];

mkdirSync('fixtures', { recursive: true });

const teams = {
  strongPass: STRONG_PASS,
  strongFront: STRONG_FRONT,
};

const boards: Record<string, unknown> = {};
for (const f of FOCUSES) {
  boards[f.id] = priorityBoard(STRONG_PASS, f.id).filter((r) => r.wins > 0);
}

const games: Array<Record<string, unknown>> = [];
for (const m of MATCHUPS) {
  for (const seed of SEEDS) {
    const input: SimInput = {
      homeSlots: STRONG_PASS,
      awaySlots: STRONG_FRONT,
      homeFocus: m.homeFocus,
      awayFocus: m.awayFocus,
      seed,
      playoff: false,
      quarterAutomatics: m.auto,
    };
    const out = simulateWithFocus(input);
    games.push({
      name: m.name,
      seed,
      homeScore: out.result.homeScore,
      awayScore: out.result.awayScore,
      q4StartDiff: out.q4StartDiff,
      focusLog: out.focusLog,
      homeStats: out.result.stats.home,
      awayStats: out.result.stats.away,
    });
  }
}

const autoExamples = {
  leading: autoPickFocus({ diff: 10, quarter: 3, oppSlots: STRONG_FRONT }),
  trailingBig: autoPickFocus({ diff: -14, quarter: 4, oppSlots: STRONG_FRONT }),
  closeStrongFront: autoPickFocus({ diff: 0, quarter: 1, oppSlots: STRONG_FRONT }),
  closeStrongCov: autoPickFocus({ diff: 0, quarter: 1, oppSlots: STRONG_PASS }),
};

const golden = { contractVersion: '1.0.0', focusVersion: FOCUS_VERSION, teams, boards, games, autoExamples };
writeFileSync('fixtures/golden.json', JSON.stringify(golden, null, 2));
console.log('fixtures/golden.json written');
console.log('games:', games.map((g) => `${g.name}/${g.seed}: ${g.homeScore}-${g.awayScore} (q4diff ${g.q4StartDiff}, log ${Array.isArray(g.focusLog) ? (g.focusLog as unknown[]).length : 0})`).join('\n'));
console.log('autoExamples:', autoExamples);
console.log('slots:', SLOT_IDS.length);
