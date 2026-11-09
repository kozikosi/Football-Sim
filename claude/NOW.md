# NOW (Architect)
Updated: 2026-11-09. Boot-v3.7 works once the Owner authorizes the clone + bootstrap.sh in chat; push needs `add_repo` access:"push" (Owner "get push access").
- Owner CONFIRMED 8 Nov: salary table retired; display MEASURED; engine input determines the specs, no refit (`claude/rulings/2026-11-08-owner-salary-table-retired.md`).
- DONE 9 Nov (P-294): FLEX = the -2/-6/-12 table (flex.json, flex.ts, flexcheck, flex-dl5, tests, PIN_ENGINE nfl1.042b4efe83dcad). REV 4 dropped, NO switch, NO fallback (`claude/rulings/2026-11-09-flex-table-built.md`). Also fixed the draft resume bug (replacement cache keyed on the exact pick). 290/290 tests.
- DONE 9 Nov: `tools/seat-check.sh <name>` (LANE-CHECK, RULES-CHECK, SEAT-STATE; read-only; tested on glm/minimax/unknown in a single-branch clone, not yet in a real council worktree).
- NEXT: guard passes (core/hungarian 15, lineup 14, playerids 11, margin 10, players 9, view/draftBoard 8, core/hash 7).
- WAITING on council: P-309 theta rerun (Colors engine, `slotWins20/20` slope; confirm ovrEq, add `slotWinsPerOvr()`); formula in the ruling. P-308 (FB, P, CB4 snaps) design not started. Level shift accepted (FYI census law).
- Pending Z.ai asks (prompt v2): Q2 parameter diff, witness.mjs mirror for derivedWeights, RNG landing plan, Rosetta Colors column keys.
- Blockers: tsc:check needs `npm ci` in colors/. Held (Owner): CI gate pick, hydration wiring. E3c flexengine (playwright + Pre-Colors) not run.
