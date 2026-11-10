# NOW (Architect)
Updated: 2026-11-10. Boot-v3.8: Owner authorizes clone + bootstrap in chat; push needs `add_repo` access:"push" once (Owner "get push access").
- Owner CONFIRMED 8 Nov: salary table retired; display MEASURED; engine input determines the specs, no refit (`claude/rulings/2026-11-08-owner-salary-table-retired.md`).
- DONE 10 Nov (97d7e9d): flex floor + TE/ILB/OLB>FS items; 99 rules {0:23,2:10,6:43,12:23}, Owner ACCEPTED (`claude/rulings/2026-11-10-flex-floor-accepted.md`). Council P-323 re-pins PIN_ENGINE and the 3-4 lineup test (2400 there now; engine gives 2700 with DL5=DT).
- DONE 10 Nov: DL5 PINNED (`colors/test/nfl/formation-gap.test.ts`, run alone 4/4, suite NOT run): DL5=DT gap 900 (2700 vs 1800); DL5=EDGE gap 0 (1800/1800). DL5 = blitz/heavy-set starter, natural DT or EDGE.
- DONE 10 Nov: `flexderive.mjs` (Inkling P-322, read-only) reproduces MUSE 88/99, 93 with `--floor 6`. Inkling's elite-line rule as written never fires. Re-run with `--d <new table>` when P-321 lands.
- DONE 10 Nov: OWN DESIGN `tools/mathlab/flexgates.mjs` + `sport-football*.json`, note `results/flexgates-design-2026-11-10.md`. Does NOT beat the baselines on fit: pre-registered v1 70/99, post-hoc v2 80/99 (CV 65/70, leave-one-role-out 61/67). VERIFIED: D@90 = a value guard `20*(1-w_src/w_dst)` from slot weights alone (97/97 within 2 OVR); C>OT and TE>OT (2 of ZAI-D1's 4 misses) are guard rows. Support (which flexes exist) not derivable (80% vs 68% baseline). Rooms/sides, bottleneck-max tested and rejected.
- HELD (Owner 10 Nov): Option B (TE/ILB/OLB>DIME 12 to 6, FB>TE 6 to 2) NOT landed. Design is design-only: no engine, flex.json or flex.ts change.
- NEXT: Owner reply on direction. Proposed: guard under ZAI-D1 duties (`G + L`); leave-one-role-out on ZAI-D1 and Inkling; then guard passes (`claude-guard-passes-2026-11-09.md`), then adopt-measurement (P-318/P-321).
- DONE 9 Nov: `tools/seat-check.sh <name>`; P-309 `tools/mathlab/thetaprice.mjs` (Owner picks theta; table unchanged).
- WAITING: P-308 (FB, P, CB4 snaps) design not started. Pending Z.ai asks (prompt v2): Q2 parameter diff, witness.mjs mirror, RNG landing plan, Rosetta Colors column keys.
- Blockers: tsc:check needs `npm ci` in colors/. Held (Owner): CI gate pick, hydration wiring. E3c flexengine (playwright + Pre-Colors) not run.
