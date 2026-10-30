// Drive generator (engine step 6). One game is a list of drives; the score, the yards, the turnovers, the sacks and the clock
// are all READ OFF that list, so the box score and the story cannot disagree.
//   1. realise the totals the matchup model implies (rush yards, pass yards, giveaways, sacks, points), as Pre-Colors did;
//   2. split each team's points into touchdowns / conversions / field goals / defensive scores / safeties;
//   3. lay those results, the giveaways and the rest (punts, turnovers on downs) onto each team's drives, in time order;
//   4. spread the yards, plays, sacks and the 60 minutes over the drives;
//   5. a tie after 60 minutes goes to overtime under the CURRENT rules (below).
// No penalties (Owner, 28 Oct). Pure: an Rng comes in, nothing else is read (test/purity.test.ts).
// Drive-shape numbers (about 11.5 drives a team, 2:30 a drive, 5-6 plays, share of drives ending in each way) are INFERRED from
// general NFL knowledge until the council delivers P-205; kicking make rate is INFERRED until P-204.
// Overtime: the 2025 rule change gives BOTH teams a possession in regular-season overtime too (VERIFIED by search 30 Oct:
// owners approved it, 10-minute period); a tie after both possessions goes to sudden death. Playoffs: 15-minute periods, play
// until there is a winner. A regular-season game can still end tied when the 10 minutes run out (INFERRED, the source is silent).
import { clamp } from './matchup.ts';
import type { Matchup } from './matchup.ts';
import type { Rng } from './rng.ts';
import { BASE_PTS, HOME_FIELD, LAM_SACK, LAM_TO, PASS_BASE, PT_PASS, PT_RUSH, PT_SACK, PT_TO, PTS_NOISE, RUSH_BASE } from './specs.ts';

export type Side = 'home' | 'away';
export type DriveEnd = 'TD' | 'FG' | 'FG_MISS' | 'PUNT' | 'INT' | 'FUM' | 'DOWNS' | 'HALF' | 'SAFETY';
export type Conv = 'xp' | 'xp_miss' | 'two' | 'two_fail' | 'none';
export interface Drive {
  side: Side;            // the team with the ball
  period: number;        // 1-4 regulation, 5+ overtime
  start: number;         // game seconds elapsed when the drive began
  secs: number;
  plays: number;         // includes sacks
  rush: number; pass: number;
  sacks: number;         // sacks the team with the ball took on this drive
  end: DriveEnd;
  pts: number;           // points the team with the ball scored on this drive (touchdown + conversion, or field goal)
  conv?: Conv;
  oppPts: number;        // points the OTHER team scored off this drive (defensive touchdown 7, safety 2)
  defTD: boolean;        // the giveaway was returned for a touchdown
}
export type ScoreKind = 'TD' | 'FG' | 'DEF_TD' | 'SAFETY';
export interface ScoreEvent { side: Side; kind: ScoreKind; pts: number; conv?: Conv; drive: number; period: number; at: number }
export interface TeamGameStats { rush: number; pass: number; yards: number; plays: number; giveaways: number; takeaways: number; sacksTaken: number; drives: number; top: number; fgMade: number; fgMissed: number }
export interface GameResult {
  homeScore: number; awayScore: number; regHome: number; regAway: number;
  drives: Drive[]; events: ScoreEvent[]; stats: Record<Side, TeamGameStats>;
  agg: Record<Side, { rush: number; pass: number; to: number; sacks: number }>;   // the realised regulation totals the drives were built to hit
  ot: null | { first: Side; periods: number; tie: boolean };
  otSecs: number;
}
export interface GameOptions { playoff: boolean; homeField?: number; otLimit?: number }   // otLimit: overtime period length in seconds (tests shorten it)

const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');

function poisson(rng: Rng, lam: number): number {
  if (lam <= 0) return 0;
  const L = Math.exp(-lam); let k = 0, p = 1;
  do { k++; p *= rng.next(); } while (p > L);
  return k - 1;
}
function chance(rng: Rng, p: number): boolean { return rng.next() < p; }
function weightedIndex(rng: Rng, w: readonly number[]): number {
  let t = 0; for (const x of w) t += x;
  let r = rng.next() * t;
  for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i; }
  return w.length - 1;
}
function shuffle<T>(rng: Rng, xs: T[]): T[] {
  for (let i = xs.length - 1; i > 0; i--) { const j = rng.int(0, i); [xs[i], xs[j]] = [xs[j], xs[i]]; }
  return xs;
}
// integer shares of `total` in proportion to w (largest remainder), so the parts add up exactly
export function allocate(total: number, w: readonly number[]): number[] {
  const s = w.reduce((a, b) => a + b, 0);
  const raw = w.map((x) => (total * x) / s), fl = raw.map(Math.floor);
  let rem = total - fl.reduce((a, b) => a + b, 0);
  const order = raw.map((x, i) => [x - fl[i], i] as const).sort((a, b) => b[0] - a[0]);
  for (let j = 0; rem > 0; j++, rem--) fl[order[j % order.length][1]]++;
  return fl;
}
export function realisticScore(s: number, rng: Rng): number {
  if (s === 1) return chance(rng, 0.5) ? 0 : 3;
  if (s === 2) return 3;
  if (s === 4) return chance(rng, 0.5) ? 3 : 6;
  if (s === 5) return chance(rng, 0.5) ? 6 : 3;
  return s;
}
const offFeasible = (r: number): boolean => r === 0 || r === 3 || r >= 6;   // a score made only of touchdowns (6-8) and field goals (3)

// ---- step 1: realised totals ----
function realise(m: Matchup, rng: Rng) {
  return {
    rush: clamp(Math.round(m.expRush * Math.exp(0.30 * rng.normal() - 0.045)), 15, 345),
    pass: clamp(Math.round(m.expPass * Math.exp(0.26 * m.vm * rng.normal() - 0.0338 * m.vm * m.vm)), 45, 520),
    to: clamp(poisson(rng, m.lamTO), 0, 6),
    sacks: clamp(poisson(rng, m.lamSack), 0, 9),
  };
}

// ---- step 2: what a final score is made of ----
export interface Comp { td: number; fg: number; convs: Conv[]; dTD: number; sf: number }
const convPts = (c: Conv): number => (c === 'xp' ? 1 : c === 'two' ? 2 : 0);
export function decompose(S: number, oppGiveaways: number, rng: Rng): Comp {
  let dTD = 0;
  for (let i = 0; i < oppGiveaways; i++) if (chance(rng, 0.12)) dTD++;
  while (dTD > 0 && !offFeasible(S - 7 * dTD)) dTD--;
  let sf = chance(rng, 0.035) && offFeasible(S - 7 * dTD - 2) ? 1 : 0;
  const R = S - 7 * dTD - 2 * sf;
  if (!offFeasible(R)) { sf = 0; dTD = 0; }
  const rest = S - 7 * dTD - 2 * sf;
  if (!offFeasible(rest)) throw new Error('decompose: cannot score ' + S);
  const bT = (rest * 0.24) / 3;
  const cands: { b: number; n: number; w: number }[] = [];
  for (let b = 0; 3 * b <= rest; b++) {
    const rt = rest - 3 * b;
    if (rt !== 0 && rt < 6) continue;
    for (let n = Math.ceil(rt / 8); 6 * n <= rt; n++) {
      const e = rt - 6 * n, twos = Math.max(e - n, 0), ones = e - 2 * twos, zeros = n - ones - twos;
      if (zeros < 0) continue;
      cands.push({ b, n, w: Math.exp(-0.5 * ((b - bT) / 1.0) ** 2) * Math.exp(-1.4 * zeros) + 1e-6 });
    }
  }
  const c = cands[weightedIndex(rng, cands.map((x) => x.w))];
  const rt = rest - 3 * c.b, e = rt - 6 * c.n;
  let twos = Math.max(e - c.n, 0), ones = e - 2 * twos;
  while (ones >= 2 && twos + ones - 1 <= c.n && chance(rng, 0.22)) { ones -= 2; twos += 1; }
  const convs: Conv[] = [];
  for (let i = 0; i < ones; i++) convs.push('xp');
  for (let i = 0; i < twos; i++) convs.push('two');
  for (let i = convs.length; i < c.n; i++) convs.push(chance(rng, 0.6) ? 'xp_miss' : 'two_fail');
  return { td: c.n, fg: c.b, convs: shuffle(rng, convs), dTD, sf };
}

// ---- step 3 and 4: drives ----
const YARDS_W: Record<DriveEnd, number> = { TD: 68, FG: 46, FG_MISS: 44, PUNT: 24, INT: 26, FUM: 25, DOWNS: 32, HALF: 24, SAFETY: 14 };
const MIN_PLAYS: Record<DriveEnd, number> = { TD: 1, FG: 3, FG_MISS: 3, PUNT: 3, INT: 2, FUM: 2, DOWNS: 4, HALF: 2, SAFETY: 2 };
interface Slot { end: DriveEnd; conv?: Conv; defTD?: boolean }

function slotsFor(comp: Comp, give: number, oppComp: Comp, dn: number, mf: number, m: number, k1: number, rng: Rng, eohHalves: boolean[]): Slot[] {
  const list: Slot[] = [];
  comp.convs.forEach((c) => list.push({ end: 'TD', conv: c }));
  for (let i = 0; i < comp.fg; i++) list.push({ end: 'FG' });
  for (let i = 0; i < mf; i++) list.push({ end: 'FG_MISS' });
  for (let i = 0; i < give; i++) list.push({ end: chance(rng, 0.65) ? 'INT' : 'FUM', defTD: i < oppComp.dTD });
  for (let i = 0; i < oppComp.sf; i++) list.push({ end: 'SAFETY' });
  for (let i = 0; i < dn; i++) list.push({ end: 'DOWNS' });
  const out: (Slot | null)[] = new Array(m).fill(null);
  const eohAt = [eohHalves[0] ? k1 - 1 : -1, eohHalves[1] ? m - 1 : -1];
  for (const p of eohAt) if (p >= 0 && list.length < m - 1) out[p] = { end: 'HALF' };
  shuffle(rng, list);
  let li = 0;
  for (let i = 0; i < m; i++) if (!out[i]) out[i] = li < list.length ? list[li++] : { end: 'PUNT' };
  return out as Slot[];
}

function needed(comp: Comp, give: number, oppComp: Comp, dn: number, mf: number): number { return comp.td + comp.fg + mf + give + oppComp.sf + dn; }

export function simulateGame(mh: Matchup, ma: Matchup, rng: Rng, opts: GameOptions): GameResult {
  const hf = opts.homeField ?? HOME_FIELD;
  const rA = rng.fork('aggregates');
  const agg = { home: realise(mh, rA), away: realise(ma, rA) };
  const ptsOf = (m: Matchup, r: typeof agg.home, h: number) => clamp(BASE_PTS + h + PT_RUSH * (r.rush - RUSH_BASE) + PT_PASS * (r.pass - PASS_BASE) - PT_TO * (r.to - LAM_TO) - PT_SACK * (r.sacks - LAM_SACK) + m.channels.kick - m.planCost + PTS_NOISE * m.vm * rA.normal(), 0, 58);
  const regHome = realisticScore(Math.round(ptsOf(mh, agg.home, hf)), rA), regAway = realisticScore(Math.round(ptsOf(ma, agg.away, 0)), rA);

  const rD = rng.fork('drives');
  const comp = { home: decompose(regHome, agg.away.to, rD), away: decompose(regAway, agg.home.to, rD) };
  const dn = { home: poisson(rD, 0.35), away: poisson(rD, 0.35) };
  // missed field goals are drawn here so the drive count can fit them
  const mfDraw = { home: 0, away: 0 };
  for (const s of ['home', 'away'] as const) for (let i = 0; i < comp[s].fg; i++) if (chance(rD, 0.176)) mfDraw[s]++;
  const m0 = clamp(Math.round(10.8 + 0.9 * rD.normal()), 9, 13);
  const m = Math.max(m0, needed(comp.home, agg.home.to, comp.away, dn.home, mfDraw.home) + 1, needed(comp.away, agg.away.to, comp.home, dn.away, mfDraw.away) + 1);
  const k1 = m % 2 === 0 ? clamp(m / 2 + rD.pick([-1, 0, 0, 1]), 3, m - 3) : (chance(rD, 0.5) ? (m - 1) / 2 : (m + 1) / 2);
  const firstH1: Side = chance(rD, 0.5) ? 'home' : 'away';
  const eoh = [chance(rD, 0.55), chance(rD, 0.55)];
  // the team that has the ball last in a half is the second team in that half
  const lastH1 = other(firstH1), lastH2 = firstH1;
  const eohFor = (s: Side) => [eoh[0] && lastH1 === s, eoh[1] && lastH2 === s];
  const slotsBy = { home: slotsFor(comp.home, agg.home.to, comp.away, dn.home, mfDraw.home, m, k1, rD, eohFor('home')), away: slotsFor(comp.away, agg.away.to, comp.home, dn.away, mfDraw.away, m, k1, rD, eohFor('away')) };

  // time order: each half alternates, the second half starts with the other team
  const seq: { side: Side; idx: number; half: number }[] = [];
  const idx = { home: 0, away: 0 };
  for (let half = 0; half < 2; half++) {
    const per = half === 0 ? k1 : m - k1, first = half === 0 ? firstH1 : other(firstH1);
    for (let i = 0; i < per; i++) for (const s of [first, other(first)]) seq.push({ side: s, idx: idx[s]++, half });
  }
  const drives: Drive[] = seq.map((q) => {
    const sl = slotsBy[q.side][q.idx];
    return { side: q.side, period: 1, start: 0, secs: 0, plays: 0, rush: 0, pass: 0, sacks: 0, end: sl.end, pts: sl.end === 'TD' ? 6 + convPts(sl.conv!) : sl.end === 'FG' ? 3 : 0, conv: sl.conv, oppPts: sl.end === 'SAFETY' ? 2 : sl.defTD ? 7 : 0, defTD: !!sl.defTD };
  });
  // yards: rush and pass separately, weighted by how each drive ended, so the drives add up to the realised totals
  for (const s of ['home', 'away'] as const) {
    const mine = drives.map((d, i) => [d, i] as const).filter(([d]) => d.side === s).map(([d]) => d);
    const wR = mine.map((d) => YARDS_W[d.end] * Math.exp(0.5 * rD.normal())), wP = mine.map((d) => YARDS_W[d.end] * Math.exp(0.5 * rD.normal()));
    const rs = allocate(agg[s].rush, wR), ps = allocate(agg[s].pass, wP);
    mine.forEach((d, i) => { d.rush = rs[i]; d.pass = ps[i]; });
    mine.forEach((d) => { d.plays = clamp(Math.max(MIN_PLAYS[d.end], Math.round((d.rush + d.pass) / 5.15 + 0.9 * rD.normal())), 1, 22); });
    for (let k = 0; k < agg[s].sacks; k++) {
      const i = weightedIndex(rD, mine.map((d) => d.plays));
      if (mine[i].sacks >= mine[i].plays - 1) mine[i].plays++;
      mine[i].sacks++;
    }
  }
  // clock: each half is exactly 1800 seconds, shared in proportion to plays
  let clock = 0;
  for (let half = 0; half < 2; half++) {
    const own = drives.filter((_, i) => seq[i].half === half);
    const secs = allocate(1800, own.map((d) => d.plays * 26 * Math.exp(0.28 * rD.normal()) + (d.end === 'HALF' ? 10 : 0)));
    own.forEach((d, i) => { d.start = clock; d.secs = secs[i]; d.period = Math.min(4, Math.floor(clock / 900) + 1); clock += secs[i]; });
  }

  // ---- step 5: overtime ----
  let homeScore = regHome, awayScore = regAway, ot: GameResult['ot'] = null, otSecs = 0;
  if (regHome === regAway) {
    const rO = rng.fork('overtime');
    const first: Side = chance(rO, 0.5) ? 'home' : 'away';
    const score = { home: 0, away: 0 };
    const limit = opts.otLimit ?? (opts.playoff ? 900 : 600);
    let period = 5, inPeriod = 0, count = 0;
    const model = { home: mh, away: ma };
    const play = (side: Side, maxSecs: number, winWalk: (pts: number) => boolean): Drive => {
      const r = model[side].structPts / BASE_PTS, u = rO.next();
      const pTD = clamp(0.27 * r, 0.1, 0.5), pFG = clamp(0.2 * Math.sqrt(r), 0.08, 0.3), pGive = clamp(0.11 / Math.sqrt(r), 0.05, 0.2);
      let end: DriveEnd = 'PUNT';
      if (u < pTD) end = 'TD'; else if (u < pTD + pFG) end = chance(rO, 0.87) ? 'FG' : 'FG_MISS'; else if (u < pTD + pFG + pGive) end = chance(rO, 0.65) ? 'INT' : 'FUM'; else if (u < pTD + pFG + pGive + 0.03) end = 'DOWNS';
      const defTD = (end === 'INT' || end === 'FUM') && chance(rO, 0.10);
      let secs = clamp(Math.round(150 + 50 * rO.normal()), 30, 330);
      secs = Math.min(secs, maxSecs);
      const yards = Math.max(1, Math.round((YARDS_W[end] * Math.exp(0.4 * rO.normal()))));
      const rush = Math.round(yards * clamp(0.4 + 0.1 * rO.normal(), 0.15, 0.7)), pass = yards - rush;
      let pts = 0, conv: Conv | undefined;
      if (end === 'TD') { const walk = winWalk(6); conv = walk ? 'none' : 'xp'; pts = walk ? 6 : 7; } else if (end === 'FG') pts = 3;
      return { side, period, start: 3600 + otSecs, secs, plays: Math.max(MIN_PLAYS[end], Math.round(yards / 5.3)), rush, pass, sacks: 0, end, pts, conv, oppPts: defTD ? 7 : 0, defTD };
    };
    const add = (d: Drive) => {
      drives.push(d); otSecs += d.secs; inPeriod += d.secs; count++;
      score[d.side] += d.pts; score[other(d.side)] += d.oppPts;
    };
    // both teams possess, whatever the first one does (a defensive touchdown on a giveaway ends it at once)
    let done = false;
    const d1 = play(first, Math.min(330, limit), () => false); add(d1);
    if (d1.oppPts > 0) done = true;
    if (!done) {
      const need = score[first];   // the second team's touchdown is a walk-off only if it puts them ahead
      const d2 = play(other(first), Math.max(30, limit - inPeriod), (pts) => pts > need - score[other(first)]);
      add(d2);
      if (d2.oppPts > 0 || score.home !== score.away) done = true;
    }
    // sudden death: the next score of any kind wins; if the period runs out it is a tie (regular season) or a new period (playoffs)
    let turn: Side = first;
    while (!done) {
      const left = limit - inPeriod;
      if (left <= 0) { if (opts.playoff) { period++; inPeriod = 0; continue; } break; }
      const d = play(turn, left, () => true);
      if (d.secs >= left && d.pts === 0 && d.oppPts === 0) d.end = 'HALF';
      add(d);
      if (d.pts > 0 || d.oppPts > 0) done = true;
      turn = other(turn);
    }
    homeScore += score.home; awayScore += score.away;
    ot = { first, periods: period - 4, tie: homeScore === awayScore };
  }

  // ---- read everything back off the drives ----
  const events: ScoreEvent[] = [];
  drives.forEach((d, i) => {
    if (d.pts > 0) events.push({ side: d.side, kind: d.end === 'TD' ? 'TD' : 'FG', pts: d.pts, conv: d.conv, drive: i, period: d.period, at: d.start + d.secs });
    if (d.oppPts > 0) events.push({ side: other(d.side), kind: d.defTD ? 'DEF_TD' : 'SAFETY', pts: d.oppPts, drive: i, period: d.period, at: d.start + d.secs });
  });
  const blank = (): TeamGameStats => ({ rush: 0, pass: 0, yards: 0, plays: 0, giveaways: 0, takeaways: 0, sacksTaken: 0, drives: 0, top: 0, fgMade: 0, fgMissed: 0 });
  const stats = { home: blank(), away: blank() };
  for (const d of drives) {
    const t = stats[d.side];
    t.rush += d.rush; t.pass += d.pass; t.yards += d.rush + d.pass; t.plays += d.plays; t.sacksTaken += d.sacks; t.drives++; t.top += d.secs;
    if (d.end === 'FG') t.fgMade++; if (d.end === 'FG_MISS') t.fgMissed++;
    if (d.end === 'INT' || d.end === 'FUM') { t.giveaways++; stats[other(d.side)].takeaways++; }
  }
  const aggOut = { home: agg.home, away: agg.away };
  return { homeScore, awayScore, regHome, regAway, drives, events, stats, agg: aggOut, ot, otSecs };
}
