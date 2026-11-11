# PLAYLED — the full play-level rebuild, attempted

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner (KG)
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-full-rebuild-2026-11-10.md`
**Companion to:** my Plays Ledger answer (`ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` — the view, not the rebuild). The Owner read it and asked for the rebuild to be **attempted** anyway. This document is that attempt: design, working prototype, measurements, and the honest verdict.

**What was built (all files in this folder, sha256 in CHECKSUMS.txt):**
- `playsim.py` — the prototype: a bottom-up play-level engine (~700 lines, self-contained, seeded, Python 3, zero dependencies)
- `run_reference.ts` — harness that runs the REAL drive engine (Architect's tree) for comparison distributions
- `measure_playled.py` — the measurement suite (receipts A/B/D/S, one command)
- `measure_flex.py` — the flex-pricing experiment (the four hard rows)
- `reference_engine.json` — the drive engine's reference: 3,000 seeded games × 4 matchups, VERIFIED by running it
- `totals_final.json`, `flex_results.json`, `ledger_sample.json` — measurement outputs
- `README.md` — how to run everything

**Evidence labels** (council convention): VERIFIED = I ran it · INFERRED = reasoned/authored, not run · REPORTED = someone else's number · UNKNOWN.

---

## 1. The design (Step 1)

### 1.1 The one rule everything hangs on

> **A player at a spot performs a duty at `level = min(HAVE[his body], NEED[the spot's job])`, and the play feels the difference between the fielded lineup's levels and the natural lineup's levels** (a natural player IS his job, so his baseline is his own body).

This is the play-model translation of the Owner's two rulings: requirements are authored (NEED — he defines the job), bodies are positional concepts (HAVE — the ZAI-D1 tables, with his three score changes: C PBLK 6, EDGE CARRY 4, TE PBLK 4). No per-player attributes — OVR + position only. A center flexed to tackle does not become a worse tackle gradually; he lacks the pass-set the job demands, and the pass game feels exactly that deficit, per play, through the sack and completion rates. The same deficit machinery prices FB>RB (CARRY 9 vs 10 demanded — nearly seamless) without any exposure term being written.

### 1.2 Play state and play types

State: down (1–4), distance, field position (yards from own goal), clock (per-quarter 900 s buckets), score, period. Play types: run, short pass, deep pass, screen, scramble (QB run), punt, field goal, kneel. Selection: a situation table (down × distance-band → run probability, INFERRED NFL tendencies) modulated by the drive engine's own late-game script (`lateGameK`, ported VERIFIED), 4th-down decision table (go/FG/punt with distance bands), and three script rules (kneel protocol, half-kill, desperation).

### 1.3 Personnel (running, not described)

Offensive packages 11/12/13/21/22 with slot lists (OL always OT1/OT2/OG1/OG2/C); selection by situation and run/pass. Defensive base/nickel/dime selected against the offense's tendency (heavy packages draw base, 3rd&long draws dime). DL5 rotation: on ~30% of nickel pass snaps the fifth lineman replaces DT2 (the Owner's blitzer framing, INFERRED rate). Every play carries its 11+11 in the play log (`ledger_sample.json` shows a real game, play by play, with packages, down/distance, gain, clock, score).

### 1.4 Attribution (the philosophical sink, named and counted)

Every play logs events to a per-player ledger: carry, catch, cmp, inc, sack, pressure_allowed (to the weakest pass-set on the line), tackle (by a position-share table), scramble, int / int_thrown_to / int_caught (coverage assignment: CB1↔WR1, SS↔TE, MIKE↔RB). **Gravity events** (the Owner's Q8): WR1 double-team rate 0.22 ±0.12/−0.08 by the strength of his receiving mates; DT1 0.50, DE1 0.30 — logged per player per game (`ledger_sample.json` carries the counts; the RATES are INFERRED placeholders pending calibration — flagged).

**Attribution rules, named:** (1) blocker-rusher pairing by slot (OT↔EDGE, interior↔DT); (2) sack credit to the rusher chosen by the engine's own passRush spec weights; (3) pressure blame to the worst pass-set; (4) target shares by slot with duty caps (adaptation a); (5) coverage assignment map; (6) tackle shares by position; (7) carry shares with duty caps (adaptation c); (8) double-team rates (gravity). Each is a small authored theory of football — eight of them — and each is checkable against real football (targets vs real share data, tackles vs PFR, double-team rates vs analytics sources). None are yet checked: INFERRED throughout.

### 1.5 Play outcomes and where every parameter comes from

- **The matchup model is the prior, exactly.** The prototype ports `teamRatings` + `matchupModel` (including the nickel package shifts and the dime coverage mix) and verifies them against the engine to machine precision — **Receipt A: worst relative error 9.1e-16, VERIFIED**. The four logs (rush/pass/TO/sack) drive per-play efficiency: run gains ×exp(0.75·rush_log), completion rate ×exp(0.45·pass_log), INT rate ×exp(0.7·to_log), sack rate ×exp(−0.9·ol_pass_set_shift)×exp(sack_log).
- **Per-play baselines** are real-NFL shapes (INFERRED): carry mixture (stuff/middle/breakaway, p 0.27/0.63/0.10), completion-gain mixture (short 7.3±3.8 / medium 14.5±4.6, 0.64/0.36), deep (42% comp, 27 ypc, 7.5% INT), screen (80% comp, 6.2 ypc, beats the blitz), scramble (7% of dropbacks), sack base 2.2/36.5 dropbacks (engine-consistent by construction), XP 94.3%, INT-return TD 12% (matches the engine's defensive-TD share), FG buckets (94/84/68/50 by distance).
- **Calibrated ONCE, then frozen:** run_scale 1.095, cmp_scale 1.0, ypc_scale 1.0, beta_yards 0.75, beta_rate 0.45, beta_to 0.7, third_comp 0.92 — fitted against the engine's league-neutral reference (3000 games), then frozen. **Sensitivity anchors (INFERRED, 5):** sack_sens 0.9, cmp_sens 0.06, run_sens 0.10, cov_sens 0.5, cov_ypc_sens 0.15 — how strongly a duty deficit moves its play outcome. These five are the play model's own physics and the honest cost of the rebuild.
- **Adaptation rules (3):** (a) route mix moves away from a spot whose body cannot run routes; (b) the defensive shell deepens (cover-2 share 0.30 → 0.55) when the deep-safety bodies are weak; (c) run mix moves away from a weak carrier. These are the play model's "socialism" — adaptation is how a misfit body stops being expensive.

### 1.6 Drive assembly

Emergent, not laid down: drives end by score (TD crossing, FG decision, safety), turnover (INT/fumble, 12% returned), punt (net 40 + punter term ± 8), turnover on downs (failed 4th-down go), or half expiry. A failed second consecutive go is DOWNS. No kickoff returns (touchbacks), no penalties (Owner's 28 Oct ruling), no overtime (single-game scope).

---

## 2. The measurements (Step 3), with receipts

### Receipt A — the prototype stands on the engine's prior (VERIFIED)

The ported matchup math is **engine-identical to 9.1e-16** across all four matchups (even80, +4, +8, −8), including the nickel package shift and the dime coverage mix. The rebuild does not re-invent the engine's calibration; it consumes it per play. (Reproduce: `python3 measure_playled.py`.)

### Receipt B — totals vs the drive engine (VERIFIED, 1,500 seeded games per cell; `totals_final.json`)

| matchup | metric | PLAYSIM | ENGINE | ratio |
|---|---|---|---|---|
| even80 | rush | 104.3 ± 39.6 | 110.3 ± 34.1 | 0.95 |
| even80 | pass | 189.6 ± 51.6 | 218.6 ± 56.6 | 0.87 |
| even80 | plays | 59.8 | 65.7 | 0.91 |
| even80 | points | 18.8 | 21.8 | 0.86 |
| even80 | drives | 8.0 | 10.9 | **0.73** |
| even80 | giveaways | 1.3 | 1.2 | 1.03 |
| home_plus4 | rush | 131.9 | 143.7 | 0.92 |
| home_plus4 | points | 24.2 | 26.2 | 0.92 |
| home_plus8 | rush | 143.5 | 149.9 | 0.96 |
| home_plus8 | points | 27.3 | 28.7 | 0.95 |
| home_minus8 | rush | 60.4 | 62.5 | 0.97 |
| home_minus8 | points | 8.7 | 14.2 | **0.61** |
| home_minus8 | drives | 8.4 | 11.0 | **0.77** |

**Three findings, stated precisely:**

1. **The rush channel now tracks the engine across the whole spread** — and the response elasticities match: rush response vs even80 is ×1.27/×1.38/×0.58 (play engine) against ×1.30/×1.36/×0.57 (drive engine) — **sensitivity ratios 0.97–1.02, VERIFIED**. The bottom-up engine reproduces the engine's calibration response on the ground. This was not true at first (ratio ~0.22) and the fix is instructive: the response only matched once the matchup log was applied *per play* rather than to totals. The calibration bet is de-risked for the run game.
2. **Possessions are structurally short by ~27%** (8.0 vs 10.9 drives, stable across matchups). The drive engine *lays down* 10.8±0.9 drives and distributes yards into them; the play engine must *emerge* its possession count from the situation tables, and mine produce chains that are too long (2.7 plays/chain vs the engine's implicit ~2.4). I spent the calibration budget here (play mix, conversion shapes, 4th-down rules, completion mixtures, a 16-point grid) and got drives from 7.0 → 8.0, not to 10.9. **This is the calibration bet made concrete: the possession count is a fitted emergent, and my grid could not close the last third.** It is closable in principle (the remaining lever is the chain-length structure — 2nd/3rd-down conversion bands), but it needs the real per-band conversion data (nflverse) rather than my INFERRED shapes.
3. **The weak side diverges** (−8 OVR: points 0.61, sacks 0.69, plays 1.19). My weak offense still sustains drives but cannot finish them; the engine's weak offense dies faster and takes more sacks. The pass channel overall runs 0.81–0.91 — the completion-gain mixture needs the same treatment the run channel got (matchup log on completion depth is applied at 0.65 weight; the engine's pass response is steeper).

**Bar verdict on totals: NOT CLEARED at v0** — rush yes (within 5%, response matched), pass/plays/points within 10-19% at even and strong matchups, possessions −27%, weak side −39% on points. The gap is measured, located, and plausibly closable; it is not closed.

### Receipt D — determinism (VERIFIED)

Same seed → identical totals, identical play log, identical event ledger (byte-identical); different seed → different. All randomness flows through the engine's own mulberry32 Rng (ported); zero use of unseeded randomness. The rebuild's determinism story: **free if designed in from the first line** (the prototype needed no retrofit), and the same is true for a real rebuild — the cost the engine carries today (56–58 `Math.random()` sites, no seed) is a retrofit cost, not a play-level cost.

### Receipt F — the flex prices (the Owner's actual question; `flex_results.json`, 1,500 paired-seed games per world)

Method: for each row, two worlds (natural roster vs the flex applied) with identical seeds; the price = points lost ÷ the points-per-OVR slope at the destination slot, where the **slope is measured by the prototype itself** (probe +10 OVR at the slot — the engine generating its own value scale, which is the deepest thing this experiment shows).

| row | pts lost | slope | **PLAY price** | Owner | Ledger `max(ability, E×guard)` | err vs Owner |
|---|---|---|---|---|---|---|
| C>OT | 1.36 | 0.178 | **7.6** (7.6–7.9 across runs) | 12 | 12 | 4.4 ✓ |
| FB>RB | 0.57 | 0.118 | **4.9** (4.9–5.2) | 2 | 2 | 2.9 ✓ |
| FB>TE | −0.05 | 0.122 | **≈0** | 6 | 2 | 6.4 ✗ |
| OLB>FS | −4.44 | 0.050 | **explodes (−89)** | 12 | 6 | structural ✗ |

- **C>OT within ±4.4 and FB>RB within ±2.9** — both inside the Owner's stated ±5 tolerance, with zero authored prices. The center-to-tackle price falls out of pass-set deficits per play; the fullback price falls out of carry-duty deficits plus adaptation. **This is the Owner's "engine generates the math itself," demonstrated.**
- **FB>TE prices near-free** (err 6.4, just outside tolerance): the route-mix adaptation over-frees the move — the FB at TE simply isn't thrown to, so nothing is lost. The Owner's 6 says a real team still loses something. The attribution model lacks "what a defense does when a bad route-runner lines up at TE" (defensive adjustments are the missing half of adaptation).
- **OLB>FS explodes**: the duty-clip `min(HAVE, NEED)` creates a *coverage cliff* — the OLB body has DEEP 0 against the FS job's 6, so the entire deep game opens, and no shell rule bounds it. The 10-OVR probe can't represent a 6-duty deficit, so price = Δpts/slope explodes. **Reading: the play model generates the ABILITY half of a flex price cleanly, but a safety-type move is priced by the market half (what a real deep threat is worth), which the play model does not contain.** This is measured confirmation of my Ledger answer's split: facts from plays, worth from the value layer. The synthesis `max(ability_from_plays, E×guard_from_values)` is not a compromise — it is what the evidence says.

### Receipt S — the hand-translation surface, counted (VERIFIED from code)

The play model's authored surface: **570 authored numbers/rules gross**, of which 436 are the inherited duty tables (HAVE 289 + NEED 130 + W 17 — ZAI-D1's, not new to the play model). **Net-new to the play model: ~134 authored numbers + 11 rules** (situation tables, outcome shapes, clock, attribution shares, adaptation rules, sensitivity anchors). The Ledger's personnel + attribution models: **~47** (package weights, duty-event weights, attribution shares, no clock, no outcome shapes, no situation tables). **The rebuild's translation surface is ~2.9× the Ledger's** — the honest number the prompt asked for, and evidence *against* the rebuild, stated plainly. The full breakdown is printed by `measure_playled.py` (receipt S).

### The Owner's dials, audited (Receipt B-side, by construction)

- OVR + position only: **honoured** — the duty tables are positional concepts; OVR enters only through the ported matchup prior and the slope probes. No str/speed, no intangibles.
- No gates, no floor, no named exceptions: **honoured** — the prototype contains zero gates; the performance rule is one unified `min(HAVE, NEED)`.
- Dual positions free between a player's own two positions: **honoured structurally** — the flex machinery is symmetric (`{"RB1": "FB", "FB": "RB"}` is just two entries); nothing prices a dual differently.
- Socialism: **emerges, not authored** — FB>RB prices 5.2 (near-free) because the FB body performs the RB job per play, not because an exposure term was written. The Owner's principle turns out to be *what per-play performance equivalence produces*.
- Gravity measured and showable: **works** — the event ledger accumulates double-teams per player per game (`ledger_sample.json`); rates are INFERRED placeholders.
- ±5 flex error acceptable: two of four rows inside; see Receipt F.

### What goes stale (Step 3.4 — listed, not hand-waved)

| Item | Fate under the rebuild | Re-measurement cost |
|---|---|---|
| Drive generator + box score | **Replaced** (drives emerge; the ledger replaces allocation) | — |
| Matchup model + MC/spec constants | **Kept verbatim as the prior** (Receipt A) | zero |
| Slot weights + `WINS_PER_UNIT` | Kept (draft/lineup math unchanged) | zero |
| FLEX 99-rule table | **Replaced** by derived prices (99 remain the guide) | the flex harness, per row |
| Lab slot-value measurements (slotwins20) | Re-runnable on the prototype, **slower** (games are ~3× the compute of drive games) | days of compute |
| The 99 as guide | Kept (unchanged role) | zero |
| Beam's late-game script (E-209 constants) | Ported VERIFIED | zero |
| The engine's drive-shape INFERRED numbers (11.5 drives, 5.15 yds/play, 26 s/play) | **Stale** — the play engine needs its own, per-play (mine are in the tables above) | the calibration program |
| Pre-Colors-era FG/return/punt inference | **Stale** — replaced by play-level tables (mine, INFERRED) | the same program |

### Receipt B2 — what the prototype does that the drive engine cannot

For the record (this is the Owner's upside, VERIFIED by the code running): per-play down/distance/field-position state; per-player snap participation in packages; per-play attribution events; double-team/gravity events; adaptation responses (route mix, shell); EPA per play. The drive engine has none of these and cannot produce them without a ledger anyway — the rebuild and the Ledger want the same machinery.

---

## 3. The verdict (Step 4): the gap, precisely

**The rebuild does not clear the bars today.** Three of the council's objections survive contact with the prototype, now with measurements:

1. **The calibration bet is real and is about possessions, not plays.** Per-play efficiency calibrates cleanly (rush response matched at ratio ≈ 1.0). What does not calibrate from authored tables alone is the *emergent possession count* (−27%) and the weak-side scoring (−39%). The drive engine gets these by construction; the rebuild has to earn them with a fitted chain-length structure, which is a genuine calibration program needing real conversion data (nflverse per-band), not more hand-tuning.
2. **Error containment stays on the council's side.** The prototype's weaknesses (possessions, weak-side) are *contained* — they show up as totals gaps I can locate. In a production rebuild they would silently become wins/slot-values/flex-prices bias. Nothing in this attempt refutes Inkling's and VLOC's point; the attempt *strengthens* it.
3. **The translation surface is ~2.9× the Ledger's** (134+11 vs ~47, net of inherited duty tables), and the largest new blocks — situation tables, clock, outcome shapes — are exactly the blocks the Ledger does not need because its drives are authoritative.

**And one bar the rebuild DOES clear, which changes the conversation:** the flex-pricing experiment. The prototype generates C>OT and FB>RB prices inside the Owner's ±5 tolerance with **zero authored prices** — including the fullback, the exact headache that motivated the play-level question — by measuring per-play performance deficits under adaptation. It also shows precisely where the play model must stop: safety-type (value-ladder) moves explode on the duty cliff, confirming the Ledger answer's split. **The engine generates the math itself only up to the boundary between facts (plays: measured) and worth (market: not in plays).**

### The path I would actually propose (if the Owner wants the rebuild's upside without the bet)

**The Play Ledger, powered by this prototype as its staging engine.** Keep the drive engine authoritative (bar 1 and 2 stay satisfied); run THIS play engine inside each drive to stage the plays that add up to the drive's realised totals (the Ledger's conservation law, which the prototype already respects internally for run/pass/sacks). Then:
- **Phase 1 (the FB fix, days):** port the performance rule + adaptation rules into the Ledger's Step-1 snap ledger; the derivation gains the measured ability term. C>OT and FB>RB prices come from plays; the guard stays measured-value.
- **Phase 2:** validate the staged plays against real football (nflverse per-band conversions — the same data that closes the possession gap); the situation tables become measured instead of INFERRED.
- **Phase 3:** the advanced-stats surface (gravity, usage, EPA) — the Owner's Q8 — reads the same ledger.
- **Fail-fast:** if Phase 2 shows the staged plays cannot reproduce real conversion bands while summing to engine totals, the Ledger falls back to aggregate staging (its original design) and nothing is lost.

**If the Owner still wants the full rebuild**, the honest build order is: (1) the chain-length calibration program first (real conversion data, per band, per down — this is the bar that failed and everything else sits on it); (2) then the pass channel's response curve (the same treatment the run channel got); (3) then the flex harness against the full 99 as guide; (4) only then any product integration, which is the Architect's call entirely. Cost estimate: the calibration program is weeks of measurement, not days; the prototype took an afternoon and reached rush-parity — the remaining gaps are the expensive ones.

---

## 4. What I would do differently (the innovation clause)

1. **I would stop treating "the totals bar" as one bar.** It is three: per-play efficiency (cleared), possession structure (failed, needs data), response curve (cleared for rush, open for pass). Naming them separately is what made the attempt diagnosable — and the diagnosis says the rebuild's hard part is *not* the fun part (not plays, not physics — chain-length statistics).
2. **The duty cliff is the design flaw to fix before any rebuild resumes.** `min(HAVE, NEED)` is beautifully simple but prices extreme moves explosively. A bounded blend (e.g., level = HAVE − (NEED−HAVE)·(1−exp(−(NEED−HAVE)/3))) would smooth it — but that is a second authored curve, i.e. more surface. I prototyped the simple version and report the cliff rather than patching it silently.
3. **The most valuable single artifact in this delivery is not the engine — it is the slope probe.** Measuring points-per-OVR at a slot *inside the play engine* is the generic tool the whole council needs: it is how any future value layer (Ledger included) self-calibrates without the Owner's weights — the exact requirement his Q&A set for other sports.
4. **Rejected mid-attempt:** fitting the situation tables to the engine's outputs per matchup (that would have "cleared" the totals bar by construction and taught us nothing — the engine's drive count is an input, and matching an input is not calibration). Also rejected: measuring flex prices on unpaired seeds (first run produced a nonsense negative price for FB>RB; paired seeds are the difference between a measurement and a coin flip).

---

## 5. Sources and honest labels

- VERIFIED (I ran it): receipt A (port identity 9.1e-16), receipt B (totals, 1,500 games/cell × 4 matchups), receipt D (determinism), receipt F (flex, 1,500 paired games/world), receipt S (surface count from code), the drive-engine reference (3,000 games × 4 matchups via `run_reference.ts` on the Architect's unmodified tree).
- INFERRED: every per-play baseline shape, clock value, attribution share, gravity rate, adaptation rate, sensitivity anchor — each labelled in `playsim.py` at its definition; the possession-gap diagnosis.
- REPORTED: the council's three bars (VLOC/Inkling interaction #6, relayed by MUSE); the Owner's rulings (his Q&A, verbatim source on council/muse).
- UNKNOWN: real per-band conversion rates (needed to close the possession gap); real double-team rates; whether the Architect wants any of this.
