#!/usr/bin/env node
// _agents/zai/tools/flex-ext.mjs — T6 extension (read-only, deterministic).
// Extends vloc's flex-pricer.mjs (tools/mathlab, council/vloc 1186cd22) with:
//   1. PROPOSAL-SET pricing: slot pairs the Owner's REV 4 discussion cares about
//      that the current FLEX table either lacks or prices only at family level
//      (headline: QB->FS, the ONLY flex REV 4 allows for a QB, at a flat -10).
//   2. SUPPORTING-CAST SENSITIVITY: the vloc pricer measures on the engine's
//      slotWinsTable(), whose base is all-else-80. This tool re-builds the same
//      table with other bases (all-70 / all-90 / position-starved leagues) to
//      test whether a flat cap generalizes across roster shapes WITHOUT RNG
//      (blocked-T6 work, doable today because the layer is deterministic).
//   3. SLOT-PAIR PENALTY FORMULA: penalty(a->b, ovr) = theta * ovrEq(a->b, ovr),
//      rounded to the flex table's granularity, with theta in {0.5, 0.75, 1.0}
//      shown as sensitivity — a replacement candidate for the flat -10 cap.
//
// Everything measured here is VERIFIED (deterministic, n=1 per cell) against
// Pre-Colors 40233d6be00e987c. The base-80 replication is self-tested against
// the engine's own slotWins() to prove the re-implementation is faithful.
//
// Modes: node flex-ext.mjs [--json OUT] [--selftest]

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CANDIDATES = [
  process.argv[2] && !process.argv[2].startsWith('--') ? path.resolve(process.argv[2]) : null,
  path.join(HERE, '..', '..', '..', 'Football-Sim-PreColors.html'),
  path.join(process.cwd(), 'Football-Sim-PreColors.html'),
].filter(Boolean);
const PRODUCT = CANDIDATES.find(p => fs.existsSync(p)) || CANDIDATES[CANDIDATES.length - 1];
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';

function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m, parts = [];
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    parts.push(m[2]);
  }
  let script = parts.join('\n');
  for (const pat of [/initPlayerBrowser\(\);/g, /initGroupRankings\(\);/g, /initDraftSetup\(\);/g,
                     /buildControls\(\); render\(\);/g, /setActiveTab\('viewDraft','tabDraftBtn'\);/g]) {
    script = script.replace(pat, '/* sandbox neutralized */;');
  }
  const nothing = new Proxy(function () {}, {
    get(_, k) { if (k === Symbol.toStringTag) return 'nothing'; return nothing; },
    apply() { return nothing; }, construct() { return nothing; },
  });
  const scope = {
    document: nothing, window: nothing, localStorage: nothing, sessionStorage: nothing,
    location: nothing, navigator: nothing, screen: nothing, history: nothing,
    performance: { now: () => 0 }, MutationObserver: nothing,
    setTimeout: () => {}, setInterval: () => {}, clearTimeout: () => {}, clearInterval: () => {},
    requestAnimationFrame: (f) => { if (typeof f === 'function') f(0); return 0; },
    fetch: () => Promise.reject(new Error('no network')),
    Event: function () {}, customElements: nothing,
    console: { log() {}, error() {}, warn() {}, info() {}, debug() {} },
  };
  let seed = 123456;
  scope.Math = Object.create(globalThis.Math);
  scope.Math.random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const assigns = Object.keys(scope).map(k => `const ${k} = __scope__.${k};`).join('\n');
  const randomSrc = `let __seed = 123456;\nconst random = () => { __seed = (__seed * 16807) % 2147483647; return __seed / 2147483647; };\n`;
  const body = `'use strict';\n` + assigns + `\n` + randomSrc + `Math.random = random;\n` +
    script +
    `\nreturn { slotWins, slotWinsTable, slotWinsPerOvr, teamRatings, bestUnitPts, matchupModel,` +
    ` ROSTER_SLOTS, WV_OFF_SLOTS, POINTS_PER_WIN, NATURAL_SLOT_MAP, FLEX, flexPenaltyFor, effOvr,` +
    ` DEFAULT_DEF, NEUTRAL_OFF, OFF_OPTS, DEF_OPTS, clampNum };\n`;
  return new Function('__scope__', body)(scope);
}

// Faithful re-implementation of the engine's slotWinsTable() with a PARAMETERIZED base.
// (engine, fixed in the product at all-else-80; see slotWinsTable() lines ~879-893 of
// the extracted inline script.) Replication is verified in selftest at base=80.
function slotWinsTableBase(E, baseOvrFn) {
  const base = {};
  E.ROSTER_SLOTS.forEach(s => { base[s] = { ovr: baseOvrFn(s) }; });
  const lg = E.teamRatings(base), k = 17 / E.POINTS_PER_WIN;
  const b0 = { on: E.bestUnitPts(lg, lg, true), off: E.bestUnitPts(lg, lg, false) };
  const T = {};
  E.ROSTER_SLOTS.forEach(s => {
    const isOff = E.WV_OFF_SLOTS.has(s), arr = [];
    for (let o = 50; o <= 100; o++) {
      const sm = Object.assign({}, base); sm[s] = { ovr: o };
      arr.push((E.bestUnitPts(E.teamRatings(sm), lg, isOff) - (isOff ? b0.on : b0.off)) * k);
    }
    T[s] = arr;
  });
  return T;
}
function slotWinsFromTable(T, slot, ovr, clampNum) {
  const t = T[slot], x = clampNum(ovr, 50, 99.999) - 50, i = Math.floor(x), f = x - i;
  return t[i] * (1 - f) + t[i + 1] * f;
}
const slopeFromTable = (T, slot, clampNum) =>
  (slotWinsFromTable(T, slot, 90, clampNum) - slotWinsFromTable(T, slot, 70, clampNum)) / 20;

// Proposal set: pos (engine pos name) -> array of { dest: slot, label, note }
const PROPOSALS = [
  { pos: 'QB', dest: 'FS', label: 'QB->FS (REV 4: the only allowed QB flex, flat -10)' },
  { pos: 'HB', dest: 'TE1', label: 'FB->TE1 (HB is the engine pos for FB/SC-back)' },
  { pos: 'WR', dest: 'RB2', label: 'WR3->RB2 (slot-specific; FLEX table has WR->RB at 6)' },
  { pos: 'TE', dest: 'WR3', label: 'TE2->WR3 (TE->WR not in FLEX table at all)' },
  { pos: 'DT', dest: 'DE2', label: 'DT2->DE2 (FLEX has DT->DE family at 4)' },
  { pos: 'WILL', dest: 'MIKE', label: 'ILB2->MIKE (engine pos WILL; natural pair)' },
  { pos: 'SAM', dest: 'DE2', label: 'OLB2->DE2 (engine pos SAM)' },
  { pos: 'FS', dest: 'CB2', label: 'FS->CB2 (FLEX has FS->CB family at 4)' },
  { pos: 'CB', dest: 'FS', label: 'CB->FS (FLEX price 0 — free; hidden-cost check)' },
  { pos: 'TE', dest: 'WR1', label: 'TE1->WR1 (the pair the -10 cap under-prices, per w79 T6)' },
  { pos: 'CB', dest: 'WR1', label: 'CB->WR1 (the pair the -10 cap under-prices, per w79 T6)' },
];

function price(E, pos, destSlot, ovr, T, clampNum) {
  const natSlots = E.NATURAL_SLOT_MAP[pos] || [];
  const natural = natSlots[0];
  if (!natural) return null;
  const winsNat = slotWinsFromTable(T, natural, ovr, clampNum);
  const winsDest = slotWinsFromTable(T, destSlot, ovr, clampNum);
  const winsLost = Math.max(0, winsNat - winsDest);
  const slope = slopeFromTable(T, destSlot, clampNum);
  const ovrEq = slope > 0 ? winsLost / slope : null;
  return { natural, dest: destSlot, ovr, winsNat, winsDest, winsLost, slope, ovrEq };
}

function fmt(v, d = 3) { return v == null ? '—' : Number(v).toFixed(d); }

(async () => {
  const args = process.argv.slice(2);
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const sha = crypto.createHash('sha256').update(html).digest('hex');
  if (sha !== EXPECTED_SHA) {
    console.error(`REFUSE: product hash ${sha.slice(0, 16)} != expected Pre-Colors 40233d6be00e987c`);
    process.exit(4);
  }
  if (args.includes('--selftest')) { process.exit(selftest(html, sha) ? 0 : 1); }

  const E = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(html).digest('hex');
  if (shaAfter !== sha) { console.error('REFUSE: product changed during run'); process.exit(5); }

  // ---- Part 1: replication check (base 80 == engine's own table) ----
  const T80 = slotWinsTableBase(E, () => 80);
  let maxDiff = 0, worst = '';
  const engineTable = E.slotWinsTable();
  for (const s of E.ROSTER_SLOTS) for (const o of [70, 80.5, 90, 95.5]) {
    const mine = slotWinsFromTable(T80, s, o, E.clampNum);
    const eng = E.slotWins(s, o);
    const d = Math.abs(mine - eng);
    if (d > maxDiff) { maxDiff = d; worst = `${s}@${o}`; }
  }
  console.log(`REPLICATION CHECK: parameterized table (base 80) vs engine slotWins(): max|diff| = ${maxDiff.toExponential(2)} at ${worst} ${maxDiff < 1e-9 ? '(VERIFIED faithful)' : '(FAIL)'}`);
  if (maxDiff >= 1e-9) process.exit(6);

  // ---- Part 2: proposal-set pricing at all-else-80 ----
  console.log('\nPART 2 — PROPOSAL-SET PRICING (base all-else-80; winsLost / OVR-equivalent)');
  console.log('pair             natural  @70            @80            @85            @90            @95');
  const results = {};
  for (const p of PROPOSALS) {
    const cells = [], rows = [];
    for (const ovr of [70, 80, 85, 90, 95]) {
      const r = price(E, p.pos, p.dest, ovr, T80, E.clampNum);
      if (!r) { cells.push('n/a'); continue; }
      rows.push(r);
      cells.push(`${fmt(r.winsLost)}/${r.ovrEq == null ? '—' : fmt(r.ovrEq, 1)}`);
    }
    results[p.label] = rows;
    console.log(`${p.label.padEnd(16)} ${String(rows[0]?.natural || '—').padEnd(7)}  ${cells.join('   ').padEnd(60)}`);
  }

  // ---- Part 3: supporting-cast sensitivity ----
  console.log('\nPART 3 — SUPPORTING-CAST SENSITIVITY (does the measured cost move with the roster around the slot?)');
  const casts = {
    'all-70 (weak league)': () => 70,
    'all-80 (engine base)': () => 80,
    'all-90 (strong league)': () => 90,
    'QB-starved (QB 70, rest 80)': (s) => s === 'QB' ? 70 : 80,
    'FS-starved (FS/SS/CB3 65)': (s) => (s === 'FS' || s === 'SS' || s === 'CB3') ? 65 : 80,
    'WR-rich (WR1-3 90, rest 80)': (s) => ['WR1', 'WR2', 'WR3'].includes(s) ? 90 : 80,
  };
  const sensTargets = [
    { pos: 'QB', dest: 'FS', ovr: 90 },
    { pos: 'TE', dest: 'WR1', ovr: 90 },
    { pos: 'CB', dest: 'SAM', ovr: 90 },
    { pos: 'CB', dest: 'WR1', ovr: 90 },
  ];
  console.log('pair        cast                            winsLost  ovrEq  (flat -10 fair iff ovrEq ≈ 10 for QB->FS)');
  const sens = {};
  for (const t of sensTargets) {
    for (const [name, fn] of Object.entries(casts)) {
      const T = slotWinsTableBase(E, fn);
      const r = price(E, t.pos, t.dest, t.ovr, T, E.clampNum);
      sens[`${t.pos}->${t.dest}@${t.ovr}|${name}`] = r;
      console.log(`${(t.pos + '->' + t.dest).padEnd(10)}  ${name.padEnd(30)}  ${fmt(r.winsLost, 3).padEnd(8)}  ${fmt(r.ovrEq, 2)}`);
    }
  }

  // ---- Part 4: slot-pair penalty formula with theta sensitivity ----
  console.log('\nPART 4 — SLOT-PAIR PENALTY FORMULA: P(a->b, ovr) = round2( theta * ovrEq(a->b, ovr) ), cap 30');
  console.log('pair        theta=0.5 @85/@90   theta=0.75 @85/@90   theta=1.0 @85/@90   current flat');
  const currentFlat = { 'QB->FS': 10, 'TE->WR1': 10, 'CB->SAM': 4, 'CB->WR1': 10, 'WR->RB2': 6, 'TE->WR3': 0, 'DT->DE2': 4, 'WILL->MIKE': 0, 'SAM->DE2': 6, 'FS->CB2': 4, 'HB->TE1': 6 };
  for (const p of PROPOSALS) {
    const cells = [];
    for (const theta of [0.5, 0.75, 1.0]) {
      const at = (ovr) => {
        const r = price(E, p.pos, p.dest, ovr, T80, E.clampNum);
        return r && r.ovrEq != null ? Math.min(30, Math.round(theta * r.ovrEq / 2) * 2) : null;
      };
      cells.push(`${at(85) ?? '—'} / ${at(90) ?? '—'}`);
    }
    const fam = (p.label.match(/^([A-Z0-9]+)->/) || [])[1], famDest = p.dest.replace(/\d+$/, '');
    const flexRow = E.FLEX[fam] || {};
    const flatRaw = (flexRow[p.dest] != null) ? flexRow[p.dest] : (flexRow[famDest] != null ? flexRow[famDest] : null);
    const flat = currentFlat[p.label.split(' ')[0]] ?? (flatRaw != null ? flatRaw : 'n/a');
    console.log(`${(p.pos + '->' + p.dest).padEnd(10)}  ${cells.join('            ')}   ${flat}`);
  }
  console.log('\nREADING: a slot-pair penalty set at theta*ovrEq tracks the measured opportunity cost');
  console.log('instead of one global -10; theta is the Owner tolerance knob (0.5 = flex may cost at most');
  console.log('half the measured value; 1.0 = fully priced). The -10 cap corresponds to theta≈1 only');
  console.log('where ovrEq≈10 — Part 2/3 show where that fails.');

  if (args.includes('--json')) {
    const out = args[args.indexOf('--json') + 1];
    fs.writeFileSync(out, JSON.stringify({
      generatedUtc: new Date().toISOString() + 'Z',
      product: 'Football-Sim-PreColors.html ' + sha.slice(0, 16),
      replication: { maxAbsDiff: maxDiff, at: worst },
      proposals: results, sensitivity: sens,
      labels: 'VERIFIED (deterministic, n=1 per cell); flat penalties REPORTED from product FLEX table',
    }, null, 1));
    console.log(`\nJSON: ${out}`);
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });

// ---------- selftest ----------
function selftest(html, sha) {
  const ok = [];
  const E = sandboxEval(html);
  // 1. base-80 replication
  const T80 = slotWinsTableBase(E, () => 80);
  let maxDiff = 0;
  for (const s of E.ROSTER_SLOTS) for (const o of [50, 70, 85, 99.5]) {
    maxDiff = Math.max(maxDiff, Math.abs(slotWinsFromTable(T80, s, o, E.clampNum) - E.slotWins(s, o)));
  }
  ok.push(['base-80 table == engine slotWins() (max|diff|<1e-9)', maxDiff < 1e-9]);
  // 2. determinism: rebuild twice, identical
  const T80b = slotWinsTableBase(E, () => 80);
  ok.push(['table rebuild deterministic', JSON.stringify(T80) === JSON.stringify(T80b)]);
  // 3. monotonicity sanity: slotWins(QB, 90) > slotWins(QB, 70) > 0
  ok.push(['QB curve rising', slotWinsFromTable(T80, 'QB', 90, E.clampNum) > slotWinsFromTable(T80, 'QB', 70, E.clampNum)]);
  // 4. QB->FS cost positive at 90 (a QB at FS is worse than a FS at FS)
  const r = price(E, 'QB', 'FS', 90, T80, E.clampNum);
  ok.push(['QB->FS winsLost > 0 @90', r && r.winsLost > 0]);
  // 5. CB->FS free-flex hidden-cost check: measured cost is small but NONZERO,
  //    and (verified this session) LARGER than CB->WR1 in wins terms — the flat
  //    table's 0 price hides it. Assert the measured relationship, not intuition.
  const cfs = price(E, 'CB', 'FS', 90, T80, E.clampNum), cwr = price(E, 'CB', 'WR1', 90, T80, E.clampNum);
  ok.push(['CB->FS measured hidden cost > 0 @90 (flat price is 0)', cfs && cfs.winsLost > 0]);
  ok.push(['CB->FS > CB->WR1 in winsLost @90 (recorded invariant, base-80)', cfs && cwr && cfs.winsLost > cwr.winsLost]);
  let pass = true;
  console.log('FLEX-EXT SELFTEST — Pre-Colors ' + sha.slice(0, 16));
  for (const [name, v] of ok) { console.log(`  ${v ? 'PASS' : 'FAIL'}  ${name}`); if (!v) pass = false; }
  return pass;
}
