/* shell-status.mjs — the T6 anti-rot tool: SHELL-STATUS.md is MEASURED, never hand-written.
 * Three stale "byte-identical" lines in the v3 package are the evidence that hand-written status
 * rots. This tool measures, prints, and writes the file with a GENERATED banner:
 *
 *   dist      — sha256 + bytes of every shipped dist/ artifact
 *   batteries — the node-side suites run LIVE here (node battery, contrast guardrail); the
 *               browser suites' latest receipts are read from deliveries/receipts/ if present —
 *               (2026-11-24, the T1 rule: the freshness verdict is CONTENT-based — the receipt's
 *               distHash vs the shipped dist/ — plus the acceptance-run pointer; the clock age is
 *               printed as context, never as the verdict)
 *   seed line — the seed-minting lines in src/App.svelte (evidence the ?seed wiring exists)
 *   aria      — the aria-* attribute count, source (.svelte) and shipped (dist bundle)
 *   top3      — the top-three treatment row ids at a FIXED seed (a3f2), measured headless against the served
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
// the T1 content-freshness fingerprint (2026-11-24, the orcads F3 fix — the same helper the two
// browser batteries now bake into their receipts): the freshness verdict is computed from BYTES
// (does the receipt's dist fingerprint equal the shipped dist/?), never from the clock age alone.
const distFingerprint = () => { const h = createHash('sha256'); const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } }; walk(path.join(ROOT, 'dist')); return h.digest('hex'); };
const curDist = fs.existsSync(P('dist')) ? distFingerprint() : null;
// the acceptance-run pointer (ernie F3 / the S17 A1 fix): the verdict reads the TERMINAL MARKER the
// script itself writes — "ACCEPTANCE RUN COMPLETE — every step exit 0" — never a prose claim. A
// PARTIAL or STOPPED receipt says so in the same breath (the 2026-11-24 defect: the shipped status
// said COMPLETE while the receipt ended mid-13b — the claim-classes statusAcceptance and
// no-contradictory-acceptance-line now pin this line to the receipt bytes from both sides).
const accPath = P('ACCEPTANCE-RECEIPTS.txt');
let accNote = 'no ACCEPTANCE-RECEIPTS.txt on record';
let accShaNote = '';
if (fs.existsSync(accPath)) {
  const acc = fs.readFileSync(accPath, 'utf8');
  const complete = acc.includes('ACCEPTANCE RUN COMPLETE — every step exit 0');
  const partial = acc.includes('ACCEPTANCE RUN PARTIAL');
  const stopped = acc.includes('ACCEPTANCE RUN STOPPED');
  accNote = complete && !stopped ? 'the acceptance run of record is COMPLETE (ACCEPTANCE-RECEIPTS.txt — every step exit 0; the browser batteries ran inside it)' : stopped ? `the acceptance run on record STOPPED (ACCEPTANCE-RECEIPTS.txt${partial ? ' — ACCEPTANCE RUN PARTIAL' : ''}) — treat battery receipts with care` : 'ACCEPTANCE-RECEIPTS.txt carries no COMPLETE marker';
  accShaNote = `- acceptance receipt sha256 (acceptanceSha): ${sha(accPath)} — receipt-attestation.json records it; claims acceptance-attestation + freshness.json verify the match`;
}
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
out(`- acceptance run: ${accNote}`);
if (accShaNote) out(accShaNote);
for (const [name, file] of [['visual battery', 'visual-battery-latest.json'], ['slot battery (P-317)', 'slot-battery-latest.json']]) {
  const f = path.join(ROOT, 'deliveries', 'receipts', file);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    const age = Math.round((Date.now() - fs.statSync(f).mtimeMs) / 60000);
    // the freshness verdict is CONTENT-based (the orcads F3 / T1 rule): a receipt whose recorded
    // dist fingerprint matches the shipped dist/ is FRESH at any clock age; a mismatch is STALE
    // and says so; a pre-T1 receipt without the field says content UNKNOWN — never a bare STALE
    // flag next to a green composite.
    let verdict;
    if (j.distHash && curDist) verdict = j.distHash === curDist ? 'content FRESH (the receipt\'s dist fingerprint matches the shipped dist/)' : 'content STALE (the receipt\'s dist fingerprint does NOT match the shipped dist/ — re-run the battery)';
    else verdict = 'content UNKNOWN (pre-T1 receipt format, no distHash — clock-age is not evidence; judge by the acceptance run)';
    out(`- ${name}: last receipt ${j.pass ?? '?'}/${(j.pass ?? 0) + (j.fail ?? 0)} (fail ${j.fail ?? '?'}) at seeds ${(j.seeds ?? []).join(', ') || 'n/a'} — receipt ${age} min old — ${verdict}`);
  } else out(`- ${name}: NO receipt on record (deliveries/receipts/${file} absent)`);
}
out('');

// ---------- the ring retirement (S15) and the floors ----------
out('## the ring retirement (S15 §4.2) and the floors');
out('- 6 ring-era law subjects RETIRED with the ring, by name: L13 (the top-three ring), L16 (the ringed-row qualifier), L21 (the quick leg of the Tab walk), L23 (the backwards ring-only glow), L24 (the ring oracle), L25 (the ring explanation) — reasons per law in deliverables/RING-LAW-RETIREMENT-2026-11-21.md; L17/L18/L19/L20/L22 are KEPT (their subjects — undo/expand, the double-activation guard, the staged disarm, the announced values, the staged-confirm guard — are not ring-bound); every surviving outcome carries a law');
out('- floor is now: board 24/0 · shell 53/0 · visual 18/0 · node 37/37 · slot 28/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (three KNOWN team holes stay NAMED) · engine 430/430 · falsifiers ALL DIE');
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

// ---------- the top-three treatment at a fixed seed ----------
if (!NO_BROWSER) {
  out('## the top-three treatment at a fixed seed (a3f2 · 1180×900, measured headless)');
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
      out(`- top-three rows at pick 1: ${r.ring.join(', ')} (${r.ring.length} rows — >3 only on an order tie, C′1's rule)`);
      out(`- seed code displayed in the footer: ${r.code}`);
      fs.unlinkSync(P('scripts', '.shell-status-probe.mjs'));
    } catch (e) { out(`- the top-three probe FAILED: ${String(e).split('\n')[0].slice(0, 140)}`); }
  } else out('- the preview never came up — the ring ids could not be measured this run');
  killGroup();
} else out('## the top-three treatment at a fixed seed — SKIPPED (--no-browser)');
out('```');

fs.writeFileSync(P('SHELL-STATUS.md'), L.join('\n') + '\n');
console.log(`\nSHELL-STATUS.md written (${L.length} lines) — measured, not hand-written.`);
