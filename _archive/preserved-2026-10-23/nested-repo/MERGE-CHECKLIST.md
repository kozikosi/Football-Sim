# MERGE-CHECKLIST.md — v20 ↔ donor merge verification

**Purpose.** Reusable checklist for the v20↔donor merge. The Architect holds the merge state; this checklist ensures nothing is missed and the council can verify.

---

## Phase 0 — Pre-merge audit (run on both builds independently)

| Check                    | Command                                                                                                  | v20 Expected       | Donor Expected     | Pass? |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ | ----- |
| SHA256 + size            | `shasum -a 256 file && wc -c file`                                                                       | `31b7d61f…` 649032 | `77bb9ed5…` 650127 | ☐     |
| SIM-CORE markers         | `grep -c "SIM-CORE-START" file`                                                                          | 0                  | 0                  | ☐     |
| Headless entry points    | `grep -c "function buildDraftState\|function simulateDraftHeadless\|function buildLeagueFromDraft" file` | 0                  | 0                  | ☐     |
| Protected constants hash | Extract each const block + `shasum`                                                                      | —                  | —                  | ☐     |
| `DEFAULT_WEIGHTS`        | `awk '/const DEFAULT_WEIGHTS = \{/,/^};/' file \| shasum -a 256`                                         | —                  | —                  | ☐     |
| `FLEX`                   | `awk '/const FLEX = \{/,/^};/' file \| shasum -a 256`                                                    | —                  | —                  | ☐     |
| `NATURAL_SLOT_MAP`       | `awk '/const NATURAL_SLOT_MAP = \{/,/^};/' file \| shasum -a 256`                                        | —                  | —                  | ☐     |
| `MC` coefficients        | `awk '/const MC = \{/,/^};/' file \| shasum -a 256`                                                      | —                  | —                  | ☐     |
| `PLAN_K`                 | `awk '/const PLAN_K = \{/,/^};/' file \| shasum -a 256`                                                  | —                  | —                  | ☐     |
| `RATING_SPECS`           | `awk '/const RATING_SPECS = \{/,/^};/' file \| shasum -a 256`                                            | —                  | —                  | ☐     |
| Data layer identity      | `awk '/const PLAYERS = \[/,/^];/' file \| shasum -a 256`                                                 | —                  | —                  | ☐     |
| `TEAM_DATA` identity     | `awk '/const TEAM_DATA = \{/,/^};/' file \| shasum -a 256`                                               | —                  | —                  | ☐     |
| Wrapper structure        | `grep -c "<!doctype html>\|<html>\|<head>\|<body>\|</body>\|</html>" file`                               | 2/2/3/2/2/2        | 1/1/1/1/1/1        | ☐     |
| `<style>` blocks         | `grep -n "<style" file`                                                                                  | lines 1, 13        | line 4             | ☐     |
| `color-scheme` values    | `grep -o "color-scheme:[^;]*" file`                                                                      | `light`            | `light dark`       | ☐     |
| Function census          | `grep -c "^function " file`                                                                              | 409                | 412                | ☐     |
| Math.random census       | `grep -c "Math.random()" file` / `grep -n "Math.random()" file \| wc -l`                                 | 58 occ / 39 lines  | —                  | ☐     |
| localStorage             | `grep -c "localStorage" file`                                                                            | 0                  | 0                  | ☐     |

**Protected-function hashes (Pickle Round-2/3 verified byte-identical):**
| Function         | v20 hash       | Donor hash     | Match? |
| ---------------- | -------------- | -------------- | ------ |
| `slotWins`       | `dc54e4210ce1` | `dc54e4210ce1` | ✓      |
| `slotWinsPerOvr` | —              | —              | ☐      |
| `modelWeights`   | —              | —              | ☐      |
| `effOvr`         | —              | —              | ☐      |
| `optimalLineup`  | —              | —              | ☐      |
| `matchupModel`   | —              | —              | ☐      |
| `simulateGame`   | `dc54e4210ce1` | `dc54e4210ce1` | ✓      |
| `teamRatings`    | —              | —              | ☐      |

**Differing functions (DS keep-oracle M-16 / Pickle Round-3 confirmed):**
| Function         | v20                                    | Donor                                 | Decision |
| ---------------- | -------------------------------------- | ------------------------------------- | -------- |
| `cpuPick`        | 28 lines, `seen>16` skip, 92-deep miss | 43 lines, round floors + bounded miss | ☐        |
| `updateStepper`  | v20-only                               | —                                     | ☐        |
| `seasonToast`    | —                                      | donor-only                            | ☐        |
| `goSeason`       | —                                      | donor-only                            | ☐        |
| `meetingInfo`    | —                                      | donor-only                            | ☐        |
| `meetingTagText` | —                                      | donor-only                            | ☐        |

---

## Phase 1 — During merge (Architect decision log)

| Item                  | Decision                                      | Source Parent | Notes                                                              |
| --------------------- | --------------------------------------------- | ------------- | ------------------------------------------------------------------ |
| Wrapper header        | ☐ v20 compact / ☐ donor structured / ☐ hybrid |               | Pickle M-13: remove duplicate wrapper + close                      |
| `color-scheme`        | ☐`light` / ☐ `light dark` / ☐ other           |               | Architect decides (Pickle Q-PICKLE-8, Beam Q-BEAM-2)               |
| `cpuPick` body        | ☐ v20 / ☐ donor / ☐ hybrid (cap + floors)     |               | DS keep-oracle: donor has floors+bounded; v20 has cap+92-deep      |
| `updateStepper`       | ☐ keep v20 / ☐ drop                           |               | v20-only                                                           |
| `seasonToast`         | ☐ keep donor / ☐ drop                         |               | donor-only                                                         |
| `goSeason`            | ☐ keep donor / ☐ drop                         |               | donor-only                                                         |
| `meetingInfo`         | ☐ keep donor / ☐ drop                         |               | donor-only                                                         |
| `meetingTagText`      | ☐ keep donor / ☐ drop                         |               | donor-only                                                         |
| Season engine (9/9)   | ☐ all donor / ☐ hybrid                        |               | 7/9 byte-identical per DS                                          |
| SIM-CORE markers      | ☐ insert during merge / ☐ post-merge S-202    |               | CONTRACT v2 mandates; Pickle Q-PICKLE-9                            |
| Headless entry points | ☐ insert during merge / ☐ post-merge S-202    |               | `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft` |

---

## Phase 2 — Post-merge verification

| Check                | Command                                                   | Pass Criteria                      |
| -------------------- | --------------------------------------------------------- | ---------------------------------- |
| Merged hash recorded | `shasum -a 256 merged.html`                               | New hash in STATUS.md              |
| CHRONICLE entry      | Append `YYYY-MM-DD · Architect · merge complete · <hash>` | Done                               |
| Mirror sync          | `sh tools/sync-mirrors.sh --check`                        | All 9 docs OK                      |
| Verifier assigned    | Per AGENTS.md §5 (1A: Ultra or fresh; 1B: DS or GLM)      | Name in STATUS.md                  |
| E2E verification     | Draft→Season→Playoffs→Super Bowl                          | 0 console errors                   |
| 390px verification   | All 6 tabs + live board + stats                           | No horizontal scroll               |
| Function-diff        | `node tests/funcdiff.js <ref> <cand>`                     | Changed set = accepted submissions |
| Protected constants  | Re-run Phase 0 constant hashes                            | Unchanged (or Owner-approved)      |

---

## Phase 3 — Sign-off

- [ ] Architect: "Merge green — delivering build `<hash>`"
- [ ] Verifier: Five-line report + function-diff passes
- [ ] Owner: Hash bump in STATUS.md, publish decision
- [ ] CHRONICLE: Final entry with merged hash + verifier report pointer

---

_Maintained by UK (S-2200–2299). Update per merge; never rewrite history. See CHRONICLE for change log._
