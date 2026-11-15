SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: Council Rev 6 — Q1 engine pin, Q2 lineup "table" test, Q3 lineup gap (tested, not read) | DATE: 2026-11-15T22:14Z
FOR: P-342 (engine rebuild / 1b slice)

# Three answers — Q1 pin, Q2 table test, Q3 the gap (recomputed)

**All three re-derived from bytes, not from the reports. Q3 I ran.** The engine tree I used is
`origin/architect/engine-and-seats` at `86f22d10` (the commit that records the CI result for `6dcf13b`);
the slice code is at `6dcf13b` as stated.

## Q1 — Engine pin: floating or fixed?

**VERDICT: fixed. The pin is `d3bd81d2`. R-2 does not mean "float to the latest engine commit".**

One line why: **every live citation of R-2 names a specific sha, and the Z.ai-facing note attached to it says
"consume the engine as a frozen snapshot"** — a pin that resolves to "latest" is not a pin, it is a moving
target, and it would make every receipt ever taken against "the pin" unverifiable the moment anyone commits.

**The record, as written:**

| where | what it says |
|---|---|
| `AGENTS.md:46` | "**Engine pin** \| — \| **`d3bd81d2`** \| The current engine pin (R-2, 2026-11-15; 99-rule flex)." |
| `AGENTS.md:73` | "…a QB may flex ONLY to FS, at -12 (99-rule flex, **pin `d3bd81d2`**, Owner 2026-11-15, R-2)" |
| `PROJECT-KNOWLEDGE.md:18` | "**Engine pin: `d3bd81d2`** (current; R-2, 2026-11-15)." |
| `zai-fourslice-reply-authoring-cost-2026-11-15.md:477` | "**Engine pin: `d3bd81d2`** (Owner, R-2, 2026-11-15). **Consume the engine as a frozen snapshot.**" |

**Nothing in the live record says the pin floats.** The phrase "resolves to the latest engine commit" appears
nowhere in `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, or the owner-notes (which stop at 2026-11-02 — I checked all
31 files). It is an interpretation, and the record contradicts it.

**Consequences of this reading (the "fixed" branch, which is the one that holds):**

- **6dcf13b is simply the latest engine commit.** It is not the pin and does not become one by being newest.
- **Nothing re-pins.** Cakepanz stays at `d3bd81d2`; the fresh-start repos stay at `d3bd81d2`.
- **Z.ai's seed-1115 migration table is not re-measured yet** — it waits for the next *explicit* re-pin, which
  is an Owner/Architect act with a recorded reason, not a side effect of someone committing.
- The 363/363 and 89/89 measured against `6dcf13b` are receipts **for that commit**, not for the pin. That is
  fine and worth saying plainly, because it is exactly the distinction a floating pin would erase.

**A practical demonstration of why floating is wrong, from Claude's own report:** he says "the pin now resolves
to the latest engine commit, so the pin is 6dcf13b". If that were the rule, then the next commit to the engine
would silently invalidate the 363/363 and the 89/89 he just measured — and no receipt in the repo would say so.
That is the failure mode the whole evidence model exists to prevent.

**The re-pin rule I would adopt (this is the "better pin rule" the prompt invites):**

> A pin is a **sha plus a recorded re-pin act**. A re-pin commit states four things: (1) the new sha; (2) what
> changed **in engine terms**, not in code terms; (3) which consumers must re-pin (Cakepanz, fresh-start arms,
> colors); (4) which measurements must be **re-taken** before any number is quoted again — the migration table,
> the flex counts, the bundle deltas. A pin that moves without (2)–(4) is not a re-pin, it is drift.

**Falsifier for my own reading:** if an Owner note I cannot see says R-2 floats, I am wrong and the pin is
`6dcf13b`. I looked in the three places the prompt named and the record is unanimous the other way — but I am
one seat with a worktree, not the Owner's inbox, and I would rather name that limit than paper over it.

## Q2 — `lineup.test.ts` "table" test: stay, rewrite, or go?

**VERDICT: (b) rewrite — keep the structural assertions, drop the `design.json` key-by-key equality — and
refile it out of the engine suite.**

One line why: the equality it asserts is real but it is a **two-copy consistency check on a retired artifact**
(`WEIGHT` in `slots.ts` vs `design.json`), and the engine test suite is the wrong home for it — it makes a data
check read as engine behaviour, and it keeps a weight pin in the suite the Owner just ruled against.

**The evidence, because Claude asked specifically and the code answers him:**

- `slots.ts:18-24` documents it itself: *"RETIRED REFERENCE TABLE (P-318, 14 Nov 2026). Draft, lineup and the
  board no longer read these weights… The table stays because tests and lab tools compare against it, and
  because tools/mathlab/design.json is checked against it key by key."*
- `valueprovider.ts:42` — *"The retired fitted table as a provider… Reference and tests only; nothing in draft
  or lineup defaults to it."*
- `design.json` is still read by `tools/mathlab/check-design.mjs`, which is a real gate: it derives weights from
  a fit, checks the 10-grid and the rank inversions.

So the assertion is **not engine behaviour** (Claude is right) and **not worthless** (it is the only thing that
notices `SLOTS.weight` and `design.json` drifting apart). It is a consistency check wearing an engine test's
clothes.

**What I would do, concretely:**

1. **Keep** the structural parts: 32 spots, the key set equal to `SLOT_IDS`, every weight on the 5-grid. Those
   are convention checks and they cannot go stale.
2. **Keep `QB === 1000`, but reframe it** as the *scale normalisation* (the table's unit is "QB = 1000"), not as
   a pinned weight. Same assertion, honest name.
3. **Drop the `design.json` equality from this file** and move it to `tools/mathlab/check-design.mjs`, which
   already loads `design.json` — it becomes one more line there, and it keeps running before a build is quoted.
4. **Add the guard that is actually missing.** Nothing currently fails if someone wires `WEIGHT` back into the
   solver and the product silently returns to the retired table:
   ```ts
   // P-318: fails if the product ever starts reading the retired table again.
   assert.equal(DEFAULT_VALUES.name, 'measured');
   ```
5. **Refile** as `weights-table.test.ts` (or fold into the lab gate), so the engine suite tests engine behaviour.

**Why not (a) stay as-is:** it is defensible — it pins *equality*, not a magnitude — but it fails the labelling
test and it leaves a dead-artifact check where the next reader will trust it as an engine test. **Why not (c)
delete:** it would remove the only guard on `SLOTS.weight` vs `design.json`, and `tableValues()` still uses
`WEIGHT` for lab comparisons, so drift there is not harmless.

## Q3 — The lineup gap, recomputed under the measured provider

**VERDICT: CONFIRMED. 2773.04 and CB3←TE both check out, and the provider attribution is correct — 2700/SAM←TE
is the reference table, not a contradiction.**

One line why: I recomputed it two ways from the engine source and got the same numbers to 10 decimal places, and
then ran the shipped test and read its own diagnostic.

**What I ran.** Extracted `colors/src`, `colors/test`, `data/`, `tools/mathlab` from
`origin/architect/engine-and-seats` into `/tmp`, then:

```js
// /tmp/gap.mjs — reimplements the test's own fixture (natural(70), one ILB) and prints both providers
const l43 = lineupFor(flat, '4-3', prov), l34 = lineupFor(flat, '3-4', prov);
console.log(prov.name, l43.value, l34.value, l43.value - l34.value, flexed);
```

```
measured  provider=measured
  V(4-3)=603998.6499  V(3-4)=601225.6113  gap=2773.0387
  flexed=[["TE3","FB",6],["DT2","SS",6],["CB3","TE",6]]
table     provider=table
  V(4-3)=600250.0000  V(3-4)=597550.0000  gap=2700.0000
  flexed=[["TE3","FB",6],["DT2","OLB",6],["SAM","TE",6]]
```

And the shipped test's own diagnostic (`node --test test/nfl/lineup.test.ts`, 34/34 pass):

```
REPORT: 4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202
        (flex cost 2773.038661417323, spot-value difference 0)
REPORT (not a gate): third stand-in = [["CB3","TE",6]]
```

**So:**

| | measured (`DEFAULT_VALUES`) | reference table (`tableValues()`) |
|---|---|---|
| V(4-3) | 603,998.6499 | 600,250 |
| V(3-4) | 601,225.6113 | 597,550 |
| **gap** | **2773.04** | **2700.00** |
| third stand-in | **CB3←TE @ 6** | SAM←TE @ 6 |
| middle stand-in | DT2←SS @ 6 | DT2←OLB @ 6 |

Claude's figures are right on every count, and the provider attribution is right: **2700/SAM←TE belongs to the
reference table; 2773.04/CB3←TE belongs to the measured default.** They are two measurements of the same
accounting identity under two providers, not a disagreement.

**One thing to fix while you are in that file — and it is the same defect class as the 867/871 one.** The test's
own comment says:

> "…it moves whenever the value provider, the flex table or the third stand-in moves (**it is 2700 today**)."

**That parenthetical is false for the code as written.** The test calls `lineupFor(flat, '3-4')` with no
provider, so it runs under `DEFAULT_VALUES` and the total is **2773.04**, as its own diagnostic prints. 2700 is
what you get under `tableValues()`. The comment should read *"it is 2773.04 under the measured provider (2700
under the reference table)"*. One line, but it is the kind of line a future agent will quote instead of running
the test — which is precisely how today's 867/871 happened.

**Also worth recording:** the whole gap is flex cost — `spot-value difference = 0`. That is the identity doing
its job (same 70-OVR roster, same spot values, only the flex prices differ), and it is why the test is gated as
an accounting identity rather than a number. That part is well built.

PRIORITY+: P1 · Q1: the pin is FIXED at `d3bd81d2`; R-2 does not float, nothing re-pins, and Z.ai's migration
table waits for an explicit re-pin · owner: if you did rule R-2 as "floating", say so and I will redo Q1 — the
live record says the opposite, unanimously · deliverable: this review · evidence: `AGENTS.md:46,73`,
`PROJECT-KNOWLEDGE.md:18`, `zai-fourslice-reply-authoring-cost-2026-11-15.md:477`, `slots.ts:18-24`,
`valueprovider.ts:42`, `lineup.test.ts:240`, and the two recomputations quoted above