SPEAKER: GLM | ROLE: council member | TASK: innovate/brainstorm/plan — next prompts to Z.ai (Part B: what would make the engine dynamic that nobody has proposed) | DATE: 2026-11-15T11:40Z
FOR: R-13 (corrected 2026-11-16 from P-345 per prompt v4 Part 17) · the Owner's 11 Nov sentence ("Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc.")

Part A (the three-list comparison) is filed separately: `inbox/20261115-1135-glm-P-345-axis-comparison.md`. Everything here is analysis — no engine edits; `colors/` is Claude's. The walk was done by grep over the engine at `architect/engine-and-seats` `03640133`, the files Z.ai named plus `draft/value/slots/lineup`.

VERIFIED (my runs, cwd wt/glm, `git show 03640133:colors/src/sports/nfl/engine/<file> | grep -nE '<pattern>'`; commit ref `03640133`):
- matchup.ts:5 PERS imported; :17 `offShift` = PERS[po.pers].run + STRAT tilt; :29 softCap; :41 `olRun = O.olRun + PERS[p].tbw*(blk-75)*PLAN_K.kBlock`; :75–77 schemeRun/Pass by own personnel + nickel vs heavy; :87–88 softCap on the net units (comment: "a better defender is always worth something, even against an elite offense (audit 2)").
- specs.ts:47 PERS table `{label, run, runB, passB, heavy, tbw, pc}`; :30 PERS_REC.
- drives.ts:48 `GameOptions {playoff; homeField?; otLimit?}`; :135 the pass/run k-table "a design, not a fit… `diff` is own score minus the other's"; :238 drive seconds allocated mechanically; :247 `otLimit ?? (opts.playoff ? 900 : 600)`; :278–282 sudden death, tie (regular) vs new period (playoff).
- season.ts:36 simulateSeason opts.homeField; :60 **Super Bowl `homeField: 0`** (neutral site) — playoff-graded structure already in the engine.
- schedule.ts:5 "18 weeks, one bye each (weeks 5–14)"; :85–92 bye assignment; :38 sigma() is schedule rotation (not margin noise).
- margin.ts:14–22 MARGIN_BINS / SOURCE_PCT / TARGET_FINAL_PCT / OT_RATE_PCT 5.88 / COUPLING — **one static league-wide margin distribution for every game**.
- flex.ts:34 `EMERGENCY_PENALTY = 8`; :55–56 legality (QB never legal).
- lineup.ts:20–22 ILLEGAL/PLAYS/EMERGENCY costs; :62 lineup value = Σ slot.weight × effOvr; :70 "no best base… a formation changes who stands in a spot, never what the spot is worth".
- value.ts:12–18 bestUnitPts / netPts; draft.ts:67 replacement level per role; plans.ts:14–16 best-response argmax; kicking.ts: zero hits for roof/wind/temp; returner.ts:2 best-by-value returner.

## 1. The clause walk — the Owner's sentence interrogated in the engine at `03640133`

| Clause | Constant / function / nothing? | Where (file:line) | What it says about measurability |
|---|---|---|---|
| **personnel** | **function** — own personnel drives scheme table | `specs.ts:47` PERS · `matchup.ts:17,41,75–77` | Already dynamic in the exact sense the Owner means; the axis question is whether the *table values* (run/pass base, tbw) are calibrated or design (Z.ai D.9: DATA-FIT queue) |
| **situations** | **function** — score diff, quarter, distance drive plan + margin distribution | `plans.ts:14–16` · `drives.ts:135` (k-table by `diff`) · `margin.ts` (static distribution) | Situation tables exist but are **design, not fit** (`drives.ts:135` says so verbatim); margin model is ONE static distribution |
| **rivalry** | **nothing** — zero grep hits for rival/rivalry in all engine files I swept | — (absent) | Measurable only as the policy proxy (repeat-matchup cells); see B9 |
| **playoffs** | **partially function, already** — the engine ALREADY fluctuates by playoff flag | `drives.ts:48,247,278–282` (OT 900 vs 600; ties) · `season.ts:60` (SB homeField 0) | Nobody's list noticed the engine already does this; the open half is whether the *calibration* (rates, σ) is playoff-graded — B10 |
| **opponent's structure** | **partial function** — opponent enters only through unit-quality in the matchup kernel | `matchup.ts:87–88` (softCap on defender units vs offense) | The kernel is opponent-aware at the *quality* level; the **scheme/personnel *shape* of the opponent never shifts the offense's play-mix prior** — the missing half is B4 |
| **key players** | **function** — each player's OVR × slot weight, lineup value; **no per-player state beyond OVR** | `lineup.ts:62` · `value.ts:12–18` · `draft.ts:67` | No form, no clutch, no identity weighting beyond OVR; the legitimate unlock is Claude's L1 join (Part A row 20) |
| **aggressiveness** | **constant** — the go/pass tilt table is a design table; no per-team or context-graded aggressiveness | `drives.ts:135` ("a design, not a fit") | Measurable as revealed-preference go-rates (Part A row 1); a per-roster index is NOT identifiable (see B5) |
| **dominant groups** | **partial constant** — softCap caps how dominant one unit may be; EMERGENCY_PENALTY fixed | `matchup.ts:84–88` · `flex.ts:34` | The engine treats dominance as a **mean cap**, never as a **variance term** — the unexamined object is B8 |
| **etc.** | weather/venue: **nothing** (zero hits in kicking/matchup); kick menu: static (REPORTED-by-zai, `matchup.ts:117` extraPts); returner: static best-by-value (`returner.ts:2`); rest: schedule-only (`schedule.ts:5,85–92`) | — | Venue/kick-menu are the measurable etc.-candidates (Part A rows 8, 19); rest has an engine consumer gap worth naming |

**Reading of the walk:** the engine's fluctuation surface is currently: personnel package (own-side), situation (design tables), opponent unit quality (capped), playoff flag (OT/neutrality), and nothing else. Every clause the Owner named that is NOT in that list — rivalry, opponent *shape*, key-player state, aggressiveness grading, dominant-group variance — is either measurable from the P-344 data or is not measurable at all; nothing in between. Two findings the walk adds that no list had: **the OT structure already fluctuates by playoff flag**, and **the margin model is one static league-wide distribution** (so every variance axis — σ, compression, regime σ — enters at exactly one place, `margin.ts`).

## 2. Candidates (each with the four elements; kill them if they don't survive)

Every proposal: data file · null case · held-out rule · display class · fail case (the registry DEAD row as it would read). Registry status values per Claude §3.4: NOT_RUN / ALIVE / DEAD, display STATIC/ARROW/HIDDEN.

### B1 — Tempo / drive budget (merge Claude#3 + Z.ai D.9#6 — one axis, two measures)
- **Data:** P-344 `drives` (possessions per team-game) + pbp seconds-per-play.
- **Null:** possessions-per-game distribution matches the static drive budget; the **between-team SD = λ-budget law must still hold** (D.9's standing check — a tempo axis that redistributes possessions without preserving the variance law is misfit).
- **Held-out:** possessions-distribution fit out-of-sample by season.
- **Display:** HIDDEN.
- **Fail case:** registry row `tempo/drive-budget · DATA-FIT · HIDDEN · DEAD · evidence: possession SD ≠ λ-budget law`.

### B2 — Playoff stakes on the automatics (Part A row 1's second context variable, not a new axis)
- **Data:** pbp 4th-down/2pt go-rates in one-score playoff games vs matched regular games.
- **Null:** go-rate cells identical playoff vs regular after situation matching.
- **Held-out:** wrong-strict-pairs, playoff cell.
- **Display:** HIDDEN.
- **Fail case:** row stays static, `automatics-stakes · DATA-FIT · HIDDEN · DEAD · go-rates match across stakes`.
- **Note:** this is Claude L2(a) restated at the policy layer (Part A collapse #5) — one table, two context arguments.

### B3 — Kick attempt under environment (fold into Part A row 8's venue axis)
- **Data:** nflverse roof/surface/wind/temp + pbp FG/XP decisions.
- **Null:** FG/XP choice rates identical across environment cells.
- **Held-out:** K-marginal points by environment cell out-of-sample.
- **Display:** HIDDEN.
- **Fail case:** `venue · DATA-FIT · HIDDEN · DEAD · kick menu flat across cells`.
- **Note:** Claude's icing (expected DEAD) is the timeout-decision half — record it DEAD separately; the venue axis keeps only the attempt-decision cut.

### B4 — Opponent's structure as play-calling input (the clause nobody operationalised) — **my strongest mean-axis candidate**
- **Data:** P-344 participation `defenders_in_box` + `pass_rushers` (478,989 rows, 2023–25, ~7% missing) + pbp play outcomes.
- **Null:** pass/run mix identical across opponent-front cells (base vs nickel-heavy fronts, box counts) after controlling for own personnel and score state.
- **Held-out:** wrong-strict-pairs on 4th-down/2pt calls AND on pass-rate cells, front-classification out-of-sample.
- **Display:** HIDDEN (the CPU's prior shifts; the user sees outcomes, not a dial).
- **Fail case:** `opp-structure · DATA-FIT · HIDDEN · DEAD · mix flat across front cells`.
- **Sequencing:** the **stat-only cut can run NOW** (count cells from participation + pbp — no Lab needed); the engine-level test (does the shifted prior move win%) waits for Phase 1c. Say that in the prompt so nobody burns a Lab sitting early.

### B5 — Per-roster aggressiveness index — **REJECTED on parsimony (and identification)**
- The k-table is already design-not-fit (`drives.ts:135`); a per-team index would double the garden of constants Z.ai warned about, and historical go-rates confound policy with situation mix — the team effect and the situation effect are not separable without a structure nobody has proposed. The two-regime frame (D.9 #5) is the parsimonious container if anything is ever measured. **I do not propose this axis.** Registry: do not add.

### B6 — Weather — OWNER-CALL
- Same data as row 8/venue. Not in the Owner's vocabulary; propose only if he says "weather" is in his "etc.". Measurement would be the roof/temp/wind cuts of B3. No registry row until the Owner calls.

### B7 — Bye/rest × travel interaction (one cut inside Part A row 9)
- **Data:** nflverse schedule (game dates/times, home/away teams) — timezone delta and short-week derivable.
- **Null:** no performance difference in short-week-cross-country games vs matched controls.
- **Held-out:** rest/travel cells out-of-sample.
- **Display:** HIDDEN.
- **Fail case:** `rest-travel · DATA-FIT · HIDDEN · DEAD · matched cells identical`.

### B8 — "Dominant groups" as a **covariance** term: OL×DLine pairing variance — **the highest-leverage genuinely new axis**
- **The claim:** the Owner's clause says *dominant groups* — the engine implements it as a **mean cap** (softCap) and never asks whether dominance changes **variance**. A great OL facing a great DLine might produce fewer, but *more variable*, outcomes than a mismatch pair — and the entire margin model is currently ONE static league-wide distribution (`margin.ts:16–22`), so a variance term has exactly one honest home. This is the first proposed axis that is not a mean-shift.
- **Data:** participation (line assignments / `defenders_in_box` / `pass_rushers`) + play outcomes (sack, EPA/yards per play), folded over OL×DLine pairing cells at unit level (Claude's own note: OL as a unit — individual linemen are collinear).
- **Null:** after controlling for both units' mean quality, play-outcome variance (and game margin variance) is constant across pairing-strength cells — homoskedasticity.
- **Held-out:** variance-ratio CI per pairing quartile, out-of-sample seasons; the sim analogue is wrong-strict-pairs on *outcomes given the matchup class* (does the engine's win-probability curve widen where the data's does?).
- **Display:** HIDDEN (variance shape); an ARROW candidate ("strength mismatch") only if it survives and the Owner asks.
- **Fail case:** `matchup-variance · DATA-FIT · HIDDEN · DEAD · variance ratio CI includes 1 in every pairing cell`.
- **Why it might be the one:** it enters `margin.ts` (one place), it reuses the participation join the plan already carries (L1), and it is falsifiable with a variance ratio — the cheapest decisive test of any axis in this filing.

### B9 — Rivalry-adjusted policy (the clause nobody has measured, Part A row 21)
- **Data:** P-344 pbp + schedule (repeat-matchup pairs within season; division membership).
- **Null:** play-calling (pass rate, go-for-it, 2-pt) identical in rivalry games vs quality-matched non-rivalry controls. The OUTCOME half (divisional upsets +1.5 pp) is already DEAD in-band (D.8) — do not re-measure outcomes; the POLICY half is unmeasured.
- **Held-out:** wrong-strict-pairs, rivalry cells.
- **Display:** HIDDEN.
- **Fail case:** `rivalry-policy · DATA-FIT · HIDDEN · DEAD · policy flat in matched cells`.
- **Honest unlock note:** rivalry *intensity* itself is not in any dataset; only the structural proxy (division + rematch) exists. If the Owner wants more, the data does not have it — say so in the prompt.

### B10 — Complete the playoff structure the engine already has (Part A row 22)
- **The finding:** `drives.ts:247` (OT 900 vs 600), `drives.ts:278–282` (ties vs new periods), `season.ts:60` (SB neutral) — the engine **already** playoff-grades three things. Nobody's list treats playoffs as partially present. The proposal is to finish the thought coherently: grade **HFA by round** (wildcard/div/conference/SB — the controlled version of D.8's uncontrolled cut) and **margin σ by round** in the same cut.
- **Data:** pbp by round (P-344).
- **Null:** current constants (one HFA, one σ) reproduce all round cells.
- **Held-out:** round cells out-of-sample; strength-control mandatory (pre-game spread or season-to-date differential — the D.8 caveat applies verbatim until re-run).
- **Display:** HIDDEN.
- **Fail case:** `playoff-structure · DATA-FIT · HIDDEN · DEAD · rounds indistinguishable under the control`.

## 3. What I am NOT proposing (and why — so nobody files them for me)

- **Per-roster aggressiveness (B5):** unidentified + parsimony (above).
- **Injuries, per-player clutch, flex-price fluctuation, re-opened calibration:** ruled off (ERNIE §6 list; I honour all of it).
- **A fourth static-axis list:** Part A is the comparison; the four `[NEW]` rows there are argued, not invented.
- **Implementation:** everything here is analysis. B4's stat-only cut is executable by Z.ai on a branch without touching the engine; the rest waits for Owner/Architect rulings.

## CONTINUATION-DELTAS (for prompt-zai-continuation-v3 §12 append)

1. **STALE ITEMS:** §5 SAVE-1 write median — **stays with Z.ai in the continuation prompt as-is** (assigned to his lane; whether he completed it before the interruption is UNKNOWN — treat as not-done until his own manifest says otherwise). The v4 byte-check means **C5b (101 → 99, DS's mechanism) and C-engine-suite (log the count) are owed** — owed, not stale, but they belong in §12 as concrete asks. Slice 3 (hydration + board chrome, P-316): status UNKNOWN — no receipts either way. §9.6 Slice 2 still waits on Claude's SaveRecord (unchanged).
2. **STILL-BLOCKED:** Z.ai's push credentials (every delivery needs a courier — the Part D fix is pending, DS's suggested lane); `P-355`–`P-359` absent from live `QUEUE.md` (only MUSE can add); Owner relays are the only path to Z.ai.
3. **NEW INPUTS FOR Z.AI:** `council/glm` `inbox/20261115-1135-glm-P-345-axis-comparison.md` (dedup table — reference implementation for execution-prompt A) · `council/glm` `inbox/20261115-1136-glm-dynamic-axis-proposals.md` (clause walk + new axes — material for execution-prompt B; B4's stat-only cut and B10's controlled playoff cut are the two Z.ai-ready measurements).
4. **Z.AI-INTERRUPTION STATE:** the v4 framework-eval landed before the interruption (`_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` @ `council/ernie` `309caced`; DS's byte-check + ERNIE's review are the receipts: 44/44 manifest, 323/323 tests re-run @ `46aafad9`, both scaffolds 37/28). Where he stopped inside the v2 continuation itself: **UNKNOWN** — treat every v2/v3 item as not-done until proven otherwise.
5. **WHAT THE OWNER SHOULD TELL HIM FIRST:** "Your v4 landed and was byte-checked clean (44/44 manifest, 323/323 re-run); nobody knows which v2-continuation items you finished before the interruption — reply with a one-line status per v2 item (done/not-done), manifest per the `git ls-files` rule, and do not redo the pool gap (closed by VL, reproduced by ERNIE)."

---
CORRECTION 2026-11-16 (prompt v4 Part 17): FOR corrected P-345 → R-13. The 2026-11-15 direction round is framework-comparison work (Owner ruling R-13); P-345 is the play-level-engine innovation round.
