// Standings, the NFL tiebreaking procedures, and playoff seeding.
// Rules: NFL Football Operations tiebreaking procedures as reported by the council 30 Oct (Groq, GPT; both agree with each other).
// Division (2 or more clubs): head-to-head, division record, common games, conference record, strength of victory, strength of schedule,
//   combined rank in points scored and allowed (conference, then all), net points in common games, net points all games, net touchdowns, coin toss.
// Wild card: head-to-head (a sweep, if applicable), conference record, common games (minimum 4), strength of victory, strength of schedule,
//   combined rank (conference, then all), net points in conference games, net points in all games, net touchdowns, coin toss.
// Whenever a step removes one or more clubs the procedure restarts from the top for the clubs left (division: 3+ tied clubs drop to the 2-club procedure).
// Ties count as half a win. Points scored and allowed rank 1 = most scored / fewest allowed; the lower combined rank wins.
import { TEAM_BY_NAME, TEAMS, DIVS, divisionTeams } from './league.ts';
import type { Conf, Div } from './league.ts';
import type { Rng } from './rng.ts';

export interface Played { home: string; away: string; hs: number; as: number; htd: number; atd: number }   // a finished regular-season game
interface Row { opp: string; pf: number; pa: number; tdf: number; tda: number }

export function pct(w: number, l: number, t: number): number { const g = w + l + t; return g === 0 ? 0 : (w + 0.5 * t) / g; }

export class Book {
  readonly rows = new Map<string, Row[]>();
  constructor(games: readonly Played[]) {
    for (const t of TEAMS) this.rows.set(t.name, []);
    for (const g of games) {
      this.rows.get(g.home)!.push({ opp: g.away, pf: g.hs, pa: g.as, tdf: g.htd, tda: g.atd });
      this.rows.get(g.away)!.push({ opp: g.home, pf: g.as, pa: g.hs, tdf: g.atd, tda: g.htd });
    }
  }
  rec(team: string, keep: (r: Row) => boolean = () => true): { w: number; l: number; t: number; n: number } {
    let w = 0, l = 0, t = 0;
    for (const r of this.rows.get(team)!) if (keep(r)) { if (r.pf > r.pa) w++; else if (r.pf < r.pa) l++; else t++; }
    return { w, l, t, n: w + l + t };
  }
  pct(team: string, keep?: (r: Row) => boolean): number { const r = this.rec(team, keep); return pct(r.w, r.l, r.t); }
  overall(team: string): number { return this.pct(team); }
  net(team: string, keep: (r: Row) => boolean = () => true): number { let n = 0; for (const r of this.rows.get(team)!) if (keep(r)) n += r.pf - r.pa; return n; }
  netTD(team: string): number { let n = 0; for (const r of this.rows.get(team)!) n += r.tdf - r.tda; return n; }
  // combined winning percentage of the opponents beaten (SOV) or of all opponents played (SOS), a repeat opponent counted each time
  sov(team: string): number { return this.oppPct(team, (r) => r.pf > r.pa); }
  sos(team: string): number { return this.oppPct(team, () => true); }
  private oppPct(team: string, keep: (r: Row) => boolean): number {
    let w = 0, g = 0;
    for (const r of this.rows.get(team)!) if (keep(r)) { const o = this.rec(r.opp); w += o.w + 0.5 * o.t; g += o.n; }
    return g === 0 ? 0 : w / g;
  }
  total(team: string, f: 'pf' | 'pa'): number { let s = 0; for (const r of this.rows.get(team)!) s += r[f]; return s; }
}

const sameDiv = (a: string, b: string) => TEAM_BY_NAME[a].conf === TEAM_BY_NAME[b].conf && TEAM_BY_NAME[a].div === TEAM_BY_NAME[b].div;
const sameConf = (a: string, b: string) => TEAM_BY_NAME[a].conf === TEAM_BY_NAME[b].conf;

// combined rank of points scored and points allowed within a group of teams (lower is better)
function rankSum(book: Book, team: string, group: readonly string[]): number {
  const pf = book.total(team, 'pf'), pa = book.total(team, 'pa');
  return 1 + group.filter((o) => book.total(o, 'pf') > pf).length + 1 + group.filter((o) => book.total(o, 'pa') < pa).length;
}

type Mode = 'division' | 'wildcard';
// a step returns the clubs that stay in the tie, or null when it does not apply or does not separate them
type Step = (cur: string[]) => string[] | null;
const EPS = 1e-12;
function keepBest(cur: string[], score: (t: string) => number): string[] | null {
  const s = cur.map(score), m = Math.max(...s);
  const out = cur.filter((_, i) => s[i] > m - EPS);
  return out.length === cur.length ? null : out;
}

function stepsFor(mode: Mode, book: Book): Step[] {
  const h2h: Step = (cur) => {
    if (mode === 'division') {
      return keepBest(cur, (t) => { let w = 0, l = 0, tt = 0; for (const o of cur) if (o !== t) { const r = book.rec(t, (x) => x.opp === o); w += r.w; l += r.l; tt += r.t; } return pct(w, l, tt); });
    }
    if (cur.length === 2) return keepBest(cur, (t) => book.pct(t, (x) => x.opp === cur.find((o) => o !== t)));
    // 3 or more wild-card clubs: a club that beat every other, else one that lost to every other leaves the tie
    for (const t of cur) { const others = cur.filter((o) => o !== t); if (others.every((o) => { const r = book.rec(t, (x) => x.opp === o); return r.n > 0 && r.w === r.n; })) return [t]; }
    for (const t of cur) { const others = cur.filter((o) => o !== t); if (others.every((o) => { const r = book.rec(t, (x) => x.opp === o); return r.n > 0 && r.l === r.n; })) return cur.filter((o) => o !== t); }
    return null;
  };
  const divRec: Step = (cur) => keepBest(cur, (t) => book.pct(t, (r) => sameDiv(t, r.opp)));
  const confRec: Step = (cur) => keepBest(cur, (t) => book.pct(t, (r) => sameConf(t, r.opp)));
  const common = (min: number): Step => (cur) => {
    const sets = cur.map((t) => new Set(book.rows.get(t)!.map((r) => r.opp)));
    const com = [...sets[0]].filter((o) => !cur.includes(o) && sets.every((s) => s.has(o)));
    const keep = (r: { opp: string }) => com.includes(r.opp);
    if (!com.length || cur.some((t) => book.rec(t, keep).n < min)) return null;
    return keepBest(cur, (t) => book.pct(t, keep));
  };
  const sov: Step = (cur) => keepBest(cur, (t) => book.sov(t));
  const sos: Step = (cur) => keepBest(cur, (t) => book.sos(t));
  const confTeams = (cur: string[]) => TEAMS.filter((x) => x.conf === TEAM_BY_NAME[cur[0]].conf).map((x) => x.name);
  const rankConf: Step = (cur) => { const g = confTeams(cur); return keepBest(cur, (t) => -rankSum(book, t, g)); };
  const rankAll: Step = (cur) => { const g = TEAMS.map((x) => x.name); return keepBest(cur, (t) => -rankSum(book, t, g)); };
  const netCommon: Step = (cur) => {
    const sets = cur.map((t) => new Set(book.rows.get(t)!.map((r) => r.opp)));
    const com = [...sets[0]].filter((o) => !cur.includes(o) && sets.every((s) => s.has(o)));
    return com.length ? keepBest(cur, (t) => book.net(t, (r) => com.includes(r.opp))) : null;
  };
  const netConf: Step = (cur) => keepBest(cur, (t) => book.net(t, (r) => sameConf(t, r.opp)));
  const netAll: Step = (cur) => keepBest(cur, (t) => book.net(t));
  const netTD: Step = (cur) => keepBest(cur, (t) => book.netTD(t));
  return mode === 'division'
    ? [h2h, divRec, common(0), confRec, sov, sos, rankConf, rankAll, netCommon, netAll, netTD]
    : [h2h, confRec, common(4), sov, sos, rankConf, rankAll, netConf, netAll, netTD];
}

// the single best club of a tie (one procedure run)
function bestOf(tied: string[], mode: Mode, book: Book, rng: Rng): string {
  const steps = stepsFor(mode, book);
  let cur = tied.slice();
  outer: while (cur.length > 1) {
    for (const s of steps) { const r = s(cur); if (r && r.length < cur.length && r.length > 0) { cur = r; continue outer; } }
    // coin toss: seeded by the names, so the order the clubs were passed in does not matter
    const names = cur.slice().sort();
    const r = rng.fork('coin:' + names.join('|')).next();
    return names[Math.floor(r * names.length)];
  }
  return cur[0];
}
// full order of a tie: pick the best, remove it, restart with the rest
export function orderTied(tied: readonly string[], mode: Mode, book: Book, rng: Rng): string[] {
  const out: string[] = []; let rem = tied.slice();
  while (rem.length > 1) { const w = bestOf(rem, mode, book, rng); out.push(w); rem = rem.filter((x) => x !== w); }
  return out.concat(rem);
}
// wild-card ordering: from each division only its best club is in the running for the next spot (division tiebreaker first)
export function orderWildCard(tied: readonly string[], book: Book, rng: Rng): string[] {
  const out: string[] = []; let rem = tied.slice();
  while (rem.length) {
    const cands: string[] = [];
    for (const d of new Set(rem.map((t) => TEAM_BY_NAME[t].conf + TEAM_BY_NAME[t].div))) {
      const grp = rem.filter((t) => TEAM_BY_NAME[t].conf + TEAM_BY_NAME[t].div === d);
      cands.push(grp.length > 1 ? orderTied(grp, 'division', book, rng)[0] : grp[0]);
    }
    const w = cands.length === 1 ? cands[0] : bestOf(cands, 'wildcard', book, rng);
    out.push(w); rem = rem.filter((x) => x !== w);
  }
  return out;
}

export interface Seeding {
  seeds: Record<Conf, string[]>;                       // index 0 = the #1 seed ... 6 = the #7 seed
  divisionOrder: Record<string, string[]>;             // "AFC East" -> teams, best first
  divisionRank: Record<string, number>;                // team -> 1-4 (next year's schedule input)
  divisionWinners: Record<Conf, string[]>;
}
function groupByPct(teams: string[], book: Book): string[][] {
  const sorted = teams.slice().sort((a, b) => book.overall(b) - book.overall(a));
  const out: string[][] = [];
  for (const t of sorted) { const last = out[out.length - 1]; if (last && Math.abs(book.overall(last[0]) - book.overall(t)) < EPS) last.push(t); else out.push([t]); }
  return out;
}
export function seedPlayoffs(games: readonly Played[], rng: Rng): Seeding {
  const book = new Book(games);
  const divisionOrder: Record<string, string[]> = {}, divisionRank: Record<string, number> = {};
  const seeds = { AFC: [] as string[], NFC: [] as string[] }, divisionWinners = { AFC: [] as string[], NFC: [] as string[] };
  for (const conf of ['AFC', 'NFC'] as const) {
    for (const d of DIVS as readonly Div[]) {
      const order = groupByPct(divisionTeams(conf, d), book).flatMap((g) => (g.length > 1 ? orderTied(g, 'division', book, rng) : g));
      divisionOrder[`${conf} ${d}`] = order; order.forEach((t, i) => (divisionRank[t] = i + 1));
      divisionWinners[conf].push(order[0]);
    }
    // seeds 1-4: division winners by record (clubs from different divisions: the wild-card procedure)
    const winners = groupByPct(divisionWinners[conf], book).flatMap((g) => (g.length > 1 ? orderWildCard(g, book, rng) : g));
    const rest = TEAMS.filter((x) => x.conf === conf && !divisionWinners[conf].includes(x.name)).map((x) => x.name);
    const wild = groupByPct(rest, book).flatMap((g) => (g.length > 1 ? orderWildCard(g, book, rng) : g)).slice(0, 3);
    seeds[conf] = [...winners, ...wild];
  }
  return { seeds, divisionOrder, divisionRank, divisionWinners };
}
