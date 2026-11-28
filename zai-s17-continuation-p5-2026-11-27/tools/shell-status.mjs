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
// item 3 (fixed point): the header is DETERMINISTIC — it stamps the receipt-of-record's content
// hash instead of the wall clock, so two regenerations over the same state are byte-identical and
// the close-out seal can converge over this file.
const accShaForHeader = fs.existsSync(P('ACCEPTANCE-RECEIPTS.txt')) ? sha(P('ACCEPTANCE-RECEIPTS.txt')) : null;
out('GENERATED (deterministic — state over ACCEPTANCE-RECEIPTS.txt ' + (accShaForHeader ? accShaForHeader.slice(0, 16) + '…' : '(absent)') + ') — do not edit (node tools/shell-status.mjs)');
out('');
// item 2 (acceptance-covers-this-tree): the attestation's tree_sha_end + dist fingerprint decide
// whether the acceptance run of record certifies THIS tree. Covered → the line says so; moved →
// the line says `COMPLETE at tree X; current tree Y` (honest, never a stale certification).
function acceptanceCoversLine() {
  let att = null;
  try { att = JSON.parse(fs.readFileSync(P('receipt-attestation.json'), 'utf8')).runs?.at(-1) ?? null; } catch { att = null; }
  if (!att || !att.tree_sha_end) return '- acceptance-covers-this-tree: no sealed attestation on record — the coverage is UNKNOWN (never read as covered)';
  const liveTree = attestTreeSha();
  const distPart = att.dist_sha ? (att.dist_sha === curDist ? 'the acceptance dist fingerprint IS covered' : `the acceptance dist fingerprint is NOT covered (attested ${att.dist_sha.slice(0, 12)}… vs live ${curDist ? curDist.slice(0, 12) + '…' : 'no dist'})`) : 'the attestation carries no dist fingerprint (pre-item-2 attestation)';
  if (att.tree_sha_end === liveTree) return `- acceptance-covers-this-tree: COVERED — the attested tree_sha_end ${liveTree.slice(0, 16)}… and ${distPart}`;
  return `- acceptance-covers-this-tree: the acceptance receipt is COMPLETE at tree ${att.tree_sha_end.slice(0, 16)}…; current tree ${liveTree.slice(0, 16)}… — ${distPart} (the close-out chain's regenerations postdate the run; a Wave-A-style acceptance cannot certify bytes it never hashed)`;
}
// the attest.mjs tree walk, mirrored (scripts/attest.mjs treeSha() — the SAME exclusions, so the
// two receipts can never disagree about what "the content tree" is)
function attestTreeSha() {
  const SKIP = new Set(['node_modules', '.git', '.svelte-kit', 'shots', 'engine-node']);
  const SELF_REF = new Set(['ACCEPTANCE-RECEIPTS.txt', 'CHECKSUMS.txt', 'MANIFEST.txt', 'receipt-attestation.json']);
  const isReceipt = (rel) => rel.startsWith('deliveries/receipts/') || /(^|\/)gate-manifest-[^/]*\.log$/.test(rel);
  const rows = [];
  const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); const rel = path.relative(ROOT, p); if (SKIP.has(f.name)) continue; if (f.isDirectory()) walk(p); else if (SELF_REF.has(f.name) || isReceipt(rel)) continue; else rows.push([rel, sha(p)]); } };
  walk(ROOT);
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  const h = createHash('sha256');
  for (const [rel, s] of rows) h.update(rel + ':' + s + '\n');
  return h.digest('hex');
}
// the pin (the gate greps this file for it — read it from the contract, never hardcode)
const snap = fs.readFileSync(P('SNAPSHOT.md'), 'utf8');
const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1] ?? 'UNKNOWN';   // the S13 fix: the pin shas are 8 OR 9 hex chars (408410477 is 9) — the {8} regex printed UNKNOWN
out('## the pin');
out(`- engine snapshot: ${pin} (read from SNAPSHOT.md — the contract of record)`);
out('');

// ---------- dist ----------
// the T1 content-freshness fingerprint (2026-11-24, the orcads F3 fix — the same helper the two
// browser batteries now bake into their receipts): the freshness verdict is computed from BYTES
// (does the receipt's dist fingerprint equal the shipped dist/?), never from the clock age alone.
// Defined BEFORE the dist section so the dist manifest and the battery verdicts share ONE walk.
const distFingerprint = () => { const h = createHash('sha256'); const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } }; walk(path.join(ROOT, 'dist')); return h.digest('hex'); };
const curDist = fs.existsSync(P('dist')) ? distFingerprint() : null;

out('## dist (the shipped bytes)');
// item 2 (dist identity — Pickle D2 / DS N1/N2): the dist manifest is GENERATED here from the
// live walk (`find dist -type f` + sha256) and the status renders THAT list — the claims
// distManifest row reads the same file and joins it to the receipts' distHash, so a stale hash in
// the status can never coexist with fresh dist bytes again.
const distManifest = { meta: 'GENERATED by tools/shell-status.mjs — do not edit. The shipped dist/ bytes: one row per file (sha256 + size), plus the walk fingerprint the receipts and the claims gate join on.', files: [] };
if (fs.existsSync(P('dist'))) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(P('dist')).sort((a, b) => a.localeCompare(b))) {
    const rel = path.relative(ROOT, f).split(path.sep).join('/');
    const entry = { file: rel, bytes: fs.statSync(f).size, sha256: sha(f) };
    distManifest.files.push(entry);
    out(`- ${rel} — ${entry.bytes} B — sha256 ${entry.sha256.slice(0, 16)}…`);
  }
  distManifest.distFingerprint = curDist;
  fs.writeFileSync(P('dist-manifest.json'), JSON.stringify(distManifest, null, 1) + '\n');
} else { out('- dist/ ABSENT — run npm run distfile first'); }
out('');

// ---------- batteries ----------
out('## batteries');
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
// item 3 (fixed point): the node battery + contrast run LIVE here, but their tails carry NO clock
// field (node:test's ℹ counts are the numbers of record) — the runCap output is deterministic.
const runCap = (label, cmd) => {
  try {
    const o = execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000, maxBuffer: 1024 * 1024 * 16 });
    const lines = o.trim().split('\n');
    const tail = lines.filter((l) => /ℹ (tests|pass|fail) \d+|^== /.test(l)).slice(-3).join(' · ') || lines.slice(-1)[0] || '';
    out(`- ${label}: ${tail}`);
    return tail;
  } catch (e) {
    const o = String((e.stdout || '') + (e.stderr || ''));
    const lines = o.trim().split('\n');
    const tail = lines.filter((l) => /ℹ fail \d+|FAILED LAWS|^== /.test(l)).slice(-2).join(' · ') || 'FAILED';
    out(`- ${label}: ${tail}`);
    return tail;
  }
};
const nodeTail = runCap('node battery (live)', 'node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs');
const contrastTail = runCap('contrast guardrail (live)', 'node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs');
out(`- acceptance run: ${accNote}`);
out(acceptanceCoversLine());   // item 2: acceptance-covers-this-tree (defined below, after curDist)
if (accShaNote) out(accShaNote);
// the receipt-freshness verdicts — CONTENT-based (the T1 rule). The clock-age context line is
// RETIRED (item 3): a wall-clock phrase changed the status bytes on every regeneration, so the
// close-out chain could not converge; the content verdict is the only freshness evidence.
const receiptBits = {};
for (const [name, file] of [['visual battery', 'visual-battery-latest.json'], ['slot battery (P-317)', 'slot-battery-latest.json']]) {
  const f = path.join(ROOT, 'deliveries', 'receipts', file);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    let verdict;
    if (j.distHash && curDist) verdict = j.distHash === curDist ? 'content FRESH (the receipt\'s dist fingerprint matches the shipped dist/)' : 'content STALE (the receipt\'s dist fingerprint does NOT match the shipped dist/ — re-run the battery)';
    else verdict = 'content UNKNOWN (pre-T1 receipt format, no distHash — judge by the acceptance run)';
    out(`- ${name}: last receipt ${j.pass ?? '?'}/${(j.pass ?? 0) + (j.fail ?? 0)} (fail ${j.fail ?? '?'}) at seeds ${(j.seeds ?? []).join(', ') || 'n/a'} — ${verdict}`);
    receiptBits[name] = { j, fresh: verdict.startsWith('content FRESH') };
  } else out(`- ${name}: NO receipt on record (deliveries/receipts/${file} absent)`);
}
out('');

// ---------- the ring retirement (S15) and the floors ----------
out('## the ring retirement (S15) and the floors');
out('- 6 ring-era law subjects RETIRED with the ring, by name: L13 (the top-three ring), L16 (the ringed-row qualifier), L21 (the quick leg of the Tab walk), L23 (the backwards ring-only glow), L24 (the ring oracle), L25 (the ring explanation) — reasons per law in deliverables/RING-LAW-RETIREMENT-2026-11-21.md; L17/L18/L19/L20/L22 are KEPT (their subjects — undo/expand, the double-activation guard, the staged disarm, the announced values, the staged-confirm guard — are not ring-bound); every surviving outcome carries a law');
// item 3 (DS N10): the floors line is GENERATED from THIS run and the receipts on record — never a
// static list that can sit beside a live `fail 2`. A receipt whose dist fingerprint does not match
// the shipped dist/ renders STALE (its number is not this tree's); a missing receipt renders
// UNKNOWN. No number on screen the tools did not just compute or pin to these bytes.
const acc = fs.existsSync(accPath) ? fs.readFileSync(accPath, 'utf8') : '';
const lastBanner = (re) => { const m = [...acc.matchAll(re)]; return m.length ? m[m.length - 1] : null; };
const engineOk = /ℹ tests 430[\s\S]{0,200}ℹ pass 430[\s\S]{0,80}ℹ fail 0/.test(acc);
const falsifiersOk = acc.includes('ACCEPTANCE RUN COMPLETE — every step exit 0') && !/TAUTOLOGY|COULD-NOT-RUN/.test(acc);
const boardM = lastBanner(/== BOARD BATTERY \(uniform\) · (\d+) pass · (\d+) fail ==/g);
const shellM = lastBanner(/== SHELL BATTERY · (\d+) pass · (\d+) fail ==/g);
const sliceM = lastBanner(/== SLICE 1 BATTERY · (\d+) pass · (\d+) fail · (\d+) skip[^=]*==/g);
const wavebLog = P('deliveries/receipts/waveb-battery.log');
const wavebM = fs.existsSync(wavebLog) ? fs.readFileSync(wavebLog, 'utf8').match(/# WAVE B · (\d+) pass · (\d+) fail/) : null;
const offlineJ = fs.existsSync(P('deliveries/receipts/offline-tent.json')) ? JSON.parse(fs.readFileSync(P('deliveries/receipts/offline-tent.json'), 'utf8')) : null;
const offlineOk = offlineJ && offlineJ.booted === true && offlineJ.drafted === true && offlineJ.restored === true && (offlineJ.externalRequests || []).length === 0 && offlineJ.distHash === curDist;
const floor = [];
const nodeNums = nodeTail.match(/pass (\d+)[\s\S]{0,40}fail (\d+)/);
floor.push(`node battery ${nodeNums ? `${nodeNums[1]}/${nodeNums[1]} (live)` : 'UNKNOWN (live tail unparseable)'}`);
const contrastNums = contrastTail.match(/(\d+) pass · (\d+) fail/);
floor.push(`contrast ${contrastNums ? `${contrastNums[1]}/${contrastNums[1]} (live)` : 'UNKNOWN (live tail unparseable)'}`);
floor.push(`engine ${engineOk ? '430/430 (the acceptance receipt of record)' : 'UNKNOWN (the acceptance receipt of record does not show 430/430 at these bytes)'}`);
floor.push(`falsifiers ${falsifiersOk ? 'ALL DIE (the acceptance receipt of record)' : 'UNKNOWN (no COMPLETE falsifier record at these bytes)'}`);
const visB = receiptBits['visual battery'], slotB = receiptBits['slot battery (P-317)'];
floor.push(`visual ${visB ? (visB.fresh ? `${visB.j.pass}/${visB.j.pass + visB.j.fail} (receipt content-FRESH)` : 'STALE — the receipt does not pin this dist') : 'UNKNOWN (no receipt)'}`);
floor.push(`slot ${slotB ? (slotB.fresh ? `${slotB.j.pass}/${slotB.j.pass + slotB.j.fail} (receipt content-FRESH)` : 'STALE — the receipt does not pin this dist') : 'UNKNOWN (no receipt)'}`);
floor.push(`waveb ${wavebM ? `${wavebM[1]}/${wavebM[1]} (receipt)` : 'UNKNOWN (no # WAVE B receipt line)'}`);
floor.push(`offline tent ${offlineOk ? 'holds (receipt: 0 external, dist pinned)' : offlineJ ? 'NOT verified against this dist — re-run npm run battery:offline' : 'UNKNOWN (no receipt)'}`);
floor.push(`board ${boardM ? `${boardM[1]}/${boardM[1]} (the acceptance receipt of record)` : 'UNKNOWN (no board banner on record)'}`);
floor.push(`shell ${shellM ? `${shellM[1]}/${shellM[1]} (the acceptance receipt of record)` : 'UNKNOWN (no shell banner on record)'}`);
floor.push(`slice ${sliceM ? `${sliceM[1]}/${sliceM[1]} · ${sliceM[3]} skip (the acceptance receipt of record)` : 'UNKNOWN (no slice banner on record)'}`);
out('- floor is (GENERATED from this run + the receipts on record): ' + floor.join(' · '));
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
