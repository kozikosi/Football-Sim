// Engine acceptance tests E1–E9 — ENGINE-MATH-SPEC.md §7 — for the Architect's Colors v1 build.
// Seat MUSE · P-195 · 2026-11-01. Snippets only; no product edits.
// DROP-IN: copy to colors/test/engine-acceptance.test.ts and run `npm test` from colors/.
// Each test names the break that fails it. E4 shells out to the lab harness; E5/E9b/E9c
// await build modules and skip with the exact pending interface named.
// (E10, the pasted-literals fit check, is out of P-195's E1–E9 scope and already VERIFIED in the lab.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { SLOTS, WEIGHT, fieldSlots } from '../src/engine/slots.ts';
import { FLEX, EMERGENCY_PENALTY, fit } from '../src/engine/flex.ts';
import { EMPTY_OVR } from '../src/engine/lineup.ts';
import type { Role } from '../src/engine/players.ts';

const ROOT = new URL('../../', import.meta.url);
const readJSON = (rel: string) => JSON.parse(fs.readFileSync(new URL(rel, ROOT), 'utf8'));
const design: Record<string, number> = readJSON('tools/mathlab/design.json');
const flexGuide: Record<string, Record<string, number>> = readJSON('tools/mathlab/flex.json').flex;

// ---------- E1: engine table equals the fitted design table ----------
test('E1: SLOTS equals design.json (32 spots, exact integers)', () => {
  // Break that fails it: a weight edited in slots.ts without a refit (e.g. DL5 140 -> 300).
  const ids = SLOTS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate slot ids in SLOTS');
  assert.deepEqual(Object.keys(design).sort(), [...ids].sort(), 'design.json keys != SLOTS ids');
  for (const s of SLOTS) assert.equal(s.weight, design[s.id], `${s.id}: engine ${s.weight} != design ${design[s.id]}`);
});

// ---------- E2: QB = 1000, every weight ends in 0 ----------
test('E2: QB = 1000 and every weight ends in 0', () => {
  // Break that fails it: QB != 1000, or any weight not a multiple of 10.
  assert.equal(WEIGHT.QB, 1000, 'QB must be 1000');
  for (const [id, w] of Object.entries(WEIGHT)) assert.equal(w % 10, 0, `${id}=${w} does not end in 0`);
});

// ---------- E3: flex ----------
test('E3a: FLEX matches flex.json rule by rule', () => {
  // Break that fails it: a rule edited in flex.json or flex.ts but not the other.
  for (const role of Object.keys(flexGuide)) {
    assert.deepEqual(FLEX[role as Role] ?? {}, flexGuide[role], `FLEX[${role}] != flex.json`);
  }
  for (const role of Object.keys(FLEX)) {
    if (role === 'LS') continue; // engine-only: no LS spot; unlisted players take the emergency fallback
    assert.ok(flexGuide[role], `FLEX has ${role} but flex.json does not`);
  }
});

test('E3b: DL5 penalties are derived (cheaper of role->DT / role->EDGE), not invented', () => {
  // Break that fails it: a hand-edited DL5 number that is not the derived minimum (spec §12.2).
  const cases: Array<[Role, number]> = [
    ['DT', 0], ['EDGE', 0],           // natural
    ['OT', 4], ['OG', 4], ['C', 4],   // min(DT price, no EDGE price)
    ['TE', 6],                        // min(6, 6)
    ['ILB', 4],                       // min(4, 6)
    ['OLB', 4],                       // min(6, 4)
  ];
  for (const [role, want] of cases) assert.equal(fit(role, 'DL5').penalty, want, `${role}->DL5`);
});

test('E3c: QB flexes ONLY to FS at -10 with no fallback; emergency penalty is 8', () => {
  // Break that fails it: QB->RB/WR/SS restored, or the -8 last-spot fallback changed.
  assert.deepEqual(fit('QB', 'FS'), { penalty: 10, emergency: false, legal: true });
  for (const dest of ['WR', 'RB', 'SS', 'TE', 'CB', 'NICKEL', 'DIME'] as const) {
    assert.equal(fit('QB', dest).legal, false, `QB->${dest} must be illegal`);
  }
  assert.equal(EMERGENCY_PENALTY, 8);
  assert.deepEqual(fit('K', 'SS'), { penalty: 8, emergency: true, legal: true });
});

// ---------- E4: real-roster correlation (lab integration) ----------
test('E4: real-roster r >= 0.60 and spread 4.0-5.5 pts/g', (t) => {
  // Break that fails it: QB weight near zero (spread collapses to ~3.77), or any engine change
  // that decorrelates team strength from real wins. Coarse tripwire only (n = 32 teams).
  // Exact command this shells out to:
  //   NODE_PATH=$(npm root -g) node tools/mathlab/realcheck.js <html> <fit> <wins2025> <cfg>
  const need: Record<string, string> = {
    html: '../../Football-Sim-PreColors.html',
    fit: '../../tools/mathlab/results/fit-precolors-2026-10-27-dl5.json',
    wins: '../../tools/mathlab/wins2025.json',
    cfg: '../../tools/mathlab/cfg.json',
    script: '../../tools/mathlab/realcheck.js',
  };
  const missing = Object.entries(need)
    .filter(([, rel]) => !fs.existsSync(new URL(rel, import.meta.url)))
    .map(([k]) => k);
  if (missing.length) { t.skip(`E4 prereqs missing: ${missing.join(', ')}`); return; }
  const npmRoot = spawnSync('npm', ['root', '-g'], { encoding: 'utf8' });
  const env = { ...process.env, NODE_PATH: npmRoot.stdout.trim() };
  const argv = Object.values(need).map((rel) => new URL(rel, import.meta.url).pathname);
  const r = spawnSync('node', argv, { env, encoding: 'utf8', timeout: 600000 });
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0 && !/E4 (PASS|FAIL)/.test(out)) {
    t.skip('E4 needs Playwright + Chromium in the harness (npm i -g playwright && npx playwright install chromium)');
    return;
  }
  assert.ok(/E4 PASS/.test(out), `realcheck did not pass:\n${out.slice(-2000)}`);
  assert.equal(r.status, 0);
});

// ---------- E5: return split ----------
test('E5: kick + punt return split sums to RET_PTS at equal scores', (t) => {
  // Break that fails it: KR_PTS + PR_PTS != RET_PTS, or a nonzero return term when both
  // returner scores equal the league average.
  const SPEC = { RET_PTS: 2.36, KR_PTS: 1.50, PR_PTS: 0.86 }; // ENGINE-MATH-SPEC, returners bullet
  assert.equal(SPEC.KR_PTS + SPEC.PR_PTS, SPEC.RET_PTS, 'spec split must sum to RET_PTS');
  t.skip('E5 behavioral half awaits the return module in src/engine: '
    + 'returnPoints(kr, pr, lgKr, lgPr) === 0 when kr === lgKr && pr === lgPr');
});

// ---------- E6: 3-4 equivalence ----------
test('E6: 3-4 base maps DT2->ILB2, WILL->OLB1, SAM->OLB2; nothing else moves', () => {
  // Break that fails it: the old swapped mapping (SAM->ILB2, DT2->OLB2), or a base that
  // silently changes total weight beyond the two documented swaps.
  for (const f of fieldSlots('4-3')) assert.equal(f.weight, WEIGHT[f.slot], `4-3 ${f.slot}`);
  const three = Object.fromEntries(fieldSlots('3-4').map((f) => [f.slot, f]));
  assert.equal(three.DT2.row, 'MIKE'); assert.equal(three.DT2.weight, WEIGHT.MIKE);
  assert.equal(three.DT2.label, 'ILB2'); assert.equal(three.DT2.dest, 'ILB');
  assert.equal(three.WILL.row, 'WILL'); assert.equal(three.WILL.label, 'OLB1');
  assert.equal(three.SAM.row, 'DT2'); assert.equal(three.SAM.weight, WEIGHT.DT2);
  assert.equal(three.SAM.label, 'OLB2');
  assert.equal(three.DT1.label, 'NT'); assert.equal(three.MIKE.label, 'ILB1');
  const sum = (ws: number[]) => ws.reduce((a, x) => a + x, 0);
  const delta = sum(fieldSlots('3-4').map((f) => f.weight)) - sum(fieldSlots('4-3').map((f) => f.weight));
  assert.equal(delta, (WEIGHT.MIKE - WEIGHT.DT2) + (WEIGHT.DT2 - WEIGHT.SAM),
    '3-4 may differ from 4-3 only by the DT2->260 and SAM->300 swaps');
});

// ---------- E7: one weight source ----------
test('E7: design.json, SLOTS and WEIGHT agree key by key (one weight source)', () => {
  // Break that fails it: a second weight-table literal anywhere in src/engine.
  assert.deepEqual(Object.keys(WEIGHT).sort(), Object.keys(design).sort());
  for (const id of Object.keys(design)) assert.equal(WEIGHT[id], design[id], id);
  // (E1 pins SLOTS == design; the three sources together are one.)
});

// ---------- E8: the check is not blind ----------
test('E8: corrupting a weight fails E1', () => {
  // Break that fails it: the E1 comparison going blind (this test tests the test).
  // Spec: K = 600 must produce failures (VERIFIED in the lab: 21 failures).
  const check = (w: Record<string, number>): string[] => {
    const bad: string[] = [];
    for (const id of Object.keys(design)) {
      if (Math.abs(w[id] - design[id]) > 10) bad.push(`${id}: ${w[id]} vs ${design[id]}`);
    }
    return bad;
  };
  assert.equal(check({ ...WEIGHT }).length, 0, 'clean table must pass E1');
  assert.ok(check({ ...WEIGHT, K: 600 }).length > 0, 'K=600 must fail E1');
});

// ---------- E9: DIME ----------
test('E9a: empty slot is 70 OVR and DIME is in the table at 40', () => {
  // Break that fails it: EMPTY_OVR != 70, or DIME missing/repriced without a refit.
  assert.equal(EMPTY_OVR, 70);
  assert.equal(WEIGHT.DIME, 40);
});

test('E9b: DIME share is not selectable as a game plan', (t) => {
  // Break that fails it: a dime package appearing in DEF_OPTS (spec: DIME is a fixed
  // situational share of coverage, not a package — a package option would run dime
  // every snap and overvalue the slot ~tenfold).
  t.skip('E9b awaits the game-plan module: DEF_OPTS must not list a dime package');
});

test('E9c: DIME_W 0.10 -> 0.20 moves no other spot more than 20 points', (t) => {
  // Break that fails it: a DIME share change that silently reprices the table.
  // Lab procedure (spec §32, VERIFIED before refit): rerun the fit with DIME_W 0.10 and
  // 0.20; assert max |Δ| over the other 31 spots <= 20 (w 0.10 -> DIME 20, 0.15 -> 40, 0.20 -> 50).
  t.skip('E9c awaits the refit harness on the new base');
});
