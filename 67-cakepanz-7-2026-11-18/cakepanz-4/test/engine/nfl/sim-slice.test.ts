import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gameKeyOf } from '../../../src/engine/core/keyedrng.ts';
import { logBuilder, logHash, validateLog } from '../../../src/engine/core/events.ts';
import { makePack, verifyPack } from '../../../src/engine/core/pack.ts';
import type { ModelPack } from '../../../src/engine/core/pack.ts';
import { fgMakeProb, pickPmf, runDrive, tilt } from '../../../src/engine/sports/nfl/sim/drive.ts';
import type { DriveEndP, FbEvent, Matchup, PlayP } from '../../../src/engine/sports/nfl/sim/drive.ts';
import { boxScoreView } from '../../../src/engine/sports/nfl/sim/box.ts';
import { readParams, readRules, toyPack, withLambda } from '../../../src/engine/sports/nfl/sim/toypack.ts';

// All numbers in the toy pack are NOT calibrated (see toypack.ts). These tests check the PLUMBING and the invariants of the model's form, and report
// distributions as information; none of them pins a toy number as a football target.
const rules = readRules(toyPack);
function drive(seed: number | string, opts: { pack?: ModelPack; matchup?: Matchup; ydl?: number; clock?: number } = {}) {
  const lb = logBuilder<FbEvent>();
  const out = runDrive(lb, { key: gameKeyOf(seed), pack: opts.pack ?? toyPack, ...(opts.matchup ? { matchup: opts.matchup } : {}) }, { drive: 0, team: 'A', opp: 'B', ydl: opts.ydl ?? 75, clock: opts.clock ?? 900, t0: 0 });
  return { events: lb.events, out };
}
const plays = (events: readonly FbEvent[]): PlayP[] => events.flatMap((e) => (e.kind === 'play' ? [e.payload] : []));

test('one drive, all the way: pack -> keyed draws -> events -> fold -> box score view', () => {
  const { events, out } = drive('slice-1');
  validateLog(events);
  assert.equal(events[0]?.kind, 'drive_start'); assert.equal(events[events.length - 1]?.kind, 'drive_end');
  const v = boxScoreView(events, rules);
  assert.deepEqual(v.teams.map((t) => t.team), ['A', 'B']);
  assert.equal(v.drives.length, 1); assert.equal(v.drives[0]?.result, out.end.result);
  assert.equal(v.teams[0]?.plays, plays(events).filter((p) => p.call === 'pass' || p.call === 'run').length);
  assert.ok(verifyPack(toyPack), 'the toy pack hashes to its own hash');
});

test('every screen agrees: drive table, team lines and scoring summary are sums of the same events (500 drives)', () => {
  for (let n = 0; n < 500; n++) {
    const { events } = drive('agree-' + n, { clock: 600 });
    const v = boxScoreView(events, rules), a = v.teams[0]!, b = v.teams[1]!;
    assert.equal(v.drives.reduce((s, d) => s + d.yards, 0), a.netYards, `net yards, drive ${n}`);
    assert.equal(a.netYards, a.rushYards + a.passYards - a.sackYards, 'net = rush + pass - sack yards');
    assert.equal(v.drives.reduce((s, d) => s + d.secs, 0), a.secs); assert.equal(plays(events).reduce((s, p) => s + p.dt, 0), a.secs);
    assert.equal(v.drives.reduce((s, d) => s + d.plays, 0), plays(events).length);
    assert.equal(v.scoring.reduce((s, r) => s + (r.team === 'A' ? r.points : 0), 0), a.points); assert.equal(v.scoring.reduce((s, r) => s + (r.team === 'B' ? r.points : 0), 0), b.points);
    const last = v.scoring[v.scoring.length - 1];
    if (last) assert.deepEqual([last.home, last.away], [a.points, b.points], 'running score ends at the final score');
    assert.equal(a.giveaways, a.interceptions + a.fumblesLost);
    assert.equal(a.passAtt, a.completions + a.interceptions + plays(events).filter((p) => p.outcome === 'incomplete').length);
    assert.equal(a.plays, a.passAtt + a.rushAtt + a.sacksTaken);
  }
});

test('invariants on every play of 3,000 drives: field, down, clock, result all consistent', () => {
  const seen = new Map<string, number>();
  for (let n = 0; n < 3000; n++) {
    const start = 1 + (n * 37) % 99, clock = n % 7 === 0 ? 90 : 900;
    const { events, out } = drive('inv-' + n, { ydl: start, clock });
    const ps = plays(events);
    let secs = 0;
    ps.forEach((p, k) => {
      assert.ok(p.down >= 1 && p.down <= 4 && p.ytg >= 1 && p.ydl >= 1 && p.ydl <= 100 && p.ytg <= p.ydl, `state ${JSON.stringify(p)}`);
      assert.ok(p.dt >= 0 && Number.isInteger(p.yards));
      if (p.call === 'pass' || p.call === 'run') assert.equal(p.ydlAfter, p.ydl - p.yards);
      if (p.td) assert.ok(p.ydlAfter <= 0); if (p.safety) assert.ok(p.ydlAfter >= 100);
      if (p.call === 'punt' || p.call === 'fg') assert.equal(p.yards, 0);
      if (p.call === 'fg') assert.equal(p.kickYards, p.ydl + 17);
      if (p.down === 4 && p.call !== 'punt' && p.call !== 'fg') assert.ok(p.ytg <= rules.goMaxYtg && p.ydl <= rules.goMaxYdl && p.ydl > rules.fgMaxYdl, 'a 4th-down go-for-it follows the rule');
      if (k > 0) { const q = ps[k - 1]!; if (!q.turnover) assert.ok(p.down === 1 || p.down === q.down + 1, 'down advances or resets'); }
      secs += p.dt;
    });
    assert.equal(secs, out.end.secs); assert.ok(secs <= clock && out.clockLeft === clock - secs);
    const last = ps[ps.length - 1], r = out.end.result;
    if (r === 'td') assert.ok(last?.td); if (r === 'safety') assert.ok(last?.safety); if (r === 'fg') assert.equal(last?.outcome, 'fg_good'); if (r === 'fgmiss') assert.equal(last?.outcome, 'fg_miss');
    if (r === 'punt') assert.equal(last?.call, 'punt'); if (r === 'to') assert.ok(last?.turnover);
    if (r === 'clock') assert.ok(out.clockLeft === 0 && out.end.next === null); else assert.ok(out.end.next !== null && out.end.next.team === 'B' && out.end.next.ydl >= 1 && out.end.next.ydl <= 100);
    seen.set(r, (seen.get(r) ?? 0) + 1);
  }
  for (const r of ['td', 'fg', 'fgmiss', 'punt', 'to', 'downs', 'clock']) assert.ok((seen.get(r) ?? 0) > 0, `result ${r} never occurred in 3,000 drives: ${[...seen.keys()]}`);
  console.log('REPORT (toy pack, information only):', JSON.stringify(Object.fromEntries([...seen].sort())));
});

test('replay: same key and pack give the same log; another key or another pack gives another', () => {
  const h = (s: number | string, pack?: ModelPack) => logHash(drive(s, pack ? { pack } : {}).events);
  assert.equal(h('r1'), h('r1')); assert.notEqual(h('r1'), h('r2'));
  assert.notEqual(withLambda(toyPack, 0.5).hash, toyPack.hash, 'a pack change is a different pack hash');
  assert.equal(h('r1'), h('r1', withLambda(toyPack, 0.5)), 'but with no gap the lambda pack replays the same log');
});

test('keyed coupling: changing ONE node (pass-yards pmf) leaves every earlier play identical and changes the first completion', () => {
  const body = { ...toyPack } as Record<string, unknown>; delete body['hash'];
  const alt = makePack({ ...(body as Omit<ModelPack, 'hash'>), id: 'toy-alt', params: { ...toyPack.params, 'yards.pass': { v: [3, 6, 9, 13, 19, 29, 46], w: [0.15, 0.25, 0.25, 0.17, 0.1, 0.06, 0.02] } } });
  let compared = 0;
  for (let n = 0; n < 200; n++) {
    const a = plays(drive('cpl-' + n).events), b = plays(drive('cpl-' + n, { pack: alt }).events);
    const firstCmp = a.findIndex((p) => p.outcome === 'complete');
    if (firstCmp < 0) continue;
    for (let k = 0; k < firstCmp; k++) assert.deepEqual(a[k], b[k], `play ${k} before the first completion must be identical`);
    assert.equal(a[firstCmp]?.call, b[firstCmp]?.call); assert.equal(a[firstCmp]?.outcome, 'complete'); assert.equal(b[firstCmp]?.outcome, 'complete');
    assert.equal(b[firstCmp]!.yards, Math.min(a[firstCmp]!.yards + 1, a[firstCmp]!.ydl), 'same uniform, support shifted by one: one more yard unless capped at the goal line');
    compared++;
  }
  assert.ok(compared > 100, 'compared ' + compared);
});

test('lambda seam: with lambda 0 (or gap 0) the matchup is inert; with lambda > 0 a bigger pass gap lifts completions and cuts sacks, monotonically', () => {
  const neutral = logHash(drive('seam').events);
  assert.equal(logHash(drive('seam', { matchup: { passGap: 3 } }).events), neutral, 'lambda 0: a gap changes nothing, bit for bit');
  const on = withLambda(toyPack, 0.8);
  assert.equal(logHash(drive('seam', { pack: on, matchup: { passGap: 0 } }).events), neutral, 'gap 0: lambda changes nothing, bit for bit');
  const rate = (gap: number) => {
    let cmp = 0, att = 0, sack = 0, dropbacks = 0;
    for (let n = 0; n < 1500; n++) for (const p of plays(drive('seamrate-' + n, { pack: on, matchup: { passGap: gap }, clock: 900 }).events)) {
      if (p.call !== 'pass') continue;
      dropbacks++; if (p.outcome === 'sack') sack++; else { att++; if (p.outcome === 'complete') cmp++; }
    }
    return { cmp: cmp / att, sack: sack / dropbacks };
  };
  const lo = rate(-1), mid = rate(0), hi = rate(1);
  assert.ok(lo.cmp < mid.cmp && mid.cmp < hi.cmp, `completion ${lo.cmp} < ${mid.cmp} < ${hi.cmp}`);
  assert.ok(lo.sack > mid.sack && mid.sack > hi.sack, `sack ${lo.sack} > ${mid.sack} > ${hi.sack}`);
});

test('tilt: a probability vector in, a probability vector out; zero scale returns the baseline exactly', () => {
  const p = [0.1, 0.2, 0.3, 0.4], th = [-1, 0, 0.5, 1];
  assert.deepEqual(tilt(p, th, 0, 5), p); assert.deepEqual(tilt(p, th, 2, 0), p);
  const q = tilt(p, th, 1, 2);
  assert.ok(Math.abs(q.reduce((a, b) => a + b, 0) - 1) < 1e-15); assert.ok(q[0]! < p[0]! && q[3]! > p[3]!);
});

test('field-goal curve is built on pmath: decreasing in distance, inside (0,1), and equals the closed form to 1e-12', () => {
  const par = readParams(toyPack);
  let prev = 1;
  for (let ydl = 1; ydl <= 60; ydl++) {
    const p = fgMakeProb(par, ydl), ref = 1 / (1 + Math.exp(-(par.fg.a - par.fg.b * (ydl + par.fg.snap))));
    assert.ok(p > 0 && p < 1 && p < prev, `ydl ${ydl}`); assert.ok(Math.abs(p - ref) < 1e-12, `ydl ${ydl}: ${p} vs ${ref}`);
    prev = p;
  }
});

test('pickPmf is an inverse CDF: u in [0,1) maps monotonically to the support and hits both ends', () => {
  const m = { v: [1, 2, 3], w: [1, 2, 1] };
  assert.equal(pickPmf(m, 0), 1); assert.equal(pickPmf(m, 0.24), 1); assert.equal(pickPmf(m, 0.26), 2); assert.equal(pickPmf(m, 0.74), 2); assert.equal(pickPmf(m, 0.76), 3); assert.equal(pickPmf(m, 0.999999), 3);
});

test('a broken pack fails at load, not three plays in', () => {
  const body = { ...toyPack } as Record<string, unknown>; delete body['hash'];
  const mk = (params: Record<string, unknown>): ModelPack => makePack({ ...(body as Omit<ModelPack, 'hash'>), id: 'bad', params: params as ModelPack['params'] });
  assert.throws(() => readParams(mk({ ...toyPack.params, passResult: { sack: 0.1, int: 0.1, inc: 0.1, cmp: 0.1 } })), /sum to 1/);
  assert.throws(() => readParams(mk({ ...toyPack.params, 'yards.run': { v: [1, 2], w: [1] } })), /equal-length/);
  assert.throws(() => readParams(mk({ ...toyPack.params, 'yards.run': { v: [1, 2], w: [1, -1] } })), /negative/);
  assert.throws(() => readParams(mk({ ...toyPack.params, lambda: 'x' })), /finite number/);
});

test('the sim folder uses no ambient time, randomness or non-portable math (the portability lint covers it too)', () => {
  const dir = new URL('../../../src/engine/sports/nfl/sim/', import.meta.url);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.ts'))) {
    const s = fs.readFileSync(new URL(f, dir), 'utf8').replace(/\/\/.*$/gm, '');
    assert.ok(!/Math\.random|Date\.now|new Date|performance\.now/.test(s), f);
    assert.ok(!/\bMath\.(exp|log|tanh|pow|sin|cos|sqrt)\b|\*\*/.test(s), f);
  }
});

// Recorded from this code on 15 Nov 2026 (a regression pin on replay, NOT an independent check: the cross-engine/Python conformance vectors are a later K step).
const GOLDEN = { pack: 'pack53:12000076ef01c1', log: 'log53:041b321ed8da4a', result: 'fgmiss', events: 9 };
test('golden: the fixed-key drive replays to the recorded log hash for the recorded pack hash (re-record both together when the pack changes)', () => {
  const { events, out } = drive('slice-golden');
  const got = { pack: toyPack.hash, log: logHash(events), result: (out.end as DriveEndP).result, events: events.length };
  assert.deepEqual(got, GOLDEN, 'if only the pack hash differs, the toy pack changed: re-record. If only the log differs, replay changed: that is a defect or a stream-version change');
});
