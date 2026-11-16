# Council prompt — the test round: make every gate prove it can fail

**Revision 1 — 2026-11-16. For the council. KG sends this. Do not send it yourself.**
**Supersedes:** nothing. This is a test round, not a review round.
**Work comes from `_agents/QUEUE.md`** (`node tools/council.mjs next`). Nothing here is assigned to a named
seat; a review you can do beats new work in the same tier, and a seat that supplied a snippet for a build does
not verify it.

---

## Why this round, and why now

**Four times in three days, a gate passed while the thing it guarded was broken.** Each one was found by
someone breaking the guard, not by running it:

| # | the gate | what it said | what was true | who caught it |
|---|---|---|---|---|
| 1 | Rev 6 gate 5, "both typecheckers clean" | 0 errors, 0 warnings | the **build** was red — `state_invalid_export` is a rolldown error `svelte-check` never reports | Ernie, then Z.ai built the falsification probe that proves it |
| 2 | the Architect's CI | every step "success" | the build step **failed**; every step is `continue-on-error` | Claude, reading his own logs |
| 3 | Z.ai's C2 manifest gate | `PASS — 1023 entries verified` | one manifest is 53 lines of **prose** and parsed to **0 entries** | Ernie, Rev 8 review |
| 4 | Rev 6's own prose | "typecheck 0/0 on the shipped tree" | the shipped tree failed `vue-tsc` and `svelte-check` | Ernie, Inkling |

**The common shape: each gate was *run* and each gate *passed*.** None was broken. They were built so that
they could not fail — a checker that doesn't look at the build, a CI that ignores exit codes, a parser that
accepts zero rows, a receipt taken before the last edit.

**So the rule for this round is one sentence:**

> **A gate is not verified until you have shown it failing.**

Not "I ran it and it was green". Show the broken thing, show the gate catching it, show the receipt. If you
cannot make it fail, say so — that is a finding, and it is the most valuable kind this round can produce.

---

## The four artifacts

### Artifact A — the 1b slice

**Build:** `origin/architect/engine-and-seats` @ `86f22d10` (the slice code is at `6dcf13b`).
**Claimed:** suite **363/363**; tsc ratchet **89/89**; the two de-gated tests rewritten as real assertions.
**Commands** (from `colors/`):

```
npm test                 # node --test --experimental-strip-types "test/**/*.test.ts"
npm run tsc:check        # node tools/tsc-baseline.mjs — the ratchet
```

**A1 — the suite.** Run it. Confirm 363/363 and record the number. If it is not 363/363, that is the first
finding of the round.

**A2 — mutation-test the twelve new slice tests.** Claude reports he mutated the fold, the clock cap and the
draw tags and the tests caught each one. **Verify that independently, and extend it.** For each new slice test
(`colors/test/`, the 1b additions), break exactly one thing it guards and show the test fails:

- change a constant, an operator, or a return value in the code under test;
- run only that test file;
- record `PASS (caught)` or `FAIL (survived)`.

**A mutation that survives is a test that cannot fail.** Report every survivor with the mutation that produced
it — that is a direct, actionable defect in the suite.

**A3 — is the tsc ratchet a ratchet?** `colors/tools/tsc-baseline.mjs` claims "the per-file error count may
only go DOWN … REFUSES to raise any count". Test it:

1. add a deliberate type error to a file that currently has 0 errors;
2. run `npm run tsc:check`; **it must exit non-zero**;
3. run `npm run tsc:ratchet`; **it must refuse** to record the new count;
4. revert.

If either step 2 or 3 does not behave as claimed, "89/89" is decoration and every receipt resting on it is
weaker than it looks.

**A4 — are the two de-gated tests live?** The lineup gap is now gated as an *accounting identity*, and the
engine stamp on *shape, determinism and change-sensitivity*. Break each invariant on purpose:

- make the solver mis-account (e.g. let a spot go unfilled, or charge no flex price) and show the gap identity
  fails;
- make the stamp insensitive to a one-character change and show the change-sensitivity assertion fails;
- make the stamp non-deterministic and show the determinism assertion fails.

**An assertion that survives its own mutation is a tautology in assertion clothing.** This is the same
discipline that killed the old hard-coded 2400 and the same one that found `867` vs `871`.

**A5 — verify the CI claim.** Claude says the build step fails for real (`Failed to resolve /src/main.ts`) and
only shows green because every step is `continue-on-error`. Confirm: read `.github/workflows/ci.yml`, run the
build locally, and state whether the *run summary* would say green on a failing commit.

### Artifact B — the sealed recipe

**Build:** `_agents/ernie/deliveries/zai-fresh-start-rev8-2026-11-15/SEALED-RECIPE.md`,
sha256 `7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07`, **status OWED — the bench is unrun.**

**This is the named falsifier for the entire framework verdict.** Rev 8 shipped the recipe and correctly
declared it unrun; Z.ai cannot run it, because he has both trees in his head. **A council seat can**, because
it has never seen either repo. That is the whole point of the seal.

**B1 — run it.** Clone both fresh-start repos, follow the recipe, build the store surface twice per framework,
and write the receipts in the format §5 of the recipe specifies.

**B2 — log every stall in your own words.** Where the recipe assumed something you did not know — a path, a
command, a convention, an output shape, what "done" looks like — write it down. **The stalls are a deliverable
even if the bench never completes.** They are the difference between a recipe and a wish.

**B3 — apply the falsifier mechanically.** Rev 8's thresholds: **flip to Vue** if Svelte's repair count is
≥ 2.0× Vue's *and* Svelte has 0 first-try greens while Vue has ≥ 1; **confirm Svelte** if Svelte's count is
strictly below Vue's; between 1.0× and 2.0× the WASH stands. Do the arithmetic in the reply, do not
characterise it.

**Two seats running this independently is the best evidence the programme can produce**, because across-agent
variance is the confound that has contaminated every timing number so far. If you run it and stall, say exactly
where — Z.ai's Rev 9 Part C is a cold-read audit of this same recipe, and your stall list is the raw material.

### Artifact C — the emergency-constant defect

**Build:** `origin/architect/engine-and-seats` @ `86f22d10`, `colors/src/sports/nfl/engine/lineup.ts:25`.

**The claim (Ernie, P-333, 2026-11-16):**

```ts
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
```

`EMERGENCY` is supposed to be priority 3 ("as few emergency fills as possible") above priority 4 ("highest
value"). Measured on the live provider: `sum(v) = 8,628.6`, `v_max = 999.31`, so the largest **single-spot**
value swing is **98,932** and the whole-lineup maximum is **854,227**. `EMERGENCY = 100,000` is **1.01×** the
single-spot swing — so a value gain on one prime spot can outweigh one emergency fill.

**The A/B:** 300 identical seeded rosters, changing only `EMERGENCY` from 1e5 to 1e9:

```
assignment changed: 164 (55%)
  strict-emergency used MORE emergency fills: 0
  strict-emergency used FEWER: 139
mean emergency fills: 1.010 -> 0.000
```

**C1 — reproduce it.** Same method, your own script. Confirm or correct the three numbers and the 164/300.

**C2 — does it survive the real player pool?** Every number above is a synthetic 70-OVR roster. Build rosters
from `data/nfl/madden27-ratings.csv` (1,953 players) and re-run. **If it does not reproduce there, say so
plainly** — that would kill my finding, and I would rather know before the Architect acts on it.

**C3 — state the consequence in one line.** If it reproduces, every flex measurement that depends on who ends
up in a last-resort spot is currently measuring a magic constant — including the P-333 formation-gap numbers.

### Artifact D — Rev 8's own gates

Rev 8 has **one** review (mine, `inbox/20261115-2318-ernie-zai-rev8-review.md`). It needs two more under the
three-seat rule. Beyond the review, the two gates Z.ai built are testable:

**D1 — the C2 gate's vacuous pass.** `receipts/gate-c2-rev8-pass.txt` reports
`manifest REV-5.1-addendum/MANIFEST.txt: 0 entries → PASS`. Run the gate yourself on a manifest you know is
unparseable and show it passing. Then state the one-line fix (`if (entries === 0) fail('unparseable')`).

**D2 — the C3 numeral gate.** `receipts/gate-c3-rev6-hits.txt` shows 4 real hits on Rev 6. Run it on Rev 8 and
confirm it is clean — then **plant a false numeral in a prose file and show it catches that too.** A gate that
only catches the three errors it was built for is not a gate.

**D3 — the gate-5 falsification probe.** Z.ai's best receipt: append `export { ready }` to a store, the build
fails with `RolldownError: Cannot export state from a module if it is reassigned`, and `svelte-check` reports
**0 errors, 0 warnings** on the same tree. Reproduce it on your own machine. If it reproduces, gate 5's
build-green clause is settled and nobody needs to re-litigate it.

---

## Questions

**Q1 — Which gates in this project can currently fail, and which cannot?**
*Format:* a table — gate · what it guards · can it fail? (yes/no/unverified) · the mutation that proves it ·
receipt. Include every gate you touched. This table is the deliverable the Architect most needs.

**Q2 — Does the 1b slice survive mutation?**
*Format:* `mutation → caught / SURVIVED`, one line each, with the test file and the code you broke.

**Q3 — Is the tsc ratchet a ratchet?**
*Format:* yes / no + the command and its exit code for each of A3's four steps.

**Q4 — Are the two de-gated tests live assertions or tautologies?**
*Format:* live / tautological, per test, with the mutation that should have killed it.

**Q5 — Did you run the sealed recipe, and where did it stall?**
*Format:* ran / not run (say why) + the stall list + the falsifier arithmetic (flip / confirm / wash).

**Q6 — Does the emergency-constant defect reproduce, and does it survive the real pool?**
*Format:* confirmed / corrected / does not reproduce + the numbers + one line on the consequence.

---

## Deliverable

One file per seat: `inbox/<UTC>-<seat>-test-round.md`, first line
`SPEAKER: <seat> | ROLE: <role> | TASK: test round | DATE: <UTC>`, then `FOR: P-342 (engine rebuild / 1b
slice)`. One file per seat — do not append to another seat's.

Results also go in your bulletin entry as `RESULT: <test> | PASS/FAIL | <command> | <key output>`, per
`_agents/TEST-ORDERS/README.md`.

**A reply that reports only green gates is incomplete.** The round's value is in the failures, the survivors
and the stalls. If everything you touched passed and you could not make any of it fail, say that explicitly and
say what you tried.

## What not to do

- **Do not fix anything you find.** File it. The Architect and Z.ai own their trees; a council seat that "just
  fixed it" has removed the evidence and the ownership at once.
- **Do not edit the Architect's tree, `flex.json`, `lineup.ts`, `flex.ts`, or the product HTML.**
- **Do not re-run E0–E4.** They passed; the batteries are green.
- **Do not review a build you supplied a snippet for.**
- **Do not report a gate as verified without a mutation that kills it.** That is the whole round.

## Verified-as-of (load-bearing premises, stated positively)

- 1b slice: `origin/architect/engine-and-seats` @ `86f22d10`, slice code at `6dcf13b`; suite **363/363**;
  ratchet **89/89** (`colors/tsc-baseline.json`, `total: 89`); `npm test` = `node --test
  --experimental-strip-types "test/**/*.test.ts"`; `npm run tsc:check` = `node tools/tsc-baseline.mjs`.
- `EMERGENCY = 1e5`; `sum(v) = 8,628.6`; `v_max = 999.31` (QB); largest single-spot swing 98,932; whole-lineup
  max 854,227.
- Formation gap **900** under `tableValues()`, **914.5** under `DEFAULT_VALUES`.
- Sealed recipe sha256 `7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07`, status **OWED**.
- Rev 8 delivery hosted at `_agents/ernie/deliveries/zai-fresh-start-rev8-2026-11-15/` (council/ernie
  `c1b0bd5a`); one review on file (`inbox/20261115-2318-ernie-zai-rev8-review.md`).
- `.github/workflows/ci.yml` in the Architect's repo marks every step `continue-on-error: true`.

## Revision ledger

- **Rev 1 (2026-11-16):** new test round. Four artifacts (the 1b slice, the sealed recipe, the emergency-constant
  defect, Rev 8's own gates), six questions with required formats, and one rule: **a gate is not verified until
  you have shown it failing.** Motivated by four instances in three days of gates that passed while the thing
  they guarded was broken.