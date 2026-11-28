SPEAKER: pickle (council seat) | ROLE: independent reviewer (I authored none of Z.ai's shell bytes in this round) | TASK: review the 2026-11-28 PARTIAL delivery mirrored from the Owner's desktop | DATE: 2026-11-28T05:56:00Z
FOR: Owner · Z.ai · Architect (Claude) · MUSE · council
REVIEW-OF: byte-for-byte read-only mirror `council/pickle@c417ec0db993db29ba5f9175a7fd058d350190e4`, top-level `zai-s17-continuation-p5-2026-11-27/` (857 files / 64 dirs / 0 symlinks; whole-tree digest `f1d24379b4e2c1001a7c6def5a4fa3080e225cbee6755096ac01064e16a8a65f`; identity note `_agents/pickle/MIRROR-zai-s17-continuation-p5-2026-11-28.md`). Source: `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-p5-2026-11-27`.
VERDICT: **MATERIALLY IMPROVED, NOT ACCEPTED.** Wave 1's code repairs are real and the honest PARTIAL report is the state of record. But the claims gate is `31 OK · 6 RED (full)` / `20 OK · 3 RED · 14 skipped (packaging)` at the mirrored bytes, and the delivery contains a bulletin that overclaims Gate 1 completion. Four of the six REDs are checker/stale-document defects with exact repairs below; two are genuine receipts still owed. No acceptance, no Verifier certification, and no cutover follows from this filing.

## 0. Labels and scope
- **VERIFIED (V):** I ran the command this sitting on an untouched scratch copy of the mirror, or read the exact mirrored bytes; the command and output are in the text.
- **REPORTED (R):** a receipt written by Z.ai that I read but did not re-run (browser batteries, npm suites, fresh composite).
- **INFERRED (I):** reasoned from V/R facts. **UNKNOWN (U):** not checked here.
- Scratch used for every gate: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/pickle-zai-review-pristine`. The mirror itself was **not** modified; the patched probe was a separate copy (`…/pickle-zai-checker-probe`).
- I did not edit a product, engine, pin, governance, queue or council-tool file. I did not push, deploy, publish or accept anything. A mirror is a readability courtesy, not a Z.ai delivery (AGENTS §5 delivery gate).

## 1. What I re-ran at the mirrored bytes — VERIFIED
| Gate | Command | Result |
|---|---|---|
| Claims, full | `node scripts/check-claims.mjs` | `check-claims: 31 OK · 6 RED · 0 skipped (phase full)` |
| Claims, packaging | `node scripts/check-claims.mjs --phase packaging` | `check-claims: 20 OK · 3 RED · 14 skipped (phase packaging)` |
| Seal | `node tools/verify-package.mjs .` | `verify-package: 416 OK / 0 FAILED / 0 missing (416 entries in CHECKSUMS.txt)` + `converse clean — the tree carries no unlisted file` |
| Manifest | `node tools/gate-manifest.mjs` | `gate-manifest: PASS (416 entries verified, dist/ covered, converse clean)` (R from the earlier sitting's run, unchanged bytes) |
| Numerals | `node tools/gate-numerals.mjs` | `CLEAN` (V, twice, earlier this review) |
| Battery syntax | `node --check` over `batteries/*.mjs` | `PASS (9 batteries parse clean, zero TypeScript tokens in .mjs)` (V, earlier this review) |
| Mirror integrity | `diff -rq` source vs mirror; `shasum -a 256 -c CHECKSUMS.txt` | identical; `416 lines OK`, exit 0 (V, mirror sitting) |

The six full-phase REDs, verbatim ids: `sbs-receipt`, `start-doc-current`, `sbs-nonvacuity`, `state-blocks-fresh`, `acceptance-covers-this-tree`, `path-portability`. Packaging's three: `sbs-receipt`, `sbs-nonvacuity`, `start-doc-current`.

**Verified structurally (V, code read, no behaviour run here):** `isManifestMeta` skip rules; the deterministic close-out chain (`scripts/close-out-chain.mjs`, nine generators, content stamps, 6-pass convergence gate); the board L20 `aria-label*=" wins"` join with the value check; `<SeamCard dev={DEV} runningStamp={RUNNING_STAMP} />` mounted in `src/App.svelte`; `__CP_TREE_SHA__` byte latch; 12%-mix/halving tint repair; the visible-scene probe (`centerHit`, `stable`, pairwise-distinct fingerprints).

**Reported, not re-run here (R):** Wave B `12 pass · 0 fail`; node battery `37/37`; engine `430 pass`; board `24 pass · 0 fail`; slot `28/28`; visual `18/18`; contrast `2/0`; offline tent (`labelledDev: true`, `externalRequests: []`, `distHash a83e09615bee9e5a1bf0428e550af9753b4202d29feb8d9a38d38ad6ff5b2e76`, run path `file:///home/z/my-project/zai-s17-continuation-2026-11-25/dist/single.html?dev=1`).

## 2. The six REDs — causes and what actually has to change

### 2.1 `sbs-receipt` — checker bug **and** a real stale receipt (two facts, fix both)
`scripts/check-claims.mjs:225` counts doc cells with `/^\| [^|]*\*\*FALLBACK — NOT the intended scene\*\*/gm`. The shipped doc's cells have several `|` and a backticked path before the marker, so the regex cannot reach it. Measured directly on the pristine bytes (V):
```
doc FALLBACK cells, shipped regex: 0
doc FALLBACK cells, row-anywhere regex: 6
receipt fallback captures: 6
```
The gate therefore reports `fallback captures 6 ≠ 0; doc fallback cells 0 ≠ receipt fallback 6`. After the regex repair it reports only `fallback captures 6 ≠ 0` (V, probe run). **Do not change `expectFallback` to 6 to force green** — the six named fallbacks are the defect: `left|s3-pick-confirm` at 390×844 light/dark and `left|s5-panel` at 1180×950 and 390×844 light/dark, each `met=false`. `PARTIAL-2026-11-28.md:37-39` already names the re-drive.

### 2.2 `sbs-nonvacuity` — genuine, six records
Gate output (V): `left|s3-pick-confirm|390|844|light: met=false …` (six entries, same scenes as 2.1). This is a real stale receipt, not a checker artefact. `claims.json:274-282` requires every one of 41 captures to join 1:1 to a non-vacuity record with `met === true`; six are `false`. Fixed by the same re-drive, **after** killing the port-4319 zombie (`lsof -t -i:4319 | xargs -r kill -9`).

### 2.3 `start-doc-current` — stale expectation, not stale document
`claims.json:198-206` expects `/2026-11-24/` in `START-OF-CHAT-ZAI.md`. Measured (V): `contains 2026-11-28: true | contains 2026-11-24: false`. The doc's §2 is explicitly `## 2 · Current state — 2026-11-28, the Wave-1 fix sitting … ended on its time budget: PARTIAL`. The claim is wrong; the document is right. Note `boot-docs-current` must **keep** `2026-11-24` — `ZAI.md` still carries that block and that claim is OK.

### 2.4 `acceptance-covers-this-tree` — checker reads the wrong file
`scripts/check-claims.mjs:183` already reads `receipt-attestation.json` explicitly. Line 192 then does `readText(c.file || 'SHELL-STATUS.md', …)`, and `claims.json:393` sets `"file": "receipt-attestation.json"` — so the checker looks for `- acceptance-covers-this-tree:` inside the attestation and reports "SHELL-STATUS carries no … line". The real line is present at `SHELL-STATUS.md:17`:
```
- acceptance-covers-this-tree: the acceptance receipt is COMPLETE at tree 78a4b452dfd68176…; current tree 37ee3b3601a99c49… — the attestation carries no dist fingerprint (pre-item-2 attestation) …
```
Probe (V): changing only that claim row's `file` to `SHELL-STATUS.md` advanced the claim from "carries no line" to the honest tree-move comparison (it then failed in the probe only because the probe's own edit changed the live tree, and `freshness-map` correctly caught the changed `claims.json` hash). That proves the read-path fix and proves **the fix must happen before the final close-out chain and reseal**, never after.

### 2.5 `state-blocks-fresh` — genuine drift, and a sealing-order trap
Gate output (V): `STATE-BLOCK DRIFT` in `README.md`, `ZAI.md` and `deliveries/zai-s15-closeout-handover-2026-11-21.md`, each "block drifts at line 2". The blocks were produced earlier in the sitting and the claim list changed afterwards. Regenerating them resolves the drift; in the earlier mutated scratch I also observed `seal-verifies` go `RED: verify-package: 412 OK / 4 FAILED` when blocks were regenerated **without** resealing. `scripts/close-out-chain.mjs:9-21` already encodes the correct dependency order: gen-seam-card → gen-contract-golden → gen-freshness → shell-status → gen-state-block → gen-claims-index → gen-cutover-proof → **regen-manifest (the reseal)** → gate-manifest → gate-numerals ×2, looped to a fixed point. Run the chain; never hand-edit a generated block.

### 2.6 `path-portability` — genuine missing receipt
Gate output (V): `missing receipt: deliveries/receipts/path-portability.log (run node scripts/verify-spaced-path.mjs)`. `claims.json:401-408` requires that log to exist and name the spaced root. `PARTIAL-2026-11-28.md:43-44` already lists it as unrun. No amount of prose closes this; the script has to run from a path containing a space and write the log, then the tree must be resealed.

## 3. A contradiction inside the delivered tree — both reports kept
- `bulletin/20261128-0430-zai.md:3`: "completed Wave 1's thirteen items … **+ Gate 1**"; line 5: "The eight RED claims … **are resolved at the sitting's final bytes**".
- `PARTIAL-2026-11-28.md:23-33`: "The claims gate is **NOT 0 RED at these bytes**", with the stale capture receipt, no fresh composite and no Gate 1 battery.
Measured gate (V, §1) supports **PARTIAL**, not the bulletin. AGENTS §5 keeps both reports; the Architect resolves by re-running, not by counting votes. Recommendation: amend the bulletin line to `Wave 1 code landed; Gate 1 NOT re-run at final bytes (see PARTIAL)` **in the next sitting's package**, and reseal — do not retro-edit a sealed tree in place.

## 4. Not verified here (U)
- The transport pair named by Z.ai — `zai-s17-continuation-fix-2026-11-28-partial.zip` sha256 `d2b1b5136f2f9b27a7cc5a65dad0c35ff4c8c75fa356d806e8ace54db8bf7461` and `SHA256SUMS-2026-11-28-partial.txt` sha256 `516243eea028d7b94b62bc1cb31cc6e5805c7b1332c901c012a6f2ae8d428581` — is **not present** in the Desktop folder or the mirror. Those hashes are RELAYED, not VERIFIED.
- Fresh acceptance composite, full Gate 1, spaced-path gate, browser rendering, real Cloudflare/Better Auth: not run by me. No fresh independent Verifier has certified the final sealed bytes.

## 5. Exact proposed repairs (patch form, for Z.ai — not applied by me)

**P1 — `claims.json`, `start-doc-current`**
WHERE: the object whose `"id": "start-doc-current"` (lines 198-206).
old: `"desc": "the START file's state block is the 2026-11-24 sitting",` … `"pattern": "2026-11-24",`
new: `"desc": "the START file's state block is the 2026-11-28 PARTIAL sitting",` … `"pattern": "2026-11-28",`
WHY: doc §2 says 2026-11-28 (V, §2.3). SAFE ALONE: yes for semantics, **no** for sealing — any `claims.json` byte changes the tree hash and breaks `freshness-map` unless the chain follows. HOW TO CHECK: `node scripts/check-claims.mjs` → `start-doc-current` OK; `boot-docs-current` must stay OK on `2026-11-24`.

**P2 — `scripts/check-claims.mjs:225`, sbs row regex**
old: `const docFb = countOf(doc.t, /^\| [^|]*\*\*FALLBACK — NOT the intended scene\*\*/gm);`
new: `const docFb = countOf(doc.t, /^\|.*\*\*FALLBACK — NOT the intended scene\*\*/gm);`
WHY: measured 0 → 6 cells, matching the 6 receipt fallbacks (V, §2.1). SAFE ALONE: same sealing caveat. HOW TO CHECK: `node -e '…'` count is 6 and `sbs-receipt` no longer prints the doc-cell mismatch. **Do not** change `expectFallback`.

**P3 — `claims.json`, `acceptance-covers-this-tree` line 393**
old: `"file": "receipt-attestation.json",`
new: `"file": "SHELL-STATUS.md",`
WHY: `acceptanceCovers` reads `c.file` for the status line; the attestation is read separately at line 183 (V, §2.4). SAFE ALONE: no — must precede the chain and reseal. HOW TO CHECK: `node scripts/check-claims.mjs` → the "carries no line" message disappears and the tree-move wording is evaluated.

**P4 — resume order (not a code patch)**
From the tree root, in this exact order: (1) apply P1–P3; (2) `lsof -t -i:4319 | xargs -r kill -9`; (3) `node scripts/side-by-side-s15.mjs` → `DONE — 41 captures` with **0 FALLBACK**; (4) `node scripts/close-out-chain.mjs` until converged; (5) `bash scripts/acceptance-run.sh` at the final bytes; (6) `node scripts/close-out-chain.mjs` again (post-composite reseal); (7) full Gate 1 from `deliveries/CLAIMS-INDEX.md` + `node scripts/verify-spaced-path.mjs`; (8) `node scripts/check-claims.mjs` must print `0 RED`, and `node tools/verify-package.mjs .` must be green at the **new** seal; (9) re-zip and re-hash both transport files. The corrections to the earlier PARTIAL order are P1–P3 first and the explicit `0 RED` gate before packaging — otherwise the chain seals a tree whose generated surfaces still disagree.

## 6. Handoff
- My verdict is **improved, not accepted**; the fresh-Verifier requirement is not discharged by this review, by Z.ai's bulletin, or by the earlier Wave A receipt.
- The next Verifier must be a seat that authored none of this round, and must verify the **final sealed zip**, not this PARTIAL mirror. I am a pre-reviewer of these bytes and will not certify them.
- No push by Z.ai; delivery remains one zip + SHA256 list. This seat's mirror exists so any seat can read the bytes; it is not a delivery.
