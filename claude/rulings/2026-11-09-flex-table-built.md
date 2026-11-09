# Flex table -2 / -6 / -12 built (P-294), 9 Nov 2026

## Direction (REPORTED)
Owner 8 Nov: every former -10 is -12, every -4 is -6, -2 unchanged. Muse relay 9 Nov: P-294 REVIEWED (three independent reproductions, zero diffs); the pick is the new table only: "new table, forget the old table". REV 4 (29 Oct) is DROPPED: no fallback and no model|owner switch. The switch idea in `2026-11-08-p294-flex-model-first-evidence.md` section 5 is void.

## Built (VERIFIED: `npm test` 290/290 in colors/)
- `tools/mathlab/flex.json` = the new table: 104 rules, tiers {0: 14, 2: 16, 6: 18, 12: 56}. Base = Owner 7 Nov working version (candidate file, defaults of its 7 open items) + CB>WR, TE>WR; all rules of 6+ became 12, then every 4 became 6. QB>FS 12 (QB flexes only to FS).
- `colors/src/sports/nfl/engine/flex.ts` FLEX = typed copy; test compares it with flex.json rule by rule. `flex-dl5.json` re-derived (FB 12, TE 12, OT 6, OG 6, C 6, ILB 12, OLB 12).
- `flexcheck.mjs`: allows only 0/2/6/12, drops the REV 4 diff. `run-all.sh`: E3a (parse of the REV 2 Owner text) removed, the text no longer describes the table.
- Tests changed on purpose: flex tiers and pins (EDGE>OLB 2, TE>RB 6, P>K 12, QB>FS 12, RB>WR 12, C>OG 6, OT>RB emergency); arbitrage count pin 12 -> 16 (two -2 hops undercut a -12 rule; a player takes one spot so it is never played); base-totals test (see below); `PIN_ENGINE` nfl1.0e237387b2647f -> nfl1.042b4efe83dcad.

## Things the Owner should know
1. Base totals, 4-3 natives in the 3-4: the lineup is now 1850 lower; the OLB takes MIKE (-2), a spare DT plays FB (-2) and the natural FB plays SAM (-12). Cause: every lineman may play FB at -2 in the 7 Nov working version (FB: 2 rules) while FB>OLB is 12. Legal under the table, odd to look at.
2. A real bug found by C2 (draft crash recovery): `replacement()` in `draft.ts` cached the replacement level by pick phase (`pos - replAt < 6`), state the save log does not hold. A draft resumed at pick 600 diverged at pick 621 (CPU pick of team 19). Fixed: the cache is keyed on the exact pick (`pos === replAt`), so the value is a pure function of the state at that pick. No other test moved. It was latent before this table; the 12-tiers made one near-tie hit it. The evidence counts (flexeval) were computed with the old cache; they are statistical and not expected to move materially, not re-run.
3. Unchanged from the evidence ruling: 10/12 exceed the -8 emergency fallback (a listed move costs more than an unlisted one); the wins effect of the table is UNKNOWN (counts only).
4. Not run: `run-all.sh` E3c (`flexengine.js`, needs playwright and the frozen Pre-Colors HTML); it reads flex.json and may need its Owner-guide assertions revisited. UNKNOWN.

## Open from the relay (not built)
- Theta (P-309): the council reruns it on the Colors engine with `slotWins20/20` as the slope. The formula (Z.ai R-005 part 3): P(a>b, ovr) = clamp(round2(theta x ovrEq(a>b, ovr)), 0, 30), theta in {0.5, 0.75, 1.0}. ovrEq in this relay is Super's definition (wins lost / destination slope): sound as a first-order conversion but a council seat's definition, not the Owner's. When P-309 lands: confirm or correct the definition, then price theta here. The Colors engine has NO `slotWinsPerOvr()`; add it or use `slotWins20/20`.
- P-308 (model FB, P, CB4 in game detail: punters play every game, FB and CB4 about 10% of snaps; or remove FB / Dime / WR4 / punters; draft slots must be an even number): design question, not started. 
- Level shift accepted (no fallback players, every spot filled from the expanded pool, win line not re-anchored): FYI for the census law.
