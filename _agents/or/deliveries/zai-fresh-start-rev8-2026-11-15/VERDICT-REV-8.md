# VERDICT-REV-8.md — the Rev 6 verdict restated on the Rev 8 evidence (Part F)

Seat: Z.ai · 2026-11-15 · one page · this RESTATES, it does not re-pick: I measure, I build, I
receipt; the council adjudicates; the Owner rules.

## The verdict

**WASH — narrow Svelte lean, quoted with NO number attached.** No cutover. The Owner should pick on
team familiarity unless the sealed-recipe second-agent bench separates the arms. The lean now rests
on first-try greens (2 vs 0 across E1's four slices) and the cleaner-template feel (E4 self-report)
— and on nothing else, because every counted proxy it stood on has died under re-measurement (below).
The prior "~55%" figure is WITHDRAWN per the Rev 8 instruction: a number here is an opinion until a
second agent runs the sealed-recipe handicap (SEALED-RECIPE.md, sha 7fcc3fc0…, status OWED — the
recipe ships, the bench is unrun by design; SECOND-AGENT-HANDOFF.md §9).

## The corrected numbers this restatement carries

1. **Repair cycles carry their scope (0.2):** 4 slices (a–d) svelte 10 vs vue 9; with the Part B
   week-stepper (svelte 1, vue 2) the full five-slice count is **11 vs 11 — a tie**, which supports
   the WASH rather than weakening it.
2. **Workarounds (0.3):** the receipted figure is **4 vs 3 — Vue has FEWER**. The DELIVERY-NOTE's
   "fewer workarounds: 4 vs 6" was wrong and is struck as a lean reason.
3. **Fidelity pin (0.6):** cards = **871** (not 867) in both arms — the battery JSONs are the source;
   ALL EQUAL per screen stands (871/457/470/125/221/39), re-run this sitting, 24/24 PASS both arms.
4. **Framework-owned lines (0.8):** under the stated reproducible method the Rev 6 baseline is
   **878 vs 883 — a 5-line tie**, not "985 vs 880". Two of the three counted proxies the Rev 6 lean
   cited (workarounds, lines) do not survive a stated method.
5. **Facade vs wrappers (0.9):** restated as a wash — one facade object costs ~12 lines including its
   methods; five separate wrappers plus three free functions cost ~12 lines.

## The store table (Part A — the question Rev 6 did not answer)

| pattern | fields | arm | lines | checker | build | repairs | first-try | call sites |
|---|---|---|---|---|---|---|---|---|
| class (instance bridge) | 2 | svelte | 32 | 0/0 | exit 0 | 1 | no | 2 |
| facade (module-level) | 2 | svelte | 37 | 0 diag | exit 0 | 0 | no | 11 |
| facade (module-level) | 11 | svelte | 45 | 0 diag | exit 0 | 1 | no | 2 |
| class (instance bridge) | 11 | svelte | 50 | 0 diag | exit 0 | 1 | no | 2 |
| Pinia (setup store) | 2 | vue | 39 | 0 errors | exit 0 | 1 | no | 10+1 |
| Pinia (setup store) | 11 | vue | 49 | 0 errors | exit 0 | **0** | **yes** | 2 |

Full receipts with commands: PART-A-CLASS-BRIDGE.md. The finding: **in THIS tree the class needs NO
facade and pays nothing for skipping one** (class@11 50 L vs facade@11 45 L vs Pinia@11 49 L, all
0-diagnostics, all build-green). Ernie's −11 L class-vs-Pinia delta did NOT reproduce here (+1 L;
ratio 1.020 vs Ernie's 0.871) — the idiom delta's SIGN depends on the seat and the shape, not on the
framework; at 2 fields the class is the smallest cell (32 L). The class-bridge question is closed as
a structural argument: no idiom separates beyond noise at either scale in either seat.

## The sealed recipe (Part B) and the falsifier (B3)

- **Status: OWED, recipe shipped** (SEALED-RECIPE.md, sha 7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f59
  1f5bb6746f85458e14f07; Flip Bench extended and reporting OPEN — flip-bench/sealed-run-receipt.json).
- **Flip (to Vue):** a second agent, same protocol, sealed: Svelte's repair count ≥ 2.0× Vue's on the
  11-field store AND Svelte 0 first-try greens while Vue ≥ 1.
- **Confirm (Svelte lean):** Svelte's repair count strictly below Vue's (< 1.0×).
- Different thresholds by design (separation vs direction); between 1.0× and 2.0× the WASH stands.
- **The sentence that would have to be true to flip the pick:** "An agent who never saw this tree,
  authoring both arms against the sealed recipe, needed at least twice as many stops to get the
  Svelte arm's store green as the Vue arm's, and never went first-try green in Svelte."
- **My own-verdict killer (built and shipped):** the gate-5 falsification probe — a file
  svelte-check passes 0/0 that the build rejects (state_invalid_export) — proves typechecker-only
  greens are worthless; it is now gate 5's build-green clause (Part C1). Any future "green" receipt
  that cites only a checker is void under this tree's own rules.

## What Rev 8 changed about the Rev 6 verdict — one line

The Rev 6 verdict survives as a WASH but loses two of its three counted proxies to re-measurement
(workarounds, lines) and loses its structural residual to Part A (the class bridge closes row 9's
question in the class's favor), so the lean now rests on first-try greens and feel alone, is quoted
with no number, and its flip/confirm is delegated to the sealed-recipe bench that ships owed.
