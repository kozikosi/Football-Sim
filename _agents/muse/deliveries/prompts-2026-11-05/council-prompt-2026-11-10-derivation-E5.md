# Council prompt — Derivation: E5 hybrid (97/99), EDGE>OLB, and open reviews (2026-11-10)

## State (read this first)

- **The derivation now stands at 97/99.** MUSE ran six formula variants against the live 99-rule table (architect `97d7e9d`). The best is **E5: same-group A halved + re-fit cuts (1.5,4,9) + cross-side floor → exact 97, off-by-one 2, hard 0**. It fixes 5 of the 6 floor-model residuals. It breaks 1 rule (FS>SS, owner 2, model 0). Script: `_agents/muse/deliveries/derive-improve-2026-11-10.py` (council/muse).
- **The floor model is confirmed at 93/99** (MUSE Option C, `inbox/20261110-0545-muse-P-322-derivation-floor.md`): exact 93, off-by-one 6, hard 0; the floor changed exactly the 5 WR>DB rules and broke 0.
- **E3 (re-fit cuts 1.5,4,9 + floor, no same-group term) gives 96/99 and breaks NOTHING.** It is the cleanest improvement. E5 is higher fit but breaks FS>SS. The choice between them is open.
- **EDGE>OLB (owner 0, model 2) survives in EVERY variant.** It is the stubborn residual — a rush-equivalence convention (EDGE and OLB share the rush job). With EDGE>OLB as an explicit override (like EDGE>ILB and EDGE>RB already are), E5 would reach **98/99**. Whether to add it as an override or a rush-equivalence term is open.
- **E4 is REJECTED.** Gating A when D < 2 gives 74/99 with 12 hard misses and breaks 25 rules. Do not pursue it.
- **Three seats confirm Inkling's formula at 88/11/0** (MUSE, Claude, Glyph — Glyph independently re-implemented it, `inbox/20261110-0558-glyph-P-322-derivation-verify.md`). **The BLK spec defect is confirmed by all three:** the design text says BLK gap is zeroed only when `dst == 'C'`, but the general reading (zeroed when both BLK ≥ 8, any destination) gives 88/99 while the literal reading gives 87/99 (OG>OT becomes a residual). **The design text must be corrected to the general reading.** Glyph did NOT run Claude's `flexderive.mjs` directly — that loop is still open.
- **Super and OR filed their own derivation designs** (both Option A). Super: pure directional gap + floor, 7 skills, 7 betas, no per-pair exceptions — **59/99**, but fixes 4 of Inkling's 6 residuals (CB>FS, CB>SS, SS>DIME, SS>NICKEL). OR: destination requirements, 8 skills — **55/99**, 24 hard misses. Neither beats Inkling on raw fit. Both are worth keeping as design points: Super's within-group insight is what E5 uses; OR's is a principled fallback/linter.
- **P-287 Slice 5 has two reviews** (MUSE improved + Inkling improved, `inbox/20261110-0559-inkling-P-287-slice5-review.md`). **One more seat needed for REVIEWED.** Inkling's review re-ran the battery live (75/0/10/3) and the engine tests live (284/0), and found nits F1–F9 (build warning, stale package.json, builders' stamp in the proof block, battery not byte-reproducible — none blocking).
- **Claude timed out while thinking** about his own derivation design. The Architect's derivation work is paused. The council and Z.ai carry it.
- **Option B is HELD.** Do not land Option B. The Owner decides after seeing the derivation.
- **P-323 is formally REVIEWED** (Owner declared it). Done.

## Work to take (pick one — do not do all of these in one chat)

### A. Verify the E5 hybrid independently (the main new work)

Re-implement the E5 variant yourself — do not just re-run MUSE's script. Inkling's P-322 formula + the cross-side floor term + the same-group discount (halve the A term when src and dst are in the same group: DB {CB, FS, SS, NICKEL, DIME}, LB {ILB, OLB}, DL {DT, EDGE}) + re-fit cut points (1.5, 4, 9). Run it against the live 99-rule table (read it from `origin/architect/engine-and-seats:tools/mathlab/flex.json`, commit `97d7e9d`). Confirm or correct: **exact 97, off-by-one 2, hard 0**, with residuals EDGE>OLB (owner 0, model 2) and FS>SS (owner 2, model 0). Also test E5 **with EDGE>OLB added to the OVERRIDE dict** (as an explicit exception, price 0) — MUSE predicts **98/99**. Say whether you think EDGE>OLB belongs as an override or as a rush-equivalence term. File as `inbox/<UTC>-<seat>-P-322-derivation-E5-verify.md`. **Push often** — commit and push after every finished file/task, not just at session end. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.

### B. Refine the same-group discount (fix FS>SS)

E5 breaks FS>SS (owner 2, model 0) because the same-group discount halves A for a pair the Owner prices at 2. FS and SS are both safeties, but they are different jobs (FS is deep range, SS is box). Try a refinement: exclude safety pairs (FS↔SS) from the discount, or use a smaller discount for them (e.g. ×0.75 instead of ×0.5), or apply the discount only to CB→FS/SS and SS→DIME/NICKEL (the pairs the Owner prices at 0). Re-run against the live 99-rule table. Does your refinement reach 98/99 without breaking anything? File as `inbox/<UTC>-<seat>-P-322-derivation-group-refine.md`, with the variant, the fit, and what it broke (if anything). **Push often** (as above).

### C. Run Claude's flexderive.mjs directly (close the loop)

Glyph could not execute Claude's script (not present in his worktree). Run `tools/mathlab/flexderive.mjs` from the Architect's branch (`origin/architect/engine-and-seats`, commit `678bb06`) yourself — with no flags, with `--floor 6`, and with `--floor 6 --cuts 1.5,4,9` — and confirm or correct the reported numbers (88/11/0, 93/99, 96/99). File as `inbox/<UTC>-<seat>-P-322-flexderive-run.md`. **Push often** (as above).

### D. Score the 15-skill extension and re-run

MUSE outlined 15 skills (`inbox/20261110-0500-muse-skills-outline.md`): split BLK into pass-block/run-block, COV into man/zone, CTH into catching/route-running; add THR (throwing) and TKL (tackling). Score all 19 roles on the 15 skills (285 scores — say where each score comes from: your judgment, the Owner's table patterns, or a stated source; do not guess silently). Then re-run the derivation with the 15-skill profiles (same formula shape, same cut points 1/4/9, plus the floor term) against the live 99-rule table. Does it beat 93/99? Does it fix any of the 6 floor-model residuals? File as `inbox/<UTC>-<seat>-P-322-derivation-15skill.md`, with the full 19×15 score matrix and the fit. **Push often** (as above).

### E. Review Slice 5 (P-287 — needs one more seat for REVIEWED)

Z.ai's Slice 5 (N2 brag shareables + seed card) is staged on `origin/council/uk` (`078b72f2`, `deliveries/67-cakepanz-s5/`). MUSE and Inkling both reviewed it (VERDICT improved). Review it the same way: verify the snapshot is byte-identical to the pin `4ca9a071`, check the battery (75/0/10/3 — re-run it live if you can), check the boundaries (no pin move, no engine edit, no flex value, no ratings, no brand change, Team Select untouched), and check the delivery README. Read Inkling's review first for the nits F1–F9 — do not re-file them as new findings unless you disagree with one. File as `inbox/<UTC>-<seat>-P-287-slice5-review.md`. **Push often** (as above).

### F. Review P-328 (needs two more seats)

MUSE verified Inkling's P-322 97/105 fit (review `inbox/20261110-0335-muse-P-328-review.md`, VERDICT ok). Only MUSE has filed. Independently re-implement Inkling's formula and confirm or correct the 97/8/0 fit. File as `inbox/<UTC>-<seat>-P-328-review.md`. **Push often** (as above).

### G. Design your own derivation (still open)

Do not just verify or extend Inkling's formula. **Design your own.** Think independently about what skills matter, how they combine into a price, what the cut points should be, and how your formula handles the hard cases (the 6 floor-model residuals, the cross-side floor, EDGE>OLB, the DL5 reframing). Implement your formula as a script, run it against the live 99-rule table, and report exact/off-by-one/hard. Compare against Inkling's 88/99 (93/99 with floor, 97/99 for E5). Does yours beat it? If not, say why yours is still worth considering (simpler, fewer constants, more principled). File as `inbox/<UTC>-<seat>-P-322-derivation-design.md`. **Push often** (as above).

## The principle (settled — do not relitigate it)

The table's job is **ability distance** — how far apart the two jobs are — independent of how much the destination slot is worth. The optimizer's loss is penalty × slot weight, so a misfit into a 50-weight slot is already cheap through the weight term. Cutting its penalty as well prices value twice. A pure weight formula collapses distinct jobs (QB>FS and TE>FS would price the same). Do not use destination weight as a formula term. (MUSE tested this: weight alone 40/99, weight + groups 45/99, weight as an adjustment to Inkling net −1/0. It does not help.)

## Rules

- **Do not touch the product file, the engine, or the Architect's branch.** Derivation work is read-only analysis. Do not change any flex price. Do not land Option B.
- **When a task involves a classification, the prompt defines the classes.** For the cross-side floor: offense roles are QB, RB, FB, WR, TE, OT, OG, C; defense roles are DT, EDGE, ILB, OLB, SS, FS, CB, NICKEL, DIME; K and P are special (K↔P is same-side, not cross-side). For the same-group discount: DB is CB/FS/SS/NICKEL/DIME; LB is ILB/OLB; DL is DT/EDGE. Do not guess a classification the prompt defines.
- **When a prompt asks for a script + a note, file both:** the script under `_agents/<seat>/deliveries/` (or `_agents/muse/deliveries/` for MUSE's own work) and the note under `inbox/`. A note without its script is unverifiable; a script without a note is unreadable.
- **Do not assume Claude knows anything** beyond the exact messages the Owner relays from him. Work from the files and the Owner's table.
- **Work comes from the ranked list** (`_agents/QUEUE.md`, live on `origin/council/muse`). Take the top line and do it, or review work already filed. Do not assign work to a named seat.
- **Labels:** VERIFIED (you ran it, receipt in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN.
- **Push often.** Commit and push after every finished file/task, not just at session end. A timed-out chat loses unpushed work; a pushed commit survives it. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.

## Innovate (lighter, for reviewers)

Think around the derivation, not just through it. If you see a better way to derive flex prices — a different skill set, a different formula shape, a different way to think about ability distance — propose it. If you see a flaw in Inkling's design, in MUSE's experiments, or in Super's or OR's designs, say so with the evidence. The derivation is the direction of travel; the formula that best reproduces the Owner's table, with the fewest exceptions and the fewest tuned constants, is the goal. E5 at 97/99 is the bar to beat.
