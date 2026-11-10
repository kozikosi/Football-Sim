# Multisport generalization — the derivation formula as a sport-agnostic engine

**Status: DESIGN ONLY. Do not build basketball until 76 Pancakes (Colors v1) is finished and the repo is moved.** This folder holds the definition so the work is well defined when the time comes. (Owner, 2026-11-10.)

## The Owner's direction (verbatim, 2026-11-10)

"yes i vastly prefer z.ai's model because it will also be the type of logic that will lend it to being modeled in our multisport transitions. I'd like to maybe consider now thinking about making this formula as generalizable as possible so that we can important different positions (e.g. PG, SG, SF, PR, and C) and have the skills be defined as (e.g rim protection, ball handling, 3pt shooting, etc.)"

Recorded verbatim in `_agents/owner-notes/2026-11-10-zai-model-multisport-generalization-verbatim.txt` (pushed `39f71797`). "important" and "PR" are KG's words as written (he means "import" and "PF").

## Why Z.ai's model generalizes (MUSE's explanation, as quoted back by the Owner)

Z.ai's formula doesn't know anything about football. It knows five things, and all five are inputs, not hard-coded football:

1. A list of positions.
2. A list of duties.
3. A HAVE matrix (what each position's body does, 0–10).
4. A NEED profile for each job (what each job demands).
5. Weights per duty, plus λ (0.4), plus the cuts (1/4/9), plus the floor.

Change the inputs and the same formula runs. The formula — worst gap plus 40% of the rest, through the same cuts — derives the flex prices in any sport. The cross-side floor becomes a cross-role floor (a guard playing center costs at least 6, say). The DL5 lesson carries over too: a new situational job (say, a small-ball five) is authored as a NEED profile first, and the prices fall out.

## Basketball sketch (proposal, not a decision)

Positions: PG, SG, SF, PF, C.

Duties (proposal — the basketball equivalent of Z.ai's 17 football duties; to be calibrated the same way, not decided here):
rim protection, ball handling, 3pt shooting, perimeter defense, rebounding, playmaking, mid-range shooting, finishing at the rim, help defense, off-ball movement, post scoring, free-throw shooting.

Each position gets a HAVE row (a center has rim protection 9, ball handling 2; a point guard has ball handling 10, rim protection 2) and each job gets a NEED profile (the center job demands rim protection 9 and rebounding 9; the point guard job demands ball handling 10 and playmaking 9). The formula derives the flex prices: a power forward playing center, a shooting guard playing point guard, and so on.

## What "well defined" means for this folder

- The formula is sport-agnostic: positions, duties, HAVE, NEED, and weights are inputs. Nothing in the formula names a football position or skill.
- The football matrices (ZAI-D1, `_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md`) are the template. The basketball matrices are a new calibration, not a new formula.
- A new situational job in any sport is authored as a NEED profile first (the DL5 lesson, IDEA-3), and the prices fall out. No neighbor-copy rules.
- The quasi-metric audit (IDEA-2) works in any sport: any future hand-set price that breaks the triangle is a deliberate premium.

## Next work (when the Owner says so — NOT before 76 Pancakes ships)

A council or Z.ai task to sketch the basketball duty set and HAVE/NEED matrices, the same way Z.ai did for football. The football matrices are the template — the basketball ones are a new calibration, not a new formula.
