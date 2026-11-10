import { test } from 'node:test';
import assert from 'node:assert/strict';
import { play } from './fixture.ts';
import { buildRecap, gradeOf, isOffense, nickname } from '../../../src/engine/sports/nfl/engine/recap.ts';
import type { PlayerLine } from '../../../src/engine/sports/nfl/engine/boxscore.ts';
import { addBox, leaders, newSeasonStats, seasonAwards } from '../../../src/engine/sports/nfl/engine/awards.ts';

const GAMES = 300;
const all = Array.from({ length: GAMES }, (_, n) => { const g = play(n % 32, (n * 5 + 7) % 32 === n % 32 ? (n + 1) % 32 : (n * 5 + 7) % 32, 120000 + n, n % 6 === 0); return { ...g, rc: buildRecap(g.res, g.box) }; });

test('the last running score of every recap is the final score, and the points add up per team', () => {
  for (const { res, rc } of all) {
    const last = rc.scoring[rc.scoring.length - 1];
    if (!last) { assert.equal(res.homeScore + res.awayScore, 0); continue; }
    assert.equal(last.home, res.homeScore); assert.equal(last.away, res.awayScore);
    assert.equal(rc.scoring.length, res.events.length, 'every scoring event has a line');
    let h = 0, a = 0;
    for (const s of rc.scoring) { assert.ok(s.home >= h && s.away >= a, 'running score only goes up'); h = s.home; a = s.away; }
    for (const q of ['1st', '2nd', '3rd', '4th', 'OT'] as const) void rc.boxByPeriod[q];
    const sum = (side: 'home' | 'away') => (['1st', '2nd', '3rd', '4th', 'OT'] as const).reduce((t, q) => t + rc.boxByPeriod[q][side], 0);
    assert.equal(sum('home'), res.homeScore); assert.equal(sum('away'), res.awayScore);
  }
});
test('scoring is in time order, regulation before overtime, and overtime lines only in overtime', () => {
  const order = ['1st', '2nd', '3rd', '4th', 'OT'];
  for (const { res, rc } of all) {
    let prev = -1, prevAt = -1;
    for (const s of rc.scoring) { const i = order.indexOf(s.period); assert.ok(i >= prev); assert.ok(s.at >= prevAt); prev = i; prevAt = s.at; assert.equal(s.period === 'OT', s.at > 3600); }
    assert.equal(rc.overtime, res.ot !== null);
    if (!rc.overtime) assert.ok(rc.scoring.every((s) => s.period !== 'OT'));
  }
});
test('every line names the team that gained and the players; every defensive touchdown in the recap is in the events', () => {
  let defTd = 0;
  for (const { res, rc } of all) {
    for (const s of rc.scoring) { assert.ok(s.text.includes(nickname(s.team)), s.text); assert.ok(s.who.length >= 1 && s.who.every((w) => w.name.length > 0)); assert.ok(!/undefined|\bNaN\b/.test(s.text), s.text); }
    const inRecap = rc.scoring.filter((s) => s.label === 'Defensive TD').length, inEvents = res.events.filter((e) => e.kind === 'DEF_TD').length;
    assert.equal(inRecap, inEvents); defTd += inEvents;
    assert.equal(rc.turnovers.lines.filter((t) => t.defTD).length, inEvents, 'every returned turnover scored');
  }
  assert.ok(defTd > 3, 'saw defensive touchdowns ' + defTd);
});
test('every turnover is named (who gave it, who took it) and the count equals the team stats', () => {
  for (const { res, rc } of all) {
    assert.equal(rc.turnovers.home, res.stats.home.takeaways); assert.equal(rc.turnovers.away, res.stats.away.takeaways);
    assert.equal(rc.turnovers.lines.length, res.stats.home.takeaways + res.stats.away.takeaways);
    for (const t of rc.turnovers.lines) { assert.ok(t.giver.name && t.taker.name && t.giver.team !== t.taker.team); assert.ok(t.text.includes(t.giver.name) && t.text.includes(t.taker.name)); }
  }
});
test('the game ball is on the winning team, is always among the stars, and an offensive star has 60 or more yards', () => {
  let balls = 0, stars = 0;
  for (const { res, rc, box } of all) {
    if (res.homeScore === res.awayScore) continue;
    assert.ok(rc.ball, 'a decided game has a game ball'); balls++;
    assert.equal(rc.ball!.side, rc.winner);
    assert.ok(rc.stars.some((s) => s.ball && s.id === rc.ball!.id) && rc.stars.filter((s) => s.ball).length === 1);
    assert.ok(rc.stars.length >= 1 && rc.stars.length <= 6);
    for (const side of ['home', 'away'] as const) assert.ok(rc.stars.filter((x) => x.side === side && !x.ball).length <= 3, 'at most three stars a team besides the ball');
    for (const s of rc.stars) {
      stars++;
      const l = box.lines.find((x) => x.id === s.id) as PlayerLine;
      if (!s.ball && isOffense(l)) assert.ok(l.stats.ryd + l.stats.recYd >= 60 || l.stats.pyd >= 150, `${l.name} ${s.stat}`);
      if (!s.ball) assert.ok(gradeOf(l) >= 90);
    }
  }
  assert.ok(balls > 250 && stars > 300);
});
test('banned words never appear, and the same inputs give the same recap', () => {
  for (const { rc } of all) for (const line of rc.text) assert.ok(!/expected|before kickoff|sudden death/i.test(line) && !/undefined|\bNaN\b/.test(line), line);
  const a = play(2, 9, 555), b = play(2, 9, 555);
  assert.deepEqual(buildRecap(a.res, a.box).text, buildRecap(b.res, b.box).text);
});
test('the text starts with the score, lists quarters as 1st-4th, and uses the box-score line style', () => {
  const g = all.find((x) => x.rc.scoring.length >= 4) as (typeof all)[number];
  assert.match(g.rc.text[0], /^\w[\w .]* \d+, \w[\w .]* \d+/);
  assert.ok(g.rc.text.some((l) => /^(1st|2nd|3rd|4th) Quarter$/.test(l)));
  assert.ok(g.rc.text.some((l) => /^(Rushing TD|Passing TD|Field Goal|Defensive TD|Safety) · /.test(l)));
  assert.ok(g.rc.text.some((l) => /^Turnovers: \w[\w .]* \d+ - \d+ \w/.test(l)));
});
test('season stats add up from the games, leaders are ordered, and the awards pick sensible winners', () => {
  const ss = newSeasonStats(); let pyd = 0;
  for (const g of all.slice(0, 100)) { addBox(ss, g.box); for (const l of g.box.lines) pyd += l.stats.pyd; }
  assert.equal(Object.values(ss.players).reduce((t, p) => t + p.stats.pyd, 0), pyd);
  const top = leaders(ss, 'pyd', 5); for (let i = 1; i < top.length; i++) assert.ok(top[i - 1].stats.pyd >= top[i].stats.pyd);
  const table: Record<string, { w: number; l: number; t: number }> = {};
  for (const l of Object.values(ss.players)) table[l.team] ??= { w: 8, l: 9, t: 0 };
  const first = Object.keys(table).sort()[0]; table[first] = { w: 14, l: 3, t: 0 };
  const aw = seasonAwards(ss, table, Object.fromEntries(Object.keys(table).map((t) => [t, 8])));
  assert.equal(aw.coach!.team, first); assert.ok(aw.mvp && aw.opoy && aw.dpoy && aw.mvp.id !== aw.opoy.id);
  assert.ok(isOffense(aw.mvp!) && !isOffense(aw.dpoy!));
  assert.ok(aw.leaders.sack!.length > 0);
});

test('quarters and the clock follow the time of the score: 1st ends at 900 seconds, the clock counts down, overtime counts up', () => {
  let n = 0;
  for (const { rc } of all) for (const s of rc.scoring) {
    const q = s.at > 3600 ? 'OT' : ['1st', '2nd', '3rd', '4th'][Math.min(3, Math.ceil(s.at / 900) - 1)];
    assert.equal(s.period, q, `at ${s.at}`);
    const [m, sec] = s.clock.split(':').map(Number), secs = m * 60 + sec;
    if (s.period === 'OT') assert.equal(secs, Math.round(s.at - 3600)); else assert.equal(secs, Math.round(Math.ceil(s.at / 900) * 900 - s.at));
    n++;
  }
  assert.ok(n > 1000);
});

test('two-point conversions are narrated: good, failed, and extra points missed each appear exactly as often as they happened', () => {
  let good = 0, failed = 0, missed = 0;
  for (const { res, rc } of all) {
    const g = res.events.filter((e) => e.kind === 'TD' && e.conv === 'two').length, f = res.drives.filter((d) => d.conv === 'two_fail').length, m = res.drives.filter((d) => d.conv === 'xp_miss').length;
    assert.equal(rc.scoring.filter((x) => x.text.includes('2-Pt Conv good')).length, g);
    assert.equal(rc.scoring.filter((x) => x.text.includes('2-Pt Conv failed')).length, f);
    assert.equal(rc.scoring.filter((x) => x.text.includes('extra point missed')).length, m);
    good += g; failed += f; missed += m;
  }
  assert.ok(good > 20 && failed > 5 && missed > 5, `${good}/${failed}/${missed}`);
});

test('a team with six monster games still gets at most three stars, the game ball included (synthetic box)', () => {
  const g = play(4, 20, 818); const box = structuredClone(g.box);
  let k = 0; for (const l of box.lines) if (l.side === 'home' && ['DE1', 'DE2', 'DT1', 'MIKE', 'WILL', 'CB1'].includes(l.slot)) { l.stats.sack = 4; l.stats.intDef = 2; l.stats.tkl = 9; k++; }
  assert.equal(k, 6);
  const res = { ...g.res, homeScore: 30, awayScore: 10 };
  const rc = buildRecap(res, box);
  assert.equal(rc.stars.filter((s) => s.side === 'home').length, 3);
  assert.equal(rc.stars.filter((s) => s.ball).length, 1);
});
