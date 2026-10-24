# Foundations for the FB and P draft-board slots (Owner issue #12)

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: #12 foundations | DATE: 2026-10-21T03:40:00Z**

**The Owner's instruction, verbatim in substance:** _"FB and Punter need to be created as slots on the draft
board. Do not alter any player position descriptions. Any Running back (RB) or full back (FB) or Tight End
(TE) are available to play FB at no flex cost. Kickers (K) and Punters (P) are available to be punters at
no draft cost. The underlying math for how they work will be created by Claude, but maybe other agents can
help set the foundations for him."_

**Status: FOUNDATIONS ONLY — measured on fixtures, not applied to the product.** Claude owns the math and
the build. Nothing in this file is a change to the simulator; the fixtures live in `/tmp` and the
receipts below are the evidence.

## What the problem is (measured on the merged candidate `40233d6b…`)

Feeding the build its own 1,200-record pool through the build-time pool seam (`tools/build-pool-variant.mjs`)
writes **1,148** records and **drops 52**, because the build has 19 legal slot codes and the pool contains
codes it has no slot for:

| dropped code | count | what they are |
| ------------ | ----: | ------------- |
| `P`          |    32 | punters       |
| `LS`         |    12 | long snappers |
| `FB`         |     8 | fullbacks     |

Nothing in the draft, the games or the 100-season run notices. Two display surfaces do: the player
browser and the "Actual Roster" pool column simply lose those names. **The simulators' rule is therefore
implicit: specialists do not exist in this simulation.** The Owner's decision makes that rule explicit.

## The two implementable options, measured

Both were built as **fixtures** (a copy of the merged candidate with the slot constants and flex rules
patched) and run through the full gate. Nothing was applied to the product.

|                                   | slots | rounds |   picks |             pool records dropped | gate                        |
| --------------------------------- | ----: | -----: | ------: | -------------------------------: | --------------------------- |
| current                           |    26 |     26 |     832 | **52** (`P` 32, `LS` 12, `FB` 8) | exit 0                      |
| **Option A — add `FB1` only**     |    27 |     27 | **864** |         **44** (`P` 32, `LS` 12) | **exit 0, all checks true** |
| **Option B — add `FB1` and `P1`** |    28 |     28 | **896** | **0** (if `P` and `LS` also map) | **exit 0, all checks true** |

Receipts (option A): `picks 864/864 · 272 games · champion Minnesota Vikings · 0 page errors · draft board
renders 1,176 rows`. Option B: `picks 896/896 · 272 games · champion Buffalo Bills · 0 page errors · board
1,174 rows`. The season length does not change (272 games = 32 teams x 17 / 2); only the draft grows.

## The foundations, expressed as data Claude can implement

1. **New slot(s).** `FB1` (fullback) and `P1` (punter) as draft-board slots. The slot count is
   `ROSTER_SLOTS.length` → `TOTAL_ROUNDS` (v20:892-924), so a slot per team multiplies the board by 32.
2. **No flex cost, exactly as the Owner says.** `RB`, `FB` and `TE` may occupy `FB1` at zero cost, so
   `NATURAL_SLOT_MAP` gains `TE:['TE1','TE2','FB1']` and a `FB:['FB1']` entry (an `HB` reaching `FB1`
   would then cost 0 as well, if Claude prefers the symmetric rule). `K` and `P` may occupy the punting
   role at zero draft cost — either a `P1` slot that a `K` can fill for free, or a `K` slot that a `P` can
   fill for free.
3. **Position descriptions are untouched** (Owner instruction). The change is to the _slot_ and _flex_
   tables only; the 1,200 records' `pos` values stay exactly as they are.
4. **The pool builder must stop dropping.** Once the slots exist, `tools/build-pool-variant.mjs` maps the
   new codes instead of dropping them; the current 52-record dropout becomes 44 (option A) or 0 (option B,
   with `P` and `LS` mapped to the punting role). _This is the measurable acceptance criterion for the
   data side._
5. **The 12 long snappers are the open sub-question.** The Owner's rule covers `RB`/`FB`/`TE` → `FB` and
   `K`/`P` → punter, but says nothing about `LS`. My fixture maps `LS` to the punting role at zero cost
   (a long snapper is a specialist infielder who also handles the snap) — that is a _proposal_, and it is
   the one judgement in this document that needs a yes or no.

## What the Owner or Claude must decide (three, with a default)

- **A or B?** _Default: **B** (add `FB1` and `P1` → 896 picks, zero dropped records) — it is the only
  option in which no player is silently lost from the pool, and the extra cost is 32 picks per option._
  _Cost of being wrong:_ the pick count in every existing receipt changes (832 → 864 or 896), so the
  E2E evidence and the gate matrix must be regenerated. That is already true for option A, so the
  marginal cost of B over A is small.
- **Do the long snappers play the punting role?** _Default: yes, at zero cost._ _Cost of being wrong:_
  12 records.
- **Does a `K` filling `P1` cost a draft pick?** The Owner wrote _"Kickers (K) and Punters (P) are
  available to be punters at no draft cost"_ — read literally, a `K` can punt without using the `P1` slot,
  which would make `P1` a rarely-drafted slot. _Default: `K` may fill `P1` at zero cost, and `P` is drafted
  when a team wants a dedicated punter._ _Cost of being wrong:_ a 32-pick shift in how specialists are
  used.

## Reproduce it (no installs, nothing touches the product)

```
# the two fixtures were produced by patching the merged candidate's slot constants and flex tables
# (ROSTER_SLOTS, SLOT_FAMILY, NATURAL_SLOT_MAP, FLEX) and writing copies to /tmp:
#   fixture-FB.html    sha256 9ebf3915a439c040   27 slots, 864 picks
#   fixture-FB-P.html  sha256 33014c5351b8c043   28 slots, 896 picks
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/fixture-FB.html     # exit 0, A-H all true, 864/864
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/fixture-FB-P.html   # exit 0, A-H all true, 896/896
```

**Status for Claude:** the foundations are laid and measured; **the math is yours to implement**, and the
Owner has specifically asked that this work and her instructions be reported to you. The one open
sub-question (long snappers) and the A/B choice are in the list above.
