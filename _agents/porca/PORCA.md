# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed · **First seen:** 2026-11-19 (admitted by the Owner)
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **Evidence standard:** receipts come from fresh `git show`/`git grep`/`md5sum`/node runs or real file reads. No shared tree writes, product file, engine, pin or other seat's file touched. A wrong claim is kept in the record with a superseding correction: C8 week overclaim, A1 pin claim, A3 mirror critique, C1 ancestry claim.

## Current work — session 7 (review of seats + cutover lane advice, closed 2026-11-20)
- **Filed:** `inbox/20261120-1913-porca-review-of-seats-cutover-lane-split.md` — review of nine c12-review files (beam/hy4/pickle/ernie) and five cutover files, plus the Owner-facing answer to Claude's "re-sync or UI slices?".
- **Recommendation (backed by fresh receipts):** neither. The engine needs no re-sync — `git diff --stat 408410477 ee3b6e1 -- colors/src` is empty. Claude owns the cutover runbook and the `dispatchAsync`/S1 contract; Z.ai owns slices 3–5, the c12 gh-pages landing and the 277→286 test re-point; w89 retirement is a make-live step.
- **Verified this session:** 69 engine TS files at `colors/src` and at pin `408410477` vs 57 in deployed gh-pages cakepanz; 0 `.svelte` in `colors/` vs 10 deployed; `w89` == `index.html` (sha256 prefix `dbb8c27ad6444115`); `dispatchAsync` at `colors/src/sports/nfl/app/store.ts:147`.
- **Sequencing conflict resolved:** hy4 0931 ("re-sync first") diffed inkling's c9 tree, not Claude's source; ernie 1620 ("neither") used the right comparison and I reproduced it. hy4's *reason* still holds — slices must bind to the final API.
- **Seat-audit findings (REPORTED, subagent receipts):** beam 1100 "37 entries" → 36 and T3/T4 mislabelled VERIFIED; beam 1610 "already applied bytes 49/49" false; pickle 1554 T8-blocked + ring-as-fact (self-corrected in 1607); hy4 1613 ring "CONFIRMED"; ernie 1559 `parseInt` 435 → 38; all nine missed `BoardRow.svelte:53` a11y. Clean: hy4 1551, pickle 1606/1607, ernie 1612.
- **End state:** HEAD `b7ae33e5821d39c040a89e5d5e6148c65c5422d2` from session 6; this session's three files commit below. `council/porca` reported `0 dirty / 0 unpushed OK` at the preservation gate.

## Session 6 (Owner's cakepanz-12 relay + review, closed 2026-11-20)
- **Relay pushed verbatim:** `_agents/porca/deliverables/zip-root-cakepanz-12/` (37 files, 376 KB, 0 byte mismatches vs source, 36/36 md5 OK, shipped verifier 36/0/0), commit `48b8e245d5418b6086465e1c5a0eb16134a2bdcb`, `git ls-remote` verified. Same convention as the c10 relay.
- **Review filed:** `inbox/20261120-1614-porca-zai-cakepanz-12-review.md`, `VERDICT: improved` — D1 README "13b CLOSED" contradiction, D2 §1.7 phantom files, D4 Svelte a11y span whose exact string is battery-asserted.
- **Ideas filed:** `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md` — 10 ideas in 3 groups; ordered on the hypothesis that the engine loop, not the phone board, is the main friction.
- **Re-ran (VERIFIED):** T2 seed receipt exact reproduction; T8 c10 wrapper 51 files/49 entries/48 OK/1 missing + named file absent on all four fetched host tips; verifier converse gap; T3 ruling existence (`git show 17e79b1a`).
- **Svelte review method:** read-only `svelte-file-editor` subagent with Svelte MCP autofixer, then every finding re-verified by direct file reads.

## Corrections carried in the record
- Ring verdict: **B** (`rawSort`), not A. Re-pin is owed even for a view-only change. "The ring is dropped" appears in this chat but no ruling exists in the checked owner-notes/bulletins/PRIORITIES — keep it REPORTED.
- Q7: plain week/season readers are already caught by the no-snapshot QB assertion; the real gap is unpopulated keys and non-QB-only metadata reads. The relay reports `week: 6` as the confirmed fix.
- **Pin provenance (CORRECTED):** 06d89724 is the true pickSlot introduction and IS an ancestor of pin 408410477 and the live Architect tip. 560b8364f carries identical lines but is a different commit. Neither is an ancestor of the frozen d3bd81d2 (2026-11-14). Verify ancestry in full history, never in `/Users/kosi/Desktop/wt/porca` (its common repo has `.git/shallow`).
- Part 0 is REPORTED, not accepted. `d3bd81d2` = Colors engine pin; `4ca9a071` = 67-cakepanz snapshot pin; `408410477` = plan-M docs pin (REPORTED from the relay).
- C12 README "stage 13b CLOSED" is a **new 2026-11-20 correction**: authoritative state is OPEN per sitting-report §1.2/§8/§9 and `START-OF-CHAT-ZAI.md:21` (F20 = RED ELSEWHERE, not DIED — FAIL L13).

## What the next session needs
- **Read first:** the session-7 inbox file above, then `inbox/20261120-1614-porca-zai-cakepanz-12-review.md` and `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md`, then the relay at `_agents/porca/deliverables/zip-root-cakepanz-12/deliverables/sitting-report-2026-11-20.md`.
- **Do not redo:** C1–C12, A1/A2/A3, C18/B8, the c10 re-measurement, `hosted-c9.diff`, passGap, the 18-provider Q7 probe, the cakepanz-10 review + Svelte pass, the ancestry re-check, any session-6 verification, or the session-7 byte-diff/lane-split audit.
- **Still open (not mine, no claim):** the full hardened falsifier re-run (13b); the ring ruling; the six AA holes; the Owner's Part 0 / sport-two rulings; Z.ai's next sitting; the c10 landing on four hosts (blocked on repair bytes); hy4's strict verifier + my D1–D4 fixes awaiting Z.ai/Architect integration; Claude's cutover runbook and contract publication.
- **Unanswered brainstorm question to the Owner:** is the main frustration the slow loop around the engine (re-pins, receipts, stale generators) or the player-facing board on a phone? The 10-idea shortlist is ordered on hypothesis A; it would be re-ranked on the answer.
- **End-of-chat gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees only (shared Football Sim tree, council-ds/super, architect-colors, boc, dsd, flint, GH, glm, q, vloc; local-only commit on council/vlorca). My `council/porca` reported `0 dirty / 0 unpushed OK`. Do not touch another seat's worktree.

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- `_agents/porca/deliverables/zip-root-cakepanz-10/` — c10 relay (verbatim).
- `_agents/porca/deliverables/zip-root-cakepanz-12/` — c12 relay (verbatim).
- No build copies, images or lane code (advisor role). Work lives in `inbox/` plus one bulletin file per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Propose, test, dissent, measure; never build or rule.
