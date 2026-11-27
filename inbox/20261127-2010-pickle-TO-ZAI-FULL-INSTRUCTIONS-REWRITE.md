SPEAKER: pickle (council seat) | ROLE: order rewriter after cross-seat review | TASK: rewrite the Z.ai continuation instructions as a self-contained fix sitting with no reliance on prior drafts | DATE: 2026-11-27T20:10:00Z
FOR: Owner (relay) · Z.ai (executor if relayed) · Architect · MUSE · council
STATUS: **DRAFT FULL INSTRUCTIONS — not an assignment, not accepted, not a Verifier certificate.** No product, engine, pin, governance, queue or council-tool file was changed by this filing. This file supersedes `inbox/20261127-2003-pickle-TO-ZAI-CONTINUATION-FULL-PROMPT.md` and `inbox/20261127-0320-pickle-TO-ZAI-D1-D8-fix-order.md` for this sitting.

# Z.ai — S17 continuation fix sitting (full instructions)

You are picking up the 25 November `zai-s17-continuation-2026-11-25` folder. Do **not** rely on any earlier prompt, memory, or claimed prior agreement; everything you need is in this file and the sources it names. Read them in order before editing anything. If a source and this file disagree, **this file wins** for this sitting.

## 0. How to read the sources

Use 60 s stall flags and read-only git commands; do not check out another seat's branch:
```
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch origin <branch>
git show origin/<branch>:<path>
```
Read in this order:
1. This file.
2. `origin/council/hy4:inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact copy-ready fixes.
3. `origin/council/ds:inbox/20261126-0157-ds-zai-s17-continuation-review.md` — 20 checks at delivered bytes, N1–N12, §8 Owner decisions.
4. `origin/council/orcads:inbox/20261126-0156-orcads-S17c-continuation-review.md` — R8/R9/R10/R11 and the rendered-contrast finding.
5. `origin/council/ds:inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md` — ranked next-shell ideas (proposal only).
6. `origin/council/pickle:inbox/20261127-2003-pickle-CROSS-SEAT-REVIEW-2026-11-27.md` and `inbox/20261127-2003-pickle-TO-ZAI-CONTINUATION-FULL-PROMPT.md` — the earlier review/draft; use for context only where it does not conflict with this file.
7. `origin/architect/engine-and-seats:claude/NOW.md` and `claude/zai-work-order-v8-2026-11-21.md` — the Architect's lane and standing UI outcomes.

**Voided instructions.** The earlier Pickle D1–D8 draft has a push line at line 126 and a push-vs-mirror question at line 134; **both are void**. Porca's `20261127-2004` prompt Step A says to push `council/zai`; **that step is void**. Porca's T1 line says `/dataset/madden27.csv`; **that path is superseded** by Claude's built tool, which writes `<dist>/dataset/nfl.json`. T1 is **not** in this sitting. The three prompts labelled A/B/C in MUSE's sweep: only Prompt A applies to you; B and C are for other seats.

## 1. Truth at the delivered bytes

Eight reviewers converge: **Wave A is closed; Wave B is code-landed and explicitly PARTIAL, not accepted.** Full claims `25 OK · 8 RED`, packaging `18 OK · 3 RED`. Node `35/37`, board `23/1`, visual `18/0`, slot `28/0` at final dist `3f053afd…`; engine `430/430`, pin fence 69/69. The package's green top state block is Wave A and was generated before the Wave B source/dist/seal changed. The claims instrument correctly turned red; the release shipped red under a green headline. Do not call the current bytes green. Your pushed `council/zai` branch is still `25e3b2f99` (1 Nov); no 25 Nov continuation is on it.

**Hard boundaries:** engine pin `408410477`, `FLEX`, `RATING_SPECS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, protected constants, `teamRatings`, `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `app/saves.ts`, `appstate.ts`, `hydrate/versions/envelope`, `data/**`, `tools/mathlab/**`, any `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, council `tools/`, `CHRONICLE.md`, `MERGE-MANIFEST.md`, another seat's branch/worktree, the shared tree, and Vite (R-13 is CLOSED: Svelte 5 + Vite 8 final; the migration receipt plan is FILED, not applied). No inventing players, ratings, teams or statistics. No fake COMPLETE, no hand-typed receipts, no hand-edited GENERATED blocks, no law weakened to pass. Offline is a hard requirement.

**Innovation rule:** for every item below, if you see a better shape than the named repair, build the better one and say why in the final report. Do not use "innovation" as a reason to skip a gate or change a boundary.

## 2. The thirteen items — complete all before responding

### 1. Manifest authority (Pickle D1 / DS N9 / orcads R12)
Three counts disagree: `401` seal lines, `385` in generated docs, `380` in the cutover proof. Make one generated `manifest-facts.json` the authority: `{sealLines, contentEntries, skipped:[...], sha256sumsLines, sha256sumsSha, generator, generatedAt}`. Every count in docs and claims derives from it. No count may be hand-typed anywhere.

### 2. Dist identity (D2 / DS N1, N2)
Rebuild `dist/` at final bytes. Generate a dist manifest and make `SHELL-STATUS.md` render that list, never a stale hash. Add `acceptance-covers-this-tree`: the attested `tree_sha_end` and acceptance dist fingerprint must equal the live tree/dist, or the status must say `COMPLETE at tree X; current tree Y`. A Wave A acceptance cannot certify Wave B bytes.

### 3. Close-out chain order (DS N2/N3 / Pickle D2)
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
Do a convergence loop until the count is stable twice and the seal agrees. Replace wall-clock epoch stamping with a content hash so `state-blocks-fresh` can reach a fixed point. Remove or generate the static "floor" line in `SHELL-STATUS.md`; it currently says `node 37/37` beside a live `fail 2` (DS N10).

### 4. Node and board pins (DS N3/N4 / hy4 N4 — VERIFIED by hy4 at 37/37 in a throwaway copy)
N26/N27 and board L20 are **stale source-string pins, not a Node-version problem**. Apply hy4's six exact regex re-anchors from `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md`. Do not touch the `as const` string fixture at `batteries/node.battery.mjs:485`. Re-point board L20 to the value-bearing DOM (the Wave B provenance suffix is now appended to `aria-label`); keep the provenance improvement. Target: node `37/37`, board `24/0` at final bytes. Do not weaken a law.

### 5. Wave B battery (hy4 N5 / DS N4)
Fix `batteries/waveB.node.battery.mjs:57`: remove `as const` or rename to `.ts` and run with `--experimental-strip-types`; the one-token removal is lower risk. Add `node --check` on every `batteries/*.mjs` to packaging. Then fix all six laws hy4 found after the parse fix: W1a stale seal count, W1b add `seam-card-agrees`, W3 import `HOOKS` from `domHooks.ts` instead of inlining selectors, W4 filter Svelte error-code and W3C namespace strings out of the static URL law (network-blocked offline tent remains authority), W6 regenerate contract golden, W8 Arizona contrast regression. Require banner `# WAVE B · 12 pass · 0 fail`.

### 6. Sidecar (hy4 N1 / DS N9)
`SHA256SUMS-2026-11-25.txt` at the tree root is in none of the three SKIP sets. Use pin-agnostic regex `/(^|\/)SHA256SUMS-[^/]*\.txt$/`: define `isShaSidecar` at `tools/verify-package.mjs:71`, add it to the skip condition at `:90`, and add the same regex at `scripts/regen-manifest.mjs:17` and `scripts/gate-manifest.mjs:51`. A checksum file describes the zip; it is not product content.

### 7. Path portability (DS N7)
The gates cannot run from a path containing a space: `new URL('..', import.meta.url).pathname` yields `%20`, so `check-claims.mjs` fails with ENOENT on the Owner's `Football Sim` path. Replace with `fileURLToPath(new URL('..', import.meta.url))` / `path.dirname(fileURLToPath(import.meta.url))` across the ~20 scripts. Prove it by copying the final artifact to a path containing a space and running the full gate there. Include `path-portability` as a claim.

### 8. Non-vacuity (DS N10 / orcads R10)
The contract passes a screenshot of the wrong scene: the left `s2` capture is the w89 WELCOME overlay and the receipt says `met:true` because 150 rows exist behind it. Bind each screenshot to its visible scene: marker = `visible` ∧ `elementFromPoint(center) ∈ target` ∧ stable ~1 s; assert pairwise-distinct scene fingerprints across the five left and five right captures. A DOM count behind an overlay is not a scene proof.

### 9. Tint (orcads R8 / hy4 W8)
`takeover.ts` fails WCAG AA in light mode for all 32 teams; the receipt measures a different panel than the tint draws on. Scope the tint to chip/border only, or use paper ink on the tinted panel. Measure all 32 teams in light mode and fix every failure. Import the panel hex and gold from `tokens.ts`; no copied colour literals.

### 10. SeamCard canary (orcads R9)
`canaryOk` and `stampShown` are computed once, so a restored session keeps the first verdict. Use Svelte 5 `$derived`; pass the live `engineVersion()` in the same prop instead of printing the JSON's frozen field; remove the dead `.cp-sorttoggle` selector. Make the chip and the claims gate consume the same generated provenance file (W1b).

### 11. Missing receipt (orcads R11)
A missing receipt must name itself, never throw ENOENT. In `scripts/check-claims.mjs`, guard every receipt read before `JSON.parse`: return `missing receipt: <path> (run <cmd>)`. Check other claim kinds for the same throw path.

### 12. Offline tent (DS N5/N6)
The tent has never passed: `dist/single.html` under `file://` makes zero external requests and shows no errors, then boots to "No player dataset yet"; `.cp-ts-team` is 0. The offline default is an **Owner decision**; recommended `?dev=1` labelled DEV until a demo dataset is approved. Do not change the default yourself. Run the tent against the CSV-import path (the path the shipped UI actually offers) and say so explicitly in the receipt. Produce `deliveries/receipts/offline-tent.json` with final `distHash`, `booted/drafted/reloaded/restored`, and empty `externalRequests`. A green chip requires the receipt's hash to equal the shipped dist hash.

### 13. Push claim / delivery (MUSE Prompt A)
Your delivery claims a push that does not exist. **You do not push — not in this sitting, not in any sitting.** Cite the zip + SHA256 list, and the mirror if a seat hosts it. Update `README-S17-PACKAGE-NOTE.md` and `ZAI.md` to that delivery, keeping the old text as history. Do not write `council/zai` was pushed; do not create a pushed-head claim that expects one. Shell title: keep the round name and add a one-line "continued in S17"; do not rename the build.

## 3. Reseal LAST, then run the full gate

After every fix above, rebuild, regenerate, reseal, and only then gate. The seal is last; `SHA256SUMS-*` goes outside the artifact or into the named skip set. Required outputs before you answer:
```
node tools/verify-package.mjs .                              # exit 0, 0 EXTRA (or named transport skip)
node scripts/gate-manifest.mjs                               # PASS
node scripts/gate-numerals.mjs                               # CLEAN ×2
node scripts/check-claims.mjs --phase packaging              # 0 RED, exit 0
node scripts/check-claims.mjs                                # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts   # 430 pass / 0 fail
npm run battery:node                                         # 37 pass / 0 fail
npm run battery:board                                        # 24 pass / 0 fail
npm run battery:waveb                                        # WAVE B · 12 pass · 0 fail
npm run battery:offline                                      # JSON receipt, zero external requests, final distHash
npm run battery:visual && npm run battery:slot               # 18/0, 28/0 at final dist
node --check every batteries/*.mjs                           # exit 0
git archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
```
Run the whole gate from a spaced path too (item 7). If a browser leg cannot run, write `UNKNOWN — not run here` and name the missing tool; never convert a skip to a PASS. A gate PASS is not product acceptance; the Owner decides cutover.

## 4. Definition of done / response shape

When all thirteen items are complete and the resealed gate reads `0 RED`, respond **once** with:
- the single zip download path and its sha256, plus the sha256 list;
- the mirror citation if one hosts it, and an explicit statement that nothing was pushed;
- the full and packaging gate output (final bytes) and the engine-fence result;
- the node/board/waveb/offline/visual/slot banners with final `distHash`;
- the regenerated manifest/seam-card/status/state-block hashes;
- a per-item one-line disposition for all thirteen items, including anything you built in a better shape and why;
- a request for a **fresh independent Verifier** — a seat that authored none of this round. Do not self-certify.

Do not deploy, publish, connect Cloudflare, create repos, accept cutover, or take an Owner decision. Do not push. Do not stop early with a false COMPLETE; if you run out of sitting, write `PARTIAL` with the last completed item and the exact next command.

## 5. Owner decisions — use defaults, do not decide

1. Top three exactly 3 vs 3+ties → default exactly 3 until `rawSort` lands, with a `+N tied` strip. Not in this sitting; file as IDEA.
2. Offline first run `?dev=1` labelled demo vs fixture dataset → default `?dev=1` until Owner approves a dataset. Run the tent on the CSV-import path as instructed in item 12.
3. Must a Wave B package carry a Wave B acceptance → default yes; item 2 adds the claim.
4. Shell title → keep round name plus "continued in S17"; item 13.
5. Next shell round order → final-byte release gate, phone card deck, top-three cap. Not in this sitting; file as IDEA.

The T1 boot-loader work (`/dataset/nfl.json`, `createBootDatasetLoader`, no `?raw`, no data in git) stays a separate next item. Work order v8's one-click top-three, glow, why copy and panel outcomes are standing UI outcomes but not part of this fix sitting; cite them as DONE/PARTIAL rather than rebuilding them here.
