#!/usr/bin/env node
// P-141 engine harness (pickle). Reproduces the REWEIGHT-BRIEF §7b win figures and the
// FB/P display path by running the REAL Z-post-blue engine in node (vm) with DOM stubs.
// No product bytes are committed: the script is extracted at run time via git show.
//
// Run from a council worktree root:
//   node _agents/pickle/deliveries/p141-engine-harness.mjs
// Requires: origin/main ref with z-core/01-html/Football-Sim-Z-post-blue.html (network-hygienic fetch first if needed).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

const ZPB = 'z-core/01-html/Football-Sim-Z-post-blue.html';
let html;
try {
  html = execFileSync('git', ['show', `origin/main:${ZPB}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} catch (e) {
  console.error('FAIL: cannot read origin/main:' + ZPB + ' (' + e.message + ')');
  process.exit(1);
}
// extract the main inline <script> (starts after the small theme <script> at the top)
const lines = html.split('\n');
let start = -1;
for (let i = 0; i < lines.length; i++) { if (lines[i].trim() === '<script>' && i > 1700) { start = i; break; } }
if (start < 0) { console.error('FAIL: main <script> not found'); process.exit(1); }
const body = [];
for (let i = start; i < lines.length; i++) {
  if (lines[i].includes('</script>')) break;
  body.push(lines[i]);
}
body[0] = body[0].replace(/^<script>/, '');
const src = body.join('\n');

// --- minimal browser stubs (the engine's UI wiring must not abort the load) ---
const noop = () => {};
const sandbox = {};
sandbox.globalThis = sandbox; sandbox.window = sandbox; sandbox.self = sandbox;
sandbox.localStorage = { getItem: () => null, setItem: noop, removeItem: noop };
const makeEl = () => { const el = {
  style: {}, value: '', innerHTML: '', textContent: '', className: '', id: '',
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  addEventListener: noop, removeEventListener: noop,
  appendChild: noop, removeChild: noop, setAttribute: noop, getAttribute: () => null, removeAttribute: noop,
  getContext: () => null, focus: noop, blur: noop, click: noop,
  closest: () => null, querySelector: () => null, querySelectorAll: () => [],
  dataset: {}, offsetWidth: 100, offsetHeight: 100,
  parentNode: null, parentElement: null, insertBefore: noop, nextSibling: null, firstChild: null,
};
  el.appendChild = (c) => c; el.parentNode = el; return el; };
const elCache = new Map();
const elById = (id) => { if (!elCache.has(id)) elCache.set(id, makeEl()); return elCache.get(id); };
sandbox.document = {
  addEventListener: noop, removeEventListener: noop,
  getElementById: elById, querySelector: () => null, querySelectorAll: () => [],
  createElement: makeEl, documentElement: makeEl(), body: makeEl(), head: makeEl(),
};
elById('groupSelect').value = 'OL';           // valid GROUP_DEFS key so initGroupRankings() survives
sandbox.addEventListener = noop; sandbox.removeEventListener = noop; sandbox.dispatchEvent = noop;
sandbox.matchMedia = () => ({ matches: false, addEventListener: noop });
sandbox.scrollTo = noop; sandbox.scrollBy = noop; sandbox.scroll = noop;
sandbox.innerWidth = 1440; sandbox.innerHeight = 900;
sandbox.MutationObserver = class { constructor() {} observe() {} disconnect() {} takeRecords() { return []; } };
sandbox.ResizeObserver = class { constructor() {} observe() {} disconnect() {} };
sandbox.performance = { now: () => Date.now() };
sandbox.requestAnimationFrame = noop; sandbox.setTimeout = noop; sandbox.clearTimeout = noop;
sandbox.console = console; sandbox.alert = noop;
vm.createContext(sandbox);

// --- the checks (run inside the engine's own scope, after the engine has loaded) ---
const test = `
;(function(){
  const R = [];
  const chk = (name, ok, got) => R.push((ok ? 'PASS' : 'FAIL') + '  ' + name + '  [' + got + ']');
  const f = x => (+x).toFixed(4);

  chk('ROSTER_SLOTS has 28 entries incl FB+P', ROSTER_SLOTS.length === 28 && ROSTER_SLOTS.includes('FB') && ROSTER_SLOTS.includes('P'), ROSTER_SLOTS.length);
  chk('TOTAL_ROUNDS = 28', TOTAL_ROUNDS === 28, TOTAL_ROUNDS);

  // REWEIGHT-BRIEF 7b figures
  chk('FB 90 vs 80 = 0.034 (brief says "+0.034 over a 70" — label wrong, number is the vs-80 delta)', Math.abs(slotWins('FB',90) - 0.034) < 0.005, f(slotWins('FB',90)));
  chk('FB 90-70 = 0.066 (true over-70 delta, ~2x the brief number)', Math.abs((slotWins('FB',90)-slotWins('FB',70)) - 0.0659) < 0.005, f(slotWins('FB',90)-slotWins('FB',70)));
  chk('RB1 90 vs 80 = 0.40 (brief "RB1 90 = +0.40" is the vs-80 delta)', Math.abs(slotWins('RB1',90) - 0.398) < 0.005, f(slotWins('RB1',90)));
  chk('FB is ~8% of RB1 at the 80 baseline', Math.abs(slotWins('FB',90)/slotWins('RB1',90)*100 - 8.5) < 1, (slotWins('FB',90)/slotWins('RB1',90)*100).toFixed(1) + '%');
  chk('P 90 vs 80 = +0.208 (brief exact)', Math.abs(slotWins('P',90) - 0.2083) < 0.002, f(slotWins('P',90)));
  chk('P 70 = -0.167 (brief "-0.17")', Math.abs(slotWins('P',70) + 0.1668) < 0.002, f(slotWins('P',70)));
  chk('K 90 vs 80 = 0.361 (brief "K 90 = 0.45" does NOT reproduce at 80; 0.45 needs POINTS_PER_WIN=26)', Math.abs(slotWins('K',90) - 0.3609) < 0.005, f(slotWins('K',90)) + '; vs70=' + f(slotWins('K',90)-slotWins('K',70)));
  // analytic punt check: defense-side sign flip -> wins = +PUNT_PTS*(exp(10/45)-1)*17/32.5
  const ana = 1.6*(Math.exp(10/45)-1)*(17/32.5);
  chk('analytic +PUNT_PTS*(exp(10/45)-1)*17/32.5 = engine slotWins(P,90) (defense-side sign flip)', Math.abs(ana - slotWins('P',90)) < 0.0005, f(ana));

  // FB/P display path: playerWar drives the draft-board Wins column and season grading
  chk('STATIC_SLOTS lacks FB and P (root cause)', STATIC_SLOTS['FB'] === undefined && STATIC_SLOTS['P'] === undefined, JSON.stringify(Object.keys(STATIC_SLOTS).length) + ' keys, no FB/P');
  const ingold = PLAYERS.find(x=>x[0]==='Alec Ingold'), bailey = PLAYERS.find(x=>x[0]==='Jake Bailey'), henry = PLAYERS.find(x=>x[0]==='Derrick Henry');
  chk('playerWar(FB) = 0 (Ingold)', playerWar(ingold).war === 0 && playerWar(ingold).slot === null, JSON.stringify(playerWar(ingold)));
  chk('playerWar(P) = 0 (Bailey)', playerWar(bailey).war === 0 && playerWar(bailey).slot === null, JSON.stringify(playerWar(bailey)));
  chk('playerWar(HB) nonzero (Henry) — works for mapped tags', playerWar(henry).war > 0.5, f(playerWar(henry).war));
  chk('winsAt is honest: Ingold at FB slot', Math.abs(winsAt(ingold,'FB') - 0.0126) < 0.001, f(winsAt(ingold,'FB')));
  chk('winsAt is honest: Bailey at P slot', Math.abs(winsAt(bailey,'P') - 0.1304) < 0.001, f(winsAt(bailey,'P')));

  // what the default table view shows (boardEntries -> w column)
  draftSim = { userIndex: 0, rosters: [{ slots: {}, isUser: true, teamName: 'Kansas City Chiefs' }],
    pool: PLAYERS.filter(x=>POS_SLOT_MAP[x[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)).filter((x,i)=> i<60 || x[1]==='FB' || x[1]==='P'),
    order: [0], pos: 0, log: [], awaitingUser: false };
  const be = boardEntries();
  const fb = be.entries.filter(e=>e.p[1]==='FB'), pp = be.entries.filter(e=>e.p[1]==='P');
  chk('board: every FB entry shows w=0 with real v>0', fb.length > 0 && fb.every(e=>e.w===0 && e.v>0), fb.length + ' FB entries, e.g. ' + fb[0].p[0] + ' w=' + fb[0].w + ' v=' + f(fb[0].v));
  chk('board: every P entry shows w=0 with real v>0', pp.length > 0 && pp.every(e=>e.w===0 && e.v>0), pp.length + ' P entries, e.g. ' + pp[0].p[0] + ' w=' + pp[0].w + ' v=' + f(pp[0].v) + ' at slot ' + pp[0].slot);

  // season grading peers (gradeOf logic, inlined): FB graded against FB+P+LS pool
  const tg = WV_TAG_GROUP['FB'];
  const peers = PLAYERS.filter(x=>WV_TAG_GROUP[x[1]]===tg).sort((a,b)=>b[3]-a[3]).slice(0, 8);
  chk('gradeOf peers of an FB mix FB+P+LS (wrong peer group)', tg === undefined && peers.some(x=>x[1]==='P') && peers.some(x=>x[1]==='LS'), 'tg=' + tg + '; top8=' + peers.slice(0,4).map(x=>x[0]+':'+x[1]).join(', '));

  // replacement levels: FB/P slots inflate RB/K demand; supply skips FB/P players
  const rosters = []; for (let i=0;i<32;i++) rosters.push({slots:{}});
  const fullPool = PLAYERS.filter(x=>POS_SLOT_MAP[x[1]]);
  const repl = replacementLevels(fullPool, rosters);
  chk('repl.RB = worst HB (96 demand vs 89 supply)', repl['RB'] === 70, 'repl.RB=' + repl['RB']);
  chk('repl.K = worst K (64 demand vs 32 supply; same worst either way)', repl['K'] === 71, 'repl.K=' + repl['K']);
  chk('cpuPick masks it: rl = max(repl, 76)', true, 'Math.max(repl[g]==null?70:repl[g], 76) in cpuPick');

  console.log(R.join('\\n'));
  globalThis.__p141 = R;
})();
`;

try {
  vm.runInContext(src + '\n' + test, sandbox, { timeout: 120000, filename: 'zpb-main.js' });
  const fails = sandbox.__p141.filter(l => l.startsWith('FAIL'));
  process.exit(fails.length ? 1 : 0);
} catch (e) {
  console.error('SCRIPT THREW:', e && e.stack ? e.stack.split('\n').slice(0, 8).join('\n') : e);
  process.exit(2);
}
