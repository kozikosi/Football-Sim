/* falsify-late.mjs — the P-337 falsifier (cakepanz-8, the receipt-falsifier discipline): the late
 * battery's L1 must be able to FAIL. Plant simple-mode ALWAYS-ON in a THROWAWAY copy, rebuild, and
 * show L1 dies (the board would flip at the user's FIRST pick — the 10th-pick law is red). A clean
 * baseline runs FIRST (an unmutated copy must be green 9/9 — L1..L9 — before any mutation
 * means anything). A case that cannot run is a FAILURE, never a green light (D-2). The mutation is
 * APPLY-ASSERTED: if the anchor moved, this script throws (the F2/F3 lesson).
 * cakepanz-8.1 (§6 of the 8.1 order) adds the three review laws' falsifiers: F14-late plants the
 * dead toggle again (the simple branch loses its detail block → L7 must die), F15-late deletes the
 * go('complete') handoff in pick() → L8 must die, F16-late deletes the reload-restore of fullBoard
 * → L9 must die. (F13's anchor drifted in 4.3 — the choice is persisted in the settings model now.)
 * Run: node --import ./scripts/node-port-register.mjs scripts/falsify-late.mjs  (uses npx vite
 * build inside the copies; ports are PID-derived). */
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';

const TREE = path.resolve(new URL('..', import.meta.url).pathname);
let red = 0;

const mkCopy = () => {
  const dir = fs.mkdtempSync('/tmp/cp-late-falsify-');
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
const runLate = async (dir, port) => {
  const srv = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { cwd: dir, stdio: 'ignore', detached: true });
  await new Promise((r) => setTimeout(r, 3000));
  try {
    let out = '';
    try {
      out = execSync(`CP_PORT=${port} node --import ./scripts/node-port-register.mjs batteries/late.battery.mjs`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
    return out;
  } finally { try { process.kill(-srv.pid); } catch {} }
};
const verdict = (out) => {
  const fails = out.split('\n').filter((l) => l.includes('FAIL  L')).map((l) => l.trim().slice(0, 80));
  const tail = out.split('\n').find((l) => l.includes('LATE BATTERY')) ?? '(no verdict line)';
  return { fails, tail };
};
const PORT_BASE = 4300 + (process.pid % 200);

// F0-late: the CLEAN baseline — an unmutated copy must be green before the mutation means anything
{
  const dir = mkCopy();
  build(dir);
  const out = await runLate(dir, PORT_BASE);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  if (v.fails.length || !/pass · 0 fail/.test(v.tail)) {
    console.log('F0-late CLEAN BASELINE RED —', v.tail, v.fails.join(' | '));
    process.exit(1);
  }
  console.log('F0-late clean baseline · unmutated late battery green ·', v.tail.trim());
}

// F13-late: simple-mode ALWAYS-ON — L1 (the 10th-pick flip) must DIE
// (8.1 anchor drift, noted per §0.9: 4.3 moved the tail from !simpleOff to !$settingsStore.fullBoard)
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    'const lateMode = $derived(myPicks >= 10 && $draftState?.status !== \'done\' && !$settingsStore.fullBoard);',
    'const lateMode = $derived(myPicks >= 0 && $draftState?.status !== \'done\' && !$settingsStore.fullBoard);   // FALSIFIER: always-on');
  build(dir);
  const out = await runLate(dir, PORT_BASE + 1);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  const l1dead = v.fails.some((f) => f.includes('L1 '));
  console.log('F13-late 10th-pick flip law · mutation: simple-mode planted ALWAYS-ON ·', l1dead ? 'DIED — ' + (v.fails.find((f) => f.includes('L1 ')) ?? '') : (v.fails.length ? 'RED ELSEWHERE (not L1): ' + v.fails.join(' | ') : 'TAUTOLOGY (the late battery stayed green — L1 did not die)'));
  if (!l1dead) red = 1;
}

// F14-late (cakepanz-8.1): the DEAD TOGGLE returns — the simple branch loses its {#if open} detail
// block (exactly the F1 defect the five seats found) — L7 must DIE. (L2 keeps passing: it counts
// the collapsed state — that is the absence-law blindness the 8.1 order closes.)
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/components/BoardRow.svelte'),
    `  {#if open}
    <div class="cp-fits" id="cp-fit-{r.id}" data-testid="cp-simple-detail">
      <span class="cp-fitlbl">OVR {r.ovr} · priority {r.priority} · fills {r.slotLabel}{r.natural ? '' : ' (flex)'}</span>
      {#each r.alsoFits as f}
        <button class="cp-chip" onclick={() => onpick(r.id, f.slotId)}>{f.slotLabel} <i>{f.flex}</i></button>
      {/each}
      <button class="cp-chip cp-primary" onclick={() => onpick(r.id, r.slotId)}>Draft at {r.slotLabel}</button>
    </div>
  {/if}
`, '');
  build(dir);
  const out = await runLate(dir, PORT_BASE + 2);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  const l7dead = v.fails.some((f) => f.includes('L7 '));
  console.log('F14-late one-click detail law · mutation: the simple-row detail block deleted (the dead toggle re-planted) ·', l7dead ? 'DIED — ' + (v.fails.find((f) => f.includes('L7 ')) ?? '') : (v.fails.length ? 'RED ELSEWHERE (not L7): ' + v.fails.join(' | ') : 'TAUTOLOGY (the late battery stayed green — L7 did not die)'));
  if (!l7dead) red = 1;
}

// F15-late (cakepanz-8.1): the go('complete') handoff in pick() is deleted (exactly DS F2's defect)
// — L8 must DIE: the completing pick leaves the stale board again.
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    `    // the pick that completes the draft hands the screen to Complete — never a stale board (4.2, cakepanz-8.1)
    if (store.getState().status === 'done') go('complete');
`, '');
  build(dir);
  const out = await runLate(dir, PORT_BASE + 3);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  const l8dead = v.fails.some((f) => f.includes('L8 '));
  console.log('F15-late last-pick law      · mutation: the go(\'complete\') handoff deleted         ·', l8dead ? 'DIED — ' + (v.fails.find((f) => f.includes('L8 ')) ?? '') : (v.fails.length ? 'RED ELSEWHERE (not L8): ' + v.fails.join(' | ') : 'TAUTOLOGY (the late battery stayed green — L8 did not die)'));
  if (!l8dead) red = 1;
}

// F16-late (cakepanz-8.1): the reload-restore of fullBoard is deleted (exactly the B1/F3 defect:
// the choice dies with the session) — L9 must DIE: after the reload the restored draft is simple again.
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/settings.ts'),
    '      fullBoard: p.fullBoard === true,',
    '      fullBoard: false,   // FALSIFIER: the choice never restores (the B1 defect re-planted)');
  build(dir);
  const out = await runLate(dir, PORT_BASE + 4);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  const l9dead = v.fails.some((f) => f.includes('L9 '));
  console.log('F16-late reload law         · mutation: the fullBoard restore deleted            ·', l9dead ? 'DIED — ' + (v.fails.find((f) => f.includes('L9 ')) ?? '') : (v.fails.length ? 'RED ELSEWHERE (not L9): ' + v.fails.join(' | ') : 'TAUTOLOGY (the late battery stayed green — L9 did not die)'));
  if (!l9dead) red = 1;
}

if (red) process.exit(1);
console.log('the late battery is falsifiable — L1 dies under the always-on plant; L7 dies under the dead-toggle plant; L8 dies without the completing-pick handoff; L9 dies without the reload-restore');
