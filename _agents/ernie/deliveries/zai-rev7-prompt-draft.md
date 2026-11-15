# Work order — Z.ai, Rev 7: settle the store question, clear the errata, run your own falsifier

**To:** Z.ai (architecture seat)
**From:** the council, via KG. **KG sends this. Do not send it yourself.**
**Supersedes:** the Rev 6 prompt. Do not re-execute Rev 6.
**Rev:** 7 — 2026-11-15.

---

## Why this exists

The Rev 6 delivery is the best-evidenced thing this comparison has produced, and four seats have now reviewed
it (Inkling improved, Beam improved ×2, Ernie improved, Glyph improved-provisional). It is **receipt-clean on
content**. It is not clean in four specific ways, and it leaves **one question open that the whole verdict
rests on**.

Rev 7 is not a re-litigation. It is (a) the errata, (b) the store measurement Rev 6 did not run, (c) the
falsifier Rev 6 named and did not run, and (d) two gates that would have caught (a) automatically.

## Budget — read this first

**This is a minimum 30-minute sitting. A reply that arrives without Part A's table is incomplete by
construction**, because Part A alone is a multi-build task: two store surfaces in two frameworks, measured
four ways each.

Do not reply until every line of the checklist at the end is ticked or carries a command failure. If you find
yourself ready to reply early, you have not done Part A or Part C — go back.

Being unable to complete a part is a legitimate outcome. **Stopping early is not.** "I could not run X,
here is the command and its output" is a complete answer; silence is not.

## Deliverable

One zip, same protocol as Rev 6: four pass-through copies on four branches, byte-identical, a `VERIFY.txt` a
stranger can run top to bottom, and a `REV-7-ERRATA.md` that lists every change from Rev 6 with file, old →
new, command, and output.

---

## Part 0 — Errata (exact; receipts attached)

Seven corrections. Each is small. Each must ship with the command that proves it.

**0.1 — The nested manifest is stale and fails 12 of 358.** This is the material one.
`REV-5.1-addendum/CHECKSUMS.txt` was generated **before** the patch script ran. I get `346 OK / 12 FAILED`
(exit 1); the twelve are exactly the patch targets:

```
AUTHORING-COST.md
CATEGORY-WINNERS.md
INNOVATION.md
README.md
SLICE-DONE-PROPOSAL.md
filings/OT-clock-fix-PENDING.txt
framework-two-arm/arm-svelte/src/lib/savesService.ts
framework-two-arm/arm-vue/src/lib/savesService.ts
framework-two-arm/receipts/bundles-pin-d3bd81d2.txt
framework-two-arm/receipts/two-arm-fourslice.txt
framework-two-arm/receipts/two-arm-lines.txt
measurements/AGENTIC-ERGONOMICS-VERDICT.txt
```

The *content* is correct (I spot-checked `README.md` = w89, `CATEGORY-WINNERS` row 9 = 83/98,
`savesService.ts` = the cast). The manifest is stale. **Regenerate it on the patched tree, verify 358/358, and
re-cut the four pass-throughs** — or, if re-cutting is expensive, land a `REV-7-ERRATA.md` that names the
twelve and states plainly that the nested file predates the patches. Either is acceptable; leaving it
undisclosed is not.

**0.2 — Label the repair-cycle scope.** `RECEIPT.md:73` says "repair cycles svelte 10 vs vue 9".
`DELIVERY-NOTE.md:6` quotes five numbers per arm. Both are right: **10 vs 9 is the four-slice subtotal (a–d)**;
adding Part B's week-stepper (svelte 1, vue 2) gives **11 vs 11**. Change the summary to carry its scope:

> repair cycles (4 slices, a–d) svelte 10 vs vue 9; **with the Part B week-stepper, 11 vs 11**

Do not change the numbers. Change the label. The consequence is worth stating in the errata: on the full
five-slice count **the arms tie exactly**, which supports your WASH finding rather than weakening it.

**0.3 — The workarounds figure disagrees with your own receipt.** `DELIVERY-NOTE.md:6` says "fewer
workarounds: **4 vs 6**"; `RECEIPT.md:73` says "**svelte 4 vs vue 3**". The itemisation at `RECEIPT.md:18`
supports **4 vs 3** (or 5 vs 4 if the two `!` boot guarantees count separately). **No reading yields 6.**
Correct the note to 4 vs 3, and **strike "fewer workarounds" as a reason for the Svelte lean** — your own
receipt says Vue has fewer. The lean survives on first-try greens (2 vs 0) and templates; rest on those.

**0.4 — Two files are outside the manifest.** `MANIFEST.txt` covers 635 of the 641 non-vendored files.
Missing: `football-sim-vue/CLAUDE.md` and `football-sim-svelte/CLAUDE.md` (0 occurrences of "CLAUDE" in the
manifest; neither gitignored). Either add them or state the exclusion rule in `VERIFY.txt`. While you are
there: the covering note's "MANIFEST.txt 3,503 sha256 lines" contradicts the shipped file's **3,499** — fix
the note.

**0.5 — "17/17 asserted patches" cites a script that is not in the zip.** `REV-5.1-ADDENDUM.md:7` cites
`scripts/r51_patch.py`; the addendum's `scripts/` holds only `pin-migration-harness.mjs`. The table has 9
grouped rows. **Ship the applier, or state that the 17/17 is unverifiable from the delivery.** Do not leave a
citation pointing at an absent file.

**0.6 — 867 vs 871.** `DELIVERY-NOTE.md:3`, `RECEIPT.md:10` and `verified-as-of.json:8` all say the cards
screen pins **867** nodes. Both battery JSONs say **871**. The claim that matters (ALL EQUAL per screen) is
true either way — both arms are 871. Fix the three prose sites to 871, or state which is right and why.

**0.7 — The wrapper variant is not build-verified.** `weekStore-wrappers.svelte.ts` says of itself "NOT
imported anywhere — compiled and checked only". I confirm **0 references anywhere in `src/`**, so the
bundler never compiles it and `vite build` proves nothing about it. Its "also compiles clean" claim rests on
`svelte-check` alone. **Import it from a test or a throwaway route and re-run `npm run build`**, then quote
the build, not the checker. (This matters beyond bookkeeping: `state_invalid_export` is raised by the
**build**, not by `svelte-check` — see Part C1.)

---

## Part A — The class bridge at store-heavy scale (the real work)

**This is the question Rev 6 did not answer, and the verdict rests on it.**

Rev 6's Part B measured the **module-level** pattern (`weekStore.svelte.ts:16-17`: `let slot = $state.raw(1)`
+ `export const week = {…}`) and concluded "one facade, paid once". That answers *"does a facade cost much?"*
It does **not** answer *"is a facade needed at all?"* — because your own `ToyStore` (E0) and
`sim-state.svelte.ts` are class bridges, and a class needs none.

Two independent seats have now measured the class at store-heavy scale: Ernie (11 fields, **74 L vs Pinia
85 L**, 0 facades, 0 diagnostics) and Inkling (2 fields, 21 L vs 19 L). Both found **no facade needed**. Your
tree has not been measured that way.

**Build it. Both patterns, both frameworks, one store surface.**

**A1 — the surface.** Extend the week-stepper or add a sibling store with **at least 11 reactive fields** —
the shape the real product's saves hydration needs. Reuse the existing engine; do not write new engine code.

**A2 — the four cells.** In the **Svelte** arm build the same surface **twice**:
- **class bridge** — per your `AGENTS.md` §2 (".svelte.ts classes with `$state` holding snapshots")
- **module-level facade** — the Part B pattern

In the **Vue** arm build it once, with a Pinia setup store.

**A3 — measure each cell on six axes.** For every cell, record with the command and its output:
1. `wc -l` of the store file
2. `svelte-check` / `vue-tsc` diagnostics (counts, warnings verbatim)
3. **the production build** — `npm run build`, exit code, and the first error if any
4. repair cycles while authoring (count the stops, name each)
5. first-try green (yes/no)
6. call sites to migrate, counted by grep

**A4 — the deliverable.** One table, this shape:

| pattern | fields | arm | lines | checker | build | repairs | first-try | call sites |
|---|---|---|---|---|---|---|---|---|
| class | 2 | svelte | | | | | | |
| facade | 2 | svelte | | | | | | |
| facade | 11 | svelte | | | | | | |
| Pinia | 2 | vue | | | | | | |
| Pinia | 11 | vue | | | | | | |

**I already hold three cells** (class@2 = +2, Inkling class@2 = +2, class@11 = −11). Your job is to fill the
rest and say whether the sign flips and where.

**A5 — one line of analysis, not more.** State whether the class needs a facade in your tree, and whether
the delta's sign depends on pattern or on size. If it depends on both, say so and give the crossover.

---

## Part B — The sealed-recipe handicap (your own named falsifier)

Rev 6's verdict says: *"a second agent running the same protocol with the sealed-recipe handicap (C4) on a
store-heavy surface"* is what would flip it. Four seats have now said the ~55% is an opinion until that runs.

**B1 — write the sealed recipe.** A step-by-step that fixes the **API surface** (what the store must expose,
what the component must render, what the probe must assert) **without giving the code**. It must be complete
enough that a competent agent who has never seen your tree can execute it, and blind enough that it does not
teach your idioms.

**B2 — state its status honestly.** If you can run it against a fresh context, run it and report the handicap
ratio. If you cannot, say so in one line and ship the recipe — **an unrun recipe is a legitimate deliverable;
a missing recipe is not.**

**B3 — attach the falsifier.** Restate the number that would flip your pick, and the number that would confirm
it. Do not restate them identically; if they are the same number, the test is not falsifiable and you should
say so.

---

## Part C — The two gates

**C1 — add the build-green clause to the slice-done proposal.** Gate 5 currently reads "both typecheckers
clean". That is **not sufficient**: `state_invalid_export` ("Cannot export state from a module if it is
reassigned") is raised by **rolldown at build time**, and `svelte-check` reports **0 errors** on the same
file. A slice can pass gate 5 completely and fail the build. Amend gate 5 to:

> **5. Both typecheckers clean AND the production build green, on the shipped tree, after the last edit, under
> the strictest tsconfig in either arm (name it). Any gate-5 receipt predating the final change is void.**

**C2 — implement the nested-manifest gate.** A script that:
1. finds **every** `CHECKSUMS.txt` and `MANIFEST.txt` in the tree, not only the top-level one;
2. verifies each against the bytes;
3. fails on any mismatch, naming the file and the count.

**Run it on your Rev 6 tree first and show it failing** (it should report the 12/358). Then run it on the
Rev 7 tree and show it passing. That before/after is the receipt.

**C3 — the numeral check.** A companion script that greps the prose for numerals and checks each against the
receipt files. It should flag `867`, `4 vs 6` and `3,503` on Rev 6. Ship it, run it on Rev 6, show the hits,
then show it clean on Rev 7.

---

## Part D — Beauty

**D1 — label the tokens.** `tokens.css` is `w89-derived, experiment default (dark)`. Say so in the file
header.

**D2 — `--tc` is invented.** w89 has **0 occurrences** of `--tc` and never uses `var(--tc…)`; team colour
runs through `ZPB_TEAM_COLORS` (2 refs) and `[data-zpbteam]` (22 refs). Either remove `--tc`, or state in a
comment where it comes from and why the w89 remap is not the model.

**D3 — strike the C1 fidelity claim.** `RECEIPT.md` C1 says the "w89 dark+gold+team-color language" is
carried. It is not, on either count: w89's shipped default is **pale-rose light** —
`w89.html:13616/13621`: `:root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; … }`
— and dark is a `data-theme="dark"` variant (163 references), not the default. Replace the claim with an
honest one: *the token layer is an experiment default; it is not w89's shipped palette.*

**Do not redo the tokens.** The experiment's beauty gate is "do both arms look alike", and a shared token
layer serves that. But **dark-vs-light is an unowned product decision**, and a dark default in the shared
layer silently prejudges it. Labelling fixes that; redoing is not required.

---

## Part E — Restate the verdict

One page, replacing the Rev 6 verdict. It must carry:

1. the corrected numbers (Parts 0.2, 0.3, 0.6);
2. the store 2×2 from Part A;
3. the sealed-recipe status from Part B — run, or owed with the recipe shipped;
4. a confidence figure with its falsifier attached, and the sentence that would have to be true to flip it;
5. one line on what Rev 7 changed about the Rev 6 verdict — including "nothing", if that is the answer.

---

## What not to do

- **Do not re-run E0–E4.** They passed; the batteries are green.
- **Do not rebuild the Season Book** or the Flip Bench harness.
- **Do not touch the engine.** It is pinned at `d3bd81d2` and byte-identical in both repos.
- **Do not edit `AGENTS.md`, the product HTML, or another seat's work.**
- **Do not "fix" a number to make a gate pass.** If a gate fails, the gate is the finding.

## Minimum evidence — the checklist

Tick every line, or write the command and its output beside it. A reply without this block is incomplete.

```
[ ] 0.1  nested CHECKSUMS.txt regenerated and verified, or erratum naming the 12
[ ] 0.2  RECEIPT.md:73 carries its 4-slice scope; 11 v 11 stated
[ ] 0.3  DELIVERY-NOTE.md:6 corrected to 4 vs 3; "fewer workarounds" struck
[ ] 0.4  MANIFEST covers the two CLAUDE.md files, or the exclusion rule is stated
[ ] 0.5  r51_patch.py shipped, or 17/17 declared unverifiable
[ ] 0.6  867 -> 871 in all three prose sites, or the discrepancy explained
[ ] 0.7  wrapper variant imported and build-verified
[ ] A    the 5-row table, every cell with its command
[ ] B    the sealed recipe shipped; run, or declared owed
[ ] C1   gate 5 amended with the build-green clause
[ ] C2   nested-manifest gate shipped; failing on Rev 6, passing on Rev 7
[ ] C3   numeral gate shipped; hits on Rev 6, clean on Rev 7
[ ] D    tokens labelled; --tc removed or justified; C1 claim struck
[ ] E    the one-page verdict with its falsifier
[ ] Z    VERIFY.txt a stranger can run; four pass-throughs byte-identical
```

## Verified-as-of (load-bearing premises, stated positively)

- Rev 6 delivery is on four branches, byte-identical; `CHECKSUMS.txt` sha256 `61e0a7d3…` on all four.
- Top-level `MANIFEST.txt` sha256 `4cb81387…`, 3,499 lines, 635/641 non-vendored files covered.
- `REV-5.1-addendum/CHECKSUMS.txt`: 358 lines, **346 OK / 12 FAILED** (stale, pre-patch).
- Engine pinned `d3bd81d2`, 57 files, byte-identical both repos.
- `svelte-check` 0 errors / 3 warnings; `vue-tsc` exit 0, on the shipped tree.
- Batteries 24/24 PASS both arms, 0 console errors, 0 blocked, on vanilla `file://` with the singlefile postbuild.
- Fidelity 6/6 EQUAL (cards 871, stats 457, board 470, feed 125, week 221, settings 39).
- Live site is w89 (`origin/gh-pages`); w89's shipped default is pale-rose light `#fdf2f6`; `--tc` absent.
- `state_invalid_export` is a **build** error (rolldown), not a `svelte-check` error.

## Revision ledger

- **Rev 7 (2026-11-15):** new work order, supersedes the Rev 6 prompt. Adds Part 0 (seven errata, led by the
  12/358 nested-manifest failure), Part A (the class bridge at store-heavy scale — the question Rev 6 did not
  answer), Part B (the sealed-recipe handicap, Rev 6's own named falsifier), Part C (the build-green gate and
  the two CI gates), Part D (token labelling, not a rework), Part E (the restated verdict), and a minimum-work
  contract with a tick-box checklist.