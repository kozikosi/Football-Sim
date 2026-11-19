/* falsify-board.mjs — cakepanz-9 (2026-11-19): the uniform-board falsifier. The discipline is the
 * receipt-falsifier's: a clean baseline runs FIRST (an unmutated copy must be green before any
 * mutation means anything), then every law must DIE under its planted defect. A case that cannot
 * run is a FAILURE, never a green light (D-2). Mutations are APPLY-ASSERTED: a moved anchor throws.
 * Stages:
 *   F0-board  clean baseline — batteries/board.battery.mjs green (6/6) on an unmutated copy
 *   F0-shell  clean baseline — batteries/shell.battery.mjs green (48/0) on an unmutated copy
 *   F15-board the go('complete') handoff deleted (DS F2's defect, re-anchored to the uniform board) → L8 must DIE
 *   F17       the startDraft order reverted (go('board') before the START dispatch — the C1 defect) → L10 must DIE
 *   F18       the unconditional Complete h1 + the live CTA re-planted (the C2 defect) → L11 must DIE
 *   F19       the simple branch planted anywhere (data-form + a .cp-simplerow node — the flip re-appears) → L12 must DIE
 *   F20       the suggestion wiring killed (suggest={false}) → L13 must DIE
 *   F21       the Complete roster print deleted → L14 must DIE
 *   F22       the wall-slip cascade deleted → L15 must DIE
 * (The 8.1 F13/F14/F16 stages are SUPERSEDED 2026-11-19 with the flip — the Owner's ruling, the
 * order §5/B-bis; their laws L1/L7/L9 are gone with the simple board. F15's LAW survives, so the
 * stage survives re-anchored, named F15-board.)
 * Run: node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs  (uses npx vite
 * build inside the copies; ports are PID-derived). */
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';

const TREE = path.resolve(new URL('..', import.meta.url).pathname);
let red = 0;

const mkCopy = () => {
  const dir = fs.mkdtempSync('/tmp/cp-board-falsify-');
  execSync(`cp -R ${TREE}/src ${dir}/src && cp -R ${TREE}/data ${dir}/data && cp -R ${TREE}/batteries ${dir}/batteries && cp -R ${TREE}/scripts ${dir}/scripts && cp -R ${TREE}/test ${dir}/test && cp -R ${TREE}/tools ${dir}/tools && cp ${TREE}/index.html ${TREE}/package.json ${TREE}/tsconfig.json ${TREE}/vite.config.js ${dir}/`);
  fs.rmSync(path.join(dir, 'src/engine-node'), { recursive: true, force: true });
  fs.symlinkSync(path.join(TREE, 'node_modules'), path.join(dir, 'node_modules'));
  return dir;
};
const mustReplace = (p, anchor, replacement) => {
  const before = fs.readFileSync(p, 'utf8');
  if (!before.includes(anchor)) throw new Error(`FALSIFIER TARGET MOVED in ${path.relative(TREE, p)} — anchor not found:\n  ${anchor.slice(0, 120)}`);
  const after = before.split(anchor).join(replacement);
  if (after === before) throw new Error(`FALSIFIER MUTATION DID NOT APPLY in ${path.relative(TREE, p)}`);
  fs.writeFileSync(p, after);
};
const build = (dir) => {
  execSync('npx vite build', { cwd: dir, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, CI: '1' } });
  execSync('node scripts/distfile.mjs', { cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] });
};
const runBattery = async (dir, port, battery) => {
  const srv = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { cwd: dir, stdio: 'ignore', detached: true });
  await new Promise((r) => setTimeout(r, 3000));
  try {
    let out = '';
    try {
      out = execSync(`CP_PORT=${port} node --import ./scripts/node-port-register.mjs batteries/${battery}`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 20 * 60 * 1000 });
    } catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
    return out;
  } finally { try { process.kill(-srv.pid); } catch {} }
};
const verdict = (out, tailMark) => {
  const fails = out.split('\n').filter((l) => l.includes('FAIL  L') || l.includes('FAIL  S')).map((l) => l.trim().slice(0, 90));
  const tail = out.split('\n').find((l) => l.includes(tailMark)) ?? '(no verdict line)';
  return { fails, tail };
};
const PORT_BASE = 4500 + (process.pid % 200);

const dieReport = (name, what, dead, fails, tautologyMsg) => {
  console.log(`${name} ${what} ·`, dead ? 'DIED — ' + (fails[0] ?? '') : (fails.length ? 'RED ELSEWHERE (not the planted law): ' + fails.join(' | ') : tautologyMsg));
  if (!dead) red = 1;
};

// F0-board: the CLEAN baseline — the uniform-board battery must be green before anything means anything
{
  const dir = mkCopy();
  build(dir);
  const out = await runBattery(dir, PORT_BASE, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  if (v.fails.length || !/pass · 0 fail/.test(v.tail)) {
    console.log('F0-board CLEAN BASELINE RED —', v.tail, v.fails.join(' | '));
    process.exit(1);
  }
  console.log('F0-board clean baseline · unmutated board battery green ·', v.tail.trim());
}

// F0-shell: the CLEAN baseline for L12's home battery (the shell battery must be green too)
{
  const dir = mkCopy();
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 1, 'shell.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'SHELL BATTERY');
  if (v.fails.length || !/pass · 0 fail/.test(v.tail)) {
    console.log('F0-shell CLEAN BASELINE RED —', v.tail, v.fails.join(' | '));
    process.exit(1);
  }
  console.log('F0-shell clean baseline · unmutated shell battery green ·', v.tail.trim());
}

// F15-board: the completing-pick handoff is deleted (exactly DS F2's defect) — L8 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    `    // the pick that completes the draft hands the screen to Complete — never a stale board (4.2, cakepanz-8.1)
    if (store.getState().status === 'done') go('complete');
`, '');
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 2, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L8 '));
  dieReport('F15-board last-pick law     ·', 'mutation: the go(\'complete\') handoff deleted', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L8 did not die)');
}

// F17: the C1 defect re-planted — go('board') BEFORE the START dispatch — L10 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    `    store.dispatch({ type: 'START', seed, userTeam });
    go('board');
`,
    `    go('board');
    store.dispatch({ type: 'START', seed, userTeam });
`);
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 3, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L10 '));
  dieReport('F17 new-draft law           ·', 'mutation: the startDraft order reverted (go before START)', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L10 did not die)');
}

// F18: the C2 defect re-planted — the unconditional h1 + the live CTA — L11 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/screens/Complete.svelte'),
    `  {#if complete}
    <h1 class="cp-done-h1">Your draft is complete</h1>
  {/if}
`,
    `  <h1 class="cp-done-h1">Your draft is complete</h1>
`);
  mustReplace(path.join(dir, 'src/lib/screens/Complete.svelte'),
    `    <button class="cp-stepbtn cp-cta" onclick={onseason} disabled={!complete} title={complete ? undefined : 'the season needs a finished draft'}>PLAY THE SEASON</button>`,
    `    <button class="cp-stepbtn cp-cta" onclick={onseason}>PLAY THE SEASON</button>`);
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 4, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L11 '));
  dieReport('F18 partial-Complete law    ·', 'mutation: the unconditional h1 + the live CTA re-planted', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L11 did not die)');
}

// F19: the simple branch planted ANYWHERE (the flip re-appears) — L12 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/components/DraftBoard.svelte'),
    `<section class="cp-board" aria-label="Draft board">`,
    `<section class="cp-board" aria-label="Draft board" data-form={'simple'}>
  <span class="cp-simplerow" hidden></span>`);
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 5, 'shell.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'SHELL BATTERY');
  const dead = v.fails.some((f) => f.includes('L12 '));
  dieReport('F19 uniform-board law       ·', 'mutation: the simple branch planted (data-form + a .cp-simplerow node)', dead, v.fails, 'TAUTOLOGY (the shell battery stayed green — L12 did not die)');
}

// F20: the suggestion wiring is killed — L13 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/components/DraftBoard.svelte'),
    `<BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} {oddsMeta} suggest={suggestIds.has(r.id)} />`,
    `<BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} {oddsMeta} suggest={false} />`);
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 6, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L13 '));
  dieReport('F13→F20 suggestion law      ·', 'mutation: suggest={false} (the top-three highlight killed)', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L13 did not die)');
}

// F21: the Complete roster print is deleted — L14 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/screens/Complete.svelte'),
    `  {#if complete && rosterSlots.length}
  <div class="cp-rosterline" data-lineup={lineupState}>
    <LineupAdvice slots={rosterSlots} weak={weakIdx} />
  </div>
  {/if}
`, '');
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 7, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L14 '));
  dieReport('F21 roster-print law        ·', 'mutation: the Complete roster block deleted', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L14 did not die)');
}

// F22: the wall-slip cascade is deleted — L15 must DIE
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/screens/Complete.svelte'),
    `  .cp-done > * { animation: cp-reveal 0.5s ease-out both; }
  .cp-done-h1 { animation-delay: 0s; }
  .cp-done-sub, .cp-done-prov, .cp-done-note, .cp-rosterline { animation-delay: 0.18s; }
  .cp-chipline { animation-delay: 0.36s; }
`, '');
  build(dir);
  const out = await runBattery(dir, PORT_BASE + 8, 'board.battery.mjs');
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out, 'BOARD BATTERY');
  const dead = v.fails.some((f) => f.includes('L15 '));
  dieReport('F22 wall-slip law           ·', 'mutation: the cascade keyframes deleted', dead, v.fails, 'TAUTOLOGY (the board battery stayed green — L15 did not die)');
}

if (red) process.exit(1);
console.log('the uniform-board battery is falsifiable — L8 dies without the completing-pick handoff; L10 dies with the reverted startDraft order; L11 dies with the unconditional h1 + the live CTA; L12 dies with the planted simple branch; L13 dies without the suggestion wiring; L14 dies without the roster print; L15 dies without the cascade');
