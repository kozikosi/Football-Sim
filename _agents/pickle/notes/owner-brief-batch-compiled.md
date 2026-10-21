# Owner brief — parallel batch, compiled

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899), batch dispatch coordinator | TASK: compile batch returns into a ≤5-item Owner brief | DATE: 2026-10-21 04:55 UTC

**What this is.** One page for the Owner, built only from returns I could read and, where possible, re-measure myself. Every line is labelled **VERIFIED** (I reproduced it), **REPORTED** (a seat's claim I did not re-measure), or **UNKNOWN**. Gaps are declared, not hidden. This brief **does not duplicate** the decisions MOC and BOC already raised; those are theirs.

---

## The five items, at a glance

| # | Item | Who owns it | State |
|---|---|---|---|
| 1 | **390 px preseason CTA sits below the fold** | Architect (Claude), decision D2 | **VERIFIED — two independent measurements agree** |
| 2 | **The NFL pool is smaller than the docs say** | Architect / pool owner | **VERIFIED — 1,105 records, not ~1,270** |
| 3 | **The batch itself sprawled into five coordinators** | Owner (working-rules question) | **VERIFIED observation** |
| 4 | **PR #4 intake is byte-clean and well-separated** | Owner (approval of intake) | **VERIFIED — 9/9 hashes, 0 invented values** |
| 5 | **Two seats returned something other than their assignment** | Owner (coverage) | **VERIFIED — GLM and Lightning unreturned** |

---

## 1. The 390 px preseason primary action is below the fold — VERIFIED, twice

At a 390 × 844 viewport, on the merge candidate (`40233d6b…`), the preseason primary action `#startSeasonBtn` measures:

```
bounds: left 36, right 194, top 963, bottom 1007   (viewport height 844)
horizontal overflow: 0 px   ·   document width == viewport width == 390
page errors: 0
```

**It is not an overflow bug and not a broken layout.** The button is horizontally centred and nothing is clipped. It is simply **one screen below the fold** — the next thing the user must press requires a scroll to reach. Its centre is additionally covered (`elementFromPoint` at the centre returns an `LI`).

**Two independent measurements agree.** DS recorded `top=963.03, bottom=1007.03` (REPORTED, its `open-decisions-consolidated.md`); I measured `top 963, bottom 1007` myself on a clean serve (VERIFIED, M-139). **The same numbers from two seats.**

**It is a real finding, not a script artifact.** The v2 harness's `checkViewportAt390` resizes to 390 × 844, **scrolls to (0,0)**, and then measures — so it checks the state a user actually first sees. I confirmed this in the script (l.283–287). **Ultra's `responsive-390-audit: FAIL` is sound.**

**Not my call.** Whether to fix it in V21, record an exception, or demote the clause is the Architect's and Owner's. DS recommends fixing it in V21 as part of D2/D5; the merge can proceed with the finding recorded **provided no PASS is claimed** (the run is FAIL, and the earlier gate never asserted the clause at all — line 410 checks only clipped/covered/unscrollable).

## 2. The NFL player pool is 1,105 records, not the ~1,270 the documents imply — VERIFIED

I ran Super's `pool-analysis.js` against the merge candidate (VERIFIED, reproduced). It counts **1,105** `PLAYERS` records. `AGENTS.md` says "1,200+", and the batch brief has been circulating "~1,270". **Neither matches the candidate.**

Also VERIFIED by the same run:
- **C (center) and K (kicker): 0 records in `PLAYERS`** — they exist only in `TEAM_DATA`. Even the scarce-slot math is therefore not what a plain reading suggests.
- 832 starters are drafted (26 slots × 32 teams) from a 1,105-record pool — a **273-record surplus**, but heavily concentrated (WR +119, CB +109, DT +93) while **SAM is short by 27** (5 records vs 32 needed).

**Why this matters for the all-time work.** Every pool-size target the Owner sets (~1,500–2,000/sport) is being sized against a current pool whose true count is now measured at 1,105. **The count is Super's finding, measured; I reproduced it and it holds.** What to do about it is the Architect's.

## 3. The batch sprawled into five coordinators off one broadcast — VERIFIED observation

I dispatched ten recipients. DS reports that **five sessions independently became coordinators off the same broadcast** (MOC, Pickle, VLOC, MiMo, LongCat), and DS refused to stack assignments on sessions already mid-task under two owners. I saw this live: MOC ran an independent A-series and I received its A3.

DS sent **1 of its 9** planned sends and delivered four artifacts instead. **This is a coordination finding the Owner should see** — the batch produced coverage but at the cost of several seats competing for the same lane. **The remedy is the Owner's call, not mine.**

## 4. PR #4's all-time intake is byte-clean, separated, and free of invented values — VERIFIED

My independent re-audit (M-137, `_agents/pickle/notes/pr4-intake-integrity-audit.md`):
- **All 9 SHA-256 and all 9 byte counts reproduce exactly** from the ref — the "preserved byte-for-byte" claim holds without exception.
- **One annotation gap, not a defect:** the manifest's `lines` field mixes `wc -l` (7 of 9) with `wc -l + 1` for two files that lack a trailing newline. Documented, not a data error.
- Sport separation clean; **zero invented ratings/seasons/teams** (blank in 0/18 rows = all 18 blank); all 18 omission candidates absent from the Owner's notes **and** present on the cited NFL 100 roster (17/17 fetched and matched) and NBA 75 (cited; page not rendered by me — **UNKNOWN**).

**This clears the intake tree only.** The separately-reported invented-ratings files (`sports/football/ratings.json`) are **not part of PR #4** and were BOC's item — **since quarantined by MiMo per VLOC (M-148): the canonical paths are stubs, originals preserved byte-for-byte.**

## 5. Two of ten recipients returned something other than their assignment — VERIFIED

- **GLM** — no Q5 output found in its lane; its newest work is an unrelated index-recovery task. **Assignment UNANSWERED.**
- **Lightning** — delivered an NBA 2K intake spec (`nba2k-intake-spec.md`, `e5811a50…` — its own hashes verify) instead of the E2E **Run B** closure I assigned. **The "run B" in its receipt is a run of hashing commands, not the E2E run.** **Assignment UNANSWERED.**

Returns received and used: BOC (verified, M-133), Ultra (BOC→ reproduced, M-139), DS (read, four files), Super (pool analysis, reproduced above). **Pending at time of writing: MOC (returned separately — see its own M-notes), MiMo, VLOC, LongCat (still busy).**

---

## What I deliberately did not do

No product edit, no pool edit, no other seat's file, no shared-doc edit beyond my own bulletin messages, no push/merge/release. I did not decide V21 scope, architecture, layout/CSS, protected constants, model math, rating rules, or any acceptance check. I did not claim a PASS anywhere; item 1 is a FAIL and stays a FAIL.

## Appendix — the transferable mechanism (LongCat, VERIFIED line-for-line)

LongCat's flex-mechanism analysis (`_agents/longcat/notes/flex-mechanism.md`) is the backing for priorities 2–5. I reproduced every line it cites on `40233d6b…` — **8 of 8 function boundaries exact** (`NATURAL_SLOT_MAP` l.931–938, `FLEX` l.940–952, `EMERGENCY_PENALTY=8` l.953, `flexRule` l.955–961, `POS_SLOT_MAP` l.962–971, `flexPenaltyFor` l.973–976, `effOvr` l.978–981, `optimalLineup` l.1206–1213) — and confirmed the structural claims: `QB:{}` and `K:{}` are empty (hard constraints), and `flexRule` returns `null` for an absent key (**absent = illegal**).

**The mechanism, stated so it travels:** **soft constraints are penalties inside the objective; hard constraints are exclusions from eligibility**; then assign with the Hungarian solver; `effOvr` is the single number the rest of the engine consumes. This is a *mechanism*, not a football one.

**What breaks per sport (LongCat's own labels kept):** football lines **VERIFIED**; generalised model **INFERRED**; NBA/soccer sketches **INFERRED and explicitly not proposals**. The largest structural break is **soccer's formation-dependent slot set** (`S` becomes per-formation, so the natural map, flex table, family map and eligibility map all become formation-parameterised). The hardest conceptual break is **basketball's hard constraints being roles (rim protector, primary handler), not positions** — a position→slots table cannot express them.

**What this does not settle, and must not be read as settling:** whether the Owner wants a **role axis** is **UNKNOWN — a decision, the Owner's**. The protected constants were **quoted, never proposed for change.**

## Appendix 2 — what drives Wins (GLM, VERIFIED line-for-line)

GLM's metrics-vs-Wins audit (`_agents/glm/notes/football-metrics-wins-audit.md`) classifies every displayed stat by whether it is **on the win path**, **downstream of it**, or **outside it**. I reproduced its cited lines on `40233d6b…` — **9 of 9 exact** (`modelWeights` 459, wins↔points bridge `k = 17/POINTS_PER_WIN` 1329, `slotWinsPerOvr` 1346, `teamRatings` 1988, `matchupModel` 2100, `simulateGame` 2286, `POINTS_PER_WIN = 32.5` 4865, `advancedStatsHTML` 4317, `render100` 6043).

**The chain:** `PLAYERS` ovr → `optimalLineup` → `teamRatings` (nine units) → `matchupModel` (expected yards/TO/sacks) → `simulateGame` (`realize`→`pts`) → score → W/L; with `POINTS_PER_WIN = 32.5` the wins↔points bridge. **Realized box scores are the engine's output** — displayed and aggregated, never fed back.

**The Owner-facing nuance (VERIFIED):** the **personal weight sliders steer the draft's valuations, not the games.** Simulations always run on `RATING_SPECS`, so the published 0–700 weights explain *draft value and projected wins*, not *realized games*.

**One correction to GLM, applied:** its table lumped `inj/str/agi/cod/awr` as "decorative." Accurate is: **`inj` and `str` have zero engine consumers; `spd/agi/cod/awr` have one narrow consumer** — `returnerRating` l.2622 reads `p[4]/p[6]/p[7]/p[9]`. GLM's publication rule (a stat may be labeled "explaining wins" only with a named consumer and the coefficient direction) stands.

## Appendix 3 — what the football engine CANNOT express for basketball (MiMo, VERIFIED line-for-line)

MiMo's NBA design intake (`_agents/mimo/notes/nba-draft-rotation-comparison.md`) is the backing for priority 3. I verified its source artifact and its citations: `OWNER-DESIGN-DIRECTION.md` on PR #4's ref is **5,639 B, 63 lines, sha256 `42c27557…`** (all three match its claim), and **all 10 football-math lines hold** on `40233d6b…` (`teamRatings` 1988–2002, `PERS` 2028, `DEF_PKG` 2036, `PERS_REC` 2038–2043, `covBase` CB1 = 1.4 at 2047, `RUSH_BASE/PASS_BASE` 2089, `PT_RUSH 0.040` / `PT_PASS 0.070` 2090, `matchupModel` 2100).

**The confirmed gaps (VERIFIED by line):**
1. **Rim protection has no channel.** `teamRatings` builds fixed unit scalars compared league-relative; `coverage` is one team scalar (CB1 weighted 1.4). Nothing in `MC`/`PLAN_K` is a player-vs-attacker interaction term.
2. **No shot-attempt model.** Scoring is linear yardage→points (`BASE_PTS + PT_RUSH*(expRush−RUSH_BASE) + …`, l.2146) with no attempt/miss/distance variable — so **three-point shooting, TS+ and eFG%** (which need FGA/3PM/FTA) require a layer football never had.
3. **No possession/pace denominator** (football's drive structure is implied by outputs; basketball possessions are the unit).
4. **No n-man set property** for positionless lineups (combination effects exist only narrowly: `rbHeavy`, `te1/te2`, `PERS_REC`).
5. **No minutes / foul-trouble / within-game load state** — `optimalLineup` assigns once; substitutions are game-plan-level.

**What MiMo says DOES generalize:** OVR summary, snake + value-over-replacement CPU logic, replacement floors, the flex *mechanism* (not its table), independent offense/defense plans, and the weights↔wins discipline re-derived. **This converges with LongCat's Appendix 1 from a different direction.**

**Its five open decisions (roster size, rotation control, attributes beyond OVR, position-vs-flex, wins metrics) are a PROPOSAL with defaults and cost-of-wrong — not a decision.** Roster size (MiMo defaults 12), rotation control (computer everywhere + user override on the user's team), the position-constraint balance and the metric freeze are the **Owner's**; they align with DS's D3. **I decide none of them.**

## What remains unverified

- The NBA 75 page render for Sam Jones — **UNKNOWN**.
- Whether the 17-name NFL omission set is exhaustive for the NFL 100 list — **UNKNOWN**.
- MiMo and VLOC returns — **MiMo has since returned** (quarantine execution + soccer options; M-148); **VLOC not returned** (its earlier M-113 is an independent review, not a return of this batch).
- **GLM** — **RETURNED this batch** (verified, M-143): `football-metrics-wins-audit.md` (`294a6124b369`, 7,636 B) — all 9 cited lines exact; one overstatement corrected (`spd/agi/cod/awr` are narrowly causal via `returnerRating` l.2622, not fully decorative). GLM also delivered five other artifacts to other seats. **Lightning** — delivered an NBA 2K spec, not the E2E Run B closure; **UNANSWERED**.
- GLM's architecture option set (D1's second opinion) — **not produced**.
