/* swap-test.mjs — the re-pin rehearsal as a HABIT (M3): swap src/engine/ to a named engine commit,
   build, run the engine suite + both node-side batteries, and prove with diff -rq that NOTHING
   outside src/engine/ changed. Prints PASS/FAIL and names every law that died (engine behaviour vs
   shell expectation — the law is never edited to make it pass, the snapshot is never edited).
   Run: node scripts/swap-test.mjs [<full-or-short commit sha>]   (default: the Architect tip the
   merged prompt names, 7a0706df00f0aa249c55e4a5415b059e2fee3f75) */
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import { execSync, spawn } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const SHA = process.argv[2] || '7a0706df00f0aa249c55e4a5415b059e2fee3f75';
const PORT = process.env.SWAP_PORT || 4291;
const full = (s) => (s.length === 40 ? s : execSync(`git -C ${path.join(TREE, '..')} rev-parse ${s}`, { encoding: 'utf8' }).trim());

console.log(`== SWAP TEST · engine → ${SHA} ==`);
// locate a git repo that holds the commit (this tree is a delivery copy, not the clone itself)
const REPO = [TREE, path.join(TREE, '..'), process.env.CP_REPO || path.join(TREE, '..', 'boot')]
  .filter(Boolean).find((r) => { try { execSync(`git -C ${r} cat-file -e ${SHA}`, { stdio: 'ignore' }); return true; } catch { return false; } });
if (!REPO) { console.log(`SWAP TEST ABORTED: no reachable git repo holds ${SHA} (set CP_REPO=<clone>)`); process.exit(3); }
console.log(`engine source repo: ${REPO}`);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cp-swap-'));
execSync(`cp -R ${TREE}/. ${dir}/`, { maxBuffer: 1024 * 1024 * 64 });
execSync(`rm -rf ${dir}/node_modules ${dir}/dist ${dir}/.git && ln -s ${TREE}/node_modules ${dir}/node_modules`);

// extract colors/src at the SHA over the copy's src/engine (the one-directory swap, M2).
// CP_ENGINE_SRC (a checked-out colors/src) takes precedence: a blob:none partial clone cannot
// serve `git archive` (fatal: pathspec … did not match), so a worktree checkout is the equivalent.
const ENGINE_SRC = process.env.CP_ENGINE_SRC || null;
fs.rmSync(path.join(dir, 'src/engine'), { recursive: true, force: true });
fs.mkdirSync(path.join(dir, 'src/engine'), { recursive: true });
if (ENGINE_SRC) {
  execSync(`cp -R ${ENGINE_SRC}/. ${path.join(dir, 'src/engine')}`);
  const srcSha = execSync(`git -C ${ENGINE_SRC} rev-parse HEAD`, { encoding: 'utf8' }).trim();
  if (!srcSha.startsWith(SHA)) console.log(`WARNING: CP_ENGINE_SRC checkout is ${srcSha}, not ${SHA}`);
} else {
  execSync(`git -C ${REPO} archive ${SHA} colors/src | tar -x --strip-components=2 -C ${path.join(dir, 'src/engine')}`);
}
const files = execSync(`find ${path.join(dir, 'src/engine')} -type f | wc -l`, { encoding: 'utf8' }).trim();
console.log(`engine snapshot at ${SHA.slice(0, 8)}: ${files} files (the pin carried 57)`);

// the diff -rq outside src/engine: NOTHING but the snapshot may differ
const diff = execSync(`diff -rq ${TREE} ${dir} -x node_modules -x dist -x .git -x single.html 2>/dev/null | grep -v "src/engine" | grep -v "batteries/slice1-battery.json" | grep -v "batteries/shell-battery.json" || true`, { encoding: 'utf8' });
console.log(diff.trim() ? 'DIFF OUTSIDE src/engine:\n' + diff : 'diff outside src/engine: CLEAN (only batteries/*.json result files may differ from a fresh run)');

let verdict = 'PASS';
const run = (label, cmd) => {
  let out = '', code = 0;
  try { out = execSync(cmd, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 16 }); }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); code = e.status ?? 1; }
  console.log(`\n-- ${label} -- exit ${code}`);
  const tailLines = out.trim().split('\n').slice(-4).join('\n');
  console.log(tailLines);
  if (code !== 0) {
    verdict = 'FAIL';
    const bad = out.split('\n').filter((l) => l.includes('✖')).slice(0, 6);
    if (bad.length) console.log('failing laws: ' + bad.map((l) => l.trim().slice(0, 110)).join('\n  '));
  }
  return code;
};
run('engine suite (the carried expectations at the OLD pin)', `${process.execPath} --test --experimental-strip-types test/engine.test.ts`);
run('node battery (framework-blind laws)', `${process.execPath} --experimental-transform-types batteries/node.battery.mjs`);

// build + the slice battery against the swapped engine
let out = '', code = 0;
try { out = execSync(`${process.execPath} node_modules/vite/bin/vite.js build`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = String((e.stdout || '') + (e.stderr || '')); code = 1; }
console.log(`\n-- build -- exit ${code} · ${out.trim().split('\n').slice(-2).join(' · ')}`);
if (code !== 0) verdict = 'FAIL';
else {
  const srv = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { cwd: dir, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 3000));
  let sout = '';
  try { sout = execSync(`CP_PORT=${PORT} ${process.execPath} batteries/slice1.battery.mjs`, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 16 }); }
  catch (e) { sout = String((e.stdout || '') + (e.stderr || '')); code = e.status ?? 1; }
  srv.kill('SIGKILL');
  console.log(`\n-- slice battery -- exit ${code}`);
  console.log(sout.trim().split('\n').slice(-2).join('\n'));
  if (code !== 0) { verdict = 'FAIL'; const bad = sout.split('\n').filter((l) => l.includes('FAIL')).slice(0, 6); if (bad.length) console.log('failing laws: ' + bad.map((l) => l.trim().slice(0, 110)).join('\n  ')); }
}

console.log(`\n== SWAP TEST VERDICT: ${verdict} ==`);
if (verdict === 'FAIL') console.log('A failing law names a moved thing: say whether it is the ENGINE\'s behaviour or the SHELL\'s expectation. Do not edit the law; do not edit the snapshot; file it.');
fs.rmSync(dir, { recursive: true, force: true });
process.exit(verdict === 'PASS' ? 0 : 2);
