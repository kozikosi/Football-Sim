# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed · **First seen:** 2026-11-19 (admitted by the Owner)
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **Evidence standard:** receipts come from fresh `git show`/`git grep`/`md5sum`/node runs or real file reads. No shared tree writes, product file, engine, pin or other seat's file touched. A wrong claim is kept in the record with a superseding correction.

## Current work — session 11 (draft ranking, P-287 contract review, Architect replies, 2026-11-20)
- **User request 1 — "whose draft is best":** re-fetched all seat branches and re-read the latest four S14 work orders: pickle `2127` v4, hy4 `2130` v3, my `2125` v3, ernie `2130` v3. Ranked pickle v4 first (only draft simultaneously self-contained, pin-safe, delivery-honest and gate-consistent; byte proof of the pin boundary; full keyframes, glossary, decision boundary). hy4 v3 second (pin-safe but W14 double-count and a dangling `§0.6` reference). My v3 third (self-assessment). ernie v3 fourth: §4.3.1 still tells Z.ai to expose `rawSort` on `BoardRowVM` in the frozen engine — not executable as written. Delivered in chat; no ranking file filed.
- **User request 2 — review the Architect's `dac331e` report:** found and verified a tree mismatch. His `dispatchAsync` contract §2 was labelled as the *deployed* `67-cakepanz/src/App.svelte` (3 sites, `:56/:80/:84`), while §4 and the runbook §3 require the c12/S13 tree (4 sites, `:148/:178/:184/:208`, `__cp` at `:104`). Filed `inbox/20261120-2210-porca-P-287-review-dispatchasync-contract-c12-callsites.md`, VERDICT improved, commit `2822222cd`, push verified by `git ls-remote`. Exact old→new text supplied; no Architect file touched.
- **Self-correction carried in the reply:** I had framed the `__cp` shape change as a battery issue; the Architect verified `slice1.battery.mjs` has zero `__cp` references. Corrected in the reply to Claude: the shape matters to dev-hook tooling generally (`vmStore`, `go`), not that battery. The four-site finding stands.
- **User requests 3/4 — "how should we reply to Claude":** drafted two pasteable replies. First covered the §2/§5 re-anchoring ask plus hy4's three UNKNOWN answers; second confirmed the fixes and raised two residuals. No repo action for either.
- **Verified at session end (read-only):** remote tip `origin/architect/engine-and-seats` = `7d8d71c`; `d3177ee` and `7d8d71c` both present. All three hy4 leftovers fixed in the contract and `NOW.md`: §3 says four sites, §4 says Cloudflare handover, LANES matches RULINGS. hy4's three receipts all reproduce from the S13 tree: `CUTOVER-CHECKLIST.md:20-22` (board 15/0→16/0, slot 28/0, visual 15/0→17/0); `swap-test.log:30` = `SWAP TEST VERDICT: FAIL` and c7/c8 battery `:45` = 29 pass / 0 fail / 10 skip / 3 deferred; w89 `KEY='zpb:season'` at `:18080` with `grep -c 'sim:nfl'` = 0.
- **Two residuals reported, not filed:** (1) contract §2 header credits hy4's anchors as VERIFIED but §5 still labels `:104` "REPORTED" — he verified `:104` too; (2) relay note for Z.ai — `slice1.battery.mjs` is clean, but `shell.battery.mjs:61,170` call `__cp.store.dispatch({type:'LOAD'})` and `board`/`visual`/`slot` batteries use `__cp.vmStore`/`go`/`refresh`. Contract's §5 rule covers them; naming the two LOAD calls in the handoff was recommended.
- **Not done:** no product/engine/pin/governance/other-seat file edited; no colors/ gates re-run (430/430 and tsc 89/89 remain the Architect's receipts). Everything delivered in chat plus one inbox review.

## Session 10 (second-pass Z.ai prompt review + v3, 2026-11-20)
- **User request:** re-review the other seats' *updated* S14 prompt drafts, compare to my v2, and rewrite assuming Z.ai read none of the drafts.
- **Read fresh this pass:** pickle `2109` (six-way review), pickle `2110` (v3 work order), hy4 `2115` (v2 work order) — line-by-line against my v2. Did not re-open ernie `2100` or iceman; they are represented through those two reviews and I say so in the deliverable.
- **Deliverable:** `inbox/20261120-2125-porca-TO-ZAI-S14-self-contained-prompt-v3.md`. Self-contained (no cross-draft reading), glossary retained, execution-order table added.
- **Three comparison findings:** (1) BOTH newer work orders reintroduced the pin-boundary defect my v2 fixed — pickle `2110` §3.4.1 and hy4 `2115` §4.3.1 tell Z.ai to add `rawSort` to `BoardRowVM`, which is a frozen engine type (`draftBoard.ts:19`, re-exported at `seam.ts:16,87`) — unsatisfiable with their own "69/69 engine byte-identical" gate; (2) hy4 v2 double-counts W14 in both node and visual batteries — W14 is visual only (node stays 35/35), as pickle `2109` §2.3 resolved; (3) hy4 v2 assumes push credentials in its delivery gate, while pickle correctly accepts a zip download link — v3 uses the latter and adds "never claim a push you cannot make."
- **Absorbed:** hy4's one-page order table and general decision-boundary rule; pickle's `git cat-file -t`/`grep -c` boot receipts, first-reply format, `:81,125` anchors, W14 resolution and fuller ranked innovation list.
- **New byte evidence (verified read-only this pass):** `seam.ts:16,87` re-export proof; `DraftBoard.svelte:70-73` comment (raw wins on a 1e-9 grid, "so real ties compare exactly"); `draftBoard.ts:53` sort key is raw `_w`/`_p` for wins/priority but exact integer display for `ovr`; `:61` strips the raw fields. Sharpens the pin-safe split: primary top-three by array position is correct for all three sorts; only the tie extension needs `rawSort`, and only for wins/priority.
- **Verification:** self-containment grep clean inside the PROMPT block, gate counts consistent (W14 visual only, `45/45 with 0 overflow`), and every cited anchor re-read against the delivered S13 bytes. Corrected my own v2's `45/0` shorthand and the `:70-72` comment span (now `:70-73`).
- **Not done:** no product/engine/pin/governance/other-seat file edited. Advisory input only; Owner/MUSE relay and decide.

## Session 9 (Z.ai S14 prompt rewrite + seat-quality ranking, 2026-11-20)
- **Z.ai prompt rewrite (user request):** `inbox/20261120-2115-porca-TO-ZAI-S14-self-contained-prompt-v2.md` — I read all 11 other seats' prompt drafts (beam, ernie ×3, glyph, hy4, pickle ×4, vl + my own 2040), then rewrote mine as a **self-contained** work order with a glossary (§13) assuming Z.ai read none of them. Supersedes my `2040` (which carried the false "ring restyle only" premise).
- **Two substantive defects found that all 4 source drafts shared** (via a read-only reviewer + my byte checks):
  1. `BoardRowVM`/`key()` live in the **frozen engine** `src/engine/sports/nfl/view/draftBoard.ts:19,53`, so "expose `rawSort`" contradicts "all 69 engine files byte-identical". Resolved: engine half → §5 proposal to the Architect; shell half (primary top-three by row position) done pin-safe now. Rows already sorted by raw `key()` at `:54`; defect is the tie-extension display parse at `DraftBoard.svelte:76`.
  2. A raw-valued L13 oracle cannot be shipped against a display-valued component (fails on tie cases). Resolved: keep oracle + component **paired** (`INTERIM — display-rounded, awaiting rawSort`), file their corrected paired diff with the engine proposal; never fix one alone.
- **Verification:** 4 read-only reviewer passes; final pass found only a label-string inconsistency, which I unified. Result: no internal contradictions, no undefined prerequisites, premise (Contract B a target / L13 oracle lossy / glow last) confirmed in the text.
- **Seat-quality ranking (user request, 2026-10-30 → 2026-11-20):** 4 parallel read-only audits completed across ~40 seats. Headline for the Owner: no seat should be retired *for inefficient work flow*; the retirement-grade cases are governance violations (uk: 10 product-file edits; or: 2 incl. protected `DEFAULT_WEIGHTS` + `MERGE-MANIFEST`) and rejected/invented data (fk P-204 impossible rates), which are Owner calls on different grounds. See the final answer for the ranked quality list and recommendations. Data was gathered but **no ranking file was filed to the repo** — it was delivered in chat.
- **Not done:** no product/engine/pin/governance/other-seat file edited. The Z.ai prompt and ranking are advisory input only; Owner/MUSE relay and decide.

## Session 8 (Owner's cakepanz-13 relay + review, closed 2026-11-20)
- **Relay pushed verbatim:** `_agents/porca/deliverables/zip-root-cakepanz-13/` — 451 files / 18M, from `/Users/kosi/Desktop/Football Sim/67-cakepanz-13-2026-11-20`. Commit `efa23ec80` (`git ls-remote` verified). Shipped verifier → `445 OK / 0 FAILED / 0 missing`, `converse clean`, exit 0.
- **Review filed:** `inbox/20261120-1940-porca-cakepanz-13-review.md`, VERDICT improved, commit `2c3ce8dbd`. Bulletin: `bulletin/20261120-1948-porca.md`.
- **Verified:** all 69 `src/engine/*.ts` byte-identical to pin `408410477`; verifier converse clean + planted-extra detection; falsifier 13b final log all nine DIED, exit 0; T8 source md5 `0a2869538a706e7e6ea864664b7e5c9f`.
- **Two DEFECTs (Z.ai's source):** `ACCEPTANCE-RECEIPTS.txt` truncated at step 13 (13 headers, 12 EXIT_CODE=0, no 13b–17) so "END-TO-END composite" unsupported; `F20 … FAIL L13` in prose but shipped log prints only `FAIL L16`.
- **Three RISKs:** `BoardRow.svelte:53` a11y `tabindex="0"` (all nine c12 reviews missed); `App.svelte:339-345` `$derived.by` may go stale (INFERRED); split 380 ms guards.
- **Not re-run:** any browser/node/engine battery — no `node_modules` in relay tree; counts REPORTED, not VERIFIED.
- **Peer reviews reviewed:** `inbox/20261120-2003-porca-review-of-seat-reviews-s13.md` — 11 findings re-verified; ernie D3 corrected not reproducible; 13b CLOSED co-signed. Pickle's D1 (shared link overwritten by autosave) is the top S13 item.
- **Implications + second-order reviews:** `inbox/20261120-2003-porca-IDEA-cakepanz-s13-implications.md`; `inbox/20261120-2031-porca-review-of-peer-review-of-reviews.md` (my corrections: classifier `:203` not `:201`; flex 97→99 resolved in muse AGENTS.md; pin drift 5 lines in 2 files).

## Corrections carried in the record
- Ring verdict: **B** (`rawSort`), not A. Label collision (pickle A1 vs MUSE "five-voice Contract B") — same `rawSort` mechanism, different naming axes; MUSE to reconcile; do not re-litigate. Owner's verbatim ruling (20 Nov, chat; no filed note yet) revives the ring in Z.ai's lane with w89's glowing buttons; multisport stays parked. **Correction (session 11):** the Owner has since ruled the ring REMOVED and deploy = CLOUDFLARE (via hy4's relay, recorded in Claude's `NOW.md` RULINGS). Treat that as the newer ruling; do not re-litigate.
- Pin provenance (CORRECTED): `06d89724` is the true pickSlot introduction and IS an ancestor of pin `408410477`; `560b8364f` has identical lines but is a different commit. Verify ancestry in full history, never in this worktree (`.git/shallow`).
- `d3bd81d2` = Colors engine pin; `4ca9a071` = 67-cakepanz snapshot pin; `408410477` = plan-M docs pin (REPORTED from the relay). Live pin in the S13/S14 prompts is `408410477`.
- C12 README "stage 13b CLOSED" is a 2026-11-20 correction; authoritative state CLOSED (named-law DIED), standing.
- Session 11 self-correction: the c12 `__cp` hook shape matters to dev-hook tooling, **not** to `slice1.battery.mjs` (verified zero `__cp` refs). Do not repeat the earlier framing.

## What the next session needs
- **Read first:** `inbox/20261120-2210-porca-P-287-review-dispatchasync-contract-c12-callsites.md` (newest work), then `inbox/20261120-2125-porca-TO-ZAI-S14-self-contained-prompt-v3.md`, then the session-8 relay review `inbox/20261120-1940-porca-cakepanz-13-review.md`.
- **Do not redo:** C1–C12, A1/A2/A3, the c10/c12/c13 relays and reviews, the ancestry re-check, the S13 review round, the 11-draft Z.ai prompt review, the second-pass review of the updated drafts, the 4-audit seat ranking, the latest-draft ranking, the P-287 contract review.
- **Still open (not mine, no claim):** the Architect's Cloudflare rollback section and w89-parity visual acceptance in the runbook; the two residuals reported in session 11 (§5 VERIFIED/REPORTED label; naming the two `shell.battery.mjs` LOAD calls for Z.ai); Owner-note intake of the ring quote; five stale pin lines (`AGENTS.md:44,45,46,73`, `PROJECT-KNOWLEDGE.md:18`); the make-live trigger under Cloudflare; Contract A/B label reconciliation; the Owner's seat-retirement decisions.
- **End-of-chat gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees only (shared Football Sim tree, council-ds/flint/super/dsd/boc, architect-colors, local-only commits on council/vlorca, q, vloc). My `council/porca` is clean after this session's commit. Do not touch another seat's worktree.

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- `_agents/porca/deliverables/zip-root-cakepanz-{10,12,13}/` — verbatim relays.
- `inbox/20261120-2115-porca-TO-ZAI-S14-self-contained-prompt-v2.md` — superseded (session 9).
- `inbox/20261120-2125-porca-TO-ZAI-S14-self-contained-prompt-v3.md` — current Z.ai prompt.
- `inbox/20261120-2210-porca-P-287-review-dispatchasync-contract-c12-callsites.md` — current Architect review.
- No build copies, images or lane code (advisor role). Work lives in `inbox/` plus one bulletin file per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Propose, test, dissent, measure; never build or rule.
