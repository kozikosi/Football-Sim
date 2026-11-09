# Council — remaining open work after P-309 (short)

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. Keep it small — this is a follow-up, not a new wave.

## What landed since the offload-testing prompt

**P-309 theta rerun — DONE by three seats (VL, VLOC, Super).** All three priced all 104 rules on the Colors engine (@ 2039c89). Headline (all three agree): the four proposed rules (RB>WR, TE>EDGE, TE>OT, DT>EDGE) price at 0 — the destination is more valuable than the natural spot. The theta grid is a lower bound; the −12 stands on positional fit. Files: `inbox/20261109-0328-vl-P-309-theta-rerun.md` (council/vl), `inbox/20261109-0332-vloc-P-309-theta-rerun.md` (council/vloc), `inbox/20261109-0332-super-P-309-theta-rerun.md` (council/super).

**VLOC filed P-307 and P-286 reviews** (both improved, same as MUSE). P-307 and P-286 each now have two reviews and need one more each.

## Still open — take these

1. **P-310 — flexeval re-run with the cache fix (highest priority).** The pick counts for the Owner's −2/−6/−12 table (fresh 607/117, tune 1253/282) were computed with the OLD pre-fix draft cache. Re-run `tools/mathlab/flexeval.mjs` on the built table (flex.json at tip 2039c89 or later) WITH the fix, on the same seeds (tune 1001-1016 + 3001-3016, fresh 4001-4016, measured weights), and report whether the counts moved. File as `inbox/<UTC>-<seat>-P-310-flexeval-rerun.md`. Run in a scratch tree; do not modify the architect branch. **Note: this does NOT block Claude.** His next work (theta pricing, guard passes, P-308) does not depend on it. It runs in parallel; if the counts move materially, report it as a finding.
2. **The flexengine.js check (status UNKNOWN).** Claude did not run it (needs playwright + the frozen Pre-Colors file). Run it and report the result. If it needs the frozen file, say where you got it from.
3. **P-276 — N=1000 baseline repro (decisive).** VL's repro is still in flight; OR and vloc are blocked on tooling (no deno). If you have deno, run the decisive N=1000 baseline repro. Do not tune against the two N=100 clusters until pinned at N=1000.
4. **Review bottleneck — one or two reviews each.** P-285 needs 1 more. P-288 needs 2 more. P-307 needs 1 more. P-286 needs 1 more. Read the existing reviews first (don't duplicate work); add your own verification, not a re-read.
5. **Super's P-309 grid — reconcile (small).** Super's grid is off by a factor of 20 — he used `slotWins20` as the slope instead of `slotWins20/20`, so his non-zero values are 20x too small (his QB>FS@90 θ1.0 = 1.22 vs VL/VLOC's 24.45). The four-rules-at-0 finding is robust (all three agree). Either Super re-runs with the corrected slope, or another seat verifies VL's/VLOC's grid is the correct one. This is a quick check, not a new build.

## Still open (from the offload prompt, lower priority)

P-289/P-293 (model-first lab), P-290 (reconciliation), P-292 (deno gap), P-296 (cutover readiness). Take these after the five above.

## House rules (reminder)

- Never assign work to a named agent. Work comes from `_agents/PRIORITIES.md`; take the top item you can do, or leave it.
- Only the Architect builds the product file. Do not touch it.
- Label everything: VERIFIED / REPORTED / INFERRED / UNKNOWN.
- File reviews in `inbox/<UTC>-<seat>-<ID>-<slug>.md`. Three different seats' ok/improved reviews = REVIEWED.
- Do not hardcode a wave number. Find the latest wave file by listing.
