SPEAKER: inkling | ROLE: council | TASK: testing + innovation (P-345 round 2) | DATE: 2026-11-15T12:39Z
FOR: P-345

# Testing + innovation — Inkling's filing, round 2

Read and re-verified the verified-as-of block. My deltas to it are marked **[RECEIPT]** with four lines. Everything else is answered under the block's premises as given.

**[RECEIPT — premises re-verified this sitting]** live = w89 (`git show origin/gh-pages:index.html | head -3` → `WAVE: w89`, tip `3e69567c`; committed) · Q7 closed, **351/351 at tip `9acf1992`** (this seat's fresh `git archive` + `npm ci` + `npm test`, 2026-11-15T11:44Z) · gh-pages resolved, shared-tree `7c9694e9` gone (`git ls-remote origin gh-pages` → `3e69567c`) · Colors has no buildable product (`vite build` → `Failed to resolve /src/main.ts`, VERIFIED 11:44Z) · `fit(role, dest).penalty` is the API (per tree) · ±100 ms framing withdrawn · bundle gap cited as **~11 KB / 11,569 B** everywhere below (DS's correction adopted) · λ settlement stands (nothing to add) · pool gap addressed under A5 below — **[CLOSED]**.

Labels: **VERIFIED** (ran it, receipt here or in my lane) · **REPORTED** · **INFERRED** · **UNKNOWN**.

---

## A · Testing

### A1 — Boot replication: **cannot run as specified; three receipts now converge on a defect in the R3.1 artefact identity**

**The committed four-slice `dist/` does not boot from `file://` under ANY protocol — flag or no flag.** ROOT-absolute `/assets/...` URLs (`base:'/'`) resolve to filesystem root:

```
dir · cmd · ref · output · 2026-11-15T12:47Z
$ node a1-single.cjs flag <arm-vue>   # --allow-file-access-from-files
  tLoad 28 · errors: net::ERR_FILE_NOT_FOUND ×3 (main/boot/css) · #app children 0 · body ""
$ node a1-single.cjs flag <arm-svelte>   # same shape
```

VERIFIED 12:47Z, both arms. The flag cannot help a root-absolute path; the dists are unbootable by construction on `file://`. **MUSE's "four-slice cold load … file://" therefore could not have run on the committed `dist/`** — it can only have run on the `dist-file/` single-file tent builds, on a locally-patched copy, or over a local http server, and the R3.1 receipt **does not say which**. That is a third receipt defect beyond the five the boot reviews found.

**What I could run — the replication on the only file://-bootable four-slice artefacts (my own single-file builds of both arms; same source, `base:'./'` + `vite-plugin-singlefile`):**

```
dir · cmd · ref · output · 2026-11-15T12:52Z
RUNS=6 node a1-lowend.cjs vanilla      # 6x CPU throttle, network blocked, file://
  pairs 1–6, order interleaved; FCP null on 11/12 loads (single paint); mounted 6/6:
  vue 7597 6933 6911 7167 6543 6834
  svl 7154 7096 6770 6773 7003 6778
  → svelte faster 4/6, vue faster 2/6 · no ties · n=6 (directional only)
```

VERIFIED. n=6 sign-consistency tilts **Svelte** — the opposite of MUSE's Vue-favored replication — and both tilts are inside the noise GLM withdrew. Also load-bearing: **FCP is null on 11/12 loads on single-file artefacts** (one paint, no two-paint sequence) — FCP on this artefact class is ill-defined, so MUSE's FCP numbers cannot have come from single-file either; they presuppose a two-paint multi-file build served over a protocol `file://` cannot serve from a root-absolute base.

**A1 decision for the council (not mine):** the replication owed is *Z.ai's* against **the artefact MUSE actually used**, which does not exist in any receipt anywhere. Until that artefact is pushed, every "low-end boot" number on the table is unreplicable and the R3.1 correction block ("verified by fetch"-class hygiene) is incomplete. If the intent was the tent-test `dist-file/` builds, then my routeS builds are the same protocol and my numbers above are the closest replicable measurement — reported: **n=6, Svelte 4 vs Vue 2, artifact paints once, no magnitude claim admissible.**

### A2 — File:// fix verification: **Route C fails at multi-page shape; Route C passes at single-input shape; measured on both arms**

Four variants built and probed, vanilla `file://`, 390×844, zero flags (Playwright Chromium, cwd `/private/var/…/T/opencode/fourslice-arms`, 2026-11-15T12:24–12:33Z):

| Build | Vue | Svelte | Boot |
|---|---|---|---|
| Multi-page + `vite-plugin-singlefile` (the BENCH-2 config: `main` + `library`) | inline `main` keeps `from"./boot-<hash>.js"`; **the shared chunk is not emitted to `dist/`** → `ERR_FILE_NOT_FOUND`/CORS, blank, #app children 0 | same (`boot-BHuSYjsv.js` missing) | **FAIL both** |
| Single-input + singlefile (one product page) | `dist/index.html` **334.94 kB / 136.85 kB gz** | `dist/index.html` **307.31 kB / 126.97 kB gz** | **PASS both**: 0 console errors, 61 DOM rows, `sw 390 = vw 390`, board renders |

**[RECEIPT]**
```
routeC-vue:  npm run build → ok; find dist -type f → index.html library.html (NO boot chunk)
routeC-vue:  node singlefile-probe.cjs → errors: script CORS boot-D6Txi5MS.js ×1 · children 0 · sw 390 = vw 390
routeS-vue:  npm run build → dist/index.html 334.94 kB · gz 136.85 kB · ok
routeS-vue:  node singlefile-probe.cjs → errors [] · children 4 · sw 390 · body "67 Cakepanz — Bench Board …" · rows 61
routeS-svelte: dist/index.html 307.31 kB · gz 126.97 kB · ok · errors [] · rows 61
```

**Owner-facing consequences:**
1. Route C does work at four-slice scale — **only as a single-input build**. Cost: +10 to +29 kB gz vs the multi-page default (no split chunks left in scope). For the PRODUCT (one page, one file) that is a fine trade; the `w89`-shaped product is exactly this shape.
2. The BENCH's two-page build (`index.html` + `library.html`) needs **split per-page builds** (or a single-page `main` inlining the library as a lazy chunk — still one input). The current multi-page + singlefile config is not a broken fix; it is an inapplicable one.
3. Ernie's Route-C recommendation **stands for the product**; the bench keeps multi-file (dev-only framing; or two config files). The build-config owner (Owner question 3) inherits exactly this two-line decision plus this receipt.
4. Sub-question Ernie flagged (inlined size at product scale) — **answered**: 127–137 kB gz in one file. No issue; the whole thing ships as one HTML file with zero build step for the user.

### A3 — λ estimator validations: **not run — the estimator does not exist**

```
dir · cmd · ref · grep · 2026-11-15T12:26Z
$ grep -rniE 'estimateLambda|lambdaEstimator|shrinkage|empirical.?bayes|placebo|injection' colors/src tools/
  → nothing but engine-plan-v3 prose ("lambda enters at the logit shift") and margin-pool phase notes
```

There is **no estimator in the released tree, in the Lab tools, or in any seat's delivery I can find** — the open work the prompt names. Placebo (mine), injection + pre-registered τ (GLM), kappa preseason-vs-regular (GLM), hard-zero + posterior intervals (mine): all four blocked on the estimator's existence, one line each. What I can say INFERRED, not hedged away: until the estimator lands, the λ debate is performed against an exhibit, not a measurement, and **placebo must be the first validation it faces** (before any real context is fitted — if placebos land inside [0.3902, 0.4032) at excess rate, the estimator fits noise and every real δ_c rides downstream). GLM's injection τ should similarly be pre-registered from the one resolvable row count, or the validation will pass by construction.

### A4 — Replay-determinism conformance sweep: **vectors run and pass at tip; the gate is still manual**

```
dir · cmd · ref · output · 2026-11-15T12:26Z
$ python3 tools/mathlab/pmath_check.py   # from the fresh archive (9acf1992), this machine
  pexp 417v wr 2.10e-16 · pexpm1 412v 2.65e-16 · plog 412v 2.03e-16 · ptanh 415v 2.24e-16
  psqrt 409v 2.21e-16 · pnorminv 418v 2.31e-15
  RESULT: Python port reproduces every vector bit for bit
```

**VERIFIED at tip.** The suite also contains `pmath-vectors.json`-driven tests (they are part of the 351/0). What does NOT exist: a **scheduled** run of the bit-for-bit check — the report-only CI (tip hygiene commit) runs the TS tests, not the Python oracle; nobody runs it per re-pin except humans who remember. The seeded **full-season replay diff** (same seed, two builds, byte-identical record) has no schedule anywhere in tree. Both fixes are small (one workflow line; one weekly Lab job) and belong to the Architect (pin) + MUSE (schedule), not to me. I recommend: the check becomes **a precondition of every re-pin receipt from now on**, and the seeded replay diff becomes the weekly arm — before the λ estimator consumes any of this math in anger.

### A5 — Pool ledger: **CLOSED — the gap is the long-snapper filter, by design**
```
dir · cmd · ref · output · 2026-11-15T12:28Z
$ node --experimental-strip-types verify-pool.mjs   # buildPool + freezePool on data/nfl/*.csv @ tip
  ratingsDataRows 1941 · freeAgentRows 12 · buildPoolCount 1953
  lsRowsInRatings 32 · lsTeamsCount 32  ← one per team, e.g. Josh Harris(81)…Tucker Addington(56)
  freezePoolCount 1921 = 1909 non-LS + 12 FAs · faRenderedInFrozen 12
```

**The 1,921 board = 1,941 − 32 long snappers (role `LS`, one per team, VERIFIED by name/team listing) + 12 Free Agents (all render).** Neither (a) one dropped row per team of the SAME kind (lowest-OVR/K/P/duplicate) nor (b) missing FAs — both hypotheses the prompt named are closed or impossible: (a) is the LS by design ("long snappers are never drafted", `store.ts`), (b) renders 12/12. **Data-integrity hole: none — the ledger closes as an intended filter with no receipt trail.** The one honest follow-on: the poolCount copy (when the product shows it) should read "1,921 draftable (1,953 pool − 32 LS)" or stop showing the number; R-12's "Players = 1,953 pool total" stays true for the pool. Architect owns the copy; nothing about the engine or data changes.

### A6 — Static-RNG "feels pressure" probe: **the idea dies at its own first step; the real static assumption is adjacent, filed, and NOT this one**

Fork semantics **VERIFIED**: `core/rng.ts` — `fork(label) = makeRng(seed ^ hashString(label))`, `forkSeed` exported; `store.ts:84` feeds `cpuChoose(st, team, cpu.fork('p' + st.pos))` — the CPU's stream is conditioned on **pick position only**, never on score, round, board differential, or availability window. My INFERRED tag from round 1 is retired.

Reading `cpuChoose` (`draft.ts:109`): candidates filter by board state, `floorFor(st)` by state, role bias via the team's trait `tr.bias`, noise via `tr.noise * rng.normal()`; rare reach via `tr.miss`. **The board sees everything; the RNG is a 12% garnish on a fully state-aware chooser.** Conditioning the label `fork('p'+pos+'-'+band)` adds *no information the deterministic path does not already express* — the probe's premise (that the RNG is upstream of a context-blind decision) is false **by inspection**, and forcing two board snapshots differing only in "pressure" would log two identical distributions modulo the garnish. One hour, killed in ten minutes, by reading not by simulation.

The probe's **rescue** — the actual 0.20-vs-0.40-shaped finding next door: **`tr.noise` and `tr.miss` (team traits) are STATIC per team — a motivated team in round 9 picks the same noise profile as a cruising team in round 1.** If pressure-as-need ever exists, it lives there, as traits-as-function-of-state — an engine change with protected-constant implications, Architect's call, Owner-visible. It is the same class of defect GLM found in `drives.ts` (the OT `900/600` playoff split at l.247 — context-conditional constants exist and are nowhere indexed). I file the reframed question, not the fix: *should live-draft behavior coefficients (noise/miss/bias) scale with state?* — with the explicit note that any answer is engine work and must ride the P-318 seam's provider, not a label.

---

## B · Innovations

### The three platform surfaces, on one axis (user action · engine work · falsifier) — and which to build first

| | Glyph — Spec-first Sim Lab | GLM — DIALS panel | Inkling — OFFENCE dial wall |
|---|---|---|---|
| What the user does | writes/selects a spec (kappa, fixture, seed), hits Run, reads a diff view | drags 4–6 dials on one form, hits 100-season re-sim, reads the delta | one form — OFFENCE grading priorities — with a live preview of the season it produces |
| Engine work | one run-dispatch endpoint + receipt export + diff renderer (~1–2 screens) | ZERO new engine work — rides P-318 provider + existing replay harness as-is | zero new math — subset of GLM's dials |
| Falsifier | agents/users don't reuse specs; spec drifts against engine contract | a chosen kappa fails to hold under 100-season re-sim (binary, fast) | nobody opens the form twice; delta reads as cosmetic |
| What breaks if placed wrong | second source of truth, the worst failure class for this project | hides disagreement instead of surfacing it (auto-hides bad dials behind "it's in the Lab") | island with no path to eval — looks done, ages badly |

**My pick: GLM's DIALS panel — first.** It needs no new engine work, it doubles as the forms stress-test the winning arm ships against (one artefact measures product value AND authoring ergonomics), the falsifier is tightest, and my OFFENCE wall is its strict subset — building mine standalone re-learns GLM's lesson at lower signal. **Order:** DIALS panel (right after the framework pick) → Glyph's Sim Lab (v2, once one knob wall proves the Owner drives it — and Glyph's spec frame IS the right container for Cardboard Ringers as a cold-domain probe) → VL's Folds (post-v1; a save as shareable replayable artifact with provenance — the best shareable, but shareables were sliced 5+) → Cardboard Ringers (anytime; one sitting; see below).

**Flagged disagreements (not smoothed):** (i) Glyph's "separate editor" vs absorption — the DIALS panel IS the OFFENCE wall inside the shell; a side-app fork is how the race becomes permanent, the exact failure Inkling flagged; (ii) GLM "build AFTER the framework is picked" — agreed, with the addition that its **spec must be framework-neutral** (a dials.json + VM contract) so the winner arm can be compared on identical fidelity — that's the same pin strategy as the arms; (iii) VL's Folds vs platform-first — Folds is a v1.1 conversation with the Owner, not an evaluation of the arms at all; (iv) my OFFENCE wall vs DIALS — I concede: GLM's generalizes; mine survives only as the DIALS panel's first preset.

**Cardboard Ringers promoted from probe to measurement (endorsing OR's promotion):** 2 teams × 3 slots, one match, one table — the cheapest possible reframing test of "can these two frameworks both express the product's spine, and at what port cost?" It also doubles as the **Lab's dry run for the Sim Lab's Run path**: if Cardboard Ringers costs more than one sitting in either arm, the platform hypothesis is strained and GLM/Glyph must say so with the receipt visible, not after a year of spec accretion.

### Slice 5 — three card shapes, judged on the same axis

| | Inkling — card as state machine | GLM — two-state (collapsed/expanded) | Glyph — verifiable contract |
|---|---|---|---|
| Collapse | w89 tile, palette ring, Cinzel num | w89 tile + P-152 bubbles (85+ shimmer) | collapsed = *required* state in the contract |
| Expand | tap/flip → scout face (percentiles, flex verb) | expanded **in place** | expanded = *required* state, same fixture |
| After draft | season-summary state on same object | season-arc sparkline per game | replay = *required* navigation probe |
| Needs | `playerCardVM` (~80 lines) | per-game contributed wins + feed-event index + flex.json (exists) | state contract + DOM/state probes, once per arm |
| Falsifier | card never leaves "drafted" in the user's flow | expanded view becomes the 90% experience (the tail wags the tile) | any arm fails one contract probe → rejected regardless of beauty |

**Build first: Glyph's contract as the gate; Inkling's state machine as the architecture; GLM's expanded contents as v1.1.** Concretely: one component; states `{collapsed, expanded, drafted, starred, season-summary}`; expand+persist survives one navigation (selector persists); data comes from one VM (`playerCardVM`, fold-fit band from the P-318 provider residuals); expanded face shows either GLM's per-game contributed-wins sparkline (measurable TODAY from the engine's season VM — no new math) or the scout face — pick ONE by thirty-second user test with the Owner present; the other is one flag away. **Not three cards, not two — one component, two faces, one contract, one before/after screenshot pair for the Owner's acceptance.** My card beat GLM's on lifecycle; GLM's expanded face beats my scout face on "what a user does the next morning"; Glyph's contract beats both shapes for **arm comparability** — without it, the two builds cannot be compared at equal fidelity, which is the C2 gate's precondition.

**Deal-breaker named:** if the sparkline/last-3 line needs per-game granular stats the engine does not currently emit per player (it emits game outcomes/boxscore lines — verify, or the expanded face ships the scout face instead) — that check is the first hour of slice 5, not a blocker on the contract.

---

## C · Framework measurement — commission or passenger? And one settle rule

### C1 — Passenger, escalated once. Commission is declined.

**Adopted rule: the authoring measurement rides Slice 5's sitting as telemetry-over-work, with at most ONE pre-registered escalation — never a standalone benchmark.** Concretely: both arms build slice 5 under identical fidelity (already the plan); the arms' tool-call logs, wall-clock, repair cycles and first-vs-second BUILD deltas are captured as they happen (the work produces the data; cost ≈ 0). **Escalation trigger:** if slice 5's within-arm delta lands inside ±5 % on time-to-green (the inconclusive band), the measurement repeats ONCE on the next sitting that happens anyway (saves or feed), identical protocol, pre-registered before it starts. Then decide. **Declined:** a dedicated commissioned sitting (Glyph's reading) — the marginal information does not clear its cost against a ~350-line reversible migration; and a second agent's single session (cross-agent) — Inkling §3 of round 1: skill variance > framework variance, unreplicable, never averaged. **GLM's bound is honored exactly:** skip the moment cost approaches migration; telemetry-over-work never approaches it. **Name the disagreement:** Glyph holds a second dedicated sitting is required for symmetry; I hold it is symmetric noise at the price of a week of two arms for a number that will flip sign under the next release — the standing intervention that matters is the Owner's review of two screens, not a third sitting.

### C2 — One settle rule (subsumes the three; adopts GLM's structure and my majority-of-pairs)

**The rule:** within-agent, per-slice randomised order; **N ≥ 3 slices of varied shape; time-to-green per slice; fidelity pinned numerically (DOM nodes ±2 %, rows, states); first build of each slice is the primary measurement; order reported per pair; labels swapped at review by a non-builder seat; pre-registration filed before the first run.** Decision procedure, exhaustive:

- If one arm wins **≥ 15 % less time-to-green on ≥ 2 of 3 pairs** (order-pairing per slice) with fidelity pinned and no critical regression → that framework wins authoring.
- If the pairs split (1–1 with third inconclusive) or the deltas are all within **±5 %** → authoring is a wash → **tooling/ecosystem tiebreak → Vue** (devtools/router/pinia maturity, VueUse breadth, the STORE file already measured smaller at 61 vs 68 LOC with no compiler-forced idiom — verified).
- Repair cycles and tool-call counts are **reported, never gated** (correlated with time; double-gating produces false negatives).
- Lines are **advisory only** — sign-flips across scale: Svelte leaner at 6-card scale (103/113, VERIFIED by my review), Vue leaner at four slices (332/347); the criterion is dead across scales.

**Dropped from the three proposals, named:** my ≥15 % wall-clock-AND-repair-cycles requirement (double gate → false negatives; tool-call telemetry absorbs it); Inkling's arm-label swapping at review (KEPT — it is load-bearing, not decoration); Glyph's **≥20 % threshold** (too high for ±few-days rewrites; its N≥3 varied-shape requirement is adopted); Glyph's **≥2/3 slices** (adopted as the majority); GLM's **OR-lines-≥10 %** gate (killed — lines flip sign); GLM's **tie→Vue** (adopted as the tiebreak, not as a feature of the test); GLM's **second-build-is-replication** (adopted — primary = first build; second build = structure check only); GLM's **pre-registration** (adopted); Glyph's **N≥3** (adopted). **Subsumption in one line: GLM's arbitration skeleton + my majority-of-pairs tie-structure + Glyph's N≥3/pre-registration hygiene; one threshold (15 %), one band (±5 %), one tiebreak (tooling → Vue).**

**What this does NOT settle:** whether Vue or Svelte ships — only which is easier for an agent of Z.ai's class to author, today; the Owner's maintenance experience counts as user evidence and outranks this rule (Q1 of round 1's "what would prove me wrong").

---

## D · Settled constants — re-measurements to design (Lab work, not seat work)

### POINTS_PER_WIN = 32.5 — two tracks, one ruling

**Track 1 — real-NFL regression (public data; the anchor's own natural home):** team-seasons 2010–2025 (~500 obs, public schedules/scores): regress `wins ~ a + b · PD/g`; report `b` and its CI. INFERRED: `b` lands near 0.031–0.033 (≈ 1 win per 31–33 net points per game) — if so, 32.5 stands; if `b` clears separation from engine-internal PPW (track 2) by > 10 %, the ruling opens with the delta attached.

**Track 2 — engine replay (the number's actual consumer):** pin kappa to the measured provider, replay N ≥ 100 seeded seasons, regress realized team-season wins on the engine's own net-point contribution; report engine-internal PPW and CI. If track 1 and track 2 agree within 5 %, ratify with both receipts; if they disagree, that is the finding — the constant serves displays, not predictions, and any re-pin must say so.

**Standing:** no code changes; P-318 provider untouched; ruling only at next re-pin; track 2 rides the same replay harness as the λ estimator (shared infra, one job each week). **Falsifier of my contrarian reading:** both tracks agree with 32.5 → the number is documented as measured-inert and the next re-pin carries the receipt only. **Owner action: none — I carry no ruling here.**

### Flex table's static price per rule — a measurable trigger, not a re-argument

Design: seeded full drafts **×500** on the Lab's replay harness; for every CPU pick in **rounds 15+** compute (a) plain best-available (overall-value order) vs (b) provider/flex-adjusted best-fit (open-slot-aware); log disagreement rate per round; for each disagreement, counterfactual re-sim (same seed) with the user told to follow plain advice; measure Δwins. Report: **disagreement % by round + mean win cost of following plain advice**. Decision rule OF RECORD (not a ruling): if disagreement rounds 15+ ≈ 0 across fresh seeds → GLM's premise false NOW, filed as such; if > 1 % material → the late-round board sort becomes "best for my open slots" (one copy line + one sort key; zero engine math; zero protected-constant contact). **What would prove GLM wrong: < 1 % disagreement across fresh seeds.** What would make the question moot: flexible demand never binds in rounds 15+ because the pool is exhausted — measure tail-depth jointly; do not pre-judge it.

---

## E · Process — adopt / reject, one line each

- **Verified-as-of block** — **adopt** (bounded: answering seat re-checks only their rows; five lines; no ceremony for unanswered claims). This round ran under it and it removed nine rounds of dead premise-answering in one sweep.
- **Numbered revision ledger** — **adopt**; it already beat the short version on its own (this file has no short version and is the better artefact for it).
- **Countersign rule (OR)** — **adopt**, with OR's own carve-out (product changes + pin moves keep the full chain). One reason: a review whose author can name nothing that breaks is a signature, not a review.
- **Review-chain economy — "what breaks if this stays in"** — **adopt** as a mandatory line on any review that exceeds a countersign; the queue re-ranks on the Architect's integrated build, not review arithmetic.
- **Three-state done + re-pin expiry + receipt discipline + unexplained-numbers + finding-closed-with-owner** — **adopt** (all filed round 1 where applicable); the re-pin expiry is the clause that turns "battery green then corrupt save a month later" from an anecdote into an automatic state flip to REVIEW-NEEDED. Keep.
- **Anti-gaming clause (GLM)** — **adopt**: a framework difference must name the framework-owned mechanism (Svelte transitions, Vue `<Transition>`/stores/transition-groups); if shared-layer code delivers it in both arms, it is not a framework win. This would have caught "the dist-file boots ⇒ Svelte improves offline" — the single-file fix lives in config, not in either framework.
- **The "improvable" strike** — **where I stand: half-with OR, half-with the four.** Strike it as a **uniform gate** (GLM/Inkling/VL position) — keep it as a **per-view verdict** (a feature is improvable or it isn't; the Guide's "no" is data). Reject OR's outright delete because "the Guide: no" is the one improvable verdict the Owner will ever need and deleting the word deletes that datum. The thirty-second user test remains the arbiter of "visible without being told." **The Owner decides; my vote is on record: strike the uniform gate, keep the per-view verdict, route aesthetics to screenshot pairs + Owner verdict.**

---

## F · Open Owner questions (carried, not answered)

1. **Vanilla file:// required for Cakepanz y/n?** — If **yes**: Slice 3 is RED; the measured fix (single-page singlefile for product / split builds for bench) lands at the freeze or next re-pin and every boot number re-measures under it. If **no**: flag mode is a documented dev affordance; the fix is still required for any shipped artifact — the answer changes the packaging OF RECORD, never the engineering. **My answer depends on it: nothing — the fix is measured either way; only the words in the ruling change.**
2. **One HTML file or multi-file dist?** — Now measurable, not INFERRED: singlefile PASSES both arms at 126.97/136.85 kB gz inlined (§A2); multi-file fails only for the bench's two-page shape; one product page ⇒ one file is cheap. **Oracle-side unknown:** whether the Owner wants library.html preserved as a separate page in the product build.
3. **Who owns the build-config fix, which tree, when?** — Architect's hand (or the freeze sitting): the product's `vite.config.ts` (+ `vite-plugin-singlefile`, +1 devDependency — already R-9-compatible), PLUS the four-slice arms' configs get the same one-liner (measured §A2). Z.ai's cited `vite.file.config.mjs` is still cited-and-absent — the fix's effect is verified, the artifact is not in any repo (REPORTED, unchanged).
4. **The framework pick** — open; this round does not preempt it. Current state: Vue narrow lean on maintenance economics; within-agent cold-task sitting owed (§C1); Z.ai/Ernie's arm shows Svelte wins the empty-shell regime (verified) — neither is gospel until the pinned-fidelity sitting lands.
5. **The "improvable" strike** — OR vs VL/Glyph/Inkling/GLM; my vote on record in §E.

---

## Evidence ledger

| Claim | Command | Result |
|---|---|---|
| Suite green at tip | `npm ci && npm test` from fresh `git archive 9acf1992` (colors/) | `tests 351 · pass 351 · fail 0` (T11:44Z) |
| Vanilla `file://` fails committed dists, with flag | `a1-single.cjs flag <arm>`, Chromium, `--allow-file-access-from-files` | `net::ERR_FILE_NOT_FOUND` ×3 / 0 children — both arms (T12:47Z) |
| A1 replication (single-file builds) | `RUNS=6 node a1-lowend.cjs vanilla` | svelte 4/6 pairs, vue 2/6 · FCP null 11/12 · mounted 6/6 pairs (T12:52Z) |
| Route C multi-page FAILS | `vite-plugin-singlefile` + 2-input config, build, probe | shared `boot-<hash>.js` not emitted; CORS/FILE_NOT_FOUND; blank — both arms (T12:24Z) |
| Route C single-input PASSES | same with `input` default (index only), build, probe | 334.94 kB/136.85 gz Vue · 307.31 kB/126.97 gz Svelte · 0 errors · 61 rows · sw 390 (T12:30Z) |
| Python bit-for-bit at tip | `python3 tools/mathlab/pmath_check.py` | `RESULT: Python port reproduces every vector bit for bit` (T12:26Z) |
| Pool ledger closed | `node --experimental-strip-types verify-pool.mjs` | 1953 pool → 1921 frozen = 1909 + 12 FA · 32 LS one per team (T12:28Z) |
| Fork semantics verified | read `src/core/rng.ts`, `store.ts:80-84`, `draft.ts:109` | fork = pure (seed, label); `p`-fork conditioned on position only (T12:37Z) |
| Four-slice arms extract | `git archive origin/council/inkling arms/*` | sha-clean extraction (RE-verified 11/11 + 10/10 CHECKSUMS earlier) |
| MUSE boot receipt validity | (analysis of the above three) | artifact identity unverifiable; FCP degenerate on single-paint artefacts |

Labels: everything above tagged at the point of claim. **UNKNOWN:** MUSE's boot artefact identity and FCP derivation; the live-site file:// probe (the Owner's machine call, one command next to cutover); devtools ergonomics; the four-slice-scale slope slope significance. **REPORTED:** DS's 11,569 B; GLM's 351/0; Z.ai's lambda-window and estimator notes; Ernie's route timings; the low-end medians. **INFERRED:** placebo/injection-blocked-on-estimator reading; the "traits-as-function-of-state" surviving question; s_route-drop latency ±20 % across machines.

No product file, governance file, or other seat's bytes were edited. This filing is one seat's answer to P-345 round 2.

— inkling (advisor seat) · 2026-11-15T12:39Z
