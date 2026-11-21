/* shell-status.mjs — the T6 anti-rot tool: SHELL-STATUS.md is MEASURED, never hand-written.
 * Three stale "byte-identical" lines in the v3 package are the evidence that hand-written status
 * rots. This tool measures, prints, and writes the file with a GENERATED banner:
 *
 *   dist      — sha256 + bytes of every shipped dist/ artifact
 *   batteries — the node-side suites run LIVE here (node battery, contrast guardrail); the
 *               browser suites' latest receipts are read from deliveries/receipts/ if present
 *               (each stamped with its own mtime — a stale receipt SAYS it is stale)
 *   seed line — the seed-minting lines in src/App.svelte (evidence the ?seed wiring exists)
 *   aria      — the aria-* attribute count, source (.svelte) and shipped (dist bundle)
 *   ring      — the ringed row ids at a FIXED seed (a3f2), measured headless against the served
 *               dist (the tool starts its own preview on a PID-derived port and kills it)
 *
 * Run: node --import ./scripts/node-port-register.mjs tools/shell-status.mjs [--no-browser]
 * Output: stdout + SHELL-STATUS.md at the tree root. Exit 0 = the status was measured and written.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...segs) => path.join(ROOT, ...segs);
const sha = (f) => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const NO_BROWSER = process.argv.includes('--no-browser');
const L = [];
const out = (s = '') => { L.push(s); console.log(s); };

out('```');
out('GENERATED ' + new Date().toISOString().replace(/\.\d+Z$/, 'Z') + ' — do not edit (node tools/shell-status.mjs)');
out('');
// the pin (the gate greps this file for it — read it from the contract, never hardcode)
const snap = fs.readFileSync(P('SNAPSHOT.md'), 'utf8');
const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1] ?? 'UNKNOWN';   // the S13 fix: the pin shas are 8 OR 9 hex chars (408410477 is 9) — the {8} regex printed UNKNOWN
out('## the pin');
out(`- engine snapshot: ${pin} (read from SNAPSHOT.md — the contract of record)`);
out('');

// ---------- dist ----------
out('## dist (the shipped bytes)');
if (fs.existsSync(P('dist'))) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(P('dist'))) {
    const rel = path.relative(ROOT, f);
    out(`- ${rel} — ${fs.statSync(f).size} B — sha256 ${sha(f).slice(0, 16)}…`);
  }
} else { out('- dist/ ABSENT — run npm run distfile first'); }
out('');

// ---------- batteries ----------
out('## batteries');
const runCap = (label, cmd) => {
  try {
    const o = execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000, maxBuffer: 1024 * 1024 * 16 });
    const lines = o.trim().split('\n');
    const tail = lines.filter((l) => /ℹ (tests|pass|fail) \d+|^== /.test(l)).slice(-3).join(' · ') || lines.slice(-1)[0] || '';
    out(`- ${label}: ${tail}`);
  } catch (e) {
    const o = String((e.stdout || '') + (e.stderr || ''));
    const lines = o.trim().split('\n');
    const tail = lines.filter((l) => /ℹ fail \d+|FAILED LAWS|^== /.test(l)).slice(-2).join(' · ') || 'FAILED';
    out(`- ${label}: ${tail}`);
  }
};
runCap('node battery (live)', 'node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs');
runCap('contrast guardrail (live)', 'node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs');
for (const [name, file] of [['visual battery', 'visual-battery-latest.json'], ['slot battery (P-317)', 'slot-battery-latest.json']]) {
  const f = path.join(ROOT, 'deliveries', 'receipts', file);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    const age = Math.round((Date.now() - fs.statSync(f).mtimeMs) / 60000);
    out(`- ${name}: last receipt ${j.pass ?? '?'}/${(j.pass ?? 0) + (j.fail ?? 0)} (fail ${j.fail ?? '?'}) at seeds ${(j.seeds ?? []).join(', ') || 'n/a'} — receipt ${age} min old${age > 120 ? ' (STALE — re-run the battery)' : ''}`);
  } else out(`- ${name}: NO receipt on record (deliveries/receipts/${file} absent)`);
}
out('');

// ---------- the seed line ----------
out('## the seed wiring (T3)');
const app = fs.readFileSync(P('src/App.svelte'), 'utf8');
const seedLines = app.split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => /parseSeed|seed = |SEED_MAX/.test(l));
for (const [n, l] of seedLines.slice(0, 6)) out(`- src/App.svelte:${n}: ${l.trim().slice(0, 110)}`);
out('');

// ---------- aria ----------
out('## aria attributes');
const svelte = (function walkSrc(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkSrc(path.join(d, e.name)) : (e.name.endsWith('.svelte') ? [path.join(d, e.name)] : []))); })(P('src'));
const srcCount = svelte.map((f) => (fs.readFileSync(f, 'utf8').match(/aria-[\w-]+=/g) || []).length).reduce((a, b) => a + b, 0);
out(`- source (.svelte, ${svelte.length} files): ${srcCount} aria-* attributes`);
const bundle = P('dist', 'assets');
if (fs.existsSync(bundle)) {
  const js = fs.readdirSync(bundle).filter((f) => f.endsWith('.js'));
  const distCount = js.reduce((a, f) => a + (fs.readFileSync(path.join(bundle, f), 'utf8').match(/aria-[\w-]+/g) || []).length, 0);
  out(`- dist bundle: ${distCount} aria-* occurrences (assets/${js.join(', ')})`);
}
out('');

// ---------- the ring at a fixed seed ----------
if (!NO_BROWSER) {
  out('## the ring at a fixed seed (a3f2 · 1180×900, measured headless)');
  const port = 4400 + (process.pid % 60);
  try { execSync(`lsof -t -i:${port} | xargs -r kill -9 2>/dev/null; true`); } catch {}
  const srv = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { cwd: ROOT, stdio: 'ignore', detached: true });
  const killGroup = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} try { srv.kill('SIGKILL'); } catch {} };
  let up = false;
  for (let i = 0; i < 40 && !up; i++) { await new Promise((r) => setTimeout(r, 500)); try { execSync(`curl -s -o /dev/null -w '%{http_code}' http://localhost:${port}/`, { stdio: 'pipe' }).toString().includes('200') && (up = true); } catch {} }
  if (up) {
    try {
      const { execFileSync } = await import('node:child_process');
      const probe = `import { createRequire } from 'node:module'; const _req = createRequire(import.meta.url); const pw = _req('playwright');
const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 1180, height: 900 } });
await p.goto('http://localhost:${port}/?dev=1&seed=a3f2'); await p.waitForTimeout(2800);
await p.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await p.waitForTimeout(150);
await p.locator('.cp-ts-go').click(); await p.waitForTimeout(1100);
const r = await p.evaluate(() => ({ ring: [...document.querySelectorAll('.cp-rows .cp-row.cp-top3')].map((el) => el.getAttribute('data-id')), code: document.querySelector('.cp-seedcode b')?.textContent ?? '' }));
console.log(JSON.stringify(r)); await b.close();`;
      fs.writeFileSync(P('scripts', '.shell-status-probe.mjs'), probe);
      const o = execFileSync('node', ['--import', './scripts/node-port-register.mjs', 'scripts/.shell-status-probe.mjs'], { cwd: ROOT, encoding: 'utf8', timeout: 120000 });
      const r = JSON.parse(o.trim().split('\n').pop());
      out(`- ring ids at pick 1: ${r.ring.join(', ')} (${r.ring.length} rows — >3 only on an order tie, C′1's rule)`);
      out(`- seed code displayed in the footer: ${r.code}`);
      fs.unlinkSync(P('scripts', '.shell-status-probe.mjs'));
    } catch (e) { out(`- the ring probe FAILED: ${String(e).split('\n')[0].slice(0, 140)}`); }
  } else out('- the preview never came up — the ring ids could not be measured this run');
  killGroup();
} else out('## the ring at a fixed seed — SKIPPED (--no-browser)');
out('```');

fs.writeFileSync(P('SHELL-STATUS.md'), L.join('\n') + '\n');
console.log(`\nSHELL-STATUS.md written (${L.length} lines) — measured, not hand-written.`);
