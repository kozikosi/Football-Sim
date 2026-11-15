SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: falsifier #2 from my own review — does the class bridge survive a STORE-HEAVY surface? Plus a correction to my own 20:07Z filing | DATE: 2026-11-15T20:32Z
FOR: framework comparison (Owner ruling R-13; no queue row)

# Attacking my own preference: the store-heavy test, and a correction

Two things in one file, because they are the same experiment.

**1. The falsifier I set myself.** In `inbox/20261115-2007-ernie-zai-authoring-review.md` I wrote that my
Svelte preference would die if *"the class bridge does not survive a store-heavy surface … if the
week-stepper needs 10+ [reactive values] and the class becomes a god-object, the 'zero facades' claim fails
in the direction that matters."* I then recommended **no-go** on the week-stepper as a row-9 tie-breaker
because a store-heavy build would measure ~0 and settle nothing. Both of those were reasoning, not
measurement. Here is the measurement.

**2. A correction to my own filing.** My 20:07Z review says the getter-wrapper idiom is avoidable and that
the compiler's remedies are free. That is right, but **I tested it with the wrong checker**, and the reason
matters for gate 5. Correction below.

---

## The store-heavy test (VERIFIED, all commands run this session)

I extended the slice from 2 reactive values to **11**, the shape the real product's week-save hydration
needs: a 4-week season with a round-robin schedule, results, standings, a save envelope, restore, dirty and
pending flags, and three derived values.

Shared framework-free core (`season.ts`, byte-identical in both arms, sha256
`e681f1c44835fef297fc4e84d56a978b0f0a4622f69b9d29843197a57aa71469`). Then:

| | Svelte arm | Vue arm |
|---|---|---|
| file | `src/lib/state/season.svelte.ts` | `src/stores/season.ts` |
| pattern | `.svelte.ts` **class**, 11 `$state`/`$derived` fields, 4 methods | Pinia **setup store**, 11 `ref` + 3 `computed` + 4 functions + a 15-binding `return {}` block |
| lines | **74** | **85** |
| typecheck | `svelte-check` **0 errors, 0 warnings** | `vue-tsc --build` **exit 0** |
| facades / plumbing | **0** | ~17 lines of `return {}` block (15 bindings + braces) |

**The store row's sign flips with store size.** Same two frameworks, same two repos, same author:

| surface | Svelte | Vue | delta |
|---|---|---|---|
| 2 reactive values (Ringers) | 17 | 15 | **Svelte +2** |
| 11 reactive values (Season) | 74 | 85 | **Vue +11** |

The mechanism is legible and is not a framework-quality difference — it is a **boilerplate-shape**
difference: a Pinia setup store must `return { … }` every binding it wants to expose (17 lines here, and it
must be kept in sync by hand — forget one and it is silently not exposed), while a Svelte class exposes
fields by declaration and needs no return block. Neither is "the framework taxing the store"; they tax
different things.

**So my falsifier #2 does not fire — but not in the direction I expected.** The class bridge survived
store-heavy load cleanly: 11 fields, 4 methods, **0 errors, 0 warnings, 0 facades**. It did not become a
god-object in any way the Pinia store does not also. What *did* happen is that Vue's store boilerplate
became the larger cost. **My Svelte preference is strengthened at store-heavy scale, not weakened.**

**And the recommendation I filed at 20:07Z was half wrong.** I said the week-stepper "would measure ~0 and
settle nothing". The measurement says the opposite: **the week-stepper is exactly the sitting that makes
row 9 say something**, because the row's sign is size-dependent and only a store-heavy surface reveals which
way it points. I withdraw the "settles nothing" half and keep the "measure both patterns" half — with the
addition that the **class pattern is now the one to measure, because it is the one the Svelte repo's own
AGENTS.md prescribes and the one that wins at scale**.

---

## The correction: `state_invalid_export` is a BUILD error, not a type-check error

My 20:07Z review says the getter-wrapper idiom is "real only against `export let` of a reassignable
`$state`" and that I verified the cheaper forms are clean because `svelte-check` reported 0/0. **The
conclusion holds; the evidence I gave for it was the wrong instrument, and the reason is a genuine finding
about gate 5.**

Full matrix, run in both my arms and in Z.ai's own delivered arm (I installed it: `npm ci`, locked
**svelte 5.57.3 / svelte-check 4.7.8** — the same versions the fresh-start repo resolves):

| pattern | `svelte-check` | `vite build` | reactive at runtime | cost per reactive export |
|---|---|---|---|---|
| `export let x = $state.raw(0)` + reassign | **0 errors** | **FAILS** — `RolldownError: Cannot export state from a module if it is reassigned. Either export a function returning the state value or only mutate the state value's properties` | n/a | — |
| getter functions (`export const get = () => x`) | 0 errors | builds | **yes** (verified in Chromium: `none 0` → `getters 1` on click) | **1 line** |
| `.svelte.ts` class | 0 errors | builds | yes | **0** |

Three consequences, all load-bearing:

1. **Z.ai's attribution is correct and I was wrong to doubt it.** Their file comment says *"state_invalid_export:
   a `$state.raw` binding the module reassigns cannot be exported — these getter functions are the compiler's
   own remedy"*, and the compiler's message is verbatim what I got. My 20:07Z remark that "the minimal remedy
   is free" is right (getter functions, not a facade object) but the enforcement is real. **Ernie's F5
   ("one facade, paid once") and my "zero facades with a class" both stand, and the precise number is
   1 line per reactive export for the getter form, 0 for the class.**
2. **Gate 5 is the wrong gate for this defect class.** The slice-done proposal's gate 5 is "both typecheckers
   clean (0 errors)". A slice can pass gate 5 completely — `svelte-check` 0/0, `vue-tsc` exit 0 — and then
   **fail the build**, because this rule lives in the compiler, not the checker. Z.ai's own arm demonstrates
   it: `svelte-check` on the delivered tree reports 1 error (the F1 `TS2352`) and would report nothing at
   all about an `export let` misuse. **Amendment: gate 5 must be "both typecheckers clean AND the production
   build green, on the shipped tree, after the last edit."** The two are not the same check and only one of
   them is a typecheck.
3. **This is why Z.ai's getter functions are good code even though they were not strictly forced at type
   level** — they are forced at build level, and the compiler's remedy is the right one. Nobody should
   "simplify" that file on the strength of a clean `svelte-check`.

---

## What this does to the adjudication I filed at 20:07Z

Three of my Q-answers change; the rest stand.

- **Q2 / row 9 — strengthened, and now with a mechanism.** Row 9 is not a framework constant; it is a
  function of **(pattern × store size)**. Measured: +7 (four-slice receipt) → +15 (delivered, module-level
  `$state.raw` + getters) → **+2** (fresh start, class, 2 fields) → **−11** (fresh start, class vs Pinia,
  11 fields). A row that changes sign across four trees is not a DECIDES row; it is a **watch item** with a
  legible mechanism. That is a stronger version of my "row 9 is not the right DECIDES row", and it says
  something the sitting cannot: *the answer depends on how big the store gets, and nobody has measured that
  yet.*
- **Q5 (slice-done) — my gate-5 amendment was incomplete.** I said gate 5 needs the *strictest tsconfig*
  clause. It also needs **the build**, because a whole defect class is invisible to both typecheckers. Both
  amendments now.
- **Q6 (week-stepper) — I withdraw the "settles nothing" half.** The week-stepper is now the *right*
  tie-breaker for the reason I gave against it: the store row's sign is size-dependent, so only a
  store-heavy sitting can say which way it points. **Go**, and measure the **class** pattern (the repo's own
  prescription) against Pinia — that pair, at 11 fields, is already a −11 result and needs only to be
  confirmed on a real store.

## My own falsifier, restated so it can be checked

I said the class bridge failing at scale would kill my preference. It did not fail; the opposite happened.
So the honest remaining falsifiers are:

1. **A second agent reports the class bridge as awkward at 20+ fields** (a real god-object risk I did not
   reach at 11).
2. **The `return {}` sync cost in Pinia turns out to be caught by tooling** (a lint rule or a type that
   forces completeness) — if so, Vue's −11 becomes a non-cost and the store row returns to a tie.
3. **My −11 is a one-slice artefact**: it is n=1, one author, and the Pinia store's 17-line return block is
   partly a style choice (a `$state` object with a single `reactive({...})` would shorten it). A second
   agent should re-measure before the Owner sees it as a finding.

## What I did not do

- Did not build a UI for the season surface (the store was the object of the test; no component was needed
  and the typechecker covers the bridge).
- Did not run the season core through a browser probe; it is node-verified (4 weeks, 6 results, standings
  sorted, envelope round-trip).
- Did not test the class bridge above 11 fields.
- Did not re-verify Z.ai's four-slice arms beyond installing the Svelte one for the build-vs-typecheck test.

PRIORITY+: P1 · Amend the slice-done gate 5 to "both typecheckers clean AND the production build green, on the shipped tree, after the last edit" · owner: a whole defect class (state_invalid_export) is invisible to both typecheckers and fails only at build; Z.ai's arm proves it · deliverable: this file + `inbox/20261115-2007-ernie-zai-authoring-review.md` · evidence: the RolldownError quoted verbatim above, reproduced in both my arm and Z.ai's installed arm