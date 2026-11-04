// The 17-game schedule (NFL formula, council P-207 data, GPT/Groq 30 Oct, checked against NFL Football Operations as REPORTED):
//   6 division games (home and away against each of 3) + 4 vs one other division of the same conference (3-year rotation)
//   + 4 vs one division of the other conference (4-year rotation) + 2 vs the same-place teams of the two remaining divisions of the
//   conference (previous-year standings) + 1 vs the same-place team of one more division of the other conference.
// Home games: 8 or 9; the conference with the extra home game alternates by year (2026: NFC). 18 weeks, one bye each (weeks 5-14),
// week 18 is all division games. Opponents come from rotations by `year`; the previous-year division rank is an input.
import type { Rng } from './rng.ts';
import { DIVS, divisionTeams } from './league.ts';
import type { Conf, Div } from './league.ts';

export type GameKind = 'div' | 'conf4' | 'inter4' | 'conf2' | 'inter1';
export interface Game { week: number; home: string; away: string; kind: GameKind }
type Raw = { home: string; away: string; kind: GameKind };

const MATCHINGS: readonly (readonly [readonly [Div, Div], readonly [Div, Div]])[] = [
  [['East', 'North'], ['South', 'West']], [['East', 'South'], ['North', 'West']], [['East', 'West'], ['North', 'South']],
];

// rank: team -> 1..4 within its division (last season's finish; unique within a division)
export function pairings(year: number, rank: Readonly<Record<string, number>>): Raw[] {
  const T = (c: Conf, d: Div): string[] => divisionTeams(c, d).slice().sort((a, b) => rank[a] - rank[b]);
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) {
    const rs = divisionTeams(c, d).map((n) => rank[n]).sort();
    if (rs.join() !== '1,2,3,4') throw new Error(`schedule: ranks in ${c} ${d} must be 1-4 once each`);
  }
  const g: Raw[] = [];
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) {
    const ts = T(c, d);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { g.push({ home: ts[i], away: ts[j], kind: 'div' }); g.push({ home: ts[j], away: ts[i], kind: 'div' }); }
  }
  const mat = MATCHINGS[((year % 3) + 3) % 3];
  for (const c of ['AFC', 'NFC'] as const) for (const [dA, dB] of mat) {
    const A = T(c, dA), B = T(c, dB);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g.push((i + j + year) % 2 === 0 ? { home: A[i], away: B[j], kind: 'conf4' } : { home: B[j], away: A[i], kind: 'conf4' });
  }
  const sigma = (i: number) => (i + year) % 4;
  const pi = (i: number) => (i + year + 1 + (Math.floor(year / 4) % 3)) % 4;
  DIVS.forEach((d, i) => {
    const A = T('AFC', d), B = T('NFC', DIVS[sigma(i)]);
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) g.push((a + b + year) % 2 === 0 ? { home: A[a], away: B[b], kind: 'inter4' } : { home: B[b], away: A[a], kind: 'inter4' });
  });
  for (const c of ['AFC', 'NFC'] as const) {
    const [[d, p], [e, f]] = mat;
    const edges: [Div, Div][] = [[d, e], [e, p], [p, f], [f, d]];
    for (const [host, visit] of edges) {
      const H = T(c, host), V = T(c, visit);
      for (let r = 0; r < 4; r++) g.push(year % 2 === 0 ? { home: H[r], away: V[r], kind: 'conf2' } : { home: V[r], away: H[r], kind: 'conf2' });
    }
  }
  const nfcHosts = year % 2 === 0;
  DIVS.forEach((d, i) => {
    const A = T('AFC', d), B = T('NFC', DIVS[pi(i)]);
    for (let r = 0; r < 4; r++) g.push(nfcHosts ? { home: B[r], away: A[r], kind: 'inter1' } : { home: A[r], away: B[r], kind: 'inter1' });
  });
  return g;
}

const BYE_WEEKS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// byes per week: 32 teams, even numbers so the other teams pair off
const BYE_COUNTS = [4, 4, 4, 4, 4, 4, 2, 2, 2, 2];

export function buildSchedule(rng: Rng, year: number, rank: Readonly<Record<string, number>>, maxTries = 400): Game[] {
  const raw = pairings(year, rank);
  const teams = [...new Set(raw.map((r) => r.home))];
  for (let attempt = 0; attempt < maxTries; attempt++) {
    const res = tryAssign(raw, teams, rng);
    if (res) return res;
  }
  throw new Error('schedule: no weekly assignment found');
}

function shuffle<T>(rng: Rng, xs: T[]): T[] { for (let i = xs.length - 1; i > 0; i--) { const j = rng.int(0, i); [xs[i], xs[j]] = [xs[j], xs[i]]; } return xs; }

function tryAssign(raw: Raw[], teams: string[], rng: Rng): Game[] | null {
  const week: number[] = new Array(raw.length).fill(0);
  // week 18: one perfect matching inside each division
  const byDivPair = new Map<string, number[]>();
  raw.forEach((r, i) => { if (r.kind === 'div') { const k = [r.home, r.away].sort().join('|'); (byDivPair.get(k) ?? byDivPair.set(k, []).get(k)!).push(i); } });
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) {
    const ts = shuffle(rng, divisionTeams(c, d));
    for (const [a, b] of [[ts[0], ts[1]], [ts[2], ts[3]]]) { const ids = byDivPair.get([a, b].sort().join('|'))!; week[ids[rng.int(0, 1)]] = 18; }
  }
  const byeAt = new Map<string, number>();
  const slots: number[] = [];
  BYE_WEEKS.forEach((w, i) => { for (let k = 0; k < BYE_COUNTS[i]; k++) slots.push(w); });
  shuffle(rng, slots);
  shuffle(rng, teams.slice()).forEach((tm, i) => byeAt.set(tm, slots[i]));
  const remaining = new Set<number>(raw.map((_, i) => i).filter((i) => week[i] === 0));
  for (let w = 1; w <= 17; w++) {
    const active = teams.filter((tm) => byeAt.get(tm) !== w);
    const matched = matchWeek(raw, remaining, active, rng);
    if (!matched) return null;
    for (const i of matched) { week[i] = w; remaining.delete(i); }
  }
  if (remaining.size) return null;
  return raw.map((r, i) => ({ ...r, week: week[i] }));
}

function matchWeek(raw: Raw[], remaining: Set<number>, active: string[], rng: Rng): number[] | null {
  const act = new Set(active);
  const opts = new Map<string, number[]>();
  for (const tm of active) opts.set(tm, []);
  for (const i of remaining) { const r = raw[i]; if (act.has(r.home) && act.has(r.away)) { opts.get(r.home)!.push(i); opts.get(r.away)!.push(i); } }
  const used = new Set<string>(), chosen: number[] = [];
  let nodes = 0;
  const go = (): boolean => {
    if (++nodes > 4000) return false;
    let best: string | null = null, bestN = 1e9;
    for (const tm of active) if (!used.has(tm)) {
      const n = opts.get(tm)!.filter((i) => !used.has(raw[i].home) && !used.has(raw[i].away)).length;
      if (n < bestN) { bestN = n; best = tm; }
    }
    if (best === null) return true;
    if (bestN === 0) return false;
    const cand = shuffle(rng, opts.get(best)!.filter((i) => !used.has(raw[i].home) && !used.has(raw[i].away)));
    for (const i of cand) {
      used.add(raw[i].home); used.add(raw[i].away); chosen.push(i);
      if (go()) return true;
      used.delete(raw[i].home); used.delete(raw[i].away); chosen.pop();
    }
    return false;
  };
  return go() ? chosen.slice() : null;
}
