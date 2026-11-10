# Council prompt — Derivation prototype: verify MUSE's run, then extend it

## What MUSE already did (so you do not repeat it blindly)

MUSE ran the derivation prototype Claude proposed (pin DL5 + prototype the derivation, hold Option B). The script is `_agents/muse/deliveries/derive-prototype-2026-11-10.py` (council/muse). It implements Inkling's P-322 skill-profile formula as one function (from-role, to-role) → tier, and compares it against the LIVE 99-rule Owner's table (architect `97d7e9d`).

**Result (MUSE, VERIFIED): exact 88, off-by-one-tier 11, hard misses 0.** The 11 disagreements are 5 cross-side floor rules (WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS — owner 6, model 2; the floor term is missing from the formula) and 6 Inkling residuals (CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL — owner 0, model 2). Full note: `inbox/20261110-0530-muse-derivation-prototype.md`.

## What to do (pick one — do not do all three in one chat)

**1. Verify MUSE's run (independent recheck).** Re-run the derivation prototype independently — do not just re-run MUSE's script. Implement Inkling's P-322 formula yourself (from Inkling's design file), read the live 99-rule flex.json from `origin/architect/engine-and-seats` (commit `97d7e9d`), and compare rule by rule. Confirm or correct: exact 88, off-by-one 11, hard 0. Confirm the 11 residuals are exactly the 5 floor rules + the 6 Inkling residuals. If your numbers differ, say so with the differing rules. File as `inbox/<UTC>-<seat>-P-322-derivation-verify.md`. **Push often** — commit and push after every finished file/task, not just at session end. If mid-task and the chat is getting long, push what exists (even as a WIP commit) and say so in the bulletin entry.

**2. Add the floor term and re-run.** Extend the derivation with the cross-side floor as a term: if a rule is cross-side (offense to defense or defense to offense) and the formula's price is below 6, raise it to 6 — except flexes into FB, which stay free. (The floor is a minimum, not a cap: 6 stays 6, 12 stays 12.) Re-run against the live 99-rule table. MUSE predicts the fit becomes **93/99 exact, 6 off-by-one-tier, 0 hard**. Confirm or correct that prediction. If the floor term breaks any rule that was previously exact, say so — that would mean the floor term is too broad. File as `inbox/<UTC>-<seat>-P-322-derivation-floor.md`. **Push often** (as above).

**3. Score the 15-skill extension and re-run.** MUSE outlined 15 skills (`inbox/20261110-0500-muse-skills-outline.md`): split BLK into pass-block/run-block, COV into man/zone, CTH into catching/route-running; add THR (throwing) and TKL (tackling). Score all 19 roles on the 15 skills (285 scores — this is a calibration task, so say where each score comes from: your judgment, the Owner's table patterns, or a stated source; do not guess silently). Then re-run the derivation with the 15-skill profiles (same formula shape, same cut points 1/4/9) against the live 99-rule table. Does it beat 88/99? Does it fix any of the 6 Inkling residuals? File as `inbox/<UTC>-<seat>-P-322-derivation-15skill.md`, with the full 19×15 score matrix and the fit. **Push often** (as above).

## The DL5 reframing (Owner direction, 2026-11-10)

The Owner directs that DL5 be thought of as a player who comes in for **blitzes and heavier defensive sets**, not as a rotational substitute for a DT or EDGE — and since there are no injuries in the sim, **all players are starters**, even if DL5 does not play every snap. This reframes the DL5 question. It bears on the flex-dl5 derivation (currently the cheaper of role→DT and role→EDGE) and on the formation-gap measurement (the DL5=DT vs DL5=EDGE cells). If your work touches DL5, use this framing. Verbatim: `_agents/owner-notes/2026-11-10-dl5-blitzer-heavy-sets-verbatim.txt`.

## Rules

- **Do not touch the product file, the engine, or the Architect's branch.** This is read-only analysis. The derivation prototype is a script that reads flex.json and thetaprice from git and emits a diff. It changes nothing.
- **Do not assume Claude knows anything** beyond the exact messages the Owner relays from him. Work from the files and the Owner's table.
- **Labels:** VERIFIED (you ran it, receipt in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN.
- **Innovation:** think around this, not just through it. If you see a better derivation — a different skill set, a different way to combine D and the skill gaps, a different set of cut points, or a reason the derivation is the wrong direction — say so in your review. The derivation is the direction of travel; the formula that best reproduces the Owner's table, with the fewest exceptions, is the goal.
- **Push often.** Every prompt to the council carries this: commit and push after every finished file/task, not just at session end. A timed-out chat loses unpushed work; a pushed commit survives it.
