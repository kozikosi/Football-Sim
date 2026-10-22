SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: report-back to Pickle — cross-reference table for V22-Suggestions.md's external anchors | DATE: 2026-10-22T00:58Z

Build pin re-verified before writing: `NFL Draft Simulator merged.html` = sha256 `044d1759e01ac99b…`, 656,746 B (VERIFIED `shasum`). The doc = 2,263 lines at the repo root, tracked name `V22-Suggestions.md` (correct case). Targets opened with commands cited; no product/document edits made.

## The table

| # | Citation | Doc line | Target exists? | Line/string matches? | Drift note | Label |
|---|---|---|---|---|---|---|
| 1 | `v20:6433` (P1-3 setActiveTab) | l.366 | YES — `NFL Draft Simulator v20 Claude.html` | MATCH: `setActiveTab('viewDraft','tabDraftBtn');` exactly as claimed | none | VERIFIED |
| 2 | `v20:6409–6432` (P1-6 phone-layout block) | l.377-381 | YES | START verified: l.6409 opens the phone-layout comment; span end not re-read this turn | presumed intact | REPORTED |
| 3 | `v20:2880` (P1-7 "sudden death") | l.383 | YES | MATCH: `never got the ball back: sudden death, and that was the end of it.` | none | VERIFIED |
| 4 | `v20:2898` (P1-7 "went the distance") | l.383 | YES | MATCH: `tdTag = gv.td ? ' — and it went the distance for a touchdown!'` | none | VERIFIED |
| 5 | `v20:3082` (P1-8 "steal a 18–16 win") | l.381 | YES | MATCH: template `steal a ${wS}–${lS} win` with no article branch — the "a 18–16" bug is real at that line | none | VERIFIED |
| 6 | `v20:5433` (P1-8 "the 49ers's") | l.381 | YES | MATCH-BY-TEMPLATE: `Their ${U} outplayed the ${opp}'s answer to it` → generates "the 49ers's" when opp = 49ers | none | VERIFIED |
| 7 | `v20:4832` (P1-9 "expected scoring") | l.383 | YES | MATCH: `<p class="narr">Points are per game, the model's expected scoring…` | none | VERIFIED |
| 8 | Build `l.779–804` (P0-17 flex table) | l.53 | line exists in build | **MISMATCH**: at 779–804 the pinned build holds `renderPlayers()/updatePosBtnLabel`; the FLEX literal actually spans **940–952** (`FLEX[slot][pos]` shape) | drifted ~161 lines inside the pinned build — the doc's recipe line numbers predate the build's tail-heavy edits | VERIFIED (stale) |
| 9 | Build `l.1092` (P0-16 base defense) | l.54 | line exists | **MISMATCH**: l.1092 sits in the `DEPTH_CHART_GROUPS`/`resultsView` region | same class of drift as #8 | VERIFIED (stale) |
| 10 | `pw4.js 100` (recipe row, l.53) | l.53 | NO — `pw4.js` absent from the tree (tests/ has 5 files, no pw4) | — | the named validation cannot run until recreated (AGENTS.md's own note) | VERIFIED (absent) |
| 11 | `SUBMISSIONS.md l.1615` | (recipe region) | FILE exists but has **1,535 lines** | line 1615 does not exist | the citation is unreachable as written | VERIFIED (dead) |
| 12 | `current-pool-distribution.md` | multiple | YES — `SIM-PLATFORM/data/schema/current-pool-distribution.md` | content = MiniMax's 20-Oct measurement: 1,200 records / 1,148 visible to `POS_SLOT_MAP` / draft counter 832//832 | the file's numbers are the DONOR-BUILD state; see row 15 for the working-tree contradiction | VERIFIED |
| 13 | `nfl-position-taxonomy.md l.42` | (recipe) | YES — `SIM-PLATFORM/data/schema/nfl-position-taxonomy.md` | l.42 lands inside the merged-vs-probe table (records 1,200/1,200, visible 1,148/748) | plausible match; full context not re-read | REPORTED |
| 14 | Minimax's `verify-anchors.mjs` (doc tail how-to) | tail | YES — `_agents/minimax/tools/verify-anchors.mjs` | RAN it against doc + build: **51 quoted OLD strings → 17 found / 33 missing / 1 partial / 6 already applied** | the doc's quoted build-state is stale in 33 places — the single strongest ready-verdict fact for the wave | VERIFIED (executed) |
| 15 | Supply cites (HB 89 / FB 8 / TE 53 / K 32 / P 32; picks 832→896) | P0-17/FB-P regions | PLAYERS spans build lines 449–1095 (`];` at 1095) | **MISMATCH**: my full-span pos-tag census reads FB 46, K 70, P 70, HB 95, TE 61 (element starts in span: ~1,276) — materially different from MOC's donor histogram | census contamination possible (double-quoted group-def tokens inside the span) — but unresolvable by regex alone; provenance: `git show HEAD:PROD` = `40233d6be00e987c` (commit `ff8c05ae`), so the working tree `044d1759…` is **UNCOMMITTED** — who edited the pool, and was it authorized, is UNKNOWN | UNKNOWN — owner-bound |
| 16 | Build-pin rows (doc l.10/19/73/2081–2236) | recipe l.58 | pin text present in doc | pin truthfully matches the working tree (`044d1759…`); but the COMMITTED record is `40233d6b…` | the record and the tree disagree — commit cadence is owner question ① | VERIFIED |
| 17 | Doc-internal anchors (l.522 / l.168 / l.440–444 / l.37–45) | recipe rows 3–7 | lines exist / near-exist | **MISMATCH**: l.522 = "G · The first lint of V21's code (biome 2.6.2)" (not Appendix D weights); l.440–444 = "P2-2 Architecture: repo vs folders" (not Appendix B candidate-sha); l.168 blank | the doc grew 2,247→2,263 and its own internal citations aged during MOC's dedup — a renumber sweep is owed before Claude reads it cold | VERIFIED (mismatched) |

## Strongest evidence line

Row 14: `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md "NFL Draft Simulator merged.html"` → quoted OLD strings 51 · found 17 · **missing 33** · prefix-only 1; already-applied 6. The document is not Claude-ready on its own current evidence.

## What I did not check

1. The donor-side line cites (donor:6458–6488, donor:3101) named in P1-6/P1-8 — donor file not opened this turn.
2. v20 span end at 6432 (row 2, start only).
3. Whether the working-tree pool's extra records (row 15) were Owner-authorized — that identification belongs to whoever edited the tree and to the Owner, not to this audit.
4. The doc's quoted-string misses beyond the tool's own list (33 rows are named by the tool's output, not line-verified individually by me).
