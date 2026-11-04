import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTable, classify, derive, nextFor, CFG } from '../tools/council.mjs';

const D = 864e5, NOW = Date.UTC(2026, 10, 20, 12, 0);
const table = parseTable([
  '| ID | Tier | Title | Needs | Council work | Source |', '|---|---|---|---|---|---|',
  '| P-001 | P0 | Owner thing |  | do it | Owner 24 Oct |',
  '| P-002 | P2 | Council idea | P-001 | study | council |',
  '| P-003 | P3 | Old idea |  | study | council |',
  '| P-004 | P1 | Owner remove X |  | remove | Owner 21 Oct |',
  '## RETIRED', '| P-099 | P0 | gone |  | x | y |',
].join('\n'));
const f = (iso, seat, body, name) => classify({ name: `inbox/${iso}-${seat}-${name}.md`, ref: `council/${seat}`, seat, head: body });
const st = (recs, o = {}) => derive(table, recs, { now: NOW, epoch: Date.UTC(2026, 10, 19), ...o });

test('retired section is not parsed; legacy claim files are ignored', () => {
  assert.equal(table.has('P-099'), false);
  assert.equal(f('20261119-1000', 'ds', 'CLAIM: P-001', 'P-001-claim').kind, 'legacy');
  assert.equal(st([f('20261119-1000', 'ds', 'CLAIM: P-001', 'P-001-claim')]).items.get('P-001').status, 'OPEN');
});
test('work then 2 distinct reviews = REVIEWED; same seat twice does not count; reject reopens', () => {
  const w = f('20261119-1000', 'a', 'FOR: P-001', 'P-001-x');
  const r = (t, s, v) => f(t, s, `REVIEW-OF: x\nVERDICT: ${v}`, 'P-001-review');
  assert.equal(st([w, r('20261119-1100', 'b', 'ok')]).items.get('P-001').status, 'NEEDS-REVIEW');
  assert.equal(st([w, r('20261119-1100', 'b', 'ok'), r('20261119-1200', 'b', 'ok')]).items.get('P-001').status, 'NEEDS-REVIEW');
  assert.equal(st([w, r('20261119-1100', 'b', 'ok'), r('20261119-1200', 'c', 'improved')]).items.get('P-001').status, 'REVIEWED');
  assert.equal(st([w, r('20261119-1100', 'b', 'ok'), r('20261119-1200', 'c', 'rejected')]).items.get('P-001').status, 'REWORK');
});
test('dependants unblock and move up a tier when the dependency is REVIEWED', () => {
  const w = f('20261119-1000', 'a', 'FOR: P-001', 'P-001-x');
  const rv = ['b', 'c'].map((s, i) => f(`20261119-110${i}`, s, 'REVIEW-OF: x\nVERDICT: ok', 'P-001-review'));
  assert.deepEqual(st([]).items.get('P-002').blocked, ['P-001']);
  const s = st([w, ...rv]).items.get('P-002'); assert.deepEqual(s.blocked, []); assert.equal(s.eff, 1);
});
test('Owner items need two seats (or the Architect) to retire; council items need one', () => {
  const ret = (t, s, id) => f(t, s, `OP: RETIRE ${id} | BUILT | commit abc123`, `OP-retire-${id}`);
  assert.equal(st([ret('20261119-1000', 'muse', 'P-001')]).items.get('P-001').retired, null);
  assert.match(st([ret('20261119-1000', 'muse', 'P-001')]).items.get('P-001').pending, /needs 2/);
  assert.ok(st([ret('20261119-1000', 'muse', 'P-001'), ret('20261119-1100', 'beam', 'P-001')]).items.get('P-001').retired);
  assert.ok(st([ret('20261119-1000', 'architect', 'P-001')]).items.get('P-001').retired);
  assert.ok(st([ret('20261119-1000', 'muse', 'P-003')]).items.get('P-003').retired);
});
test('retire without evidence does nothing; REVIVE undoes a retirement', () => {
  const noEv = f('20261119-1000', 'muse', 'OP: RETIRE P-003 | BUILT | ', 'OP-retire-P-003');
  assert.equal(st([noEv]).items.get('P-003').retired, null);
  const ret = f('20261119-1000', 'muse', 'OP: RETIRE P-003 | BUILT | commit abc', 'OP-retire-P-003');
  const rev = f('20261119-1100', 'beam', 'OP: REVIVE P-003 | not built', 'OP-revive-P-003');
  assert.equal(st([ret, rev]).items.get('P-003').retired, null);
});
test('P2/P3 auto-retire after 21 idle days, warn at 14, KEEP resets; P0/P1 never auto-retire', () => {
  const late = (days) => ({ now: NOW + days * D, epoch: NOW });
  assert.equal(derive(table, [], late(10)).items.get('P-003').retired, null);
  assert.ok(derive(table, [], late(15)).items.get('P-003').staleIn <= 7);
  assert.equal(derive(table, [], late(22)).items.get('P-003').retired.why, 'STALE');
  assert.equal(derive(table, [], late(400)).items.get('P-001').retired, null);
  assert.equal(derive(table, [], late(400)).items.get('P-004').retired, null);
  const keep = f('20261208-1000', 'ds', 'OP: KEEP P-003 | still wanted', 'OP-keep-P-003');
  assert.equal(derive(table, [keep], { now: NOW + 22 * D, epoch: NOW }).items.get('P-003').retired, null);
});
test('probes: absence alone never retires; a passing present-probe does; a failing one blocks', () => {
  const p = (mode, needle) => f('20261119-1000', 'muse', `OP: PROBE P-004 | ${mode} | ${needle}`, 'OP-probe-P-004');
  const build = '<div>new text</div>';
  assert.equal(st([p('absent', 'old text')], { build }).items.get('P-004').retired, null);
  assert.ok(st([p('absent', 'old text'), p('present', 'new text')], { build }).items.get('P-004').retired);
  assert.equal(st([p('absent', 'old text'), p('present', 'missing')], { build }).items.get('P-004').retired, null);
  assert.equal(st([p('absent', 'new text'), p('present', 'new text')], { build }).items.get('P-004').retired, null);
});
test('seats can ADD P2/P3 items with derived ids, not P0/P1', () => {
  const add = f('20261119-1000', 'glyph', 'OP: ADD P2 | New idea | study it', 'OP-add-new-idea');
  const s = st([add]); const it = [...s.items.values()].find((i) => i.title === 'New idea');
  assert.ok(it && /^N-[0-9a-f]{4}$/.test(it.id) && it.status === 'OPEN');
  assert.equal([...st([f('20261119-1000', 'glyph', 'OP: ADD P0 | Sneaky | x', 'OP-add-s')]).items.values()].some((i) => i.title === 'Sneaky'), false);
});
test('ASKs go to every seat except the asker until answered; notes need an ACK', () => {
  const ask = f('20261119-1000', 'architect', 'ASK: how many X?\nFORMAT: number', 'ASK-x');
  assert.ok(nextFor(st([ask]), 'muse').some((x) => /ANSWER/.test(x.text)));
  assert.ok(!nextFor(st([ask]), 'architect').some((x) => /ANSWER/.test(x.text)));
  const ans = f('20261119-1100', 'muse', `ANSWER-OF: ${ask.base}`, 'ANSWER-x');
  assert.equal(st([ask, ans]).answered.has(ask.base), true);
  assert.ok(!nextFor(st([ask, ans]), 'beam').some((x) => /ANSWER/.test(x.text)));
  const note = f('20261119-1000', 'ds', 'TO-ARCHITECT: need a call', 'NOTE-x');
  assert.equal(st([note]).acked.size, 0);
  assert.equal(st([note, f('20261119-1200', 'architect', `ACK: ${note.base}`, 'ACK-x')]).acked.has(note.base), true);
});
test('config', () => { assert.equal(CFG.reviews, 2); });
test('the author cannot review their own work', () => {
  const w = f('20261119-1000', 'a', 'FOR: P-001', 'P-001-x');
  const own = f('20261119-1100', 'a', 'REVIEW-OF: x\nVERDICT: ok', 'P-001-review');
  const other = f('20261119-1200', 'b', 'REVIEW-OF: x\nVERDICT: ok', 'P-001-review');
  assert.equal(st([w, own, other]).items.get('P-001').nrev, 1);
});
test('prose mentioning the RETIRED header mid-line does not truncate the table', () => {
  const t = parseTable('Rows below `## RETIRED` are archived.\n| P-500 | P2 | x |  | y | council |\n## RETIRED\n| P-501 | P2 | z |  | y | council |');
  assert.deepEqual([...t.keys()], ['P-500']);
});
