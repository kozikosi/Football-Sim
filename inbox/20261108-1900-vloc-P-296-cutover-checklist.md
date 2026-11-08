# Council deliverable — P-296: Cutover readiness checklist (council-home Option A move prep)

REVIEW-OF: P-296 (MUSE 2026-11-08) — cutover readiness checklist for the Architect at cutover.
SEAT: vloc | DATE: 2026-11-08T19:00:00Z | STATUS: filed (not a review; deliverable checklist only)

## Scope
The cutover trigger is decided (a fully functioning Colors v1), and the council-home move is Option A (move whole into the fresh repo — unanimous). This checklist lets the Architect execute the move in one commit. Do NOT move anything yourself — the move is the Architect's at cutover.

## (a) Branch inventory — every council/* branch, tip, and unmerged-work status

Data: `git branch -r | grep council/` + `git log --oneline -1 <branch>` + `git ls-remote origin refs/heads/<branch>` vs local HEAD.

| Branch | Tip sha (short) | Tip message | Unmerged/local-only | Dirty worktree |
|---|---|---|---|---|
| council/base | 1b91f50e | council v8: no claims, derived queue, seat-run pruning, architect digest, ask/delegate | — | — |
| council/beam | 1593776a | beam: P-289 partial verification (witness gate MEASURED + raw-curve + triangulation) | — | — |
| council/boc | c1cd00a8 | BOC session end: lane rewrite | — | — |
| council/ds | d58bd13f | P-284: bias audit (fit vs validation), data-anchor tools, 60 answers, hypothesis ledger | — | — |
| council/dsd | 260ccf24 | P-125 review #3 (improved): insert point is sibling of #draftLive | — | — |
| council/fk | 1a9c6f40 | FK session end: P-204/P-205/P-206 NFL data compilation, lane rewrite | — | — |
| council/flint | a801a096 | Flint: session end — P-115 review VERDICT improved; Beam lab tools verified; VL flexweight fix verified | — | 452 dirty |
| council/gemini | 09ef6db7 | Claim P-195 acceptance tests review #2 | — | — |
| council/glm | 9b1c869e | glm session end: salary-weights verified+tested+reported, lane rewrite, bulletin | — | 4 dirty |
| council/glyph | 0c436d6d | pointer: proposals review for muse/claude | — | — |
| council/goc | 1f745f97 | admit goc: lane file (advisor; OpenChamber GOC) | — | — |
| council/gpt | db980a10 | Council: sort Owner's 25 Oct notes into 38 PRIORITIES rows… | — | — |
| council/grok | db980a10 | Council: sort Owner's 25 Oct notes into 38 PRIORITIES rows… | — | — |
| council/mimo | 4d22cad2 | MIMO session: response to Owner discussion prompt (5 Nov) + bulletin entry | — | 1 dirty, 2 unpushed |
| council/minimax-lane | 68b4dda5 | council record: the MiniMax lane - the team-colour build… | — | — |
| council/muse | bea7179f | P-285 review: w85 VERDICT improved… + w85 adapter for the w77 battery | — | — |
| council/or | 77b716db | OR: review P-108 game preview graphics redesign (VERDICT: improved) | — | 22 dirty, 1 unpushed |
| council/owner-direction-2026-10-21 | c95dd779 | Add aesthetics/beauty section (P7) + council notes (P8) to V22-Suggestions.md | — | — |
| council/pickle | 991fbcf2 | pickle: bulletin + lane update for the Owner-weight verification and bias-method round (P-013) | — | — |
| council/q | 3f92deda | admit q: lane file (advisor; Qwen3.7 via sandboxed code interpreter) | — | 1831 dirty |
| council/super | 59d91afc | super: second review of P-290 reconciliation (VERDICT: improved) | — | 26 dirty |
| council/uk | 10fd2b0a | Update UK lane file: add P-194 review | — | — |
| council/ultra | 61f50436 | Update lane file: P-002 review completed | — | — |
| council/vl | 836fb490 | vl: session end — P-285/E-207/P-115 reviews delivered, P-276 deno blocker filed | 1 unpushed | — |
| council/vloc | 435a4e07 | vloc session end: P-289 review filed, lane + bulletin updated | — | — (pushed, ls-verified) |
| council/zai | 25e3b2f9 | add w55: Football-Sim-Z-post-blue-w55.html + wave55 package | — | — |
| council/GH | d7a05a27 | Review of the Next.js port + engine purity guard for Colors | — | 2 dirty |
| council/owner-direction-2026-10-21 | c95dd779 | Add aesthetics/beauty section (P7) + council notes (P8) | — | — |

Notes:
- **Local-only / unpushed commits:** council/vl (1 unpushed), council/vloc (just pushed, clean), council/mimo (2 unpushed), council/or (1 unpushed), council/glm (1 unpushed). These must be pushed before cutover or the work is lost.
- **Dirty worktrees (uncommitted):** council/flint (452), council/q (1831), council/super (26), council/or (22), council/glm (4), council/mimo (1), council/GH (2). These seats' work exists only on disk and is not protected by a commit — highest risk of loss at cutover.
- **Branches to avoid merging:** council/gpt and council/grok share the same tip (db980a10) — duplicates, likely one should be retired.
- **council/owner-direction-2026-10-21:** Owner-direction branch, likely should not be part of the council move.

## (b) Open-P-row snapshot — P-rows that must cross over

Source: origin/council/muse:_agents/PRIORITIES.md (sha256 d83238d0bc5f59f2e9ce09ac4206cf6cd332e7fea2df6441aabe5e81fd938cf2, 191 lines).

Live P-items (P-285..P-298):
- **P-285 (P1)** — w85 live wave review: 4+ reviews (vloc, beam, vl, super, muse). DONE.
- **P-286 (P1)** — 67 Cakepanz Slice 1 review: BLOCKED (waiting for Z.ai to land Slice 1).
- **P-287 (P1)** — Slices 2–5 review: BLOCKED (waiting for slices).
- **P-288 (P1)** — Claude's guard passes + FITTED-label test + Q4 parameter diff: need to verify each as they land.
- **P-289 (P1)** — model-first lab verification: beam filed partial (witness gate + raw-curve + triangulation), vloc reviewed (ok). T1 ladder, holdout law, Kicker FG audit BLOCKED on Z.ai's v7 prompt. witness.mjs gap noted (tool absent from pushed repo).
- **P-290 (P2)** — reconciliation: vloc filed report (margin-histogram defect confirmed 95.76%, tsc-baseline ratchet reconciled, 112-game hash partially reconciled). super filed second review (improved).
- **P-291 (P2)** — tree-comparison harness: OPEN (no filings yet).
- **P-292 (P2)** — deno gap / Node Lab runner: BLOCKED (waiting for Z.ai's Node runner).
- **P-293 (P1)** — model-first weights finalization: BLOCKED (waiting for Z.ai's model-first program).
- **P-294 (P1)** — flex re-derivation: OPEN (needs Z.ai's theta pricing grid; HOLD on flex.json/FLEX/slots.ts/design.json stands).
- **P-295 (P2)** — CI-gate verification (N=100): OPEN (no filings yet).
- **P-296 (P2)** — cutover readiness checklist: this file.
- **P-297 (P2)** — N1 exhibit help: OPEN (no filings yet).
- **P-298 (P2)** — page-background fix verification: BLOCKED (waiting for Claude to land it).

Existing queue items needing reviews (from architect-branch `next` output — verify against live queue):
- P-016 (P1): 3 done
- P-047 (P1): 2 done (OR + vl)
- P-059 (P1): 1 done (vl)
- P-060 (P1): 1 done (vl)
- P-061 (P1): 1 done (vl)
- P-062 (P1): 2 done (Beam + vl)

## (c) Inbox/bulletin move plan — reconciling Pickle's narrower split vs VL/OR's broader move

**Pickle's narrower split (from council/pickle:ffccf79b):**
- inbox/ open items only cross over
- bulletin/ starts empty
- one-commit inauguration receipt
- "no row crosses unowned"
- 3-line verification receipt

**VL/OR's broader move:** (from their lane files / innovation summaries) — broader scope including lane files, notes, deliveries, discrepancy registers.

**Reconciliation recommendation:**
1. **inbox/:** Move open P-item review files only (items with status not terminal). Closed/RETIRED items stay in _archive/.
2. **bulletin/:** Start empty at cutover (Pickle's approach). Seats' bulletin entries from before cutover are historical — archive them, don't move.
3. **Lane files (_agents/<seat>/):** Each seat's lane file is that seat's record — move as-is (they're per-seat, no conflicts).
4. **One-commit inauguration receipt:** The Architect's cutover commit includes sha256 of PRIORITIES.md + git ls-remote output + `node tools/council.mjs board` output.
5. **"No row crosses unowned":** no P-item changes state during the cutover commit; states are snapshotted as-is.

## (d) Verification receipt

The cutover commit must include:
1. `sha256sum` of PRIORITIES.md (currently d83238d0bc5f59f2e9ce09ac4206cf6cd332e7fea2df6441aabe5e81fd938cf2)
2. `git ls-remote origin` output (all refs)
3. `node tools/council.mjs board` output (review chain state)
4. Confirmation that every seat's unpushed commits (vl, mimo, or, glm) have been pushed or explicitly abandoned

## Items the Architect must NOT do in the cutover commit
- Do not change any P-item state (no transitions to BUILT/SUPERSEDED/REVIEWED)
- Do not edit PRIORITIES.md content
- Do not move anything the seat hasn't committed and pushed
- Do not delete any branch without the Owner's instruction

## Deliverable
This file: `inbox/20261108-1900-vloc-P-296-cutover-checklist.md`. Ready for the Architect at cutover.
