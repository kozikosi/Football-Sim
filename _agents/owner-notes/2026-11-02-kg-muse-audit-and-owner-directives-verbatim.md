SPEAKER: Owner relay (message headed "To Claude — from KG") | TASK: MUSE seat engine audit + Owner directives | DATE: 2026-11-02 (HST)
Verbatim, saved by the Architect per AGENTS.md §5(4). Labels: the audit findings are REPORTED (two reviewers each, per KG) until re-measured by the Architect.

To Claude — from KG. The MUSE seat's engine audit is complete. All findings independently reviewed.
P0 — Engine fixes:

1. DB run-support weights inverted (`specs.ts`). Verified in source by two reviewers: `frontRun` CB1 (0.70) > CB2 (0.51) > FS (0.48) > SS (0.34); same in `frontBase`; in `frontNick` SS rises to 0.51 but CB1 (0.70) still leads. Conventional: SS > FS > CB. Fix: reorder to SS > FS > CB1 > CB2.
2. softCap zeroes out run defenders vs good+ run games (`matchup.ts:83`). Applied to NET unit strength — once the offense saturates, defensive derivative → 0. MIKE 80→99: 19.6 yds saved vs average run O, 2.8 vs good, 0.3 vs strong, 0.0 vs elite. Fix: cap the offensive term only, or restructure so defense always matters.
3. Dead terms (`drives.ts`). `structPts` includes `puntPts`, `retPts`, `qbRun`, `wrBlk`; `ptsOf` ignores them in regulation. P 80→99: −0.12 realized vs +0.57 modeled. OT uses `structPts` (live), regulation uses `ptsOf` (dead). `wpFrom` off ~1.2pp. Fix: wire the four terms into `ptsOf` or remove from `structPts` — regulation and OT must agree.
4. No late-game play-calling (`drives.ts`). Beam measured 67,427 nflverse plays (2023–2024): trailing by 9+ in Q4 drops run share to 0.20, leading by 17+ raises it to 0.72. The engine has no score-and-clock adjustment — teams run base identity all game. Beam proposed a `k(scoreDiff, quarter)` multiplier on the run/pass ratio, gated to Q4 and |scoreDiff| ≥ 4. Details in beam's E-209 inbox file on `council/beam`.

P1:

5. Focus dial nearly decorative (`plans.ts`). "Focus: pass" vs elite pass O: 1.9 yds saved, slightly MORE points allowed. Strengthen or confirm intentional.
6. Review system — retry implementation. Continuous-trust (no min/max, no double-reviews, verdicts survive, soft-cap at 8, 10% governor) into `_agents/COUNCIL.md` and `tools/council.mjs`.
7. 3-4 formation weights — Owner directives (supersede Oct 29 provisional):
   * ILB2 = DT2 (300). 3-4/4-3 becomes a pure personnel decision.
   * SAM = OLB2 (30). Same position across formations, same weight. The "OLB2 equal with DT2" ruling is dead.

P-217 (Owner decision): pin the dataset, not the engine. Saved seasons finish with their original player datatable. Engine math changes don't affect in-progress seasons. New seasons use the new datatable. Mid-season weight pushes don't touch active seasons.
Minor:

8. `lineup.ts` NOTE is stale (pre-Oct-29 3-4 mapping). Doc fix.
9. `tools/council.mjs` picks alphabetically-first `architect/*` branch. Prefer `engine-and-seats` explicitly.

Already queued: P-214 (E3b, unblocks Z.ai), P-216 (mint `data/player-ids.csv`).
Full details in the MUSE seat's inbox files on `council/muse`, plus beam's E-209 on `council/beam`.

---
Owner message wrapper (same turn): "Read claude/00-READ-FIRST.md first, and do its section 0 ... Then do the next work package."

ARCHITECT NOTE (not Owner words): the two OWNER DIRECTIVES in this relay are item 7 (ILB2 = DT2 = 300; SAM = OLB2 = 30, supersedes the 29 Oct provisional "3-4 OLB2 = DT2") and P-217 (pin the dataset, not the engine). Everything else is audit findings to verify.
