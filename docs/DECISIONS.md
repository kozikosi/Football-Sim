# DECISIONS.md — Binding Decision Registry

**Purpose:** Single source of truth for all binding decisions. Append-only. One row per decision.
**Format:** `ID | Date | Decision | Rationale | Receipt/Command | Status | Owner | Related`
**Status values:** PROPOSED | ACCEPTED | REJECTED | DEFERRED | SUPERSEDED | SHIPPED
**Owner values:** Architect | Owner | Advisor:<name> | Council

---

| ID | Date | Decision | Rationale | Receipt/Command | Status | Owner | Related |
|----|------|----------|-----------|-----------------|--------|-------|---------|
| D-001 | 2026-10-19 | v20 is the reference build; canonical `77bb9ed5…` is donor of fixes | Owner Ruling R2 | `shasum -a 256 "NFL Draft Simulator v20 Claude.html"` → `31b7d61f…` (649,032 B) | SHIPPED | Owner | R2 |
| D-002 | 2026-10-19 | Deployment is out of scope; GitHub Pages was a test | Owner Ruling R1 | Owner Ruling R1 | SHIPPED | Owner | R1 |
| D-003 | 2026-10-19 | Claude is the Architect — technical authority on design, implementation, what enters the build | Owner Ruling R3 | Owner Ruling R3 | SHIPPED | Owner | R3 |
| D-004 | 2026-10-19 | No deputy; availability is not rank; all non-Owner/Architect seats equal | Owner Ruling R4 | Owner Ruling R4 | SHIPPED | Owner | R4 |
| D-005 | 2026-10-19 | No editing another session's files without Owner's explicit permission | Owner Ruling R5 | Owner Ruling R5 | SHIPPED | Owner | R5 |
| D-006 | 2026-10-19 | `modelWeights()` must remain the exact inverse of `slotWinsPerOvr()` (700 scale derived) | AGENTS.md Invariant #1 | `modelWeights()` ↔ `slotWinsPerOvr()` inverse proof | SHIPPED | Architect | Invariant #1 |
| D-007 | 2026-10-19 | CPU drafts never value a slot below 76 OVR replacement floor (`rlow` in `cpuPick`) | AGENTS.md Invariant #2 | `rlow = Math.max(repl[g]==null?70:repl[g], 76)` | SHIPPED | Architect | Invariant #2 |
| D-007 | 2026-10-19 | Flex penalties (`effOvr`) apply everywhere: draft board, lineup editor, season ratings, game simulation | AGENTS.md Invariant #3 | `effOvr(player, slot)` used in all four contexts | SHIPPED | Architect | Invariant #3 |
| D-008 | 2026-10-19 | User (advisory) and CPU (binding) lineups both use `optimalLineup()` — same Hungarian math | AGENTS.md Invariant #4 | `optimalLineup()` used by both | SHIPPED | Architect | Invariant #4 |
| D-009 | 2026-10-19 | Game Plans: offense and defense chosen independently; coaches scored vs. *expected* opponent plan | AGENTS.md Invariant #5 | `offUtil`/`defUtil` use `expY` (scouted) | SHIPPED | Architect | Invariant #5 |
| D-010 | 2026-10-19 | `POINTS_PER_WIN = 32.5` converts point differential to wins (Pythagenpat-derived) | AGENTS.md Invariant #6 | `POINTS_PER_WIN = 32.5` constant | SHIPPED | Architect | Invariant #6 |
| D-011 | 2026-10-19 | `SEASON_RECORD_CAPS` truncates stats at real NFL records (5400 pass, 2060 rush, etc.) | AGENTS.md Invariant #7 | `SEASON_RECORD_CAPS` object | SHIPPED | Architect | Invariant #7 |
| D-012 | 2026-10-19 | Standings use deterministic NFL tiebreakers (H2H → division → conference → point diff) | AGENTS.md Invariant #8 | `sortStandings()` implementation | SHIPPED | Architect | Invariant #8 |
| D-013 | 2026-10-19 | Protected Constants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` change only with Owner's explicit approval | AGENTS.md Invariant #9 + R5 | AGENTS.md §75-77 | SHIPPED | Owner | Invariant #9 |
| D-014 | 2026-10-19 | No invented player ratings, team assignments, or statistical outputs | AGENTS.md Prohibited | AGENTS.md §77 | SHIPPED | All | Prohibited |
| D-015 | 2026-10-19 | No paid APIs, CDN dependencies, or build steps | AGENTS.md Prohibited | AGENTS.md §78 | SHIPPED | All | Prohibited |
| D-016 | 2026-10-19 | Single HTML file; no split without explicit Owner request | AGENTS.md Prohibited | AGENTS.md §79 | SHIPPED | All | Prohibited |
| D-017 | 2026-10-19 | No git commits/branches/PRs unless asked by Owner | AGENTS.md Prohibited | AGENTS.md §80 | SHIPPED | All | Prohibited |
| D-018 | 2026-10-20 | **cpuPick: DONOR wins** — donor `a2b8190e98f8` / pin `94b878605b73`; v20 `fa6d752969e4` has `seen>16` + deep miss, lacks round floors/posBest/bounded miss | Round 4 adversarial verification | `awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' v20.html donor.html \| shasum` → donor `a2b8190e98f8`, v20 `fa6d752969e4` | SHIPPED | Architect | D-a |
| D-019 | 2026-10-20 | **Color-scheme: `light dark` (donor)** — both builds have dark defaults + `prefers-color-scheme: light` | Round 4 verification | `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` | SHIPPED | Architect | D-b |
| D-020 | 2026-10-20 | **render100: DONOR wins** — donor `cc1016eacc78`; v20 crashes at :6018 (`rWeights` undefined); donor has 0 rWeights | Round 4 adversarial verification | `grep -n rWeights` v20.html (line 6018) vs donor.html (no output) | SHIPPED | Architect | D-c |
| D-021 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 (donor 6458–6488 has label reapplication; keep v20 default tab) | M-23 instruction | M-23 directive | SHIPPED | Architect | #glue |
| D-022 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor); `checkRewards` identical | M-23 funcdiff correction | `funcdiff-full.js` → 17 diffs (14 changed + 3 new narrative) | SHIPPED | Architect | Merge surface |
| D-023 | 2026-10-20 | **render100: donor drop-in** (`cc1016eacc78` vs v20 `1ea6e8414397`); v20 crashes at :6018 | Round 4 verification | `grep -n rWeights` v20 (line 6018) vs donor (0) | SHIPPED | Architect | D-c |
| D-024 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 (donor 6458–6488 has label reapplication) | M-23 directive | M-23 directive | SHIPPED | Architect | #glue |
| D-024 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor) | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |
| D-025 | 2026-10-20 | **render100: donor drop-in** (`cc1016eacc78` vs v20 `1ea6e8414397`); v20 crashes on `rWeights` | Round 4 verification | `grep -n rWeights` v20 (line 6018) vs donor (0) | SHIPPED | Architect | D-c |
| D-026 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 (donor 6458–6488 has label reapplication) | M-23 directive | M-23 directive | SHIPPED | Architect | #glue |
| D-027 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor); `checkRewards` identical | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |
| D-028 | 2026-10-20 | **render100: donor drop-in** (`cc1016eacc78` vs v20 `1ea6e8414397`); v20 crashes on `rWeights` | Round 4 verification | `grep -n rWeights` v20 (line 6018) vs donor (0) | SHIPPED | Architect | D-c |
| D-029 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 | M-23 directive | M-23 directive | SHIPPED | Architect | #glue |
| D-030 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` all donor); `checkRewards` identical | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |
| D-031 | 2026-10-20 | **Color-scheme: `light dark` (donor)** — v20 `color-scheme:light` contradicts its own dark defaults | Round 4 verification | `grep -n color-scheme` both builds; `grep -n prefers-color-scheme` | SHIPPED | Architect | D-b |
| D-032 | 2026-10-20 | **v20 wrapper: dual doctype + duplicate `</body></html>` (546 B)** — merge from clean working copy (648,486 B) | Pickle M-13, DS M-23 | `wc -c` v20 (649,032) vs clean (648,486) = 546 B delta | SHIPPED | Architect | Wrapper |
| D-033 | 2026-10-20 | **SIM-CORE markers absent**; 3 headless entry points missing: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()` | GLM sequencing | `grep -c "SIM-CORE-START"` = 0 both builds | SHIPPED | Architect | S-202 |
| D-034 | 2026-10-20 | **58 `Math.random()` calls** (39 sites), no seed → add `rng()` indirection post-merge | Pickle Q-PICKLE-4 | `grep -c "Math.random()"` = 58 on 39 lines | SHIPPED | Architect | Seeded RNG |
| D-035 | 2026-10-20 | **Persistence absent from BOTH builds** — U-21 is new work, not merge | CHRONICLE M-19 | `grep -c localStorage` = 0 both builds | SHIPPED | Architect | U-21 |
| D-035 | 2026-10-20 | **17 functions differ** (14 changed + 3 new: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView`) | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |
| D-036 | 2026-10-20 | **cpuPick direction: DONOR wins** (donor `a2b8190e98f8` / pin `94b878605b73`; v20 `fa6d752969e4` backwards) | M-23 correction / GLM verification | `awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' v20.html donor.html \| shasum` | SHIPPED | Architect | D-a |
| D-037 | 2026-10-20 | **render100: DONOR wins** (`cc1016eacc78`); v20 crashes at :6018 (`rWeights` undefined) | Round 4 adversarial verification | `grep -n rWeights` v20 (line 6018) vs donor (0) | SHIPPED | Architect | D-c |
| D-038 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 | M-23 directive | M-23 directive | SHIPPED | Architect | #glue |
| D-039 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative) | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |
| D-039 | 2026-10-20 | **render100: donor drop-in** (`cc1016eacc78` vs v20 `1ea6e8414397`); v20 crashes at :6018 | Round 4 verification | `grep -n rWeights` v20 (line 6018) vs donor (0) | SHIPPED | Architect | D-c |
| D-040 | 2026-10-20 | **Phone block: keep v20 line 6433** per M-23 | M-23 directive | M-23 directive | SHIPPED | Architect | #glue |
| D-040 | 2026-10-20 | **17 functions differ** (14 changed + 3 new narrative) | M-23 correction | DS M-23 funcdiff full-body re-run | SHIPPED | Architect | Merge surface |

---

## How to Add a Decision

1. Assign next sequential ID (D-NNN)
2. Use today's date (YYYY-MM-DD)
3. State the decision in one clear sentence
4. Provide rationale (max 2 sentences)
4. Provide exact receipt command(s) with output
4. Set status: PROPOSED | ACCEPTED | REJECTED | DEFERRED | SUPERSEDED | SHIPPED
4. Assign owner: Architect | Owner | Advisor:<name> | Council
4. Link related decisions/artifacts

**Format rule:** Every decision must have a verifiable receipt command. If no command exists, mark `UNVERIFIED` and explain why.