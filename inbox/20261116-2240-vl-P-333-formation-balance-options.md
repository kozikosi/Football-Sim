SPEAKER: vl | ROLE: council | TASK: P-333 — propose options to close the 3-4/4-3 formation gap (KG picks; no implementation yet) | DATE: 2026-11-16T22:40:00Z
FOR: P-333

## What I measured (VERIFIED — I ran the commands; outputs quoted in full)

Harness: extracted the d3bd81d2 engine (`colors/src/sports/nfl/engine/{slots,flex,lineup}.ts`, `colors/src/core/hungarian.ts`) plus `colors/test/nfl/formation-gap.test.ts` to /tmp/peg, ran with `node --experimental-strip-types`. The formation-gap test builds a native roster for a base (every spot filled by its dest role; DL5 = DT or EDGE) and measures `lineupFor(ps, base).value - lineupFor(ps, other).value` — the cross-formation stand-in loss, in table units (1 point = 0.00254 wins over a 70→90 upgrade; ÷20 for per-OVR).

Baseline (d3bd81d2, 99-rule table):
- DL5=DT: 4-3→3-4 loses 2700; 3-4→4-3 loses 1800; gap 900 (= 0.1143 wins/season). Flexed placements: 4-3→3-4 = TE3←FB@6 (w50), DT2←OLB@6 (w300), SAM←TE@6 (w100); 3-4→4-3 = DL5←ILB@12 (w150).
- DL5=EDGE: both lose 1800; gap 0. Flexed: 4-3→3-4 = DT2←EDGE@6 (w300); 3-4→4-3 = DL5←ILB@12.
- Native roster worth 600250 in its own base either way (no within-base loss).

The dominant cost is the 4-3→3-4 DT2/ILB2 stand-in (OLB→ILB@6 into the 300-weight DT2 slot = 1800). The 3-4→4-3 side always pays one price (DL5←ILB@12 = 1800). To close the gap, reduce 2700 toward 1800 without pushing 4-3 below 3-4.

Correction to the prompt's figures: the prompt's "as measured" (4-3→3-4 = 2500, gap 700) equals my **FB>TE 6→2** option below — i.e. it pre-assumes FB>TE is already 2. On the actual current table (d3bd81d2, FB>TE=6) the gap is **900**, not 700.

## Measured options

All runs isolated (FLEX snapshotted/restored between runs). Gap = 4-3→3-4 minus 3-4→4-3; target 0.

**Option A — TE>OLB 6→2 (optionally with FB>TE 6→2).** Closest flex-based closure without over-correcting.
- TE>OLB 6→2 alone: 4-3→3-4 = 2300, gap 500 (0.0635 wins/season).
- TE>OLB 6→2 + FB>TE 6→2: 4-3→3-4 = 2100, gap 300 (0.0381 wins/season) — closest to 0 of any tier re-price I tested.
- Rules changed: TE>OLB (and FB>TE if combined). DIME trio untouched (stays 12); FB exception (DT/OT→FB at 0) untouched; cross-side floor (WR→CB/FS/SS/NICKEL/DIME at 6) untouched.
- Flexing frequency: TE>OLB cheaper → TE→OLB flexes (the SAM/OLB2 spot and league-wide TE flexing) become marginally more attractive; fixture flex count unchanged at 3 (4-3→3-4) / 1 (3-4→4-3). League-wide flex frequency (MUSE reports 145 spots across 32×2 bases — REPORTED, not reproducible here) would rise slightly for TE→OLB; I can't re-run MUSE's optimizer.
- Residual: leaves 300–500 gap; 4-3 still modestly disadvantaged.

**Option B — FB>TE 6→2 (the prompt's stated baseline; Option B's FB part).**
- 4-3→3-4 = 2500, gap 700 (0.0889 wins/season) — exactly the prompt's "as measured" numbers.
- Rules changed: FB>TE 6→2. DIME trio untouched (12); FB exception untouched; cross-side floor untouched.
- Flexing frequency: FB→TE marginally more attractive; fixture flex count unchanged at 3/1.
- Assessment: partial only. Moves in the right direction but leaves 700 of 900. Does NOT close the gap.

**Option C — Pin the DL5 role (Inkling's P-333 proposal; definition-level, zero table change).**
- DL5=EDGE: 4-3→3-4 = 1800, 3-4→4-3 = 1800, gap 0 (0.0000 wins/season). Exact closure.
- Rules changed: none in the flex table. Treats the asymmetry as a measurement artifact (DL5 role unpinned — the earlier measurement and lineup.test.ts natural() filled DL5 with a DT without saying so), not a flex-pricing problem.
- DIME trio, FB exception, cross-side floor all untouched.
- Flexing frequency: unchanged (gap cells' flex counts 3/1).
- Caveat: raises the Owner's open question (verbatim in _agents/owner-notes/2026-11-10-dl5-slot-defines-player-verbatim.txt): "does the slot define the player?" KG's intuition is that once drafted into DL5, a player is only a DL5. Option C is consistent with that but is a semantics/definition call, not an engine-math call, and it does not address whether 4-3 and 3-4 rosters are *structurally* even — only that the measured gap disappears when DL5's role is fixed.

## Assessment of Option B (P-332, shipping regardless)

P-332 (Owner decision 2026-11-10): TE>DIME 12→6, ILB>DIME 12→6, OLB>DIME 12→6, FB>TE 6→2; MUSE reported 4-3→3-4 drops 2700→2200, gap 900→400. I cannot reproduce that (build 97d7e9d is not in this worktree's history; VERIFIED via `git merge-base --is-ancestor 97d7e9d HEAD` → NO). On d3bd81d2 I measure FB>TE 6→2 → gap 700 (Option B above), and the DIME-trio changes do not affect the gap fixture (no DIME flex in any transposition cell). So by my measurement Option B leaves ~700 gap, not 400; the difference is the table state MUSE measured. Flagged honestly; MUSE's numbers are REPORTED, not reproducible from this seat.

## Recommendation for KG (a choice, not a pick)

- If you want the gap fully closed now: Option C (gap 0, zero table change) — but it hinges on the slot-vs-player ruling and is a definition fix.
- If you want a pure flex-table change that gets closest without over-correcting: Option A combined (TE>OLB 6→2 + FB>TE 6→2 → gap 300), accepting a small residual (0.038 wins/season).
- Option B alone (gap 700) does not close the gap; it is what the prompt's figures already assume.

No implementation until you pick. If you find a flaw in an option, file it as your own measurement — disagreement welcome.

## How to check
1. `git merge-base --is-ancestor 97d7e9d HEAD && echo YES || echo NO` → expect NO (MUSE's build not here).
2. Extract d3bd81d2 engine + formation-gap.test.ts; `node --experimental-strip-types test/nfl/formation-gap.test.ts` → baseline 900 / 0 (4 tests pass).
3. Apply a FLEX override, re-run the same four cells → the option gaps above (VERIFIED by me, reproducible).

Labels: baseline and all option gaps VERIFIED (commands run by me). MUSE's 145-spot flex count, 2700→2200/gap 400, and 97d7e9d measurements: REPORTED by Muse, not reproducible here. Prompt's 2500/1800/gap 700: equals my Option B, VERIFIED as such but not the current-table baseline (900).
