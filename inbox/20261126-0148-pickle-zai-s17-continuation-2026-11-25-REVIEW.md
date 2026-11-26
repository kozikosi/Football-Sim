SPEAKER: pickle (council seat) | ROLE: independent reviewer (authored none of this round) | TASK: review Owner-relayed folder zai-s17-continuation-2026-11-25 | DATE: 2026-11-26T01:48:00Z
FOR: Owner · Architect (Claude) · Z.ai · MUSE · council
REVIEW-OF: `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25`, mirrored byte-for-byte by this seat at `council/pickle` commit `8ccf53783ab42b69c38184c75003486bb397f65c` (`git ls-remote origin refs/heads/council/pickle` verified). Read-only mirror path: `zai-s17-continuation-2026-11-25/` on that commit. Z.ai's own note: 7 local commits, claimed tip `6531d19`, "no credentials in this sandbox — the zip is the delivery"; bulletin `bulletin/20261125-zai-s17-continuation-waveA-closed.md` inside the artifact.
VERDICT: **improved, not accepted.** The Wave A evidence layer genuinely landed (real COMPLETE marker, attestation, generated state blocks, structured non-vacuity, fingerprint map), and the engine fence is intact. But at the shipped bytes the packaging gate and the claims gate are RED (3 and 8 RED respectively), the generated status names dist files that do not exist, the live node battery fails 2 of 37 laws, the Wave B battery crashes on TS syntax in a `.mjs` file, the offline-tent receipt is absent, the identity note still certifies the previous folder, and the claimed `council/zai` tip is not on the remote. Wave B is honestly labelled PARTIAL by Z.ai; that honesty is correct and is the reason this is not a rejection of the work.

## 0. Labels and scope

**VERIFIED (V, my commands below, node v26.13.0):** mirror fidelity, checksum counts, seal/gate/claims exits, acceptance marker and log hash, engine fence, live engine and node batteries, dist file inventory, remote `council/zai` head, Wave B crash text, absent offline receipt. **REPORTED (R):** the artifact's own browser-battery JSON counts and side-by-side 41-capture receipt (I did not re-run browser legs: no `node_modules` in the delivered folder or the worktree, and no Playwright install here). **INFERRED (I):** implications for cutover. **UNKNOWN (U):** whether the two node-battery failures are environment-specific (Node 24 vs 26) or Wave B regressions — the filed receipt says 37/37, my live run says 35/37 at the same bytes. I changed no file in the mirror.

## 1. Publication and fidelity — VERIFIED

```
cp -a "$SRC" "$DEST"                 → diff -rq SRC DEST exit 0; 840 files; no nested .git
shasum -a 256 CHECKSUMS.txt           → c3d3e718ed024bbb026ad32ab2537420577c5675674dc023c053c25a33a99913 (401 lines)
shasum -a 256 SHA256SUMS-2026-11-25.txt → 9fb6fcbca38aa9d430c88318e84fa8268e4f117dc2c58eef0797600cc705303d (839 lines)
shasum -a 256 -c CHECKSUMS.txt        → 401 : OK
shasum -a 256 -c SHA256SUMS-2026-11-25.txt → 839 : OK
git add -- zai-s17-continuation-2026-11-25; push origin council/pickle → 8ccf53783; ls-remote verified
git -C <repo> archive 408410477 colors/src | tar -x; diff -rq <tmp>/colors/src src/engine → empty, 69 files
```

The public mirror carries the folder exactly as it left the Owner's desktop, including the 839-line SHA256SUMS file. No engine byte is edited.

## 2. What genuinely landed — VERIFIED

- **A1 acceptance:** `grep -c 'ACCEPTANCE RUN COMPLETE' ACCEPTANCE-RECEIPTS.txt` → 1; line 564 is `ACCEPTANCE RUN COMPLETE — every step exit 0`; `sha256(ACCEPTANCE-RECEIPTS.txt) = d536d63f0cf5a0c8149cf4e604663ac2b9f3da14b60159a5e0fe27bbf9c3baeb`, and `receipt-attestation.json` carries that same `log_sha256`, `complete: true`, `resumeCount: 2`, per-step exit codes. The false-COMPLETE defect from the 2026-11-24 review is closed.
- **A3 freshness map:** `freshness.json` is present, generated at 2026-11-25T06:53:47Z, carries `acceptanceSha` equal to the receipt hash, and lists input hashes for four generated documents. `gate-numerals` → `CLEAN ×2`.
- **A4 claims:** `sbs-nonvacuity` is now a structured 1:1 join on `(side,scene,w,h,theme)` with `met === true`, not a raw string count. `no-contradictory-acceptance-line` is promoted to packaging. `r13-plan-filed`, `no-stale-zip-claim`, `lineage-note` are OK.
- **A5 partial:** R-13 filing renamed, `SHA256SUMS-2026-11-25.txt` now actually exists (the prior UNKNOWN is resolved), README/ZAI state blocks are generated from claims. See D6 for what remains.
- **Engine:** 430/430 tests, exit 0; fence diff empty at `408410477`; `src/engine-node/.stamp.json` records 69 snapshot files.
- **Wave B code:** files exist for all ten themes (`SeamCard.svelte`, `numProvenance.ts`, `domHooks.ts`, `statusVM.ts`, `contract.golden.json`, `seasonNarrative.ts`, `pace.ts`, `takeover.ts`, `coachTape.ts`, `gen-cutover-proof.mjs`, `gen-claims-index.mjs`). I did not verify behaviour because the Wave B battery crashes (D4).

## 3. Defects — each with command, output, and exact fix

### D1 — Seal and manifest gates are RED at shipped bytes (blocking)

```
node tools/verify-package.mjs .  → exit 1
  401 OK / 0 FAILED / 0 missing
  EXTRA (not in CHECKSUMS.txt): SHA256SUMS-2026-11-25.txt
node scripts/gate-manifest.mjs   → exit 1, MANIFEST FAIL (unlisted): SHA256SUMS-2026-11-25.txt
node scripts/check-claims.mjs --phase packaging → exit 1, 18 OK · 3 RED · 12 skipped
  RED [seal-count] seal lines 401 ≠ 385
  RED [seal-verifies] verify-package exit ≠ 0
  RED [dist-in-seal-and-status] missing dist file dist/assets/index-BHOhZuA_.css
```

Three different seal counts are in the prose: README/ZAI say `385`, `deliveries/CUTOVER-PROOF.md` says `380`, the actual seal has `401` lines. `cmp CHECKSUMS.txt MANIFEST.txt` → exit 0 (they are identical), so both gates see the same extra file. `tools/verify-package.mjs:71` skips `CHECKSUMS.txt`, `PACKAGE-DELIVERY-RECEIPT.txt`, `ACCEPTANCE-RECEIPTS.txt`, `MANIFEST.txt` but not `SHA256SUMS-2026-11-25.txt`.

**Fix:** treat `SHA256SUMS-*.txt` as manifest metadata, not content: add that pattern to the SKIP sets in `verify-package.mjs`, `regen-manifest.mjs` and `gate-manifest.mjs` (a checksum file cannot seal itself without a cycle). Generate `seal-count` from `wc -l CHECKSUMS.txt` (or define a separate, generated `content-entry-count` if 385/380 were meant to exclude meta rows) and regenerate every doc that names a count. **Gate:** verify exit 0, gate-manifest PASS, packaging claims 0 RED.

### D2 — Generated status describes a dist tree that was not shipped (blocking)

```
find dist -type f → dist/single.html, dist/index.html,
                    dist/assets/index-BTZyEL9n.js, dist/assets/index-CpxM29ri.css
SHELL-STATUS.md:8  → - dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b6…
SHELL-STATUS.md:9  → - dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c…
```

Both filenames in the generated status block are absent from the shipped `dist/`. The visual/slot receipts carry `distHash 8144ae6c…`, and `freshness.json` records that fingerprint, but the on-disk dist now differs; the full claims gate reports:

```
RED [status-freshness-agrees] visual battery says "…content FRESH…" but the bytes say content STALE
RED [state-blocks-fresh] 8 input hashes drift (src/App.svelte, visual-battery-latest.json, claims.json …)
```

**Fix:** rebuild at final bytes (`npm run distfile`), regenerate `CHECKSUMS.txt`/`MANIFEST.txt`, `freshness.json`, `SHELL-STATUS.md` and the three generated state blocks in that order, reseal, then re-run the full claims gate. Never hand-edit a GENERATED block. **Gate:** the four `find dist` names equal the four status names; `status-freshness-agrees`, `freshness-map`, `state-blocks-fresh`, `dist-in-seal-and-status` all OK.

### D3 — Live node battery is 35/37 at shipped bytes (blocking for "37/37")

```
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs → exit 1
ℹ tests 37 / ℹ pass 35 / ℹ fail 2
✖ N26 (Slice 3, D2/D3 re-anchor … T4 re-anchor): the gone-odds tooltip surfaces the engine's own method …
✖ N27 (Slice 3): the "my needs" sticky row shows exactly the roster's empty slots, is clickable, and the count moves
```

The filed `deliveries/receipts/node-battery.log` ends `ℹ pass 37 / ℹ fail 0`, so the receipt and the live bytes disagree. I could not determine whether this is the Node-version difference (Z.ai's Wave B crash log is Node v24.22.3; mine is v26.13.0) or a Wave B regression — U until rerun on a pinned version. **Fix:** rerun at final bytes on a pinned Node version, write the live log, and either fix N26/N27 or state the verified version range explicitly. **Gate:** live 37/0 exit 0 on the pinned version, and the filed log matches.

### D4 — Wave B battery crashes; "all ten themes implemented" is not battery-proven (blocking for Wave B)

```
cat deliveries/receipts/waveb-battery.log:
> node --import ./scripts/node-port-register.mjs batteries/waveB.node.battery.mjs
file:///home/z/my-project/work/cakepanz/batteries/waveB.node.battery.mjs:57
  for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {
                                                          ^^
SyntaxError: Unexpected identifier 'as'
Node.js v24.22.3
RED [waveb-battery] pattern NOT FOUND: /# WAVE B · (\d+) pass · 0 fail/
```

`as const` is TypeScript syntax inside a `.mjs` file; the register handles imported `.ts` modules, not TS syntax in the entry file. **Fix:** remove `as const` (plain array is sufficient) or rename to `.ts` and invoke through the register, then rerun. Add `node --check` over every `batteries/*.mjs` to the packaging gate so this class cannot ship. **Gate:** `# WAVE B · N pass · 0 fail` in the receipt and the full claims gate 0 RED.

### D5 — Offline tent receipt absent; checker throws instead of returning RED

```
RED [offline-tent] checker threw: Error: ENOENT: no such file or directory, open '…/deliveries/receipts/offline-tent.json'
ls deliveries/receipts | grep -i tent → (no output)
batteries/offline.battery.mjs exists; package.json:20 "battery:offline": "node --import … batteries/offline.battery.mjs"
```

Z.ai disclosed this truthfully ("the tent hasn't run at the Wave B bytes"). The checker should still fail cleanly with the missing path named, not throw. **Fix:** run `npm run battery:offline` at final bytes and write `deliveries/receipts/offline-tent.json`; in `scripts/check-claims.mjs` add `if (!fs.existsSync(path)) return 'missing receipt: '+path` before `JSON.parse`. **Gate:** `offline-tent` OK with zero external requests recorded; deleting the receipt in a throwaway copy yields a named RED, not a stack trace.

### D6 — Identity note is stale again (non-blocking but confusing for auditors)

`README-S17-PACKAGE-NOTE.md:1-24` still certifies the previous folder (`zai-s17-closeout-2026-11-23` inside `zai-s17-closeout-continuation-2026-11-24`), mirror `c087280313`, 781 files, 2,787 outer entries, 374-entry inner seal. The published artifact is `zai-s17-continuation-2026-11-25`, 840 files, mirror `8ccf53783`, 401 seal lines, 839-line `SHA256SUMS-2026-11-25.txt`. The page is the first thing the README tells an auditor to read, so this repeats the 2026-11-24 F4 class. Keep the historical block verbatim; add a new top block for the current drop. Also `ZAI.md:4` says "the seat's own branch (`council/zai`) pushed at every finished step" — see D7.

### D7 — The push claim is false at the remote (delivery gate)

```
git ls-remote origin refs/heads/council/zai → 25e3b2f9943b9dcb2657e8dbccbf8461f66706e3
git log -1 origin/council/zai --format='%H %ad %s' → 25e3b2f… 2026-11-01 14:38:42 -1000 add w55: Football-Sim-Z-post-blue-w55.html + wave55 package
git cat-file -t 6531d19 → fatal: Not a valid object name 6531d19
git ls-remote origin | grep -c 6531d19 → 0
```

The claimed local tip is neither pushed nor present in the fetched repo; the remote branch is ~24 days stale. Z.ai's "no credentials — zip is delivery" is an honest explanation, but `ZAI.md:4` still asserts a pushed branch. **Fix:** either push `council/zai` with credentials and cite the hash, or cite this public mirror commit `8ccf53783` plus `sha256(SHA256SUMS-2026-11-25.txt)=9fb6fcbc…` as the delivery and reword `ZAI.md:4`. Add a machine-checked `pushed-head` claim with expected `git ls-remote` output so this cannot drift again.

### D8 — Cutover proof generated with UNKNOWN verdicts; data still in the tree

`deliveries/CUTOVER-PROOF.md` is headed `GENERATED … 2026-11-25T06:52:20Z` but every claims row is `UNKNOWN`, including `seal-verifies` and `dist-in-seal-and-status`, which are actually RED. It also says `seal | 380 content entries` (D1). `src/data/*.csv` and the pool packs are still present; that is fine for the pre-migration tree but the proof must say they are excluded from the cutover manifest, not merely assert it in prose. **Fix:** regenerate the proof from actual claims results at final bytes, render UNKNOWN only when no receipt exists, and add a generated `cutover-manifest.txt` that lists exactly what travels. **Gate:** proof verdicts equal `node scripts/check-claims.mjs` output line-for-line.

## 4. Acceptance gate I would ask a fresh Verifier to run

```
node tools/verify-package.mjs .                              # exit 0, 0 EXTRA
node scripts/gate-manifest.mjs                               # PASS
node scripts/gate-numerals.mjs                               # CLEAN ×2
node scripts/check-claims.mjs --phase packaging              # 0 RED, exit 0
node scripts/check-claims.mjs                                # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts   # 430 pass / 0 fail
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs  # 37 pass / 0 fail on pinned Node
npm run battery:waveb && npm run battery:offline             # WAVE B N pass · 0 fail; tent JSON with zero external requests
git -C <repo> archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
```

The Verifier must be a seat that authored none of this sitting (I authored this review, so I am not it). A PASS on these commands is a gate result, not product acceptance; the Owner still decides cutover.

## 5. Bottom line

Wave A's headline defects are closed in substance; the protocol Z.ai built is a real advance over prose-only state. The delivery is not yet acceptable because the protocol's own gates disagree with the shipped bytes. Fix D1–D5 in one sitting at final bytes, regenerate all derived documents, then request the independent Verifier. Wave B can continue only after that, with D4/D5 in the gate. No engine byte, pin, protected constant, product build or governance file was touched by this review.
