# ERNIE — lane file (rewritten 2026-11-25 session end, v5)

## Identity
- **I AM ERNIE. Always speak as myself.** Everything I author carries `SPEAKER: ERNIE`. When I quote or review another seat's text, their name stays on the quote.
- **Seat:** ernie · **Model / how reached:** kimi-k3 (Kilo) · **State:** advisor
- **ID block:** S-ernie (submissions/reviews) · **First seen:** 2026-11-20
- **Strengths shown (evidence, not claims):** independent reviews of Z.ai's cakepanz-11/12/13/14 and the S15/S17 close-outs (each verdict from a command at my machine, never prose); re-ran the server core 27/27 and re-killed 5 mutants myself; found the S15 stale-manifest failure (364/1/0) and proved the one-command fix (365/0/0); found the S17 package clean (370/0/0) and the LEFT s1–s3 capture gap; broke the 6-seat "T8 blocked" deadlock by finding the bytes on disk; found the macOS `md5 -c` false-green by tamper.

## Current work
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base origin/council/base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **This session (2026-11-21 16:24Z → 2026-11-25 00:10Z) — the review/close-out session.**
  - **S15 close-out review** (`zai-s15-closeout-2026-11-21`): verdict **improved**. Re-ran `verify-package` → **364 OK / 1 FAILED / 0 missing, exit 1** (stale hand-over hash), proved the fix → **365/0/0 exit 0**; found the hand-over §3 overclaim (no step 13b, no F30/F31 logs), the stale `SHELL-STATUS`, the incomplete composite (step 12), the 3-capture side-by-side. Filed `inbox/20261121-1632-ernie-zai-s15-closeout-review.md` (commit `3b946d293`).
  - **Server core review** at `9c4ca0f`: verdict **improved**; re-ran **27/27**, `colors/` untouched, re-killed 5 mutants; 7 hardening items (run-cap false 429, synthetic-envelope derivation, `/api/stats` NFL-only, no CORS, D1 error string, contract 409/404 drift, pin drift). Filed `inbox/20261121-1649-ernie-server-account-sync-review.md` (commit `579556618`).
  - **Z.ai continuation prompt v1** (`…1705…`) and **v2 self-contained** (`…1132…`, commit `721b6dc8b`) — v2 folds in every seat's answers (fresh Verifier, B1 disagreement, Claude's 3 new commits, mutation harness, D2 consensus) and assumes Z.ai read nothing.
  - **Council ask answers** (`…1119…`, commit `5fea8779e`): A2/A3 hard delete + disclose the residual GitHub grant; D2 restrict shares to `kind:'run'` (Owner's "no hidden full save"); C5 `saveRevision`, not wall-clock.
  - **76Pancakes cutover ask** (`…1733…`, commit `bd79284c4`): ship-first; keep `GH` not `gh` (the manifest's default was backwards — `GH` has the lane + 75 commits); the ratings CSV is load-bearing (fixture reads it, so hide + 434/434 are mutually exclusive in a public repo); the seam golden `e8fed8ab` is a content hash (`releases.md:10`); commit-1/2 rename inconsistency.
  - **Located the clean-repo plan** (hy4's `1223` note + owner-notes 4 Nov + architect `1910` review + P-296): fresh repo, no history mirror, cutover when Colors v1 exists, Option A governance move, old repo read-only archive.
  - **S17 close-out review** (`zai-s17-closeout-2026-11-23`, hosted at `_agents/ernie/deliveries/`, commit `095f5cd71`): verdict **ok**. Re-ran `verify-package` → **370/0/0 exit 0**, dist hashes match `SHELL-STATUS`, 24 steps `EXIT_CODE=0` + `ACCEPTANCE RUN COMPLETE`, engine fence empty (69 files, `e9e6e01a…`), engine **430/430**, 41 side-by-side captures with 4 right-side verdicts all true. Five non-blocking findings: stale `START-OF-CHAT-ZAI` §2/`ZAI.md`, LEFT s1–s3 boot-state captures, `SHELL-STATUS` "STALE" labels, README top block, ratings CSV present. Filed `inbox/20261123-1738-ernie-zai-s17-closeout-review.md` (commit `898dd5472`).
  - **Claude predeployment plan assessment** (`…0807…`, commit `56e4e8f4e`): strong/receipt-driven; add a dataset seam (the clean repo can't build without the CSV), decide the old-repo privacy (private after go-live), name the `e8fed8ab` source, do M-0, fix keep-separate/delete propagation, make the data-gate identity a CI check.
- **This session (2026-11-25 00:14Z →) — host + review + brainstorm.**
  - **Hosted Z.ai's `zai-s17-closeout-continuation-2026-11-24`** read-only at `_agents/ernie/deliveries/zai-s17-closeout-continuation-2026-11-24/` (commit `9bf0225b7`): the Owner's desktop folder, `rsync --exclude=node_modules`, **779/779 non-node_modules checksums verified** against the artifact's own CHECKSUMS.txt; node_modules (88 MB) excluded + documented in HOST-NOTE. Pushed so any seat can read it.
  - **Review** (`inbox/20261125-0030-…continuation-review.md`, commit `d6ecf36fb`): verdict **ok**. Independently reproduced at node v26: verify-package **374/0/0 exit 0**, check-claims packaging **20 OK/0 RED**, full **23/2** (honest WIP — the 2 RED are the incomplete composite + unrefreshed node receipt), dist **4/4** match SHELL-STATUS, engine **430/430**, node **37/37**, side-by-side **41 captures / 82 met / 0 fallback / matrix complete**, non-vacuity IN CODE. The five S17 findings (F1–F5) are genuinely closed; acceptance composite is an honest WIP (steps 1–16 exit 0, stopped mid-13b); fresh independent Verifier still owed (I am a pre-fix reviewer).
  - **Brainstorm** (`_agents/ernie/deliveries/ernie-cakepanz-shell-innovation-brainstorm-2026-11-25.md` + `inbox/20261125-0045-…P-321…`): 10 shell-only, engine-safe items (A seam re-pin canary + golden VM-shape; B season-as-narrative; C needs×gone heat + confidence-in-wins; D team-takeover cross-fade + scoped foil; E dev-gated "coach's tape"), ranked, each bound to a real anchor; builds on Z.ai's backlog, adds the layer above it. Proposed P-321.
- **Blocked / waiting on:** nothing of mine. **Owed by others:** the Owner's four decisions (repo URL/org + LICENSE holder, ratings ruling/NOTICE, old-repo disposition, dist choice); MUSE's M-0 one-queue unification; the `e8fed8ab` source; Z.ai's fresh independent Verifier on S17.

## What the next session needs
1. **Read first:** `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` (+ `…0520…`), then the current architect state: `origin/architect/engine-and-seats:claude/NOW.md`, `inbox/20261122-1749-…DELTA-1.md`, `inbox/20261122-1830-…DELTA-2.md`, `claude/client-sync-module-2026-11-23.md`.
2. **The current Z.ai prompt is my v2** (`inbox/20261122-1132-ernie-TO-ZAI-continuation-prompt-v2-self-contained.md`); it is self-contained and supersedes v1.
3. **The S17 closeout continuation is hosted + reviewed** (verify-package 374/0/0, engine 430/430, node 37/37, claims packaging 20/0; the acceptance composite is an honest WIP — steps 1–16 exit 0, stopped mid-13b). Next gate: Z.ai's next session relaunches `bash scripts/acceptance-run.sh` at those bytes → COMPLETE, then a **fresh independent Verifier** (NOT me — I am a pre-fix reviewer), then the cutover (M-0, ratings ruling, `GH`/`gh`).

## Open questions
- **Where `e8fed8ab` comes from** — the seam golden is the stats-fields re-pin gate; no tracked file holds the full hash (U). MUSE/Z.ai to name the artifact.
- **Whether the clean repo is source-only until the ratings ruling** — I argue yes (the product build imports the CSV); a dataset seam is the product feature that would make it buildable.
- **Naming "documents" ambiguity** — repo docs other than the README: `76pancakes` or `76 Pancakes`? Owner to rule.
- **Is `free-agents-old-ratings.csv` in the hide?** Same fields/provenance; default to hiding unless the Owner rules otherwise.

## Live files in my lane (all on `council/ernie`)
- Reviews: `inbox/20261121-1632-…s15-closeout-review.md` · `…1649-…server-account-sync-review.md` · `inbox/20261123-1738-…s17-closeout-review.md`
- Prompts: `inbox/20261121-1705-…TO-ZAI-continuation-prompt.md` · `inbox/20261122-1132-…v2-self-contained.md`
- Council answers: `inbox/20261122-1119-…council-ask-open-questions.md` · `inbox/20261122-1733-…76pancakes-cutover-council-ask.md` · `inbox/20261124-0807-…claude-predeployment-plan-assessment.md`
- Deliveries: `_agents/ernie/deliveries/zai-s17-closeout-2026-11-23/` (677 files, hosted read-only) · `_agents/ernie/deliveries/zai-s15-closeout-2026-11-21/` (508 files, hosted read-only) · `_agents/ernie/deliveries/zai-s17-closeout-continuation-2026-11-24/` (781 files, hosted read-only, node_modules excluded, 779/779 verified) · `_agents/ernie/deliveries/ernie-cakepanz-shell-innovation-brainstorm-2026-11-25.md`

## Standing lessons
- **Re-run, never trust prose.** Every verdict I have filed came from a command at my machine; the receipt is in the text.
- **A "V" must cite a path that exists.** The S15 hand-over §3 claimed by-name deaths with no logs; a V without a path is not a V.
- **A law that cannot die is not a law.** Re-plant a mutant yourself before you believe a count; the S17 FF re-home and F24 crash classification are the model.
- **A receipt at changed bytes is not a receipt.** The S15 seal failed because a doc was edited 22 s after the manifest; the S17 run-4 receipt (368) and final seal (370) are correctly separated.
- **The clean repo ≠ a buildable product.** The data-gate fixes the tests, not the build; say so to the Owner.
- **Read the canonical reference first.** I twice reported items as open that were already locked (P-208, P-210) because I read a stale queue instead of `council/muse`.