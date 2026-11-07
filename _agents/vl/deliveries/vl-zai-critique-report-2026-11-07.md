# VL critique of z.ai's "DATA-ANCHOR-WEIGHTS-ADVISORY" + improvement plan

Seat: VL · Role: Council Advisor · Branch: council/vl · Date: 2026-11-07T22:05 UTC
FOR: P-013 (Owner decision: default weights recalibration, protected constants)
Related: P-017, AGENTS.md §3 protected constants, §7 data integrity
Status: ADVISORY — proposes, tests, dissents in writing. Touches no product file and no protected constant.
Full report: `_agents/vl/deliveries/vl-zai-critique-report-2026-11-07.md` (this file). Inbox pointer: `inbox/20261107-220500-vl-P-013-zai-critique.md`.

---

## 1. What z.ai got right (and where I converge)

These are sound directions, several of which match my own read-only audit (`_agents/vl/notes/bias-audit-2026-11-07.md`, committed 242a8a9d):

- **Salary ≠ marginal wins.** Salary is "what a slightly-above-average player costs," not "how many wins +1 OVR at this slot produces." It inherits rookie deals, career risk, guarantee structure, cap-era inertia, positional fashion. It's a defensible prior and a good sanity check, not a foundation. My audit reached the same conclusion independently (salary table vs design.json differ on ~20/32 slots; salary is price not wins). LABEL: VERIFIED (my audit) + agreement with z.ai INFERRED.

- **Circularity is the core defect, not the table.** z.ai: "Once fitlm fitted the specs to the table, the engine could no longer verify the weights — it could only reproduce them." My audit confirms this exactly: `tools/mathlab/fitlm.js` fit RATING_SPECS/DEF_SPECS/PERS_REC/moved MC knobs so `derivedWeights()`/`slotWinsPerOvr()` reproduce `tools/mathlab/design.json`; snapped literals → `colors/src/engine/specs.ts`. The engine's measured slot values ARE a fit to its own table. LABEL: VERIFIED (fitlm.js + fit-precolors-2026-10-28-recv.json + specs.ts all read in this tree).

- **One-way calibration rule.** z.ai: "Real data validates L1; frozen L1 measures L2; L2 sets L3. Never fit L1 to a weight table, never move L3 penalties to hide an L2 disagreement." I agree and add: this is precisely why the flex whack-a-mole kept regenerating 85+ cases (TE→WR 6→12→14→16, caps, exemptions) — the optimizer was asked to undo with penalties what the value layer invited. My flexscan/flexweight results (flexweight.mjs, committed) bottomed at cap 20 with ~35 residual frozen-low promotions, confirming z.ai's diagnosis. LABEL: VERIFIED (flexweight.mjs scenarios) for the flex part; the one-way rule itself is agreement INFERRED.

- **McBride direction is right, mechanism needs care.** z.ai: real 2024 data shows elite TEs (McBride 28.1% of ARI targets, Bowers 27.1% of LV) already exceed league-mean WR1 target share (22.3%), so the engine "wanting" McBride at WR1 is not an allocation bug — it matches reality. The flex penalty should price the lost TE1 value (blocking + slot value), not hand-tune until zero cases. I agree in direction with one caution: one player (McBride) is not group bias — per the Owner's 6 Nov caution, any TE1 raise must come from a uniform measurement method, not a McBride-specific override. LABEL: McBride data REPORTED (z.ai's nflverse run, not in this tree); my caution INFERRED (Owner's 6 Nov ruling).

- **Anti-bias protocol tightenings.** z.ai's four additions (layer-classification table, blind validation with pre-stated tolerances, triangulation table per slot, held-out seasons) are all good and I adopt them into my step-2 pre-registration (committed 38e87e72). LABEL: VERIFIED (my pre-registration file exists; z.ai's original text REPORTED).

---

## 2. What I could NOT verify (REPORTED, needs Owner action)

z.ai's advisory leans heavily on evidence I cannot see in this worktree. Per AGENTS §9, I must not claim to have run what I haven't. Items z.ai marks VERIFIED are REPORTED to me:

- `calibrate-weights.mjs` — NOT present in this tree (grep found fitlm.js, emit-patch.mjs, apply-math-patch.mjs, realcheck.js, etc., but no calibrate-weights.mjs). z.ai says it's in the unseen 7 Nov workspace / origin/council/zai. I cannot audit it. [OWNER] push/zip the 7 Nov workspace (NOW.md, tools/mathlab/*, flex.json, claude/rulings/*) before any L1 audit can run.
- `slotWinsPerOvr()` / `modelWeights()` / `playerWar()` / `STATIC_SLOTS` in `z-core/01-html/Football-Sim-Z-post-blue.html` on `main` — z.ai cloned origin/council/zai (HEAD 25e3b2f) and claims to have read it. This worktree has no z-core/; z.ai's sandbox is separate. REPORTED.
- All nflverse 2024 numbers (McBride 28.1%, Bowers 27.1%, WR1 mean 22.3%, RB1 8.9% targets, Spearman 0.714, the slot share table) — z.ai's `anchor_demo_2024.py` + `anchor_demo_2024_results.csv` are in `_agents/zai/deliveries/` on their branch, not here. Network to nflverse is claimed VERIFIED from z.ai's sandbox. REPORTED; I cannot reproduce.
- sha256-pinned nflverse files (player_stats_season_2024.csv 9252f6e6…, depth_charts_2024.csv f210a337…) — REPORTED.
- `flexscan.mjs` / `flextune.mjs` — claimed added to tools/mathlab in an earlier chat; NOT present here (my ls confirms absence). Unknown whether they exist in z.ai's tree. LABEL: UNKNOWN (absent here).

**Blocker for the audit step:** z.ai's step 1 (parameter audit by layer) cannot run without the 7 Nov workspace. [OWNER] decision needed.

---

## 3. Where I differ / add nuance (INFERRED, reasoned from my audit)

### 3.1 Tier A ("engine's own measurement") is not yet trustworthy
z.ai recommends Tier A = `slotWinsPerOvr()` from "frozen, validated mechanics" as the default. But my audit shows L1 (RATING_SPECS/DEF_SPECS/PERS_REC/MC) was fit to `design.json`. So `slotWinsPerOvr()` currently echoes the table — it cannot be the default until L1 is independently validated against real data. Correct ordering: **validate L1 first → freeze L1 → then Tier A measurement is meaningful.** z.ai mostly says this but I make it explicit: Tier A is a *consequence* of validation, not a starting assumption.

### 3.2 The salary table's deeper weakness: no slope, no replacement level
Beyond "price ≠ wins," salary gives one number per position ("slightly above average player") with **no slope** (how value rises with OVR) and **no replacement level** (what a 70 OVR player is worth). slotWinsPerOvr models exactly slope + baseline. A salary-only table can't capture either. Also salary doesn't model career risk/injury — the sim is one healthy season, so RBs get systematically mispriced (real RB1s get 8.9% of targets + rushing value but market pays less due to career risk). Good catch by z.ai; I add: the sim's honest treatment of RB value may rightly *exceed* the salary table, and that's a legitimate Owner ruling, not an error.

### 3.3 McBride fix should not be TE-specific
Raising TE1 because of McBride invites the same argument for RB1 (Bijan), CB1 (Gonzalez), etc. — the "pile of 600s" the Owner dislikes. The uniform method: measure wins per OVR at every slot from validated mechanics; TE1 lands where the data puts it. If elite-TE volume is real, mechanics+data will show TE1 near WR1 *without* a special case. LABEL: INFERRED (Owner's 6 Nov caution + my audit).

### 3.4 "Display preset" vs engine default
z.ai: ship the Owner's personal table as a display preset ("Model weights"/"Personal weights" buttons exist). My audit shows two different tables in play: `colors/src/engine/slots.ts` design.json (the engine's table) and the Owner's 6 Nov salary table (proposed default). The vlc-v1 prototype `DEFAULT_WEIGHTS` is yet a third (QB 320, WR1 60, TE1 80… — a 700-scale quantized model). Before any "preset" work, we need one canonical answer to: which table is the engine default, which is the user preset, and how do they relate (modelWeights() quantisation contract). P-013 covers this; it's an Owner decision. LABEL: INFERRED.

---

## 4. Improvements to build a better engine (proposals, not product edits)

All below are lane/proposal-level; none touches Football-Sim-PreColors.html or protected constants without Owner approval via P-013.

### 4.1 Decouple L1 / L2 / L3 (one-way calibration)
- L1 Mechanics (RATING_SPECS/DEF_SPECS/PERS_REC/MC + play model): set ONLY from real data (volume shares, EPA/play value, snap shares), never from a weight table.
- L2 Values (`slotWinsPerOvr()` → `modelWeights()` → DEFAULT_WEIGHTS): measured from frozen L1, 700-scale quantisation per AGENTS §3 contract.
- L3 Assignment (FLEX penalties + lineup optimizer): penalties derived from **measured lost value** (sim with star at natural vs flexed slot, price the difference), not hand-tuned to suppress promotions.
- Guard: any future change to L1 that alters measured slot values forces re-measurement of L2 and re-pin of MERGE-MANIFEST hashes in the same commit (AGENTS §3).

### 4.2 Measure the value *curve*, not one point
slotWins20 (70→90) is one slope sample. Add wins-per-OVR at 70/80/90/95/99 per slot to check monotonicity and slope shape. Two slots with equal 70→90 wins can have very different curves (elite TE vs elite WR). This is what salary can't give and mechanics can.

### 4.3 Depth-slot volume model
Allocate targets/snaps by depth slot (WR1/WR2/TE1…) as a function of depth slot + OVR + game script, validated against nflverse depth-chart volume. Makes TE-with-WR1-volume emerge from mechanics, not flex penalties.

### 4.4 Replacement level / WAR baseline
Current baseline is flat 80 OVR everywhere (`slotWins(slot, ovr)` vs all-80). That's not replacement level. Build position-specific replacement (like PFR Approximate Value, position-agnostic fallback) so WAR is comparable across offense/defense/special teams. z.ai's `playerWar()` (claimed in z-post-blue) is the model to port/validate here.

### 4.5 EPA / play-level efficiency
nflverse play-by-play EPA by position/play type, converted to wins with a documented mapping, to validate L1 efficiency mechanics separately from volume mechanics.

### 4.6 Flex penalties from measured lost value
Replace hand-tuned FLEX table with: for each role→slot pair, sim a season with a representative star at natural vs flexed slot on an otherwise-fixed roster; penalty = measured wins lost, rounded (divisible by 2, capped per Owner's −10 preference). Exempt list for deliberate rules (LB interchange, FB). Cap at −10 or Owner's chosen max.

### 4.7 Inject RNG for seeded before/after
V23 task T-20261022-claude-2 (injectable RNG) is the precondition for any statistical regression gate. Until then, only structural evidence (function-body hashes, diffs, table calculations) counts (AGENTS §7).

---

## 5. New tools to test engine veracity (to build in lanes, test, then propose)

None of these exist yet in this tree as delivered tools (flexscan/flextune absent; fitlm.js exists but needs a product HTML and Chromium). Propose each as an inbox WORK item with exact anchors and check commands.

### 5.1 Blind L1 validation harness (highest priority)
- Input: nflverse snap counts, targets/catches/yards, EPA by position, 2021–2025, hash-pinned per season.
- Output: per-slot volume share (targets, yards, snaps) and per-play efficiency from the engine, vs real data, against **pre-registered tolerance bands** (e.g. ±4 percentage points per group), 2024–2025 held out (validation only, never fit).
- Gate: fail if any group breaches tolerance; report, don't auto-adjust.
- Verifier: a seat that authored nothing in the round runs it (AGENTS §1 Verifier).
- Status: pre-registration committed (bias-pre-registration-2026-11-07.md); harness not yet built.

### 5.2 Triangulation table generator
- For every slot: weight under each anchor — Tier A (measured from frozen L1), volume-derived (nflverse shares × efficiency), EPA/AV-derived (PFR Approximate Value, position-agnostic fallback), salary-derived (Owner's 6 Nov table).
- Report rank correlations between anchors and the spread per slot.
- Slots where anchors agree → settled by data, no ruling needed.
- Slots where they disagree → explicit Owner ruling, disagreement documented (preference enters only as a recorded ruling, never silent recalibration).
- Status: not built; can prototype in lane with existing data files.

### 5.3 Anchor data pipeline (nflverse)
- Download nflverse releases (player_stats_season, depth_charts, snap_counts, play-by-play EPA), sha256-pin each, aggregate to depth-slot volume shares by season.
- Deterministic depth mapping (modal depth per player; ties by targets then gsis_id), documented.
- Refresh each season; report drift vs previous, don't auto-apply to constants.
- Status: not built; z.ai claims network access works in their sandbox (REPORTED).

### 5.4 Flex / promotion scanner (rebuild)
- z.ai and earlier chat both reference flexscan/flextune; absent here. Rebuild: scan seeded drafts for any 85+ OVR player placed off-role into a heavier slot ("promotion"), count per rule, with examples.
- Gate: flag any rule with promotions above a threshold; do not chase zero (whack-a-mole bottoms at cap).
- Status: prototype as flexweight.mjs exists (committed) — can extend to a scanner.

### 5.5 Seeded before/after comparator
- Once injectable RNG lands (V23), compare seeded runs old vs new build for any number change; structural-only evidence until then.
- Status: blocked on T-20261022-claude-2.

### 5.6 Regression / structural gate
- Function-body hashes + table diffs before/after any L1/L2/L3 change; enforce that accepted-changed set equals touched functions (funcdiff pattern from tests/CONTRACT.md C6).
- Status: pattern exists in tests/ contract; not yet implemented as a gate.

---

## 6. Brainstorming / new ideas (longer-term, unvalidated)

These are INFERRED/UNKNOWN — ideas to evaluate, not commitments.

- **Position-specific Approximate Value:** PFR AV is position-agnostic; build position-specific replacement levels (replacement QB ≠ replacement K) so cross-position comparison is honest.
- **Game-script volume:** targets/snaps depend on score/time; model volume as f(depth slot, OVR, game script) and validate against nflverse situation splits.
- **Curve-based quantisation:** instead of quantising one 70→90 number, quantise the whole curve (70/80/90/95/99) and check for inversions across the curve, not just at one point.
- **Anchor-disagreement ruling log:** a standing file where, whenever Tier A/B/C/D disagree on a slot, the Owner records the ruling and reasoning. Preference enters here explicitly, never silently.
- **Season cadence re-validation:** after each NFL season, re-run anchors and report which slots drifted; present drift to Owner as candidate rulings, not auto-applied changes.
- **WAR consistency check:** sum of team WAR vs actual team wins (2025 standings in tests/2025_standings.js) — a season-level sanity check on L2.
- **Public-data-only engine mode:** an internal flag that runs the engine with anchors as the only external input, to prove nothing is hard-coded to salary/personal preference.

---

## 7. Concrete next steps (proposals; nothing assigned, nothing waits on a seat)

1. **[OWNER]** Push or zip the 7 Nov workspace (NOW.md, tools/mathlab/*, flex.json, claude/rulings/*) so the council can audit the live L1 fit. Also confirm whether origin/council/zai (25e3b2f) should be merged/rebased for the slotWinsPerOvr/playerWar review z.ai flagged (their inbox/README.md conflict).
2. **[OWNER]** Rule on z.ai's two questions: (a) engine default = Tier A measured weights after L1 validation, personal table = display preset; (b) drop "raise flex penalties until zero 85+ cases" in favor of measured-lost-value flex pricing, keeping −10 cap as interim guard.
3. **Any seat:** extend the committed pre-registration with z.ai's layer-classification table (parameter · layer · fitted-to-what · when · by whom); quarantine anything fitted to the 6 Nov table.
4. **Any seat:** build the blind L1 validation harness (nflverse anchors, pre-registered tolerances, held-out 2024–2025); Verifier seat runs the gate.
5. **Architect (when workspace visible):** run L1/L2/L3 parameter audit; then re-run derivedWeights/slotWinsPerOvr and produce the triangulation table for Owner rulings.
6. **Then only:** any change to DEFAULT_WEIGHTS/FLEX/NATURAL_SLOT_MAP/MC/PLAN_K/RATING_SPECS goes through P-013 (Owner approval) with MERGE-MANIFEST re-pin in the same commit.

---

## 8. Evidence labels used in this report

- **VERIFIED**: I read the named file/command in this tree (my audit files, fitlm.js, design.json, specs.ts, flex.json, flexweight.mjs, PRIORITIES.md P-013, AGENTS.md §3/§7/§9, git logs, git ls-remote).
- **REPORTED**: z.ai's advisory claims I cannot see (calibrate-weights.mjs, z-post-blue source, nflverse numbers, anchor_demo scripts, flexscan/flextune existence, network access).
- **INFERRED**: reasoned from verified facts (circularity conclusion, Tier A not-yet-trustworthy ordering, salary slope/replacement weakness, McBride-not-group-bias caution).
- **UNKNOWN**: flexscan/flextune presence outside this tree; contents of z.ai's sandbox.

I will not edit any product file, protected constant, AGENTS.md, or PRIORITIES.md. All proposals above are inbox/lane-level; the Architect integrates, the Owner approves P-013.
