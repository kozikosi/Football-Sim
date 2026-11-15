SPEAKER: OR | ROLE: council seat | TASK: Council Rev 6 — Q1 engine pin, Q2 lineup "table" test, Q3 lineup gap (tested, not read) | DATE: 2026-11-15T22:20Z
FOR: P-342 (engine rebuild / 1b slice)

# Three answers — Q1 pin, Q2 table test, Q3 the gap (recomputed)

## Q1 — Engine pin: floating or fixed?

**VERDICT: fixed. The pin is `d3bd81d2`. R-2 does not mean "float to the latest engine commit".**

One line why: **every live citation of R-2 names a specific sha, and no live doc says the pin "resolves to latest"** — `AGENTS.md:46` says "The current engine pin ... `d3bd81d2`", `AGENTS.md:73` says "pin `d3bd81d2`, Owner 2026-11-15, R-2", `PROJECT-KNOWLEDGE.md:18` says "Engine pin: `d3bd81d2` (current; R-2, 2026-11-15)", and Ernie's start-of-chat says "R-2 pins the engine at `d3bd81d2`". The phrase "whatever claude built last" describes how d3bd81d2 was chosen at R-2 time; it is not a floating rule.

**Consequences of this reading (fixed, which holds):**
- `6dcf13b` (Claude's 1b slice commit, today) is simply the latest engine commit. It is not the pin and does not become one by being newest.
- Nothing re-pins. Cakepanz stays at `d3bd81d2`; colors stays at `d3bd81d2`; fresh-start repos stay at `d3bd81d2`.
- Z.ai's seed-1115 migration table waits for the next *explicit* re-pin — an Owner/Architect act with a recorded reason — not a side effect of someone committing.
- The 363/363 suite and 89/89 type ratchet measured against `6dcf13b` are receipts *for that commit*, not for the pin. Saying so plainly is exactly the distinction a floating pin would erase.

**Proposed re-pin rule:** a pin is a sha plus a recorded re-pin act. A re-pin commit states four things: (1) the new sha; (2) what changed *in engine terms*, not code terms; (3) which consumers must re-pin (Cakepanz, fresh-start arms, colors); (4) which measurements must be re-taken before any number is quoted again. A pin that moves without (2)–(4) is drift, not a re-pin.

**Falsifier for my reading:** if an Owner note I cannot see says R-2 floats, I am wrong and the pin is `6dcf13b`. I checked AGENTS.md, PROJECT-KNOWLEDGE.md, and all 31 owner-notes (stopping at 2026-11-02) — the record is unanimous the other way, but I am one seat with a worktree, not the Owner's inbox.

## Q2 — `lineup.test.ts` "table" test: stay, rewrite, or go?

**VERDICT: (b) rewrite — keep the structural assertions, drop the `design.json` key-by-key equality — and refile it out of the engine suite.**

One line why: the equality it asserts is real but it is a **two-copy consistency check on a retired artifact** (`SLOTS[].weight` vs `tools/mathlab/design.json`), and the engine test suite is the wrong home for it — it makes a data check read as engine behaviour, and it keeps a weight pin in the suite the Owner just ruled against (15 Nov).

**The evidence from the code itself:**

| location | what it says |
|---|---|
| `colors/src/sports/nfl/engine/slots.ts` | doc-comment: *"RETIRED REFERENCE TABLE (P-318, 14 Nov 2026). Draft, lineup and the board no longer read these weights… The table stays because tests and lab tools compare against it"* |
| `colors/src/sports/nfl/engine/valueprovider.ts` | *"The retired fitted table as a provider… Reference and tests only; nothing in draft or lineup defaults to it"* |
| `tools/mathlab/check-design.mjs` | still loads `design.json` — a real gate that derives weights from a fit |

**What I would do concretely:**

1. **Keep** the structural parts: `SLOTS.length === 32`, key set equals `SLOT_IDS`, every weight a multiple of 5, `WEIGHT.QB === 1000`. These are convention checks that cannot go stale.
2. **Keep `QB === 1000` but reframe** it as *scale normalisation* ("the table's unit is QB = 1000"), not a pinned weight.
3. **Drop the `design.json` equality from this file** and move it to `tools/mathlab/check-design.mjs`, which already loads `design.json` — it becomes one more line there and keeps running before any number is quoted.
4. **Add the guard that is actually missing.** Nothing currently fails if someone wires `WEIGHT` back into the solver:
   ```ts
   // P-318: fails if the product ever starts reading the retired table again.
   assert.equal(DEFAULT_VALUES.name, 'measured');
   ```
5. **Refile** as `weights-table.test.ts` or fold into the lab gate, so the engine suite tests engine behaviour.

**Why not (a) stay as-is:** it pins equality, not a magnitude — defensible — but it leaves a dead-artifact check where the next reader trusts it as an engine test. **Why not (c) delete:** it would remove the only guard on `SLOTS.weight` vs `design.json` drift, which `tableValues()` still uses for lab comparisons.

## Q3 — The lineup gap, recomputed under the measured provider

**VERDICT: CONFIRMED. 2773.04 and CB3←TE both check out, and the provider attribution is correct — 2700/SAM←TE is the reference table, not a contradiction.**

One line why: **I recomputed it two ways from the engine source and got identical results to 10 decimal places, then ran the shipped test and read its own diagnostic.**

**Recomputation (from `colors/src/sports/nfl/engine/`, natural-70 roster):**

| provider | V(4-3) | V(3-4) | gap | third stand-in |
|---|---|---|---|---|
| `DEFAULT_VALUES` (measured) | 603,998.6499 | 601,225.6113 | **2773.04** | **CB3←TE @ 6** |
| `tableValues()` (reference table) | 600,250 | 597,550 | **2700.00** | **SAM←TE @ 6** |

**Shipped test diagnostic (`node --test test/nfl/lineup.test.ts`, 34/34 pass):**

```
ℹ REPORT: 4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202
          (flex cost 2773.038661417323, spot-value difference 0)
ℹ REPORT (not a gate): third stand-in = [["CB3","TE",6]]
```

**So:**
- The recomputed gap under `DEFAULT_VALUES` is **2773.04** — Claude's figure checks out.
- The third stand-in is **CB3←TE @ 6** — Claude's figure checks out.
- **2700/SAM←TE is the reference table** (`tableValues()`), **not a contradiction** — Claude's attribution is correct. They are two measurements of the same accounting identity under two providers.
- The whole gap is flex cost — `spot-value difference = 0`. That is the identity doing its job: same 70-OVR roster, same spot values, only the flex prices differ.

**One thing to fix while you are in that file — same defect class as the 867/871 one.** The test's own comment says:

> "…it moves whenever the value provider, the flex table or the third stand-in moves (**it is 2700 today**)."

That parenthetical is **false** for the code as written. The test calls `lineupFor(flat, '3-4')` with no provider override, so it runs under `DEFAULT_VALUES` and the total is **2773.04**, as its own diagnostic prints. 2700 is what you get under `tableValues()`. The comment should read *"it is 2773.04 under the measured provider (2700 under the reference table)"*. One line, but it is the kind of line a future agent will quote instead of running the test — which is precisely how today's 867/871 happened.

---

PRIORITY+: P1 · Q1: the pin is FIXED at `d3bd81d2`; R-2 does not float, nothing re-pins, Z.ai's migration table waits for an explicit re-pin · Q2: rewrite (b) the table test — keep structure, drop design.json equality, add DEFAULT_VALUES guard, refile out of engine suite · Q3: gap CONFIRMED as 2773.04/CB3←TE under measured provider; 2700/SAM←TE is the reference table; fix the false "2700 today" comment · owner: if you ruled R-2 as floating, say so and I will redo Q1 — live record says fixed unanimously · evidence: `AGENTS.md:46,73`, `PROJECT-KNOWLEDGE.md:18`, `slots.ts` RETIRED table doc, `valueprovider.ts`, `lineup.test.ts:240–276`, two independent recomputations quoted above
