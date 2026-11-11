SPEAKER: DS | ROLE: council (answer) | TASK: P-341 — should the engine go play-level? | DATE: 2026-11-11T00:26Z

# P-341 — the engine should see participation before it sees plays

**Answer in one line:** yes, the engine should go below the drive — but the first step is a
**participation ledger** (who was on the field, for how many snaps), not a play-level simulator. That is the
smallest instrument that measures the thing the FB problem is actually about (exposure), it is an extension of
the box score the engine already has, and it is reversible. Plays come after, and only as an audit trail.

I reviewed Z.ai's answer separately (`inbox/20261111-0025-ds-P-341-zai-play-level-review.md`, VERDICT improved):
the design survives, the arithmetic needed correcting. This file is the design answer, not a second review.

## 1. The three shapes, and why participation is the missing middle

- **Drive engine (today):** authoritative physics, produces totals, box score, the Lab, the flex table. Its
  weakness is that it cannot say *who was on the field*, so exposure is invisible and the FB family has to be
  priced by hand.
- **Participation ledger (proposed first step):** the drive engine stays; each drive carries the 11 personnel
  and each player a snap count. No play sequencing, no second physics. It measures exposure, which is the one
  quantity the FB/FB>RB/FB>TE rows need and the engine does not currently produce.
- **Play-level simulator (the Owner's question):** bottom-up plays; derive drives from plays. It dissolves the
  derivation headaches but replaces them with a play model to calibrate. It is a different project, not the next
  step.

Z.ai's **Plays Ledger** is the right destination, but his Step 1 ("snap ledger from the existing box score")
undersells what is new: the box score allocates **production**, not **participation**. A fullback with zero
touches is invisible in the box score even if he played 20 snaps. So Step 1 is not a reformat of the box score;
it is a new, small allocation: per drive, the personnel package; per player, the snaps. That is the actual first
build.

## 2. Does the Ledger differ from the view? Same shape, different contract

The box-score rule ("every number is the sum of its parts; no number outside the box") is already the Ledger's
discipline. The drive engine already satisfies it for production. The Ledger adds one coordinate — participation —
and one contract: **the snap ledger must sum to 11 × plays**, and every player's snaps must be ≤ the team's plays.
That is testable, and it is what makes the ledger an instrument rather than a table.

So the honest claim is not "a new species of engine". It is: **the box-score pattern, extended to who was on the
field.** The Owner has already accepted this pattern; that is the strongest argument for the Ledger, and it is
stronger than Z.ai's "three precedents" framing.

## 3. Does the exposure-weighted guard work? Yes, with one scope fix

Verified against the corrected ability numbers (see review): with the Owner-approved C 200 / OLB 200 bumps,

| row | guard G = 20(1 − v_src/v_dst) | max(ability, E·G) | tier | Owner |
|---|---|---|---|---|
| C>OT | 12.0 (200→500) | 12.0 | 12 | 12 ✓ |
| C>DT | 12.0 (200→500) | 12.0 | 12 | 12 ✓ |
| **C>OG** | **10.0 (200→400)** | **10.0** | **12** | **6 ✗** |
| FB>RB | 18.0 (25→250) | 3.3–4.5 | 2–6 | 2 (within ±5) |
| FB>TE | 18.0 | 4.74 (ability) | 6 | 6 ✓ |
| OLB>ILB/SS/FS | 6.67 (200→300) | 6.84 / 8.12 / 11.74 | 6/6/12 | 6/6/12 ✓ |
| TE>FS | 3.33 (250→300) | 13.64 | 12 | 12 ✓ |

**10 of 11 exact; C>OG is the lone miss.** The guard works because it prices the *market premium* of moving a
player to a more valuable slot, and scales it by how often the player is actually there. The C>OG failure is the
same mechanism over-applied: there is no market premium between adjacent interior-line spots, so the guard
should not apply there. **Fix: scope the guard to cross-position moves (C→OT, C→DT) and leave adjacent line
spots to the ability layer (C→OG 5.13 → 6).** That is one design decision, not a number chase, and it is the kind
of "scope" the Owner can state as a football fact.

The FB tier is **2–6** across E 0.15–0.25 (threshold E < 0.222). The worst case is 4 points off the Owner's 2 —
inside his ±5 acceptance. Report the band; do not pretend it is a single tier.

## 4. Does the Ledger solve the English-philosophy problem? No — it relocates it, honestly

The Owner's complaint is that the 99 rules translate an English philosophy into specific numbers, and the
translation is where the arguments live. The Ledger does not remove that translation; it changes its objects:

| today | with the Ledger |
|---|---|
| 99 flex prices (abstract) | personnel packages (who lines up where) |
| | attribution rules (who gets credit for a play) |
| | a value objective (what wins are worth) |
| | the Owner's importance dials (socialism, stars) |

Those are still authored inputs. But they are **football facts and stated values**, not derived prices — and
that is a real reduction in translation distance. The Owner can say "a fullback is barely on the field and his
body covers rush-down work" (a fact + a value), and the engine can produce the price. He cannot easily say "FB>RB
is 2" and have that survive a new roster; that is what today's table asks of him.

**The part Z.ai overstates:** the exposure-weighted guard treats *exposure* as *importance*. The Owner's
socialism is about importance — "an unimportant role with one good player flexes cheaply" — and snap share is
evidence of importance, not the same thing. A part-time FB who is the best blocker on the team is more important
than his 20% snap share suggests; a part-time receiver who is a decoy is less. So the engine can **measure**
exposure and **propose** importance from the Lab (wins added when the player is on the field), but the Owner still
sets the importance dial. That is one dial per role, not 99 prices — the right size of authored input.

## 5. Can the engine generate the math itself? Measurements yes, values only with an objective

The engine can generate:
- **exposure** E (snap share), once participation exists;
- **ability** (the ZAI-D1 shape), from the role profiles;
- **contribution** (EPA, wins added), from the Lab's perturbation loop.

It cannot generate **value** without an objective. "Wins" is the objective the Owner has already named; the Lab
can turn a perturbation into wins, so the value of a slot or a role is measurable *relative to the roster*. What
the engine cannot do is decide how much a win is worth versus the Owner's requirements (stars, socialism,
realism). That is the philosophy layer, and it stays authored — but it is now a small set of dials and
constraints, not a table of prices.

So the accurate claim is: **the engine can generate the arithmetic; the Owner supplies the objective and the
importance dials; the Lab connects them.** "The engine generates the math" is true for the measurements and the
price formula, false for the values.

## 6. Path: what I would build, in order

1. **Participation ledger (small, shippable).** Per drive, the personnel package; per player, snaps. Test:
   sum = 11 × plays; every player ≤ team plays; position shares vs nflverse (`dl5-snaps.py` already ingests).
   No play sequencer, no play model. This is the answer to the FB problem and it produces the first real E.
2. **Measured E in the guard.** Replace the 0.15–0.25 band with the engine's own E; re-run the Appendix A rows
   and the 99/105 table. Acceptance: exact tiers where the Owner's table is a fact, within ±5 where it is a
   judgement; the C>OG scope fix included.
3. **Attribution** (who gets credit for a play, who blocked whom). This is the first real play-level content and
   the hardest new authoring surface; it should be built only when a consumer needs it (the Lab's value loop,
   or a recap the Owner wants).
4. **Play staging** (down, distance, field position inside each drive) as an audit trail, additive and pure.
   Still not a second physics.
5. **A full play-level simulator** only if steps 1–4 fail to produce stable values. That is the trigger, and it
   should be evaluated on a seeded one-game prototype, not assumed.

The risk of the two loops (Ledger measures, Lab experiments) is **drift**: the Lab's values are computed on the
drive engine; the moment a play layer changes the totals, the values move. Pin the value model to the drive
engine's totals and treat the play layer as an audit; re-derive prices only when the totals change. That is a
maintenance contract, and it is the price of keeping the derivation contained.

## 7. What transfers, and what does not

**Transfers:** the drive totals and their calibration; the ratings and `teamRatings`; the box score; the Lab's
perturbation loop; the flex table as a **guide** (the 105-rule table and the D derivation are the Owner's
philosophy written down; they are the acceptance test, not the implementation). **Must be rebuilt:** per-play
state, the personnel model, attribution, play sequencing. "70% transfers" is an estimate, not a measurement; the
real test is the box-score purity test on one game (the existing box score already passes the production half;
the snap ledger must pass the participation half).

## 8. What would change my mind

A seeded one-game play-level prototype that reproduces (a) the drive-total distribution and (b) the Lab's win
values within the calibration bands. If a play model can do that without a new calibration project, the
containment argument weakens and the full rebuild becomes the better bet. Until that receipt exists, the
participation ledger is the lower-risk path — and it is the only step that is useful under *either* outcome,
because both shapes need exposure.

## 9. On the six interactions (my positions)

1. **Ledger vs view:** same shape; the difference is the contract (additive, pure, 11 × plays). The box score is
   the precedent, not a metaphor.
2. **Exposure-weighted guard:** works; scope it (no guard between adjacent line spots); report the FB band.
3. **Ledger solves the English-philosophy problem:** no; it relocates it to personnel, attribution, objective and
   importance dials — all smaller and more football-shaped than 99 prices.
4. **Two loops:** right split; the drift risk is the maintenance contract.
5. **Engine generates the math:** measurements yes; values need the objective and the Owner's dials.
6. **What transfers:** the calibration and the box score; not the play state; the flex table is the guide.

## 10. Questions for the Owner (with recommended defaults)

1. **Is exposure the importance measure, or a proxy?** Recommend: proxy; the Owner keeps one importance dial per
   role, the Lab proposes its value from wins added. (Blocks: whether the guard is `E × G` or `importance × G`.)
2. **Does the ±5 acceptance apply to the price or to the tier?** Recommend: the price (a 4-point tier flip is
   fine, a 6-point tier error is not). (Blocks: whether C>OG's 10 vs 6 passes.)
3. **What is the first consumer of play-level data — the Lab, the recap, or the draft?** Recommend: the Lab
   (it is what makes the values measurable); the recap second. (Blocks: the order of steps 3–4.)

Labels: the guard and ability numbers are **VERIFIED** (re-run; see the review); the 10/11 and C>OG findings are
**VERIFIED** arithmetic on the current config; the path and the estimates are **INFERRED**; the nflverse snap
ingest is **REPORTED** (the script exists, I did not run it); the full play-level prototype is **UNKNOWN** (not
built, not measured).
