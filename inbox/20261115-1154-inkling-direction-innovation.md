SPEAKER: inkling | ROLE: council | TASK: direction + innovation | DATE: 2026-11-15T11:54Z
FOR: P-345

# Direction + innovation — Inkling's filing (Revision 4 read; answers Q1–Q8 in order)

Labels: **VERIFIED** = I ran it, receipt in this file or in my lane · **REPORTED** = someone else ran it / wrote it · **INFERRED** = reasoned, not run · **UNKNOWN** = not checked.
Nothing in here is a decision; the Architect designs, the Verifier reports facts, the Owner accepts. Where I say "should," that is a recommendation with its evidence, not a ruling.

---

## Receipts first — what I ran today (2026-11-15, this machine, node v26.13.0)

1. **The Colors suite is green at tip.** `git archive origin/architect/engine-and-seats` → extracted → `npm ci` → `npm test`: **351 pass / 0 fail** (duration ~37 s). Tip is `9acf1992` ("Hygiene: @types/node 24, Node 24 pin, report-only CI workflow; NOW.md"). *This retires the "318/320, FIX THEM" premise — see Q7.*
2. **`vite build` fails at tip:** `index.html` → `<script type="module" src="/src/main.ts">`, `src/` holds `core`, `platform`, `sports` and **no app entry**. Error: `Failed to resolve /src/main.ts from …/index.html`. Second check of 5a3bb75e's note, two days later: still no shell. **Colors has no buildable product yet** (REPORTED for the UI work; VERIFIED for the failure).
3. **Vanilla `file://` boot — both arms FAIL** (Playwright 1.65.0 / Chromium, no `--allow-file-access-from-files`). Extracted from `council/inkling`'s four-slice `dist/index.html` copies. Both arms: `CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-untrusted, data, http, https` on the CSS **and** the module script and the boot chunk; `net::ERR_FAILED`; blank `body`; `#app` children = 0. Underneath the crossorigin tags sits a second, independent failure: root-absolute `/assets/...` URLs cannot resolve on `file://` at all.
4. **Control — the `dist-file/` single-file tent-test builds boot clean** on the same machine, same command, no flags: 0 console messages, 0 page errors; both arms mount and render the bench board ("67 Cakepanz — Bench Board", round 1 pick 1, full player rows). The `file://` problem is a **build-config** defect with a working fix already in the arms' bytes (single-file inline build). Honest provenance note: Z.ai's `vite.file.config.mjs` is one of the receipts cited-and-absent from his package (§11-6 of his REPORT; I filed the gap on 2026-11-14 — the config itself is REPORTED-absent; the fix's *effect* is VERIFIED by me).
5. **The live flex table confirms the structural assertions** (`origin/architect/engine-and-seats:tools/mathlab/flex.json`, 10 Nov lock, 99 rules `{0:23, 2:10, 6:43, 12:23}`): `WR>CB = 6`, `WR>FS = 6`, `WR>SS = 6`, `DT>FB = 0`, `TE>DIME = 12`, `TE>FS = 12`, `ILB>FS = 12`, `OLB>FS = 12`, `QB>FS = 12`, `TE>FB = 0`-class exemptions intact. (Note: the module exports `FLEX` and `fit(role, dest).penalty` / `fit(...).legal` — there is no `flexPenaltyFor` symbol; naming only, see Q7.)
6. **Trees:** `origin/architect/engine-and-seats` (Colors) contains **0 `.svelte` files** in the whole tree (`git ls-tree -r … | grep -cE '\.svelte$'`); `origin/gh-pages` contains **15** — **10 under `67-cakepanz/`** (8 components + 1 screen + App.svelte), the rest in the retired `w71`/`w74` prototype folders.
7. **Flex tiers match 5a3bb75e and 97d7e9d**, and the de-gating commit itself says: `npm test (whole repo present): 320 pass / 0 fail`. 320 (13 Nov) → **351 (tip, VERIFIED by me)**.

REPORTED (not re-run): the four-slice slope (R=0.9778 mean marginal, 0.9568 total, inside 0.85–1.18); Z.ai's 70% Svelte preference; the 10,946 B gz JS-only bundle gap; MUSE's low-end boot medians (FCP 2102 Vue / 2192 Svelte, Δ−90 ms; mounted 2185 / 2344, Δ−159 ms; spread ~330–430 ms; direction Vue-favoured in every run both metrics); λ window [0.3902, 0.4032), ~541-game cells, POST 122 games; pool 1,953 (1,941 ratings + 12 FAs, R-12); live site w85 (R-10); Cakepanz = slices 1–3 of 5, Slice 2 blocked on `SaveRecord.slot`; Colors engine pin `d3bd81d2`.
UNKNOWN: Banner-of-truth on w87/w89/w85 — and one data point I could not resolve: `preserve.mjs check` tonight surfaced a **local-only commit `7c9694e9` "Publish w89 as live index (gh-pages root)"** in the shared tree. If that is the intended live state, R-10 and `origin/gh-pages` disagree; if not, a staged make-live is sitting unpushed. Not mine to touch (shared tree; Owner/Beam own make-live); named here so the live-site state has exactly one owner. **The Owner should rule which it is.**

---

## Q1 — What direction should Claude take?

**The one-dial design: keep it; retire its first risk before any λ lands.**

The shape is right (one absolute scale `kappa`, relative duty weights from player-identity random effects), and R-6 already requires held-out seasons. The biggest risk is not the math — it is that **the whole window is 0.0130 wide (~3.3 % of λ₀ ≈ 0.397)**, so nothing stops a free `δ_c` from absorbing REG-pool noise and calling it "context." POST (122 games) rides the pooled λ₀ by design and that is correct; the danger is a 250-game REG cell (many quarters of football) confidently moving a cell that must not move.

Before the estimator ships, do the **placebo calibration**: shuffle game outcomes within seasons (destroys real signal, preserves everything else) and run the same estimator. If placebo contexts land inside the window at more than the expected false-discovery rate, the estimator is fitting noise and the real Δλ values are not fit to trust either. That is one engine run batch, not a modelling project, and it answers the only question that matters: *does this procedure find signal that is not there?* What would prove me wrong: placebo cells stay inside the band and held-out late seasons (not random rows — drift punishes random splits) reproduce the fitted `δ_c` rankings. Then proceed.

**The λ estimator, as filed: keep pooled REG λ₀ + partially pooled `δ_c` (empirical-Bayes shrinkage, POST never pools). Two sharpenings I would add:**
1. **Hard-zero the sub-floor cells.** Any context cell below ~541 games gets `δ_c ≡ 0`, not "shrunk harder." Soft shrinkage still leaks a 300-game cell into the product; at this window width, leaking *is* deciding.
2. **Report the posterior interval, never the point.** The Owner (and this council) should see `[low, high]` on every λ₀ and δ_c in the UI layer — the difference between "λ moved" and "λ might have moved" is the entire honesty budget of this model.

**Dynamics registry — build order: form → gravity → synergy.** Form (measured game-to-game carries above/below expectation) is the least artefact-prone and the most replayable. Focus (clutch) is the most likely artefact: clutch variance is dominated by noise and usage-selection; a "clutch dynamic" will re-learn team quality unless it is tested on **interleaved holdout** (fit on even games, evaluate on odd, not on a future block — future blocks drift). Any "dynamic" that does not survive interleaved holdout is an artefact; full stop. If two already-filed ideas have a first result, they ride this test or they die by it.

**The Lab — the single most valuable unscheduled run.** A **replay-determinism conformance sweep of the `pmath` port** — the vectors and a Python bit-for-bit check already exist (`d71a5e2c`, S2), but it is UNVERIFIED that they run on every engine build in the release path rather than once at land. If a portability regression ships, it poisons the λ estimator silently (the estimator consumes replays). Promote the bit-for-bit check + the conformance vectors to a standing CI-tier gate (it is nearly free), and add a **seeded full-season replay diff** (same seed, two builds, byte-identical record) as the weekly arm of the sweep. One afternoon of wiring; it retires ten mis-attributed λ arguments — and it is worth more than any new dynamic first.

**What he is NOT doing that he should, in order:**
1. **Close the pool ledger** — 1,953 counted vs 1,921 rendered: 32 rows nobody has explained, and it is a data-integrity hole with a named task and no movement. An hour of diffing `freezePool` vs boardVM filters. First session, not fifth.
2. **Remove the `react` + `react-dom` dependencies** from `colors/package.json` (R-9 ruled React out of the framework test; the tree still declares them; `svelte` is also declared but Cakepanz owns the incumbent shell, and R-13 put the two surviving arms at parity — the catalog should match the race). Thirty seconds, big hygiene payoff at every `npm ci`.
3. **Stop writing Δ-doctrine.** Plan v3 is the third plan revision in two weeks; the marginal return on prose is negative now. The next clause of engine work should be an S-phase checkpoint with receipts, not a plan that supersedes the last plan.

**What he should stop:** re-arguing the flex table (R-7 settled it; the table stands), re-arguing 2400 (dead), and any new "one more guardrail" around the protected constants without a named defect.

**Cross-cutting artifacts at risk of silent decay — who arguably owns each:**

| Artifact | Decay mode | Arguable owner |
|---|---|---|
| Engine pin `d3bd81d2` + re-pin contract | a re-pin lands without `MERGE-MANIFEST.md` hashes moving with it, or the mirror drifts silently | **Architect** (build) with **MUSE** keeping the two-place check (today: muse mirror and architect tree agree — 99 rules, TE>FS 12, checked) |
| `ZPB_SLOTS_WINS` (wins table embedded in the w-series lineage) | any weight change re-pins the engine and silently strands the page's copy | **Architect** — no one else can edit the product file; and the next re-pin should diff it against the measured provider and state in one line which table it matches (UNKNOWN to me which it matches today) |
| The two de-gated tests | fixed (see Q7) — but the *premise* (318/320) persisted in the direction for two days | already owned: Architect (fix, landed), MUSE (prose), neither is free to be the other |
| My own lane handoffs (`_agents/inkling/`, 147 inbox filings, deliveries back to Oct) | undiscoverable except by grep; each new seat re-digests the museum | **MUSE** as custodian — a three-line "what is current" header per seat lane, maintained by the seat, refreshed at chat end; today there is no such line and grep is the index |
| `bulletin/` rotation + this round's four revisions | stale premises propagate into seats' answers | **MUSE** (prompts/docs); seats (their bullets) |
| Local gh-pages W89-as-live commit (`7c9694e9`) | local-only publish with no origin counterpart | **Owner** (make-live is the Owner/Beam step); flagging, not fixing |

If the Architect disputes any row, the dispute rides in the bulletin — not here.

---

## Q2 — What direction should Z.ai take?

**Slice 5 (player cards) — make the card a state machine, not a picture.**

The Owner wants "similar to w89 but more dynamic, beautiful, interactive." The reason w89 fails that is not style, it is **memorylessness** — the draft is the one moment the app knows the player's name, role, fit and situation, and then the app throws it away. So:

- **Front (draft-night card):** w89 vocabulary at card scale — espresso ground, team-palette ring, position bubble with OVR, Cinzel numerals, shimmer only at 90+ (verified today in the shared CSS both four-slice arms ship — `dist/assets/main-DDqCrz9y.css`: `#140d06` ×1, `#c9a24b` ×3, Cinzel ×10, `fxshine/fxpop/fxglow` ×2 each — identical bytes in both arms; the w89-token extraction itself is Z.ai's §10 measurement of the live w89 bytes, REPORTED). One new element: a **fit arc** — a gradient bar under the OVR number encoding his measured contribution band at final cost (from the fit residuals already in the engine — no new math).
- **Tap/flip (390px) / hover (desktop):** the **scout face** — the frozen pool's own columns only (OVR/SPD/STR, the flex-verb for his role: "EDGE · stand-up · power deficit at edge sets"), plus **pool percentile** ("SPD 92 — better than 96% of the pool") computed against the frozen 1,941+12 snapshot. No invented stats, ever; every line is a view-model of `freezePool` rows.
- **The dynamic part — the card is one object with states:** `unknown → drafted → yours → starred → season-summary`. After the draft the same card re-renders on the team page with **his** season (GP, games started, engine-of-record impact, the two awards-check lines if crossed). No route change, no reload, no new component — one card, flipped by state. This is exactly the R-1 seam paying for UI once.
- **Interactive floor:** keyboard-focusable cards, `Enter` flips, `Escape` returns; tab order follows the column order of the ROSTER, not the DOM order of the card wall; 390 px targets ≥ 44 px (the w89 law, already satisfied in both four-slice arms — the BENCH-2 CSS law, REPORTED).
- **What it needs from the engine — one view-model, no new math:** `playerCardVM(poolRow): { ovr, spd, str, percentiles, roleFlexVerb, fitBand }` where `fitBand` reads the residual table from the fit (P-318 provider) — one file, ~80 lines, engine-owned because it imports the provider, component-owned for render only.

**The season sim / playoffs / awards — design first, build once the framework is picked.**

The framework decision IS an end-to-end judgment (R-7 / Q7 of the 15 Nov answers), but the season sim does not *exercise* the framework — it exercises the engine, the saves, the recap generator and the playoff bracket, all framework-neutral. Prototyping it in both arms spends the sitting's scarcest hours on the one thing that cannot diverge by framework. Direction: **write the framework-neutral spec now** (VM contracts for `gameVM`, `bracketVM`, `awardsVM`, the recap-consistency law — chronological scoring, every turnover named, OT only in the OT block), then build S6–S7 **once**, in the picked arm, with the four-slice arms retired to the record. If the framework call is wrong, the migration is ~350 lines; if the spec is wrong, both arms build the same wrong sim.

**Slice 3's un-calling is Slice 5's opening.** Slice 5 should be the first thing built *to the new definition* (Q5): vanilla `file://` (the `dist-file` shape), fresh-clone battery green, Owner's eyes. That is a feature, not a chore — it makes slice 5 the reference slice.

**The authoring-cost measurement that has NOT been run yet — the cold-task test.**

Give both arms a **novel micro-task neither arm shipped** (e.g., "12-row roster table, sort toggle on two columns, persist last sort to the save envelope schema, 390 px clean, git-verifiable manifest"), no reference file, timer and **tool-call log on**, run twice per arm with order randomised per slice, fidelity pinned numerically (DOM node count ±2 %, rows, states). Measure wall-clock to green, repair cycles, checker-caught vs self-caught defects. The four-slice sitting measured everything *except* this — pattern-match familiarity is the one contaminant left in the arm-vs-arm question, and a cold task is the only design that separates framework-ergonomics from memorised code. Run it **as a passenger, piggybacked on slice 5's sitting** — not commissioned as a standalone experiment (see Q3 for that verdict).

**Parity between arms — pause one, on a date, with a resume trigger.**

Direction: **both arms keep parity exactly until the framework is picked; immediately after the pick (or at the end of slice 5's sitting, whichever is first), pause the losing arm's build and pin it to read-only record, with its resume trigger written down (it is days of mechanical port, not a rebuild).** Pausing **before** the pick doubles the work; pausing the wrong arm costs nothing; pausing **instead of** the pick is how the race becomes permanent. The risk of pausing after the pick is parity evidence going stale — mitigated because the migration is 7-files/332–347-lines and the pause is dated and reversible by construction. Risk of *not* pausing: two live trees, one drifting (the Svelte arm absorbs Cakepanz fixes the Vue arm never sees, unknowably which direction the port goes at cut time).

**What he should stop:** any work on w89's `index.html` (the w-series is a frozen record now, per R-10 and the w85-live law), and any slice-3.5 patch to the four-slice arms before the build-config fix has an owner (it is the same defect; fix it once, in the right tree).

---

## Q3 — The fundamental question: Vue 3 + Vite or Svelte 5 + Vite?

**Answer directly: for an agent to code THIS project, Vue 3 + Vite is easier/faster/more complete to ship and to maintain — by a narrow, honest margin, and on maintenance economics rather than on first-build speed. Z.ai's 70 % Svelte preference by bundle is now unmeasurable as an advantage (see MUSE's low-end boot, REPORTED; and my boot replication, VERIFIED — both arms fail `file://` identically, both pass via `dist-file`; the 390 px pass is MUSE's, REPORTED, not re-run by me), and Z.ai's own maintain-answer points Vue's way (q15). This is a maintainability call, not a preference.**

Why, on the evidence:

1. **The store is where maintenance lives, and Vue's is cheaper to hold.** `src/lib/appStore.ts` 61 lines (shallowRef+computed, mainstream idiom) vs `src/lib/appStore.svelte.ts` 68 lines built around **compiler-forced** getter exports (`state_invalid_export`, `derived_invalid_export`; the remedy — getter functions — then broke TS narrowing: "Object is possibly 'null'"), all verbatim in the sitting's §q3/q4, REPORTED. The six-months failure mode is not elegance: it is a tired agent reading `draftSnap()` as a function call without the header comment and "fixing" it into a reference. Compiler-forced idioms demand a comment to be survivable; comments rot; Vue's idiom does not need one.
2. **Checker precision lands on the highest-churn files.** Vue: one-line-precise coordinates in templates (q4); Svelte: module-exports-of-reactive-state cost **three build failures before green** on *known* ground (q17) — cold paths will hit more, because Svelte 5 runes-in-modules is a recent API break that agents and docs still blur with Svelte 4 semantics (the direction's §0 context warns exactly that; Z.ai's sitting is the exhibit).
3. **Ecosystem headroom, unmeasured, Vue's best card:** devtools, router, pinia, TanStack Table, VueUse (the four-slice bench shipped the library integration at **90 LOC arm-owned vs 130**, with debounce+storage folded in). Z.ai himself names devtools "the one input that could plausibly move the decision" and could not measure it headless (q11).
4. **What Svelte genuinely wins:** denser markup, a free a11y pass, and the smaller bundle — which just stopped being user-facing (MUSE's boot, above). Svelte's compensating virtues are real and real-estate; they are not decisive at this project's scale.
5. **What proves me wrong:** (a) the counterbalanced arm — run properly — shows agents shipping the same slice in Svelte with materially fewer repair cycles or wall-clock; I fold immediately and publicly; (b) the Owner (the actual maintainer) finds the Svelte tree easier to work in — user evidence outweighs my reading, full stop; (c) vapor-mode Vue lands within 5 KB gz — this does **not** flip my answer (it flips Z.ai's own falsifier, toward Vue), it *confirms* it. Any specific evidence that **maintains** my answer weaker: if a slice-5 comparison shows repair-cycle/wall-clock parity (±10 %), the framework call devolves to tooling, which also points Vue — so even my failure case keeps the direction.

**The single measurement that would settle it for me** (and the only one I would commission beyond piggybacking): *the counterbalanced cold task, run once by a seat with no Cakepanz shipping history, with tool-call telemetry and order randomised per slice, judged by ≥15 % wall-clock or repair-cycle delta at equal numerical fidelity.* Not the bundle. Not the slope. Not the boot. Either the frameworks tie on authoring (then tooling decides — Vue) or they do not (then authoring decides). **Flip condition: Svelte author beats Vue author by ≥15 % on both wall-clock and repair cycles with fidelity pinned — everything folds to Svelte.**

**Assessing Ernie's attack on cross-agent (f3551218) — agree, with two improvements:**

- *Agent skill variance > framework variance:* **AGREE** — and I add that cross-agent launders each seat's prior into "framework evidence." My own prior went both ways (Vue corpus huge; Svelte 5.5 docs thin) and both are priors, not measurements.
- *Training-data mix is the unnamed confound:* **AGREE — it is unmeasurable directly** (no seat can audit its corpus), so it poisons every cross-agent number silently. It also varies **per seat per week** (new releases rebalance it), so cross-agent does not even hold still across sessions.
- *The revised design (within-agent, per-slice randomised order, his arm secondary — "a second agent found X," never averaged):* **AGREE** — with two improvements: **(1) pin the review, not only the build.** The comparing judge sees both arms with the arm-title labels swapped per screenshot (key held by a seat who does not build), so priors do not re-enter through the scoring door; **(2) log tool calls and repair cycles, not just wall-clock.** Wall-clock conflates think-time with framework-time; `edit/build/test` counts are the framework-sensitive counters. Z.ai's own phase-J ledger (defects 7, repair cycles 10, the one silent-fake-pass on resume) is exactly the measurement shape — reuse it, don't invent a new one.
- **Is the measurement worth running?** *Only as a passenger on work that happens anyway (slice 5), never commissioned.* The marginal information left over the four-slice sitting (332/347, q15, q17, the boot) is small; a standalone benchmark would produce a number the council would argue over for another four revisions. Tie it to the sitting or drop it — my answer is the first.

**The inputs and the proposed weighting** (the Owner ruled authoring one of several; here are the several):

| Input | Weight | Basis |
|---|---|---|
| Agent authoring efficiency (speed, repair cycles, checker precision, idiom survival for runes-era Svelte) | **30 %** | the Owner's fundamental question; where agents live |
| Long-term maintainability by non-specialist + agents (store idiom, non-obvious wrappers, comments-rot) | **25 %** | compounding term; Z.ai q15 + MUSE's lean |
| Tooling / ecosystem (devtools, router, pinia, TanStack breadth, a11y pass, VueUse 90 vs 130 LOC) | **20 %** | rescues stuck agents; measurable once, not re-weighed |
| Output performance (boot, 390 px, bundle) | **10 %** | measured: a wash beyond parity; verified today |
| Library integration cost | **10 %** | one sitting of ~30–50 LOC delta; measured, small |
| Platform risk (API break/drift — Svelte 5 recent; SvelteKit out) | **5 %** | low probability, high annoyance; Vue's floor is higher |

**Can the bundle outrank authoring?** Yes, in exactly two worlds: (a) a measured interactive-time gap beyond the ±100 ms noise floor **after** the `file://` fix — tested, did not fire; or (b) vapor-mode closes under 5 KB gz **while** authoring stays tied — then the bundle decides and dissolves Svelte's last separating criterion. Authoring outranks bundle always **at this project's size** (1,953 players, local, offline): bandwidth is not the binding constraint; agent attention is. If the product ever ships to real low-end phones *with* a measured boot gap the fix cannot close, performance re-weights to ~25 % and authoring drops to ~20 % — but only with the receipt in hand, never by prior.

**One-line version: pick the framework the tired agent can hold at 2 a.m. with no comments to save them — today that is Vue 3 + Vite, narrowly, and it stays narrow until the cold-task sitting lands.**

---

## Q4 — Open innovation (two ideas, developed) + the contrarian case

### Idea 1 — the draft "feels pressure" probe: the static-RNG assumption nobody names

The 2026-11-11 question: *is there something else like the 0.20-vs-0.40 binary that assumed a static situation instead of a fluctuating one?* There is, in the dice themselves. The engine forks RNG by **label** — `core/rng.ts` `fork(label) = makeRng(seed ^ hashString(label))` — and the store draws CPU picks from `fork('p' + pos)` (BENCH-2 report §A1/A2, REPORTED; the fork semantics are INFERRED from that quoted mechanism — not re-verified in the engine source). The fork is a pure function of `(seed, label)` — the RNG **does not know the board, the score, or the round**. Every CPU pick at position 17 is drawn from the same distribution whether the team is a quarterback-needy basement team nine spots from the playoff line, or cruising with two picks left in round 3. That is a **static assumption baked into every "comeback" the product narrates**: the sim's dice are indifferent to pressure.

**Mechanism (concrete):** make the fork *conditional* instead of a global engine change: `fork('p' + pos + '-' + band)` where `band ∈ {trailing10, even, leading14}` is the **board score differential at the pick** (a number the reducer already has — it is the user's win probability / the standings state the engine computes for the playoff picture). 30 bytes of label surgery; **zero changes to the save design** (the label stays deterministic given state — resume still byte-identical); the engine gains a "conviction under pressure" bias for free.

**The test before the build:** fix one seed; force two board snapshots differing **only** in score differential; log the CPU's top-3-rated chosen players and their OVR deltas; repeat 100×. If the pick distributions are statistically indistinguishable, the RNG is already downstream of a board-aware chooser and this idea dies in an hour, not in a sprint. If they diverge, the whole drafting narrative gets a fluctuating handle for the price of a label. **What would prove me wrong:** exactly that probe returning noise. That is why the probe comes first; I file the idea, not the change. (And the fork-label semantics in the mechanism are INFERRED, not re-verified against `core/rng.ts` this session — the probe's first step is to verify them, not to exploit them.)

### Idea 2 — the card **remembers you** (the slice-5 unlock hiding in the save format)

w89's draft is memoryless. The platform's actual product, if the Owner ever ships it, is not the simulation — it is the **memory of who you were when you ran it**. The mechanic: the draft-night card (Q2) is **purely derivable** (pool row + pick ordinal + seed) — it needs no save-schema change, no data file, no engine math; and the card the app shows after the draft (plus the week-9 "how he's doing" card) is the same component in two additional **states**. A user who sees *the card it showed him at pick 1.1* resurface on the team page with his season arc has been **given back his own story** — which is the reason trading cards exist, and the one thing w89 structurally cannot express because it rebuilt the DOM on every pick.

**Mechanism:** three lines of view-model state (`draftNight | roster | season`), one component, no new data; the save already holds picks and seed. **Why it matters beyond prettiness:** it is the cheapest possible answer to "what does the user feel at cutover," and it is the seed of the platform pitch (the design surface is *memory shapes*, not more sim). **Falsifier:** if the Owner looks at the roster card once and never again, the idea dies at review — one sitting to find out, no engine contact.

### The contrarian case — a "settled" number that should not survive the next ruling

**`POINTS_PER_WIN = 32.5` (the Pre-Colors anchor).** It is the least-measured "settled" constant in the tree: it predates the D-pick weights, the P-318 measured provider, the port of the math to `pmath.ts`, and the 99-rule flex. It is not re-derivable from a table without re-running impact measurements — so nobody re-measures it; they carry it, because protected pins re-pin only on approval. Under model-first, an anchor whose impact has never been re-measured on the *current* engine is an inheritance, not an axiom. **NOT a proposal to change it** (protected constant; Owner alone) — but: the next re-pin should not re-pin it blindly; it should be **measured by the Lab** (regress wins on points across real team seasons + engine replays; ratify with a receipt or open the ruling with the delta shown). Second contrarian, same disease at smaller dose: the **10,946 B Svelte bundle "win"** was briefly the favourite "settled" input; it dissolved under the low-end boot; the council's habit of treating a measurement as settled *beyond its protocol's scope and expiry* is the general bug — every measurement here has a scope (machine, protocol, pin, date) and the scope expires.

**Does the platform's design surface change the framework decision?** No — it tilts it, mildly, toward authoring. A simulation-design surface is forms-and-validation work (knobs, presets, rule editor, live preview — **more state, more forms, less animation**) where type-safety and error-message quality dominate — i.e., *authoring criteria, not output criteria*. It does not add a new axis; it re-weights two existing ones. And it argues for **absorption, not a fork**: the platform surface should be the **same** shell with a second wall of knobs behind a mode flag, never a second app — two trees means the two frameworks race *again*, permanently, and the race is the cost, not the parity. (The smallest version worth building first is exactly one knob wall: the OFFENCE dial set — grading priorities, in one form, live-previewed — because it exercises authoring, state, validation and preview with zero new engine math.)

### Also named, not developed (explicitly smaller)
**ZPB_SLOTS_WINS staleness** — the in-product wins formula embedded in the w-series lineage has never been diffed against the model-first provider (Q1 table); that is the quiet version of the 0.20-vs-0.40 disease: a constant that remembers an old engine. One diff, one line of verdict, every re-pin.

---

## Q5 — "Done" for a slice (assessing Ernie's definition, then ruling on the eight)

**Assess Ernie's definition (f3551218): agree with the skeleton, fix three things.**

> His: renders at 390 px and from `file://` with zero blocked requests and zero console errors; battery passes with every SKIP and DEFER justified in writing; engine byte-identical to the pin; manifest verifies from git; the Owner has used it and said it is right. (Plus: keyboard reachable.)

- **AGREE — all six, and the last clause is the only non-formality.** A slice that passes every check and that the Owner will not use is not done; every seat's "technical green" quietly assumes otherwise.
- **IMPROVE 1 — add the four-line receipt discipline** (`cwd · cmd · ref · output`) as a NAMED necessary condition. "Manifest verifies from git" implies it; making it explicit is what turns "done" from a feeling into a thing an auditor (future seat, hostile reviewer) can re-run in ten minutes. His §1.2 row "manifest verifies from git" is the right check; the receipt shape is the enforcement.
- **IMPROVE 2 — add the unexplained-numbers receipt** (his own §1.3-3, which he listed as missing and I elevate to the definition): *if the slice moves a number, the before/after belongs in the receipt.* This is the condition most often skipped, and the one this round keeps burning seats on.
- **IMPROVE 3 — replace "done / not done" with a three-state.** `GREEN (machine) · OWNER-PENDING (Owner has not looked) · RED (any gate failed)`. The Slice-3 un-calling is *correct* as a `RED` (the file:// gate fails — **VERIFIED today, both arms**), but "Owner has not looked yet" should not render a technically-complete slice indistinguishable from a broken one — three states kill that entire argument class. "Done" = `GREEN` **and** `OWNER-PENDING → OWNER-USED`.
- **CLARIFY sufficiency:** necessary = the six + receipt discipline + fresh-clone battery + no unexplained numbers. Sufficient = all of those **+ one review by a seat who wrote none of it + Owner's word**. Everything else is either inert or mechanism-specific.

**Machine-checkable vs human-checkable vs Owner-only:**
Machine: 390 px no-scroll probe (the heaviest view), **vanilla** `file://` boot (now actually meaningful post-R4.2 — zero blocked, zero console errors, *mount confirmed*), engine `diff -rq` against `git archive <pin>`, manifest `sha256sum -c` from a fresh clone, battery exit codes, keyboard tab-order probe, TBT/long-task budget. Human: "the difference is visible without being told" (beauty/interaction — judges, not gates), tab-order "sane," readability. Owner-only: usability — by definition; only the Owner can say it.

**Does "done" differ between S1–S5 and S6–S7?** Yes — in the **sufficiency clause only**, as Ernie said:
- **Slices (S1–S5, a screen):** done = the definition above.
- **Systems (S6–S7, a season / bracket):** done = **a full run to the Super Bowl** — standings correct, no crash, no console error across the whole run, recaps consistent with play-by-play. A battery exercises slices; a season is a thousand interactions of them, so a battery can never gate a system.
- **Save mechanism specifically** (S4/S6, anything touching `save-envelope.ts`): done additionally = **corrupt-envelope refused AND newer-envelope refused AND quit/relaunch byte-identical resume** (the A1 test shape — `resume-*` sha `e62e79f4…`, REPORTED from BENCH-2). Silent data loss is not a UI blemish; it is the one failure the battery has never caught for the w-series path.
- **Sim/feed mechanism:** done additionally = **every OT event inside the OT block, every turnover named, chronological scoring** — grep-enforceable on the summary fixture, not judged.
- **Necessity stays universal; only the sufficiency receipts grow per mechanism.**

**Does "done" not-become-broke?** This is the clause everyone leaves out, and the one the Owner's question actually tests: *the battery passes, Owner calls it done, a month later a corrupt save.* The definition must carry its own expiry — **"done" is a state, not a certificate**: on every protected-constant re-pin, the six gates re-run against the pin or the slice automatically reverts to `REVIEW-NEEDED`. The enforcement arm of "done" is the battery itself, re-run on every re-pin, from a fresh clone — plus restore-time refusal at the envelope layer, so a corrupt save *cannot become a state the product enters*. If the battery dies after done, done decays in weeks; write the clause down or don't call it done.

**Name an existing thing called "done" this definition would un-call:** **Slice 3 (Cakepanz) — and this time it is not "filed and moved on."** Today I ran the vanilla `file://` boot on both four-slice arms: CORS-blocked blank page, nonexistent mount, 0 root children — **VERIFIED**. MUSE independently verified; Ernie deduced it. The definition un-calls it. In the same motion it un-calls **"Colors is a fully functioning product track"** — `vite build` at tip fails on `/src/main.ts` (VERIFIED today), i.e. there is no app to even boot, so "done" was never claimed; do not let the next prompt claim it. (And honestly, from the same definition: whether w85-live passes vanilla `file://` at 390 px is **UNKNOWN** to me — run the same one-command probe on the live page before cutover, and do not call the live build "offline" until it does.)

**The eight candidates, ruled:**

| # | Candidate | Verdict |
|---|---|---|
| 1 | Two-arm bench battery passes | **NECESSARY** — it is the battery; not sufficient alone (battery-green + blank page is STRICTLY FAIL under #4 now) |
| 2 | Bench + `predict.md` | **INERT as a gate.** A prediction reading calibrates confidence; its absence cannot fail a build. Keep it as review furniture, never as law |
| 3 | Four-line receipt (`cwd·cmd·ref·output`) | **NECESSARY** — without it nothing else is provable; without it the audit is fan-fiction |
| 4 | Save refusal works (corrupt and newer both) | **NECESSARY for save-adjacent mechanisms; INERT for pure-display slices** — gating a Bench-board slice on envelope refusal is theatre |
| 5 | Owner has looked in his own browser | **NECESSARY for shipping (acceptance), not for building.** Human, final, unfakeable — nothing else on this list survives contact with him |
| 6 | AGENTS.md style enforced (`.ub`, "2-Pt Conv", plain language) | **INERT as a slice gate; REAL as a view gate** (a game-screen slice fails without it; a save-screen has no such copy) — mechanism-scoped, same pattern as #4 |
| 7 | w89 save path holds | **NECESSARY as the invariant** (byte-identical resume / envelope refusal), renamed surface: the A1 quit/relaunch sha shape, not w89-the-file |
| 8 | Battery passes from a fresh clone | **NECESSARY** — defeats "works on my machine" (cache, hidden files, tar); this is the gate Z.ai's own receipts failed (a3.json cited-and-absent, REPORTED), which is why it is IN the definition |

**Missing entirely:** (a) the **re-pin expiry clause** (above) — nothing ever made "done" rot on schedule; (b) the **unexplained-numbers receipt**; (c) **finding-closed-with-owner** — a finding filed "for the Architect" is closed only when the Architect acts or the Owner declines; my lane filed the `file://` CORS as "a vite-level finding, identical for both arms" on 2026-11-14 — **that filing was correct on the mechanism and wrong on the disposition**: an unfixed blocker on an offline hard requirement is not "filed," it is *carried*, and the carrying ended today only because three seats converged on it; the general rule belongs in the definition.

**Who decides on disagreement:** three-key, no voting. **Architect** decides *design* (what is possible), **Verifier** decides *facts* (what the receipts say), **Owner** decides *acceptance* (what ships). A seat who wrote the slice cannot verify it; a seat who wants a review cannot be outvoted; the Owner's word ends it. There is no fourth key, and if a fourth appears it is a fifth seat blessing a feeling — decline it.

---

## Q6 — "Improvable" (assessing Ernie's definition)

**Assess Ernie's definition (f3551218): agree, adopt, and make one clause operational.**

> His: a w89 view is improvable if the framework can do at least one of three things w89 cannot — preserve state across a transition w89 loses; express a transition w89 cannot (animate, interpolate, morph); reach a 390 px fidelity w89 cannot — **and the difference is visible to a user without being told.**

- **AGREE** — all three paths are checkable, and the last clause is the whole definition turned into a judge: if you have to explain it, it is not an improvement.
- **IMPROVE — operationalise "visible without being told."** The gate is a **thirty-second user test**: a first-time user shown both versions of the view, asked "which is better and what would you tap?" The improved view wins on the tap question, not on the adjective question. That single protocol kills the two standing cheats: "line-count is improvable" (no — it is not a user-visible difference) and "bytes are improvable" (no — that is Q6-candidate-2, a performance criterion, judged elsewhere).
- **Fourth path — I'd add rather than substitute:** **"w89 makes a failure reachable; the improved view makes it unreachable."** (A corrupt save that w89 silently reverts; a filter that resets on navigate; a 390 px overflow that hides the commit button.) This is the *least glamorous* axis and the most relevant to cutover; it needs no animation budget, only the honesty of a fresh-clone battery. Call it the **refusal path** — he gets all credit for its existence; it is just misfiled under "nice, not necessary" in his §1.2-style split. It is necessary, and it never needed the word "beautiful."
- On the falsifier he chose: **the Guide is not improvable in either framework** — AGREE, and his reasoning is the one a seat cannot argue with: static reference text, no engine content behind it, and inventing content is a data-integrity violation. "Improvable: yes" for the Guide without a named mechanism is a failed definition of improvable, not a found improvement. The Guide may still be *restyled* — that is a design decision, not a falsifiable criterion.

**Rule on the five candidates (+ the sixth I invented):**

1. **Interactive-tag wins** (whatever is more clickable/hoverable) — *necessary for one of the three paths, never sufficient*. A hover that changes nothing still "tags interactive"; a row nobody can reach at 390 px still "tags interactive" in the source.
2. **Measurable wins** (paint/bytes/cold-load) — *real but orthogonal*. Report them with receipts; they gate performance, not "improvable." The low-end boot showed exactly this class of win can be zero (11 KB ≠ user-visible).
3. **Replaces a w85 sentence with something better** — *weak*. Only counts if the replacement changes a **decision the reader makes**, not just their reading speed. Otherwise every reword is an "improvement" and the word dies.
4. **Closes toward "broadcast-tier"** — *vibes; unfalsifiable as written*. Strike it as a gate. It survives only as a **mockup direction** for slice 5 (full-screen cards, broadcast framing, star-shimmer) where it names a *visual target*, never a quality verdict.
5. **Strike it as a criterion entirely** — *half-right*. Strike it as a **uniform gate**; keep it as a **per-view verdict** (a feature is improvable or it is not, and the Guide's "no" is a result, not a scandal). For the **platform** (Q4) strike it outright: a design surface needs precision and predictable validation, not beauty — but a game view does.
6. **The sixth — "learns when used."** An improvable view **gets better the more you use it** — it remembers your sort, your filter, your team, your star. Memory is the one axis w89 structurally cannot express (it rebuilt the DOM per pick) and both frameworks get for free via the store; and Ernie's own state-survives-transition test (his §2.2 row 1) is precisely its checker. This is the axis where slice 5's cards are improvable in **any** framework without touching engine math — filter the card wall to your team and the product is already ahead of w89 on a user's first ten minutes.

**What would make a feature NOT improvable:** (a) static reference text (Guide — settled); (b) the engine has no data behind the claim — inventing it is a data-integrity violation, so the feature is not improvable *there*; (c) the "improvement" changes neither state, nor transition, nor fidelity, nor memory, nor reachability of failure states — pure appearance; (d) the improvement costs more than the done-gate allows (a shimmer that adds 2 s of main-thread work fails "done" and therefore is not improvable — beauty does not get a pass on the battery); (e) it cannot survive the thirty-second user test.

---

## Q7 — The two de-gated tests: explained, and the premise is stale

**Plain language.** The engine moved underneath its tests. When the engine is re-pinned — flex table re-priced, weights changed, the P-318 seam landed — any test that asserts "*this specific number*" (the 2400/2700 total; the old `nfl1.14a4…` stamp) goes red **even when nothing is wrong**, because the pin moved on purpose. "De-gated" meant: the assertion was removed from the hard gate so the suite reports green, with the number logged as `REPORT`, waiting for the right fix. The right fix is a test that gates what cannot legally move (structure: which slots flex, at what price, who fills, and the data stamp) and reports what may legally move (the weight-derived total; the engine stamp).

**Recommendation: rewrite as structural — and it already landed.** Commit `5a3bb75e` (2026-11-13, "Architect: D0 carry-over defects + de-gate the two red tests (Owner: no weight pinning)"; an ancestor of tip `9acf1992`, verified) rewrote them almost line-for-line as Ernie proposed:

- `lineup.test.ts` — gates `flexed.length === 3`, all penalties **6**, `TE3 ← FB` at **6**, inside stand-in price **6** (slot MIKE/DT2 REPORTED), DT-at-`FB` **0**; the 4-3−3-4 **gap is `t.diagnostic` REPORTED** ("last pin 2400, 9 Nov 2026"), gated only as `gap > 0`.
- `versions.test.ts` — engine stamp **REPORTED** via `t.diagnostic` with a MOVED/UNMOVED flag (`PIN_ENGINE` kept only for the report); **data stamp asserted** (`dataVersion === PIN_DATA`); engine stamp **shape** still asserted (`/^nfl1\.[0-9a-f]{14}$/`).

**And the suite is green at tip — VERIFIED by me today:** fresh `git archive origin/architect/engine-and-seats`, `npm ci`, `npm test` → **351 pass / 0 fail**. The "318/320 with 2 de-gated" premise in the ruling was true **on 13 Nov before** `5a3bb75e`; the fix made it 320/0 then and 351/0 at tip now. There is nothing left to fix — only the premise to retire.

**Ernie's code, reviewed against the live tree:** **AGREE, with one naming correction.** His structural checks match what landed almost line-for-line; the flex prices he asserts were **verified by me against the live `flex.json`** (WR>CB/FS/SS = 6; DT>FB = 0; the 10 Nov 99-rule lock `{0:23, 2:10, 6:43, 12:23}`). One correction: there is **no `flexPenaltyFor` symbol** in the live module — the exports are `FLEX`, `fit(role, dest)` (`.penalty`, `.legal`, `.emergency`), `fit` paths through `SLOTS` metadata. Trivial, mechanical, intent identical; the Architect is the one to land it if any test file changes. His assertion #2 (`lineup.filter(p => p.slot === 'TE3').length === 1`) is **weaker than what landed** (the tree asserts `['TE3','FB',6]` — the role pair, not just the slot), so keep the tree's version, not his. And his demote-total-to-REPORT: landed verbatim.

**What remains for this question:** not code — the **counter**: confirm the full suite at `d3bd81d2`-pin (`npm test` passes with the report-only flags, per the workflow already in tip's hygiene), and strike the stale premise from the ruling texts. The **general rule** the council should adopt:

> **When a test's expected value goes stale on a pin move: ask whether the value is a NAME or a NUMBER.** If the pin is the contract — a schema, a grammar, a hash shape, a data-file sha — the pin move and the test update ship in the **same commit**, citing the Owner's approval for protected pins (a silent data change is exactly what the gate exists to catch). If the value is a **measured consequence** of the pin — a gap, a total, a derived stamp — the test is rewritten around it: **assert the invariant structure, REPORT the number with its last-looking-pin label**. The pin move never "updates the test" by editing the stale constant in place, and no approval is needed to stop measuring a number the Owner ruled must not be pinned. *Law is re-pinned with approval; measurement is reported, never pinned.*

---

## Q8 — The thirty-minutes test + the thing that costs more than it returns

**The move first, if I had the Owner's authority for thirty minutes:**

- **STOP: sending revision-4-style directions whose load-bearing premises are days old, and letting seats answer them.** This round answers Rev 3's "318/320" with Rev 4's "assess Ernie" — and nobody, including me until today, had run `npm test` against the pin. *One command per claim before the council re-answers it* — a five-line **"verified-as-of `<sha>`: …"** block per direction claim, seats re-check the one they will answer, skip the rest. Cost: minutes. Payoff: no council round is ever again spent answering a dead premise. (Counter-evidence exists: this direction went to four revisions with zero re-checks; the fix for it existed since 13 Nov.)
- **START: one thirty-minute Owner sitting, three verdicts, on the record:** (a) **vanilla `file://` — requirement for Cakepanz/final product, yes or no?** (It decides Slice 3's fate under Q5's definition, it gates the low-end boot's meaning, and the fix is a one-line build config with a known working shape — `dist-file` boots clean, VERIFIED today.) (b) **who owns the build-config fix and when** — design-freeze or next re-pin, Architect's hand, and *which* tree (Cakepanz's Vite config on `gh-pages`, the four-slice arms' config, or both). (c) **the `7c9694e9` "w89 as live" local-only commit: push it as live, or clear it and keep w85.** Three rulings, one coffee, and the w85/w87/w89 story finally has a single owner who can say what is true.
- **KEEP: the seats-verify-before-they-assess reflex** — it is this round's success case. One machine, one hour, and it retired Q7 outright and upgraded Q5/Q6 from REPORTED to VERIFIED. Keep it in every review round; teach it in the prompt template (Q6 asks for it implicitly); never let a prompt again ask seats to answer without a re-check line on the claim they build on.

**The risk that bites:** the STOP decays into provenance bureaucracy — every prompt grows a "verified-as-of" ceremony that itself goes stale, the council becomes auditors of auditors, and the cost lands as latency on every round. Bound it: five lines per claim, optional where no seat will act on the claim, and **only the seat answering is required to re-check**, never the whole council. If it ever becomes a format the council blesses, I will attack it in the next round with the same energy I just put into attacking "settled" numbers.

**One thing the council does that costs more than it returns — no softening:** **the review-chain economy.** The queue counts reviews as progress — items sit at "4–6 done, last catch 60–100 %, cap 8" — and it measures **reviewer activity, not defect retirement**. The product file (the only artifact whose defects matter to the user) has not moved in weeks; the Architect is building Colors behind it; meanwhile each new review sharpens a frozen w-series target while the queue's rank order never reflects the product's actual next failure. A seat reviews because the chain says the item is next; nobody reviews against "what breaks if this stays in." The replacement is not a new process — it is a **deletion**: reviews carry one required line ("what breaks if this stays in"), a review passes only if the reviewer can name the failure mode or say explicitly "no failure mode found," and the queue re-ranks on the Architect's last integrated build, not on review-count arithmetic. Cost of removing it: zero. Payoff: the chain stops grading seats and starts guarding the product. If I'm wrong, the receipt is already public — this direction is four revisions old, every revision answered by more text instead of one command, and it cost more than it returned.

---

## Evidence ledger (commands, not vibes)

| Claim | Command | Result |
|---|---|---|
| Suite green at tip | `git archive origin/architect/engine-and-seats \| tar -x -C <tmp>; cd colors && npm ci && npm test` | `tests 351 · pass 351 · fail 0` (2026-11-15T11:44Z) |
| `vite build` fails, no app entry | same tree: `ls src` → `core platform sports`; `npm run build` | `Failed to resolve /src/main.ts from …/index.html` |
| Vanilla `file://` fails, both arms | arms' `dist/` extracted from `council/inkling`; Playwright 1.65.0 `chromium.launch({headless:true})` (no allow-file-access flag); `page.goto('file://…/dist/index.html')`; 4 s wait; probe `#app`/body | arm-vue & arm-svelte: CORS errors on css+js+modulepreload; `bodyText:""`, `#app` children `0` |
| `dist-file` boots clean, both arms | same probe on `dist-file/index.html` | 0 console msgs, 0 page errors, board mounts (`"67 Cakepanz — Bench Board"`, 4 root children) |
| flex table values | `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` → node assertions | WR>CB/FS/SS=6; DT>FB=0; TE>DIME/FS=12; ILB>FS=12; OLB>FS=12; QB>FS=12; 99 rules `{0:23,2:10,6:43,12:23}` |
| Colors 0 `.svelte`; Cakepanz 10 (of 15 on gh-pages) | `git ls-tree -r origin/architect/engine-and-seats \| grep -cE '\.svelte$'` → `0`; `git ls-tree -r origin/gh-pages --name-only \| grep -E '\.svelte$' \| sed 's\|/[^/]*$\|\|' \| uniq -c` → 10 under `67-cakepanz/` (+4 w74, +1 w71, retired) | per-path counts, not totals |
| De-gating commit & suite claim | `git show 5a3bb75e --stat`; `git merge-base --is-ancestor 5a3bb75e 9acf1992` | tests rewritten; `npm test (whole repo present): 320 pass / 0 fail` |
| A3.json / vendor-digest scripts cited-absent | BENCH-2 REPORT §1 (a3.json errata row) | REPORTED; not re-run (flagged 2026-11-14, still open per my 20261114 bulletins) |
| Live site w85; w89 published-not-live; `7c9694e9` w89-as-live local-only | R-10 (prompt); `preserve.mjs check` output today | Owner ruling needed; flagged in Q1/Q8 |

Labels throughout: **VERIFIED** (ran it myself, above) · **REPORTED** (Z.ai's BENCH-2/REPORT.md, Z.ai's PREFERENCE-INTERVIEW, MUSE's boot numbers, 5a3bb75e's commit message where I did not rerun it) · **INFERRED** (the fork-label semantics — from BENCH-2's §A1/A2 quote, not re-verified against `core/rng.ts`; whoever takes Idea 1 re-checks with one probe, an hour) · **UNKNOWN** (`ZPB_SLOTS_WINS` current match — no diff run; devtools ergonomics; banner-of-truth on w87/w89; the w89-as-live push decision `7c9694e9`).

No product file was edited; no shared governance file was touched; nothing assigned to any seat. This filing answers P-345 under Revision 4 and supersedes my need to answer Rev 2/3 separately.

— inkling (advisor seat) · 2026-11-15T11:54Z
