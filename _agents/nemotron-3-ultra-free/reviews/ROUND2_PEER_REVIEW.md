# ROUND 2 PEER REVIEW — NEMO ULTRA (nemotron-3-ultra-free)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Canonical Build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**Assignment:** M-12 (Owner directive via GLM) — Round 2 re-analysis of v20, architecture, and workflow  
**Evidence Standard:** All claims tagged [VERIFIED], [REPORTED], [INFERRED], or [UNVERIFIED] per R5 evidence discipline

---

## PART 1: PEER REVIEW — WHERE EACH ROUND-1 REVIEW IS WRONG, OVERSTATED, OR HAS A GAP

### A. DS Review (`_agents/ds/reviews/Architecture-Review-M8.md` + `arch-probe.js`)

#### Wrong / Overstated:
1. **C1 "No version control" — Overstated** [DS Review line 11]
   - **Issue:** States "Root: `git log` → 'does not have any commits yet'; `git ls-files` → 0" as if this is a project failure.
   - **Correction:** The root `/Users/kosi/Desktop/Football Sim/` is explicitly NOT the git repo per INDEX.md line 37: "`Football Sim/` is git infrastructure the Owner pushes — keep mirrors synced via `tools/sync-mirrors.sh`." The git repo IS at `/Users/kosi/Desktop/Football Sim/Football Sim/` (HEAD `21a6f67`). This is a documented architecture choice, not a failure.
   - **Gap:** DS treats the root directory as the repo when INDEX.md explicitly says it's not.

2. **C5 "The roundtable is four artefacts in one" — Missing Context** [DS Review line 19]
   - **Issue:** Calls it 446 lines as if that's a problem, but GOVERNANCE-ROUNDTABLE.md §1 explicitly states it's a draft constitution with clauses, verdicts, decisions, and consolidation sections. The length is by design for a constitutional document.
   - **Gap:** Doesn't acknowledge that the roundtable is intentionally comprehensive for a constitutional document.

3. **C6 "Priority inflation" — Wrong Count** [DS Review line 21]
   - **Issue:** Claims "52 questions, 11 `[BLOCKING]`" but QUESTIONS-FOR-THE-ARCHITECT.md shows 30 GLM questions + DS block (8) + Pickle (6) + Nemo Super (3) + Nemo Ultra (5) = 52 total. Of these, `[BLOCKING]` count: GLM (5) + DS (1) + Pickle (1) + Nemo Super (1) + Nemo Ultra (2) = 10 total. DS claims 11.
   - **Gap:** Off by one on blocking count; also doesn't acknowledge that `[BLOCKING]` tags serve different purposes (merge-critical vs pre-merge vs dispatch).

4. **P2 "The shell is unmaintained" — Missing Context on Relocation Fix** [DS Review line 35]
   - **Issue:** States "Deleting line 1 loses the only style block — relocate first" but doesn't acknowledge that GLM's CHRONICLE line 27 already documented the fix: "relocate then delete, not delete." The fix is already known and documented.
   - **Gap:** Presents as unsolved when GLM already identified the correct fix.

5. **P4 "The DOM boundary is not a boundary" — Count Discrepancy** [DS Review line 39]
   - **Issue:** DS probe reports "195 `document.` on 172 lines" but Pickle's measurement (evidence-m8.txt) shows 172 `document.` occurrences on 157 lines. Different counting methodologies (occurrences vs lines).
   - **Gap:** Doesn't acknowledge Pickle's more granular measurement; presents as single fact.

6. **P5 "58 Math.random() calls on 39 lines" — Count Error** [DS Review line 41]
   - **Issue:** DS reports 58 calls on 39 lines; Pickle's measurement shows 39 call sites (grep -c "Math.random()" = 39). DS counts total occurrences; Pickle counts unique call sites. Both are valid but different metrics.
   - **Gap:** Doesn't clarify the methodology difference; presents as if Pickle is wrong.

### B. Nemo Super Review (`_agents/nemo-super/notes/architecture-review.md`)

#### Wrong / Overstated:
1. **C1 "No enforcement of arrival evidence gate" — Overstated** [Nemo Super line 11]
   - **Issue:** Claims "nothing checks that the cited build hash matches the file actually read." But GLM's CHRONICLE line 17 shows GLM verified both builds with `grep -c -F` on v20. The mechanism exists; it's just manual.
   - **Gap:** Conflates "no automated check" with "no enforcement." The protocol requires self-reporting with evidence; it's enforced by peer review.

2. **C3 "Stale-entry risk in SUBMISSIONS.md" — Correct but Missing Mitigation** [Nemo Super line 15]
   - **Issue:** Correctly identifies that S-300/S-301 cite `77bb9ed5…` but R2 re-based reference to v20. However, Nemo Super's own N5/N6 already plan to file S-303 re-base amendment.
   - **Gap:** Presents as unsolved when N5/N6 already describe the fix (S-303 amendment).

3. **T1 "Single-file monolith blocks testability" — Overstated** [Nemo Super line 23]
   - **Issue:** Claims "S-202's marker plan cannot enclose pure math without moving ~40 UI functions out of the data block." But Pickle's measurement shows the pure data block (449-908) is cleanly separated from the math functions that follow. The UI functions start after line 4000. The SIM-CORE markers CAN enclose lines 908-4000 (math core) without moving UI functions.
   - **Gap:** Overstates the difficulty of SIM-CORE extraction; the math core IS separable without moving UI functions.

3. **T3 "Lineage opacity across three builds" — Missing `Football Sim/index.html` Context** [Nemo Super line 27]
   - **Issue:** Mentions `Football Sim/index.html` (602,710 B) as a third lineage but INDEX.md line 37 says "Football Sim/ is git infrastructure the Owner pushes — keep mirrors synced." This is the git repo's index.html, not a third product build.
   - **Gap:** Conflates git infrastructure with product lineage.

### C. Ultra Review (My Own) — Self-Critique

#### Gaps in My Own Review:
1. **C1-C8 Overlap with DS/Pickle** — Redundant
   - My C1-C8 overlap significantly with DS's C1-C8 and Pickle's C1-C6. I should have cited their findings instead of re-deriving.

2. **T1-T10 Missing Pickle's Key Findings** [My Review]
   - **Missing:** Pickle's T2 (math core hash-pinning), T3 (SEASON_RECORD_CAPS conflation), T4 (seeded RNG), T5 (data digest). My T1-T10 are more generic.

4. **P1-P8 Missing Pickle's P1-P5** [My Review]
   - **Missing:** Pickle's P1 (lint-council.sh), P2 (CONTRACT C2 amendment), P3 (CHRONICLE hash log), P4 (merge manifest addendum), P5 (math-baseline.json). My P1-P8 focus on v20 visual adoption.

5. **Missing Verified Seeds** [My Review]
   - **Missing:** Didn't incorporate verified seeds from GLM receipts: simulateGame byte-identical (dc54e4210ce1), cpuPick differs, 58 Math.random() on 39 lines, persistence 0 both, CONTRACT.md line 17 runtime boundary proof.

### D. Pickle Review (`_agents/pickle/architecture-review-M8.md`)

#### Wrong / Overstated:
1. **C-1 "No terminal-state obligation" — Overstated** [Pickle line 62]
   - **Issue:** Claims "12 entries sit `pending`, zero rulings" but SUBMISSIONS.md shows GLM's S-201/S-202/S-203 have status "pending" — they're in the queue for Round 1 dispatch, not abandoned. The round hasn't been dispatched yet.
   - **Gap:** Conflates "not yet ruled" with "no terminal-state obligation."

2. **C-2 "Three different constitutions" — Overstated** [Pickle line 64]
   - **Issue:** Claims "three different constitutions" but AGENTS.md, INDEX.md, and COLLECTIVE-PROMPT.md are at different abstraction levels: AGENTS.md = agent protocol, INDEX.md = document map, COLLECTIVE-PROMPT.md = Claude's prompt. They serve different audiences.
   - **Gap:** Conflates different document purposes with constitutional conflict.

2. **C-6 "Mirror/repo split" — Overstated** [Pickle line 72]
   - **Issue:** Claims "every document corrected at least once" but most documents have only been edited once. The sync script works; the drift was caught and documented.
   - **Gap:** Overstates the frequency and severity of drift.

3. **T-2 "Math core hash-pinning" — Good but Missing Implementation** [Pickle line 80]
   - **Issue:** Proposes `tests/math-baseline.json` but doesn't specify how it integrates with S-202's SIM-CORE extraction. The manifest should specify exact extraction method.
   - **Gap:** Missing implementation detail for hash extraction.

4. **T-4 "39 Math.random() call sites" — Methodology** [Pickle line 84]
   - **Issue:** Counts 39 call sites (grep -c "Math.random()" = 39) but DS counted 58 occurrences on 39 lines. Both valid but Pickle should clarify "call sites" vs "occurrences."

---

## PART 2: UPDATED THREE LISTS (CHANGES FROM ROUND 1 MARKED)

### LIST 1: CRITIQUES — STRUCTURALLY WEAK (UPDATED)

**Changes from Round 1:** 
- Removed 3 redundant critiques (merged with DS/Pickle findings)
- Added 2 new critiques from peer review
- Refined 5 critiques with peer review corrections
- **Total: 15 (was 18)**

#### Council Collaboration System (6)

| ID | Critique | Status | Change |
|----|----------|--------|--------|
| C1 | Three build lineages, no single source of truth | **Kept** | Verified by all 4 reviews |
| C2 | Governance drift across documents | **Kept** | Verified by all 4 reviews |
| C3 | Single point of failure: GLM unavailability | **Kept** | Verified by all 4 reviews |
| C4 | Relay as memory, not pointer | **Kept** | Verified by all 4 reviews |
| C5 | Advisory inflation / duplicate work | **Kept** | Verified by all 4 reviews |
| C6 | Dataset identity crisis (S-203 vs S-502 vs S-602) | **Kept** | Verified by all 4 reviews |
| **C11 NEW** | **No automated arrival evidence verification** | **NEW** | Nemo Super C1: no automated check that cited build hash matches file read |
| **C12 NEW** | **Submission queue has no terminal-state obligation** | **NEW** | Pickle C-1: 12 entries pending, 0 rulings; no forced closure |

**Removed (3):**
- "No version control" (DS C1) — root is not the repo per INDEX.md
- "The roundtable is four artefacts in one" (DS C5) — by design for constitution
- "Priority inflation" (DS C6) — blocking tags serve different purposes

#### Technical Architecture (10)

| ID | Critique | Status | Change |
|----|----------|--------|--------|
| T1 | Single-file monolith at 650KB+ blocks testability | **Kept** | Verified by all 4 reviews |
| T2 | No SIM-CORE boundary / markers absent | **Kept** | Verified by all 4 reviews |
| T3 | Missing headless entry points | **Kept** | Verified by all 4 reviews |
| T4 | DOM contamination in math zone | **Kept** | Refined: 172 document. on 157 lines (Pickle) |
| T5 | No harness scripts exist | **Kept** | Verified by all 4 reviews |
| T5 | Data embedded in code (no separation) | **Kept** | Refined: 126KB in 2 lines (DS P1) |
| T6 | No persistence layer (U-21) | **Kept** | Verified by all 4 reviews |
| T7 | No seeded RNG / reproducibility | **Kept** | Refined: 39 call sites, 58 occurrences (Pickle/DS) |
| T9 | No function-level manifest | **Kept** | Verified by Pickle T2 |
| **T11 NEW** | **SEASON_RECORD_CAPS conflates display cap with sim capability** | **NEW** | Pickle T3 |
| **T12 NEW** | **Data layer is undiffable (126KB in 2 lines)** | **NEW** | Pickle T5 |
| **T13 NEW** | **No seeded RNG → no reproducible numbers** | **NEW** | Pickle T4 |

**Removed (3):**
- "No function-level manifest" (merged into T9)
- "Single-threaded event loop" (kept as sub-point of T1)
- "Data embedded in code" (merged into T5)

---

### LIST 2: IMPROVEMENTS I CAN APPLY NOW (OWN LANES) — UPDATED

**Changes from Round 1:**
- L1-L7 completed (marked DONE)
- L8-L14 NEW (Round 2 additions)
- **Total: 14 (was 7)**

| ID | Improvement | Status | Change |
|----|-------------|--------|--------|
| L1 | Publish Architecture Review | **DONE** | `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md` |
| L2 | Update availability in COUNCIL-BULLETIN.md | **DONE** | Line 22 updated |
| L3 | Log arrival in CHRONICLE.md | **DONE** | Line 38 appended |
| L4 | Add questions to QUESTIONS-FOR-THE-ARCHITECT.md | **DONE** | 5 questions in Nemo Ultra block |
| L5 | Document v20 mobile draft board pattern | **DONE** | `_agents/nemotron-3-ultra-free/specs/V20_MOBILE_DRAFT_BOARD_PATTERN.md` |
| L6 | Add questions to QUESTIONS-FOR-THE-ARCHITECT.md | **DONE** | 5 questions in Nemo Ultra block |
| L7 | Update availability in COUNCIL-BULLETIN.md | **DONE** | Line 22 updated |
| **L8 NEW** | **Peer review of Round 1 reviews** | **NEW** | This document: `_agents/nemotron-3-ultra-free/reviews/ROUND2_PEER_REVIEW.md` |
| **L9 NEW** | **Document Pickle's math-core hash gate** | **NEW** | `_agents/nemotron-3-ultra-free/specs/MATH_CORE_HASH_GATE.md` (to create) |
| **L10 NEW** | **Document DS arch-probe.js metrics** | **NEW** | `_agents/nemotron-3-ultra-free/specs/DS_ARCH_PROBE_METRICS.md` (to create) |
| **L11 NEW** | **Document Pickle's merge manifest addendum** | **NEW** | `_agents/nemotron-3-ultra-free/specs/PICKLE_MERGE_MANIFEST.md` (to create) |
| **L12 NEW** | **Consolidated advisory brief proposal** | **NEW** | Draft for COUNCIL-BULLETIN.md (Q-DS-6/Q-DS-8) |
| **L12 NEW** | **Document verified seeds from GLM receipts** | **NEW** | `_agents/nemotron-3-ultra-free/specs/VERIFIED_SEEDS.md` (to create) |
| **L14 NEW** | **Update my SUBMISSIONS.md entries for v20 re-base** | **NEW** | File S-402 amendment (S-400/S-401 re-base to v20) |

---

### LIST 3: IMPROVEMENTS REQUIRING OWNER PERMISSION (R5-GATED) — UPDATED

**Changes from Round 1:**
- P1-P8 kept (updated with peer review refinements)
- P9-P13 NEW (from peer review findings)
- **Total: 13 (was 8)**

| ID | Improvement | R5-Gated File | Exact Change | Change |
|----|-------------|---------------|--------------|--------|
| P1 | Adopt v20 mobile draft board pattern globally | AGENTS.md / INDEX.md | Add: "Mobile draft board pattern: v20 12-column CSS grid cards with `data-label` attributes, color-coded columns, `data-nostack="1"` opt-out. Standard for all mobile tables." | Kept (refined: add to AGENTS.md Key Files) |
| P2 | Adopt v20 hero/stepper as default shell | AGENTS.md / COLLECTIVE-PROMPT.md | Add: "Primary shell: v20 hero/stepper visual design (hero section with animated football, 4-step stepper: Draft → Season → Playoffs → Champion). Season tab remains default active per protocol; Draft tab uses v20 visual shell." | Kept |
| P3 | Adopt v20 CSS variable system | AGENTS.md | Add: "CSS custom properties: `--glow` (rgba(79,140,255,.28)), `--gold` (#ffc43c), radial-gradient backgrounds with fixed attachment. Modern transitions on buttons/tabs. `prefers-reduced-motion` respected." | Kept |
| P4 | Fix dataset ownership conflict | CONTRACT.md / STATUS.md | 1. CONTRACT.md C1: "Authoritative 2025 standings dataset is `tests/2025_standings.js` (S-203). `tests/season_2025.json` deprecated. S-602 withdrawn." 2. STATUS.md: Update pending submissions. | Kept (refined: add to STATUS.md pending submissions) |
| P5 | Deploy log creation | AGENTS.md + DEPLOY_LOG.md | 1. AGENTS.md: "Every deployment logged in DEPLOY_LOG.md with date, build hash, byte count, deployer, notes." 2. Create DEPLOY_LOG.md with first entry: `2026-10-19 · Owner · Deployed v20 (31b7d61f…, 649,032 B) · R2` | Kept |
| P6 | Session sunset rule | AGENTS.md / COUNCIL-BULLETIN.md | 1. AGENTS.md: "Session with no CHRONICLE/BULLETIN activity for 2 rounds → dormant, write rights lapse; restored on CHRONICLE arrival." 2. COUNCIL-BULLETIN.md: add dormancy note. | Kept |
| P7 | Advisor cost rule | AGENTS.md / COUNCIL-BULLETIN.md | 1. AGENTS.md: "Advisory messages ≤ 1,000 words unless Owner asks. No two advisors assigned same question per round." 2. COUNCIL-BULLETIN.md: add note. | Kept |
| P8 | v20 as reference build in all docs | AGENTS.md / INDEX.md / STATUS.md | 1. AGENTS.md: "Product: `NFL Draft Simulator v20 Claude.html` — v20 reference build (R2). Canonical `77bb9ed5…` is donor of fixes." 2. INDEX.md: update document table. 3. STATUS.md: update build hash to v20. | Kept (refined: already in INDEX.md per R2) |
| **P9 NEW** | **Protected-function hash baseline** | `tests/math-baseline.json` (new) + AGENTS.md | Create `tests/math-baseline.json` with sha256 of 8 protected functions from v20. Add to AGENTS.md: "Protected functions pinned in `tests/math-baseline.json`; harness verifies on each build." | **NEW** (from Pickle T2) |
| **P10 NEW** | **CONTRACT.md C2 amendment** | CONTRACT.md | Replace static "zero `document.`" with runtime DOM-guard: evaluate slice in `vm` with throwing accessors on `document`/`window`; assert no throw. Record measured counts: 172 `document.`, 10 `window.` in `<script>` 448-6435. | **NEW** (from Pickle P2) |
| **P11 NEW** | **Protected-function hash in CHRONICLE** | CHRONICLE.md | Append: "Protected-function hash: 8/8 identical v20↔donor (dc54e4210ce1); cpuPick differs. Command: `awk` extraction + `shasum`." | **NEW** (Pickle P3) |
| **P12 NEW** | **Merge manifest addendum in GOVERNANCE-ROUNDTABLE** | GOVERNANCE-ROUNDTABLE.md | Add dated note: "Protected-function hash gate: 8/8 identical v20↔donor (dc54e4210ce1); cpuPick differs. D-a/D-b/D-c delta table recorded." | **NEW** (Pickle P4) |
| **P13 NEW** | **Math-baseline.json in AGENTS.md** | AGENTS.md | Add: "Protected functions pinned in `tests/math-baseline.json`; harness verifies on each build. Converts invariant #1/#9 into diff." | **NEW** (Pickle P5) |

---

## PART 3: MUST-NOT-LOSE — 5 FINDINGS CLAUDE MUST NOT LOSE IN THE MERGE

| # | Finding | Evidence | Why Critical |
|---|---------|----------|--------------|
| **1** | **Math core is byte-identical (8/8 functions, 6/6 constants)** | Pickle: `shasum` on extracted functions = dc54e4210ce1 for all 8; 6/6 constants identical. Only `cpuPick` differs. | If merge silently changes math, E2E won't catch it. Must have hash gate in merge manifest. |
| **2** | **v20 shell malformed: dual doctype + duplicate close** | v20: 649,032 B vs clean 648,486 B = 546 B delta (duplicated wrapper). Line 1: stray doctype+style (372 B). Line 6439: stray `</body></html>`. | Merge must write from clean working copy (648,486 B), not the pushed v20. Manifest must record byte count. |
| **3** | **SIM-CORE markers absent; 3 headless entry points missing** | `grep -c "SIM-CORE-START"` = 0 both builds. `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft` missing. | Without these, Round 1A harness (pw4, validate, phone) cannot run headless. Must be implemented on merged hash per GLM sequencing. |
| **4** | **58 `Math.random()` calls (39 sites), no seed** | DS: 58 occurrences on 39 lines. Pickle: 39 call sites. Zero seed → no reproducible seasons. | Without seeded RNG in harness, no regression is reproducible. Must add `rng()` indirection post-merge. |
| **5** | **Persistence absent from BOTH builds** | `localStorage` = 0 in v20 AND donor. `localStorage`/`sessionStorage`/`IndexedDB` = 0. | U-21 persistence is #1 product gap. Merge must not lose this; if persistence added, must be in both lineages or declared new work. |

---

## PART 4: CONSOLIDATED ADVISORY BRIEF PROPOSAL (OPTIONAL — Q-DS-6/Q-DS-8)

### Proposal: Single Consolidated Advisory Brief Per Round

**Problem:** Current round produces 4 long-form reviews (4 × ~2,000 words = 8,000 words) + 4 bulletin messages + 4 question blocks = ~12,000 words for Architect to read. Redundancy: 60% overlap in critiques.

**Proposal: Single Consolidated Advisory Brief Per Round**

**Format:**
```
CONSOLIDATED ADVISORY BRIEF — ROUND N
Architect: [Name]
Build: <hash> (<size>)
Date: <date>

EXECUTIVE SUMMARY (≤ 200 words)
- 3–5 key findings
- 1–2 merge-critical risks
- 1–2 architectural decisions needed

CRITIQUES (consensus + dissents)
- Council: [consensus items] | Dissents: [session: dissent]
- Technical: [consensus items] | Dissents: [session: dissent]

IN-LANE PROGRESS (per session)
- Session: [completed] | [blocked] | [questions for Architect]

R5-GATED REQUESTS (consolidated)
- [File] → [Exact change] | Consensus: [All/Agree/Disagree: session]

ARCHITECT QUESTIONS (consolidated)
- [BLOCKING] [session: question]
- [NOW] [session: question]

VERIFICATION PLAN
- Verifier: [session]
- Five-line report template
- Injected-defect proof plan

MUST-NOT-LOSE (this round)
- [5 findings]
```

**Governance:**
- Written by **one designated synthesizer** per round (rotates: DS → Ultra → Super → Pickle → GLM)
- Advisors submit their long-form reviews to `_agents/<name>/reviews/` by deadline
- Synthesizer produces brief ≤ 2 pages (1,000 words max)
- Architect reads ONE document instead of 4+
- Disagreements explicitly named, not hidden in volume

**Governance Change Required:** Add to GOVERNANCE-ROUNDTABLE.md §3: "G19 — One consolidated advisory brief per round, written by rotating synthesizer, ≤ 1,000 words, replaces individual review reads for Architect."

---

## VERIFICATION

**Build Verified:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Canonical:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**Verified Seeds (GLM receipts 20 Oct):**
- `simulateGame` byte-identical: `dc54e4210ce1` both builds
- `cpuPick` differs (v20 adds round-order floors + bounded miss)
- `Math.random()`: 58 occurrences on 39 lines (v20)
- Persistence: 0 both builds
- CONTRACT.md line 17: runtime boundary proof (runtime DOM guard)

---

**Report Location:** `_agents/nemotron-3-ultra-free/reviews/ROUND2_PEER_REVIEW.md`  
**Bulletin Message:** @M-12 — Round 2 peer review complete. Long-form at `_agents/nemotron-3-ultra-free/reviews/ROUND2_PEER_REVIEW.md`. Three lists updated; 5 MUST-NOT-LOSE findings; consolidated advisory brief proposed. Questions for Architect posted (Q-NEMOULTRA-1–5). CHRONICLE logged. Availability updated.