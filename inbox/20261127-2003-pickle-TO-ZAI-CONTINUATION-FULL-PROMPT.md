SPEAKER: pickle (council seat) | ROLE: adviser / order drafter | TASK: draft a long, self-contained continuation prompt after cross-seat review | DATE: 2026-11-27T20:03:00Z
FOR: Owner (relay/approve) · Z.ai (executor if relayed) · Architect (Claude) · MUSE · council
STATUS: **DRAFT PROMPT — not an assignment, not accepted, not a verification certificate.** It becomes an order only when Owner/Architect relays it. I authored the review behind it, so I cannot certify the result.
GROUNDING: `inbox/20261127-2003-pickle-CROSS-SEAT-REVIEW-2026-11-27.md`, `inbox/20261126-0148-pickle-zai-s17-continuation-2026-11-25-REVIEW.md`, hy4's `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md`, porca's `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md` and companion brainstorm, Claude's `claude/NOW.md`, `claude/pre-deployment-tasks-2026-11-25.md`, `claude/zai-work-order-v8-2026-11-21.md`, `claude/zai-note-2026-11-25-boot-loader.md`, `claude/t1-dataset-asset-receipts-2026-11-25.md` and `claude/cutover-rehearsal-2026-11-25.md`, all read at pushed refs listed in the cross-seat review.

# ==================== BEGIN COPY-PASTE PROMPT ====================

## S17 continuation, round 2: restore the truth at final bytes, then finish the cutover shell

**Multi-sitting instruction:** keep working for a long time across sittings. Do not stop after one green command. Work the waves in order, commit and push after every finished item, post one bulletin entry per sitting with `FACT:` and `PRIORITY+:` lines, update your lane file, and end with a `NEXT:` line naming the exact next command and expected output. If a sitting ends mid-item, make an honest WIP commit labelled `PARTIAL`; never write a false COMPLETE. No seat waits for another seat to be "assigned"; the work comes from the queue and the Owner/Architect relay.

### 0. Read first, and know where truth lives

Read these before changing anything:
1. `inbox/20261127-2003-pickle-CROSS-SEAT-REVIEW-2026-11-27.md` — the cross-seat state of record.
2. `inbox/20261126-0148-pickle-zai-s17-continuation-2026-11-25-REVIEW.md` and `inbox/20261126-0148-pickle-zai-s17-continuation-2026-11-25-implications.md` — my byte-grounded review and ten ranked ideas.
3. `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact N1–N7 snippets, including evidence that the node battery failure is stale pins, not behaviour.
4. `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md` and `...cakepanz-waveb-next-wave.md` — the Seam Card green lie, `%20` path bug, and B1–B6 shell ideas.
5. On Claude's branch: `claude/NOW.md`, `claude/pre-deployment-tasks-2026-11-25.md`, `claude/zai-work-order-v8-2026-11-21.md`, `claude/zai-note-2026-11-25-boot-loader.md`, `claude/t1-dataset-asset-receipts-2026-11-25.md`.
6. `inbox/20261127-0320-pickle-TO-ZAI-D1-D8-fix-order.md` — my earlier draft; it is consistent with this prompt, and hy4's more specific fixes supersede my UNKNOWN on N26/N27.

**Hard boundaries:** engine pin `408410477` (69 TS files, empty diff against `colors/src`), `FLEX`, `RATING_SPECS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, protected constants and `teamRatings` are not yours to edit. No product `Football-Sim-*.html`. No `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, `tools/` council tooling, `CHRONICLE.md`, `MERGE-MANIFEST.md`, another seat's branch, Vite bump, or invented factual data. R-13 is CLOSED: Svelte 5 + Vite 8 is final; the migration receipt plan is FILED, not applied. Multisport is parked; basketball is second after v1.1. Offline is a hard requirement. No seed/private id or player name in a share-by-default. Use `git add -- <paths>`, 60 s stall flags, one push attempt then a second, no force-push, no stash. A delivery is a pushed commit hash or a download link, never a sandbox path.

**Starting truth (all VERIFIED at pushed refs unless labelled):** Claude's branch is `architect/engine-and-seats@1681d3a36` (T3 sync gaps, 14 files, +737/−53) and its engine fence against `408410477` is empty. Your own pushed branch `council/zai` is still `25e3b2f99` from 2026-11-01; the 2026-11-25 folder exists only in the Owner's desktop drop and seat mirrors (`council/pickle@8ccf53783` is byte-for-byte, 840 files). Wave A genuinely landed; Wave B is honestly PARTIAL and fails its own gate: full claims `25 OK · 8 RED`, packaging `18 OK · 3 RED`, `verify-package` exit 1 on the SHA256SUMS sidecar, and the generated status describes dist files that are not shipped. hy4 and porca independently reproduced the same defects; their filings are REPORTED receipts to you, not votes. Nothing here is accepted until a fresh Verifier signs at final bytes and the Owner rules.

### 1. Wave 1 — make the package honest at the final bytes (blocking)

#### 1.1 The manifest authority and the sidecar (hy4 N1 / my D1)
The `SHA256SUMS-2026-11-25.txt` companion sits at the tree root and is in none of the SKIP sets. Three counts disagree: 401 seal lines, 385 in generated docs, 380 in the cutover proof. A checksum file cannot seal itself. Apply these pin-agnostic repairs (VERIFIED anchors; INFERRED fix design, hy4's throwaway proof):

- `tools/verify-package.mjs:71`, after `const SKIP = …`:
```js
const isShaSidecar = (rel) => /(^|\/)SHA256SUMS-[^/]*\.txt$/.test(rel);
```
- `tools/verify-package.mjs:90`:
```js
// old
if (SKIP.has(rel) || isMetaLayer(rel)) continue;
// new
if (SKIP.has(rel) || isMetaLayer(rel) || isShaSidecar(rel)) continue;
```
- `scripts/regen-manifest.mjs:17`, in `walk`:
```js
// old
else if (SELF_REF.has(f.name) || isReceipt(rel)) continue;
// new
else if (SELF_REF.has(f.name) || isReceipt(rel) || /(^|\/)SHA256SUMS-[^/]*\.txt$/.test(rel)) continue;
```
- `scripts/gate-manifest.mjs:51`, in `walk`:
```js
// old
else if (isReceipt(rel)) continue;
// new
else if (isReceipt(rel) || /(^|\/)SHA256SUMS-[^/]*\.txt$/.test(rel)) continue;
```

Generate one `manifest-facts.json` with `{sealLines, contentEntries, skipped:[...], sha256sumsLines, sha256sumsSha, generator, generatedAt}`; make `seal-count` read it rather than hardcoding 385. Every doc that names a count renders from it. **Check:** `node tools/verify-package.mjs .` → `401 OK / 0 FAILED / 0 missing` and exit 0; `node scripts/gate-manifest.mjs` → PASS; a planted *content* file still fails.

#### 1.2 Node battery: re-anchor stale string pins, keep the laws (hy4 N4)
My live run was 35/37; hy4 proved in a throwaway copy that the behaviour is intact and six literal pins are stale. Apply these exact anchors (do **not** touch the `as const` string literal at `batteries/node.battery.mjs:485`, which is a fixture):

- `batteries/node.battery.mjs:604`:
```js
// old
assert.ok(rowSrc.includes('<span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>'), '…');
// new
assert.match(rowSrc, /<span[^>]*class="cp-num cp-gone"[^>]*aria-label="\{r\.gone\} gone odds"[^>]*aria-describedby="cp-gone-desc-\{r\.id\}"[^>]*>\{r\.gone\}<\/span>/, '…');
```
- Lines 605–607: replace exact `rowSrc.includes('aria-label="{r.ovr} overall"')` etc. with `/aria-label="\{r\.ovr\} overall[^"]*"/`, `/aria-label="\{r\.wins\} wins[^"]*"/`, `/aria-label="\{r\.priority\} priority[^"]*"/`. The new BoardRow appends ` — provenance in the tooltip` inside the same attribute; the value is still announced.
- Line 616: replace the exact tooltip includes with `/<span class="cp-gonetip" role="tooltip" aria-hidden="true">\{method\(oddsMeta\)\}[^<]*<\/span>/.test(rowSrc)`. The new tooltip appends `{provGone()}`, still aria-hidden and hover-only.
- Line 644:
```js
// old
assert.ok(appSrc.includes('openNow.set(openSlots(st.draft.rosters[userTeam]))'), '…');
// new
assert.ok(appSrc.includes('const opens = openSlots(st.draft.rosters[userTeam])') && appSrc.includes('openNow.set(opens)'), '…');
```
**Check:** `npm run battery:node` → `ℹ tests 37 · ℹ pass 37 · ℹ fail 0`. Do not weaken a law to reach the count.

#### 1.3 Wave B battery: parse fix, then the six real laws (hy4 N5)
1. `batteries/waveB.node.battery.mjs:57`: `for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {` → `for (const field of ['ovr', 'wins', 'priority', 'gone']) {`. Or rename to `.ts` and run with `--experimental-strip-types`; the one-token removal is lower risk. Add `for f in batteries/*.mjs; do node --check "$f" || exit 1; done` to packaging.
2. **W1a:** do not hand-edit `seam-card.json.sealCount`; run `node scripts/gen-seam-card.mjs` after the manifest is final (it reads CHECKSUMS line count), then reseal.
3. **W1b:** add a `seamCard` claim kind and a `seam-card-agrees` row so the gate reads the same generated card the dev chip reads:
```js
case 'seamCard': {
  const card = JSON.parse(read('seam-card.json'));
  const snap = read('SNAPSHOT.md');
  const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1];
  return card.pin === pin && card.sealCount === read('CHECKSUMS.txt').split('\n').filter((l) => l.trim()).length
    ? null
    : 'seam-card pin/count disagrees with SNAPSHOT/seal';
}
```
```json
{ "id": "seam-card-agrees", "desc": "the dev chip and the claims gate read the same generated provenance file", "file": "seam-card.json", "kind": "seamCard", "phases": ["packaging", "full"] }
```
4. **W3:** make the hook registry single-source. In `batteries/board.battery.mjs`, import `{ HOOKS } from '../src/lib/port/domHooks.ts'` and replace inlined core selectors with `HOOKS.boardRow`, `HOOKS.draftBtn`, `HOOKS.topBadge`. Add `heatStrip`, `seamChip`, `stateOrigin`, `statusChip` to `SCENES.board` in `domHooks.ts`. No core selector literal may remain in a driver.
5. **W4:** the 16 "remote refs" are Svelte error-code strings and the W3C XHTML namespace, never fetched. In the static law, filter them before asserting:
```js
.filter((u) => !u.startsWith('http://www.w3.org/') && !u.startsWith('https://svelte.dev/e/'))
```
Keep the network-blocked `battery:offline` tent as the authority; do not weaken it.
6. **W6:** run `node scripts/gen-contract-golden.mjs`; do not hand-edit the golden.
7. **W8:** real contrast regression on Arizona Cardinals in `src/lib/port/takeover.ts`: `tintOf()` mixes 12% of the primary unconditionally. Clamp so the mix never moves the surface toward the text: start at 0.12 and halve the ratio while `contrastOf(mix, GOLD_OF[mode]) < contrastOf(panel, GOLD_OF[mode])`; fall back to the panel below ~0.01. This is an Owner-colour-table law. Check all 32 teams × 2 modes, then re-run freshness/status/manifest because dist hashes change.
8. **N7 / statusVM advisory:** in `src/lib/port/statusVM.ts`, move the `restoredFrom` branch above `picks === 0`, or add a `restored-empty` phase; today a restored empty draft says "Restored (autosave)" with `phase:'fresh'`.

**Check:** `npm run battery:waveb` prints `# WAVE B · 12 pass · 0 fail`. If a law cannot be made green without weakening it, stop and report the exact law and evidence.

#### 1.4 Generated surfaces and regeneration order (hy4 N2/N3 / my D2)
The close-out chain was not run after Wave B landed, so green Wave A prose still asserts `seal-count OK`, `freshness-map OK`, `status-freshness-agrees OK` where the live gate is RED. Fix N1 first, then run in this exact order and commit all outputs together:
```
node scripts/gen-seam-card.mjs
node scripts/gen-contract-golden.mjs
node scripts/gen-freshness.mjs
node tools/shell-status.mjs
node scripts/gen-state-block.mjs
node scripts/gen-claims-index.mjs
node scripts/gen-cutover-proof.mjs
node scripts/regen-manifest.mjs
node scripts/gate-manifest.mjs
node scripts/gate-numerals.mjs
node tools/verify-package.mjs .
node scripts/check-claims.mjs
```
Because `seal-count` feeds the state blocks and the blocks are sealed, do a convergence loop: repeat state-block generation + `regen-manifest` until the count is stable twice and `verify-package` is clean. Replace the wall-clock epoch in `gen-state-block.mjs` with `receipt-attestation.json.log_sha256` (or another content hash) so `state-blocks-fresh` can reach a fixed point. Rebuild `dist/` at final bytes first if source changed; `SHELL-STATUS.md` must list exactly the four `find dist -type f` files. **Check:** `status-freshness-agrees`, `freshness-map`, `state-blocks-fresh`, `dist-in-seal-and-status` all OK; no GENERATED block is hand-edited.

#### 1.5 Offline tent and checker honesty (my D5)
`batteries/offline.battery.mjs` exists and `package.json:20` wires `battery:offline`, but `deliveries/receipts/offline-tent.json` is absent; the checker throws ENOENT instead of returning RED. In `scripts/check-claims.mjs`, `case 'offlineTent'`, before `JSON.parse`:
```js
const p = c.file || 'deliveries/receipts/offline-tent.json';
if (!fs.existsSync(p)) return `missing receipt: ${p} (run ${c.cmd || 'npm run battery:offline'})`;
const j = JSON.parse(read(p));
```
Apply the same "return a named RED, never throw" contract to every claim kind. Also fix porca's path bug: derive ROOT with `fileURLToPath(new URL('..', import.meta.url))`, not `new URL('..', import.meta.url).pathname`, so the gate runs from a Desktop path containing `%20`. Then run `npm run battery:offline` at final bytes and write a receipt with zero external requests, `booted`, `drafted`, `restored`, `distHash`. **Check:** deleting the receipt in a throwaway copy yields a named RED with the path, no `checker threw`.

#### 1.6 Identity, delivery and cutover proof (my D6–D8)
- `README-S17-PACKAGE-NOTE.md` still certifies the previous folder/mirror/374-entry seal. Add a new top block for `zai-s17-continuation-2026-11-25`, 840 files, mirror `8ccf53783`, final seal count from `manifest-facts.json`, `sha256(SHA256SUMS-2026-11-25.txt)=9fb6fcbc…`; keep the old block verbatim as history.
- `ZAI.md:4` still says `council/zai` was pushed at every step. Either push `council/zai` and cite the hash, or say the delivery is the cited public mirror + checksum digest. Add a machine-checked `pushedHead` claim that compares prose to `git ls-remote` (or records `UNKNOWN — transport fallback` when credentials are absent).
- `deliveries/CUTOVER-PROOF.md` is GENERATED but prints UNKNOWN verdicts while the gate has real REDs. Regenerate from actual results; UNKNOWN must mean "no receipt exists". Add a generated `cutover-manifest.txt` listing exactly what travels; keep raw CSVs and pool packs out by default.

**Wave 1 gate:** all commands in §5 must pass at the final sealed bytes before Wave 2 begins.

### 2. Wave 2 — make honesty surfaces byte-latched (porca B1/B2/B5, hy4 W1b)
The Seam Card is the most important shell defect: it prints pin `408410477` and `stampCanary: match` (healthy) while seal/claims/distHash are stale, so it launders stale data through a trusted surface. Add a generated `treeSha` over the same content/dist walk the gate uses; the dev chip compares it to the running build's embedded hash. Equal → show the card; unequal or missing → render `UNKNOWN · generated before the last edit` with **no numeric fields at all**. No default-green fallback, no hand-typed numbers, one `$derived` over generated JSON, no `document` in `src/lib` (P-368 seam neutrality). The `seam-card-agrees` claim from §1.3 is the gate law.

Promote the shell's number states to one reusable chip state machine: `MEASURED` shows the number and its source; `INTERIM` shows no numeric delta and one sentence saying what is missing; `UNKNOWN` shows neither. Use it on pick confidence, wins estimates, gone% and heat-strip confidence. State comes from VM metadata, never inferred by a component. On `file://`, show `Offline · no network used` only when the tent receipt's `distHash` equals the shipped dist hash and `externalRequests` is empty; otherwise `Offline · unverified`. **Do not advertise offline until the tent receipt exists.**

### 3. Wave 3 — finish the cutover shell Claude is waiting for
Claude's `NOW.md` says the deploy waits on your "slices 3-5 done" with receipts; work order v8 still states the outcomes. Restate them as current acceptance, not as new ideas:
1. **One-click draft survives on top-3 rows.** Keep `cp-quick` or rewire `.cp-main`, but the top three must draft in one click; wire both `onpick` and `onpickDirect={quickDraft}`; W14 leg A autosave (`savedSeed` / `savedPicks`) must still fire both directions. Re-point every locator if renamed; do not weaken a law.
2. **Glow follows w89.** Every Draft button pulses with a reduced-motion guard; top-three buttons opt out and get the sheen sweep in the drafting team's gradient plus a separate `.cp-top` badge. Ordinary rows must not have `animation:none`.
3. **Why copy stays** on top 3 only; `.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` ("Fills …") and `.cp-gonehow` stay; stale "gold ring" comments are updated.
4. **Panels toward w89:** assert `--glass`, `--glassbd`, `--shadow`, 22 px radii, `.panel`, contrast 2/0, no horizontal scroll at 390 px, DESC-1 green.
5. **dispatchAsync:** START/PICK/UNDO/LOAD together, `busy` flag, no sync/async mixing, law L-ERR; every `__cp.store.dispatch` in batteries becomes `await __cp.store.dispatchAsync`; `window.__cp` keeps its six keys.
6. **rawSort/top-three ordering:** must match the pinned engine's ordering with zero `colors/src` bytes changed. If impossible without engine edits, stop and report — do not change engine bytes.
7. **Retired-law list:** every retired law by name and reason; a smaller count with all survivors named passes, a higher count with a missing law fails.
8. **Hand-over:** commit hash and path, `git diff --name-only 408410477 <tip> -- colors/src` empty, named-law battery results, built `dist/` + sha256, zip sha256, one product entry in the build, side-by-side against live w89 per `claude/visual-acceptance-spec-2026-11-21.md`, and directory + command + result for every claim. "Directionally similar" fails.

### 4. Wave 4 — boot loader and sync wiring, only after Claude's side is final
Use Claude's boot loader exactly: `createBootDatasetLoader` + `userDataset` from `colors/src/boot/dataset-asset.ts`, `DATASET_USER_KEY`, `thawPool`. The site asset is **`/dataset/nfl.json`** (the built tool writes that; the older `/dataset/madden27.csv` line in the task list is superseded by Claude's own receipt). No `?raw` CSV import, no data file in git, no player names in built `dist/assets`, no invented ratings. Empty state at 390 px and desktop, user-CSV upload with validation, bad-CSV message, full-storage fallback. `dataVersion` stamps saves. Do not create or commit the dataset.

After Claude's T3 is merged, the client sync surface has grown: `notifyDeleted`, `heldSlots`, `serverHistory`, `restoreFromServer`, `stats`, `shareSave`, `shareRun`, `revokeShare`, and jittered backoff. Wire the chip (`idle`, `syncing`, `failed+retriable`, `paused`, `needs-account-choice`, `newer-schema`) and `onPulled`/`onRemoved` re-hydration. "Keep separate" means the second account stays local with an empty remote slate; it does **not** create per-account engine namespaces. Do not add `deviceId` to the envelope yet (post-merge re-pin). No real Cloudflare/GitHub test is claimed; label U.

### 5. The one gate — every line must be a receipt before delivery
```
node tools/verify-package.mjs .                               # exit 0, 0 EXTRA
node scripts/gate-manifest.mjs                                # PASS
node scripts/gate-numerals.mjs                                # CLEAN ×2
node scripts/check-claims.mjs --phase packaging               # 0 RED, exit 0
node scripts/check-claims.mjs                                 # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts    # 430 pass / 0 fail
npm run battery:node                                          # 37 pass / 0 fail on pinned Node
npm run battery:waveb                                         # WAVE B · 12 pass · 0 fail
npm run battery:offline                                       # zero external requests; JSON receipt with distHash
npm run battery:board && npm run battery:slot && npm run battery:visual && npm run battery:shell   # named-law floors, 0 fail
node --check on every batteries/*.mjs                         # exit 0
git archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
shasum -a 256 dist/single.html dist/index.html dist/assets/*  # equal to SHELL-STATUS and freshness.json
390 px: no horizontal scroll; console: 0 errors; 90+ shimmer and 85+ bubbles keep their rules
```
If a browser leg cannot run in the sandbox, write `UNKNOWN — not run here` with the missing tool named. Do not convert a skipped leg into a PASS. A gate PASS is not product acceptance; the Owner decides cutover.

**Verifier:** after the gate, push the final commit and request a **fresh independent Verifier** — a seat that authored none of this round. hy4, porca, ernie and pickle are pre-reviewers and cannot discharge it; neither can you. The Verifier re-runs §5 at the final sealed bytes and reports PASS/FAIL per line. No new green prose may be written before that run.

### 6. Delivery and cadence
At the end of every sitting: commit with exact paths, push once with 60 s stall flags, verify `git ls-remote`, post one `bulletin/<UTC>-<seat>.md` entry with `FACT:` and `PRIORITY+:` lines, rewrite your lane file, and state `NEXT:` with the exact command. Delivery is a pushed commit hash or a download link plus its sha256; say which. Keep the acceptance composite honest: if it stops mid-run, write `PARTIAL` with the last completed step, never a false COMPLETE. Keep all historical filings; when newer evidence supersedes yours, add a correction line instead of deleting the old one.

### 7. Human questions with defaults (work continues on everything else meanwhile)
1. Relay this prompt now or wait for a seat Verifier first? Recommended: relay now; the Verifier comes after the gate.
2. Keep `SHA256SUMS-*.txt` as metadata skipped by all three tools, or move it outside the folder? Recommended: skip it as metadata; it describes the zip, it is not product content.
3. Confirm the boot asset is `/dataset/nfl.json` per Claude's built `release-assemble.mjs`? Recommended: yes; the older task-list CSV path is superseded.
4. Cutover name exposure: accept names in historical notes, or trim the seven non-queue files and have MUSE reword `QUEUE.md`? Recommended: trim + reword; keep `data/nfl/README.md` trimmed, not removed.
5. Should the generated manifest/provenance/offline surfaces be dev-only or player-facing at cutover? Recommended: dev-only until the Owner rules.

### 8. Anti-goals
No second manifest, no hand-edited GENERATED block, no law weakened to make a gate green, no engine/pin/protected-constant edit, no Vite bump, no invented player/rating/team data, no fake COMPLETE, no named assignment, no player-facing provenance without Owner ruling, no sharing seed/private id, no overtime event outside the overtime block, no "expected scoring" phrasing, no "sudden death". Every turnover is named; recaps are chronological; the user's team is blue (`.ub`).

# ==================== END COPY-PASTE PROMPT ====================

## Pickle's note
This is a draft prompt assembled from pushed bytes and named receipts, not a build, not an assignment and not a verification certificate. Where hy4 supplied a throwaway-copy proof that updates my earlier UNKNOWN, the prompt adopts hy4's evidence and still asks for a fresh run at final bytes. No engine, product, pin, governance, queue or council-tool file was touched.
"})
