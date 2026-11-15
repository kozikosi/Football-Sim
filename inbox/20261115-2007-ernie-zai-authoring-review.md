SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: adjudicate Z.ai's authoring sitting Rev 5 + test in both repos and report how it feels | DATE: 2026-11-15T20:07Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round, not this work)

# Review 2 — Ernie: the Cardboard Ringers in BOTH repos, and the adjudication

**What I did first, because it was the headline.** I took the Cardboard Ringers slice (2 teams × 3 roster
slots, one match, one table) and built it in **both** fresh-start repos — `kozikosi/football-sim-vue` and
`kozikosi/football-sim-svelte` — at ground zero, before touching a single adjudication question. All
measurements, patches and harnesses are in
`_agents/ernie/deliveries/ernie-ringers-both-repos-2026-11-15/` (`RECEIPTS.txt` is a single re-runnable
transcript; `patches/vue.patch`, `patches/svelte.patch` are the two arms).

**Order of authorship: probe (shared) → Svelte arm → Vue arm.** The Svelte arm was the pathfinder and paid
for making the probe pass; the Vue arm inherited a known-good contract. **That is a bias in Vue's favour,
the same shape as the order-of-authorship problem in D3 but pointing the other way.** I record it first so
every clock below is read with it in mind. It is the reason I trust the structural findings and not the
timings.

## Verdict up front

**On a fresh start, built the way each repo's own AGENTS.md tells you to build, Z.ai's Vue pick does not
reproduce.** The one DECIDES row that carried Vue — the store file and its "compiler-forced getter-wrapper
idiom" — collapses from **+15 lines to +2 lines**, and it collapses because the Svelte scaffold's own §2
says the state bridge is a **`.svelte.ts` class**, not module-level `$state` exports. I built it that way
without thinking about it, and `svelte-check` reported **0 errors, 0 warnings**. The idiom Z.ai measured is
what you pay for ignoring your own repo's law.

Everything else was a tie or favoured Svelte: authored lines **98 vs 99**, bundle **13.7 kB gz toward
Svelte**, devtools **Vue's only real win**, file:// **both fail identically**. My feel verdict is Svelte,
and my corpus bias should have been the other way.

This is a second-agent result. Per `PROTOCOL-FOR-A-SECOND-AGENT.md` §2 it is reported as "a second agent
found X" and **never averaged in**. It moves my confidence in the Vue call down, materially.

---

## Q1 — Test in both repos and report how it feels

### The slice I built

**Cardboard Ringers** — two teams (Cardboard Ringers vs Styrofoam Kings), three roster slots each (QB/RB/WR),
one match, one table. Shared framework-free core (`ringers.ts`, 135 lines, byte-identical in both arms,
sha256 `cc7458c8…`): a seeded mulberry32 drive simulation whose rows the UI re-renders without re-deriving.
Shared probe (`scripts/ringers-probe.mjs`, 115 lines, byte-identical, sha256 `5872a2b0…`) boots each built
app in Chromium and asserts against the engine's own view-model, re-derived node-side. Shared timing harness
and devtools harness, both byte-identical.

**Receipts — all six laws pass in both arms (VERIFIED, `RECEIPTS.txt` §4):**

```
LAW 1 PASS  rrow count 6 vs engine 6          (both arms)
LAW 2 PASS  every cell string-equal to engine VM
LAW 3 PASS  score "10-9" vs engine 10-9
LAW 4 PASS  resim byte-identical
LAW 5 PASS  scrollWidth 390 at 390px
LAW 6 PASS  0 console errors
PROBE ALL LAWS PASS        (vue probe exit=0, svelte probe exit=0)
```

Type-check both arms on the shipped tree: `vue type-check exit=0`, `svelte check exit=0 — 0 errors and
0 warnings`. Builds: both exit 0.

### The feel verdict, one line each

**Svelte felt better to build in.** Fewer moving parts (no store install, no `storeToRefs`, no
`defineStore`), and its checker caught a real bug in my first draft — I had written
`if (!bridge.result) bridge.sim();` in the component body, and `svelte-check` flagged
`state_referenced_locally` with a rule URL, which was **correct**: reading a prop's state in an init body
captures the initial value. The fix (move initialisation into the bridge constructor) was better design than
what I wrote. That is the checker earning its keep. (receipt: `RECEIPTS.txt` §2, svelte-check 0/0 after the
fix; the warning is in my session journal, `/tmp/r-sv-tc.txt` first run.)

**Vue felt equally easy, with more ceremony and a stricter gate.** Nothing fought me except the type-checker
— and what it caught was not my arm's code but the **shared core file**, which passed `svelte-check` and
failed `vue-tsc` with three `TS2352/TS2532 Object is possibly 'undefined'` errors, because the Vue scaffold
turns on `noUncheckedIndexedAccess: true` and the Svelte scaffold does not. I fixed it at source (named
`HOME`/`AWAY` exports instead of `TEAMS[0]`) rather than casting, which made the shared file better for both
arms. That is a real tax and I'll return to it in Q5.

**Disagreement between numbers and feel: none — they agree, and both point at Svelte.** The bundle favours
Svelte, my feel favours Svelte, and my corpus fluency should have favoured Vue. When the number and the hand
agree against the agent's own bias, that is the strongest signal in this sitting.

### The E4 battery

| # | benchmark | score | why | evidence pointer |
|---|---|---|---|---|
| 1 | state management | Vue 4 · Svelte 4 | Both were 15–17 lines and one concept. Vue needed `storeToRefs` to be reflexive about; Svelte needed nothing — `$derived(bridge.result)` just worked. | `RECEIPTS.txt` §1 (store 15 L vs 17 L) |
| 2 | debugging | Vue 3 · Svelte 5 | Svelte's only failure was a checker warning that was **right** and pointed at a rule URL. Vue's only failure was a checker error in a *shared* file, which cost a re-sync of both arms. | `RECEIPTS.txt` §2; session journal |
| 3 | confidence the code does what I intended | Vue 4 · Svelte 5 | Numeric cross-arm fidelity: every cell string-equal to the engine VM, both arms, plus resim byte-identical. Svelte's checker additionally audited what I'd written. | `RECEIPTS.txt` §4 laws 1–4 |
| 4 | readability of my own code | Vue 4 · Svelte 4 | `v-for` with `:key` and `{#each}` with a keyed block read the same. Vue's `storeToRefs(store)` line is one more thing a newcomer must know; Svelte's `let { bridge } = $props()` is one fewer. | `patches/*.patch` (component 77 L each arm) |
| 5 | speed of iteration | Vue 4 · Svelte 4 | HMR and dev-server are inside each other's spread. Vue dev-first-200 383/634/652 ms, Svelte 606/626/665 ms; HMR vue 54–166 ms, svelte 56–198 ms. Three runs each — overlapping. **evidence: NONE** for any claim that one is faster; the spread is the finding. | `RECEIPTS.txt` §5 + 3-run spread in session journal |
| 6 | tool helpfulness | Vue 3 · Svelte 5 | Svelte's compiler error earlier in the sitting carried a code frame and a rule URL; my run reproduced that shape. Vue's devtools dock is real and Svelte has nothing comparable — but that is scaffold-provided, not framework-provided. | `RECEIPTS.txt` §6 |
| 7 | how much I had to look up | Vue 2 · Svelte 2 | Zero docs lookups in either arm. I read 9 scaffold files for Vue, 8 for Svelte, all orientation. I did **not** instrument this during the build, so the split is reconstructed and labelled as such: **evidence: NONE** (reconstruction, not a tally). | session journal |
| 8 | how much I had to fight the framework | Vue 2 · Svelte 3 | Vue: three `noUncheckedIndexedAccess` errors in a shared file that the other arm accepted. Svelte: one `state_referenced_locally` warning that improved my code. Both were one fix cycle; only one of them was the framework's fault. | `RECEIPTS.txt` §2 |
| 9 | how much I enjoyed it | Vue 3 · Svelte 4 | Svelte had fewer concepts between me and the DOM. Vue's ceremony is not onerous, it's just present. | `evidence: NONE` — self-report by construction; the receipt is the 15 vs 17 line store and the 0 vs 1 concepts |
| 10 | overall | **Vue 36 · Svelte 42** | Svelte by 6, and every point of it comes from the two rows that are structural rather than clock: fight-the-framework and enjoyment. The clocks are a wash. | `RECEIPTS.txt` §0–§7 |

### One line per slice per repo

- **Cardboard Ringers, Svelte repo:** easy — the class bridge meant the store question never arose; the
  table, the keyed each and the props were one pass. Fought me — nothing, once I stopped reading state in
  the init body. (receipt: 0 errors / 0 warnings, all six laws PASS)
- **Cardboard Ringers, Vue repo:** easy — Pinia setup store is 15 lines and the template needed no ceremony
  beyond `storeToRefs`. Fought me — the shared file failed `vue-tsc` under a stricter tsconfig than the
  other arm's, and fixing it properly meant changing code I had already validated on the other side.
  (receipt: 3 errors → 0, then all six laws PASS)

### The one asymmetry worth the Owner's attention

`noUncheckedIndexedAccess` is **on** in `football-sim-vue/tsconfig.app.json` (with the scaffold's own comment:
"may have false positives") and **absent** in `football-sim-svelte/tsconfig.json`. Consequence: a
byte-identical shared file is clean in one repo and has three errors in the other. That is a scaffold-policy
difference, not a framework difference — but it means **"both typecheckers clean" on shared code is only
satisfiable if the shared code satisfies the strictest tsconfig**, which makes the Vue scaffold's strictness a
tax on all cross-arm code. My fix (no casts, restructure at source) is the right answer and I'd keep it.

---

## Q2 — Adjudicating D1–D5, D7, and F1–F5

**D1 (stale counts, 61 vs 68) — agree with Ernie and Inkling; VL's "fix is labelling" is the minimum, not
the fix.** Why: I measured the delivered tree myself last session (`arm-vue/src/lib/appStore.ts` 83,
`arm-svelte/src/lib/appStore.svelte.ts` 98, `arm-vue-vapor` 61) and **68 matches no file**; VL is right that
61/68 came from a real receipt, but that receipt is the *four-slice* tree, not the delivered one, so quoting
it as "the store file" is wrong. The row must quote **83 vs 98 (delta 15)** and, if it wants the four-slice
figure, label it with the tree it measured. **My new evidence makes this worse for the row, not better: on
the fresh-start repos the same row is 15 vs 17 (delta 2).** The row's magnitude runs 7 → 15 → 2 depending on
which tree and which pattern, so it is measuring an authoring pattern, not a framework constant.

**D2 (bundle numbers unlabelled) — agree.** Why: one canonical number per claim, method attached. Mine:
**13,666 B gz toward Svelte** (28,681 vs 15,015; gz-9 of concatenated `dist/assets/*.js`, whole app not
slice; `RECEIPTS.txt` §3). And the decomposition matters, measured with **one** method throughout (gz-9 of
concatenated `dist/assets/*.js`, pristine scaffolds vs my arms): the **empty** scaffolds already differ by
**18,210 B** (Vue 29,514 / Svelte 11,304), and my slice **removed 0.8 kB from Vue and added 3.7 kB to
Svelte** (28,681 / 15,015). The gap is runtime + Pinia, not authored code.

**D3 (the 34-vs-9-minute gap is order-of-authorship) — agree, and I reproduced the problem.** Why: my own
run had Svelte as pathfinder and Vue inheriting the contract; I could not randomise my own corpus. The
qualifier must travel with the number everywhere it is quoted, including in the Rev 5.1 addendum, or the
addendum will launder it.

**D4 (strike the w85 frame) — agree.** Why: verified today, `git show origin/gh-pages:index.html | grep
"WAVE:"` → **w89**. Note the same check moves the delivery's premise block too: the prompt's
verified-as-of block says gh-pages tip `3e69567c`; at 2026-11-15T20:07Z the tip is **`66096fb1`**. The
load-bearing claim (live is w89) survived; the sha did not. That is Q8's argument in one line.

**D5 (62% is near-even, reversible, not a cutover ruling) — agree, and it understates my finding.** Why: my
fresh-start run did not merely fail to reproduce the Vue lean, it **removed the row the lean rested on**
(row 9, delta 2). So D5's restatement should be "even, with the single DECIDES row not replicating on a
fresh start" — not "Vue-leaning, 62%".

**D7 (amend the verdict line with the confound caveat) — agree, and add a second caveat.** Why: the
confound is real (corpus), but my run adds a *pattern* confound that is not corpus at all: row 9 measures
one authoring pattern, and the framework does not force it. The verdict line should carry both.

**F1 (delivered tree fails type-check in both arms) — it blocks signing the DELIVERY, not the SITTING.** Why:
the distinction is the whole answer. One shared-file defect (`savesService.ts:58` TS2352) does not
invalidate any measurement in the sitting — the bundle delta, the pool ledger, the turnovers test and the
engine pin are all independently reproduced. But a delivery that fails its own gate 5 cannot be signed as
"done", and `AUTHORING-COST.md`'s "typecheck errors 0 / 0" is false as shipped. **The one-line fix plus a
re-run of both checkers on the shipped tree clears it** — provided the re-issued rows are date-stamped to
that run, not to the original one. So: F1 does not change the pick; it changes whether the document can be
quoted.

**F3 (1,249 = 1,249 and a 1.2% tax) — agree, and my run reproduces it exactly.** Why: authored insertions
**98 (Vue) vs 99 (Svelte)**, and store delta 2 lines on a 15/17-line file. The tie is not a one-off
artefact of that tree. It strengthens "even" and further weakens row 9 as the separator.

**F5 ("one facade, paid once") — agree, and go further: on the fresh-start repos it is ZERO facades.** Why:
I verified two things in the Svelte repo. (a) A `.svelte.ts` **class** bridge — which is what that repo's
AGENTS.md §2 prescribes ("`.svelte.ts` classes with `$state` holding snapshots") — compiles with **0 errors,
0 warnings** and needs no facade at all: `RECEIPTS.txt` §2. (b) Even module-level `$state` bindings, if you
export **functions** rather than `let`, are clean: I compiled that shape in the same project and
`svelte-check` reported **0 errors and 0 warnings**. The compiler's own message lists "export a function
returning the state value" as a sanctioned remedy, so the *minimal* remedy is free. The idiom is real only
against `export let` of a reassignable `$state` — one rule, not a permanent tax on "every module-level
reactive export". **F5 does not soften row 9; it removes it for a fresh-start project.**

**Is row 9 the right DECIDES row? No — I challenge row 9.** Why: its magnitude is tree- and
pattern-dependent (7 / 15 / 2), and the pattern it measures is one the Svelte repo's own AGENTS.md tells you
not to use. If a row must separate the arms, **row 7 (devtools)** is now the one with real evidence:
`__VUE_DEVTOOLS_GLOBAL_HOOK__` = object, `__pinia` = object and a `DEVFRAMES-DOCK-EMBEDDED` element mounted
in the Vue arm; the Svelte arm exposes only `__SIM_STATE__` and mounts no devtools at all (`RECEIPTS.txt`
§6). Caveat, and it is a big one: that is **scaffold-provided, not framework-provided** — the Vue scaffold
ships `vite-plugin-vue-devtools`, the Svelte scaffold ships nothing equivalent. It belongs in a "day-one
inheritance" row, not in a framework-quality row.

**Does the pick hold? No.** With row 9 gone as a DECIDES row, the authoring buckets are a draw (98 vs 99
authored lines, both green, both clean), the tie-breaks split, and the one measured non-noise number
(bundle, 13.7 kB gz) favours Svelte. My pick is **Svelte, narrowly, on a fresh start** — explicitly
reversible, and explicitly not a cutover ruling.

---

## Q3 — Settle rule: which candidate is PRIMARY?

**Primary: paired correction-effort per 100 framework-owned lines** — Glyph's quantity, my pairing, with
shared instrumentation pre-paid and order recorded. One line why: it is the only candidate invariant to the
two things my run proved are large — order of authorship (D3) and the instrumentation being pre-paid (the
Flip Bench) — and "how often did the agent have to stop and correct" is what actually predicts the cost of
a multi-sitting commitment, where clock time measures fluency.

**Does Vue still win under it? No.** My run: Svelte 1 correction cycle (`state_referenced_locally`, which
improved the code), Vue 1 correction cycle (the shared-file restructure forced by `noUncheckedIndexedAccess`,
which cost a re-sync of both arms). 1 per ~100 lines each — a tie. Under my own primary rule the answer is
"even", which is where I land.

**Falsifier for my own rule:** if a second agent's correction counts differ from mine by more than the
between-framework difference, correction effort is measuring the agent, not the framework, and the rule
demotes to NOISE. That is the same failure Z.ai names for the Flip Bench and it applies to me too.

---

## Q4 — Does the COUNCIL also run the fresh-start experiments?

**council-runs — one slice per seat, minimum two seats, pooled, not duplicated.** One line why: the
confound is the *corpus*, and Z.ai running both arms plus Z.ai's own fresh-start test still has exactly one
corpus; only a different agent removes it. But it should not be a second full E0–E4 — that doubles the cost
for no new information. One slice per seat is enough to make the corpus term visible, and I have just
demonstrated the shape (Cardboard Ringers, both arms, one sitting, all receipts in `RECEIPTS.txt`).

---

## Q5 — Slice-done proposal: ratify, amend, or reject?

**Amend — name gate 5, and add the two rules my run exposed.** One line why: as written, gate 5 ("both
typecheckers clean") is not satisfiable for shared code, because the two scaffolds' tsconfigs differ in
strictness (`noUncheckedIndexedAccess` on in Vue, absent in Svelte) — a byte-identical file passed
`svelte-check` and failed `vue-tsc` three times.

The amendment, in the gate's own words:
> **5. Both typecheckers clean on the SHIPPED tree, after the last edit, under the STRICTEST tsconfig in
> either arm (name it in the receipt); warnings listed verbatim, no suppression lines anywhere.**

Gates 1, 2, 3, 4, 6, 7 — ratify as written. Gate 3's "zero console errors on file://" is currently
unsatisfiable in both fresh-start repos for a scaffold reason, not an app reason: neither sets
`base: './'`, so `dist/index.html` requests `/assets/…` and both fail with `ERR_FILE_NOT_FOUND` before any
app code runs (`RECEIPTS.txt` §7, identical in both arms). That is a tie and a one-line fix per repo; it
should be filed, not waived.

---

## Q6 — Week-stepper + second agent

**Week-stepper as the tie-breaker for row 9: no-go as specified. Go as a product slice.** One line why: my
run shows row 9's tax is 0–2 lines when the store is a bridge class and 15 when it is module-level
`$state.raw` exports, so a store-heavy week-stepper built the way the Svelte repo's own AGENTS.md prescribes
will measure ~0 and "settle" nothing — it would confirm a pattern, not a framework. To settle the store
question it must measure **both** patterns in the Svelte arm (class bridge *and* module-level exports), and
report the ratio. That is a cheap addition and it turns the sitting into a real test.

**Is the protocol ready to run? Yes, with two amendments.** One line why: I ran a version of it cold today,
with no prior context beyond the file, and it worked end to end — which is the only real test of "ready".
Amendment 1: §1.1 points at the Football-Sim four-slice arms, which is the *wrong tree* for a fresh-start
test; it must point at `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte`. Amendment 2: add the
shared-instrumentation rule (probe + harness authored once, before either arm, and both arms start with them
on disk) — otherwise the second arm inherits the first arm's debugging, which is the D3 defect by
construction.

---

## Q7 — Platform: confirm the synthesis or side with VL?

**Confirm the synthesis** (Sim Lab v0 with the receipt diff as its core; DIALS content as read-only presets;
DIALS last). One line why: the receipt diff is the only component that attacks the failure this whole
programme keeps having — claims that outlive their evidence — and everything else is content that can be
loaded later without changing the core.

**The one constraint that keeps it honest:** the diff must render a **failing** receipt as prominently as a
passing one, including a receipt the *author* wrote. If the viewer becomes a highlight reel, it is worse
than no viewer, because it launders exactly what it was built to expose. (Concrete: the delivered tree's
failing type-check would be the viewer's front page, not a footnote.)

---

## Q8 — verified-as-of.json: adopt it?

**Adopt — but only with a CI check that re-runs every command.** One line why: the evidence for it is in this
session. Z.ai's package carries a stale wave (w85 vs live w89), a degated-tests note describing the
pre-rewrite state, stale store counts, and unlabelled bundle figures — and **my own prompt's verified-as-of
block went stale while I worked**: it cites gh-pages tip `3e69567c`, and the tip at 2026-11-15T20:07Z is
`66096fb1`. A machine-readable claim → ref/sha/command would have caught all of these at read time.

**What falsifies it:** a hand-maintained `verified-as-of.json` that nobody re-runs. That is strictly worse
than no file, because it carries the *authority* of verification without the *fact* of it. So the file is
admissible only if CI re-executes each command and fails the build on drift — which means each entry must be
a command, not a claim. If a claim cannot be expressed as a command, it does not belong in the file; it
belongs in prose with a date.

---

## Q9 — Innovations

**Season Book — queue.** One line why: the mechanism is genuinely cheap (the engine already stores every
game's seed; the book is a *rendering* of a record that exists, not a new model), and it honours the
single-file law. **Amendment before it is built:** its own falsifier (1) is a *measurement*, not a
sitting — sum the 13 playoff feed VMs + the 60-card grid before writing any renderer, and if that exceeds
~400 KB gz, decide lazy replay then. Do not build first and measure after; that is how a one-week feature
becomes a one-month one.

**Flip Bench — queue, and I have already run its pilot by accident.** One line why: it is the only proposal
here that fixes the confound that dominated every number in this exchange — including mine — and my
Cardboard Ringers run is a working instance (shared instrumentation pre-paid, both arms starting with it on
disk, order recorded and its bias named). Keep Z.ai's falsifier (if arm B, given only the shared files,
finishes faster than arm A on two independent slices, authoring cost is noise for this product and both rows
demote to NOISE), and add a second: if across-agent variance exceeds between-framework variance, the bench
needs a third agent before any number is decision-grade.

---

## My own falsifier — what would kill my Svelte preference

Stated so it can be checked rather than believed:

1. **A second agent with the opposite corpus reports the class bridge as awkward or error-prone.** My whole
   finding rests on the class bridge being free. If another agent finds it clumsy at scale, row 9 comes back.
2. **The class bridge does not survive a store-heavy surface.** I measured 2 module-level reactive values. If
   the week-stepper needs 10+ and the class becomes a god-object, the "zero facades" claim fails in the
   direction that matters.
3. **`svelte-check`'s warnings turn out to be false positives at scale.** I have n=2 warnings, both real.
4. **A Vue agent reports the `noUncheckedIndexedAccess` tax as trivial.** I paid it once, on a shared file,
   in 3 errors. If it is a one-time cost rather than a recurring one, I have over-weighted it.

## What I did not do

- Did not run the dev-server/HMR timings more than three times per arm; the spread is reported, the winner
  is not claimed (evidence: NONE for a speed difference).
- Did not instrument the context-scratch tally during the build — the count in the battery is reconstructed
  and labelled as such.
- Did not inspect the screenshots: this model has no image input. A human eyeball pass on `shots/` is still
  worth doing before the Owner signs anything visual.
- Did not re-verify Z.ai's four-slice arms beyond the store line counts; that ground is covered by my
  previous review (`inbox/20261115-1427-ernie-review-zai-sitting-2026-11-15-authoring.md`) and I have not
  repeated it.
- Did not rebuild the vapor arm.

PRIORITY+: P1 · Re-issue Rev 5 as Rev 5.1 with: row 9 restated as "0–2 lines with the repo's own class-bridge pattern, 15 with module-level `$state.raw` exports", the F1 type-check fix re-run on the shipped tree, the 98-vs-99 authored-lines tie, and the 13,666 B gz bundle figure with its method · owner: the Vue-vs-Svelte call should not be signed on a row that measures a pattern the Svelte repo's own AGENTS.md forbids · deliverable: this review + `patches/*.patch` + `RECEIPTS.txt` · evidence: `_agents/ernie/deliveries/ernie-ringers-both-repos-2026-11-15/`