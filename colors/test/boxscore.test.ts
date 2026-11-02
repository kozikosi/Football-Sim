import { test } from 'node:test';
import assert from 'node:assert/strict';
import { play, league, side } from './fixture.ts';
import { makeRng } from '../src/engine/rng.ts';
import { simulateGame } from '../src/engine/drives.ts';
import { matchupModel } from '../src/engine/matchup.ts';
import { teamIdentity } from '../src/engine/plans.ts';
import { buildBoxScore } from '../src/engine/boxscore.ts';
import { STAT_KEYS, pointsOf } from '../src/engine/boxscore.ts';
import type { BoxScore, PlayerLine } from '../src/engine/boxscore.ts';
import type { GameResult, Side } from '../src/engine/drives.ts';

const sum = (box: BoxScore, side: Side, k: (typeof STAT_KEYS)[number]) => box.lines.filter((l) => l.side === side).reduce((t, l) => t + l.stats[k], 0);
const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');

function identities(res: GameResult, box: BoxScore, tag: string) {
  for (const s of ['home', 'away'] as const) {
    const t = res.stats[s], o = other(s);
    assert.equal(sum(box, s, 'ryd'), t.rush, `${tag} ${s} rushing yards`);
    assert.equal(sum(box, s, 'recYd'), t.pass, `${tag} ${s} receiving yards`);
    assert.equal(sum(box, s, 'pyd'), t.pass, `${tag} ${s} passing yards`);
    assert.equal(sum(box, s, 'sacked'), t.sacksTaken, `${tag} ${s} sacks taken`);
    assert.equal(sum(box, o, 'sack'), t.sacksTaken, `${tag} ${o} sacks made = ${s} sacks taken`);
    assert.equal(sum(box, s, 'cmp'), sum(box, s, 'rec'), `${tag} completions = receptions`);
    assert.ok(sum(box, s, 'att') >= sum(box, s, 'cmp'));
    assert.equal(sum(box, s, 'tgt'), sum(box, s, 'att'), `${tag} targets = attempts`);
    assert.equal(sum(box, s, 'fgm'), t.fgMade, `${tag} field goals`);
    assert.equal(sum(box, s, 'fga'), t.fgMade + t.fgMissed);
    assert.equal(sum(box, s, 'intDef') + sum(box, s, 'fr'), t.takeaways, `${tag} takeaways = interceptions + fumble recoveries`);
    assert.equal(sum(box, s, 'ints') + sum(box, s, 'fumLost'), t.giveaways, `${tag} giveaways`);
    // tackles: every run and catch is tackled unless it scored; sacks are tackles too
    const scrimTds = sum(box, s, 'rtd') + sum(box, s, 'recTd');
    assert.equal(sum(box, o, 'tkl'), sum(box, s, 'car') + sum(box, s, 'rec') + sum(box, s, 'sacked') - scrimTds, `${tag} tackles`);
    assert.ok(sum(box, o, 'tfl') <= sum(box, o, 'tkl'));
  }
  // points: every point of the final score belongs to a named player (touchdown 6, kick, conversion, safety)
  for (const s of ['home', 'away'] as const) {
    const pts = box.lines.filter((l) => l.side === s).reduce((t, l) => t + pointsOf(l), 0);
    assert.equal(pts, s === 'home' ? res.homeScore : res.awayScore, `${tag} ${s} points`);
  }
  // credits: one per drive, the same order, and each scoring drive names its scorer
  assert.equal(box.credits.length, res.drives.length);
  box.credits.forEach((c, i) => { assert.equal(c.drive, i); assert.equal(c.side, res.drives[i].side); if (res.drives[i].end === 'TD') assert.ok(c.scorer && c.tdYards !== undefined); if (res.drives[i].end === 'INT' || res.drives[i].end === 'FUM') assert.ok(c.giver && c.taker); });
}

test('every team stat equals the sum of its players, over 120 games including overtime and playoffs', () => {
  const { teams } = league(); let ot = 0, defTd = 0;
  for (let n = 0; n < 120; n++) {
    const i = n % 32, j = (n * 7 + 3) % 32 === i ? (i + 1) % 32 : (n * 7 + 3) % 32;
    const { res, box } = play(i, j, 9000 + n, n % 5 === 0);
    identities(res, box, `game ${n}`);
    if (res.ot) ot++; defTd += res.events.filter((e) => e.kind === 'DEF_TD').length;
    for (const l of box.lines) for (const k of STAT_KEYS) assert.ok(Number.isInteger(l.stats[k]) && l.stats[k] >= 0, `${l.name} ${k}`);
  }
  assert.ok(teams.length === 32 && ot > 0 && defTd > 0, `saw overtime ${ot} and defensive touchdowns ${defTd}`);
});

test('a touchdown scorer has the touchdown on his line, and the named passer threw it', () => {
  for (let n = 0; n < 40; n++) {
    const { res, box } = play(n % 32, (n + 11) % 32, 4000 + n);
    const tds = new Map<string, number>(); const thrown = new Map<string, number>();
    box.credits.forEach((c) => { if (c.scorer) tds.set(c.scorer.id, (tds.get(c.scorer.id) ?? 0) + 1); if (c.kind === 'PASS_TD' && c.passer) thrown.set(c.passer.id, (thrown.get(c.passer.id) ?? 0) + 1); });
    for (const [id, k] of tds) { const l = box.lines.find((x) => x.id === id) as PlayerLine; assert.equal(l.stats.rtd + l.stats.recTd, k); }
    for (const [id, k] of thrown) assert.equal((box.lines.find((x) => x.id === id) as PlayerLine).stats.ptd, k);
    void res;
  }
});

test('SPD and STR decide who gets credit: equal-rated edges, the faster one gets more sacks; the team result does not change', () => {
  const { teams, lg } = league();
  const mk = (spd1: number, spd2: number) => {
    const t = structuredClone(teams[3]);
    for (const pl of t.lineup.placements) {
      if (pl.slot.slot === 'DE1' && pl.player) { pl.player.ovr = 90; pl.effOvr = 90; pl.player.spd = spd1; pl.player.str = 80; }
      if (pl.slot.slot === 'DE2' && pl.player) { pl.player.ovr = 90; pl.effOvr = 90; pl.player.spd = spd2; pl.player.str = 80; }
    }
    return t;
  };
  const T = mk(97, 62), opp = teams[9];
  let fast = 0, slow = 0;
  for (let g = 0; g < 500; g++) {
    const rng = makeRng(31000 + g);
    const ih = teamIdentity(opp.ratings, lg), ia = teamIdentity(T.ratings, lg);
    const res = simulateGame(matchupModel(opp.ratings, T.ratings, lg, { off: ih.off, def: ia.def }), matchupModel(T.ratings, opp.ratings, lg, { off: ia.off, def: ih.def }), rng.fork('game'), { playoff: false });
    const A = buildBoxScore(res, side(opp), side(T), rng.fork('box')), B = buildBoxScore(res, side(opp), side(mk(62, 97)), rng.fork('box'));
    for (const l of A.lines) { if (l.slot === 'DE1' && l.team === T.name) fast += l.stats.sack; if (l.slot === 'DE2' && l.team === T.name) slow += l.stats.sack; }
    // same game, speeds swapped: the score and the team stats are identical, only the credit moves
    assert.equal(A.lines.reduce((t, l) => t + l.stats.sack, 0), B.lines.reduce((t, l) => t + l.stats.sack, 0));
  }
  assert.ok(fast > 1.15 * slow, `fast edge ${fast} vs slow edge ${slow}`);
});
test('a faster runner averages more yards a carry, and team rushing yards never change', () => {
  const { teams, lg } = league();
  const mk = (spd: number) => { const t = structuredClone(teams[5]); for (const pl of t.lineup.placements) if ((pl.slot.slot === 'RB1' || pl.slot.slot === 'RB2') && pl.player) { pl.player.ovr = 80; pl.effOvr = 80; pl.player.spd = pl.slot.slot === 'RB1' ? spd : 75; } return t; };
  let yFast = 0, cFast = 0, yBase = 0, cBase = 0;
  for (let g = 0; g < 400; g++) {
    const rng = makeRng(41000 + g), T = mk(99), B = mk(60), opp = teams[12];
    const ih = teamIdentity(opp.ratings, lg), ia = teamIdentity(T.ratings, lg);
    const res = simulateGame(matchupModel(opp.ratings, T.ratings, lg, { off: ih.off, def: ia.def }), matchupModel(T.ratings, opp.ratings, lg, { off: ia.off, def: ih.def }), rng.fork('game'), { playoff: false });
    const A = buildBoxScore(res, side(opp), side(T), rng.fork('box')), C = buildBoxScore(res, side(opp), side(B), rng.fork('box'));
    for (const l of A.lines) if (l.slot === 'RB1' && l.team === T.name) { yFast += l.stats.ryd; cFast += l.stats.car; }
    for (const l of C.lines) if (l.slot === 'RB1' && l.team === T.name) { yBase += l.stats.ryd; cBase += l.stats.car; }
    assert.equal(A.lines.filter((l) => l.team === T.name).reduce((t, l) => t + l.stats.ryd, 0), res.stats.away.rush);
  }
  assert.ok(yFast / cFast > 1.05 * (yBase / cBase), `yards per carry fast ${yFast / cFast} vs slow ${yBase / cBase}`);
});

test('a scoring play gains at least a yard whenever the drive gained more than one on that kind of play (600 games)', () => {
  let rush = 0, pass = 0;
  for (let n = 0; n < 600; n++) {
    const { res, box } = play(n % 32, (n + 9) % 32, 70000 + n);
    box.credits.forEach((c, i) => { const d = res.drives[i]; if (c.kind === 'RUSH_TD') { rush++; if (d.rush > 1) assert.ok((c.tdYards as number) >= 1, `rush td ${c.tdYards} on ${d.rush}`); } if (c.kind === 'PASS_TD') { pass++; if (d.pass > 1) assert.ok((c.tdYards as number) >= 1); } });
  }
  assert.ok(rush > 300 && pass > 500, `saw ${rush} rushing and ${pass} passing touchdowns`);
});
