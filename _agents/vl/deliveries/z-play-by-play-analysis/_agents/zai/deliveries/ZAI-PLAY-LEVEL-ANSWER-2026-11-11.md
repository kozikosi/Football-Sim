# Z.ai — Should the engine go play-level? An answer.

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE (High Councillor), for the Owner (KG)
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-play-level-question-2026-11-10.md`
**Sources read:** the prompt; the Owner's Q&A (`questionnaire-flex-derivation-QA-2026-11-10.md`); MUSE's synthesis (`derivation-ideas-agreeing-with-owner-2026-11-10.md`); the engine itself on `architect/engine-and-seats` — `drives.ts`, `boxscore.ts`, `matchup.ts`, `lineup.ts`, `flex.ts`, `slots.ts`; Claude's `flexunify.mjs` and merged design; MUSE's re-implementations of ZAI-D1; `dl5-snaps.py` (nflverse snap-count evidence); `claude-derivation-qa-design-2026-11-10.md`.
**Constraints honoured:** design only. Nothing in `flex.json`, `flex.ts`, or the engine was touched; no test suite was run. The only code executed is one 10-line arithmetic check of the worked numbers in Appendix A.

---

## 0. The verdict, up front

**The Owner is right that the engine should see play level — but not by becoming a play-level simulator.** The right shape is what I will call the **Plays Ledger**: the drive engine stays authoritative physics, and inside each drive the engine *stages* the plays that add up to the drive's outcome — down, distance, field position, personnel on the field, who touched it, who blocked whom. Plays as an audit trail, not a second physics. The distinction matters because the two options have opposite failure modes:

- A **play-level simulation** (bottom-up: simulate 11 players per play, derive drives from plays) dissolves some derivation headaches and creates a bigger one — the engine's output becomes a physics we calibrate, and the Owner's dials (his questionnaire, his rulings, his "done is a feeling that can be adjusted") get buried under curve-fitting. It also re-builds, from zero, the thing the drive engine already does well: produce realistic totals.
- A **Plays Ledger** (top-down: drives decide, plays explain) dissolves the *measurement* headaches without touching the physics, and it is 80% of the value at 20% of the cost. Crucially, the engine has already shipped one ledger of exactly this kind: **the box score**. It splits each drive into runs, completions, tackles and credits, hands them to named players, and a purity test proves the parts sum to the totals exactly. The Plays Ledger is the box score's little sibling: same contract ("generated, additive, pure"), three new columns — down-and-distance, personnel, and snap counts.

Answered in one line each, the five questions:

1. **Would play level eliminate the headaches?** Two of the four dissolve (the fullback/socialism problem, and pricing roles that have no slot); C>OT survives but is finally *split* into its honest parts (ability vs value); the translation problem is not eliminated but upgraded from fitting constants to authoring mechanisms that produce measurable consequences. (§2)
2. **Are we starting from zero?** No — roughly 70% of the engine's current machinery transfers intact or as the check on the new layer. (§3)
3. **Is there a middle path?** Yes — the Plays Ledger — and it does not merely move the translation; it moves it onto terrain the Owner already speaks: personnel packages and assignments, not prices. (§4)
4. **The path:** five steps, each shippable alone, starting with a snap ledger that needs no play sequencer at all, and validated by four measurable criteria (snap counts vs nflverse, the center diagnostic, the 99 as guide, conservation). (§5)
5. **Can the engine generate the math itself?** Yes, via two loops that need each other: the Ledger *measures* (exposure, contribution, gravity) and the lab *experiments* (perturb a roster, re-simulate, count wins). A flex price then falls out as `max(measured ability, exposure × measured guard)` — no gates, no floor, no named exceptions, and it fixes exactly the rows that break today. (§6, Appendix A)

The Owner's exact question — *is the confusion a bigger headache than letting the engine see who affects plays?* — gets a split answer, and the split is the whole memo: **the headaches that come from not measuring (FB, socialism, new roles, gravity) are bigger than the machinery that would end them; the headaches that come from philosophy (what a center's absence is worth) are real and no engine removes them — but at play level they become visible, debatable rows instead of invisible constants.**

---

## 1. What the engine is today (one paragraph, so the argument is checkable)

The matchup model turns unit ratings into expected totals (rush yards, pass yards, giveaways, sacks, points). The drive generator realises those totals as ~11.5 drives per team, each with plays, yards, sacks and an ending; the score is *read off* the drive list, so story and numbers cannot disagree. The box score then allocates each drive's facts to named players (SPD/STR decide credit), and the lineup optimizer maximises Σ slot-weight × effective-OVR through a Hungarian solver, with `effectiveOvr = ovr − flexPenalty`, the penalties coming from the 99-rule FLEX table (tiers 0/2/6/12, emergency −8, QB never emergency). Every derivation design on the table (ZAI-D1, ZAI-D2, flexunify, the merge) prices a flex move from **authored** inputs: duty NEED/HAVE tables written by hand, slot values measured from the sim or fitted from the Owner's salary table, and the Owner's English philosophy converted into constants by successive rounds of council fitting. The engine never sees a play, so it cannot see participation, adaptation, or attention — the three things the Owner's philosophy is actually about.

## 2. Q1 — Which headaches dissolve, which survive (tested on ZAI-D1/D2)

The prompt asks for my own designs as the test case. ZAI-D1 has four load-bearing parts: the authored NEED table (what the destination job demands), the authored HAVE table (what each body supplies), the shape `tier(M + 0.4·S)` over loaded duty gaps, and the cut points 1/4/9. ZAI-D2 added the gated value ladder (99/99 exact; gates since removed by the Owner). Here is each persistent headache, traced to its root, then tested against a play-level engine:

### 2.1 The fullback / socialism — DISSOLVES, and it is the strongest argument for play level

**Root cause today:** the guard prices FB>RB as `20 × (1 − v_FB/v_RB1) ≈ 18` (FB slot weight 25, RB1 250). The Owner prices it 2. Both are "right": 18 is the arbitrage if the fullback were a full-time player, 2 is the reality that a fullback is barely on the field and his body covers rush-down work anyway. The Owner named the principle himself — **socialism**: an unimportant role with one good player flexes cheaply in both directions. The engine cannot apply it because it does not know what "unimportant" means numerically. It has never seen the fullback's snap count. The Owner had to *tell* us the fullback plays few snaps, in English, and we converted that English into nothing, because a drive has no personnel.

**Under a play-level view:** the personnel model assigns 11 men per play; the FB spot is occupied on the plays where FB personnel or lead-block duties exist — some share of ~65 offensive snaps. Real football: roughly 15–25% of offensive snaps for a team that carries a starting fullback, *measurable, not guessable*, from the same nflverse snap-count source `dl5-snaps.py` already uses. The moment the engine generates its own number, socialism stops being philosophy and becomes arithmetic: the *harm a flex move can do is bounded by the share of the game in which the flexed player is actually making a play*. A guard term scaled by the source slot's measured exposure collapses 18 into the Owner's 2 without a gate, an exception, or a hand-set constant. Note the Owner's binding ruling — "snap share cannot be intuited by a formula and is not consistent across sports" — is *not* violated: nothing is being intuited. The engine does not guess the share; it *stages* the plays and counts. And "not consistent across sports" is satisfied because what ports is the shape (price scales with measured participation), never the number (basketball generates its own minutes; a hockey shift its own ice time).

**ZAI-D1 test:** my HAVE table prices FB>RB at ~1–2 on ability (FB CARRY 9 vs RB demand 10 — nearly seamless). The failure was never the ability layer; it was the guard's refusal to know about participation. Play level fixes exactly the part my design left authored. That is the strongest endorsement I can give it: **it measures the thing my formula needed and could not get.**

### 2.2 C>OT (6 vs 12) — SURVIVES, but is split into its two honest halves, which is progress

**Root cause today:** my ability layer prices C>OT at ~6 (a center's body in space is a 6-grade tackle; PBLK 9→6 after the Owner's change widened, not closed, the gap the way he wanted). The Owner prices 12. The Owner's Q11 answer settles what the 12 *is*: the value ladder — a center is a cheap spot (150) and a tackle an expensive one (500/300), and the league will not let you draft a center in round 4 and play him at left tackle for free. That is a statement about **the market**, not about plays. No play-level engine can measure the 12, because the 12 is not a fact about what centers do on Sundays; it is a fact about what tackle snaps are worth compared to center snaps — which the engine *already* has a machine for: the lineup optimizer and the slot-value measurement.

**What changes:** today the disagreement looks like a formula bug (the formula's single most public miss). At play level it becomes two clean numbers: ability_C→OT ≈ 6, *measured from what the two jobs actually demand per play*; guard_C→OT ≈ 10–14 (weights) or its measured-value equivalent — flexunify already showed a measured guard "kills the center exploit outright." `max(ability, guard)` lands at 12. No gate (the Owner removed them; none needed), no exit premium, no pair-tracking. **The headache survives as a philosophical row — is the ladder's 14 the right market price? — but stops being a formula failure.** That is precisely the kind of row the Owner said he wants to argue about ("done" is a feeling that can be adjusted): a visible number with two named parts, not a fused constant.

### 2.3 Valuing roles that have no slot (big nickel SS2, DL5 blitzer) — DISSOLVES structurally

**Root cause today:** a role without a slot has no weight, no measured value, no place in the ladder, and no rows in the table. My ZAI-D1 answer (price DL5 as the cheaper of role→DT and role→EDGE) was a workaround the Owner rightly pushed on: he reframed DL5 as a blitzer and then said he wished such things *emerged from the formula* rather than being specified — while also ruling that requirements themselves can never emerge (he defines them; the engine prices who can flex in).

**Under a play-level view:** a role's definition *becomes* a participation profile. "The big nickel" = the defensive back who lines up over the slot in nickel personnel on ~40–50% of defensive snaps; "DL5" = the fifth lineman who enters on pass-down blitz packages. The Owner (or the pack author) writes the *football* — which packages exist, who lines up where, what those players do — and the engine then measures snap share, contribution, and (via the lab) marginal value. Pricing *into* the new role uses the same machinery as any other destination: whose bodies cover the demanded duties. The Owner's English input shrinks from "price 17 roles × SS2" (289 cells of philosophy) to "the big nickel plays slot coverage in nickel packages" (one football sentence that converts to math directly, no fitting). **This is the translation upgrade in miniature:** the input stays English, but it is the kind of English football already speaks — formations and assignments — which is exactly why the Owner can write it without feeling like a constants vendor.

### 2.4 The translation itself (English → math) — NOT eliminated; relocated and upgraded

The personnel and attribution models are new translation surfaces, and I will not pretend otherwise — MUSE's prompt anticipates this and it is true. But "the same headache in a new place" is wrong, because the *kind* of translation changes:

| | Today (aggregate fitting) | Play level (mechanism → measurement) |
|---|---|---|
| Owner's input | Philosophy in English ("socialism", "the center is a hub") | Philosophy in English — *plus* football facts ("the FB lines up as a lead blocker on strong-side runs") |
| Conversion | Council fits constants until an aggregate table matches; the philosophy lives invisibly inside the constants | The philosophy becomes a **mechanism** in the pack (packages, assignments, duty weights); its consequences are **measured outputs** (FB snap share, double-team rate, gravity) |
| Falsifiability | None — a fitted constant is neither right nor wrong | Yes — if the Owner's FB plays 40% of snaps, the mechanism is wrong *and visibly so* |
| Re-litigation | Every wave, from scratch | Once per mechanism; afterwards the numbers update themselves |
| Portability | Constants are football's; other sports refit everything | Mechanisms are shapes (participation, adaptation, attention); other sports re-author football facts only |

The Q8 gravity directive is the Owner himself demanding this upgrade — "drawing double teams and usage and gravity should be formally measured as much as possible… available for the user to see." Double-team events do not exist in a drive. They only exist if the engine stages plays. The Owner is already telling us he wants the ledger.

### 2.5 Summary table for Q1

| Headache | Root | Play-level SIM | Plays Ledger (view) | Verdict |
|---|---|---|---|---|
| FB>RB / socialism | Guard has no participation term | Measures it | Measures it | **Dissolves** |
| C>OT | Value content, not ability | Hides it in physics | Splits into ability + measured guard | **Survives, sharpened** |
| New roles (SS2, DL5) | No slot → no value → no rows | Prices via play value | Role = participation profile | **Dissolves structurally** |
| English→math translation | Constants are unfalsifiable | Constants become physics | Constants become mechanisms + measurements | **Survives, upgraded** |
| Gravity (Owner Q8) | Not representable | Native | Native (event ledger) | **Dissolves** |

The two "survives" rows share a property: they are the rows where the Owner is asserting *worth*, not *fact*. No measurement of plays will tell us what a center's absence from 15 pass sets is worth; only a value model will, and the value model already exists and improves independently. Everything that is a *fact about football* — how often the FB plays, who doubled the WR1, what a blitzer does — is currently invisible to the engine and becomes visible at play level. Facts should be measured; worth should be argued. Play level draws that line cleanly for the first time.

## 3. Q2 — What transfers, what rebuilds (specific)

**Transfers untouched (the majority of the machine):**
- **Matchup model** — totals remain the physics; the ledger consumes them as its script. `matchup.ts`, specs, plans, personnel shifts (`11/12/13/21/22` already first-class in `applyOffPlan`).
- **Drive generator** — unchanged; the ledger is strictly *inside* each `Drive`, downstream of its realisation.
- **Box score + purity contract** — becomes the ledger's *conservation check*: play sums must reproduce drive totals to the play, the way player lines already sum to team totals. The discipline is written and tested; we extend it, not invent it.
- **Lineup optimizer** (Hungarian, priorities, `EMPTY_OVR`), **slot table** (32 spots, weights, formations, 4-3/3-4 mapping), **FLEX presentation** (tiers 0/2/6/12, emergency −8, QB law), **`WINS_PER_UNIT`** — all unchanged; the derivation changes how prices are *made*, not how they are *used*.
- **The 99 rules** — their role survives intact: guide, oracle, and the Owner's reality contract. (Q2: "I really don't care about meeting these 99 at all" — but they remain the fastest reality check a new mechanism can fail.)
- **The duty vocabulary (17 duties)** — survives, promoted: duties become per-play *events* (a pass set, a snap, a catch, a double team) instead of authored 0–10 integers. My NEED/HAVE split survives as the grammar; the NEED side stays authored (Owner's ruling: requirements are defined, not discovered), the HAVE side becomes *measurable*.
- **The measurement culture** — seeded seasons, LOO testing, "labelled INFERRED" honesty, `slotwins20`, `dl5-snaps.py`'s real-data discipline. Methods transfer wholesale; they are the most valuable asset in the repo.
- **flexunify's operator** — one p-norm dial over lower bounds (Owner Q7's adjustable blend) is exactly the shape the measured layers need. It was built for this.

**Recalibrates (numbers move, machinery stays):**
- **Slot values** — re-measured once participation exists. The low-exposure slots move most (FB, TE3, WR4, DIME, DL5); QB and the line barely move. Claude's flexunify values were measured *without* snaps; the first ledger measurement will already be a different (better) number.
- **HAVE profiles** — re-derived from per-player duty events; the authored 0–10 tables become the prior, the events the posterior.
- **The three Owner score changes** (EDGE CARRY, C PBLK, TE PBLK) — re-tested against measured events rather than fitted to the 99.

**Built new (the real work, in size order):**
1. **Personnel model** (medium) — which 11 on the field per play, per package; football-shaped tables (packages, formations, slot occupancy) that already have their vocabulary in `specs.ts` and `slots.ts`.
2. **Attribution model** (medium) — who blocked whom, who covered whom, who doubled, who touched; the box score's SPD/STR credit logic generalised from drive facts to play facts.
3. **Play sequencer** (large) — the down/distance/field-position state machine inside a drive whose plays sum exactly to the drive's rush, pass, plays, sacks and points. Largest-remainder allocation (the `allocate()` pattern) makes "sums exactly" a property, not a hope. This is the one genuinely big build, and §5 shows it can be deferred — the snap ledger does not need it.

**Net:** the derivation knowledge (slot values, duty tables, the merge work) transfers as *calibration priors*, exactly as the Owner predicted ("the calibrated numbers transfer"). What is rebuilt is a measurement layer, not an engine.

## 4. Q3 — The middle path is not a compromise; it is the correct shape

MUSE's middle path — drives authoritative, plays generated inside them — is where I land, but I want to strengthen it beyond "a cheaper option between two extremes," because I think it is actually the *right* answer even if money were no object.

**The box score is the existence proof.** We already generate per-play-shaped facts (runs, completions, tackles, credits) from drive totals, hand them to named players, and prove they add up. Nobody calls the box score a second engine. The Plays Ledger is the same artifact with three added columns: down-and-distance (bookkeeping, not physics), personnel (which 11), and snap counts (who was out there). The fear that "play level" means rebuilding the sim should die on this comparison: **we have shipped a play view before, and it was small, pure, and testable.**

**What the staging metaphor buys.** A drive is a script; the ledger stages the acts. The stage directions must respect the script (a drive that ended in a punt cannot contain a touchdown), but the director has freedom in casting (who exactly blocked whom) and blocking (which downs the yards came on). This is precisely the box score's existing freedom, and precisely why it never drifts: *the drive determines the plays, never the reverse.* The ledger cannot disagree with the score, because it is not allowed to want anything.

**Does it solve the English-philosophy problem, or move it?** Split answer, as in §2.4: the philosophy-into-constants step is *replaced* by philosophy-into-mechanisms (packages, assignments, duty weights — authored football, no fitting), and the mechanisms' consequences become measured. The personnel and attribution models are new authoring surfaces, but authoring "who lines up where" is the Owner's home turf — it is the part of football he can state as fact rather than as price. The residual philosophy (what things are *worth*) stays where it already lives: the value layer, whose measured inputs the ledger improves. **So: not solved, but converted from "fit my philosophy into your constants" to "check my philosophy against your measurements."** For a Owner whose finish line is a feeling that can be adjusted, that conversion is the difference between tuning blind and tuning with eyes.

**What the view cannot give (honesty clause):** a staged play cannot *discover* that a different lineup would have changed the drive's outcome. The ledger measures exposure and attribution; it cannot measure causation — "what would have happened with Player X at safety" is counterfactual, and counterfactuals need the lab's perturb-and-resimulate loop (which already exists in `slotwins20` methodology). This is a feature, not a gap: the ledger is the *observational* layer, the lab is the *experimental* layer, and the full "engine generates its own math" claim (§6) needs both. A full play-level simulation would merge them into one slow, tangled instrument. Keep them separate.

## 5. Q4 — The path, in five shippable steps

Each step is council-legal (read-only prototypes in `tools/mathlab/`), each ends in something measurable, none touches the product until the Owner says so. Order is chosen so the first step needs **no** play sequencer — the FB problem (the actual headache) is solvable before the big build.

**Step 1 — Snap Ledger v0 (the exposure ledger, no plays required).**
Extend the existing drive→boxscore allocation with per-play personnel packages (the `11/12/13/21/22` personas already exist) and per-slot occupancy counts: drives × plays × package → who was on the field. Output: the engine's first snap counts per slot, per game.
*Measure:* FB share of offensive snaps (target: the real 15–25% band — validate against nflverse snap counts, the source `dl5-snaps.py` already ingests); DIME < NICKEL < CB3; WR4/TE3 shares; DL5 vs the real fifth-lineman distribution that script already computes. *Delivers:* the socialism/exposure term; the first gate-free fix for the P-339 center diagnostic and the FB family. *Size:* small — it is the box score with one more index.

**Step 2 — Play Sequencer v0 (the ledger proper).**
Inside each drive, lay out plays that sum exactly to the drive's rush/pass/plays/sacks/points: down, distance, yard line, and a plausible run/pass mix (short-yardage law, two-minute law — all labelled INFERRED like the rest of the codebase's honest guesses). No personnel quality feedback; the drive is still the boss.
*Measure:* conservation (plays sum to drives, always — a purity test); distribution sanity (third-down conversion rate, distance distribution vs general NFL knowledge); determinism (same seed → same ledger).

**Step 3 — Personnel + Attribution (who did what, per play).**
Per play: the 11 on the field (from the lineup + package), assignments (who blocked whom, who covered whom, double-team events, who touched the ball), credit weighted by the existing SPD/STR rules.
*Measure:* per-player duty-event rates vs authored HAVE profiles (does a 90-OVR center actually record ~10-grade snap-and-block events?); double-team rate on WR1 vs WR4 (the Owner's gravity, finally visible); attribution sums (every event has an actor; every actor's events sum to the play's outcome).

**Step 4 — The measured derivation (the payoff).**
Recompute the derivation with measured inputs: HAVE from events; slot values re-measured with exposure visible; guard scaled by measured exposure; one p-norm dial (flexunify's operator) for the blend. Price all 289 ordered pairs; the 99 are the guide, LOO is the honesty check.
*Measure:* (a) mean error in OVR points + Spearman vs the 99 (Claude's post-QA metrics — I adopt them; exact tiers stop being the headline); (b) **the center diagnostic (P-339): in seeded drafts, do centers stay at center?** Zero center-out arbitrage rows is the pass condition — the Owner named this the formula's report card; (c) the FB family: FB>RB lands ≤ tier 6, ideally 2, and RB>FB stays 0; (d) LOO mean error stable (the portability proxy for other sports).

**Step 5 — Gravity Ledger (the Owner's Q8, delivered).**
Double-team/attention events accumulate into per-player gravity stats; they feed the advanced-stats section (P-036's home) *and* flow back into slot values (a WR1's measured value includes the attention he draws — the weight table currently prices that by hand).
*Measure:* gravity distribution shape (top receivers draw multiples of WR4's attention — the mechanism should produce that by construction, or it is wrong); user-facing integers only, per product law.

**Fail-fast checkpoints:** after Step 1, if the engine's FB/DIME/DL5 shares are wildly off real football, fix the package shares before building anything else — cheap to fix at this layer. After Step 4, if exposure-weighting fixes the FB family but the center diagnostic still fails, the value side (not the play side) is wrong, and we will know *which* half to argue about. That is the diagnosis dividend of the split in §2.2.

## 6. Q5 — Can the engine generate the math itself? Concretely.

Yes — but "the engine generates the math" is **two loops, not one**, and naming them separately is what keeps the claim honest:

1. **The measurement loop (the Ledger):** staged plays → events → ledgers (exposure per slot, contribution per player, attention per receiver) → inputs to the formula. This produces *facts*: how often, who, against whom.
2. **The experiment loop (the Lab):** the existing methodology — perturb a roster (move the player, or zero a slot), re-simulate seeded seasons, count wins, convert via `WINS_PER_UNIT`. This produces *worth*: what the fact is worth at the margin. The experiment loop is what answers C>OT; no observation of plays will.

A flex price is then the **OVR-equivalent of the win cost of the best-adapted roster** that contains the move — and the key subtlety the drive engine cannot see is the *adaptation*: move the FB to RB and the offense does not run the same plays with a worse runner; it calls a different mix, and the true cost is the *re-optimized* cost. Socialism is adaptation seen from the bench: low-exposure roles are cheap to replace precisely because the game adapts around them. The 99 hand prices are the Owner's static approximation of this dynamic quantity — which is why no static formula fitted to aggregates ever quite nails them.

**In-formula shape (the sketch, promised in the prompt):**

```text
# inputs, all measured by the engine:
#   E_r   = exposure of role r = its share of relevant snaps (Ledger, step 1)
#   v_s   = measured value of slot s (Lab; gravity included once step 5 exists)
#   have_r[d] = duty level measured from r's own play events (Ledger, step 3)
#   need_s[d] = authored duty demands of the job (the Owner's football facts)
# price(r -> s) = tier( max( ability, E_r * guard ) )        -- the Owner's blend stays adjustable:
#   ability     = M + λ·S  over loaded duty gaps (ZAI-D1, unchanged in shape, HAVE now measured)
#   guard       = 20 * (1 - v_src / v_dst)  if v_dst > v_src else 0   (Claude's no-arbitrage guard)
#   E_r         = measured exposure of the SOURCE role -- socialism's arithmetic
# one dial q blends as a p-norm (flexunify): price = || (ability, E_r·guard) ||_q
# no gates, no floor, no named exceptions, no pair-tracking.
```

Why this shape and not another: the guard must stay one-directional (moving a star *into* a light spot is free — RB>FB = 0 ✓, TE>FB = 0 ✓, and the DT/EDGE/OT>FB = 0 rows all confirm); the exposure factor must sit on the *source* role, because the harm a move can do is bounded by how often the moved player's old job mattered… and the Owner's own rows confirm the arithmetic: every family the plain guard breaks (FB>RB 18→Owner 2; OLB>ILB 10→Owner 6; OLB>SS→Owner 6) is a partial-exposure source, and every family it must not soften (C>OT, C>DT — a center plays essentially every snap, E≈1) keeps the full guard. **Exposure is the missing coordinate that makes the guard fit without gates.** Appendix A works the numbers.

**What the engine measures, in one list** (this is the concrete answer the prompt asks for): per slot — snap share; per player per play — duty events (sets, snaps, routes, catches, coverage reps, double teams drawn, pressures, tackles); per team per game — the adaptation surface (personnel mixes actually used). The Owner's Q8 advanced-stats section is this list with a UI on top; the derivation is this list with a price function on top. **One measurement layer, two consumers.** That economy — build the ledger once, serve both the show and the math — is the strongest financial argument for the whole direction.

## 7. Innovation — ideas considered, adopted, and rejected

**Adopted (the load-bearing new ideas):**
1. **"Plays Ledger" as the frame.** Not drive-vs-play simulation; the third shape: authoritative totals, staged plays, additive proof. Rename the thing before building it — half the resistance to "play level" is the fear of the simulator, and the name should carry the distinction.
2. **Exposure-weighted guard = socialism's arithmetic.** The single idea I would put in front of the Owner first: it is gate-free (his Q9/Q10 law), it fixes the FB family his ladder breaks, it keeps C>OT at 12 (his Q11a), and it *needs* the play view to exist (so the strategy question and the derivation question have the same answer — a rare alignment).
3. **HAVE becomes measured; NEED stays authored.** This is the honest resolution of the Owner's two seemingly conflicting rulings — "requirements never emerge" (he defines them) and "I hoped DL5 would emerge from the formula" (he resented specifying). The split: what a job *demands* is authored (his law); what a body *does* is measured (his wish). DL5-as-blitzer emerges in the HAVE/event data; the nickel package's demands are authored. Both of his instincts, each in its correct place.
4. **The dual-position payoff.** Travis Hunter (Q15) is two HAVE profiles, both measured from events, with the flex price between his own two roles collapsing toward whatever his measured bodies support. Dual positions stop being a special case the table has to list — they are what the formula does naturally once HAVE is per-player rather than per-role. Design now, cost later ≈ zero.
5. **Snap share ports as a shape, not a number.** The reconciliation of portability (Q3/Q5) with "snap share is not consistent across sports": basketball's ledger generates possessions/minutes; the *formula* `max(ability, E·guard)` is identical; only the football facts (packages, duties) re-author. This is the smallest possible "minimize the work of building new engines" — the Owner's Q5 — that does not pretend basketball is football.

**Considered and rejected:**
- **Full bottom-up play simulation.** The physics we would calibrate (11 simultaneous agents, blocking interactions, coverage separations) is orders of magnitude beyond the product's needs, would take the engine's determinism story hostage (every `Math.random()` site multiplies), and buries the Owner's dials under physics tuning. The drive engine already produces realistic totals; their realism is *the* asset. Rejected.
- **Engine snap counts replacing the slot-value ladder entirely.** Tempting (the ladder is the council's most contested component), but exposure measures *participation*, not *scarcity-vs-replacement*. QB exposure is 100% and QB weight is 1000 — but the 1000 is not *because* he plays every snap; it is because replacement QBs are terrible. A FB's low exposure *plus* the ladder's small value gap together produce socialism; either alone does not. Keep both terms. Rejected as replacement; adopted as weighting.
- **Pricing all 289 pairs from play data alone.** The lab can measure maybe a few dozen pairs directly (compute budget, and most pairs never occur); the formula + measured inputs must interpolate the rest — which is exactly what a *derivation* is. The 99+ lab measurements become the oracle, not the table. Rejected as a source; adopted as a test set.
- **Building the ledger as the user-visible animation first.** P-007's 30–60 s cinematic is a product feature with different success criteria (drama, timing) than the ledger (fidelity, conservation). Same data, different renderer; do not couple them. Rejected as a first consumer; noted as a free future consumer.
- **Measuring "exit damage" (what the old spot loses) as a formula term.** The Owner called it "an easy point of failure" (Q8) and he is right — but note the ledger gives it a second life: if the personnel model knows the C spot's coverage requirements, the *optimizer* can simply refuse to empty the hub (a constraint), instead of the price paying for it. A mechanism, not a term. Parked, not proposed.

**If I were starting from the Owner's question alone** — "can the engine generate the math itself?" — I would not have begun from flex at all. I would begin from the advanced-stats section the Owner already asked for (gravity, usage, "why you did well"), because it forces the same measurement layer, ships user-visible value on the way, and leaves the derivation arriving for free at Step 4. The derivation is the destination; the ledger is the road; the stats section is the toll booth that pays for the road. That ordering — *show first, price second* — is what I would do differently, and it is arguably just Step 1 and Step 5 swapped in emphasis, not in order.

## 8. Questions for the Owner (few, and sharp)

1. **The FB number.** When the engine stages personnel, may the FB share of offensive snaps be whatever the package tables produce (measured, scheme-driven), or do you want a target band enforced (~15–25%)? This decides whether socialism is discovered or tuned. (My recommendation: discovered, then compared to real football — never enforced.)
2. **The center's worth.** Once ability and guard are split, C>OT becomes a *market* row (~12–14 from measured values) with ability ~6 underneath. Is the 12 you price what the *market* says (ladder), or what the *player loses* (hub)? Q11a said ladder; the ledger will make the hub visible too — we should agree now which one the final number answers to. (Recommendation: ladder, per your Q11a.)
3. **Where does the ledger live first?** Inside the existing engine's season loop (visible in advanced stats), or in the lab only until Step 4 proves out? (Recommendation: lab first, product at Step 5.)

## 9. One-paragraph answer to the Owner, in his words' terms

You asked whether the confusion of deriving formulas from drive data plus your English is a bigger headache than letting the engine watch its own plays and do the math itself. Mostly yes. The things that keep breaking — the fullback, the roles that have no slot, the double teams you want measured — are breaking because the engine counts yards and points but never counts *who was on the field and what they did*, so every one of your principles has to be hand-translated into constants and re-fitted every round. If the engine, inside each drive it already creates, also writes down the plays that make it up — who lined up, who blocked, who doubled, who touched it — then your principles stop being constants and become measurements: the fullback's price falls out of how often he actually plays, a new role's price falls out of what it does on its plays, and the value side (what a center is worth leaving behind) stays where it already lives, in the win math, now measured instead of guessed. What you would still tell us in English is the football — which packages exist, what each job demands — because that is the part that never emerges from data, and you have said so. But it is the part of football you can state like a coach, not like a spreadsheet. We would not start from zero: the drive engine stays the truth, the box score already does a small version of this and always adds up, and the calibrated numbers carry over. The first thing to build is the smallest piece that ends the fullback problem — snap counts by slot — and the first thing to check is whether centers stay at center, whether the fullback plays about the share real fullbacks play, and whether the prices it makes land near your 99 without being fitted to them.

---

## Appendix A — Worked rows for the exposure-weighted guard (arithmetic verified by script)

Guard `G = 20 × (1 − v_src/v_dst)` when `v_dst > v_src`, else 0 (Claude's flexunify form; `v` = slot values, slot-table weights used as the stand-in here and labelled as such — the live design uses measured values, which is what makes the C-family numbers land). Exposure `E` from the snap ledger (real-football bands cited; the engine's own ledger replaces them at Step 1). Tier cuts 1/4/9 → 0/2/6/12. Owner column = the live 99-rule table (`flex.ts`).

| Row | Ability (ZAI-D1 shape) | Guard (raw) | E (source) | E·Guard | max(ability, E·G) | Tier | Owner | Verdict |
|---|---|---|---|---|---|---|---|---|
| C>OT | ~6 | 14.0 (150→500) | ~1.00 | 14.0 | 14.0 | **12** | 12 | ✓ plain guard already here |
| C>DT | ~6 | 14.0 (150→500) | ~1.00 | 14.0 | 14.0 | **12** | 12 | ✓ |
| C>OG | ~2 | 12.5 (150→400) | ~1.00 | 12.5 | 12.5 | **12** | 6 | ✗ raw weights overshoot — *this is why v must be measured*: flexunify's measured values shrink the C→OG gap (snapping gives C real value OG lacks), pulling the guard toward 6; raw slot weights are the stand-in that overstates it |
| FB>RB | ~1–2 | 18.0 (25→250) | ~0.15–0.25 | 2.7–4.5 | 2.7–4.5 | **2** | 2 | ✓ socialism = exposure, no gate |
| RB>FB | ~0–1 | 0 (downhill) | — | 0 | ~1 | **0** | 0 | ✓ |
| FB>TE | ~1–2 | 18.0 (25→250) | ~0.15–0.25 | 2.7–4.5 | 2.7–4.5 | **2** | 6 | one tier low — within the Owner's ±5 acceptance; the exposure curve (linear vs concave) is the honest tuning surface here, and the events ledger (FB lead-block events vs TE demands) is the *measured* way to set it |
| OLB>ILB | ~2 | 10.0 (150→300) | ~0.6–0.7 | 6.0–7.0 | 6.0–7.0 | **6** | 6 | ✓ plain guard breaks this (tier(10)=12); exposure repairs it |
| OLB>SS | ~6–8 (DEEP gap) | 10.0 (150→300) | ~0.6–0.7 | 6.0–7.0 | ~7 | **6** | 6 | ✓ ability alone already lands 6; exposure guard agrees |
| OLB>FS | ~8–9 | 10.0 (150→300) | ~0.6–0.7 | 6.0–7.0 | ~8–9 | **6** | 12 | miss — the DEEP-duty weight is the lever; a known ZAI-D1-family residual, unchanged by this proposal, visible instead of hidden |
| TE>FS | ~12 (DEEP 9 + RNG 4 + ZCOV 4) | 3.3 (250→300) | ~1.00 | 3.3 | 12.2 | **12** | 12 | ✓ ability carries; guard correctly does not soften it |
| TE>FB | ~0 | 0 (downhill) | — | 0 | 0 | **0** | 0 | ✓ |

Reading the table: every row the plain guard breaks is a partial-exposure source; every row that needs the full guard has E≈1; the two residual misses (C>OG on raw weights, OLB>FS) are both *value-side* questions that the measured-value loop and the DEEP weight respectively own — and both are now visible as named quantities instead of fused errors. That is the whole thesis in eleven rows: **the ledger does not make the formula smarter; it makes the formula's inputs measured and its disagreements legible.**

*Sources for the exposure bands: nflverse snap counts are already the lab's accepted real-data source (`dl5-snaps.py` ingests them for DL ranks); the same files carry offensive snap shares for FB/TE/WR ranks. The bands above are general NFL knowledge pending Step 1's measurement — flagged INFERRED per the codebase's own labelling convention.*

## Appendix B — Grounding (what I actually read, with the facts I used)

- `architect/engine-and-seats: colors/src/sports/nfl/engine/drives.ts` — drive totals authoritative; ~11.5 drives; no per-play state; `allocate()` largest-remainder pattern.
- `…/engine/boxscore.ts` — the existing play-shaped ledger: allocates drive facts to named players, SPD/STR decide credit, purity-tested to sum exactly.
- `…/engine/lineup.ts` + `…/engine/flex.ts` + `…/engine/slots.ts` — Hungarian lineup optimization; 99-rule FLEX table, tiers, emergency −8, DL5 min-of rule; 32-slot weight table (QB 1000 … FB 25, TE3/WR4/DIME/P/K 50); `WINS_PER_UNIT`.
- `tools/mathlab/flexunify.mjs` — the measured-value guard `20×(1−v_src/v_dst)`, p-norm blend dial, LOO discipline, "kills the center exploit."
- `tools/mathlab/dl5-snaps.py` — nflverse snap-count ingestion already in the lab (the validation source for Step 1).
- Owner Q&A verbatim (MUSE, 2026-11-10) — the binding direction quoted throughout; MUSE's agreeing-ideas synthesis; Claude's post-QA merged design and its metrics shift (mean error + Spearman, exact tiers demoted).
- My ZAI-D1 (as re-derived by MUSE from my write-up: 17 duties, NEED/HAVE, `M + 0.4·S`, cuts 1/4/9) and ZAI-D2's fate (gates removed → ability-only 98/99, C>OT the lone miss).

*Z.ai · seat ZAI · design only — no engine, flex.json, or flex.ts file touched · zip: `z-post-blue-docs-update-2026-11-11.zip`*
