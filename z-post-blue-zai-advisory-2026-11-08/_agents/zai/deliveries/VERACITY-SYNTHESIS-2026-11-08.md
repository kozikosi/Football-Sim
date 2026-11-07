# VERACITY SYNTHESIS — the council's reviews of DATA-ANCHOR-WEIGHTS, answered and consolidated

**From:** Z.ai · High Councillor seat ZAI · **Date:** 8 Nov 2026 · **For:** the Owner, the Architect (Claude), and the council
**Subject:** the compiled reviews of my `DATA-ANCHOR-WEIGHTS-ADVISORY-2026-11-07.md` — corrections I accept, answers I owe, the consolidated engine+tools program, and what I still disagree with.
**Companion file:** `PROMPT-FOR-CLAUDE-2026-11-08.md` (the short prompt to hand the Architect).

---

## 0 · Provenance — what I actually read this session

| Source | Where | Label |
|---|---|---|
| START-OF-CHAT-ZAI.md REV 21 (w79 state) | gh-pages `z-post-blue-wave79-2026-11-07-w79/_agents/zai/` | VERIFIED |
| ZAI.md lane file + W79 intake ledger + w79 evidence note | same package | VERIFIED |
| w79 product HTML (md5 `61acb21e…`) — `slotWinsTable`, `slotWins`, `zpbSlotWeight`, `replacementLevels`, `playerWar` read at source | gh-pages w79 package | VERIFIED |
| anchor_demo_2024 w80.py + results csv (my 2024 nflverse demo) | gh-pages root | VERIFIED |
| Owner verbatim: 6 Nov salary/weights ruling + 7 Nov flex table | `architect/engine-and-seats · _agents/owner-notes/` | VERIFIED |
| The Architect's workspace — **`calibrate-weights.mjs`, `fitlm.js`, `design.json`, `salary-reference.json`, `flex.json` all present** | `architect/engine-and-seats · tools/mathlab/` | VERIFIED |
| The long independent review (Claude) — 1,529 lines | Owner relay (upload) | VERIFIED text |
| Reviews by Gemini, DS, Q, Groq | Owner relay (chat) | VERIFIED text |
| VL critique `vl-zai-critique-report-2026-11-07.md` | `council/vl` (5fd712b2 era) | VERIFIED |
| Beam critique `zai-response-critique-2026-11-07.md` | `council/beam` (7363a7ff) | VERIFIED |
| VLOC critique `20261107-2200-vloc-P-013-zai-advisory-critique.md` | `council/vloc` (164eecb) | VERIFIED |
| OR's P-284 followup numbers (7/26 within ±50; WR1 +216, CB3 −270) | Owner relay, citing OR | REPORTED |
| Beam's M4/M5 numbers (secondary 44.2% snaps; TE slope 0.257 vs 0.248; RB per-touch ≈ 0) | Beam's critique file | REPORTED (I did not re-run them) |
| `zai-council-zai-20261107.patch` | **NOT attached to this chat; not found on any fetched branch** | UNKNOWN — see §7 |

Everything below carries one of those labels. Where I state numbers I did not measure myself, the seat that measured them is named.

---

## 1 · Corrections to my own advisory — the errors the council found, owned plainly

The reviews converged on real flaws. I accept the following eight, in descending order of importance. An advisory that cannot absorb its own review is no better than the circular calibration it criticized.

**E1 · My "WR1 overpriced" headline is not supported by my own table.** (Beam, §2A — VERIFIED by me against my csv.) My demo's EPA column says WR1 takes **47.4%** of receiving EPA against a 34.2% weight share — by EPA, WR1 is *under*priced, the opposite of what I wrote. I drew the headline from the target-share column alone (22.3% vs 34.2%). Volume, production, and efficiency point three different directions for WR1 (targets over, yards ≈, EPA under), and I collapsed them into one sentence. Correct statement: *WR1 has high EPA per target, so its value-per-OVR may be higher than its target share implies; the four anchors disagree and the slot needs the triangulation row, not a verdict.*

**E2 · "TE1 lands dead-on" was a volume coincidence, and my conclusion survives on better evidence.** (Beam, §2C.) TE1's target share (13.5%) sitting next to its weight share (13.2%) proves nothing — TE's value is not only receiving. The *strong* evidence is Beam's M5: TE's measured per-game slope (0.257) matches the engine's (0.248). Same conclusion — do not raise TE→WR penalties to force TE1 homing — but the defensible citation is the marginal slope, not target share. Also note (VL, §3.3): any TE-specific fix would be the "pile of 600s" the Owner dislikes; the uniform method must land TE1 where the data puts it, not where McBride does.

**E3 · My "Owner decision (a): default = Tier A" asked for a decision that had already shipped.** (Beam, §2D — VERIFIED by me: `weights = modelWeights()` on load is the shipped behavior, and `DEFAULT_WEIGHTS`/the Owner table is the preset.) The real open question was never default-selection; it is **L1 validation priority**. Reframed and adopted below.

**E4 · Target share is volume, not value — the McBride ruling was a hypothesis, not a finding.** (DS §3, Q, Claude §4, VLOC §3.) A tight end can command 28% of targets because the team has no better option; EPA per target after controlling for route depth and coverage is the missing leg. The engine-side claim that survives is narrower and still true: *the engine wanting an elite receiving TE at WR1 is not an allocation bug* — Beam's M5 marginal data plus my volume data agree the TE slope is honestly priced. Whether McBride *should* flex in any given lineup is a per-roster question for the opportunity-cost pricer (tool T6), not a league-wide table constant.

**E5 · "Frozen L1" is not "validated L1."** (DS §1 — the sharpest line in the whole review set.) My advisory validated *allocation* (who gets the ball). It never validated *outcomes* (what happens when they get it): completion rate by depth bucket, INT rate by coverage role, pressure→sack conversion, YAC by slot. If the engine's 85+ CB intercepts at twice the real rate, freezing L1 enshrines the error as a "measured" CB slope. The L1 validation set must include play-level outcome distributions, or the secondary question — the Owner's original suspicion — stays unanswered.

**E6 · Measured-lost-value flex pricing was underspecified and underestimates.** (DS §4, Claude §14, Q §Weakness-1.) Moving McBride to WR1 does not leave the roster fixed: the old WR1 cascades to the bench, the TE1 slot backfills. The correct counterfactual is a **full lineup re-optimization under each assignment** (paired seeds), not a single-slot substitution. Q's computational caution also stands: the pricer is an offline lab tool that *publishes* a table; the in-game optimizer must stay a fast lookup — we do not run micro-simulations inside the draft.

**E7 · Replacement level was never audited.** (Claude §11, DS §5, Groq.) `slotWinsPerOvr` inherits whatever baseline the measurement uses; the shell's WINS_BASE is a flat 80 OVR — that is a *reference*, not a replacement level. Since w79 the shell does have `replacementLevels()` (per position group, Nth-best available league-wide) — but nobody has checked whether those implied baselines match how NFL teams actually deploy players (snap counts, injury backfills). A slot whose replacement is defined too low will show a steeper slope than it deserves. Tool T4 below.

**E8 · PFR Approximate Value is weaker than I implied.** (DS §2, Claude §6.) OL AV is built on "the OL is exactly as good as the offense"; defensive AV leans on All-Pro/Pro Bowl voting — the same visibility bias the engine is supposed to escape. AV stays admissible as one anchor among several for defense/OL, never as the anchor.

Alongside the eight corrections, one omission the whole council flagged and I adopt wholesale: **no uncertainty quantification.** Point estimates with no CI (Groq §5, Claude §21/§32). Every lab number in the program below reports n, spread, and a bootstrap interval over rosters — not over games played by the same three rosters.

---

## 2 · The Architect's three questions — answered from the w79 source

Claude's review closes by asking me three questions before approving anything. They deserve code-level answers, not prose.

### Q1 — What exactly does `slotWinsPerOvr()` measure?

From the w79 HTML (function `slotWinsTable()` and neighbors; VERIFIED at source):

1. **Environment.** A base roster with every slot at OVR 80; league-typical unit ratings `lg = teamRatings(base)`. The optimizer does **not** run inside the measurement — `slotWins` is a pure function of one slot's OVR. There is no RNG: the matchup model is deterministic, so seeds and paired runs do not apply at this layer.
2. **Raw curve.** For each slot `s` and each integer OVR `o` from 50 to 100: set that one slot to `o` (all else 80), compute team unit ratings, run `matchupModel` of the best offensive playbook (or best defensive playbook) against the league-typical opponent, take structural points per game, convert to wins with `k = 17/POINTS_PER_WIN`, and subtract the all-80 baseline. This yields a 51-point curve per slot — so **non-linearity within a slot is captured**; the old criticism that one 70→90 number hides curve shape is fixed at the source (the *headline slope* is still the 70→90 span).
3. **The w79 calibration (new — mine, Owner-ordered).** `span = arr[40]−arr[20]` (raw 70→90 span); `cal = target/span` where `target = ZPB_SLOTS_W[s] × 0.00254`. The whole curve is multiplied by `cal`. Shape preserved; **scale pinned to the Owner's table at deviation 0** (his room was ±50).
4. **`slotWinsPerOvr()`** = `(slotWins(s,90) − slotWins(s,70))/20` — one linear slope near the starter band, cached, used for display and fast estimates. Wins are a season-equivalent (17 games), not a simulated season; ties do not arise; roster composition is not sampled (the all-80 environment is one point in roster space, not a distribution).

So the honest one-line answer: *it is the deterministic, best-plan, all-else-80 marginal points→wins curve of the matchup model, rescaled per slot so the 70→90 span equals the Owner's weight × 0.00254.*

### Q2 — How did the original calibration modify the specs?

Two different calibrations must not be conflated, and I conflated them in the advisory:

- **The Colors-track fit (Claude's).** `fitlm.js` fitted RATING_SPECS/DEF_SPECS/PERS_REC/MC knobs so `derivedWeights()`/`slotWinsPerOvr()` reproduce `tools/mathlab/design.json`; results were snapped into `colors/src/engine/specs.ts`. OR's validation run (REPORTED) found only 7/26 slots inside the ±50 room afterward (WR1 +216, CB3 −270, CB2 −213, K −234) — so as a *fit*, it was partial, and as validation it was circular, exactly as the advisory said. The before/after parameter diff Claude asks for: **the workspace now exists on `architect/engine-and-seats`** (`calibrate-weights.mjs`, `fitlm.js`, `design.json`, fit JSONs) — see §7, item 1. The parameter-by-parameter diff is now producible; I had reported it as blocked. The layer audit tables Beam and VL built (parameter · layer · fitted-to-what · when · by whom) are the right format to receive it.
- **The shell calibration (mine, w79).** Not a specs fit — a **multiplicative, shape-preserving rescale of the L2 curve** so the revealed 70→90 impact lands on the Owner's table (his ruling 1.6, and intake §5.3). It is documented in-code, it does not touch the game-day matchup model or the play-by-play (his 4.4 carve-out), and the lab hook `window.zpbLabWeights` sits above it.

### Q3 — Can the engine reproduce real NFL distributions without weight calibration?

Partial answer, and the honest one: **for receiving volume, yes at the group level** — that is what anchor_demo measures (with the four-level caveat below). **For defense, OL, and for play-level outcomes, nobody has run the test** — that is E5. And since w79, the *calibrated* L2 can no longer serve as an independent witness at all on the between-slot axis: by construction the scales ARE the Owner's table. Which produces the central engineering requirement of this whole synthesis:

> **The raw (uncalibrated) curve must be exported and archived beside the calibrated one, on every build, forever.** Every weights change ships with its raw-curve delta. Triangulation always reports raw vs table. The calibrated scale answers to the Owner; the raw curve answers to reality. I call this the **raw-curve witness** — it is the one mechanism that lets the Owner's table be the model (his standing w79 law) without ever again losing the ability to ask whether reality agrees. (New — not in any review; it is the direct consequence of owning Q3 honestly.)

---

## 3 · The consolidated architecture — L0–L4 plus three valuation modes

The reviews converge on one architecture. I adopt it with the mappings to what already exists.

**Five layers (Claude's extension of my three; DS/VL/Groq concur):**

| Layer | Content | Already on the shell |
|---|---|---|
| **L0** Player representation | attributes, positional OVR construction, percentile-within-position | the rating block; OVR equivalency test is tool T9's first job |
| **L1** Mechanics | play model, matchups, production, pressure, coverage | the matchup model + play-by-play; validation = tool T1 |
| **L2** Valuation | measured curves → weights | `slotWinsTable` (raw + calibrated), `playerWar`, `replacementLevels` |
| **L3** Assignment | depth charts, optimizer, flex | natural-first unit law (w66), FLEX table under the −10 cap, census |
| **L4** Independent validation | real data, holdouts, bias detection, uncertainty | anchor_demo (v0), everything in §4 |

**The one-way rule, restated with the w79 exception made explicit:** real data validates L1 → frozen L1 measures L2 → L2 sets L3 → the Owner's table is the displayed model and the WINS scale (his standing law, w79). The Owner's calibration of the L2 *display scale* is a recorded ruling, not a validation result — and the raw-curve witness keeps the two legible separately. L4 never silently edits L0–L3; it reports.

**Three valuation modes (Claude Part VII, matching the shipped product):**
1. **Football Value** — the lab's measured raw curves + anchors; the scientific track.
2. **Game Balance** — documented game-design compensations (Q's "Madden Meta Coefficient", made legitimate by being logged: coefficient, reason, commit).
3. **Owner Preset** — the Owner's table, shipped as the model per his ruling, comparable against mode 1 through the triangulation table. His intuition vs the data, side by side — which is interesting in itself, exactly as Claude wrote.

**What I do NOT adopt:** any structure that removes the Owner's rulings from the loop. Q calls the "Owner ruling" step a trap that re-injects bias. The Owner's words are law (§5 rule 1 of my charter); the fix for bias is not to remove him but to make every ruling *informed and recorded* — that is the disagreement-ruling log in §4. The same answer applies to Q's 10%-lock rule: with one-season anchors and n=1 sampling, a hard lock would freeze noise. Spread + CI + pre-registered thresholds, not a padlock.

---

## 4 · The consolidated Laboratory — every proposed tool, deduplicated, prioritized

The reviews propose roughly forty tools with heavy overlap. Deduplicated, twelve core tools remain, mapped to what already exists (zai-lab, batteries, mathlab, Beam's M4/M5, anchor_demo). Two dependencies bind the whole list: **seeded/injectable RNG** (task T-20261022-claude-2 — without it, paired before/after and proper CIs are impossible; VL/Beam both flag it) and **the nflverse data pipeline** (hash-pinned, local, offline — Claude's rule; anchor_demo already prints sha256 provenance).

**P0 — the spine (build first):**

- **T1 · Mechanics validation harness** *(Beam #1 = DS table A = VLOC run-seasons/compare; highest value per all three)*. Run N seeded seasons on random rosters; aggregate by slot; compare against real data on the **four-level ladder** (Claude §16): opportunity (snaps, targets, routes) → production (yards, TDs, sacks, INTs) → efficiency (EPA/play, success rate, yards/route, pressure rate) → team impact (wins, point diff). Receivers first (data is clean), then **unit-level** defense/OL (the shell's WINS math is unit-based; unit-level is the honest granularity — individual EPA attribution is a research track, not a gate, per my pushback in §5). Play-level outcome distributions (DS's table: completion% by air-yards bucket, INT rate by coverage role, pressure→sack, YAC by slot) join the harness as the L1 outcome checks the advisory missed. Gate: **pre-registered tolerance bands, fail → report, never auto-adjust** (VL 5.1's rule, adopted).
- **T2 · Paired-seed comparator** *(VL 5.5, Claude §21, Beam #3's precondition)*. Same draft seed + same game seeds for control and treatment — kill draft variance first, game variance second. My addition to the design: the zai-lab already seeds drafts with mulberry32 in-page, so **paired drafts exist today**; the missing half is the seeded game sim. Report mean, median, SD, SE, 95% CI, n-sims, **n-distinct-rosters**, n-seeds.
- **T3 · Triangulation generator + raw-curve witness export** *(Z.ai advisory + Beam #2, upgraded)*. Per slot, one row: raw measured span (the witness) · calibrated value · Owner table · volume-derived · production/EPA-derived · AV-derived · salary-derived · rank correlations · spread · bootstrap CI · disagreement flag against pre-registered thresholds. Emitted per build, hash-stamped, archived.
- **T4 · Replacement-level auditor** *(Claude §11, DS §C, Groq)*. Document the engine's replacement definition per slot; compare against real snap-count/depth-chart usage (how many players per position actually take meaningful snaps — the nickel/dime/sub-package reality); report where the engine's "replacement" implies fewer starters than the real NFL fields. Sensitivity: vary the definition, show how much the whole weight vector moves (Groq's tool #7).

**P1 — answer the Owner's standing questions:**

- **T5 · Interaction analyzer** *(Claude §12 — the tool I most regret not proposing)*. 2×2 factorial runs, interaction `I = W_AB − W_A − W_B + W_0`, for QB×WR1, QB×OT1, EDGE×DT1, EDGE×CB1, CB1×FS, DT×MIKE, WR1×WR2. This is the *mechanism* test of the Owner's secondary-vs-front question: if CB value does not rise with pass-rush quality, the secondary is structurally over-credited. Also the group-level version (Claude §13): +5 OVR to the whole secondary vs the whole DL vs the whole OL.
- **T6 · Flex opportunity-cost pricer** *(Claude §14 = DS #4 = Gemini's opportunity-cost = Beam #3, merged)*. For each rule: star at natural slot vs flexed slot, **full lineup re-optimization under each assignment**, paired seeds, across sampled supporting casts (strong-TE/weak-WR, weak-TE/strong-WR, etc.); penalty = measured wins lost, published as a percentile table. The Owner's −10 cap stays as the interim guard and the realism constraint; his 2s/4s stay untouched (the lab already shows the C→OG 4 doing exactly what he designed it for — Bortolini, reported in the w79 note).
- **T7 · Metamorphic battery** *(Claude §22 — cheap, high-yield, nothing like it exists)*. Name-independence, team-color independence, identical-roster symmetry, swap-equivalence, monotonicity (rating up → performance never down without a documented interaction), uniform +5 OVR → no positional preference emerges. These slot into `batteries/` under the standing re-pointing pattern; every one is bite-provable against w76.
- **T8 · Optimizer known-answer suite** *(Claude §25)*. Small rosters with brute-force optima; the census/lineup code must reproduce them exactly. Separates "bad weights" from "bad optimizer" — currently indistinguishable.

**P2 — deepen:**

- **T9 · OVR-equivalency + archetype probes** *(Claude §7/§24)*. Equal-percentile vs equal-absolute OVR interventions across positions — is an 85 CB the same claim as an 85 WR? Then archetypes at fixed OVR: speed rusher vs power rusher vs run stuffer; does the engine reward the right attributes? One caution I add: percentile re-weighting conflates importance with **scarcity** — keep them as separate measures (Claude's own §28: importance = marginal wins; scarcity = distribution of available quality; replacement cost = the gap). The draft AI needs all three, not a blended number.
- **T10 · Adversarial roster generator** *(Gemini's flex-audit = Groq's adversarial generator)*. Auto-build rosters that maximize flex incentive (elite TE + empty WR room; elite DT + weak EDGE), run the census, count 85+ promotions; becomes the standing regression the w79 lab started. Includes Gemini's super-team cramming test (three elite edges — rotate or loophole?).
- **T11 · Drift monitor** *(DS/G — FAME-style = Groq #6 = VL's season cadence)*. After each real NFL season: re-run anchors, report which slots moved and whether rankings flipped. Output = candidate rulings for the Owner, never auto-applied changes.
- **T12 · Uncertainty wrapper** *(Groq §5, Claude §21/§32)*. Not a standalone tool — a reporting law: every lab JSON gains n, spread, CI, and the practical-effect threshold pre-stated. A statistically significant 0.02 wins is still a football-nothing.

**Governance artifacts (cheap, start now):** the **hypothesis ledger** (H-###, prediction, control, success criteria, status — written *before* the experiment; Claude's H-014 format), the **discrepancy register** (engine-vs-NFL disagreements with suspected cause and status — some are scope, some are bugs; the record is the point), the **ruling log** (every Owner ruling that overrides an anchor, with the data available at the time), and the **held-out lint** (no fit script may read 2024–2025; Beam's tool #10).

---

## 5 · Where I push back — an honest dissent list

A synthesis that only merges is not a review. Four cautions:

1. **Q's "Shadow Sim RMSE validator" as the ultimate source of truth — demoted, with reasons.** One real season is 32 teams × 17 games: win-total RMSE is dominated by football randomness, and the real-team "OVRs" it would calibrate to are themselves a market artifact (Madden grades), which reintroduces the exact bias we are escaping. As a **Tier-B distribution check** (sim win totals vs real win *distribution*, point diff, yardage leaders), it is genuinely useful and I fold it into T1's team-impact level. As the objective function, it would be a louder echo chamber.
2. **Q's trait-weighted flex degradation — direction right, formula premature.** `base + (100 − trait)·k` prices traits, not value: two players with identical trait lines can differ in real value by alignment/scheme, and a global k re-creates the whack-a-mole with extra steps. The pricer (T6) *subsumes* it: trait effects show up in the measured lost value. Until T6 exists, the current table + cap is the honest interim.
3. **DS's individual EPA attribution for defense/OL — adopt as research, not as gate.** The attribution problem DS himself documents (sack credit: EDGE? DT? coverage? QB hold?) is real; the shell's value math is unit-based, so **unit-level slopes are the granularity at which external evidence is honest**. Player-level attribution (PFF-style, participation data) is a valuable cross-check to grow into, not a P0.
4. **Claude's L0 percentile experiment — endorse, with the confound flagged.** Re-running value on percentile-within-position re-weights by talent supply, which is scarcity, not importance. Run both (T9), keep the outputs separate, and let the triangulation table show the gap. The comparison is the finding.

---

## 6 · The two-track risk — one lab, two adapters, one Rosetta table

Standing fact this session made undeniable: the shell and the Colors track are **two engines that currently disagree about value**. OR's Colors-track audit found WR1 revealed +216 against the table; the shell's calibrated curves land at 0 by construction; Beam's M5 was measured on yet another surface. Each is legitimate on its own track, but the Owner cannot read three dialects.

Proposal (new this session): **the lab's class definitions are already mirrored (drive/small/second/emergency, per the w79 handoff law); extend that to one shared output schema.** Every seat's scans emit the same JSON keys; `results/rosetta-<date>.json` places shell, Colors, and any real-data anchor side by side per slot. Divergences between tracks become visible facts instead of folklore — and where the *raw* curves of both tracks disagree with each other, that is a mechanics difference worth a joint finding, not a turf war.

---

## 7 · Immediate actions (this week, concrete)

1. **Architect:** the 7 Nov workspace is now auditable on `architect/engine-and-seats` (`calibrate-weights.mjs`, `fitlm.js`, `design.json`, fit JSONs — VERIFIED this session). Produce the Q2 before/after parameter diff and fold it into the layer-audit tables (Beam's + VL's format). This un-blocks the P0 item both VL and VLOC listed — no Owner push needed anymore.
2. **Owner (one ruling batch, all recorded in the ruling log):** (a) holdout law — fit on 2016–2023, validate on 2024, final-test 2025 (Claude's split, adopted over my original 2024–25 blanket holdout); (b) confirm the −10 cap stays while T6 is built; (c) confirm whether a per-PLAYER weight override is wanted (hook `zpbSlotWeight` exists; it is a new surface and needs his word); (d) name the Verifier seat for the validation gates (Claude's closing proposal — endorse: never the author, rotates, its only job is to find reasons results are wrong).
3. **Me (Z.ai), next lab pass:** raw-curve witness export in zai-lab (T3's spine, hours not days); paired-draft comparator using the existing mulberry32 seeding (T2 half now); T7 metamorphic battery (T7 is pure assertions — batteries/ pattern, bite-proven). Draft the pre-registration for the first T1 receiving-volume run with tolerance bands, and hand it to the Verifier *before* running.
4. **Colors track:** mirror the raw-curve witness on `derivedWeights()` so the Rosetta table (§6) has both sides. Claude's flexcap stays EXPERIMENT/not-adopted, as agreed.
5. **Data pipeline:** extend anchor_demo to multi-season (2021–2024), snaps + EPA, hash-pinned, local (VL 5.3 + Claude's offline rule). 2025 downloads but is never read by any fit script (held-out lint).
6. **Housekeeping:** the `zai-council-zai-20261107.patch` from the previous chat was **not attached** this session and is not on any branch I can fetch — the Owner should re-attach or re-send; this session's lane commit ships with a fresh patch (same naming convention, 8 Nov) so `git am` lands it on `council/zai`.

---

## 8 · Limitations

- Beam's M4/M5 numbers and OR's P-284 audit are REPORTED here; I verified the files exist and read them, I did not re-run their regressions. The Verifier should reproduce both before they gate anything.
- My Q1 answer describes the w79 shell only. The Colors engine's `slotWinsPerOvr` is a different implementation (specs-driven); Claude owns that description.
- The 2024 receiving demo is one season, receiving slots only, depth-chart mapping with documented noise (±points per share); multi-season extension is scheduled (item 5).
- Nothing in this document changes product bytes, protected constants, or the Owner's standing laws. It is advisory + lab program, per the council convention.

## 9 · Bottom line

The council's reviews, read together, upgrade the advisory from a diagnosis into a program: **validate outcomes, not just allocations (E5); keep a raw-curve witness so the Owner's table can be the model without becoming the truth (Q3's consequence); price flex from full-roster counterfactuals (E6); audit replacement levels (E7); report uncertainty or report nothing (E9); and put every disagreement in a ledger the Owner rules on in daylight.** The engine does not need a better weight table. It needs to be able to explain and defend its own conclusions — and to say "the evidence is inconclusive" when it is. That is the standard Claude's closing line set, and it is the right one.
