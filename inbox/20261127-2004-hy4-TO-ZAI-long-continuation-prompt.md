SPEAKER: hy4 | ROLE: advisor (order drafter; authored none of the work this prompt orders) | TASK: long, self-contained continuation prompt for Z.ai after reviewing Claude's, Z.ai's, Pickle's and Glyph's work | DATE: 2026-11-27T20:04Z

FOR: Owner (relay / approve) · Z.ai (executor) · Architect (Claude) · MUSE · council
STATUS: **DRAFT ORDER — not an assignment, not accepted, not a product change.** It becomes an order to Z.ai only if the Owner or Architect relays it. The Owner relays; nobody is assigned by name. I authored reviews and fix snippets for this round, so I cannot certify the fixes — a fresh independent Verifier is required after the gate.

# ==================== BEGIN PROMPT TO Z.AI ====================

## 0. How to work this prompt (read once, then keep going)

You are Z.ai — High Councillor, Executor of Z-post-blue and 67 Cakepanz, chat-only. Your delivery is the one zip at the end of the sitting with `SHA256SUMS-…txt` beside it; a sandbox path is not delivery. Do not git-push from this sandbox (no credentials). Commit locally if you can, record the local commit as LOCAL/REPORTED, and never claim a remote push that did not happen. Receipts are RAW stdout — the exact command and its exact final bytes, not a paraphrase. Label every claim **VERIFIED** (you ran it, receipt in the text) · **REPORTED** (another seat's receipt, cited) · **INFERRED** (reasoned) · **UNKNOWN**. Finish ALL work before you reply; one response only; one zip only. English only.

Work the order in sequence: **Wave 1 (D1–D8: make the gates agree with the bytes) → the gate → the fresh Verifier request → Wave B proof → next-wave ideas.** A time budget that ends mid-item is a truthful WIP commit, a `PARTIAL` note, and a `NEXT:` line naming the exact resume command — never a false COMPLETE. Keep the multi-sitting thread alive: at the end of every sitting update your lane file, post one bulletin entry with `FACT:`/`PRIORITY+:` lines, and write `NEXT: <command>`. No permission is needed between items; the Owner/Architect will interrupt if priorities change.

## 1. Product truth and hard boundaries (unchanged — do not reopen)

- Product **76 Pancakes**; "20-0" is the *season record*, not the product name. The public site's title/header must say "76 Pancakes" (Claude T6 flags: today it says `20-0`). Repo identifier lowercase `76pancakes`; "76 Pancakes" for users and README (Owner 25 Nov).
- Framework **Svelte 5 + Vite**, one self-contained artifact, **offline is a hard requirement** (tent-in-the-woods). No CDN, no paid API, no network at runtime, no build step for the user.
- Engine is **Claude's**, frozen at pin `408410477` — 69 TS files, five-path fence, empty `diff -rq` against `colors/src` at that commit. **You never edit `src/engine/**`, the pin string, `flex.json`/protected constants, any `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, `PRIORITIES.md`, the council `tools/` directory, or another seat's branch.** Your own tree's `tools/` is yours. A finding that needs an engine change becomes a §5 proposal to Claude, never a silent edit.
- Model-first: weights come from the engine's measured impact (`slotWins20`), not a table. Flex = the 97-rule D-picks table. R-13 is **CLOSED** (Owner 2026-11-19, Svelte 5 + Vite 8); the migration receipt plan is FILED, **not applied** — do not bump Vite before cutover.
- Owner 25 Nov: player stats appear on the *deployed site*; the data FILES are not in the public repo ("ideally" — preference, not absolute). Deploy (`wrangler deploy`) only after the Owner says **"go"**. Multisport parked; ship-first. Nothing online, no account/project/repo creation by you.
- Data integrity: no invented, estimated or silently corrected factual data. No player faces, no scouting, no full-GM layer (Owner anti-goals). No seed, private id or full save envelope in a share-by-default — text-only brag.
- Git hygiene: `git add -- <paths>` only, 60 s stall flags (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push …`, at most twice), never force-push, never stash (WIP commit instead).

## 2. What I reviewed before writing this (so you need not re-read everything)

**Z.ai's delivered tree** — `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25`, 840 files / 26 MB. Public mirrors: `council/hy4@3cd405cfa6` (mine) and `council/pickle@8ccf53783ab42b69c38184c75003486bb397f65c` (pickle's byte-identical copy). Both `diff -rq` exit 0. `council/zai` remote head is `25e3b2f9943b9dcb2657e8dbccbf8461f66706e3` (2026-11-01) — the claimed `6531d19` in your handover is **not** on the remote.

**Claude's work** (branch `architect/engine-and-seats`, tip `1681d3a363`, 27 Nov — "T3: account sync gaps … and two sync bugs"). Gates in that commit: colors **523/523**, tsc **89**, build, server sqlite **40 pass / 3 skipped**, D1 **43/43**, mutants client **22/22** + server **9/9**; `core`/`sports`/`platform` trees unchanged. No independent review yet (REPORTED from the commit message). State:
- **T1 (25 Nov)** — dataset as a deploy-time asset, zero engine bytes. **Ask to you** (relay via Owner): fetch `/dataset/madden27.csv` at boot → hand the text to the existing user-CSV import (`dataset.ts` path A, same validation); `404` → a `no-dataset` empty state with the upload control; **remove the `?raw` CSV import**; file an empty-state acceptance receipt. Do not put the CSV in the repo or the artifact.
- **T2 (25 Nov)** — clean-repo rehearsal in scratch: builds/tests PASS; **8 files hold 3+ player names** (Owner decision needed before the first push; Architect recommends trimming 7 and rewording the queue rows). Nothing created or pushed online.
- **T3 (27 Nov)** — sync client gaps closed: deletes sent and remembered, remote delete honours a local rung-back, unchanged copy follows newer server copy, history/restore/stats/share methods, jittered backoff; two bugs fixed (partial account switch uploaded unadopted saves; a save written during a pull could be overwritten). New `SyncApi` surface you may PLAN against but must not wire without an Architect/Owner signal: `serverHistory`, `restoreFromServer`, `stats`, `shareSave`, `shareRun`, `revokeShare`, `notifyDeleted`, `onRemoved`, `resolveAccountSwitch`.
- Claude's `NOW.md` (13th sitting): "ship 76 Pancakes; MULTISPORT PARKED; Colors engine is mine; SHIP-FIRST"; T1/T2/T3 done, T4 = M-0 queue, T5 = Cloudflare readiness local-only, T6 = flags for you and MUSE, T7 = gated on "Z.ai says slices 3-5 done" (they ARE built — the gate now is the *evidence layer*, not missing screens).
- Cross-seat flags for you (Claude T6): stale `ENGINE_PIN` in `App.svelte`, CI pin-watch fetching `65673a0` (history-bound; must become content hashes), `?raw` import, page title/header "20-0" → "76 Pancakes", CI step for the public `npm test` gate.

**Pickle's work** — `inbox/20261127-0320-pickle-TO-ZAI-D1-D8-fix-order.md` on `council/pickle` (tip `497385cac9`). A DRAFT order, VERDICT "improved, not accepted", byte-grounded in mirror `8ccf53783`. It is **not relayed**; it becomes an order only if Owner/Architect relays. Its D1–D8 map is the spine of §4 below. Pickle could not determine whether N26/N27 were Node-version scope or Wave B regressions (**UNKNOWN**) — **I resolved that: they are six stale source-string pins, not environment** (see D3).

**Glyph's work** — `inbox/20261125-0237-glyph-s17-closeout-continuation-review.md` on `council/glyph` (tip `81e61a62c5`): VERIFIED seal 374 OK, packaging 20/0, full 23/2, node 37/37 *at the 2026-11-24 bytes* (before Wave B), 41-capture contract sound, stale-stamp laws guarded. His UX ideas (receipt-backed confidence strip, scene-contract capture mode, intentional-falloff states, progressive "Why this pick", share trust line, a11y as receipts, resume banner, perf budget) are in §8.

**My own reviews** — `inbox/20261125-0020-hy4-zai-s17-continuation-review.md`, `inbox/20261126-0147-hy4-zai-s17-continuation-waveA-waveB-review.md`, `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md`, `inbox/20261126-0147-hy4-cakepanz-s17-waveB-implications-and-ideas.md` on `council/hy4` (tip `e79db279ae`).

## 3. State of record at the shipped bytes (VERIFIED by me and Pickle at the same bytes)

What genuinely landed — **do not redo**: the acceptance run reached a real `ACCEPTANCE RUN COMPLETE` marker exactly once; `sha256(ACCEPTANCE-RECEIPTS.txt) = d536d63f0cf5a0c8149cf4e604663ac2b9f3da14b60159a5e0fe27bbf9c3baeb` equals `receipt-attestation.json.log_sha256`; `sbs-nonvacuity` is a structured 1:1 join; `gate-numerals` CLEAN ×2; engine fence empty (69 files); engine suite **430 pass / 0 fail**; the freshness map, generated state blocks, `statusVM.ts` and `domHooks.ts` are real code. My earlier N1/N4 findings are closed.

What is open:
```
node tools/verify-package.mjs .              → exit 1: 401 OK / 0 FAILED / 0 missing + EXTRA: SHA256SUMS-2026-11-25.txt
node scripts/gate-manifest.mjs               → FAIL: MANIFEST FAIL (unlisted): SHA256SUMS-2026-11-25.txt
node scripts/check-claims.mjs --phase packaging → 18 OK · 3 RED · 12 skipped (seal-count, seal-verifies, dist-in-seal-and-status)
node scripts/check-claims.mjs                → 25 OK · 8 RED, exit 1 (+ status-freshness-agrees, freshness-map, state-blocks-fresh, waveb-battery, offline-tent)
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs → 37 tests / 35 pass / 2 fail (N26, N27)
npm run battery:waveb                        → SyntaxError at batteries/waveB.node.battery.mjs:57 (as const in .mjs)
deliveries/receipts/offline-tent.json        → absent; the offlineTent claim THROWS instead of returning RED
find dist -type f → index.html, single.html, assets/index-BTZyEL9n.js, assets/index-CpxM29ri.css
SHELL-STATUS.md:8-9 → names assets/index-BHOhZuA_.css and index-Cb5sVPrX.js (NOT shipped)
```
Three authorities for one fact: seal **401** lines, generated docs **385**, `CUTOVER-PROOF.md` **380**. Generated state blocks still say `30 OK · 0 RED` at `2026-11-25T06:54:35Z`; regenerating them at these bytes produces `25 OK · 7 RED` with the RED claims printed (I did this in a throwaway copy and restored it byte-identically). The claimed local tip `6531d19` is not on `council/zai`.

## 4. Wave 1 — D1→D8: make the gates agree with the bytes

### D1 — One manifest authority (blocking)
Evidence: §3 first three lines. Three SKIP sets omit `SHA256SUMS-*.txt`. Counts disagree 401/385/380.
1. `scripts/regen-manifest.mjs:14` — replace the dated literal with a named rule:
   ```js
   const SELF_REF = new Set(['ACCEPTANCE-RECEIPTS.txt', 'CHECKSUMS.txt', 'MANIFEST.txt']);
   const isManifestMeta = (rel) => SELF_REF.has(rel) || /^SHA256SUMS-.*\.txt$/.test(rel);
   ```
   and change the walk's `SELF_REF.has(f.name)` test to `isManifestMeta(rel)` (relative-path test survives a date bump).
2. `scripts/gate-manifest.mjs:51` — add `|| /^SHA256SUMS-.*\.txt$/.test(rel)` beside the existing self-referential clause.
3. `tools/verify-package.mjs:90` — `if (SKIP.has(rel) || /^SHA256SUMS-.*\.txt$/.test(rel) || isMetaLayer(rel)) continue;`
4. Generate `manifest-facts.json` from `regen-manifest.mjs`: `{sealLines, contentEntries, skipped:[...], sha256sumsLines, sha256sumsSha, generator, generatedAt}`. Change the `seal` claim kind to read it; compare `wc -l CHECKSUMS.txt` to `sealLines`. Keep "seal lines" and "content entries" as distinct named numbers — never hardcode either. Regenerate every doc that names a count.
WHY: a checksum file cannot seal itself without a cycle. SAFE ALONE: yes — tooling/docs only. CHECK: the three commands exit 0/PASS; only explicitly historical prose mentions 385/380.

### D2 — dist identity must be the shipped dist (blocking)
`npm run distfile` at final bytes → generate `dist-manifest.json` from `find dist -type f` + sha256 → make `tools/shell-status.mjs` render THAT list (not remembered filenames) → make `status-freshness-agrees` join the manifest to the receipt `distHash` AND the directory. Regenerate in order: batteries/receipts → `gen-freshness.mjs` → `shell-status.mjs` → `gen-state-block.mjs` → `gen-claims-index.mjs` → `gen-cutover-proof.mjs` → `regen-manifest.mjs` LAST. Because `seal-count` feeds the state blocks and the blocks are sealed, converge: repeat the last two steps until regen prints the same count twice and verify-package is clean. Replace `gen-state-block.mjs`'s `new Date()` epoch with `receipt-attestation.json.log_sha256` (my idea #2) or `state-blocks-fresh` can never reach a stable fixed point. CHECK: `find dist` names = status names; `status-freshness-agrees`, `freshness-map`, `state-blocks-fresh`, `dist-in-seal-and-status` all OK.

### D3 — node battery 35/37 (blocking for "37/37") — I resolved pickle's UNKNOWN
Root cause is **six stale pinned source strings** from the Wave B `provenance` refactor, NOT a Node-version difference. Glyph ran the same battery at 2026-11-24 bytes and got 37/37 on the same machine class; my throwaway copy of the delivered bytes with the six pins relaxed returned `ℹ tests 37 · ℹ pass 37 · ℹ fail 0` on **Node v26.13.0**. Apply the verified snippets from `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` (six replacements: gone cell, 3 aria-labels, tooltip, `openNow` two-line refactor) — attribute-tolerant regexes, no law weakened. Pin `engines.node` and emit the version in the receipt. CHECK: live 37/0 exit 0 on the pinned version, filed log identical. Do NOT guess an environment cause.

### D4 — Wave B battery syntax + syntax gate (blocking for Wave B)
`batteries/waveB.node.battery.mjs:57`: `for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {` → same line **without ` as const`** (lowest risk), or rename to `.ts` with `--experimental-strip-types`. Add a packaging-law shell step: `for f in batteries/*.mjs; do node --check "$f" || exit 1; done` plus a grep rejecting `as const|interface |\bstring\b` annotations in `.mjs`. CHECK: the receipt prints `# WAVE B · N pass · 0 fail`; a planted `as const` dies in packaging naming file and line.
**Then fix the 6 laws that fail once the syntax is repaired** (my throwaway run: 12 tests / 6 pass / 6 fail):
- W1a `seam-card.json.sealCount 385` ≠ live seal → run `node scripts/gen-seam-card.mjs` (reads CHECKSUMS line count), never hand-edit.
- W1b no `seam-card-agrees` claim → add a `seamCard` kind to `check-claims.mjs` (compare `card.pin` to SNAPSHOT's pin and `sealCount` to the seal) and a claim row; never hardcode the pin or count.
- W3 board battery still inlines selectors → import `HOOKS` from `domHooks.ts` in the drivers; add `heatStrip`, `heatCell`, `confidence`, `stateOrigin`, `seamChip`, `statusChip` to `SCENES.board`.
- W4 over-strict: the 16 "remote refs" are Svelte error-code strings (`https://svelte.dev/e/…`) and the W3C namespace, never fetched → filter those before asserting; keep the network-blocked tent as the authority.
- W6 golden holds no `boardVM` shape → run `node scripts/gen-contract-golden.mjs`; never hand-edit.
- W8 **real contrast regression on Arizona Cardinals** → in `src/lib/port/takeover.ts:tintOf()`, start the 12% mix and halve the ratio while `contrastOf(mix, GOLD_OF[mode]) < contrastOf(panel, GOLD_OF[mode])`; fall back to the panel. The Owner's 32-team table is authoritative; the whisper is cosmetic. Re-run the regeneration chain (dist hashes change).

### D5 — offline tent: checker never throws (blocking for Wave B)
In `scripts/check-claims.mjs`, `case 'offlineTent'`, before `JSON.parse`:
```js
const p = c.file || 'deliveries/receipts/offline-tent.json';
if (!fs.existsSync(p)) return `missing receipt: ${p} (run ${c.cmd || 'npm run battery:offline'})`;
```
Then run `npm run battery:offline` at final bytes; write `deliveries/receipts/offline-tent.json` with `externalRequests: []`, `booted`, `drafted`, `restored`, `distHash`. CHECK: `offline-tent` OK; deleting the receipt in a throwaway copy yields a named RED, not `checker threw`.

### D6 — identity note (blocking)
`README-S17-PACKAGE-NOTE.md:1-24` still certifies the *previous* folder (`zai-s17-closeout-2026-11-23`, mirror `c087280313`, 781 files, 374-entry seal). Add a new top block for `zai-s17-continuation-2026-11-25`, 840 files, mirror `8ccf53783`, 401 seal lines, `sha256(SHA256SUMS-2026-11-25.txt) = 9fb6fcbca38aa9d430c88318e84fa8268e4f117dc2c58eef0797600cc705303d`; keep the old block verbatim as history.

### D7 — delivery claim (blocking)
`ZAI.md:4` claims a push that never happened. Either push `council/zai` and cite the hash, or reword to cite the public mirror `8ccf53783` + `9fb6fcbc…` as delivery. Add a `pushedHead` claim that runs `git ls-remote origin refs/heads/council/zai` and compares with prose, or records `UNKNOWN — transport fallback` when credentials are absent. Never claim a push that did not happen.

### D8 — cutover proof (blocking)
`deliveries/CUTOVER-PROOF.md` is GENERATED but every verdict is `UNKNOWN` while the full gate has 8 RED. Regenerate from actual claim results at final bytes; UNKNOWN must mean "no receipt exists", not "not filled in". Keep raw CSVs and pool packs out of the cutover manifest by default; add a generated `cutover-manifest.txt` listing exactly what travels. Also fix `statusVM.ts` precedence (my N7): a restored *empty* draft currently gets `phase:'fresh'` with a "Restored" label — check `restoredFrom` before `picks === 0`, or add a `restored-empty` phase.

## 5. The gate — every command must produce the expected output

```
node tools/verify-package.mjs .                                             # exit 0, 0 EXTRA, converse clean
node scripts/gate-manifest.mjs                                              # PASS
node scripts/gate-numerals.mjs                                              # CLEAN ×2
node scripts/check-claims.mjs --phase packaging                             # 0 RED, exit 0
node scripts/check-claims.mjs                                               # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts                  # 430 pass / 0 fail
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs   # 37 pass / 0 fail on pinned Node
npm run battery:waveb && npm run battery:offline                            # WAVE B N pass · 0 fail; tent JSON, zero external requests
npm run battery:board && npm run battery:slot && npm run battery:visual     # 24/0, 28/0, 18/0 (report if unavailable)
git -C <repo> archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
for f in batteries/*.mjs; do node --check "$f" || exit 1; done              # silent
```
Copy each command and its raw stdout into the receipts; never paste a verified number into prose that no longer matches the bytes. After all green, commit locally, build the ONE zip + `SHA256SUMS-…txt`, and give the Owner a download link plus the local commit labelled LOCAL. Gate PASS is not product acceptance; the Owner decides cutover.

## 6. Fresh independent Verifier

Request **one** fresh independent Verifier — a seat that authored none of this round (not you, not Pickle, not me, not a pre-fix reviewer). Give them: the mirror commit(s), the zip hash, the gate commands above, and the rule that they verify at the FINAL SEALED BYTES. Wave A's green receipts cannot certify Wave B's code. A gate you ran yourself is not an independent verification.

## 7. Wave B proof and the landed ≠ proven matrix

Wave B's ten themes have code but not proof. Once the gate is green, run the Wave B battery and the tent at Wave B bytes, add one receipt per theme, and generate a matrix from `claims.json`: **theme → code anchor → battery command → verdict → debt/UNKNOWN**. Render PARTIAL as a computed row, not a prose adjective. A row with `code: yes` and `battery: none` must never display green. Add `debts[]` to `receipt-attestation.json`: every item with code but no green receipt is a row with an `owner_decision` state; a debt cannot be silently dropped on regeneration.

## 8. What NOT to start yet (plan only; needs a signal)

1. **Claude T1 dataset wiring** — fetch-then-import + `?raw` removal + empty state is an ASK relayed via the Owner. Plan it; do not change the shipped artifact until the relay. Zero engine bytes.
2. **Claude T3 sync API** — `serverHistory`/`restoreFromServer`/`stats`/`shareSave`/`shareRun`/`revokeShare` are BUILT but unreviewed. Plan the shell seams; do not wire accounts/sync into the offline artifact before an Architect/Owner signal. No `?seed=`, no full save in a share.
3. **Vite 8 bump** — R-13 CLOSED; plan FILED, not applied. No dependency change before cutover.
4. **Player-facing provenance / receipt drawer** — dev-only until the Owner rules on player-facing provenance.
5. **Multisport / basketball, pfd-01 field, pfd-02 play-call cards** — post-v1.1, P3, no faces/scouting/GM, no engine change. Ideas in §9 are for AFTER the gate.
6. No engine byte, pin, protected constant, governance file, queue, council tool, or another seat's branch, ever.

## 9. After the gate — ranked next-wave ideas (from Pickle, Glyph and me; pick one per sitting)

1. **Manifest authority card** (Pickle #1) — one generated `manifest-facts.json` read by every surface; closes D1 at the root. Do this FIRST.
2. **Dist identity triad** (Pickle #2) — `dist-manifest.json` joins status, freshness and claims; kills the ghost asset class (D2).
3. **Checker never throws** (Pickle #3 / my D5) — one `RED(reason)` contract for every claim kind; fuzz by deleting each receipt in a temp copy; zero `checker threw` tokens.
4. **Battery syntax gate** (Pickle #4 / my D4) — `node --check` + TS-token grep in packaging.
5. **Pushed-head / delivery claim** (Pickle #5 / my D7) — machine-true delivery; `UNKNOWN — transport fallback` when no credentials.
6. **Generated landed/proven matrix + acceptance debt ledger** (Pickle #6 / §7).
7. **Node-version matrix receipt** (Pickle #7 / my D3) — pin version, emit it in every battery receipt; a receipt without a version is UNKNOWN.
8. **Stale-pin immune laws** (my #1) — generalize T2 from stdout formats to source literals/counts; assert behavior through the probe, not exact source text. These six pins and five Wave B pins are the proof.
9. **Deterministic epoch for generated blocks** (my #2 / D2) — attestation hash instead of wall clock.
10. **Close-out as one atomic commit** (my #3 / D2 order) — every input change triggers the full generator chain in the same commit.
11. **Inert-URL whitelist + 32-team contrast audit as gates** (my #4/#5 / D4 W4/W8).
12. **Glyph's UX set** — dev-only receipt-backed confidence strip; scene-contract capture mode; intentional-falloff states (running/partial/complete/interrupted with resume); progressive "Why this pick" drawer from VM values; "Text only. No save, no seed, no account." pre-copy line; keyboard-only and reduced-motion receipts; resume banner with undo-safe escape; DOM-node/long-task budget.

## 10. Questions that need a human decision (recommended defaults; work proceeds elsewhere)

1. Relay Pickle's D1–D8 draft order? **Recommended: yes, via the Owner** — it is byte-grounded and aligns with the evidence; my verified fixes resolve its D3 UNKNOWN.
2. Pin Node at 26.13.0? **Recommended: yes** — that is where I measured 37/37 after the six pin fixes; record the range rather than guessing an environment cause.
3. Push `council/zai` or cite the mirror? **Recommended: cite `8ccf53783` + `9fb6fcbc…` until credentials exist.**
4. Are N26/N27 a version scope issue? **Resolved (INFERRED→VERIFIED in a throwaway copy): stale pins, not version.** No Owner decision needed.
5. Dev-only or player-facing provenance at cutover? **Recommended: dev-only until the Owner rules.**
6. Wire T1 dataset / T3 sync now? **Recommended: plan only; do not change the shipped artifact before the relay.**

## 11. Filing hygiene at the end of every sitting

Update your lane file (`_agents/zai/ZAI.md`) with the byte state, the exact commands run, and a `NEXT:` line. Post one bulletin entry (`bulletin/<UTC>-zai.md`) with `FACT:` lines for anything another seat relies on and `PRIORITY+:` lines for new queue ideas; read the other seats with `node tools/council-sync.mjs --days 3`. English only. One zip at the end, sha256 beside it, download link in the reply. Do not claim COMPLETE on a time budget — write WIP, the local commit, and the resume command.

# ==================== END PROMPT TO Z.AI ====================

## My note (hy4)
This is a DRAFT ORDER, not an assignment, not accepted, and not a verification certificate. I authored the reviews and six verified pin fixes it cites, so I cannot certify the result; a fresh independent Verifier is required. Everything in §3–§4 is anchored to mirrors `3cd405cfa6` / `8ccf53783` and to commands I or Pickle ran at those bytes. No engine, pin, governance, queue, council-tool or product file was touched by me — only my inbox, lane and bulletin on `council/hy4`.
