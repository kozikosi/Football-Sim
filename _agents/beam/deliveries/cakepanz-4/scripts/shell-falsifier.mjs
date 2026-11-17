/* shell-falsifier.mjs — the SHELL laws must be able to die too: reintroduce each fixed defect in a
   throwaway copy, build it, serve it, and run the shell battery against it. Each falsifier prints
   the law that must die and whether it died.
     FA (D2): the Complete prop reverts to {recordTyped}          → S5 must FAIL
     FB (D1): restoreSeason is deleted again (the ReferenceError)  → S29 must FAIL (+ page errors)
     FC (390): the BoardRow 390px media query is removed           → S25b must FAIL
   Run: node scripts/shell-falsifier.mjs   (needs node_modules present in THIS tree; the copies link it) */
import fs from 'node:fs'; import path from 'node:path'; import { execSync, spawn } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const ONLY = process.env.CP_FALSIFY_CASE || null;   // CP_FALSIFY_CASE=FA|FB|FC runs one case (diagnosis); default: all three
const results = [];

const mkCopy = (mutate) => {
  const dir = fs.mkdtempSync('/tmp/cp-shellfalsify-');
  execSync(`cp -R ${TREE}/. ${dir}/`, { maxBuffer: 1024 * 1024 * 64 });
  execSync(`rm -rf ${dir}/node_modules ${dir}/dist ${dir}/.git && ln -s ${TREE}/node_modules ${dir}/node_modules`);
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
  if (!up) { killGroup(); throw new Error(`preview on ${port} never came up`); }
  // STALE-SERVER GUARD: the served build must be THIS copy's build (a zombie preview on the port
  // once served the previous copy and produced a fake TAUTOLOGY — never again)
  const want = (fs.readFileSync(path.join(dir, 'dist', 'index.html'), 'utf8').match(/assets\/index-[^"]+\.js/) || [])[0];
  const got = (execSync(`curl -s http://localhost:${port}/`, { encoding: 'utf8' }).match(/assets\/index-[^"]+\.js/) || [])[0];
  if (!want || !got || want !== got) { killGroup(); throw new Error(`STALE SERVER on ${port}: served ${got ?? 'nothing'}, this copy built ${want ?? 'nothing'}`); }
  let out = '';
  try { out = execSync(`CP_PORT=${port} node --experimental-transform-types batteries/shell.battery.mjs`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 16 }); }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
  killGroup();
  fs.writeFileSync(`/tmp/cp-falsifier-last-${port}.log`, out);   // the full battery output, kept for diagnosis
  // the law's own FAIL line may appear BEFORE a crash (a broken flow stops the battery later) —
  // a found FAIL is a death even without the verdict line
  if (!/SHELL BATTERY ·/.test(out)) {
    const early = out.split('\n').find((l) => l.includes('FAIL') && l.includes('S'));
    // return the FULL output (not just the first FAIL line): a crash can kill the flow with the
    // evidence several laws need (the FB ReferenceError rides mid-log — truncating it produced a
    // false TAUTOLOGY once; the full log is the receipt, the marker is only a note)
    return 'CRASHED-AFTER-MARKER (no verdict line — the battery died mid-flow)\n' + (early ? early.trim() + '\n' : '') + out;
  }
  return out;
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
  const out = await serveAndRun(dir, 4279);
  const s5 = died(out, 'S5');
  console.log('FA D2 Complete-prop law   · mutation: {recordTyped} shorthand reintroduced ·', s5 ? 'DIED — ' + s5 : 'TAUTOLOGY (S5 still green)');
  if (!s5) results.push('FA');
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
  const out = await serveAndRun(dir, 4281);
  // the missing identifier kills the flow EARLIER than S29: the hub's render throws
  // (S15 catches the ReferenceError; the battery crashes at the CTA click before S29 runs) —
  // the law dies EITHER way: an S29 FAIL, or the restoreSeason ReferenceError in the receipts
  const s29 = died(out, 'S29');
  const refErr = out.includes('restoreSeason is not defined');
  console.log('FB D1 restore law         · mutation: restoreSeason deleted (ReferenceError path) ·',
    (s29 || refErr) ? 'DIED — ' + (s29 ? s29 : 'the flow crashed on ReferenceError: restoreSeason is not defined (receipted in S15/battery death)') : 'TAUTOLOGY (S29 still green, no ReferenceError)');
  if (!(s29 || refErr)) results.push('FB');
  execSync(`rm -rf ${dir}`);
}

// FC — the 390 mutation: the BoardRow phone grid is removed (the desk grid overflows again)
if (!ONLY || ONLY === 'FC') {
  const dir = mkCopy((d) => {
    const p = path.join(d, 'src/lib/components/BoardRow.svelte');
    const txt = fs.readFileSync(p, 'utf8');
    fs.writeFileSync(p, txt.replace(/ {2}@media \(max-width: 430px\) \{[\s\S]*?\n {2}\}\n/, ''));
  });
  build(dir);
  const out = await serveAndRun(dir, 4283);
  const s25b = died(out, 'S25b');
  console.log('FC board-at-390 law       · mutation: the phone grid media query removed ·', s25b ? 'DIED — ' + s25b : 'TAUTOLOGY (S25b still green)');
  if (!s25b) results.push('FC');
  execSync(`rm -rf ${dir}`);
}

console.log(results.length ? 'TAUTOLOGIES: ' + results.join(', ') + ' — must be named, not kept' : 'every shell falsifier DIED — the shell laws can fail');
