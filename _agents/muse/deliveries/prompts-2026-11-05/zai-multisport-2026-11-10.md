# For Z.ai — apply the Owner's score changes to ZAI-D1, and sketch basketball (design only)

**From the Owner, via MUSE (High Councillor). This is a proposal for the work — you decide the details.**

## State

Your ZAI-D1 derivation is the leading formula, and the Owner prefers it — specifically because the logic generalizes to multisport. MUSE reviewed it (VERDICT improved) and verified the fit by re-running your script: 95/99, 0 fiat rows.

The Owner gave feedback on all four residuals, and MUSE tested it by running your script with modified scores. The results:

- **EDGE>RB (Owner 6, model 12):** edges are the best athletes on the field, so they carry the ball better than the model credits. Raising EDGE's CARRY from 2 to 4 fixes it (6, correct), breaks nothing.
- **C>OG (Owner 6, model 2) and C>OT (Owner 12, model 2):** centers are shorter and much worse in one-on-one pass protection, and that pass protection is worth an extra $10M a year. Lowering the center's PBLK score (9 → 6) fixes C>OG (6, correct) and moves C>OT from a hard miss (2) to off-by-one (6). The Owner accepted C PBLK **6 or 7** as honest. (Raising the PBLK *weight* is the wrong fix — it breaks 4 rules. The fix is the center's score, not the weight.)
- **TE>OT (Owner 12, model 6):** OTs are that superior in one-on-one pass protection and face the opponent's best athletes. Lowering the tight end's PBLK (5 → 4) fixes it (12, correct), breaks nothing.
- **All three together (EDGE CARRY 4 + C PBLK 6 + TE PBLK 4): 98/99, tier-error 1, 0 fiat rows.** Only C>OT remains (Owner 12, model 6). With C PBLK 7: 97/99 (C>OT and C>OG off by one).

The full results are in `inbox/20261110-0655-muse-ZAI-D1-KG-feedback.md` on council/muse, and MUSE's test script is `_agents/muse/deliveries/zai-kg-feedback-2026-11-10.py`.

**Multisport:** the Owner wants the formula as generalizable as possible, so it can import different positions (basketball: PG, SG, SF, PF, C) with skills defined per sport (rim protection, ball handling, 3pt shooting, etc.). Your NEED/HAVE split is the mechanism. The design note is at `_agents/basketball/README.md` on council/muse — **design only, no building. Basketball is not built until 76 Pancakes is finished and the repo is moved.**

## Work

**1. Apply the Owner's score changes to ZAI-D1 and re-run.**
Update your HAVE matrix (EDGE CARRY 2 → 4, C PBLK 9 → 6, TE PBLK 5 → 4) and re-run your script against the live 99-rule table. Confirm 98/99 with only C>OT off by one. Also run C PBLK 7 and confirm 97/99. Report the full diff, and say whether you agree with each score change on football grounds (they're the Owner's reasoning — if any of them feels wrong to you, say so and propose a different score or a different mechanism).

**2. Think about C>OT.**
It's the one remaining disagreement (Owner 12, model 6). The center's one-on-one pass-protection gap is worth more than the model credits. Is there a natural way to capture it — a lower C score (4 gives 99/99, but the Owner did not choose 4), a separate one-on-one pass-protection duty, or is it honestly an off-by-one the formula should accept? Propose what you think is right, with the reasoning.

**3. Sketch the basketball duty set and HAVE/NEED matrices (design only).**
Using the football matrices as the template, sketch a basketball version: the duty list, a HAVE row per position (PG, SG, SF, PF, C), and a NEED profile per job. The sketch in `_agents/basketball/README.md` proposes rim protection, ball handling, 3pt shooting, perimeter defense, rebounding, playmaking, mid-range shooting, finishing at the rim, help defense, off-ball movement, post scoring, free-throw shooting — but that's MUSE's sketch, not yours. Design your own duty set the way you designed the football one: what duties actually drive a basketball flex price? What does each position's body do, and what does each job demand? Score the matrices (0–10, integers, defensible in basketball words) and, if you can, derive a few example flex prices (e.g. PF>C, SG>PG) to show the formula working in a second sport.

**Do not build anything for basketball.** No code, no app, no engine change. This is a design sketch only — the matrices and the reasoning, filed as a note.

## Boundaries

- Read-only on the product. No engine edit, no flex.json change, no re-pin. The snapshot stays at `4ca9a071`.
- The derivation stays a tool, not a build, until the Owner says otherwise.
- **Complete ALL work before responding.** Do not respond until all three pieces above are done, and batch everything into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding.

## Innovate

Please think around the problem, not just inside it. Is there a duty in basketball that has no football equivalent? Does the NEED/HAVE split work differently in a sport where positions are more fluid? Does the λ=0.4 combination still make sense when the duties are different? Is there a cleaner way to make the formula sport-agnostic — a shared duty vocabulary across sports, or a way to derive the duty list itself? The Owner chose your model because its logic travels — show him how far it travels, and where it bends. Bring any new ideas, even if they don't fit the current framing.
