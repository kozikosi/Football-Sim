// Slice 5 — the shareable view-models (N2: static brag shareables + the seed card).
// EVERY number comes from the engine's own save or the engine's own game — nothing is invented here:
//   game brag    — feedVM()/playUserWeek() (the SAME engine path the feed renders; the battery proved
//                  the recompute in slice 4), so the card's scoreline IS the played game
//   season brag  — the SeasonEnvelope the engine wrote (the payload's own table row, champion,
//                  userOutcome, userResults; the envelope's own saveId/engineVersion/dataVersion)
//   seed card    — the seed the run forks from + the provenance (the pinned engine, the dataset stamp,
//                  the save identity) + the replay recipe. The seed is the proof; the card is the display.
// Plain JSON out (the view-model rule); the screen and the canvas painter both render from these.
import { feedVM, playUserWeek } from './feedVM.ts';
import type { FeedVM } from './feedVM.ts';
import { TEAMS } from '../engine/sports/nfl/engine/league.ts';
import type { SeasonEnvelope, DraftEnvelope, WeekEnvelope } from '../engine/sports/nfl/app/saves.ts';
import { abbrOf } from './abbr.ts';
import { inkOf } from './ink.ts';
import type { TeamInk } from './ink.ts';

export interface BragFact { label: string; value: string }

export interface BragVM {
  kind: 'game' | 'season';
  eyebrow: string;            // the small-caps line over the headline (brand · context)
  headline: string;           // the result, one line: 'CHI 27 · DET 21' / 'BUF · 10-7-0'
  headlineInks: { me: string; opp: string | null };   // the two segments' inks (the snapshot's own colors)
  outcome: string;            // the outcome line under the headline
  teamName: string;           // the team the brag belongs to (the user's team)
  teamInk: TeamInk;
  facts: BragFact[];          // the engine-true specifics (drives, lead changes / record, points, path)
  proof: BragFact[];          // the proof block (seed, engine derivation, engine pin, dataset, save)
  foot: string;               // the static-artifact line
}

export interface SeedVM {
  title: string;              // 'THE SEED — the run's fingerprint'
  seedLabel: string;          // 'draft seed' / 'season seed'
  seedValue: string;
  derivedLabel: string;       // what the engine derives FROM it (its own fork law)
  derivedValue: string;
  steps: string[];            // the replay recipe (honest: what replays, what stays the user's)
  provenance: BragFact[];     // engine pin / dataset stamp / save identity
  foot: string;
}

export interface ShareVM { vm: BragVM | null; seed: SeedVM; note: string }

const DATASET_SHORT = (dv: string): string => (dv.length > 19 ? dv.slice(0, 19) + '…' : dv);   // display shaping only

// ---------------------------------------------------------------- the game brag (the played week-1 game)

export function gameBrag(record: unknown, seed: number, userTeam: number, enginePin: string, dataVersion: string): { vm: BragVM; feed: FeedVM; gs: number } {
  const feed = feedVM(record as never, seed, userTeam);            // the feed's own VM (slice 4's engine-true path)
  const { gs } = playUserWeek(record as never, seed, userTeam);    // the engine's own gameSeed derivation
  const me = TEAMS[userTeam];
  const meHome = feed.home === me.name;
  const meScore = meHome ? feed.homeScore : feed.awayScore;
  const oppName = meHome ? feed.away : feed.home;
  const oppScore = meHome ? feed.awayScore : feed.homeScore;
  const oppAbbr = meHome ? feed.awayAbbr : feed.homeAbbr;
  const won = feed.userWon;
  const vm: BragVM = {
    kind: 'game',
    eyebrow: `76 PANCAKES · WEEK ${feed.week} · ${feed.year}`,
    headline: `${abbrOf(me.name)} ${meScore} · ${oppAbbr} ${oppScore}`,
    headlineInks: { me: inkOf(me.name).pale, opp: inkOf(oppName).pale },
    outcome: won === null
      ? `A TIE${feed.ot ? ' — OT ×' + feed.ot.periods : ''}`
      : (won ? 'VICTORY' : 'DEFEAT') + (feed.ot ? ' — FINAL, OT ×' + feed.ot.periods : ' — FINAL'),
    teamName: me.name,
    teamInk: inkOf(me.name),
    facts: [
      { label: 'drives', value: String(feed.drives.length) },
      { label: 'lead changes', value: String(feed.leadChanges) },
      { label: 'my drives', value: String(feed.meDrives) },
      ...(feed.ot && !feed.ot.tie ? [{ label: 'regulation', value: `${feed.regAway}–${feed.regHome}` }] : []),
    ],
    proof: [
      { label: 'draft seed', value: String(seed) },
      { label: 'gameSeed (the engine\'s own derivation)', value: String(gs) },
      { label: 'engine', value: enginePin },
      { label: 'dataset', value: dataVersion },
    ],
    foot: 'a static card from the engine\'s own game — the seed is the proof, the PNG carries everything it needs',
  };
  return { vm, feed, gs };
}

// ---------------------------------------------------------------- the season brag (a real season save)

const OUTCOME_LINE: Record<string, string> = {
  champion: 'CHAMPIONS — the Super Bowl is yours',
  'super-bowl-loss': 'fell in the Super Bowl',
  conference: 'fell in the Conference round',
  divisional: 'fell in the Divisional round',
  'wild-card': 'fell in the Wild-Card round',
  'missed-playoffs': 'missed the playoffs',
};

export function seasonBrag(env: SeasonEnvelope): BragVM {
  const p = env.payload;
  const row = p.table.find((r) => r.team === p.userTeam);
  if (!row) throw new Error('season brag: the payload\'s table has no row for ' + p.userTeam);
  const rec = `${row.w}-${row.l}-${row.t}`;
  const rounds = ['Wild Card', 'Divisional', 'Conference', 'Super Bowl'].filter((r) => p.userResults.some((g) => g.round === r));
  const path = rounds.length ? rounds.join(' → ') : 'regular season only';
  const vm: BragVM = {
    kind: 'season',
    eyebrow: `76 PANCAKES · THE ${p.year} SEASON`,
    headline: p.userOutcome === 'champion' ? `${abbrOf(p.userTeam)} WIN THE SUPER BOWL` : `${abbrOf(p.userTeam)} · ${rec}`,
    headlineInks: { me: inkOf(p.userTeam).pale, opp: null },
    outcome: OUTCOME_LINE[p.userOutcome] + (p.champion !== p.userTeam ? ` · champions: ${p.champion}` : ''),
    teamName: p.userTeam,
    teamInk: inkOf(p.userTeam),
    facts: [
      { label: 'record', value: `${rec} (the engine's own table)` },
      { label: 'points', value: `${row.pf} for · ${row.pa} against` },
      { label: 'games', value: `${p.userResults.length} (17 + the playoffs)` },
      { label: 'path', value: path },
    ],
    proof: [
      { label: 'season seed', value: String(p.seed) },
      { label: 'the run', value: `year ${p.year} · run ${p.run}` },
      { label: 'engine', value: env.engineVersion },
      { label: 'dataset', value: env.dataVersion },
      { label: 'save', value: `${env.saveId} · rev ${env.saveRevision}` },
    ],
    foot: 'a static card from the engine\'s own saved season — the seed is the proof, the PNG carries everything it needs',
  };
  return vm;
}

// ---------------------------------------------------------------- the seed card (the companion artifact)

export function seedCardForGame(seed: number, gs: number, teamName: string, enginePin: string, dataVersion: string): SeedVM {
  return {
    title: 'THE SEED — the run\'s fingerprint',
    seedLabel: 'draft seed',
    seedValue: String(seed),
    derivedLabel: 'the engine\'s own fork',
    derivedValue: `gameSeed ${gs} (week 1) — the board, the CPU picks and the game all fork from the seed`,
    steps: [
      `open this build with ?dev=1 and choose ${teamName}`,
      `enter the seed ${seed} at the start — the board and the week-1 game replay identically`,
      'same seed · same dataset · same engine → the same run (your own picks are the one free variable)',
    ],
    provenance: [
      { label: 'engine', value: enginePin },
      { label: 'dataset', value: DATASET_SHORT(dataVersion) },
    ],
    foot: 'share this card and anyone can replay the same run on the pinned engine',
  };
}

export function seedCardFromSave(env: SeasonEnvelope | DraftEnvelope | WeekEnvelope): SeedVM {
  const p = env.payload as SeasonEnvelope['payload'] & DraftEnvelope['payload'] & WeekEnvelope['payload'];
  const isSeason = env.kind === 'season';
  const teamName = isSeason || env.kind === 'week' ? p.userTeam : TEAMS[p.userTeam]?.name ?? String(p.userTeam);
  const steps = isSeason
    ? [
        `the engine replays the whole season from the seed ${p.seed} (year ${p.year}, run ${p.run}) on the pinned engine + dataset`,
        'the same schedule, the same game seeds, the same results — the champion comes out identical',
        'the battery proved it node-side: the replay landed the same champion and the same record row',
      ]
    : [
        `open this build with ?dev=1 and choose ${teamName}`,
        `enter the seed ${p.seed} at the start — the board (and, once the rosters are set, the week-1 game) replays identically`,
        'same seed · same dataset · same engine → the same run (your own picks are the one free variable)',
      ];
  return {
    title: 'THE SEED — the run\'s fingerprint',
    seedLabel: isSeason ? 'season seed' : 'draft seed',
    seedValue: String(p.seed),
    derivedLabel: 'the run',
    derivedValue: isSeason ? `year ${p.year} · run ${p.run}` : `saved as a ${env.kind.toUpperCase()} envelope (rev ${env.saveRevision})`,
    steps,
    provenance: [
      { label: 'engine', value: env.engineVersion },
      { label: 'dataset', value: DATASET_SHORT(env.dataVersion) },
      { label: 'save', value: `${env.saveId} · rev ${env.saveRevision}` },
    ],
    foot: 'share this card and anyone can replay the same run on the pinned engine',
  };
}

/** The whole share screen's data, from a real save (season brag; seed card for every kind). */
export function saveShare(env: SeasonEnvelope | DraftEnvelope | WeekEnvelope): ShareVM {
  const vm = env.kind === 'season' ? seasonBrag(env as SeasonEnvelope) : null;
  return {
    vm,
    seed: seedCardFromSave(env),
    note: vm
      ? 'rendered from the save itself — every number is the payload\'s own; nothing added'
      : 'no result stored in this save yet — the seed card shares the run (a brag needs a played game or season)',
  };
}

/** The whole share screen's data, from the live session's played game (the engine's own week-1 game). */
export function gameShare(record: unknown, seed: number, userTeam: number, enginePin: string, dataVersion: string): ShareVM {
  const { vm, gs } = gameBrag(record, seed, userTeam, enginePin, dataVersion);
  return {
    vm,
    seed: seedCardForGame(seed, gs, vm.teamName, enginePin, dataVersion),
    note: 'rendered from the engine\'s own game — every number is the engine\'s own; nothing added',
  };
}
