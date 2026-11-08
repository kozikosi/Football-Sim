# Z.ai lab-tools prompt v7 — 2026-11-08 (supersedes v6)

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor
**Tone:** Proposing, as always — these are suggestions and open questions, not commands. And as the Owner keeps saying: please keep innovating and brainstorming, and bring any new ideas you have about the project or its architecture.

---

## What changed since v6 (read this first — do not redo work)

**The Owner's Nov 6 salary-weights table is DEAD.** On Nov 8 the Owner ruled: "my permanent salary weights are dead. we are moving on to z.ai's model first strategy." DEFAULT_WEIGHTS is dead too ("we are done with default weights or my permanent weights"). **32 slots.** FB stays (even-number depth chart; the Owner doesn't want to cut any position). The five flags are dropped — w85 is good as it is. The w74 architecture review (v6 item 6) is dropped — the council is reviewing w85 now and w86 is on its way (your product wave work, separate from this prompt).

**So the weights question is now YOUR model-first strategy.** The council has read your Nov 7–8 work (the VERACITY-SYNTHESIS, the lab window, the brainstorm, the rosetta triangulation) and the direction is: weights come OUT of the engine's measured impact, not INTO it from a table. The raw curve is the weight; triangulation against real-world anchors is the check; the witness gate is the proof it stays that way. The Owner's table becomes one display mode ("Owner Preset"), one click away — not the fit target.

**What already shipped (do not rebuild):**
- Your lab window (Nov 7–8, branch `zai-lab-20261108`): T1 mechanics validation, T3 raw-curve witness + triangulation rosetta, T4 replacement auditor, T6 flex pricer, T12 reporting law. Governance: hypothesis ledger H-001…H-007, discrepancy register D-001…D-007, ruling log R-001…R-004.
- Your brainstorm window: 4 tools (rng-audit, flex-ext, uncertainty-v2, heldout-lint), 52/60 answers, governance H-008/D-008/D-009/R-005.
- The witness gate itself is BUILT — Claude built `tools/mathlab/witness.mjs` on Nov 8 and wired it into run-all. Verified: Pre-Colors MEASURED, OR's build MEASURED, w79 ECHO.
- Claude's CICCP-3 answers are in (`inbox/20261108-1200-architect-to-zai-ciccp3-answers.md`). He took T1, T3, T4, T6, T12 from the lab as built; T2 gets built on Colors; T5/T8/T9/T10/T11 not now (one-paragraph contract each); T7 undecided.
- w85 is live as index.html and under council review. w86 is on its way (your wave work — this prompt is the lab/tools track, not the wave track).

**What the Owner has already accepted (so you can build on it):** F5 — Claude's one-sentence doc, not the per-save freeze. The three envelope answers — saveId/createdAt now, no datasetId (content hash), SHA-256. RULES-CHECK + PROJECT-KNOWLEDGE.md — yes, but the seat-check documents must run lean / be very small. Cutover trigger — a FULLY FUNCTIONING Colors v1, not just the first slice.

**Open Owner questions that touch your work:** R-005 parts 2 and 3 (RNG Stage 1; the flex theta formula — see §5). Q7, the default valuation mode — the Owner's model-first direction points at Football Value as the default, and I'm confirming that with him; build so the default is a one-line switch, not a rewrite. The flex direction itself — the Nov 7 flex-cap-10 experiment assumed the now-dead salary weights, so it needs re-framing under model-first (see §5).

---

## §1. The Lab harness runner — still first

Same ask as v6, and still the top priority: make the Outcome Lab runnable without deno. A Node runner is the obvious candidate; your call on the shape. It unblocks M2–M5 (§2), the council's P-276 verification, and P-282-style verifications by seats that don't have deno. Your exact M14 reproduction commands still apply (base `425f72a`; seed scheme `makeRng(1000+i)`; the three commands from w75). If the lab window already produced a runner, say so and point at it instead of rebuilding.

## §2. M2–M5 — still open, still pre-registered

These were blocked on the harness. They are measurement work, not weights work, so the death of the salary table doesn't change them — except the targets they report against are the NEW ones (90/35/25 + P(20-0) ≈ 1–2%).

- **M2 — P(20-0) counter.** Add to the sweep's per-run record `perfect: (rec.w===17 && rec.t===0 && wonWildcard && wonDivisional && wonChamp && wonSB)`; report `P(20-0) = perfect/N` per policy with a Wilson 95% interval at N=1000. Target band ≈1–2%.
- **M3 — Baseline re-report vs the NEW targets.** 90% playoffs · ~35% SB · 25% title · P(20-0) ≈ 1–2%. Old 80/25/10 is dead.
- **M4 — Game-noise sweep.** `noiseMax ∈ {0.75, 1.5}` (shipped 1.0 is the control), skilled only, N=500/rung, seed scheme `makeRng(1000+i)`. Decision rule: a rung ships only if the skilled-success targets hold at both rungs.
- **M5 — Derive the parity TARGET.** Grid of candidate win-SDs (2.2 … 4.6 step 0.2); TARGET = smallest SD whose skilled numbers reach 90/35/25 with P(20-0) ≤ 2%. DS band 3.07 ± 0.35 is the REFERENCE, not the target (target expected HIGHER). Lever candidates (do not stack two in one experiment): (a) game-strength floor of the weakest CPU teams, (b) CPU lineup-optimizer urgency curve, (c) game-noise asymmetry by team strength. MidFloor is FLAT — do not re-propose it.

## §3. Model-first: the work that makes the strategy real

This is the new heart of the prompt. Your synthesis already defines the program; here's what I'd suggest building next, in the order I'd suggest it:

1. **Raw-curve witness export in zai-lab (T3's spine).** The witness gate exists in the Architect's tree; mirror the export on your side so the Rosetta table has both sides (raw + calibrated) on every run. Hours, not days, by your own estimate.
2. **The three valuation modes, wired as modes — not as three tables.** Football Value (measured raw curves + anchors) as the default; Game Balance as an advanced toggle with its coefficient log (value + reason + commit) one click away; Owner Preset as one click. One segmented control on the Weights page ("Measured impact · Game balance · Owner preset"), the current mode echoed in the page subtitle everywhere numbers appear, the switch disabled mid-draft. Never blend modes silently; the mode label travels with every displayed number. Build it so the default is a one-line switch — the Owner is confirming Football Value as the default, and if he ever wants Owner Preset as the default instead, it should be a flip, not a rewrite.
3. **The holdout law, in code.** Fit on 2016–2023, validate on 2024, final-test on 2025 (your synthesis §7; DS proposes 2015–2021 fit, 2022–2024 test — your call on the exact split, but pick one and write it down). The held-out lint already enforces the fit/anchor distinction; extend the anchor demo to multi-season (2021–2024), snaps + EPA, hash-pinned, local. 2025 downloads but is never read by any fit script.
4. **The Q2 parameter diff.** The Architect's next work package after the Owner's go — your input would help: the before/after parameter diff (original → calibrated → position → measured effect) in the Beam/VL layer-audit format, folded into the layer-audit tables.
5. **The rosetta new-preset proposal as a candidate, not a decree.** Your triangulation proposal (26 slots, QB=1000, 50-increments) is the concrete measured table if the Owner wants one now — file it as a proposal with its disagreement flags and CIs attached, not as a replacement table. The program matters more than the table: the engine has to explain and defend its own conclusions, and say "the evidence is inconclusive" when it is.
6. **Kicker model audit (not a kicker weight).** Model-first lands K around 284–300 from the raw span, and your own data says K sits above both tables — which points at the mechanics, not the table. If you have time, audit the FG model (frequency, accuracy curves, distance distributions, leverage) rather than fitting a K weight by fiat. This is the GPT point, and it's the right one under model-first.

## §4. M1 relabels

Same as v6: `top30` → `skilled` is a mechanical sweep; the `b-top30-*.json` artifacts are history — don't rewrite them. **Greedy IS best-value; `favorites` is the best-OVR policy;** any CALIBRATION.md/FINDINGS line calling greedy "naive best-OVR" is wrong and should be struck. Targets apply to the AVERAGE of the skilled class.

## §5. Flex, re-framed under model-first

The Nov 7 flex-cap-10 experiment assumed the now-dead salary weights, so its fixed set (TE1/RB1/CB1/DT1/OG1/SS/FS/MIKE/WILL 600, C 450) is not a live proposal — but its *measurements* are still good evidence. Two things I'd suggest:

1. **Price the theta formula** (R-005 part 3): P(a→b, ovr) = clamp(round2(θ·ovrEq(a→b, ovr)), 0, 30). Print the sensitivity grid for θ ∈ {0.5, 0.75, 1.0} so the Owner can pick θ from evidence. Adoption still waits for the Owner's flex pick — price it, don't adopt it.
2. **Keep the T6 flex-pricer measurements coming.** Your finding that the −10 cap under-prices star moves (TE→WR1 median 0.63 wins lost; QB→FS 0.975 wins / 22.8 OVR-eq @90) is the kind of evidence the flex decision needs. The flex question is now: what does the *model* say a flex costs — not what does a table say.

Do NOT touch flex.json / FLEX / slots.ts. The Owner's Nov 7 flex HOLD still stands until he picks a direction.

## §6. Cutover batteries maintenance + the two written laws

Same as v6: write the two proposed laws into the repo — "every new surface ships with an assertion" (with the V15 story), and the suite re-pointing pattern into §5. Confirm the batteries still apply cleanly against the current engine now that Claude's guard passes have landed (tsc 176 → 91) and the witness gate is wired in. Ship the acceptance batteries the same week Claude ports to 76 Pancakes; the port hasn't happened — Claude's order is guard passes → Draft Board slice → seat-check tool, and cutover is a fully functioning Colors v1.

## §7. N1 exhibit (optional)

Same as v6: optional help. Telemetry headline wording: "100% median unique-catch on first reviews (N=13 first reviews; the count is small and the metric is the MEDIAN catch across reviews, not a per-review rate)". N1 stays drafts until council review.

## §8. What NOT to build

- No new product wave — the shell track is w86, already on its way; this prompt is the lab/tools track. No w87 unless the Owner provides a UI fixes list.
- No five-flags work — dropped by the Owner (w85 is good as it is).
- No Colors slices — Claude's.
- No ratings generation — the Owner's.
- No salary-weights work — dead by Owner ruling. Do not fit anything to the Nov 6 salary table or to DEFAULT_WEIGHTS. Salary is a sanity band in triangulation, never a fit target.
- No w74 architecture review — dropped (the council is reviewing w85 now).

## §9. Open invitation

Same as v6, and the Owner repeats it: you are his council too. Offer suggestions and always bring new ideas related to the Football Sim project or its architecture — including anything about model-first, the Lab, or the council's own workings that you think should change. If something in this prompt is wrong, or a better order exists, say so.

## Delivery

Files + zips to the Owner (or Beam via tools/import-zip.sh), per-item folders with READMEs, as before. Nothing here touches the product file; the Lab and tools live in your lane and the Lab tree.
