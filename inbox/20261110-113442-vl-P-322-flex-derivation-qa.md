SPEAKER: vl | ROLE: Council seat | TASK: flex derivation design per Owner Q&A (option A) | DATE: 2026-11-10T11:34:42Z
FOR: P-322

DERIVATION-DESIGN: vl-derive v2 — Q&A-consistent flex price. Design only (P-322 is DESIGN ONLY — do not build); read-only analysis, touches nothing in the build.

## 1. What changed vs my earlier P-322 submission

This revises inbox/20261110-1010-vl-P-322-formal-submission.md, which recommended ZAI-D1 + Owner scores (98/99 fit, cross-side floor 6, C>OT as a named exit-premium residual, C PBLK 6/6 pair). The Owner's 2026-11-09/10 questionnaire answers override those choices:

| Owner answer (Q&A) | Direction | Effect on this design |
|---|---|---|
| Q2/Q3 "I really don't care about meeting these 99 at all... Beautiful and portable." | beauty/portability > 99-fit | stop optimizing for 99-fit; report mean error + biggest disagreements for judgment (Q20: done = a feeling) |
| Q4 "Just simple math... 0,2,6,12 not necessary... no words" | simple integers, no labels | exact math hidden; display = one integer; no Free/Slight/Real/Heavy tiers; cap deferred until engine output seen (follow-up Q2) |
| Q7 "both. An adjustable ratio... most malleable... easy to tune." | two ingredients, adjustable blend | price = α·ability + (1−α)·guard, α tunable |
| Q8 "Now. it might be part of the formula itself." | gravity | gravity hook specified; no numeric term until measured (no data yet) |
| Q9 "I would prefer not have any named exceptions." | no exceptions | no fiat rows, no named residuals |
| Q10 floor "an ugly appendage" | delete cross-side floor | no floor term |
| Q11 "a is the best answer to this C to OT question." | value ladder | C>OT 12 from the guard (V[C] ≪ V[OT]), not an exit premium |
| Q12 "ideally you wouldn't have to adjust or track pairs" | no pairs | no HAVE/NEED pairs (C PBLK pair dropped) |
| Q14 "No intangibles type scoring" | OVR + preferred position | OVR is the main data input; duty levels supplied from OVR × preferred position; no mentality/technique |
| Round-2 Q1 dual positions "play both for free" | dual positions | price = 0 between a player's own two positions; Owner assigns them |
| Round-2 Q2 DL5-as-blitzer "naturally emerged from the formula" | no hand rules | DL5 duty profile derived, not specified; no hand-written role rules |

## 2. Design shape

price(src,dst) = clamp( round( α·A(src,dst) + (1−α)·G(src,dst) ), 0, cap )

A = ability shortfall: can this body do that job?
G = value guard: can a cheap player profit by moving up?
α = adjustable blend (Q7), default TBD after engine output (follow-up Q2).
cap = engine-natural max (deferred, follow-up Q2); user sees a simple integer (Q4).

## 3. Ability layer A (Q1, Q2, Q5, Q14)

Positions as duties — a position is what it does (Q5: portable to basketball; "jobs demand things, bodies supply things"). Each role r has a duty profile NEED[r] = {duty: required level} in one portable vocabulary (football: block, cover, snap, rush, catch, throw, kick; basketball: rim protection, ball handling, ...). Authored once and shared with lineup value and flex price so nothing is authored twice (Q5 multisport).

Player supplies: OVR ("the only true data input", Q2) + preferred position ("how they like to play", Q2/Follow-up 1 — preferred position says what attributes a player must have). Duty level supplied S[p][d] = OVR × relevance(d, preferred position). No per-attribute data, no intangibles (Q14).

A(src,dst) = value-weighted soft-max over duties d of max(0, NEED[dst][d] − S[src][d]), weighted by duty importance v[d], one soft-max exponent k so one missing duty can dominate ("a safety who can't cover is not rescued by being fast"). Expressed in OVR points, compatible with the modelWeights/slotWinsPerOvr monotone quantisation contract.

INFERRED: duty levels/relevance authored where no sport data exists, measured where data exists. Not measured against the 99 → fit UNKNOWN.

## 4. Guard layer G (Q1, Q6, Q11)

Value ladder from the engine's own slot values V = Wins (slotWins20/20, the P-321 measurement). G(src,dst) = 20 × (1 − V[src]/V[dst]); G = 0 when V[src] ≥ V[dst] (moving down/sideways is free). Fully portable — moves automatically when slot values change (P-318); no hand-set weights, no salary table.

C>OT 12 falls out of the guard (V[C] ≪ V[OT]) — Q11 answer (a). DT>OT = 6 with a worse body is consistent: guard small (V[DT] close to V[OT]), ability gap supplies the rest.

## 5. Blend (Q7)

α·A + (1−α)·G as a SUM (Claude's data: sum 80 beats max 79). α adjustable — "probably whatever is the most malleable so it is easy to tune" (Q7). Default α unset until the engine's natural output is seen (follow-up Q2).

## 6. Forbidden moves & positions not in the game (Q15, P-338)

Formula prices all 289 moves. A move is forbidden when a destination core duty is entirely unavailable at the source (S[src][d] = 0 for a required duty) → price at cap / not allowed. Combination of forbidden + formula-priced (Q15). No hand-written rules for positions not in the game: SS2 (big nickel, P-338) gets a duty profile + value from the formula; moves into SS2 are priced; prohibitions fall out when a core duty is absent. INFERRED: not measured.

## 7. Dual positions (P-336, Round-2 Q1)

price = 0 between a player's own two positions (Travis Hunter CB+WR plays both free). Owner assigns dual positions; an agent can help gather position-history data (Nakobe Dean MIKE→WILL example). UNVERIFIED: no dual-position data in the engine yet.

## 8. Gravity (Q8, P-335, follow-up Q3)

Gravity (double teams drawn, usage, deterrence — shots/passes not attempted) is measured as a formal stat and shown in advanced stats. As a formula term: optional modifier on G — a high-gravity player is more disruptive to move out of their spot; a high-gravity destination is harder to fill. Specified as a hook only; no gravity data exists → UNKNOWN whether it belongs in the price or stays in advanced stats. Defer the numeric term until measured (Q8 follow-up: "Now" refers to starting the measurement/design, not shipping a number).

## 9. Late-round seamlessness (Q6, P-337)

Board shows a single integer; engine hides continuous math and blend. First ten rounds are the fun; second half = simple decisions. DL5-as-blitzer emerges from the duty profile, not a hand rule (Round-2 Q2).

## 10. Where it departs from the 99 (Q2/Q3)

Not tuned to the 99; the Owner does not care about 99-fit. Disagreements are reported as mean error + biggest disagreements for the Owner to judge (Q20). No named exceptions (Q9): a disagreement with the 99 is an examination item, not a fiat row. INFERRED: disagreements cluster at free-flex destinations (FB, NICKEL/DIME) and Owner pair rulings — same structural finding as vl-derive v1 (9 hard misses are Owner pair rulings, not derivable from ability distance).

## 11. What is NOT in this design

- No cross-side floor (deleted, Q10).
- No named exception rows (Q9) and no C>OT exit-premium residual (Q11: value ladder instead).
- No HAVE/NEED pairs (Q12).
- No intangibles (Q14).
- No basketball calibration yet (Q16: not now).
- No gravity numeric term (no data yet; hook specified).

## 12. How to check

Design only. Check by mapping each Q&A answer to a design choice (§1 table) and confirming: no floor, no exceptions, no pairs, value-ladder C>OT, adjustable α·A+(1−α)·G blend, gravity hook, dual-position free, OVR+preferred-position data, no intangibles. No command output; verification = council re-read + re-derive against the Q&A. Evidence label: INFERRED (reasoned from the Owner's Q&A; not run against the 99 table).

Supersedes: inbox/20261110-1010-vl-P-322-formal-submission.md (ZAI-D1 recommendation) on the points the Q&A overrides (floor, exceptions, pairs, C>OT, 99-fit target). The earlier submission's 98/99 verification stands as a measurement artifact, not a recommendation.
