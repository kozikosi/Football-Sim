// Season engine for amused — framework-free.
// 17-week regular season + 8-team playoffs (3 rounds) = the 20-0 chase.
// Team strength comes from drafted rosters; games sim probabilistically.
// Seeded throughout for reproducibility.
import type { Player } from '../draft/players-data.ts';
import { makeRng, type Rng } from '../../../../../packages/engine-core/src/rng.ts';

export type TeamStrength = { team: string; off: number; def: number };
export type GameResult = {
  week: number; // 1..17 regular, 18..20 playoffs
  home: string; away: string;
  homeScore: number; awayScore: number;
  label?: string; // e.g. "Divisional", "Super Bowl"
};
export type Standing = { team: string; w: number; l: number; pf: number; pa: number };

export const WEEKS = 17;

const OFF_POS = new Set(['QB','RB','WR','TE','OT','OG','C','LT','RT','LG','RG','HB','FB']);
const DEF_POS = new Set(['DE','DT','LB','CB','S','MIKE','WILL','SAM','FS','SS','NB','NT','LEDG','REDG','DT2','ILB','OLB']);

function strengthOf(roster: Player[]): { off: number; def: number } {
  let o = 0, on = 0, d = 0, dn = 0;
  for (const p of roster) {
    if (OFF_POS.has(p.pos)) { o += p.ovr; on++; }
    else if (DEF_POS.has(p.pos)) { d += p.ovr; dn++; }
    else { o += p.ovr * 0.5; on += 0.5; d += p.ovr * 0.5; dn += 0.5; }
  }
  return { off: on ? o / on : 70, def: dn ? d / dn : 70 };
}

export class Season {
  readonly teams: string[];
  readonly strengths = new Map<string, { off: number; def: number }>();
  schedule: GameResult[] = [];   // weeks 1..17
  results: GameResult[] = [];
  playoffResults: GameResult[] = [];
  champion: string | null = null;
  private rng: Rng;

  constructor(rosters: Map<string, Player[]>, seed = 777) {
    this.rng = makeRng(seed);
    this.teams = [...rosters.keys()];
    for (const [t, r] of rosters) this.strengths.set(t, strengthOf(r));
    this.buildSchedule();
  }

  private buildSchedule() {
    // Circle-method round robin, 17 rounds (each team plays 17 distinct opponents)
    const arr = [...this.teams];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const n = arr.length;
    const rot = arr.slice(1);
    for (let w = 1; w <= WEEKS; w++) {
      const order = [arr[0], ...rot];
      for (let i = 0; i < n / 2; i++) {
        const a = order[i], b = order[n - 1 - i];
        const home = (w + i) % 2 === 0 ? a : b;
        const away = home === a ? b : a;
        this.schedule.push({ week: w, home, away, homeScore: 0, awayScore: 0 });
      }
      rot.push(rot.shift()!);
    }
  }

  /** Simulate one game. Returns the result. */
  simGame(home: string, away: string, week: number, label?: string): GameResult {
    const hs = this.strengths.get(home)!, as = this.strengths.get(away)!;
    // expected point differential from offensive/defensive edges + home field
    const edge = (hs.off - as.def) * 0.55 + (as.off - hs.def) * -0.55 + 2.2;
    const total = 44 + (hs.off + as.off - 160) * 0.22;
    const noise = () => (this.rng.next() + this.rng.next() + this.rng.next() - 1.5) * 9;
    let h = Math.round(total / 2 + edge / 2 + noise());
    let a = Math.round(total / 2 - edge / 2 + noise());
    h = Math.max(h, 3); a = Math.max(a, 3);
    if (h === a) { if (this.rng.next() < 0.5) h += 3; else a += 3; }
    return { week, home, away, homeScore: h, awayScore: a, label };
  }

  /** Simulate a regular-season week. Returns the week's results. */
  simWeek(week: number): GameResult[] {
    const games = this.schedule.filter((g) => g.week === week);
    const out = games.map((g) => this.simGame(g.home, g.away, week));
    this.results.push(...out);
    return out;
  }

  standings(): Standing[] {
    const st = new Map<string, Standing>();
    for (const t of this.teams) st.set(t, { team: t, w: 0, l: 0, pf: 0, pa: 0 });
    for (const g of this.results) {
      const h = st.get(g.home)!, a = st.get(g.away)!;
      h.pf += g.homeScore; h.pa += g.awayScore;
      a.pf += g.awayScore; a.pa += g.homeScore;
      if (g.homeScore > g.awayScore) { h.w++; a.l++; } else { a.w++; h.l++; }
    }
    return [...st.values()].sort((x, y) => y.w - x.w || (y.pf - y.pa) - (x.pf - x.pa));
  }

  /** Top 4 per conference (seeded split) → 3 playoff rounds. */
  simPlayoffs(): GameResult[] {
    const conf = [...this.teams];
    for (let i = conf.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng.next() * (i + 1));
      [conf[i], conf[j]] = [conf[j], conf[i]];
    }
    const A = conf.slice(0, 16), B = conf.slice(16);
    const rank = (ts: string[]) =>
      this.standings().filter((s) => ts.includes(s.team)).slice(0, 4).map((s) => s.team);
    const labels = ['Divisional', 'Conference'];
    let aliveA = rank(A), aliveB = rank(B);
    const out: GameResult[] = [];
    for (let r = 0; r < 2; r++) {
      const nextA: string[] = [], nextB: string[] = [];
      const playRound = (alive: string[], next: string[]) => {
        for (let i = 0; i < alive.length; i += 2) {
          const [h, a] = [alive[i], alive[i + 1]];
          const g = this.simGame(h, a, 18 + r, labels[r]);
          out.push(g);
          next.push(g.homeScore > g.awayScore ? g.home : g.away);
        }
      };
      playRound(aliveA, nextA);
      playRound(aliveB, nextB);
      aliveA = nextA; aliveB = nextB;
    }
    // Super Bowl
    const sb = this.simGame(aliveA[0], aliveB[0], 20, 'Super Bowl');
    out.push(sb);
    this.playoffResults = out;
    this.champion = sb.homeScore > sb.awayScore ? sb.home : sb.away;
    return out;
  }

  recordOf(team: string): { w: number; l: number } {
    const s = this.standings().find((x) => x.team === team)!;
    return { w: s.w, l: s.l };
  }
}
