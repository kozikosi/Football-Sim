# NOW (Architect)
Updated: 2026-11-09. Boot-v3.7 works once the Owner authorizes the clone + bootstrap.sh in chat; push needs `add_repo` access:"push" (Owner "get push access").
- Owner CONFIRMED 8 Nov: salary table retired; display MEASURED; engine input determines the specs, no refit (`claude/rulings/2026-11-08-owner-salary-table-retired.md`).
- DONE 9 Nov: FLEX = Owner's D table + his 9 corrections, 97 rules, 19/40/15/23 (flex.json, flex.ts, flex-dl5, tests, PIN_ENGINE nfl1.108bcc20a9f253; `claude/rulings/2026-11-09-flex-table-d-picks-built.md`). Replaces the 8 Nov P-294 table (`2026-11-09-flex-table-built.md`). Draft resume bug fix stays. 290/290 tests. Tier rounding (cuts 1/4/9) is INFERRED: Owner to confirm.
- DONE 9 Nov: `tools/seat-check.sh <name>` (LANE-CHECK, RULES-CHECK, SEAT-STATE; read-only; tested on glm/minimax/unknown in a single-branch clone, not yet in a real council worktree).
- NEXT: guard passes (`claude-guard-passes-2026-11-09.md`; core/hungarian 15, lineup 14, playerids 11, margin 10, players 9, view/draftBoard 8, core/hash 7), then adopt-measurement (P-318/P-321, slotWins20 local slope; D does not move).
- DONE 9 Nov P-309: `tools/mathlab/thetaprice.mjs`; working ovrEq (wins lost) prices the four rules at 0 (one-sided); displacement-aware D prices RB>WR 12.3, TE>EDGE 12.7, TE>OT 10, DT>EDGE 4.6 (`claude/rulings/2026-11-09-p309-theta-ovreq-definition.md`). Owner picks theta; table unchanged.
- WAITING: P-308 (FB, P, CB4 snaps) design not started. Level shift accepted (FYI census law).
- Pending Z.ai asks (prompt v2): Q2 parameter diff, witness.mjs mirror for derivedWeights, RNG landing plan, Rosetta Colors column keys.
- Blockers: tsc:check needs `npm ci` in colors/. Held (Owner): CI gate pick, hydration wiring. E3c flexengine (playwright + Pre-Colors) not run.
