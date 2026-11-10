# Council prompt — Derivation designs, DL5, and open work (2026-11-10)

## State (read this first)

- **Claude timed out while thinking** about his own derivation design. The Architect's derivation work is paused. The council and Z.ai carry the derivation design work now.
- **P-323 is formally REVIEWED** (Owner declared it, 2026-11-10). MUSE + Inkling verified the `97d7e9d` build (99 rules, suite 290/288/2). Done.
- **Option B is HELD.** Claude prototyped the derivation instead of landing Option B (per the Owner's direction). Do not land Option B. The Owner decides after seeing the derivation.
- **The derivation prototype works.** MUSE ran Inkling's P-322 formula against the live 99-rule table: **88 exact, 11 off by one, 0 hard**. Claude independently implemented it and got the **same numbers**. With the cross-side floor added as a term: **93/99**. With re-fit cut points (1.5, 4, 9): **96/99** (candidate, fit on one table — treat with care). Scripts: MUSE's `_agents/muse/deliveries/derive-prototype-2026-11-10.py`, Claude's `tools/mathlab/flexderive.mjs` (architect `678bb06`).
- **The DL5 pin is done.** Claude added `colors/test/nfl/formation-gap.test.ts` (4/4 pass): gap is **900 with DL5=DT, 0 with DL5=EDGE**. The DL5 role is now pinned in the test.
- **The DL5 reframing (Owner, 2026-11-10):** DL5 is a player who comes in for **blitzes and heavier defensive sets**, not a rotational substitute for a DT or EDGE — and since there are no injuries in the sim, **all players are starters**, even if DL5 does not play every snap. This bears on the flex-dl5 derivation and the formation-gap measurement.
- **Slice 5 is delivered and reviewed by MUSE** (VERDICT improved, `inbox/20261110-0515-muse-P-287-slice5-review.md`): engine pin byte-identical to `4ca9a071`, P-324 caption fix landed, Slice 3 README 12→17 landed, battery 75/0/10/3 (REPORTED). It needs **two more seats** for REVIEWED.

## Work to take (pick one — do not do all of these in one chat)

### A. Design your own derivation (the main new work)

Do not just verify or extend Inkling's formula. **Design your own.** Think independently about what skills matter, how they combine into a price, what the cut points should be, and how your formula handles the hard cases (the 6 Inkling residuals: CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL — owner 0, model 2; the cross-side floor: WR>DB at 6; the DL5 reframing). Implement your formula as a script, run it against the live 99-rule table (read it from `origin/architect/engine-and-seats:tools/mathlab/flex.json`, commit `97d7e9d`), and report exact/off-by-one/hard. Compare against Inkling's 88/99 (93/99 with floor). Does yours beat it? If not, say why yours is still worth considering (simpler, fewer constants, more principled). File as `inbox/<UTC>-<seat>-P-322-derivation-design.md`. **Push often** — commit and push after every finished file/task, not just at session end. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.

### B. Verify MUSE's and Claude's prototype runs (independent recheck)

Re-run the derivation prototype independently — do not just re-run MUSE's or Claude's script. Implement Inkling's P-322 formula yourself (from Inkling's design file), read the live 99-rule flex.json from `origin/architect/engine-and-seats` (`97d7e9d`), and compare rule by rule. Confirm or correct: exact 88, off-by-one 11, hard 0. Confirm the 11 residuals are exactly the 5 floor rules + the 6 Inkling residuals. If your numbers differ, say so with the differing rules. File as `inbox/<UTC>-<seat>-P-322-derivation-verify.md`. **Push often** (as above).

### C. Add the floor term and re-run

Extend the derivation with the cross-side floor as a term: if a rule is cross-side (offense to defense or defense to offense) and the formula's price is below 6, raise it to 6 — except flexes into FB, which stay free. (The floor is a minimum, not a cap: 6 stays 6, 12 stays 12.) Re-run against the live 99-rule table. MUSE and Claude both predict the fit becomes **93/99 exact, 6 off-by-one-tier, 0 hard**. Confirm or correct that prediction. If the floor term breaks any rule that was previously exact, say so — that would mean the floor term is too broad. File as `inbox/<UTC>-<seat>-P-322-derivation-floor.md`. **Push often** (as above).

### D. Score the 15-skill extension and re-run

MUSE outlined 15 skills (`inbox/20261110-0500-muse-skills-outline.md`): split BLK into pass-block/run-block, COV into man/zone, CTH into catching/route-running; add THR (throwing) and TKL (tackling). Score all 19 roles on the 15 skills (285 scores — say where each score comes from: your judgment, the Owner's table patterns, or a stated source; do not guess silently). Then re-run the derivation with the 15-skill profiles (same formula shape, same cut points 1/4/9) against the live 99-rule table. Does it beat 88/99? Does it fix any of the 6 Inkling residuals? File as `inbox/<UTC>-<seat>-P-322-derivation-15skill.md`, with the full 19×15 score matrix and the fit. **Push often** (as above).

### E. Review Slice 5 (P-287 — needs two more seats)

Z.ai's Slice 5 (N2 brag shareables + seed card) is staged on `origin/council/uk` (`078b72f2`, `deliveries/67-cakepanz-s5/`). MUSE reviewed it (VERDICT improved). Review it the same way as Slices 1–4: verify the snapshot is byte-identical to the pin `4ca9a071` (diff `src/engine/` against the Architect's `4ca9a071` `colors/src`), check the battery (75/0/10/3, REPORTED — re-run it live if you can), check the boundaries (no pin move, no engine edit, no flex value, no ratings, no brand change, Team Select untouched), and check the delivery README. File as `inbox/<UTC>-<seat>-P-287-slice5-review.md`. **Push often** (as above).

### F. Review P-328 (needs two more seats)

MUSE verified Inkling's P-322 97/105 fit (review `inbox/20261110-0335-muse-P-328-review.md`, VERDICT ok). Only MUSE has filed. Independently re-implement Inkling's formula and confirm or correct the 97/8/0 fit. File as `inbox/<UTC>-<seat>-P-328-review.md`. **Push often** (as above).

## The principle (settled — do not relitigate it)

The table's job is **ability distance** — how far apart the two jobs are — independent of how much the destination slot is worth. The optimizer's loss is penalty × slot weight, so a misfit into a 50-weight slot is already cheap through the weight term. Cutting its penalty as well prices value twice. A pure weight formula collapses distinct jobs (QB>FS and TE>FS would price the same). Do not use destination weight as a formula term. (MUSE tested this: weight alone 40/99, weight + groups 45/99, weight as an adjustment to Inkling net −1/0. It does not help.)

## Rules

- **Do not touch the product file, the engine, or the Architect's branch.** Derivation work is read-only analysis. Do not change any flex price. Do not land Option B.
- **Do not assume Claude knows anything** beyond the exact messages the Owner relays from him. Work from the files and the Owner's table.
- **Work comes from the ranked list** (`_agents/QUEUE.md`, live on `origin/council/muse`). Take the top line and do it, or review work already filed. Do not assign work to a named seat.
- **Labels:** VERIFIED (you ran it, receipt in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN.
- **Push often.** Commit and push after every finished file/task, not just at session end. A timed-out chat loses unpushed work; a pushed commit survives it. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.

## Innovate (lighter, for reviewers)

Think around the derivation, not just through it. If you see a better way to derive flex prices — a different skill set, a different formula shape, a different way to think about ability distance — propose it. If you see a flaw in Inkling's design or in MUSE's or Claude's prototype, say so with the evidence. The derivation is the direction of travel; the formula that best reproduces the Owner's table, with the fewest exceptions and the fewest tuned constants, is the goal.
