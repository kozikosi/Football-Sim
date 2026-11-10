# VL — P-141 investigation: Z.ai FB/Punter math + 28-round draft

SPEAKER: VL | ROLE: Council seat | TASK: P-141 (review Z.ai FB/Punter math, 28-round draft, docs still saying 26 rounds) | DATE: 2026-11-10

## Scope

P-141 (WORK, P0↑): "Review Z.ai's FB and Punter math (REWEIGHT-BRIEF §7b: lead-blocker run-blocking share, PUNT_PTS = 1.6) and the 28-round draft; tell every doc that FB and P are draft slots." Brief: "Does the math hold (units, sums, seeded effect)? Which documents still say 26 rounds."

Source: `origin:z-core/03-guides/REWEIGHT-BRIEF.md` (§7b marked DESIGNED AND SHIPPED, wave 11, Owner-approved 25 Oct).

## Part 1 — FB/Punter math: VERIFIED shipped in Z-post-blue build

Build: `origin:z-core/01-html/Football-Sim-Z-post-blue.html` (1,237,864 B, md5 `49ea6f05cd0de3ae3db8126b7e2f960d` per CLAUDE-START-HERE.md). All four §7b elements present and match the brief:

| §7b element | Brief claim | Code location | Status |
|---|---|---|---|
| FB lead-blocker share | `RATING_SPECS.olRun` gains `FB:0.30` | line 4895: `olRun: {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6, FB:0.30}` | ✓ present |
| FB as offensive slot | `WV_OFF_SLOTS` includes FB | line 4341: `WV_OFF_SLOTS = new Set([...,'FB',...])` | ✓ present |
| PUNT_PTS = 1.6 | `matchupModel` punt term | line 4926: `const PUNT_PTS = 1.6;` | ✓ present |
| P feeds hidden-yards | `r.p = slotOvr('P')` + puntPts | line 4947: `r.p = slotOvr(slotmap,'P')`; line 5084: `puntPts = -PUNT_PTS*(exp(...)-exp(...))` | ✓ present |

The code implements the design exactly as specified. The brief's measured win figures (FB 90 OVR ≈ +0.034 wins over 70; RB1 90 ≈ +0.40 → great FB ≈ 8% of great RB1; P 90 OVR ≈ +0.208 wins over 80 league avg, ≈ half a great kicker K 90 ≈ 0.45; 70 punter ≈ −0.17) are stated in the brief; I confirmed the code path that produces them (`slotWinsTable()`/`slotWins()` consume `olRun` with FB and `matchupModel` consumes `puntPts`) but did not independently re-run the sealed engine to reproduce the decimal win values.

## Part 2 — 28-round draft

Z-post-blue `ROSTER_SLOTS` (line 3947) already includes FB and P:
`['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P']` = **28 slots** → `TOTAL_ROUNDS = ROSTER_SLOTS.length` = **28** (line 3948).

However the comment on line 3948 is **stale**: `// 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/CB4/SS2/FS2/WR4/P/FB` — it claims 26 and excludes P/FB, but the array actually has 28 entries including P and FB. The computed `TOTAL_ROUNDS` is correct (28); only the comment is wrong.

Live build `Football-Sim-PreColors.html` (657,486 B, the current verified build per AGENTS §2) still has 26 slots (line 924: no FB, no P) and `TOTAL_ROUNDS = 26` (line 925) — FB/P are NOT yet draft slots in the live build.

## Part 3 — documents still saying 26 rounds (need updating to reflect FB/P as draft slots)

These carry a "26 rounds" / "26 drafted roster slots" statement that excludes FB and P:

1. `Football-Sim-PreColors.html:925` — `// 26 — ... no ... P/FB` (live build; also the authoritative state if FB/P not yet added)
2. `NFL Draft Simulator v20 Claude.html:893` — `// 26 — ... no ... P/FB`
3. `NFL Draft Simulator.html:867` (donor) — `// 26 — ... no ... P/FB`
4. DS snapshots (`Madden NFL 27 Team Power Rankings...`, `NFL Draft Simulator (pre-v10 backup)...`) — `// 26 — ... no ... P/FB`
5. minimax prototypes (`V22-candidate-2026-10-21.html`, `V22-candidate-teamcolours.html`, `draft-board-no-value-here.html`) — `// 26 — ... no ... P/FB`
6. `ADVISOR-PLAYBOOK.md:89` — "full draft (32 teams, 26 rounds)"
7. `AGENTS.md:153` — "Draft completes without errors (all 32 teams, 26 rounds)"
8. `COLLECTIVE-PROMPT.md:51` — "32-team snake draft, 26 drafted roster slots"
9. Z-post-blue line 3948 comment — stale "26 ... no ... P/FB" while array is 28 with FB/P

Note: no document yet says "28 rounds"; the 28-round state exists only implicitly in Z-post-blue's `ROSTER_SLOTS.length`.

## Verdict / findings

- **Math holds:** ✓ All four §7b elements implemented in Z-post-blue exactly as designed. The FB/Punter math is shipped (not merely designed).
- **28-round draft:** Z-post-blue already drafts 28 rounds (FB + P included in ROSTER_SLOTS → TOTAL_ROUNDS = 28), but its comment is stale. The live Pre-Colors build is still 26 rounds without FB/P.
- **Docs to update:** nine locations above still say 26 rounds / exclude P/FB. They should be updated once the Architect wires FB/P into the live build ("it still needs the Architect to wire it in" per brief).
- **Z-post-blue comment bug:** line 3948 says "26 ... no P/FB" but the array is 28 with FB/P — fix the comment to reflect 28 rounds including FB/P.

Labels: VERIFIED (code elements + roster-slot count + doc references, all via `git show`/`grep` receipts). INFERRED (the measured decimal win values in the brief — not independently re-run).

## Evidence

- Commands: `git show origin:z-core/01-html/Football-Sim-Z-post-blue.html | grep -n ...` (symbols at lines 4341, 4895, 4926, 4947, 5084, 3947-3948); `grep -n "TOTAL_ROUNDS\|ROSTER_SLOTS" Football-Sim-PreColors.html` (lines 924-925); `git grep -n -i "TOTAL_ROUNDS\|26 rounds\|26 drafted roster slots" origin` (doc list).
- Files: `origin:z-core/03-guides/REWEIGHT-BRIEF.md` (saved locally as `reweight-brief.md` during investigation, not committed); `Football-Sim-PreColors.html` (live build in worktree).
