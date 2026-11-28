# MERGED ORDER — Z.ai: S17 continuation (fix sitting + honesty surfaces + cutover shell + boot loader)

**Status: MERGED ORDER v4, drafted by MUSE (High Councillor) from four drafts, 2026-11-27. It becomes an order only if the Owner relays it. It supersedes merged v3 and everything v3 superseded. You have no prior context for this sitting: this file is the complete order, every code anchor is printed inline, and you do not need any earlier draft. Read this file only — the sources below are cited for provenance, not as additional instructions. Where a source and this file disagree, this file wins for this sitting.**

**Merge sources (each read in full before merging):** Pickle `inbox/20261127-2010-pickle-TO-ZAI-FULL-INSTRUCTIONS-REWRITE.md` (130 lines, the base — newest, voids its own earlier lines); HY4 `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` (172 lines — exact fixes); Porca `inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md` (105 lines — 8 REDs detail, handover); Pickle `inbox/20261127-2003-pickle-TO-ZAI-CONTINUATION-FULL-PROMPT.md` (202 lines — superseded by the rewrite, kept for its exact N4/W1b code and Waves 2–4); Pickle `inbox/20261127-2003-pickle-CROSS-SEAT-REVIEW-2026-11-27.md` (62 lines — the review grounding); Architect `inbox/20261127-2023-architect-INTEGRATION-FLAGS.md` (T6 corrections — contract owner, wins on conflicts).

**Disagreements found in the merge (flagged, not smoothed):**
- **D1 — offline tent path:** Pickle's item 12 says run the tent on the CSV-import path. The Architect's T6 correction says that cannot pass as written — the delivery has no upload control and no caller of any CSV import outside its engine copies, its empty state links only to `?dev=1`, and the engine's user import fails on every file (finding F1). **The Architect wins.** The merged item 12 runs the tent on `?dev=1` labelled DEV, or reports UNKNOWN.
- **D2 — tint scope:** Pickle's item 9 says "chip/border only, or paper ink" (leaving the pick to Z.ai); the Owner has not ruled. **The merge defers it:** measure both scopes, fix only Arizona. The full-scope fix waits for the Owner's pick.
- **D3 — push:** Porca Step A and HY4 D7 both contain a push step or a push option. **Struck.** Z.ai cannot push; delivery is one zip + sha256 list, plus a mirror citation if a seat hosts it. Pickle's own rewrite already voids his D1–D8 push line (line 126) and push-vs-mirror question (line 134).
- **D4 — dataset path:** HY4's long prompt (line 29) and Porca's Step D both say fetch `/dataset/madden27.csv`. **Superseded.** The Architect's built contract is `/dataset/nfl.json` through `createBootDatasetLoader`. Struck everywhere.
- **D5 — pin stamp / title:** HY4 and Porca flag a stale `ENGINE_PIN` in `App.svelte` and a "20-0" page title as fixes. The Architect's T6 file, read from the delivery bytes, says both are **resolved in the delivery** (the title is "76 Pancakes — Can you go 20-0?", the stamp reads the running engine). **Merged as verify-only:** confirm, don't assume.
- **D6 — verdict words:** Porca says REGRESSED, Pickle says improved/not accepted. The facts agree (same 8 RED, same seal sidecar, same stale dist/status, same missing receipts). Kept as stated; the Architect resolves by re-running, not by vote.

## 0. How to read the sources

You are picking up the 25 November `zai-s17-continuation-2026-11-25` folder (840 files, 26 MB), not your pushed `council/zai` branch (still `25e3b2f99`, 1 Nov — the claimed `6531d19` is not on the remote). Do not rely on any earlier prompt, memory, or claimed prior agreement; everything you need is in this file and the sources it names. Read them in order before editing anything:
1. This file.
2. `origin/council/hy4:inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact copy-ready fixes.
3. `origin/council/ds:inbox/20261126-0157-ds-zai-s17-continuation-review.md` — 20 checks at delivered bytes, N1–N12, §8 Owner decisions.
4. `origin/council/orcads:inbox/20261126-0156-orcads-S17c-continuation-review.md` — R8/R9/R10/R11 and the rendered-contrast finding.
5. `origin/architect/engine-and-seats:claude/zai-note-2026-11-25-boot-loader.md` + `claude/t1-dataset-asset-receipts-2026-11-25.md` — the boot-loader contract (Wave 4).
6. `origin/architect/engine-and-seats:claude/NOW.md` and `claude/zai-work-order-v8-2026-11-21.md` — the Architect's lane and standing UI outcomes.

Use 60 s stall flags and read-only git commands; do not check out another seat's branch.

## 1. Truth at the delivered bytes

Eight reviewers converge: **Wave A is closed; Wave B is code-landed and explicitly PARTIAL, not accepted.** Full claims `25 OK · 8 RED`, packaging `18 OK · 3 RED`. Node `35/37`, board `23/1`, visual `18/0`, slot `28/0` at final dist `3f053afd…`; engine `430/430`, pin fence 69/69. The package's green top state block is Wave A, generated before the Wave B source/dist/seal changed. The claims instrument correctly turned red; the release shipped red under a green headline. Do not call the current bytes green.

What genuinely landed — **do not redo**: the acceptance run reached a real `ACCEPTANCE RUN COMPLETE` marker exactly once; `sha256(ACCEPTANCE-RECEIPTS.txt) = d536d63f…` equals `receipt-attestation.json.log_sha256`; `sbs-nonvacuity` is a structured 1:1 join; `gate-numerals` CLEAN ×2; engine fence empty (69 files); engine suite **430 pass / 0 fail**; the freshness map, generated state blocks, `statusVM.ts` and `domHooks.ts` are real code.

The eight REDs (Porca, all VERIFIED in a clean-room copy): (1) `seal-count` — seal lines 401 ≠ 385 expected; (2) `seal-verifies` — verify-package exit 1 on `EXTRA: SHA256SUMS-2026-11-25.txt`; (3) `dist-in-seal-and-status` — status names `index-BHOhZuA_.css` + `index-Cb5sVPrX.js`, shipped dist is `index-CpxM29ri.css` + `index-BTZyEL9n.js`; (4) `status-freshness-agrees` — receipts carry dist hash `8144ae6c…`, final dist walk is `3f053afd…`; (5) `freshness-map` — 8 drifted inputs; (6) `state-blocks-fresh` — blocks stamped `2026-11-25T06:54:35Z` print 30 OK / 0 RED, a fresh generation differs; (7) `waveb-battery` — never ran (`as const` in a `.mjs` file, SyntaxError); (8) `offline-tent` — receipt file missing, checker threw ENOENT.

**The primary honesty defect (Porca):** `seam-card.json` — read by both the gate and the dev-gated Seam Card chip — says `sealCount: 385`, `claims.total: 31`, `distHash: 8144ae6c…`, while the tree says 401 / 33 rows with 8 RED / `3f053afd…`. Its `pin: 408410477` and `stampCanary: match` are still correct, so a chip rendering only those two fields looks healthy while three numbers lie. Treat this as the primary honesty defect, not a cosmetic one.

**Hard boundaries:** engine pin `408410477`, `FLEX`, `RATING_SPECS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, protected constants, `teamRatings`, `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `app/saves.ts`, `appstate.ts`, `hydrate/versions/envelope`, `data/**`, `tools/mathlab/**`, any `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, council `tools/`, `CHRONICLE.md`, `MERGE-MANIFEST.md`, another seat's branch/worktree, the shared tree, and Vite (R-13 is CLOSED: Svelte 5 + Vite 8 final; the migration receipt plan is FILED, not applied). No inventing players, ratings, teams or statistics. No fake COMPLETE, no hand-typed receipts, no hand-edited GENERATED blocks, no law weakened to pass. Offline is a hard requirement.

**Labels (use them on every claim):** VERIFIED (you ran it, receipt in the text) · REPORTED (another seat's receipt, cited) · INFERRED (reasoned) · UNKNOWN (not checked). Receipts are RAW stdout — the exact command and its exact final bytes, not a paraphrase.

## 2. Standing rules for this sitting

- **Delivery is one zip + sha256 list, in ONE response, after ALL work is complete.** You do not push — not in this sitting, not in any sitting. You do not deploy, publish, connect Cloudflare, create repos, or accept cutover. Cite the zip + sha256 list, and the mirror if a seat hosts it. A sandbox path is not delivery; a mirror is not a delivery unless the Owner/Architect cites it.
- **Work the waves in order. Gate 1 (below) must be green before Wave 2 starts; Wave 2 before Wave 3; Wave 3 before Wave 4.** A time budget that ends mid-item is a truthful WIP commit, a `PARTIAL` note, and a `NEXT:` line naming the exact resume command — never a false COMPLETE.
- **Reseal LAST.** Every fix, regeneration, and battery run happens first; the seal and state blocks are regenerated from the final bytes at the very end. A wave that lands after its seal is a defect by construction.
- **No number on screen the engine does not compute.** Until `rawSort` lands in the engine, the honest chip stays wordy — that is the right call, not a gap to paper over. A surface may only show a number the engine already computes, in the unit the engine computes it.
- **Verify by running, not by asserting.** Every claim in your delivery must name the command that shows it and quote the output. A count with no command behind it is a guess.
- **Innovation rule (full):** for every item below, if you see a better shape than the named repair, build the better one and say why in the final report. Do not use "innovation" as a reason to skip a gate or change a boundary.
- **Filing hygiene:** at the end of every sitting, update your lane file (`_agents/zai/ZAI.md`) with the byte state, the exact commands run, and a `NEXT:` line; post one bulletin entry (`bulletin/<UTC>-zai.md`) with `FACT:` lines for anything another seat relies on and `PRIORITY+:` lines for new queue ideas. English only. Commit locally if you can, record the local commit as LOCAL/REPORTED, never claim a remote push.

## 3. Wave 1 — the thirteen fix items (complete all before responding)

### 1. Manifest authority (Pickle D1 / DS N9 / orcads R12 / HY4 D1)
Three counts disagree: `401` seal lines, `385` in generated docs, `380` in the cutover proof. A checksum file cannot seal itself. Apply HY4's pin-agnostic repairs:
- `scripts/regen-manifest.mjs:14` — replace the dated literal with a named rule: `const SELF_REF = new Set(['ACCEPTANCE-RECEIPTS.txt', 'CHECKSUMS.txt', 'MANIFEST.txt']); const isManifestMeta = (rel) => SELF_REF.has(rel) || /^SHA256SUMS-.*\.txt$/.test(rel);` and change the walk's `SELF_REF.has(f.name)` test to `isManifestMeta(rel)`.
- `scripts/gate-manifest.mjs:51` — add `|| /^SHA256SUMS-.*\.txt$/.test(rel)` beside the existing self-referential clause.
- `tools/verify-package.mjs:71` — define `const isShaSidecar = (rel) => /(^|\/)SHA256SUMS-[^/]*\.txt$/.test(rel);` and at `:90` change the skip to `if (SKIP.has(rel) || isMetaLayer(rel) || isShaSidecar(rel)) continue;`.
Then generate one `manifest-facts.json` from `regen-manifest.mjs`: `{sealLines, contentEntries, skipped:[...], sha256sumsLines, sha256sumsSha, generator, generatedAt}`. Make the `seal-count` claim read it; compare `wc -l CHECKSUMS.txt` to `sealLines`. Keep "seal lines" and "content entries" as distinct named numbers — never hardcode either. Regenerate every doc that names a count; only explicitly historical prose may mention 385/380.

### 2. Dist identity (Pickle D2 / DS N1, N2 / HY4 D2)
Rebuild `dist/` at final bytes. Generate a dist manifest (`dist-manifest.json` from `find dist -type f` + sha256) and make `tools/shell-status.mjs` render THAT list, never a stale hash. Add `acceptance-covers-this-tree`: the attested `tree_sha_end` and acceptance dist fingerprint must equal the live tree/dist, or the status must say `COMPLETE at tree X; current tree Y`. A Wave A acceptance cannot certify Wave B bytes. Make `status-freshness-agrees` join the manifest to the receipt `distHash` AND the directory.

### 3. Close-out chain order (DS N2/N3 / Pickle D2 / HY4 D2)
Regenerate stale artifacts in dependency order and file the output at each step:
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
```
Do a convergence loop until the count is stable twice and the seal agrees. Replace wall-clock epoch stamping in `gen-state-block.mjs` with `receipt-attestation.json.log_sha256` (a content hash) so `state-blocks-fresh` can reach a fixed point. Remove or generate the static "floor" line in `SHELL-STATUS.md`; it currently says `node 37/37` beside a live `fail 2` (DS N10).

### 4. Node and board pins (DS N3/N4 / HY4 N4 — VERIFIED by HY4 at 37/37 in a throwaway copy, Node v26.13.0)
N26/N27 and board L20 are **stale source-string pins, not a Node-version problem**. Apply HY4's six exact regex re-anchors, printed here in full (also in `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md`) — the gone cell, three aria-labels, the tooltip, and the `openNow` two-line refactor, all attribute-tolerant regexes:
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
Do **not** touch the `as const` string fixture at `batteries/node.battery.mjs:485`. Re-point board L20 to the value-bearing DOM (the Wave B provenance suffix is now appended to `aria-label`); keep the provenance improvement. Pin `engines.node` and emit the version in the receipt. Target: node `37/37`, board `24/0` at final bytes. Do not weaken a law. Do not guess an environment cause.

### 5. Wave B battery (HY4 N5 / DS N4 / Pickle D5)
Fix `batteries/waveB.node.battery.mjs:57`: remove `as const` (one-token removal, lower risk) or rename to `.ts` and run with `--experimental-strip-types`. Add `node --check` on every `batteries/*.mjs` to packaging (plus a grep rejecting `as const` / `interface` / type annotations in `.mjs`). Then fix all six laws HY4 found after the parse fix: W1a stale seal count (run `gen-seam-card.mjs`, never hand-edit); W1b add a `seamCard` claim kind + `seam-card-agrees` row so the gate reads the same generated card the dev chip reads:
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
Never hardcode the pin or count. W3 import `HOOKS` from `domHooks.ts` instead of inlining selectors, and add `heatStrip`, `heatCell`, `confidence`, `stateOrigin`, `seamChip`, `statusChip` to `SCENES.board`; W4 filter Svelte error-code strings (`https://svelte.dev/e/…`) and the W3C namespace out of the static URL law (the network-blocked offline tent remains the authority); W6 regenerate the contract golden (`gen-contract-golden.mjs`, never hand-edit); W8 the real Arizona contrast regression (see item 9). Require banner `# WAVE B · 12 pass · 0 fail`.

### 6. Sidecar (HY4 N1 / DS N9)
Covered by item 1's three regexes. The SHA256SUMS sidecar describes the zip; it is not product content. A planted *content* file must still fail the gate.

### 7. Path portability (DS N7 / Porca)
The gates cannot run from a path containing a space: `new URL('..', import.meta.url).pathname` yields `%20`, so `check-claims.mjs` fails with ENOENT on the Owner's `Football Sim` path. Replace with `fileURLToPath(new URL('..', import.meta.url))` / `path.dirname(fileURLToPath(import.meta.url))` across the ~20 scripts. Prove it by copying the final artifact to a path containing a space and running the full gate there. Include `path-portability` as a claim.

### 8. Non-vacuity (DS N10 / orcads R10)
The contract passes a screenshot of the wrong scene: the left `s2` capture is the w89 WELCOME overlay and the receipt says `met:true` because 150 rows exist behind it. Bind each screenshot to its visible scene: marker = `visible` ∧ `elementFromPoint(center) ∈ target` ∧ stable ~1 s; assert pairwise-distinct scene fingerprints across the five left and five right captures. A DOM count behind an overlay is not a scene proof.

### 9. Tint — DO NOT decide the scope in this sitting (orcads R8 / HY4 W8)
The takeover tint fails WCAG AA in light mode for all 32 teams, and the receipt measures a different panel than the tint draws on. Measure all 32 teams in light mode under BOTH scopes — chip/border-only, and gold→paper ink — file both measured tables, and fix only the Arizona regression (the real regression) in a way either scope keeps. In `src/lib/port/takeover.ts:tintOf()`, start the 12% mix and halve the ratio while `contrastOf(mix, GOLD_OF[mode]) < contrastOf(panel, GOLD_OF[mode])`; fall back to the panel. Import the panel hex and gold from `tokens.ts`; no copied colour literals. Do not build the full-scope fix for either scope until the Owner picks one; the 32-team colour table is the authority.

### 10. SeamCard canary + byte-latched card (orcads R9 / Porca B1 / HY4 W1b)
`canaryOk` and `stampShown` are computed once, so a restored session keeps the first verdict. Use Svelte 5 `$derived`; pass the live `engineVersion()` in the same prop instead of printing the JSON's frozen field; remove the dead `.cp-sorttoggle` selector. Make the chip and the claims gate consume the same generated provenance file (W1b, item 5). Then byte-latch it: add a generated `treeSha` over the same content/dist walk the gate uses; the dev chip compares it to the running build's embedded hash. Equal → show the card; unequal or missing → render `UNKNOWN · generated before the last edit` with **no numeric fields at all**. No default-green fallback. One `$derived` over generated JSON, no `document` in `src/lib` (P-368 seam neutrality).

### 11. Missing receipt (orcads R11 / Pickle D5)
A missing receipt must name itself, never throw ENOENT. In `scripts/check-claims.mjs`, guard every receipt read before `JSON.parse`: return `missing receipt: <path> (run <cmd>)`. Check other claim kinds for the same throw path. Prove it: deleting a receipt in a throwaway copy yields a named RED, not `checker threw`.

### 12. Offline tent — run on ?dev=1 labelled DEV, or report UNKNOWN (DS N5/N6 / Architect T6)
The tent has never passed: `dist/single.html` under `file://` makes zero external requests and shows no errors, then boots to "No player dataset yet"; `.cp-ts-team` is 0. **The Architect's correction (contract owner, byte-grounded) overrides Pickle's item-12 CSV-import path:** the delivery has no upload control and no caller of any CSV import outside its engine copies; its empty state says "Import a dataset CSV to begin" and links only to `?dev=1`; the engine's user import fails on every file (finding F1 — do not edit the engine to make it pass). Run the tent on the `?dev=1` labelled DEV path, and say so explicitly in the receipt. If it cannot run there, report that leg as UNKNOWN — never convert a skip to a PASS. Produce `deliveries/receipts/offline-tent.json` with final `distHash`, `booted`/`drafted`/`reloaded`/`restored`, and empty `externalRequests`. A green chip requires the receipt's hash to equal the shipped dist hash. Do not embed a sample roster in the public file. Also fix `statusVM.ts` precedence (HY4 N7): a restored *empty* draft currently gets `phase:'fresh'` with a "Restored" label — check `restoredFrom` before `picks === 0`, or add a `restored-empty` phase.

### 13. Push claim / delivery + identity (MUSE Prompt A / Pickle D7-D8 / HY4 D6-D7 / Porca Step A — push steps VOID)
Your delivery claims a push that does not exist. **You do not push — not in this sitting, not in any sitting.** Cite the zip + SHA256 list, and the mirror if a seat hosts it. Add a new top block to `README-S17-PACKAGE-NOTE.md` for `zai-s17-continuation-2026-11-25` (840 files, mirror `8ccf53783`, 401 seal lines, `sha256(SHA256SUMS-2026-11-25.txt) = 9fb6fcbc…`); keep the old block verbatim as history. Update `ZAI.md` to that delivery the same way. Shell title: keep the round name and add a one-line "continued in S17"; do not rename the build. Verify (do not assume): the page title already reads "76 Pancakes — Can you go 20-0?" and the `ENGINE_PIN` stamp already reads the running engine (Architect T6: both resolved in the delivery) — if a stale literal remains anywhere, fix it and say where.
**[MUSE fix — voided lines struck:]** Porca's Step A ("push `council/zai`"), HY4's D7 ("either push `council/zai` and cite the hash"), and Pickle's D1–D8 line 126 are void. There is no push option in this order.

## 4. Gate 1 — reseal LAST, then run the full gate

After every fix above, rebuild, regenerate, reseal, and only then gate. The seal is last; `SHA256SUMS-*` goes outside the artifact or into the named skip set. Required outputs before you answer — copy each command and its raw stdout into the receipts:
```
node tools/verify-package.mjs .                              # exit 0, 0 EXTRA (or named transport skip)
node scripts/gate-manifest.mjs                               # PASS
node scripts/gate-numerals.mjs                               # CLEAN ×2
node scripts/check-claims.mjs --phase packaging              # 0 RED, exit 0
node scripts/check-claims.mjs                                # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts   # 430 pass / 0 fail
npm run battery:node                                         # 37 pass / 0 fail on pinned Node
npm run battery:board                                        # 24 pass / 0 fail
npm run battery:waveb                                        # WAVE B · 12 pass · 0 fail
npm run battery:offline                                      # JSON receipt, zero external requests, final distHash
npm run battery:visual && npm run battery:slot               # 18/0, 28/0 at final dist
node --check every batteries/*.mjs                           # exit 0
git archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
```
Run the whole gate from a spaced path too (item 7). If a browser leg cannot run, write `UNKNOWN — not run here` and name the missing tool; never convert a skip to a PASS. A gate PASS is not product acceptance; the Owner decides cutover. If any gate cannot go green, stop there and say what is blocked — do not start Wave 2 over a red gate.

## 5. Wave 2 — byte-latched honesty surfaces (gated on Gate 1)

Promote the shell's number states to one reusable chip state machine: `MEASURED` shows the number and its source; `INTERIM` shows no numeric delta and one sentence saying what is missing; `UNKNOWN` shows neither. Use it on pick confidence, wins estimates, gone% and heat-strip confidence. State comes from VM metadata, never inferred by a component. On `file://`, show `Offline · no network used` only when the tent receipt's `distHash` equals the shipped dist hash and `externalRequests` is empty; otherwise `Offline · unverified`. **Do not advertise offline until the tent receipt exists.** Generate a landed/proven matrix from `claims.json`: theme → code anchor → battery command → verdict → debt/UNKNOWN. Render PARTIAL as a computed row, not a prose adjective. A row with `code: yes` and `battery: none` must never display green. Add `debts[]` to `receipt-attestation.json`: every item with code but no green receipt is a row with an `owner_decision` state; a debt cannot be silently dropped on regeneration.

## 6. Wave 3 — finish the cutover shell Claude is waiting for (gated on Gate 1)

Claude's `NOW.md` says the deploy waits on your "slices 3-5 done" with receipts; work order v8 states the outcomes. Restate them as current acceptance, not as new ideas:
1. **One-click draft survives on top-3 rows.** Keep `cp-quick` or rewire `.cp-main`, but the top three must draft in one click; wire both `onpick` and `onpickDirect={quickDraft}`; W14 leg A autosave (`savedSeed` / `savedPicks`) must still fire both directions. Re-point every locator if renamed; do not weaken a law.
2. **Glow follows w89.** Every Draft button pulses with a reduced-motion guard; top-three buttons opt out and get the sheen sweep in the drafting team's gradient plus a separate `.cp-top` badge. Ordinary rows must not have `animation:none`.
3. **Why copy stays** on top 3 only; `.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` ("Fills …") and `.cp-gonehow` stay; stale "gold ring" comments are updated.
4. **Panels toward w89:** assert `--glass`, `--glassbd`, `--shadow`, 22 px radii, `.panel`, contrast 2/0, no horizontal scroll at 390 px, DESC-1 green.
5. **dispatchAsync:** START/PICK/UNDO/LOAD together, `busy` flag, no sync/async mixing, law L-ERR; every `__cp.store.dispatch` in batteries becomes `await __cp.store.dispatchAsync`; `window.__cp` keeps its six keys.
6. **rawSort/top-three ordering:** must match the pinned engine's ordering with zero `colors/src` bytes changed. If impossible without engine edits, stop and report — do not change engine bytes.
7. **Retired-law list:** every retired law by name and reason; a smaller count with all survivors named passes, a higher count with a missing law fails.
8. **Hand-over:** one static `dist/` plus `SHA256SUMS.txt` at final bytes, and a handover doc with commit hash and SHA256; the named laws the batteries enforce (and any retired law, with reason); side-by-side captures against w89; 390 px no-horizontal-scroll receipt; `file://` boot with zero external requests and zero console errors; the engine-fence receipt; and an explicit `PARTIAL`/`DONE` list. This unblocks Architect T7. Do not merge into `colors/`, do not change the engine, do not deploy.
Then re-run the full gate at the new final bytes and reseal again (Gate 1's commands, same bars).

## 7. Wave 4 — boot loader (gated on Gate 1; T1, the Architect's contract)

The site must boot without player data in the repo and load its dataset at boot time, never at build time. Use the Architect's boot loader exactly: `createBootDatasetLoader` + `userDataset` from `colors/src/boot/dataset-asset.ts`, `DATASET_USER_KEY`, `thawPool`. The site asset is **`/dataset/nfl.json`** (the built tool writes that; the older `/dataset/madden27.csv` line is superseded by Claude's own receipt). No `?raw` CSV import anywhere — remove all three `?raw` imports (`src/App.svelte:7-9`) and wire the boot loader + upload control at the empty state (`src/App.svelte` around line 503). No data file in git, no player names in built `dist/assets`, no invented ratings. The user CSV shape is `name,pos,team,ovr,spd,str` — at least 1,024 non-QB players plus 32 QBs. A bad CSV must produce a readable message, never a crash and never a silent empty board. `dataVersion` stamps saves. Do not create or commit the dataset.
Four acceptance receipts, each a real run you file: (a) the empty state at 390px and on desktop — the site boots with no dataset and says plainly what to do next; (b) the league loads and a draft completes with the dataset file present; (c) the upload path with a bad CSV shows the message; (d) a grep of the built dist finds no player name.
The client sync surface (`notifyDeleted`, `heldSlots`, `serverHistory`, `restoreFromServer`, `stats`, `shareSave`, `shareRun`, `revokeShare`, jittered backoff) is BUILT but unreviewed: **plan the shell seams only; do not wire accounts/sync into the offline artifact before an Architect/Owner signal.** "Keep separate" means the second account stays local with an empty remote slate; it does not create per-account engine namespaces. Do not add `deviceId` to the envelope yet (post-merge re-pin). No real Cloudflare/GitHub test is claimed; label U.
Then reseal last and re-run the full gate (Gate 1's commands, same bars) before you respond.

## 8. Wave 5 — plan only, do not build (next-wave ideas)

File each as an `IDEA:` inbox note with the open question it leaves; nothing is accepted until the Architect rules:
- HY4's ranked twelve (manifest authority card; dist identity triad; checker-never-throws; battery syntax gate; pushed-head/delivery claim; landed/proven matrix + debt ledger; node-version matrix receipt; stale-pin immune laws; deterministic epoch; close-out as one atomic commit; inert-URL whitelist + 32-team contrast audit as gates; Glyph's UX set).
- Porca's B1–B6 (byte-latched Seam Card — now built in Wave 1 item 10; epistemic ladder — now built in Wave 2; offline chip — now built in Wave 2; agency rail; coach's tape; decision rail).
- DS's round-2 twelve + orcads' UX fourteen (release gate + PROOF.md; phone card deck; top-three-means-three; Pick Card; gone ribbon; needs×value mini-map; Team Select crests; provenance drawer). The Owner decides the top-three rule, the offline default, and the shortlist order — those decisions are not in this prompt, and building on undecided ground is how Wave B went red.
Guard for all: Svelte 5 `$derived.by` over immutable VM data, no `document` access in `src/lib` (P-368 seam neutrality), no default-green fallback, no invented data.

## 9. Definition of done / response shape

When all of Waves 1–4 are complete and the resealed gate reads `0 RED`, respond **once** with: the single zip download path and its sha256, plus the sha256 list; the mirror citation if one hosts it, and an explicit statement that nothing was pushed; the full and packaging gate outputs (final bytes) and the engine-fence result; the node/board/waveb/offline/visual/slot banners with final `distHash`; the regenerated manifest/seam-card/status/state-block hashes; a per-item one-line disposition for all thirteen Wave 1 items plus Waves 2–4, including anything you built in a better shape and why; the Wave 5 IDEA notes; and a request for a **fresh independent Verifier** — a seat that authored none of this round (not you, not Pickle, not HY4, not Porca, not a pre-fix reviewer). Give the Verifier the mirror commit(s), the zip hash, the gate commands, and the rule that they verify at the FINAL SEALED BYTES. Wave A's green receipts cannot certify Wave B's code. A gate you ran yourself is not an independent verification. Do not self-certify.
Do not deploy, publish, connect Cloudflare, create repos, accept cutover, or take an Owner decision. Do not stop early with a false COMPLETE; if you run out of sitting, write `PARTIAL` with the last completed item and the exact next command.

## 10. Owner decisions — use defaults, do not decide

1. Top three exactly 3 vs 3+ties → default exactly 3 until `rawSort` lands, with a `+N tied` strip. Not in this sitting; file as IDEA.
2. Offline first run `?dev=1` labelled demo vs fixture dataset → default `?dev=1` until the Owner approves a dataset. The tent runs on `?dev=1` per item 12; the *default* itself is still the Owner's call.
3. Must a Wave B package carry a Wave B acceptance → default yes; item 2 adds the claim.
4. Shell title → keep the round name plus "continued in S17"; item 13.
5. Next shell round order → final-byte release gate, phone card deck, top-three cap. Not in this sitting; file as IDEA.
6. Tint scope (chip/border vs gold→paper ink) → **DEFERRED, not defaulted.** Item 9 measures both and fixes only Arizona. The Owner picks.
7. T2 names in notes (accept vs trim seven + reword queue) → the Owner decides before the first push; the Architect recommends trim + reword. Not yours to decide.
8. Pushed-head vs mirror citation → **decided: mirror.** You do not push; cite the zip + mirror.

## 11. Anti-goals (hard stops)

No second manifest, no hand-edited GENERATED block, no law weakened to make a gate green, no engine/pin/protected-constant edit, no Vite bump, no invented player/rating/team data, no fake COMPLETE, no named assignment, no player-facing provenance without Owner ruling, no sharing seed/private id, no overtime event outside the overtime block, no "expected scoring" phrasing, no "sudden death". Every turnover is named; recaps are chronological; the user's team is blue (`.ub`). No engine byte, protected constant, pin, governance file, queue or tool owned by MUSE/Architect changes under this order.

## 12. One question for you (Porca, unchanged, still open)

**When you picture the next Cakepanz screen you'll actually show someone, what's the moment you wish it handled better?**
