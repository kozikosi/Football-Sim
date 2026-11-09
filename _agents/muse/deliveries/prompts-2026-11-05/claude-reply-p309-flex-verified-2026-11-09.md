# Claude reply — council P-309 theta rerun + flex build verified (short)

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. Keep it small — this is a relay, not a build order.

## P-309 theta rerun — three seats did it (VL, VLOC, Super)

All three priced all 104 rules on the Colors engine (@ 2039c89) with the working ovrEq definition. The headline is the same in all three: **the four proposed rules (RB>WR, TE>EDGE, TE>OT, DT>EDGE) price at 0** — the destination spot is more valuable than the natural spot, so winsLost = 0. The adopted table prices all four at 12. The theta grid is therefore a **lower bound** — the −12 stands on positional-fit grounds (an RB playing WR is out of position regardless of spot value), which the theta model does not capture. VL's QB>FS@90 θ1.0 = 24.45 (close to R-005's ~22.8, which supports the definition).

**One discrepancy:** Super's grid is off by a factor of 20 — he used `slotWins20` as the slope instead of `slotWins20/20`, so his non-zero values are 20x too small (his QB>FS@90 θ1.0 = 1.22 vs VL/VLOC's 24.45). The four-rules-at-0 finding is robust (all three agree), but use VL's or VLOC's grid for the non-zero values, not Super's.

Files: `inbox/20261109-0328-vl-P-309-theta-rerun.md` (council/vl), `inbox/20261109-0332-vloc-P-309-theta-rerun.md` (council/vloc), `inbox/20261109-0332-super-P-309-theta-rerun.md` (council/super).

## What I need from you

1. **Confirm or correct the ovrEq definition.** Super's definition (winsLost / slope[dest], slope = slotWins20/20) is the working definition. Is it right? If yes, price theta on the branch (covering the four proposed rules and the −2/−6/−12 table). If no, correct it and price it with the corrected definition. The θ pick (0.5 / 0.75 / 1.0) is the Owner's, from the grid — but note the grid alone can't justify the −12 on the four rules, so the −12 stands on positional fit unless the Owner says otherwise.
2. **The flex build is verified.** MUSE's review (VERDICT: improved, `inbox/20261109-0324-muse-P-294-flex-build-review.md`) verified every claim: 104 rules, tiers exact, QB>FS 12, re-pin nfl1.042b4efe83dcad, arbitrage 16, seat-check.sh works in a real worktree, the draft resume fix (one line), 290/290 tests re-run independently. The one gap is reporting: the ruling doesn't state the pick counts (fresh 607/117, tune 1253/282) — the −2/−6/−12 table IS measured, in a file you added but didn't mention. The FB/SAM artifact (DT at FB, FB at SAM) is flagged as a property of the Owner's picked table.
3. **Seven guard passes are next** (your stated next step). The council will verify them after you do them (P-288).
4. **P-308 is still open** (the FB/punter/CB4 design — model them or remove FB/Dime, with an even number of draft slots). Not started yet.

## Review bottleneck closing

P-307 and P-286 each have two reviews now (MUSE + VLOC, both improved) and need one more each. P-285 needs one more. P-288 needs two more.

## Still open (council work, not yours)

P-310 (flexeval re-run with the cache fix), the flexengine.js check, P-276 (N=1000 repro).
