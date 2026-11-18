// Game recap (engine step 9c): built from the drives and the box score, nothing else. Every score and every turnover is named,
// in the order it happened, with the running score; the stars and the game ball come from the same player lines, so the page can
// never say something the box score does not.
// Owner's style (V22 work order, 21 Oct addendum): box-score lines, not sentences ("Rushing TD · D'Andre Swift (Chiefs 7-0)");
// "1st/2nd/3rd/4th/OT"; every line names the team that gained; turnovers as a count and then the plays; stars are the players
// with a great game (an internal grade of 90 or more, never shown), an offensive star needs 60+ yards; the game ball winner is
// always among the stars. The words "expected", "before kickoff" and "sudden death" never appear. UI styling is the shell's job.
import type { GameResult, Side } from './drives.ts';
import type { BoxScore, DriveCredit, PlayerLine, PlayerRef } from './boxscore.ts';
import { at as checked } from '../../../core/at.ts';   // aliased: this file uses `at` for the game clock

const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');
export const nickname = (team: string): string => checked(team.split(' ').slice(-1), 0);

export type Period = '1st' | '2nd' | '3rd' | '4th' | 'OT';
export interface RecapLine {
  period: Period; at: number; clock: string;            // clock: time left in the period, m:ss (OT: time into overtime)
  side: Side; team: string;                              // the team that gained
  label: string;                                         // 'Rushing TD', 'Passing TD', 'Field Goal', 'Defensive TD', 'Safety'
  who: PlayerRef[];                                      // scorer first; for a passing TD the passer second
  detail: string;                                        // '4 yds', '42 yds', 'interception return', '2-Pt Conv good by ...'
  score: string;                                         // 'Chiefs 7-0' (leader first; 'tied 7-7')
  home: number; away: number;
  decisive: boolean;                                     // the last score of an overtime game, scored by the team that won
  text: string;                                          // the whole line as one string
}
export interface TurnoverLine { period: Period; at: number; clock: string; side: Side; team: string; kind: 'Interception' | 'Fumble'; giver: PlayerRef; taker: PlayerRef; forcer?: PlayerRef | undefined; retYards: number; defTD: boolean; text: string }
export interface StarLine { id: string; name: string; team: string; side: Side; label: string; grade: number; stat: string; ball: boolean }
export interface Recap {
  home: string; away: string; homeScore: number; awayScore: number; winner: Side | null; overtime: boolean;
  scoring: RecapLine[]; turnovers: { home: number; away: number; lines: TurnoverLine[] };
  stars: StarLine[]; ball: StarLine | null; boxByPeriod: Record<Period, { home: number; away: number }>;
  text: string[];
}

// ---- grades (internal; never shown): 50 is an ordinary day, 90 a great one ----
const OFF_SKILL = new Set(['RB1', 'RB2', 'FB', 'WR1', 'WR2', 'WR3', 'WR4', 'TE1', 'TE2', 'TE3']);
type Lined = Pick<PlayerLine, 'slot' | 'stats'>;
export function offensePts(l: Lined): number {
  const s = l.stats;
  if (l.slot === 'QB') return 0.045 * s.pyd + 5 * s.ptd - 6 * s.ints + 0.03 * s.ryd + 4 * s.rtd - 4 * s.fumLost;
  return 0.07 * (s.ryd + s.recYd) + 0.3 * s.rec + 6 * (s.rtd + s.recTd) + 3 * s.twoPt - 8 * s.fumLost;
}
export function defensePts(l: Lined): number {
  const s = l.stats;
  return 4 * s.sack + 5 * s.intDef + 8 * s.defTd + 3 * s.ff + 2.5 * s.fr + s.pd + 0.6 * s.tfl + 0.25 * s.tkl + 0.1 * (s.press - s.sack) + 4 * s.safeties;
}
export const isOffense = (l: Lined): boolean => l.slot === 'QB' || OFF_SKILL.has(l.slot);
export const isDefense = (l: Lined): boolean => !isOffense(l) && l.slot !== 'K' && l.slot !== 'P';
export function gradeOf(l: PlayerLine): number {
  const s = l.stats;
  const ret = 50 + 0.4 * (s.krYd + s.prYd);
  let g: number;
  if (l.slot === 'QB') g = s.att < 10 ? 50 : 50 + 1.4 * offensePts(l);
  else if (OFF_SKILL.has(l.slot)) g = 50 + 2.5 * offensePts(l);
  else if (l.slot === 'K') g = s.fga === 0 ? 50 : 50 + 9 * s.fgm - 12 * (s.fga - s.fgm) + s.xpm;
  else if (l.slot === 'P') g = s.punts < 3 ? 50 : 50 + 3 * (s.puntYd / s.punts - 44);
  else g = 50 + 2.6 * defensePts(l);
  return Math.round(Math.max(g, s.kr + s.pr > 0 ? ret : 0));
}
const yardsOf = (l: PlayerLine): number => l.stats.ryd + l.stats.recYd;

export function statLine(l: PlayerLine): string {
  const s = l.stats, out: string[] = [];
  if (l.slot === 'QB') {
    out.push(`${s.cmp}/${s.att}`, `${s.pyd} yds`); if (s.ptd) out.push(`${s.ptd} TD`); if (s.ints) out.push(`${s.ints} INT`);
    if (s.ryd >= 20 || s.rtd) out.push(`${s.car} car, ${s.ryd} rush yds${s.rtd ? `, ${s.rtd} rush TD` : ''}`);
  } else if (OFF_SKILL.has(l.slot)) {
    if (s.rec) out.push(`${s.rec} rec, ${s.recYd} rec yds`); if (s.car) out.push(`${s.car} car, ${s.ryd} rush yds`);
    const td = s.rtd + s.recTd; if (td) out.push(`${td} TD`); if (s.fumLost) out.push(`${s.fumLost} lost fumble`);
  } else if (l.slot === 'K') { out.push(`${s.fgm}/${s.fga} FG`); if (s.xpa) out.push(`${s.xpm}/${s.xpa} XP`); }
  else if (l.slot === 'P') { out.push(`${s.punts} punts, ${Math.round(s.puntYd / Math.max(1, s.punts))} avg`); }
  else {
    if (s.sack) out.push(`${s.sack} ${s.sack === 1 ? 'sack' : 'sacks'}`); if (s.intDef) out.push(`${s.intDef} INT`); if (s.defTd) out.push(`${s.defTd} defensive TD`);
    if (s.ff) out.push(`${s.ff} FF`); if (s.fr) out.push(`${s.fr} FR`); if (s.pd) out.push(`${s.pd} PD`); if (s.tfl && !s.sack) out.push(`${s.tfl} TFL`);
    out.push(`${s.tkl} tkl`);
  }
  if (s.kr + s.pr > 0 && (s.krYd + s.prYd >= 60)) out.push(`${s.krYd + s.prYd} return yds`);
  return out.join(', ');
}

// ---- clock ----
function periodAt(at: number): { period: Period; clock: string } {
  const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, '0')}`;
  if (at > 3600) return { period: 'OT', clock: mmss(at - 3600) };
  const q = Math.min(4, Math.max(1, Math.ceil(at / 900)));
  return { period: checked(['1st', '2nd', '3rd', '4th'] as const, q - 1), clock: mmss(q * 900 - at) };
}
const who = (r: PlayerRef): string => `${r.name} (${nickname(r.team)})`;

export function buildRecap(res: GameResult, box: BoxScore): Recap {
  const home = box.home, away = box.away, name = { home: nickname(home), away: nickname(away) };
  const sorted = res.events.map((e, k) => ({ e, k })).sort((a, b) => a.e.at - b.e.at || a.k - b.k).map((x) => x.e);
  let h = 0, a = 0;
  const scoring: RecapLine[] = [];
  const periodBox: Record<Period, { home: number; away: number }> = { '1st': { home: 0, away: 0 }, '2nd': { home: 0, away: 0 }, '3rd': { home: 0, away: 0 }, '4th': { home: 0, away: 0 }, OT: { home: 0, away: 0 } };
  sorted.forEach((e, idx) => {
    const c: DriveCredit = checked(box.credits, e.drive), team = e.side === 'home' ? home : away, { period, clock } = periodAt(e.at);
    if (e.side === 'home') h += e.pts; else a += e.pts;
    periodBox[period][e.side] += e.pts;
    const score = h === a ? `tied ${h}-${a}` : h > a ? `${name.home} ${h}-${a}` : `${name.away} ${a}-${h}`;
    let label = '', detail = '', refs: PlayerRef[] = [];
    if (e.kind === 'TD') {
      refs = [c.scorer as PlayerRef]; if (c.kind === 'PASS_TD' && c.passer) refs.push(c.passer);
      label = c.kind === 'PASS_TD' ? 'Passing TD' : 'Rushing TD';
      detail = c.tdYards && c.tdYards >= 1 ? `${c.tdYards} yds` : '';
      if (e.conv === 'two') detail += `${detail ? ', ' : ''}2-Pt Conv good (${c.convBy ? c.convBy.name : ''}${c.convPasser ? ' from ' + c.convPasser.name : ''})`;
      else if (c.conv === 'two_fail') detail += `${detail ? ', ' : ''}2-Pt Conv failed`;
      else if (c.conv === 'xp_miss') detail += `${detail ? ', ' : ''}extra point missed`;
    } else if (e.kind === 'FG') {
      refs = [c.kicker as PlayerRef]; label = 'Field Goal'; detail = `${c.kickYards} yds`;
    } else if (e.kind === 'DEF_TD') {
      refs = [c.taker as PlayerRef]; label = 'Defensive TD'; detail = c.kind === 'INT' ? `interception return, ${c.retYards} yds, off ${(c.giver as PlayerRef).name}` : `fumble return, ${c.retYards} yds, off ${(c.giver as PlayerRef).name}`;
    } else {
      refs = [c.taker as PlayerRef]; label = 'Safety'; detail = 'sack in the end zone';
    }
    const decisive = period === 'OT' && idx === sorted.length - 1 && h !== a && (h > a) === (e.side === 'home');
    const first = checked(refs, 0), second = refs[1];
    const lead = e.kind === 'TD' && c.kind === 'PASS_TD' && second ? `${who(second)} to ${who(first)}` : who(first);
    const text = `${label} · ${lead}${detail ? ' · ' + detail : ''} · ${name[e.side]} · ${score}`;
    scoring.push({ period, at: e.at, clock, side: e.side, team, label, who: refs, detail, score, home: h, away: a, decisive, text });
  });

  // turnovers, in order
  const tl: TurnoverLine[] = [];
  const cnt = { home: 0, away: 0 };
  res.drives.forEach((d, i) => {
    const c = checked(box.credits, i);
    if (c.kind !== 'INT' && c.kind !== 'FUM') return;
    const at = d.start + d.secs, { period, clock } = periodAt(at), taker = other(d.side);
    cnt[taker]++;
    const kind = c.kind === 'INT' ? 'Interception' : 'Fumble';
    const g = c.giver as PlayerRef, t = c.taker as PlayerRef;
    const text = c.kind === 'INT'
      ? `${t.name} (${nickname(t.team)}) intercepted ${g.name}${c.retYards ? `, ${c.retYards}-yard return` : ''}${c.defTD ? ' for a touchdown' : ''}`
      : `${g.name} (${nickname(g.team)}) fumbled${c.forcer ? `, forced by ${c.forcer.name} (${nickname(c.forcer.team)})` : ''}, recovered by ${t.name} (${nickname(t.team)})${c.retYards ? `, ${c.retYards}-yard return` : ''}${c.defTD ? ' for a touchdown' : ''}`;
    tl.push({ period, at, clock, side: taker, team: taker === 'home' ? home : away, kind, giver: g, taker: t, forcer: c.forcer, retYards: c.retYards ?? 0, defTD: !!c.defTD, text: `${text} (${period}, ${name[taker]})` });
  });
  tl.sort((x, y) => x.at - y.at);

  // winner, stars, game ball
  const winner: Side | null = res.homeScore === res.awayScore ? null : res.homeScore > res.awayScore ? 'home' : 'away';
  const star = (l: PlayerLine, ball: boolean): StarLine => ({ id: l.id, name: l.name, team: l.team, side: l.side, label: l.label, grade: gradeOf(l), stat: statLine(l), ball });
  const graded = box.lines.map((l) => ({ l, g: gradeOf(l) })).sort((x, y) => y.g - x.g || (x.l.id < y.l.id ? -1 : 1));
  const pool = winner ? graded.filter((x) => x.l.side === winner) : graded;
  const ballLine = pool.length ? checked(pool, 0).l : null;
  const ok = (l: PlayerLine) => (isOffense(l) ? (l.slot === 'QB' ? l.stats.pyd >= 150 || yardsOf(l) >= 60 : yardsOf(l) >= 60) : true);   // Owner: an offensive star has at least 60 yards
  const perTeam = { home: 0, away: 0 }, chosen: PlayerLine[] = [];
  for (const { l, g } of graded) {
    if (g < 90 || !ok(l) || perTeam[l.side] >= 3 || chosen.length >= 5) continue;
    chosen.push(l); perTeam[l.side]++;
  }
  if (ballLine && !chosen.some((l) => l.id === ballLine.id)) chosen.push(ballLine);
  chosen.sort((x, y) => gradeOf(y) - gradeOf(x) || (x.id < y.id ? -1 : 1));
  const stars = chosen.map((l) => star(l, ballLine !== null && l.id === ballLine.id));
  const ball = stars.find((s) => s.ball) ?? null;

  const text: string[] = [];
  const ot = res.ot !== null;
  text.push(`${name.home} ${res.homeScore}, ${name.away} ${res.awayScore}${ot ? ' (OT)' : ''}`);
  let cur: Period | null = null;
  for (const s of scoring) { if (s.period !== cur) { cur = s.period; text.push(cur === 'OT' ? 'Overtime' : cur + ' Quarter'); } text.push(s.text); }
  text.push(`Turnovers: ${name.home} ${cnt.home} - ${cnt.away} ${name.away}`);
  for (const t of tl) text.push(t.text);
  for (const s of stars) text.push(`★ ${s.name} (${nickname(s.team)}) ${s.label}: ${s.stat}${s.ball ? ' · Game ball!' : ''}`);
  return { home, away, homeScore: res.homeScore, awayScore: res.awayScore, winner, overtime: ot, scoring, turnovers: { home: cnt.home, away: cnt.away, lines: tl }, stars, ball, boxByPeriod: periodBox, text };
}
