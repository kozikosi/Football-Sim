# BASELINE VERIFICATION REPORT — Football-Sim-PreColors.html
**Verified by:** Council Coordinator (independent clone of `kozikosi/Football-Sim` @ `d1a7f62`)
**Date:** 2026-10-25 · **Method:** direct `git clone` → `sha256sum` / `grep` / targeted source reads

---

## 1. Baseline identity — CONFIRMED

| Property | Claimed | Measured | Verdict |
|---|---|---|---|
| Path | `_agents/pickle/builds/Football-Sim-PreColors.html` | exists | ✅ |
| SHA-256 | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | identical | ✅ |
| Git blob | `1087b6563ae614e45f580cbcc3480147202d98de` (GPT) | identical | ✅ |
| Size | "657 KB" / 657,486 B (Grok) | **657,486 B** | ✅ |
| Lines | 6,554 (verification doc) / 6,553 (Grok) | **6,553** | Grok right; 6,554 = off-by-one (trailing newline) |
| Repo HEAD | — | `d1a7f62` (PROJECT-KNOWLEDGE update) | recorded |

## 2. Claim-by-claim matrix (document vs source)

| # | Claim (source) | Measured | Verdict |
|---|---|---|---|
| 1 | 1 doctype, 2 `<style>`, 1 `<script>` (verification doc) | 1 / 2 / 1 | ✅ exact |
| 2 | `<style>` sits **before** `<head>` at line 3 (Qwen, Grok, Z) | line 3, hoisted by parser | ✅ confirmed — plus **new finding** below |
| 3 | `Math.random` = 56 occurrences (Z, verification doc) vs 38 sites (Grok) | **56 occurrences on 38 lines** | ✅ both right — different counting units |
| 4 | `MutationObserver` = 2, at ~6446 / ~6547 (Z, Gemini) | 6446 (highlighter) & 6547 (stacker), both `document.body`-wide | ✅ exact |
| 5 | `localStorage` = 0 (all) | 0 | ✅ |
| 6 | SIM-CORE markers = 0; headless entry points absent (all) | 0; `buildDraftState`/`simulateDraftHeadless`/`buildLeagueFromDraft` absent | ✅ — `tests/CONTRACT.md` C2 demands them |
| 7 | `TEAM_COLORS`/`applyTeamColors` = 0 (Grok) | 0 | ✅ |
| 8 | `rWeights` crash resolved (Z) vs open (tracker KI-006) | 0 occurrences; `render100` (L6043) is time-sliced | ✅ Z right — **tracker stale** |
| 9 | `msChecked` replaced (Z) vs open (tracker KI-007) | 0 occurrences | ✅ Z right — tracker stale |
| 10 | Dual doctype resolved (Z, Grok) vs open (tracker KI-003/004) | single doctype, single `<html>`, one `color-scheme: light dark` | ✅ Z/Grok right — tracker stale |
| 11 | `goSeason` dead code at 846–857 (Z) | `goSeason()` L846; only 2 refs (def + self-reference); guards on `#seasonHost` which has no external creator | ✅ confirmed dead (R-16 decision pending) |
| 12 | Three `@media (max-width:760px)` blocks (Qwen) | **four** — L153 (single-line) + L255/274/290 (multi-line) | ⚠️ partially confirmed |
| 13 | `PLAYERS` ≈1,200 records at L449; `DEFAULT_WEIGHTS` at L452 with QB:320, DE1:350 (Qwen) | exactly **1,200** entries; L449/L452; QB:320, DE1:350, CB1:350 | ✅ exact |
| 14 | 83 KB single-line data (Z) | PLAYERS ≈83 KB **plus** `TEAM_DATA` ≈44 KB at L450 → ~127 KB on two lines (tracker KI-010: 126,222 B) | ✅ both right |
| 15 | `cpuPick` ~L1400; R1 floor 90, R2–3 within 8 of top, first-at-position pruning R1–3, replacement recalc every 6 picks, pool-assumed-sorted (Qwen, GPT, Z) | L1400; floors verbatim incl. QB exception (88+ during QB run); `!posBest → continue` for R≤3; `replPool - pool.length >= 6`; sorted-pool assumption in comments | ✅ exact |
| 16 | `simulateGame` ~L2286; aggregate-first then `makeScoringEvents` reverse-engineers score via `scoreDecompositions` (Gemini, Qwen, GPT) | L2286; `makeScoringEvents` L2729; `scoreDecompositions` L2698; `quarterTotals` L2154 | ✅ confirmed architecture |
| 17 | `sortStandings` = win% → pairwise H2H → point diff (GPT) | L3258 verbatim; pairwise `headToHeadEdge` (L3248) inside a sort comparator — cyclic multi-team ties = real risk | ✅ confirmed |
| 18 | 17 games / 17 weeks, no byes (GPT) | `for(let w=1; w<=17; w++)`, DIV_WEEK_NUMBERS [2,5,8,11,14,17], 11 generated non-div rounds, retry loop ≤3000 | ✅ confirmed |
| 19 | Caps: 527/296 per game; 5,400/2,060/1,930/21 per season (GPT) | `PER_GAME_CAP` L3477 `{passYds:527, rushYds:296, recYds:336, sack:7, dint:4, rec:23, passTD:7, rushTD:6, recTD:5}`; `SEASON_RECORD_CAPS` L3478 `{passYds:5400, rushYds:2060, recYds:1930, sack:21, dint:10, rec:140}` | ✅ confirmed (plus uncited dint/rec caps) |
| 20 | Per-render `tr.teamrow` listener re-attachment (Qwen) | L637 & L6220 `querySelectorAll('tr.teamrow').forEach(...)` inside render paths | ✅ confirmed |
| 21 | Zero debounce / zero rAF (Z) | 0 `debounce`; 2 `requestAnimationFrame` (FX layer only) | ✅ |
| 22 | Zero keyboard/a11y: 0 keydown, 0 tabindex, 2 aria- (Z) | 0 / 0 / 2; `getElementById` = 157 | ✅ exact |
| 23 | `simToEnd` synchronous freeze ~1.7 s (Z, Qwen) | L1538, synchronous loop; 100-season loop chunked at 120 ms | ✅ confirmed (runtime not re-measured here) |
| 24 | `seasonState = L` global swap at L6003 (Z) | L6003 `const prev = seasonState; seasonState = L;` | ✅ exact |
| 25 | Coloured candidate exists, is superset, has colour system (Grok) | `V22-candidate-teamcolours.html`: 664,581 B (+7,095), sha256 `d15f6535f9e15c98…`, TEAM_COLORS/applyTeamColors present | ✅ exists & larger; "strict superset" still needs a real diff |
| 26 | Tracker `KNOWN-ISSUES.md` current | marks KI-003/004/005/006/007 **open** — all disproven on this build; KI-009 says 58/39 vs measured 56/38 | ✅ tracker confirmed stale |

## 3. NEW findings (not reported by any analyst)

1. **Corrupted `[hidden]` selector (L3).** The system sheet ends with `…}idden]:not(idden=until-found i]){display:none!important}`. The intended selector `[hidden]:not([hidden=until-found i])` lost its `[` characters and `hidden=` prefix somewhere in past processing. The rule is invalid → browsers drop it. Impact today is **latent** (no `.hidden=` JS assignments; `hidden` attribute barely used), but any future use of the `hidden` attribute silently fails. One-line fix; include in shell cleanup.
2. **KI-009 count drift.** Tracker says 58/39; this build measures 56/38 — further evidence the tracker references older builds and needs the reconciliation pass.
3. **Grok-vs-Z reconciliation.** "38 sites" (Grok, lines) and "56 call sites" (Z, occurrences) are the same truth counted differently. No conflict.

## 4. Structural breakdown (requested, brief)

- **CSS system (L1–314):** minimal system sheet at L3 (before `<head>`; `color-scheme`, safe-area, box-sizing — plus the corrupted selector above); main theme L13–313: clean custom-property system (`--bg --panel --panel2 --text --sub --accent/--accent2 --border --good --bad`), light-mode overrides at L18/L223, breakpoints 860 px (L31, L119) and 760 px (L153, L255, L274, L290), reduced-motion respect (L110). Generic accents only; hard-coded `#4f8cff`/`#ff6b4a` literals in places. **Ready for team colours** once a variable convention is picked (Ruling).
- **Data model (L449–1057):** `PLAYERS` L449 (exactly 1,200 records: name, pos, team, ovr, spd, str, agi, cod, inj, awr, flag); `TEAM_DATA` L450 (~44 KB); `DEFAULT_WEIGHTS` L452; `NATURAL_SLOT_MAP` L931; `FLEX` L940; `RATING_SPECS` L1938; `PLAN_K` L2050; `MC` L2087. Positions include variant codes (`REDG`, `LEDG`, `MIKE`, `WILL`, `SAM`). No stable player IDs anywhere — name-based identity confirmed.
- **Draft logic (L1059–1937):** `buildFullSchedule` L1059 · `optimalLineup` (Hungarian) L1206 · `cpuPick` L1400 (floors + first-at-position pruning + replacement caching every 6 picks + personality noise) · `executePick` L1444 (pool removal by name) · `simToEnd` L1538 (synchronous). Render paths rebuild 1,200-row tables via innerHTML per keystroke; `goSeason` L846 dead.
- **Game simulation engine (L1938–3600+):** `teamRatings` L1988 → `matchupModel` L2100 (coefficient table `MC`, plan amps via `PLAN_K`) → `realisticScore` L2170 → `simulateGame` L2286 (stats first → derived score → game-script → `makeScoringEvents` L2729 via `scoreDecompositions` → box score/narrative) → `sortStandings` L3258 (pairwise H2H comparator) → 7-team playoff bracket → `accumulatePlayerStats` L3464 under `PER_GAME_CAP`/`SEASON_RECORD_CAPS`. Aggregate-first architecture with reconciliation risk exactly where the analysts predicted.

## 5. Reviewer credibility ledger (after ground truth)

| Reviewer | Verified-accurate highlights | Corrections needed |
|---|---|---|
| Z | All line numbers exact (6446/6547/6003/846); a11y & counts exact; tracker-staleness correct | none material |
| Grok (round 2) | 6,553 lines; 657,486 B; dual style blocks; 38 "sites" (=lines) | "38 Math.random sites" ≠ 56 occurrences (unit mismatch, now reconciled) |
| Qwen | DEFAULT_WEIGHTS values, cpuPick floors, 1200-player innerHTML rebuild, zero debounce, line-3 style quirk | "three" 760px blocks → four; "light dark" media override phrasing imprecise |
| Deepseek | 38-item filter sensible; guardrails match protected list | undercounts usable items (union with prior slate ≈ 60 distinct, still <100) |
| Verification doc | Observation table accurate except 6,554 lines | line count off-by-one |
| GPT (round 1) | caps, sortStandings, name identity, aggregate-first — all confirmed | its "audit everything" breadth rightly narrowed by others |
