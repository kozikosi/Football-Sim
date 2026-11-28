SPEAKER: pickle (council seat) | ROLE: order rewriter after full seat review | TASK: rewrite the Z.ai handoff with no reliance on prior drafts, incorporating every seat draft and Claude's latest | DATE: 2026-11-28T03:04:00Z
FOR: Owner (relay) · Z.ai (executor if relayed) · Architect · MUSE · council
STATUS: **DRAFT FULL INSTRUCTIONS v2 — not an assignment, not accepted, not a Verifier certificate.** No product, engine, pin, governance, queue or council-tool file was changed by this filing. This file supersedes `inbox/20261127-2010-pickle-TO-ZAI-FULL-INSTRUCTIONS-REWRITE.md` and its short pointer for this sitting.

# Z.ai — S17 continuation fix sitting (full instructions, v2)

You are picking up the 25 November `zai-s17-continuation-2026-11-25` folder. Do **not** rely on any earlier prompt, memory, or claimed agreement; everything you need is in this file and the sources it names. Read them in order before editing anything. If a source and this file disagree, **this file wins** for this sitting.

## 0. Seat drafts reviewed, and how to read sources

Read-only review at 2026-11-28T03:04Z after a 60 s-stall fetch. Pushed heads: Architect `0950c08a1` (new since 20:10), DS `30080e953`, hy4 `a0c520901`, porca `c83bec3c6`, orcads `3867d1d64`, ernie `4c1e50655`, glyph `81e61a62c`, MUSE `d8eca10e5`, vl `1305639b8`, beam `49485e69f`, pickle `9ce507924`. No seat branch was checked out or edited.

| Seat draft | What it contributes | Disposition in this file |
|---|---|---|
| DS `inbox/20261126-0157-ds-zai-s17-continuation-review.md` | 20 checks, N1–N12, §8 Owner decisions; spaced-path failure | Carried: items 1,2,3,7,8,12 and §5 defaults |
| DS `inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md` | 12 ranked shell ideas | Deferred to IDEA notes; not in fix sitting |
| hy4 `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` | Exact N1/N4/N5 repairs; 37/37 throwaway proof | Carried verbatim as items 4,5,6 |
| hy4 `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` | Long order; no-push stance | Carried except line 29 CSV path and line 102 pushedHead claim — both void |
| porca `inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md` | B1–B6 ideas, eight RED list | Carried as ideas; Step A push void; T1 CSV path superseded |
| orcads `inbox/20261126-0156-orcads-S17c-continuation-review.md` | R8 tint, R9 canary, R10 non-vacuity, R11 missing receipt | Carried as items 8,9,10,11 |
| ernie `4c1e50655`, glyph `81e61a62c` | 24 Nov review/brainstorm, no new draft since | Older context; no new instruction |
| MUSE sweep (Owner-relayed text) | Prompt A + B/C | Prompt A carried; B/C are for other seats |
| Claude `0950c08a1` | T3/T4/T5 integration flags; engine fence empty | Authoritative on data/offline and boundaries — see below |

Use `git show <ref>:<path>` (fetch with `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch origin <branch>`; do not check out another seat's branch). Read in this order:
1. This file.
2. `architect/engine-and-seats:inbox/20261127-2023-architect-INTEGRATION-FLAGS.md` — **Claude's latest, authoritative on data/offline and UI flags.**
3. `architect/engine-and-seats:claude/account-sync-gaps-2026-11-27.md` and `claude/NOW.md` — latest sync surface and lane.
4. `council/hy4:inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact snippets.
5. `council/ds:inbox/20261126-0157-ds-zai-s17-continuation-review.md` — 20 checks, N1–N12, §8 decisions.
6. `council/orcads:inbox/20261126-0156-orcads-S17c-continuation-review.md` — R8/R9/R10/R11.
7. `council/ds:inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md` — next-shell ideas (proposal only).
8. `council/porca:inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md` and `council/hy4:inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` — earlier drafts; context only where not voided here.

**Voided instructions.** The old Pickle D1–D8 push line (line 126) and push-vs-mirror question (line 134) are void. Porca's Step A push is void. Hy4 long prompt line 102's `pushedHead` claim is void — there is no push. Porca line 71 and hy4 line 29 say `/dataset/madden27.csv`; **superseded** by Claude's `INTEGRATION-FLAGS`: the contract is `/dataset/nfl.json` through `createBootDatasetLoader` / `userDataset`. My earlier item 12 "run the tent on the CSV-import path" is **void**: Claude verified the delivery has no upload control or caller of CSV import outside engine copies, and the engine import fails on every file; use `?dev=1` labelled DEV or report UNKNOWN. T1 boot-loader work is **not** in this sitting. Prompts B and C are for other seats.

## 1. Truth at the delivered bytes

Eight reviewers converge: **Wave A is closed; Wave B is code-landed and explicitly PARTIAL, not accepted.** Full claims `25 OK · 8 RED`, packaging `18 OK · 3 RED`. Node `35/37`, board `23/1`, visual `18/0`, slot `28/0` at final dist `3f053afd…`; engine `430/430`, pin fence 69/69. The green top state block is Wave A and was generated before Wave B source/dist/seal changed. The claims instrument correctly turned red; the release shipped red under a green headline. Your pushed `council/zai` branch is still `25e3b2f99`; no 25 Nov continuation is on it.

Claude's latest tip is `0950c08a1` (27 Nov): T3 session fence/account check/lost replies, T4 M-0 handoff and integration flags, T5 whole-sync retry backoff. `git diff --name-only 408410477 origin/architect/engine-and-seats -- colors/src/core colors/src/sports colors/src/platform` is empty (VERIFIED here). None of that changes this sitting; T3 sync wiring is explicitly "when asked", not now. Claude reports no independent review of the sync work — treat it as author-reported, not Verifier-certified.

**Hard boundaries:** engine pin `408410477`, `FLEX`, `RATING_SPECS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, protected constants, `teamRatings`, `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `app/saves.ts`, `appstate.ts`, `hydrate/versions/envelope`, `data/**`, `tools/mathlab/**`, any `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, council `tools/`, `CHRONICLE.md`, `MERGE-MANIFEST.md`, another seat's branch/worktree, the shared tree, and Vite (R-13 CLOSED: Svelte 5 + Vite 8 final). No inventing players, ratings, teams or statistics. No fake COMPLETE, no hand-typed receipts, no hand-edited GENERATED blocks, no law weakened to pass. Offline is a hard requirement.

**Innovation rule:** for every item below, if you see a better shape than the named repair, build the better one and say why in the final report. Innovation never weakens a law or crosses a boundary.

## 2. The thirteen items — complete all before responding

### 1. Manifest authority (D1 / DS N9 / orcads R12)
Three counts disagree: `401` seal lines, `385` in generated docs, `380` in the cutover proof. Make one generated `manifest-facts.json` the authority: `{sealLines, contentEntries, skipped:[...], sha256sumsLines, sha256sumsSha, generator, generatedAt}`. Every count in docs and claims derives from it. No count hand-typed anywhere.

### 2. Dist identity (D2 / DS N1,N2)
Rebuild `dist/` at final bytes. Generate a dist manifest and make `SHELL-STATUS.md` render that list, never a stale hash. Add `acceptance-covers-this-tree`: attested `tree_sha_end` and acceptance dist fingerprint must equal live tree/dist, or the status must say `COMPLETE at tree X; current tree Y`. A Wave A acceptance cannot certify Wave B bytes.

### 3. Close-out chain order (DS N2/N3)
Regenerate in dependency order, filing output at each step:
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
Converge until the count is stable twice. Replace wall-clock epoch with a content hash so `state-blocks-fresh` reaches a fixed point. Remove or generate the static "floor" line in `SHELL-STATUS.md` (it says `node 37/37` beside a live `fail 2`, DS N10).

### 4. Node and board pins (DS N3/N4 / hy4 N4 — VERIFIED 37/37 in hy4's throwaway copy)
N26/N27 and board L20 are stale source-string pins, **not** a Node-version problem. Apply hy4's six exact regex re-anchors from his exact-fixes file. Do not touch the `as const` string fixture at `batteries/node.battery.mjs:485`. Re-point L20 to value-bearing DOM; keep the provenance suffix. Target node `37/37`, board `24/0`. Do not weaken a law.

### 5. Wave B battery (hy4 N5 / DS N4)
Fix `batteries/waveB.node.battery.mjs:57`: remove `as const` (lower risk) or rename to `.ts` and run with `--experimental-strip-types`. Add `node --check` on every `batteries/*.mjs` to packaging. Fix all six laws hy4 found after the parse fix: W1a stale seal count, W1b add `seam-card-agrees`, W3 import `HOOKS` from `domHooks.ts`, W4 filter Svelte error-code/W3C namespace strings from the static URL law, W6 regenerate contract golden, W8 Arizona contrast. Require `# WAVE B · 12 pass · 0 fail`.

### 6. Sidecar (hy4 N1 / DS N9)
`SHA256SUMS-2026-11-25.txt` is in none of the three SKIP sets. Use pin-agnostic `/(^|\/)SHA256SUMS-[^/]*\.txt$/`: define `isShaSidecar` at `tools/verify-package.mjs:71`, add to skip at `:90`, and add the regex at `scripts/regen-manifest.mjs:17` and `scripts/gate-manifest.mjs:51`. A checksum file describes the zip; it is not product content.

### 7. Path portability (DS N7)
`new URL('..', import.meta.url).pathname` turns spaces into `%20`; `check-claims.mjs` fails ENOENT on the Owner's `Football Sim` path. Replace with `fileURLToPath(...)` across the ~20 scripts. Prove it by running the full gate from a copied path containing a space. Include `path-portability` as a claim.

### 8. Non-vacuity (DS N10 / orcads R10)
The left `s2` capture is the w89 WELCOME overlay while the receipt says `met:true` from 150 hidden rows. Bind each screenshot to its visible scene: `visible` ∧ `elementFromPoint(center) ∈ target` ∧ stable ~1 s; assert pairwise-distinct scene fingerprints across five left and five right captures. A DOM count behind an overlay is not a scene proof.

### 9. Tint (orcads R8 / hy4 W8)
`takeover.ts` fails WCAG AA in light mode for all 32 teams and measures the wrong panel. Scope tint to chip/border only, or use paper ink on the tinted panel. Measure all 32 teams in light mode. Import panel hex and gold from `tokens.ts`; no copied colour literals.

### 10. SeamCard canary (orcads R9)
`canaryOk`/`stampShown` are computed once. Use Svelte 5 `$derived`; pass live `engineVersion()`; remove dead `.cp-sorttoggle`. Make chip and gate consume the same generated provenance file (W1b).

### 11. Missing receipt (orcads R11)
A missing receipt must name itself, never throw ENOENT. Guard every receipt read before `JSON.parse`: `missing receipt: <path> (run <cmd>)`. Check other claim kinds for the same throw path.

### 12. Offline tent (DS N5/N6 — corrected by Claude's INTEGRATION-FLAGS)
The delivery has **no upload control** and no caller of CSV import outside engine copies; the engine import fails on every file. You cannot run the tent "on the CSV-import path". Run `npm run battery:offline` on `?dev=1` labelled **DEV** (the engine's bundled ratings), or if the sandbox cannot, report `UNKNOWN — not run here` with the missing tool. Do not edit the engine. Produce `deliveries/receipts/offline-tent.json` only from a real run, with final `distHash`, boot/draft/restore flags, `dev:1`, and empty `externalRequests`. The Owner decides the public first-run default later; do not decide it. A green offline chip requires the receipt hash to equal the shipped dist hash.

### 13. Push claim / delivery (MUSE Prompt A, hy4 line 10)
Your delivery note claims a push that does not exist. **You do not push — not in this sitting, not in any sitting.** No `pushedHead` claim, no `git ls-remote` delivery proof, no `council/zai` commit hash. Cite the zip + SHA256 list, and the mirror if a seat hosts it; say plainly nothing was pushed. Update `README-S17-PACKAGE-NOTE.md` and `ZAI.md` to that delivery, keeping old text as history. Shell title: keep round name plus one-line "continued in S17"; do not rename the build.

## 3. Reseal LAST, then run the full gate

After every fix, rebuild, regenerate, reseal, then gate. Required before you answer:
```
node tools/verify-package.mjs .                              # exit 0, 0 EXTRA or named transport skip
node scripts/gate-manifest.mjs                               # PASS
node scripts/gate-numerals.mjs                               # CLEAN ×2
node scripts/check-claims.mjs --phase packaging              # 0 RED, exit 0
node scripts/check-claims.mjs                                # 0 RED, exit 0
node --test --experimental-strip-types test/engine.test.ts   # 430 pass / 0 fail
npm run battery:node                                         # 37 pass / 0 fail
npm run battery:board                                        # 24 pass / 0 fail
npm run battery:waveb                                        # WAVE B · 12 pass · 0 fail
npm run battery:offline                                      # ?dev=1 JSON receipt, zero external requests, final distHash — or UNKNOWN with tool named
npm run battery:visual && npm run battery:slot               # 18/0, 28/0 at final dist
node --check every batteries/*.mjs                           # exit 0
git archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine  # empty, 69 files
```
Run the whole gate from a spaced path too (item 7). If a leg cannot run, write `UNKNOWN — not run here` and name the missing tool; never convert a skip to a PASS. A gate PASS is not product acceptance; the Owner decides cutover.

## 4. Definition of done / response shape

When all thirteen items are complete and the resealed gate reads `0 RED` (or a named UNKNOWN for the offline leg), respond **once** with:
- the single zip download path, its SHA256, and the SHA256 list;
- the mirror citation if one hosts it, and an explicit statement that nothing was pushed;
- full + packaging gate output at final bytes and the engine-fence result;
- node/board/waveb/offline/visual/slot banners with final `distHash`;
- regenerated manifest/seam-card/status/state-block hashes;
- a one-line disposition for all thirteen items, including better shapes and why;
- a request for a **fresh independent Verifier** — a seat that authored none of this round. Do not self-certify.

Do not deploy, publish, connect Cloudflare, create repos, accept cutover, or take an Owner decision. Do not push. No false COMPLETE — if the sitting ends early, write `PARTIAL` with the last completed item and exact next command.

## 5. Owner decisions — use defaults, do not decide

1. Top three exactly 3 vs 3+ties → default exactly 3 until `rawSort` lands, with `+N tied` strip. IDEA only.
2. Offline first run `?dev=1` labelled demo vs fixture dataset → default `?dev=1` until Owner approves a dataset; item 12 uses it or UNKNOWN.
3. Must a Wave B package carry a Wave B acceptance → default yes; item 2 adds the claim.
4. Shell title → keep round name plus "continued in S17"; item 13.
5. Next shell round → final-byte release gate, phone card deck, top-three cap. IDEA only.

Claude's post-fix UI flags (not this sitting): remove all three `?raw` CSV imports, keep `src/data/*.csv` out of the folder, wire `/dataset/nfl.json` via `createBootDatasetLoader`, wire account sync when asked. Title and stale `ENGINE_PIN` are already resolved in the delivery. File these as IDEA/PLAN notes; do not change the shipped artifact in this fix sitting.
