/* shell-falsifier.mjs — the SHELL laws must be able to die too: reintroduce each fixed defect in a
   throwaway copy, build it, serve it, and run the shell battery against it. Each falsifier prints
   the law that must die and whether it died.
     FA (D2): the Complete prop reverts to {recordTyped}          → S5 must FAIL
     FB (D1): restoreSeason is deleted again (the ReferenceError)  → S29 must FAIL (+ page errors)
     FC (390): the BoardRow 390px media query is removed           → S25b must FAIL
   Run: node scripts/shell-falsifier.mjs   (needs node_modules present in THIS tree; the copies link it)

   D-2 (2026-11-17 sitting): a falsifier case that CANNOT RUN is a FAILURE, never a green light.
   The old child spawn was `node --experimental-transform-types batteries/shell.battery.mjs` — on
   Node ≥26 the flag was removed, the child died with "bad option", no marker and no FAIL line ever
   matched, and every case reported TAUTOLOGY — an affirmative-looking "not tested". The rule now:
     · the child runs via scripts/node-port-register.mjs (Part D — no transform flag on any Node);
     · a child error (bad option, missing module, type-strip error), a missing verdict marker, or
       a crash with NO law evidence is COULD-NOT-RUN — named, red, exit 1;
     · TAUTOLOGY (a real verdict: the battery ran green and the law did not die) is also exit 1.
   Only "every case DIED" exits 0. */
import fs from 'node:fs'; import path from 'node:path'; import { execSync, spawn } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const ONLY = process.env.CP_FALSIFY_CASE || null;   // CP_FALSIFY_CASE=FA|FB|FC runs one case (diagnosis); default: all three
// PORT ISOLATION (D-2 hardening): two falsifier runs sharing the fixed ports cross-contaminate —
// the second run's battery can read the first run's server (the zombie-preview class the
// stale-server guard warns about). Every process gets its own port block derived from the PID.
const PORTBASE = 4200 + (process.pid % 80);          // 4200-4279, unique per process
const tautologies = [];
const couldNotRun = [];

const mkCopy = (mutate) => {
  const dir = fs.mkdtempSync('/tmp/cp-shellfalsify-');
  execSync(`cp -R ${TREE}/. ${dir}/`, { maxBuffer: 1024 * 1024 * 64 });
  execSync(`rm -rf ${dir}/node_modules ${dir}/dist ${dir}/.git ${dir}/src/engine-node && ln -s ${TREE}/node_modules ${dir}/node_modules`);
  mutate(dir);
  return dir;
};
const build = (dir) => {
  execSync('npx vite build', { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] });
  execSync('node scripts/distfile.mjs', { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] });
};
const serveAndRun = async (dir, port) => {
  // detached so the kill takes the whole process group (npx → vite → node; killing the wrapper
  // alone orphans the server and the next case finds the port busy)
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
  // STALE-SERVER GUARD: the served build must be THIS copy's build (a zombie preview on the port
  // once served the previous copy and produced a fake TAUTOLOGY — never again)
  const want = (fs.readFileSync(path.join(dir, 'dist', 'index.html'), 'utf8').match(/assets\/index-[^"]+\.js/) || [])[0];
  const got = (execSync(`curl -s http://localhost:${port}/`, { encoding: 'utf8' }).match(/assets\/index-[^"]+\.js/) || [])[0];
  if (!want || !got || want !== got) { killGroup(); return { verdict: 'UNRUNNABLE', reason: `STALE SERVER on ${port}: served ${got ?? 'nothing'}, this copy built ${want ?? 'nothing'}`, out: '' }; }
  let out = '';
  try { out = execSync(`CP_PORT=${port} node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 16 }); }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
  killGroup();
  fs.writeFileSync(`/tmp/cp-falsifier-last-${port}.log`, out);   // the full battery output, kept for diagnosis
  const cls = classify(out);
  console.log(`[serveAndRun ${port}] bytes=${out.length} verdict=${cls.verdict}${cls.reason ? ' (' + cls.reason.slice(0, 90) + ')' : ''}`);
  return { out, verdict: cls.verdict, reason: cls.reason };
};
// classify what the child produced — a verdict, a crash with law evidence, or nothing trustworthy
const UNRUNNABLE_RE = /bad option|ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX|MODULE_NOT_FOUND|Cannot find (module|package)|Cannot import (module|package)/i;
const classify = (out) => {
  if (!out.trim()) return { verdict: 'UNRUNNABLE', reason: 'the child battery produced NO output' };
  const bad = out.split('\n').find((l) => UNRUNNABLE_RE.test(l));
  if (bad) return { verdict: 'UNRUNNABLE', reason: 'the child battery could not run: ' + bad.trim().slice(0, 160) };
  if (/SHELL BATTERY ·/.test(out)) return { verdict: 'VERDICT' };
  if (out.split('\n').some((l) => l.includes('FAIL') && l.includes('S'))) return { verdict: 'CRASH-MID-FLOW' };
  return { verdict: 'UNRUNNABLE', reason: 'no verdict marker and no law evidence — the child died before it could be trusted' };
};
const died = (out, law) => {
  const line = out.split('\n').find((l) => l.includes('FAIL') && l.includes(law));
  return line ? line.trim().slice(0, 120) : null;
};

// FA — the D2 mutation: the Complete prop reverts to the shorthand (record stays undefined inside)
if (!ONLY || ONLY === 'FA') {
  const dir = mkCopy((d) => {
    const p = path.join(d, 'src/App.svelte');
    fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('<Complete record={recordTyped}', '<Complete {recordTyped}'));
  });
  build(dir);
  const r = await serveAndRun(dir, PORTBASE + 0);
  const s5 = r.verdict === 'VERDICT' || r.verdict === 'CRASH-MID-FLOW' ? died(r.out, 'S5') : null;
  if (r.verdict === 'UNRUNNABLE') { console.log('FA D2 Complete-prop law   · COULD-NOT-RUN — ' + r.reason); couldNotRun.push('FA'); }
  else console.log('FA D2 Complete-prop law   · mutation: {recordTyped} shorthand reintroduced ·', s5 ? 'DIED — ' + s5 : 'TAUTOLOGY (S5 still green)');
  if (!s5 && r.verdict !== 'UNRUNNABLE') tautologies.push('FA');
  execSync(`rm -rf ${dir}`);
}

// FB — the D1 mutation: restoreSeason is deleted again (the prop references an undefined identifier)
if (!ONLY || ONLY === 'FB') {
  const dir = mkCopy((d) => {
    const p = path.join(d, 'src/App.svelte');
    const txt = fs.readFileSync(p, 'utf8');
    const start = txt.indexOf('  async function restoreSeason()');
    const end = txt.indexOf('  function watchFeed()');
    if (start === -1 || end === -1 || end <= start) throw new Error('FB mutation could not find the restoreSeason block');
    fs.writeFileSync(p, txt.slice(0, start) + txt.slice(end));
    if (fs.readFileSync(p, 'utf8').includes('async function restoreSeason')) throw new Error('FB mutation did not apply');
    console.log('FB mutation applied · restoreSeason definition removed (the template reference stays)');
  });
  build(dir);
  const r = await serveAndRun(dir, PORTBASE + 1);
  if (r.verdict === 'UNRUNNABLE') { console.log('FB D1 restore law         · COULD-NOT-RUN — ' + r.reason); couldNotRun.push('FB'); }
  else {
    // the missing identifier kills the flow EARLIER than S29: the hub's render throws
    // (S15 catches the ReferenceError; the battery crashes at the CTA click before S29 runs) —
    // the law dies EITHER way: an S29 FAIL, or the restoreSeason ReferenceError in the receipts
    const s29 = died(r.out, 'S29');
    const refErr = r.out.includes('restoreSeason is not defined');
    console.log('FB D1 restore law         · mutation: restoreSeason deleted (ReferenceError path) ·',
      (s29 || refErr) ? 'DIED — ' + (s29 ? s29 : 'the flow crashed on ReferenceError: restoreSeason is not defined (receipted in S15/battery death)') : 'TAUTOLOGY (S29 still green, no ReferenceError)');
    if (!(s29 || refErr)) tautologies.push('FB');
  }
  execSync(`rm -rf ${dir}`);
}

// FC — the 390 mutation: the BoardRow phone grid is removed (the desk grid overflows again)
if (!ONLY || ONLY === 'FC') {
  const dir = mkCopy((d) => {
    const p = path.join(d, 'src/lib/components/BoardRow.svelte');
    const txt = fs.readFileSync(p, 'utf8');
    // re-anchored 2026-11-20 (T2): BoardRow now carries TWO 430px blocks (the .cp-rowtop wrap and the
    // .cp-main grid tighten) — FC removes the GRID one specifically; removing the wrap block would
    // leave the 390 law green (TAUTOLOGY).
    const after = txt.replace(/ {2}@media \(max-width: 430px\) \{\n {4}\.cp-main \{ grid-template-columns:[\s\S]*?\n {2}\}\n/, '');
    if (after === txt) throw new Error('FC mutation did not apply (the 430px media query is gone from the source)');
    fs.writeFileSync(p, after);
  });
  build(dir);
  const r = await serveAndRun(dir, PORTBASE + 2);
  const s25b = r.verdict === 'VERDICT' || r.verdict === 'CRASH-MID-FLOW' ? died(r.out, 'S25b') : null;
  if (r.verdict === 'UNRUNNABLE') { console.log('FC board-at-390 law       · COULD-NOT-RUN — ' + r.reason); couldNotRun.push('FC'); }
  else console.log('FC board-at-390 law       · mutation: the phone grid media query removed ·', s25b ? 'DIED — ' + s25b : 'TAUTOLOGY (S25b still green)');
  if (!s25b && r.verdict !== 'UNRUNNABLE') tautologies.push('FC');
  execSync(`rm -rf ${dir}`);
}

const red = tautologies.length + couldNotRun.length;
if (couldNotRun.length) console.log('COULD-NOT-RUN: ' + couldNotRun.join(', ') + ' — a falsifier that cannot run is a FAILURE (D-2), never a green light');
if (tautologies.length) console.log('TAUTOLOGIES: ' + tautologies.join(', ') + ' — must be named, not kept');
if (!red) console.log('every shell falsifier DIED — the shell laws can fail');
process.exit(red ? 1 : 0);
