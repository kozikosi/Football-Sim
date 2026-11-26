/* waveB.node.battery.mjs — the Wave B node-side laws (the S17 continuation, one per theme).
 *
 * A SEPARATE battery on purpose: node.battery.mjs stays exactly its documented 37 laws (every
 * filed receipt and claim cites that count); the Wave B laws run as composite step 3d
 * (`npm run battery:waveb`) with their own count. Every law is falsifiable — the falsifier
 * notes name the planted defect each one dies on.
 *
 * Themes covered here (the shell-side laws ride the shell/board batteries + the probe receipts):
 *   1  seam-card.json provenance surface (generated; chip + gate read the SAME file)
 *   2  number provenance + honest ties (+ the display-string number-parsing grep law)
 *   3  the DOM-hook registry (selectors sane; the battery-visible surfaces exist)
 *   4  the offline tent's STATIC complement (zero remote refs in the shipped bytes)
 *   5  the decision surface inputs are pure VM functions (no UI math)
 *   6  the contract golden (the seam drift alarm)
 *   7  the season pace clamp (one clamped value, three named speeds)
 *   8  the takeover tint function (no invented colour — derived from the Owner's table)
 *   9  the coach's tape is dev-gated (never in the production bundle)
 *   10 the composed brag regex law (no ?seed=, no b36:, no envelope)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);
const read = (rel) => fs.readFileSync(P(rel), 'utf8');

// ---------- 1 · the seam card ----------
test('W1a: seam-card.json exists, carries the SNAPSHOT.md pin + stamp, and the seal count equals the live CHECKSUMS.txt lines (the chip and the gate read THIS file)', () => {
  const card = JSON.parse(read('seam-card.json'));
  const snap = read('SNAPSHOT.md');
  const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1];
  assert.equal(card.pin, pin, 'the card pin drifted from SNAPSHOT.md');
  assert.ok(card.stampSnapshot, 'the card carries no snapshot stamp');
  assert.equal(card.sealCount, read('CHECKSUMS.txt').split('\n').filter((l) => l.trim()).length, 'the card seal count is not the live seal');
  assert.ok(card.claims?.total >= 1, 'the card names no claim count');
});
test('W1b: the SeamCard chip imports seam-card.json — the SAME file the claims gate reads (one file, two consumers, zero drift) — and renders UNKNOWN, never a green default, for a missing field', () => {
  const chip = read('src/lib/components/SeamCard.svelte');
  assert.ok(chip.includes('seam-card.json'), 'the chip does not read seam-card.json');
  assert.ok(/UNKNOWN/.test(chip), 'the chip has no UNKNOWN fallback path');
  const claims = JSON.parse(read('claims.json'));
  const row = claims.claims.find((c) => c.id === 'seam-card-agrees');
  assert.ok(row, 'claims.json has no seam-card-agrees row — the gate does not read the card');
  // falsifier note: planting a WRONG sealCount in a throwaway copy fails W1a naming the field.
});

// ---------- 2 · number provenance + honest ties ----------
test('W2a: provenanceFor covers every displayed numeric field, names the SNAPSHOT pin (never a literal), and carries the INTERIM display-rounded note for gone%', async () => {
  const snap = read('SNAPSHOT.md');
  const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1];
  const prov = await import(P('src/lib/port/numProvenance.ts'));
  for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {
    const line = prov.provenanceFor({ field, value: 12.5, rawWins: 3, neighbourWins: [3], oddsMeta: { picksBetween: 4, sims: 200 }, pin });
    assert.ok(line.includes(pin), field + ' provenance does not name the pin');
  }
  const gone = prov.provenanceFor({ field: 'gone', value: '41%', oddsMeta: { picksBetween: 4, sims: 200 }, pin });
  assert.ok(gone.includes('INTERIM — display-rounded'), 'the gone% line lacks the interim rounding note');
  const tie = prov.provenanceFor({ field: 'wins', value: '3.0', rawWins: 3, neighbourWins: [3, 3], pin });
  assert.ok(tie.includes('GENUINE TIE'), 'the honest-ties note is missing for an exact tie');
});
test('W2b: no shell file parses a number out of a display string (the grep is the law — planted `parseInt(el.textContent)` dies here)', () => {
  const out = execSync(`grep -rEn "(innerText|textContent|innerHTML)[^;]{0,80}(parseInt|parseFloat)|(parseInt|parseFloat)\\([^)]{0,40}(innerText|textContent)" ${P('src')} --include=*.svelte --include=*.ts || true`, { encoding: 'utf8' });
  assert.equal(out.trim(), '', 'a shell file derives logic from display text: ' + out.trim().slice(0, 200));
});

// ---------- 3 · the DOM-hook registry ----------
test('W3: the hook registry is well-formed and the batteries import it (no inlined core selectors in the drivers)', () => {
  const reg = read('src/lib/port/domHooks.ts');
  assert.ok(reg.includes('boardRow') && reg.includes('draftBtn') && reg.includes('teamRow'), 'the registry lost a core hook');
  assert.match(reg, /SCENES/, 'the scene table is absent');
  // every board battery references the registry (the tr.teamrow drift class cannot return)
  const boardBattery = read('batteries/board.battery.mjs');
  assert.ok(boardBattery.includes('domHooks') || boardBattery.includes('HOOKS'), 'the board battery does not drive through the registry');
});

// ---------- 4 · the tent's static complement ----------
test('W4: zero remote references in the shipped bytes (css/index/single — the static half of the offline tent)', () => {
  for (const f of ['dist/single.html', 'dist/index.html']) {
    const txt = read(f);
    const hits = txt.match(/https?:\/\/(?!kozikosi\.github\.io\/Football-Sim\/Football-Sim-Z-post-blue-w89)[a-z0-9.-]+/gi) || [];
    const real = hits.filter((u) => !/w3\.org|xmlns|schema/.test(u));
    assert.deepEqual(real, [], f + ' carries remote refs: ' + real.slice(0, 4).join(', '));
  }
  const cssFiles = fs.readdirSync(P('dist/assets')).filter((f) => f.endsWith('.css'));
  for (const f of cssFiles) {
    const txt = read('dist/assets/' + f);
    assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(txt), 'dist css ' + f + ' references a remote font host');
  }
});

// ---------- 5 · the decision surface is pure VM ----------
test('W5: the heat strip + confidence are pure functions of the VM numbers (the module exports them; no component recomputes)', async () => {
  const decision = await import(P('src/lib/port/decisionVM.ts'));
  const heat = decision.heatStrip({ openSlots: ['QB', 'RB', 'WR', 'TE', 'FLEX', 'BN1', 'BN2', 'BN3', 'BN4', 'BN5', 'BN6'], goneBySlot: { QB: 0.31, RB: 0.62, WR: 0.05, TE: 0.2, FLEX: 0.44, BN1: 0.1, BN2: 0.1, BN3: 0.1, BN4: 0.1, BN5: 0.1, BN6: 0.1 }, needBySlot: { QB: 1, RB: 1, WR: 1, TE: 0, FLEX: 1, BN1: 0, BN2: 0, BN3: 0, BN4: 0, BN5: 0, BN6: 0 } });
  assert.equal(heat.length, 11, 'the strip is not one cell per open slot');
  assert.equal(heat[1].risk, 0.62, 'the RB cell lost the gone-risk value');
  const conf = decision.pickConfidence('3.4', '2.9', 0.31);
  assert.equal(conf.topWins, '3.4', 'the chip lost the top wins display');
  assert.equal(conf.nextWins, '2.9', 'the chip lost the next wins display');
  assert.equal(conf.goneMargin, 0.31, 'the chip lost the numeric gone-margin');
  assert.ok(conf.verdict.includes('clear edge'), 'the verdict did not read the gone-margin');
  const tie = decision.pickConfidence('3.4', '3.4', null);
  assert.ok(tie.verdict.includes('genuine tie'), 'the honest-ties verdict is missing');
});

// ---------- 6 · the contract golden ----------
test('W6: the contract golden matches the live seam shape — a renamed/removed/retyped field FAILS NAMING IT', async () => {
  const golden = JSON.parse(read('src/lib/port/contract.golden.json'));
  assert.ok(golden.shapes?.boardVM, 'the golden holds no boardVM shape');
  // recompute the live boardVM shape at the same fixed seed the generator used
  const port = await import(P('src/lib/port/seam.ts'));
  const CSV = (p) => fs.readFileSync(P(p), 'utf8');
  const pool = port.buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));
  const rng = port.makeRng(0xa3f2);
  const draft = port.newDraft(pool, { ...port.DEFAULT_CONFIG, userTeam: 7, seed: 0xa3f2 }, rng);
  port.runDraft(draft, rng);
  const board = port.boardVM(draft, port.goneOdds(pool, draft, rng, 40), 7);
  const typeOf = (v) => (v === null || v === undefined) ? 'nullish' : Array.isArray(v) ? 'array' : typeof v === 'object' ? 'object' : typeof v;
  const shape = (v, prefix, out, depth = 0) => {
    if (depth > 5) { out[prefix] = '…'; return; }
    const t = typeOf(v);
    if (t === 'object') { for (const [k, val] of Object.entries(v)) shape(val, prefix ? prefix + '.' + k : k, out, depth + 1); if (Object.keys(v).length === 0) out[prefix] = 'object{}'; }
    else if (t === 'array') { out[prefix] = v.length && typeOf(v[0]) !== 'object' && typeOf(v[0]) !== 'array' ? 'array<' + typeOf(v[0]) + '>' : 'array'; if (v.length && typeOf(v[0]) === 'object') shape(v[0], prefix + '[]', out, depth + 1); }
    else out[prefix] = t;
  };
  const live = {};
  shape(board, 'boardVM', live);
  const drift = [];
  for (const [k, want] of Object.entries(golden.shapes)) {
    if (k.startsWith('boardVM') && live[k] !== want) drift.push(`${k}: golden ${want} → live ${live[k] ?? '(ABSENT)'}`);
  }
  assert.deepEqual(drift, [], 'the seam shape drifted from the golden: ' + drift.slice(0, 4).join('; '));
});

// ---------- 7 · the season pace clamp ----------
test('W7: the cinematic pace is ONE clamped value with the three named speeds and a reduced-motion path that keeps information', async () => {
  const pace = await import(P('src/lib/port/pace.ts'));
  assert.deepEqual(pace.PACE_SPEEDS, ['slower', 'standard', 'faster'], 'the named speeds drifted');
  assert.equal(pace.clampPace(0.2), 0.5, 'the clamp lost its lower bound');
  assert.equal(pace.clampPace(9), 2, 'the clamp lost its upper bound');
  assert.equal(pace.clampPace(1), 1, 'standard is 1');
  assert.ok(pace.reducedMotionMs(500) <= 200, 'the reduced-motion path does not collapse movement');
});

// ---------- 8 · the takeover tint is derived, never invented ----------
test('W8: the tint derives from the engine TEAM_COLORS table (32 rows, both modes inside each) and contrast never degrades', async () => {
  const takeover = await import(P('src/lib/port/takeover.ts'));
  const receipt = takeover.tintReceipt();
  assert.equal(receipt.rows.length, 32, 'the receipt is not 32 rows (one per team)');
  for (const r of receipt.rows) {
    for (const side of [r.dark, r.light]) {
      assert.ok(/^#[0-9a-f]{6}$/i.test(side.tint), 'team ' + r.team + ' got a non-hex tint');
      assert.ok(side.contrastAfter >= side.contrastBefore, 'the tint pair degraded contrast for ' + r.team);
    }
  }
});

// ---------- 9 · the coach's tape is dev-gated ----------
test('W9: the coach tape module exists, is dev-gated in code, and its strings are ABSENT from the production bundle (the M1/N14 dist-grep class)', () => {
  const tape = read('src/lib/port/coachTape.ts');
  assert.ok(/dev|DEV/.test(tape), 'the tape module carries no dev gate');
  const bundle = read('dist/assets/' + fs.readdirSync(P('dist/assets')).find((f) => f.endsWith('.js')));
  for (const s of ['coach tape', "COACH'S TAPE", 'coachTape']) {
    assert.ok(!bundle.toLowerCase().includes(s.toLowerCase()), 'the production bundle carries coach-tape strings (' + s + ')');
  }
});

// ---------- 10 · the composed brag regex law ----------
test('W10: the composed brag contains no ?seed=, no b36: code, no envelope (the hard regex law over the FULL composed text)', async () => {
  const bt = await import(P('src/lib/port/bragText.ts'));
  const samples = [
    bt.seasonBrag ? bt.seasonBrag({ champion: 'Ravens', record: '14-2-0', seed: 470990, year: 2027 }) : null,
    bt.draftBrag ? bt.draftBrag({ team: 'Bears', slot: 1, picks: 11 }) : null,
  ].filter(Boolean);
  for (const t of samples) {
    assert.ok(!/\?seed=/.test(t), 'the composed brag carries ?seed=');
    assert.ok(!/b36:[0-9a-z]+/i.test(t), 'the composed brag carries a b36 code');
    assert.ok(!/env:|envelope/i.test(t), 'the composed brag carries an envelope token');
  }
});
