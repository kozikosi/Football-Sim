/* falsify-slot.mjs — the P-317 slot laws must be able to DIE too: reintroduce the "slot ignored"
   defect in a throwaway copy, build it, serve it, and run the slot battery against it.

     F-S1: the App.svelte START dispatch drops pickSlot again (the pre-P-317 shell) →
           B1 EARLY ("START carried pickSlot", "the displaced team made overall pick 1") and
           B3 LATE must FAIL. The store is untouched (it is the Architect's lane and it is green
           at the pin); the defect class this falsifier pins is THE SHELL dropping the slot —
           exactly the regression the sitting order warns about ("new laws fail loudly if the
           slot is ignored").

   D-2 rules (the same as the shell/board falsifiers): the mutant is APPLY-ASSERTED (a moved
   anchor throws with the file and the anchor — the F2/F3 lesson); the child runs via
   scripts/node-port-register.mjs; a child that cannot run is COULD-NOT-RUN, exit 1; TAUTOLOGY
   (the laws stayed green) is also exit 1. Only "every case DIED" exits 0.
   Ports are per-process (PORTBASE from the PID); the stale-server guard asserts the served
   build is THIS copy's build.
   Run: node scripts/falsify-slot.mjs   (CP_FALSIFY_CASE=FS1 runs one case) */
import fs from 'node:fs'; import path from 'node:path'; import { execSync, spawn } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const ONLY = process.env.CP_FALSIFY_CASE || null;
const PORTBASE = 4300 + (process.pid % 70);          // 4300-4369, unique per process (clear of the shell/board blocks)
const tautologies = [];
const couldNotRun = [];

const mkCopy = (mutate) => {
  const dir = fs.mkdtempSync('/tmp/cp-slotfalsify-');
  execSync(`cp -R ${TREE}/. ${dir}/`, { maxBuffer: 1024 * 1024 * 64 });
  execSync(`rm -rf ${dir}/node_modules ${dir}/dist ${dir}/.git ${dir}/src/engine-node && ln -s ${TREE}/node_modules ${dir}/node_modules`);
  mutate(dir);
  return dir;
};
const build = (dir) => {
  execSync('npx vite build', { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] });
};
const serveAndRun = async (dir, port) => {
  try { execSync(`lsof -t -i:${port} | xargs -r kill -9 2>/dev/null; true`); } catch {}
  await new Promise((r) => setTimeout(r, 800));
  const srv = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { cwd: dir, stdio: 'ignore', detached: true });
  const killGroup = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} try { srv.kill('SIGKILL'); } catch {} };
  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try { execSync(`curl -s -o /dev/null -w '%{http_code}' http://localhost:${port}/`, { stdio: 'pipe' }).toString().includes('200') && (up = true); } catch {}
  }
  if (!up) { killGroup(); return { verdict: 'UNRUNNABLE', reason: `preview on ${port} never came up`, out: '' }; }
  const want = (fs.readFileSync(path.join(dir, 'dist', 'index.html'), 'utf8').match(/assets\/index-[^"]+\.js/) || [])[0];
  const got = (execSync(`curl -s http://localhost:${port}/`, { encoding: 'utf8' }).match(/assets\/index-[^"]+\.js/) || [])[0];
  if (!want || !got || want !== got) { killGroup(); return { verdict: 'UNRUNNABLE', reason: `STALE SERVER on ${port}: served ${got ?? 'nothing'}, this copy built ${want ?? 'nothing'}`, out: '' }; }
  let out = '';
  try { out = execSync(`CP_PORT=${port} node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 16 }); }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
  killGroup();
  fs.writeFileSync(`/tmp/cp-slot-falsifier-last-${port}.log`, out);
  const cls = classify(out);
  console.log(`[serveAndRun ${port}] bytes=${out.length} verdict=${cls.verdict}${cls.reason ? ' (' + cls.reason.slice(0, 90) + ')' : ''}`);
  return { out, verdict: cls.verdict, reason: cls.reason };
};
const UNRUNNABLE_RE = /bad option|ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX|MODULE_NOT_FOUND|Cannot find (module|package)|Cannot import (module|package)/i;
const classify = (out) => {
  if (!out.trim()) return { verdict: 'UNRUNNABLE', reason: 'the child battery produced NO output' };
  const bad = out.split('\n').find((l) => UNRUNNABLE_RE.test(l));
  if (bad) return { verdict: 'UNRUNNABLE', reason: 'the child battery could not run: ' + bad.trim().slice(0, 160) };
  if (/P-317 SLOT BATTERY/.test(out)) return { verdict: 'VERDICT' };
  if (out.split('\n').some((l) => l.includes('FAIL'))) return { verdict: 'CRASH-MID-FLOW' };
  return { verdict: 'UNRUNNABLE', reason: 'no verdict marker and no law evidence — the child died before it could be trusted' };
};
const died = (out, law) => {
  const line = out.split('\n').find((l) => l.includes('FAIL') && l.includes(law));
  return line ? line.trim().slice(0, 120) : null;
};

// F-S1 — the slot-ignored mutation: the START dispatch drops pickSlot (the pre-P-317 shell)
if (!ONLY || ONLY === 'FS1') {
  const dir = mkCopy((d) => {
    const p = path.join(d, 'src/App.svelte');
    const txt = fs.readFileSync(p, 'utf8');
    const TARGET = "store.dispatch({ type: 'START', seed, userTeam, ...(slot !== null && slot - 1 !== userTeam ? { pickSlot: slot } : {}) });";
    if (!txt.includes(TARGET)) throw new Error('F-S1 mutation could not find the START dispatch anchor in src/App.svelte (the file moved — re-anchor the falsifier)');
    fs.writeFileSync(p, txt.replace(TARGET, "store.dispatch({ type: 'START', seed, userTeam });"));
    if (fs.readFileSync(p, 'utf8').includes('pickSlot: slot')) throw new Error('F-S1 mutation did not apply');
    console.log('F-S1 mutation applied · the START dispatch drops pickSlot (the slot is ignored)');
  });
  build(dir);
  const r = await serveAndRun(dir, PORTBASE + 0);
  if (r.verdict === 'UNRUNNABLE') { console.log('F-S1 slot-ignored law      · COULD-NOT-RUN — ' + r.reason); couldNotRun.push('F-S1'); }
  else {
    const b1 = died(r.out, 'B1 EARLY slot: START carried pickSlot');
    const b3 = died(r.out, 'B3 LATE slot');
    console.log('F-S1 slot-ignored law      · mutation: pickSlot dropped from the START dispatch ·',
      (b1 && b3) ? 'DIED — B1: ' + b1 + ' · B3: ' + b3 : 'TAUTOLOGY (B1/B3 still green)');
    if (!(b1 && b3)) tautologies.push('F-S1');
  }
  execSync(`rm -rf ${dir}`);
}

console.log('');
if (couldNotRun.length) { console.log('COULD-NOT-RUN: ' + couldNotRun.join(', ') + ' — a falsifier that cannot run is a FAILURE, never a green light.'); process.exit(1); }
if (tautologies.length) { console.log('TAUTOLOGY: ' + tautologies.join(', ') + ' — the law did not die; the mutation was not caught.'); process.exit(1); }
console.log('FALSIFIER COMPLETE · every P-317 slot law shown to DIE under the slot-ignored mutation.');
