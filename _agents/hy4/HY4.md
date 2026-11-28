# HY4 — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** HY4 · **Model / how reached:** Hy4 flash / OpenChamber · **State:** advisor (no core status claimed).
- **Admitted:** 2026-11-18 by the Owner (`tools/admit-seat.sh`). Not retired.
- **Role:** propose, test, review, dissent, measure. No veto; the Architect decides. Never assign work to a named seat; the queue is one ranked list on `origin/council/muse`.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4` · **branch:** `council/hy4` · **merge-base with base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`.
- **Repo:** `/Users/kosi/Desktop/Football Sim/.git` (git-common-dir verified). The shared tree is read-only for all seats.

## Current work (session end 2026-11-28T05:55Z — mirror + independent review + shell brainstorm; HEAD see commit log)
- **Mirror pushed (Owner request):** `zai-s17-continuation-p5-2026-11-27/` @ `f65b6aa5b` — 857 files, 28 MB, byte-identical to the Owner's desktop folder (`diff -rq` exit 0, excludes node_modules/.git/.DS_Store). `council/hy4` push confirmed by `git ls-remote`. This freezes the PARTIAL bytes as an auditable object; earlier mirrors are `zai-s17-continuation-2026-11-25/` @ `3cd405cfa6`, `zai-s17-closeout-2026-11-24/` @ `873a9f742` and `zai-s17-closeout-2026-11-23/`. All mirrors are read-only; do not edit them.
- **Review filed (independent — I authored none of the reviewed work):** `inbox/20261128-0553-hy4-zai-s17-continuation-p5-review.md`, VERDICT improved. At the packaged bytes: claims 31 OK · 6 RED (reproduced, exit 1); verify-package 416/0 converse clean; gate-manifest PASS; gate-numerals CLEAN ×2; battery-syntax PASS; engine 430/430, node 37/37, Wave B 12/12 (v26.13.0); engine fence vs pin `408410477` diff EMPTY (69 files); byte-latch card == sourceTreeSha == dist constant `2d0517981b33ef…`; sbs 41 captures with 6 named FALLBACKs + 6 `met=false`. Browser batteries NOT re-driven (no Playwright in this worktree) — stated in the review.
- **Three shown defects (exact fixes in the review):** D1 generated state blocks stale — README/ZAI/handover print `seal-verifies RED 412 OK/4 FAILED` while the seal is 416/0 (`gen-state-block.mjs --check` exit 1); D2 `claims.json:198-202` literal `2026-11-24` REDs the correct `2026-11-28` START doc, so Gate 1 cannot be 0 RED as written; D3 `verify-spaced-path.mjs` writes its own receipt after check-claims — two scratch runs both FAIL (missing receipt, then receipt says FAIL), so first invocation can never pass.
- **Ideas filed:** `inbox/20261128-0553-hy4-S17-P5-implications-and-ideas.md` — 4 implications + 12 ranked advisory ideas (claims-spec entropy gate, `CP_SKIP_SELF` bootstrap, convergence over human surfaces, one generated verifier page, deterministic scenario replay, stable `data-scene` anchors, dist-aria parity gate, executable cutover data gate, seam-diff oracle, derived status strip, per-route contrast matrix, seed-share opt-in). Advisory only — no product/engine/dependency code written.
- Earlier filings still live: `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` (DRAFT order, needs relay), `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` (six pin fixes VERIFIED 37/37), two earlier reviews (`20261125-0020`, `20261126-0147`) and two earlier 12-idea notes.

## What the next session needs
1. Read this file → the two 20261128 inbox filings → the mirror's `PARTIAL-2026-11-28.md` if the Owner relays a resume. Do not re-run my checks on a *new* tree and attribute them to this review; the review is pinned to `council/hy4@f65b6aa5b`.
2. **Watch** whether Z.ai fixes D1/D2/D3 before the next Gate 1 claim. A verbatim resume of `PARTIAL-2026-11-28.md` step 6 still ends RED because of D2/D3.
3. **Owed:** one fresh independent Verifier for the final sealed bytes — not Z.ai, not Pickle, not me, not a pre-fix reviewer. Gate PASS is not product acceptance; Owner decides cutover.
4. **Mirror citation drift:** the package note and START-ZAI cite `council/hy4@3cd405cfa6` / "nothing pushed"; the p5 tree now rides `f65b6aa5b`. Next sitting must distinguish the two trees in the note (history vs current).

## Open questions (not mine to decide)
- Relay the D1–D8 order and the new three fixes to Z.ai? Recommended yes via the Owner.
- Adopt I1–I3 (claims-spec entropy / bootstrap convention / convergence predicate) as tooling? Recommended yes — all verification-only, no product change.
- I5 scenario replay / I6 scene anchors / I12 seed-share: dev-only prototypes recommended; I12 is an Owner product call (default opt-in).
- Dev-only or player-facing provenance at cutover? Recommended dev-only until Owner rules.
- Public cutover data exclusion (I8): Owner ruling needed; gate should enforce whatever is chosen.

## Standing context (in force — do not reopen)
- Owner rulings: brand 76 Pancakes, "20-0" is the season record; repo `76pancakes` (lowercase identifiers); stats on the deployed site, data files not in the public repo; offline is hard; no faces/scouting/full-GM; no paid API/CDN.
- Engine pin `408410477` (69 TS files, five-path fence, `colors/src` → `src/engine`); never edit `src/engine/**` to match a UI; model-first weights from `slotWins20`; flex 97-rule D-picks table. R-13 CLOSED (Owner 2026-11-19, Vite 8); migration plan FILED, not applied — no Vite bump before cutover.
- Delivery gate: a pushed commit hash or a download link is delivery; a sandbox path is not. No force-push, no stash, `git add -- <paths>`, 60 s stall flags, own branch only.
- Claims: VERIFIED (ran it, receipt in text) / REPORTED (another seat's receipt, cited) / INFERRED / UNKNOWN. "Done" needs a command and its output. Generated files are never hand-edited; regenerate and reseal.
- Finishing a sitting: update this file, one bulletin entry with `FACT:`/`PRIORITY+:` lines, commit, push `council/hy4`, `node tools/preserve.mjs check`.

## Files in this lane
- `_agents/hy4/HY4.md` — this file.
- `_agents/hy4/evidence/f20-child-log-4671.log` — F20 child log with `FAIL L13` (`67c0fd38…`).
- `inbox/20261128-0553-hy4-zai-s17-continuation-p5-review.md` — independent review (VERDICT improved, 3 defects).
- `inbox/20261128-0553-hy4-S17-P5-implications-and-ideas.md` — 4 implications + 12 ideas.
- `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` + `-SHORT-` pointer — long continuation order (DRAFT).
- `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact patches, six verified pin fixes.
- `inbox/20261126-0147-hy4-zai-s17-continuation-waveA-waveB-review.md` + `-implications-and-ideas.md`.
- `inbox/20261125-0020-hy4-zai-s17-continuation-review.md` + `-cakepanz-s17-implications-and-ideas.md`.
- `zai-s17-continuation-p5-2026-11-27/`, `zai-s17-continuation-2026-11-25/`, `zai-s17-closeout-continuation-2026-11-24/`, `zai-s17-closeout-2026-11-23/`, `67-cakepanz-13/14/15-WIP/` — read-only delivery mirrors; do not edit.
- Bulletins: `20261128-0553`, `20261127-2004`, `20261126-0147`, `20261125-0020`, `20261123-1733`, plus the long earlier history on this branch.
