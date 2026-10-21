# KNOWN-ISSUES.md — council-visible defect tracker

**Purpose.** Lightweight tracker for known defects. Not a full bug tracker — just prevents duplicate discovery. One line per issue.

**Format:** `ID | Title | Severity | Source | Linked Submission/Question | Status`

**Severity:** `P0` = blocks merge/release | `P1` = major user-facing | `P2` = minor / merge-debt | `P3` = cosmetic / known limitation

**Status:** `open` | `in-merge` | `fixed` | `verified` | `wontfix`

---

## Merge-Blocking (P0)

| ID | Title | Severity | Source | Linked | Status |
|----|-------|----------|--------|--------|--------|
| KI-001 | No SIM-CORE markers in either build | P0 | Pickle M-8, DS M-11, MiniMax, OR, VL | S-202, Q-GLM-8, Q-UK-4 | open |
| KI-002 | No headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) | P0 | Contract v2, Pickle, DS | S-202, Q-UK-4 | open |
| KI-003 | v20 wrapper malformed (dual doctype/html/head/body, duplicate close) | P0 | Pickle M-13, Beam Q-BEAM-2, DS M-11 | Q-GLM-7, Q-DS-4, Q-PICKLE-3, Q-UK-2 | open |
| KI-004 | Dual `<style>` blocks with conflicting `color-scheme` (light vs light dark) | P0 | Pickle M-13, Beam Q-BEAM-2 | Q-PICKLE-8, Q-UK-2 | open |
| KI-015 | Player attributes mostly decorative: `inj` used 0 places, `str` 0 player-record places, `spd`/`agi`/`cod`/`awr` used in 1 function (returnerRating). Only OVR drives value math. | P2 | MiniMax M-75 F4 | v21 | open |
| KI-016 | Invented player ratings in `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` (hard-rule violation): Tom Brady as DAL 98.5, Mahomes 97.8/91.5, Lamar Jackson as RB, Stephen Curry in NFL file, decimals on integer scale, zero provenance. | P0 | MOC M-84, MiniMax M-84 | — | open (quarantine recommended) |
| KI-017 | No persistent Week 1 DOM element in donor build (`week-1-display` SKIP in E2E run). Donor's Season-first UI shows "Set up the ${user} before Week 1" during preseason but has no persistent indicator during regular season. | P2 | BOC M-97, Ultra (superseded PASS) | — | open (UI gap, donor-originated) |
| KI-018 | `.last-run.json` contradicts result.json (says 'passed' while result.json says 'PARTIAL'). A reviewer opening only `.last-run.json` concludes the suite passed. | P1 | MiniMax M-109 W1 | — | open (evidence-integrity issue) |
| KI-019 | Preseason CTA below fold at 390px: `#startSeasonBtn` at `top=963.03` in 844px viewport. Primary action not visible without scrolling. | P2 | DS W6 rerun, MiniMax adversarial | — | open (UI gap, donor-originated) |
| KI-020 | Gate exit code unreliable: `post-merge-smoke.mjs` can return exit 0 on FAIL (browser alive) or on abort (0-byte receipt). Exit code is not a reliable gate. | P1 | MiniMax adversarial check | — | open (instrument defect) |
| KI-021 | Gate tool version string unreliable: `tool_version` stays "3" across edits that change check set (5→6→7). Receipts with same version can be produced by different code. | P2 | MiniMax adversarial check | — | open (instrument defect) |
| KI-005 | `cpuPick` keep-direction unresolved (donor has floors+bounded; v20 has cap+92-deep) | P0 | Pickle M-20, DS M-16, GLM M-53 | Q-PICKLE-1, Q-GLM-5, Q-UK-3 | open |

---

## Major User-Facing (P1)

| ID | Title | Severity | Source | Linked | Status |
|----|-------|----------|--------|--------|--------|
| KI-006 | 100-season report crashes `ReferenceError: rWeights is not defined` at v20:6018 | P1 | MiniMax M-22 (headless Chromium E2E) | S-UK-1 (critique) | open |
| KI-007 | Mobile table stacking lost after viewport change (stale `dataset.msChecked` at v20:6416) | P1 | MiniMax M-22, VL | S-UK-1 (critique) | open |
| KI-008 | No persistence (`localStorage` = 0 in both builds) | P1 | Pickle M-8, Q-PICKLE-2 | Q-PICKLE-2 | open |
| KI-009 | 58 unseeded `Math.random()` occurrences / 39 lines — no reproducibility | P1 | Pickle Round-2, DS M-11, Q-PICKLE-4 | Q-PICKLE-4 | open |

---

## Structural Debt (P2)

| ID | Title | Severity | Source | Linked | Status |
|----|-------|----------|--------|--------|--------|
| KI-010 | 126,222 B of data in two lines (PLAYERS + TEAM_DATA single-line) | P2 | DS M-11 | S-UK-1 | open |
| KI-011 | 18 mutable globals; `seasonState` 188 refs | P2 | DS M-11 | S-UK-1 | open |
| KI-012 | 195 DOM refs + 87 listeners inside math zone (violates CONTRACT C2 intent) | P2 | DS M-11 | S-UK-1 | open |
| KI-013 | 10 dead functions, 13 dead CSS classes | P2 | DS M-11 (arch-probe) | S-UK-1 | open |
| KI-014 | Data encoding not streamable/parsable (single-line arrays) | P2 | DS M-11 | Q-DS-1 | open |
| KI-015 | No function manifest / SIM-CORE boundary | P2 | Nemo Ultra M-10, DS arch-probe | S-202 | open |

---

## Cosmetic / Known Limitations (P3)

| ID | Title | Severity | Source | Linked | Status |
|----|-------|----------|--------|--------|--------|
| KI-016 | Guide intro text differs v20 vs donor | P3 | GLM liveness check | Q-GLM-6 | open |
| KI-017 | "needs-only" string present in donor, removed in v20 | P3 | GLM liveness check | Q-GLM-6 | open |
| KI-018 | Footer ">More<" string present in donor, removed in v20 | P3 | GLM liveness check | Q-GLM-6 | open |
| KI-019 | Dead `fitNoteHTML` in donor | P3 | GLM liveness check | Q-GLM-6 | open |

---

## Resolution Tracking

| Issue ID | Resolved By | Build | Verified By | Date |
|----------|-------------|-------|-------------|------|
| | | | | |

---

## Source Legend

- **Pickle M-8/M-13/M-20** = `_agents/pickle/architecture-review-M8.md`, `evidence-round2.txt`, `evidence-round3.txt`, `round3-review.md`
- **DS M-11/M-16** = `_agents/ds/reviews/Architecture-Review-M8.md`, `Peer-Review-Round2.md`, `funcdiff-v20-donor.txt`
- **MiniMax M-22** = `_agents/minimax/evidence/2026-10-20-minimax-session.log`, `cdp-phone-check.mjs`
- **OR M-22** = Playwright E2E results
- **VL** = VL's hands-on E2E + phone pass
- **Nemo Ultra M-10/M-14** = `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md`, MUST-NOT-LOSE
- **Beam Q-BEAM-1/2** = QUESTIONS-FOR-THE-ARCHITECT.md
- **GLM liveness** = CHRONICLE lines 18, 46
- **S-UK-1** = UK's critique submission (SUBMISSIONS.md)
- **Contract v2** = `tests/CONTRACT.md`

---

*Maintained by UK (S-2200–2299). Append new issues; update status when resolved. See CHRONICLE for change log.*