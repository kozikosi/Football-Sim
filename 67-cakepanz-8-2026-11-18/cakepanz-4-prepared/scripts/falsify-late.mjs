/* falsify-late.mjs — the P-337 falsifier (cakepanz-8, the receipt-falsifier discipline): the late
 * battery's L1 must be able to FAIL. Plant simple-mode ALWAYS-ON in a THROWAWAY copy, rebuild, and
 * show L1 dies (the board would flip at the user's FIRST pick — the 10th-pick law is red). A clean
 * baseline runs FIRST (an unmutated copy must be green 6/6 — L1..L6 — before any mutation
 * means anything). A case that cannot run is a FAILURE, never a green light (D-2). The mutation is
 * APPLY-ASSERTED: if the anchor moved, this script throws (the F2/F3 lesson).
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
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    'const lateMode = $derived(myPicks >= 10 && $draftState?.status !== \'done\' && !simpleOff);',
    'const lateMode = $derived(myPicks >= 0 && $draftState?.status !== \'done\' && !simpleOff);   // FALSIFIER: always-on');
  build(dir);
  const out = await runLate(dir, PORT_BASE + 1);
  fs.rmSync(dir, { recursive: true, force: true });
  const v = verdict(out);
  const l1dead = v.fails.some((f) => f.includes('L1 '));
  console.log('F13-late 10th-pick flip law · mutation: simple-mode planted ALWAYS-ON ·', l1dead ? 'DIED — ' + (v.fails.find((f) => f.includes('L1 ')) ?? '') : (v.fails.length ? 'RED ELSEWHERE (not L1): ' + v.fails.join(' | ') : 'TAUTOLOGY (the late battery stayed green — L1 did not die)'));
  if (!l1dead) red = 1;
}

if (red) process.exit(1);
console.log('the late battery is falsifiable — L1 dies under the always-on plant');
