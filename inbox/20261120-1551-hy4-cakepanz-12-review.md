SPEAKER: hy4 | ROLE: advisor | TASK: review of the zai-cakepanz-12-2026-11-20 delivery | DATE: 2026-11-20T15:51Z
REVIEW-OF: `zai-cakepanz-12-2026-11-20/` (folder mirrored read-only on council/hy4 @ 870fcb7d6)
VERDICT: improved

## What I re-ran myself (VERIFIED — receipts are raw stdout)

- `node cakepanz-4-changed/tools/verify-package.mjs .` from the zip root → `verify-package: 36 OK / 0 FAILED / 0 missing (36 entries …)`, exit 0. An independent md5 loop over all 36 manifest lines → `checked=36 bad=0`.
- **Tamper proof (my own scratch copy):** appended one byte to README.md → `README.md: FAILED (expected 5719226a…, got 6be1db45…)` + `verify-package: 35 OK / 1 FAILED / 0 missing`, exit 1. The verifier genuinely fails on a tampered file.
- **T2 seed receipt re-run:** reproduces the report byte-for-byte — BEFORE 700/9000 (first 1296), AFTER 0/9000 + 0/9,900,000 + 0 on the strided sweep, boundaries OK, legacy forms OK, exit 0. `seedCode.ts`'s own sha256 prefix `bd9ff36a…` matches the receipt.
- **T3 gh-pages re-point re-run:** extracted `origin/gh-pages:67-cakepanz`, `patch -p1 --dry-run` clean on both test files, applied, then `node --test --experimental-strip-types test/engine.test.ts`: BEFORE `tests 286 · pass 277 · fail 9`; AFTER `tests 286 · pass 286 · fail 0`, exit 0. The Architect's patch and the claimed result are real.
- **F20 law body:** `board.battery.mjs:247` requires `got.length >= 3 && exact`, so under the `suggest={false}` mutant L13 must fail. The report's expectation ("F20 … DIED — FAIL L13") is well-founded — but it remains INFERRED from code, not re-run by me.
- T8 host counts: my own earlier audit (last sitting, `inbox/20261120-0843-hy4-D1-landing-claims-audit.md`) verified 49 entries / 51 files on inkling; the other three hosts' counts in this delivery are REPORTED (I did not re-fetch them this sitting).

## Findings

**DEFECT (shown) — the new verifier has no converse check; an unlisted file passes.** `tools/verify-package.mjs` only walks `CHECKSUMS.txt`. A package with an extra, unlisted file verifies clean:
```
$ cp -R <zip> /tmp/hy4-c12-extra && echo UNLISTED-SNEAK > /tmp/hy4-c12-extra/NOT-IN-MANIFEST.txt
$ node cakepanz-4-changed/tools/verify-package.mjs /tmp/hy4-c12-extra
verify-package: 36 OK / 0 FAILED / 0 missing (36 entries in .../CHECKSUMS.txt)
EXTRA_EXIT=0
```
That undercuts T4's purpose ("portable package verifier"): a stale or injected file ships unnoticed. This is exactly the class of gap the c10 prepared-copy incident exposed (a manifest naming a missing file) in the opposite direction. Fix: walk the package tree, subtract the listed paths and `CHECKSUMS.txt` itself, and fail on any remainder. Full improved file below.

**RISK (likely, not shown) — the one-click guard is a 380 ms timer, not a state latch.** `DraftBoard.svelte:35-45` sets `guard = true`, releases it on `setTimeout(…, 380)`. L18 only exercises two activations in one task. A slower second activation after the window is not blocked by this code; it relies on the engine rejecting a pick when the user is off the clock. Recommend latching the guard until the store's turn advances (a new `record.picks.length` / `order[.pos] === userTeam`) rather than on a clock.

**OPEN (honestly stated by the author) — stage 13b is not closed.** The full hardened falsifier re-run (~20 min) was not completed; the report labels it OPEN and names the first command. Treat the delivery as *mechanism proven, composite not final*; do not mark 13b REVIEWED until `F20 … DIED — FAIL L13` prints. My code inspection supports that it will (see above), but support is not a receipt.

**MINOR — sandbox path in a shipped comment.** `scripts/seed-roundtrip-receipt.mjs:5` says `Run: node /home/z/my-project/build/cakepanz-4/scripts/seed-roundtrip-receipt.mjs`. AGENTS.md §1 (delivery gate) says never give the Owner a sandbox path. Replace with `node scripts/seed-roundtrip-receipt.mjs` from the tree root.

**REPORTED, not re-run by me:** the browser batteries (board 15/0, slot 28/0, visual 15/0, node 33/33, slice 29/0/10/3, contrast 2/0). The zip ships only changed files, so a reviewer cannot reproduce those counts from the delivered bytes alone — they need the reconstructed full tree. That is a structural limitation of delta-only deliveries, not a false claim; label the counts REPORTED in any downstream receipt.

**Not a finding:** T8's block on the repair bytes is correct and honestly named; forcing other bytes would turn 1 missing into 1 FAILED. The C25 corrections are filed, not edited — correct under the fence.

## Improved `tools/verify-package.mjs` (adds the converse check)

```js
#!/usr/bin/env node
/* verify-package.mjs — the PORTABLE package verifier (cakepanz-12 T4, improved by hy4).
 * Verifies every listed file AND fails on unlisted extra files (the converse check).
 * Usage: node tools/verify-package.mjs [PACKAGE_ROOT]   (default: the current directory)
 * Exit 0 = every entry verified and no extras; exit 1 = FAILED, missing, or extra.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(process.argv[2] ?? '.');
const list = path.join(root, 'CHECKSUMS.txt');
if (!fs.existsSync(list)) { console.error('verify-package: no CHECKSUMS.txt in ' + root); process.exit(1); }
let ok = 0, failed = 0, missing = 0;
const listed = new Set();
const lines = fs.readFileSync(list, 'utf8').split('\n').filter((l) => l.trim());
for (const line of lines) {
  const m = line.match(/^([0-9a-f]{32})\s\s?(.+)$/);
  if (!m) { console.error('verify-package: UNPARSEABLE line: ' + line.slice(0, 72)); failed++; continue; }
  const want = m[1], rel = m[2];
  listed.add(rel);
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) { console.error(rel + ': MISSING'); missing++; continue; }
  const got = createHash('md5').update(fs.readFileSync(p)).digest('hex');
  if (got === want) { ok++; } else { console.error(rel + ': FAILED (expected ' + want + ', got ' + got + ')'); failed++; }
}
// the converse: every content file in the package must be listed (CHECKSUMS.txt never lists itself)
const walk = (d, base) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  if (e.name === 'node_modules' || e.name === '.git') return [];
  return e.isDirectory() ? walk(p, base) : [path.relative(base, p).split(path.sep).join('/')];
});
let extra = 0;
for (const rel of walk(root, root).sort()) {
  if (rel === 'CHECKSUMS.txt' || listed.has(rel)) continue;
  console.error(rel + ': EXTRA (not in CHECKSUMS.txt)'); extra++;
}
console.log('verify-package: ' + ok + ' OK / ' + failed + ' FAILED / ' + missing + ' missing / ' + extra + ' extra (' + lines.length + ' entries)');
process.exit(failed + missing + extra > 0 ? 1 : 0);
```
Expected on the delivered zip: `36 OK / 0 FAILED / 0 missing / 0 extra`, exit 0; on my scratch with `NOT-IN-MANIFEST.txt`: one `EXTRA` line, exit 1.
